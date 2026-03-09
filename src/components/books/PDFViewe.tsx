// components/PdfViewer.tsx
"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useRef, useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReadingProgress } from "@/hooks/useReadingProgress";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PdfViewerProps {
  url: string;
  onLoad?: () => void;
  onScrollProgress?: (e: any) => void;
  onMilestoneReached?: (milestone: number, e: any) => void;
}

const READ_DELAY = 2000; // ms

export default function PdfViewer({
  url,
  onLoad,
  onScrollProgress,
  onMilestoneReached,
}: PdfViewerProps) {
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.2);
  const [loaded, setLoaded] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timersRef = useRef<Record<number, ReturnType<typeof setTimeout>>>({});
  const pagesViewedRef = useRef<Set<number>>(new Set());

  const { updateProgress, reset } = useReadingProgress(
    onScrollProgress,
    onMilestoneReached,
  );

  useEffect(() => {
    // reset when URL changes
    pagesViewedRef.current = new Set();
    Object.values(timersRef.current).forEach(clearTimeout);
    timersRef.current = {};
    reset();
  }, [url, reset]);

  function onLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    onLoad?.();
    // clear refs for previously mounted pages
    pageRefs.current = new Array(numPages).fill(null);
    pagesViewedRef.current = new Set();
    setLoaded(true);
  }

  const markPageRead = (pageNumber: number) => {
    if (!numPages) return;
    if (pagesViewedRef.current.has(pageNumber)) return;
    pagesViewedRef.current.add(pageNumber);

    const percent = Math.round((pagesViewedRef.current.size / numPages) * 100);
    updateProgress(percent);
  };

  useEffect(() => {
    if (!containerRef.current || numPages === 0) return;

    const root = containerRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          const pageAttr = el.getAttribute("data-page");
          const pageNumber = pageAttr ? Number(pageAttr) : NaN;
          if (!pageNumber) return;

          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            // start timer for that page (if not already)
            if (
              !timersRef.current[pageNumber] &&
              !pagesViewedRef.current.has(pageNumber)
            ) {
              timersRef.current[pageNumber] = setTimeout(() => {
                markPageRead(pageNumber);
                delete timersRef.current[pageNumber];
              }, READ_DELAY);
            }
          } else {
            // stop timer if leaving early
            if (timersRef.current[pageNumber]) {
              clearTimeout(timersRef.current[pageNumber]);
              delete timersRef.current[pageNumber];
            }
          }
        });
      },
      {
        root,
        threshold: 0.6,
      },
    );

    // observe page containers
    pageRefs.current.forEach((p) => {
      if (p) observer.observe(p);
    });

    return () => {
      observer.disconnect();
      Object.values(timersRef.current).forEach(clearTimeout);
      timersRef.current = {};
    };
  }, [numPages, updateProgress]);

  const zoomIn = () => setScale((s) => Math.min(3, s + 0.2));
  const zoomOut = () => setScale((s) => Math.max(0.6, s - 0.2));

  return (
    <div className="relative w-full h-full">
      {/* Zoom controls (styled to match IframeViewer) */}
      <div className={`absolute top-7 left-4 z-20 flex items-center gap-2 ${!loaded ? "hidden" : ""}`}>
        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white border shadow text-gray-600">
          {(scale * 100).toFixed(0)}%
        </span>

        <Button
          size="sm"
          variant="outline"
          className="bg-white border shadow hover:bg-gray-50"
          onClick={zoomOut}
        >
          <ZoomOut className="w-4 h-4" />
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="bg-white border shadow hover:bg-gray-50"
          onClick={zoomIn}
        >
          <ZoomIn className="w-4 h-4" />
        </Button>
      </div>

      <div ref={containerRef} className="w-full h-full overflow-y-auto">
        <div className="flex flex-col items-center gap-6 py-8">
          <Document file={url} onLoadSuccess={onLoadSuccess} loading="">
            {Array.from({ length: numPages }, (_, i) => (
              <div
                key={i}
                ref={(el) => (pageRefs.current[i] = el)}
                data-page={i + 1}
                className="shadow-lg bg-white rounded-md"
                style={{ width: "fit-content" }}
              >
                <Page
                  pageNumber={i + 1}
                  scale={scale}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </div>
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
}
