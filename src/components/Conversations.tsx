"use client";

import { useEffect } from "react";
import { Badge } from "./ui/badge";
import ConversationChat from "./ConversationChat";

const subdomain =
  typeof window !== "undefined" ? window.location.hostname.split(".")[0] : null;
const devUrl = "https://coach-api-ovh.coachbots.com/api/v1";
// const devUrl = "https://coach-api-gcp.coachbots.com/api/v1";
const prodUrl = "https://coach-api-prod-ovh.coachbots.com/api/v1";
const baseURL = subdomain === "platform" ? prodUrl : devUrl;
const basicAuth =
  "Basic Yzc3MjFmZGItYTllMC00YTYxLWEzMTYtNDRhODA1N2VkMjY0OjhjNWNlZWZlLTY2Y2QtNDliZi04MTY5LTBhNjMwMmU5NmZlMA==";

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
}

interface ConvertedResult {
  participant_message: string;
  coach_message: string;
  user_role: string;
  conversation_date: string;
}

interface ConvertedConversation {
  participant_name: string;
  conversation: ConvertedResult[];
}

function convertJsonToExpectedFormat(
  jsonData: Conversation[]
): ConvertedConversation[] {
  return jsonData.map((conversation) => {
    const { participant_name, results } = conversation;
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
      };
    });

    return {
      participant_name: participant_name,
      conversation: conversationArray,
    };
  });
}

const originalJson: Conversation[] = [
  {
    results: [
      {
        uid: "70c7c629-eb7c-4839-84cc-6a1215d9983c",
        coach_message_text: "initial question text",
        participant_message_text: "end",
        status: "participant_message_saved",
        created: "2024-01-05T09:21:48.059914Z",
        updated: "2024-01-05T09:21:49.154160Z",
      },
      {
        uid: "030397a5-8d06-4bf9-862a-00bb4bc75cc5",
        coach_message_text:
          " Based on the background information provided, here is a summary of the key details:\n\nThe user is an experienced project manager with over a decade of experience across IT and construction industries. Their expertise includes risk management, strategic planning, and stakeholder communication. Their coaching style is collaborative, emphasizing open communication, problem-solving, independent decision-making, constructive feedback, and establishing realistic yet challenging goals. Their adaptive approach ensures each team member's strengths contribute to collective success while addressing individual needs for growth. They are flexible and committed to tailoring the coaching schedule to align with the project workload and timelines to complement rather than disrupt productivity. They refrain from engaging in commercial activities, focusing squarely on the art of coaching to enhance team dynamics and project outcomes.",
        participant_message_text: null,
        status: "bot_message_saved",
        created: "2024-01-05T09:22:01.415774Z",
        updated: "2024-01-05T09:22:01.415817Z",
      },
    ],
    participant_name: "falah",
    participant_uid: "535d8e8c-3a48-4bc2-bd78-30bece9331c5",
  },
  {
    results: [
      {
        uid: "171c7035-fade-41be-a507-97b9965b68e8",
        coach_message_text: "initial question text",
        participant_message_text:
          "their strengths, encouraging problem-solving and independent decision-making. I like providing constructive feedback and setting realistic yet challenging goals.",
        status: "participant_message_saved",
        created: "2024-01-05T09:48:15.840839Z",
        updated: "2024-01-05T09:48:16.645062Z",
      },
      {
        uid: "cd6bffc7-3b51-4607-b3a7-b40d0620b14e",
        coach_message_text:
          " Based on the background information provided, here are the key details about the user's coaching/mentoring style for project management:\n\nThe coaching style is collaborative, fostering open communication and active participation within the team to empower members to harness their strengths. There is an emphasis on cultivating self-sufficiency through problem-solving and independent decision-making. Feedback provided is constructive in nature and goals set are realistic yet challenging to align with the dynamic demands of projects. The adaptive coaching approach creates an inclusive environment where team members feel supported to contribute to collective success. There is flexibility to tailor the coaching schedule to the team's workload and project timeline to complement rather than disrupt productivity. The sole focus is on coaching to enhance team dynamics and project outcomes.",
        participant_message_text: "what is that",
        status: "participant_message_saved",
        created: "2024-01-05T09:48:26.667289Z",
        updated: "2024-01-05T09:48:44.560988Z",
      },
      {
        uid: "adea14bc-d068-46a7-aa6f-5af6305faabd",
        coach_message_text:
          " Based on the background information provided, this is an overview of the user's expertise and experience as a project manager. Key points include:\n\n- Over a decade of experience in project management spanning IT, construction, and other industries\n- Skilled in areas like risk management, strategic planning, and stakeholder communication \n- Collaborative coaching approach focused on open communication, problem-solving, goal-setting\n- Adaptive style works well with diverse teams and individuals \n- Flexible time commitment tailored to project needs and timelines\n- Aims to contribute coaching insights without commercial involvement\n\nThe user is positioned as an experienced project management coach and mentor who takes a strategic, participative approach to guiding teams and achieving project success. Their adaptable coaching style is well-suited to the multifaceted demands of complex projects.",
        participant_message_text: null,
        status: "bot_message_saved",
        created: "2024-01-05T09:48:55.288955Z",
        updated: "2024-01-05T09:48:55.289059Z",
      },
    ],
    participant_name: "mohammed",
    participant_uid: "1e906c2b-dc45-44b3-b609-7d98aef3c041",
  },
];
const convertedData: ConvertedConversation[] =
  convertJsonToExpectedFormat(originalJson);
console.log(convertedData);

const Conversations = () => {
  useEffect(() => {
    fetch(
      `${baseURL}/coaching-conversations/bot-conversation-data/?for=admin&user_id=535d8e8c-3a48-4bc2-bd78-30bece9331c5`,
      {
        method: "GET",
        headers: {
          Authorization: basicAuth,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Coaching Conversation : ", data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div className="bg-accent p-2 mt-2 rounded-md">
      <div className="pl-4 max-sm:pl-2 pt-2">Conversations</div>
      <div className="">
        <div className="text-sm w-full m-4 ml-0 p-2 rounded-md text-slate-800 flex flex-col gap-2 max-sm:text-xs min-h-[109px]">
          <div className="flex flex-col justify-center items-center bg-gray-200 mx-2 rounded-md">
            {/* {convertedData.map((conversation) => (
              // <ConversationChat conversation={conversation.conversation} />
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversations;
