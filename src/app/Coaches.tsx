"use client";

import FilterDropDown from "@/components/FilterDropDown";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  baseURL,
  basicAuth,
  findCoachUID,
  findCoacheeUID,
  formatTimeWithAmPm,
  getUserAccount,
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
  Info,
  Loader,
  Search,
  Star,
  ThumbsUp,
  UserCogIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { connectionType } from "@/lib/types";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { UseHelpMode } from "@/lib/helpmodeContext";
import Joyride from "react-joyride";
import { Tooltip } from "antd";
import { GoogleGeminiEffectND } from "@/components/ui/GoogleGeminiEffect";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/ui/card-hover-effect";
import { ParticipantListItemCard } from "@/components/ui/ParticipantListItemCard";
import { useUser } from "@/context/UserContext";

export interface CoachesDataType {
  id: number;
  name: string;
  profile_id: string;
  department: string;
  bot_type: string;
  bot_tag: string | null;
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
  user_id?: string;
  email?: string;
  id_for_target_selection?: string;
  bot_uid?: string;
  custom_user_bot_id?: string;
  is_recommended?: boolean;
  meeting_availability: {
    from: string;
    to: string;
    scheduling_link: string;
    days_selected: string;
  } | null;
  subject_specific_bot_url?: string;
  subject_specific_bot_id?: string;
  subject_specific_bot_snippit?: string;
}

interface FilterCategoriesType {
  filterName: string;
  filterOptions: string[];
}

function addIdForTargetSelection(
  profiles: CoachesDataType[],
  HelpModeSteps: any[],
  dynamicHelpText: any
) {
  let firstIconsByAiFound = false;
  let firstCoacheeFound = false;
  let firstCoachFound = false;

  profiles.forEach((profile) => {
    if (profile.profile_type === "icons_by_ai" && !firstIconsByAiFound) {
      profile.id_for_target_selection = "first_icons_by_ai";
      firstIconsByAiFound = true;
    } else if (profile.profile_type === "coachee" && !firstCoacheeFound) {
      profile.id_for_target_selection = "first_coachee_profile";
      firstCoacheeFound = true;
    } else if (
      (profile.profile_type === "coach" ||
        profile.profile_type === "mentor" ||
        profile.profile_type === "coach-mentor") &&
      profile.feedback_wall !== null &&
      !firstCoachFound
    ) {
      profile.id_for_target_selection = "first_coach_profile";
      firstCoachFound = true;

      HelpModeSteps.push(
        {
          target: "#first_coach_profile",
          content: dynamicHelpText?.first_coach_profile
            ? dynamicHelpText?.first_coach_profile
            : "The avatar or bot representation of the coach or mentor which is used as a primary medium of coaching.",
          placement: "auto",
        },
        {
          target: "#email",
          content: dynamicHelpText?.email
            ? dynamicHelpText.email
            : "The avatar of the email via which the conversation can happen without leaving the inbox! (The coach or mentor acceptance is mandatory) The actual coach is copied in the emails and may intervene anytime but the conversation is actually happening with their avatars. ",
        },
        {
          target: "#reviews",
          disableScrolling: true,
          content: dynamicHelpText?.reviews
            ? dynamicHelpText.reviews
            : "Coaches and Mentors can get review ratings from anyone in the network. ",
        },
        {
          target: "#feedback",
          disableScrolling: true,
          content: dynamicHelpText?.feedback
            ? dynamicHelpText.feedback
            : "Available for those participants who join a peer feedback network. The users can  showcase feedback from anyone and take action on private critical feedback for improvement. ",
        }
      );
    }
  });

  return profiles;
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
}: // coachesDataa,
// UserJoiningPreviledges,
// userConnections,
// clientDepartments,
// clientExpertise,
// restrictedFeatures,
// restrictedPages,
// headings,
// helpModeText,
{
  user: KindeUser | null;
  coachesDataa: CoachesDataType[];
  UserJoiningPreviledges: any;
  userConnections: any;
  clientDepartments: any;
  clientExpertise: any;
  restrictedPages: string | null;
  restrictedFeatures: string | null;
  headings: {
    heading: string | null;
    subHeading: string | null;
    tagLine: string | null;
  } | null;
  helpModeText: any;
}) => {
  const router = useRouter();
  const params = useSearchParams();
  const coacheeIdFromParams =
    params.get("coachee_id") ?? params.get("coach_id");

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

  // const [userId, setUserId] = useState("");
  // const [loading, setLoading] = useState(true);

  // const [loadingStates, setLoadingStates] = useState({
  //   icon: <UserCogIcon className="h-4 w-4 mr-2" />,
  //   text: "Refreshing Profile Avatars",
  // });

  const [coacheeId, setCoacheeId] = useState("");
  const [coachId, setCoachId] = useState("");
  // const [feedbackBots, setFeedbackBots] = useState<any[]>([]);
  // const [connections, setConnections] = useState<connectionType[]>([]);

  const [buttonLoading, setButtonLoading] = useState(false);

  const [dynamicHelpText, setDynamicHelpText] = useState<any>();
  const [HelpModeSteps, setHelpModeSteps] = useState<any[]>([]);

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

  const {
    directoryProfiles,
    userInfo: {
      restrictedFeatures,
      restrictedPages,
      headings,
      helpText: helpModeText,
      clientDepartments,
      clientExpertise,
    },
    userId,
    coachId: coachID,
    coacheeId: coacheeID,
    joiningPrevileges: UserJoiningPreviledges,
    userConnections: connections,
    allCoaches,
    feedbackBots,
    getAllConnectionsData,
  } = useUser();

  const getCoachesData = async (profiles: CoachesDataType[]) => {
    console.log("data", profiles);
    const data = profiles.sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
    );

    console.log("data", data);
    const iconsByAiProfiles = data.filter(
      (profile: CoachesDataType) => profile.profile_type === "icons_by_ai"
    );

    const allOtherProfiles = data?.filter(
      (profile: CoachesDataType) =>
        profile.bot_type !== "coachbots" &&
        profile.profile_type !== "icons_by_ai"
    );

    const ownProfile = [...iconsByAiProfiles, ...allOtherProfiles].filter(
      (coach: CoachesDataType) => coach.email === user?.email
    );
    const restProfiles = [...iconsByAiProfiles, ...allOtherProfiles].filter(
      (coach: CoachesDataType) => coach.email !== user?.email
    );

    setSavedCoachesData([...iconsByAiProfiles, ...allOtherProfiles]);
    setCoachesData([...iconsByAiProfiles, ...allOtherProfiles]);

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

    console.log("HELLO DTA : ", clientDepartments, clientExpertise);

    const totalExpertise =
      clientExpertise !== null && clientExpertise !== ""
        ? clientExpertise.split(",")
        : [
            "Leadership Development",
            "Stress Management",
            "Hiring & Recruitment",
            "People Management",
            "Diversity & Inclusion",
            "Career Navigation",
            "Culture Alignment",
            "Workplace Skills",
          ];

    console.log(totalExpertise);

    setCoachSkillsExpertise([...skillsOptions, ...totalExpertise]);

    setFilterCategories([
      {
        filterName: "Profile Type",
        filterOptions: [
          "coach",
          // "mentor",
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
          clientDepartments !== null && clientDepartments !== ""
            ? clientDepartments.split(",")
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
          clientExpertise !== null && clientExpertise !== ""
            ? clientExpertise.split(",")
            : [
                "Leadership Development",
                "Stress Management",
                "Hiring & Recruitment",
                "People Management",
                "Diversity & Inclusion",
                "Career Navigation",
                "Culture Alignment",
                "Workplace Skills",
              ],
      },
    ]);
  };

  // const [allCoaches, setAllCoaches] = useState<CoachesDataType[]>([]);
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
      // getClientInfoForUser(user?.email!);
      // console.log("COACHES DATA : ", coachesDataa);
      getCoachesData(directoryProfiles);

      const dynamicHelpTextt = helpModeText?.network_directory;
      setDynamicHelpText(helpModeText?.network_directory);
      // const DynHelpText = ;
      //helpmode text
      setHelpModeSteps([
        {
          target: "#header-text",
          content: dynamicHelpTextt?.header_text
            ? dynamicHelpTextt.header_text
            : "The directory contains the internal company coaches (and their avatars) and external coaches (only avatars). If internal coaches accept connection, their avatar is also accessible via email.  It also contains the coachees and mentees as well. ",
        },
        {
          target: "#join-the-network",
          content: dynamicHelpTextt?.join_the_network
            ? dynamicHelpTextt.join_the_network
            : "As a user, you can join as a coach or coachee/mentee. You can also join a peer feedback network to demonstrate the accolades you receive and collect 360-degree peer feedback. Certain features may not work if you do not join the networks. ",
        },
        {
          target: "#search-filter",
          content: dynamicHelpTextt?.search_filter
            ? dynamicHelpTextt.search_filter
            : "The directory can be sorted by experience level, expertise and department of the participants. These are customizable and configured during the set up. Our AI Recommendation feature suggests the best coach or AI Coaching Agent Avatars which are tailored to you profile.",
        },
        {
          target: "#ai-recc",
          content: dynamicHelpTextt?.ai_reccomentation
            ? dynamicHelpTextt.ai_reccomentation
            : "Our AI Recommendation feature suggests the best coach or AI Coaching Agent Avatars which are tailored to you profile.",
        },
        {
          target: "#participant-listing",
          content: dynamicHelpTextt?.participant_listing
            ? dynamicHelpTextt.participant_listing
            : `All participants are listed. Coach, coachees, and mentees. Coach  can have dual role profiles as well. "AI Coaching Agent" are external coaches  whose AI avatars are only available. (For confidentiality, personally identifiable information is removed). The listings can also be sorted by your approved connections - it happens when both members agree to connect off platform as well.`,
        },
      ]);

      setCoachId(coachID);
      setCoacheeId(coacheeID);
      // getUserAccount(user)
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log(data);
      //     setUserId(data.uid);
      //     getCanJoinAs(user?.email!);
      //     fetch(
      //       `${baseURL}/accounts/coach-coachee-mentor-mentee-profile/?user_id=${data.uid}`,
      //       {
      //         method: "GET",
      //         headers: {
      //           Authorization: basicAuth,
      //         },
      //       }
      //     )
      //       .then((res) => res.json())
      //       .then((data) => {
      //         console.log(data);

      //         setAllCoaches(data.data);
      //         setButtonLoading(false);

      //         const isApprovedData = data.data.filter(
      //           (coachData: any) => coachData.is_approved === true
      //         );

      //         if (isApprovedData.length > 0) {
      //           setCoacheeId(findCoacheeUID(isApprovedData));
      //           setCoachId(findCoachUID(isApprovedData));
      //         } else {
      //           setCoacheeId("");
      //           setCoachId("");
      //         }
      //         setLoading(false);
      //       })
      //       .then((err) => {
      //         setButtonLoading(false);
      //         console.error(err);
      //         setLoading(false);
      //       });

      //     fetch(`${baseURL}/accounts/get-bots/?user_id=${data.uid}`, {
      //       headers: {
      //         Authorization: basicAuth,
      //       },
      //     })
      //       .then((res) => res.json())
      //       .then((data) => {
      //         console.log(`/get-bots/?user_id=${data.uid}`, data);

      //         const FeedbackBot = data.data.filter(
      //           (data: any) => data.signature_bot.bot_type === "feedback_bot"
      //         );
      //         setFeedbackBots(FeedbackBot);
      //       })
      //       .catch((err) => {
      //         console.error(err);
      //       });
      //   });
    }
  }, [coachID, coacheeID]);

  function filterData(
    inputArray: CoachesDataType[],
    filterArray: string[]
  ): CoachesDataType[] {
    if (filterArray.length === 0) {
      return inputArray;
    }

    if (filterArray.includes("recommended")) {
      return inputArray
        .filter((coach) => coach.is_recommended)
        .filter((obj) => {
          return filterArray
            .filter((searchStr) => searchStr !== "recommended")
            .every((filter) => {
              for (const prop in obj) {
                if (
                  obj.hasOwnProperty(prop) &&
                  obj[prop as keyof CoachesDataType] &&
                  prop !== "description" // Skip filtering for the "description" property
                ) {
                  const propValue =
                    obj[
                      prop as keyof CoachesDataType
                    ]!.toString().toLowerCase();
                  if (propValue.includes(filter.toLowerCase())) {
                    return true;
                  }
                }
              }
              return false;
            });
        });
    } else {
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
  }

  const [connectedCoaches, setConnectedCoaches] = useState<CoachesDataType[]>(
    []
  );
  const handleUpdateCheckedValues = (
    newValuesId: string[],
    silentUpdate?: string
  ) => {
    const newValues = newValuesId.map((ch) => ch.trim());
    if (!silentUpdate) {
      setCurrentPage(1);
    }
    setParentCheckedValues(newValues);
    console.log(newValues);
    if (newValues.length > 0 && newValues[0].length === 0) {
      setParentCheckedValues([]);
    }
    console.log("COACHES DATA IN FILTER : ", coachesData);
    console.log("SAVEDCOACHES DATA IN FILTER : ", savedCoachesData);
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
    } else if (newValues.includes("recommended")) {
      const filteredData = filterData(
        newValues.includes("Connected")
          ? coachesData.filter((coach) => coach.is_recommended)
          : savedCoachesData.filter((coach) => coach.is_recommended),
        newValues
      );
      // const filteredData =
      newValues.includes("Connected")
        ? coachesData.filter((coach) => coach.is_recommended)
        : savedCoachesData.filter((coach) => coach.is_recommended);
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
          const connection = connections?.find(
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

      //Own profile on top
      const ownProfile = [...connectedCoaches, ...unconnectedCoaches].filter(
        (coach: CoachesDataType) => coach.email === user?.email
      );
      const restProfiles = [...connectedCoaches, ...unconnectedCoaches].filter(
        (coach: CoachesDataType) => coach.email !== user?.email
      );

      setConnectedCoaches(connectedCoaches);
      setCoachesData(
        addIdForTargetSelection(
          [...ownProfile, ...restProfiles],
          HelpModeSteps,
          dynamicHelpText
        )
      );
      setSavedCoachesData(
        addIdForTargetSelection(
          [...ownProfile, ...restProfiles],
          HelpModeSteps,
          dynamicHelpText
        )
      );
    } else if (coachId.length > 0) {
      const coachesWithStatus = savedCoachesData.map(
        (coach: CoachesDataType) => {
          const connection = connections?.find(
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

      //Own profile on top
      const ownProfile = [...connectedCoaches, ...unconnectedCoaches].filter(
        (coach: CoachesDataType) => coach.email === user?.email
      );
      const restProfiles = [...connectedCoaches, ...unconnectedCoaches].filter(
        (coach: CoachesDataType) => coach.email !== user?.email
      );

      setConnectedCoaches(connectedCoaches);
      setCoachesData(
        addIdForTargetSelection(
          [...ownProfile, ...restProfiles],
          HelpModeSteps,
          dynamicHelpText
        )
      );
      setSavedCoachesData(
        addIdForTargetSelection(
          [...ownProfile, ...restProfiles],
          HelpModeSteps,
          dynamicHelpText
        )
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
  }, [connections, coacheeId, coachId]);

  //for state revalidation after profile actions
  useEffect(() => {
    setCoachesData(savedCoachesData);
    handleUpdateCheckedValues(parentCheckedValues, "yes");
  }, [savedCoachesData]);

  useEffect(() => {
    const scrollTimer = setTimeout(() => {
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

  const RequestionConnection = ({
    coachId,
    requestStatus,
    stateCoachId,
  }: {
    coachId: string;
    requestStatus: string;
    stateCoachId: string;
  }) => {
    const [requestLoading, setRequestLoading] = useState(false);
    const [status, setStatus] = useState(requestStatus);

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
              throw new Error("Error while sending connection request!");
            } else {
              const updatedCoachesData = savedCoachesData.map((coach) =>
                coach.profile_id === coachId
                  ? { ...coach, status: "pending" }
                  : coach
              );
              setStatus("pending");
              console.log(updatedCoachesData);

              setSavedCoachesData(updatedCoachesData);
              setTimeout(() => {
                getAllConnectionsData();
              }, 5000);
            }
            setTimeout(() => {
              setRequestLoading(false);
            }, 1000);
          })
          .catch((err) => {
            console.log(err);
            toast.error("Error while sending your request!");
            setRequestLoading(false);
            throw new Error("Error while sending your request!");
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
          disabled={
            requestLoading || status === "pending" || status === "Requested"
          }
          variant={"outline"}
          className="max-sm:w-full max-md:w-full max-lg:w-full border border-gray-300 max-sm:text-sm"
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
            <>
              <>{!status && "Request Connection"}</>
              <>{status === "pending" && "Requested"}</>
              <>{status === "accepted" && "Accepted"}</>
            </>
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

          const updatedCoachesData = savedCoachesData.map((coach) =>
            coach.profile_id === coachId
              ? {
                  ...coach,
                  total_rating: data.total_ratings,
                  rating: data.average_rating,
                }
              : coach
          );
          setSavedCoachesData(updatedCoachesData);
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

          const updatedCoachesData = savedCoachesData.map((coach) =>
            coach.profile_id === profile_id
              ? { ...coach, admirer_ids: [...coach.admirer_ids, userId] }
              : coach
          );
          setSavedCoachesData(updatedCoachesData);

          setInitiated(false);
        })
        .catch((err) => {
          console.error(err);

          throw new Error("Error in likes");
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
          is_revert: "true",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setIsLiked(false);
          setLikeCount((prevCount) => prevCount - 1);

          const updatedCoachesData = savedCoachesData.map((coach) =>
            coach.profile_id === profile_id
              ? {
                  ...coach,
                  admirer_ids: coach.admirer_ids.filter((id) => id !== userId),
                }
              : coach
          );
          setSavedCoachesData(updatedCoachesData);

          setInitiated(false);
        })
        .catch((err) => {
          console.error(err);

          throw new Error("Error in likes");
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
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const { helpModeState, updateHelpModeState } = UseHelpMode();
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <MaxWidthWrapper className="flex flex-col items-center justify-center pt-20 text-center z-50 md:px-8 lg:px-20">
      {helpModeState && (
        <Joyride
          spotlightClicks
          continuous
          locale={{ last: "End" }}
          scrollOffset={100}
          disableScrollParentFix
          callback={(callbackData) => {
            if (
              callbackData.action === "close" ||
              callbackData.action === "reset"
            ) {
              updateHelpModeState(false);
            }

            console.log(callbackData);
            if (
              callbackData.step.target === "#join-the-network" &&
              callbackData.status === "running" &&
              callbackData.action === "prev"
            ) {
              const joinTheNetwork =
                document.getElementById("join-the-network");

              window.scrollTo({ top: 0, behavior: "smooth" });
              joinTheNetwork?.scrollIntoView({
                behavior: "smooth",
              });
            }

            if (
              callbackData.lifecycle === "complete" &&
              callbackData.step.target === "#feedback"
            ) {
              updateHelpModeState(false);
            }

            // if (
            //   callbackData.step.target === "#search-filter" &&
            //   callbackData.action === "next"
            // ) {
            //   window.scrollTo({ top: 0, behavior: "smooth" });
            // }
          }}
          //@ts-ignore
          steps={HelpModeSteps}
        />
      )}
      <GoogleGeminiEffectND
        title={
          headings?.heading
            ? headings?.heading
            : "Coaching & Performance Workbench"
        }
        description={
          headings?.subHeading
            ? headings?.subHeading
            : "Peer-to-Peer Network of Leaders for Growth"
        }
        className="-pt-96"
        cta={
          <>
            {!restrictedFeatures?.includes("Join-the-network") && (
              <>
                <div
                  id="join-the-network"
                  className="my-4 flex flex-row justify-center gap-2 max-sm:flex-wrap max-sm:text-xs z-10"
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      // disabled={buttonLoading}
                      asChild
                      className="border-none outline-none "
                    >
                      <div>
                        {" "}
                        <Button
                          disabled={buttonLoading}
                          variant={"outline"}
                          className="h-fit w-fit text-xl"
                        >
                          {" "}
                          <>
                            {" "}
                            Join the network{" "}
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </>
                        </Button>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <div className="flex flex-row justify-center items-center">
                          <Button
                            variant={"link"}
                            className="flex flex-row items-center justify-center h-fit p-0 hover:cursor-pointer hover:no-underline text-gray-700"
                            disabled={
                              allCoaches.length > 0 ||
                              (canJoinAs?.length !== 0 &&
                                !["coach", "mentor"].includes(canJoinAs))
                            }
                          >
                            <Link href={"/intake/?type=coach&v=1"}>
                              Join as Coach{" "}
                              {allCoaches.length > 0 ? (
                                <>
                                  {allCoaches[0]?.is_approved ? (
                                    <>
                                      {coachId ? (
                                        <Badge className="ml-2">
                                          Already Joined
                                        </Badge>
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
                                      {allCoaches[0]?.profile_type ===
                                        "coach" ||
                                      allCoaches[0]?.profile_type ===
                                        "mentor" ||
                                      allCoaches[0]?.profile_type ===
                                        "coach-mentor" ? (
                                        <Badge className="ml-2">
                                          Requested
                                        </Badge>
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
                          </Button>
                          <Tooltip
                            overlayInnerStyle={{
                              backgroundColor: "white",
                              color: "black",
                              padding: "8px",
                            }}
                            title="You can Join the CoachBot network as a Coach Our platform facilitates coaches in forming profiles, which evolve into AI Copilots. These interactive avatars offer a unique way to connect, granting Coachees and Mentees direct access to chat functionalities and customized resources."
                          >
                            <Info className="h-5 w-5 p-[2px] hover:bg-gray-50 hover:cursor-pointer ml-2 inline" />
                          </Tooltip>
                        </div>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <div className="flex flex-row justify-center items-center">
                          <Button
                            variant={"link"}
                            disabled={
                              allCoaches.length > 0 ||
                              (canJoinAs?.length !== 0 &&
                                !["coachee", "mentee"].includes(canJoinAs))
                            }
                            className="flex flex-row items-center justify-center h-fit p-0 hover:cursor-pointer hover:no-underline text-gray-700"
                          >
                            <Link href={"/intake/?type=coachee"}>
                              Join as Coachee or Mentee
                              {allCoaches.length > 0 ? (
                                <>
                                  {allCoaches[0]?.is_approved ? (
                                    <>
                                      {coacheeId ? (
                                        <Badge className="ml-2">
                                          Already Joined
                                        </Badge>
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
                                      {allCoaches[0]?.profile_type ===
                                        "coachee" ||
                                      allCoaches[0]?.profile_type ===
                                        "mentee" ? (
                                        <Badge className="ml-2">
                                          Requested
                                        </Badge>
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
                          </Button>
                          <Tooltip
                            overlayInnerStyle={{
                              backgroundColor: "white",
                              color: "black",
                              padding: "8px",
                            }}
                            title="You can Join the CoachBot Network as Coachee or Mentee. Coachees and mentees have the ability to craft personalized profiles on our platform, through which they can interact with Coach AI Avatar and enter into feedback loop through AI analytics. "
                          >
                            <Info className="h-5 w-5 p-[2px] hover:bg-gray-50 hover:cursor-pointer ml-2" />
                          </Tooltip>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <div className="flex flex-row justify-center items-center">
                          <Button
                            variant={"link"}
                            disabled={feedbackBots.length > 0}
                            className="flex flex-row items-center justify-center h-fit p-0 hover:cursor-pointer hover:no-underline text-gray-700"
                          >
                            <Link href={"/intake/?type=feedback"}>
                              Join Feedback Network
                              {feedbackBots.length > 0 && (
                                <>
                                  {feedbackBots[0]?.signature_bot
                                    .is_approved ? (
                                    <Badge className="ml-2">
                                      Already Joined
                                    </Badge>
                                  ) : (
                                    <Badge className="ml-2">Requested</Badge>
                                  )}
                                </>
                              )}
                            </Link>
                          </Button>
                          <Tooltip
                            overlayInnerStyle={{
                              backgroundColor: "white",
                              color: "black",
                              padding: "8px",
                            }}
                            title="You can join the Feedback Network, allowing others to send and recieve the feedback. Upon joining, users complete an intake form, sharing their name, profile description, and current projects. This feature facilitates comprehensive feedback exchange among users."
                          >
                            <Info className="h-5 w-5 p-[2px] hover:bg-gray-50 hover:cursor-pointer ml-2" />
                          </Tooltip>
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            )}
          </>
        }
      />

      <div id="list" className="min-h-screen w-full max-sm:px-2 z-10">
        <div className="my-4">
          <p className="font-semibold text-xl text-gray-500 max-sm:text-sm">
            {headings?.tagLine
              ? headings.tagLine
              : "We enable deep and meaningful coaching conversations with AI assistance even when life gets busy!"}
          </p>
        </div>
        {!restrictedFeatures?.includes("Search-filter") && (
          <div id="search-filter">
            <div className="my-4">
              <div className="flex flex-row items-center rounded-md border border-gray-300 bg-white p-1.5 py-3 shadow-md  ">
                <Search className="mr-1 inline h-4 w-4" />
                <input
                  ref={searchInputRef}
                  placeholder="Search for Any Profile"
                  className="w-full border-l pl-2 text-lg outline-none max-sm:ml-1 max-sm:text-xs"
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
                  searchInputRef={searchInputRef}
                  filtersCategory={filterCategroies}
                  setParentCheckedValues={setParentCheckedValues}
                  checkedValues={parentCheckedValues}
                  onUpdateCheckedValues={handleUpdateCheckedValues}
                />
                <p className="text-left text-lg max-sm:text-xs text-gray-600 mt-2">
                  This is a combination filter. It works when the result
                  satisfies each selection criterion.
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="my-2 h-[2px] bg-gray-300 rounded-lg" />
        {/* {!restrictedFeatures?.includes("DirProfile-msg") && (
          <Badge
            variant={"secondary"}
            className="rounded-sm text-center text-base max-sm:text-xs font-normal"
          >
            Profiles that have listed emails indicate that those coaches have a
            email avatar that can respond as well. (AI responses, with 24 hour
            average response times)
          </Badge>
        )} */}

        <div className="mt-2 ">
          {/* {loading && (
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
          )} */}
          <div className="w-full"> </div>
          <div id="participant-listing">
            {coachesData.length > 0 &&
              currentCoachesData.map((coach, idx) => (
                <div
                  key={coach?.profile_id}
                  className="relative group block p-2 h-full w-full"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <AnimatePresence>
                    {hoveredIndex === idx && (
                      <motion.span
                        className="absolute inset-0 h-full w-full bg-neutral-200  block rounded-3xl"
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
                    <ParticipantListItemCard
                      schedullingLink={
                        coach.meeting_availability?.scheduling_link || ""
                      }
                      meetTime={`${formatTimeWithAmPm(
                        coach.meeting_availability?.from || ""
                      )} -  ${formatTimeWithAmPm(
                        coach.meeting_availability?.to || ""
                      )}`}
                      daysAvailable={
                        coach.meeting_availability?.days_selected || ""
                      }
                      coacheeId={coacheeId}
                      coachId={coachId}
                      coach={coach}
                      likeComponent={
                        <div className="mt-4">
                          <LikeComponent
                            profile_id={coach.profile_id}
                            likesInfo={coach.admirer_ids}
                          />
                        </div>
                      }
                      profilePicUrl={coach.profile_pic_url}
                      reviewComponent={
                        <>
                          {" "}
                          {coach.profile_type !== "coachee" &&
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
                            )}
                        </>
                      }
                      userId={userId}
                      restrictedFeatures={restrictedFeatures}
                      requestConnectionComponent={
                        <>
                          {coach.status === "accepted" ? (
                            <Button
                              disabled
                              variant={"outline"}
                              className="max-sm:text-sm max-md:w-full max-lg:w-full border border-green-300 bg-green-100"
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
                                    {coacheeId.length > 0 && (
                                      <>
                                        <RequestionConnection
                                          requestStatus={coach.status}
                                          coachId={coach.profile_id}
                                          stateCoachId={coachId}
                                        />
                                      </>
                                    )}
                                  </>
                                </>
                              )}
                            </>
                          )}
                        </>
                      }
                    />
                  </Card>
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
          {coachesData.length === 0 && (
            <div className="flex w-full flex-row items-center justify-center">
              {!restrictedFeatures?.includes("Search-filter") && (
                <div className="mt-12 flex items-center">
                  {coachesData.length === 0 && (
                    <>
                      {parentCheckedValues.includes("recommended") ? (
                        <span>
                          Currently no system recommendations available. You may
                          check back next week.
                        </span>
                      ) : (
                        <span>
                          The existing choices are too narrow. Please use lesser
                          search parameters.
                        </span>
                      )}
                    </>
                  )}
                  {parentCheckedValues.includes("External") ||
                    (parentCheckedValues.includes("accepted") && (
                      <div className="flex flex-col gap-2">
                        {parentCheckedValues.includes("accepted") &&
                          connectedCoaches.length === 0 && (
                            <span>
                              You do not have any connections yet. Keep
                              exploring.
                            </span>
                          )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Coaches;
