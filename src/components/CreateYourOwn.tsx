"use client";

import { Eraser, Loader } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import CopyToClipboard from "./CopyToClipboard";
import { useRef, useState } from "react";
import { baseURL, prodUrl, basicAuth } from "@/lib/utils";

const CreateYourOwn = () => {
  const [isLoading, setIsloading] = useState(false);
  const [generatedTestData, setGeneratedTestData] = useState<any>();
  const [userEnteredContext, setUserEnteredContext] = useState("");
  const [generationError, setGenerationError] = useState(false);
  const [inputError, setInputError] = useState(false);

  const userContextRef = useRef<any>();
  const handleGenerateSenario = () => {
    setUserEnteredContext(userContextRef.current.value);
    if (userContextRef.current.value.split(" ").length < 20) {
      console.log("to small");
      setInputError(true);
    } else {
      setIsloading(true);
      const url: any = new URL(
        `${prodUrl}/tests/get_or_create_test_scenarios_by_site/`
      );
      const params = new URLSearchParams();
      params.set("mode", "A");
      params.set(
        "information",
        JSON.stringify({
          data: { information: userContextRef.current.value },
          title: "",
        })
      );
      params.set("url", "");
      params.set("access_token", basicAuth);
      url.search = params;

      fetch(url, {
        method: "POST",
        headers: {
          Authorization: basicAuth,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Dynamically created Test result", data);
          console.log(data[0]);

          console.log(data);

          setGeneratedTestData(data[0]);
          setIsloading(false);
          if (!data[0].title) {
            setGenerationError(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const clearHanlder = () => {
    userContextRef.current.value = "";
    setGeneratedTestData(null);
    setGenerationError(false);
  };

  return (
    <div>
      <div className={`w-full flex justify-center`}>
        <Badge
          variant={"default"}
          className="bg-[#5a7eca] h-6 w-fit text-white text-lg py-3 hover:bg-[#5a7eca] z-50 text-center mb-8 mt-12 max-sm:mt-8 max-sm:text-sm"
        >
          ✨ Create your own
        </Badge>
      </div>
      <div>
        <div className="relative isolate mx-auto">
          <div>
            <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-[-1.5rem] max-sm:w-[100%] z-50">
              <div className="rounded-xl bg-white p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 max-sm:w-[100%]">
                <div>
                  <p className="text-[16px] font-semibold max-sm:text-xs text-gray-600 mt-2 ">
                    Please enter the situation that you want to practice.
                  </p>
                  <textarea
                    ref={userContextRef}
                    onKeyDown={() => {
                      setInputError(false);
                    }}
                    placeholder="Create a situation where the user needs to...... to accomplish...."
                    rows={5}
                    className="p-2 mt-1 max-sm:p-2 max-sm:text-xs max-sm:my-1 bg-accent rounded-lg border border-gray-400 w-full text-sm text-gray-600"
                  />
                  {inputError && (
                    <p className="text-red-500 text-sm max-sm:text-xs mb-1.5">
                      Please describe your situation in atleast 20 words.
                    </p>
                  )}
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={handleGenerateSenario}
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
                      <span className="text-sm max-sm:text-[11px] text-gray-500 ml-2 max-sm:ml-[1px] max-sm:leading-[12px]">
                        Please wait, we are generating your senario.
                      </span>
                    )}
                  </div>
                </div>

                {generatedTestData?.title && (
                  <>
                    <hr className="my-2 font-bold" />
                    <p className="text-[16px] font-semibold max-sm:text-xs text-gray-600 mt-2 ">
                      Below is your generated senario :
                    </p>
                    <div>
                      <div className="mt-3 max-sm:text-sm text-gray-500 animate-fade-down">
                        <p className="text-left max-sm:text-xs">
                          <b>{generatedTestData.title.split(":")[0]} </b>
                          {generatedTestData.title.split(":")[1]?.length > 0
                            ? `- ${generatedTestData.title.split(":")[1]}`
                            : ""}
                        </p>
                        <div className="max-sm:text-xs my-2">
                          <p>{generatedTestData.description}</p>
                          <div className="flex justify-end mt-2">
                            <CopyToClipboard
                              textToCopy={generatedTestData.test_code}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {generationError && !isLoading && (
                  <>
                    <hr className="my-2" />
                    <p className="text-sm text-center max-sm:text-[11px] ml-2 max-sm:ml-[1px] text-red-500 max-sm:leading-[12px]">
                      We are unable to generate the scenario at this time.
                      Please restate the context and try again.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateYourOwn;
