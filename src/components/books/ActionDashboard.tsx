"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePortalUser } from "./context/UserContext";

import {
  Radar,
  Database,
  FolderPlus,
} from "lucide-react";
import { ActionButton, CollectionBlock, DashboardItem } from "@/lib/types";
import { DashboardSkeletonCard } from "./Loaders";

/* -------------------- TYPES -------------------- */

interface ActionDashboardProps {
  onAction?: (action: string) => void;
  selectedAction?: string | null;
}

/* -------------------- DATA -------------------- */

const dashboardItems: DashboardItem[] = [
  // {
  //   id: "ai-landscape",
  //   title: "AI Landscape & Snapshot",
  //   description: "Digital & Cloud initiatives View",
  //   icon: <Radar className="w-9 h-9 text-[#00c193]" />,
  //   buttons: [{ label: "ALIGN", action: "AI_LANDSCAPE" }],
  // },
  {
    id: "ai-cases",
    title: "AI Landscape & Cases",
    description: "Digital Initiatives repository with AI cases plus  relevance",
    icon: <Database className="w-5 h-5 text-[#00c193]" />,
    buttons: [
      { label: "Cases", action: "SHOW_AI_CASES" },
      { label: "Landscape", action: "AI_LANDSCAPE" },
    ],
  },
  {
    id: "internal-transformation",
    title: "Internal Transformation Projects",
    description: "Submit & View Project Themes",
    icon: <FolderPlus className="w-5 h-5 text-[#00c193]" />,
    buttons: [
      { label: "View", action: "INTERNAL_TRANSFORMATION_ALIGN" },
      { label: "Propose", action: "INTERNAL_TRANSFORMATION_PROPOSE" },
    ],
  },
];

/* -------------------- COMPONENT -------------------- */

const ActionDashboard: React.FC<ActionDashboardProps> = ({ onAction, selectedAction }) => {
  const { userInfo } = usePortalUser();
  const [loading, setLoading] = useState(true);

  const items: DashboardItem[] = useMemo(() => {
    console.debug("ActionDashboard: userInfo", userInfo);

    if (userInfo?.collections?.length === 0) {
      setLoading(false);
    }
    if (!userInfo?.collections) return dashboardItems;

    const actionTabs = userInfo.collections
      .filter(
        (col): col is CollectionBlock & { action_tab_info: DashboardItem } =>
          Boolean(col.action_tab_info)
      ).filter(
        (col) => col.case_items && col.case_items.length > 0
      )
      .map((col) => col.action_tab_info);
    setLoading(false);
    return [...actionTabs, ...dashboardItems];
  }, [userInfo]);

  if (loading) {
    return (
      <section className="bg-white border border-[#00c193] rounded-xl p-2">
        <h2 className="custom-title text-center mb-4">
          ENTERPRISE AI ADOPTS DASHBOARD
        </h2>

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
      <h2 className="custom-title text-center mb-4">
        ENTERPRISE AI ADOPTS DASHBOARD
      </h2>

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
            (btn) => btn.action === selectedAction
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

                ${isActive
                  ? `
                    bg-white
                    border border-[#00c193]
                    shadow-[0_6px_16px_rgba(0,193,147,0.28)]
                    scale-[1.05]
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
                  <div className="mb-1.5 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:max-w-5 [&>svg]:max-h-5">{item?.icon}</div>
                )}

                <h3 className="text-[14px] font-semibold text-black leading-tight mb-1">
                  {item.title}
                </h3>

                <p
                  className={`text-[12px] leading-snug ${
                    isActive ? "text-gray-800 font-semibold" : "text-gray-700  font-semibold"
                  }`}
                >
                  {item.description}
                </p>

              </div>

              {/* Buttons */}
              <div
                className={`gap-1 w-full mt-auto ${isMultiButton
                    ? "grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
                    : "flex"
                  }`}
              >

                {item.buttons.map((btn: ActionButton, index: number) => (
                  <button
                    key={index}
                    onClick={() => btn.action && onAction?.(btn.action)}
                    className={`custom-btn btn-sm`}
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
