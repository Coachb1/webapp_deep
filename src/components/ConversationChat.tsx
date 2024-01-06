import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "./ui/badge";

const ConversationChat = ({ conversation, participant, date, role }: any) => {
  return (
    <div className="w-full border my-2 px-2 rounded-sm">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger>
            <p>
              <b>Participant</b> : {participant} | <b>Date</b> : {date}
            </p>
          </AccordionTrigger>
          <AccordionContent>
            <div>
              {conversation.map((convo: any, i: any) => (
                <>
                  {i !== 0 && (
                    <div className="flex justify-start ">
                      <div className="flex flex-col items-start justify-start p-2 w-[80%]">
                        <div className="bg-blue-100 text-sm max-sm:text-xs p-2 rounded-md max-sm:full">
                          <h4 className="font-bold">Coach</h4>
                          <p>{convo.coach_message}</p>
                        </div>
                      </div>
                    </div>
                  )}
                  {conversation.length !== i + 1 && (
                    <div className="flex justify-end">
                      <div className="flex  p-2 w-[80%] flex-col items-end justify-end rounded-2xl">
                        <div className=" bg-blue-100 text-sm max-sm:text-xs p-2 rounded-md  max-sm:w-full">
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
