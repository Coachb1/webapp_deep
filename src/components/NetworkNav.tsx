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
            Playground
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
        <Link href="/intake/?type=IDP">
          <Button variant={"outline"} className={`px-1 h-8 max-sm:text-sm`}>
            Individual development Plan
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
              <Link href={"/content-library"}>Playground</Link>
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
              <Link href={"/intake/?type=IDP"}>
                {" "}
                Individual development Plan
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <NavProfile user={user} />
    </div>
  );
};

export default NetworkNav;
