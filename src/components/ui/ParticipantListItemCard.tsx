"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import ReadMore from "../ReadMore";
import { CoachesDataType } from "@/app/Coaches";
import {
  convertTextToCorrectFormat,
  handleLinks,
  hasPassed5Days,
} from "@/lib/utils";
import { Button } from "./button";
import { Badge } from "./badge";
import {
  ChevronDownCircle,
  ExternalLink,
  List,
  Star,
  View,
} from "lucide-react";
import { Tooltip } from "antd";

export function ParticipantListItemCard({
  coach,
  coacheeId,
  coachId,
  userId,
  reviewComponent,
  likeComponent,
  restrictedFeatures,
  requestConnectionComponent,
  profilePicUrl,
  schedullingLink,
  meetTime,
  daysAvailable,
}: {
  coach: CoachesDataType;
  coacheeId: string;
  coachId: string;
  userId: string;
  reviewComponent: ReactNode;
  likeComponent: ReactNode;
  restrictedFeatures: string | null;
  requestConnectionComponent: ReactNode;
  profilePicUrl: string | null;
  schedullingLink: string;
  meetTime: string;
  daysAvailable: string;
}) {
  return (
    <div id={coach.profile_id}>
      <div className="relative top-[0px] z-[999] flex w-full flex-row justify-between">
        <span
          className={`z-[1] ml-4 mt-2 rounded-2xl self-start border-2 border-gray-300 bg-white px-3 py-1 text-sm font-semibold text-gray-500 max-lg:text-xs max-sm:ml-2 max-sm:p-1 max-sm:text-[10px] ${
            coach.profile_type !== "icons_by_ai" ? "visible" : "invisible"
          }`}
        >
          User Created
        </span>
        {(coach.profile_type === "coach" ||
          coach.profile_type === "mentor" ||
          coach.profile_type === "coach-mentor") &&
          meetTime &&
          meetTime.trim().length > 3 && (
            <span
              id={
                coach.id_for_target_selection === "first_coach_profile" &&
                coach.feedback_wall !== null
                  ? "email"
                  : undefined
              }
              className="z-[1] ml-4 mr-4 font-sans rounded-2xl  self-end border-2 border-gray-300 bg-white px-3 py-1 text-sm font-semibold text-gray-500 max-lg:text-xs max-sm:ml-2 max-sm:p-1 max-sm:text-[10px] max-sm:mr-2 "
            >
              {/* {coach.name.replace(/\s/g, "").toLowerCase() +
              coach.id +
              "@coachbots.com"} */}
              {meetTime && meetTime.trim().length > 3 && (
                <>
                  {" "}
                  <> Preferred Meet time : {meetTime}</>{" "}
                  <>
                    {daysAvailable && (
                      <>
                        {" "}
                        | Days :{" "}
                        <Tooltip placement="bottom" title={daysAvailable}>
                          <ChevronDownCircle className="h-6 max-sm:h-5 w-6 max-sm:w-5 p-1 inline hover:bg-gray-200 rounded-full hover:cursor-pointer" />
                        </Tooltip>
                      </>
                    )}
                  </>
                </>
              )}
            </span>
          )}
      </div>
      <div className="inter-var w-full py-0 mt-4">
        <div className="bg-white relative group/card h-auto rounded-xl p-6 w-full flex flex-row max-sm:flex-col max-sm:justify-center max-sm:items-center py-0 ">
          <div className="w-fit">
            <img
              className="h-[250px] w-[200px] max-sm:w-full  max-w-[200px] rounded-md object-cover max-sm:object-fit max-sm:h-[200px] max-sm:min-w-[150px]"
              src={
                profilePicUrl?.includes("https://res.cloudinary.com")
                  ? profilePicUrl
                  : "https://res.cloudinary.com/dtbl4jg02/image/upload/v1716188919/ztvtyywtkzzh23jadm3n.png"
              }
            />
            <div className={`${coach.profile_type === "coachee" && !coach.feedback_wall && "mb-4"}`}>{likeComponent}</div>
          </div>
          <div className="w-full ml-4 max-sm:ml-0 text-left">
            <div className="text-gray-800 w-full text-sm my-1 text-left">
              <div className="mb-2 flex flex-row items-center gap-1">
                {" "}
                {hasPassed5Days(coach.created) ? null : (
                  <Badge className="bg-emerald-100 text-[12px] text-emerald-700 hover:bg-emerald-200">
                    <Star color="#047857" className="mr-1 h-4 w-4 " /> New
                  </Badge>
                )}
                {coach.visual_tag !== null &&
                  coach.visual_tag
                    .split(", ")
                    .map((tag) => (
                      <Badge className="bg-emerald-100 text-[12px] text-emerald-700 hover:bg-emerald-200">
                        {convertTextToCorrectFormat(tag)}
                      </Badge>
                    ))}
                {coach.is_recommended && (
                  <Badge className="bg-blue-100 text-[12px] text-blue-700 hover:bg-blue-200">
                    AI Recommended
                  </Badge>
                )}
              </div>
              <div className="self-start text-left w-full">
                {coach.profile_type === "icons_by_ai" ? (
                  <>
                    <div className="flex flex-col justify-start">
                      {coach.bot_tag && (
                        <p className="text-left text-2xl font-semibold text-gray-700">
                          {coach.bot_tag}
                        </p>
                      )}
                      <p className="flex text-wrap gap-2 text-left text-lg font-normal text-gray-700 max-sm:text-sm">
                        {convertTextToCorrectFormat(coach.name)}
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="flex w-full text-wrap gap-2 text-left text-2xl font-semibold text-gray-700">
                    {convertTextToCorrectFormat(coach.name)}
                  </p>
                )}{" "}
              </div>
            </div>
            <div className="text-sm w-full font-semibold text-neutral-600 dark:text-white">
              {coach.department}
            </div>
            <div className="text-sm w-full font-semibold text-neutral-600 dark:text-white">
              <div className="flex flex-row items-center justify-start gap-2">
                {coach.profile_type === "coach-mentor" ? (
                  <>
                    <Badge
                      variant={"secondary"}
                      className={`my-1.5 h-fit rounded-sm border-gray-300 px-2 text-base  max-sm:my-1 max-sm:px-1.5 max-sm:text-sm`}
                    >
                      {convertTextToCorrectFormat("coach")}
                    </Badge>
                    <Badge
                      variant={"secondary"}
                      className={`my-1.5 h-fit rounded-sm border-gray-300 px-2 text-base  max-sm:my-1 max-sm:px-1.5 max-sm:text-sm`}
                    >
                      {convertTextToCorrectFormat("mentor")}
                    </Badge>
                  </>
                ) : (
                  <Badge
                    variant={"secondary"}
                    className={`my-1.5 h-fit rounded-md border-gray-300 px-2 text-base  max-sm:my-1 max-sm:px-1.5 max-sm:text-sm ${
                      (coach.profile_type === "skill_bot" ||
                        coach.profile_type === "coachbots") &&
                      "bg-green-500 hover:bg-green-400"
                    }`}
                  >
                    {/* {coach.profile_type === "icons_by_ai"
                      ? "Icons by AI"
                      : coach.subject_specific_bot_id?.includes("subject")
                      ? convertTextToCorrectFormat(coach.profile_type) +
                        " - Subject co-pilot"
                      : convertTextToCorrectFormat(coach.profile_type)} */}

                    {coach.profile_type === "icons_by_ai"
                      ? "AI Coaching Agent"
                      : coach.subject_specific_bot_id?.includes("subject")
                      ? `${convertTextToCorrectFormat(
                          coach.profile_type
                        )} - Co-pilot Level 1`
                      : coach.avatar_bot_id?.includes("avatar")
                      ? `${convertTextToCorrectFormat(
                          coach.profile_type
                        )} - Co-pilot Level 2`
                      : convertTextToCorrectFormat(coach.profile_type)}
                  </Badge>
                )}
              </div>
            </div>
            <div className="text-sm w-full font-semibold text-neutral-600 dark:text-white flex flex-row max-sm:flex-col gap-2 items-center max-sm:items-start">
              {reviewComponent}
              {coach.total_without_question_count && (
                <div className="max-sm:mt-2 flex flex-row items-center">
                  <span className="text-[12px] text-gray-300 mr-2 max-sm:hidden  max-lg:hidden">
                    ●
                  </span>
                  <p className="text-sm max-sm:text-xs max-sm:-ml-0 font-semibold text-gray-500 font-sans">
                    <span className="text-base">
                      {coach.total_without_question_count}
                    </span>{" "}
                    Engagements
                  </p>
                </div>
              )}
              <div>
                {coach.feedback_wall !== null && coach.feedback_wall !== "" && (
                  <>
                    <span className="text-[12px] text-gray-300 mr-2 max-sm:hidden max-lg:hidden">
                      ●
                    </span>
                    <Link
                      id={
                        coach.id_for_target_selection ===
                          "first_coach_profile" && coach.feedback_wall !== null
                          ? "feedback"
                          : undefined
                      }
                      target="_blank"
                      href={handleLinks(coach.feedback_wall)}
                    >
                      <Button
                        variant={"link"}
                        className="h-fit ml-0 pl-0 w-fit max-sm:w-full max-sm:text-left max-sm:text-sm"
                      >
                        Feedback <ExternalLink className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="my-1.5 tracking-wider text-slate-900 text-left w-full text-lg max-sm:my-1 max-sm:text-xs overflow-clip no-scrollbar">
              <ReadMore text={coach.description} />
            </div>
            <div className="text-neutral-500 w-full text-sm mt-2 dark:text-neutral-300 text-left">
              <div className="mt-4 flex flex-row flex-wrap gap-2">
                {coach.profile_type !== "skill_bot" && (
                  <Badge
                    variant={"secondary"}
                    className=" my-1 text-sm max-sm:text-xs text-gray-600"
                  >
                    {coach.experience}
                  </Badge>
                )}
                {coach.expertise && (
                  <Badge
                    variant={"secondary"}
                    className="my-1 text-sm max-sm:text-xs text-gray-600"
                  >
                    {coach.expertise}
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex justify-end flex-row max-md:flex-col  max-lg:flex-col max-sm:flex-col max-sm:flex-wrap items-center mt-10 max-sm:mt-4 mb-4 gap-2 max-md:w-full max-lg:w-full">
              {coach?.avatar_bot_id !== null &&
                coach?.avatar_bot_url !== "" &&
                coach.profile_type !== "icons_by_ai" &&
                schedullingLink && (
                  <>
                    <Button
                      asChild
                      className="border border-[#2DC092] max-sm:w-full bg-white text-[#1d9770] font-semibold hover:bg-[#74d9b927] max-sm:text-sm max-md:min-w-full  max-lg:min-w-full"
                    >
                      <Link target="_blank" href={schedullingLink}>
                        Schedule a meet
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </>
                )}
              {requestConnectionComponent}
              {(coach?.avatar_bot_id !== null ||
                coach?.subject_specific_bot_id !== null) &&
                (coach?.avatar_bot_url !== "" ||
                  coach?.subject_specific_bot_url !== "") && (
                    coach.profile_type !== "coachee"
                  ) && (
                  <>
                    <div className="max-sm:w-full max-md:w-full max-lg:w-full">
                      <Button
                        variant={"secondary"}
                        className="w-fit border border-gray-300 bg-[#2DC092] hover:bg-[#74d9b9d2] font-bold text-white max-sm:w-full max-sm:text-sm max-md:min-w-full  max-lg:min-w-full"
                        disabled={
                          coacheeId.length === 0 &&
                          userId !== coach.user_id &&
                          coach.profile_type !== "icons_by_ai"
                        }
                      >
                        <Link
                          href={handleLinks(
                            coach.avatar_bot_url ||
                              coach.subject_specific_bot_url ||
                              ""
                          )}
                          target="_blank"
                          className="flex flex-row items-center"
                        >
                          <p>
                            {coach.profile_type === "skill_bot" ||
                            coach.profile_type === "coachbots"
                              ? "Skill Chat"
                              : coach.subject_specific_bot_id?.includes(
                                  "subject"
                                )
                              ? "Co-pilot Level 1"
                              : coach.profile_type === "icons_by_ai"
                              ? "AI Coaching Agent"
                              : "AI Copilot"}{" "}
                          </p>
                          <ExternalLink className="ml-1 h-4 w-4 inline" />
                        </Link>
                      </Button>
                    </div>
                  </>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
