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
import NavProfile, { NavProfileWoProfile } from "./NavProfile";
import { Menu } from "lucide-react";
import { useState } from "react";
import { UseHelpMode } from "@/lib/helpmodeContext";
import { Switch } from "./ui/switch";

interface CustomWindow extends Window {
  user?: any;
  locallStorage?: Storage;
  locationn?: Location;
  userIdFromWebApp?: any;
  addEventListener: Window["addEventListener"];
}

const windowDec: CustomWindow =
  typeof window !== "undefined" ? window : ({} as CustomWindow);

const NetworkNav = ({ user, restrictedPages }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const { updateHelpModeState, helpModeState } = UseHelpMode();

  const [scrolled, setScrolled] = useState<number>(0);

  function handleScroll() {
    var scrolledUp = window.scrollY || window.pageYOffset;

    if (scrolledUp >= 3000) {
      setScrolled(scrolledUp);
    } else if (
      (pathname === "/profile" || pathname === "/content-library") &&
      scrolledUp > 0
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
        // pathname !== "/library" &&
        pathname !== "/skill-bots" &&
        pathname !== "/guides" &&
        // pathname !== "/create-scenario" &&
        "border-b border-gray-400 backdrop-blur-lg"
      } `}
    >
      <Link
        href={"/"}
        className={`pl-12 max-sm:pl-1  ${
          scrolled || pathname !== "/" ? "visible" : "invisible"
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
            BOTS
          </h1>
        </div>
      </Link>
      <div className="flex flex-row">
        <div className="flex flex-row gap-2 max-sm:hidden max-lg:hidden">
          {!restrictedPages?.includes("Network Directory") && (
            <Button
              variant={"outline"}
              className={` h-8 ${
                pathname === "/" ? "border border-gray-500 shadow-md" : ""
              } `}
              asChild
            >
              <Link href={"/"}>Network Directory</Link>
            </Button>
          )}
          {/* {!restrictedPages?.includes("Explore") && (
          <Button
            variant={"outline"}
            className={` h-8 ${
              pathname.includes("/content-library")
                ? "border border-gray-500 shadow-md"
                : ""
            } `}
            asChild
          >
            <Link href={"/content-library"}>Explore</Link>
          </Button>
        )} */}
          {!restrictedPages?.includes("Library") && (
            <Button
              variant={"outline"}
              className={` h-8 ${
                pathname.includes("/library")
                  ? "border border-gray-500 shadow-md"
                  : ""
              } `}
              asChild
            >
              <Link href={"/library"}>Simulations</Link>
            </Button>
          )}
          {!restrictedPages?.includes("Creator Studio") && (
            <Button
              variant={"outline"}
              className={` h-8 ${
                pathname.includes("/create-scenario")
                  ? "border border-gray-500 shadow-md"
                  : ""
              } `}
              asChild
            >
              <Link href={"/create-scenario"}>Studio </Link>
            </Button>
          )}
        </div>
        {!restrictedPages?.includes("Network Directory") ||
          !restrictedPages?.includes("Library") ||
          (!restrictedPages?.includes("Creator Studio") && (
            <div className="hidden max-sm:block max-lg:block">
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className="!z-[999] overflow-visible"
                >
                  <div className="h-fit w-fit rounded-md bg-gray-200 p-[4px]">
                    <Menu className="h-6 w-6" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="z-[999] w-fit">
                  {!restrictedPages?.includes("Network Directory") && (
                    <DropdownMenuItem
                      className={`${pathname === "/" ? "bg-gray-200" : null}`}
                      asChild
                    >
                      <Link href={"/"}> Network directory</Link>
                    </DropdownMenuItem>
                  )}
                  {/* {!restrictedPages?.includes("Explore") && (
              <DropdownMenuItem
                className={`${
                  pathname === "/content-library" ? "bg-gray-200" : null
                }`}
                asChild
              >
                <Link href={"/content-library"}>Explore</Link>
              </DropdownMenuItem>
            )} */}
                  {!restrictedPages?.includes("Library") && (
                    <DropdownMenuItem
                      className={`${
                        pathname.includes("/library") ? "bg-gray-200" : null
                      }`}
                      asChild
                    >
                      <Link href={"/library"}>Simulations</Link>
                    </DropdownMenuItem>
                  )}

                  {!restrictedPages?.includes("Creator Studio") && (
                    <DropdownMenuItem
                      className={`${
                        pathname.includes("/create-scenario")
                          ? "bg-gray-200"
                          : null
                      }`}
                      asChild
                    >
                      <Link href={"/create-scenario"}>Studio</Link>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        {!restrictedPages?.includes("Profile") ? (
          <div className="ml-4 h-full flex flex-row items-center gap-2">
            <div className="flex flex-row gap-2 items-center">
              <Switch
                checked={helpModeState}
                onCheckedChange={(checked) => {
                  updateHelpModeState(checked);
                }}
                id="help-mode"
              />
              <p className="">Help mode</p>
            </div>
            <div className="h-[20px] w-[2px] bg-gray-500"></div>
            <NavProfile restrictedPages={restrictedPages} user={user} />
          </div>
        ) : (
          <NavProfileWoProfile user={user} />
        )}
      </div>
    </div>
  );
};

export default NetworkNav;
