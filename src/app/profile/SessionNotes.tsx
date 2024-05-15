"use client";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  CoachesDataType,
  baseURL,
  basicAuth,
  findCoachUID,
  findCoacheeUID,
  getUserAccount,
  hasPassed48Hours,
} from "@/lib/utils";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Separator } from "../../components/ui/separator";
import { ExternalLink, Info, Loader, Plus, Search } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { convertDate } from "@/lib/utils";
import { connectionType } from "@/lib/types";
import { Select, Space } from "antd";
import HelpMode from "@/components/HelpMode";

// Pagination related variables

//convert date

function filterByValue(array: any, value: any) {
  return array.filter((obj: any) => {
    for (const key in obj) {
      if (
        obj[key] &&
        obj[key].toString().toLowerCase().includes(value.toLowerCase())
      ) {
        return true;
      }
    }
    return false;
  });
}

const SessionNotes = ({ user }: any) => {
  interface givenCommentType {
    context: string;
    date: string;
    recommendations: string;
    mentee_email_id: string;
    mentee_name: string;
    updated: string;
    simulation_codes: string;
  }
  // const commentsGivenData = [];
  const [commentsGiven, setCommentsGiven] = useState<givenCommentType[]>([]);

  interface recievedCommentType {
    context: string;
    date: string;
    recommendations: string;
    mentor_name: string;
    mentor_email_id: string;
    updated: string;
    simulation_codes: string;
  }

  const [commentsRecieved, setCommmentsRecieved] = useState<
    recievedCommentType[]
  >([]);
  const [createCommentInit, setCreateCommentInit] = useState<boolean>(false);

  const [commentsLoading, setCommentsLoading] = useState<boolean>(true);

  const emailRef = useRef<any>();
  const commentRef = useRef<any>();
  const [emailError, setEmailError] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  const accessCodeRef = useRef<any>();
  const [accessCodeLengthError, setAccessCodeLengthError] = useState(false);
  //pagination fro givenItems
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = commentsGiven?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(commentsGiven.length / itemsPerPage);

  //pagination for recievedItems
  const [currentPageRecieved, setCurrentPageRecived] = useState(1);
  const indexOfLastItemRecived = currentPageRecieved * itemsPerPage;
  const indexOfFirstItemRecived = indexOfLastItemRecived - itemsPerPage;
  const currentItemsRecieved = commentsRecieved?.slice(
    indexOfFirstItemRecived,
    indexOfLastItemRecived
  );
  const totalPagesRecieved = Math.ceil(commentsRecieved.length / itemsPerPage);

  const [searchTriggered, setSearchTriggered] = useState(false);
  const [filteredGivenItems, setFilteredGivenItems] = useState<
    givenCommentType[]
  >([]);
  const [filteredRecivedItems, setFilteredRecievedItems] = useState<
    recievedCommentType[]
  >([]);

  const [tabValue, setTabValue] = useState("c-given");

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handlePageChangeRecived = (page: any) => {
    setCurrentPageRecived(page);
  };

  const getCommentsGiven = (userid: string) => {
    fetch(
      `${baseURL}/test-attempt-sessions/save_session_notes/?mentor_id=${userid}&for=mentee`,
      {
        method: "GET",
        headers: {
          Authorization: basicAuth,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("COMMENTS GIVEN RES : ", data.data);

        const sortedData = data.data.sort(
          (a: any, b: any) =>
            new Date(b.date as string).getTime() -
            new Date(a.date as string).getTime()
        );

        setCommentsGiven(sortedData);
        setCommentsLoading(false);
      })
      .catch((err) => {
        setCommentsLoading(false);
        console.log(err);
        return err;
      });
  };

  const getCommentsRecieved = (userId: string) => {
    setCommentsLoading(true);
    console.log(userId);
    fetch(
      `${baseURL}/test-attempt-sessions/save_session_notes/?user_id=${userId}&for=mentee`,
      {
        method: "GET",
        headers: {
          Authorization: basicAuth,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("COMMENTS Recieved RES : ", data);

        const sortedData = data.data.sort(
          (a: any, b: any) =>
            new Date(b.date as string).getTime() -
            new Date(a.date as string).getTime()
        );

        setCommmentsRecieved(sortedData);
        setCommentsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setCommentsLoading(false);
      });
  };

  useEffect(() => {
    setCommentsLoading(true);
    fetch(`${baseURL}/accounts/identities/deepchat_unique_id/${user.email}/`, {
      method: "GET",
      headers: {
        Authorization: basicAuth,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserId(data.uid);
        getCommentsGiven(data.uid);
        getCommentsRecieved(data.uid);
      });
  }, []);

  const [contextLengthError, setContextLengthError] = useState(false);

  const [coachId, setCoachId] = useState("");
  const [coacheeId, setCoacheeId] = useState("");

  const createCommentHandler = async () => {
    setSubmitLoading(true);
    const context: string = commentRef.current.value;
    const accessSimulationCodes: string = accessCodeRef.current.value;
    console.log(context);
    console.log(
      "MENTOR ID - ",
      userId,
      "USER ID - " + selectedUserForCommentUserId
    );

    if (context.split(" ").length > 40) {
      fetch(
        `${baseURL}/test-attempt-sessions/save_session_notes/?mentor_id=${userId}&user_id=${selectedUserForCommentUserId}&context=${context}&for=mentor&token=${basicAuth}&simulation_codes=${accessSimulationCodes}`,
        {
          method: "GET",
          headers: {
            Authorization: basicAuth,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Submitted Data", data);
          if (data.error || data.detail) {
            toast.error(
              "Error while submitting your comment. Please try again"
            );
            setSubmitLoading(false);
            return;
          }
          toast.success("Your comment has been successfully sent.");
          setSubmitLoading(false);
          getCommentsGiven(userId);
          setCreateCommentInit(false);
        })
        .catch((err) => {
          setSubmitLoading(false);
          toast.error("Error while submitting your comment. Please try again");
          console.error(err);
        });
    } else {
      setSubmitLoading(false);
      setContextLengthError(true);
    }
  };

  const [connectionsForCoach, setConnectionsForCoach] = useState<
    connectionType[]
  >([]);
  const [connectionsForCoachee, setConnectionsForCoachee] = useState<
    connectionType[]
  >([]);

  const [connectionsOptions, setConnectionsOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const [selectedUserForCommentUserId, setSelectedUserForCommentUserId] =
    useState("");

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
        console.log("CONNECTIONS for COACHEE", data);
        setConnectionsForCoachee(data.data);

        const dataForOptions = data.data
          .filter(
            (data: connectionType) =>
              data.status === "accepted" &&
              data.allow_coachee_to_create_session === true
          )
          .map((data: connectionType) => {
            return {
              label: data.coach_name,
              value: `${data.coach_name}/${data.coach_user_id}`,
            };
          });

        console.log(dataForOptions);
        setConnectionsOptions(dataForOptions);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getConnectionsForCoach = (coachId: string) => {
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
        console.log("CONNECTIONS for COACH", data);

        setConnectionsForCoach(data.data);
        const dataForOptions = data.data
          .filter((data: connectionType) => data.status === "accepted")
          .map((data: connectionType) => {
            return {
              label: data.coachee_name,
              value: `${data.coachee_name}/${data.coachee_user_id}`,
            };
          });

        setConnectionsOptions(dataForOptions);
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        // setLoading(false);
      });
  };

  useEffect(() => {
    if (user) {
      getUserAccount(user)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUserId(data.uid);
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

              const isApprovedData = data.data.filter(
                (coachData: any) => coachData.is_approved === true
              );

              console.log(isApprovedData);
              if (findCoacheeUID(isApprovedData).length > 0) {
                console.log("for coachees");
                setCoacheeId(findCoacheeUID(isApprovedData));
                getConnectionsForCoachee(findCoacheeUID(isApprovedData));
              }

              if (findCoachUID(isApprovedData).length > 0) {
                console.log("for coaches");
                getConnectionsForCoach(findCoachUID(isApprovedData));
                setCoachId(findCoachUID(isApprovedData));
              }
              // setLoading(false);
            })
            .then((err) => {
              console.error(err);
              // setLoading(false);
            });
        });
    }
  }, []);

  useEffect(() => {
    if (connectionsOptions.length > 0) {
      setTabValue("c-given");
    }
  }, [connectionsOptions]);

  const searchItemsHandler = (e: any) => {
    if (tabValue === "c-given") {
      const filteredData = filterByValue(commentsGiven, e.target.value);
      setCommentsGiven(filteredData);
      if (e.target.value === "") {
        setSearchTriggered(false);
        getCommentsGiven(userId);
      } else {
        setFilteredGivenItems(filteredData);
        setSearchTriggered(true);
      }
    } else if (tabValue === "c-recieved") {
      const filteredData = filterByValue(commentsRecieved, e.target.value);
      setCommmentsRecieved(filteredData);
      console.log(filteredData);
      if (e.target.value === "") {
        setSearchTriggered(false);
        getCommentsRecieved(userId);
      } else {
        setFilteredRecievedItems(filteredData);
        setSearchTriggered(true);
      }
    }
  };

  return (
    <div
      id="session-notes"
      className="bg-accent p-2 mt-2 rounded-md mb-10 max-sm:max-h-[75vh] overflow-scroll no-scrollbar"
    >
      <div className="pl-4 max-sm:pl-2 pt-2">Action Plan & Session notes</div>{" "}
      <div className="m-4 max-sm:m-2">
        <Tabs
          defaultValue="c-recieved"
          className="w-full"
          value={tabValue}
          onValueChange={(val) => {
            console.log(val);
            setTabValue(val);

            if (val === "c-recieved") {
              getCommentsRecieved(userId);
            }
          }}
        >
          <div className="flex flex-row  items-center gap-2 justify-between max-sm:flex-col max-sm:items-start max-sm:justify-start  max-lg:justify-start">
            <TabsList className="border-2 bg-gray-300">
              {/* {connectionsOptions.length > 0 && ( */}
              <TabsTrigger
                id="c-given"
                className="text-sm max-sm:text-xs"
                value="c-given"
              >
                Comments Given
              </TabsTrigger>
              {/* )} */}
              <div>
                <TabsTrigger
                  id="c-recieved"
                  className="text-sm max-sm:text-xs hover:cursor-pointer"
                  value="c-recieved"
                >
                  Comments Received
                </TabsTrigger>
              </div>
            </TabsList>
            <div className="bg-white flex flex-row items-center p-1.5 rounded-md ring-1 shadow-md max-sm:ml-1 ">
              <Search className="h-4 w-4 mr-1 inline" />
              <input
                placeholder="Search comments"
                className="border-l pl-2 outline-none text-sm max-sm:text-xs max-sm:ml-1"
                type="text"
                onChange={(e) => searchItemsHandler(e)}
              />
            </div>
          </div>

          {/* {connectionsOptions.length > 0 && ( */}
          <TabsContent value="c-given">
            <div className="bg-gray-200 text-sm w-full m-2 ml-0 p-2 rounded-md text-slate-800 flex flex-col gap-2 max-sm:text-xs min-h-[109px]">
              {commentsLoading ? (
                <>
                  <div className="text-xs w-full h-20 flex items-center justify-center">
                    <div>
                      <Loader className="h-4 w-4 mr-2 animate-spin inline" />{" "}
                      Loading
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {searchTriggered && (
                    <>
                      {filteredGivenItems.map((comment, i) => (
                        <div key={i} className="border-b-2 border-gray-300 p-4">
                          <div className="flex flex-col">
                            <p className="mr-2 my-1">
                              {" "}
                              <b>
                                {coachId.length > 0
                                  ? "Coachee/Mentee Name"
                                  : "Coach/Mentor Name"}{" "}
                              </b>{" "}
                              : {comment.mentee_name}
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <p className="mr-2 my-1">
                              {" "}
                              <b>Email</b> : {comment.mentee_email_id}
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <p className="mr-2 my-1 mt-2 overflow-scroll no-scrollbar">
                              <b>Comment</b> : {comment.context}
                            </p>
                          </div>
                          <div>
                            <p className="mr-2 my-1 mt-2">
                              <b> Recommended practice access codes </b> :{" "}
                              {comment.simulation_codes !== null ||
                              comment.simulation_codes !== "" ? (
                                <>
                                  {comment.simulation_codes
                                    .split(",")
                                    .map((recommendation, i) => (
                                      <span
                                        className="text-semibold text-blue-500 mx-1 font-bold hover:cursor-copy"
                                        onClick={() => {
                                          navigator.clipboard
                                            .writeText(recommendation)
                                            .then(() => {
                                              toast.success(
                                                "Test code copied to clipboard",
                                                {
                                                  duration: 4000,
                                                }
                                              );
                                            })
                                            .catch((err) => {
                                              toast.error(
                                                "Error copying test code",
                                                {
                                                  duration: 4000,
                                                }
                                              );
                                            });
                                        }}
                                      >
                                        {recommendation}
                                      </span>
                                    ))}
                                </>
                              ) : (
                                <>
                                  <>
                                    <span>
                                      In process, please check again in a while.{" "}
                                    </span>
                                  </>
                                </>
                              )}
                            </p>
                          </div>
                          <p className="mt-2">
                            <b> Date</b> : {convertDate(comment.date)}
                          </p>
                        </div>
                      ))}
                    </>
                  )}
                  {commentsGiven.length > 0 && !searchTriggered ? (
                    <>
                      {currentItems.map((comment, i) => (
                        <div key={i} className="border-b-2 border-gray-300 p-4">
                          <div className="flex flex-col">
                            <p className="mr-2 my-1">
                              {" "}
                              <b>
                                {coachId.length > 0
                                  ? "Coachee/Mentee Name"
                                  : "Coach/Mentor Name"}{" "}
                              </b>{" "}
                              : {comment.mentee_name}
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <p className="mr-2 my-1">
                              {" "}
                              <b>Email</b> : {comment.mentee_email_id}
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <p className="mr-2 my-1 mt-2 overflow-scroll no-scrollbar">
                              <b>Comment</b> : {comment.context}
                            </p>
                          </div>
                          <div>
                            <div className="mr-2 my-1 mt-2">
                              <b> Recommended practice access codes </b> :{" "}
                              <>
                                {comment.simulation_codes !== null ||
                                comment.simulation_codes !== "" ? (
                                  <>
                                    {comment.simulation_codes
                                      .split(",")
                                      .map((recommendation, i) => (
                                        <span
                                          className="text-semibold text-blue-500 mx-1 font-bold hover:cursor-copy"
                                          onClick={() => {
                                            navigator.clipboard
                                              .writeText(recommendation)
                                              .then(() => {
                                                toast.success(
                                                  "Test code copied to clipboard",
                                                  {
                                                    duration: 4000,
                                                  }
                                                );
                                              })
                                              .catch((err) => {
                                                toast.error(
                                                  "Error copying test code",
                                                  {
                                                    duration: 4000,
                                                  }
                                                );
                                              });
                                          }}
                                        >
                                          {recommendation}
                                        </span>
                                      ))}
                                  </>
                                ) : (
                                  <>
                                    <>
                                      <span>
                                        In process, please check again in a
                                        while.{" "}
                                      </span>
                                    </>
                                  </>
                                )}
                              </>
                            </div>
                          </div>
                          <p className="mt-2">
                            <b> Date</b> : {convertDate(comment.date)}
                          </p>
                        </div>
                      ))}
                      <div className="py-4 flex justify-center">
                        {Array.from({ length: totalPages }, (_, index) => (
                          <button
                            key={index + 1}
                            className={`mx-2 max-sm:mx-1 max-sm:px-2 rounded-md px-4 py-2 ${
                              currentPage === index + 1
                                ? "bg-black text-white"
                                : "bg-white text-black"
                            }`}
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </button>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      {filteredGivenItems.length === 0 && (
                        <div className="text-center mt-4 font-bold ">
                          You have not given any comments yet
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
            {!commentsLoading && (
              <>
                {!createCommentInit && (
                  <div className="ml-2 w-full flex flex-col items-center justify-center">
                    <Button
                      id="new-comment"
                      className="max-sm:p-2 w-fit h-8 mt-2 hover:brightness-105 text-sm bg-green-800"
                      onClick={() => {
                        setCreateCommentInit(true);
                      }}
                      disabled={connectionsOptions.length === 0}
                    >
                      New Comment <Plus className="ml-2 h-4 w-4" />
                    </Button>
                    {connectionsOptions.length === 0 && (
                      <p className="text-red-600 text-xs mt-2">
                        You don't have any connections yet.
                      </p>
                    )}
                  </div>
                )}
              </>
            )}
            {createCommentInit && (
              <div className="bg-gray-200 text-sm w-full m-2 ml-0 p-2 rounded-md">
                <div className="border-gray-300  p-4">
                  <div className="flex flex-col">
                    <p className="mr-2 my-1">Connected User</p>
                    <Select
                      className="w-full"
                      showSearch
                      virtual={false}
                      // optionFilterProp="children"
                      onChange={(value: string) => {
                        // setSelectedUserForComment(value);
                        console.log(value.split("/")[1]);
                        setSelectedUserForCommentUserId(value.split("/")[1]);
                      }}
                      onSearch={(val) => {
                        console.log(val);
                      }}
                      options={connectionsOptions}
                    />
                  </div>
                  <div className="flex flex-col my-2 w-full">
                    <div className="flex flex-row items-center">
                      <p className="mr-2 my-1 mt-2">
                        Recommended Simulation access codes (comma separated){" "}
                      </p>{" "}
                      <Link
                        href={"/create-scenario?scrollView=simulation-creator"}
                        target="_blank"
                        className="bg-blue-200 h-fit text-blue-600 text-xs font-semibold px-2 py-0.5 rounded-md "
                      >
                        Generate{" "}
                        <ExternalLink className="ml-1 h-3 w-3 inline" />
                      </Link>
                    </div>
                    <input
                      onChange={(e) => {
                        setAccessCodeLengthError(false);
                      }}
                      onBlur={(e) => {
                        if (e.target.value.length < 6) {
                          setAccessCodeLengthError(true);
                        }
                      }}
                      ref={accessCodeRef}
                      className={`w-full p-2 bg-white rounded-md outline-none border focus-visible:border-gray-400`}
                    />
                    {/* {accessCodeLengthError && (
                      <p className="text-red-500 text-xs m-2">
                        Atleast include one test code
                      </p>
                    )} */}
                  </div>
                  <div className="flex flex-col">
                  <p className="mr-2 my-1 mt-2">Comment</p>
                  <textarea
                    onChange={(event) => {
                      const inputValue = event.target.value;
                      const words = inputValue.trim().split(/\s+/);
                      if (words.length <= 80) {
                        setContextLengthError(false);
                        commentRef.current.value = inputValue;
                      } else {
                        commentRef.current.value = words.slice(0, 80).join(" ");
                      }
                    }}
                    onBlur={(e) => {
                      const words = e.target.value.trim().split(/\s+/);
                      if (words.length < 30 || words.length > 80) {
                        setContextLengthError(true);
                      } else {
                        setContextLengthError(false);
                      }
                    }}
                    ref={commentRef}
                    rows={4}
                    className="w-full p-2 bg-[#FFFFFF] rounded-md outline-none border focus-visible:border-gray-400"
                  />
                  {contextLengthError && (
                    <p className="text-red-500 text-xs m-2">
                      Comment should be between 30 and 80 words!
                    </p>
                  )}
                </div>

                  <div className="w-full  flex flex-row justify-end gap-2">
                    <Button
                      variant={"destructive"}
                      className="max-sm:p-2 h-6 mt-2 hover:brightness-105 "
                      onClick={() => {
                        setCreateCommentInit(false);
                        setSubmitLoading(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={createCommentHandler}
                      className="max-sm:p-2 h-6 mt-2 hover:brightness-105"
                      disabled={emailError || submitLoading}
                    >
                      {submitLoading ? (
                        <>
                          <Loader className="h-3 w-3 mr-1 animate-spin" />{" "}
                          Submitting
                        </>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          {/* )} */}
          <TabsContent value="c-recieved">
            <div className="bg-gray-200 text-sm w-full m-2 ml-0 p-2 rounded-md text-slate-800 flex flex-col gap-2 max-sm:text-xs  min-h-[109px]">
              {commentsLoading ? (
                <div className="flex justify-center pt-8">
                  <Loader className="h-5 w-5 animate-spin" />
                </div>
              ) : (
                <>
                  {searchTriggered && (
                    <>
                      {filteredRecivedItems.map((comment, i) => (
                        <div key={i} className="border-b-2 border-gray-300 p-4">
                          <div className="flex flex-col">
                            <p className="mr-2 my-1">
                              {" "}
                              <b>
                                {coachId.length > 0
                                  ? "Coachee/Mentee Name"
                                  : "Coach/Mentor Name"}{" "}
                              </b>{" "}
                              : {comment.mentor_name}
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <p className="mr-2 my-1">
                              {" "}
                              <b>Email</b> : {comment.mentor_email_id}
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <p className="mr-2 my-1 mt-2 overflow-scroll no-scrollbar">
                              <b>Comment</b> : {comment.context}
                            </p>
                          </div>
                          <div>
                            <div className="mr-2 my-1 mt-2">
                              <b> Recommended practice access codes </b> :{" "}
                              {comment.simulation_codes !== null ||
                              comment.simulation_codes !== "" ? (
                                <>
                                  {comment.simulation_codes
                                    .split(",")
                                    .map((recommendation, i) => (
                                      <span
                                        className="text-semibold text-blue-500 mx-1 font-bold hover:cursor-copy"
                                        onClick={() => {
                                          navigator.clipboard
                                            .writeText(recommendation)
                                            .then(() => {
                                              toast.success(
                                                "Test code copied to clipboard",
                                                {
                                                  duration: 4000,
                                                }
                                              );
                                            })
                                            .catch((err) => {
                                              toast.error(
                                                "Error copying test code",
                                                {
                                                  duration: 4000,
                                                }
                                              );
                                            });
                                        }}
                                      >
                                        {recommendation}
                                      </span>
                                    ))}
                                </>
                              ) : (
                                <>
                                  <>
                                    <span>
                                      In process, please check again in a while.{" "}
                                    </span>
                                  </>
                                </>
                              )}
                            </div>
                          </div>
                          <p className="mt-2">
                            <b> Date</b> : {convertDate(comment.date)}
                          </p>
                        </div>
                      ))}
                    </>
                  )}
                  {commentsRecieved.length > 0 && !searchTriggered ? (
                    <>
                      {currentItemsRecieved.map((comment, i) => (
                        <div key={i} className="border-b-2 border-gray-300 p-4">
                          <div className="flex flex-col">
                            <p className="mr-2 my-1">
                              {" "}
                              <b>
                                {coachId.length > 0
                                  ? "Coachee/Mentee Name"
                                  : "Coach/Mentor Name"}{" "}
                              </b>{" "}
                              : {comment.mentor_name}
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <p className="mr-2 my-1">
                              {" "}
                              <b>Email</b> : {comment.mentor_email_id}
                            </p>
                          </div>
                          <div className="flex flex-col">
                            <p className="mr-2 my-1 mt-2 overflow-scroll no-scrollbar">
                              <b>Comment</b> : {comment.context}
                            </p>
                          </div>
                          <div>
                            <div>
                              <p className="mr-2 my-1 mt-2">
                                <b> Recommended practice access codes </b> :{" "}
                                {comment.simulation_codes !== null ||
                                comment.simulation_codes !== "" ? (
                                  <>
                                    {comment.simulation_codes
                                      .split(",")
                                      .map((recommendation, i) => (
                                        <span
                                          className="text-semibold text-blue-500 mx-1 font-bold hover:cursor-copy"
                                          onClick={() => {
                                            navigator.clipboard
                                              .writeText(recommendation)
                                              .then(() => {
                                                toast.success(
                                                  "Test code copied to clipboard",
                                                  {
                                                    duration: 4000,
                                                  }
                                                );
                                              })
                                              .catch((err) => {
                                                toast.error(
                                                  "Error copying test code",
                                                  {
                                                    duration: 4000,
                                                  }
                                                );
                                              });
                                          }}
                                        >
                                          {recommendation}
                                        </span>
                                      ))}
                                  </>
                                ) : (
                                  <>
                                    <>
                                      <span>
                                        In process, please check again in a
                                        while.{" "}
                                      </span>
                                    </>
                                  </>
                                )}
                              </p>
                            </div>
                          </div>
                          <p className="mt-2">
                            <b> Date</b> : {convertDate(comment.date)}
                          </p>
                        </div>
                      ))}
                      <div className="py-4 flex justify-center">
                        {Array.from(
                          { length: totalPagesRecieved },
                          (_, index) => (
                            <button
                              key={index + 1}
                              className={`mx-2 max-sm:mx-1 max-sm:px-2 rounded-md px-4 py-2 ${
                                currentPageRecieved === index + 1
                                  ? "bg-black text-white"
                                  : "bg-white text-black"
                              }`}
                              onClick={() => handlePageChangeRecived(index + 1)}
                            >
                              {index + 1}
                            </button>
                          )
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {filteredRecivedItems.length === 0 && (
                        <div className="text-center mt-4 font-bold ">
                          You have not received any comments yet
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SessionNotes;
