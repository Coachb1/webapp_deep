"use client";

import { useEffect, useState } from "react";
import ConversationChat from "./ConversationChat";
import { Loader } from "lucide-react";
import { baseURL, basicAuth } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Result {
  uid: string;
  coach_message_text?: string;
  participant_message_text?: string | null;
  status: string;
  created: string;
  updated?: string;
}

interface Conversation {
  results: Result[];
  participant_name: string;
  participant_uid: string;
  role: string;
  date: string;
  bot_name?: string; // Add bot_name to the Conversation interface
}

interface ConvertedResult {
  participant_message: string;
  coach_message: string;
  user_role: string;
  conversation_date: string;
  bot_name?: string; // Add bot_name to the ConvertedResult interface
}

interface ConvertedConversation {
  participant_name: string;
  conversation: ConvertedResult[];
  role: string;
  date: string;
  bot_name?: string; // Add bot_name to the ConvertedConversation interface
}

function convertJsonToExpectedFormat(
  jsonData: Conversation[]
): ConvertedConversation[] {
  return jsonData.map((conversation) => {
    const { participant_name, results, role, date, bot_name } = conversation;
    const conversationArray: ConvertedResult[] = results.map((result) => {
      const participantMessage = result.participant_message_text || "";
      const coachMessage = result.coach_message_text || "";
      const userRole =
        result.status === "participant_message_saved" ? "participant" : "coach";
      const conversationDate = result.created;

      return {
        participant_message: participantMessage,
        coach_message: coachMessage,
        user_role: userRole,
        conversation_date: conversationDate,
        bot_name: bot_name, // Include bot_name in ConvertedResult
      };
    });

    return {
      participant_name: participant_name,
      conversation: conversationArray,
      role: role,
      date: date,
      bot_name: bot_name, // Include bot_name in ConvertedConversation
    };
  });
}

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

  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  useEffect(() => {
    if (user) {
      setLoading(true);
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
        .then(async (data) => {
          await fetch(
            `${baseURL}/coaching-conversations/bot-conversation-data/?for=admin&user_id=${data.uid}`,
            {
              method: "GET",
              headers: {
                Authorization: basicAuth,
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              console.log("FOR ADMIN : ", data);
              if (data[0] != "Bot not Found") {
                const convertedData: ConvertedConversation[] =
                  convertJsonToExpectedFormat(data);
                setConvertsationDataAdmin(convertedData);
              }
            })
            .catch((err) => {
              console.error(err);
              setLoading(false);
              setFetchError(true);
            });

          await fetch(
            `${baseURL}/coaching-conversations/bot-conversation-data/?for=user&user_id=${data.uid}`,
            {
              method: "GET",
              headers: {
                Authorization: basicAuth,
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              console.log("FOR USER : ", data);
              const convertedData: ConvertedConversation[] =
                convertJsonToExpectedFormat(data);
              setConvertsationData(convertedData);
              setLoading(false);
            })
            .catch((err) => {
              console.error(err);
              setLoading(false);
              setFetchError(true);
            });
        });
    }
  }, []);
  return (
    <>
      <div className="bg-accent p-2 mt-2 rounded-md">
        <div className="pl-4 max-sm:pl-2 pt-2">Bot Conversations</div>
        <div className="">
          {conversationDataAdmin.length > 0 || conversationData.length > 0 ? (
            <div className="text-sm w-full m-4 ml-0 p-2 rounded-md text-slate-800 flex flex-col gap-2 max-sm:text-xs min-h-[109px]">
              <div className="flex flex-col justify-start items-start  mx-2 rounded-md">
                {conversationDataAdmin.length > 0 && (
                  <>
                    <Badge>Coachee interactions</Badge>
                    <div className="flex flex-col w-full">
                      {conversationDataAdmin.map((conversation) => (
                        <ConversationChat
                          type="coachee-interactions"
                          participant={conversation.participant_name}
                          conversation={conversation.conversation}
                          botName={conversation.bot_name}
                          date={
                            conversation.date !== "" &&
                            formatDate(conversation.date)
                          }
                          role={conversation.role}
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
                    <Badge>My interactions</Badge>
                    <div className="flex flex-col w-full">
                      {conversationData.map((conversation) => (
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
