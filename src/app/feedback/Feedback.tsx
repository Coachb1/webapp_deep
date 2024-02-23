"use client";

import BotsNavigation from "@/components/BotsNavigation";
import KudosWall from "@/components/KudosWall";
import NavProfile from "@/components/NavProfile";
import NoLoginFlag from "@/components/NoLoginFlag";
import WhereToUse from "@/components/WhereToUse";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { convertDate, getUserAccount, reportsLinksSelector } from "@/lib/utils";
import { AlertTriangle, CornerDownRight, Loader, Quote } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";
import { baseURL, basicAuth } from "@/lib/utils";
import NetworkNav from "@/components/NetworkNav";
import { toast } from "sonner";

interface Message {
  question: string;
  answer: string;
}

interface feedbackConversationType {
  participant_name: string;
  date: string;
  msg: Message[];
}

const convertJsonToStateFormat = (jsonData: any) => {
  return jsonData.map((item: any) => {
    const { participant_name, date, msg } = item;

    const formattedMsg = Object.entries(msg).map(([question, answer]) => ({
      question,
      answer,
    }));

    return {
      participant_name,
      date,
      msg: formattedMsg,
    };
  });
};
const howItWorks = [
  {
    heading: "Thumbs Up or Thumbs Down",
    description:
      "Thumbs Up triggers an instant email notification to you, celebrating the positive feedback. Thumbs Down maintains privacy, with no email notification to allow internal resolution.",
  },
  {
    heading: "Follow-up Questions",
    description:
      "Users who thumbs up can answer additional customized questions, providing more detailed, meaningful feedback to drive insights.",
  },
  {
    heading: "Optional Anonymity",
    description:
      "After completing the feedback process, clients can choose to submit their feedback along with their email address or remain anonymous.",
  },
  {
    heading: "Email Summaries",
    description:
      "At the end of the feedback process both parties receive an email with a feedback summary, promoting transparency and accountability.",
  },
];

const benefitsData = [
  {
    heading: "Real-time Recognition",
    description:
      "The bot owner and the user receive instant email notifications the moment a user selects thumbs-up, to celebrate positive feedback right away. This enables a culture of recognition and motivation.",
  },
  {
    heading: "Enhanced Team Relations",
    description:
      "Regular feedback fosters strong team relationships, helping you understand their needs better and improving overall satisfaction. It can be also used to gather feedback from external stakeholders like vendors, clients as well.",
  },
  {
    heading: "Improved Accountability",
    description:
      "Email summaries create transparency around feedback, holding both parties accountable for addressing positives and negatives appropriately. This drives continuous improvement.",
  },
  {
    heading: "PMS Integration",
    description:
      "Seamless integration with performance management systems sends feedback data automatically, minimizing manual processes.",
  },
];

const staticPositiveFeedbacks = [
  {
    name: "Sneha Patel",
    date: "12 January, 2024",
    feedback_message:
      "Amit Trivedi's leadership has been a game-changer. His commitment to continuous improvement and innovation, along with the chatbot for coaching, has strengthened our team. Grateful for the guidance!",
  },
  {
    name: "Rajesh Kumar",
    date: "12 January, 2024",
    feedback_message:
      "Amit Trivedi's leadership is truly inspiring. The coaching chatbot has been a game-changer, providing instant access to valuable insights. His approach encourages accountability and ownership. Thumbs up!",
  },
  {
    name: "Priya Sharma",
    date: "12 January, 2024",
    feedback_message:
      "Amit Trivedi's leadership has flourished our division. The coaching chatbot is a brilliant tool, offering tailored advice. His focus on continuous improvement and open communication has transformed our dynamics. Thumbs up!",
  },
];

const feedbackJsonConversion = (jsonData: any) => {
  return jsonData.positive_msgs.map((msg: any) => {
    return {
      name: msg.participant_name,
      date: msg.date,
      feedback_message: msg.msg["Why are you giving me a thumbs up today?"],
    };
  });
};

const Feedback = ({ user, renderType }: any) => {
  const pathname = usePathname();

  // const [enrolled, setEnrolled] = useState(false);

  const [coachName, setCoachName] = useState<string>("");
  const [coachDescription, setCoachDescription] = useState<string>("");
  const [currentProjects, setCurrentProjects] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  //login walls
  const [loginRequired, setLoginRequired] = useState<boolean>();
  const [strictLoginRequired, setStrictLoginRequired] = useState<boolean>();

  interface feedbackType {
    name: string;
    date: string;
    feedback_message: string;
  }

  const [positiveFeedbacks, setPositiveFeedbacks] = useState<feedbackType[]>(
    []
  );

  const [feedbackConversations, setFeedbackConversations] = useState<
    feedbackConversationType[]
  >([]);

  const [invalidId, setInValidCoach] = useState(false);

  //for owner verific
  const [userId, setUserId] = useState<string>("");
  const [userIdFromBotDetails, setUserIdFromBotDetails] = useState<string>("");
  const [profileImage, setProfileImage] = useState("");
  useEffect(() => {
    setIsLoading(true);

    if (user) {
      getUserAccount(user)
        .then((res) => res.json())
        .then((data) => {
          setUserId(data.uid);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    fetch(
      `${baseURL}/accounts/get-bot-details/?bot_id=${
        renderType === "dynamic"
          ? pathname.split("/")[2]
          : "feedback-d55cd-aravsharma"
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
        const coachScribe =
          document.getElementsByClassName("deep-chat-poc2")[0];

        if (renderType === "dynamic") {
          console.log("DYNAMIC FEEDBACK DATA ", data);
          if (data.error) {
            coachScribe.setAttribute("style", "display: none;");
            setInValidCoach(true);
          }
          setCoachName(data.data.bot_details.coach_name);

          if (data.data.bot_details.info) {
            setCoachDescription(data.data.bot_details.info);
          } else if (data.data.additional_data.short_profile_bio) {
            setCoachDescription(data.data.additional_data.short_profile_bio);
          }
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
        setProfileImage(data.data.owner_profile_image);
        setUserIdFromBotDetails(data.data.user_id);
        if (data.data.additional_data !== null) {
          setCurrentProjects(data.data.additional_data?.current_projects);
        }
        if (!data.data.is_sample_bot && !data.data.is_system_bot) {
          fetch(`${baseURL}/accounts/`, {
            method: "POST",
            headers: {
              Authorization: basicAuth,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_context: {
                name: user.given_name,
                role: "member",
                user_attributes: {
                  tag: "deepchat_profile",
                  attributes: {
                    username: "web_user",
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
                  if (data.data.length === 0) {
                    const coachScribe =
                      document.getElementsByClassName("deep-chat-poc2")[0];

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
        fetch(
          `${baseURL}/accounts/get-user-feedback-data/?method=get&bot_id=${
            renderType === "dynamic"
              ? pathname.split("/")[2]
              : "feedback-d55cd-aravsharma"
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
            setIsLoading(false);
            console.log("feedback DATA", data);
            setPositiveFeedbacks(feedbackJsonConversion(data));
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.error(err);
        setInValidCoach(true);
      });
  }, []);

  useEffect(() => {
    fetch(
      `${baseURL}/accounts/get-user-feedback-data/?method=get&bot_id=${
        renderType === "dynamic"
          ? pathname.split("/")[2]
          : "feedback-d55cd-aravsharma"
      }&feedback_type=negative`,
      {
        method: "GET",
        headers: {
          Authorization: basicAuth,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data.critical_msgs.length > 0) {
          console.log(convertJsonToStateFormat(data.critical_msgs));
          const convertedCriticalFeedbacks = convertJsonToStateFormat(
            data.critical_msgs
          );
          const sortedByLatestDates: feedbackConversationType[] =
            convertedCriticalFeedbacks.sort(
              (a: any, b: any) =>
                new Date(b.date).getTime() - new Date(a.date).getTime()
            );
          console.log(sortedByLatestDates);
          setFeedbackConversations(sortedByLatestDates);
        } else {
          setFeedbackConversations([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const FeedbackBotBody = () => {
    return (
      <>
        {/* {enrolled ? (
          <> */}
        {renderType === "static" && (
          <Script src="../widget/coachbots-stt-widget.js" />
        )}

        {!loginRequired && (
          <div className="fixed bottom-12 right-[100px] z-50 max-sm:hidden">
            <span className="mr-6 text-sm font-bold">Try Now</span>
            <CornerDownRight className="ml-4 h-12 w-12 text-gray-600" />
          </div>
        )}

        {invalidId && renderType === "dynamic" && (
          <div className="bg-foreground/30 fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center overflow-x-hidden backdrop-blur-sm">
            <div className="rounded-md bg-red-100 p-2 text-sm text-red-800">
              <AlertTriangle className="mr-2 inline h-4 w-4" />
              We have encountered an error. Please try again.{" "}
            </div>
          </div>
        )}
        <div className="grainy h-full min-h-screen bg-gray-100 pb-16 max-sm:h-full max-sm:min-h-screen">
          <div className="fixed !z-[800] flex h-6 w-full items-center justify-end p-4 py-8">
            <NetworkNav user={user} />
          </div>
          <div className="flex flex-col items-center justify-center px-24 pt-20 text-center max-sm:px-8">
            <h1 className="mb-6 mt-10 border-2 border-[#2DC092] p-[3px] text-xl font-extrabold text-[#2DC092]">
              <span className="mr-[4px] bg-[#2DC092] p-[4px] text-lg font-bold text-white">
                COACH
              </span>
              BOTS
            </h1>
            <div>
              <h1 className="mt-0 text-5xl font-bold text-gray-600 max-sm:text-2xl  md:text-6xl lg:text-4xl ">
                Hey this is{" "}
                {renderType === "dynamic" ? coachName : "Aarav Sharma"}, Love to
                hear your feedback!
              </h1>

              <div className="mt-4">
                {renderType === "dynamic" ? (
                  <>
                    <div className="flex flex-row items-center justify-center gap-2 rounded-lg border border-gray-200 bg-amber-50 p-2 text-[#2f2323] max-sm:flex-col max-sm:text-xs">
                      <div className="flex w-[20%] items-center justify-center max-sm:w-fit">
                        <img
                          className="h-[200px] w-[200px] rounded-md object-cover max-sm:h-[130px]"
                          src={profileImage}
                        />
                      </div>{" "}
                      <p className="w-[80%] text-left max-sm:w-full  max-sm:text-center">
                        {" "}
                        {coachDescription}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="max-sm:text-xs text-[#2f2323] flex flex-row max-sm:flex-col items-center gap-2 justify-center p-2 border border-gray-200 bg-amber-50 rounded-lg">
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
                      I'm Aarav Sharma, a seasoned corporate coach with 15+
                      years' experience in leadership development. Holding a
                      master's in organizational psychology and certifications
                      in executive coaching, I've collaborated with top-tier
                      companies. My coaching style, a unique blend of empathy
                      and strategic thinking, fosters a growth mindset and
                      aligns personal values with professional goals. Known for
                      approachability, I create a safe space for executives,
                      incorporating mindfulness for self-awareness and
                      resilience. Tailoring strategies to individual needs, I
                      aim to be a trusted guide for long-term, sustainable
                      leadership development in the dynamic corporate landscape.
                    </p>
                  </div>
                )}
              </div>
              {currentProjects && (
                <div className="mt-4 rounded-lg border border-gray-200 bg-teal-50 p-2 max-sm:text-xs">
                  <p className="my-2">
                    <b>Current projects : </b> {currentProjects}
                  </p>
                </div>
              )}

              <div className="my-4 text-[#2f2323] max-sm:text-xs">
                <p className="rounded-lg border border-gray-200 bg-blue-100 p-2">
                  {" "}
                  Thank you for taking the time! Your feedback is invaluable to
                  me. Please take a moment to share your experience by selecting
                  either a thumbs up or thumbs down. I have a few additional
                  questions to gather more details about your experience. Please
                  share your honest answers to the questions. Your input helps
                  me improve, and I genuinely appreciate your time and insights.
                </p>
              </div>
            </div>
            <div className="mt-8 flex flex-row flex-wrap gap-2 max-sm:items-center max-sm:justify-center z-10">
              <Link href={"#kudos"}>
                <Button
                  variant={"secondary"}
                  className="h-8 border border-gray-200 hover:cursor-pointer"
                >
                  Kudos Wall
                </Button>
              </Link>

              <Link href={"#howItWorks"}>
                <Button
                  variant={"secondary"}
                  className="h-8 border border-gray-200 hover:cursor-pointer"
                >
                  How it works
                </Button>
              </Link>
              <Link href="#critical-feedback">
                {userId === userIdFromBotDetails && (
                  <Button
                    variant={"secondary"}
                    className="h-8 border border-gray-200 hover:cursor-pointer"
                  >
                    Critical Feedbacks {renderType !== "dynamic" && "(sample)"}
                  </Button>
                )}
              </Link>
              <Link href={"#benefits"}>
                <Button
                  variant={"secondary"}
                  className="h-8 border border-gray-200 hover:cursor-pointer"
                >
                  Benefits
                </Button>
              </Link>
            </div>
            {/* kudosWall */}
            <div className="w-full  pt-20 -mt-20 " id="kudos">
              <div className={`flex w-full justify-center`}>
                <Badge
                  variant={"secondary"}
                  className="z-10 mb-8 mt-12 h-6 w-fit bg-[#2DC092] py-3 text-center text-lg text-white hover:bg-[#2DC092] max-sm:mt-8 max-sm:text-sm"
                >
                  Kudos Wall
                </Badge>
              </div>
              <div className="w-full">
                <div className="relative isolate mx-auto">
                  <div>
                    <div className="z-50 mx-auto mt-[-1.5rem] max-sm:w-[100%] lg:px-8">
                      <div className="no-scrollbar flex  max-h-[450px] flex-col gap-2 overflow-scroll rounded-xl bg-[url(https://cdn.statically.io/gh/falahh6/coachbots/main/kudoswallbg.svg)] p-2 ring-1 ring-inset ring-gray-900/10 max-sm:w-[100%] lg:-m-4 lg:rounded-2xl lg:p-4">
                        {renderType === "dynamic" ? (
                          <>
                            {positiveFeedbacks.length > 0 ? (
                              <>
                                {positiveFeedbacks.map((feedback) => (
                                  <KudosWall
                                    name={feedback.name}
                                    feedback={feedback.feedback_message}
                                    date={convertDate(feedback.date)}
                                  />
                                ))}
                              </>
                            ) : (
                              <>
                                <p className="my-5 w-full text-center text-sm font-semibold text-gray-600">
                                  No Feedbacks yet
                                </p>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {staticPositiveFeedbacks.map((feedback) => (
                              <KudosWall
                                name={feedback.name}
                                feedback={feedback.feedback_message}
                                date={feedback.date}
                              />
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Critical Feedback */}
            {userId === userIdFromBotDetails && (
              <div className="w-full pt-20 -mt-20" id="critical-feedback">
                <div className={`flex w-full justify-center`}>
                  <Badge
                    variant={"secondary"}
                    className="z-10 mb-8 mt-12 h-6 w-fit bg-[#2DC092] py-3 text-center text-lg text-white hover:bg-[#2DC092] max-sm:mt-8 max-sm:text-sm"
                  >
                    Critical Feedback
                  </Badge>
                </div>
                <div className="w-full">
                  <div className="relative isolate mx-auto">
                    <div>
                      <div className="z-50 mx-auto mt-[-1.5rem] max-sm:w-[100%] lg:px-8">
                        <div className="no-scrollbar flex bg-white max-h-[450px] flex-col gap-2 overflow-scroll rounded-xl  p-2 ring-1 ring-inset ring-gray-900/10 max-sm:w-[100%] lg:-m-4 lg:rounded-2xl lg:p-4">
                          {feedbackConversations.length > 0 ? (
                            <div className="w-full text-left">
                              <div className="text-sm w-full ml-0  rounded-md text-slate-800 flex flex-col gap-2 max-sm:text-xs min-h-[109px]">
                                <div className="flex flex-col justify-start items-start rounded-md">
                                  <div className="flex flex-col w-full">
                                    {feedbackConversations.map(
                                      (feedbacks, i) => (
                                        <div className="w-full border bg-gray-100 my-2 px-2 rounded-sm">
                                          <Accordion
                                            type="single"
                                            collapsible
                                            className="w-full"
                                          >
                                            <AccordionItem
                                              value="item-1"
                                              className="border-none"
                                            >
                                              <AccordionTrigger>
                                                <p className="flex flex-row max-sm:flex-col max-sm:text-left">
                                                  <span>
                                                    <b>Feedeback provider</b> :{" "}
                                                    {feedbacks.participant_name}{" "}
                                                    <span className="max-sm:hidden mx-2">
                                                      |
                                                    </span>
                                                  </span>{" "}
                                                  <span>
                                                    <b>Feedback Date</b> :{" "}
                                                    {convertDate(
                                                      feedbacks.date
                                                    )}
                                                  </span>
                                                </p>
                                              </AccordionTrigger>
                                              <AccordionContent>
                                                <div>
                                                  {feedbacks.msg.map(
                                                    (convo) => (
                                                      <>
                                                        <div className="flex justify-start ">
                                                          <div className="flex flex-col items-start justify-start p-2 w-[80%]">
                                                            <div className="bg-blue-100 text-sm max-sm:text-xs p-2 rounded-md max-sm:full">
                                                              <h4 className="font-bold">
                                                                Question
                                                              </h4>
                                                              <p>
                                                                {convo.question}
                                                              </p>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className="flex justify-end">
                                                          <div className="flex  p-2 w-[80%] flex-col items-end justify-end rounded-2xl">
                                                            <div className=" bg-blue-100 text-sm max-sm:text-xs p-2 rounded-md  max-sm:w-full">
                                                              <h4 className="font-bold">
                                                                Answer
                                                              </h4>
                                                              <p>
                                                                {convo.answer}
                                                              </p>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </>
                                                    )
                                                  )}
                                                </div>
                                              </AccordionContent>
                                            </AccordionItem>
                                          </Accordion>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className=" w-full h-20 flex items-center justify-center">
                                <div>No Feedbacks yet.</div>{" "}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* <div id="wtu">
              <WhereToUse />
            </div> */}
            <div className="w-full  pt-20 -mt-20 " id="howItWorks">
              <div className={`flex w-full justify-center`}>
                <Badge
                  variant={"secondary"}
                  className="z-10 mb-8 mt-12 h-6 w-fit bg-[#2DC092] py-3 text-center text-lg text-white hover:bg-[#2DC092] max-sm:mt-8 max-sm:text-sm"
                >
                  How it works
                </Badge>
              </div>
              <div className="w-full">
                <div className="relative isolate mx-auto">
                  <div>
                    <div className="z-50 mx-auto mt-[-1.5rem] max-w-3xl px-6 max-sm:w-[100%] lg:px-8">
                      <div className="rounded-xl bg-white p-2 ring-1 ring-inset ring-gray-900/10 max-sm:w-[100%] lg:-m-4 lg:rounded-2xl lg:p-4">
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
                              <AccordionContent className="text-left max-sm:text-xs">
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
            <div className="w-full  pt-20 -mt-20 " id="benefits">
              <div className={`flex w-full justify-center`}>
                <Badge
                  variant={"secondary"}
                  className="z-10 mb-8 mt-12 h-6 w-fit bg-[#2DC092] py-3 text-center text-lg text-white hover:bg-[#2DC092] max-sm:mt-8 max-sm:text-sm"
                >
                  Benefits
                </Badge>
              </div>
              <div className="w-full">
                <div className="relative isolate mx-auto">
                  <div>
                    <div className="z-50 mx-auto mt-[-1.5rem] max-w-3xl px-6 max-sm:w-[100%] lg:px-8">
                      <div className="rounded-xl bg-white p-2 ring-1 ring-inset ring-gray-900/10 max-sm:w-[100%] lg:-m-4 lg:rounded-2xl lg:p-4">
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
                              <AccordionContent className="text-left max-sm:text-xs">
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
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      {isLoading && (
        <div className="bg-foreground/30 fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center overflow-x-hidden backdrop-blur-2xl">
          <div className="rounded-md bg-gray-300 p-2 text-sm">
            <Loader className="mr-2 inline h-4 w-4 animate-spin" />
            Please wait while we prepare your coach.
          </div>
        </div>
      )}

      {!strictLoginRequired && user && <FeedbackBotBody />}
      {strictLoginRequired && user && <FeedbackBotBody />}
      {strictLoginRequired && !user && (
        <>
          <NoLoginFlag />
        </>
      )}
    </>
  );
};

export default Feedback;
