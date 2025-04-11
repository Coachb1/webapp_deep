"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import HeroAccordion from "@/components/HeroAccordion";
import {
  Managerial,
  oneTwoOne,
  roundFeedback,
  meetings,
  Technology,
  Reflection,
  Sales,
  serviceslashConsulting,
  presentation,
  caseStudy,
  DiversityPlus,
  ijp,
  questionPro,
  pms,
  pitch,
  englishSupport,
  DSA,
  DataScience,
  InteractiveVisualSimulation,
  Assessment,
  gamePlay,
  psychAssessment,
  LeadershipPsychometric,
  NewManager,
  TechManager,
  SalesAndService,
  Diversity,
  PresentationTest,
  TopTenRoles,
} from "@/lib/test";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { scrollToView } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

import React, { useEffect, useState } from "react";
import HelpMode from "@/components/HelpMode";
import { useUser } from "@/context/UserContext";
import { Div } from "@/components/ui/moving-border";
import { ExternalLink } from "lucide-react";

const VersionOne = ({ user, helpModeText }: any) => {
  let shouldRenderDiv;
  if (user) {
    const userEmail = user?.email;
    const exclusionEmails = [
      "bagoriarajan@gmail.com",
      "falahsss900@gmail.com",
      "ansariaadil611@gmail.com",
      "testingweb22222@gmail.com",
      // "testingweb11111@gmail.com",
    ];
    const restrictedEmails = ["gmail", "yahoo", "hotmail", "outlook"];
    const domain = userEmail?.split("@")[1];
    const excludedEmail = exclusionEmails.includes(userEmail!);

    const isrestEmail = restrictedEmails.some((restrictedDomain) =>
      domain?.includes(restrictedDomain)
    );

    if (excludedEmail && isrestEmail) {
      shouldRenderDiv = true;
    } else if (!excludedEmail && isrestEmail) {
      shouldRenderDiv = false;
    } else if (!isrestEmail && !excludedEmail) {
      shouldRenderDiv = true;
    }
  }

  const [HelpModeSteps, setHelpModeSteps] = useState<any[]>([]);
  const { userInfo } = useUser();
  useEffect(() => {
    const dynamicHelpText = userInfo.helpText?.demo;
    setHelpModeSteps([
      {
        target: "#user-demos",
        content: dynamicHelpText?.user_demos
          ? dynamicHelpText.user_demos
          : "The platform created simulations and roleplays around various use cases. This is just a representative use case.",
      },
      {
        target: "#system-demos",
        content: dynamicHelpText?.system_demos
          ? dynamicHelpText.system_demos
          : "User or client-created assets, profiles, and avatar-bots in the platform. They are specific to each client setup.",
      },
      {
        target: ".chat-icon",
        content: dynamicHelpText?.coachTalk
          ? dynamicHelpText.coachTalk
          : "Users who want to get feedback about their speech parameters like confidence, etc. should use this widget. Users must give input by speech in this case. The processing speed may be lower. ",
      },
      {
        target: ".chat-icon2",
        content: dynamicHelpText?.coachScribe
          ? dynamicHelpText.coachScribe
          : "Users who use this widget will not get any speech related feedback in their simulation reports. Users can give input via text or speech - in either case it is converted into text. The processing speed is fast & efficient. ",
      },
      {
        target: "#manager-plus",
        disableScrolling: false,
        content: dynamicHelpText?.manager_plus
          ? dynamicHelpText.manager_plus
          : "These sections are where the simulations actual simulations and roleplays curated. The title categorization is for easy access. In this case, the simulations are meant for Manager development. ",
      },
    ]);
  }, []);

  return (
    <>
      <HelpMode steps={HelpModeSteps} forPage="demo" />
      <MaxWidthWrapper className="flex pt-20 flex-col items-center justify-center text-center">
        <h1 className="text-6xl mt-12 font-bold max-sm:text-2xl text-gray-600 ">
        Coaching Simulations Sandbox
        </h1>
        {/* <p className="my-2 text-2xl max-w-prose text-gray-700 max-sm:text-sm max-sm:px-8">
          {" "}
          Toolkits and conversational coaching-learning for any scenario. The{" "}
          <b>User Demo</b> are the user-created avatars and bots, while the{" "}
          <b>System Demo</b> are the role plays and simulations supported by the
          platform algorithm.
        </p> */}

        <Badge className="mt-3 -mb-6 px-4 z-10 rounded-md bg-indigo-500 hover:bg-indigo-500 ">
        User Demo Bots
        </Badge>
        <div
          id="user-demos"
          className="flex flex-row flex-wrap justify-center mt-4 z-[2] gap-2 border-2 border-indigo-400 p-3 rounded-md"
        >
          <Link href="/coach" target="_blank">
            <Button
              className={`h-8 text-sm max-sm:text-xs bg-indigo-400 text-white hover:bg-indigo-300`}
            >
              Coach Avatar <ExternalLink className="ml-2 h-4 w-4 inline" />
            </Button>
          </Link>
          <Link href="/feedback" target="_blank">
            <Button
              className={` h-8 text-sm max-sm:text-xs bg-indigo-400 text-white hover:bg-indigo-300`}
            >
              Kudos Wall
              <ExternalLink className="ml-2 h-4 w-4 inline" />
            </Button>
          </Link>
          <Link
            href="/knowledge-bot/knowledge-d6831-hr-policy-guide-bot"
            target="_blank"
          >
            <Button
              className={` h-8 text-sm max-sm:text-xs bg-indigo-400 text-white hover:bg-indigo-300`}
            >
              HR Policy Bot
              <ExternalLink className="ml-2 h-4 w-4 inline" />
            </Button>
          </Link>
          <Link
            href="/knowledge-bot/knowledge-d6831-tech-innovators-it-compliance-bot"
            target="_blank"
          >
            <Button
              className={` h-8 text-sm max-sm:text-xs bg-indigo-400 text-white hover:bg-indigo-300`}
            >
              Compliance Bot
              <ExternalLink className="ml-2 h-4 w-4 inline" />
            </Button>
          </Link>
          {/* <Link href="https://www.coachbots.com/demo" target="_blank">
            <Button
              className={` h-8 text-sm max-sm:text-xs bg-indigo-400 text-white hover:bg-indigo-300`}
            >
              Psychometric
              <ExternalLink className="ml-2 h-4 w-4 inline" />
            </Button>
          </Link> */}
        </div>

        <Badge className="mt-2 -mb-6 px-4 z-10 rounded-md bg-gray-300 hover:bg-gray-300 text-gray-800">
        Coaching - Simulations Demo
        </Badge>

        <div className="bg-transparent h-4" />
        <div className="w-[80%] max-sm:w-[90%]">
          <Div
            id="system-demos"
            className="text-lg max-sm:text-xs bg-white w-[full]  pt-4 max-sm:pt-0 z-[2] border-2 border-gray-300 py-4 rounded-md"
          >
            <div className="flex justify-center flex-row gap-2 flex-wrap max-sm:mt-8">
              {/* <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                onClick={() => scrollToView("managerplus")}
              >
                Manager+
              </Button>

              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                onClick={() => scrollToView("ijp")}
              >
                IJP/Succession
              </Button>

              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                onClick={() => scrollToView("reflection")}
              >
                Reflection
              </Button>

              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                onClick={() => scrollToView("diversityPlus")}
              >
                Diversity+
              </Button>

              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                onClick={() => scrollToView("qp")}
              >
                Questions Pro
              </Button> */}

              {/* <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                onClick={() => scrollToView("pms")}
              >
                PMS Enabled
              </Button> */}

              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                onClick={() => scrollToView("interactive-visual")}
              >
                Interactive/Video Coaching
              </Button>

              {/* <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                onClick={() => scrollToView("pitch")}
              >
                Pitch+
              </Button> */}

              {/* <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                onClick={() => scrollToView("one-to-one")}
              >
                1:1 Check-ins | Dynamic
              </Button>

              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                onClick={() => scrollToView("tech")}
              >
                Technology
              </Button>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                onClick={() => scrollToView("dsa")}
              >
                DSA
              </Button>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                onClick={() => scrollToView("data-sc")}
              >
                Data Science
              </Button>

              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                onClick={() => scrollToView("sales")}
              >
                Sales
              </Button>

              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                onClick={() => scrollToView("service-c")}
              >
                Service/Consulting
              </Button>

              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                onClick={() => scrollToView("360-feedback")}
              >
                360 Feedback
              </Button>

              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                onClick={() => scrollToView("case-study")}
              >
                Case study | Dynamic
              </Button>

              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                onClick={() => scrollToView("presentation")}
              >
                Presentation
              </Button> */}

              {/* <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                onClick={() => scrollToView("onboarding")}
              >
                Onboarding
              </Button> */}

              {/* <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                onClick={() => scrollToView("meetings")}
              >
                Meetings | Group Discussion
              </Button>

              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                onClick={() => scrollToView("english-support")}
              >
                English Support
              </Button> */}

              {/* <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                onClick={() => scrollToView("assessment")}
              >
                Assessment
              </Button> */}

              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                onClick={() => scrollToView("game-play")}
              >
                Game Play
              </Button>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                onClick={() => scrollToView("psych-assessment")}
              >
                Psych Assessment
              </Button>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                onClick={() => scrollToView("leadership-psychometric")}
              >
                Leadership Plus
              </Button>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                onClick={() => scrollToView("new-manager")}
              >
                New Manager
              </Button>

              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                onClick={() => scrollToView("tech-manager")}
              >
                Tech Manager
              </Button>

              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                onClick={() => scrollToView("sales-service")}
              >
                Sales & Service
              </Button>

              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                onClick={() => scrollToView("diversity")}
              >
                Diversity
              </Button>

              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                onClick={() => scrollToView("presentation-2")}
              >
                Presentation
              </Button>

              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                onClick={() => scrollToView("top-10-roles")}
              >
                Top 10 Roles
              </Button>

            </div>
          </Div>
        </div>
      </MaxWidthWrapper>
      <div className="flex flex-row max-sm:flex-col w-[80%] max-lg:w-[75%] max-sm:w-full mx-auto">
        <div className="w-full">
          {/* <div id="managerplus">
            <HeroAccordion
              id="manager-plus"
              badgeText="Manager+"
              user={user ? true : false}
              tests={Managerial}
            />
          </div>
          <div id="ijp">
            <HeroAccordion
              badgeText="IJP/Succession"
              user={user ? true : false}
              tests={ijp}
            />
          </div>
          <div id="reflection">
            <HeroAccordion
              badgeText="Reflection"
              user={user ? true : false}
              tests={Reflection}
            />
          </div>
          <div id="diversityPlus">
            <HeroAccordion
              badgeText="Diversity+"
              user={user ? true : false}
              tests={DiversityPlus}
            />
          </div>
          <div id="qp">
            <HeroAccordion
              badgeText="Questions Pro"
              user={user ? true : false}
              tests={questionPro}
            />
          </div> */}
          {/* <div id="pms">
            <HeroAccordion
              badgeText="PMS Enabled"
              user={user ? true : false}
              tests={pms}
            />
          </div> */}
          <div id="interactive-visual">
            <HeroAccordion
              badgeText="Interactive/Video Coaching"
              user={user ? true : false}
              tests={InteractiveVisualSimulation}
            />
          </div>
          {/* <div id="pitch">
            <HeroAccordion
              badgeText="Pitch+"
              user={user ? true : false}
              tests={pitch}
            />
          </div>
          <div id="one-to-one">
            <HeroAccordion
              badgeText="1:1 Check-ins | Dynamic"
              user={user ? true : false}
              tests={oneTwoOne}
            />
          </div>
          <div id="tech">
            <HeroAccordion
              badgeText="Technology"
              user={user ? true : false}
              tests={Technology}
            />
          </div>
          <div id="dsa">
            <HeroAccordion
              badgeText="DSA"
              user={user ? true : false}
              tests={DSA}
            />
          </div>
          <div id="data-sc">
            <HeroAccordion
              badgeText="Data Science"
              user={user ? true : false}
              tests={DataScience}
            />
          </div>
          <div id="sales">
            <HeroAccordion
              badgeText="Sales"
              user={user ? true : false}
              tests={Sales}
            />
          </div>

          <div id="service-c">
            <HeroAccordion
              badgeText="Service/Consulting"
              user={user ? true : false}
              tests={serviceslashConsulting}
            />
          </div>
          <div id="360-feedback">
            <HeroAccordion
              badgeText="360 Feedback"
              user={user ? true : false}
              tests={roundFeedback}
            />
          </div>
          <div id="case-study">
            <HeroAccordion
              badgeText="Case study | Dynamic"
              user={user ? true : false}
              tests={caseStudy}
            />
          </div>
          <div id="presentation">
            <HeroAccordion
              badgeText="Presentation"
              user={user ? true : false}
              tests={presentation}
            />
          </div> */}
          {/* <div id="onboarding">
            <HeroAccordion
              badgeText="Onboarding"
              user={user ? true : false}
              tests={onBoarding}
            />
          </div> */}
          {/* <div id="meetings">
            <HeroAccordion
              badgeText=" Meetings | Group Discussion"
              user={user ? true : false}
              tests={meetings}
            />
          </div>
          <div id="english-support">
            <HeroAccordion
              badgeText="English Support"
              user={user ? true : false}
              tests={englishSupport}
            />
          </div> */}
          {/* <div id="assessment">
            <HeroAccordion
              badgeText="Assessment"
              user={user ? true : false}
              tests={Assessment}
            />
          </div> */}
          <div id="game-play">
            <HeroAccordion
              badgeText="Game Play"
              user={user ? true : false}
              tests={gamePlay}
            />
          </div>

          <div id="psych-assessment">
            <HeroAccordion
              badgeText="Psych Assessment"
              user={user ? true : false}
              tests={psychAssessment}
            />
          </div>
          <div id="leadership-psychometric">
            <HeroAccordion
              badgeText="Leadership Plus"
              user={user ? true : false}
              tests={LeadershipPsychometric}
            />
          </div>
          <div id="new-manager">
            <HeroAccordion
              badgeText="New Manager"
              user={user ? true : false}
              tests={NewManager}
            />
          </div>

          <div id="tech-manager">
            <HeroAccordion
              badgeText="Tech Manager"
              user={user ? true : false}
              tests={TechManager}
            />
          </div>

          <div id="sales-service">
            <HeroAccordion
              badgeText="Sales & Service"
              user={user ? true : false}
              tests={SalesAndService}
            />
          </div>

          <div id="diversity">
            <HeroAccordion
              badgeText="Diversity"
              user={user ? true : false}
              tests={Diversity}
            />
          </div>

          <div id="presentation-2">
            <HeroAccordion
              badgeText="Presentation"
              user={user ? true : false}
              tests={PresentationTest}
            />
          </div>

          <div id="top-10-roles">
            <HeroAccordion
              badgeText="Top 10 Roles"
              user={user ? true : false}
              tests={TopTenRoles}
            />
          </div>

        </div>
      </div>
    </>
  );
};

export default VersionOne;
