"use client";

import Script from "next/script";

export default function TinyTalkWidget() {
  return (
    <>
      <Script
        src="https://cdn.tinytalk.ai/latest/tiny-talk-sdk.min.umd.js"
        data-tiny-bot-id="b0a8b8ba-72b6-43a2-a59f-ee20b6f29c8d"
        strategy="afterInteractive"
      />

      {/* ✅ Tailwind global override */}
      <style jsx global>{`
        .tiny-talk-launcher {
          @apply fixed bottom-32 right-4 z-[99999];
        }
      `}</style>
    </>
  );
}
