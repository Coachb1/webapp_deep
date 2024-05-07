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
  GlobeIcon,
  List,
  Loader,
  Search,
  Star,
  ThumbsUp,
  UserCogIcon,
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
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { UseHelpMode } from "@/lib/helpmodeContext";
import HelpMode from "@/components/HelpMode";
import Joyride from "react-joyride";

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
  id_for_target_selection?: string;
}

interface FilterCategoriesType {
  filterName: string;
  filterOptions: string[];
}

function addIdForTargetSelection(profiles: CoachesDataType[], HelpModeSteps : any[]) {
  // Initialize flags to track the first occurrence of each profile type
  let firstIconsByAiFound = false;
  let firstCoacheeFound = false;
  let firstCoachFound = false;

  // Iterate through the profiles array
  profiles.forEach((profile) => {
    // Check the profile_type and update the id_for_target_selection field accordingly
    if (profile.profile_type === "icons_by_ai" && !firstIconsByAiFound) {
      profile.id_for_target_selection = "first_icons_by_ai";
      firstIconsByAiFound = true; // Update flag to indicate the first icons_by_ai profile has been processed
    } else if (profile.profile_type === "coachee" && !firstCoacheeFound) {
      profile.id_for_target_selection = "first_coachee_profile";
      firstCoacheeFound = true; // Update flag to indicate the first coachee profile has been processed
    } else if (
      (profile.profile_type === "coach" ||
        profile.profile_type === "mentor" ||
        profile.profile_type === "coach-mentor") &&
      profile.feedback_wall !== null &&
      !firstCoachFound
    ) {
      profile.id_for_target_selection = "first_coach_profile";
      firstCoachFound = true; // Update flag to indicate the first coach profile has been processed

      HelpModeSteps.push({
        target: "#first_coach_profile",
        content:
          "The avatar or bot representation of the coach or mentor which is used as a primary medium of coaching.",
        placement: "auto",
      },
      {
        target: "#email",
        content:
          "The avatar of the email via which the conversation can happen without leaving the inbox! (The coach or mentor acceptance is mandatory) The actual coach is copied in the emails and may intervene anytime but the conversation is actually happening with their avatars. ",
      },
      {
        target: "#reviews",
        disableScrolling: true,
        content:
          "Coaches and Mentors can get review ratings from anyone in the network. ",
      },
      {
        target: "#feedback",
        disableScrolling: true,
        content:
          "Available for those participants who join a peer feedback network. The users can  showcase feedback from anyone and take action on private critical feedback for improvement. ",
      })
    }
  });

  return profiles; // Return the updated profiles array
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

const Coaches = ({
  user,
  coachesDataa,
  UserJoiningPreviledges,
  userConnections,
}: {
  user: KindeUser | null;
  coachesDataa: CoachesDataType[];
  UserJoiningPreviledges: any;
  userConnections: any;
}) => {
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

  const [loadingStates, setLoadingStates] = useState({
    icon: <UserCogIcon className="h-4 w-4 mr-2" />,
    text: "Refreshing Profile Avatars",
  });

  const [coacheeId, setCoacheeId] = useState("");
  const [coachId, setCoachId] = useState("");
  const [feedbackBots, setFeedbackBots] = useState<any[]>([]);
  const [connections, setConnections] = useState<connectionType[]>([]);
  // const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [buttonLoading, setButtonLoading] = useState(true);

  //client based restrictions
  const [restrictedPages, setRestrictedPages] = useState<string | null>(null);
  const [restrictedFeatures, setRestrictedFeatures] = useState<string | null>(
    null
  );

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
    if (userEmail) {
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
          console.log(data, "client user info");
          setClientDepartments(data.data.user_info[0].departments);
          setClientExpertise(data.data.user_info[0].coach_expertise);

          setRestrictedPages(data.data.user_info[0].restricted_pages);
          setRestrictedFeatures(data.data.user_info[0].restricted_features);
        })
        .catch((err) => console.error(err));
    }
  };

  const getCoachesData = async () => {
    // setLoadingStates({
    //   icon: <List className="h-4 w-4 mr-2" />,
    //   text: "Loading Profile summaries",
    // });
    //GET COACHES
    // await fetch(
    //   `${baseURL}/accounts/get-directory-informations/?email=${user?.email!}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       Authorization: basicAuth,
    //     },
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((data) => {
    const data = coachesDataa;
    console.log(data);

    const iconsByAiProfiles = data.filter(
      (profile: CoachesDataType) => profile.profile_type === "icons_by_ai"
    );
    // console.log(iconsByAiProfiles, "iconsByAiProfiles");

    const allOtherProfiles = data.filter(
      (profile: CoachesDataType) =>
        profile.bot_type !== "coachbots" &&
        profile.profile_type !== "icons_by_ai"
    );

    // console.log(allOtherProfiles, "allOtherProfiles");

    setSavedCoachesData([...iconsByAiProfiles, ...allOtherProfiles]);
    setCoachesData([...iconsByAiProfiles, ...allOtherProfiles]);

    // setLoading(false);

    const profileTypeOptions: string[] = Array.from(
      new Set(data.map((profile: CoachesDataType) => profile.profile_type))
    );

    const skillsOptions: string[] = Array.from(
      new Set(
        data
          .filter(
            (profile: CoachesDataType) => profile.profile_type !== "skill_bot"
          )
          .map((profile: CoachesDataType) => profile.skills)
      )
    );

    const totalExpertise =
      clientExpertise !== null
        ? clientExpertise
        : [
            "Career Management",
            "Work Life Balance",
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
    // })
    // .catch((error) => console.log("error", error));
  };

  const getFormattedCoachName = (name: string) => {
    return name.replace(/([^a-zA-Z0-9])\1+/g, "$1");
  };

  const getConnectionsForCoachee = (coacheeId: string) => {
    if (coacheeId) {
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
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  const getConnectionsForCoach = (coachId: string) => {
    if (coachId) {
      fetch(
        `${baseURL}/accounts/coach-coachee-connections/?coach_id=${coachId}`,
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
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      setLoading(false);
    }
  };

  const [allCoaches, setAllCoaches] = useState<CoachesDataType[]>([]);
  const [canJoinAs, setCanJoinAs] = useState("");

  async function getCanJoinAs(email: string) {
    const data = UserJoiningPreviledges;
    console.log(data);
    if (data.error) {
      setCanJoinAs("");
    } else {
      setCanJoinAs(data.can_join_as);
    }
  }

  useEffect(() => {
    hideBots();
    if (user) {
      getClientInfoForUser(user?.email!);
      getCoachesData();
      getUserAccount(user)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUserId(data.uid);
          getCanJoinAs(user?.email!);
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
              setButtonLoading(false);

              const isApprovedData = data.data.filter(
                (coachData: any) => coachData.is_approved === true
              );

              // if (findCoacheeUID(isApprovedData)) {
              //   getConnectionsForCoachee(findCoacheeUID(isApprovedData));
              // } else if (findCoachUID(isApprovedData)) {
              //   getConnectionsForCoach(findCoachUID(isApprovedData));
              // } else {
              //   setLoading(false);
              // }

              if (isApprovedData.length > 0) {
                setCoacheeId(findCoacheeUID(isApprovedData));
                setCoachId(findCoachUID(isApprovedData));
              } else {
                setCoacheeId("");
                setCoachId("");
              }
              setLoading(false);
            })
            .then((err) => {
              setButtonLoading(false);
              console.error(err);
              setLoading(false);
            });

          fetch(`${baseURL}/accounts/get-bots/?user_id=${data.uid}`, {
            headers: {
              Authorization: basicAuth,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(`/get-bots/?user_id=${data.uid}`, data);

              const FeedbackBot = data.data.filter(
                (data: any) => data.signature_bot.bot_type === "feedback_bot"
              );
              setFeedbackBots(FeedbackBot);
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
    if (filterArray.length === 0) {
      return inputArray;
    }

    return inputArray.filter((obj) => {
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
    });
  }

  const [connectedCoaches, setConnectedCoaches] = useState<CoachesDataType[]>(
    []
  );
  const handleUpdateCheckedValues = (newValues: string[]) => {
    setCurrentPage(1);
    setParentCheckedValues(newValues);
    console.log(newValues);
    if (newValues.length > 0 && newValues[0].length === 0) {
      setParentCheckedValues([]);
    }

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
              (coachData) =>
                coachData.profile_type === "mentor" ||
                coachData.profile_type === "coach-mentor"
            )
          : savedCoachesData.filter(
              (coachData) =>
                coachData.profile_type === "mentor" ||
                coachData.profile_type === "coach-mentor"
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
    } else if (newValues.includes("coach")) {
      const filteredData = filterData(
        newValues.includes("Connected")
          ? coachesData.filter(
              (coachData) =>
                coachData.profile_type === "coach" ||
                coachData.profile_type === "coach-mentor"
            )
          : savedCoachesData.filter(
              (coachData) =>
                coachData.profile_type === "coach" ||
                coachData.profile_type === "coach-mentor"
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
  };

  function isConnected(coachStatus: string): boolean {
    return coachStatus === "accepted";
  }

  useEffect(() => {
    console.log("ALL CONNECTIONS : ", connections);
    // setLoadingStates({
    //   icon: <GlobeIcon className="h-4 w-4 mr-2" />,
    //   text: "Getting your connections",
    // });
    let connectedCoaches: CoachesDataType[] = [];
    let unconnectedCoaches: CoachesDataType[] = [];
    if (coacheeId.length > 0) {
      const coachesWithStatus = savedCoachesData.map(
        (coach: CoachesDataType) => {
          const connection = userConnections.data.find(
            (connection: any) =>
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

      connectedCoaches = coachesWithStatus.filter(
        (coach) => coach.status === "accepted"
      );

      unconnectedCoaches = coachesWithStatus.filter(
        (coach) => !isConnected(coach.status)
      );

      console.log("Connected Coaches", connectedCoaches);

      setConnectedCoaches(connectedCoaches);
      setCoachesData(
        addIdForTargetSelection([...connectedCoaches, ...unconnectedCoaches], HelpModeSteps)
      );
      setSavedCoachesData(
        addIdForTargetSelection([...connectedCoaches, ...unconnectedCoaches], HelpModeSteps)
      );
    } else if (coachId.length > 0) {
      const coachesWithStatus = savedCoachesData.map(
        (coach: CoachesDataType) => {
          const connection = userConnections.data.find(
            (connection: any) => connection.coachee_id === coach.profile_id
          );
          return {
            ...coach,
            status: connection ? connection.status : "", // Set status to empty string if not found
          };
        }
      );

      connectedCoaches = coachesWithStatus.filter(
        (coach) => coach.status === "accepted"
      );

      unconnectedCoaches = coachesWithStatus.filter(
        (coach) => !isConnected(coach.status)
      );

      console.log("Connected Coaches", connectedCoaches);

      setConnectedCoaches(connectedCoaches);
      setCoachesData(
        addIdForTargetSelection([...connectedCoaches, ...unconnectedCoaches], HelpModeSteps)
      );
      setSavedCoachesData(
        addIdForTargetSelection([...connectedCoaches, ...unconnectedCoaches], HelpModeSteps)
      );
    }

    setTimeout(() => {
      if (coacheeIdFromParams) {
        const indexOfCoacheeForScroll = [
          ...connectedCoaches,
          ...unconnectedCoaches,
        ].findIndex((coach) => coach.profile_id === coacheeIdFromParams);

        if (indexOfCoacheeForScroll >= 0) {
          const pageNumber =
            Math.floor(indexOfCoacheeForScroll / itemsPerPage) + 1;

          paginate(pageNumber);

          document.getElementById(coacheeIdFromParams)?.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    }, 300);

    //default filter for - icons by ai
    //   handleUpdateCheckedValues(["icons_by_ai"]);
    //   const filteredData = filterData(
    //     ["icons_by_ai"].includes("Connected")
    //       ? coachesData.filter(
    //           (coachData) => coachData.profile_type === "icons_by_ai"
    //         )
    //       : savedCoachesData.filter(
    //           (coachData) => coachData.profile_type === "icons_by_ai"
    //         ),
    //     ["icons_by_ai"]
    //   );
    //   setCoachesData(filteredData);
  }, [connections, coacheeId, coachId]);

  useEffect(() => {
    const scrollTimer = setTimeout(() => {
      console.log("NOWWWW");
      if (coacheeIdFromParams) {
        const indexOfCoacheeForScroll = coachesData.findIndex(
          (coach) => coach.profile_id === coacheeIdFromParams
        );

        if (indexOfCoacheeForScroll >= 0) {
          const pageNumber =
            Math.floor(indexOfCoacheeForScroll / itemsPerPage) + 1;

          paginate(pageNumber);

          document.getElementById(coacheeIdFromParams)?.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    }, 1000);

    return () => clearTimeout(scrollTimer);
  }, [coachesData]);

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
    id?: string;
  }

  const ReviewComponent: React.FC<ReviewComponentProps> = ({
    stars,
    totalRatings,
    coachId,
    id,
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
        id={id}
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

    const [initaited, setInitiated] = useState(false);

    useEffect(() => {
      // Set initial like status and count based on likesInfo
      const userLiked = likesInfo.includes(userId);
      setIsLiked(userLiked);
      setLikeCount(likesInfo.length);
    }, [likesInfo, profile_id]);

    const LikeHandler = () => {
      console.log(profile_id, userId);
      setInitiated(true);
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

          setInitiated(false);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    const revertLikeHandler = () => {
      setInitiated(true);
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

          setInitiated(false);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    return (
      <>
        <Button
          className="rounded-3xl px-6"
          variant={"outline"}
          disabled={initaited}
          onClick={isLiked ? revertLikeHandler : LikeHandler}
        >
          <TooltipWrapper
            className=""
            tooltipName={isLiked ? "Unlike" : "Like"}
            body={
              <ThumbsUp
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

  const HelpModeSteps = [
    {
      target: "#header-text",
      content:
        "The directory contains the internal company coaches and mentors (and their avatars) and external coaches (only avatars). If internal coaches accept connection, their avatar is also accessible via email.  It also contains the coachees and mentees as well. ",
    },
    {
      target: "#join-the-network",
      content:
        "As a user, you can join as a coach/mentor or coachee/mentee. You can also join a peer feedback network to demonstrate the accolades you receive and collect 360-degree peer feedback. Certain features may not work if you do not join the networks. ",
    },
    {
      target: "#search-filter",
      content:
        "The directory can be sorted by experience level, expertise and department of the participants. These are customizable and configured during the set up.  ",
    },
    {
      target: "#participant-listing",
      disableScrolling: true,
      content: `All participants are listed. Coach, coachees, mentors, and mentees. Coach and mentor can have dual role profiles as well. "Icons by AI" are external coaches or mentors whose AI avatars are only available. (For confidentiality, personally identifiable information is removed). The listings can also be sorted by your approved connections - it happens when both members agree to connect off platform as well.`,
    },
    
  ];

  const { helpModeState, updateHelpModeState } = UseHelpMode();

  return (
    <MaxWidthWrapper className="flex flex-col items-center justify-center pt-20 text-center">
      {helpModeState && (
        <Joyride
          spotlightClicks
          continuous
          locale={{ last: "End" }}
          scrollOffset={100}
          disableScrollParentFix
          callback={(callbackData) => {
            console.log(callbackData);
            if (
              callbackData.action === "close" ||
              callbackData.action === "reset"
            ) {
              updateHelpModeState(false);
            }
          }}
          //@ts-ignore
          steps={HelpModeSteps}
        />
      )}
      <h1
        id="heading"
        className="mb-6 mt-10 border-2 border-[#2DC092] p-[3px] text-xl font-extrabold text-[#2DC092]"
      >
        <span className="mr-[4px] bg-[#2DC092] p-[4px] text-lg font-bold text-white">
          COACH
        </span>
        BOTS
      </h1>
      <h1
        id="header-text"
        className="mt-0 text-5xl font-bold text-gray-600 max-sm:text-2xl  md:text-6xl lg:text-4xl "
      >
        Coaching & Performance Workbench
      </h1>
      <p className="my-2 max-w-prose text-zinc-700 max-sm:px-8 sm:text-lg">
        {" "}
        Peer to Peer network of leaders for growth.
      </p>
      {!restrictedFeatures?.includes("Join the network") && (
        <>
          <div
            id="join-the-network"
            className="my-4 flex flex-row justify-center gap-2 max-sm:flex-wrap max-sm:text-xs"
          >
            <DropdownMenu>
              <DropdownMenuTrigger
                disabled={buttonLoading}
                asChild
                className="border-none outline-none"
              >
                <div>
                  {" "}
                  <Button
                    disabled={buttonLoading}
                    variant={"outline"}
                    className="h-fit w-fit"
                  >
                    Join the network <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {/* {["coach", "mentor"].includes(canJoinAs) && ( */}
                <DropdownMenuItem
                  disabled={
                    allCoaches.length > 0 ||
                    (canJoinAs?.length !== 0 &&
                      !["coach", "mentor"].includes(canJoinAs))
                  }
                  asChild
                >
                  <Link
                    href={"/intake/?type=coach"}
                    // onClick={() => {
                    //   router.push("/intake/?type=coach");
                    // }}
                    className="flex flex-row items-center justify-center"
                  >
                    Join as Coach or Mentor{" "}
                    {allCoaches.length > 0 ? (
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
                            {allCoaches[0]?.profile_type === "coach" ||
                            allCoaches[0]?.profile_type === "mentor" ||
                            allCoaches[0]?.profile_type === "coach-mentor" ? (
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
                    ) : canJoinAs?.length !== 0 &&
                      !["coach", "mentor"].includes(canJoinAs) ? (
                      <Badge
                        variant={"secondary"}
                        className="ml-2 border border-gray-400"
                      >
                        Not Allowed
                      </Badge>
                    ) : null}
                  </Link>
                </DropdownMenuItem>
                {/* )} */}
                {/* {["coachee", "mentee"].includes(canJoinAs) && ( */}
                <DropdownMenuItem
                  disabled={
                    allCoaches.length > 0 ||
                    (canJoinAs?.length !== 0 &&
                      !["coachee", "mentee"].includes(canJoinAs))
                  }
                  asChild
                >
                  <Link
                    href={"/intake/?type=coachee"}
                    // onClick={() => {
                    //   router.push("/intake/?type=coachee");
                    // }}
                    className="flex flex-row items-center justify-center"
                  >
                    Join as Coachee or Mentee
                    {allCoaches.length > 0 ? (
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
                    ) : canJoinAs?.length !== 0 &&
                      !["coachee", "mentee"].includes(canJoinAs) ? (
                      <Badge
                        variant={"secondary"}
                        className="ml-2 border border-gray-400"
                      >
                        Not Allowed
                      </Badge>
                    ) : null}
                  </Link>
                </DropdownMenuItem>
                {/* )} */}
                <DropdownMenuItem disabled={feedbackBots.length > 0} asChild>
                  <Link
                    href={"/intake/?type=feedback"}
                    // onClick={() => {
                    //   router.push("/intake/?type=feedback");
                    // }}
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
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}
      <div id="list" className="min-h-screen w-full max-sm:px-2">
        <div className="my-4">
          <p className="font-semibold text-gray-500 max-sm:text-sm">
            We enable deep and meaningful coaching conversations with AI
            assistance even when life gets busy!
          </p>
        </div>
        <div id="search-filter">
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
              <p className="text-left text-xs max-sm:text-xs text-gray-600 mt-2">
                This is a combination filter. It works when the result satisfies
                each selection criterion.
              </p>
            </div>
          </div>
        </div>
        <div className="my-2 h-[2px] bg-gray-300 rounded-lg" />
        <Badge
          variant={"secondary"}
          className="rounded-sm text-center text-xs max-sm:text-xs font-normal"
        >
          Profiles with displayed coach/mentor emails use AI-generated
          responses, with an average response time of 24 hours. The real user's
          email is also kept in CC; they may choose to respond or not.
        </Badge>
        <div className="mt-2 ">
          {loading && (
            <div className="flex w-full flex-row items-center justify-center pb-12">
              <div className="mt-12 flex items-center">
                {loadingStates.icon}
                <span>{loadingStates.text} </span>
                <span className="ml-2">
                  {" "}
                  <div className="flex justify-center items-baseline space-x-2">
                    <div className="h-1 w-1 bg-gray-500 rounded-full animate-bounce animation-delay-75"></div>
                    <div className="h-1 w-1 bg-gray-500 rounded-full animate-bounce animation-delay-150"></div>
                    <div className="h-1 w-1 bg-gray-500 rounded-full animate-bounce animation-delay-225"></div>
                  </div>
                </span>
              </div>
            </div>
          )}
          <div id="participant-listing">
            {!loading &&
              coachesData.length > 0 &&
              currentCoachesData.map((coach, i) => (
                <div id={coach.profile_id} className="-z-10 mt-[-5rem] pt-20 ">
                  <div className="relative top-[26px] flex w-full flex-row justify-between">
                    <span
                      className={`z-[1] ml-4 rounded-2xl self-start border-2 border-gray-300 bg-white px-3 py-1 text-sm font-semibold text-gray-500 max-lg:text-xs max-sm:text-xs ${
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
                        className="z-[1] ml-4 mr-4 rounded-2xl  self-end border-2 border-gray-300 bg-white px-3 py-1 text-sm font-semibold text-gray-500 max-lg:text-xs max-sm:text-xs"
                      >
                        {coach.name.replace(/\s/g, "").toLowerCase() +
                          coach.id +
                          "@coachbots.com"}
                      </span>
                    )}
                    {(coach.profile_type === "icons_by_ai" ||
                      coach.profile_type === "coachee" ||
                      coach.profile_type === "mentee") && (
                      <span className="z-[1] ml-4 mr-4 rounded-2xl  self-end border-2 border-gray-300 bg-white px-3 py-1 text-sm font-semibold text-gray-500 max-lg:text-xs max-sm:text-xs">
                        Not Applicable
                      </span>
                    )}
                  </div>
                  <div
                    id={coach.id_for_target_selection}
                    className={`my-3 flex w-full flex-row gap-6  rounded-lg border p-8 ${
                      coach.profile_type === "icons_by_ai" &&
                      "border-gray-800 shadow-lg"
                    }`}
                  >
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
                      <p className="flex items-center text-wrap justify-center gap-2 text-left text-2xl font-semibold text-gray-700 max-sm:text-sm">
                        {convertTextToCorrectFormat(coach.name)}{" "}
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
                            {coach.profile_type === "icons_by_ai"
                              ? "Icons by AI"
                              : convertTextToCorrectFormat(coach.profile_type)}
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-row max-sm:flex-col max-lg:flex-col items-center max-sm:items-start max-lg:items-start justify-start gap-2 max-sm:gap-1">
                        {coach.profile_type !== "coachee" &&
                          coach.profile_type !== "mentee" && (
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
                          )}
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
                      <p className="my-1.5 text-left w-full text-sm font-light max-sm:my-1 max-sm:text-xs">
                        {coach.description}
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
                        {coach.status === "accepted" && (
                          <Button
                            disabled
                            variant={"outline"}
                            className="max-sm:text-sm max-sm:w-full border border-green-300 bg-green-100"
                          >
                            Connected
                          </Button>
                        )}
                        {(coach.profile_type === "coach" ||
                          coach.profile_type === "mentor" ||
                          coach.profile_type === "coach-mentor") && (
                          <>
                            {coach.status === "pending" && (
                              <Button
                                disabled
                                variant={"outline"}
                                className=" max-sm:text-sm max-sm:w-full border border-gray-300"
                              >
                                Requested
                              </Button>
                            )}
                            <>
                              {coacheeId.length > 0 && (
                                <>
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
                            </>
                          </>
                        )}
                        {coach.avatar_bot_url !== null &&
                          coach.avatar_bot_url !== "" && (
                            <div className="max-sm:w-full">
                              <Button
                                variant={"secondary"}
                                className="w-fit border border-gray-300 bg-[#2DC092] hover:bg-[#74d9b9d2] font-bold text-white max-sm:w-full max-sm:text-sm"
                                disabled={
                                  coach.profile_type !== "icons_by_ai" &&
                                  coacheeId.length === 0
                                }
                                asChild={coacheeId.length !== 0}
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
          </div>
          {coachesData.length > 10 && (
            <Pagination id="page" className="my-10 max-sm:text-xs">
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
                {coachesData.length === 0 && (
                  <>
                    <span>
                      The existing choices are too narrow. Please use lesser
                      search parameters.
                    </span>
                  </>
                )}
                {parentCheckedValues.includes("External") ||
                  (parentCheckedValues.includes("accepted") && (
                    <div className="flex flex-col gap-2">
                      {parentCheckedValues.includes("accepted") &&
                        connectedCoaches.length === 0 && (
                          <span>
                            You do not have any connections yet. Keep exploring.
                          </span>
                        )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Coaches;
