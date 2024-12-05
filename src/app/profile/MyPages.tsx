"use client";

import { applicationUrl } from "@/lib/utils";
import { Button } from "../../components/ui/button";
import { Code, Edit, Info, LinkIcon, Loader, View } from "lucide-react";
import { TooltipWrapper } from "../../components/TooltipWrapper";

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
import CopyToClipboard from "../../components/CopyToClipboard";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
interface Bot {
  bot_id: string;
  bot_name: string;
  uid: string;
  is_approved: boolean;
}

interface BotTypeEntry {
  bot_type: string;
  bots: Bot[];
}

const MyPages = ({ user }: any) => {
  const [botTypes, setBotTypes] = useState<BotTypeEntry[]>([]);
  const [userProfile, setUserProfile] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [botTypeMap, setBotTypeMap] = useState<Record<string, Bot[]>>({});
  const [noCopilotBot, setNoCopilotBot] = useState<any>();

  const { allCoaches, botsData } = useUser();

  useEffect(() => {
    setUserProfile(allCoaches[0]);
    const coachData: any = allCoaches[0];
    console.log("allCoaches[0] : ", allCoaches[0]);
    console.log("botsData : ", botsData);

    if (
      coachData?.profile_type == "coach" &&
      !coachData?.bot_ids?.includes("avatar_bot")
    ) {
      console.log("JUST coach : ", coachData);
      setNoCopilotBot(coachData);
    }

    botsData
      .filter((bot: any) => bot.signature_bot.bot_type !== "deep_dive")
      .forEach((entry: any) => {
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
            uid: entry.signature_bot.uid,
            is_approved: entry.signature_bot.is_approved,
            bot_name:
              entry.signature_bot.bot_id.includes("feedback") ||
              entry.signature_bot.bot_id.includes("knowledge")
                ? entry.bot_attributes.bot_name
                : entry.bot_attributes.coach_name,
          });
        }
      });
    const result: BotTypeEntry[] = Object.keys(botTypeMap).map((botType) => ({
      bot_type: botType,
      bots: botTypeMap[botType],
    }));

    setBotTypes(result);
    setLoading(false);
  }, []);

  const BotTypesHeading = (botType: string) => {
    if (botType === "avatar_bot") {
      return "Coaching co-pilot";
    } else if (botType === "feedback_bot") {
      return "Feedback Page";
    } else if (botType === "user_bot") {
      return "Knowledge Bot";
    } else if (botType === "subject_specific_bot") {
      return "Subject co-pilot";
    }
  };

  const BotTypeLinks = (botType: string, bot_id: string) => {
    if (botType === "avatar_bot" || botType === "subject_specific_bot") {
      return `${applicationUrl()}/coach/${bot_id}`;
    } else if (botType === "feedback_bot") {
      return `${applicationUrl()}/feedback/${bot_id}`;
    } else if (botType === "subject_matter_bot") {
      return `${applicationUrl()}/subject-expert/${bot_id}`;
    } else if (botType === "user_bot") {
      return `${applicationUrl()}/custom-bot/${bot_id}`;
    }
  };

  const intakeBotTypeLinksForView = (
    botType: string,
    bot_id: string,
    profile_id: string,
    profile_type: string
  ) => {
    if (
      profile_type === "coach" ||
      profile_type === "mentor" ||
      profile_type === "coach-mentor"
    ) {
      if (botType === "avatar_bot" || botType === "subject_specific_bot") {
        return `/intake/?type=coach&view=true&bot_id=${bot_id}&profile_id=${profile_id}&profile_type=${profile_type}&bot_type=${botType}`;
      } else if (botType === "feedback_bot") {
        return `/intake/?type=feedback&view=true&bot_id=${bot_id}&profile_id=${profile_id}&profile_type=${profile_type}&bot_type=${botType}`;
      } else if (botType === "user_bot") {
        return `/intake/?type=knowledge-bot&view=true&bot_id=${bot_id}`;
      } else {
        return `/intake/?type=coach&view=true&profile_id=${profile_id}&no-copilot=1`;
      }
    } else if (profile_type === "coachee" || profile_type === "mentee") {
      if (botType === "avatar_bot") {
        return `/intake/?type=coach&view=true&bot_id=${bot_id}&profile_id=${profile_id}&profile_type=${profile_type}&bot_type=${botType}`;
      } else if (botType === "feedback_bot") {
        return `/intake/?type=feedback&view=true&bot_id=${bot_id}&profile_id=${profile_id}&profile_type=${profile_type}&bot_type=${botType}`;
      } else if (botType === "user_bot") {
        return `/intake/?type=knowledge-bot&view=true&bot_id=${bot_id}`;
      } else {
        return `/intake/?type=${
          botType === "feedback_bot" ? "feedback" : "coachee"
        }&view=true&bot_id=${bot_id}&profile_id=${profile_id}&profile_type=${profile_type}&bot_type=${botType}`;
      }
    } else if (profile_type === "mentee") {
      return `/intake/?type=coachee&view=true&bot_id=${bot_id}&profile_id=${profile_id}&profile_type=${profile_type}&bot_type=${botType}`;
    } else {
      if (botType === "user_bot") {
        return `/intake/?type=knowledge-bot&view=true&bot_id=${bot_id}`;
      }
    }
  };

  const intakeBotTypeLinks = (
    botType: string,
    bot_id: string,
    profile_id: string,
    profile_type: string
  ) => {
    if (
      profile_type === "coach" ||
      profile_type === "mentor" ||
      profile_type === "coach-mentor"
    ) {
      if (botType === "avatar_bot" || botType === "subject_specific_bot") {
        return `/intake/?type=coach&edit=true&bot_id=${bot_id}&profile_id=${profile_id}&profile_type=${profile_type}&bot_type=${botType}`;
      } else if (botType === "feedback_bot") {
        return `/intake/?type=feedback&edit=true&bot_id=${bot_id}&profile_id=${profile_id}&profile_type=${profile_type}&bot_type=${botType}`;
      } else if (botType === "user_bot") {
        return `/intake/?type=knowledge-bot&edit=true&bot_id=${bot_id}`;
      } else if (botType === "no-copilot") {
        return `/intake/?type=coach&edit=true&profile_id=${profile_id}&no-copilot=1`;
      }
    } else if (profile_type === "coachee" || profile_type === "mentee") {
      if (botType === "avatar_bot") {
        return `/intake/?type=coach&edit=true&bot_id=${bot_id}&profile_id=${profile_id}&profile_type=${profile_type}&bot_type=${botType}`;
      } else if (botType === "feedback_bot") {
        return `/intake/?type=feedback&edit=true&bot_id=${bot_id}&profile_id=${profile_id}&profile_type=${profile_type}&bot_type=${botType}`;
      } else if (botType === "user_bot") {
        return `/intake/?type=knowledge-bot&edit=true&bot_id=${bot_id}`;
      } else {
        return `/intake/?type=${
          botType === "feedback_bot" ? "feedback" : "coachee"
        }&edit=true&bot_id=${bot_id}&profile_id=${profile_id}&profile_type=${profile_type}&bot_type=${botType}`;
      }
    } else if (profile_type === "mentee") {
      return `/intake/?type=coachee&edit=true&bot_id=${bot_id}&profile_id=${profile_id}&profile_type=${profile_type}&bot_type=${botType}`;
    } else {
      if (botType === "user_bot") {
        return `/intake/?type=knowledge-bot&edit=true&bot_id=${bot_id}`;
      }
    }
  };

  return (
    <div id="directory-profile" className="bg-accent p-2 mt-2 rounded-md">
      <div className="pl-4 max-sm:pl-2 pt-2">Directory Profile</div>
      <p className="bg-amber-100 text-xs font-semibold text-gray-500 p-1 w-fit rounded-md ml-4 my-2 flex flex-row items-center">
        {" "}
        <Info className="h-3 w-3 mr-2 inline" />
        Edit enabled after AI approval pipeline.
      </p>
      {loading && (
        <>
          <div className="text-xs w-full h-20 flex items-center justify-center">
            <div>
              <Loader className="h-4 w-4 mr-2 animate-spin inline" /> Loading
            </div>
          </div>
        </>
      )}
      {!loading &&
        botTypes.length === 0 &&
        userProfile?.profile_type !== "coachee" &&
        userProfile?.profile_type !== "mentee" &&
        !noCopilotBot && (
          <>
            <div className="text-xs w-full h-20 flex items-center justify-center">
              <div>You don't have any active Pages yet!</div>{" "}
            </div>
          </>
        )}
      <div className="my-4 text-sm">
        {botTypes.map((botType) => (
          <div className="bg-gray-200 mx-4 text-sm my-4 p-2 rounded-md">
            {botType.bots.map((bot, i) => (
              <div className="m-4 my-1 text-sm max-sm:m-2">
                <div className="flex items-center">
                  <p
                    className={`text-sm max-sm:text-xs text-gray-600 inline ${
                      botType.bot_type === "user_bot"
                        ? "w-[45%] max-sm:w-[70%]"
                        : "w-[45%] max-sm:w-[70%]"
                    } `}
                  >
                    <>
                      {botType.bot_type !== "feedback_bot" && <>Coach - </>}
                      <span className="font-semibold">
                        {BotTypesHeading(botType.bot_type)}
                      </span>
                      {botType.bot_type === "user_bot" && (
                        <b className="text-gray-600"> - {bot.bot_name}</b>
                      )}{" "}
                    </>
                  </p>{" "}
                  <div className="text-gray-400 bg-gray-400 h-5 w-[2px] mx-2 inline-block" />
                  <div className="flex flex-row gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant={"secondary"}
                          className="h-6 text-xs w-fit"
                        >
                          <span className="max-sm:hidden">Code snippet</span>{" "}
                          <TooltipWrapper
                            className="hidden max-sm:block text-xs"
                            tooltipName="Code snippet"
                            body={<Code className="h-3 w-3 ml-2 max-sm:ml-0" />}
                          />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-[60%] max-w-[60%] max-sm:w-[90%] max-sm:max-w-[90%] max-sm:rounded-md">
                        <DialogHeader>
                          <DialogTitle>Code snippet for your bot</DialogTitle>
                          <DialogDescription>
                            <div className="bg-gray-100 rounded-sm my-2 p-2 text-xs overflow-scroll  no-scrollbar">
                              <p className="whitespace-pre max-sm:text-left max-sm:w-[70vw]">
                                {`
<div
    class="coachbots-coachscribe"
    data-bot-id="${bot.bot_id}"
></div>
<script
    src="${applicationUrl()}/widget/coachbots-stt-widget.js"
    defer
></script>
                            `}
                              </p>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter className="-mt-4">
                          <CopyToClipboard
                            copyType="code"
                            textToCopy={`<div
                                class="coachbots-coachscribe"
                                data-bot-id="${bot.bot_id}"
                            ></div>
                            <script
                                src=${applicationUrl()}/widget/coachbots-stt-widget.js"
                                defer
                            ></script>`}
                          />
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <Dialog>
                      {botType.bot_type !== "user_bot" && (
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
                      )}
                      <DialogContent className="w-[50%] max-w-[60%] max-sm:w-[90%] max-sm:max-w-[90%] max-sm:rounded-md">
                        <DialogHeader>
                          <DialogTitle>Page link</DialogTitle>
                          <DialogDescription>
                            <div className="bg-gray-100 rounded-sm my-2 p-2 overflow-scroll  no-scrollbar w-full max-sm:text-left">
                              <Link
                                target="_blank"
                                href={
                                  BotTypeLinks(botType.bot_type, bot.bot_id)!
                                }
                                className="py-3 text-blue-500 text-[16px] max-sm:text-xs "
                              >
                                {BotTypeLinks(botType.bot_type, bot.bot_id)}
                              </Link>
                            </div>
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
                    {/* FOR VIEW MODE */}
                    <Button
                      variant={"secondary"}
                      className="h-6 text-xs w-fit min-w-fit bg-blue-200 "
                    >
                      <Link
                        href={
                          intakeBotTypeLinksForView(
                            botType.bot_type,
                            bot.bot_id,
                            userProfile?.uid,
                            userProfile?.profile_type === "coach" &&
                              userProfile?.is_mentor === true
                              ? "coach-mentor"
                              : userProfile?.profile_type
                          )! + `&uid=${bot.uid}`
                        }
                        // target="_blank"
                      >
                        <span className="max-sm:hidden">View</span>{" "}
                        <TooltipWrapper
                          className="hidden max-sm:block text-xs"
                          tooltipName="View"
                          body={
                            <View className="h-3 w-3 ml-2 max-sm:ml-0 inline" />
                          }
                        />
                      </Link>
                    </Button>
                    {/* FOR EDIT MODE */}
                    <Button
                      variant={"secondary"}
                      className="h-6 text-xs w-fit min-w-fit bg-blue-200 "
                      disabled={!bot.is_approved}
                    >
                      <Link
                        href={
                          intakeBotTypeLinks(
                            botType.bot_type,
                            bot.bot_id,
                            userProfile?.uid,
                            userProfile?.profile_type === "coach" &&
                              userProfile?.is_mentor === true
                              ? "coach-mentor"
                              : userProfile?.profile_type
                          )! + `&uid=${bot.uid}`
                        }
                        // target="_blank"
                      >
                        <span className="max-sm:hidden">Edit</span>{" "}
                        <TooltipWrapper
                          className="hidden max-sm:block text-xs"
                          tooltipName="Edit"
                          body={
                            <Edit className="h-3 w-3 ml-2 max-sm:ml-0 inline" />
                          }
                        />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {!loading &&
        userProfile &&
        (userProfile.profile_type === "coachee" ||
          userProfile.profile_type === "mentee" ||
          noCopilotBot) && (
          <>
            <div className="bg-gray-200 mx-4 text-sm my-4 p-2 rounded-md">
              {/* <p className="text-sm ">Coachee</p> */}
              <div className="m-4 my-1 text-sm max-sm:m-2">
                <div className="flex items-center">
                  {/* <p className="text-sm inline w-[10%]">1</p> */}
                  <p className="text-sm max-sm:text-xs text-gray-600 inline w-[45%] max-sm:w-[50%]">
                    {userProfile.profile_type === "coachee" && <>Coachee</>}
                    {userProfile.profile_type === "mentee" && <>Mentee</>}
                    {noCopilotBot?.profile_type === "coach" && (
                      <>
                        Coach -{" "}
                        <span className="font-semibold">No co-pilot</span>
                      </>
                    )}

                    {/* - {userProfile.name} */}
                  </p>
                  <div className="text-gray-400 bg-gray-400 h-5 w-[2px] mx-2 " />
                  {/* FOR VIEW MODE */}
                  <Button
                    variant={"secondary"}
                    className="h-6 text-xs w-fit bg-blue-200 inline-flex items-center"
                  >
                    <Link
                      href={
                        intakeBotTypeLinksForView(
                          noCopilotBot?.profile_type || "coachee",
                          !noCopilotBot?.avatar_bot ? "" : "123",
                          noCopilotBot?.uid || userProfile.uid,
                          userProfile.profile_type
                        )! + `&uid=`
                      }
                      className="flex flex-row gap-1 items-center "
                      // target="_blank"
                    >
                      <span className="max-sm:hidden">View</span>{" "}
                      <TooltipWrapper
                        className="hidden max-sm:block text-xs"
                        tooltipName="View"
                        body={<View className="h-3 w-3 ml-2 max-sm:ml-0" />}
                      />
                    </Link>
                  </Button>

                  {/* FOR EDIT MODE */}
                  <Button
                    variant={"secondary"}
                    className="h-6 text-xs w-fit bg-blue-200 inline-flex items-center ml-2"
                    disabled={
                      noCopilotBot
                        ? noCopilotBot?.is_approved === true
                          ? false
                          : true
                        : false
                    }
                  >
                    <Link
                      className="flex flex-row gap-1 items-center "
                      href={
                        intakeBotTypeLinks(
                          (noCopilotBot?.profile_type === "coach" &&
                            "no-copilot") ||
                            "coachee",
                          !noCopilotBot?.avatar_bot ? "" : "123",
                          userProfile.uid,
                          noCopilotBot?.profile_type || userProfile.profile_type
                        )! + `&uid=`
                      }
                      // target="_blank"
                    >
                      <span className="max-sm:hidden">Edit</span>{" "}
                      <TooltipWrapper
                        className="hidden max-sm:block text-xs"
                        tooltipName="Edit"
                        body={<Edit className="h-3 w-3 ml-2 max-sm:ml-0" />}
                      />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
    </div>
  );
};

export default MyPages;
