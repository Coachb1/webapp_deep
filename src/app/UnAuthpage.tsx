"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs";
import { Loader, LogIn, LogOut, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
export const UnAuth = ({ user }: any) => {
  return (
    <div className="bg-gray-100 min-h-screen h-full grainy max-sm:h-full max-sm:min-h-screen flex flex-col items-center justify-center text-center">
      <div className="fixed w-full top-0 flex items-center justify-end p-4 h-6 py-8 !z-[800]">
        <div className="flex flex-row gap-1">
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
                <LogoutLink>
                  {" "}
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </LogoutLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <MaxWidthWrapper className="flex flex-col items-center justify-center text-center">
        <h1 className="text-[#2DC092] border-2 border-[#2DC092] p-[3px] text-xl font-extrabold">
          <span className="bg-[#2DC092] text-white text-lg font-bold mr-[4px] p-[4px]">
            COACH
          </span>
          BOTS
        </h1>
        <div className="my-2 max-w-prose">
          {" "}
          <p className="text-lg font-bold text-gray-600">
            Not Authorised!
          </p>{" "}
          <p>
            Your subscription has expired or you are no longer authorized to
            access the platform. Please contact your administrator or email us
            at{" "}
            <Link
              type="email"
              className="underline underline-offset-2 text-blue-500 "
              href="mailto:info@coachbots.com"
            >
              info@coachbots.com
            </Link>
            , if you believe you have reached this message in error.
          </p>
        </div>
      </MaxWidthWrapper>{" "}
    </div>
  );
};

export const LoginWall = () => {
  return (
    <div className="bg-gray-100 min-h-screen h-full grainy max-sm:h-full max-sm:min-h-screen flex flex-col items-center justify-center text-center">
      <MaxWidthWrapper className="flex flex-col items-center justify-center text-center">
        <h1 className="text-[#2DC092] border-2 border-[#2DC092] p-[3px] text-xl font-extrabold">
          <span className="bg-[#2DC092] text-white text-lg font-bold mr-[4px] p-[4px]">
            COACH
          </span>
          BOTS
        </h1>
        <div className="w-[600px] max-sm:w-[320px]">
          <img alt="how-it-works" src={"/intro.svg"} />
        </div>

        <div className="-mt-8 max-sm:mt-0">
          <RegisterLink postLoginRedirectURL={"/"}>
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                <div className="space-y-2">
                  <Button
                    variant={"secondary"}
                    className="border border-gray-200 text-gray-600 font-bold text-xl hover:cursor-pointer w-fit"
                  >
                    Login <LogIn className="ml-2 h-4 w-4 inline" />
                  </Button>
                </div>
              </div>
            </div>
          </RegisterLink>
        </div>
      </MaxWidthWrapper>{" "}
    </div>
  );
};

export const LoadingComponent = () => {
  return (
    <div className="bg-gray-100 min-h-screen h-full grainy max-sm:h-full max-sm:min-h-screen flex flex-col items-center justify-center text-center">
      <MaxWidthWrapper className="flex flex-col items-center justify-center text-center">
        <div className="flex items-center">
          <Loader className="animate-spin h-4 w-4 inline mr-2" />{" "}
          <span>loading...</span>
        </div>
      </MaxWidthWrapper>{" "}
    </div>
  );
};
