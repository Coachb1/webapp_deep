"use client";

import { NavProfileWoProfile } from "@/components/NavProfile";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { getUserAccount, parseData } from "@/lib/utils";
import { AlertTriangle, CornerDownRight, Loader } from "lucide-react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";
import { baseURL, basicAuth } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const howItWorks = [
  {
    heading: "What is this survey about and why I am receiving it?",
    description:
      "The organization or your manager may be seeking deeper insights critical to the policies and future direction. You can help them with your input and that's why you have received it. It's like having a quick check to make your point.",
  },
  {
    heading: "Is it mandatory and is there any deadline?",
    description:
      "The details will be included in the email communication that you receive.",
  },
  {
    heading: "What is the importance of this survey?",
    description:
      "Your input will be critical to shape the future organizational policies in this direction. We encourage you to participate",
  },
  {
    heading: "Is this survey really anonymous?",
    description:
      "The survey will prompt you if you want to keep the interaction anonymous. If chosen, the organizational as well as the AI models will never record or store your personal information.",
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

  const [dynamicHowItWorks, setDynamicHowItWorks] =
    useState<{ heading: string; description: string }[]>(howItWorks);

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

        if (data.data.page_information.how_it_works) {
          const parsedData = parseData(data.data.page_information.how_it_works);
          console.log(parsedData);
          setDynamicHowItWorks(parsedData);
        }

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

        <div className="fixed bottom-14 right-[75px] z-50 max-sm:hidden">
          <span className="mr-6 text-sm font-bold">Engage now</span>
          <CornerDownRight className="ml-12 h-12 w-12 text-gray-600" />
        </div>

        {invalidId && renderType === "dynamic" && (
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
                          {dynamicHowItWorks.map((test, i) => (
                            <AccordionItem
                              key={i}
                              value={`item-${i + 1}`}
                              className={
                                i === dynamicHowItWorks.length - 1
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
