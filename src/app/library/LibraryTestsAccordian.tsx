"use client";

import CopyToClipboard from "@/components/CopyToClipboard";
import TestsPagination from "./TestsPagination";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { AtSign } from "lucide-react";
import { useState } from "react";

interface LibraryTestsAccordianType {
  tests: any;
  attemptedTests: any;
  type?: any;
}

const ITEMS_PER_PAGE = 10;

const LibraryTestsAccordian = ({
  tests,
  attemptedTests,
  type,
}: LibraryTestsAccordianType) => {
  // State for pagination
  const [shortCurrentPage, setShortCurrentPage] = useState(1);
  const [standardCurrentPage, setStandardCurrentPage] = useState(1);

  const getPaginatedData = (data: any[], currentPage: number) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const shortTests = tests.filter((test: any) => test.is_micro === true);
  const standardTests = tests.filter((test: any) => test.is_micro === false);

  const paginatedShortTests = getPaginatedData(shortTests, shortCurrentPage);
  const paginatedStandardTests = getPaginatedData(
    standardTests,
    standardCurrentPage
  );

  const shortTotalPages = Math.ceil(shortTests.length / ITEMS_PER_PAGE);
  const standardTotalPages = Math.ceil(standardTests.length / ITEMS_PER_PAGE);

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full text-gray-500 max-sm:p-4 rounded-xl bg-white overflow-clip border"
    >
      {paginatedShortTests.length > 0 && (
        <>
          <Badge variant={"outline"} className="text-sm my-2 px-4">
            Short
          </Badge>
          {paginatedShortTests.map((test: any, i: number) => (
            <AccordionItem
              key={i}
              value={`item-short-${i + 1}`}
              className={`text-sm ${
                i + 1 === tests.length ? "border-none" : "border-b"
              } ${
                attemptedTests.includes(test.test_code) ? "bg-gray-200" : ""
              } px-4`}
            >
              <AccordionTrigger className="text-left max-sm:text-xs">
                <div>
                  {test.title?.includes(":") ? (
                    <>{test.title.split(":")[1]}</>
                  ) : (
                    <>{test.title}</>
                  )}
                  {type === "requested" && test.assigned_to && (
                    <AtSign className="h-3 w-3 ml-1 inline font-bold text-blue-500" />
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
                <p className="text-left">{test.description}</p>
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
          ))}
          {shortTotalPages > 1 && (
            <TestsPagination
              currentPage={shortCurrentPage}
              totalPages={shortTotalPages}
              onPageChange={setShortCurrentPage}
            />
          )}
        </>
      )}

      {paginatedStandardTests.length > 0 && (
        <>
          <Badge variant={"outline"} className="text-sm my-2 px-4">
            Standard
          </Badge>
          {paginatedStandardTests.map((test: any, i: number) => (
            <AccordionItem
              key={i}
              value={`item-standard-${i + 1}`}
              className={`text-sm ${
                i + 1 === tests.length ? "border-none" : "border-b"
              } ${
                attemptedTests.includes(test.test_code) ? "bg-gray-200" : ""
              } px-4`}
            >
              <AccordionTrigger className="text-left max-sm:text-xs">
                <div>
                  {test.title?.includes(":") ? (
                    <>{test.title.split(":")[1]}</>
                  ) : (
                    <>{test.title}</>
                  )}
                  {type === "requested" && test.assigned_to && (
                    <AtSign className="h-3 w-3 ml-1 inline font-bold text-blue-500" />
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
                <p className="text-left">{test.description}</p>
                <div className="flex justify-end mt-2">
                  <CopyToClipboard
                    textToCopy={test.test_code}
                    copyType="code"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
          {standardTotalPages > 1 && (
            <TestsPagination
              currentPage={standardCurrentPage}
              totalPages={standardTotalPages}
              onPageChange={setStandardCurrentPage}
            />
          )}
        </>
      )}
    </Accordion>
  );
};

export default LibraryTestsAccordian;
