"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { LogOut, User, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavProfile = ({ user }: any) => {
  const pathname = usePathname();
  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="overflow-visible !z-[999]">
            <div className=" p-[4px]">
              <UserCircle2 className="h-6 w-6 text-zinc-700 z-[999]" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="flex items-center justify-center gap-2 p-2">
              <div className="flex flex-col space-x-0.5 leading-none">
                {user.given_name && (
                  <p className="font-medium text-sm text-black">
                    {user.given_name}
                  </p>
                )}
                {user.email && (
                  <p className="w-[200px] truncate text-xs text-slate-700">
                    {user.email}
                  </p>
                )}
              </div>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href={"/profile"}>
                {" "}
                <User className="h-4 w-4 mr-2" /> Your profile
              </Link>
            </DropdownMenuItem>
            {/* {pathname !== "/content-library" && (
              <DropdownMenuItem asChild>
                <Link href={"/content-library"}> ⚡️ Content Library</Link>
              </DropdownMenuItem>
            )}
            {pathname !== "/feedback" &&
              !pathname.includes("/feedback/feedback") && (
                <DropdownMenuItem asChild>
                  <Link href={"/feedback"}>
                    {" "}
                    <MessageSquarePlusIcon className="h-4 w-4 mr-2" /> Feedback
                  </Link>
                </DropdownMenuItem>
              )}
            {pathname !== "/" && !pathname.includes("/coach") && (
              <DropdownMenuItem asChild>
                <Link href={"/"}>
                  {" "}
                  <span className="mr-2">👩‍🏫</span> Coach
                </Link>
              </DropdownMenuItem>
            )} */}
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <LogoutLink>
                {" "}
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant={"default"} className={cn("text-xs h-8 px-4 z-50")}>
          <RegisterLink postLoginRedirectURL={pathname}>Log in</RegisterLink>
        </Button>
      )}
    </>
  );
};

export default NavProfile;
