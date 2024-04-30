import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CopyToClipboard from "./CopyToClipboard";
import { Badge } from "./ui/badge";
import { Test } from "@/lib/test";

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
            className="bg-[#2DC092] h-6 w-fit text-white text-lg py-3 hover:bg-[#2DC092] text-center mb-8 mt-12 max-sm:mt-8 max-sm:text-sm"
          >
            ✨ {badgeText}
          </Badge>
        </div>
        <div>
          <div className="relative isolate mx-auto">
            <div>
              <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-[-1.5rem] max-sm:w-[100%]">
                <div className="rounded-xl bg-white p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 max-sm:w-[100%]">
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full text-gray-500 max-sm:p-4"
                  >
                    {tests.map((test, i) => (
                      <AccordionItem
                        key={i}
                        value={`item-${i + 1}`}
                        className={
                          i === tests.length - 1 ? "border-none" : "border-b"
                        }
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
