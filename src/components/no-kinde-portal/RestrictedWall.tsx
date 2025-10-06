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
            Thank you for your interest in the trial. A team member wll reach
            out to you for providing a custom onboarding experience.
          </p>
          <LogoutPortalUser/>
        </div>
      </MaxWidthWrapper>{" "}
    </div>
  );
};
