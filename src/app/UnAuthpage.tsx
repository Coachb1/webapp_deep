"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import {
  AwardIcon,
  FileSearchIcon,
  HeartHandshakeIcon,
  LineChartIcon,
  Loader,
  LogIn,
  LogOut,
  MonitorPlayIcon,
  UserCircle2,
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
import { useEffect, useState } from "react";
import Feedback from "./feedback/Feedback";
import Widgets from "@/components/Widgets";
import Script from "next/script";
import DeepDive from "./engagement-survey/DeepDive";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import KnowledgeBot from "./knowledge-bot/KnowledgeBot";
import { baseURL, basicAuth } from "@/lib/utils";

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
          BOT
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
          BOT
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
  const [knowledgeBotApiData, setKnowledgeBotApiData] = useState();
  const [knowledgeBotDatLoading, setKnowledgeBotDataLoading] = useState(true);

  const [showKnowledgBot, setShowKnowledgeBot] = useState(false);

  const knowledgBotApi = async (botID: string) => {
    const response = await fetch(
      `${baseURL}/accounts/get-bot-details/?bot_id=${botID}`,
      {
        method: "GET",
        headers: {
          Authorization: basicAuth,
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("DATA FROM UNAUTH : ", data);
      setKnowledgeBotApiData(data);

      const coachScribe = document.getElementsByClassName(
        "coachbots-coachscribe"
      )[0];
      if (data.data.allow_public_access && coachScribe) {
        coachScribe.removeAttribute("style");
      }

      if (data.data.allow_public_access) {
        setShowKnowledgeBot(true);
      } else {
        setShowKnowledgeBot(false);
      }
      setKnowledgeBotDataLoading(false);
    } else {
      setKnowledgeBotDataLoading(false);
    }
  };

  useEffect(() => {
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
    } else if (
      pathname.includes("/knowledge-bot") ||
      pathname.includes("/knowledge-bot/")
    ) {
      if (pathname === "/knowledge-bot") {
        setBotId("knowledge-c89fd-flyover-project-tracker");
        knowledgBotApi("knowledge-c89fd-flyover-project-tracker");
      } else if (pathname.includes("/knowledge-bot/knowledge")) {
        console.log("COMES HERE");
        const bot_id = pathname.split("/")[2];
        setBotId(bot_id);
        knowledgBotApi(bot_id);
      }
    }
  }, []);

  
  
  const items = [
    {
      title: "Rehearse for Your Reality",
      description:
        "This is more than a library; it's your private workshop. We partner with you to build and refine hyper-realistic simulations that mirror your unique culture, language, and business challenges.",
      header: <h3 className="text-xl font-bold text-gray-500">01</h3>,
      icon: <MonitorPlayIcon className=" text-3xl mb-4" />,
    },
    {
      title: "Practice with Purpose, Not Just Theory",
      description:
        "Move beyond generic lessons. Engage in dynamic, AI-powered roleplay designed to build the specific behavioral skills needed to execute your company's most critical strategies.",
      header: <h3 className="text-xl font-bold text-gray-500">02</h3>,
      icon: <FileSearchIcon className=" text-3xl mb-4" />,
    },
    {
      title: "Receive Actionable, Data-Driven Insights",
      description:
        "After each practice session, receive objective feedback that goes beyond a simple pass/fail. Our reports are designed to be a starting point for powerful coaching and collaborative development conversations.",
      header: <h3 className="text-xl font-bold text-gray-500">03</h3>,
      icon: <HeartHandshakeIcon className=" text-3xl mb-4" />,
    },
    {
      title: `Build a Living "Readiness" Playbook`,
      description:
        "This is not a static course. Together, we will build a growing library of your team's best practices, creating a dynamic, always-on resource that ensures your leaders are ready for what's next.",
      header: <h3 className="text-xl font-bold text-gray-500">04</h3>,
      icon: <AwardIcon className=" text-3xl mb-4" />,
    },
    {
      title: "Partner to Measure and Elevate Performance",
      description:
        "Our goal is your goal. We work with you to track tangible improvement in core leadership competencies, ensuring our collaborative efforts translate into measurable business impact.",
      header: <h3 className="text-xl  font-bold text-gray-500">05</h3>,
      icon: <LineChartIcon className=" text-3xl mb-4" />,
    },
  ];
  

  const LoginUI = () => {
    return (
      <div className="bg-white mt-4 max-sm:mt-16 min-h-screen h-full max-sm:h-full max-sm:min-h-screen flex flex-col items-center justify-center text-center">
        <MaxWidthWrapper className="flex flex-col items-center justify-center text-center">
          <h1 className="text-[#2DC092] border-2 border-[#2DC092] p-[3px] text-xl font-extrabold">
            <span className="bg-[#2DC092] text-white text-lg font-bold mr-[4px] p-[4px]">
              COACH
            </span>
            BOT
          </h1>
          <p className="mt-4 text-3xl">
            CONTINUOUS ENABLEMENT PLATFORM
          </p>
          <div className="my-4 max-sm:mb-12">
            <LoginLink>
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
          {/* <h2 className="text-2xl font-bold text-center text-[#034078] mb-4">
            How it works?
          </h2> */}
          <div className="p-4 max-sm:px-6">
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
          {/* <div className="my-4 max-sm:mb-12">
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
          </div> */}
        </MaxWidthWrapper>{" "}
      </div>
    );
  };

  return (
    <>
      {!pathname.includes("/feedback") &&
        !pathname.includes("/feedback/") &&
        !pathname.includes("/engagement-survey") &&
        !pathname.includes("/engagement-survey/") &&
        !pathname.includes("/knowledge-bot") && (
          <>
            <LoginUI />
          </>
        )}

      {pathname.includes("/knowledge-bot") &&
        !showKnowledgBot &&
        !knowledgeBotDatLoading && (
          <>
            <LoginUI />
          </>
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

      {pathname.includes("/knowledge-bot") && knowledgeBotDatLoading && (
        <div className="fixed left-0 top-0 flex h-screen w-screen overflow-x-hidden items-center justify-center bg-foreground/30 backdrop-blur-2xl z-50">
          <div className="p-2 bg-gray-300 rounded-md text-sm">
            <Loader className="h-4 w-4 mr-2 animate-spin inline" />
            Please wait while we prepare your coach.
          </div>
        </div>
      )}

      {!knowledgeBotDatLoading && showKnowledgBot && (
        <>
          <KnowledgeBot
            renderType="dynamic"
            apiData={knowledgeBotApiData}
            isLoading={knowledgeBotDatLoading}
          />
          <Widgets from="knowledgeBotDynamic" />
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
