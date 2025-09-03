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
  capitalizeText,
  getUserAccount,
  getUsersForClient,
  truncateString,
} from "@/lib/utils";
import { toast } from "sonner";
// import Select, { MultiValue } from "react-select";
import { ClientUserTeamType, ClientUserType } from "@/lib/types";
import { Radio, Select, Tooltip } from "antd";
import { Div } from "./ui/moving-border";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { useUser } from "@/context/UserContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface OptionType {
  value: string;
  label: string;
}

const CreateYourOwn = ({
  user,
  clientUsers,
  userId,
  userName,
}: {
  user: KindeUser | null;
  clientName: string;
  clientUsers: ClientUserTeamType[];
  userName: string;
  userId: string;
}) => {
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
  // const [userId, setUserId] = useState("");
  // const [userName, setUserName] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [loadingText, setLoadingText] = useState("Creating simulation.");
  // const [clientUser, setClientUsers] = useState<ClientUserTeamType[]>([]);
  const [assignedToUsers, setAssignedToUsers] = useState<string[]>([]);

  const [industry, setIndustry] = useState("");
  const [objective, setObjective] = useState("");
  const [department, setDepartment] = useState("");
  const [keyStakeholders, setKeyStakeholders] = useState("");
  const [skillDomain, setSkillDomain] = useState("");
  const [responder, setResponder] = useState("");
  const [targetedSkills, setTargetedSkills] = useState("");

  const [asker, setAsker] = useState("");
  const [skillType, setSkillType] = useState("general");
  const [testType, setTestType] = useState("simulation");


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

  // const getClientUsers = async (clientName: string) => {
  //   try {
  //     const response = await fetch(
  //       `${baseURL}/accounts/client_id_user_modification?all_client=true`,
  //       {
  //         method: "GET",
  //         headers: { Authorization: basicAuth },
  //       }
  //     );
  //     const data = await response.json();
  //     // setClientUsers(getUsersForClient(clientName, data));
  //   } catch (err) {
  //     toast.error("Error fetching client data.");
  //     console.error(err);
  //   } finally {
  //   }
  // };

  // useEffect(() => {
  //   if (user) {
  //     getUserAccount(user)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //         setUserId(data.uid);
  //         setUserName(data.name);
  //       });
  //     getClientUsers(clientName);
  //   }
  // }, []);

  const userContextRef = useRef<any>();

  const { getRequestedTestsFn } = useUser();

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

      const add_prompt_list = [
        "static_role_play",
        "normal_static",
        "interview_static",
        "checkin_static",
        "case_static",
      ];

      let scenarioType = add_prompt_list[numOfTries];

      

      if (skillType === "soft_skill" && testType === "simulation") {
        scenarioType = "static_soft";
      } else if (skillType === "hard_skill" && testType === "simulation") {
        scenarioType = "static_hard";
      } else if (skillType === "general" && testType === "simulation") {
        scenarioType = "normal_static";
      } else if (skillType === "soft_skill" && testType === "role_play") {
        scenarioType = "static_role_play_soft";
      } else if (skillType === "hard_skill" && testType === "role_play") {
        scenarioType = "static_role_play_hard";
      } else if (skillType === "general" && testType === "role_play") {
        scenarioType = "static_role_play";
      }
      console.log(
        "Scenario Type: ",
        scenarioType,
        "Skill Type: ",
        skillType,
        "Test Type: ",
        testType,
        "Simulation Type: ",
        simulationType,
        "Num of Tries: ",
        numOfTries
      )

      const params = {
        mode: "A",
        information: JSON.stringify({
          data: {
            information: `${userContextRef.current.value}\n
            Objective: ${objective}\n
            Industry: ${industry}\n
            Department: ${department}\n
            Asker: ${asker}\n
            Responder: ${responder}\n
            Skill Domain: ${skillDomain}\n
            Targeted Skills: ${targetedSkills}\n
            `,
          },
          title: "",
        }),
        creator_user_id: userId,
        flavour: scenarioType,
        is_micro: simulationType === "short",
        available_case_list: scenarioType,
        llm_order: 'gemini, anthropic, gpt'
      };

      console.log(add_prompt_list[numOfTries], scenarioType, numOfTries, "numoftries");


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
          body: JSON.stringify(params)
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Dynamically created Test result", data);
            setGeneratedTestData(data);
            setIsloading(false);
            getRequestedTestsFn();
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

        throw new Error("Error creating Scenario");
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
    setIndustry("");
    setDepartment("");
  };

  const [assignLoading, setAssignLoading] = useState(false);

  const assignSimulationHandler = async (testCodes: string) => {
    setAssignLoading(true);
    console.log(assignedToUsers.map((val) => val.split("/")[1]).join(","));
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
            .map((val) => val.split("/")[1])
            .join(","),
          assigned_by: userName,
        }),
      });
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        toast.success("Succesfully assigned the simulations.");
        getRequestedTestsFn();
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
    <div className="px-4 bg-white w-full py-2 border border-gray-200 rounded-2xl">
      <p className="text-sm text-left font-semibold max-sm:text-xs text-gray-600 my-2">
        Select your simulation type
      </p>
      <div className="flex flex-row items-center">
        <Radio.Group
          value={simulationType}
          options={[
            {
              label: "Short",
              value: "short",
              // style: {
              //   fontSize: "18px",
              // },
            },
            {
              label: "Standard",
              value: "standard",
              // style: {
              //   fontSize: "18px",
              // },
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
            fontSize: "14px",
          }}
          title="Short scenarios are three questions long, while standard scenarios are in six questions conversational format."
        >
          <Info className="h-5 w-5 p-[2px] hover:bg-gray-50 hover:cursor-pointer ml-2" />
        </Tooltip>
      </div>
      <p className="text-sm text-left font-semibold max-sm:text-xs text-gray-600 my-2">
        Select Test Type and Skill Type
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mt-3">
        {/* Test Type Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {testType === '' ? 'Select Test Type' : `Test - ${capitalizeText(testType.replace('_', ' '))}`}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 rounded-lg shadow-lg border border-gray-200">
            <DropdownMenuLabel>Test Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={testType} onValueChange={setTestType}>
              <DropdownMenuRadioItem value="simulation">Simulation</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="role_play">Role Play</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Skill Type Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {skillType === '' ? 'Select Skill Type' : `Skill - ${capitalizeText(skillType.replace('_', ' '))}`}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 rounded-lg shadow-lg border border-gray-200">
            <DropdownMenuLabel>Skill Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value={skillType} onValueChange={setSkillType}>
              <DropdownMenuRadioItem value="soft_skill">Soft Skill</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="hard_skill">Hard Skill</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="general">General</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-row max-sm:flex-col w-full gap-2 mt-2">
          <div className="w-full">
            <p className="text-sm text-left font-semibold max-sm:text-xs text-gray-600 mt-2">
              Objective
            </p>
            <input
              required
              type="text"
              placeholder="Define the primary goal"
              value={objective}
              onChange={(e) => {
                setObjective(e.target.value);
              }}
              className="p-2 mt-1 max-sm:p-2 max-sm:text-xs max-sm:my-1 bg-accent rounded-lg border border-gray-400 w-full text-sm text-gray-600"
            />
          </div>
          <div className="w-full">
            <p className="text-sm text-left font-semibold max-sm:text-xs text-gray-600 mt-2">
              Industry
            </p>
            <input
              required
              type="text"
              value={industry}
              placeholder="Specify the industry this plan pertains to"
              onChange={(e) => {
                setIndustry(e.target.value);
              }}
              className="p-2 mt-1 max-sm:p-2 max-sm:text-xs max-sm:my-1 bg-accent rounded-lg border border-gray-400 w-full text-sm text-gray-600"
            />
          </div>
        </div>
        <div className="flex flex-row max-sm:flex-col w-full gap-2">
          <div className="w-full">
            <p className="text-sm text-left font-semibold max-sm:text-xs text-gray-600 mt-2">
              Department
            </p>
            <input
              required
              type="text"
              value={department}
              placeholder="Identify the department (e.g., Marketing)"
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
              className="p-2 mt-1 max-sm:p-2 max-sm:text-xs max-sm:my-1 bg-accent rounded-lg border border-gray-400 w-full text-sm text-gray-600"
            />
          </div>
          <div className="w-full">
            <p className="text-sm text-left font-semibold max-sm:text-xs text-gray-600 mt-2">
              Skill Domain
            </p>
            <input
              required
              type="text"
              placeholder="Enter the skill domain (e.g., Communication)"
              value={skillDomain}
              onChange={(e) => {
                setSkillDomain(e.target.value);
              }}
              className="p-2 mt-1 max-sm:p-2 max-sm:text-xs max-sm:my-1 bg-accent rounded-lg border border-gray-400 w-full text-sm text-gray-600"
            />
          </div>
        </div>
        <div className="flex flex-row max-sm:flex-col w-full gap-2">
          <div className="w-full">
            <p className="text-sm text-left font-semibold max-sm:text-xs text-gray-600 mt-2">
              Asker
            </p>
            <input
              required
              type="text"
              value={asker}
              placeholder="Enter the name/position of the person asking the question"
              onChange={(e) => {
                setAsker(e.target.value);
              }}
              className="p-2 mt-1 max-sm:p-2 max-sm:text-xs max-sm:my-1 bg-accent rounded-lg border border-gray-400 w-full text-sm text-gray-600"
            />
          </div>
          <div className="w-full">
            <p className="text-sm text-left font-semibold max-sm:text-xs text-gray-600 mt-2">
              Responder
            </p>
            <input
              required
              type="text"
              placeholder="Enter the name/position of the person responding"
              value={responder}
              onChange={(e) => {
                setResponder(e.target.value);
              }}
              className="p-2 mt-1 max-sm:p-2 max-sm:text-xs max-sm:my-1 bg-accent rounded-lg border border-gray-400 w-full text-sm text-gray-600"
            />
          </div>
        </div>
        <div>
          <p className="text-sm text-left font-semibold max-sm:text-xs text-gray-600 ">
            Please enter the targeted skill
          </p>
          <input
              type="text"
              placeholder="Please enter comma separated skills (e.g., Communication, Leadership) at least 6 skills"
              value={targetedSkills}
              onChange={(e) => {
                setTargetedSkills(e.target.value);
              }}
              className="p-2 mt-1 max-sm:p-2 max-sm:text-xs max-sm:my-1 bg-accent rounded-lg border border-gray-400 w-full text-sm text-gray-600"
            />
        </div>
        <div>
          <p className="text-sm text-left font-semibold max-sm:text-xs text-gray-600 ">
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
              className={`text-red-500 text-xs self-start ${!inputError && "invisible"
                }`}
            >
              Please describe your situation in 20-500 words.
            </p>
            <p className="font-bold text-gray-500 text-xs">{wordCount}/500</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <Button
            disabled={isLoading}
            onClick={handleGenerateSenario}
            className="max-sm:p-2 h-8 bg-[#2DC092] hover:brightness-105 hover:bg-[#2DC092] text-sm max-sm:text-xs max-sm:w-full"
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
              className="max-sm:p-2 h-8 hover:brightness-105 text-sm  max-sm:text-xs max-sm:w-full"
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
              className="w-full max-sm:w-full text-sm max-sm:text-xs text-left text-slate-900 p-3 bg-gray-50 mt-2 rounded-md border border-gray-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <b className="my-1 text-gray-400">
                  {i === 0 ? "Simulation" : "Role play"}
                </b>
                <p className="text-lg max-sm:text-sm mt-3 font-semibold">
                  {test?.title}
                </p>
                <p className="text-sm max-sm:text-xs mt-2 mb-2">
                  {test?.description}
                </p>
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
          <p className="text-sm max-sm:text-xs my-2 text-left font-semibold">
            Assign the simulation
          </p>
          <div
            className={`w-full flex flex-row max-sm:flex-col items-center gap-2`}
          >
            <Select
              placeholder="Select the users"
              className="w-full"
              virtual={false}
              mode="multiple"
              style={{
                // padding: "8px",
                textAlign: "left",
              }}
              value={assignedToUsers}
              size="large"
              optionFilterProp="children"
              filterOption={(
                input: string,
                option?: { label: string; value: string }
              ) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={clientUsers
                .map((user) => ({
                  value: `${user.userName}/${user.userId}`,
                  label: `${user.userName} (${user.userEmail})`,
                  // (
                  //   <p>
                  //     {user.userName} (
                  //     <span className="text-blue-500">{user.userEmail}</span>)
                  //   </p>
                  // ),
                }))
                .filter((user) => !user.value.includes(userId))}
              onChange={(selectedOptions) => {
                console.log(selectedOptions);
                setAssignedToUsers(selectedOptions);
              }}
            />
            <Button
              className="text-sm max-sm:text-xs h-fit max-sm:w-full"
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
  );
};

export default CreateYourOwn;
