"use client";

import { Menu, MessageSquarePlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BotsNavigation = ({ user }: any) => {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`fixed w-full flex items-center justify-end p-4 h-6 py-8 !z-[800] gap-2 max-sm:hidden ${
          pathname === "/content-library" ? "mr-5" : ""
        }  ${!user && pathname === "/content-library" ? "mr-16 " : ""}`}
      >
        <Link href={"/content-library"}>
          <Button
            variant={"outline"}
            className={` h-8 px-2 ${
              pathname === "/content-library"
                ? "border border-gray-500 shadow-md"
                : ""
            } `}
          >
            {" "}
            Content Library{" "}
          </Button>
        </Link>
        <Link href={"/"}>
          <Button
            variant={"outline"}
            className={` h-8 px-2 ${
              pathname === "/" || pathname.includes("/coach")
                ? "border border-gray-500 shadow-md"
                : ""
            } `}
          >
            {" "}
            Avatar Bot{" "}
          </Button>
        </Link>
        <Link href={"/feedback"}>
          <Button
            variant={"outline"}
            className={` h-8 px-2 ${
              pathname.includes("/feedback")
                ? "border border-gray-500 shadow-md"
                : ""
            } `}
          >
            {" "}
            Feedback Bot{" "}
          </Button>
        </Link>
      </div>
      <div
        className={`hidden fixed w-full max-sm:flex items-center justify-end p-4 h-6 py-8 !z-[800] gap-2 ${
          pathname === "/content-library" ? "mr-5" : ""
        } ${!user && pathname === "/content-library" ? "mr-16 " : ""}`}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="overflow-visible !z-[999]">
            <div className="w-fit h-fit p-[4px] bg-gray-200 rounded-md">
              <Menu className="h-6 w-6" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-[999]">
            <DropdownMenuItem
              asChild
              className={`${
                pathname === "/content-library" ? "bg-gray-200" : null
              }`}
            >
              <Link href={"/content-library"}>Content Library</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={"/"}
                className={`${
                  pathname === "/" || pathname.includes("/coach")
                    ? "bg-gray-200"
                    : null
                }`}
              >
                {" "}
                Avatar Bot
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className={`${
                pathname.includes("/feedback") ? "bg-gray-200" : null
              }`}
            >
              <Link href={"/feedback"}> Feedback Bot</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default BotsNavigation;
