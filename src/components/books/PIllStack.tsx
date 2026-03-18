// components/PillStack.tsx
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FileText, Maximize2, Minimize2, X, ChevronUp, ChevronDown } from "lucide-react";
import { getPills, PillEntry, subscribe } from "@/lib/books/pillRegistry";

export default function PillStack() {
  const [pills, setPills]         = useState<readonly PillEntry[]>([]);
  const [collapsed, setCollapsed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    setPills(getPills());
    const unsub = subscribe(() => {
      const next = getPills();
      setPills([...next]);
      if (next.length > 0) setCollapsed(false);
    });
    return unsub;
  }, []);

  if (!isMounted || pills.length === 0) return null;

  return createPortal(
    <div style={{
      position: "fixed", bottom: 24, left: 24, zIndex: 9999, width: 300,
      borderRadius: 14,
      background: "linear-gradient(160deg, #0f172a 0%, #1a2744 100%)",
      border: "1px solid rgba(255,255,255,0.10)",
      boxShadow: "0 12px 40px rgba(0,0,0,0.50), 0 2px 8px rgba(0,0,0,0.30)",
      backdropFilter: "blur(20px)",
      overflow: "hidden",
      animation: "psIn 0.28s cubic-bezier(0.34,1.4,0.64,1) both",
    }}>
      <style>{`
        @keyframes psIn { from{opacity:0;transform:translateY(16px) scale(0.92)} to{opacity:1;transform:none} }
        .ps-btn{display:flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:7px;
          background:transparent;border:none;cursor:pointer;flex-shrink:0;color:rgba(255,255,255,0.40);
          transition:background .15s,color .15s}
        .ps-btn:hover{background:rgba(255,255,255,0.10);color:#fff}
        .ps-btn.danger:hover{background:rgba(220,38,38,0.20);color:#f87171}
        .ps-btn.restore:hover{background:rgba(45,192,146,0.15);color:#2DC092}
      `}</style>

      {/* Header */}
      <div
        style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
          padding:"9px 12px", borderBottom: collapsed ? "none" : "1px solid rgba(255,255,255,0.07)",
          cursor:"pointer" }}
        onClick={() => setCollapsed(c => !c)}
      >
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ display:"flex", gap:3 }}>
            {pills.map((_, i) => (
              <span key={i} style={{ width:6, height:6, borderRadius:"50%",
                background: i === pills.length-1 ? "#2DC092" : "rgba(45,192,146,0.35)" }} />
            ))}
          </div>
          <span style={{ fontSize:11, fontWeight:600, color:"rgba(255,255,255,0.70)", letterSpacing:"0.02em" }}>
            {pills.length} minimized
          </span>
        </div>
        <button className="ps-btn" onClick={e => { e.stopPropagation(); setCollapsed(c => !c); }}>
          {collapsed ? <ChevronUp size={13}/> : <ChevronDown size={13}/>}
        </button>
      </div>

      {/* List */}
      {!collapsed && (
        <div style={{ padding:"6px 8px 8px" }}>
          {[...pills].reverse().map((pill, i) => (
            <div key={pill.id}
              style={{ display:"flex", alignItems:"center", gap:9, padding:"8px",
                borderRadius:10, transition:"background .15s",
                borderTop: i > 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
                marginTop: i > 0 ? 2 : 0 }}
              onMouseEnter={e => (e.currentTarget.style.background="rgba(255,255,255,0.04)")}
              onMouseLeave={e => (e.currentTarget.style.background="transparent")}
            >
              {/* Icon */}
              <div style={{ flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center",
                width:30, height:30, borderRadius:8, background:"rgba(45,192,146,0.12)" }}>
                <FileText size={14} color="#2DC092"/>
              </div>

              {/* Title */}
              <div style={{ flex:1, minWidth:0, cursor:"pointer" }} onClick={pill.onRestore} title="Click to restore">
                <p style={{ margin:0, fontSize:12, fontWeight:600, color:"#fff",
                  whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis", lineHeight:1.3 }}>
                  {pill.title}
                </p>
                <p style={{ margin:"2px 0 0", fontSize:10, color:"rgba(255,255,255,0.35)", lineHeight:1 }}>
                  Minimized
                </p>
              </div>

              <button className="ps-btn restore" onClick={pill.onRestore} title="Restore"><Minimize2 size={12}/></button>
              <button className="ps-btn" onClick={pill.onMaximize} title="Full screen"><Maximize2 size={12}/></button>
              <button className="ps-btn danger" onClick={pill.onClose} title="Close"><X size={11}/></button>
            </div>
          ))}
        </div>
      )}
    </div>,
    document.body,
  );
}