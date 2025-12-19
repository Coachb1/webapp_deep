"use client";

import React, { useEffect, useState } from "react";
import { usePortalUser } from "./context/UserContext";
import { CaseItem, CollectionBlock } from "@/lib/types";
import { ConceptsBoxLoader } from "./Loaders";

const LIMIT = 10; // show first 10 items

interface ConceptsViewerProps {
  actionKey?: string | null;
}

const ConceptsViewer: React.FC<ConceptsViewerProps> = ({ actionKey }) => {
  const [pageMap, setPageMap] = useState<Record<string, number>>({});
  const { userInfo, loading } = usePortalUser();
  const [data, setData] = useState<CollectionBlock[] | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  const [selectedTab, setSelectedTab] = useState<CaseItem | null>(null);
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState<0 | 1>(0);
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);
  const [activeBlockForMore, setActiveBlockForMore] =
    useState<CollectionBlock | null>(null);
  const [moreSearch, setMoreSearch] = useState("");


  // Pagination helpers (per collection block)
  const getPage = (blockId: string) => pageMap[blockId] ?? 0;

  const setPage = (blockId: string, page: number) => {
    setPageMap((prev) => ({
      ...prev,
      [blockId]: page,
    }));
  };

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

    console.info("collection", userInfo.collections,"actionKey",actionKey);

    setData(userInfo.collections || null);
    setDataLoading(false);
  }, [userInfo]);

  if (loading || dataLoading) return <ConceptsBoxLoader />;
  if (!data) return null;

  return (
    <>
      {/* ---------------- COLLECTION BLOCKS ---------------- */}
      {data
        .filter((block) => block.case_items && block.case_items.length > 0)
        .filter((block) =>
          !actionKey ||
          block.action_tab_info?.buttons?.some(
            (btn: any) => btn.action === actionKey
          )
        )


        .map((block) => {
          const page = getPage(block.collection_name);

          const start = page * LIMIT;
          const end = start + LIMIT;

          const visibleItems = block.case_items.slice(start, end);

          const hasNext = end < block.case_items.length;
          const hasPrev = page > 0;


          return (
            <React.Fragment key={block.id}>
              {/* Heading */}
              {block.heading && (
                <div className="text-center mt-10 mb-8 px-6">
                  <h1 className="text-2xl md:text-2xl font-bold text-gray-900 leading-snug max-w-6xl mx-auto">
                    {block.heading}
                  </h1>
                  <div className="mx-auto mt-6 h-[1.5px] bg-gray-300 max-w-4xl opacity-70"></div>
                </div>
              )}

              {/* Collection Block */}
              <div className="w-full flex justify-center mt-10 px-4">
                <div className="relative bg-white border border-[#00c193] rounded-2xl px-6 py-6 shadow-sm w-full max-w-6xl">
                  {/* Collection name (centered) */}
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-200 border border-[#00c193] text-black text-sm font-medium px-5 py-[6px] shadow-sm"
                    style={{ borderRadius: "calc(var(--radius) - 6px)" }}
                  >
                    {block.collection_name}
                  </div>

                  {/* Pagination Buttons */}
                  {block.case_items.length > LIMIT && (
                    <div className="absolute -top-3 right-4 flex gap-2">
                      {/* Prev */}
                      <button
                        disabled={!hasPrev}
                        onClick={() => setPage(block.collection_name, page - 1)}
                        className={`
                          border border-[#00c193] text-xs font-medium px-3 py-[5px]
                          rounded-md shadow-sm
                          ${hasPrev
                            ? "bg-white hover:bg-gray-100"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"}
                        `}
                      >
                        Prev
                      </button>

                      {/* Next */}
                      <button
                        disabled={!hasNext}
                        onClick={() => setPage(block.collection_name, page + 1)}
                        className={`
                          border border-[#00c193] text-xs font-medium px-3 py-[5px]
                          rounded-md shadow-sm
                          ${hasNext
                            ? "bg-white hover:bg-gray-100"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"}
                        `}
                      >
                        Next
                      </button>
                    </div>
                  )}


                  {/* Tabs */}
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-4 mt-8">
                    {visibleItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setSelectedTab(item);
                          setPageIndex(0);
                          setIsReadModalOpen(true);
                        }}
                        className="px-4 py-2 rounded-md border text-sm bg-gray-100 border-[#00c193] hover:bg-gray-200"
                      >
                        {item.tab_name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>


            </React.Fragment>
          );
        })}

      {/* READ MODAL */}
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
                    className="w-full bg-gray-200 border border-[#00c193] px-6 py-2.5 text-sm font-medium text-gray-800 shadow-sm transition-all duration-300 hover:border-[#00c193] hover:shadow-md sm:w-auto"
                    style={{ borderRadius: "calc(var(--radius) - 6px)" }}
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
