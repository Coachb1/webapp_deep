"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function ElfsightContactFormWidget({
  widgetId = "elfsight-app-03cb1a17-ba7f-4089-bf7f-4dd69a27f40b",
  up = false,
}: {
  widgetId?: string;
  up?: boolean;
}) {
  useEffect(() => {
    const applyStyles = () => {
      const button = document.querySelector<HTMLElement>(
        ".es-forms-floating-button"
      );

      console.debug(button, up)

      if (!button) return;


        button.style.setProperty(
            "margin-bottom",
            up ? "4rem" : "0",
            "important"
          );

      button.style.setProperty("right", "1rem", "important");
      button.style.setProperty("z-index", "9999999", "important");
    };

    // Apply once in case it's already loaded
    applyStyles();

    const observer = new MutationObserver(() => {
      applyStyles();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    return () => observer.disconnect();
  }, [up]);

  return (
    <>
      <Script
        id="elfsight-platform"
        src="https://elfsightcdn.com/platform.js"
        strategy="lazyOnload"
      />

      <div className={widgetId} data-elfsight-app-lazy />
    </>
  );
}
