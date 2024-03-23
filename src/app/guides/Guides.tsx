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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SkillnRoleBotsType, knowledgeBotJson } from "@/lib/types";
import { baseURL, basicAuth, hideBots } from "@/lib/utils";
import { ExternalLinkIcon, History, Info, Loader } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Guides = ({ user }: any) => {
  const [roleBots, setRoleBots] = useState<SkillnRoleBotsType[]>([]);
  const [skillBots, setSkillBots] = useState<SkillnRoleBotsType[]>([]);
  const [knowledgeBot, setknowledgebot] = useState<SkillnRoleBotsType[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedTab, setSelectedTab] = useState("guide-by-role");
  const router = useRouter();

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
        console.log("data", data);

        const filteredRoleBots = data.filter(
          (bot: SkillnRoleBotsType) => bot.scenario_case === "role_bot"
        );
        setRoleBots(filteredRoleBots);

        const filteredSkillBots = data.filter(
          (bot: SkillnRoleBotsType) => bot.scenario_case === "skill_guide"
        );
        setSkillBots(filteredSkillBots);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
    fetch(
      `${baseURL}/accounts/get-client-information/?for=user_info&email=${user.email}`,
      {
        method: "GET",
        headers: {
          Authorization: basicAuth,
        },
      }
    )
      .then((resp) => resp.json())
      .then((client_info) => {
        console.log("client", client_info);
        let client_name;
        try {
          client_name = client_info.data.user_info[0].client_name;
        } catch {
          client_name = "Not Found";
        }

        fetch(
          `${baseURL}/accounts/get-bots/?bot_type=user_bot&client_name=${client_name}`,
          {
            headers: {
              Authorization: basicAuth,
            },
          }
        )
          .then((resp) => resp.json())
          .then((result) => {
            console.log("knowledge-bot", result);
            let knowledgeBots: {
              bot_id: string;
              bot_name: string;
              description: string;
              bot_type: string;
              scenario_case: string;
            }[] = [];
            result.data.forEach((item: knowledgeBotJson) => {
              const botJson = item.signature_bot;
              const description = JSON.parse(botJson.faqs)[
                "What is the primary purpose of the bot?"
              ];
              knowledgeBots.push({
                bot_id: botJson.bot_id,
                bot_name: item.bot_attributes.bot_name,
                bot_type: botJson.bot_type,
                description: description,
                scenario_case: botJson.scenario_case,
              });
            });
            console.log(knowledgeBot);

            setknowledgebot(knowledgeBots);
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      {/* <div className="fixed w-full flex items-center top-0 right-0 justify-end p-4 h-6 py-8 !z-[800]">
        <NetworkNav user={user} />
      </div> */}
      <main className="bg-white  h-full max-sm:h-full max-sm:min-h-screen pb-16">
        <div>
          <div>
            <div
              id="category-navbar"
              className="flex flex-col gap-2 mb-4 bg-red justify-center items-center  sticky top-0 bg-white z-[10] w-full"
            >
              <div className="pb-1 max-sm:pb-0 flex flex-row justify-center items-center text-center mt-[90px] ">
                <p className="text-4xl font-bold max-sm:text-2xl flex text-gray-600">
                  {" "}
                  <span>Guides</span>
                </p>
              </div>
              <div className="my-0 mt-1 max-sm:mt-0 py-0 text-xs flex flex-row items-center text-center px-20 max-sm:px-8">
                <span>
                  {" "}
                  Introducing Guides! These are multi-purpose creative bots.
                  Knowledge bots are user-created bots for any purpose e.g.
                  providing project updates or querying documents. Guides for
                  roles or skills follow a curated collection of frameworks that
                  are scientifically proven to enhance skills and role
                  effectiveness.
                </span>
              </div>

              <Button variant={"outline"} className="h-fit p-1 px-2 w-fit">
                <span
                  onClick={() => {
                    router.push("/intake/?type=knowledge-bot");
                  }}
                  className="flex flex-row items-center justify-center"
                >
                  Create your guide
                </span>
              </Button>
              <hr className=" bg-gray-500 w-full" />
              <div className="flex justify-center items-center w-full flex-col gap-2 max-sm:gap-1">
                <Tabs
                  defaultValue="guide-by-role"
                  className="flex justify-center items-center w-full flex-col gap-2 max-sm:gap-1"
                  onValueChange={(value) => {
                    setSelectedTab(value);
                  }}
                >
                  <TabsList className="w-fit border border-gray-300 bg-gray-200 ">
                    <TabsTrigger
                      className="max-sm:text-xs max-sm:py-1  max-sm:my-0.5"
                      value="guide-by-role"
                    >
                      Guide by Role
                    </TabsTrigger>
                    <TabsTrigger
                      className="max-sm:text-xs max-sm:py-1 max-sm:my-0.5"
                      value="guide-by-skill"
                    >
                      Guide by Skill
                    </TabsTrigger>
                    <TabsTrigger
                      className="max-sm:text-xs max-sm:py-1 max-sm:my-0.5"
                      value="user-created-guides"
                    >
                      User created guides
                    </TabsTrigger>
                  </TabsList>
                  <hr className=" bg-gray-500 w-full" />
                </Tabs>
              </div>
            </div>
            {selectedTab === "guide-by-role" && (
              <div className="w-full">
                {loading && (
                  <div>
                    <div className="bg-white my-16 max-sm:h-full pb-16 flex justify-center items-center">
                      <p className="p-2 text-sm max-sm:text-xs">
                        {" "}
                        <Loader className="animate-spin inline h-4 w-4 mr-2" />
                        Loading...
                      </p>
                    </div>
                  </div>
                )}
                {!loading && (
                  <div className="max-sm:pb-10 ">
                    <MaxWidthWrapper className="flex pt-2 flex-col items-center justify-center text-center">
                      <div
                        id="skill-bots"
                        className="flex flex-col max-sm:flex-col w-full mx-auto"
                      >
                        <div className="w-full flex flex-col items-center justify-center">
                          <div className="flex flex-col max-sm:flex-col w-[64%] max-sm:w-[90%] mx-auto">
                            <div>
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
                                          {roleBots.map((bot, i) => (
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </MaxWidthWrapper>
                  </div>
                )}
                <div className="w-full mt-12">
                  <p className="text-center font-bold text-gray-500">
                    More Role guides coming soon...
                  </p>
                </div>
              </div>
            )}

            {selectedTab === "user-created-guides" && (
              <div className="w-full">
                {loading && (
                  <div>
                    <div className="bg-white my-16 max-sm:h-full max-sm:min-h-screen pb-16 flex justify-center items-center">
                      <p className="p-2 text-sm max-sm:text-xs">
                        {" "}
                        <Loader className="animate-spin inline h-4 w-4 mr-2" />
                        Loading...
                      </p>
                    </div>
                  </div>
                )}
                {!loading && (
                  <div className="max-sm:pb-10">
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
                                          {knowledgeBot.length === 0 ? (
                                            <p>
                                              There are no community created
                                              guides yet!
                                            </p>
                                          ) : (
                                            knowledgeBot.map((bot, i) => (
                                              <AccordionItem
                                                key={i}
                                                value={`${i}-knowledge-bot`}
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
                                            ))
                                          )}
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
                {/* <div className="w-full mt-12">
                  <p className="text-center font-bold text-gray-500">
                    More user created guides coming soon...
                  </p>
                </div> */}
              </div>
            )}

            {selectedTab === "guide-by-skill" && (
              <div className="w-full">
                {loading && (
                  <div>
                    <div className="bg-white my-16 max-sm:h-full max-sm:min-h-screen pb-16 flex justify-center items-center">
                      <p className="p-2 text-sm max-sm:text-xs">
                        {" "}
                        <Loader className="animate-spin inline h-4 w-4 mr-2" />
                        Loading...
                      </p>
                    </div>
                  </div>
                )}
                {!loading && (
                  <div className="max-sm:pb-10">
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
                <div className="w-full mt-12">
                  <p className="text-center font-bold text-gray-500">
                    More Skill guides coming soon...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Guides;
