"use client";

import { useEffect } from "react";

export default function DevToolsKeyBlocker() {
  useEffect(() => {
    const prevent = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      const isF12 = e.key === "F12";

      const ctrl = e.ctrlKey;
      const shift = e.shiftKey;
      const alt = e.altKey;
      const meta = e.metaKey; // macOS Command

      // Windows / Linux shortcuts
      const winDevtools =
        (ctrl && shift && ["i", "j", "c", "k", "e", "m"].includes(key)) || // Chrome/Firefox devtools panels
        (ctrl && ["u", "s"].includes(key)) || // view source, save, print
        (ctrl && alt && key === "i"); // some browsers

      // macOS shortcuts
      const macDevtools =
        (meta && alt && ["i", "j", "c"].includes(key)) || // Safari / Chrome devtools
        (meta && ["u", "s"].includes(key)); // view source / save / print

      if (isF12 || winDevtools || macDevtools) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }
    };

    const blockContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener("keydown", prevent, true); // capture phase
    document.addEventListener("contextmenu", blockContextMenu);

    return () => {
      document.removeEventListener("keydown", prevent, true);
      document.removeEventListener("contextmenu", blockContextMenu);
    };
  }, []);

  return null;
}