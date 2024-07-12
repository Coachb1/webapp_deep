"use client";

import { CalendarIcon, Eraser, ExternalLink, Loader } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import CopyToClipboard from "./CopyToClipboard";
import Link from "next/link";
import { baseURL, basicAuth, getUserAccount, subdomain } from "@/lib/utils";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

interface DeepDiveType {
  title: string;
  objective: string;
  link: string;
  access_code: string;
}

function getLink() {
  if (subdomain === "playground") {
    return "https://playground.coachbots.com/";
  } else if (subdomain === "platform") {
    return "https://platform.coachbots.com/";
  } else {
    return "http://localhost:3000/";
  }
}

const CreateYourDeepDive = ({ user }: any) => {
  const userContextRef = useRef<any>();
  const [generationError, setGenerationError] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [userId, setUserId] = useState("");
  const [expiryDate, setExpiryDate] = useState<Date | undefined>();

  const [isLoading, setIsloading] = useState(false);
  const [loadingText, setLoadingText] = useState("Generating your deep dive.");
  const [numOfTries, setNumOfTries] = useState<number>(0);
  const [generatedDeepdiveData, setGeneratedDeepdiveData] = useState<
    DeepDiveType[]
  >([]);

  const [industry, setIndustry] = useState("");
  const [department, setDepartment] = useState("");
  const [respondentHierarchy, setRespondentHierarchy] = useState("");
  const [respondedentSkillSet, setRespondentSkillSet] = useState("");

  useEffect(() => {
    if (user) {
      getUserAccount(user)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUserId(data.uid);
        });
    }
  }, [user]);

  const incrementTries = () => {
    if (numOfTries < 5) {
      setNumOfTries((prevTries) => prevTries + 1);
    } else {
      setNumOfTries(0);
    }
    console.log("increased num of tries to- ", numOfTries);
  };

  const handleGenerateSurvey = () => {
    setGenerationError(false);
    setInputError(false);
    setDateError(false);
    if (wordCount < 5 || wordCount > 500) {
      console.log("too small or too large");
      setInputError(true);
    } else if (
      expiryDate === undefined ||
      expiryDate === undefined ||
      expiryDate === null
    ) {
      setDateError(true);
    } else {
      setIsloading(true);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", basicAuth);
      var formdata = new FormData();
      formdata.append(
        "p",
        `${user.given_name} ${user.family_name ? user.family_name : ""}`
      );
      formdata.append(
        "bot_name",
        `${user.given_name} ${user.family_name ? user.family_name : ""}`
      );
      formdata.append("user_id", userId);
      formdata.append("participant_id", userId);
      formdata.append("email", user.email!);
      formdata.append("bot_type", "deep_dive");
      formdata.append(
        "context",
        `${userContextRef.current.value} \nIndustry : ${industry}\nDepartment : ${department}\nRespondent Heirarcy : ${respondentHierarchy}\nRespondent Skillset : ${respondedentSkillSet}`
      );
      formdata.append(
        "profile_image",
        "https://res.cloudinary.com/dtbl4jg02/image/upload/v1709553181/WhatsApp_Image_2024-03-04_at_5.12.07_PM_gorlzg.jpg"
      );
      let date = new Date();
      date?.setTime(expiryDate?.getTime()! + 24 * 60 * 60 * 1000);
      console.log(date.toISOString());
      formdata.append("expiry_date", date.toISOString());

      formdata.append(
        "attributes",
        JSON.stringify({
          heading: `welcome to ${user.given_name}'s user bot`,
        })
      );

      formdata.append(
        "bot_base_url",
        `${
          subdomain === "playground"
            ? "https://playground.coachbots.com/"
            : "https://platform.coachbots.com/"
        }`
      );
      const add_prompt_list = [
        "crusader",
        "cheerleader",
        "change_manager",
        "calculator",
        "conversationalist",
        "co_creator",
      ];
      console.log(numOfTries, "numOfTries");
      formdata.append(
        "additional_prompt_for_deep",
        add_prompt_list[numOfTries]
      );

      console.log(JSON.stringify(formdata));

      fetch(`${baseURL}/accounts/create-bot-by-details/`, {
        method: "POST",
        headers: myHeaders,
        body: formdata,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          if (!data.msg) {
            const generatedData: DeepDiveType = {
              objective: data.deep_dive_data.bot_objective,
              title: data.deep_dive_data.bot_title,
              link: `${getLink()}deep-dive/${data.bot_id}`,
              access_code: data.deep_dive_data.access_code,
            };

            setGeneratedDeepdiveData([generatedData]);
            incrementTries();
            toast.success("Successfully created your deep dive.");
          } else {
            setGenerationError(true);
            setNumOfTries(0);
            toast.error("Error creating your deep dive.");
          }
          setIsloading(false);
        })
        .catch((err) => {
          setGenerationError(true);
          console.log(err);
          toast.error("Error creating your deep dive.");
          setIsloading(false);
        });
    }
  };

  const clearHandler = () => {
    userContextRef.current.value = "";
    setGeneratedDeepdiveData([]);
    setGenerationError(false);
    setInputError(false);
    setWordCount(0);
    setExpiryDate(undefined);
    setDepartment("");
    setIndustry("");
    setRespondentHierarchy("");
    setRespondentSkillSet("");
  };

  const getTodayDate = () => {
    const today = new Date();
    return today;
  };

  const [datePoppoverOpen, setDatePopoverOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="px-4 py-2">
        <div className="flex flex-col gap-2">
          <div>
            <p className="text-sm text-left font-semibold max-sm:text-xs text-gray-600 mt-2">
              Please enter your deep dive objective
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
                  setInputError(count < 5 || count > 500);
                } else {
                  setInputError(true);
                }
              }}
              placeholder="Dive into team dynamics. For eg, As a Team Leader in the Construction company, I want to know views about work from office policy from my employees. "
              rows={8}
              className="p-2 mt-1 max-sm:p-2 max-sm:text-xs max-sm:my-1 bg-accent rounded-lg border border-gray-400 w-full text-sm text-gray-600"
            />
            <div className="flex flex-row justify-between w-full">
              <p
                className={`text-red-500 text-xs self-start ${
                  !inputError && "invisible"
                }`}
              >
                Please describe your deep dive in 5-500 words.
              </p>
              <p className="font-bold text-gray-500 text-xs self-end">
                {wordCount}/500
              </p>
            </div>
          </div>
          <div className="flex flex-row  max-sm:flex-col w-full gap-2">
            <div className="w-full">
              <p className="text-sm text-left font-semibold max-sm:text-xs text-gray-600 mt-2">
                Industry
              </p>
              <input
                type="text"
                value={industry}
                placeholder="Specify the industry e.g., Construction"
                onChange={(e) => {
                  setIndustry(e.target.value);
                }}
                className="p-2 mt-1 max-sm:p-2 max-sm:text-xs max-sm:my-1 bg-accent rounded-lg border border-gray-400 w-full text-sm text-gray-600"
              />
            </div>
            <div className="w-full">
              <p className="text-sm text-left font-semibold max-sm:text-xs text-gray-600 mt-2">
                Department
              </p>
              <input
                type="text"
                value={department}
                placeholder="Identify the department e.g., Project Management"
                onChange={(e) => {
                  setDepartment(e.target.value);
                }}
                className="p-2 mt-1 max-sm:p-2 max-sm:text-xs max-sm:my-1 bg-accent rounded-lg border border-gray-400 w-full text-sm text-gray-600"
              />
            </div>
          </div>
          <div className="flex flex-row max-sm:flex-col w-full gap-2">
            <div className="w-full">
              <p className="text-sm text-left font-semibold max-sm:text-xs text-gray-600 mt-2">
                Respondent Heirarcy
              </p>
              <input
                type="text"
                placeholder="e.g.,Middle Management, Entry-Level"
                value={respondentHierarchy}
                onChange={(e) => {
                  setRespondentHierarchy(e.target.value);
                }}
                className="p-2 mt-1 max-sm:p-2 max-sm:text-xs max-sm:my-1 bg-accent rounded-lg border border-gray-400 w-full text-sm text-gray-600"
              />
            </div>
            <div className="w-full">
              <p className="text-sm text-left font-semibold max-sm:text-xs text-gray-600 mt-2">
                Respondent skillset
              </p>
              <input
                type="text"
                placeholder="e.g., Budget Management"
                value={respondedentSkillSet}
                onChange={(e) => {
                  setRespondentSkillSet(e.target.value);
                }}
                className="p-2 mt-1 max-sm:p-2 max-sm:text-xs max-sm:my-1 bg-accent rounded-lg border border-gray-400 w-full text-sm text-gray-600"
              />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex flex-row gap-2 items-center w-full text-gray-800">
              <p className="text-sm min-w-fit text-left font-semibold max-sm:text-xs text-gray-600">
                Expiry Date
              </p>
              <Popover
                open={datePoppoverOpen}
                onOpenChange={(open) => {
                  setDatePopoverOpen(open);
                }}
              >
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !expiryDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {expiryDate ? (
                      format(expiryDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  side="right"
                  className="w-auto p-0"
                  align="start"
                >
                  <Calendar
                    fromDate={getTodayDate()}
                    mode="single"
                    selected={expiryDate}
                    onSelect={(val) => {
                      setExpiryDate(val);
                      if (val !== undefined) {
                        setDatePopoverOpen(false);
                      }
                      console.log(val);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            {dateError && (
              <>
                <br />
                <div className="flex flex-row justify-between w-full">
                  <p
                    className={`text-red-500 text-xs mb-1.5 self-start ${
                      !dateError && "invisible"
                    }`}
                  >
                    Please select the date.
                  </p>
                </div>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 mt-2 ">
            <Button
              disabled={isLoading}
              onClick={handleGenerateSurvey}
              className="max-sm:p-2 h-8 bg-[#2DC092] hover:brightness-105 hover:bg-[#2DC092]"
            >
              {generatedDeepdiveData.length > 0
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
                onClick={clearHandler}
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
      </div>
      {generatedDeepdiveData.length > 0 && (
        <>
          <div className="flex flex-row gap-2 max-sm:flex-col m-2">
            {generatedDeepdiveData.map((dd, i) => (
              <div
                key={i}
                className="w-full text-sm max-sm:text-xs text-left text-gray-600 p-3 bg-gray-50 mt-2 rounded-md border border-gray-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <b className="my-1 text-gray-400">Deep Dive</b>
                  <p className="text-sm max-sm:text-xs mt-3 font-semibold">
                    {dd.title}
                  </p>
                  <p className="text-sm my-2 ">{dd.objective}</p>
                </div>
                <div className="flex flex-row max-sm:flex-col text-sm max-sm:text-xs justify-end max-sm:justify-center mt-6 gap-2">
                  <CopyToClipboard
                    textToCopy={dd.access_code}
                    copyType="Access Code"
                    className="text-sm max-sm:text-xs"
                  />
                  <CopyToClipboard
                    className="text-sm max-sm:text-xs"
                    textToCopy={dd.link}
                    copyType="Link"
                  />
                  <Button
                    variant={"link"}
                    className="max-sm:p-2 h-8 hover:brightness-105 text-sm max-sm:text-xs"
                    asChild
                  >
                    <Link
                      href={`/${dd.link.replace(getLink(), "")}`}
                      target="_blank"
                    >
                      <ExternalLink className="mr-2 w-4 h-4" /> Visit Deep Dive
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CreateYourDeepDive;
