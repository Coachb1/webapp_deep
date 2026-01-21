"use client";

import { useEffect, useRef, useState } from "react";
import { WifiOff, Wifi, AlertTriangle } from "lucide-react";
import { useNetwork } from "@/network/useNetwork";

// 🔧 optional: wire later
const getQueuedActionsCount = () => 0;
const isAdminUser = () => false;

export function OfflineBanner() {
  const { online, status } = useNetwork();

  const [showReconnect, setShowReconnect] = useState(false);
  const [lastOnlineAt, setLastOnlineAt] = useState<number | null>(null);
  const wasOnline = useRef(true);
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (wasOnline.current && !online) {
      setLastOnlineAt(Date.now());
    }

    if (!wasOnline.current && online) {
      setShowReconnect(true);
      const timeout = setTimeout(() => {
        if (isMountedRef.current) {
          setShowReconnect(false);
        }
      }, 1500);
      return () => clearTimeout(timeout);
    }

    wasOnline.current = online;
  }, [online]);

  if (status !== "offline") return null;

  // ONLINE → brief success flash
  if (online && showReconnect) {
    return (
      <StatusDock
        color="green"
        title="Back online"
        subtitle="Connection restored"
        icon={<Wifi size={16} />}
        flash
      />
    );
  }

  // OFFLINE
  return (
    <StatusDock
      color="red"
      title="Offline mode"
      subtitle="Some actions may not sync"
      icon={<WifiOff size={16} />}
      pulse
      lastOnlineAt={lastOnlineAt}
    />
  );
}

/* ----------------------- */
/* Internal Dock Component */
/* ----------------------- */

function StatusDock({
  color,
  title,
  subtitle,
  icon,
  pulse,
  flash,
  lastOnlineAt,
}: {
  color: "green" | "amber" | "red";
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  pulse?: boolean;
  flash?: boolean;
  lastOnlineAt?: number | null;
}) {
  const queued = getQueuedActionsCount();
  const isAdmin = isAdminUser();

  const colorMap = {
    green: {
      dot: "bg-emerald-500",
      glow: "shadow-emerald-500/30",
      border: "border-emerald-400/60",
      bg: "bg-emerald-50",
    },
    amber: {
      dot: "bg-amber-500",
      glow: "shadow-amber-500/30",
      border: "border-amber-400/60",
      bg: "bg-amber-50",
    },
    red: {
      dot: "bg-red-500",
      glow: "shadow-red-500/30",
      border: "border-red-400/60",
      bg: "bg-red-50",
    },
  };

  const theme = colorMap[color];

  return (
    <div
      className="
        fixed bottom-12 left-1/2 -translate-x-1/2
        z-[99999]
        animate-slide-up
      "
    >
      <div
        className={`
          group relative
          flex items-center gap-4
          rounded-2xl
          border ${theme.border}
          ${theme.bg}
          px-6 py-4
          text-sm text-neutral-900
          shadow-xl ${theme.glow}
          ring-1 ring-black/5
          transition-all
          ${flash ? "animate-pulse" : ""}
        `}
      >
        {/* Accent bar */}
        <div
          className={`absolute left-0 top-0 h-full w-1 rounded-l-2xl ${theme.dot}`}
        />

        {/* Status dot */}
        <span className="relative flex h-3 w-3 ml-2">
          {pulse && (
            <span
              className={`absolute inline-flex h-full w-full rounded-full ${theme.dot} opacity-70 animate-ping`}
            />
          )}
          <span
            className={`relative inline-flex h-3 w-3 rounded-full ${theme.dot}`}
          />
        </span>

        {/* Text */}
        <div className="flex flex-col leading-tight">
          <span className="font-semibold text-[15px]">{title}</span>
          <span className="text-xs text-neutral-700">{subtitle}</span>
        </div>

        {icon && <span className="ml-2 opacity-80">{icon}</span>}

        {/* Hover details */}
        {(lastOnlineAt || queued || isAdmin) && (
          <div
            className="
              absolute bottom-full mb-3
              hidden group-hover:block
              rounded-xl
              border border-neutral-200
              bg-white
              px-4 py-2
              text-xs text-neutral-700
              shadow-lg
              whitespace-nowrap
            "
          >
            {lastOnlineAt && (
              <div>
                Last online:{" "}
                {Math.max(1, Math.floor((Date.now() - lastOnlineAt) / 60000))}{" "}
                min ago
              </div>
            )}

            {queued > 0 && <div>Queued actions: {queued}</div>}

            {isAdmin && (
              <div className="mt-1 text-red-500">Admin diagnostics enabled</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
