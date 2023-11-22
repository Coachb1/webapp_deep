import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CopyToClipboard from "./CopyToClipboard";
import { Test } from "@/lib/test";

interface testTypes {
  tests: Test[];
}

const HeroAccordion = ({ tests }: testTypes) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full text-gray-500 max-sm:p-4 "
    >
      {tests.map((test, i) => (
        <AccordionItem
          key={i}
          value={`item-${i + 1}`}
          className={i === tests.length - 1 ? "border-none" : "border-b"}
        >
          <AccordionTrigger className="text-left max-sm:text-xs">
            <div>
              <b>{test.domain}</b> - {test.title}
            </div>
          </AccordionTrigger>
          <AccordionContent className="max-sm:text-xs">
            <p> {test.description}</p>
            <p className="mt-2">
              <span className="font-bold">Response mode Allowed</span> :{" "}
              {test.interaction_mode}
            </p>
            <div className="flex justify-end mt-2">
              <CopyToClipboard textToCopy={test.test_code} />
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default HeroAccordion;
