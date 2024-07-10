import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CopyToClipboard from "./CopyToClipboard";
import { Badge } from "./ui/badge";
import { Test } from "@/lib/test";
import { Div } from "./ui/moving-border";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

interface testTypes {
  tests: Test[];
  badgeText: string;
  user: boolean;
  id?: string;
}

const HeroAccordion = ({ tests, badgeText, user, id }: testTypes) => {
  return (
    <div className="pt-20 -mt-20">
      <div id={id}>
        <div className={`w-full flex justify-center`}>
          <Badge
            variant={"secondary"}
            className="bg-gray-300 h-6 w-fit text-gray-600 py-3 text-center mb-8 mt-12 max-sm:mt-8 text-sm"
          >
            System Demo : {badgeText}
          </Badge>
        </div>
        <div>
          <div className="relative isolate mx-auto">
            <div>
              <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-[-1.5rem] max-sm:w-[100%]">
                <div className="rounded-xl bg-white ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl max-sm:w-[100%]">
                  <Div className="bg-white">
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full text-gray-500 max-sm:p-4 p-4 border-2 rounded-xl"
                    >
                      {tests.map((test, i) => (
                        <AccordionItem
                          key={i}
                          value={`item-${i + 1}`}
                          className={`text-sm
                          ${i === tests.length - 1 ? "border-none" : "border-b"}
                        `}
                        >
                          <AccordionTrigger className="text-left max-sm:text-xs">
                            <div>
                              {test.title === "" ? (
                                <b>{test.domain}</b>
                              ) : (
                                <>
                                  <b>{test.domain}</b> - {test.title}
                                </>
                              )}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="max-sm:text-xs">
                            <p> {test.description}</p>
                            <div className="flex justify-end mt-2">
                              <CopyToClipboard
                                textToCopy={test.test_code}
                                copyType="code"
                              />
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </Div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroAccordion;
