// components/IframeViewer.tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, Download } from "lucide-react";
import { useReadingProgress } from "@/hooks/useReadingProgress";
import PdfViewer from "./PDFViewe";
import ReadingProgressBar from "./ReadingProgressBar";

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
  debug?: boolean;
  enableTracking?: boolean;
}

const NON_DISPLAYABLE_EXTS = [
  ".zip",
  ".rar",
  ".7z",
  ".tar",
  ".gz",
  ".exe",
  ".dmg",
  ".pkg",
  ".app",
  ".apk",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".csv",
  ".ppt",
  ".pptx",
  ".xlsm",
  ".docm",
  ".pptm",
];

// UI milestones used by the visual tracker
const MILESTONES = [25, 50, 75, 100];

type LogLevel = "info" | "warn" | "error" | "success" | "scroll";

const LOG_STYLES: Record<LogLevel, string> = {
  info: "background:#1d4ed8;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold",
  warn: "background:#d97706;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold",
  error:
    "background:#dc2626;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold",
  success:
    "background:#16a34a;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold",
  scroll:
    "background:#7c3aed;color:#fff;padding:2px 6px;border-radius:3px;font-weight:bold",
};

function createLogger(enabled: boolean, componentId: string) {
  const prefix = `[IframeViewer#${componentId}]`;
  return {
    info: (msg: string, data?: unknown) =>
      enabled &&
      console.log(
        `%c${prefix} ℹ ${msg}`,
        LOG_STYLES.info,
        ...(data !== undefined ? [data] : []),
      ),
    warn: (msg: string, data?: unknown) =>
      enabled &&
      console.warn(
        `%c${prefix} ⚠ ${msg}`,
        LOG_STYLES.warn,
        ...(data !== undefined ? [data] : []),
      ),
    error: (msg: string, data?: unknown) =>
      enabled &&
      console.error(
        `%c${prefix} ✖ ${msg}`,
        LOG_STYLES.error,
        ...(data !== undefined ? [data] : []),
      ),
    success: (msg: string, data?: unknown) =>
      enabled &&
      console.log(
        `%c${prefix} ✔ ${msg}`,
        LOG_STYLES.success,
        ...(data !== undefined ? [data] : []),
      ),
    scroll: (msg: string, data?: unknown) =>
      enabled &&
      console.log(
        `%c${prefix} ↕ ${msg}`,
        LOG_STYLES.scroll,
        ...(data !== undefined ? [data] : []),
      ),
    group: (label: string, fn: () => void) => {
      if (!enabled) return;
      console.groupCollapsed(`${prefix} ${label}`);
      fn();
      console.groupEnd();
    },
  };
}

let instanceCounter = 0;

export default function IframeViewer({
  url,
  title,
  useProxy = true,
  onScrollProgress,
  onMilestoneReached,
  debug = process.env.NODE_ENV === "development",
  enableTracking = false,
}: IframeViewerProps) {
  const instanceId = useRef(String(++instanceCounter)).current;
  const log = useRef(createLogger(debug, instanceId)).current;

  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const cleanupRef = useRef<() => void>(() => {});
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState(0);
  const [progress, setProgress] = useState(10);
  const [scrollPercent, setScrollPercent] = useState(0);

  const baseUrl = url?.split("?")[0].toLowerCase() ?? "";
  const isPdf = baseUrl.endsWith(".pdf");
  const isNonDisplayable = NON_DISPLAYABLE_EXTS.some((ext) =>
    baseUrl.endsWith(ext),
  );

  const proxiedUrl = useProxy
    ? `/api/proxy?url=${encodeURIComponent(url)}`
    : url;

  // shared reading progress hook
  const { updateProgress, reset } = useReadingProgress(
    onScrollProgress,
    onMilestoneReached,
  );

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

  // ---------- Instance-scoped refs for per-iframe isolation ----------
  const chunkTimersRef = useRef<Record<number, ReturnType<typeof setTimeout>>>(
    {},
  );
  const chunkReadRef = useRef<Set<number>>(new Set());
  const lastConfirmedChunkRef = useRef<number>(-1);
  const rafHandleRef = useRef<number | null>(null);

  // ---------- helper: detect best scroll element ----------
  function detectScrollElement(doc: Document): HTMLElement {
    const candidates: HTMLElement[] = [
      ...(doc.scrollingElement ? [doc.scrollingElement as HTMLElement] : []),
      ...(doc.documentElement ? [doc.documentElement as HTMLElement] : []),
      ...(doc.body ? [doc.body as HTMLElement] : []),
    ].filter(Boolean) as HTMLElement[];

    // add likely containers (limited to avoid perf hit)
    const extra = Array.from(
      doc.querySelectorAll("div, main, section, article"),
    ).slice(0, 200) as HTMLElement[];
    candidates.push(...extra);

    let best = candidates[0] || (doc.documentElement as HTMLElement);
    let maxScrollable = 0;

    for (const el of candidates) {
      try {
        const scrollable = Math.max(
          0,
          (el.scrollHeight || 0) - (el.clientHeight || 0),
        );
        if (scrollable > maxScrollable) {
          maxScrollable = scrollable;
          best = el;
        }
      } catch (e) {
        // ignore
      }
    }
    return best;
  }

  // ---------- attach scroll-based chunk tracker ----------
  const attachScrollListener = useCallback(() => {
    log.info("attachScrollListener called (scroll-based chunk tracker)");

    // cleanup previous
    cleanupRef.current();

    if (!useProxy) {
      log.warn(
        "useProxy=false — iframe is cross-origin; scroll tracking disabled",
      );
      return;
    }

    const iframe = iframeRef.current;
    if (!iframe) {
      log.error("iframeRef.current is null — cannot attach listener");
      return;
    }

    const win = iframe.contentWindow;
    const doc = iframe.contentDocument;

    if (!win || !doc) {
      log.error(
        "contentWindow or contentDocument missing — cannot attach chunk tracker",
      );
      return;
    }

    try {
      const scrollingEl = detectScrollElement(doc);
      const scrollHeight = scrollingEl.scrollHeight || 0;
      const clientHeight = scrollingEl.clientHeight || win.innerHeight || 1;

      log.info("Detected scroll element", {
        tag: scrollingEl.tagName,
        scrollHeight,
        clientHeight,
      });

      if (!scrollHeight || !clientHeight) {
        log.warn(
          "Could not determine scrollHeight/clientHeight, falling back to percent-based scroll listener",
        );
        let fallbackThrottle: number | null = null;
        const fallbackListener = () => {
          if (fallbackThrottle !== null) return;
          fallbackThrottle = window.setTimeout(() => {
            fallbackThrottle = null;
            const st =
              (scrollingEl.scrollTop ?? 0) ||
              (doc.documentElement?.scrollTop ?? 0) ||
              (doc.body?.scrollTop ?? 0) ||
              (win.scrollY ?? 0);
            const max = Math.max(
              1,
              (scrollingEl.scrollHeight || 1) - (scrollingEl.clientHeight || 1),
            );
            const percent = Math.round((st / max) * 100);
            setScrollPercent(percent);
            updateProgress(percent);
          }, 250);
        };
        scrollingEl.addEventListener("scroll", fallbackListener, {
          passive: true,
        });
        // also attach to iframe window
        win.addEventListener("scroll", fallbackListener, { passive: true });

        cleanupRef.current = () => {
          try {
            scrollingEl.removeEventListener("scroll", fallbackListener);
          } catch {}
          try {
            win.removeEventListener("scroll", fallbackListener);
          } catch {}
          log.info("Fallback scroll listener removed");
        };
        return;
      }

      // compute chunks (cap high counts)
      const approxChunks = Math.max(1, Math.ceil(scrollHeight / clientHeight));
      const CHUNK_CAP = 30;
      const chunkCount = Math.min(approxChunks, CHUNK_CAP);

      // instance-scoped state
      const chunkTimers = chunkTimersRef.current;
      const chunkRead = chunkReadRef.current;
      const READ_DELAY_MS = 2000;

      const getScrollTop = () => {
        return (
          (scrollingEl.scrollTop ?? 0) ||
          (doc.documentElement?.scrollTop ?? 0) ||
          (doc.body?.scrollTop ?? 0) ||
          (win.scrollY ?? 0) ||
          0
        );
      };

      const computePercent = (st: number) => {
        const max = Math.max(1, scrollHeight - clientHeight);
        if (max <= 0) return 100;
        return Math.min(100, Math.max(0, Math.round((st / max) * 100)));
      };

      const computeChunkIndex = (percent: number) => {
        const bucket = 100 / Math.max(1, chunkCount);
        return Math.min(
          chunkCount - 1,
          Math.max(0, Math.floor(percent / bucket)),
        );
      };

      const confirmChunk = (idx: number) => {
        if (chunkRead.has(idx)) return;
        if (idx < lastConfirmedChunkRef.current) {
          log.scroll(
            `Ignoring backward chunk confirm (${idx} < ${lastConfirmedChunkRef.current})`,
          );
          return;
        }
        chunkRead.add(idx);
        lastConfirmedChunkRef.current = Math.max(
          lastConfirmedChunkRef.current,
          idx,
        );
        const percent = Math.round((chunkRead.size / chunkCount) * 100);
        log.success(`Chunk ${idx} read → ${percent}%`);
        setScrollPercent(percent);
        updateProgress(percent);
      };

      // rAF throttled onScroll
      let pending = false;
      const onScroll = () => {
        if (pending) return;
        pending = true;
        rafHandleRef.current = window.requestAnimationFrame(() => {
          pending = false;
          const st = getScrollTop();
          const percent = computePercent(st);
          const idx = computeChunkIndex(percent);

          log.scroll("scroll debug", {
            scrollTop: st,
            percent,
            chunk: idx,
            lastConfirmedChunk: lastConfirmedChunkRef.current,
          });

          // if already read, update display percent and return
          if (chunkRead.has(idx)) {
            setScrollPercent(Math.round((chunkRead.size / chunkCount) * 100));
            return;
          }

          // start timer for current chunk; clear other pending timers
          if (!chunkTimers[idx]) {
            Object.keys(chunkTimers).forEach((k) => {
              const ki = Number(k);
              if (ki !== idx && chunkTimers[ki]) {
                clearTimeout(chunkTimers[ki]);
                delete chunkTimers[ki];
              }
            });

            chunkTimers[idx] = setTimeout(() => {
              confirmChunk(idx);
              delete chunkTimers[idx];
            }, READ_DELAY_MS);
          }
        });
      };

      // attach listeners to both element and iframe window
      scrollingEl.addEventListener("scroll", onScroll, { passive: true });
      win.addEventListener("scroll", onScroll, { passive: true });

      log.info("Scroll listeners attached", { element: scrollingEl.tagName });

      // initial kick (capture initial viewport)
      onScroll();

      cleanupRef.current = () => {
        try {
          scrollingEl.removeEventListener("scroll", onScroll);
        } catch {}
        try {
          win.removeEventListener("scroll", onScroll);
        } catch {}
        if (rafHandleRef.current) {
          try {
            window.cancelAnimationFrame(rafHandleRef.current);
          } catch {}
          rafHandleRef.current = null;
        }
        Object.values(chunkTimersRef.current).forEach(clearTimeout);
        chunkTimersRef.current = {};
        log.info("Scroll-based chunk tracker cleaned");
      };

      log.success(
        "Scroll-based chunk tracker attached (chunkCount=" + chunkCount + ")",
      );
    } catch (err) {
      log.error("Error while attaching scroll-based chunk tracker", err);
      cleanupRef.current();
    }
  }, [useProxy, log, updateProgress]);

  // ── Refresh / reset ──────────────────────────────────────────────────────────
  const refreshIframe = () => {
    log.info("Manual refresh triggered — resetting state");

    if (enableTracking) {
      reset();
      chunkTimersRef.current = {};
      chunkReadRef.current = new Set<number>();
      lastConfirmedChunkRef.current = -1;
    }

    setScrollPercent(0);
    setLoading(true);
    setProgress(10);
    setKey((prev) => prev + 1);
  };

  // Loading progress animation
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setProgress((p) => (p < 90 ? p + 6 : p));
    }, 350);
    return () => clearInterval(interval);
  }, [loading]);

  // mount/unmount
  useEffect(() => {
    log.info(`Mounted — url="${url}" useProxy=${useProxy} key=${key}`);
    return () => {
      log.info("Unmounting — running cleanup");
      cleanupRef.current();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (key > 0) log.info(`key changed to ${key} — viewer will remount`);
  }, [key, log]);

  // determine if we should show progress UI
  const showProgressUI = enableTracking && !loading && !isNonDisplayable;

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="relative w-full h-full">
      {isPdf ? (
        <>
          <div className="absolute top-7 right-4 z-20 flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full bg-white border shadow ${!enableTracking || loading ? "hidden" : ""}`}
                style={{ color: "#2DC092" }}
              >
                {scrollPercent}% read
              </span>

              {/* completion checkmark */}
              {showProgressUI && scrollPercent === 100 && (
                <span
                  title="Completed"
                  className="text-xs font-semibold px-2 py-1 rounded-full bg-white border shadow"
                  style={{ color: "#16a34a" }}
                >
                  ✓
                </span>
              )}
            </div>

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
              <Loader2
                className="w-8 h-8 animate-spin"
                style={{ color: "#2DC092" }}
              />
              <p
                className="mt-3 text-sm font-medium"
                style={{ color: "#2DC092" }}
              >
                Preparing document…
              </p>
            </div>
          )}

          <PdfViewer
            key={key}
            url={proxiedUrl}
            onLoad={() => {
              setProgress(100);
              setTimeout(() => setLoading(false), 250);
            }}
            onScrollProgress={(e) => {
              if (!enableTracking) return;
              setScrollPercent(e.percent);
              onScrollProgress?.(e);
            }}
            onMilestoneReached={(m, e) => {
              if (!enableTracking) return;
              onMilestoneReached?.(m, e);
            }}
          />

          {/* Progress bar + milestone dots (PDF view) */}
          {showProgressUI && <ReadingProgressBar percent={scrollPercent} />}
        </>
      ) : isNonDisplayable ? (
        <div className="flex flex-col items-center justify-center w-full h-[600px] border-0 rounded-xl bg-gradient-to-br from-white to-[#E6F7F2]">
          <div className="text-center">
            <p
              className="text-sm font-medium mb-2"
              style={{ color: "#2DC092" }}
            >
              This file cannot be displayed. Please download to view the
              content.
            </p>
            <p className="text-xs text-gray-600 mb-6">{getFileName()}</p>
            <Button
              onClick={() => {
                log.info(`Download triggered for: ${getFileName()}`);
                const link = document.createElement("a");
                link.href = url!;
                link.download = getFileName();
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
              className="bg-white border rounded-lg px-4 py-2 text-sm shadow hover:bg-gray-50"
              variant="outline"
              size="sm"
            >
              <Download className="w-4 h-4 mr-2" /> Download File
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="absolute top-7 right-4 z-20 flex items-center gap-2">
            <div className="flex items-center gap-2">
              {useProxy && (
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full bg-white border shadow ${loading || !enableTracking ? "hidden" : ""}`}
                  style={{ color: "#2DC092" }}
                  aria-label={`Read ${scrollPercent}%`}
                >
                  {scrollPercent}% read
                </span>
              )}

              {/* completion checkmark */}
              {showProgressUI && scrollPercent === 100 && (
                <span
                  title="Completed"
                  className="text-xs font-semibold px-2 py-1 rounded-full bg-white border shadow"
                  style={{ color: "#16a34a" }}
                >
                  ✓
                </span>
              )}
            </div>

            <Button
              className="bg-white border rounded-lg px-3 py-1 text-sm shadow hover:bg-gray-50"
              variant="outline"
              size="sm"
              onClick={refreshIframe}
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Refresh
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
              <Loader2
                className="w-8 h-8 animate-spin"
                style={{ color: "#2DC092" }}
              />
              <p
                className="mt-3 text-sm font-medium"
                style={{ color: "#2DC092" }}
              >
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
              setProgress(100);
              setTimeout(() => {
                log.info(
                  "250 ms post-load delay elapsed — hiding loader & attaching chunk listener",
                );
                setLoading(false);
                if (enableTracking) {
                  attachScrollListener();
                }
              }, 250);
            }}
          />

          {/* Progress bar + milestone dots (iframe view) */}
          {showProgressUI && <ReadingProgressBar percent={scrollPercent} />}
        </>
      )}
    </div>
  );
}
