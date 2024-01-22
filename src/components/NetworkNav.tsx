"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import NavProfile from "./NavProfile";
import { Menu } from "lucide-react";

const NetworkNav = ({ user }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="flex flex-row gap-2">
      <div className="flex flex-row gap-2 max-sm:hidden">
        <Link href="/coaches">
          <Button
            variant={"outline"}
            className={` h-8 max-sm:text-sm ${
              pathname.includes("/coaches")
                ? "border border-gray-500 shadow-md"
                : ""
            } `}
          >
            Network Directory
          </Button>
        </Link>{" "}
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none border-none">
            <Button variant={"outline"} className="h-8 max-sm:text-sm">
              Playground
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                router.push(`/`);
              }}
              className={`${pathname === "/" ? "bg-gray-200" : ""} `}
            >
              Avatar Page (Sample)
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                router.push(`/feedback`);
              }}
              className={`${
                pathname.includes("/feedback") ? "bg-gray-200" : ""
              } `}
            >
              Feedback page (Sample)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link href="/content-library">
          <Button
            variant={"outline"}
            className={` h-8 max-sm:text-sm ${
              pathname.includes("/content-library")
                ? "border border-gray-500 shadow-md"
                : ""
            } `}
          >
            Library
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
            Open simulations
          </Button>
        </Link>{" "}
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
              className={`${pathname === "/coaches" ? "bg-gray-200" : null}`}
              asChild
            >
              <Link href={"/coaches"}> Network directory</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <p className="text-sm ml-2">Playground</p>
            <DropdownMenuItem
              className={`${
                (pathname.includes("/coach") && pathname !== "/coaches") ||
                pathname === "/"
                  ? "bg-gray-200"
                  : null
              }`}
              asChild
            >
              <Link href={"/"} className="text-xs">
                {" "}
                - Avatar Page (Sample)
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`${
                pathname.includes("/feedback") ? "bg-gray-200" : null
              }`}
              asChild
            >
              <Link href={"/feedback"} className="text-xs">
                {" "}
                - Feedback Page (Sample)
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={`${
                pathname.includes("/content-library") ? "bg-gray-200" : null
              }`}
              asChild
            >
              <Link href={"/content-library"}> Library</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`${
                pathname.includes("/create-scenario") ? "bg-gray-200" : null
              }`}
              asChild
            >
              <Link href={"/create-scenario"}> Open simulations</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <NavProfile user={user} />
    </div>
  );
};

export default NetworkNav;
