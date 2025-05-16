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
import { AtSign, Mic } from "lucide-react";
import { useEffect, useState } from "react";
import { Tooltip } from "antd";
import { Div } from "@/components/ui/moving-border";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/ui/card-hover-effect";
import { BulletList } from "@/components/MarkdownHandler";

interface LibraryTestsAccordianType {
  tests: any;
  attemptedTests: any;
  type?: any;
  tabInformation?: any;
}

const ITEMS_PER_PAGE = 10;

const LibraryTestsAccordian = ({
  tests,
  attemptedTests,
  type,
  tabInformation
}: LibraryTestsAccordianType) => {
  // State for pagination
  const [shortCurrentPage, setShortCurrentPage] = useState(1);
  const [standardCurrentPage, setStandardCurrentPage] = useState(1);
  console.log('tab', tabInformation)
  const getPaginatedData = (data: any[], currentPage: number) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return data.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  // const shortTests = tests.filter((test: any) => test.is_micro === true); // to show only one type of heading
  // const standardTests = tests.filter((test: any) => test.is_micro === false);

  const shortTests = tests.filter((test: any) => test); // to show only one type of heading
  const standardTests = tests.filter((test: any) => test.is_micro === 'fale'); // empty array

  console.log("shortTests", shortTests);
  console.log("standardTests", standardTests);
  const paginatedShortTests = getPaginatedData(shortTests, shortCurrentPage);
  const paginatedStandardTests = getPaginatedData(
    standardTests,
    standardCurrentPage
  );

  const shortTotalPages = Math.ceil(shortTests.length / ITEMS_PER_PAGE);
  const standardTotalPages = Math.ceil(standardTests.length / ITEMS_PER_PAGE);

  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  function snippetDiv(url: string) {
    let mediaURl;
    if (url.includes("pulse")) {
      return `
      <iframe
        allow="autoplay; encrypted-media; fullscreen;"
        style="width: 100%; border-radius: 8px; min-height: 70vh; min-width: ${window.innerWidth < 768 ? "100%" : "45vw"
        }; scrollbar-width: none;"
        src=${url}
        frameborder="0"
        allowfullscreen
        webkitallowfullscreen 
        mozallowfullscreen 
        allowtransparency
        scrolling="no"
      >
      `;
    } else if (url.includes("youtube")) {
      const videoId = url.split("v=")[1];
      url = `https://www.youtube.com/embed/${videoId}?autoplay=1`
      return `
      <iframe
        allow="autoplay; encrypted-media; fullscreen;"
        style="width: 100%; border-radius: 8px; min-height: 45vh; min-width: ${window.innerWidth < 768 ? "100%" : "45vw"
        }; scrollbar-width: none;"
        src=${url}
        frameborder="0"
        allowfullscreen
        webkitallowfullscreen 
        mozallowfullscreen 
        allowtransparency
        scrolling="no"
      >
      `;
    }
    else {
      if (url.includes("player.cloudinary.com") || url.includes('storage.googleapis.com')) {
        mediaURl = url;

      } else if (url.includes("vimeo")) {
        const videoId = url
          .split("/")
          .pop();
        mediaURl = `https://player.vimeo.com/video/${videoId}`;

      } else if (url.includes("twitter")) {
        mediaURl = `https://twitframe.com/show?url=${url}`;
      }

      if (mediaURl && mediaURl.length > 0) {
        return `<iframe
                src=${mediaURl}
                width="100%"
                height="400px"
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
                className="mb-2"
              />`
      } else {
        return `<a href="${url}" target="_blank">Click here to read the article.</a>`
      }

    }
  }

  return (
    <Div>
      <div
        key={0}
        className="relative group block p-2 h-full w-full bg-white rounded-2xl"
        onMouseEnter={() => setHoveredIndex(0)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <AnimatePresence>
          {hoveredIndex === 0 && (
            <motion.span
              className="absolute inset-0 h-full w-full bg-neutral-200  block rounded-2xl"
              layoutId="hoverBackground"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.15 },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.15, delay: 0.2 },
              }}
            />
          )}
        </AnimatePresence>
        <Card className="p-0 rounded-2xl border">
          <Accordion
            type="single"
            collapsible
            className="w-full text-gray-500 rounded-2xl bg-white overflow-clip"
          >
            {paginatedShortTests.length > 0 && (
              <>
                <Badge
                  variant={"outline"}
                  className="text-sm my-2 px-4 self-center"
                >
                  {tabInformation?.tab_difficulty || "Difficuly Level : Intermediate"}
                </Badge>
                {paginatedShortTests.map((test: any, i: number) => (
                  <AccordionItem
                    key={i}
                    value={`item-short-${i + 1}`}
                    className={`text-sm ${i + 1 === tests.length ? "border-none" : "border-b"
                      } ${attemptedTests.includes(test.test_code)
                        ? "bg-gray-200"
                        : ""
                      } px-4 text-slate-900`}
                  >
                    <AccordionTrigger className="text-left max-sm:text-xs">
                      <div>
                        {test.interaction_mode === "audio" && (
                          <Tooltip title="This scenario is audio Interaction">
                            <Mic className="h-5 w-5 mr-2 inline text-blue-500" />
                          </Tooltip>
                        )}
                        {/* {test.title?.includes(":") ? (
                          <> {test.title.split(":")[1]}</>
                        ) : (
                          <>{test.title}</>
                        )} */}
                        {test.domain ? (
                          <><strong>{test.domain}</strong>  -  {test.title}</>
                        ) : (
                          <>{test.title}</>
                        )}
                        {type === "requested" && test.assigned_to && (
                          <AtSign className="h-3 w-3 ml-1 inline font-bold text-blue-500" />
                        )}


                        {attemptedTests.includes(test.test_code) && (
                          <Badge
                            variant={"secondary"}
                            className="ml-2 rounded-sm bg-gray-200 text-xs text-gray-700 hover:bg-gray-300"
                          >
                            ✅
                          </Badge>
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
                    <AccordionContent className="max-sm:text-xs ">
                      {test.description_media && test.description_media.length > 0 && (
                        <Accordion type="single" collapsible>
                          <AccordionItem value="media">
                            <AccordionTrigger className="text-left max-sm:text-xs cursor-pointer">
                              ▶️ AI Coach Lesson or Additional Context (Expand to play)
                            </AccordionTrigger>
                            <AccordionContent className="max-sm:text-xs">
                              {test.scenario_case === "observation" ? (
                                <>
                                  {test.description_media
                                    .split(',')
                                    .map((url: string, i: number) => (
                                      <video
                                        key={i}
                                        src={url.trim()}
                                        controls
                                        onEnded={() => console.log("Playback ended")}
                                        poster="https://res.cloudinary.com/dtbl4jg02/image/upload/v1747293563/bupvdcx55wkqtrbwrwjc.jpg"
                                        className="rounded-lg w-full mb-2"
                                      />
                                    ))}
                                </>
                              ) : (
                                <video
                                  src={test.description_media}
                                  controls
                                  onEnded={() => console.log("Playback ended")}
                                  poster="https://res.cloudinary.com/dtbl4jg02/image/upload/v1747293563/bupvdcx55wkqtrbwrwjc.jpg"
                                  className="rounded-lg w-full"
                                />
                              )}
                            </AccordionContent>

                          </AccordionItem>
                        </Accordion>
                      )}
                      <p className="text-left">
                        {test.scenario_case === 'observation' ? (
                          <>
                            <b>Here are the key takeaways based on the roleplay:</b>
                            <br />
                            {BulletList(test.description)}
                          </>
                        ) : (
                          test.description
                        )}
                      </p>

                      {type === "assigned" && (
                        <p className="my-2 text-sm max-sm:text-xs text-left bg-gray-200 w-fit rounded-sm py-1 px-2">
                          Assigned by{" "}
                          <span className="font-bold text-blue-500">
                            {test.assigned_by}
                          </span>
                        </p>
                      )}
                      {test.scenario_case != 'observation' && (
                        <div className="flex justify-end mt-2">
                          <CopyToClipboard
                            textToCopy={test.test_code}
                            copyType="code"
                          />
                        </div>
                      )

                      }

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
                  Difficuly Level : Intermediate
                </Badge>
                {paginatedStandardTests.map((test: any, i: number) => (
                  <AccordionItem
                    key={i}
                    value={`item-standard-${i + 1}`}
                    className={`text-sm ${i + 1 === tests.length ? "border-none" : "border-b"
                      } ${attemptedTests.includes(test.test_code)
                        ? "bg-gray-200"
                        : ""
                      } px-4 text-slate-900`}
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
        </Card>
      </div>
    </Div>
  );
};

export default LibraryTestsAccordian;
