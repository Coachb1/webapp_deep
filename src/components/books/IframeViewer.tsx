"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, Download } from "lucide-react";
import PdfViewer from "./PDFViewe";

export default function IframeViewer({
  url,
  title,
}: {
  url: string;
  title?: string;
}) {
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState(0);
  const [progress, setProgress] = useState(10);

  // File types that cannot be displayed in iframe - show download button instead
  const nonDisplayableExtensions = [
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

  // safer PDF detection (works with signed URLs)
  const isPdf = url?.split("?")[0].toLowerCase().endsWith(".pdf");

  // Check if file type cannot be displayed in iframe
  const isNonDisplayable = nonDisplayableExtensions.some((ext) =>
    url.trim()?.split("?")[0].toLowerCase().endsWith(ext)
  );


  // Get file name from URL
  const getFileName = () => {
    try {
      const pathname = new URL(url).pathname;
      return pathname.split("/").pop() || "download";
    } catch {
      return title || "download";
    }
  };

  const refreshIframe = () => {
    setLoading(true);
    setProgress(10);
    setKey((prev) => prev + 1);
  };

  useEffect(() => {
    if (!loading) return;

    const interval = setInterval(() => {
      setProgress((p) => (p < 90 ? p + 6 : p));
    }, 350);

    return () => clearInterval(interval);
  }, [loading]);

  // stop loader automatically for PDF viewer
  useEffect(() => {
    if (isPdf) {
      const t = setTimeout(() => {
        setProgress(100);
        setLoading(false);
      }, 800);

      return () => clearTimeout(t);
    }
  }, [isPdf, key]);

  return (
    <div className="relative w-full h-full">
      {/* Download Button for non-displayable files */}
      {isNonDisplayable ? (
        <div className="flex flex-col items-center justify-center w-full h-[600px] border-0 rounded-xl bg-gradient-to-br from-white to-[#E6F7F2]">
          <div className="text-center">
            <p className="text-sm font-medium mb-2" style={{ color: "#2DC092" }}>
              This file cannot be displayed. Please download to view the content.
            </p>
            <p className="text-xs text-gray-600 mb-6">{getFileName()}</p>
            <Button
              onClick={() => {
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
          <Button
            className="absolute top-7 right-4 z-20 bg-white border rounded-lg px-3 py-1 text-sm shadow hover:bg-gray-50"
            variant="outline"
            size="sm"
            onClick={refreshIframe}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>

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
              <p className="mt-3 text-sm font-medium" style={{ color: "#2DC092" }}>
                Preparing document…
              </p>
            </div>
          )}

          {/* {isPdf ? (
        <div key={key}>
          <PdfViewer url={url} />
        </div>
      ) : ( */}
          <iframe
            key={key}
            src={url}
            className="w-full h-[600px] border-0 rounded-xl"
            title={`Read ${title || ""}`}
            loading="lazy"
            allow="fullscreen"
            onLoad={() => {
              setProgress(100);
              setTimeout(() => setLoading(false), 250);
            }}
          />
          {/* )} */}
        </>
      )}
    </div>
  );
}
