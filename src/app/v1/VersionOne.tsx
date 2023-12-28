"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import HeroAccordion from "@/components/HeroAccordion";

import {
  EQTests,
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
  coachingPlus,
} from "@/lib/test";
import { Button } from "@/components/ui/button";
import NavProfile from "@/components/NavProfile";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import CreateYourOwn from "@/components/CreateYourOwn";

const subdomain =
  typeof window !== "undefined" ? window.location.hostname.split(".")[0] : null;
// const devUrl = "https://coach-api-ovh.coachbots.com/api/v1";
const devUrl = "https://coach-api-gcp.coachbots.com/api/v1";
const prodUrl = "https://coach-api-prod-ovh.coachbots.com/api/v1";
const baseURL = subdomain === "playground" ? devUrl : prodUrl;

const VersionOne = ({ user, groups }: any) => {
  // const { user } = useKindeBrowserClient();
  const [groupList, setGroupList] = useState<string[]>([]);
  useEffect(() => {
    setGroupList(groups);
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
    const restrictedEmails = ["gmail", "yahoo", "hotmail"];
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
      <div className="fixed w-full flex items-center justify-end p-4 h-6 py-8">
        {!user && (
          <Badge
            variant={"secondary"}
            className="bg-[#2DC092] h-6 text-white mr-4 hover:bg-[#2DC092] z-50 max-sm:text-[12px] max-sm:h-10 truncate max-sm:mt-[6.5rem] max-sm:-mr-16" //max-sm:text-[12px] max-sm:mt-[4.5rem] max-sm:-mr-16 | max-sm:hidden
          >
            ✨ Sign up to get the EQ Acess{" "}
            <br className="hidden max-sm:inline" /> (Workplace emails only)
            <ArrowRight className="ml-2 w-4 h-4 max-sm:hidden" />{" "}
            <ArrowUp className="ml-2 w-4 h-4 hidden max-sm:block" />
          </Badge>
        )}
        <NavProfile user={user} />
      </div>

      <MaxWidthWrapper className="flex pt-20 flex-col items-center justify-center text-center">
        <h1 className="text-[#2DC092] border-2 border-[#2DC092] p-[3px] text-xl font-extrabold mt-10 mb-6">
          <span className="bg-[#2DC092] text-white text-lg font-bold mr-[4px] p-[4px]">
            COACH
          </span>
          BOTS
        </h1>
        <h1 className="text-5xl font-bold md:text-6xl lg:text-4xl text-black max-sm:text-3xl max-sm:px-4">
          Learning Simulations Playground
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg max-sm:px-8">
          {" "}
          Toolkits and conversational coaching-learning for any scenario.
        </p>

        {groupList.length > 0 && (
          <div className="flex flex-row mt-4 z-50">
            <Link href={"library"}>
              <Button variant={"default"} className=" mx-4">
                My Library
              </Button>
            </Link>
          </div>
        )}

        <div className="text-lg z-50 w-[80%] max-sm:w-full mt-4 max-sm:mt-0">
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
            <Link href={"#coachingplus"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                Coaching+
              </Button>
            </Link>
            <Link href={"#discoveryPlus"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                Discovery+
              </Button>
            </Link>
            <Link href={"#one-to-one"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                1:1 Check-ins | AI Curated
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
                Case study | AI Curated
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
            <Link href={"#immersive"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                Immersive | AI Curated
              </Button>
            </Link>
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
                Meetings
              </Button>
            </Link>

            {shouldRenderDiv && (
              <Link href={"#create-your-own"}>
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                    <div className="space-y-2">
                      <Button
                        variant={"secondary"}
                        className="border border-gray-200 h-8 hover:cursor-pointer"
                      >
                        Create your own
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
      <div className="flex flex-row max-sm:flex-col w-[80%] max-sm:w-full mx-auto">
        <div className="w-full">
          {shouldRenderDiv && (
            <div>
              <HeroAccordion
                badgeText="EQ mini course"
                user={user ? true : false}
                tests={EQTests}
              />
            </div>
          )}
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
          <div id="coachingplus">
            <HeroAccordion
              badgeText="Coaching +"
              user={user ? true : false}
              tests={coachingPlus}
            />
          </div>
          <div id="discoveryPlus">
            <HeroAccordion
              badgeText="Discovery+"
              user={user ? true : false}
              tests={DescoveryPlus}
            />
          </div>
          <div id="one-to-one">
            <HeroAccordion
              badgeText="1:1 Check-ins | AI Curated"
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
              badgeText="Case study | AI Curated"
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
          <div id="immersive">
            <HeroAccordion
              badgeText="Immersive | AI Curated"
              user={user ? true : false}
              tests={immersive}
            />
          </div>
          <div id="onboarding">
            <HeroAccordion
              badgeText="Onboarding"
              user={user ? true : false}
              tests={onBoarding}
            />
          </div>
          <div id="meetings">
            <HeroAccordion
              badgeText="Meetings"
              user={user ? true : false}
              tests={meetings}
            />
          </div>
          {shouldRenderDiv && (
            <div id="create-your-own">
              <CreateYourOwn />
            </div>
          )}
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
