"use client";

import React from "react";
import {
  ShieldCheck,
  ClipboardList,
  Layers,
  Radar,
  Database,
  FolderPlus,
} from "lucide-react";

/* -------------------- TYPES -------------------- */

interface ActionButton {
  label: string;
  action?: string;
}

interface DashboardItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  buttons: ActionButton[];
}

interface ActionDashboardProps {
  onAction?: (action: string) => void;
}


/* -------------------- DATA -------------------- */

const dashboardItems: DashboardItem[] = [
  {
    id: "executive-ai-mastery",
    title: "Executive AI Mastery",
    description: "Decision Notes for quick reviews",
    icon: <ClipboardList className="w-9 h-9 text-[#00c193]" />,
    buttons: [
  {label: "ALIGN",
    action: "OPEN_CONCEPTS_EXEC_AI_MASTERY",}],
  },
  {
    id: "design-architecture",
    title: "Design & Architecture Guardrails",
    description: "Evaluation Heuristics for common cases",
    icon: <ShieldCheck className="w-9 h-9 text-[#00c193]" />,
    buttons: [{ label: "ALIGN", action: "DESIGN_ARCH_GUARDRAILS" }],
  },
  {
    id: "enterprise-tools",
    title: "Enterprise Tools Use Case",
    description: "AI-based extension of use cases",
    icon: <Layers className="w-9 h-9 text-[#00c193]" />,
    buttons: [{ label: "ALIGN", action: "ENTERPRISE_TOOLS" }],
  },
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
  return (
    <section className="bg-white border border-[#00c193] rounded-xl p-6">
      <h2 className="text-center text-xl font-semibold text-black mb-5">
        ENTERPRISE AI ADOPTS DASHBOARD
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {dashboardItems.map((item) => {
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
                <div className="mb-3">{item.icon}</div>

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
                {item.buttons.map((btn, index) => (
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
                        isMultiButton
                          ? "text-[11px] px-4"
                          : "text-xs w-full px-5"
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
