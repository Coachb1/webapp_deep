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
import { getClientUserInfo } from "@/lib/utils";

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

  //client based restrictions
  const [restrictedPages, setRestrictedPages] = useState<string | null>(null);
  const [restrictedFeatures, setRestrictedFeatures] = useState<string | null>(
    null
  );

  const [scrolled, setScrolled] = useState<number>(0);
  useEffect(() => {
    if (user) {
      getClientUserInfo(user.email)
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "getClientUserInfo - NetworkNav");

          setRestrictedPages(data.data.user_info[0].restricted_pages);
          setRestrictedFeatures(data.data.user_info[0].restricted_features);
        });
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
        "border-b border-gray-400 backdrop-blur-lg"
      } `}
    >
      <div className="flex flex-row gap-2 max-sm:hidden ">
        {!restrictedPages?.includes("Network Directory") && (
          <Button
            variant={"outline"}
            className={` h-8 max-sm:text-sm ${
              pathname === "/" ? "border border-gray-500 shadow-md" : ""
            } `}
            // onClick={() => {
            //   router.push("/");
            // }}
            asChild
          >
            <Link href={"/"}>Network Directory</Link>
          </Button>
        )}
        {!restrictedPages?.includes("Explore") && (
          <Button
            variant={"outline"}
            className={` h-8 max-sm:text-sm ${
              pathname.includes("/content-library")
                ? "border border-gray-500 shadow-md"
                : ""
            } `}
            // onClick={() => {
            //   router.push("/content-library");
            // }}
            asChild
          >
            <Link href={"/content-library"}>Explore</Link>
          </Button>
        )}
        {!restrictedPages?.includes("Simulation") && (
          <Button
            variant={"outline"}
            className={` h-8 max-sm:text-sm ${
              pathname.includes("/library")
                ? "border border-gray-500 shadow-md"
                : ""
            } `}
            // onClick={() => {
            //   router.push("/library");
            // }}
            asChild
          >
            <Link href={"/library"}>Simulation</Link>
          </Button>
        )}
        {!restrictedPages?.includes("Guides") && (
          <Button
            variant={"outline"}
            className={` h-8 max-sm:text-sm ${
              pathname.includes("/guides")
                ? "border border-gray-500 shadow-md"
                : ""
            } `}
            // onClick={() => {
            //   router.push("/guides");
            // }}
            asChild
          >
            <Link href={"/guides"}>Guides</Link>
          </Button>
        )}
        {!restrictedPages?.includes("Quick Learn") && (
          <Button
            variant={"outline"}
            className={` h-8 max-sm:text-sm ${
              pathname.includes("/create-scenario")
                ? "border border-gray-500 shadow-md"
                : ""
            } `}
            // onClick={() => {
            //   router.push("/create-scenario");
            // }}
            asChild
          >
            <Link href={"/create-scenario"}>Quick Learn</Link>
          </Button>
        )}
      </div>
      <div className="hidden max-sm:block">
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
                <Link
                  href={"/"}
                  // onClick={() => {
                  //   router.push("/");
                  // }}
                >
                  {" "}
                  Network directory
                </Link>
              </DropdownMenuItem>
            )}
            {!restrictedPages?.includes("Explore") && (
              <DropdownMenuItem
                className={`${
                  pathname === "/content-library" ? "bg-gray-200" : null
                }`}
                asChild
              >
                <Link
                  href={"/content-library"}
                  // onClick={() => {
                  //   router.push("/content-library");
                  // }}
                >
                  Explore
                </Link>
              </DropdownMenuItem>
            )}
            {!restrictedPages?.includes("Simulation") && (
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
                  Simulation
                </Link>
              </DropdownMenuItem>
            )}
            {!restrictedPages?.includes("Guides") && (
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
            )}
            {!restrictedPages?.includes("Quick Learn") && (
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
                  Quick Learn
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {!restrictedPages?.includes("Quick Learn") && (
        <div className="ml-4">
          <NavProfile user={user} />
        </div>
      )}
    </div>
  );
};

export default NetworkNav;
