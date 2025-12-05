"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export default function GlobalError({
  error,
  reset,
}: {
  error: (Error & { digest?: string }) | null;
  reset: () => void;
}) {
  useEffect(() => {
    if (error){
      Sentry.captureException(error);
    }
  }, [error]);

  return (
    <html>
      <body>
        <main className="fixed  top-0 overflow-hidden bottom-0 left-0 right-0 w-full flex items-center justify-center">
          <MaxWidthWrapper className="flex flex-col items-center justify-center text-center">
            <h1 className="text-[#2DC092] border-2 border-[#2DC092] p-[3px] text-xl font-extrabold">
              <span className="bg-[#2DC092] text-white text-lg font-bold mr-[4px] p-[4px]">
                COACH
              </span>
              BOT
            </h1>
            <div className="my-2 mt-4 max-w-prose flex flex-col justify-center items-center gap-4">
              {" "}
              <p className="text-2xl text-gray-700 font-bold">
                Welcome to the world of CoachBot!
              </p>
              <div className="relative group cursor-pointer w-fit">
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                  <div className="space-y-2">
                    <Button
                      onClick={() => {
                        window.location.reload();
                      }}
                      variant={"secondary"}
                      className="border border-gray-200 text-gray-600 font-bold text-xl hover:cursor-pointer w-fit"
                    >
                      Let's Start
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </MaxWidthWrapper>{" "}
        </main>
      </body>
    </html>
  );
}
