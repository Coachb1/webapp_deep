"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function CoachBotWidget({botId='avatar-bot-4837d-coachbot-master-coach--multi-modal-professional-development', clientId = "First-Demo",up }: { botId:string, clientId:string, up: boolean }) {
  useEffect(() => {
    // Keep checking until the widget is injected
    const interval = setInterval(() => {
      // The SDK injects the widget inside this container
      const container = document.querySelector<HTMLElement>(".coachbots-coachscribe");
      if (!container) return;

      // The launcher itself is usually a button or div injected by the script
      const launcher =
        container.querySelector<HTMLElement>(".coachbots-launcher") ||
        container.querySelector<HTMLElement>("button") ||
        container.querySelector<HTMLElement>("div");

      if (!launcher) return;

      // Force override even if SDK re-applies styles
      launcher.style.setProperty("bottom", up ? "6rem" : "2rem", "important");
      launcher.style.setProperty("position", "fixed", "important");
      launcher.style.setProperty("right", "1rem", "important");
      launcher.style.setProperty("z-index", "9999999", "important");
      launcher.style.setProperty("transition", "bottom 0.4s ease-in-out", "important");

      console.log("✅ CoachBot repositioned:", up ? "6rem" : "2rem");
    }, 100); // check every 1 second, keeps updating

    return () => clearInterval(interval);
  }, [up]);

  return (
    <>
      <Script
        id="coachbots-script"
        src="/widget/coachbots-stt-widget-new.js"
        defer
        strategy="lazyOnload"
      />

      {/* Widget container */}
      <div
        className="coachbots-coachscribe"
        data-bot-id={botId}
        data-client-id={clientId}
        data-welcome-message="Welcome to our Multi-Modal AI Coaching Agent. Let's get started!"
        data-widget-image-link="https://storage.googleapis.com/publicvid/Book%20Library/Untitled%20design%20(10).png"
        data-widget-height="96px"
        data-widget-width="96px"
      ></div>
    </>
  );
}
