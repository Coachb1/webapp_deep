"use client";

import CopyToClipboard from "@/components/CopyToClipboard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import NetworkNav from "@/components/NetworkNav";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { SkillnRoleBotsType } from "@/lib/types";
import { baseURL, basicAuth, hideBots } from "@/lib/utils";
import { ExternalLinkIcon, History, Info, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SkillBot = ({ user }: any) => {
  const router = useRouter();

  const [skillBots, setSkillBots] = useState<SkillnRoleBotsType[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    hideBots();
    fetch(`${baseURL}/accounts/get-skill-and-role-bots/`, {
      method: "GET",
      headers: {
        Authorization: basicAuth,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const filteredSkillBots = data.filter(
          (bot: SkillnRoleBotsType) => bot.scenario_case === "skill_bot"
        );
        setSkillBots(filteredSkillBots);

        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  return (
    <>
      {/* <div className="fixed w-full flex items-center top-0 right-0 justify-end p-4 h-6 py-8 !z-[800]">
        <NetworkNav user={user} />
      </div> */}
      <main className="bg-white min-h-[100vh] h-full max-sm:h-full max-sm:min-h-screen pb-16">
        <div>
          <div>
            <div
              id="category-navbar"
              className="flex  flex-col gap-2 mb-4 bg-red justify-center items-center sticky top-0  z-[2] bg-white w-full"
            >
              <div className="pb-1 max-sm:pb-0 flex flex-row justify-center items-center text-center mt-[70px] ">
                <p className="text-4xl font-bold max-sm:text-2xl flex text-gray-600">
                  {" "}
                  <span>Skill bots</span>
                </p>
              </div>
              <div className="my-0 mt-1 max-sm:mt-0 py-0 text-xs flex flex-row items-center text-center px-20 max-sm:px-8">
                <span>
                  {" "}
                  Simulations and roleplays replicate real-world situations and
                  interactions, evaluating our aptitude for success in the
                  workplace. By mimicking scenarios we may encounter, they
                  assess our interpersonal skills and provide detailed feedback
                  on our performance and potential areas for improvement.
                </span>
              </div>
              <hr className=" bg-gray-500 w-full" />
            </div>
            <div
              id="role-bots"
              className="pt-[40vh] mt-[-38vh]  max-sm:pt-[50vh] max-sm:mt-[-45vh]  w-full flex flex-col items-center justify-center"
            ></div>
            {loading && (
              <div>
                <div className="bg-white my-16  max-sm:h-full max-sm:min-h-screen pb-16 flex justify-center items-center">
                  <p className="p-2 text-sm max-sm:text-xs">
                    {" "}
                    <Loader className="animate-spin inline h-4 w-4 mr-2" />
                    Loading...
                  </p>
                </div>
              </div>
            )}
            {!loading && (
              <div className="max-sm:pb-10 min-h-[70vh] max-sm:min-h-[60vh]">
                <MaxWidthWrapper className="flex pt-2 flex-col items-center justify-center text-center">
                  <div className="flex flex-col max-sm:flex-col w-full mx-auto">
                    <div className="w-full flex flex-col items-center justify-center">
                      <div className="flex flex-col max-sm:flex-col w-[64%] max-sm:w-[90%] mx-auto">
                        <>
                          <div className="w-full">
                            <div className="relative isolate mx-auto">
                              <div>
                                <div className="mx-auto w-full max-sm:w-[100%] z-50">
                                  <div className="rounded-xl bg-white ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl max-sm:w-[100%]">
                                    <Accordion
                                      type="single"
                                      collapsible
                                      className="w-full text-gray-500 max-sm:p-4 rounded-xl bg-white overflow-clip border"
                                    >
                                      {skillBots.map((bot, i) => (
                                        <AccordionItem
                                          key={i}
                                          value={`${i}-rolebot`}
                                          className={`px-4`}
                                        >
                                          <AccordionTrigger className="text-left max-sm:text-xs">
                                            <div>{bot.bot_name}</div>
                                          </AccordionTrigger>
                                          <AccordionContent className="max-sm:text-xs">
                                            <p className="text-left">
                                              {bot.description}
                                            </p>
                                            <div className="flex justify-end mt-2">
                                              <Link
                                                target="_blank"
                                                href={`/knowledge-bot/${bot.bot_id}`}
                                              >
                                                <Button
                                                  variant={"secondary"}
                                                  className="p-2 h-8 border border-gray-200"
                                                >
                                                  Visit bot{" "}
                                                  <ExternalLinkIcon className="h-4 w-4 ml-2" />
                                                </Button>
                                              </Link>
                                            </div>
                                          </AccordionContent>
                                        </AccordionItem>
                                      ))}
                                    </Accordion>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      </div>
                    </div>
                  </div>
                </MaxWidthWrapper>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default SkillBot;
