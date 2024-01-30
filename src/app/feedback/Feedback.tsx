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
import { convertDate } from "@/lib/utils";
import { AlertTriangle, CornerDownRight, Loader, Quote } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";
import { baseURL, basicAuth } from "@/lib/utils";
import NetworkNav from "@/components/NetworkNav";

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
  const [enrolled, setEnrolled] = useState(false);

  const [coachName, setCoachName] = useState<string>("");
  const [coachDescription, setCoachDescription] = useState<string>("");
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

  const [invalidId, setInValidCoach] = useState(false);

  useEffect(() => {
    setIsLoading(true);

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
          setCoachDescription(data.data.bot_details.info);
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
              ).then((response) => {
                if (!response.ok) {
                  setEnrolled(false);
                  const coachScribe =
                    document.getElementsByClassName("deep-chat-poc2")[0];
                  coachScribe.setAttribute("style", "display: none;");
                }
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

  const FeedbackBotBody = () => {
    return (
      <>
        {enrolled ? (
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
                {/* <NavProfile user={user} />
                <BotsNavigation user={user} /> */}
                <NetworkNav user={user} />
              </div>
              <div className="flex pt-20 flex-col items-center justify-center text-center px-24 max-sm:px-8">
                <h1 className="text-[#2DC092] border-2 border-[#2DC092] p-[3px] text-xl font-extrabold mt-10 mb-6">
                  <span className="bg-[#2DC092] text-white text-lg font-bold mr-[4px] p-[4px]">
                    COACH
                  </span>
                  BOTS
                </h1>
                <div>
                  <h1 className="text-5xl mt-0 font-bold md:text-6xl lg:text-4xl  max-sm:text-2xl text-gray-600 ">
                    Love to hear your feedback
                  </h1>

                  {renderType !== "dynamic" && (
                    <p className="my-4 max-sm:text-xs text-[#2f2323]">
                      This section is about the user profile who is looking to
                      get feedback.
                    </p>
                  )}
                  <div className="p-2 mt-4 border border-gray-200 bg-amber-50 rounded-lg">
                    {renderType === "dynamic" ? (
                      <p className="max-sm:text-xs text-[#2f2323]">
                        {coachDescription}
                      </p>
                    ) : (
                      <p className="max-sm:text-xs text-[#2f2323]">
                        Hi, I am Amit Trivedi, a results-driven senior manager
                        with over 15 years of experience leading
                        cross-functional teams across India. I hold an MBA from
                        IIM Ahmedabad and PMP certification. Currently, I lead
                        the software development division, managing a team of 35
                        engineers across cloud architecture, QA, and agile
                        delivery functions. I value candid feedback and strive
                        for continuous improvement at both a personal and
                        organizational level.
                      </p>
                    )}
                  </div>
                  <div className="my-4 max-sm:text-xs text-[#2f2323]">
                    <p className="p-2 border border-gray-200 bg-blue-100 rounded-lg">
                      {" "}
                      Thank you for taking the time! Your feedback is invaluable
                      to me. Please take a moment to share your experience by
                      selecting either a thumbs up or thumbs down. I have a few
                      additional questions to gather more details about your
                      experience. Please share your honest answers to the
                      questions. Your input helps me improve, and I genuinely
                      appreciate your time and insights.
                    </p>
                  </div>
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
                  <Link href={"#kudos"}>
                    <Button
                      variant={"secondary"}
                      className="border border-gray-200 h-8 hover:cursor-pointer"
                    >
                      Kudos Wall
                    </Button>
                  </Link>
                  <Link href={"#wtu"}>
                    <Button
                      variant={"secondary"}
                      className="border border-gray-200 h-8 hover:cursor-pointer"
                    >
                      Where to use
                    </Button>
                  </Link>
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
                {/* kudosWall */}
                <div className="w-full" id="kudos">
                  <div className={`w-full flex justify-center`}>
                    <Badge
                      variant={"secondary"}
                      className="bg-[#2DC092] z-10 h-6 w-fit text-white text-lg py-3 hover:bg-[#2DC092] text-center mb-8 mt-12 max-sm:mt-8 max-sm:text-sm"
                    >
                      Kudos Wall
                    </Badge>
                  </div>
                  <div className="w-full">
                    <div className="relative isolate mx-auto">
                      <div>
                        <div className="mx-auto lg:px-8 mt-[-1.5rem] max-sm:w-[100%] z-50">
                          <div className="rounded-xl p-2  bg-[url(https://cdn.statically.io/gh/falahh6/coachbots/main/kudoswallbg.svg)] ring-1 ring-inset ring-gray-900/10 lg:-m-4 max-h-[450px] lg:rounded-2xl lg:p-4 max-sm:w-[100%] flex flex-col overflow-scroll no-scrollbar gap-2">
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
                                    <p className="text-center text-sm w-full my-5 font-semibold text-gray-600">
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
                <div id="wtu">
                  <WhereToUse />
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
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="fixed w-full flex items-center justify-end p-4 h-6 py-8 !z-[800]">
              <NetworkNav user={user} />
            </div>
            <div className="fixed left-0 top-0 flex h-screen w-screen overflow-x-hidden items-center justify-center bg-foreground/30 backdrop-blur-sm z-50">
              <div className="flex flex-col items-center justify-center">
                <p className="font-semibold text-sm mb-2">
                  You have not enrolled as a program participant. Please enroll
                  and try again.
                </p>
                <Link href="/">
                  <Button variant={"outline"} className={` h-8 max-sm:text-sm`}>
                    Return to home
                  </Button>
                </Link>
              </div>
            </div>
          </>
        )}
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
