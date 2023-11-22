"use client";

import Script from "next/script";
const Widgets = () => {
  return (
    <div>
      <>
        <Script
          src="https://static.elfsight.com/platform/platform.js"
          data-use-service-core
          defer
        />
        <Script src="../../public/widget/coachbots-widget.js" />
        <Script src="../../public/widget/coachbots-stt-widget.js" />

        <div
          className={`fixed max-sm:left-[2.5rem] left-[3rem] bottom-28 hover:cursor-pointer max-sm:bottom-[5.5rem]`}
        >
          <p className="text-sm">Text</p>
        </div>

        <div className="fixed max-sm:right-[2.8rem] right-[3.2rem] bottom-28 hover:cursor-pointer max-sm:bottom-[5.5rem]">
          <p className="text-sm text">Audio</p>
        </div>

        <div
          className="elfsight-app-a2ca2565-f013-4a6a-9ad8-3ff1f7eadf9a"
          data-elfsight-app-lazy
        ></div>
      </>
    </div>
  );
};

export default Widgets;
