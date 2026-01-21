"use client";

import { createContext, useEffect, useRef, useState } from "react";
import { setNetworkState } from "./NetworkState";
import { baseURL } from "@/lib/utils";

type NetworkContextType = {
  online: boolean;
  status: "checking" | "online" | "offline";
};

export const NetworkContext = createContext<NetworkContextType>({
  online: true,
  status: "checking",
});

const ONLINE_INTERVAL = 15000;
const OFFLINE_INTERVAL = 5000;
const TIMEOUT_MS = 3000;

export function NetworkProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] =
    useState<NetworkContextType["status"]>("checking");
  const controllerRef = useRef<AbortController | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const abortCountRef = useRef(0);

  const check = async () => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const res = await fetch(`${baseURL.split("/api")[0]}/ht`, {
        cache: "no-store",
        signal: controller.signal,
      });

      if (!res.ok) throw new Error();

      setStatus("online");
      setNetworkState(true);
      abortCountRef.current = 0;

    } catch (error: any) {
      // ⛔ Fetch aborted (timeout)
      if (error?.name === "AbortError") {
        abortCountRef.current += 1;

        console.debug("network: abort", abortCountRef.current, "times");

        // First aborts = inconclusive (refresh / slow DNS)
        if (abortCountRef.current < 2) {
          return;
        }

        // Repeated aborts = internet unreachable
        console.debug("network: offline (abort threshold reached)");
        setStatus("offline");
        setNetworkState(false);
        return;
      }

      // ❌ Real network failure
      abortCountRef.current = 0;
      console.debug("network: offline (fetch error)", error);
      setStatus("offline");
      setNetworkState(false);
    } finally {
      clearTimeout(timeout);
    }
  };

  const startPolling = (isOnline: boolean) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(
      check,
      isOnline ? ONLINE_INTERVAL : OFFLINE_INTERVAL,
    );
  };

  useEffect(() => {
    // initial check
    check();

    const handleOnline = () => check();
    const handleOffline = () => {
      setStatus("offline");
      setNetworkState(false);
      startPolling(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "visible") {
        check();
      }
    });

    return () => {
      controllerRef.current?.abort();
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (status !== "checking") {
      startPolling(status === "online");
    }
  }, [status]);

  return (
    <NetworkContext.Provider
      value={{
        online: status === "online",
        status,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
}
