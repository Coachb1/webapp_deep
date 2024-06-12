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

  const [generatedDeepdiveData, setGeneratedDeepdiveData] = useState<
    DeepDiveType[]
  >([]);

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
        "name",
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
      formdata.append("context", userContextRef.current.value);
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
            toast.success("Successfully created your deep dive.");
          } else {
            setGenerationError(true);
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
  };

  const getTodayDate = () => {
    const today = new Date();
    return today;
  };

  return (
    <div className="w-full">
      <div className="w-full max-sm:w-[100%] z-50 mt-4 text-left">
        <div className="rounded-xl bg-white p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 max-sm:w-[100%]">
          <div>
            <p className="text-[16px] text-left font-semibold max-sm:text-xs text-gray-600 mt-2">
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
              placeholder="Discover insights on team conflicts and resolution strategies here"
              rows={8}
              className="p-2 mt-1 max-sm:p-2 max-sm:text-xs max-sm:my-1 bg-accent rounded-lg border border-gray-400 w-full text-sm text-gray-600"
            />
            <div className="flex flex-row justify-between w-full">
              <p
                className={`text-red-500 text-xs mb-1.5 self-start ${
                  !inputError && "invisible"
                }`}
              >
                Please describe your deep dive in 5-500 words.
              </p>
              <p className="font-bold text-gray-500 text-xs self-end">
                {wordCount}/500
              </p>
            </div>

            {/* expiry date */}

            <div className="flex flex-row gap-2 items-center w-full">
              <p className="text-[16px] min-w-fit text-left font-semibold max-sm:text-xs text-gray-600">
                Expiry Date
              </p>
              <Popover>
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

                      // console.log(val?.toISOString()! + 24 * 60 * 60 * 1000)
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
            <br />

            {/* expiry date ends */}

            <div className="flex items-center gap-2">
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
          {generatedDeepdiveData.length > 0 && (
            <>
              <div className="flex flex-row gap-2 max-sm:flex-col">
                {generatedDeepdiveData.map((dd, i) => (
                  <div
                    key={i}
                    className="w-full text-sm max-sm:text-xs text-left text-gray-600 p-3 bg-gray-50 mt-2 rounded-md border border-gray-200 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <b className="my-1 text-gray-400">Deep Dive</b>
                      <p className="text-base max-sm:text-sm mt-3 font-semibold">
                        {dd.title}
                      </p>
                      <p className="text-sm max-sm:text-xs my-2">
                        {dd.objective}
                      </p>
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
                          <ExternalLink className="mr-2 w-4 h-4" /> Visit Deep
                          Dive
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateYourDeepDive;
