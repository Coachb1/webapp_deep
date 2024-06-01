import CopyToClipboard from "@/components/CopyToClipboard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { AtSign } from "lucide-react";

interface LibraryTestsAccordianType {
  tests: any;
  attemptedTests: any;
  type?: any;
}

const LibraryTestsAccordian = ({
  tests,
  attemptedTests,
  type,
}: LibraryTestsAccordianType) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full text-gray-500 max-sm:p-4 rounded-xl bg-white overflow-clip border"
    >
      {tests.filter((test: any) => test.is_micro === true).length > 0 && (
        <>
          <Badge variant={"outline"} className="text-sm my-2 px-4">
            Short
          </Badge>
          {tests
            .filter((test: any) => test.is_micro === true)
            .map((test: any, i: number) => (
              <>
                <AccordionItem
                  key={i}
                  value={`item-short-${Number(i) + 1}`}
                  className={`${
                    Number(i) + 1 === tests.length ? "border-none" : "border-b"
                  } ${
                    attemptedTests.includes(test.test_code) ? "bg-gray-200" : ""
                  } px-4`}
                >
                  <AccordionTrigger className="text-left max-sm:text-xs">
                    <div>
                      {test.title}{" "}
                      {type === "requested" && (
                        <>
                          {test.is_assigned && (
                            <AtSign className="h-3 w-3 ml-1 inline font-bold text-blue-500" />
                          )}
                        </>
                      )}
                      {test.is_recommended && (
                        <Badge
                          variant={"secondary"}
                          className="ml-2 rounded-sm bg-blue-100 text-xs text-blue-700 hover:bg-blue-200"
                        >
                          Recommended
                        </Badge>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="max-sm:text-xs">
                    <p className="text-left"> {test.description}</p>
                    {type === "assigned" && (
                      <p className="my-2 text-sm max-sm:text-xs text-left bg-gray-200 w-fit rounded-sm py-1 px-2">
                        Assigned by{" "}
                        <span className="font-bold text-blue-500">
                          {test.assigned_by}
                        </span>
                      </p>
                    )}
                    <div className="flex justify-end mt-2">
                      <CopyToClipboard
                        textToCopy={test.test_code}
                        copyType="code"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </>
            ))}
        </>
      )}

      {tests.filter((test: any) => test.is_micro === false).length > 0 && (
        <>
          <Badge variant={"outline"} className="text-sm my-2 px-4">
            Standard
          </Badge>
          {tests
            .filter((test: any) => test.is_micro === false)
            .map((test: any, i: number) => (
              <>
                <AccordionItem
                  key={i}
                  value={`item-standard-${Number(i) + 1}`}
                  className={`${
                    Number(i) + 1 === tests.length ? "border-none" : "border-b"
                  } ${
                    attemptedTests.includes(test.test_code) ? "bg-gray-200" : ""
                  } px-4`}
                >
                  <AccordionTrigger className="text-left max-sm:text-xs">
                    <div>
                      {test.title}{" "}
                      {test.is_recommended && (
                        <Badge
                          variant={"secondary"}
                          className="ml-2 rounded-sm bg-blue-100 text-xs text-blue-700 hover:bg-blue-200"
                        >
                          Recommended
                        </Badge>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="max-sm:text-xs">
                    <p className="text-left"> {test.description}</p>
                    <div className="flex justify-end mt-2">
                      <CopyToClipboard
                        textToCopy={test.test_code}
                        copyType="code"
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </>
            ))}
        </>
      )}
    </Accordion>
  );
};

export default LibraryTestsAccordian;
