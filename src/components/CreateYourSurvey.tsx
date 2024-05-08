"use client";

import { Eraser, ExternalLink, Loader } from "lucide-react";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import CopyToClipboard from "./CopyToClipboard";
import Link from "next/link";

interface DeepDiveType {
  title: string;
  objective: string;
  link: string;
}

const CreateYourSurvey = ({ user }: any) => {
  const userContextRef = useRef<any>();
  const [generationError, setGenerationError] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const [isLoading, setIsloading] = useState(false);
  const [loadingText, setLoadingText] = useState("Generating your deep dive.");

  const [generatedDeepdiveData, setGeneratedDeepdiveData] = useState<
    DeepDiveType[]
  >([]);

  const handleGenerateSurvey = () => {
    setGeneratedDeepdiveData([
      {
        title: "blah blah",
        objective:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque culpa accusantium quae, minima cum vitae nulla sit soluta neque laudantium!",
        link: "survey-letsgo",
      },
    ]);
  };

  const clearHanlder = () => {
    userContextRef.current.value = "";
    setGeneratedDeepdiveData([]);
    setGenerationError(false);
    setInputError(false);
    setWordCount(0);
  };

  return (
    <div className="w-full">
      <div className="w-full max-sm:w-[100%] z-50 mt-4 text-left">
        <div className="rounded-xl bg-white p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 max-sm:w-[100%]">
          <div>
            <p className="text-[16px] text-left font-semibold max-sm:text-xs text-gray-600 mt-2 ">
              Please enter your Deep dive objective
            </p>
            <textarea
              ref={userContextRef}
              onKeyDown={() => {
                setInputError(false);
              }}
              onChange={(e) => {
                if (e.target.value.trim() === "") {
                  setWordCount(0);
                } else {
                  setWordCount(e.target.value.trim().split(" ").length);
                }
              }}
              placeholder="<placeholder>"
              rows={8}
              className="p-2 mt-1 max-sm:p-2 max-sm:text-xs max-sm:my-1 bg-accent rounded-lg border border-gray-400 w-full text-sm text-gray-600"
            />
            <div className="flex flex-row justify-between w-full">
              <p
                className={`text-red-500 text-xs mb-1.5 self-start ${
                  !inputError && "invisible"
                }`}
              >
                Please describe your Deep dive in 20-500 words.
              </p>
              <p className="font-bold text-gray-500 text-xs self-end">
                {wordCount}/500
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                disabled={isLoading && generatedDeepdiveData.length > 0}
                onClick={handleGenerateSurvey}
                className="max-sm:p-2 h-8 bg-[#2DC092] hover:brightness-105 hover:bg-[#2DC092]"
              >
                {isLoading ? "Generating" : "Generate"}
                {isLoading && (
                  <Loader className="h-4 w-4 inline ml-2 animate-spin" />
                )}
              </Button>{" "}
              {!isLoading && (
                <Button
                  onClick={clearHanlder}
                  variant={"secondary"}
                  className="max-sm:p-2 h-8 hover:brightness-105"
                >
                  <Eraser className="mr-2 w-4 h-4" /> Clear
                </Button>
              )}
              {isLoading && (
                <span className="text-xs max-sm:text-[11px] text-gray-500 ml-2 max-sm:ml-[1px] max-sm:leading-[12px]">
                  {loadingText}
                </span>
              )}
            </div>
          </div>
          {generatedDeepdiveData.length > 0 && (
            <>
              {
                <div className="flex flex-row gap-2 max-sm:flex-col">
                  {!generationError &&
                    generatedDeepdiveData.map((dd, i) => (
                      <>
                        <div className="w-full text-sm max-sm:text-xs text-left text-gray-600 p-3 bg-gray-50 mt-2 rounded-md border border-gray-200 shadow-sm flex flex-col justify-between">
                          <div>
                            <b className="my-1 text-gray-400">Deep dive</b>
                            <p className="text-sm mt-3 font-semibold">
                              {dd.title}
                            </p>
                            <p className="text-[12px] mb-2">{dd.objective}</p>
                          </div>
                          <div className="flex justify-end mt-3 gap-2">
                            <CopyToClipboard
                              textToCopy={dd.link}
                              copyType="Link"
                            />
                            <Button
                              variant={"link"}
                              className="max-sm:p-2 h-8 hover:brightness-105"
                              asChild
                            >
                              <Link href={dd.link} target="_blank">
                                <ExternalLink className="mr-2 w-4 h-4" /> Visit
                                Deep dive.
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </>
                    ))}
                </div>
              }
              {/* <span className="text-[12px] text-gray-500 mx-2 max-sm:hidden max-lg:hidden">
                    ●
                  </span>
                  */}
            </>
          )}
          {!isLoading && generationError && (
            <>
              <hr className="my-2" />
              <p className="text-sm my-6 text-center max-sm:text-[11px] ml-2 max-sm:ml-[1px] text-red-500 max-sm:leading-[12px]">
                Encountered an error while Generating your scenarios. It will be
                saved in "Simulation (Requested Scenario Tab)"
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateYourSurvey;
