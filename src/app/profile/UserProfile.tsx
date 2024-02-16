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
  capitalizeText,
  convertTextToCorrectFormat,
  getUserAccount,
} from "@/lib/utils";

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

  const [plLoading, setplLoading] = useState(true);
  const getLeaderboardPosition = (userId: string) => {
    fetch(`${baseURL}/accounts/participant-leader-board-report/`, {
      method: "GET",
      headers: {
        Authorization: basicAuth,
      },
    })
      .then((res) => res.json())
      .then((dataa) => {
        console.log(dataa);
        const userDetails = dataa.map(
          (data: PartifipantsforLeaderBoardTypes, i: number) => {
            return {
              name: data.name,
              user_id: data.user_id,
              total_count: dataa.length,
              rating: data.rating,
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
    fetch(`${baseURL}/accounts/feedback-leaderboard-report/`, {
      method: "GET",
      headers: {
        Authorization: basicAuth,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        // if (data.group) {
        //   const sortedFeedbackData: FeedbacksType[] = data.group.sort(
        //     (a, b) => b.positive_feedback_count - a.positive_feedback_count
        //   )
        //   setFeedbacks(sortedFeedbackData)
        // } else {
        //   setFeedbacks([])
        // }
        setUserKudosData([]);
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
      getUserAccount(user)
        .then((response) => response.json())
        .then(async (data) => {
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
          getLeaderboardPosition(data.uid);
          getKudosCounts(data.uid);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="bg-accent p-2 mt-2 rounded-md w-full">
      <div className="pl-4 max-sm:pl-2 pt-2">Account Information</div>
      <div className="text-sm px-4 max-sm:px-2">
        <div className="mt-4 mb-4">
          <div className="flex flex-row items-center">
            <p className="text-md ">Name </p>
            <p className="p-3 bg-accent bg-opacity-60 w-full rounded-lg ml-4 border">
              {user.given_name}
            </p>
          </div>
          <div className="flex flex-row items-center mt-4">
            <p className="text-sm w-fit ">Email </p>
            <p className="p-3 bg-accent bg-opacity-60 w-full rounded-lg ml-5 border">
              {user.email}
            </p>
          </div>
          {/* <div className="flex flex-row items-center mt-4">
            <p className="text-sm ">User role </p>
            <Badge className="ml-4">
              {convertTextToCorrectFormat(userRole)}
            </Badge>
          </div> */}
        </div>
        <div className="my-4 flex flex-row items-center">
          <p className="text-sm">Session Reports</p>
          <>
            <Button
              disabled={testAttempedCount === 0}
              className="ml-8 max-sm:ml-1 w-fit max-sm:text-xs"
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
          <div className="flex flex-row items-center mt-4">
            <p className="text-sm ">Personal Leaderboard : </p>
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
        <div className="mt-4 mb-4">
          <div className="flex flex-row items-center mt-4">
            <p className="text-sm ">Kudos : </p>
            {kudosLoading ? (
              <>
                <Loader className="animate-spin ml-4 m-1 w-4 h-4" />
              </>
            ) : (
              <>
                {userKudosData[0] ? (
                  <>
                    <Badge variant={"outline"} className="ml-4 p-2">
                      {" "}
                      Points : 6{" "}
                    </Badge>
                    <Badge variant={"outline"} className="ml-4 p-2">
                      {" "}
                      Position : Top 4 out of 12
                    </Badge>
                  </>
                ) : (
                  <Badge variant={"destructive"} className="ml-4">
                    {" "}
                    You don't have an active feedback bot.
                  </Badge>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
