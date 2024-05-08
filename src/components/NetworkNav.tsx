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
import { HelpCircle, Info, Menu } from "lucide-react";
import { TooltipWrapper } from "./TooltipWrapper";
import { useEffect, useState } from "react";
import { CreateOrAssignClientId, getClientUserInfo } from "@/lib/utils";
import { Badge } from "./ui/badge";
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

const NetworkNav = ({ user }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const { updateHelpModeState, helpModeState } = UseHelpMode();

  //client based restrictions
  const [restrictedPages, setRestrictedPages] = useState<string | null>(null);
  const [restrictedFeatures, setRestrictedFeatures] = useState<string | null>(
    null
  );

  const [scrolled, setScrolled] = useState<number>(0);
  useEffect(() => {
    if (user) {
      CreateOrAssignClientId(user.email)
      ?.then((resp) => resp.text())
      .then((result) => {
          console.log(`Success : data:`, result)
          getClientUserInfo(user.email)
            ?.then((res) => res.json())
            .then((data) => {
              console.log(data, "getClientUserInfo - NetworkNav");

              setRestrictedPages(data.data.user_info[0].restricted_pages);
              setRestrictedFeatures(data.data.user_info[0].restricted_features);
            });
      })
      .catch((error) => console.error('Error in create-or-assign-client-id',error));

      
    }
  }, []);

  function handleScroll() {
    var scrolledUp = window.scrollY || window.pageYOffset;
    setScrolled(scrolledUp);
  }

  if (typeof window !== "undefined") {
    windowDec.addEventListener("scroll", handleScroll);
  }

  return (
    <div
      className={`fixed right-0 top-0 z-40 flex h-6 w-full items-center justify-end p-4 py-8   ${
        scrolled > 0 &&
        pathname !== "/library" &&
        pathname !== "/skill-bots" &&
        pathname !== "/guides" &&
        pathname !== "/create-scenario" &&
        "border-b border-gray-400 backdrop-blur-lg"
      } `}
    >
      <div className="flex flex-row gap-2 max-sm:hidden max-lg:hidden ">
        {!restrictedPages?.includes("Network Directory") && (
          <Button
            variant={"outline"}
            className={` h-8 max-sm:text-sm ${
              pathname === "/" ? "border border-gray-500 shadow-md" : ""
            } `}
            asChild
          >
            <Link href={"/"}>Network Directory</Link>
          </Button>
        )}
        {!restrictedPages?.includes("Demo") && (
          <Button
            variant={"outline"}
            className={` h-8 max-sm:text-sm ${
              pathname.includes("/content-library")
                ? "border border-gray-500 shadow-md"
                : ""
            } `}
            asChild
          >
            <Link href={"/content-library"}>Demo</Link>
          </Button>
        )}
        {!restrictedPages?.includes("Library") && (
          <Button
            variant={"outline"}
            className={` h-8 max-sm:text-sm ${
              pathname.includes("/library")
                ? "border border-gray-500 shadow-md"
                : ""
            } `}
            asChild
          >
            <Link href={"/library"}>Library</Link>
          </Button>
        )}
        {!restrictedPages?.includes("Creator Studio") && (
          <Button
            variant={"outline"}
            className={` h-8 max-sm:text-sm ${
              pathname.includes("/create-scenario")
                ? "border border-gray-500 shadow-md"
                : ""
            } `}
            asChild
          >
            <Link href={"/create-scenario"}>Creator Studio </Link>
          </Button>
        )}
      </div>
      <div className="hidden max-sm:block max-lg:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="!z-[999] overflow-visible">
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
            {!restrictedPages?.includes("Demo") && (
              <DropdownMenuItem
                className={`${
                  pathname === "/content-library" ? "bg-gray-200" : null
                }`}
                asChild
              >
                <Link href={"/content-library"}>Demo</Link>
              </DropdownMenuItem>
            )}
            {!restrictedPages?.includes("Library") && (
              <DropdownMenuItem
                className={`${
                  pathname.includes("/library") ? "bg-gray-200" : null
                }`}
                asChild
              >
                <Link
                  href={"/library"}
                  // onClick={() => {
                  //   router.push("/library");
                  // }}
                >
                  {" "}
                  Library
                </Link>
              </DropdownMenuItem>
            )}
            {/* {!restrictedPages?.includes("Guides") && (
              <DropdownMenuItem
                className={`${
                  pathname.includes("/guides") ? "bg-gray-200" : null
                }`}
                asChild
              >
                <Link
                  href={"/guides"}
                  // onClick={() => {
                  //   router.push("/guides");
                  // }}
                >
                  {" "}
                  Guides
                </Link>
              </DropdownMenuItem>
            )} */}
            {!restrictedPages?.includes("Creator Studio") && (
              <DropdownMenuItem
                className={`${
                  pathname.includes("/create-scenario") ? "bg-gray-200" : null
                }`}
                asChild
              >
                <Link
                  href={"/create-scenario"}
                  // onClick={() => {
                  //   router.push("/create-scenario");
                  // }}
                >
                  {" "}
                  Creator Studio{" "}
                  {/* <span>
                    <Badge
                      variant={"default"}
                      className="bg-cyan-400 w-fit text-[10px] p-[2px] ml-1  hover:bg-cyan-400 text-white "
                    >
                      Experimental
                    </Badge>
                  </span> */}
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {!restrictedPages?.includes("Profile") && (
        <div className="ml-4 h-full flex flex-row items-center gap-2">
          <div className="flex flex-row gap-2 items-center">
            <Switch
              checked={helpModeState}
              onCheckedChange={(checked) => {
                updateHelpModeState(checked);
              }}
              id="help-mode"
            />
            <p className="text-sm max-sm:text-xs">Help mode</p>
          </div>
          <div className="h-[20px] w-[2px] bg-gray-500"></div>
          <NavProfile user={user} />
        </div>
      )}
    </div>
  );
};

export default NetworkNav;
