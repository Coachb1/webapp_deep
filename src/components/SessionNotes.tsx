"use client";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "./ui/button";
import { baseURL, basicAuth } from "@/lib/utils";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import { Info, Loader, Plus, Search } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { convertDate } from "@/lib/utils";

// Pagination related variables

//convert date

function filterByValue(array: any, value: any) {
  return array.filter((obj: any) => {
    for (const key in obj) {
      if (obj[key] && obj[key].toString().includes(value)) {
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
  }
  // const commentsGivenData = [];
  const [commentsGiven, setCommentsGiven] = useState<givenCommentType[]>([]);

  interface recievedCommentType {
    context: string;
    date: string;
    recommendations: string;
    mentor_name: string;
    mentor_email_id: string;
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
        setCommentsGiven(data.data);
        setCommentsLoading(false);
      })
      .catch((err) => {
        setCommentsLoading(false);
        console.log(err);
        return err;
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
      });
  }, []);

  const getCommentsRecieved = () => {
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
        setCommmentsRecieved(data.data);
        setCommentsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setCommentsLoading(false);
      });
  };

  const createCommentHandler = async () => {
    setSubmitLoading(true);
    const menteeEmail = emailRef.current.value;
    const context = commentRef.current.value;
    fetch(`${baseURL}/accounts/identities/deepchat_unique_id/${menteeEmail}/`, {
      method: "GET",
      headers: {
        Authorization: basicAuth,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.name) {
          fetch(
            `${baseURL}/test-attempt-sessions/save_session_notes/?mentor_id=${userId}&user_id=${data.uid}&context=${context}&for=mentor`,
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
                if ("Error" in data) {
                    toast.error(data.Error);
                    setSubmitLoading(false);
                    return;
                }
              toast.success(
                "Your comment has been successfully sent to your mentee."
              );
              setSubmitLoading(false);
              getCommentsGiven(userId);
              setCreateCommentInit(false);
            });
        }
        if (data.detail) {
          console.error("user not available");
          toast.error("Entered email is not your valid mentee.");
          setSubmitLoading(false);
        }
      })
      .catch((err) => {
        return err;
      });
  };

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
        getCommentsRecieved();
      } else {
        setFilteredRecievedItems(filteredData);
        setSearchTriggered(true);
      }
    }
  };

  return (
    <div className="bg-accent p-2 mt-2 rounded-md">
      <div className="pl-4 max-sm:pl-2 pt-2">
        Session Notes (For Bot Interactions)
      </div>
      <div className="m-4 max-sm:m-2">
        <Tabs
          defaultValue="c-given"
          className="w-full"
          onValueChange={(val) => {
            console.log(val);
            setTabValue(val);

            if (val === "c-recieved") {
              getCommentsRecieved();
            }
          }}
        >
          <div className="flex flex-row  items-center gap-2 justify-between max-sm:flex-col max-sm:justify-start max-sm:items-start">
            <TabsList className="border-2 bg-gray-300">
              <TabsTrigger className="text-sm max-sm:text-xs" value="c-given">
                Comments Given
              </TabsTrigger>
              <div>
                <TabsTrigger
                  className="text-sm max-sm:text-xs hover:cursor-pointer"
                  value="c-recieved"
                >
                  Comments Recieved
                </TabsTrigger>
              </div>
            </TabsList>
            <div className="bg-white flex flex-row items-center p-1.5 rounded-md ring-1 shadow-md  ">
              <Search className="h-4 w-4 mr-1 inline" />
              <input
                placeholder="Search comments"
                className="border-l pl-2 outline-none text-sm max-sm:text-xs max-sm:ml-1"
                type="text"
                onChange={(e) => searchItemsHandler(e)}
              />
            </div>
          </div>

          <TabsContent value="c-given">
            <div className="bg-gray-200 text-sm w-full m-2 ml-0 p-2 rounded-md text-slate-800 flex flex-col gap-2 max-sm:text-xs min-h-[109px]">
              {commentsLoading ? (
                <div className="flex justify-center pt-8">
                  <Loader className="h-5 w-5 animate-spin" />
                </div>
              ) : (
                <>
                  {searchTriggered && (
                    <>
                      {filteredGivenItems.map((comment, i) => (
                        <div key={i} className="border-b-2 border-gray-300 p-4">
                          <div className="flex flex-col">
                            <p className="mr-2 my-1">
                              {" "}
                              <b>Mentee Name</b> : {comment.mentee_name}
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
                              {comment.recommendations !== null ? (
                                <>
                                  {comment.recommendations
                                    .split(",")
                                    .map((recommendation, i) => (
                                      <Link
                                        className="text-semibold text-blue-500"
                                        href={"/content-library"}
                                      >
                                        {recommendation}
                                      </Link>
                                    ))}
                                </>
                              ) : (
                                <span>
                                  In process, please check again in a while.{" "}
                                </span>
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
                              <b>Mentee Name</b> : {comment.mentee_name}
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
                              {comment.recommendations !== null ? (
                                <>
                                  {comment.recommendations
                                    .split(",")
                                    .map((recommendation, i) => (
                                      <Link
                                        className="text-semibold text-blue-500"
                                        href={"/content-library"}
                                      >
                                        {recommendation}
                                      </Link>
                                    ))}
                                </>
                              ) : (
                                <span>
                                  In process, please check again in a while.{" "}
                                </span>
                              )}
                            </p>
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
            {!createCommentInit && (
              <div className="ml-2 w-full flex justify-center">
                <Button
                  className="max-sm:p-2 h-8 mt-2 hover:brightness-105 text-sm bg-green-800"
                  onClick={() => {
                    setCreateCommentInit(true);
                  }}
                >
                  New Comment <Plus className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
            {createCommentInit && (
              <div className="bg-gray-200 text-sm w-full m-2 ml-0 p-2 rounded-md">
                <div className="border-gray-300  p-4">
                  <div className="flex flex-col">
                    <p className="mr-2 my-1">Email</p>
                    <input
                      onChange={(e) => {
                        const email = e.target.value;
                        if (email.length > 8 && !email.includes("@")) {
                          setEmailError(true);
                        } else {
                          setEmailError(false);
                        }
                      }}
                      ref={emailRef}
                      type="email"
                      className={`w-full p-2 bg-gray-100 rounded-md outline-none border focus-visible:border-gray-400 ${
                        emailError ? "border border-red-300" : ""
                      }`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <p className="mr-2 my-1 mt-2">Comment</p>
                    <textarea
                      ref={commentRef}
                      rows={4}
                      className="w-full p-2 bg-gray-100 rounded-md outline-none border focus-visible:border-gray-400"
                    />
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
                      disabled={emailError}
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
                              <b>Mentor name</b> : {comment.mentor_name}
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
                            <p className="mr-2 my-1 mt-2">
                              <b> Recommended practice access codes </b> :{" "}
                              {comment.recommendations !== null ? (
                                <>
                                  {comment.recommendations
                                    .split(",")
                                    .map((recommendation, i) => (
                                      <Link
                                        className="text-semibold text-blue-500"
                                        href={"/content-library"}
                                      >
                                        {recommendation}
                                      </Link>
                                    ))}
                                </>
                              ) : (
                                <span>
                                  In process, please check again in a while.{" "}
                                </span>
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
                  {commentsRecieved.length > 0 && !searchTriggered ? (
                    <>
                      {currentItemsRecieved.map((comment, i) => (
                        <div key={i} className="border-b-2 border-gray-300 p-4">
                          <div className="flex flex-col">
                            <p className="mr-2 my-1">
                              {" "}
                              <b>Mentor name</b> : {comment.mentor_name}
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
                                {comment.recommendations !== null ? (
                                  <>
                                    {comment.recommendations
                                      .split(",")
                                      .map((recommendation, i) => (
                                        <Link
                                          className="text-semibold text-blue-500"
                                          href={"/content-library"}
                                        >
                                          {recommendation}
                                        </Link>
                                      ))}
                                  </>
                                ) : (
                                  <span>
                                    In process, please check again in a while.{" "}
                                  </span>
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
                          You have not given any comments yet
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
