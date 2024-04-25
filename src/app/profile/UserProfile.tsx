"use client";

import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { Link2, Loader } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { useRouter } from "next/navigation";
import {
  PartifipantsforLeaderBoardTypes,
  baseURL,
  basicAuth,
  convertTextToCorrectFormat,
  getUserAccount,
} from "@/lib/utils";
import HelpMode from "@/components/HelpMode";

interface PositionedUserTypes {
  name: string;
  user_id: string;
  total_count: number;
  rating: number;
}

interface KudosDetailsType {
  bot_name: string;
  owner_name: string;
  positive_feedback_count: number;
  negative_feedback_count: number;
  rating: number;
  user_id: string;
  total_users: number;
}

const UserProfile = ({ user }: any) => {
  const [candidateReportUrl, setCandidateReportUrl] = useState("");
  const [testAttempedCount, setTestAttemptedCount] = useState();
  const pathname = useRouter();
  const [userRole, setUserRole] = useState("");

  const [userPositionDetails, setUserPositionDetails] = useState<
    PositionedUserTypes[]
  >([]);

  const [userKudosData, setUserKudosData] = useState<KudosDetailsType[]>([]);
  const [totalUsersForFeedback, setTotalUsersForFeedback] = useState();

  const [plLoading, setplLoading] = useState(true);
  const getLeaderboardPosition = (userId: string, profileType: string) => {
    fetch(
      `${baseURL}/accounts/participant-leader-board-report/?email=${user.email}&by_category=true`,
      {
        method: "GET",
        headers: {
          Authorization: basicAuth,
        },
      }
    )
      .then((res) => res.json())
      .then((dataa) => {
        console.log(dataa);

        if (profileType === "coach" || profileType === "mentor") {
          dataa = dataa.coach_mentor;
        } else if (profileType === "coachee" || profileType === "mentee") {
          dataa = dataa.coachee_mentee;
        } else {
          dataa = dataa.full_data;
        }

        const userDetails = dataa.map(
          (data: PartifipantsforLeaderBoardTypes, i: number) => {
            return {
              name: data.name,
              user_id: data.user_id,
              total_count: dataa.length,
              rating: data.total_score === 0 ? dataa.length : data.rating,
            };
          }
        );

        const positionedUser: PositionedUserTypes[] = userDetails.filter(
          (userr: PositionedUserTypes) => userr.user_id === userId
        );

        console.log(positionedUser);
        setUserPositionDetails(positionedUser);
        setplLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setplLoading(false);
      });
  };

  const [kudosLoading, setKudosLoading] = useState(true);
  const getKudosCounts = (userId: string) => {
    fetch(
      `${baseURL}/accounts/feedback-leaderboard-report/?email=${user.email}`,
      {
        method: "GET",
        headers: {
          Authorization: basicAuth,
        },
      }
    )
      .then((res) => res.json())
      .then((dataa) => {
        console.log("lead", dataa, user.email);

        const FilteredUserDataForKudos = dataa.group.filter(
          (data: KudosDetailsType) => {
            if (data.user_id === userId) {
              return {
                ...data,
                total_users: dataa.group.length,
              };
            }
          }
        );
        console.log(FilteredUserDataForKudos);
        setTotalUsersForFeedback(dataa.group.length);
        setUserKudosData(FilteredUserDataForKudos);
        setKudosLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setKudosLoading(false);
      });
  };

  useEffect(() => {
    if (!user) {
      pathname.push("/api/auth/login");
    }
    try {
      if (user) {
        getUserAccount(user)
          .then((response) => response.json())
          .then(async (data) => {
            console.log("user_profile", data);
            const userId = data.uid;
            setUserRole(data.role);
            await fetch(`${baseURL}/frontend-auth/get-report-url/`, {
              method: "POST",
              headers: {
                Authorization: basicAuth,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_id: data.uid,
                report_type: "participantReport",
                candidate_id: data.uid,
              }),
            })
              .then((response) => response.json())
              .then(async (data) => {
                setCandidateReportUrl(data.url);
                await fetch(
                  `${baseURL}/test-attempt-sessions/get-attempted-test-list/?user_id=${userId}`,
                  {
                    method: "GET",
                    headers: {
                      Authorization: basicAuth,
                      "Content-Type": "application/json",
                    },
                  }
                )
                  .then((response) => response.json())
                  .then((data) => {
                    setTestAttemptedCount(data["data"]["total_session"]);
                  })
                  .catch((error) => {
                    console.error(`Error in getAttemptedTestList: ${error}`);
                  });
              })
              .catch((error) => {
                console.error("Error getting report", error);
              });
            getLeaderboardPosition(data.uid, data.profile_type);
            getKudosCounts(data.uid);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const HelpModeSteps: {
    target: string;
    content: any;
  }[] = [
    {
      target: "#session-reports",
      content:
        " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quidem dolorum, corrupti sequi quibusdam ipsam itaque labore ad aliquam, tempora dicta? Ut nam quo sit enim minima aut alias itaque aliquid laborum et rerum quia expedita doloremque magni, aliquam tempore ad sint, explicabo temporibus facere sunt. Pariatur animi repellendus officiis.",
    },
    {
      target: "#personal-leaderboard",
      content:
        " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quidem dolorum, corrupti sequi quibusdam ipsam itaque labore ad aliquam, tempora dicta? Ut nam quo sit enim minima aut alias itaque aliquid laborum et rerum quia expedita doloremque magni, aliquam tempore ad sint, explicabo temporibus facere sunt. Pariatur animi repellendus officiis.",
    },
    {
      target: "#kudos-board",
      content:
        " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quidem dolorum, corrupti sequi quibusdam ipsam itaque labore ad aliquam, tempora dicta? Ut nam quo sit enim minima aut alias itaque aliquid laborum et rerum quia expedita doloremque magni, aliquam tempore ad sint, explicabo temporibus facere sunt. Pariatur animi repellendus officiis.",
    },
    {
      target: "#directory-profile",
      content:
        " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quidem dolorum, corrupti sequi quibusdam ipsam itaque labore ad aliquam, tempora dicta? Ut nam quo sit enim minima aut alias itaque aliquid laborum et rerum quia expedita doloremque magni, aliquam tempore ad sint, explicabo temporibus facere sunt. Pariatur animi repellendus officiis.",
    },
  ];

  return (
    <div className="bg-accent p-2 mt-2 rounded-md w-full">
      <HelpMode steps={HelpModeSteps} />
      <div className="pl-4 max-sm:pl-2 pt-2 flex flex-row items-center ">
        <p>Account Information </p>
        {/* <span className="">
          <Badge className="ml-4">{convertTextToCorrectFormat(userRole)}</Badge>
        </span> */}
      </div>
      <div className="text-sm px-4 max-sm:px-2">
        <div className="mt-4 mb-4">
          <div className="flex flex-row items-center">
            <p className="text-md ">Name </p>
            <p className="p-3 bg-accent bg-opacity-60 w-full rounded-lg ml-4 border">
              {`${user.given_name} ${user.family_name ? user.family_name : ""}`}
            </p>
          </div>
          <div className="flex flex-row items-center mt-4">
            <p className="text-sm w-fit ">Email </p>
            <p className="p-3 bg-accent bg-opacity-60 w-full rounded-lg ml-5 border">
              {user.email}
            </p>
          </div>
        </div>
        <div
          id="session-reports"
          className="my-4 w-fit flex flex-row items-center"
        >
          <p className="text-sm">Session Reports</p>
          <>
            <Button
              disabled={testAttempedCount === 0}
              className="ml-8  max-sm:ml-1 w-fit max-sm:p-1 max-sm:text-xs"
            >
              {candidateReportUrl && candidateReportUrl.length !== 0 ? (
                <>
                  <Link
                    className="flex flex-row items-center justify-center ml-2 max-sm:ml-1"
                    href={candidateReportUrl}
                    target="_blank"
                  >
                    <p className="w-fit">Participant Report</p>{" "}
                    <Link2 className={`h-4 w-4 ml-2 inline`} />
                  </Link>
                </>
              ) : (
                <Loader className="h-4 w-4 animate-spin" />
              )}
            </Button>
          </>
        </div>
        <hr />
        <div className="mt-4 mb-4">
          <div
            id="personal-leaderboard"
            className="flex flex-row items-center  mt-4 w-fit"
          >
            <p className="text-sm max-sm:text-xs min-w-fit">
              Personal Leaderboard :{" "}
            </p>
            <Badge variant={"outline"} className="ml-4 p-2">
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
              <p className="text-sm text-left  max-sm:w-full">Kudos : </p>
              {kudosLoading ? (
                <>
                  <Loader className="animate-spin ml-4 m-1 w-4 h-4" />
                </>
              ) : (
                <>
                  {userKudosData[0] ? (
                    <div className="max-sm:flex max-sm:mt-2 max-sm:gap-2 max-sm:flex-col">
                      <Badge variant={"outline"} className="ml-4 p-2">
                        {" "}
                        Positive Feedback count :{" "}
                        {userKudosData[0].positive_feedback_count}{" "}
                      </Badge>
                      <Badge variant={"outline"} className="ml-4 p-2">
                        {" "}
                        Negetive Feedback count :{" "}
                        {userKudosData[0].negative_feedback_count}{" "}
                      </Badge>
                      <Badge variant={"outline"} className="ml-4 p-2">
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
