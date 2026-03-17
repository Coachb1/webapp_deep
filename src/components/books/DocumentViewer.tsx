// components/DocumentModal.tsx

"use client";

import {
  CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";
import { ChevronDown, Maximize2, Minimize2, X } from "lucide-react";
import IframeViewer from "./IframeViewer";
import { CaseItem } from "@/lib/types";
import PillStack from "./PIllStack";
import { registerPill } from "@/lib/books/pillRegistry";

// ─── Types ────────────────────────────────────────────────────────────────────

type ViewMode = "normal" | "minimized" | "maximized";

interface OpenDoc {
  tab: CaseItem;
  viewMode: ViewMode;
  pageIndex: 0 | 1;
}

export interface DocumentModalProps {
  /** Whether the most-recently-requested tab should be visible */
  isOpen: boolean;
  /** Called when the user fully closes a doc (parent resets its selectedTab) */
  onClose: () => void;
  /** The tab the parent wants to open. Changing this opens a new doc. */
  tab: CaseItem | null;
  userId?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getLinks(tab: CaseItem): string[] {
  return tab.transform_iq ? [tab.embed_link, tab.transform_iq] : [tab.embed_link];
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function DocumentModal({
  isOpen,
  onClose,
  tab,
  userId,
}: DocumentModalProps) {
  // Internal list — one entry per concurrently open document
  const [openDocs, setOpenDocs] = useState<OpenDoc[]>([]);

  // ── React to parent opening a new (or existing) tab ──────────────────────────
  useEffect(() => {
    if (!tab || !isOpen) return;

    setOpenDocs((prev) => {
      const idx = prev.findIndex((d) => d.tab.uid === tab.uid);

      if (idx !== -1) {
        // Already tracked — restore to normal if minimized
        return prev.map((d, i) =>
          i === idx ? { ...d, viewMode: "normal" } : d
        );
      }

      // Brand-new tab — add as a new entry; all others stay as-is
      return [...prev, { tab, viewMode: "normal", pageIndex: 0 }];
    });
  // Only re-run when the actual tab identity or open-signal changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab?.uid, isOpen]);

  // ── Per-doc mutators ──────────────────────────────────────────────────────────

  const setDocViewMode = (uid: string, mode: ViewMode) =>
    setOpenDocs((prev) =>
      prev.map((d) => d.tab.uid === uid ? { ...d, viewMode: mode } : d)
    );

  const setDocPageIndex = (uid: string, idx: 0 | 1) =>
    setOpenDocs((prev) =>
      prev.map((d) => d.tab.uid === uid ? { ...d, pageIndex: idx } : d)
    );

  const closeDoc = (uid: string) => {
    // Mark hidden first (CSS fade), then remove
    setDocViewMode(uid, "normal"); // ensures unregister fires via effect below
    setOpenDocs((prev) => prev.filter((d) => d.tab.uid !== uid));
    // Notify parent so it can reset selectedTab
    onClose();
  };

  // Nothing to render yet
  if (openDocs.length === 0) return null;

  return (
    <>
      {openDocs.map((doc) => (
        <DocInstance
          key={doc.tab.uid}
          doc={doc}
          userId={userId}
          onViewMode={(mode) => setDocViewMode(doc.tab.uid!, mode)}
          onPageIndex={(idx) => setDocPageIndex(doc.tab.uid!, idx)}
          onClose={() => closeDoc(doc.tab.uid!)}
        />
      ))}

      {/* Single PillStack — reads from shared pillRegistry */}
      <PillStack />
    </>
  );
}

// ─── Per-document instance ────────────────────────────────────────────────────
//
// Owns CSS-driven layout for one document.
// IframeViewer lives here and is NEVER unmounted.

interface DocInstanceProps {
  doc: OpenDoc;
  userId?: string;
  onViewMode: (mode: ViewMode) => void;
  onPageIndex: (idx: 0 | 1) => void;
  onClose: () => void;
}

function DocInstance({ doc, userId, onViewMode, onPageIndex, onClose }: DocInstanceProps) {
  const { tab, viewMode, pageIndex } = doc;
  const links     = getLinks(tab);
  const activeUrl = links[pageIndex] ?? "";
  const title     = tab.tab_name;

  // Track pill registration
  const unregRef = useRef<(() => void) | null>(null);

  // Body scroll lock when maximized
  useEffect(() => {
    if (viewMode === "maximized") document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [viewMode]);

  // Pill registration
  useEffect(() => {
    if (viewMode === "minimized") {
      unregRef.current = registerPill({
        id:         tab.uid!,
        title,
        onRestore:  () => onViewMode("normal"),
        onMaximize: () => onViewMode("maximized"),
        onClose,
      });
    } else {
      unregRef.current?.();
      unregRef.current = null;
    }
    return () => { unregRef.current?.(); unregRef.current = null; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode, tab.uid]);

  // ── CSS-driven positioning ────────────────────────────────────────────────────
  // The same DOM node shifts between three layouts — no unmount, no portal.

  const isNormal    = viewMode === "normal";
  const isMax       = viewMode === "maximized";
  const isMin       = viewMode === "minimized";

  const backdropStyle: CSSProperties = {
    position: "fixed", inset: 0,
    background: "rgba(0,0,0,0.50)",
    zIndex: 48,
    opacity:       isNormal ? 1 : 0,
    visibility:    isNormal ? "visible" : "hidden",
    pointerEvents: isNormal ? "auto"    : "none",
    transition: "opacity 0.2s ease",
  };

  let containerStyle: CSSProperties;

  if (isMax) {
    containerStyle = {
      position: "fixed", inset: 0, zIndex: 9999,
      display: "flex", flexDirection: "column",
      background: "#fff",
      visibility: "visible", pointerEvents: "auto",
    };
  } else if (isMin) {
    // Hidden but DOM-alive — preserves IframeViewer scroll state
    containerStyle = {
      position: "fixed", inset: 0, zIndex: 49,
      display: "flex", flexDirection: "column",
      visibility: "hidden", pointerEvents: "none",
    };
  } else {
    // normal
    containerStyle = {
      position: "fixed",
      top: "50%", left: "50%",
      transform: "translate(-50%, -50%)",
      width: "calc(100% - 2rem)", height: "95vh",
      zIndex: 49,
      display: "flex", flexDirection: "column",
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 20px 60px rgba(0,0,0,0.30)",
      overflow: "hidden",
      opacity:       isNormal ? 1 : 0,
      visibility:    isNormal ? "visible" : "hidden",
      pointerEvents: isNormal ? "auto"    : "none",
      transition: "opacity 0.2s ease",
    };
  }

  const headerStyle: CSSProperties = isMax
    ? { flexShrink:0, display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"10px 20px", gap:16,
        background:"#111827", borderBottom:"1px solid rgba(255,255,255,0.08)" }
    : { flexShrink:0, display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"12px 20px", gap:16,
        borderBottom:"1px solid #e5e7eb", background:"#fff" };

  return (
    <>
      {/* Backdrop — only for normal mode */}
      <div style={backdropStyle} onClick={onClose} />

      {/* Container — the ONE node that hosts IframeViewer */}
      <div style={containerStyle}>

        {/* Header */}
        <div style={headerStyle}>
          {/* Title */}
          <div style={{ display:"flex", alignItems:"center", gap:10, minWidth:0 }}>
            {isMax && (
              <span style={{ flexShrink:0, width:8, height:8, borderRadius:"50%", background:"#2DC092" }} />
            )}
            <h3 style={{ margin:0, fontSize:15, fontWeight:700,
              color: isMax ? "#fff" : "#1f2937",
              overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis" }}
              className="custom-title"
            >
              {title}
            </h3>
          </div>

          {/* Controls */}
          <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
            {/* Transform IQ */}
            {tab.transform_iq && (
              <button
                onClick={() => onPageIndex(pageIndex === 0 ? 1 : 0)}
                style={{
                  fontSize:12, fontWeight:500,
                  padding:"5px 12px", borderRadius:8, cursor:"pointer",
                  border: isMax ? "1px solid rgba(255,255,255,0.20)" : "1px solid #00c193",
                  background: isMax ? "rgba(255,255,255,0.10)" : "#f3f4f6",
                  color: isMax ? "#fff" : "#374151",
                  transition:"background .15s",
                }}
              >
                {pageIndex === 0 ? "Transform IQ" : "Overview"}
              </button>
            )}

            {/* Minimize */}
            <CtrlBtn dark={isMax} onClick={() => onViewMode("minimized")} title="Minimize">
              <ChevronDown size={15} />
            </CtrlBtn>

            {/* Maximize / Restore */}
            {isMax
              ? <CtrlBtn dark onClick={() => onViewMode("normal")} title="Restore"><Minimize2 size={15} /></CtrlBtn>
              : <CtrlBtn dark={false} onClick={() => onViewMode("maximized")} title="Full screen"><Maximize2 size={15} /></CtrlBtn>
            }

            {/* Close */}
            <CtrlBtn dark={isMax} danger onClick={onClose} title="Close"><X size={15} /></CtrlBtn>
          </div>
        </div>

        {/* IframeViewer — single instance, never remounts */}
        <div style={{ flex:1, overflow:"hidden", position:"relative" }}>
          <IframeViewer
            url={activeUrl}
            title={title}
            enableTracking
            userId={userId}
            case_mapping_id={tab.uid}
          />
        </div>

      </div>
    </>
  );
}

// ─── Control button ───────────────────────────────────────────────────────────

function CtrlBtn({
  dark, danger, onClick, title, children,
}: {
  dark: boolean; danger?: boolean;
  onClick: () => void; title: string;
  children: React.ReactNode;
}) {
  const [hov, setHov] = useState(false);

  const style: CSSProperties = {
    display:"flex", alignItems:"center", justifyContent:"center",
    width:30, height:30, borderRadius:8, cursor:"pointer",
    border: dark ? "1px solid rgba(255,255,255,0.18)" : "1px solid #e5e7eb",
    transition:"background .15s, color .15s",
    background: dark
      ? hov ? (danger ? "rgba(220,38,38,0.25)" : "rgba(255,255,255,0.12)") : "rgba(255,255,255,0.08)"
      : hov ? (danger ? "#fef2f2" : "#f9fafb") : "#fff",
    color: dark
      ? hov ? (danger ? "#f87171" : "#fff") : "rgba(255,255,255,0.60)"
      : hov ? (danger ? "#ef4444" : "#111827") : "#6b7280",
  };

  return (
    <button style={style} title={title} onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      {children}
    </button>
  );
}