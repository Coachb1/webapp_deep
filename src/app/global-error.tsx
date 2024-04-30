"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Badge } from "@/components/ui/badge";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <main className="fixed  top-0 overflow-hidden bottom-0 left-0 right-0 w-full flex items-center justify-center">
          <MaxWidthWrapper className="flex flex-col items-center justify-center text-center">
            <h1 className="text-[#2DC092] border-2 border-[#2DC092] p-[3px] text-xl font-extrabold">
              <span className="bg-[#2DC092] text-white text-lg font-bold mr-[4px] p-[4px]">
                COACH
              </span>
              BOTS
            </h1>
            <div className="my-2 mt-4 max-w-prose">
              {" "}
              <p className="text-lg  text-gray-600">
                <span className="font-bold"> Uh oh!</span> Something went wrong.
              </p>{" "}
              <Badge variant={"destructive"} className="mt-2 p-2">
                <p>Error : {error.message}</p>
              </Badge>
            </div>
          </MaxWidthWrapper>{" "}
        </main>
      </body>
    </html>
  );
}
