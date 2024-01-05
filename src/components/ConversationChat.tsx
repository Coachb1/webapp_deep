import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const testData = [
  {
    participant_name: "falah",
    converstation: [
      {
        participant_message: "",
        coach_message: "",
      },
    ],
    user_role: "",
    converstation_date: "",
  },
];

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

const ConversationChat = () => {
  return (
    <div className="w-[80%] border  my-2 px-2 rounded-sm">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            Participant : Falah | Date : 29 Dec, 2023
          </AccordionTrigger>
          <AccordionContent>
            <div>
              <div className="flex justify-start ">
                <div className="flex flex-col items-start justify-start p-2 w-[80%]">
                  <div className="bg-blue-100 text-sm max-sm:text-xs p-2 rounded-md max-sm:full">
                    {/* <h4 className="font-bold">Question</h4> */}
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Vitae quasi minima impedit nemo fugiat voluptatum
                      consectetur molestias enim officiis iure.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="flex  p-2 w-[80%] flex-col items-end justify-end rounded-2xl">
                  <div className=" bg-blue-100 text-sm max-sm:text-xs p-2 rounded-md  max-sm:w-full">
                    <h4 className="font-bold">Response</h4>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolor, facere? Iste reiciendis sapiente debitis, ratione
                      beatae error qui repellat eaque!
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-start ">
                <div className="flex flex-col items-start justify-start p-2 w-[80%]">
                  <div className="bg-blue-100 text-sm max-sm:text-xs p-2 rounded-md max-sm:full">
                    <h4 className="font-bold">Question</h4>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Vitae quasi minima impedit nemo fugiat voluptatum
                      consectetur molestias enim officiis iure.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="flex  p-2 w-[80%] flex-col items-end justify-end rounded-2xl">
                  <div className=" bg-blue-100 text-sm max-sm:text-xs p-2 rounded-md  max-sm:w-full">
                    <h4 className="font-bold">Response</h4>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolor, facere? Iste reiciendis sapiente debitis, ratione
                      beatae error qui repellat eaque!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="h-[2px] bg-gray-400 rounded-lg"></div>
    </div>
  );
};

export default ConversationChat;
