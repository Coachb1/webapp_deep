"use client";

import { baseURL, basicAuth } from "@/lib/utils";
import { Button } from "./ui/button";
import { Code, Edit, LinkIcon } from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { TooltipWrapper } from "./TooltipWrapper";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
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
  const getBotsApi = () => {
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
        console.log("USER FROM my-pages", data);
        fetch(
          `${baseURL}/accounts/get-bots/?user_id=a28a9828-c732-457c-b8da-9b8556fc40df`,
          {
            headers: {
              Authorization: basicAuth,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log("bot data : ", data);
            data.data.forEach((entry: any) => {
              const botType = entry.signature_bot.bot_type;
              console.log(botType);

              if (!botTypeMap[botType]) {
                botTypeMap[botType] = [];
              }

              botTypeMap[botType].push({
                bot_id: entry.signature_bot.bot_id,
                bot_name: entry.bot_attributes.bot_name,
              });
            });
            const result: BotTypeEntry[] = Object.keys(botTypeMap).map(
              (botType) => ({
                bot_type: botType,
                bots: botTypeMap[botType],
              })
            );
            setBotTypes(result);
          });
      });
  };

  return (
    <div className="bg-accent p-2 mt-2 rounded-md">
      <div className="pl-4 max-sm:pl-2 pt-2">My Pages</div>
      <div className="m-4 text-sm max-sm:m-2">
        <div className="bg-gray-200 text-sm w-full m-2 ml-0 p-2 rounded-md">
          <p className="text-sm ">Avatar Pages</p>
          <Button
            onClick={() => {
              getBotsApi();
            }}
          >
            check
          </Button>
          <div>
            <div className="border border-x-gray-200 flex flex-row gap-3 my-2 items-center">
              <p>1</p> <p className="max-sm:text-xs">Bot name</p>{" "}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant={"secondary"} className="h-6 text-xs w-fit">
                    <span className="max-sm:hidden"> Code snippet</span>{" "}
                    <TooltipWrapper
                      className="hidden max-sm:block text-xs"
                      tooltipName="Code snippet"
                      body={<Code className="h-3 w-3 ml-2 max-sm:ml-0" />}
                    />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-sm:w-[90%]">
                  <DialogHeader>
                    <DialogTitle>Code snippet for your bot</DialogTitle>
                    <DialogDescription>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Ipsa perferendis natus illum fuga magni, odio voluptates
                      beatae molestiae excepturi totam!
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Button variant={"secondary"} className="h-6 text-xs w-fit">
                <span className="max-sm:hidden">Link </span>
                <TooltipWrapper
                  className="hidden max-sm:block text-xs"
                  tooltipName="Link"
                  body={<LinkIcon className="h-3 w-3 ml-2 max-sm:ml-0" />}
                />
              </Button>
              <div className="text-gray-400 bg-gray-400 h-5 w-[2px]" />
              <Button
                variant={"secondary"}
                className="h-6 text-xs w-fit bg-blue-200 "
              >
                <span className="max-sm:hidden"> Edit</span>{" "}
                <TooltipWrapper
                  className="hidden max-sm:block text-xs"
                  tooltipName="Edit"
                  body={<Edit className="h-3 w-3 ml-2 max-sm:ml-0" />}
                />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPages;
