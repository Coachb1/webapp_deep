"use client";

import { Eraser, Loader } from "lucide-react";
import { Button } from "./ui/button";
import CopyToClipboard from "./CopyToClipboard";
import { Ref, useEffect, useRef, useState } from "react";
import { baseURL, basicAuth, getUserAccount } from "@/lib/utils";
import { toast } from "sonner";

const CreateYourOwn = ({ user, generatedHandler }: any) => {
  const [isLoading, setIsloading] = useState(false);
  const [generatedTestData, setGeneratedTestData] = useState<
    {
      test_code: string;
      title: string;
      description: string;
    }[]
  >([]);
  const [userEnteredContext, setUserEnteredContext] = useState("");
  const [generationError, setGenerationError] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [userId, setUserId] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [loadingText, setLoadingText] = useState("Creating simulation.")
  useEffect(() => {
    if (user) {
      getUserAccount(user)
        .then((res) => res.json())
        .then((data) => {
          setUserId(data.uid);
        });
    }
  }, []);
  const userContextRef = useRef<any>();
  const handleGenerateSenario = () => {
    setGeneratedTestData([]);
    setUserEnteredContext(userContextRef.current.value);
    if (wordCount < 20 || wordCount > 500) {
      console.log("to small");
      setInputError(true);
    } else {
      setIsloading(true);
      const url: any = new URL(
        `${baseURL}/tests/get_or_create_test_scenarios_by_site/`
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
      params.set("creator_user_id", userId);
      url.search = params;

      let awaitedData: NodeJS.Timeout;
      let retryTimeout : NodeJS.Timeout;

      setTimeout(() => {
        retryTimeout =  setTimeout(() => {
          setLoadingText("Retrying again due to server overload.")
        }, 60000)
      }, 200)


      setTimeout(() => {
        console.log(generatedTestData.length);
        awaitedData = setTimeout(() => {
          console.log(generatedTestData.length);
          // if (generatedTestData.length === 0) {
            setGenerationError(true);
            toast.error(
              "Due to server loads, the scenario can not be generated at this time. Please retry again after sometime."
            );
            setIsloading(false);
          // }
        }, 180000);
      }, 200);

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
          setGeneratedTestData(data);
          setIsloading(false);
          setLoadingText("Creating simulation.")
          console.log(data.length)
          // if (data.length === 0) {
          //   setGenerationError(true);
          // }
          clearTimeout(awaitedData);
          clearTimeout(retryTimeout)
        })
        .catch((err) => {
          clearTimeout(awaitedData);
          clearTimeout(retryTimeout)
          console.error(err);
          setIsloading(false);
          setLoadingText("Creating simulation.")
          toast.error(
            `Your request is under process and will be available under the "Requested Scenarios" tab. You will be notified via a email.`
          );
        });
    }
  };

  const clearHanlder = () => {
    userContextRef.current.value = "";
    setGeneratedTestData([]);
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
              Please enter the situation that you want to practice.
            </p>
            <textarea
              ref={userContextRef}
              onKeyDown={() => {
                setInputError(false);
              }}
              onChange={(e) => {
                console.log(e.target.value.trim().split(" ").length);
                if (e.target.value.trim() === "") {
                  setWordCount(0);
                } else {
                  setWordCount(e.target.value.trim().split(" ").length);
                }
              }}
              placeholder="Create a situation where the user needs to...... to accomplish...."
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
                <span className="text-xs max-sm:text-[11px] text-gray-500 ml-2 max-sm:ml-[1px] max-sm:leading-[12px]">
                  {loadingText}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-row gap-2 max-sm:flex-col">
            {!generationError &&
              generatedTestData.map((test, i) => (
                <>
                  <div className="w-[50%] max-sm:w-full text-sm max-sm:text-xs text-left text-gray-600 p-3 bg-gray-50 mt-2 rounded-md border border-gray-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <b className="my-1 text-gray-400">
                        {i === 0 ? "Simulation" : "Role play"}
                      </b>
                      <p className="text-sm mt-3 font-semibold">
                        {test?.title}
                      </p>
                      <p className="text-[12px] mb-2">{test?.description}</p>
                    </div>
                    <div className="flex justify-end mt-2">
                      <CopyToClipboard
                        textToCopy={test?.test_code!}
                        copyType="code"
                      />
                    </div>
                  </div>
                </>
              ))}
          </div>
          {generationError && !isLoading && (
            <>
              <hr className="my-2" />
              <p className="text-sm my-6 text-center max-sm:text-[11px] ml-2 max-sm:ml-[1px] text-red-500 max-sm:leading-[12px]">
                Encountered and error while Generating your scenarios. It will
                be saved in "Simulation (Requested Scenario Tab)"
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateYourOwn;
