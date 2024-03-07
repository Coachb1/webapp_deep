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
      className={`fixed w-full flex items-center justify-end p-4 h-6 py-8 top-0 right-0   ${
        scrolled > 0 &&
        pathname !== "/library" &&
        "backdrop-blur-lg border-b border-gray-400"
      } `}
    >
      {/* <div className="flex flex-row gap-1"></div> */}
      {/* <div className="flex flex-row gap-2"> */}
      <div className="flex flex-row gap-2 max-sm:hidden ">
        <Button
          variant={"outline"}
          className={` h-8 max-sm:text-sm ${
            pathname === "/" ? "border border-gray-500 shadow-md" : ""
          } `}
          onClick={() => {
            router.push("/");
          }}
        >
          Network Directory
        </Button>
        <Button
          variant={"outline"}
          className={` h-8 max-sm:text-sm ${
            pathname.includes("/content-library")
              ? "border border-gray-500 shadow-md"
              : ""
          } `}
          onClick={() => {
            router.push("/content-library");
          }}
        >
          Explore
        </Button>
        <Button
          variant={"outline"}
          className={` h-8 max-sm:text-sm ${
            pathname.includes("/library")
              ? "border border-gray-500 shadow-md"
              : ""
          } `}
          onClick={() => {
            router.push("/library");
          }}
        >
          Simulations
        </Button>
        <Button
          variant={"outline"}
          className={` h-8 max-sm:text-sm ${
            pathname.includes("/create-scenario")
              ? "border border-gray-500 shadow-md"
              : ""
          } `}
          onClick={() => {
            router.push("/create-scenario");
          }}
        >
          Quick Learn
        </Button>
        {/* <TooltipWrapper
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
        />{" "} */}
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
              <div
                onClick={() => {
                  router.push("/");
                }}
              >
                {" "}
                Network directory
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`${
                pathname === "/content-library" ? "bg-gray-200" : null
              }`}
              asChild
            >
              <div
                onClick={() => {
                  router.push("/content-library");
                }}
              >
                Explore
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem
              className={`${
                pathname.includes("/library") ? "bg-gray-200" : null
              }`}
              asChild
            >
              <div
                onClick={() => {
                  router.push("/library");
                }}
              >
                {" "}
                Simulations
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`${
                pathname.includes("/create-scenario") ? "bg-gray-200" : null
              }`}
              asChild
            >
              <div
                onClick={() => {
                  router.push("/create-scenario");
                }}
              >
                {" "}
                Quick Learn
              </div>
            </DropdownMenuItem>

            {/* <DropdownMenuItem asChild>
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
            </DropdownMenuItem> */}
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
