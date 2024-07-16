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
import { baseURL, basicAuth } from "@/lib/utils";
import { NavProfileWoProfile } from "@/components/NavProfile";
import { Div } from "@/components/ui/moving-border";
import BorderShadow from "@/components/ui/border-shadow";
import {
  CardBody,
  CardContainer,
  CardItem,
} from "@/components/ui/3d-card-effect";

const howItWorks = [
  {
    heading: "Creation of the Bot",
    description:
      "A knowledge bot can be created by simply an intake form and attaching documents to the same. The knowledge bot can be for individual use or it can be made available to everyone in the enterprise.",
  },
  {
    heading: "Usage of the Bot",
    description:
      "The users can access public bots via the Knowledge Library as well as bots that might have been created for individual usage.",
  },
];

const benefitsData = [
  {
    heading: "Conversational Analysis",
    description:
      "The knowledge bots can synthesize information from one or multiple documents. It saves time by presenting a unified simple response.",
  },
  {
    heading: "Multiple Use Cases",
    description:
      "The bots can be related to a project and its relation information and status. It can also be about a particular department's knowledge repository. It can unlock knowledge locked in any documents.",
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
          : "knowledge-c89fd-flyover-project-tracker"
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

        const coachScribe = document.getElementsByClassName(
          "coachbots-coachscribe"
        )[0];

        if (data.error) {
          console.log(coachScribe);
          coachScribe.setAttribute("style", "display: none;");
          setInValidCoach(true);
        }

        let parsedFaqJson: any;
        if (typeof data.data.faqs === "string") {
          parsedFaqJson = JSON.parse(data.data.faqs);
        } else {
          parsedFaqJson = data.data.faqs;
        }

        console.log(
          "LOGINS -norm : strict",
          data.data.bot_details.is_login_required,
          data.data.bot_details.is_strict_login_required
        );
        setFeedbackBotId(data.data.feedback_id);
        if (renderType === "dynamic") {
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
          <div className="fixed bottom-14 right-[75px] z-50 max-sm:hidden">
            <span className="mr-6 text-sm font-bold">Connect now</span>
            <CornerDownRight className="ml-12 h-12 w-12 text-gray-600" />
          </div>
        )}

        {invalidId && (
          <div className="fixed left-0 top-0 flex h-screen w-screen overflow-x-hidden items-center justify-center bg-foreground/30 backdrop-blur-sm z-50">
            <div className="p-2 bg-red-100 rounded-md text-sm text-red-800">
              <AlertTriangle className="h-4 w-4 mr-2 inline" />
              Sorry, this is not a valid URL. Please review or visit{" "}
              <Button className="ml-0" variant={"link"} asChild>
                <Link href={"/"}>Home</Link>
              </Button>
            </div>
          </div>
        )}

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
              <div className="w-full flex flex-row justify-center items-center">
                <h1 className="text-4xl mt-0 font-bold max-md:text-2xl max-lg:text-2xl  max-sm:text-2xl text-gray-600 w-[80%]">
                  {renderType === "dynamic"
                    ? `${botName}`
                    : "Flyover Project Tracker"}
                </h1>
              </div>
              <div className="w-full flex flex-row justify-center mt-8">
                <Div
                  className="text-gray-800"
                  containerClassName="w-[85%] max-sm:w-full"
                >
                  <BorderShadow>
                    <CardContainer
                      containerClassName="py-0 p-4 max-sm:p-0"
                      className="inter-var w-full max-sm:px-0"
                    >
                      <CardBody className="bg-transparent relative group/card  h-auto rounded-2xl p-6 max-sm:p-2 w-full flex flex-row items-start justify-start max-sm:justify-between py-0">
                        <CardItem
                          translateZ="100"
                          className="w-fit rounded-2xl text-sm max-sm:text-xs"
                        >
                          {renderType === "dynamic" ? (
                            <>
                              {" "}
                              {primaryPurpose.length > 0 ? (
                                <>
                                  <b>Purpose : </b> {primaryPurpose}
                                </>
                              ) : (
                                <>{botDescription}</>
                              )}
                            </>
                          ) : (
                            <>
                              {" "}
                              <b> Purpose : </b> To answer any project related
                              questions and give project related updates
                            </>
                          )}
                        </CardItem>
                      </CardBody>
                    </CardContainer>
                  </BorderShadow>
                </Div>
              </div>
            </div>
            <div className="flex flex-row gap-2 flex-wrap mt-8 max-sm:items-center max-sm:justify-center">
              <Link href={"#howItWorks"}>
                <Button
                  variant={"secondary"}
                  className="border border-gray-200 h-8 hover:cursor-pointer"
                >
                  How Bot works
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
                  How Bot works
                </Badge>
              </div>
              <div className="w-full">
                <div className="relative isolate mx-auto">
                  <div>
                    <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-[-1.5rem] max-sm:w-[100%] z-50">
                      <div className="rounded-xl bg-white w-full lg:rounded-2xl">
                        <Div
                          className="bg-white text-gray-800"
                          containerClassName="w-full"
                        >
                          <BorderShadow>
                            <Accordion
                              type="single"
                              collapsible
                              className="w-full text-gray-500 max-sm:p-4 "
                            >
                              {howItWorks.map((test, i) => (
                                <AccordionItem
                                  key={i}
                                  value={`item-${i + 1}`}
                                  className={`${
                                    i === howItWorks.length - 1
                                      ? "border-none"
                                      : "border-b"
                                  } px-2`}
                                >
                                  <AccordionTrigger className="text-left max-sm:text-xs">
                                    <div>
                                      <b>{test.heading}</b>
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent className="text-left max-sm:text-xs">
                                    <p> {test.description}</p>
                                  </AccordionContent>
                                </AccordionItem>
                              ))}
                            </Accordion>
                          </BorderShadow>
                        </Div>
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
                      <div className="rounded-xl bg-white w-full lg:rounded-2xl">
                        <Div
                          className="bg-white text-gray-800"
                          containerClassName="w-full"
                        >
                          <BorderShadow>
                            <Accordion
                              type="single"
                              collapsible
                              className="w-full text-gray-500 max-sm:p-4 "
                            >
                              {benefitsData.map((test, i) => (
                                <AccordionItem
                                  key={i}
                                  value={`item-${i + 1}`}
                                  className={`${
                                    i === benefitsData.length - 1
                                      ? "border-none"
                                      : "border-b"
                                  } px-2`}
                                >
                                  <AccordionTrigger className="text-left max-sm:text-xs">
                                    <div>
                                      <b>{test.heading}</b>
                                    </div>
                                  </AccordionTrigger>
                                  <AccordionContent className="text-left max-sm:text-xs">
                                    <p> {test.description}</p>
                                  </AccordionContent>
                                </AccordionItem>
                              ))}
                            </Accordion>
                          </BorderShadow>
                        </Div>
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
