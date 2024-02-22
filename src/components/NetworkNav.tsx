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
import NavProfile from "./NavProfile";
import { Info, Menu } from "lucide-react";
import { TooltipWrapper } from "./TooltipWrapper";
import { useEffect, useState } from "react";

const NetworkNav = ({ user }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [scrolled, setScrolled] = useState<number>(0);

  function handleScroll() {
    var scrolledUp = window.scrollY || window.pageYOffset;
    setScrolled(scrolledUp);
  }

  window.addEventListener("scroll", handleScroll);

  return (
    <div
      className={`fixed w-full flex items-center justify-end p-4 h-6 py-8 top-0 right-0  !z-[700] ${
        scrolled > 0 &&
        pathname !== "/library" &&
        pathname !== "/profile" &&
        "backdrop-blur-lg border-b border-gray-400"
      } `}
    >
      {/* <div className="flex flex-row gap-1"></div> */}
      {/* <div className="flex flex-row gap-2"> */}
      <div className="flex flex-row gap-2 max-sm:hidden  !z-[701]">
        <Link href="/">
          <Button
            variant={"outline"}
            className={` h-8 max-sm:text-sm ${
              pathname === "/" ? "border border-gray-500 shadow-md" : ""
            } `}
          >
            Network Directory
          </Button>
        </Link>{" "}
        <Link href="/content-library">
          <Button
            variant={"outline"}
            className={` h-8 max-sm:text-sm ${
              pathname.includes("/content-library")
                ? "border border-gray-500 shadow-md"
                : ""
            } `}
          >
            Explore
          </Button>
        </Link>{" "}
        <Link href="/library">
          <Button
            variant={"outline"}
            className={` h-8 max-sm:text-sm ${
              pathname.includes("/library")
                ? "border border-gray-500 shadow-md"
                : ""
            } `}
          >
            My Library
          </Button>
        </Link>{" "}
        <Link href="/create-scenario">
          <Button
            variant={"outline"}
            className={` h-8 max-sm:text-sm ${
              pathname.includes("/create-scenario")
                ? "border border-gray-500 shadow-md"
                : ""
            } `}
          >
            Open Simulations
          </Button>
        </Link>{" "}
        <TooltipWrapper
          className="w-60 text-xs"
          tooltipName="Individual development Plan Intake (Login required)"
          body={
            <div>
              <Button
                onClick={() => {
                  router.push("/intake/?type=IDP");
                  console.log(pathname, params.toString());
                }}
                disabled={!user}
                variant={"outline"}
                className={` h-8 max-sm:text-sm ${
                  params.toString().includes("IDP")
                    ? "border border-gray-500 shadow-md"
                    : ""
                } `}
              >
                IDP <Info className="h-4 w-4 ml-2" />
              </Button>
            </div>
          }
        />{" "}
      </div>
      <div className="hidden max-sm:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="overflow-visible !z-[999]">
            <div className="w-fit h-fit p-[4px] bg-gray-200 rounded-md">
              <Menu className="h-6 w-6" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-[999] w-fit">
            <DropdownMenuItem
              className={`${pathname === "/" ? "bg-gray-200" : null}`}
              asChild
            >
              <Link href={"/"}> Network directory</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`${
                pathname === "/content-library" ? "bg-gray-200" : null
              }`}
              asChild
            >
              <Link href={"/content-library"}>Explore</Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              className={`${
                pathname.includes("/library") ? "bg-gray-200" : null
              }`}
              asChild
            >
              <Link href={"/library"}> Library</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`${
                pathname.includes("/create-scenario") ? "bg-gray-200" : null
              }`}
              asChild
            >
              <Link href={"/create-scenario"}> Open Simulations</Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <TooltipWrapper
                className="w-60 text-xs"
                tooltipName="Individual development Plan Intake (Login required)"
                body={
                  <div>
                    <Button
                      onClick={() => {
                        router.push("/intake/?type=IDP");
                      }}
                      disabled={!user}
                      variant={"outline"}
                      className={`h-8 w-full text-start flex flex-row justify-start p-0 pl-2 max-sm:text-sm border-none  ${
                        params.toString().includes("IDP") ? "bg-gray-200" : ""
                      }`}
                    >
                      IDP <Info className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                }
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="ml-4">
        <NavProfile user={user} />
      </div>
      {/* </div> */}
    </div>
  );
};

export default NetworkNav;
