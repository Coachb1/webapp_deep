"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import NavProfile from "@/components/NavProfile";
import {
  BookmarkCheck,
  FileClock,
  LibraryBig,
  Loader,
  MailPlus,
  PiIcon,
  Workflow,
} from "lucide-react";
import Image from "next/image";
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
  const pathname: any = usePathname();

  const [coachName, setCoachName] = useState<string>("");
  const [coachDescription, setCoachDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

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
          setCoachName(data.data.bot_details.coach_name);
          setCoachDescription(data.data.bot_details.info);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const benefitsData = [
    {
      heading: " Transcription Email",
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
      {isLoading && renderType === "dynamic" && (
        <div className="fixed left-0 top-0 flex h-screen w-screen overflow-x-hidden items-center justify-center bg-foreground/30 backdrop-blur-2xl z-50">
          <div className="p-2 bg-gray-300 rounded-md text-sm">
            <Loader className="h-4 w-4 mr-2 animate-spin inline" />
            Please wait while we prepare your coach.{" "}
          </div>
        </div>
      )}
      <div className="bg-gray-100 min-h-screen h-full grainy max-sm:h-full max-sm:min-h-screen pb-16">
        <div className="fixed w-full flex items-center justify-end p-4 h-6 py-8 !z-[800]">
          <NavProfile user={user} />
        </div>
        <div className="flex pt-20 flex-col items-center justify-center text-center px-24 max-sm:px-8">
          <div>
            <h1 className="text-5xl mt-16 font-bold md:text-6xl lg:text-4xl text-gray-700 max-sm:text-3xl max-sm:px-4 bg-gradient-to-br from-gray-700 to-gray-400 bg-clip-text text-transparent">
              {renderType === "dynamic"
                ? `Welcome to ${coachName}'s Avatar`
                : "Welcome to Your Coach's Avatar"}
            </h1>
            <p className="my-4 max-sm:text-sm text-[#7f7f7f]">
              {renderType === "dynamic"
                ? coachDescription
                : "This is your coach/mentor's personalized bot. Here, you would typically find a detailed description of your coach/mentor—highlighting their expertise, approach, and unique coaching/mentoring style. Dive into the detailed sections to explore the benefits and learn how it all works. Our bot is trained on the coach/ mentor's style, ideologies, and coaching/mentoring style, ensuring a tailored and effective coaching experience."}
            </p>
          </div>

          <div className="w-full text-center flex flex-col justify-center items-center my-8">
            <div className="my-5 mb-2 text-white font-semibold w-fit bg-[#2DC092] px-4 py-1 rounded-2xl">
              {" "}
              <Workflow className="h-5 w-5 mr-1 inline" />{" "}
              <p className=" inline text-sm"> How it works?</p>
            </div>
            <div className="w-[75%] max-sm:w-full text-[#7f7f7f] max-sm:text-sm py-8 ml-6 max-sm:ml-0 bg-white rounded-xl border border-gray-200">
              <div className="w-full flex flex-row justify-center gap-3 items-center">
                <div className="w-[50%] flex justify-end border-r border-gray-300 py-6 max-sm:border-none">
                  <Image
                    src={"/undraw_segment_analysis_re_ocsl.svg"}
                    width={270}
                    height={270}
                    alt="working-1"
                    className="p-8"
                  />
                </div>
                <div className="w-[50%] h-full text-left ml-3 text-sm max-sm:text-xs p-3">
                  <p className="text-xl font-bold text-blue-500 ">1</p>
                  <h1 className="font-bold text-gray-700">Fitment Analysis</h1>
                  <p className="max-sm:text-[10px]">
                    Discover the perfect match! Our fitment analysis assesses
                    compatibility between you and your coach/mentor, ensuring a
                    harmonious coaching relationship.
                  </p>
                </div>
              </div>
              <div className="w-full flex flex-row justify-center gap-3 items-center max-sm:text-xs ">
                <div className="w-[50%] h-full text-right pr-16 max-sm:pr-2 text-sm max-sm:text-xs p-3">
                  <p className="text-xl font-bold text-blue-500 w-full">2</p>
                  <h1 className="font-bold text-gray-700">
                    Sessions Orientation
                  </h1>
                  <p className="">
                    Prepare for your session! Access valuable information about
                    your coach/mentor before your session, providing a clear
                    picture of their expertise and style.
                  </p>
                </div>
                <div className="w-[50%] flex justify-start border-l border-gray-300 py-6 -ml-[2.40rem] max-sm:ml-0 max-sm:border-none">
                  <Image
                    src={"/undraw_meeting_re_i53h.svg"}
                    width={270}
                    height={270}
                    alt="working-2"
                    className="p-8"
                  />
                </div>
              </div>
              <div className="w-full flex flex-row justify-center gap-3 items-center ">
                <div className="w-[50%] flex justify-end border-r border-gray-300 py-6 max-sm:border-none">
                  <Image
                    src={"/undraw_chat_bot_re_e2gj.svg"}
                    width={270}
                    height={270}
                    alt="working-1"
                    className="p-8"
                  />
                </div>
                <div className="w-[50%] h-full text-left ml-3 text-sm max-sm:text-xs p-3">
                  <p className="text-xl font-bold text-blue-500 ">3</p>
                  <h1 className="font-bold text-gray-700">
                    Interim Conversation
                  </h1>
                  <p>
                    Stay connected between sessions! Engage in interim
                    conversations, gaining insights and guidance whenever you
                    need it.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full text-center flex flex-col justify-center items-center my-8 max-sm:mt-2">
            <div className="my-5 mb-2 text-white font-semibold w-fit bg-[#2DC092] px-4 py-1 rounded-2xl">
              {" "}
              <BookmarkCheck className="h-5 w-5 mr-1 inline" />{" "}
              <p className=" inline text-sm"> Benefits</p>
            </div>
            <div className="w-[75%] flex flex-row max-sm:w-full text-[#7f7f7f] max-sm:text-sm py-8 ml-6 max-sm:ml-0 bg-white rounded-xl border border-gray-200 p-6 gap-4 max-sm:flex-col">
              {benefitsData.map((benefit, i) => (
                <div className="rounded-xl border-2 border-slate-400/10 bg-neutral-100 dark:bg-neutral-900 p-8 flex flex-col items-center justify-center max-sm:items-start max-sm:justify-start">
                  <div>{benefit.icon}</div>
                  <div className="text-sm text-slate-600 max-sm:text-left">
                    {" "}
                    <p className="font-bold text-lg max-sm:text-sm">
                      {benefit.heading}
                    </p>
                    <p className="text-[13px] max-sm:text-xs">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full text-center flex flex-col justify-center items-center my-8 max-sm:my-2 max-sm:mt-2">
            <div className="my-5 mb-2 text-white font-semibold w-fit bg-[#2DC092] px-4 py-1 rounded-2xl">
              {" "}
              <p className=" inline text-sm"> Disclaimer</p>
            </div>
            <p className="w-[80%]  text-[#7f7f7f] text-sm max-sm:text-xs max-sm:w-full">
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
