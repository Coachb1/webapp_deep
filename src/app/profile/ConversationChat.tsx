import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ConversationChat = ({
  conversation,
  participant,
  date,
  botName,
  type,
}: any) => {
  return (
    <div className="w-full border-gray-400 border bg-gray-200 my-1 px-2 rounded-xl">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger>
            <p className="flex flex-row flex-wrap max-sm:flex-col max-sm:text-left max-lg:flex-col max-lg:text-left">
              {type !== "coach-interactions" && (
                <span>
                  {" "}
                  <b>
                    {" "}
                    {type === "coachee-interactions"
                      ? "Name "
                      : "Participant name"}
                  </b>{" "}
                  : {participant} <span className="max-sm:hidden mx-2">|</span>
                </span>
              )}
              {type === "coach-interactions" && (
                <span className="text-left">
                  <b>Bot Name</b> : {botName}{" "}
                  {botName?.length < 120 && (
                    <span className="max-sm:hidden mx-2">|</span>
                  )}
                </span>
              )}
              <span>
                <b>Date</b> : {date}
              </span>
            </p>
          </AccordionTrigger>
          <AccordionContent>
            <div className="max-h-[40vh] overflow-y-scroll text-sm max-sm:text-xs max-md:text-xs max-lg:text-xs max-xl:text-xs">
              {conversation.map((convo: any, i: any) => (
                <>
                  {i !== 0 && (
                    <div className="flex justify-start ">
                      <div className="flex flex-col items-start justify-start p-2 w-[80%]">
                        <div className="bg-blue-100 p-2 rounded-md max-sm:full">
                          <h4 className="font-bold">Coach</h4>
                          <p>{convo.coach_message}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {conversation.length !== i + 1 && (
                    <div className="flex justify-end">
                      <div className="flex  p-2 w-[80%] flex-col items-end justify-end rounded-2xl">
                        <div className=" bg-blue-100 p-2 rounded-md  max-sm:w-full">
                          <h4 className="font-bold">Participant</h4>
                          <p>{convo.participant_message}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ConversationChat;

export const FeedbackConversationChat = ({
  conversation,
  participant,
  date,
  coachName,
}: {
  conversation: { question: string; answer: string }[];
  participant: string;
  date: string;
  coachName?: string;
}) => {
  return (
    <div className="w-full border border-gray-400  bg-gray-200 my-2 px-2 rounded-xl">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger>
            <p className="flex flex-row max-sm:flex-col max-sm:text-left max-lg:flex-col max-lg:text-left">
              <span>
                {" "}
                <b> Participant</b> : {participant}{" "}
                <span className="max-sm:hidden mx-2">|</span>
              </span>
              <span>
                <b>Date</b> : {date}
                <span className="max-sm:hidden mx-2">|</span>
              </span>
              <span>
                <b>Coach</b> : {coachName}
              </span>
            </p>
          </AccordionTrigger>
          <AccordionContent>
            <div className="max-h-[40vh] overflow-y-scroll text-sm max-sm:text-xs max-md:text-xs max-lg:text-xs max-xl:text-xs">
              {conversation.map((c) => (
                <>
                  <div className="flex justify-start ">
                    <div className="flex flex-col items-start justify-start p-2 w-[80%]">
                      <div className="bg-blue-100 p-2 rounded-md max-sm:full">
                        <h4 className="font-bold">Coach</h4>
                        <p>{c.question}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="flex  p-2 w-[80%] flex-col items-end justify-end rounded-2xl">
                      <div className=" bg-blue-100 p-2 rounded-md  max-sm:w-full">
                        <h4 className="font-bold">Participant</h4>
                        <p>{c.answer}</p>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
