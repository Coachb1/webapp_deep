"use client";

import { useEffect, useRef, useState } from "react";
import ConversationChat, { FeedbackConversationChat } from "./ConversationChat";
import { Info, Loader } from "lucide-react";
import { baseURL, basicAuth, convertJsonToExpectedFormat } from "@/lib/utils";
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
  const [myFeedbacksData, setMyFeedbacksData] = useState<
    FeedbackConversationType[]
  >([]);

  const [feedbackConversations, setFeedbackConversations] = useState<
    FeedbackConversationType[]
  >([]);

  const [loading, setLoading] = useState(true);

  const { userId, feedbackBots } = useUser();
  const hasRun = useRef(false);

  const getBotConversations = async (feedbackBotId: string) => {
    try {
      const responseAdmin = await fetch(
        `${baseURL}/coaching-conversations/bot-conversation-data/?for=admin&user_id=${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: basicAuth,
          },
        }
      );

      if (responseAdmin.ok) {
        const responseData = await responseAdmin.json();
        console.log("responseData ADMIN", responseData);
        if (responseData[0] != "Bot not Found") {
          const convertedData: ConvertedConversation[] =
            convertJsonToExpectedFormat(responseData);
          setConvertsationDataAdmin(
            convertedData.sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
          );
          console.log("convertedData ADMIN : ", convertedData);
        }
      }

      const responseUser = await fetch(
        `${baseURL}/coaching-conversations/bot-conversation-data/?for=user&user_id=${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: basicAuth,
          },
        }
      );

      if (responseUser.ok) {
        const responseData = await responseUser.json();
        console.log("responseData USER", responseData);
        if (responseData[0] != "Bot not Found") {
          const convertedData: ConvertedConversation[] =
            convertJsonToExpectedFormat(responseData);
          setConvertsationData(
            convertedData.sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
          );
          console.log("convertedData USER : ", convertedData);
        }
      }

      const responseFeedback = await fetch(
        `${baseURL}/coaching-conversations/get-attempted-bots/?user_id=${userId}&only_feedback=true`, //http://localhost:8001/api/v1/coaching-conversations/get-attempted-bots/?user_id=493dd033-57d8-4298-9320-f1240200ef86&only_feedback=true
        {
          method: "GET",
          headers: {
            Authorization: basicAuth,
          },
        }
      );

      if (responseFeedback.ok) {
        const responseData = await responseFeedback.json();
        console.log("responseFeedback USER", responseData);
        const FeedbackUserConvo: FeedbackConversationType[] = responseData.map(
          (entry: any) => ({
            participant_name: entry.is_anonymous
              ? "Anonymous User"
              : entry.participant_name,
            date: entry.date,
            msg: Object.keys(entry.msg).map((question) => ({
              question: question,
              answer: entry.msg[question],
            })),
          })
        );
        console.log(FeedbackUserConvo, "FeedbackUserConvo");
        setMyFeedbacksData(FeedbackUserConvo);
        setMyFeedbacksData(
          FeedbackUserConvo.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
        );
      }

      if (feedbackBotId) {
        const responseFeedback = await fetch(
          `${baseURL}/accounts/get-user-feedback-data/?method=get&bot_id=${feedbackBotId}`,
          {
            method: "GET",
            headers: {
              Authorization: basicAuth,
            },
          }
        );

        if (responseFeedback.ok) {
          const responseData = await responseFeedback.json();
          console.log(responseData);
          const FeedbackConvo: FeedbackConversationType[] =
            responseData.message.map((entry: any) => ({
              participant_name: entry.is_anonymous
                ? "Anonymous User"
                : entry.participant_name,
              date: entry.date,
              msg: Object.keys(entry.msg).map((question) => ({
                question: question,
                answer: entry.msg[question],
              })),
            }));
          console.log(FeedbackConvo, "FeedbackConvo");
          setFeedbackConversations(
            FeedbackConvo.sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
          );
        }
        console.log("convertedData USER : ", feedbackConversations);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasRun.current) {
      getBotConversations(feedbackBots[0]?.signature_bot.bot_id);
      hasRun.current = true;
    }
  }, []);

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
        <div>
          {conversationDataAdmin.length > 0 ||
          conversationData.length > 0 ||
          feedbackConversations.length > 0 ||
          myFeedbacksData.length > 0 ? (
            <div className="text-sm w-full m-4 ml-0 p-2 rounded-md text-slate-800 flex flex-col gap-2 max-sm:text-xs max-lg:text-xs max-xl:text-xs min-h-[109px]">
              <div className="flex flex-col justify-start items-start  mx-2 rounded-md">
                {conversationDataAdmin.length > 0 && (
                  <>
                    <Badge className="mt-2 mb-0">
                      Coachee Interactions
                    </Badge>
                    <div className="flex flex-col w-full mt-0">
                      {/* AVATAR BOT */}
                      {conversationDataAdmin.filter(
                        (convo) => convo.bot_type === "avatar_bot"
                      ).length > 0 && (
                        <p className="mt-2 font-semibold">
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
                        <p className="mt-2 font-semibold">
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
                        <p className="mt-2 font-semibold">Knowledge Bots</p>
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
                  (conversationData.length > 0 ||
                    myFeedbacksData.length > 0) && (
                    <div className="h-[2px] w-full bg-gray-200 my-2 rounded-xl" />
                  )}
                {(conversationData.length > 0 ||
                  myFeedbacksData.length > 0) && (
                  <>
                    <Badge className="mt-4 mb-0">My Interactions</Badge>
                    <div className="flex flex-col w-full">
                      {/* AVATAR BOT */}
                      {conversationData.filter(
                        (convo) => convo.bot_type === "avatar_bot"
                      ).length > 0 && (
                        <p className="mt-2 font-semibold">
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

                      {/* FEEDBACK CONVERSATIONS */}
                      {myFeedbacksData.length > 0 && (
                        <p className="mt-2 font-semibold">Feedbacks</p>
                      )}
                      <div className="flex flex-col w-full">
                        {myFeedbacksData.map((conversation) => (
                          <FeedbackConversationChat
                            conversation={conversation.msg}
                            date={formatDate(conversation.date)}
                            participant={conversation.participant_name}
                          />
                        ))}
                      </div>

                      {/* DEEP DIVE */}
                      {conversationData.filter(
                        (convo) => convo.bot_type === "deep_dive"
                      ).length > 0 && (
                        <p className="mt-2 font-semibold">
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
                        <p className="mt-2 font-semibold">Knowledge Bots</p>
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
                {(conversationData.length > 0 || myFeedbacksData.length > 0) &&
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
