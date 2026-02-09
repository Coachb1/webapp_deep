"use client";

import { Document, Page, pdfjs } from "react-pdf";
import { useEffect, useMemo, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfViewer({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef(0);
  const initialized = useRef(false);

  const [width, setWidth] = useState(800);
  const [numPages, setNumPages] = useState(0);
  const [visiblePages, setVisiblePages] = useState(3);
  const [scale, setScale] = useState(1);


  /* ---------- prevent Document reload ---------- */
  const file = useMemo(() => ({ url }), [url]);

  /* ---------- responsive width ---------- */
  useEffect(() => {
    const updateWidth = () => {
      if (!containerRef.current) return;
      setWidth(containerRef.current.offsetWidth - 32);
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  /* ---------- infinite scroll ---------- */
  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    scrollPosRef.current = el.scrollTop;

    const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 200;

    if (nearBottom && visiblePages < numPages) {
      setVisiblePages((p) => Math.min(p + 2, numPages));
    }
  };

  /* ---------- restore scroll after render ---------- */
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = scrollPosRef.current;
    }
  }, [visiblePages]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="h-[600px] overflow-auto bg-gray-50 rounded-xl p-4"
    >
      <Document
        file={file}
        loading={
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-white to-[#E6F7F2] z-10">
            <Loader2
              className="w-8 h-8 animate-spin"
              style={{ color: "#2DC092" }}
            />
          </div>
        }
        onLoadSuccess={async (pdf) => {
  setNumPages(pdf.numPages);

  const page = await pdf.getPage(1);
  const viewport = page.getViewport({ scale: 1 });

  if (containerRef.current) {
    const containerWidth = containerRef.current.offsetWidth - 32;
    setScale(containerWidth / viewport.width);
  }

  if (!initialized.current) {
    setVisiblePages(3);
    initialized.current = true;
  }
}}

      >
        {Array.from({ length: visiblePages }, (_, index) => (
          <div key={index} className="mb-4 flex justify-center">
            <Page
              pageNumber={index + 1}
            //   width={width}
              scale={scale}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              loading={<div className="h-[500px]" />}
            />
          </div>
        ))}
      </Document>
    </div>
  );
}
