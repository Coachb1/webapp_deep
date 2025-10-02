"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Switch } from "../ui/switch";
import { UseHelpMode } from "@/lib/helpmodeContext";
import { usePortalUser } from "../books/context/UserContext";

interface CustomWindow extends Window {
  user?: any;
  locallStorage?: Storage;
  locationn?: Location;
  userIdFromWebApp?: any;
  addEventListener: Window["addEventListener"];
}

const windowDec: CustomWindow =
  typeof window !== "undefined" ? window : ({} as CustomWindow);

const NavBar = () => {
  const { user } = usePortalUser();

  const userRole = user?.user_data?.role || "guest";
  const { updateHelpModeState, helpModeState } = UseHelpMode();

  const pathname = usePathname();
  console.log("userNet", user, windowDec.user);
  console.log("userProfile", userRole, windowDec);

  const [scrolled, setScrolled] = useState<number>(0);

  function handleScroll() {
    var scrolledUp = window.scrollY || window.pageYOffset;

    if (scrolledUp >= 2000) {
      setScrolled(scrolledUp);
    } else if (
      (
        pathname === "/portal/content-library" ||
        pathname === "/portal/domain-skills-library"
      ) && scrolledUp > 0
    ) {
      setScrolled(scrolledUp);
    } else {
      setScrolled(0);
    }
  }

  if (typeof window !== "undefined") {
    windowDec.addEventListener("scroll", handleScroll);
  }

  return (
    <div
      className={`fixed right-0 top-0 z-40 flex h-6 w-full items-center justify-between p-4 py-8 text-base ${
        scrolled > 0 &&
        pathname !== "/skill-bots" &&
        pathname !== "/guides" &&
        "border-b border-gray-400 backdrop-blur-lg"
      } `}
    >
      <Link
        href={""}
        className={`pl-12 max-sm:pl-1  ${
          scrolled || !["/network", "/"].includes(pathname)
            ? "visible"
            : "invisible"
        }`}
      >
        <div className="flex flex-row items-center justify-center">
          <h1
            id="heading"
            className="w-fit border-2 border-[#2DC092] p-[3px] text-xl max-sm:text-[12px] font-extrabold text-[#2DC092] z-10"
          >
            <span className="mr-[4px] bg-[#2DC092] p-[4px] text-lg max-sm:text-[12px] font-bold text-white">
              COACH
            </span>
            BOT
          </h1>
        </div>
      </Link>
      <div className="flex flex-row">
        <div className="flex flex-row gap-2 max-sm:hidden max-lg:hidden">
          <Button
            variant={"outline"}
            className={` h-8 ${
              pathname.includes("portal/content-library")
                ? "border border-gray-500 shadow-md"
                : ""
            } `}
            asChild
          >
            <Link href={"/portal/content-library"}>Leadership Skills</Link>
          </Button>
          <Button
            variant={"outline"}
            className={` h-8 ${
              pathname.includes("portal/domain-skills-library")
                ? "border border-gray-500 shadow-md"
                : ""
            } `}
            asChild
          >
            <Link href={"/portal/domain-skills-library"}>Domain Skills</Link>
          </Button>
        </div>
        <div className="hidden max-sm:block max-lg:block max-sm:text-xs">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="!z-[999] overflow-visible">
              <div className="h-fit w-fit rounded-md bg-gray-200 p-[4px]">
                <Menu className="h-6 w-6" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="z-[999] w-fit max-sm:text-xs"
            >
              <DropdownMenuItem
                className={`max-sm:text-xs ${
                  pathname.includes("portal/content-library")
                    ? "bg-gray-200"
                    : null
                }`}
                asChild
              >
                <Link href={"/portal/content-library"}>Leadership Skills</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className={`max-sm:text-xs ${
                  pathname.includes("portal/domain-skills-library")
                    ? "bg-gray-200"
                    : null
                }`}
                asChild
              >
                <Link href={"/portal/domain-skills-library"}>
                  Domain Skills
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="ml-4 h-full flex flex-row items-center gap-2">
            <div className="flex flex-row gap-2 items-center">
              <Switch
                checked={helpModeState}
                onCheckedChange={(checked) => {
                  updateHelpModeState(checked);
                }}
                id="help-mode"
              />
              <p className="max-sm:text-xs ">Help mode</p>
            </div>
          </div>
      </div>
    </div>
  );
};

export default NavBar;
