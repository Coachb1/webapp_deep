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
import { AlertTriangle, Loader } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";
import {
  baseURL,
  basicAuth,
  capitalizeText,
  convertTextToCorrectFormat,
  parseData,
} from "@/lib/utils";
import { toast } from "sonner";
import { NavProfileWoProfile } from "@/components/NavProfile";
import { Meteors } from "@/components/ui/meteors";
import { Div } from "@/components/ui/moving-border";
import BorderShadow from "@/components/ui/border-shadow";

const howItWorks = [
  {
    heading: "Quick Match",
    description:
      "The quick match demonstrates fitment between participants based on pre-decided criteria. These can be set up during the user onboarding.",
  },
  {
    heading: "Session Notes",
    description:
      "All users (coaches, mentors and coachees) are able to add session notes, action items to keep the journey on track.",
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
    heading: "Learning reinforcement",
    description:
      "Depending upon the improvement plans discussed, create simulated scenario-based conversations - if relevant to your situation via our studio.",
  },
];

const Coach = ({ user, renderType }: any) => {
  const pathname = usePathname();

  const [coachName, setCoachName] = useState<string>("");
  const [coachTagName, setCoachTagName] = useState<string>("");
  const [coachDescription, setCoachDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState("");
  const [feedbackBotId, setFeedbackBotId] = useState("");
  const [botScenarioCase, setBotScenarioCase] = useState<string | undefined>(
    ""
  );
  const [botType, setBotType] = useState("");
  const [discussiionTopics, setDiscussionTopics] = useState<string[]>([]);

  //
  const [botName, setBotName] = useState("");
  const [botAreaCoaching, setBotAreaCoaching] = useState("");
  const [botDescription, setBotDescription] = useState("");

  const [dynamicHowItWorks, setDynamicHowItWorks] =
    useState<{ heading: string; description: string }[]>(howItWorks);

  const [dynamicBenefits, setDynamicBenefits] =
    useState<{ heading: string; description: string }[]>(benefitsData);

  //login walls
  const [loginRequired, setLoginRequired] = useState<boolean>();
  const [strictLoginRequired, setStrictLoginRequired] = useState<boolean>();

  const [invalidId, setInValidCoach] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch(
      `${baseURL}/accounts/get-bot-details/?bot_id=${
        renderType === "dynamic"
          ? pathname.split("/")[2]
          : "coach-d54cd-aravsharma"
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
        console.log("BOT DETAILS : ", data);
        const coachScribe = document.getElementsByClassName(
          "coachbots-coachscribe"
        )[0];
        if (data.error) {
          console.log(coachScribe);
          coachScribe.setAttribute("style", "display: none;");
          setInValidCoach(true);
        }

        setBotName(data.data.bot_name);
        setBotType(data.data.bot_type);
        if (data.data.additional_data) {
          setBotAreaCoaching(data.data.additional_data.bot_area_of_coaching);
          setBotDescription(data.data.additional_data.bot_description);
        }

        setBotScenarioCase(data.data.scenario_case);
        setFeedbackBotId(data.data.feedback_id);

        if (renderType === "dynamic") {
          console.log("DYNAMIC COACH DATA ", data);

          setCoachName(data.data.bot_details.coach_name);
          setCoachTagName(data.data.tag);
          setCoachDescription(data.data.bot_details.info);
          setProfileImage(data.data.owner_profile_image);
        }
        if (data.data.bot_details.is_strict_login_required && !user) {
          coachScribe.setAttribute("style", "display: none;");
        }

        if (data.data.page_information.how_it_works) {
          const parsedData = parseData(data.data.page_information.how_it_works);
          console.log(parsedData);
          setDynamicHowItWorks(parsedData);
        }

        if (data.data.page_information.benefits) {
          const parsedData = parseData(data.data.page_information.benefits);
          console.log(parsedData);
          setDynamicBenefits(parsedData);
        }

        if (data.data.bot_details.is_login_required) {
          if (!user) {
            coachScribe.setAttribute("style", "display: none;");
          }
        }
        setLoginRequired(data.data.bot_details.is_login_required);
        setStrictLoginRequired(data.data.bot_details.is_strict_login_required);
        setIsLoading(false);
        if (
          !data.data.is_sample_bot &&
          !data.data.is_system_bot &&
          data.data.scenario_case !== "icons_by_ai"
        ) {
          fetch(`${baseURL}/accounts/`, {
            method: "POST",
            headers: {
              Authorization: basicAuth,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_context: {
                name: `${user.given_name} ${
                  user.family_name ? user.family_name : ""
                }`,
                role: "member",
                user_attributes: {
                  tag: "deepchat_profile",
                  attributes: {
                    username: "web_user",
                    name: `${user.given_name} ${
                      user.family_name ? user.family_name : ""
                    }`,
                    email: user.email,
                  },
                },
              },
              identity_context: {
                identity_type: "deepchat_unique_id",
                value: user.email,
              },
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              setIsLoading(false);
              fetch(
                `${baseURL}/accounts/coach-coachee-mentor-mentee-profile/?user_id=${data.uid}`,
                {
                  method: "GET",
                  headers: {
                    Authorization: basicAuth,
                  },
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  console.log("xyz-data", data);
                  if (
                    data.data.length === 0 &&
                    renderType === "dynamic" &&
                    pathname !== "/coach/coach-d54cd-aravsharma"
                  ) {
                    const coachScribe = document.getElementsByClassName(
                      "coachbots-coachscribe"
                    )[0];

                    console.log(coachScribe);
                    const botButton = document.getElementsByClassName(
                      "chat-icon-container2"
                    )[0];
                    botButton.removeAttribute("onclick");

                    const chatIcon =
                      document.getElementsByClassName("chat-icon2")[0];
                    const showEnrollmentToast = () => {
                      chatIcon.addEventListener("click", () => {
                        toast.error(
                          "You have not enrolled as a program participant. Please enroll and try again."
                        );
                      });
                    };
                    if (!chatIcon.getAttribute("onclick")) {
                      chatIcon.setAttribute(
                        "onclick",
                        `${showEnrollmentToast()}`
                      );
                    }
                  }
                })
                .catch((err) => {
                  console.error(err);
                  throw new Error("Error fetching data /coach-coachee...");
                });
            });
        }

        if (
          data.data.profile_details.discussion_topic &&
          data.data.profile_details.discussion_topic !== null &&
          data.data.profile_details.discussion_topic !== ""
        ) {
          setDiscussionTopics(
            data.data.profile_details.discussion_topic.split(",")
          );
        }
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        setInValidCoach(true);
        throw new Error("Invalid Coach Id");
      });
  }, []);

  const parseTextToJSX = (text: string) => {
    const sections = text.trim().split("\n\n");

    return (
      <div className="space-y-2 max-sm:mt-0">
        {sections.map((section, index) => {
          const lines = section
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line !== "");
          if (lines.length > 0) {
            const title = lines[0];
            const items = lines.slice(1);

            return (
              <section className="text-sm max-sm:text-xs text-wrap" key={index}>
                <h2 className="">{title}</h2>
                <ul className="list-none list-inside">
                  {items.map((item, itemIndex) => (
                    <li key={itemIndex} className="my-1 text-wrap">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            );
          }
          return null;
        })}
      </div>
    );
  };

  const CoachBotBody = () => {
    return (
      <div suppressHydrationWarning={true}>
        {/* <Meteors className="max-sm:hidden" number={50} /> */}
        {/* {enrolled ? (
          <> */}
        {renderType === "static" && (
          <Script src="../widget/coachbots-stt-widget.js" />
        )}

        {!loginRequired && (
          <div className="fixed bottom-28 right-[4px] z-50 max-sm:hidden">
            {/* <span className="mr-6 text-sm font-bold">Connect now</span> */}
            {/* <CornerDownRight className="ml-12 h-12 w-12 text-gray-600" /> */}
          </div>
        )}

        {invalidId && (
          <div className="fixed left-0 top-0 flex h-screen w-screen overflow-x-hidden items-center justify-center bg-foreground/30 backdrop-blur-sm z-50">
            <div className="p-2 bg-red-100 rounded-md text-sm text-red-800">
              <AlertTriangle className="h-4 w-4 mr-2 inline" />
              Sorry, this is not a valid URL. Please review or visit{" "}
              <Button
                variant={"link"}
                onClick={(event) => {
                  event.preventDefault();
                  window.location.href = "/network";
                }}
              >
                Home
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
              BOT
            </h1>
            <div>
              {botType === "subject_specific_bot" ? (
                <>
                  <h1 className="text-3xl mt-0 font-bold max-sm:text-xl max-lg:text-2xl text-gray-600 ">
                    {renderType === "dynamic"
                      ? `${convertTextToCorrectFormat(botName)}🚀`
                      : "Aarav Sharma!🚀"}
                  </h1>
                </>
              ) : (
                <>
                  {botScenarioCase === "icons_by_ai" ? (
                    <>
                      <h1 className="text-4xl mt-0 font-bold max-sm:text-xl max-lg:text-2xl text-gray-600 ">
                        {`${coachTagName} - AI Coaching Agent`}
                      </h1>
                      <p className="my-2 font-semibold text-2xl max-sm:text-sm text-gray-600">
                        {convertTextToCorrectFormat(coachName)}
                      </p>
                    </>
                  ) : (
                    <>
                      <h1 className="text-3xl mt-0 font-bold max-sm:text-xl max-lg:text-2xl text-gray-600 ">
                        {renderType === "dynamic"
                          ? `${convertTextToCorrectFormat(coachName)}🚀`
                          : "Aarav Sharma!🚀"}
                      </h1>
                    </>
                  )}
                </>
              )}

              <div className="my-4 max-sm:text-xs text-[#2f2323] w-full flex flex-col justify-center items-center">
                {botType !== "subject_specific_bot" ? (
                  <p className="p-2 pb-4 border-gray-300 bg-white max-sm:text-justify text-sm max-sm:text-xs w-[85%] max-sm:w-full">
                    {" "}
                    {botScenarioCase === "icons_by_ai" ? 
                    `Note: The coaching advice is derived from the knowledge base for AI-Agents. 
                    Coach-specific AI-agent's may not ALWAYS represent the point of view of the coach. 
                    The discussion transcript is provided in the Bot response section and shared by email for validation.`
                    :
                    `Note : Please note that the AI communication is driven by
                    curated information as provided by the user. The coaching
                    advise is derived from the knowledge base. But it may not
                    always depict the coach response in real life situation.
                    Transcript is provided in Bot response and email for
                    validation.`
                    }

                  </p>
                ) : (
                  <div className="p-3 pb-4 border mx-4 rounded-2xl border-gray-300 bg-white max-sm:text-justify text-sm max-sm:text-xs w-[85%] max-sm:w-full">
                    <h4 className="text-base font-semibold">
                      Area of Coaching
                    </h4>
                    <p>{botAreaCoaching}</p>
                  </div>
                )}
              </div>

              <div className="w-full flex flex-row justify-center">
                <Div
                  className="text-gray-800"
                  containerClassName="w-[85%] max-sm:w-full"
                >
                  <BorderShadow>
                    <div className="inter-var w-full max-sm:px-0 p-4 max-sm:p-0">
                      <div className="bg-transparent relative group/card  h-auto rounded-2xl p-6 max-sm:p-2 w-full flex flex-row items-start justify-start max-sm:justify-between py-0">
                        <div className="w-fit rounded-2xl">
                          {botType !== "subject_specific_bot" && (
                            <img
                              className="w-[200px] h-[200px] max-sm:h-[130px] object-cover rounded-2xl mb-10"
                              src={
                                profileImage ||
                                "https://res.cloudinary.com/dtbl4jg02/image/upload/v1708079292/y64qrkckvddolin49rhz.png"
                              }
                            />
                          )}
                        </div>
                        <div className="w-full rounded-2xl px-4 text-slate-900 max-sm:px-1 text-left text-sm max-sm:text-xs max-sm:ml-2">
                          {botType === "subject_specific_bot" ? (
                            <div className="text-center">
                              <h4 className="text-base font-semibold">
                                Subject Matter Description
                              </h4>
                              <p>{parseTextToJSX(botDescription)}</p>
                            </div>
                          ) : (
                            <>
                              {renderType === "dynamic"
                                ? parseTextToJSX(coachDescription)
                                : `I'm Aarav Sharma, a seasoned corporate coach with 15+
                          years' experience in leadership development. Holding a
                          master's in organizational psychology and
                          certifications in executive coaching, I've
                          collaborated with top-tier companies. My coaching
                          style, a unique blend of empathy and strategic
                          thinking, fosters a growth mindset and aligns personal
                          values with professional goals. Known for
                          approachability, I create a safe space for executives,
                          incorporating mindfulness for self-awareness and
                          resilience. Tailoring strategies to individual needs,
                          I aim to be a trusted guide for long-term, sustainable
                          leadership development in the dynamic corporate
                          landscape.`}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </BorderShadow>
                </Div>
              </div>
              {discussiionTopics.length > 0 &&
                botType !== "subject_specific_bot" && (
                  <div className="w-full flex flex-row justify-center">
                    <div className="max-sm:text-xs text-[#2f2323] flex flex-col max-sm:flex-col items-center gap-2 justify-center p-2 border border-gray-400 bg-white rounded-2xl mt-4 w-[85%] max-sm:w-full">
                      <h3 className="max-sm:text-sm text-base font-bold text-gray-600">
                        Discussion Topics
                      </h3>
                      <div className="flex flex-row gap-2 justify-center flex-wrap">
                        <>
                          {discussiionTopics.map((topic) => (
                            <div className="border border-blue-300 bg-blue-50 p-1 rounded-md text-sm max-sm:text-xs px-2.5 max-sm:p-1">
                              {capitalizeText(topic.trim())}
                            </div>
                          ))}
                        </>
                      </div>
                    </div>
                  </div>
                )}
            </div>
            <>
              {botType !== "subject_specific_bot" && (
                <>
                  <div className="flex flex-row gap-2 flex-wrap mt-8 max-sm:items-center max-sm:justify-center">
                    {botScenarioCase !== "icons_by_ai" && (
                      <Link href={"#howItWorks"}>
                        <Button
                          variant={"secondary"}
                          className="border border-gray-200 h-8 hover:cursor-pointer"
                        >
                          How AI Copilot works
                        </Button>
                      </Link>
                    )}

                    {botScenarioCase !== "icons_by_ai" && (
                      <Link href={"#benefits"}>
                        <Button
                          variant={"secondary"}
                          className="border border-gray-200 h-8 hover:cursor-pointer"
                        >
                          Benefits
                        </Button>
                      </Link>
                    )}
                  </div>

                  {botScenarioCase !== "icons_by_ai" && (
                    <div className="w-full" id="howItWorks">
                      <div className={`w-full flex justify-center`}>
                        <Badge
                          variant={"secondary"}
                          className="bg-[#2DC092] z-10 h-6 w-fit text-white text-lg py-3 hover:bg-[#2DC092] text-center mb-8 mt-12 max-sm:mt-8 max-sm:text-sm"
                        >
                          How AI Copilot works
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
                                      {dynamicHowItWorks.map((test, i) => (
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
                  )}
                </>
              )}

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
                                {(botType !== "subject_specific_bot"
                                  ? [...dynamicBenefits]
                                  : [dynamicBenefits[0]]
                                ).map((test, i) => (
                                  <AccordionItem
                                    key={i}
                                    value={`item-${i + 1}`}
                                    className={`${
                                      i ===
                                      (botType !== "subject_specific_bot"
                                        ? [...dynamicBenefits]
                                        : [dynamicBenefits[0]]
                                      ).length -
                                        1
                                        ? "border-none"
                                        : "border-b"
                                    } px-4 py-2`}
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
            </>

            <div className="w-full text-center flex flex-col justify-center items-center my-8 max-sm:my-2 max-sm:mt-2">
              <Badge
                variant={"secondary"}
                className="bg-[#2DC092] z-10 h-6 w-fit text-white text-lg py-3 hover:bg-[#2DC092] text-center mb-4 mt-12 max-sm:mt-8 max-sm:text-sm"
              >
                Disclaimer
              </Badge>
              <p className="w-[70%] text-[#7f7f7f] text-sm max-sm:text-xs max-sm:w-full">
                {botType === "subject_specific_bot"
                  ? "The subject matter bot is designed to enhance your coaching/mentoring experience. The information provided by the coach is used to create the bot but the interpretation of the answers may be subjective. The coach can override the discussion via email."
                  : "The coach/mentor's personalized bot is designed to enhance your coaching/mentoring experience. The information provided in the coach/mentor's detailed sections serves as a guide, and the effectiveness of coaching/mentoring is subjective. The coach can override the discussion via email."}
              </p>
            </div>
          </div>
        </div>
      </div>
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
      {!strictLoginRequired && user && <CoachBotBody />}
      {strictLoginRequired && user && <CoachBotBody />}
      {strictLoginRequired && !user && (
        <>
          <NoLoginFlag />
        </>
      )}
    </>
  );
};

export default Coach;
