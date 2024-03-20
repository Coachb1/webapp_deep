"use client";

import FilterDropDown from "@/components/FilterDropDown";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  baseURL,
  basicAuth,
  convertTextToCorrectFormat,
  findCoachUID,
  findCoacheeUID,
  getUserAccount,
  hasPassed5Days,
  hideBots,
} from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Loader,
  Search,
  Star,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NetworkNav from "@/components/NetworkNav";
import { toast } from "sonner";
import { UserClientInfoDataType, connectionType } from "@/lib/types";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import { profile } from "console";
import Coach from "./coach/Coach";

interface CoachesDataType {
  id: number;
  name: string;
  profile_id: string;
  department: string;
  bot_type: string;
  profile_pic_url: string;
  profile_type: string;
  description: string;
  experience: string;
  expertise: string;
  status: string;
  avatar_bot_id: string;
  feedback_wall: string | null;
  skills: string;
  is_visible: boolean;
  is_approved: boolean;
  avatar_snippit: string;
  avatar_bot_url: string;
  admirer_ids: string[];
  created: string;
  time_value_in_days: string;
  timer_enabled: boolean;
  timer_reset: boolean;
  rating: number;
  total_rating: number;
  total_engagement_with_question_count: number | null;
  total_without_question_count: number | null;
  visual_tag: string;
}

interface FilterCategoriesType {
  filterName: string;
  filterOptions: string[];
}

function findConnectionStatus(
  connections: connectionType[],
  coachId: string,
  coacheeId: string
) {
  for (let i = 0; i < connections.length; i++) {
    const connection = connections[i];
    if (
      connection.coach_id === coachId &&
      connection.coachee_id === coacheeId
    ) {
      return connection.status;
    }
  }
  return "";
}

const Coaches = ({ user }: any) => {
  const router = useRouter();
  const params = useSearchParams();
  const coacheeIdFromParams = params.get("coachee_id");

  const [parentCheckedValues, setParentCheckedValues] = useState<string[]>([]);
  const [coachesData, setCoachesData] = useState<CoachesDataType[]>([]);
  const [savedCoachesData, setSavedCoachesData] = useState<CoachesDataType[]>(
    []
  );
  const [filterCategroies, setFilterCategories] = useState<
    FilterCategoriesType[]
  >([]);
  const [coachSkillsExpertise, setCoachSkillsExpertise] = useState<string[]>(
    []
  );

  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  const [coacheeId, setCoacheeId] = useState("");
  const [coachId, setCoachId] = useState("");
  const [feedbackBots, setFeedbackBots] = useState<any[]>([]);
  const [connections, setConnections] = useState<connectionType[]>([]);
  // const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [userClientInfoData, setUserClientInfoData] =
    useState<UserClientInfoDataType>();

  const [clientDepartments, setClientDepartments] = useState<string[] | null>(
    null
  );

  const [clientExpertise, setClientExpertise] = useState<string[] | null>(null);

  //pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const indexOfLastCoach = currentPage * itemsPerPage;
  const indexOfFirstCoach = indexOfLastCoach - itemsPerPage;
  const currentCoachesData = coachesData.slice(
    indexOfFirstCoach,
    indexOfLastCoach
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const totalPages = Math.ceil(coachesData.length / itemsPerPage);
  const maxPaginationLinks = 5;

  const getClientInfoForUser = (userEmail: string) => {
    fetch(
      `${baseURL}/accounts/get-client-information/?for=user_info&email=${userEmail}`,
      {
        method: "GET",
        headers: {
          Authorization: basicAuth,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setUserClientInfoData(data.data);
        console.log(data.data);
        setClientDepartments(data.data.user_info[0].departments);
        setClientExpertise(data.data.user_info[0].coach_expertise);
      })
      .catch((err) => console.error(err));
  };

  const getCoachesData = async () => {
    //GET COACHES
    await fetch(
      `${baseURL}/accounts/get-directory-informations/?email=${user.email}`,
      {
        method: "GET",
        headers: {
          Authorization: basicAuth,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        const iconsByAiProfiles = data.filter(
          (profile: CoachesDataType) => profile.profile_type === "icons_by_ai"
        );
        console.log(iconsByAiProfiles, "iconsByAiProfiles");

        const allOtherProfiles = data.filter(
          (profile: CoachesDataType) =>
            profile.bot_type !== "coachbots" &&
            profile.profile_type !== "icons_by_ai"
        );

        console.log(allOtherProfiles, "allOtherProfiles");

        setSavedCoachesData([...iconsByAiProfiles, ...allOtherProfiles]);
        setCoachesData([...iconsByAiProfiles, ...allOtherProfiles]);

        setLoading(false);

        const profileTypeOptions: string[] = Array.from(
          new Set(data.map((profile: CoachesDataType) => profile.profile_type))
        );

        const skillsOptions: string[] = Array.from(
          new Set(
            data
              .filter(
                (profile: CoachesDataType) =>
                  profile.profile_type !== "skill_bot"
              )
              .map((profile: CoachesDataType) => profile.skills)
          )
        );

        console.log(
          skillsOptions.filter((skill) => skill !== null && skill !== undefined)
        );

        const totalExpertise =
          clientExpertise !== null
            ? clientExpertise
            : [
                "Career Management",
                "Work Life Banlance",
                "Project Management",
                "Lateral Transfers",
              ];

        setCoachSkillsExpertise([...skillsOptions, ...totalExpertise]);

        setFilterCategories([
          {
            filterName: "Profile Type",
            filterOptions: [
              "coach",
              "mentor",
              "coachee",
              "mentee",
              "icons_by_ai",
              "accepted",
              "feedback_bot",
            ],
          },
          {
            filterName: "Experience",
            filterOptions: [
              "0 - 5 years",
              "5 - 10 years",
              "10 - 15 years",
              "15 - 20 years",
              "20+ years",
            ],
          },
          {
            filterName: "Department",
            filterOptions:
              clientDepartments !== null
                ? clientDepartments
                : [
                    "Sales & Marketing",
                    "Production",
                    "Design",
                    "Engineering",
                    "HR & Training",
                    "External",
                  ],
          },
          // {
          //   filterName: "Coach Skills",
          //   filterOptions: skillsOptions.filter(
          //     (skill) => skill !== null && skill !== undefined
          //   ),
          // },
          {
            filterName: "Expertise",
            filterOptions:
              clientExpertise !== null
                ? clientExpertise
                : [
                    "Career Management",
                    "Work Life Balance",
                    "Project Management",
                    "Lateral Transfers",
                  ],
          },
        ]);
        if (coacheeIdFromParams) {
          document.getElementById(coacheeIdFromParams)?.scrollIntoView({
            behavior: "smooth",
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  const getConnectionsForCoachee = (coacheeId: string) => {
    fetch(
      `${baseURL}/accounts/coach-coachee-connections/?coachee_id=${coacheeId}`,
      {
        method: "GET",
        headers: {
          Authorization: basicAuth,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setConnections(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [allCoaches, setAllCoaches] = useState<CoachesDataType[]>([]);
  const [canJoinAs, setCanJoinAs] = useState("");

  const [userBotData, setUserBotData] = useState<any>();

  async function getCanJoinAs(email: string) {
    try {
      const resp = await fetch(
        `${baseURL}/accounts/user-can-join-as/?email=${email}`,
        {
          method: "GET",
          headers: {
            Authorization: basicAuth,
          },
        }
      );

      const respJson = await resp.json();
      console.log(`canJoinAs: ${respJson} ${respJson.can_join_as}`);
      setCanJoinAs(respJson.can_join_as);
    } catch {
      setCanJoinAs("coachee");
    }
  }

  useEffect(() => {
    hideBots();

    if (user) {
      getClientInfoForUser(user.email);
      // getAllConnections();
      getCoachesData();
      getUserAccount(user)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUserId(data.uid);
          getCanJoinAs(user.email);
          fetch(
            `${baseURL}/accounts/coach-coachee-mentor-mentee-profile/?user_id=${data.uid}`,
            {
              method: "GET",
              headers: {
                Authorization: basicAuth,
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data);

              setAllCoaches(data.data);

              const isApprovedData = data.data.filter(
                (coachData: any) => coachData.is_approved === true
              );

              if (findCoacheeUID(isApprovedData)) {
                getConnectionsForCoachee(findCoacheeUID(isApprovedData));
              }

              if (isApprovedData.length > 0) {
                setCoacheeId(findCoacheeUID(isApprovedData));
                setCoachId(findCoachUID(isApprovedData));
              } else {
                setCoacheeId("");
                setCoachId("");
              }
            })
            .then((err) => {
              console.error(err);
            });

          fetch(`${baseURL}/accounts/get-bots/?user_id=${data.uid}`, {
            headers: {
              Authorization: basicAuth,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Bot details for edit", data);

              const FeedbackBot = data.data.filter(
                (data: any) => data.signature_bot.bot_type === "feedback_bot"
              );
              setFeedbackBots(FeedbackBot);

              // const UserBot = data.data.filter(
              //   (data: any) => data.signature_bot.bot_type === "user_bot"
              // );
              // setUserBotData(UserBot);
            })
            .catch((err) => {
              console.error(err);
            });
        });
    }
  }, []);

  function filterData(
    inputArray: CoachesDataType[],
    filterArray: string[]
  ): CoachesDataType[] {
    console.log("INPUT ARRAY ", inputArray);
    if (filterArray.length === 0) {
      return inputArray;
    }

    return inputArray.filter((obj) => {
      // if (filterArray.includes("coach" || "mentor")) {
      //   return (
      //     obj.profile_type &&
      //     filterArray.includes(obj.profile_type.toLowerCase())
      //   );
      // } else {
      return filterArray.every((filter) => {
        for (const prop in obj) {
          if (
            obj.hasOwnProperty(prop) &&
            obj[prop as keyof CoachesDataType] &&
            prop !== "description" // Skip filtering for the "description" property
          ) {
            const propValue =
              obj[prop as keyof CoachesDataType]!.toString().toLowerCase();
            if (propValue.includes(filter.toLowerCase())) {
              return true;
            }
          }
        }
        return false;
      });
      // }
    });
  }

  const [connectedCoaches, setConnectedCoaches] = useState<CoachesDataType[]>(
    []
  );
  const handleUpdateCheckedValues = (newValues: string[]) => {
    // if (newValues.includes("External")) {
    //   toast.info(
    //     "You do not have access to external coaches and mentors at this time. Please connect with your administrator."
    //   );
    // } else if (
    //   connectedCoaches.length === 0 &&
    //   newValues.includes("accepted")
    // ) {
    //   toast.info("You do not have any connections yet. Keep exploring.");
    // } else {
    setParentCheckedValues(newValues);
    console.log(newValues);
    //for search when empty
    if (newValues.length > 0 && newValues[0].length === 0) {
      setParentCheckedValues([]);
    }

    //for dropdown select
    if (newValues.length === 0) {
      console.log("no values selected");
      setCoachesData(savedCoachesData);
    } else if (
      newValues.some((skill) => coachSkillsExpertise.includes(skill))
    ) {
      const filteredData = filterData(
        newValues.includes("Connected")
          ? coachesData.filter(
              (coachData) =>
                coachData.profile_type !== "skill_bot" &&
                coachData.profile_type !== "coachee"
            )
          : savedCoachesData.filter(
              (coachData) =>
                coachData.profile_type !== "skill_bot" &&
                coachData.profile_type !== "coachee"
            ),
        newValues
      );
      console.log(filteredData, "coach-only");
      setCoachesData(filteredData);
    } else if (newValues.some((skill) => skill === "feedback_bot")) {
      const filteredData = filterData(
        newValues.includes("Connected")
          ? coachesData.filter((coachData) => coachData.feedback_wall !== null)
          : savedCoachesData.filter(
              (coachData) => coachData.feedback_wall !== null
            ),
        newValues
      );
      console.log(filteredData, "feedback-only");
      setCoachesData(filteredData);
    } else if (newValues.includes("Icons by AI")) {
      const filteredData = filterData(
        newValues.includes("Connected")
          ? coachesData.filter(
              (coachData) => coachData.profile_type === "icons_by_ai"
            )
          : savedCoachesData.filter(
              (coachData) => coachData.profile_type === "icons_by_ai"
            ),
        newValues
      );
      console.log(filteredData);
      setCoachesData(filteredData);
    } else if (newValues.includes("mentor")) {
      const filteredData = filterData(
        newValues.includes("Connected")
          ? coachesData.filter(
              (coachData) => coachData.profile_type === "mentor"
            )
          : savedCoachesData.filter(
              (coachData) => coachData.profile_type === "mentor"
            ),
        newValues
      );
      console.log(filteredData);
      setCoachesData(filteredData);
    } else if (newValues.includes("mentee")) {
      const filteredData = filterData(
        newValues.includes("Connected")
          ? coachesData.filter(
              (coachData) => coachData.profile_type === "mentee"
            )
          : savedCoachesData.filter(
              (coachData) => coachData.profile_type === "mentee"
            ),
        newValues
      );
      console.log(filteredData);
      setCoachesData(filteredData);
    } else {
      if (newValues.includes("coach")) {
        const filteredData = filterData(
          newValues.includes("Connected")
            ? coachesData.filter(
                (coachData) =>
                  coachData.profile_type === "coach" ||
                  coachData.profile_type.includes("coach-")
              )
            : savedCoachesData.filter(
                (coachData) =>
                  coachData.profile_type === "coach" ||
                  coachData.profile_type.includes("coach-")
              ),
          newValues
        );
        console.log(filteredData);
        setCoachesData(filteredData);
      } else {
        const filteredData = filterData(
          newValues.includes("Connected") ? coachesData : savedCoachesData,
          newValues
        );
        console.log(filteredData);
        setCoachesData(filteredData);
      }
    }
    // }
  };

  function isConnected(coachStatus: string): boolean {
    return coachStatus === "accepted";
  }

  useEffect(() => {
    console.log("ALL CONNECTIONS : ", connections);
    if (coacheeId.length > 0) {
      const coachesWithStatus = savedCoachesData.map(
        (coach: CoachesDataType) => {
          const connection = connections.find(
            (connection) =>
              connection.coach_id === coach.profile_id &&
              connection.coachee_id === coacheeId
          );
          return {
            ...coach,
            status: connection ? connection.status : "", // Set status to empty string if not found
          };
        }
      );

      console.log("Coaches with status : ", coachesWithStatus);

      const connectedCoaches = coachesWithStatus.filter(
        (coach) => coach.status === "accepted"
      );

      const unconnectedCoaches = coachesWithStatus.filter(
        (coach) => !isConnected(coach.status)
      );

      console.log("Connected Coaches", connectedCoaches);

      setConnectedCoaches(connectedCoaches);
      setCoachesData([...connectedCoaches, ...unconnectedCoaches]);
      setSavedCoachesData([...connectedCoaches, ...unconnectedCoaches]);
    }
  }, [connections, coacheeId]);

  const handleLinks = (link: string) => {
    if (link.includes("playground")) {
      return link.replace("https://playground.coachbots.com", "");
    } else if (link.includes("platform")) {
      return link.replace("https://platform.coachbots.com", "");
    } else {
      return link;
    }
  };

  const RequestionConnection = ({ coachId }: { coachId: string }) => {
    const [requestLoading, setRequestLoading] = useState(false);
    const [status, setStatus] = useState("");

    useEffect(() => {
      setStatus(findConnectionStatus(connections, coachId, coacheeId));
    }, [connections]);

    const requestConnectHandler = () => {
      console.log(coacheeId, coachId);
      if (coacheeId.length > 0) {
        setRequestLoading(true);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", basicAuth);

        var reqestionData = JSON.stringify({
          coach_id: coachId,
          coachee_id: coacheeId,
        });

        console.log(reqestionData);
        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: reqestionData,
        };

        fetch(`${baseURL}/accounts/coach-coachee-connections/`, requestOptions)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);

            if (data.error || data.non_field_errors) {
              toast.error("Error while sending your request!");
            } else {
              getConnectionsForCoachee(coacheeId);
            }
            setTimeout(() => {
              setRequestLoading(false);
            }, 1000);
          })
          .catch((err) => {
            console.log(err);
            toast.error("Error while sending your request!");
            setRequestLoading(false);
          });
      } else {
        toast.error(
          "Only coachees who join the network can send connection requests."
        );
      }
    };
    return (
      <>
        <Button
          disabled={requestLoading}
          variant={"outline"}
          className="max-sm:w-full border border-gray-300 max-sm:text-sm"
          onClick={() => {
            requestConnectHandler();
          }}
        >
          {requestLoading ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Requesting
            </>
          ) : (
            "Request connection"
          )}
        </Button>
      </>
    );
  };

  interface ReviewComponentProps {
    stars: number;
    totalRatings: number;
    coachId: string;
  }

  const ReviewComponent: React.FC<ReviewComponentProps> = ({
    stars,
    totalRatings,
    coachId,
  }) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [starCount, setStarCount] = useState<number>(stars);
    const [totalReviews, setTotalRating] = useState<number>();

    useEffect(() => {
      setTotalRating(totalRatings);
    }, []);
    const handleStarMouseEnter = (starIndex: number) => {
      setHoveredIndex(starIndex);
    };

    const handleStarMouseLeave = () => {
      setHoveredIndex(null);
    };

    const handleStarClick = (starIndex: number) => {
      console.log(`Clicked on star ${starIndex}`);
      fetch(`${baseURL}/accounts/coach-rating/`, {
        method: "POST",
        headers: {
          Authorization: basicAuth,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coach_id: coachId,
          coachee_id: coacheeId,
          rating: starIndex,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setStarCount(data.average_rating);
          setTotalRating(data.total_ratings);
          setHoveredIndex(null);
        });
    };

    const renderStars = () => {
      const stars = [];
      for (let i = 0; i < 5; i++) {
        stars.push(
          <Star
            key={i}
            fill={
              i < starCount
                ? "#f59e0b"
                : hoveredIndex !== null && i < hoveredIndex
                ? "#f9ac04"
                : "#CBD5E0"
            }
            color={
              i < starCount
                ? "#f59e0b"
                : hoveredIndex !== null && i < hoveredIndex
                ? "#f9ac04"
                : "#CBD5E0"
            }
            className={`h-4 w-4 ${
              coacheeId.length === 0 && "hover:cursor-not-allowed"
            }`}
            onClick={() => {
              if (coacheeId.length > 0) {
                handleStarClick(i + 1);
              }
            }}
            style={{
              cursor: coacheeId.length === 0 ? "not-allowed" : "pointer",
            }}
            onMouseEnter={() => handleStarMouseEnter(i + 1)}
            onMouseLeave={() => handleStarMouseLeave()}
          />
        );
      }
      return stars;
    };

    return (
      <div
        className={`flex flex-row items-center ${
          coacheeId.length === 0 && "hover:cursor-not-allowed"
        }`}
      >
        <div
          className={`flex flex-row items-center gap-1 mr-1 max-sm:mt-2 ${
            coacheeId.length === 0 && "hover:cursor-not-allowed"
          }`}
        >
          {renderStars()}
        </div>{" "}
        <p className="text-[14px] max-sm:text-xs max-sm:pt-2">
          ({totalReviews} Reviews)
        </p>
      </div>
    );
  };

  const LikeComponent = ({
    profile_id,
    likesInfo,
  }: {
    profile_id: string;
    likesInfo: string[];
  }) => {
    const [saved, setSaved] = useState();
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<number>(0);

    useEffect(() => {
      // Set initial like status and count based on likesInfo
      const userLiked = likesInfo.includes(userId);
      setIsLiked(userLiked);
      setLikeCount(likesInfo.length);
    }, [likesInfo, profile_id]);

    const LikeHandler = () => {
      console.log(profile_id, userId);

      fetch(`${baseURL}/accounts/save-liked-profile/`, {
        method: "POST",
        headers: {
          Authorization: basicAuth,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profile_id: profile_id,
          user_id: userId,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setIsLiked(true);
          setLikeCount((prevCount) => prevCount + 1);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    const revertLikeHandler = () => {
      fetch(`${baseURL}/accounts/save-liked-profile/`, {
        method: "POST",
        headers: {
          Authorization: basicAuth,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profile_id: profile_id,
          user_id: userId,
          is_reverted: true,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setIsLiked(false);
          setLikeCount((prevCount) => prevCount - 1);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    return (
      <>
        <Button className="rounded-3xl px-6" variant={"outline"}>
          <TooltipWrapper
            className=""
            tooltipName={isLiked ? "Unlike" : "Like"}
            body={
              <ThumbsUp
                onClick={isLiked ? revertLikeHandler : LikeHandler}
                className={`h-5 w-5 ${
                  isLiked ? "stroke-green-500" : "hover:fill-green-500"
                }`}
                strokeWidth={1}
                stroke="#22c55e"
                fill={isLiked ? "#22c55e" : "transparent"}
              />
            }
          />
          <span className="ml-2">{likeCount}</span>
        </Button>
      </>
    );
  };

  return (
    <div className="h-full min-h-[120vh] bg-white pb-16 max-sm:h-full max-sm:min-h-screen">
      <div className="z-[999]">
        <NetworkNav user={user} />
      </div>
      <MaxWidthWrapper className="flex flex-col items-center justify-center pt-20 text-center">
        <h1 className="mb-6 mt-10 border-2 border-[#2DC092] p-[3px] text-xl font-extrabold text-[#2DC092]">
          <span className="mr-[4px] bg-[#2DC092] p-[4px] text-lg font-bold text-white">
            COACH
          </span>
          BOTS
        </h1>
        <h1 className="mt-0 text-5xl font-bold text-gray-600 max-sm:text-2xl  md:text-6xl lg:text-4xl ">
          Coaching, Mentoring & Feedback Network
        </h1>
        <p className="my-2 max-w-prose text-zinc-700 max-sm:px-8 sm:text-lg">
          {" "}
          Peer to Peer network of leaders for growth.
        </p>
        <div className="my-4 flex flex-row justify-center gap-2 max-sm:flex-wrap max-sm:text-xs">
          {/* <Button disabled variant={"outline"} className="h-fit w-fit">
            Group coaching (coming soon)
          </Button> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="border-none outline-none">
              <div>
                {" "}
                <Button variant={"outline"} className="h-fit w-fit">
                  Join the network <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {["coach", "mentor"].includes(canJoinAs) && (
                <DropdownMenuItem disabled={allCoaches.length > 0} asChild>
                  <span
                    onClick={() => {
                      router.push("/intake/?type=coach");
                    }}
                    // href={"/intake/?type=coach"}
                    className="flex flex-row items-center justify-center"
                  >
                    Join as Coach or Mentor{" "}
                    {allCoaches.length > 0 && (
                      <>
                        {allCoaches[0]?.is_approved ? (
                          <>
                            {coachId ? (
                              <Badge className="ml-2">Already Joined</Badge>
                            ) : (
                              <Badge
                                variant={"secondary"}
                                className="ml-2 border border-gray-400"
                              >
                                Not Allowed
                              </Badge>
                            )}
                          </>
                        ) : (
                          <>
                            {allCoaches[0]?.profile_type === "coach" ? (
                              <Badge className="ml-2">Requested</Badge>
                            ) : (
                              <Badge
                                variant={"secondary"}
                                className="ml-2 border border-gray-400"
                              >
                                Not Allowed
                              </Badge>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </span>
                </DropdownMenuItem>
              )}
              {["coachee", "mentee"].includes(canJoinAs) && (
                <DropdownMenuItem disabled={allCoaches.length > 0} asChild>
                  <span
                    onClick={() => {
                      router.push("/intake/?type=coachee");
                    }}
                    className="flex flex-row items-center justify-center"
                  >
                    Join as Coachee or Mentee
                    {allCoaches.length > 0 && (
                      <>
                        {allCoaches[0]?.is_approved ? (
                          <>
                            {coacheeId ? (
                              <Badge className="ml-2">Already Joined</Badge>
                            ) : (
                              <Badge
                                variant={"secondary"}
                                className="ml-2 border border-gray-400"
                              >
                                Not Allowed
                              </Badge>
                            )}
                          </>
                        ) : (
                          <>
                            {allCoaches[0]?.profile_type === "coachee" ||
                            allCoaches[0]?.profile_type === "mentee" ? (
                              <Badge className="ml-2">Requested</Badge>
                            ) : (
                              <Badge
                                variant={"secondary"}
                                className="ml-2 border border-gray-400"
                              >
                                Not Allowed
                              </Badge>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </span>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem disabled={feedbackBots.length > 0} asChild>
                <span
                  onClick={() => {
                    router.push("/intake/?type=feedback");
                  }}
                  className="flex flex-row items-center justify-center"
                >
                  Join Feedback Network
                  {feedbackBots.length > 0 && (
                    <>
                      {feedbackBots[0]?.signature_bot.is_approved ? (
                        <Badge className="ml-2">Already Joined</Badge>
                      ) : (
                        <Badge className="ml-2">Requested</Badge>
                      )}
                    </>
                  )}
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* <Button variant={"outline"} className="h-fit w-fit">
            <span
              onClick={() => {
                router.push("/intake/?type=knowledge-bot");
              }}
              className="flex flex-row items-center justify-center"
            >
              Create your Knowledge bot
            </span>
          </Button> */}
          {/* <Button disabled variant={"outline"} className="h-fit w-fit">
            Whatsapp Community (coming soon)
          </Button> */}
        </div>
        <div id="list" className="min-h-screen w-full max-sm:px-2">
          <div className="my-4">
            <p className="font-semibold text-gray-500 max-sm:text-sm">
              We enable deep and meaningful coaching conversations with AI
              assistance even when life gets busy!
            </p>
          </div>
          <div className="my-4">
            <div className="flex flex-row items-center rounded-md border border-gray-300 bg-white p-1.5 py-3 shadow-md  ">
              <Search className="mr-1 inline h-4 w-4" />
              <input
                placeholder="What are you looking for?"
                className="w-full border-l pl-2 text-sm outline-none max-sm:ml-1 max-sm:text-xs"
                type="text"
                onChange={(e) => {
                  console.log(e.target.value);
                  handleUpdateCheckedValues([e.target.value]);
                }}
              />
            </div>
          </div>
          <div className="mt-4">
            <div>
              <FilterDropDown
                filtersCategory={filterCategroies}
                setParentCheckedValues={setParentCheckedValues}
                checkedValues={parentCheckedValues}
                onUpdateCheckedValues={handleUpdateCheckedValues}
              />
            </div>
          </div>
          <hr className="mt-2" />
          <div className="mt-2 ">
            {loading && (
              <div className="flex w-full flex-row items-center justify-center">
                <div className="mt-12 flex items-center">
                  <Loader className="mr-2 inline h-4 w-4 animate-spin" />{" "}
                  <span>loading...</span>
                </div>
              </div>
            )}

            {!loading &&
              coachesData.length > 0 &&
              currentCoachesData.map((coach, i) => (
                <div id={coach.profile_id} className="-z-10 mt-[-5rem] pt-20">
                  <div className="relative top-[26px]  flex w-full flex-row justify-end">
                    {coach.timer_enabled && (
                      <span className="z-[1] mr-4 rounded-2xl border-2 border-gray-300 bg-white px-3 py-1 text-sm font-semibold text-gray-500 max-sm:text-xs">
                        {coach.time_value_in_days} Days remaining
                      </span>
                    )}
                  </div>
                  <div className="my-3 flex w-full flex-row gap-6 rounded-lg border border-r-gray-300 p-8">
                    <div className="">
                      <img
                        className="h-[250px] w-[200px] min-w-[200px] rounded-md object-cover max-sm:h-[200px] max-sm:w-[150px] max-sm:min-w-[150px]"
                        src={coach.profile_pic_url}
                      />
                      <div className="mt-4">
                        <LikeComponent
                          profile_id={coach.profile_id}
                          likesInfo={coach.admirer_ids}
                        />
                      </div>
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
                      </div>
                      <p className="flex items-center text-wrap justify-center gap-2 text-left text-2xl font-semibold text-gray-700 max-sm:text-lg">
                        {coach.name}{" "}
                      </p>{" "}
                      <p className="my-1.5 font-medium text-gray-600 max-sm:my-1 max-sm:text-sm">
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
                            {convertTextToCorrectFormat(coach.profile_type)}
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-row max-sm:flex-col items-center max-sm:items-start justify-start gap-2 max-sm:gap-1">
                        <div className="flex flex-row items-center"></div>
                        <ReviewComponent
                          stars={coach.rating}
                          totalRatings={coach.total_rating}
                          coachId={coach.profile_id}
                        />
                        {(coach.profile_type === "coach" ||
                          coach.profile_type === "mentor") && (
                          <div className="max-sm:mt-2 flex flex-row items-center">
                            <span className="text-[12px] text-gray-300 mr-2 max-sm:hidden">
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
                                <span className="text-[12px] text-gray-300 mr-2 max-sm:hidden">
                                  ●
                                </span>
                                <Link
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
                      <p className="my-1.5 text-left w-full text-sm font-light max-sm:my-1 max-sm:text-xs">
                        {coach.description}
                      </p>
                      <div className="mt-4 flex flex-row flex-wrap gap-2">
                        {coach.profile_type !== "skill_bot" && (
                          <Badge
                            variant={"secondary"}
                            className=" my-1 text-sm text-gray-600"
                          >
                            {coach.experience}
                          </Badge>
                        )}
                        {coach.expertise && (
                          <Badge
                            variant={"secondary"}
                            className="my-1 text-sm text-gray-600"
                          >
                            {coach.expertise}
                          </Badge>
                        )}
                      </div>
                      <div className="mt-4 self-end flex w-full flex-row items-end justify-end gap-2 max-sm:flex-col">
                        {(coach.profile_type === "coach" ||
                          coach.profile_type === "mentor" ||
                          coach.profile_type === "coach-mentor") && (
                          <>
                            {coach.status === "accepted" && (
                              <Button
                                disabled
                                variant={"outline"}
                                className="max-sm:text-sm max-sm:w-full border border-green-300 bg-green-100"
                              >
                                Connected
                              </Button>
                            )}
                            {coach.status === "pending" && (
                              <Button
                                disabled
                                variant={"outline"}
                                className=" max-sm:text-sm max-sm:w-full border border-gray-300"
                              >
                                Requested
                              </Button>
                            )}
                            {coach.status === "" && (
                              <RequestionConnection
                                coachId={coach.profile_id}
                              />
                            )}
                            {coach.status === "available" && (
                              <RequestionConnection
                                coachId={coach.profile_id}
                              />
                            )}
                          </>
                        )}
                        {coach.avatar_bot_url !== null &&
                          coach.avatar_bot_url !== "" && (
                            <div className="max-sm:w-full">
                              <Link
                                href={handleLinks(coach.avatar_bot_url)}
                                target="_blank"
                              >
                                <Button
                                  variant={"secondary"}
                                  className="w-fit border border-gray-300 bg-[#2DC092] hover:bg-[#74d9b9d2] font-bold text-white max-sm:w-full max-sm:text-sm"
                                >
                                  {coach.profile_type === "skill_bot" ||
                                  coach.profile_type === "coachbots"
                                    ? "Skill Chat"
                                    : "AI Frame"}
                                </Button>
                              </Link>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {coachesData.length > 10 && (
              <Pagination className="my-10 max-sm:text-xs">
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      variant={"link"}
                      disabled={currentPage === 1}
                      onClick={() => paginate(currentPage - 1)}
                      className="max-sm:text-xs"
                    >
                      {" "}
                      <ChevronLeft className="mr-2 h-4 w-4" /> Previous{" "}
                    </Button>
                  </PaginationItem>
                  {Array.from({ length: totalPages }).map((_, index) => {
                    if (
                      (index < maxPaginationLinks &&
                        currentPage <= maxPaginationLinks - 3) ||
                      (index >= currentPage - 2 && index <= currentPage + 2) ||
                      (index > totalPages - maxPaginationLinks &&
                        currentPage >= totalPages - maxPaginationLinks + 2)
                    ) {
                      return (
                        <PaginationItem
                          className="w-fit px-0 hover:cursor-pointer max-sm:text-xs"
                          key={index}
                        >
                          <PaginationLink
                            // href="#"
                            isActive={currentPage === index + 1}
                            onClick={() => paginate(index + 1)}
                            className="max-sm:w-fit max-sm:px-2 max-sm:text-xs"
                          >
                            {index + 1}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    } else if (
                      // (index === maxPaginationLinks - 3 &&
                      //   currentPage > maxPaginationLinks - 3) ||
                      (index === 1 && currentPage > 4 && totalPages > 5) ||
                      (index === totalPages - 2 &&
                        currentPage < totalPages - 3 &&
                        totalPages > 5)
                    ) {
                      return <PaginationEllipsis key={index} />;
                    }
                    return null;
                  })}
                  <PaginationItem>
                    <Button
                      variant={"link"}
                      disabled={currentPage === totalPages}
                      onClick={() => paginate(currentPage + 1)}
                      className="max-sm:text-xs"
                    >
                      {" "}
                      Next <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
            {!loading && coachesData.length === 0 && (
              <div className="flex w-full flex-row items-center justify-center">
                <div className="mt-12 flex items-center">
                  {parentCheckedValues.includes("External") ||
                  parentCheckedValues.includes("accepted") ? (
                    <div className="flex flex-col gap-2">
                      {/* {parentCheckedValues.includes("External") && (
                        <span>
                          You do not have access to external coaches and mentors
                          at this time. Please connect with your administrator.
                        </span>
                      )} */}
                      {parentCheckedValues.includes("accepted") &&
                        connectedCoaches.length === 0 && (
                          <span>
                            You do not have any connections yet. Keep exploring.
                          </span>
                        )}
                    </div>
                  ) : (
                    <>
                      <span>No Data</span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Coaches;
