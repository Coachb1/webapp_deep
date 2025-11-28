"use client";

import React, { useEffect, useState } from "react";
import { usePortalUser } from "./context/UserContext";
import { CaseItem, CollectionBlock } from "@/lib/types";
import { ConceptsBoxLoader } from "./Loaders";

const ConceptsViewer = () => {
  const { userInfo, loading } = usePortalUser();
  const [data, setData] = useState<CollectionBlock[] | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  const [selectedTab, setSelectedTab] = useState<CaseItem | null>(null);
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState<0 | 1>(0); // 0=Overview, 1=TransformIQ

  // Normalize the 2 links (clean helper)
  const getLinks = (item: CaseItem | null) => {
    if (!item) return [];
    const overview = item.embed_link;
    const transformIQ = item.transform_iq;

    // If TransformIQ exists, return 2 links
    return transformIQ ? [overview, transformIQ] : [overview];
  };

  const links = getLinks(selectedTab);

  // Load from userInfo
  useEffect(() => {
    if (loading) return;

    console.info('collection', userInfo.collections )

    setData(userInfo.collections || null);
    setDataLoading(false);
  }, [userInfo]);

  if (loading || dataLoading) return <ConceptsBoxLoader />;
  if (!data) return null;

  return (
    <>
      {/* ---------------- COLLECTION BLOCKS ---------------- */}
      {data
      .filter(block => block.case_items && block.case_items.length > 0)
      .map((block) => (
        <div key={block.id} className="w-full flex justify-center mt-10 px-4">
          <div className="relative bg-white border rounded-2xl px-6 py-6 shadow-sm w-full max-w-6xl">
            {/* Collection name */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00c193] text-white text-sm font-medium px-5 py-[6px] rounded-xl shadow">
              {block.collection_name}
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-4 mt-8">
              {block.case_items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedTab(item);
                    setPageIndex(0);
                    setIsReadModalOpen(true);
                  }}
                  className="px-4 py-2 rounded-md border text-sm bg-gray-100 border-gray-300 hover:bg-gray-200"
                >
                  {item.tab_name}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* ---------------- MODAL ---------------- */}
      {isReadModalOpen && selectedTab && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsReadModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              
              <h3 className="text-xl font-bold text-gray-800">
                {selectedTab.tab_name}
              </h3>

              <div className="flex items-center gap-4">
                {/* 🟢 Transform IQ Button */}
                {selectedTab.transform_iq && (
                  <button
                    onClick={() => setPageIndex(pageIndex === 0 ? 1 : 0)}
                    className="bg-[#00c193] text-white px-4 py-2 rounded-md text-sm hover:bg-gray-700"
                  >
                    {pageIndex === 0 ? "Transform IQ" : "Overview"}
                  </button>
                )}

                {/* Close */}
                <button
                  onClick={() => setIsReadModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Body (Iframe) */}
            <div className="flex-1 overflow-hidden">
              <iframe
                src={links[pageIndex]}
                className="w-full h-full border-0"
                title={selectedTab.tab_name}
                allow="fullscreen"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConceptsViewer;
