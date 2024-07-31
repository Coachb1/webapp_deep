"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import {
  BarChartIcon,
  ClipboardListIcon,
  LightbulbIcon,
  Loader,
  LogIn,
  LogOut,
  SearchIcon,
  UserCircle2,
  UserIcon,
} from "lucide-react";
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
import { ReactElement, useEffect, useState } from "react";
import Feedback from "./feedback/Feedback";
import Widgets from "@/components/Widgets";
import Script from "next/script";
import DeepDive from "./engagement-survey/DeepDive";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

export const UnAuth = ({ user }: any) => {
  return (
    <div className="bg-white min-h-screen h-full max-sm:h-full max-sm:min-h-screen flex flex-col items-center justify-center text-center">
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

export const DemoPage = ({ user }: any) => {
  return (
    <div className="bg-white min-h-screen h-full max-sm:h-full max-sm:min-h-screen flex flex-col items-center justify-center text-center">
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
          <p>
            Thank you for your interest in the trial. A team member wll reach
            out to you for providing a custom onboarding experience.
          </p>
        </div>
      </MaxWidthWrapper>{" "}
    </div>
  );
};

export const LoginWall = () => {
  const pathname = usePathname();
  const [botId, setBotId] = useState("");
  useEffect(() => {
    console.log(pathname);
    const coachScribe = document.getElementsByClassName(
      "coachbots-coachscribe"
    )[0];
    if (pathname.includes("/feedback") || pathname.includes("/feedback/")) {
      coachScribe.removeAttribute("style");
      if (pathname === "/feedback") {
        console.log("DYN");
        setBotId("feedback-d55cd-aravsharma");
      } else {
        const bot_id = pathname.split("/")[2];
        setBotId(bot_id);
      }
    } else if (
      pathname.includes("/engagement-survey") ||
      pathname.includes("/engagement-survey/")
    ) {
      coachScribe.removeAttribute("style");
      if (pathname === "/engagement-survey") {
        setBotId("<deepdive bot_id>");
      } else {
        const bot_id = pathname.split("/")[2];
        setBotId(bot_id);
      }
    }
  }, []);

  const items = [
    {
      title: "Join The Network",
      description:
        "Join the network as a coach or coachee. The coaches create their avatars for interim sessions or initial matches. Users can request their subject matter bots.",
      header: <h3 className="text-xl font-bold text-gray-500">01</h3>,
      icon: <UserIcon className=" text-3xl mb-4" />,
    },
    {
      title: "Exchange Notes & Exercises",
      description:
        "Exchange notes based on your live sessions or just communicate. The notes are augmented with simulations for the users to practice in context to the notes.",
      header: <h3 className="text-xl font-bold text-gray-500">02</h3>,
      icon: <ClipboardListIcon className=" text-3xl mb-4" />,
    },
    {
      title: "Develop Learning Plan",
      description:
        "Just want to get some feedback? Create your feedback page and collect valuable feedback from your extended network. Use the same to create your own development plan with recommendations.",
      header: <h3 className="text-xl font-bold text-gray-500">03</h3>,
      icon: <LightbulbIcon className=" text-3xl mb-4" />,
    },
    {
      title: "Explore & Practice Simulations",
      description:
        "Explore simulations for any use case for your team, Use the library, create your own or use simulations based on existing learning resources.",
      header: <h3 className="text-xl font-bold text-gray-500">04</h3>,
      icon: <SearchIcon className=" text-3xl mb-4" />,
    },
    {
      title: "Track Your Progress",
      description:
        "Track your skill scores based on simulations or interactions with coaches. Display your feedback wall and also improve based on critical feedback.",
      header: <h3 className="text-xl  font-bold text-gray-500">05</h3>,
      icon: <BarChartIcon className=" text-3xl mb-4" />,
    },
  ];

  return (
    <>
      {!pathname.includes("/feedback") &&
        !pathname.includes("/feedback/") &&
        !pathname.includes("/engagement-survey") &&
        !pathname.includes("/engagement-survey/") && (
          <div className="bg-white mt-4 max-sm:mt-16 min-h-screen h-full max-sm:h-full max-sm:min-h-screen flex flex-col items-center justify-center text-center">
            <MaxWidthWrapper className="flex flex-col items-center justify-center text-center">
              <h1 className="text-[#2DC092] border-2 border-[#2DC092] p-[3px] text-xl font-extrabold">
                <span className="bg-[#2DC092] text-white text-lg font-bold mr-[4px] p-[4px]">
                  COACH
                </span>
                BOTS
              </h1>
              <p className="mt-4 text-3xl">
                AI First Coaching Based Engagement Platform
              </p>
              <div className="p-4 max-sm:px-6">
                <h2 className="text-2xl font-bold text-center text-[#034078] mb-4">
                  How it works?
                </h2>
                <BentoGrid className="w-[100%] mx-auto">
                  {items.map((item, i) => (
                    <BentoGridItem
                      key={i}
                      title={item.title}
                      description={item.description}
                      header={item.header}
                      icon={item.icon}
                      className={`${i === 1 || i === 6 ? "md:col-span-2" : ""}`}
                    />
                  ))}
                </BentoGrid>
              </div>
              <div className="my-4 max-sm:mb-12">
                <LoginLink postLoginRedirectURL={pathname}>
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
                </LoginLink>
              </div>
            </MaxWidthWrapper>{" "}
          </div>
        )}

      {(pathname.includes("/feedback") || pathname.includes("/feedback/")) && (
        <>
          <Feedback renderType="dynamic" />
          <Widgets from="feedbackDynamic" />
          <Script src="../widget/coachbots-stt-widget.js" />
          <div data-bot-id={botId} className="coachbots-coachscribe"></div>
        </>
      )}

      {(pathname.includes("/engagement-survey") ||
        pathname.includes("/engagement-survey/")) && (
        <>
          <DeepDive renderType="dynamic" />
          <Widgets from="deepdiveDynamic" />
          <Script src="../widget/coachbots-stt-widget.js" />
          <div data-bot-id={botId} className="coachbots-coachscribe"></div>
        </>
      )}
    </>
  );
};

export const LoadingComponent = () => {
  return (
    <div className="bg-white min-h-screen h-full max-sm:h-full max-sm:min-h-screen flex flex-col items-center justify-center text-center">
      <MaxWidthWrapper className="flex flex-col items-center justify-center text-center">
        <div className="flex items-center">
          <Loader className="animate-spin h-4 w-4 inline mr-2" />{" "}
          <span>loading...</span>
        </div>
      </MaxWidthWrapper>{" "}
    </div>
  );
};
