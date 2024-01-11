"use client";

import BotsNavigation from "@/components/BotsNavigation";
import NavProfile from "@/components/NavProfile";
import PageFooter from "@/components/PageFooter";
import WhereToUse from "@/components/WhereToUse";
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

const subdomain =
  typeof window !== "undefined" ? window.location.hostname.split(".")[0] : null;
const devUrl = "https://coach-api-ovh.coachbots.com/api/v1";
// const devUrl = "https://coach-api-gcp.coachbots.com/api/v1";
const prodUrl = "https://coach-api-prod-ovh.coachbots.com/api/v1";
const baseURL = subdomain === "platform" ? prodUrl : devUrl;
const basicAuth =
  "Basic Yzc3MjFmZGItYTllMC00YTYxLWEzMTYtNDRhODA1N2VkMjY0OjhjNWNlZWZlLTY2Y2QtNDliZi04MTY5LTBhNjMwMmU5NmZlMA==";

const howItWorks = [
  {
    heading: "Vetted data sources trained",
    description:
      "The Avatar is trained on high quality vetted data sources like research papers, well known website articles, scientific journals, published books, widely used study materials and educational videos by industry experts. Further, it is tested extensively to ensure the reliability of the responses.",
  },
  {
    heading: "Simulated scenarios",
    description:
      "The Avatar goes beyond general advice by providing customized stress management simulations and scenarios. These customized scenarios allow for hands-on practice focusing on real world application, boosting engagement through individualized application that targets specific pain points and goals.",
  },
  {
    heading: "Easy integration to any page",
    description:
      "The Avatar can be seamlessly integrated into any website or learning management system (LMS), ensuring assistance is easily accessible anywhere at any time.",
  },
];

const benefitsData = [
  {
    heading: "Accuracy & reliability",
    description:
      "The exhaustive vetting process for the Avatar's training data ensures every recommendation is backed by scientific consensus and evidence-based best practices, resulting in accurate and reliably helpful guidance users can trust.",
  },
  {
    heading: "Skills & Culture Discovery",
    description:
      " The customized simulations empower users to actively understand the real world application of the techniques and guidance that they gain from the conversation. Further, by completing these scenarios the users can get an insight into their skills in the particular topic and understand their cultural orientation at the same time.",
  },
  {
    heading: "Ease of adoption",
    description:
      "The seamless integration with existing digital touchpoints makes adoption incredibly easy and frictionless for users, allowing them to conveniently access the Avatar in a familiar environment.",
  },
];

const SubjectExpert = ({ user, renderType }: any) => {
  const pathname = usePathname();

  const [coachName, setCoachName] = useState<string>("");
  const [coachDescription, setCoachDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [coachProfileLink, setCoachProfileLink] = useState(
    "https://www.linkedin.com/"
  );
  const [coachBookLink, setCoachBookLink] = useState("https://calendly.com/");

  const [invalidId, setInValidCoach] = useState(false);

  useEffect(() => {
    if (renderType === "dynamic") {
      setIsLoading(true);
      const bot_id = pathname.split("/")[2];
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

  return (
    <>
      {renderType === "static" && (
        <Script src="../widget/coachbots-stt-widget.js" />
      )}
      <Script
        src="https://static.elfsight.com/platform/platform.js"
        data-use-service-core
        defer
      />

      <div className="fixed max-sm:hidden right-[100px] bottom-12">
        <span className="mr-6 text-sm font-bold">Try Now</span>
        <CornerDownRight className="ml-4 h-12 w-12 text-gray-600" />
      </div>

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
        <div>
          <BotsNavigation />
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
              Welcome to our Subject Expert Avatars
            </h1>

            {renderType !== "dynamic" && (
              <p className="my-4 max-sm:text-xs text-[#2f2323]">
                This section is about the subject matter of the bot, in this
                case, stress management.
              </p>
            )}
            {renderType === "dynamic" ? (
              coachDescription
            ) : (
              <p className="max-sm:text-xs text-[#2f2323]">
                <b>Sample : </b> This is a Stress Management Avatar created to
                provide users with personalized strategies and resources to help
                manage stress and anxiety. With extensive knowledge on
                techniques like mindfulness, meditation, deep breathing, and
                cognitive restructuring, this Avatar offers evidence-based
                recommendations tailored to each user's unique needs. The Avatar
                is grounded in techniques recommended by experts in the field,
                so the users can take control of their stress and start living a
                more relaxed, positive life.
              </p>
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
          {/* <div className="w-full text-center flex flex-col justify-center items-center my-8 max-sm:my-2 max-sm:mt-2">
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
          </div>{" "} */}
        </div>
      </div>
    </>
  );
};

export default SubjectExpert;
