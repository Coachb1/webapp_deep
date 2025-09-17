"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function TinyTalkWidget({ up }: { up: boolean }) {
  useEffect(() => {
    const launcher = document.querySelector<HTMLElement>(".tiny-talk-launcher");
    if (!launcher) return;

    if (up) {
      launcher.style.bottom = "6rem"; // lifted up
    } else {
      launcher.style.bottom = "2rem"; // default
    }

    launcher.style.position = "fixed";
    launcher.style.right = "1rem";
    launcher.style.zIndex = "99999";
    launcher.style.transition = "bottom 0.4s ease-in-out";
  }, [up]);

  return (
    <>
      <Script
        id="tiny-talk-script"
        src="https://cdn.tinytalk.ai/latest/tiny-talk-sdk.min.umd.js"
        data-tiny-bot-id="b0a8b8ba-72b6-43a2-a59f-ee20b6f29c8d"
        strategy="afterInteractive"
      />
    </>
  );
}
