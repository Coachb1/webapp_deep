"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, Download } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ScrollCompletionEvent {
  percent: number;
  milestonesReached: number[];
}

interface IframeViewerProps {
  url: string;
  title?: string;
  useProxy?: boolean;
  onScrollProgress?: (e: ScrollCompletionEvent) => void;
  onMilestoneReached?: (milestone: number, e: ScrollCompletionEvent) => void;
  /** Enable verbose console logging. Default: true in development */
  debug?: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const MILESTONES = [25, 50, 75, 100];

const NON_DISPLAYABLE_EXTS = [
  ".zip", ".rar", ".7z", ".tar", ".gz",
  ".exe", ".dmg", ".pkg", ".app", ".apk",
  ".doc", ".docx", ".xls", ".xlsx", ".csv",
  ".ppt", ".pptx", ".xlsm", ".docm", ".pptm",
];

// ─── Logger ───────────────────────────────────────────────────────────────────

type LogLevel = "info" | "warn" | "error" | "success" | "scroll";

const LOG_STYLES: Record<LogLevel, string> = {
  info:    "background:#1d4ed8;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold",
  warn:    "background:#d97706;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold",
  error:   "background:#dc2626;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold",
  success: "background:#16a34a;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold",
  scroll:  "background:#7c3aed;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold",
};

function createLogger(enabled: boolean, componentId: string) {
  const prefix = `[IframeViewer#${componentId}]`;
  return {
    info:    (msg: string, data?: unknown) => enabled && console.log   (`%c${prefix} ℹ ${msg}`, LOG_STYLES.info,    ...(data !== undefined ? [data] : [])),
    warn:    (msg: string, data?: unknown) => enabled && console.warn  (`%c${prefix} ⚠ ${msg}`, LOG_STYLES.warn,    ...(data !== undefined ? [data] : [])),
    error:   (msg: string, data?: unknown) => enabled && console.error (`%c${prefix} ✖ ${msg}`, LOG_STYLES.error,   ...(data !== undefined ? [data] : [])),
    success: (msg: string, data?: unknown) => enabled && console.log   (`%c${prefix} ✔ ${msg}`, LOG_STYLES.success, ...(data !== undefined ? [data] : [])),
    scroll:  (msg: string, data?: unknown) => enabled && console.log   (`%c${prefix} ↕ ${msg}`, LOG_STYLES.scroll,  ...(data !== undefined ? [data] : [])),
    group:   (label: string, fn: () => void) => {
      if (!enabled) return;
      console.groupCollapsed(`${prefix} ${label}`);
      fn();
      console.groupEnd();
    },
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

let instanceCounter = 0;

export default function IframeViewer({
  url,
  title,
  useProxy = true,
  onScrollProgress,
  onMilestoneReached,
  debug = process.env.NODE_ENV === "development",
}: IframeViewerProps) {
  // Stable ID per mount for log disambiguation
  const instanceId = useRef(String(++instanceCounter)).current;
  const log = useRef(createLogger(debug, instanceId)).current;

  const iframeRef        = useRef<HTMLIFrameElement>(null);
  const cleanupRef       = useRef<() => void>(() => {});
  const throttleRef      = useRef<ReturnType<typeof setTimeout> | null>(null);
  const milestonesHitRef = useRef<Set<number>>(new Set());

  const [loading,       setLoading]       = useState(true);
  const [key,           setKey]           = useState(0);
  const [progress,      setProgress]      = useState(10);
  const [scrollPercent, setScrollPercent] = useState(0);

  // ── Derived values ──────────────────────────────────────────────────────────
  
  
  const baseUrl          = url?.split("?")[0].toLowerCase();
  const isPdf = baseUrl.toLowerCase().endsWith(".pdf");
  const isNonDisplayable = NON_DISPLAYABLE_EXTS.some((ext) => baseUrl.endsWith(ext));

  const proxiedUrl = useProxy
  ? `/api/proxy?url=${encodeURIComponent(url)}`
  : url;

  // Log props on every meaningful change
  useEffect(() => {
    log.group("Props snapshot", () => {
      console.table({ url, useProxy, isNonDisplayable, proxiedUrl, debug });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, useProxy]);

  const getFileName = () => {
    try {
      return new URL(url).pathname.split("/").pop() || "download";
    } catch {
      return title || "download";
    }
  };

  // ── Scroll tracking ─────────────────────────────────────────────────────────

  const handleScroll = useCallback(
    (scrollingEl: Element | null) => {
      if (!scrollingEl) {
        log.warn("handleScroll called but scrollingEl is null — skipping");
        return;
      }

      if (throttleRef.current) return; // silently skip — too noisy to log

      throttleRef.current = setTimeout(() => {
        throttleRef.current = null;

        const { scrollTop, scrollHeight, clientHeight } = scrollingEl;
        const maxScroll  = scrollHeight - clientHeight;
        const rawPercent = maxScroll <= 0 ? 100 : (scrollTop / maxScroll) * 100;
        const percent    = Math.min(100, Math.max(0, Math.round(rawPercent)));

        log.scroll(`scrollTop=${scrollTop} scrollHeight=${scrollHeight} clientHeight=${clientHeight} maxScroll=${maxScroll} → ${percent}%`);

        setScrollPercent(percent);

        const newMilestones = MILESTONES.filter(
          (m) => percent >= m && !milestonesHitRef.current.has(m)
        );

        if (newMilestones.length) {
          newMilestones.forEach((m) => milestonesHitRef.current.add(m));
          log.success(`Milestones reached: ${newMilestones.join(", ")}%`, {
            allReached: [...milestonesHitRef.current],
          });
        }

        const event: ScrollCompletionEvent = {
          percent,
          milestonesReached: [...milestonesHitRef.current].sort((a, b) => a - b),
        };

        onScrollProgress?.(event);
        newMilestones.forEach((m) => onMilestoneReached?.(m, event));
      }, 200);
    },
    [onScrollProgress, onMilestoneReached, log]
  );

  // ── Attach scroll listener ──────────────────────────────────────────────────

  const attachScrollListener = useCallback(() => {
    log.info("attachScrollListener called");

    // Always clean up previous listener first
    cleanupRef.current();

    if (!useProxy) {
      log.warn("useProxy=false — iframe is cross-origin; scroll tracking disabled");
      return;
    }

    const iframe = iframeRef.current;
    if (!iframe) {
      log.error("iframeRef.current is null — cannot attach listener");
      return;
    }

    const win = iframe.contentWindow;
    const doc = iframe.contentDocument;

    log.group("iframe contentWindow/Document check", () => {
      console.log("contentWindow :", win);
      console.log("contentDocument :", doc);
      console.log("contentDocument.readyState:", doc?.readyState);
      console.log("contentDocument.URL :", doc?.URL);
    });

    if (!win || !doc) {
      log.error("contentWindow or contentDocument is null — possible cross-origin block even with proxy", {
        hasContentWindow: !!win,
        hasContentDocument: !!doc,
        iframeSrc: iframe.src,
      });
      return;
    }

    // Diagnose which element actually scrolls
    const elInfo = {
      documentElement: {
        scrollHeight: doc.documentElement.scrollHeight,
        clientHeight: doc.documentElement.clientHeight,
        overflow: getComputedStyle(doc.documentElement).overflow,
      },
      body: {
        scrollHeight: doc.body?.scrollHeight,
        clientHeight: doc.body?.clientHeight,
        overflow: doc.body ? getComputedStyle(doc.body).overflow : "n/a",
      },
    };
    log.group("Scroll target diagnosis", () => console.table(elInfo));

    const getScrollTarget = () =>
      doc.documentElement.scrollHeight > doc.documentElement.clientHeight
        ? doc.documentElement
        : doc.body;

    const chosenTarget = getScrollTarget();
    log.info(`Scroll target selected: ${chosenTarget === doc.documentElement ? "documentElement" : "body"}`);

    const listener = () => handleScroll(getScrollTarget());
    win.addEventListener("scroll", listener, { passive: true });
    log.success("Scroll listener attached to iframe contentWindow");

    // Fire once immediately (handles short pages = 100% immediately)
    log.info("Firing initial scroll check…");
    listener();

    cleanupRef.current = () => {
      try {
        win.removeEventListener("scroll", listener);
        log.info("Scroll listener removed (cleanup)");
      } catch (err) {
        log.warn("Could not remove scroll listener (iframe may have navigated away)", err);
      }
    };
  }, [useProxy, handleScroll, log]);

  // ── Refresh ─────────────────────────────────────────────────────────────────

  const refreshIframe = () => {
    log.info("Manual refresh triggered — resetting state");
    milestonesHitRef.current = new Set();
    setScrollPercent(0);
    setLoading(true);
    setProgress(10);
    setKey((prev) => prev + 1);
  };

  // ── Loading progress bar ─────────────────────────────────────────────────────

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setProgress((p) => (p < 90 ? p + 6 : p));
    }, 350);
    return () => clearInterval(interval);
  }, [loading]);

  // ── Mount / unmount ──────────────────────────────────────────────────────────

  useEffect(() => {
    log.info(`Mounted — url="${url}" useProxy=${useProxy} key=${key}`);
    return () => {
      log.info("Unmounting — running scroll listener cleanup");
      cleanupRef.current();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Key change (refresh / re-render) ────────────────────────────────────────

  useEffect(() => {
    if (key > 0) log.info(`iframe key changed to ${key} — iframe will remount`);
  }, [key, log]);

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="relative w-full h-full">
      {isNonDisplayable ? (
        <div className="flex flex-col items-center justify-center w-full h-[600px] border-0 rounded-xl bg-gradient-to-br from-white to-[#E6F7F2]">
          <div className="text-center">
            <p className="text-sm font-medium mb-2" style={{ color: "#2DC092" }}>
              This file cannot be displayed. Please download to view the content.
            </p>
            <p className="text-xs text-gray-600 mb-6">{getFileName()}</p>
            <Button
              onClick={() => {
                log.info(`Download triggered for: ${getFileName()}`);
                const link = document.createElement("a");
                link.href = url;
                link.download = getFileName();
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="bg-white border rounded-lg px-4 py-2 text-sm shadow hover:bg-gray-50"
              variant="outline"
              size="sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Download File
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="absolute top-7 right-4 z-20 flex items-center gap-2">
            {useProxy && (
              <span
                className="text-xs font-semibold px-2 py-1 rounded-full bg-white border shadow"
                style={{ color: "#2DC092" }}
                aria-label={`Read ${scrollPercent}%`}
              >
                {scrollPercent}% read
              </span>
            )}
            <Button
              className="bg-white border rounded-lg px-3 py-1 text-sm shadow hover:bg-gray-50"
              variant="outline"
              size="sm"
              onClick={refreshIframe}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>

          {loading && (
            <div className="absolute top-0 left-0 w-full h-1 bg-[#E6F7F2] z-20">
              <div
                className="h-1 transition-all duration-300"
                style={{ width: `${progress}%`, backgroundColor: "#2DC092" }}
              />
            </div>
          )}

          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-white to-[#E6F7F2] z-10">
              <Loader2 className="w-8 h-8 animate-spin" style={{ color: "#2DC092" }} />
              <p className="mt-3 text-sm font-medium" style={{ color: "#2DC092" }}>
                Preparing document…
              </p>
            </div>
          )}

          <iframe
            ref={iframeRef}
            key={key}
            src={proxiedUrl}
            className="w-full h-[100%] border-0 rounded-xl"
            title={`Read ${title || ""}`}
            loading="lazy"
            allow="fullscreen"
            onLoad={() => {
              log.success(`iframe onLoad fired — src="${proxiedUrl}"`);
              log.group("iframe load details", () => {
                const iframe = iframeRef.current;
                console.log("readyState :", iframe?.contentDocument?.readyState);
                console.log("doc URL    :", iframe?.contentDocument?.URL);
                console.log("doc title  :", iframe?.contentDocument?.title);
              });
              setProgress(100);
              setTimeout(() => {
                log.info("250 ms post-load delay elapsed — hiding loader & attaching scroll listener");
                setLoading(false);
                attachScrollListener();
              }, 250);
            }}
          />
        </>
      )}
    </div>
  );
}