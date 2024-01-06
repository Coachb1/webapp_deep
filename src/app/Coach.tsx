"use client";

import NavProfile from "@/components/NavProfile";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  BookmarkCheck,
  FileClock,
  LibraryBig,
  Loader,
  MailPlus,
  Workflow,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

const subdomain =
  typeof window !== "undefined" ? window.location.hostname.split(".")[0] : null;
const devUrl = "https://coach-api-ovh.coachbots.com/api/v1";
// const devUrl = "https://coach-api-gcp.coachbots.com/api/v1";
const prodUrl = "https://coach-api-prod-ovh.coachbots.com/api/v1";
const baseURL = subdomain === "platform" ? prodUrl : devUrl;
const basicAuth =
  "Basic Yzc3MjFmZGItYTllMC00YTYxLWEzMTYtNDRhODA1N2VkMjY0OjhjNWNlZWZlLTY2Y2QtNDliZi04MTY5LTBhNjMwMmU5NmZlMA==";

const Coach = ({ user, renderType }: any) => {
  const pathname = usePathname();

  const [coachName, setCoachName] = useState<string>("");
  const [coachDescription, setCoachDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const [invalidId, setInValidCoach] = useState(false);

  useEffect(() => {
    if (renderType === "dynamic") {
      setIsLoading(true);
      const bot_id = pathname.split("/")[1];
      console.log(bot_id);
      fetch(`${baseURL}/accounts/get-bot-details/?bot_id=${bot_id}`, {
        method: "GET",
        headers: {
          Authorization: basicAuth,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("DYNAMIC COACH DATA ", data);
          const coachScribe =
            document.getElementsByClassName("deep-chat-poc2")[0];
          console.log(coachScribe);
          if (data.error) {
            coachScribe.setAttribute("style", "display: none;");
            setInValidCoach(true);
          }
          setCoachName(data.data.bot_details.coach_name);
          setCoachDescription(data.data.bot_details.info);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setInValidCoach(true);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const howItWorks = [
    {
      heading: "Fitment Analysis",
      description:
        "Discover the perfect match! Our fitment analysis assesses compatibility between you and your coach/mentor, ensuring a harmonious coaching relationship.",
    },
    {
      heading: "Sessions Orientation",
      description:
        "Prepare for your session! Access valuable information about your coach/mentor before your session, providing a clear picture of their expertise and style.",
    },
    {
      heading: "Interim Conversation",
      description:
        "Stay connected between sessions! Engage in interim conversations, gaining insights and guidance whenever you need it.",
    },
  ];

  const benefitsData = [
    {
      heading: "Transcription Email",
      icon: (
        <MailPlus
          className="h-8 w-8 max-sm:h-6 max-sm:w-6 mb-2 stroke-gray-600"
          stroke="10"
        />
      ),
      description:
        "Never miss a detail! Receive a transcription email after each session, capturing key insights and action points for easy reference. There is always a mentor/coach oversight in the conversation based on emails.",
    },
    {
      heading: "Advice Anytime",
      icon: (
        <FileClock
          className="h-8 w-8 max-sm:h-6 max-sm:w-6 mb-2 stroke-gray-600"
          stroke="10"
        />
      ),
      description:
        " Your coach is always with you! Receive coaching/mentoring advice from the bot anytime, anywhere—empowering you to excel in both personal and professional endeavors.",
    },
    {
      heading: "Skill scenario library",
      icon: (
        <LibraryBig
          className="h-8 w-8 max-sm:h-6 max-sm:w-6 mb-2 stroke-gray-600"
          stroke="10"
        />
      ),
      description:
        "Explore our extensive library of skill scenarios. This collection provides practical, real-life situations for skill development. Enhance your skills by tackling scenarios that resonate with the needs identified during the session.",
    },
  ];

  return (
    <>
      <Script
        src="https://static.elfsight.com/platform/platform.js"
        data-use-service-core
        defer
      />
      <div
        className="elfsight-app-a2ca2565-f013-4a6a-9ad8-3ff1f7eadf9a"
        data-elfsight-app-lazy
      ></div>
      {isLoading && renderType === "dynamic" && (
        <div className="fixed left-0 top-0 flex h-screen w-screen overflow-x-hidden items-center justify-center bg-foreground/30 backdrop-blur-2xl z-50">
          <div className="p-2 bg-gray-300 rounded-md text-sm">
            <Loader className="h-4 w-4 mr-2 animate-spin inline" />
            Please wait while we prepare your coach.
          </div>
        </div>
      )}
      {invalidId && renderType === "dynamic" && (
        <div className="fixed left-0 top-0 flex h-screen w-screen overflow-x-hidden items-center justify-center bg-foreground/30 backdrop-blur-sm z-50">
          <div className="p-2 bg-red-100 rounded-md text-sm text-red-800">
            <AlertTriangle className="h-4 w-4 mr-2 inline" />
            We have encountered an error. Please try again.{" "}
          </div>
        </div>
      )}
      <div className="bg-gray-100 min-h-screen h-full grainy max-sm:h-full max-sm:min-h-screen pb-16">
        <div className="fixed w-full flex items-center justify-end p-4 h-6 py-8 !z-[800]">
          <NavProfile user={user} />
        </div>
        <div className="flex pt-20 flex-col items-center justify-center text-center px-24 max-sm:px-8">
          <h1 className="text-[#2DC092] border-2 border-[#2DC092] p-[3px] text-xl font-extrabold mt-10 mb-6">
            <span className="bg-[#2DC092] text-white text-lg font-bold mr-[4px] p-[4px]">
              COACH
            </span>
            BOTS
          </h1>
          <div>
            <h1 className="text-5xl mt-0 font-bold md:text-6xl lg:text-4xl text-gray-700 max-sm:text-3xl max-sm:px-4 bg-gradient-to-br from-gray-700 to-gray-400 bg-clip-text text-transparent">
              {renderType === "dynamic"
                ? `Welcome to ${coachName}'s Avatar`
                : "Welcome to Your Coach's Avatar"}
            </h1>
            <p className="my-4 max-sm:text-xs text-[#7f7f7f]">
              {renderType === "dynamic"
                ? coachDescription
                : "This is your coach/mentor's personalized bot. Here, you would typically find a detailed description of your coach/mentor—highlighting their expertise, approach, and unique coaching/mentoring style. Dive into the detailed sections to explore the benefits and learn how it all works. Our bot is trained on the coach/ mentor's style, ideologies, and coaching/mentoring style, ensuring a tailored and effective coaching experience."}
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <Link href={"#howItWorks"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                How it works
              </Button>
            </Link>
            <Link href={"#benefits"}>
              <Button
                variant={"secondary"}
                className="border border-gray-200 h-8 hover:cursor-pointer"
              >
                Benefits
              </Button>
            </Link>
          </div>

          <div className="w-full" id="howItWorks">
            <div className={`w-full flex justify-center`}>
              <Badge
                variant={"secondary"}
                className="bg-[#2DC092] z-10 h-6 w-fit text-white text-lg py-3 hover:bg-[#2DC092] text-center mb-8 mt-12 max-sm:mt-8 max-sm:text-sm"
              >
                How it works
              </Badge>
            </div>
            <div className="w-full">
              <div className="relative isolate mx-auto">
                <div>
                  <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-[-1.5rem] max-sm:w-[100%] z-50">
                    <div className="rounded-xl bg-white p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 max-sm:w-[100%]">
                      <Accordion
                        type="single"
                        collapsible
                        className="w-full text-gray-500 max-sm:p-4 "
                      >
                        {howItWorks.map((test, i) => (
                          <AccordionItem
                            key={i}
                            value={`item-${i + 1}`}
                            className={
                              i === howItWorks.length - 1
                                ? "border-none"
                                : "border-b"
                            }
                          >
                            <AccordionTrigger className="text-left max-sm:text-xs">
                              <div>
                                <b>{test.heading}</b>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="max-sm:text-xs text-left">
                              <p> {test.description}</p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full" id="benefits">
            <div className={`w-full flex justify-center`}>
              <Badge
                variant={"secondary"}
                className="bg-[#2DC092] z-10 h-6 w-fit text-white text-lg py-3 hover:bg-[#2DC092] text-center mb-8 mt-12 max-sm:mt-8 max-sm:text-sm"
              >
                Benefits
              </Badge>
            </div>
            <div className="w-full">
              <div className="relative isolate mx-auto">
                <div>
                  <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-[-1.5rem] max-sm:w-[100%] z-50">
                    <div className="rounded-xl bg-white p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 max-sm:w-[100%]">
                      <Accordion
                        type="single"
                        collapsible
                        className="w-full text-gray-500 max-sm:p-4 "
                      >
                        {benefitsData.map((test, i) => (
                          <AccordionItem
                            key={i}
                            value={`item-${i + 1}`}
                            className={
                              i === howItWorks.length - 1
                                ? "border-none"
                                : "border-b"
                            }
                          >
                            <AccordionTrigger className="text-left max-sm:text-xs">
                              <div>
                                <b>{test.heading}</b>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="max-sm:text-xs text-left">
                              <p> {test.description}</p>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full text-center flex flex-col justify-center items-center my-8 max-sm:my-2 max-sm:mt-2">
            <Badge
              variant={"secondary"}
              className="bg-[#2DC092] z-10 h-6 w-fit text-white text-lg py-3 hover:bg-[#2DC092] text-center mb-4 mt-12 max-sm:mt-8 max-sm:text-sm"
            >
              Disclaimer
            </Badge>
            <p className="w-[70%] text-[#7f7f7f] text-sm max-sm:text-xs max-sm:w-full">
              The coach/mentor's personalized bot is designed to enhance your
              coaching/mentoring experience. The information provided in the
              coach/mentor's detailed sections serves as a guide, and the
              effectiveness of coaching/mentoring is subjective.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coach;
