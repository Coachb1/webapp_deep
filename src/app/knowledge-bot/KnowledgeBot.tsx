"use client";

import NoLoginFlag from "@/components/NoLoginFlag";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CornerDownRight, Loader } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";
import { baseURL, basicAuth, getUserAccount } from "@/lib/utils";
import { toast } from "sonner";
import NavProfile, { NavProfileWoProfile } from "@/components/NavProfile";

const howItWorks = [
  {
    heading: "Fitment Analysis",
    description:
      "Discover the perfect match! Our fitment analysis assesses compatibility between you and your coach/mentor, ensuring a harmonious coaching relationship.",
  },
  {
    heading: "Sessions Orientation",
    description:
      "Prepare for your session! Access valuable information about your coach/mentor before your session, clearly showing their expertise and style.",
  },
  {
    heading: "Check-in Conversation",
    description:
      "Stay connected between sessions! Engage in interim conversations, gaining insights and guidance whenever you need it.",
  },
  {
    heading: "Recommendations",
    description:
      "The Avatar may also have the ability to recommend scenarios to practice based on the needs. The user may also rely directly search the library to search for relevant scenarios for practice.",
  },
];

const benefitsData = [
  {
    heading: "Transcript Email",
    description:
      "Never miss a detail! Receive a transcription email after each session, capturing key insights and action points for easy reference.",
  },
  {
    heading: "Advice Anytime, Anywhere",
    description:
      "Your coach is always with you! Receive coaching/mentoring advice from the bot anytime, anywhere—empowering you to excel in personal and professional endeavors.",
  },
  {
    heading: "Skill scenario library",
    description:
      "Explore our extensive library of skill scenarios. This collection provides practical, real-life situations for skill development. Enhance your skills by tackling scenarios that resonate with the needs identified during the session.",
  },
];

const KnowledgeBot = ({ user, renderType }: any) => {
  const pathname = usePathname();

  const [botName, setBotName] = useState<string>("");
  const [botDescription, setBotDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState("");
  const [enrolled, SetEnrolled] = useState(true);
  const [feedbackBotId, setFeedbackBotId] = useState("");
  //login walls
  const [loginRequired, setLoginRequired] = useState<boolean>();
  const [strictLoginRequired, setStrictLoginRequired] = useState<boolean>();

  const [coachProfileLink, setCoachProfileLink] = useState(
    "https://www.linkedin.com/"
  );

  const [invalidId, setInValidCoach] = useState(false);
  const [primaryPurpose, setPrimaryPurpose] = useState("");

  useEffect(() => {
    setIsLoading(true);

    fetch(
      `${baseURL}/accounts/get-bot-details/?bot_id=${
        renderType === "dynamic"
          ? pathname.split("/")[2]
          : "knowledge-a8d26-crossfit-elevation-support"
      }`,
      {
        method: "GET",
        headers: {
          Authorization: basicAuth,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("KNOWLEDGE BOT DETAILS : ", data);

        const parsedFaqJson = JSON.parse(data.data.faqs);
        console.log(parsedFaqJson);

        const coachScribe =
          document.getElementsByClassName("deep-chat-poc2")[0];
        console.log(
          "LOGINS -norm : strict",
          data.data.bot_details.is_login_required,
          data.data.bot_details.is_strict_login_required
        );
        setFeedbackBotId(data.data.feedback_id);
        if (renderType === "dynamic") {
          console.log(coachScribe);
          if (data.error) {
            coachScribe.setAttribute("style", "display: none;");
            setInValidCoach(true);
          }

          setBotName(data.data.bot_name);
          setBotDescription(data.data.description);
          setPrimaryPurpose(
            parsedFaqJson["What is the primary purpose of the bot?"]
          );
        }
        if (data.data.bot_details.is_strict_login_required && !user) {
          coachScribe.setAttribute("style", "display: none;");
        }
        if (data.data.bot_details.is_login_required) {
          if (!user) {
            coachScribe.setAttribute("style", "display: none;");
          }
        }
        setLoginRequired(data.data.bot_details.is_login_required);
        setStrictLoginRequired(data.data.bot_details.is_strict_login_required);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const KnowlegeBotBody = () => {
    return (
      <>
        {renderType === "static" && (
          <Script src="../widget/coachbots-stt-widget.js" />
        )}

        {!loginRequired && (
          <div className="fixed max-sm:hidden right-[100px] bottom-12">
            <span className="mr-6 text-sm font-bold">Try Now</span>
            <CornerDownRight className="ml-4 h-12 w-12 text-gray-600" />
          </div>
        )}

        {/* {invalidId && renderType === "dynamic" && (
          <div className="fixed left-0 top-0 flex h-screen w-screen overflow-x-hidden items-center justify-center bg-foreground/30 backdrop-blur-sm z-50">
            <div className="p-2 bg-red-100 rounded-md text-sm text-red-800">
              <AlertTriangle className="h-4 w-4 mr-2 inline" />
              We have encountered an error. Please try again.{" "}
            </div>
          </div>
        )} */}
        <div className="bg-white min-h-screen h-full max-sm:h-full max-sm:min-h-screen pb-16">
          <div className="fixed w-full flex items-center justify-end p-4 h-6 py-8 !z-[800]">
            {/* <NetworkNav user={user} /> */}
            <div className="ml-4">
              <NavProfileWoProfile user={user} />
            </div>
          </div>
          <div className="flex pt-20 flex-col items-center justify-center text-center px-24 max-sm:px-8">
            <h1 className="text-[#2DC092] border-2 border-[#2DC092] p-[3px] text-xl font-extrabold mt-10 mb-6">
              <span className="bg-[#2DC092] text-white text-lg font-bold mr-[4px] p-[4px]">
                COACH
              </span>
              BOTS
            </h1>
            <div>
              <h1 className="text-4xl mt-0 font-bold max-md:text-2xl max-lg:text-2xl  max-sm:text-2xl text-gray-600 ">
                {renderType === "dynamic"
                  ? `Welcome to ${botName} 🚀`
                  : "Welcome to Flyover Project Tracker 🚀"}
              </h1>

              {renderType === "dynamic" ? (
                <>
                  <div className="max-sm:text-xs mt-4 my-2 text-[#2f2323] flex flex-row max-sm:flex-col items-center gap-2 justify-center p-2 border border-gray-200 bg-amber-50 rounded-lg">
                    <p className="w-full p-2 text-center   max-sm:text-xs">
                      {" "}
                      {primaryPurpose.length > 0 ? (
                        <>
                          <b>Purpose : </b> {primaryPurpose}
                        </>
                      ) : (
                        <>{botDescription}</>
                      )}
                    </p>
                  </div>
                </>
              ) : (
                <div className="max-sm:text-xs mt-4 text-[#2f2323] flex flex-row max-sm:flex-col items-center gap-2 justify-center p-2 border border-gray-200 bg-amber-50 rounded-lg">
                  <p className="w-full text-center p-2  max-sm:text-xs">
                    {" "}
                    <b> Purpose : </b> To answer any project related questions and give project related updates
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-row gap-2 flex-wrap mt-8 max-sm:items-center max-sm:justify-center">
              {/* <Link target="_blank" href={coachProfileLink}>
                    <div className="relative group cursor-pointer">
                      <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                      <div className="relative bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                        <div className="space-y-2">
                          <Button
                            variant={"secondary"}
                            className="border border-gray-200 h-8 hover:cursor-pointer w-fit"
                          >
                            Profile {renderType !== "dynamic" && "(sample)"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link> */}
              {/* <Link href={"#wtu"}>
                <Button
                  variant={"secondary"}
                  className="border border-gray-200 h-8 hover:cursor-pointer"
                >
                  Where to use
                </Button>
              </Link> */}
              <Link href={"#howItWorks"}>
                <Button
                  variant={"secondary"}
                  className="border border-gray-200 h-8 hover:cursor-pointer"
                >
                  How Avatar works
                </Button>
              </Link>

              {/* <Link target="_blank" href={`/feedback/${feedbackBotId}`}>
                <Button
                  variant={"secondary"}
                  className="border border-gray-200 h-8 hover:cursor-pointer"
                >
                  Feedback center
                </Button>
              </Link> */}
              <Link href={"#benefits"}>
                <Button
                  variant={"secondary"}
                  className="border border-gray-200 h-8 hover:cursor-pointer"
                >
                  Benefits
                </Button>
              </Link>
              {/* <Link target="_blank" href={coachBookLink}>
                    <div className="relative group cursor-pointer">
                      <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-violet-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                      <div className="relative bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                        <div className="space-y-2">
                          <Button
                            variant={"secondary"}
                            className="border border-gray-200 h-8 hover:cursor-pointer"
                          >
                            Book me {renderType !== "dynamic" && "(sample)"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link> */}
            </div>
            {/* <div id="wtu">
              <WhereToUse />
            </div> */}
            <div className="w-full" id="howItWorks">
              <div className={`w-full flex justify-center`}>
                <Badge
                  variant={"secondary"}
                  className="bg-[#2DC092] z-10 h-6 w-fit text-white text-lg py-3 hover:bg-[#2DC092] text-center mb-8 mt-12 max-sm:mt-8 max-sm:text-sm"
                >
                  How Avatar works
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
                effectiveness of coaching/mentoring is subjective. The coach can
                override the discussion via email.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      {isLoading && (
        <div className="fixed left-0 top-0 flex h-screen w-screen overflow-x-hidden items-center justify-center bg-foreground/30 backdrop-blur-2xl z-50">
          <div className="p-2 bg-gray-300 rounded-md text-sm">
            <Loader className="h-4 w-4 mr-2 animate-spin inline" />
            Please wait while we prepare your coach.
          </div>
        </div>
      )}
      {!strictLoginRequired && user && <KnowlegeBotBody />}
      {strictLoginRequired && user && <KnowlegeBotBody />}
      {strictLoginRequired && !user && (
        <>
          <NoLoginFlag />
        </>
      )}
    </>
  );
};

export default KnowledgeBot;
