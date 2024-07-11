"use client";

import Image from "next/image";
import React, { ReactNode, useEffect } from "react";
import { CardBody, CardContainer, CardItem } from "./3d-card-effect";
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
import { ExternalLink, Star } from "lucide-react";

export function ParticipantListItemCard({
  coach,
  coacheeId,
  coachId,
  userId,
  reviewComponent,
  likeComponent,
  restrictedFeatures,
  requestConnectionComponent,
}: {
  coach: CoachesDataType;
  coacheeId: string;
  coachId: string;
  userId: string;
  reviewComponent: ReactNode;
  likeComponent: ReactNode;
  restrictedFeatures: string | null;
  requestConnectionComponent: ReactNode;
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
          coach.profile_type === "coach-mentor") && (
          <span
            id={
              coach.id_for_target_selection === "first_coach_profile" &&
              coach.feedback_wall !== null
                ? "email"
                : undefined
            }
            className="z-[1] ml-4 mr-4  rounded-2xl  self-end border-2 border-gray-300 bg-white px-3 py-1 text-sm font-semibold text-gray-500 max-lg:text-xs max-sm:ml-2 max-sm:p-1 max-sm:text-[10px] max-sm:mr-2 "
          >
            {coach.name.replace(/\s/g, "").toLowerCase() +
              coach.id +
              "@coachbots.com"}
          </span>
        )}
      </div>
      <CardContainer
        containerClassName="py-0 mt-4"
        className="inter-var w-full"
      >
        <CardBody className="bg-white relative group/card  h-auto rounded-xl p-6 w-full flex flex-row py-0">
          <CardItem translateZ="100" className="w-fit">
            <img
              className="h-[250px] w-[200px] min-w-[200px] rounded-md object-cover max-sm:h-[200px] max-sm:w-[150px] max-sm:min-w-[150px]"
              src={
                "https://res.cloudinary.com/dtbl4jg02/image/upload/v1716188919/ztvtyywtkzzh23jadm3n.png"
              }
            />
            <div>{likeComponent}</div>
          </CardItem>

          <div className="w-full ml-4 text-left">
            <CardItem
              translateZ="60"
              className="text-gray-800 w-full text-sm my-1 text-left"
            >
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
                  <Badge className="bg-blue-100 text-[12px] text-blue-700 hover:bg-emerald-200">
                    AI Recommended
                  </Badge>
                )}
              </div>
              <div className="self-start text-left w-full">
                {coach.profile_type === "icons_by_ai" ? (
                  <>
                    <div className="flex flex-col justify-start">
                      {coach.bot_tag && (
                        <p className="text-left text-2xl font-semibold text-gray-700 max-sm:text-sm">
                          {coach.bot_tag}
                        </p>
                      )}
                      <p className="flex text-wrap gap-2 text-left text-lg font-normal text-gray-700 max-sm:text-sm">
                        {convertTextToCorrectFormat(coach.name)}
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="flex w-full text-wrap gap-2 text-left text-2xl font-semibold text-gray-700 max-sm:text-sm">
                    {convertTextToCorrectFormat(coach.name)}
                  </p>
                )}{" "}
              </div>
            </CardItem>
            <CardItem
              translateZ="50"
              className="text-sm w-full font-semibold text-neutral-600 dark:text-white"
            >
              {coach.department}
            </CardItem>
            <CardItem
              translateZ="50"
              className="text-sm w-full font-semibold text-neutral-600 dark:text-white"
            >
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
                    {coach.profile_type === "icons_by_ai"
                      ? "Icons by AI"
                      : convertTextToCorrectFormat(coach.profile_type)}
                  </Badge>
                )}
              </div>
            </CardItem>
            <CardItem
              translateZ="50"
              className="text-sm w-full font-semibold text-neutral-600 dark:text-white"
            >
              {reviewComponent}
              {(coach.profile_type === "coach" ||
                coach.profile_type === "mentor") && (
                <div className="max-sm:mt-2 flex flex-row items-center">
                  <span className="text-[12px] text-gray-300 mr-2 max-sm:hidden  max-lg:hidden">
                    ●
                  </span>
                  <p className="text-sm max-sm:-ml-0 font-semibold text-gray-500">
                    {coach.total_without_question_count} Engagements
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
            </CardItem>
            <CardItem
              translateZ="60"
              className="my-1.5 tracking-wider text-left w-full text-lg font-light max-sm:my-1 max-sm:text-xs overflow-clip no-scrollbar"
            >
              <ReadMore text={coach.description} />
            </CardItem>
            <CardItem
              translateZ="60"
              className="text-neutral-500 w-full text-sm mt-2 dark:text-neutral-300 text-left"
            >
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
            </CardItem>
            <div className="flex justify-end items-center mt-20 mb-4 gap-2">
              {requestConnectionComponent}
              {coach?.avatar_bot_id !== null &&
                coach?.avatar_bot_url !== "" && (
                  <div className="max-sm:w-full">
                    <Button
                      variant={"secondary"}
                      className="w-fit border border-gray-300 bg-[#2DC092] hover:bg-[#74d9b9d2] font-bold text-white max-sm:w-full max-sm:text-sm"
                      disabled={
                        coacheeId.length === 0 &&
                        userId !== coach.user_id &&
                        coach.profile_type !== "icons_by_ai"
                      }
                    >
                      <Link
                        href={handleLinks(coach.avatar_bot_url)}
                        target="_blank"
                      >
                        {coach.profile_type === "skill_bot" ||
                        coach.profile_type === "coachbots"
                          ? "Skill Chat"
                          : "AI Frame"}
                      </Link>
                    </Button>
                  </div>
                )}
            </div>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
}
