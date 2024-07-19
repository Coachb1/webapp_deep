"use client";

import { TooltipWrapper } from "@/components/TooltipWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { connectionType } from "@/lib/types";
import {
  baseURL,
  basicAuth,
  findCoachUID,
  findCoacheeUID,
  getUserAccount,
} from "@/lib/utils";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { Check, Info, Loader, LucideExternalLink, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const MyComnnections = ({ user }: { user: KindeUser | null }) => {
  const router = useRouter();
  const [connectionsForCoach, setConnectionsForCoach] = useState<
    connectionType[]
  >([]);
  const [connectionsForCoachee, setConnectionsForCoachee] = useState<
    connectionType[]
  >([]);

  // const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);

  const getConnectionsForCoach = (coachId: string) => {
    setLoading(true);
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

        setConnectionsForCoach(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
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
        setConnectionsForCoachee(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const { userId, coachId, coacheeId, userConnections, fetchUserData } =
    useUser();

  useEffect(() => {
    console.log(userConnections);
    if (coachId) {
      setConnectionsForCoach(userConnections);
    } else if (coacheeId) {
      setConnectionsForCoachee(userConnections);
    }
    setLoading(false);
  }, []);

  const AcceptRequestComponent = ({
    coachId,
    coacheeId,
  }: {
    coachId: string;
    coacheeId: string;
  }) => {
    const [acceptLoading, setAcceptLoading] = useState(false);
    const acceptRequestHandler = () => {
      setAcceptLoading(true);

      fetch(`${baseURL}/accounts/coach-coachee-connections/`, {
        method: "PATCH",
        headers: {
          Authorization: basicAuth,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coach_id: coachId,
          coachee_id: coacheeId,
          status: "accepted",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          toast.success("Accepted the request!");
          getConnectionsForCoach(coachId);

          fetchUserData(user?.email, user, true);
          setAcceptLoading(false);
        })
        .catch((err) => {
          toast.error("Error accepting the request!");
          console.error(err);
          setAcceptLoading(false);
        });
    };
    return (
      <Button
        onClick={() => {
          acceptRequestHandler();
        }}
        variant={"outline"}
        className="h-6 text-xs w-fit text-green-600 bg-green-50 border-green-300 "
      >
        <span className="max-sm:hidden">
          {acceptLoading ? "Accepting..." : "Accept"}
        </span>
        <TooltipWrapper
          className="hidden max-sm:block text-xs"
          tooltipName="Accept"
          body={<Check className="h-4 w-4 ml-2 max-sm:ml-0" />}
        />
      </Button>
    );
  };

  const RejectRequestComponent = ({
    coachId,
    coacheeId,
  }: {
    coachId: string;
    coacheeId: string;
  }) => {
    const [rejectLoading, setRejectLoading] = useState(false);
    const rejectRequestHandler = () => {
      setRejectLoading(true);
      fetch(`${baseURL}/accounts/coach-coachee-connections/`, {
        method: "PATCH",
        headers: {
          Authorization: basicAuth,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coach_id: coachId,
          coachee_id: coacheeId,
          status: "rejected",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          toast.success("Rejected the request!");
          getConnectionsForCoach(coachId);
          setRejectLoading(false);
        })
        .catch((err) => {
          toast.error("Error rejecting the request!");
          console.error(err);
          setRejectLoading(false);
        });
    };
    return (
      <Button
        onClick={() => {
          rejectRequestHandler();
        }}
        variant={"outline"}
        className="h-6 text-xs w-fit  text-red-600 font-semibold bg-red-50 border-red-300 "
      >
        <span className="max-sm:hidden">
          {rejectLoading ? "Rejecting..." : "Reject"}
        </span>{" "}
        <TooltipWrapper
          className="hidden max-sm:block text-xs"
          tooltipName="Reject"
          body={<X className="h-4 w-4 ml-2 max-sm:ml-0" />}
        />
      </Button>
    );
  };

  return (
    <div id="my-connections" className="bg-accent p-2 mt-2 mb-8 rounded-md">
      <div className="pl-4 max-sm:pl-2 pt-2 text-sm max-sm:text-sm">
        My Connections
      </div>
      <p className="bg-amber-100 text-xs font-semibold text-gray-500 p-1 w-fit rounded-md ml-4 max-sm:ml-2 my-2 flex flex-row items-center">
        {" "}
        <Info className="h-3 w-3 mr-2 inline" />
        Connection history is updated every 60 mins.
      </p>
      {!loading && (
        <>
          {connectionsForCoach.length === 0 &&
            connectionsForCoachee.length === 0 && (
              <>
                <div className="text-xs w-full h-20 flex items-center justify-center">
                  <div>You don't have any connections yet!</div>{" "}
                </div>
              </>
            )}
        </>
      )}

      {!loading ? (
        <>
          <div className="m-4 text-sm max-sm:m-0">
            {connectionsForCoach.length > 0 && (
              <div className="m-4 text-sm max-sm:m-0 max-sm:my-4">
                <div className="bg-gray-200 px-4  max-sm:px-1 text-sm w-full m-2 ml-0 p-2 rounded-md max-sm:pl-6">
                  <div className="mx-4 flex flex-row my-3 gap-3 max-sm:gap-2  items-center max-sm:text-xs text-gray-600 font-semibold  max-sm:mx-1">
                    {/* <div className="w-[10%] max-sm:text-xs  text-center">
                      SL no.
                    </div> */}
                    <div className=" w-[20%] text-center ">Name </div>
                    <div className=" w-[40%] max-sm:w-[50%] text-center">
                      Status{" "}
                    </div>
                  </div>
                  <div className="mx-4 max-sm:mx-1">
                    {connectionsForCoach.map((connection, i) => (
                      <div className="flex flex-row gap-3 my-2 items-center">
                        {/* <p className="w-[10%] max-sm:w-[12%] text-center">
                          {i + 1}
                        </p>{" "} */}
                        <p className="max-sm:text-xs w-[20%]  text-center">
                          {connection.coachee_name}
                        </p>{" "}
                        {/* <div className="text-gray-400 bg-gray-400 h-5 w-[2px]" /> */}
                        <div className="max-sm:text-xs w-[40%] flex flex-row gap-2 items-center justify-center  text-center">
                          {connection.status === "pending" && (
                            <>
                              <AcceptRequestComponent
                                coachId={connection.coach_id}
                                coacheeId={connection.coachee_id}
                              />
                              <RejectRequestComponent
                                coachId={connection.coach_id}
                                coacheeId={connection.coachee_id}
                              />
                            </>
                          )}
                          {connection.status === "accepted" && (
                            <Badge className="bg-green-400 hover:bg-green-300">
                              Accepted
                            </Badge>
                          )}
                          {connection.status === "rejected" && (
                            <Badge className="bg-red-400 hover:bg-red-300">
                              Rejected
                            </Badge>
                          )}
                        </div>
                        <div className="text-gray-400 bg-gray-400 h-5 w-[2px]" />
                        <Button
                          // onClick={() => {
                          //   router.push(
                          //     `/?coachee_id=${connection.coachee_id}`
                          //   );
                          // }}
                          asChild
                          variant={"outline"}
                          className="h-6 text-xs w-fit bg-gray-50 border-gray-300 "
                        >
                          <Link href={`/?coachee_id=${connection.coachee_id}`}>
                            <span className="max-sm:hidden">Visit Profile</span>{" "}
                            <TooltipWrapper
                              className="hidden max-sm:block text-xs"
                              tooltipName="Visit Profile"
                              body={
                                <LucideExternalLink className="h-3 w-3 ml-2 max-sm:ml-0" />
                              }
                            />
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {connectionsForCoachee.length > 0 && (
              <div className="m-4 text-sm max-sm:m-0 max-sm:my-4">
                <div className="bg-gray-200 px-4  max-sm:px-1  text-sm w-full m-2 ml-0 p-2 rounded-md">
                  <div className="mx-4 flex flex-row my-3 gap-3  max-sm:gap-2 items-center max-sm:text-xs text-gray-600 font-semibold  max-sm:mx-1">
                    {/* <div className="w-[10%] max-sm:w-[12%] max-sm:text-xs  text-center">
                      SL no.
                    </div> */}
                    <div className=" w-[20%] text-center ">Name </div>
                    <div className=" w-[40%] text-center ">Status </div>
                  </div>
                  <div className="mx-4 max-sm:mx-1">
                    {connectionsForCoachee.map((connection, i) => (
                      <div className="flex flex-row gap-3 my-2 items-center max-sm:justify-between">
                        {/* <p className="w-[10%] max-sm:w-[12%] text-center">
                          {i + 1}
                        </p>{" "} */}
                        <p className="max-sm:text-xs w-[20%]  text-center">
                          {connection.coach_name}
                        </p>{" "}
                        <div className="max-sm:text-xs w-[40%]  text-center">
                          {connection.status === "pending" && (
                            <Badge className="bg-blue-400 hover:bg-blue-300">
                              Pending
                            </Badge>
                          )}
                          {connection.status === "accepted" && (
                            <Badge className="bg-green-400 hover:bg-green-300">
                              Accepted
                            </Badge>
                          )}
                          {connection.status === "rejected" && (
                            <Badge className="bg-red-400 hover:bg-red-300">
                              Rejected
                            </Badge>
                          )}
                        </div>
                        <div className="text-gray-400 bg-gray-400 h-5 w-[2px]" />
                        <Button
                          disabled={connection.status !== "accepted"}
                          formTarget="_blank"
                          variant={"outline"}
                          className="h-6 text-xs w-fit bg-gray-50 border-gray-300 "
                        >
                          <Link
                            className="flex w-fit flex-row items-center justify-center"
                            target="_blank"
                            href={`/coach/${connection.coach_avatar_bot_id}`}
                          >
                            <span className="max-sm:hidden">Visit Coach</span>{" "}
                            <TooltipWrapper
                              className="hidden max-sm:block text-xs"
                              tooltipName="Visit Coach"
                              body={
                                <LucideExternalLink className="h-3 w-3 ml-2 max-sm:ml-0" />
                              }
                            />
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="text-xs w-full h-20 flex items-center justify-center">
            <div>
              <Loader className="h-4 w-4 mr-2 animate-spin inline" /> Loading
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MyComnnections;
