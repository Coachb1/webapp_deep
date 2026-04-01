"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePortalUser } from "./context/UserContext";
import { Database, FolderPlus } from "lucide-react";
import {
  ActionButton,
  AnnouncementSection,
  CollectionBlock,
  DashboardItem,
} from "@/lib/types";
import { DashboardSkeletonCard } from "./Loaders";

/* -------------------- TYPES -------------------- */

interface ActionDashboardProps {
  onAction?: (action: string, type?: string, actionInfo?:any, collectionId?: string) => void;
  selectedAction?: string | null;
}

/* -------------------- STATIC ITEMS -------------------- */

const staticDashboardItems: DashboardItem[] = [
  // {
  //   id: "ai-cases",
  //   title: "AI Landscape & Cases",
  //   description: "Digital Initiatives repository with AI cases plus  relevance",
  //   icon: <Database className="w-5 h-5 text-[#00c193]" />,
  //   buttons: [
  //     { label: "Cases", action: "SHOW_AI_CASES" },
  //     { label: "Landscape", action: "AI_LANDSCAPE" },
  //   ],
  // },
  // {
  //   id: "internal-transformation",
  //   title: "Internal Transformation Projects",
  //   description: "Submit & View Project Themes",
  //   icon: <FolderPlus className="w-5 h-5 text-[#00c193]" />,
  //   buttons: [
  //     { label: "View", action: "INTERNAL_TRANSFORMATION_ALIGN" },
  //     { label: "Propose", action: "INTERNAL_TRANSFORMATION_PROPOSE" },
  //   ],
  // },
];

const resolveValidButtons = (col: CollectionBlock): ActionButton[] => {
  const type = col.action_tab_info?.type;
  const buttons = col.action_tab_info?.buttons;

  // No buttons → nothing to resolve
  if (!buttons?.length) return [];

  // ✅ SYSTEM type: return all buttons, ignore case_items completely
  if (type === "system" || type === "both") {
    return buttons.map((b) => ({ ...b, collection_name: col.collection_name, uid: col.uid }));
  }

  // ❌ Non-system: no case items → no buttons
  if (!col.case_items?.length) return [];

  const caseActionSet = new Set(
    col.case_items.map((c) => c.action_name).filter(Boolean),
  );

  // Only allow buttons that exist in case items — and attach collection name
  return buttons
    .filter((btn) => caseActionSet.has(btn.action))
    .map((b) => ({ ...b, collection_name: col.collection_name, uid: col.uid }));
};

/* -------------------- COMPONENT -------------------- */
const announcement: AnnouncementSection = {
  enabled: true,
  heading: {
    text: "Enterprise AI Adoption with AI Adopts ALIGN Framework. Learn more with",
    link: "https://gemini.google.com/share/c02fb7ecd439",
    link_text: "Gemini.",
  },
  subheading: {
    text: "The only productized AI Adoption Consulting Model from Big 4 Stack",
    link: null,
    link_text: null,
  },
};

const ActionDashboard: React.FC<ActionDashboardProps> = ({
  onAction,
  selectedAction,
}) => {
  const { userInfo, loading } = usePortalUser();
  const [initialLoading, setInitialLoading] = useState(true);
  const [announcementSection, setAnnouncementSection] =
    useState<AnnouncementSection>(announcement);

  const items: DashboardItem[] = useMemo(() => {
    if (loading) return [];

    if (!userInfo.collections || userInfo.collections.length === 0) {
      return staticDashboardItems;
    }

    const dynamicItems = userInfo.collections
      .map((col) => {
        if (!col.action_tab_info) return null;

        const validButtons = resolveValidButtons(col);

        // ❌ If no buttons match → don't show this action tab
        if (validButtons.length === 0) return null;

        return {
          ...col.action_tab_info,
          buttons: validButtons,
        };
      })
      .filter(Boolean) as DashboardItem[];

    return [...dynamicItems, ...staticDashboardItems];
  }, [userInfo]);

  useEffect(() => {
    if (items.length > 0) {
      console.debug("int", initialLoading, items);
      setInitialLoading(false);
    }
  }, [items]);

  useEffect(() => {
    if (userInfo?.libraryBotConfig?.announcements_section) {
      setAnnouncementSection(userInfo?.libraryBotConfig?.announcements_section);
    }
  }, [userInfo]);

  if (initialLoading) {
    return (
      <section className="bg-white border border-[#00c193] rounded-xl p-2">
        <div className="flex flex-wrap justify-center gap-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="w-[260px] flex-shrink-0">
              <DashboardSkeletonCard />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white border border-[#00c193] rounded-md p-2">
      {announcementSection?.enabled && (
        <>
          <h2 className="custom-title text-center mb-4">
            {announcementSection.heading.text}{" "}
            {announcementSection.heading.link &&
              announcementSection.heading.link_text && (
                <a
                  href={announcementSection.heading.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00c193] hover:text-[#00c193]/80 underline font-semibold"
                >
                  {announcementSection.heading.link_text}
                </a>
              )}
            {announcementSection.heading.append_text && (
              <> {announcementSection.heading.append_text}</>
            )}
          </h2>

          <div className="mx-auto mt-4 h-[1.5px] bg-gray-300 max-w-xl opacity-70"></div>

          <p className="custom-subtitle text-center mb-4 mt-4">
            {announcementSection.subheading.text}{" "}
            {announcementSection.subheading.link &&
              announcementSection.subheading.link_text && (
                <a
                  href={announcementSection.subheading.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00c193] hover:text-[#00c193]/80 underline font-medium"
                >
                  {announcementSection.subheading.link_text}
                </a>
              )}
            {announcementSection.subheading.append_text && (
              <> {announcementSection.subheading.append_text}</>
            )}
          </p>
        </>
      )}

      <div
        className="
            grid gap-3
            w-full
            max-w-[1600px]
            mx-auto
            justify-center
            justify-items-center
            [grid-template-columns:repeat(auto-fit,200px)] "
      >
        {items.map((item: DashboardItem) => {
          const isMultiButton = item.buttons.length > 1;

          const isActive = item.buttons.some(
            (btn) => btn.action === selectedAction,
          );

          return (
            <div
              key={item.id}
              className={`
                rounded-md
                flex flex-col justify-between
                px-5 py-3
                w-[200px]
                flex-shrink-0 
                transition-all duration-300
                ease-out
                ${
                  isActive
                    ? `
                      bg-[#f6fffc]
                      border-2 border-[#00c193]
                      shadow-[0_0_0_4px_rgba(0,193,147,0.22),0_14px_32px_rgba(0,193,147,0.45)]
                      scale-[1.06]
                      ring-1 ring-[#00c193]/40
                    `
                    : `
                      bg-white
                      border border-[#00c193]
                      shadow-[0_2px_6px_rgba(0,0,0,0.08)]
                      hover:shadow-[0_8px_22px_rgba(0,193,147,0.30)]
                      hover:scale-[1.02]
                    `
                }


              `}
            >
              <div className="mb-1.5">
                {typeof item?.icon === "string" &&
                item.icon.includes("<svg") ? (
                  <div className="mb-1.5 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:max-w-5 [&>svg]:max-h-5">
                    <div
                      className="w-5 h-5 [&>svg]:w-5 [&>svg]:h-5"
                      dangerouslySetInnerHTML={{ __html: item.icon }}
                    />
                  </div>
                ) : (
                  <div className="mb-1.5 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:max-w-5 [&>svg]:max-h-5">
                    {item?.icon}
                  </div>
                )}

                <h3 className="text-[14px] font-semibold text-black leading-tight mb-1">
                  {item.title}
                </h3>

                <p
                  className={`text-[12px] leading-snug ${
                    isActive
                      ? "text-gray-800 font-semibold"
                      : "text-gray-700  font-semibold"
                  }`}
                >
                  {item.description}
                </p>
              </div>

              {/* Buttons */}
              <div
                className={`gap-1 w-full mt-auto ${
                  isMultiButton
                    ? "grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
                    : "flex"
                }`}
              >
                {item.buttons.map((btn: ActionButton, index: number) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!btn.action) return;
                      const collectionName = btn.collection_name || item.title || "";
                      const actionInfo = `${collectionName}|${btn.label}`;
                      onAction?.(btn.action, btn.type, actionInfo, btn.uid);
                    }}
                    className={`
    custom-btn btn-sm
    transition-all duration-200 ease-out
    ${
      btn.action === selectedAction
        && `
        actiondashboard-btn-active
  `}`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ActionDashboard;
