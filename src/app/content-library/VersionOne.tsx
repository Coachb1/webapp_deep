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
  DescoveryPlus,
  Sales,
  serviceslashConsulting,
  frontLineStaff,
  immersive,
  presentation,
  caseStudy,
  DiversityPlus,
  onBoarding,
  ijp,
  questionPro,
  pms,
  pitch,
  englishSupport,
} from "@/lib/test";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { baseURL, basicAuth, getUserAccount } from "@/lib/utils";
import NetworkNav from "@/components/NetworkNav";

const VersionOne = ({ user }: any) => {
  const [groupList, setGroupList] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      getUserAccount(user)
        .then((res) => res.json())
        .then((data) => {
          fetch(
            `${baseURL}/accounts/get-client-information/?for=user_info&user_id=${data.uid}`,
            {
              headers: {
                Authorization: basicAuth,
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              console.log("USER INFO FOR AUTH ACESS", data);
            });
        });
    }
  }, []);

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

  return (
    <div className="bg-gray-100 min-h-[120vh] h-full grainy max-sm:h-full max-sm:min-h-screen pb-16">
      <div className="fixed w-full flex items-center justify-end p-4 h-6 py-8 !z-[800]">
        {!user && (
          <Badge
            variant={"secondary"}
            className="bg-[#2DC092] absolute right-20 h-6 text-white  hover:bg-[#2DC092] z-50 max-sm:text-[10px] max-sm:h-10 truncate mt-[5.5rem] -mr-16"
          >
            ✨ Sign up to get the EQ Acess{" "}
            <br className="hidden max-sm:inline" /> (Workplace emails only)
            <ArrowUp className="ml-2 w-4 h-4" />
          </Badge>
        )}
        <>
          <NetworkNav user={user} />
        </>
      </div>

      <MaxWidthWrapper className="flex pt-20 flex-col items-center justify-center text-center">
        <h1 className="text-[#2DC092] border-2 border-[#2DC092] p-[3px] text-xl font-extrabold mt-10 mb-6">
          <span className="bg-[#2DC092] text-white text-lg font-bold mr-[4px] p-[4px]">
            COACH
          </span>
          BOTS
        </h1>

        <h1 className="text-5xl mt-0 font-bold md:text-6xl lg:text-4xl  max-sm:text-2xl text-gray-600 ">
          Learning Simulations Playground
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg max-sm:px-8">
          {" "}
          Toolkits and conversational coaching-learning for any scenario.
        </p>

        <div className="flex flex-row max-sm:flex-wrap max-sm:justify-center mt-4 z-50 gap-2">
          <Link href="/coach" target="_blank">
            <Button
              className={`h-8 text-sm max-sm:text-xs bg-indigo-400 text-white hover:bg-indigo-300`}
            >
              AI-Frame
            </Button>
          </Link>
          <Link
            href="/coach/coach-d54cd-aravsharma?is_audio=true"
            target="_blank"
          >
            <Button
              className={` h-8 text-sm max-sm:text-xs bg-indigo-400 text-white hover:bg-indigo-300`}
            >
              AI-Frame (Audio enabled)
            </Button>
          </Link>
          <Link href="/feedback" target="_blank">
            <Button
              className={` h-8 text-sm max-sm:text-xs bg-indigo-400 text-white hover:bg-indigo-300`}
            >
              Feedback Page
            </Button>
          </Link>
          <Link href="/knowledge-bot" target="_blank">
            <Button
              className={` h-8 text-sm max-sm:text-xs bg-indigo-400 text-white hover:bg-indigo-300`}
            >
              Knowledge bot (User generated)
            </Button>
          </Link>
          <Link href="/knowledge-bot" target="_blank">
            <Button
              className={` h-8 text-sm max-sm:text-xs bg-indigo-400 text-white hover:bg-indigo-300`}
            >
              New Manager (Role bot)
            </Button>
          </Link>
        </div>

        <div className="text-lg w-[80%] max-sm:w-full mt-4 max-sm:mt-0 z-50">
          <div className="flex justify-center flex-row gap-2 flex-wrap max-sm:mt-8">
            <Link href={"#managerplus"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                Manager+
              </Button>
            </Link>
            <Link href={"#ijp"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                IJP/Succession
              </Button>
            </Link>
            <Link href={"#reflection"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                Reflection
              </Button>
            </Link>
            <Link href={"#diversityPlus"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                Diversity+
              </Button>
            </Link>
            <Link href={"#qp"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                Questions Pro
              </Button>
            </Link>
            <Link href={"#pms"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                PMS enabled
              </Button>
            </Link>
            {/* <Link href={"#coachingplus"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                Coaching+
              </Button>
            </Link> */}
            <Link href={"#pitch"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                Pitch+
              </Button>
            </Link>
            <Link href={"#discoveryPlus"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                Discovery+ | MCQ
              </Button>
            </Link>
            <Link href={"#one-to-one"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                1:1 Check-ins | Dynamic
              </Button>
            </Link>
            <Link href={"#tech"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                Technology
              </Button>
            </Link>
            <Link href={"#sales"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                Sales
              </Button>
            </Link>
            <Link href={"#frontline-staff"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                Frontline Staff &#40;Hindi&#41;
              </Button>
            </Link>
            <Link href={"#service-c"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                Service/Consulting
              </Button>
            </Link>
            <Link href={"#360-feedback"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                360 Feedback
              </Button>
            </Link>
            <Link href={"#case-study"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                Case study | Dynamic
              </Button>
            </Link>
            <Link href={"#presentation"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                Presentation
              </Button>
            </Link>
            {/* <Link href={"#immersive"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                Immersive
              </Button>
            </Link> */}
            <Link href={"#onboarding"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                Onboarding
              </Button>
            </Link>
            <Link href={"#meetings"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                Meetings | Dynamic
              </Button>
            </Link>
            <Link href={"#english-support"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                English Support
              </Button>
            </Link>

            {/* {shouldRenderDiv && (
              <Link href={"/create-scenario"}>
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                    <div className="space-y-2">
                      <Button
                        variant={"secondary"}
                        className="border border-gray-200 h-8 hover:cursor-pointer"
                      >
                        Create your own scenario
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            )} */}
          </div>
        </div>
      </MaxWidthWrapper>
      <div className="flex flex-row max-sm:flex-col w-[80%] max-sm:w-full mx-auto">
        <div className="w-full">
          <div id="managerplus">
            <HeroAccordion
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
          </div>
          <div id="pms">
            <HeroAccordion
              badgeText="PMS Enabled"
              user={user ? true : false}
              tests={pms}
            />
          </div>
          {/* <div id="coachingplus">
            <HeroAccordion
              badgeText="Coaching+"
              user={user ? true : false}
              tests={coachingPlus}
            />
          </div> */}
          <div id="pitch">
            <HeroAccordion
              badgeText="Pitch+"
              user={user ? true : false}
              tests={pitch}
            />
          </div>
          <div id="discoveryPlus">
            <HeroAccordion
              badgeText="Discovery+ | MCQ"
              user={user ? true : false}
              tests={DescoveryPlus}
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
          <div id="sales">
            <HeroAccordion
              badgeText="Sales"
              user={user ? true : false}
              tests={Sales}
            />
          </div>
          <div id="frontline-staff">
            <HeroAccordion
              badgeText="Frontline Staff(Hindi)"
              user={user ? true : false}
              tests={frontLineStaff}
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
          </div>
          {/* <div id="immersive">
            <HeroAccordion
              badgeText="Immersive "
              user={user ? true : false}
              tests={immersive}
            />
          </div> */}
          <div id="onboarding">
            <HeroAccordion
              badgeText="Onboarding"
              user={user ? true : false}
              tests={onBoarding}
            />
          </div>
          <div id="meetings">
            <HeroAccordion
              badgeText="Meetings | Dynamic"
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
          </div>
          {/* {shouldRenderDiv && (
            <div id="create-your-own">
              <CreateYourOwn />
            </div>
          )} */}
        </div>
      </div>

      <hr className="my-4 mt-16  max-sm:mt-4 w-[80%] mx-auto" />
      <div className="h-[10vh] max-sm:h-[8vh] text-sm text-gray-700 mx-16 mb-0 max-sm:mx-8 ">
        <div className="flex flex-col items-center justify-between text-center">
          <div>
            <Link href={"https://www.coachbots.com/"}>
              <Image
                src={"/coachbots-logo-ts.svg"}
                alt="coachbots-logo-lg"
                height={80}
                width={180}
                className="max-sm:h-[40px] max-sm:w-[120px]"
              />
            </Link>
          </div>
          <div className="flex gap-4 max-sm:flex-col max-sm:gap-1 max-sm:text-xs mt-2">
            <Link
              href={"https://www.coachbots.com/interaction-report-analysis"}
              target="_blank"
            >
              Interaction Analysis
            </Link>
            <Link
              href={"https://www.coachbots.com/terms-privacy-policy"}
              target="_blank"
            >
              Terms & Privacy Policy
            </Link>
          </div>
        </div>
        <div className="text-center mt-2 max-sm:text-xs">
          <p>&copy; 2023 Coachbots™. All Rights Reserved.</p>
        </div>
      </div>
      {/* <Widgets /> */}
    </div>
  );
};

export default VersionOne;
