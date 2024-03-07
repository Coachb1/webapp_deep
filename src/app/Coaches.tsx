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
  Loader,
  Search,
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
}

interface FilterCategoriesType {
  filterName: string;
  filterOptions: string[];
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

const Coaches = ({ user }: any) => {
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

  const [coacheeId, setCoacheeId] = useState("");
  const [coachId, setCoachId] = useState("");
  const [feedbackBots, setFeedbackBots] = useState<any[]>([]);
  const [connections, setConnections] = useState<connectionType[]>([]);

  const [userClientInfoData, setUserClientInfoData] =
    useState<UserClientInfoDataType>();

  const [clientDepartments, setClientDepartments] = useState<string[] | null>(
    null
  );

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
        console.log(data.data);
        setClientDepartments(data.data.user_info[0].departments);
      })
      .catch((err) => console.error(err));
  };

  const getCoachesData = async () => {
    //GET COACHES
    await fetch(
      `${baseURL}/accounts/get-directory-informations/?email=${user.email}`,
      {
        method: "GET",
        headers: {
          Authorization: basicAuth,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        const coachbotsProfiles = data.filter(
          (profile: CoachesDataType) => profile.bot_type === "coachbots"
        );
        console.log(coachbotsProfiles, "coachbotsProfiles");

        const allOtherProfiles = data.filter(
          (profile: CoachesDataType) => profile.bot_type !== "coachbots"
        );

        console.log(allOtherProfiles, "allOtherProfiles");

        setSavedCoachesData([...allOtherProfiles]);
        setCoachesData([...allOtherProfiles]);

        setLoading(false);

        const profileTypeOptions: string[] = Array.from(
          new Set(data.map((profile: CoachesDataType) => profile.profile_type))
        );

        const skillsOptions: string[] = Array.from(
          new Set(
            data
              .filter(
                (profile: CoachesDataType) =>
                  profile.profile_type !== "skill_bot"
              )
              .map((profile: CoachesDataType) => profile.skills)
          )
        );

        console.log(
          skillsOptions.filter((skill) => skill !== null && skill !== undefined)
        );

        setCoachSkillsExpertise([
          ...skillsOptions,
          ...[
            "Career Management",
            "Work Life Banlance",
            "Project Management",
            "Lateral Transfers",
          ],
        ]);

        setFilterCategories([
          {
            filterName: "Profile Type",
            filterOptions: [
              "coach",
              "mentor",
              "coachee",
              "mentee",
              "External",
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
                  ],
          },
          {
            filterName: "Coach Skills",
            filterOptions: skillsOptions.filter(
              (skill) => skill !== null && skill !== undefined
            ),
          },
          {
            filterName: "Coach Expertise",
            filterOptions: [
              "Career Management",
              "Work Life Banlance",
              "Project Management",
              "Lateral Transfers",
            ],
          },
        ]);
        if (coacheeIdFromParams) {
          document.getElementById(coacheeIdFromParams)?.scrollIntoView({
            behavior: "smooth",
          });
        }
      })
      .catch((error) => console.log("error", error));
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
        setConnections(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [allCoaches, setAllCoaches] = useState<CoachesDataType[]>([]);
  const [canJoinAs, setCanJoinAs] = useState("");

  const [userBotData, setUserBotData] = useState<any>();

  async function getCanJoinAs(email: string) {
    try {
      const resp = await fetch(
        `${baseURL}/accounts/user-can-join-as/?email=${email}`,
        {
          method: "GET",
          headers: {
            Authorization: basicAuth,
          },
        }
      );

      const respJson = await resp.json();
      console.log(`canJoinAs: ${respJson} ${respJson.can_join_as}`);
      setCanJoinAs(respJson.can_join_as);
    } catch {
      setCanJoinAs("coachee");
    }
  }

  useEffect(() => {
    hideBots();

    if (user) {
      getClientInfoForUser(user.email);
      // getAllConnections();
      getCoachesData();
      getUserAccount(user)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUserId(data.uid);
          getCanJoinAs(user.email);
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

              const isApprovedData = data.data.filter(
                (coachData: any) => coachData.is_approved === true
              );

              if (findCoacheeUID(isApprovedData)) {
                getConnectionsForCoachee(findCoacheeUID(isApprovedData));
              }

              if (isApprovedData.length > 0) {
                setCoacheeId(findCoacheeUID(isApprovedData));
                setCoachId(findCoachUID(isApprovedData));
              } else {
                setCoacheeId("");
                setCoachId("");
              }
            })
            .then((err) => {
              console.error(err);
            });

          fetch(`${baseURL}/accounts/get-bots/?user_id=${data.uid}`, {
            headers: {
              Authorization: basicAuth,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("Bot details for edit", data);

              const FeedbackBot = data.data.filter(
                (data: any) => data.signature_bot.bot_type === "feedback_bot"
              );
              setFeedbackBots(FeedbackBot);

              // const UserBot = data.data.filter(
              //   (data: any) => data.signature_bot.bot_type === "user_bot"
              // );
              // setUserBotData(UserBot);
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
    console.log("INPUT ARRAY ", inputArray);
    if (filterArray.length === 0) {
      return inputArray;
    }

    return inputArray.filter((obj) => {
      // if (filterArray.includes("coach" || "mentor")) {
      //   return (
      //     obj.profile_type &&
      //     filterArray.includes(obj.profile_type.toLowerCase())
      //   );
      // } else {
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
      // }
    });
  }

  const [connectedCoaches, setConnectedCoaches] = useState<CoachesDataType[]>(
    []
  );
  const handleUpdateCheckedValues = (newValues: string[]) => {
    // if (newValues.includes("External")) {
    //   toast.info(
    //     "You do not have access to external coaches and mentors at this time. Please connect with your administrator."
    //   );
    // } else if (
    //   connectedCoaches.length === 0 &&
    //   newValues.includes("accepted")
    // ) {
    //   toast.info("You do not have any connections yet. Keep exploring.");
    // } else {
    setParentCheckedValues(newValues);
    console.log(newValues);
    //for search when empty
    if (newValues.length > 0 && newValues[0].length === 0) {
      setParentCheckedValues([]);
    }

    //for dropdown select
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
    } else if (newValues.includes("coachbots")) {
      const filteredData = filterData(
        newValues.includes("Connected")
          ? coachesData.filter(
              (coachData) => coachData.profile_type === "coachbots"
            )
          : savedCoachesData.filter(
              (coachData) => coachData.profile_type === "coachbots"
            ),
        newValues
      );
      console.log(filteredData);
      setCoachesData(filteredData);
    } else {
      if (newValues.includes("coach")) {
        const filteredData = filterData(
          newValues.includes("Connected")
            ? coachesData.filter(
                (coachData) =>
                  coachData.profile_type === "coach" ||
                  coachData.profile_type.includes("coach-")
              )
            : savedCoachesData.filter(
                (coachData) =>
                  coachData.profile_type === "coach" ||
                  coachData.profile_type.includes("coach-")
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
    }
    // }
  };

  function isConnected(coachStatus: string): boolean {
    return coachStatus === "accepted";
  }

  useEffect(() => {
    console.log("ALL CONNECTIONS : ", connections);
    if (coacheeId.length > 0) {
      const coachesWithStatus = savedCoachesData.map(
        (coach: CoachesDataType) => {
          const connection = connections.find(
            (connection) =>
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

      const connectedCoaches = coachesWithStatus.filter(
        (coach) => coach.status === "accepted"
      );

      const unconnectedCoaches = coachesWithStatus.filter(
        (coach) => !isConnected(coach.status)
      );

      console.log("Connected Coaches", connectedCoaches);

      setConnectedCoaches(connectedCoaches);
      setCoachesData([...connectedCoaches, ...unconnectedCoaches]);
      setSavedCoachesData([...connectedCoaches, ...unconnectedCoaches]);
    }
  }, [connections, coacheeId]);

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
          className="w-[80%] max-sm:w-[90%] max-sm:text-sm border border-gray-300"
          onClick={() => {
            requestConnectHandler();
          }}
        >
          {requestLoading ? (
            <>
              <Loader className="h-4 w-4 animate-spin mr-2" />
              Requesting
            </>
          ) : (
            "Request connection"
          )}
        </Button>
      </>
    );
  };

  return (
    <div className="bg-gray-100 min-h-[120vh] h-full grainy max-sm:h-full max-sm:min-h-screen pb-16">
      <NetworkNav user={user} />

      <MaxWidthWrapper className="flex pt-20 flex-col items-center justify-center text-center">
        <h1 className="text-[#2DC092] border-2 border-[#2DC092] p-[3px] text-xl font-extrabold mt-10 mb-6">
          <span className="bg-[#2DC092] text-white text-lg font-bold mr-[4px] p-[4px]">
            COACH
          </span>
          BOTS
        </h1>
        <h1 className="text-5xl mt-0 font-bold md:text-6xl lg:text-4xl  max-sm:text-2xl text-gray-600 ">
          Coaching, Mentoring & Feedback Network
        </h1>
        <p className="my-2 max-w-prose text-zinc-700 sm:text-lg max-sm:px-8">
          {" "}
          2000+ Strong group of experts & future leaders
        </p>
        <div className="my-4 max-sm:text-xs flex flex-row gap-2 max-sm:flex-wrap justify-center">
          {/* <Button disabled variant={"outline"} className="h-fit w-fit">
            Group coaching (coming soon)
          </Button> */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="outline-none border-none">
              <div>
                {" "}
                <Button variant={"outline"} className="h-fit w-fit">
                  Join the network <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {["coach", "mentor"].includes(canJoinAs) && (
                <DropdownMenuItem disabled={allCoaches.length > 0} asChild>
                  <span
                    onClick={() => {
                      router.push("/intake/?type=coach");
                    }}
                    // href={"/intake/?type=coach"}
                    className="flex flex-row justify-center items-center"
                  >
                    Join as Coach or Mentor{" "}
                    {allCoaches.length > 0 && (
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
                            {allCoaches[0]?.profile_type === "coach" ? (
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
                    )}
                  </span>
                </DropdownMenuItem>
              )}
              {["coachee", "mentee"].includes(canJoinAs) && (
                <DropdownMenuItem disabled={allCoaches.length > 0} asChild>
                  <span
                    onClick={() => {
                      router.push("/intake/?type=coachee");
                    }}
                    // href={"/intake/?type=coachee"}
                    className="flex flex-row justify-center items-center"
                  >
                    Join as Coachee or Mentee
                    {allCoaches.length > 0 && (
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
                    )}
                  </span>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem disabled={feedbackBots.length > 0} asChild>
                <span
                  // href={"/intake/?type=feedback"}
                  onClick={() => {
                    router.push("/intake/?type=feedback");
                  }}
                  className="flex flex-row justify-center items-center"
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
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant={"outline"} className="h-fit w-fit">
            <span
              onClick={() => {
                router.push("/intake/?type=user-bot");
              }}
              className="flex flex-row justify-center items-center"
            >
              Create your Knowledge bot
            </span>
          </Button>
          {/* <Button disabled variant={"outline"} className="h-fit w-fit">
            Whatsapp Community (coming soon)
          </Button> */}
        </div>
        <div id="list" className="min-h-screen w-full max-sm:px-2">
          <div className="my-4">
            <p className="font-semibold text-gray-500 max-sm:text-sm">
              We enable deep and meaningful coaching conversations with AI
              assistance even when life gets busy!
            </p>
          </div>
          <div className="my-4">
            <div className="bg-white flex flex-row items-center p-1.5 py-3 rounded-md shadow-md  ">
              <Search className="h-4 w-4 mr-1 inline" />
              <input
                placeholder="What are you looking for?"
                className="border-l pl-2 outline-none text-sm max-sm:text-xs max-sm:ml-1 w-full"
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
            </div>
          </div>
          <hr className="mt-2" />
          <div className="mt-2 ">
            {/* <div className="w-fit">
              <Badge
                variant={"outline"}
                className="text-lg text-white bg-[#2DC092]"
              >
                My Connects
              </Badge>
            </div> */}
            {loading && (
              <div className="w-full flex flex-row items-center justify-center">
                <div className="flex items-center mt-12">
                  <Loader className="animate-spin h-4 w-4 inline mr-2" />{" "}
                  <span>loading...</span>
                </div>
              </div>
            )}

            {!loading &&
              coachesData.length > 0 &&
              currentCoachesData.map((coach, i) => (
                <div id={coach.profile_id} className="pt-20 mt-[-5rem] -z-10">
                  <div
                    className={`w-full my-3 flex flex-row p-4 max-sm:p-2 bg-gray-200 ${
                      coach.bot_type === "coachbots"
                        ? "shadow-lg shadow-green-300"
                        : ""
                    } border border-gray-300 rounded-md`}
                  >
                    <div className="w-[30%] max-sm:px-2 max-sm:w-[30%] flex flex-col items-center justify-center max-sm:justify-start max-sm:items-start">
                      <img
                        className="w-[250px] h-[250px] max-sm:h-[130px] object-cover"
                        src={coach.profile_pic_url}
                      />
                    </div>
                    <div className="flex flex-row w-[70%] max-sm:w-[70%]  max-sm:flex-col">
                      <div className="w-[70%] max-sm:w-full max-sm:pl-4 max-md:pl-4 flex flex-col justify-start items-start ">
                        <p className="text-xl font-semibold text-gray-700 mt-2 max-sm:mt-0 text-left max-sm:text-lg">
                          {coach.name}
                        </p>
                        <p className="my-1.5 max-sm:text-sm max-sm:my-1 font-medium text-gray-600">
                          {coach.department}
                        </p>
                        <div className="flex flex-row items-center justify-start gap-2">
                          {coach.profile_type === "coach-mentor" ? (
                            <>
                              <Badge
                                className={`rounded-sm px-2 my-1.5 text-base  max-sm:text-sm max-sm:px-1.5 max-sm:my-1`}
                              >
                                {convertTextToCorrectFormat("coach")}
                              </Badge>
                              <Badge
                                className={`rounded-sm px-2 my-1.5 text-base  max-sm:text-sm max-sm:px-1.5 max-sm:my-1`}
                              >
                                {convertTextToCorrectFormat("mentor")}
                              </Badge>
                            </>
                          ) : (
                            <Badge
                              className={`rounded-sm px-2 my-1.5 text-base  max-sm:text-sm max-sm:px-1.5 max-sm:my-1 ${
                                (coach.profile_type === "skill_bot" ||
                                  coach.profile_type === "coachbots") &&
                                "bg-green-500 hover:bg-green-400"
                              }`}
                            >
                              {convertTextToCorrectFormat(coach.profile_type)}
                            </Badge>
                          )}
                        </div>

                        <p className="text-left text-sm font-light my-1.5 max-sm:text-xs max-sm:my-1">
                          {coach.description}
                        </p>
                        <Separator className="my-2 max-sm:my-1.5 bg-gray-400" />
                        {coach.profile_type !== "skill_bot" && (
                          <div className="my-1 text-gray-600 max-sm:text-xs">
                            <p className="text-sm max-sm:text-xs font-light inline">
                              Experience :
                            </p>{" "}
                            <b className="inline">{coach.experience}</b>
                          </div>
                        )}
                        {coach.expertise && (
                          <p className="my-1 text-left text-gray-600 max-sm:text-xs">
                            <p className="text-sm  max-sm:text-xs font-light inline">
                              {" "}
                              Expertise :
                            </p>{" "}
                            <b className="inline">{coach.expertise}</b>
                          </p>
                        )}
                      </div>
                      <div className="w-[30%] max-sm:w-full pb-[20%] max-sm:pb-4 flex flex-col items-center justify-center gap-3">
                        {coach.profile_type === "coach" && (
                          <>
                            {coach.status === "accepted" && (
                              <Button
                                disabled
                                variant={"outline"}
                                className="w-[80%] max-sm:w-[90%] max-sm:text-sm border border-green-300 bg-green-100"
                              >
                                Connected
                              </Button>
                            )}
                            {coach.status === "pending" && (
                              <Button
                                disabled
                                variant={"outline"}
                                className="w-[80%] max-sm:w-[90%] max-sm:text-sm border border-gray-300"
                              >
                                Requested
                              </Button>
                            )}
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
                            <Separator className="bg-gray-400 w-[80%]" />
                          </>
                        )}
                        {coach.avatar_bot_url !== null &&
                          coach.avatar_bot_url !== "" && (
                            <div className="w-full ">
                              <Link href={coach.avatar_bot_url} target="_blank">
                                <Button
                                  variant={"outline"}
                                  className="w-[80%] max-sm:w-[90%] max-sm:text-sm border border-gray-300"
                                >
                                  {coach.profile_type === "skill_bot" ||
                                  coach.profile_type === "coachbots"
                                    ? "Skill Chat"
                                    : "AI Frame"}
                                </Button>
                              </Link>
                            </div>
                          )}
                        {coach.feedback_wall !== null &&
                          coach.feedback_wall !== "" && (
                            <div className="w-full">
                              <Link target="_blank" href={coach.feedback_wall}>
                                <Button
                                  variant={"outline"}
                                  className="w-[80%] max-sm:w-[90%] max-sm:text-sm border border-gray-300"
                                >
                                  Feedback Page
                                </Button>
                              </Link>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {coachesData.length > 10 && (
              <Pagination className="my-10 max-sm:text-xs">
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
                          className="hover:cursor-pointer max-sm:text-xs px-0 w-fit"
                          key={index}
                        >
                          <PaginationLink
                            // href="#"
                            isActive={currentPage === index + 1}
                            onClick={() => paginate(index + 1)}
                            className="max-sm:text-xs max-sm:px-2 max-sm:w-fit"
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
              <div className="w-full flex flex-row items-center justify-center">
                <div className="flex items-center mt-12">
                  {parentCheckedValues.includes("External") ||
                  parentCheckedValues.includes("accepted") ? (
                    <div className="flex flex-col gap-2">
                      {parentCheckedValues.includes("External") && (
                        <span>
                          You do not have access to external coaches and mentors
                          at this time. Please connect with your administrator.
                        </span>
                      )}
                      {parentCheckedValues.includes("accepted") &&
                        connectedCoaches.length === 0 && (
                          <span>
                            You do not have any connections yet. Keep exploring.
                          </span>
                        )}
                    </div>
                  ) : (
                    <>
                      <span>No Data</span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Coaches;
