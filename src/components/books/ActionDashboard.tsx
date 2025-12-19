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
}

/* -------------------- DATA -------------------- */

const dashboardItems: DashboardItem[] = [
  {
    id: "ai-landscape",
    title: "AI Landscape & Snapshot",
    description: "Digital & Cloud initiatives View",
    icon: <Radar className="w-9 h-9 text-[#00c193]" />,
    buttons: [{ label: "ALIGN", action: "AI_LANDSCAPE" }],
  },
  {
    id: "ai-cases",
    title: "AI Cases & Metadata",
    description: "AI implementation cases & their relevance",
    icon: <Database className="w-9 h-9 text-[#00c193]" />,
    buttons: [{ label: "ALIGN", action: "SHOW_AI_CASES" }],
  },
  {
    id: "internal-transformation",
    title: "Internal Transformation Projects",
    description: "Submit & View Project Themes",
    icon: <FolderPlus className="w-9 h-9 text-[#00c193]" />,
    buttons: [
      { label: "ALIGN", action: "INTERNAL_TRANSFORMATION_ALIGN" },
      { label: "PROPOSE", action: "INTERNAL_TRANSFORMATION_PROPOSE" },
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
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <DashboardSkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <section className="bg-white border border-[#00c193] rounded-xl p-6">
      <h2 className="text-center text-xl font-semibold text-black mb-5">
        ENTERPRISE AI ADOPTS DASHBOARD
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {items.map((item: DashboardItem) => {
          const isMultiButton = item.buttons.length > 1;

          return (
            <div
              key={item.id}
              className="
                bg-white rounded-xl
                border border-[#00c193]
                shadow-[0_2px_6px_rgba(0,0,0,0.08)]
                flex flex-col justify-between
                px-5 py-3
              "
            >
              <div>
                {typeof item?.icon === "string" &&
                item.icon.includes("<svg") ? (
                  <div className="mb-3">
                    <div
                      className="w-9 h-9"
                      dangerouslySetInnerHTML={{ __html: item.icon }}
                    />
                  </div>
                ) : (
                  <div className="mb-3">{item?.icon}</div>
                )}

                <h3 className="text-sm font-semibold text-black mb-1">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-700 leading-snug">
                  {item.description}
                </p>
              </div>

              {/* Buttons */}
              <div
                className={`mt-3 gap-1.5 ${
                  isMultiButton
                    ? "grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
                    : "flex"
                }`}
              >
                {item.buttons.map((btn: ActionButton, index: number) => (
                  <button
                    key={index}
                    onClick={() => btn.action && onAction?.(btn.action)}
                    className={`
                    flex items-center justify-center
                    box-border min-w-0
                    font-medium text-black
                    bg-[#f2f2f2]
                    border border-[#00c193]
                    py-2.5 rounded-md
                    shadow-[0_1px_3px_rgba(0,0,0,0.12)]
                    whitespace-nowrap
                    ${
                      isMultiButton ? "text-[11px] px-4" : "text-xs w-full px-5"
                    }
                  `}
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
