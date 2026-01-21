"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { getNetworkState } from "./NetworkState";

export function GlobalNetworkGuard() {
  useEffect(() => {
    let toastShown = false;
    
    const handler = (e: MouseEvent) => {
      try {
        if (!getNetworkState()) {
          // Only block clicks on interactive elements (buttons, links, inputs, etc.)
          const target = e.target as HTMLElement;
          
          if (target && typeof target.matches === 'function') {
            const isInteractive = 
              target.matches('button, a, input, textarea, select, [role="button"], [onclick]');
            
            if (isInteractive) {
              e.preventDefault();
              e.stopPropagation();
              
              // Show toast only once per offline session
              if (!toastShown) {
                toast.warning("You're offline. Action blocked.");
                toastShown = true;
                setTimeout(() => { toastShown = false; }, 2000);
              }
            }
          }
        } else {
          toastShown = false;
        }
      } catch (error) {
        console.error("Error in network guard:", error);
      }
    };

    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, []);

  return null;
}
