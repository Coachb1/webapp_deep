/**
 * /app/api/proxy/route.ts  (Next.js App Router)
 *
 * Fetches a third-party URL server-side and re-serves it from YOUR domain.
 * Because the response now comes from your origin, the iframe is same-origin
 * and the parent page has full DOM + scroll access.
 *
 * Also injects a tiny <script> into the HTML that:
 *   - Reports scroll position + document metrics via postMessage every 200ms
 *   - Works for ANY HTML structure (SPAs, lazy content, etc.)
 *
 * Usage:
 *   <iframe src={`/api/proxy?url=${encodeURIComponent(thirdPartyUrl)}`} />
 *
 * Security:
 *   - Only allows URLs that match your ALLOWED_DOMAINS allowlist
 *   - Strips CSP / X-Frame-Options headers from upstream response
 *     (those headers only protected the original host, not your proxy)
 *   - Rewrites relative URLs in the HTML to absolute so assets still load
 */

import { NextRequest, NextResponse } from "next/server";

// ─── Allowlist ────────────────────────────────────────────────────────────────
// Add every third-party domain you want to allow proxying.
// Prevents your proxy being used as an open redirect.

const ALLOWED_DOMAINS: string[] = [
  // e.g. "docs.google.com",
  //      "storage.googleapis.com",
  //      "cdn.yourpartner.com",
  // Add your actual domains here:
  "*", // ← REMOVE THIS and list specific domains in production
];

function isAllowed(url: string): boolean {
  if (ALLOWED_DOMAINS.includes("*")) return true; // dev only
  try {
    const { hostname } = new URL(url);
    return ALLOWED_DOMAINS.some(
      (d) => hostname === d || hostname.endsWith(`.${d}`)
    );
  } catch {
    return false;
  }
}

// ─── Scroll tracker script injected into proxied HTML ─────────────────────────
// This runs inside the iframe (now same-origin) and posts scroll state up.

const TRACKER_SCRIPT = `
<script data-proxy-tracker>
(function() {
  var lastScrollY = -1;
  var lastScrollH = -1;

  function report() {
    var scrollY  = window.scrollY || document.documentElement.scrollTop || 0;
    var scrollH  = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      1
    );
    var clientH  = window.innerHeight || document.documentElement.clientHeight || 1;
    var wordCount = (document.body && document.body.innerText)
      ? document.body.innerText.split(/\\s+/).filter(Boolean).length
      : 0;

    // Only post if something changed (avoid flooding)
    if (scrollY !== lastScrollY || scrollH !== lastScrollH) {
      lastScrollY = scrollY;
      lastScrollH = scrollH;
      window.parent.postMessage({
        type: '__PROXY_SCROLL__',
        scrollY:    scrollY,
        scrollH:    scrollH,
        clientH:    clientH,
        wordCount:  wordCount,
        progress:   Math.min(Math.round((scrollY / Math.max(scrollH - clientH, 1)) * 100), 100),
      }, '*');
    }
  }

  // Report on scroll
  window.addEventListener('scroll', report, { passive: true });

  // Report on resize (content reflow)
  window.addEventListener('resize', report, { passive: true });

  // Report on DOM mutations (SPA route changes, lazy content)
  if (window.MutationObserver) {
    var mo = new MutationObserver(function() { setTimeout(report, 100); });
    if (document.body) {
      mo.observe(document.body, { childList: true, subtree: true });
    } else {
      document.addEventListener('DOMContentLoaded', function() {
        mo.observe(document.body, { childList: true, subtree: true });
      });
    }
  }

  // Poll every 300ms as a heartbeat (catches edge cases)
  setInterval(report, 300);

  // Initial report after paint
  if (document.readyState === 'complete') {
    report();
  } else {
    window.addEventListener('load', report);
  }
})();
</script>
`;

// ─── URL rewriting ────────────────────────────────────────────────────────────
// Rewrites relative URLs in fetched HTML so images/CSS/JS still load correctly.

function rewriteUrls(html: string, baseUrl: string): string {
  const base = new URL(baseUrl);
  const origin = base.origin;

  // Inject a <base> tag so the browser resolves relative URLs automatically.
  // This is the cleanest approach — no regex fragility.
  const baseTag = `<base href="${origin}${base.pathname.replace(/\/[^/]*$/, "/")}">`;

  // Insert after <head> or at the very top
  if (/<head[^>]*>/i.test(html)) {
    return html.replace(/(<head[^>]*>)/i, `$1\n${baseTag}`);
  }
  return baseTag + "\n" + html;
}

// ─── Strip headers that would prevent iframe embedding ────────────────────────

const HEADERS_TO_STRIP = new Set([
  "content-security-policy",
  "content-security-policy-report-only",
  "x-frame-options",
  "x-content-type-options",
  "cross-origin-opener-policy",
  "cross-origin-embedder-policy",
  "cross-origin-resource-policy",
]);

// ─── Route handler ────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return new NextResponse("Missing ?url= parameter", { status: 400 });
  }

  if (!isAllowed(targetUrl)) {
    return new NextResponse("Domain not in allowlist", { status: 403 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(targetUrl, {
      headers: {
        // Mimic a real browser so sites don't block the fetch
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      // Don't follow redirects blindly in prod — but fine for now
      redirect: "follow",
    });
  } catch (err) {
    return new NextResponse(`Failed to fetch upstream: ${err}`, { status: 502 });
  }

  const contentType = upstream.headers.get("content-type") ?? "text/html";
  const isHtml = contentType.includes("text/html");

  // For non-HTML resources (CSS, images, fonts) — just relay as-is
  if (!isHtml) {
    const body = await upstream.arrayBuffer();
    const headers = new Headers();
    headers.set("content-type", contentType);
    headers.set("cache-control", "public, max-age=3600");
    return new NextResponse(body, { status: upstream.status, headers });
  }

  // HTML — rewrite URLs, inject tracker script
  let html = await upstream.text();
  html = rewriteUrls(html, targetUrl);

  // Inject tracker script just before </body> (or at end if no </body>)
  if (/<\/body>/i.test(html)) {
    html = html.replace(/<\/body>/i, `${TRACKER_SCRIPT}\n</body>`);
  } else {
    html += TRACKER_SCRIPT;
  }

  // Build response headers
  const headers = new Headers();
  headers.set("content-type", "text/html; charset=utf-8");
  headers.set("cache-control", "no-store"); // don't cache proxied content
  // Allow this response to be framed by your own origin
  headers.set("x-frame-options", "SAMEORIGIN");

  // Forward safe upstream headers, strip dangerous ones
  for (const [key, value] of upstream.headers.entries()) {
    if (!HEADERS_TO_STRIP.has(key.toLowerCase())) {
      // Only forward a safe subset
      if (["content-language", "last-modified", "etag"].includes(key.toLowerCase())) {
        headers.set(key, value);
      }
    }
  }

  return new NextResponse(html, { status: 200, headers });
}