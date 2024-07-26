"use client";

import { useEffect, useState } from "react";
import ConversationChat, { FeedbackConversationChat } from "./ConversationChat";
import { Info, Loader } from "lucide-react";
import { baseURL, basicAuth, getUserAccount } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ConvertedConversation, FeedbackConversationType } from "@/lib/types";
import { useUser } from "@/context/UserContext";

// interface Result {
//   uid: string;
//   coach_message_text?: string;
//   participant_message_text?: string | null;
//   status: string;
//   created: string;
//   updated?: string;
// }

// interface Conversation {
//   results: Result[];
//   participant_name: string;
//   participant_uid: string;
//   role: string;
//   date: string;
//   bot_name?: string; // Add bot_name to the Conversation interface
// }

// interface ConvertedResult {
//   participant_message: string;
//   coach_message: string;
//   user_role: string;
//   conversation_date: string;
//   bot_name?: string; // Add bot_name to the ConvertedResult interface
// }

// interface ConvertedConversation {
//   participant_name: string;
//   conversation: ConvertedResult[];
//   role: string;
//   date: string;
//   bot_name?: string; // Add bot_name to the ConvertedConversation interface
//   bot_type?: string;
// }

// function convertJsonToExpectedFormat(
//   jsonData: Conversation[]
// ): ConvertedConversation[] {
//   return jsonData.map((conversation) => {
//     const { participant_name, results, role, date, bot_name } = conversation;
//     const conversationArray: ConvertedResult[] = results.map((result) => {
//       const participantMessage = result.participant_message_text || "";
//       const coachMessage = result.coach_message_text || "";
//       const userRole =
//         result.status === "participant_message_saved" ? "participant" : "coach";
//       const conversationDate = result.created;

//       return {
//         participant_message: participantMessage,
//         coach_message: coachMessage,
//         user_role: userRole,
//         conversation_date: conversationDate,
//         bot_name: bot_name, // Include bot_name in ConvertedResult
//       };
//     });

//     return {
//       participant_name: participant_name,
//       conversation: conversationArray,
//       role: role,
//       date: date,
//       bot_name: bot_name, // Include bot_name in ConvertedConversation
//     };
//   });
// }

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
  const [fetchError, setFetchError] = useState(false);

  const { botConversations } = useUser();
  useEffect(() => {
    setConvertsationDataAdmin(
      botConversations.convertsationDataAdmin.filter(
        (d) => d.bot_type !== "deep_dive"
      )
    );
    setConvertsationData(
      botConversations.conversationDataUser.filter(
        (d) => d.bot_type !== "deep_dive"
      )
    );
    console.log(botConversations.feedbackConversations);
    setFeedbackConversations(botConversations.feedbackConversations);
    // if (user) {
    //   setLoading(true);
    //   getUserAccount(user)
    //     .then((response) => response.json())
    //     .then(async (data) => {
    //       await fetch(
    //         `${baseURL}/coaching-conversations/bot-conversation-data/?for=admin&user_id=${data.uid}`,
    //         {
    //           method: "GET",
    //           headers: {
    //             Authorization: basicAuth,
    //           },
    //         }
    //       )
    //         .then((res) => res.json())
    //         .then((data) => {
    //           console.log("FOR ADMIN : ", data);
    //           if (data[0] != "Bot not Found") {
    //             const convertedData: ConvertedConversation[] =
    //               convertJsonToExpectedFormat(data);
    //             setConvertsationDataAdmin(
    //               convertedData.sort(
    //                 (a, b) =>
    //                   new Date(b.date).getTime() - new Date(a.date).getTime()
    //               )
    //             );
    //           }
    //           // setLoading(false);
    //         })
    //         .catch((err) => {
    //           console.error(err);
    //           setLoading(false);
    //           setFetchError(true);
    //         });
    //       await fetch(
    //         `${baseURL}/coaching-conversations/bot-conversation-data/?for=user&user_id=${data.uid}`,
    //         {
    //           method: "GET",
    //           headers: {
    //             Authorization: basicAuth,
    //           },
    //         }
    //       )
    //         .then((res) => res.json())
    //         .then((data) => {
    //           console.log("FOR USER : ", data);
    //           const convertedData: ConvertedConversation[] =
    //             convertJsonToExpectedFormat(data);
    //           setConvertsationData(
    //             convertedData.sort(
    //               (a, b) =>
    //                 new Date(b.date).getTime() - new Date(a.date).getTime()
    //             )
    //           );
    //           // setLoading(false);
    //         })
    //         .catch((err) => {
    //           console.error(err);
    //           setLoading(false);
    //           setFetchError(true);
    //         });
    //       fetch(`${baseURL}/accounts/get-bots/?user_id=${data.uid}`, {
    //         headers: {
    //           Authorization: basicAuth,
    //         },
    //       })
    //         .then((res) => res.json())
    //         .then((data) => {
    //           console.log("Bot details for feedback check", data);
    //           const FeedbackBot = data.data.filter(
    //             (data: any) => data.signature_bot.bot_type === "feedback_bot"
    //           );
    //           if (FeedbackBot.length > 0) {
    //             fetch(
    //               `${baseURL}/accounts/get-user-feedback-data/?method=get&bot_id=${FeedbackBot[0].signature_bot.bot_id}`,
    //               {
    //                 method: "GET",
    //                 headers: {
    //                   Authorization: basicAuth,
    //                 },
    //               }
    //             )
    //               .then((res) => res.json())
    //               .then((data) => {
    //                 console.log("FOR Feedback bot data : ", data);
    //                 const FeedbackConvo: FeedbackConversationType[] =
    //                   data.message.map((entry: any) => ({
    //                     participant_name: entry.is_anonymous
    //                       ? "Anonymous User"
    //                       : entry.participant_name,
    //                     date: entry.date,
    //                     msg: {
    //                       question: Object.keys(entry.msg)[0],
    //                       answer: Object.values(entry.msg)[0],
    //                     },
    //                   }));
    //                 console.log(FeedbackConvo, "FeedbackConvo");
    //                 setFeedbackConversations(
    //                   FeedbackConvo.sort(
    //                     (a, b) =>
    //                       new Date(b.date).getTime() -
    //                       new Date(a.date).getTime()
    //                   )
    //                 );
    //                 setLoading(false);
    //               })
    //               .catch((err) => {
    //                 console.error(err);
    //                 setLoading(false);
    //                 setFetchError(true);
    //               });
    //           } else {
    //             setLoading(false);
    //           }
    //         });
    //     });
    // }
    setLoading(false);
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
