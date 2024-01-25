"use client";

import { baseURL, basicAuth, getUserAccount } from "@/lib/utils";
import { Button } from "./ui/button";
import { Code, Copy, Edit, LinkIcon, Loader } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { TooltipWrapper } from "./TooltipWrapper";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import CopyToClipboard from "./CopyToClipboard";
import Link from "next/link";
interface Bot {
  bot_id: string;
  bot_name: string;
}

interface BotTypeEntry {
  bot_type: string;
  bots: Bot[];
}
const botTypeMap: Record<string, Bot[]> = {};

const MyPages = ({ user }: any) => {
  const [botTypes, setBotTypes] = useState<BotTypeEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserAccount(user)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetch(`${baseURL}/accounts/get-bots/?user_id=${data.uid}`, {
          headers: {
            Authorization: basicAuth,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("bot data : ", data);
            data.data.forEach((entry: any) => {
              const botType = entry.signature_bot.bot_type;

              if (!botTypeMap[botType]) {
                botTypeMap[botType] = [];
              }
              const existingEntry = botTypeMap[botType].find(
                (bot) => bot.bot_id === entry.signature_bot.bot_id
              );
              if (!existingEntry) {
                botTypeMap[botType].push({
                  bot_id: entry.signature_bot.bot_id,
                  bot_name: entry.bot_attributes.bot_name,
                });
              }
            });
            const result: BotTypeEntry[] = Object.keys(botTypeMap).map(
              (botType) => ({
                bot_type: botType,
                bots: botTypeMap[botType],
              })
            );
            setBotTypes(result);
            setLoading(false);
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
      });
  }, []);

  const BotTypesHeading = (botType: string) => {
    if (botType === "avatar_bot") {
      return "Avatar Pages";
    } else if (botType === "feedback_bot") {
      return "Feedback Pages";
    }
  };

  const BotTypeLinks = (botType: string, bot_id: string) => {
    if (botType === "avatar_bot") {
      return `https://playground.coachbots.com/coach/${bot_id}`;
    } else if (botType === "feedback_bot") {
      return `https://playground.coachbots.com/feedback/${bot_id}`;
    } else if (botType === "subject_matter_bot") {
      return `https://playground.coachbots.com/subject-expert/${bot_id}`;
    }
  };

  const intakeBotTypeLinks = (botType: string, bot_id: string) => {
    if (botType === "avatar_bot") {
      return `/intake/?type=coach&edit=true&bot_id=${bot_id}`;
    } else if (botType === "feedback_bot") {
      return `/intake/?type=coachee&edit=true&bot_id=${bot_id}`;
    }
  };

  return (
    <div className="bg-accent p-2 mt-2 rounded-md">
      <div className="pl-4 max-sm:pl-2 pt-2">My Pages</div>
      {loading && (
        <>
          <div className="text-xs w-full h-20 flex items-center justify-center">
            <div>
              <Loader className="h-4 w-4 mr-2 animate-spin inline" /> Loading
            </div>
          </div>
        </>
      )}
      {!loading && botTypes.length === 0 && (
        <>
          <div className="text-xs w-full h-20 flex items-center justify-center">
            <div>You don't have any active bots yet!</div>{" "}
            <Button className="pl-1" variant={"link"}>
              Create one?
            </Button>
          </div>
        </>
      )}
      <div className="m-4 text-sm max-sm:m-2">
        {botTypes.map((botType) => (
          <div className="bg-gray-200 text-sm w-full m-2 ml-0 p-2 rounded-md">
            <p className="text-sm ">{BotTypesHeading(botType.bot_type)}</p>
            {botType.bots.map((bot, i) => (
              <div>
                <div className="border border-x-gray-200 flex flex-row gap-3 my-2 items-center">
                  <p>{i + 1}</p>{" "}
                  <p className="max-sm:text-xs">{bot.bot_name}</p>{" "}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant={"secondary"}
                        className="h-6 text-xs w-fit"
                      >
                        <span className="max-sm:hidden"> Code snippet</span>{" "}
                        <TooltipWrapper
                          className="hidden max-sm:block text-xs"
                          tooltipName="Code snippet"
                          body={<Code className="h-3 w-3 ml-2 max-sm:ml-0" />}
                        />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-sm:w-[90%] max-sm:rounded-md">
                      <DialogHeader>
                        <DialogTitle>Code snippet for your bot</DialogTitle>
                        <DialogDescription>
                          <div className="bg-gray-100 rounded-sm my-2 p-2 text-xs overflow-scroll  no-scrollbar">
                            <p className="whitespace-pre max-sm:text-left max-sm:w-[70vw]">
                              {`
<div
    class="deep-chat-poc2"
    data-bot-id="${bot.bot_id}"
></div>
<script
    src="https://playground.coachbots.com/widget/coachbots-stt-widget.js"
    defer
></script>
                            `}
                            </p>
                          </div>
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="-mt-4">
                        <CopyToClipboard
                          textToCopy={`<div
                                class="deep-chat-poc2"
                                data-bot-id="${bot.bot_id}"
                            ></div>
                            <script
                                src="https://playground.coachbots.com/widget/coachbots-stt-widget.js"
                                defer
                            ></script>`}
                        />
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant={"secondary"}
                        className="h-6 text-xs w-fit"
                      >
                        <span className="max-sm:hidden">Link </span>
                        <TooltipWrapper
                          className="hidden max-sm:block text-xs"
                          tooltipName="Link"
                          body={
                            <LinkIcon className="h-3 w-3 ml-2 max-sm:ml-0" />
                          }
                        />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-sm:w-[90%] max-sm:rounded-md">
                      <DialogHeader>
                        <DialogTitle>Page link</DialogTitle>
                        <DialogDescription>
                          <Link
                            target="_blank"
                            href={BotTypeLinks(botType.bot_type, bot.bot_id)!}
                            className="bg-gray-100 text-sm rounded-sm my-2 p-2  overflow-scroll  no-scrollbar text-blue-500 block"
                          >
                            {BotTypeLinks(botType.bot_type, bot.bot_id)}
                          </Link>
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="-mt-4">
                        <CopyToClipboard
                          copyType="link"
                          textToCopy={
                            BotTypeLinks(botType.bot_type, bot.bot_id)!
                          }
                        />
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <div className="text-gray-400 bg-gray-400 h-5 w-[2px]" />
                  <Link
                    href={intakeBotTypeLinks(botType.bot_type, bot.bot_id)!}
                  >
                    <Button
                      variant={"secondary"}
                      className="h-6 text-xs w-fit bg-blue-200 "
                    >
                      <span className="max-sm:hidden">Edit</span>{" "}
                      <TooltipWrapper
                        className="hidden max-sm:block text-xs"
                        tooltipName="Edit"
                        body={<Edit className="h-3 w-3 ml-2 max-sm:ml-0" />}
                      />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPages;
