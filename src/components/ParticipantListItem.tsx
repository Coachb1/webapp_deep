import { CoachesDataType } from "@/app/Coaches";
import {
  convertTextToCorrectFormat,
  handleLinks,
  hasPassed5Days,
} from "@/lib/utils";
import { cn } from "@/utils/cn";
import { Card } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { Badge } from "./ui/badge";
import { ExternalLink, Link, Star } from "lucide-react";
import { userId } from "../../cypress/fixtures/utils";
import ReadMore from "./ReadMore";
import { Button } from "./ui/moving-border";

const ParticipantListItem = ({
  items,
  className,
  coacheeId,
  restrictedFeatures,
  coachId,
}: {
  items: CoachesDataType[];
  className?: string;
  coacheeId: string;
  restrictedFeatures: string | null;
  coachId: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 py-10", className)}>
      {items.map((coach, idx) => (
        <div
          key={coach?.profile_id}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card className="p-0">
            <>
              {items.length > 0 &&
                items.map((coach, i) => (
                  <div id={coach.profile_id} className="-z-10 mt-[-5rem] pt-20">
                    <div className="relative top-[26px] flex w-full flex-row justify-between">
                      <span
                        className={`z-[1] ml-4 rounded-2xl self-start border-2 border-gray-300 bg-white px-3 py-1 text-sm font-semibold text-gray-500 max-lg:text-xs max-sm:ml-2 max-sm:p-1 max-sm:text-[10px] ${
                          coach.profile_type !== "icons_by_ai"
                            ? "visible"
                            : "invisible"
                        }`}
                      >
                        User Created
                      </span>
                      {(coach.profile_type === "coach" ||
                        coach.profile_type === "mentor" ||
                        coach.profile_type === "coach-mentor") && (
                        <span
                          id={
                            coach.id_for_target_selection ===
                              "first_coach_profile" &&
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
                    <div
                      id={coach.id_for_target_selection}
                      className={`flex w-full flex-row gap-6 rounded-lg p-8 max-sm:p-4 bg-white`}
                    >
                      <div className="">
                        <img
                          className="h-[250px] w-[200px] min-w-[200px] rounded-md object-cover max-sm:h-[200px] max-sm:w-[150px] max-sm:min-w-[150px]"
                          src={
                            coach.profile_pic_url
                              ? coach.profile_pic_url
                              : "https://res.cloudinary.com/dtbl4jg02/image/upload/v1716188919/ztvtyywtkzzh23jadm3n.png"
                          }
                        />
                        {/* {!restrictedFeatures?.includes("Likes") && (
                          <div className="mt-4">
                            <LikeComponent
                              profile_id={coach.profile_id}
                              likesInfo={coach.admirer_ids}
                            />
                          </div>
                        )} */}
                      </div>
                      <div className=" flex flex-col items-start justify-start w-full">
                        <div className="mb-2 flex flex-row items-center gap-1">
                          {" "}
                          {hasPassed5Days(coach.created) ? null : (
                            <Badge className="bg-emerald-100 text-[12px] text-emerald-700 hover:bg-emerald-200">
                              <Star color="#047857" className="mr-1 h-4 w-4 " />{" "}
                              New
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
                        {coach.profile_type === "icons_by_ai" ? (
                          <>
                            <div className="flex flex-col justify-start">
                              {coach.bot_tag && (
                                <p className="text-left text-2xl font-semibold text-gray-700 max-sm:text-sm">
                                  {coach.bot_tag}
                                </p>
                              )}
                              <p className="flex items-center text-wrap justify-center gap-2 text-left text-lg font-normal text-gray-700 max-sm:text-sm">
                                {convertTextToCorrectFormat(coach.name)}
                              </p>
                            </div>
                          </>
                        ) : (
                          <p className="flex items-center text-wrap justify-center gap-2 text-left text-2xl font-semibold text-gray-700 max-sm:text-sm">
                            {convertTextToCorrectFormat(coach.name)}
                          </p>
                        )}{" "}
                        <p className="my-1.5 font-semibold text-gray-600 max-sm:my-1 max-sm:text-sm">
                          {coach.department}
                        </p>
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
                                : convertTextToCorrectFormat(
                                    coach.profile_type
                                  )}
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-row max-sm:flex-col max-lg:flex-col items-center max-sm:items-start max-lg:items-start justify-start gap-2 max-sm:gap-1">
                          {/* {coach.profile_type !== "coachee" &&
                            coach.profile_type !== "mentee" &&
                            !restrictedFeatures?.includes("Ratings") && (
                              <ReviewComponent
                                id={
                                  coach.id_for_target_selection ===
                                    "first_coach_profile" &&
                                  coach.feedback_wall !== null
                                    ? "reviews"
                                    : undefined
                                }
                                stars={coach.rating}
                                totalRatings={coach.total_rating}
                                coachId={coach.profile_id}
                              />
                            )} */}
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
                            {coach.feedback_wall !== null &&
                              coach.feedback_wall !== "" && (
                                <>
                                  <span className="text-[12px] text-gray-300 mr-2 max-sm:hidden max-lg:hidden">
                                    ●
                                  </span>
                                  <Link
                                    id={
                                      coach.id_for_target_selection ===
                                        "first_coach_profile" &&
                                      coach.feedback_wall !== null
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
                                      Feedback{" "}
                                      <ExternalLink className="h-4 w-4 ml-1" />
                                    </Button>
                                  </Link>
                                </>
                              )}
                          </div>
                        </div>
                        <p className="my-1.5 tracking-wider text-left w-full text-lg font-light max-sm:my-1 max-sm:text-xs overflow-clip no-scrollbar">
                          <ReadMore text={coach.description} />
                        </p>
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
                        <div className="mt-4 self-end flex w-full flex-row items-end justify-end gap-2 max-sm:flex-col">
                          {coach.status === "accepted" ? (
                            <Button
                              disabled
                              variant={"outline"}
                              className="max-sm:text-sm max-sm:w-full border border-green-300 bg-green-100"
                            >
                              Connected
                            </Button>
                          ) : (
                            <>
                              {(coach.profile_type === "coach" ||
                                coach.profile_type === "mentor" ||
                                coach.profile_type === "coach-mentor") && (
                                <>
                                  <>
                                    {/* {coacheeId.length > 0 && (
                                      <>
                                        <RequestionConnection
                                          requestStatus={coach.status}
                                          coachId={coach.profile_id}
                                          stateCoachId={coachId}
                                        />
                                      </>
                                    )} */}
                                  </>
                                </>
                              )}
                            </>
                          )}

                          {coach.avatar_bot_url !== null &&
                            coach.avatar_bot_url !== "" && (
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
                    </div>
                  </div>
                ))}
            </>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ParticipantListItem;
