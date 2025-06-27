"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";
import { subdomain } from "@/lib/utils";

//GLOBAL USER - *.js
interface CustomWindow extends Window {
  user?: any;
}

declare let window: CustomWindow;
const Widgets = ({ from }: any) => {
  const { user } = useKindeBrowserClient();
  const pathname = usePathname();

  useEffect(() => {
    if (user) {
      window.user = user;
    }
  });

  return (
    <div>
      {from !== "coachDynamic" &&
        from !== "feedbackDynamic" &&
        from !== "subjectDynamic" &&
        from !== "knowledgeBotDynamic" &&
        from !== "deepdiveDynamic" && (
          <>
            {/* <Script src="../widget/coachbots-widget.js" /> */}
            {window.innerWidth <= 768 ? (
              <Script src="../widget/coachbots-stt-widget.js" />
            ): (
            <Script src="../widget/coachbots-stt-widget-new.js" />
            ) }
            {/* <Script src="../widget/coachbots-stt-widget-new.js" strategy="afterInteractive"/> */}

            {/* <div className="fixed max-sm:right-[1.6rem] right-[2rem] bottom-28 hover:cursor-pointer max-sm:bottom-[5.5rem] w-[10%] max-sm:w-[30%] z-50">
              <p className="text-xs text-right">
                <span className="font-bold max-sm:text-[10px] max-sm:relative max-sm:-bottom-20  max-sm:p-1 rounded-lg max-sm:bg-[#35DDB8] w-fit ">
                  CoachScribe{" "}
                </span>
                <span className="max-sm:hidden">
                  {" "}
                  is our high performance bot but speech analytics is not
                  available.
                </span>
              </p>
            </div> */}
            {/* {subdomain === "temp-platform" || pathname === "/" ? null : (
              <div className="fixed max-sm:left-[1.8rem] left-[2rem] bottom-28 hover:cursor-pointer max-sm:bottom-[5.5rem] w-[10%] max-sm:w-[30%] z-50">
                <p className="text-xs text-left">
                  <span className="font-bold max-sm:text-[10px] max-sm:relative max-sm:-bottom-20 max-sm:p-1 rounded-lg max-sm:bg-[#35DDB8] w-fit">
                    CoachTalk{" "}
                  </span>
                  <span className="max-sm:hidden">
                    {" "}
                    is our medium performance bot that includes speech
                    analytics.
                  </span>
                </p>
              </div>
            )} */}
            {" "}
          </>
        )}
    </div>
  );
};

export default Widgets;
