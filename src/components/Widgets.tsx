"use client";

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Script from "next/script";
import { useEffect } from "react";

//GLOBAL USER - *.js
interface CustomWindow extends Window {
  user?: any;
}

const subdomain = typeof window !== 'undefined' ? window.location.hostname.split('.')[0] : null;

declare let window: CustomWindow;
const Widgets = () => {
  const { user } = useKindeBrowserClient();

  useEffect(() => {
    if (user) {
      window.user = user;
    }
  });

  return (
    <div>
      <>
        <Script
          src="https://static.elfsight.com/platform/platform.js"
          data-use-service-core
          defer
        />
        <Script src="../widget/coachbots-widget.js" />
        <Script src="../widget/coachbots-stt-widget.js" />

        <div className="fixed max-sm:left-[1.6rem] left-[2rem] bottom-28 hover:cursor-pointer max-sm:bottom-[5.5rem] w-[10%] max-sm:w-[30%]">
          <p className="text-xs text-left">
            <span className="font-bold max-sm:text-[10px] max-sm:relative max-sm:-bottom-20  max-sm:p-1 rounded-lg max-sm:bg-[#35DDB8] w-fit ">
              CoachScribe{" "}
            </span>
            <span className="max-sm:hidden">
              {" "}
              is our high performance bot but speech analytics is not available.
            </span>
          </p>
        </div>
        
        { subdomain === "platform" ? null :  
        <div className="fixed max-sm:right-[1.8rem] right-[2rem] bottom-28 hover:cursor-pointer max-sm:bottom-[5.5rem] w-[10%] max-sm:w-[30%]">
          <p className="text-xs text-right">
            <span className="font-bold max-sm:text-[10px] max-sm:relative max-sm:-bottom-20 max-sm:p-1 rounded-lg max-sm:bg-[#35DDB8] w-fit ">
              CoachTalk{" "}
            </span>
            <span className="max-sm:hidden">
              {" "}
              is our medium performance bot that includes speech analytics.
            </span>
          </p>
        </div>
        }

        <div
          className="elfsight-app-a2ca2565-f013-4a6a-9ad8-3ff1f7eadf9a"
          data-elfsight-app-lazy
        ></div>
      </>
    </div>
  );
};

export default Widgets;
