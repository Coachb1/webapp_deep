"use client";

import {
  AtSign,
  ChevronLeft,
  ChevronRight,
  Eraser,
  Info,
  Loader,
} from "lucide-react";
import { Button } from "./ui/button";
import CopyToClipboard from "./CopyToClipboard";
import { useEffect, useRef, useState } from "react";
import {
  baseURL,
  basicAuth,
  getUserAccount,
  getUsersForClient,
} from "@/lib/utils";
import { toast } from "sonner";
import Select, { MultiValue } from "react-select";
import { ClientUserType } from "@/lib/types";
import { Radio, Tooltip } from "antd";

interface OptionType {
  value: string;
  label: string;
}

const CreateYourOwn = ({ user, clientName }: any) => {
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
  const [userName, setUserName] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [loadingText, setLoadingText] = useState("Creating simulation.");
  const [clientUser, setClientUsers] = useState<ClientUserType[]>([]);
  const [assignedToUsers, setAssignedToUsers] = useState<
    { label: string; value: string }[]
  >([]);

  const [assignInit, setAssignInit] = useState(false);
  const [simulationType, setSimulationType] = useState("short");
  const [numOfTries, setNumOfTries] = useState<number>(0);


  const incrementTries = () => {
    if (numOfTries < 5) {
      setNumOfTries((prevTries) => prevTries + 1);
    } else {
      setNumOfTries(0);
    }
    console.log("increased num of tries to- ", numOfTries);
  };

  const getClientUsers = async (clientName: string) => {
    try {
      const response = await fetch(
        `${baseURL}/accounts/client_id_user_modification?all_client=true`,
        {
          method: "GET",
          headers: { Authorization: basicAuth },
        }
      );
      const data = await response.json();
      setClientUsers(getUsersForClient(clientName, data));
    } catch (err) {
      toast.error("Error fetching client data.");
      console.error(err);
    } finally {
    }
  };

  useEffect(() => {
    if (user) {
      getUserAccount(user)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUserId(data.uid);
          setUserName(data.name);
        });
      getClientUsers(clientName);
    }
  }, []);

  const userContextRef = useRef<any>();

  const handleGenerateSenario = () => {
    setGeneratedTestData([]);
    setGenerationError(false);
    setInputError(false);
    setUserEnteredContext(userContextRef.current.value);
    if (wordCount < 20 || wordCount > 500) {
      console.log("too small or too large");
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
      params.set("access_token", basicAuth);
      params.set("creator_user_id", userId);
      const add_prompt_list = [
        'role_play',
        'normal',
        'interview',
        'checkin',
        'case'
      ]
      console.log(add_prompt_list[numOfTries],numOfTries,'numoftries')
      params.set("flavour", add_prompt_list[numOfTries])
      params.set("is_micro", `${simulationType === "short" ? true : false}`);

      url.search = params;

      let awaitedData: NodeJS.Timeout | undefined;
      let retryTimeout: NodeJS.Timeout | undefined;

      setTimeout(() => {
        retryTimeout = setTimeout(() => {
          setLoadingText("Retrying again due to server overload.");
        }, 60000);
      }, 200);

      setTimeout(() => {
        awaitedData = setTimeout(() => {
          setGenerationError(true);
          toast.error(
            "Due to server loads, the scenario cannot be generated at this time. Please retry again after some time."
          );
          setIsloading(false);
          setLoadingText("Retrying again due to server overload.");
        }, 180000);
      }, 200);

      try {
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
            setLoadingText("Creating simulation.");
            incrementTries();
            if (data[0].message || data[0].error) {
              toast.error("Error generating the scenarios.");
              setGenerationError(true);
              setNumOfTries(0);
            }
            if (awaitedData) clearTimeout(awaitedData);
            if (retryTimeout) clearTimeout(retryTimeout);
          })
          .catch((err) => {
            if (awaitedData) clearTimeout(awaitedData);
            if (retryTimeout) clearTimeout(retryTimeout);
            console.error(err);
            setIsloading(false);
            setLoadingText("Creating simulation.");
            toast.error(
              `Your request is under process and will be available under the "Requested Scenarios" tab. You will be notified via email.`
            );
          });
      } catch (error) {
        if (awaitedData) clearTimeout(awaitedData);
        if (retryTimeout) clearTimeout(retryTimeout);
        console.error(error);
      }
    }
  };

  const clearHanlder = () => {
    userContextRef.current.value = "";
    setGeneratedTestData([]);
    setGenerationError(false);
    setInputError(false);
    setWordCount(0);
    setAssignedToUsers([]);
  };

  const [assignLoading, setAssignLoading] = useState(false);

  const assignSimulationHandler = async (testCodes: string) => {
    setAssignLoading(true);
    try {
      const response = await fetch(`${baseURL}/tests/assign_simulation/`, {
        method: "POST",
        headers: {
          Authorization: basicAuth,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          test_codes: testCodes,
          assigned_to: assignedToUsers
            .map((user) => user.value.split("/")[1])
            .join(","),
          assigned_by: userName,
        }),
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        toast.success("Succesfully assigned the simulations.");
        setAssignedToUsers([]);
      } else {
        toast.error("Error assigning simulation");
      }
    } catch (error) {
      toast.error("Error assigning simulation");
    } finally {
      setAssignLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full max-sm:w-[100%] z-50 mt-4 text-left">
        <div className="rounded-xl bg-white p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 max-sm:w-[100%]">
          <div>
            <p className="text-[16px] text-left font-semibold max-sm:text-xs text-gray-600 my-2">
              Select your simulation type
            </p>
            <div className="flex flex-row items-center">
              <Radio.Group
                value={simulationType}
                options={[
                  {
                    label: "Short",
                    value: "short",
                  },
                  {
                    label: "Standard",
                    value: "standard",
                  },
                ]}
                onChange={(e) => {
                  console.log(e.target.value);
                  setSimulationType(e.target.value);
                }}
                optionType="button"
              />
              <Tooltip
                overlayInnerStyle={{
                  backgroundColor: "white",
                  color: "black",
                  padding: "8px",
                }}
                title="Short scenarios are three questions long, while standard scenarios are in six questions conversational format."
              >
                <Info className="h-5 w-5 p-[2px] hover:bg-gray-50 hover:cursor-pointer ml-2" />
              </Tooltip>
            </div>
            <p className="text-[16px] text-left font-semibold max-sm:text-xs text-gray-600 mt-2">
              Please enter the situation that you want to practice
            </p>
            <textarea
              ref={userContextRef}
              onKeyDown={() => {
                setInputError(false);
              }}
              onChange={(e) => {
                const inputValue = e.target.value;
                const words = inputValue.trim().split(/\s+/);
                const count = words.length;

                if (count <= 500) {
                  setWordCount(count);
                  setInputError(count < 20 || count > 500);
                } else {
                  setInputError(true);
                }
              }}
              placeholder="Provide a brief scenario involving a complex decision-making situation in a business or professional setting. For Eg: A marketing team must decide on the best strategy to increase brand awareness while working with a limited budget and tight deadlines."
              rows={8}
              className="p-2 mt-1 max-sm:p-2 max-sm:text-xs max-sm:my-1 bg-accent rounded-lg border border-gray-400 w-full text-sm text-gray-600"
            />
            <div className="flex flex-row justify-between w-full">
              <p
                className={`text-red-500 text-xs mb-1.5 self-start ${
                  !inputError && "invisible"
                }`}
              >
                Please describe your situation in 20-500 words.
              </p>
              <p className="font-bold text-gray-500 text-xs">{wordCount}/500</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                disabled={isLoading}
                onClick={handleGenerateSenario}
                className="max-sm:p-2 h-8 bg-[#2DC092] hover:brightness-105 hover:bg-[#2DC092]"
              >
                {generatedTestData.length > 0
                  ? isLoading
                    ? "Regenerating"
                    : "Regenerate"
                  : isLoading
                  ? "Generating"
                  : "Generate"}
                {isLoading && (
                  <Loader className="h-4 w-4 inline ml-2 animate-spin" />
                )}
              </Button>
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
                <div
                  key={i}
                  className="w-full max-sm:w-full text-sm max-sm:text-xs text-left text-gray-600 p-3 bg-gray-50 mt-2 rounded-md border border-gray-200 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <b className="my-1 text-gray-400">
                      {i === 0 ? "Simulation" : "Role play"}
                    </b>
                    <p className="text-sm mt-3 font-semibold">{test?.title}</p>
                    <p className="text-[12px] mb-2">{test?.description}</p>
                  </div>
                  <div className="flex justify-end mt-2">
                    <CopyToClipboard
                      textToCopy={test?.test_code!}
                      copyType="code"
                    />
                  </div>
                </div>
              ))}
          </div>
          {!generationError && generatedTestData.length > 0 && (
            <div className="mb-4 flex flex-col max-sm:flex-col max-sm:items-start mt-2 border border-gray-200 p-2 rounded-md bg-gray-50 shadow-sm">
              <p className="text-sm my-2">Assign the simulation</p>
              <div className={`flex flex-row items-center gap-2`}>
                <Select
                  placeholder="Select the users"
                  onChange={(selectedOptions: MultiValue<OptionType>) => {
                    console.log(selectedOptions as OptionType[]);
                    setAssignedToUsers(selectedOptions as OptionType[]);
                  }}
                  options={clientUser
                    .map((user) => ({
                      value: `${user.userName}/${user.userId}`,
                      label: user.userName,
                    }))
                    .filter((user) => !user.value.includes(userId))}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderRadius: "8px",
                    }),
                    multiValueLabel: (styles, { data }) => ({
                      ...styles,
                      fontWeight: "bold",
                      color: "#4b5563",
                      borderRadius: "4px",
                    }),
                  }}
                  isMulti
                  value={assignedToUsers}
                  className="w-full text-sm"
                />
                <Button
                  className="text-sm h-fit"
                  onClick={() => {
                    const testcodes = generatedTestData
                      .map((test) => test.test_code)
                      .join(",");
                    assignSimulationHandler(testcodes);
                  }}
                  disabled={assignLoading || assignedToUsers.length === 0}
                >
                  {assignLoading ? (
                    <>
                      Assigning{" "}
                      <Loader className="h-4 w-4 inline ml-2 animate-spin" />
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </div>
          )}
          {generationError && !isLoading && (
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

export default CreateYourOwn;
