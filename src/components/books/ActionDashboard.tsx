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
      { label: "Landscape", action: "AI_LANDSCAPE"  },
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

const ActionDashboard: React.FC<ActionDashboardProps> = ({ onAction }) => {
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
      )
      .map((col) => col.action_tab_info);
    setLoading(false);
    return [...actionTabs, ...dashboardItems];
  }, [userInfo]);

  if (loading) {
    return (
      <section className="bg-white border border-[#00c193] rounded-xl p-6">
        <h2 className="text-center text-xl font-semibold text-black mb-5">
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
      <h2 className="text-center text-sm font-semibold text-black mb-2">
        ENTERPRISE AI ADOPTS DASHBOARD
      </h2>

      <div className="flex flex-wrap justify-center gap-2 w-full">
        
        {items.map((item: DashboardItem) => {
          const isMultiButton = item.buttons.length > 1;

          return (
            <div
              key={item.id}
              className="bg-white rounded-md border border-[#00c193] shadow-sm flex flex-col justify-between p-2 max-w-[180px]">
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

                <h3 className="text-[11px] font-semibold text-black leading-tight mb-1">
                  {item.title}
                </h3>

                <p className="text-[9px] text-gray-600 leading-snug">
                  {item.description}
                </p>
              </div>

              {/* Buttons */}
              <div
                className={`gap-1 ${
                  isMultiButton
                    ? "grid grid-cols-2"
                    : "flex"
                }`}
              >
                {item.buttons.map((btn: ActionButton, index: number) => (
                  <button
                    key={index}
                    onClick={() => btn.action && onAction?.(btn.action)}
                    className="
                    flex items-center justify-center
                    font-medium text-black
                    bg-[#f2f2f2]
                    border border-[#00c193]
                    py-1 px-2 rounded
                    shadow-sm
                    whitespace-nowrap
                    text-[9px]
                    hover:bg-[#e8e8e8]
                    transition-colors
                  "
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
