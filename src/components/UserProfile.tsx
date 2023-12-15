"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Link2, Loader } from "lucide-react";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";

const subdomain = typeof window !== 'undefined' ? window.location.hostname.split('.')[0] : null;
// const devUrl = "https://coach-api-ovh.coachbots.com/api/v1";
const devUrl = "https://coach-api-gcp.coachbots.com/api/v1";
const prodUrl = "https://coach-api-prod-ovh.coachbots.com/api/v1";
const baseURL = subdomain === 'playground' ? devUrl : prodUrl;


const UserProfile = ({
  userName,
  userEmail,
}: {
  userName: string;
  userEmail: string;
}) => {
  const [candidateReportUrl, setCandidateReportUrl] = useState("");
  const [testAttempedCount, setTestAttemptedCount] = useState();
  const pathname = useRouter()

  useEffect(() => {
    if(!userEmail){
      pathname.push("/api/auth/login")
    }
    try {
      fetch(`${baseURL}/accounts/`, {
        method: "POST",
        headers: {
          Authorization: `Basic Yzc3MjFmZGItYTllMC00YTYxLWEzMTYtNDRhODA1N2VkMjY0OjhjNWNlZWZlLTY2Y2QtNDliZi04MTY5LTBhNjMwMmU5NmZlMA==`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_context: {
            name: userName,
            role: "member",
            user_attributes: {
              tag: "deepchat_profile",
              attributes: {
                username: "web_user",
                email: userEmail,
              },
            },
          },
          identity_context: {
            identity_type: "deepchat_unique_id",
            value: userEmail,
          },
        }),
      })
        .then((response) => response.json())
        .then(async (data) => {
          const userId = data.uid;
          await fetch(`${baseURL}/frontend-auth/get-report-url/`, {
            method: "POST",
            headers: {
              Authorization: `Basic Yzc3MjFmZGItYTllMC00YTYxLWEzMTYtNDRhODA1N2VkMjY0OjhjNWNlZWZlLTY2Y2QtNDliZi04MTY5LTBhNjMwMmU5NmZlMA==`,
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
                    Authorization: `Basic Yzc3MjFmZGItYTllMC00YTYxLWEzMTYtNDRhODA1N2VkMjY0OjhjNWNlZWZlLTY2Y2QtNDliZi04MTY5LTBhNjMwMmU5NmZlMA==`,
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
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="mt-4 mb-4">
        <div className="flex flex-row items-center">
          <p className="text-lg font-mono max-sm:text-base">Name </p>
          <p className="p-3 bg-accent bg-opacity-60 w-full rounded-lg ml-7">
            {userName}
          </p>
        </div>
        <div className="flex flex-row items-center mt-4">
          <p className="text-lg font-mono max-sm:text-base">Email </p>
          <p className="p-3 bg-accent bg-opacity-60 w-full rounded-lg ml-4">
            {userEmail}
          </p>
        </div>
      </div>
      <hr />
      <div className="my-4 flex flex-row items-center max-sm:justify-between">
        <p className="text-lg font-mono">History</p>
        <>
          {testAttempedCount !== 0 ? (
            <>
              <Button className="ml-8 ">
                {candidateReportUrl && candidateReportUrl.length !== 0 ? (
                  <>
                    <Link href={candidateReportUrl} target="_blank">
                      Participant Report{" "}
                      <Link2 className="h-4 w-4 ml-2 inline" />
                    </Link>
                  </>
                ) : (
                  <Loader className="h-4 w-4 animate-spin" />
                )}
              </Button>
            </>
          ) : (
            <>
              <Badge variant={"destructive"} className="ml-8">
                Not attended any session.
              </Badge>
            </>
          )}
        </>
      </div>
    </>
  );
};

export default UserProfile;
