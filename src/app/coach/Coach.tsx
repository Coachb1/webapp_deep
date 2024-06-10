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
import {
  baseURL,
  basicAuth,
  capitalizeText,
  convertTextToCorrectFormat,
} from "@/lib/utils";
import { toast } from "sonner";
import { NavProfileWoProfile } from "@/components/NavProfile";

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

const Coach = ({ user, renderType }: any) => {
  const pathname = usePathname();

  const [coachName, setCoachName] = useState<string>("");
  const [coachTagName, setCoachTagName] = useState<string>("");
  const [coachDescription, setCoachDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState("");
  const [enrolled, SetEnrolled] = useState(true);
  const [feedbackBotId, setFeedbackBotId] = useState("");
  const [botScenarioCase, setBotScenarioCase] = useState<string | undefined>(
    ""
  );
  const [discussiionTopics, setDiscussionTopics] = useState<string[]>([]);

  //login walls
  const [loginRequired, setLoginRequired] = useState<boolean>();
  const [strictLoginRequired, setStrictLoginRequired] = useState<boolean>();

  const [coachProfileLink, setCoachProfileLink] = useState(
    "https://www.linkedin.com/"
  );

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
        console.log();
        const coachScribe = document.getElementsByClassName(
          "coachbots-coachscribe"
        )[0];
        console.log(
          "LOGINS -norm : strict",
          data.data.bot_details.is_login_required,
          data.data.bot_details.is_strict_login_required
        );
        setBotScenarioCase(data.data.scenario_case);
        setFeedbackBotId(data.data.feedback_id);
        if (renderType === "dynamic") {
          console.log("DYNAMIC COACH DATA ", data);

          console.log(coachScribe);
          if (data.error) {
            coachScribe.setAttribute("style", "display: none;");
            setInValidCoach(true);
          }
          setCoachName(data.data.bot_details.coach_name);
          setCoachTagName(data.data.tag);
          setCoachDescription(data.data.bot_details.info);
          setProfileImage(data.data.owner_profile_image);
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
                });
            });
        }

        if (
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
        {/* {enrolled ? (
          <> */}
        {renderType === "static" && (
          <Script src="../widget/coachbots-stt-widget.js" />
        )}

        {!loginRequired && (
          <div className="fixed max-sm:hidden right-[100px] bottom-12">
            <span className="mr-6 text-sm font-bold">Try Now</span>
            <CornerDownRight className="ml-4 h-12 w-12 text-gray-600" />
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
              {botScenarioCase === "icons_by_ai" ? (
                <>
                  <h1 className="text-2xl mt-0 font-bold max-sm:text-xl max-lg:text-2xl text-gray-600 ">
                    {coachTagName}
                  </h1>
                  <p className="my-2 font-semibold text-lg max-sm:text-sm text-gray-600">
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
              <div className="my-4 max-sm:text-xs text-[#2f2323]">
                <p className="p-2 pb-4 border-b-2 border-dashed border-gray-300 bg-white max-sm:text-justify text-sm max-sm:text-xs">
                  {" "}
                  This is your coach/mentor’s personalized bot. Here, you would
                  typically find a detailed description of your
                  coach/mentor—highlighting their expertise, approach, and
                  unique coaching/mentoring style. Dive into the detailed
                  sections to explore the benefits and learn how it works. Our
                  bot is trained on the coach/ mentor’s style, ideologies, and
                  coaching/mentoring style, ensuring a tailored and effective
                  coaching experience.{" "}
                </p>
              </div>

              {renderType === "dynamic" ? (
                <>
                  {botScenarioCase === "icons_by_ai" ? (
                    // <div className="max-sm:text-xs text-[#2f2323] flex flex-row max-sm:flex-col items-start max-sm:items-center gap-2 justify-start p-2 pb-4 border-b-2 border-dashed border-gray-300  max-w-[100%]">
                    // <div className="w-[20%] max-sm:w-fit flex justify-center items-start">
                    //   <img
                    //     className="w-[200px] h-[200px] max-sm:h-[130px] object-cover rounded-md"
                    //     src={
                    //       profileImage
                    //         ? profileImage
                    //         : "https://res.cloudinary.com/dtbl4jg02/image/upload/v1708079292/y64qrkckvddolin49rhz.png"
                    //     }
                    //   />
                    // </div>
                    //   <p className="w-[80%] overflow-x-scroll no-scrollbar whitespace-pre text-wrap text-left text-sm max-sm:text-xs max-sm:w-full max-sm:text-center">
                    //     {parseTextToJSX(coachDescription)}
                    //   </p>
                    // </div>
                    <div className="flex flex-row items-start justify-around max-sm:flex-col max-sm:justify-center max-sm:items-center overflow-x-scroll no-scrollbar border-b-2 border-dashed border-gray-300 pb-4">
                      <div className="w-[20%] max-sm:w-fit max-sm:mb-4">
                        <img
                          className="w-[200px] h-[200px] max-sm:h-[130px] object-cover rounded-md"
                          src={
                            profileImage
                              ? profileImage
                              : "https://res.cloudinary.com/dtbl4jg02/image/upload/v1708079292/y64qrkckvddolin49rhz.png"
                          }
                        />
                      </div>
                      <p className="w-[80%] max-sm:w-full text-wrap text-left max-sm:text-justify">
                        {parseTextToJSX(coachDescription)}
                      </p>
                    </div>
                  ) : (
                    <div className="max-sm:text-xs text-[#2f2323] flex flex-row max-sm:flex-col items-center max-sm:items-center gap-2 justify-center p-2 pb-4 border-b-2 border-dashed border-gray-300">
                      <div className="w-[20%] max-sm:w-fit flex justify-center items-start">
                        <img
                          className="w-[200px] h-[200px] max-sm:h-[130px] object-cover rounded-md"
                          src={
                            profileImage
                              ? profileImage
                              : "https://res.cloudinary.com/dtbl4jg02/image/upload/v1708079292/y64qrkckvddolin49rhz.png"
                          }
                        />
                      </div>
                      <p className="w-[80%] text-left text-sm max-sm:text-xs max-sm:w-full max-sm:text-center">
                        {coachDescription}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="max-sm:text-xs text-[#2f2323] flex flex-row max-sm:flex-col items-center gap-2 justify-center p-2 border border-gray-200 bg-white rounded-lg">
                  <div className="w-[20%] max-sm:w-fit flex justify-center items-center">
                    <img
                      className="w-[200px] h-[200px] max-sm:h-[130px] object-cover rounded-md"
                      src={
                        "https://res.cloudinary.com/dtbl4jg02/image/upload/v1708079292/y64qrkckvddolin49rhz.png"
                      }
                    />
                  </div>{" "}
                  <p className="w-[80%] max-sm:w-full text-left  max-sm:text-center">
                    {" "}
                    I'm Aarav Sharma, a seasoned corporate coach with 15+ years'
                    experience in leadership development. Holding a master's in
                    organizational psychology and certifications in executive
                    coaching, I've collaborated with top-tier companies. My
                    coaching style, a unique blend of empathy and strategic
                    thinking, fosters a growth mindset and aligns personal
                    values with professional goals. Known for approachability, I
                    create a safe space for executives, incorporating
                    mindfulness for self-awareness and resilience. Tailoring
                    strategies to individual needs, I aim to be a trusted guide
                    for long-term, sustainable leadership development in the
                    dynamic corporate landscape.
                  </p>
                </div>
              )}
              {discussiionTopics.length > 0 && (
                <div className="max-sm:text-xs text-[#2f2323] flex flex-col max-sm:flex-col items-center gap-2 justify-center p-2 border border-gray-200 bg-white rounded-lg mt-4">
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
              {botScenarioCase !== "icons_by_ai" && (
                <Link href={"#howItWorks"}>
                  <Button
                    variant={"secondary"}
                    className="border border-gray-200 h-8 hover:cursor-pointer"
                  >
                    How AI Frame works
                  </Button>
                </Link>
              )}

              {/* {feedbackBotId && (
                <Link target="_blank" href={`/feedback/${feedbackBotId}`}>
                  <Button
                    variant={"secondary"}
                    className="border border-gray-200 h-8 hover:cursor-pointer"
                  >
                    Feedback center
                  </Button>
                </Link>
              )} */}
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
            {botScenarioCase !== "icons_by_ai" && (
              <div className="w-full" id="howItWorks">
                <div className={`w-full flex justify-center`}>
                  <Badge
                    variant={"secondary"}
                    className="bg-[#2DC092] z-10 h-6 w-fit text-white text-lg py-3 hover:bg-[#2DC092] text-center mb-8 mt-12 max-sm:mt-8 max-sm:text-sm"
                  >
                    How AI Frame works
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
      </div>
      // ) : (
      //   <>
      //     <div className="fixed w-full flex items-center justify-end p-4 h-6 py-8 !z-[800]">
      //       <NetworkNav user={user} />
      //     </div>
      //     <div className="fixed left-0 top-0 flex h-screen w-screen overflow-x-hidden items-center justify-center bg-foreground/30 backdrop-blur-sm z-50">
      //       <div className="flex flex-col items-center justify-center">
      //         <p className="font-semibold text-sm">
      //           You have not enrolled as a program participant. Please enroll
      //           and try again.
      //         </p>
      //       </div>
      //     </div>
      //   </>
      // )}
      // </>
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
