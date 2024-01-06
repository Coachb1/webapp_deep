import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "./ui/badge";

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

const ConversationChat = () => {
  return (
    <div className="w-[80%] border  my-2 px-2 rounded-sm">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex flex-col justify-start">
              <Badge className="w-fit mb-2 hover:decoration-transparent">
                Admin
              </Badge>
              <p>Participant : Falah | Date : 29 Dec, 2023</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div>
              <div className="flex justify-start ">
                <div className="flex flex-col items-start justify-start p-2 w-[80%]">
                  <div className="bg-blue-100 text-sm max-sm:text-xs p-2 rounded-md max-sm:full">
                    <h4 className="font-bold">Coach</h4>
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
                    <h4 className="font-bold">Participant</h4>
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
