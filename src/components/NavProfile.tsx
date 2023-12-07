"use client";

import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";
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
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Loader, User, User2Icon, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";

//GLOBAL USER - *.js
interface CustomWindow extends Window {
  user?: any;
}

declare let window: CustomWindow;

const NavProfile = () => {
  const { user, isLoading } = useKindeBrowserClient();

  useEffect(() => {
    if (user) {
      window.user = user;
    }
  });

  if (isLoading) {
    return <Loader className="h-4 w-4 animate-spin" />;
  }

  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="overflow-visible">
            {/* <Avatar className="relative hover:cursor-pointer">
              {user.picture ? (
                <AvatarImage
                  src={user.picture}
                  alt="profile picture"
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <AvatarFallback>
                  <span className="">{user.given_name}</span>
                  <User className="h-6 w-4 text-zinc-900" />
                </AvatarFallback>
              )}
            </Avatar> */}
            <UserCircle2 className="h-6 w-6 text-zinc-700" />
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
              <Link href={"/profile"}>Your profile</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <LogoutLink>Logout</LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant={"default"} className={cn("text-xs h-8 px-4")}>
          <RegisterLink>Log in</RegisterLink>
        </Button>
      )}
    </>
  );
};

export default NavProfile;
