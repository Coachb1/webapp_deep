"use client";

import { NavProfileWoProfile } from "@/components/NavProfile";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getUserAccount } from "@/lib/utils";
import { AlertTriangle, CornerDownRight, Loader } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";
import { baseURL, basicAuth } from "@/lib/utils";
import { toast } from "sonner";

const howItWorks = [
  {
    heading:
      "1. What is a deep dive survey and how it is different from the normal pulse surveys?",
    description:
      "Deep dive surveys are like running 1:1 check ins or interviews with your target subjects to really understand the core issue at hand and the story behind it. Something that is not possible in normal pulse surveys. Ths will greatly aid in the the decision making beyond just numbers.",
  },
  {
    heading: "2. Circulate with Ease",
    description:
      "Each survey comes with a unique link and access code, making it simple to share and ensuring only intended recipients can provide feedback.",
  },
  {
    heading: "3. Gather Valuable Feedback",
    description:
      "Responses are collected and analyzed to highlight underlying issues and areas for improvement, offering deeper insights than standard survey tools.",
  },
  {
    heading: "4. Resolve Conflicts Effectively",
    description:
      "The detailed feedback helps you understand the root causes of conflicts, facilitating targeted and effective resolution strategies.",
  },
];

const benefitsData = [
  {
    heading: "Enhanced Team Understanding",
    description:
      "Gain deeper insights into the underlying causes of team conflicts, allowing for more targeted and effective interventions.",
  },
  {
    heading: "Improved Conflict Resolution",
    description:
      "By identifying specific issues and areas for improvement, you can implement strategies to resolve conflicts more efficiently and prevent them from recurring.",
  },
  {
    heading: "Increased Team Productivity",
    description:
      "Addressing and mitigating conflicts leads to a more harmonious work environment, which in turn boosts overall team productivity and collaboration.",
  },
  {
    heading: "Anonymity and Honesty",
    description:
      "The anonymous nature of the survey encourages team members to provide honest and candid feedback, ensuring that you receive genuine insights.",
  },
  {
    heading: "Empowered Team Members",
    description:
      "Involving the team in the feedback process empowers them, making them feel heard and valued, which can improve morale and engagement.",
  },
];

const DeepDive = ({ user, renderType }: any) => {
  const pathname = usePathname();

  const [title, setTitle] = useState<string>("");
  const [botObjective, setBotObjective] = useState<string>("");
  const [currentProjects, setCurrentProjects] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  const [invalidId, setInValidCoach] = useState(false);

  //for owner verific
  const [userId, setUserId] = useState<string>("");
  const [userIdFromBotDetails, setUserIdFromBotDetails] = useState<string>("");
  const [profileImage, setProfileImage] = useState("");
  useEffect(() => {
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
    const coachScribe = document.getElementsByClassName(
      "coachbots-coachscribe"
    )[0];
    coachScribe.setAttribute("style", "display: none;");

    fetch(
      `${baseURL}/accounts/get-bot-details/?bot_id=${
        renderType === "dynamic"
          ? pathname.split("/")[2]
          : "deep_dive-16843-guru-chaitanya"
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
        console.log(data);

        if (data.error) {
          coachScribe.setAttribute("style", "display: none;");
          setInValidCoach(true);
        }
        setTitle(data.data.deep_dive_data.bot_title);
        setBotObjective(data.data.deep_dive_data.bot_objective);

        const allowedIPS: string = data.data.allowed_ips["feedback_deep-dive"];

        if (allowedIPS !== "") {
          const coachScribeIcon = document.getElementById("chat-icon2");
          fetch("https://ipinfo.io/json")
            .then((res) => res.json())
            .then((data) => {
              console.log(data.ip);
              if (!allowedIPS.split(", ").includes(data.ip)) {
                coachScribeIcon?.removeAttribute("onclick");
                coachScribeIcon?.removeEventListener("click", () => {
                  toast.error("You are not allowed to access this bot.");
                });
                coachScribeIcon?.addEventListener("click", () => {
                  toast.error("You are not allowed to access this bot.");
                });
              }
            });
        }
        setIsLoading(false);
        coachScribe.removeAttribute("style");
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
        setInValidCoach(true);
      });
  }, []);

  const DeepDiveBody = () => {
    return (
      <>
        {renderType === "static" && (
          <Script src="../widget/coachbots-stt-widget.js" />
        )}

        {invalidId && renderType === "dynamic" && (
          <div className="bg-foreground/30 fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center overflow-x-hidden backdrop-blur-sm">
            <div className="rounded-md bg-red-100 p-2 text-sm text-red-800">
              <AlertTriangle className="mr-2 inline h-4 w-4" />
              We have encountered an error. Please try again.{" "}
            </div>
          </div>
        )}
        <div className="h-full min-h-screen bg-white pb-16 max-sm:h-full max-sm:min-h-screen">
          <div className="fixed !z-[800] flex h-6 w-full items-center justify-end p-4 py-8">
            <div className="ml-4">
              <NavProfileWoProfile user={user} />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center px-24 pt-20 text-center max-sm:px-8">
            <h1 className="mb-6 mt-10 border-2 border-[#2DC092] p-[3px] text-xl font-extrabold text-[#2DC092]">
              <span className="mr-[4px] bg-[#2DC092] p-[4px] text-lg font-bold text-white">
                COACH
              </span>
              BOTS
            </h1>
            <div>
              <h1 className="mt-0 text-2xl font-bold text-gray-600 max-sm:text-xl  ">
                {title}
              </h1>

              <div className="mt-4">
                <>
                  <div className="flex flex-row items-center justify-center gap-2 rounded-lg border border-gray-200 bg-amber-50 p-2 text-[#2f2323] max-sm:flex-col max-sm:text-xs">
                    <p className="w-full text-center max-sm:w-full max-sm:text-center">
                      {" "}
                      {botObjective}
                    </p>
                  </div>
                </>
              </div>
            </div>
            {/* <div className="mt-8 flex flex-row flex-wrap gap-2 max-sm:items-center max-sm:justify-center z-10">
              <Link href={"#howItWorks"}>
                <Button
                  variant={"secondary"}
                  className="h-8 border border-gray-200 hover:cursor-pointer"
                >
                  How it works
                </Button>
              </Link>

              <Link href={"#benefits"}>
                <Button
                  variant={"secondary"}
                  className="h-8 border border-gray-200 hover:cursor-pointer"
                >
                  Benefits
                </Button>
              </Link>
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
                                i === benefitsData.length - 1
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
            Please wait while we fetch data.
          </div>
        </div>
      )}
      {!isLoading && <DeepDiveBody />}
    </>
  );
};

export default DeepDive;
