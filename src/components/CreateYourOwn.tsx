"use client";

import { Loader } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import CopyToClipboard from "./CopyToClipboard";
import { useRef, useState } from "react";

const CreateYourOwn = () => {
  const [isLoading, setIsloading] = useState(false);
  const [generatedTestData, setGeneratedTestData] = useState<any>();
  const [userEnteredContext, setUserEnteredContext] = useState("");

  const userContextRef = useRef<any>();
  const handleGenerateSenario = () => {
    setUserEnteredContext(userContextRef.current.value);
    setIsloading(true);
    const url: any = new URL(
      `https://coach-api-ovh.coachbots.com/api/v1/tests/get_or_create_test_scenarios_by_site/`
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
    params.set(
      "access_token",
      `Basic Yzc3MjFmZGItYTllMC00YTYxLWEzMTYtNDRhODA1N2VkMjY0OjhjNWNlZWZlLTY2Y2QtNDliZi04MTY5LTBhNjMwMmU5NmZlMA==`
    );
    url.search = params;

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic Yzc3MjFmZGItYTllMC00YTYxLWEzMTYtNDRhODA1N2VkMjY0OjhjNWNlZWZlLTY2Y2QtNDliZi04MTY5LTBhNjMwMmU5NmZlMA==`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Dynamically created Test result", data);
        console.log(data[0]);

        setGeneratedTestData(data[0]);
        setIsloading(false);

        userContextRef.current.value = "";
      })
      .catch((err) => console.log(err));
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
                    placeholder="Create a situation where the user needs to...... to accomplish...."
                    rows={3}
                    className="p-2 my-2 max-sm:p-2 max-sm:my-1 bg-accent rounded-lg border border-gray-400 w-full text-sm text-gray-600"
                  />
                  <Button
                    onClick={handleGenerateSenario}
                    className="max-sm:p-2 h-8 bg-[#2DC092] hover:brightness-105 hover:bg-[#2DC092]"
                  >
                    {isLoading ? "Generating" : "Generate"}
                    {isLoading && (
                      <Loader className="h-4 w-4 inline ml-2 animate-spin" />
                    )}
                  </Button>{" "}
                  {isLoading && (
                    <span className="text-sm max-sm:text-[11px] text-gray-500 ml-2 max-sm:ml-[1px]">
                      Please wait, we are generating your senario.
                    </span>
                  )}
                </div>

                {generatedTestData && (
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateYourOwn;
