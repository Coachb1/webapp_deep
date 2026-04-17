"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import PdfViewer from "./PDFViewe";

// Worker setup
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type SmartPreviewProps = {
  link: string;
  name: string;
};

const Loader = () => (
  <div className="flex h-full w-full items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#00c193] border-t-transparent" />
      <p className="text-sm text-gray-500">Loading..</p>
    </div>
  </div>
);

const SmartPreview: React.FC<SmartPreviewProps> = ({ link, name }) => {
  const [loading, setLoading] = useState(true);
  const [numPages, setNumPages] = useState<number | null>(null);

  const isPdf = useMemo(() => {
    setLoading(false);
    return /\.pdf(\?|#|$)/i.test(link);
  }, [link]);

  useEffect(() => {
    setLoading(true);
    setNumPages(null);
  }, [link]);

  return (
    <div className="w-full flex justify-center mt-10 px-4">
      <div className="w-full max-w-6xl bg-white border border-[#00c193] rounded-2xl px-6 py-6 shadow-sm">
        <div className="text-center mb-6">
          <h2 className="custom-title">{name}</h2>
          <div className="mx-auto mt-4 h-[1.5px] bg-gray-300 max-w-xl opacity-70" />
        </div>

        <div className="relative w-full overflow-hidden rounded-xl border border-gray-300 min-h-[533px] bg-white">
          {loading && (
            <div className="absolute inset-0 z-10 bg-white">
              <Loader />
            </div>
          )}

          {isPdf ? (
            <PdfViewer
                url={link}
            />
          ) : (
            <iframe
              key={link}
              src={link}
              title={name}
              className="w-full h-[533px]"
              frameBorder={0}
              onLoad={() => setLoading(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartPreview;