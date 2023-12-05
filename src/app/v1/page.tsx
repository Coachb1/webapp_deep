import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import HeroAccordion from "@/components/HeroAccordion";

import { constructMetadata } from "@/lib/utils";
import {
  EQTests,
  Managerial,
  oneTwoOne,
  roundFeedback,
  meetings,
  Technology,
  Reflection,
  DecisionGames,
  Sales,
  serviceslashConsulting,
  frontLineStaff,
  immersive,
} from "@/lib/test";
import Widgets from "@/components/Widgets";
import { Button } from "@/components/ui/button";
import NavProfile from "@/components/NavProfile";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ArrowUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = constructMetadata();

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const enterpriceEmailDomains = [
    "@anjuman.edu.in",
    "@google.com",
    "@indusind.com",
  ];

  return (
    <div className="bg-gray-100 min-h-[120vh] h-full grainy max-sm:h-full max-sm:min-h-screen pb-16">
      <div className="fixed w-full flex items-center justify-end p-4 h-6 py-8">
        {!user && (
          <Badge
            variant={"secondary"}
            className="bg-[#2DC092] h-6 text-white mr-4 hover:bg-[#2DC092] z-50 max-sm:text-[12px] max-sm:mt-[4.5rem] max-sm:-mr-16" //max-sm:text-[12px] max-sm:mt-[4.5rem] max-sm:-mr-16 | max-sm:hidden
          >
            ✨ Sign up to get EQ Insight Access{" "}
            <ArrowRight className="ml-2 w-4 h-4 max-sm:hidden" />{" "}
            <ArrowUp className="ml-2 w-4 h-4 hidden max-sm:block" />
          </Badge>
        )}
        <NavProfile />
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

        {user && (
          <div className="flex flex-row mt-4 z-50">
            {enterpriceEmailDomains.some((domain) =>
              user?.email!.endsWith(domain)
            ) && (
              <Link href={""}>
                <Button variant={"default"} className=" mx-4">
                  My Library
                </Button>
              </Link>
            )}
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
            <Link href={"#reflection"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                Reflection
              </Button>
            </Link>
            <Link href={"#decision-games"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                Decision Games
              </Button>
            </Link>
            <Link href={"#one-to-one"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                1:1 Check-ins
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
            <Link href={"#immersive"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                Immersive
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
            <Link href={"#frontline-staff"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                Frontline Staff &#40;Hindi&#41;
              </Button>
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
      <div className="flex flex-row max-sm:flex-col w-[80%] max-sm:w-full mx-auto">
        <div className="w-full">
          {user && (
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
          <div id="reflection">
            <HeroAccordion
              badgeText="Reflection"
              user={user ? true : false}
              tests={Reflection}
            />
          </div>
          <div id="decision-games">
            <HeroAccordion
              badgeText="Decision Games"
              user={user ? true : false}
              tests={DecisionGames}
            />
          </div>
          <div id="one-to-one">
            <HeroAccordion
              badgeText="1:1 Check-ins"
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
          <div id="immersive">
            <HeroAccordion
              badgeText="Immersive"
              user={user ? true : false}
              tests={immersive}
            />
          </div>
          <div id="meetings">
            <HeroAccordion
              badgeText="Meetings"
              user={user ? true : false}
              tests={meetings}
            />
          </div>
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
      <Widgets />
    </div>
  );
};

export default Page;
