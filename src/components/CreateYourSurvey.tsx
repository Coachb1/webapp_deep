"use client";

import { Eraser, Loader } from "lucide-react";
import { Button } from "./ui/button";
import { useRef, useState } from "react";

const CreateYourSurvey = ({user} : any) => {
  const userContextRef = useRef<any>();
  const [generationError, setGenerationError] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const [isLoading, setIsloading] = useState(false)
  const [loadingText, setLoadingText] = useState("Creating your survey.");

  const [generatedSurveyLink, setGeneratedSurveyLink] = useState("")

  const handleGenerateSurvey = () => {
    setGeneratedSurveyLink("hello mate")
  }

  const clearHanlder = () => {
    userContextRef.current.value = "";
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
              Please enter the situation that you want to practice
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
              placeholder="Create a situation where the user needs to... to accomplish..."
              rows={8}
              className="p-2 mt-1 max-sm:p-2 max-sm:text-xs max-sm:my-1 bg-accent rounded-lg border border-gray-400 w-full text-sm text-gray-600"
            />
            <div className="flex flex-row justify-between w-full">
              {/* {inputError && ( */}
              <p
                className={`text-red-500 text-xs mb-1.5 self-start ${
                  !inputError && "invisible"
                }`}
              >
                Please describe your situation in 20-500 words.
              </p>
              {/* )} */}
              <p className="font-bold text-gray-500 text-xs">{wordCount}/500</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                disabled={isLoading}
                onClick={handleGenerateSurvey}
                className="max-sm:p-2 h-8 bg-[#2DC092] hover:brightness-105 hover:bg-[#2DC092]"
              >
                {isLoading ? "Generating" : "Generate"}
                {isLoading && (
                  <Loader className="h-4 w-4 inline ml-2 animate-spin" />
                )}
              </Button>{" "}
              {!isLoading && generatedSurveyLink.length === 0 && (
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

          {/* {!isLoading && (
            <>
              <hr className="my-2" />
              <p className="text-sm my-6 text-center max-sm:text-[11px] ml-2 max-sm:ml-[1px] text-red-500 max-sm:leading-[12px]">
                Encountered an error while Generating your scenarios. It will be
                saved in "Simulation (Requested Scenario Tab)"
              </p>
            </>
          )} */}
        </div>
      </div>
    </div>
  );
};


export default CreateYourSurvey