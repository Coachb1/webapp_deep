"use client";

import { useEffect, useState } from "react";
import ConversationChat, { FeedbackConversationChat } from "./ConversationChat";
import { Info, Loader } from "lucide-react";
import { baseURL, basicAuth, getUserAccount } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ConvertedConversation, FeedbackConversationType } from "@/lib/types";
import { useUser } from "@/context/UserContext";


function formatDate(inputDateString: string): string {
  const originalDate = new Date(inputDateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    originalDate
  );

  return formattedDate;
}

const Conversations = ({ user }: any) => {
  const [conversationData, setConvertsationData] = useState<
    ConvertedConversation[]
  >([]);
  const [conversationDataAdmin, setConvertsationDataAdmin] = useState<
    ConvertedConversation[]
  >([]);

  const [feedbackConversations, setFeedbackConversations] = useState<
    FeedbackConversationType[]
  >([]);

  const [loading, setLoading] = useState(true);

  const { botConversations, userId, } = useUser();
  useEffect(() => {
    console.log(botConversations.convertsationDataAdmin)
      setConvertsationDataAdmin(
        botConversations.convertsationDataAdmin.filter(
          (d) => d.participant_uid !== userId
        )
      );
  
      console.log(botConversations.convertsationDataAdmin.filter((conversation) => conversation.participant_uid !== userId));
  
      setConvertsationData(
        botConversations.conversationDataUser.filter(
          (d) => d.bot_type !== "deep_dive"
        )
      );
      
      setFeedbackConversations(botConversations.feedbackConversations);

      setLoading(false)
  },[botConversations]);

  return (
    <>
      <div
        id="bot-conversations"
        className="bg-accent p-2 mt-2 mb-6 rounded-md"
      >
        <div className="pl-4 max-sm:pl-2 pt-2 text-sm max-sm:text-sm">
          Bot Conversations
        </div>
        <p className="bg-amber-100 text-xs font-semibold text-gray-500 p-1 w-fit rounded-md ml-4 max-sm:ml-2 my-2 flex flex-row items-center">
          {" "}
          <Info className="h-3 w-3 mr-2 inline" />
          Bot Conversation history is updated every 60 mins.
        </p>
        <div className="">
          {conversationDataAdmin.length > 0 ||
          conversationData.length > 0 ||
          feedbackConversations.length > 0 ? (
            <div className="text-sm w-full m-4 ml-0 p-2 rounded-md text-slate-800 flex flex-col gap-2 max-sm:text-xs max-lg:text-xs max-xl:text-xs min-h-[109px]">
              <div className="flex flex-col justify-start items-start  mx-2 rounded-md">
                {conversationDataAdmin.length > 0 && (
                  <>
                    <Badge>Coachee & Mentee Interactions</Badge>
                    <div className="flex flex-col w-full">
                      {/* AVATAR BOT */}
                      {conversationDataAdmin.filter(
                        (convo) => convo.bot_type === "avatar_bot"
                      ).length > 0 && (
                        <p className="mt-4 font-semibold">
                          Avatar Bots / Icons by AI
                        </p>
                      )}
                      {conversationDataAdmin
                        .filter((convo) => convo.bot_type === "avatar_bot")
                        .map((conversation) => (
                          <ConversationChat
                            // type="coach-interactions"
                            participant={conversation.participant_name}
                            conversation={conversation.conversation}
                            date={
                              conversation.date !== "" &&
                              formatDate(conversation.date)
                            }
                            role={conversation.role}
                            botName={conversation.bot_name}
                          />
                        ))}

                      {/* DEEP DIVE */}
                      {conversationDataAdmin.filter(
                        (convo) => convo.bot_type === "deep_dive"
                      ).length > 0 && (
                        <p className="mt-4 font-semibold">
                          Engagement Survey Bots
                        </p>
                      )}
                      {conversationDataAdmin
                        .filter((convo) => convo.bot_type === "deep_dive")
                        .map((conversation) => (
                          <ConversationChat
                            // type="coach-interactions"
                            participant={conversation.participant_name}
                            conversation={conversation.conversation}
                            date={
                              conversation.date !== "" &&
                              formatDate(conversation.date)
                            }
                            role={conversation.role}
                            botName={conversation.bot_name}
                          />
                        ))}

                      {/* KNOWLEDGE BOT */}
                      {conversationDataAdmin.filter(
                        (convo) => convo.bot_type === "user_bot"
                      ).length > 0 && (
                        <p className="mt-4 font-semibold">Knowledge Bots</p>
                      )}
                      {conversationDataAdmin
                        .filter((convo) => convo.bot_type === "user_bot")
                        .map((conversation) => (
                          <ConversationChat
                            // type="coach-interactions"
                            participant={conversation.participant_name}
                            conversation={conversation.conversation}
                            date={
                              conversation.date !== "" &&
                              formatDate(conversation.date)
                            }
                            role={conversation.role}
                            botName={conversation.bot_name}
                          />
                        ))}
                    </div>
                  </>
                )}
                {conversationDataAdmin.length > 0 &&
                  conversationData.length > 0 && (
                    <div className="h-[2px] w-full bg-gray-200 my-2 rounded-xl" />
                  )}
                {conversationData.length > 0 && (
                  <>
                    <Badge>My Interactions</Badge>
                    <div className="flex flex-col w-full">
                      {/* AVATAR BOT */}
                      {conversationData.filter(
                        (convo) => convo.bot_type === "avatar_bot"
                      ).length > 0 && (
                        <p className="mt-4 font-semibold">
                          Avatar Bots / Icons by AI
                        </p>
                      )}
                      {conversationData
                        .filter((convo) => convo.bot_type === "avatar_bot")
                        .map((conversation) => (
                          <ConversationChat
                            type="coach-interactions"
                            participant={conversation.participant_name}
                            conversation={conversation.conversation}
                            date={
                              conversation.date !== "" &&
                              formatDate(conversation.date)
                            }
                            role={conversation.role}
                            botName={conversation.bot_name}
                          />
                        ))}

                      {/* DEEP DIVE */}
                      {conversationData.filter(
                        (convo) => convo.bot_type === "deep_dive"
                      ).length > 0 && (
                        <p className="mt-4 font-semibold">
                          Engagement Survey Bots
                        </p>
                      )}
                      {conversationData
                        .filter((convo) => convo.bot_type === "deep_dive")
                        .map((conversation) => (
                          <ConversationChat
                            type="coach-interactions"
                            participant={conversation.participant_name}
                            conversation={conversation.conversation}
                            date={
                              conversation.date !== "" &&
                              formatDate(conversation.date)
                            }
                            role={conversation.role}
                            botName={conversation.bot_name}
                          />
                        ))}

                      {/* KNOWLEDGE BOT */}
                      {conversationData.filter(
                        (convo) => convo.bot_type === "user_bot"
                      ).length > 0 && (
                        <p className="mt-4 font-semibold">Knowledge Bots</p>
                      )}
                      {conversationData
                        .filter((convo) => convo.bot_type === "user_bot")
                        .map((conversation) => (
                          <ConversationChat
                            type="coach-interactions"
                            participant={conversation.participant_name}
                            conversation={conversation.conversation}
                            date={
                              conversation.date !== "" &&
                              formatDate(conversation.date)
                            }
                            role={conversation.role}
                            botName={conversation.bot_name}
                          />
                        ))}
                    </div>
                  </>
                )}
                {conversationData.length > 0 &&
                  feedbackConversations.length > 0 && (
                    <div className="h-[2px] w-full bg-gray-200 my-2 rounded-xl" />
                  )}
                {feedbackConversations.length > 0 && (
                  <>
                    <Badge>Feedback Interactions</Badge>
                    <div className="flex flex-col w-full">
                      {feedbackConversations.map((conversation) => (
                        <FeedbackConversationChat
                          conversation={conversation.msg}
                          date={formatDate(conversation.date)}
                          participant={conversation.participant_name}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <>
              {!loading && (
                <>
                  <>
                    <div className="text-xs w-full h-20 flex items-center justify-center">
                      <div>You have no conversations yet.</div>
                    </div>
                  </>
                </>
              )}
            </>
          )}
          {loading && (
            <>
              <div className="text-xs w-full h-20 flex items-center justify-center">
                <div>
                  <Loader className="h-4 w-4 mr-2 animate-spin inline" />{" "}
                  Loading
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Conversations;
