"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { LogoutPortalUser } from "./LogoutUser";



export const RestrictedPage = ({ user }: any) => {
  return (
    <div className="bg-white min-h-screen h-full max-sm:h-full max-sm:min-h-screen flex flex-col items-center justify-center text-center">

      <MaxWidthWrapper className="flex flex-col items-center justify-center text-center">
        <h1 className="text-[#2DC092] border-2 border-[#2DC092] p-[3px] text-xl font-extrabold">
          <span className="bg-[#2DC092] text-white text-lg font-bold mr-[4px] p-[4px]">
            COACH
          </span>
          BOT
        </h1>
        <div className="my-2 max-w-prose">
          {" "}
          <p>
            This content is restricted. Please use your office email and try again. Else contact us at <b>partner@coachbots.com</b>
          </p>
          
        </div>
      </MaxWidthWrapper>{" "}
    </div>
  );
};
