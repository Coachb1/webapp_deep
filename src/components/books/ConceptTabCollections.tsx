"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePortalUser } from "./context/UserContext";
import { CaseItem, CollectionBlock } from "@/lib/types";
import { ConceptsBoxLoader, IframeGridLoader } from "./Loaders";
import { Sticker } from "./sticker";
import IframeViewer from "./IframeViewer";

const LIMIT = 10; // show first 10 items

const matchesAction = (
  block: CollectionBlock,
  actionKey?: string | null
) => {
  return !actionKey ||
  block.case_items?.some(
    (caseItem) => 
      {        
        return caseItem.action_name === actionKey
      }
  );
}
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

  useEffect(()=> {
    setPageMap({});
  }, [actionKey])
  // Normalize the 2 links (clean helper)
  const getLinks = (item: CaseItem | null) => {
    if (!item) return [];
    const overview = item.embed_link;
    const transformIQ = item.transform_iq;

    // If TransformIQ exists, return 2 links
    return transformIQ ? [overview, transformIQ] : [overview];
  };

  const links = getLinks(selectedTab);
  const activeIframeBlock = useMemo(
  () =>
    data?.find(
      (block) =>
        block.iframe_link && matchesAction(block, actionKey)
    ),
  [data, actionKey]
);

  const [iframeLoading, setIframeLoading] = useState(true);

  useEffect(() => {
    if (activeIframeBlock?.iframe_link) {
      setIframeLoading(true);
    }
  }, [activeIframeBlock?.iframe_link]);

  // Load from userInfo
  useEffect(() => {
    if (loading) return;

    console.info("collection", userInfo.collections, "actionKey", actionKey);

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
        .filter((block) => matchesAction(block, actionKey))
        .map((block) => {
          const page = getPage(block.collection_name);

          const start = page * LIMIT;
          const end = start + LIMIT;

          const filteredCaseItems = actionKey
            ? block.case_items.filter(
                (item) => item.action_name === actionKey
              )
            : block.case_items;

          const visibleItems = filteredCaseItems.slice(start, end);

          const hasNext = end < filteredCaseItems.length;
          const hasPrev = page > 0;

          let heading = block.heading
          if (actionKey && block.action_tab_info?.buttons?.length > 0) {
            const matchedButton = block.action_tab_info.buttons.find(
              (btn) => btn.action === actionKey
            );

            if (matchedButton?.heading) {
              heading = matchedButton.heading;
            }
          }
          let collectionName = block.collection_name;

          if (actionKey && block.action_tab_info?.buttons?.length > 0) {
            const matchedButton = block.action_tab_info.buttons.find(
              (btn) => btn.action === actionKey
            );

            if (matchedButton?.collection_name) {
              collectionName = matchedButton.collection_name;
            }
          }

          return (
            <React.Fragment key={block.id}>
              {/* Heading */}
              {heading && (
                <div className="text-center mt-10 mb-8 px-6">
                  <h1 className="text-center custom-title leading-snug max-w-6xl mx-auto">
                    {heading}
                  </h1>
                  <div className="mx-auto mt-6 h-[1.5px] bg-gray-300 max-w-4xl opacity-70"></div>
                </div>
              )}

              {/* Collection Block */}
              <div className="w-full flex justify-center mt-10 px-4">
                  <div className="
                    relative bg-white border border-[#00c193] rounded-2xl
                    px-6 pb-6 pt-16
                    shadow-sm w-full max-w-6xl
                  ">
                  {/* Collection name (centered) */}
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-100 border border-[#00c193] px-5 py-[6px] shadow-sm custom-title"
                    style={{ borderRadius: "calc(var(--radius) - 6px)" }}
                  >
                    {collectionName}
                  </div>

                  {/* Pagination Buttons */}
                  {block.case_items.length > LIMIT && (
                    <div className="
                      mt-4 flex justify-center gap-3
                      sm:absolute sm:-top-3 sm:right-4 sm:mt-0
                    ">
                      <button
                        disabled={!hasPrev}
                        onClick={() => setPage(block.collection_name, page - 1)}
                        className={`
                          border border-[#00c193] text-xs font-medium px-4 py-1.5
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
                          border border-[#00c193] text-xs font-medium px-4 py-1.5
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
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-4 mt-8 sm:mt-0">
                    {visibleItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setSelectedTab(item);
                          setPageIndex(0);
                          setIsReadModalOpen(true);
                        }}  
                        className="custom-btn btn-sm relative overflow-visible"
                      >
                        {item.tab_name}
                        <Sticker
                          text={item.sticker}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>


            </React.Fragment>
          );
        })}

      {/* ---------------- DO MORE (DYNAMIC IFRAME) ---------------- */}
      {activeIframeBlock?.iframe_link && (
        <div className="w-full flex justify-center mt-14 px-4">
          <div className="bg-white border border-[#00c193] rounded-2xl px-6 py-6 shadow-sm w-full max-w-6xl">

            {/* Section Heading */}
            <div className="text-center mb-6">
              <h2 className="custom-title">
                {activeIframeBlock?.iframe_title || "Enterprise AI Literacy Training & Course Catalogue"}
              </h2>
              <p className="custom-subtitle mt-1">
                {activeIframeBlock?.iframe_subtitle || "Curated collection of free & paid AI training courses"}
              </p>
              <div className="mx-auto mt-4 h-[1.5px] bg-gray-300 max-w-xl opacity-70"></div>
            </div>

            {/* Dynamic Iframe */}
            <div className="relative w-full overflow-hidden rounded-xl border border-gray-300 min-h-[533px]">

              {/* Loader */}
              {iframeLoading && (
                <div className="absolute inset-0 z-10 bg-white p-6">
                  <IframeGridLoader />
                </div>
              )}

              {/* Iframe */}
              <iframe
                className="w-full h-[533px]"
                src={activeIframeBlock.iframe_link}
                frameBorder="0"
                title="Enterprise AI Courses"
                onLoad={() => setIframeLoading(false)}
              />
            </div>


          </div>
        </div>
      )}



      {/* READ MODAL */}
      {isReadModalOpen && selectedTab && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsReadModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg w-full  h-[100vh] flex flex-col shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="custom-title text-xl font-bold text-gray-800">
                {selectedTab.tab_name}
              </h3>

              <div className="flex items-center gap-4">
                {/* 🟢 Transform IQ Button */}
                {selectedTab.transform_iq && (
                  <button
                    onClick={() => setPageIndex(pageIndex === 0 ? 1 : 0)}
                    className="custom-btn btn-sm w-full bg-gray-200 border border-[#00c193] px-6 py-2.5 text-sm font-medium text-gray-800 shadow-sm transition-all duration-300 hover:border-[#00c193] hover:shadow-md sm:w-auto"
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
              <IframeViewer url={links[pageIndex]} title={selectedTab.tab_name} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConceptsViewer;
