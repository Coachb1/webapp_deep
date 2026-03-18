"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePortalUser } from "./context/UserContext";
import { CaseItem, CollectionBlock, IframeTablePanel } from "@/lib/types";
import { ConceptsBoxLoader, IframeGridLoader } from "./Loaders";
import { Sticker } from "./sticker";
import DocumentModal from "./DocumentViewer";

const LIMIT = 10; // show first 10 items

const matchesAction = (block: any, actionKey?: string | null) => {
  if (!actionKey) return true;

  // ✅ Check case_items
  const caseMatch = block.case_items?.some(
    (caseItem: any) => caseItem.action_name === actionKey
  );

  // ✅ Check buttons
  const buttonMatch = block.action_tab_info?.buttons?.some(
    (btn: any) => btn.action === actionKey
  );

  return caseMatch || buttonMatch;
};

interface ConceptsViewerProps {
  actionKey?: string | null;
  actionType?: string | null;
  onTrack?: (workspace:string) => void;
  userId?: string; // Added userId for tracking
}

const ConceptsViewer: React.FC<ConceptsViewerProps> = ({ actionKey, actionType, onTrack, userId }) => {
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
  const [iframeLoadingMap, setIframeLoadingMap] = useState<
    Record<string, boolean>
  >({});

  // Pagination helpers (per collection block)
  const getPage = (blockId: string) => pageMap[blockId] ?? 0;

  const setPage = (blockId: string, page: number) => {
    setPageMap((prev) => ({
      ...prev,
      [blockId]: page,
    }));
  };

  useEffect(() => {
    setPageMap({});
  }, [actionKey]);
  // Normalize the 2 links (clean helper)
  const getLinks = (item: CaseItem | null) => {
    if (!item) return [];
    const overview = item.embed_link;
    const transformIQ = item.transform_iq;

    // If TransformIQ exists, return 2 links
    return transformIQ ? [overview, transformIQ] : [overview];
  };

  const links = getLinks(selectedTab);
  const iframePanels = useMemo(() => {
    if (!data) return [];

    const panels: IframeTablePanel[] = [];

    

    data.forEach((block) => {
      if (!matchesAction(block, actionKey)) return;

      const defaultIframe = block.iframe_link ? [{
          iframe_link: block.iframe_link,
          iframe_title: block.iframe_title,
          iframe_subtitle: block.iframe_subtitle,
        }] : [];
      
      const iframeConfig = block.action_tab_info?.iframe_config || {
        show_iframe_panel: true,
        use_default_iframe: true,
      };
      
      if (iframeConfig?.show_iframe_panel === false){
        return;
      }

      const matchedButton = block.action_tab_info?.buttons?.find(
        (btn) => btn.action === actionKey,
      );

      if (matchedButton?.iframe_table_panel?.length) {
        const validIframe = matchedButton.iframe_table_panel.filter(
          (panel) => panel.iframe_link && panel.enable !== false,
        );
        if (validIframe.length > 0) {
          panels.push(...validIframe);
        }
      }

      if (panels.length === 0 && block.iframe_link && iframeConfig?.use_default_iframe !== false) {
        panels.push(...defaultIframe);
      }
    });

    return panels;
  }, [data, actionKey]);

  useEffect(() => {
  setIframeLoadingMap((prev) => {
    const next = { ...prev };

    iframePanels.forEach((panel) => {
      if (!panel.iframe_link) return;

      // Only initialize if not already tracked
      if (!(panel.iframe_link in next)) {
        next[panel.iframe_link] = true;
      }
    });

    return next;
  });
}, [iframePanels]);


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
            ? block.case_items.filter((item) => item.action_name === actionKey)
            : block.case_items;

          const visibleItems = filteredCaseItems.slice(start, end);

          const hasNext = end < filteredCaseItems.length;
          const hasPrev = page > 0;

          let heading = block.heading;
          if (actionKey && block.action_tab_info?.buttons?.length > 0) {
            const matchedButton = block.action_tab_info.buttons.find(
              (btn) => btn.action === actionKey,
            );

            if (matchedButton?.heading) {
              heading = matchedButton.heading;
            }
          }
          let collectionName = block.collection_name;

          if (actionKey && block.action_tab_info?.buttons?.length > 0) {
            const matchedButton = block.action_tab_info.buttons.find(
              (btn) => btn.action === actionKey,
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
              {actionType !== "iframe" && (
              <div className="w-full flex justify-center mt-10 px-4">
                <div
                  className="
                    relative bg-white border border-[#00c193] rounded-2xl
                    px-6 pb-6 pt-16
                    shadow-sm w-full max-w-6xl
                  "
                >
                  {/* Collection name (centered) */}
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-100 border border-[#00c193] px-5 py-[6px] shadow-sm custom-title"
                    style={{ borderRadius: "calc(var(--radius) - 6px)" }}
                  >
                    {collectionName}
                  </div>

                  {/* Pagination Buttons */}
                  {block.case_items.length > LIMIT && (
                    <div
                      className="
                      mt-4 flex justify-center gap-3
                      sm:absolute sm:-top-3 sm:right-4 sm:mt-0
                    "
                    >
                      <button
                        disabled={!hasPrev}
                        onClick={() => setPage(block.collection_name, page - 1)}
                        className={`
                          border border-[#00c193] text-xs font-medium px-4 py-1.5
                          rounded-md shadow-sm
                          ${
                            hasPrev
                              ? "bg-white hover:bg-gray-100"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          }
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
                          ${
                            hasNext
                              ? "bg-white hover:bg-gray-100"
                              : "bg-gray-200 text-gray-400 cursor-not-allowed"
                          }
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
                          onTrack?.(item.tab_name);
                        }}
                        className="custom-btn btn-sm relative overflow-visible"
                      >
                        {item.tab_name}
                        <Sticker text={item.sticker} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              )}
            </React.Fragment>
          );
        })}

      {/* ---------------- DO MORE (DYNAMIC IFRAME) ---------------- */}
      {iframePanels.length > 0 && (
        <div className="w-full flex justify-center mt-14 px-4">
          <div className="bg-white border border-[#00c193] rounded-2xl px-6 py-6 shadow-sm w-full max-w-6xl">
            {iframePanels.map((panel, index) => (
              <div key={index} className="mb-10 last:mb-0">
                {/* Section Heading */}
                <div className="text-center mb-6">
                  <h2 className="custom-title">
                    {panel.iframe_title || "Enterprise AI Literacy Training"}
                  </h2>

                  {panel.iframe_subtitle && (
                    <p className="custom-subtitle mt-1">
                      {panel.iframe_subtitle}
                    </p>
                  )}

                  <div className="mx-auto mt-4 h-[1.5px] bg-gray-300 max-w-xl opacity-70"></div>
                </div>

                {/* Iframe */}
                <div className="relative w-full overflow-hidden rounded-xl border border-gray-300 min-h-[533px]">
                  {iframeLoadingMap[panel.iframe_link!] && (
                    <div className="absolute inset-0 z-10 bg-white p-6">
                      <IframeGridLoader />
                    </div>
                  )}

                  <iframe
                    key={panel.iframe_link}
                    className="w-full h-[533px]"
                    src={panel.iframe_link}
                    frameBorder="0"
                    title={panel.iframe_title || `iframe-${index}`}
                    onLoad={() =>
                      setIframeLoadingMap((prev) => ({
                        ...prev,
                        [panel.iframe_link!]: false,
                      }))
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <DocumentModal
        isOpen={isReadModalOpen}
        onClose={() => {
          setIsReadModalOpen(false);
          setTimeout(() => setSelectedTab(null), 250);
        }}
        tab={selectedTab}
        userId={userId}
        enableTracking={true}
      />
    </>
  );
};

export default ConceptsViewer;
