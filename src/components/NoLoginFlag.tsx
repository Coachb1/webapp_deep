"use client";

import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

const NoLoginFlag = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="fixed left-0 top-0 flex h-screen w-screen overflow-x-hidden items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <p className="font-semibold text-sm">
            Please log in to access this page.
          </p>
          <Button variant={"default"} className={"text-xs h-8 px-4 z-50 mt-2"}>
            <RegisterLink postLoginRedirectURL={pathname}>Log in</RegisterLink>
          </Button>
        </div>
      </div>
    </>
  );
};

export default NoLoginFlag;
