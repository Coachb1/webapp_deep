"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Link2, Loader } from "lucide-react";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";
import { baseURL, basicAuth } from "@/lib/utils";

const UserProfile = ({
  userName,
  userEmail,
}: {
  userName: string;
  userEmail: string;
}) => {
  const [candidateReportUrl, setCandidateReportUrl] = useState("");
  const [testAttempedCount, setTestAttemptedCount] = useState();
  const pathname = useRouter();

  // window.location.reload();

  useEffect(() => {
    if (!userEmail) {
      pathname.push("/api/auth/login");
    }
    try {
      fetch(`${baseURL}/accounts/`, {
        method: "POST",
        headers: {
          Authorization: basicAuth,
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
          console.log(data);
          const userId = data.uid;
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
            <p className="p-3 bg-accent bg-opacity-60 w-full rounded-lg ml-7 border">
              {userName}
            </p>
          </div>
          <div className="flex flex-row items-center mt-4">
            <p className="text-sm ">Email </p>
            <p className="p-3 bg-accent bg-opacity-60 w-full rounded-lg ml-5 border">
              {userEmail}
            </p>
          </div>
        </div>
        <hr />
        <div className="my-4 flex flex-row items-center">
          <p className="text-sm">
            Session Reports <br className="max-sm:block hidden" /> (For
            Simulations)
          </p>
          <>
            <Button
              disabled={testAttempedCount === 0}
              className="ml-8 max-sm:ml-2 w-fit"
            >
              {candidateReportUrl && candidateReportUrl.length !== 0 ? (
                <>
                  <Link href={candidateReportUrl} target="_blank">
                    Participant Report{" "}
                    <Link2 className={`h-4 w-4 ml-2 inline`} />
                  </Link>
                </>
              ) : (
                <Loader className="h-4 w-4 animate-spin" />
              )}
            </Button>
          </>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
