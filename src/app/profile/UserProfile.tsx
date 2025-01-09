"use client";

import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { ExternalLink, Loader } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { useRouter } from "next/navigation";
import { baseURL, basicAuth } from "@/lib/utils";
import HelpMode from "@/components/HelpMode";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useUser } from "@/context/UserContext";
import MeetingPrefrences from "./MeetingPreferences";
import Script from "next/script";

const UserProfile = ({ user, userRole, helpModeText }: any) => {
  const [testAttempedCount, setTestAttemptedCount] = useState();
  const pathname = useRouter();

  const [userAllowAudioInteractions, setUserAllowAudioInteractions] =
    useState(false);
  const [interactionLoading, setInteractionLoading] = useState(false);

  const [plLoading, setplLoading] = useState(false);

  const [isAllowToggle, setIsAllowToggle] = useState(false);
  const [HelpModeSteps, setHelpModeSteps] = useState<any[]>([]);

  const {
    userId,
    allowAudioInteraction: {
      client: clientAllowAudioInteractions,
      user: user_allow_audio_interactions,
    },
    candidateReport,
    userPositionDetails,
    kudosData: { totalUsersForFeedback, userKudosData },
    getAllUserData,
    coachId,
  } = useUser();

  useEffect(() => {
    if (!user) {
      pathname.push("/api/auth/login");
    }

    const dynamicHelpText = helpModeText?.profile;
    setHelpModeSteps([
      {
        target: "#session-reports",
        content: dynamicHelpText?.session_reports
          ? dynamicHelpText.session_reports
          : "While the user interacts with the bots for simulations and roleplays - a detailed feedback report is generated. All the feedback reports for the particular user can be viewed in a consolidated manner here.",
      },
      {
        target: "#personal-leaderboard",
        content: dynamicHelpText?.personal_leaderboard
          ? dynamicHelpText.personal_leaderboard
          : "Leaderboard position for the particular user depending upon the score achievement and usage.",
      },
      {
        target: "#kudos-board",
        content: dynamicHelpText?.kudos_board
          ? dynamicHelpText.kudos_board
          : "Peer feedback network stats based on feedback received from peer group.",
      },
      {
        target: "#directory-profile",
        content: dynamicHelpText?.directory_profile
          ? dynamicHelpText.directory_profile
          : "Ability to view and update directory profile, AI frames and feedback network profiles. ",
      },
      {
        target: "#mcon",
        content: dynamicHelpText?.my_connections
          ? dynamicHelpText.my_connections
          : "Connections betweeen Coach/Mentor and Coachee/Mentee",
      },
      {
        target: "#apsn",
        content: dynamicHelpText?.action_plan_session_notes
          ? dynamicHelpText.action_plan_session_notes
          : "The network participants can add session notes and action plans for each other. ",
      },
      {
        target: "#bcon",
        content: dynamicHelpText?.bot_conversations
          ? dynamicHelpText.bot_conversations
          : "Conversations with the user's AI avatar (AI-frame) or user's interaction with other bots. The feedback page bot interactions are also requested here.",
      },
      {
        target: "#mrew",
        content: dynamicHelpText?.my_rewards
          ? dynamicHelpText.my_rewards
          : "Customized reward point system customized to each client.",
      },
      {
        target: "#comp",
        content: dynamicHelpText?.competencies
          ? dynamicHelpText.competencies
          : "Pre-defined competencies and skills can be set from this section. This can be customized for each client. This will help customize the user's library based on these skills.",
      },
      {
        target: "#idp",
        content: dynamicHelpText?.idp
          ? dynamicHelpText.idp
          : "Users can generate individual development plans and simulations they should practice depending on this specific practice.",
      },
      {
        target: "#esign",
        content: dynamicHelpText?.email_sign
          ? dynamicHelpText.email_sign
          : "Email signatures for use by the coach or mentor.",
      },
    ]);

    if (clientAllowAudioInteractions) {
      setIsAllowToggle(true);
      setUserAllowAudioInteractions(user_allow_audio_interactions);
    } else {
      setIsAllowToggle(false);
    }
  }, []);

  const allowAudioInteractionHandler = (type: boolean) => {
    setInteractionLoading(true);
    fetch(`${baseURL}/accounts/update-user-account/`, {
      method: "PATCH",
      headers: {
        Authorization: basicAuth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        allow_audio_interactions: type,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.updated) {
          setUserAllowAudioInteractions(
            data.updated.user_allow_audio_interactions
          );
          localStorage.setItem("coachtalk_user_refresh", "true");
          localStorage.setItem("coachscribe_user_refresh", "true");
          toast.success("Saved your changes.");
          getAllUserData();
        } else {
          toast.error("Error, try again.");
        }
      })
      .catch((err) => {
        toast.error("Error, try again.");
        throw new Error("Error updating user preferences (audio interaction)");
        console.error(err);
      })
      .finally(() => {
        setInteractionLoading(false);
      });
  };

  if (userRole === "super_admin") {
    HelpModeSteps.push({
      target: "#admin",
      content:
        " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quidem dolorum, corrupti sequi quibusdam ipsam itaque labore ad aliquam, tempora dicta? Ut nam quo sit enim minima aut alias itaque aliquid laborum et rerum quia expedita doloremque magni, aliquam tempore ad sint, explicabo temporibus facere sunt. Pariatur animi repellendus officiis.",
    });
    HelpModeSteps.push({
      target: "#arep",
      content:
        " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quidem dolorum, corrupti sequi quibusdam ipsam itaque labore ad aliquam, tempora dicta? Ut nam quo sit enim minima aut alias itaque aliquid laborum et rerum quia expedita doloremque magni, aliquam tempore ad sint, explicabo temporibus facere sunt. Pariatur animi repellendus officiis.",
    });
  } else if (userRole === "client_admin") {
    HelpModeSteps.push({
      target: "#admin",
      content:
        " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quidem dolorum, corrupti sequi quibusdam ipsam itaque labore ad aliquam, tempora dicta? Ut nam quo sit enim minima aut alias itaque aliquid laborum et rerum quia expedita doloremque magni, aliquam tempore ad sint, explicabo temporibus facere sunt. Pariatur animi repellendus officiis.",
    });
  }

  return (
    <div className="bg-accent p-2 mt-2 rounded-md w-full">
      <HelpMode steps={HelpModeSteps} />
      <div className="pl-4 text-xl max-sm:text-sm max-sm:pl-2 pt-2 flex flex-row items-center ">
        <p>Account Information </p>
      </div>
      <div className="text-sm px-4 max-sm:px-2">
        <div className="mt-4 mb-4">
          <div className="flex flex-row items-center text-sm max-sm:text-xs">
            <p className="">Name </p>
            <p className="p-3 bg-accent bg-opacity-60 w-full rounded-lg ml-4 border">
              {`${user.given_name} ${user.family_name ? user.family_name : ""}`}
            </p>
          </div>
          <div className="flex flex-row items-center mt-4 text-sm max-sm:text-xs">
            <p className="w-fit max-sm:text-xs ">Email </p>
            <p className="p-3 bg-accent  bg-opacity-60 w-full rounded-lg ml-5 border">
              {user.email}
            </p>
          </div>
        </div>
        <div
          id="session-reports"
          className="my-4 w-fit flex flex-row items-center"
        >
          <p className="text-sm max-sm:text-xs">Session Reports</p>
          <>
            <Button
              disabled={testAttempedCount === 0}
              className="ml-8 w-fit max-sm:p-1 max-sm:text-xs max-sm:h-8 max-sm:ml-4 max-sm:px-2"
            >
              {candidateReport && candidateReport.length !== 0 ? (
                <>
                  <Link
                    className="flex flex-row items-center justify-center ml-2 max-sm:ml-1 "
                    href={candidateReport}
                    target="_blank"
                  >
                    <p className="w-fit">Participant Report</p>{" "}
                    <ExternalLink className={`h-4 w-4 ml-2 inline`} />
                  </Link>
                </>
              ) : (
                <Loader className="h-4 w-4 animate-spin" />
              )}
            </Button>
          </>
        </div>

        <>
          <hr />
          <div
            id="audio-interaction"
            className="my-4 w-fit flex flex-row items-center"
          >
            <p className="text-sm max-sm:text-xs">Bot responses in Audio</p>
            <div className="ml-8 flex flex-row items-center gap-2 text-sm max-sm:text-xs">
              <span className="text-sm max-sm:text-xs font-bold text-gray-600">
                No
              </span>
              <Switch
                id="bot-audio-interaction-switch"
                disabled={interactionLoading || !isAllowToggle}
                checked={userAllowAudioInteractions}
                onCheckedChange={(val) => {
                  console.log(val);
                  allowAudioInteractionHandler(val);
                }}
              />
              <span className="text-sm max-sm:text-xs font-bold text-gray-600">
                Yes
              </span>
            </div>
          </div>
        </>
        {coachId && (
          <>
            <hr />
            <div
              id="meetings-availability"
              className="flex flex-row items-center  my-4 w-fit"
            >
              <div className="text-sm max-sm:text-xs min-w-fit flex flex-row items-center">
                <span className="mr-4"> Your meeting preferences </span>{" "}
                <MeetingPrefrences />
              </div>
            </div>
          </>
        )}

        <hr />
        <div className="mt-4 mb-4">
          <div
            id="personal-leaderboard"
            className="flex flex-row items-center  mt-4 w-fit"
          >
            <p className="text-sm max-sm:text-xs min-w-fit">
              Personal Leaderboard :{" "}
            </p>
            <Badge
              variant={"outline"}
              className="ml-4 p-2 text-sm max-sm:text-xs"
            >
              {" "}
              {plLoading ? (
                <>
                  <Loader className="animate-spin m-1 w-4 h-4" />
                </>
              ) : (
                <>
                  {" "}
                  {userPositionDetails[0] ? (
                    <>
                      {" "}
                      Position : Top {userPositionDetails[0].rating} out of{" "}
                      {userPositionDetails[0].total_count}
                    </>
                  ) : (
                    <b className="ml-4">-</b>
                  )}
                </>
              )}
            </Badge>
          </div>
        </div>
        {userKudosData[0] && (
          <div id="kudos-board" className="mt-4 mb-4">
            <div className="flex flex-row items-center max-sm:items-start mt-4 max-sm:flex-col">
              <p className="text-sm max-sm:text-xs text-left  max-sm:w-full">
                Kudos :{" "}
              </p>
              {false ? (
                <>
                  <Loader className="animate-spin ml-4 m-1 w-4 h-4" />
                </>
              ) : (
                <>
                  {userKudosData[0] ? (
                    <div className="max-sm:flex text-sm max-sm:text-xs max-sm:mt-2 max-sm:gap-2 max-sm:flex-col">
                      <Badge
                        variant={"outline"}
                        className="ml-4 p-2 text-sm max-sm:text-xs"
                      >
                        {" "}
                        Positive Feedback count :{" "}
                        {userKudosData[0].positive_feedback_count}{" "}
                      </Badge>
                      <Badge
                        variant={"outline"}
                        className="ml-4 p-2 text-sm max-sm:text-xs"
                      >
                        {" "}
                        Negetive Feedback count :{" "}
                        {userKudosData[0].negative_feedback_count}{" "}
                      </Badge>
                      <Badge
                        variant={"outline"}
                        className="ml-4 p-2 text-sm max-sm:text-xs"
                      >
                        {" "}
                        Position : Top {userKudosData[0].rating} out of{" "}
                        {totalUsersForFeedback}
                      </Badge>
                    </div>
                  ) : (
                    <Badge variant={"destructive"} className="ml-4">
                      {" "}
                      You don't have any active feedbacks.
                    </Badge>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
