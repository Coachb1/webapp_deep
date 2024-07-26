"use client";

import CopyToClipboard from "@/components/CopyToClipboard";
import CreateYourOwn from "@/components/CreateYourOwn";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Widgets from "@/components/Widgets";
import { Button } from "@/components/ui/button";
import { Tabs, TabsTrigger } from "@/components/ui/tabs";
import { baseURL, basicAuth, getUserAccount } from "@/lib/utils";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { TabsList } from "@radix-ui/react-tabs";
import {
  BadgePlus,
  ExternalLinkIcon,
  Link2,
  Loader,
  Search,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useSearchParams } from "next/navigation";
import Joyride from "react-joyride";
import { UseHelpMode } from "@/lib/helpmodeContext";
import CreateYourDeepDive from "@/components/CreateYourDeepDive";
import TeamConnect from "@/components/TeamConnect";
import { ClientUserTeamType } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { GoogleGeminiEffectLibrary } from "@/components/ui/GoogleGeminiEffect";
import { Div } from "@/components/ui/moving-border";
import BorderShadow from "@/components/ui/border-shadow";
import { useUser } from "@/context/UserContext";

const CreateOwn = ({
  user,
}: // knowledgeBots,
// // deepdiveCreationAccess,
// restrictedFeatures,
// clientName,
// accessDenied,
// accessAllowed,
// coachId,
// coacheeId,
// clientUsers,
// userRole,
// helpModeText,
{
  user: KindeUser | null;
  // knowledgeBots: {
  //   bot_id: string;
  //   bot_name: string;
  //   description: string;
  //   bot_type: string;
  //   scenario_case: string;
  //   creator_name: string;
  // }[];
  // restrictedFeatures: string;
  // clientName: string;
  // accessDenied: string;
  // accessAllowed: string;
  // coachId: string;
  // coacheeId: string;
  // clientUsers: ClientUserTeamType[];
  // userRole: string;
  // helpModeText: any;
}) => {
  const params = useSearchParams();
  const scrollViewFromParams = params.get("scrollView");
  const [searchMode, setSearchMode] = useState("youtube");
  const [glGenerateLoading, setGlGenerateLoading] = useState(false);

  const [contextPrompt, setContextPrompt] = useState(
    "Please enter the context and search!"
  );

  const [searchInputText, setSearchInputText] = useState<string | undefined>(
    ""
  );

  interface GoogleResultsType {
    link: string;
    title: string;
    decsription: string;
  }
  const [googleSearchResults, setGoogleSearchResults] = useState<
    GoogleResultsType[]
  >([]);

  interface YoutubeResultsType {
    video_id: string;
    video_link: string;
    video_title: string;
    video_description: string;
  }
  const [youtubeSearchResults, setYoutubeSearchResults] = useState<
    YoutubeResultsType[]
  >([]);
  const [excludedIds, setExcludedIds] = useState<string[]>([]);

  const [curatedLearningSearchResults, setCuratedLearningSearchResults] =
    useState<YoutubeResultsType[]>([]);
  const [messageShown, setMessageShown] = useState(false);

  const [scenarioCreationAccess, setScenarioCreationAccess] = useState(false);
  const [deepDiveCreatorAcess, setDeepDiveCreatorAccess] = useState(false);

  const [HelpModeSteps, setHelpModeSteps] = useState<any[]>([]);

  const {
    userInfo: { clientName, helpText: helpModeText, restrictedFeatures },
    clientUsers,
    userId,
    userName,
    knowledgeBots,
    userRole,
    userAccess: { accessDenied },
    coacheeId,
    coachId,
  } = useUser();

  useEffect(() => {
    // if (user) {
    //   getUserAccount(user)
    //     .then((res) => res.json())
    //     .then((data) => {
    //       setUserId(data.uid);
    //     });
    //   console.log(clientName);
    //   console.log(clientUsers);
    // }

    if (
      ["admin", "super_admin", "client_admin", "deep_dive_creator"].includes(
        userRole
      )
    ) {
      setDeepDiveCreatorAccess(true);
    } else {
      if (!accessDenied?.includes("Deepdive-creator")) {
        setDeepDiveCreatorAccess(true);
      }
    }

    if (["admin", "super_admin", "client_admin"].includes(userRole)) {
      setScenarioCreationAccess(true);
    } else {
      if (!accessDenied?.includes("Simulation-creator")) {
        setScenarioCreationAccess(true);
      }
    }

    const dynamicHelpText = helpModeText?.creator_studio;

    setHelpModeSteps([
      {
        target: "#ac-items",
        content: dynamicHelpText?.action_items
          ? dynamicHelpText.action_items
          : "Action items for this page. You can get learning ideas specific to your context and create your own learning.",
      },
      {
        target: "#li-id",
        content: dynamicHelpText?.learning_ideas
          ? dynamicHelpText.learning_ideas
          : "Generate summary learning from various learning videos like TedTalks and Youtube videos. These can then be used for simulation creation as needed. ",
      },
      {
        target: "#sc-id",
        content: dynamicHelpText?.scenario_creator
          ? dynamicHelpText.scenario_creator
          : "From a given user context, create any simulation or roleplay. These can be specific to your organizational use cases . For ideas on what could be created you can refer to the demo page. ",
      },
      {
        target: "#tc-id",
        content: dynamicHelpText?.team_connect
          ? dynamicHelpText.team_connect
          : "Seeking insights from your team? Just ask! For instance, if you're stepping into a new role as a Project Engineer and need guidance on managing your new project manager, simply inquire. The feature will ensure tailored and relevant responses.",
      },
      {
        target: "#dd-id",
        content: dynamicHelpText?.deep_dive
          ? dynamicHelpText.deep_dive
          : "Dive into team dynamics. For Instance, As a project manager seeking insights on team conflicts, create a survey in Deep Dive and circulate it to your team. Gather valuable feedback to resolve conflicts. Note: You can copy the Link and access code to circulate.",
      },
      {
        target: "#kb-id",
        content: dynamicHelpText?.knowledge_bots
          ? dynamicHelpText.knowledge_bots
          : "For enterprise knowledge management, users can take any documents in the repository (or create one) and create a bot based on that knowledge content. It can also be internal department or project-specific bots.",
      },
    ]);

    setTimeout(() => {
      if (scrollViewFromParams) {
        console.log(scrollViewFromParams);
        console.log(document.getElementById(scrollViewFromParams));
        document.getElementById(scrollViewFromParams)?.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 200);
  }, []);

  useEffect(() => {
    if (
      ["admin", "super_admin", "client_admin", "deep_dive_creator"].includes(
        userRole
      )
    ) {
      setDeepDiveCreatorAccess(true);
    } else {
      if (!accessDenied?.includes("Deepdive-creator")) {
        setDeepDiveCreatorAccess(true);
      }
    }

    if (["admin", "super_admin", "client_admin"].includes(userRole)) {
      setScenarioCreationAccess(true);
    } else {
      if (!accessDenied?.includes("Simulation-creator")) {
        setScenarioCreationAccess(true);
      }
    }
  }, [accessDenied]);

  const YoutubeResultComponent = ({
    video_id,
    video_link,
    video_description,
    video_title,
  }: YoutubeResultsType) => {
    const [generatedLoading, setGenerateLoading] = useState(false);
    const [generatedData, setGeneratedData] = useState<
      {
        test_code: string;
        title: string;
        description: string;
      }[]
    >([]);

    const [generationError, setGenerationError] = useState(false);
    const [summaryGenerationLoading, setSummaryGenerationLoading] =
      useState(false);
    const [generatedSummary, setGeneratedSummary] = useState("");

    const [expanded, setExpanded] = useState(false);
    const [expandLoading, setExpandLoading] = useState(false);

    const generatedSenarioHandlerYoutube = () => {
      setGenerateLoading(true);
      setGenerationError(false);

      //GENERATE SIMULATION BASED ON video_descrtion, video_title
      // const apiKey = "AIzaSyCqxQ785vTLNWf0W7ddJAUKZY9nNWO7C6A";
      // const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${video_id}&key=${apiKey}`;
      // fetch(apiUrl)
      //   .then((res) => res.json())
      //   .then((data) => {
      //     const video = data.items[0];

      //     console.log(video.snippet.description, video.snippet.title);
      const url: any = new URL(
        `${baseURL}/tests/get_or_create_test_scenarios_by_site/`
      );
      const params = new URLSearchParams();
      params.set("mode", "A");
      params.set(
        "information",
        JSON.stringify({
          data: {
            information: generatedSummary,
          },
          title: video_title,
        })
      );
      params.set("access_token", basicAuth);
      params.set("creator_user_id", userId);
      url.search = params;

      console.log(url);
      fetch(url, {
        method: "POST",
        headers: {
          Authorization: basicAuth,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Result DATA", data);
          setGeneratedData(data);
          setGenerateLoading(false);
          if (data[0].message || data[1].message) {
            setGenerationError(true);
          }
        })
        .catch((err) => {
          console.error(err);
          setGenerationError(true);
          setGenerateLoading(false);
          toast.error("Error generating your scenario");
        });
      // });

      // //GENERATE SIMULATION BASED ON SUMMARY
      // fetch(
      //   `${baseURL}/tests/create-test-from-links/?url=${video_link}&creator_user_id=${userId}`,
      //   {
      //     method: "GET",
      //     headers: {
      //       Authorization: basicAuth,
      //     },
      //   }
      // )
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log("Result DATA:", data);
      //     setGeneratedData(data);
      //     setGenerateLoading(false);
      //     if (data[0].message || data[1].message) {
      //       setGenerationError(true);
      //     }
      //     setGenerateLoading(false);
      //   })
      //   .catch((err) => {
      //     setGenerationError(true);
      //     toast.error("Error generating your scenario");
      //     setGenerateLoading(false);
      //   });
    };

    function enableDisableResultButton(
      excluded_button: string,
      is_disable = true
    ) {
      excludedIds.push(excluded_button);
      const youtubeComponent = document.getElementById("learning-results");
      const allButtons = youtubeComponent!.querySelectorAll("button");

      allButtons.forEach((button) => {
        if (!excludedIds.includes(button.id)) {
          button.disabled = is_disable;
        }
      });
    }

    const generateYoutubeSummary = (choice: string) => {
      if (choice === "short") {
        setSummaryGenerationLoading(true);
      } else if (choice === "long") {
        setExpandLoading(true);
      }

      fetch(
        `${baseURL}/documents/get-summary/?youtube_link=${video_link}&choice=${choice}`,
        {
          method: "GET",
          headers: {
            Authorization: basicAuth,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (!data.detail) {
            console.log(data);
            setGeneratedSummary(data.summary);
            setGeneratedData([]);

            if (choice === "long") {
              setExpanded(true);
              setExpandLoading(false);
            } else if (choice === "short") {
              setExpanded(false);
              // setSummaryGenerationLoading(false);
            }
          } else {
            toast.error(
              "Restricted video. Summary not available. Please try another.",
              { duration: 6000 }
            );
          }
          setSummaryGenerationLoading(false);
          enableDisableResultButton(`${video_id}`, false);
        })
        .catch((err) => {
          console.error(err);
          setSummaryGenerationLoading(false);
        });
    };
    return (
      <div className="bg-white border border-gray-200 rounded-md p-2">
        <div className="w-full flex flex-row max-sm:flex-col ">
          <div>
            <div>
              <iframe
                id="player"
                className="rounded-sm max-sm:w-full max-lg:w-[95%]"
                src={`https://www.youtube.com/embed/${video_id}`}
                allowFullScreen
                aria-describedby="video-info"
                title={video_title}
              ></iframe>
            </div>
          </div>
          <div className="text-sm max-sm:text-xs text-left text-gray-600 ml-2 max-sm:ml-0 max-sm:my-2 flex flex-col justify-between w-full">
            <div>
              <b className="my-1">{video_title}</b>
              <p className="text-sm max-sm:text-xs my-1">{video_description}</p>
            </div>
            <div className="self-end w-full  flex flex-col max-sm:flex-col gap-2 justify-end text-right max-sm:mt-2">
              <div className="flex flex-row max-sm:flex-col max-sm:w-full gap-2 self-end w-fit">
                <Button
                  disabled={
                    generatedLoading ||
                    summaryGenerationLoading ||
                    expandLoading ||
                    generatedSummary.length > 0
                  }
                  variant="secondary"
                  className="h-8 border border-gray-200 max-sm:w-full max-sm:text-xs"
                  onClick={() => {
                    generateYoutubeSummary("short");
                    enableDisableResultButton(`${video_id}`);
                  }}
                  id={`${video_id}`}
                >
                  {summaryGenerationLoading ? (
                    <>
                      {" "}
                      <Loader className="animate-spin h-4 w-4 mr-2" />{" "}
                      Generating
                    </>
                  ) : (
                    <>Generate Summary</>
                  )}
                </Button>
                {/* <div className="flex flex-row items-center justify-center max-sm:flex-col  gap-2">
                  <Button
                    disabled={!generatedSummary || generatedLoading}
                    variant="secondary"
                    className={`h-8 border   border-gray-200 max-sm:w-full ${
                      generatedSummary.length > 0
                        ? "bg-green-400 hover:bg-green-300 text-white font-semibold"
                        : ""
                    }`}
                    onClick={() => {
                      generatedSenarioHandlerYoutube();
                      // toast.info(
                      //   "The simulation generation may take upto 2 mins. This will also be available in the 'Requested Scenarios' section in the library.",
                      //   { duration: 8000 }
                      // );
                    }}
                  >
                    {generatedLoading ? (
                      <>
                        {" "}
                        <Loader className="animate-spin h-4 w-4 mr-2" />{" "}
                        Generating
                      </>
                    ) : (
                      <>Generate Simulation</>
                    )}
                  </Button>
                </div> */}
              </div>
              {/* {!generatedSummary && (
                <p className="text-xs self-end max-sm:self-center w-fit mt-0">
                  Simulations can be generated after you generate the summary!
                </p>
              )} */}
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 max-sm:flex-col">
          {!generationError &&
            generatedData.length > 0 &&
            generatedData.map((test, i) => (
              <>
                <div className="w-[50%] max-sm:w-full text-sm max-sm:text-xs text-left text-gray-600 p-3 bg-gray-50 mt-2 rounded-md border border-gray-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <b className="my-1 text-gray-400">
                      {i === 0 ? "Simulation" : "Role play"}
                    </b>
                    <p className="text-sm mt-3 font-semibold">{test?.title}</p>
                    <p className="text-[12px] mb-2">{test?.description}</p>
                  </div>
                  <div className="flex justify-end mt-2">
                    <CopyToClipboard
                      textToCopy={test?.test_code!}
                      copyType="code"
                    />
                  </div>
                </div>
              </>
            ))}
          {generationError && (
            <p className="text-red-400 my-8 text-sm max-sm:text-xs w-full text-center">
              Encountered an error while Generating your scenarios. It will be
              saved in "Simulation (Requested Scenario Tab)"
            </p>
          )}
          {!generationError &&
            generatedData.length === 0 &&
            generatedSummary.length > 0 && (
              <div className="w-full  max-sm:w-full text-sm max-sm:text-xs text-left text-gray-600 p-3 bg-gray-50 mt-2 rounded-md border border-gray-200 shadow-sm">
                <b className="my-1">Summary : </b>
                <div>
                  <p>
                    {generatedSummary.split("\n\n").map((text) => (
                      <p className="max-sm:text-xs text-sm my-1 text-gray-600 whitespace-pre-wrap">
                        {text.trim()}
                      </p>
                    ))}
                  </p>
                  {/* {!expanded && (
                  <Button
                    variant={"outline"}
                    onClick={() => {
                      generateYoutubeSummary("long");
                    }}
                    className="h-8 w-fit text-xs p-1 my-1"
                  >
                    {expandLoading ? (
                      <>
                        {" "}
                        <Loader className="animate-spin h-4 w-4" />{" "}
                      </>
                    ) : (
                      <>Expand</>
                    )}
                  </Button>
                )} */}
                  <CopyToClipboard
                    textToCopy={generatedSummary}
                    copyType="Summary"
                  />
                </div>
              </div>
            )}
        </div>
      </div>
    );
  };

  const GoogleResultComponent = ({
    link,
    decsription,
    title,
  }: GoogleResultsType) => {
    const [generatedLoading, setGenerateLoading] = useState(false);
    const [generatedData, setGeneratedData] = useState<
      {
        test_code: string;
        title: string;
        description: string;
      }[]
    >([]);
    const [generationError, setGenerationError] = useState(false);
    const generatedSenarioHandlerGoogle = () => {
      setGenerateLoading(true);
      // const url: any = new URL(
      //   `${baseURL}/tests/get_or_create_test_scenarios_by_site/`
      // );
      // const params = new URLSearchParams();
      // params.set("mode", "A");
      // params.set(
      //   "information",
      //   JSON.stringify({
      //     data: {
      //       information: decsription !== undefined ? decsription : title,
      //     },
      //     title: title,
      //   })
      // );
      // params.set("url", "");
      // params.set("access_token", basicAuth);
      // params.set("creator_user_id", userId);
      // url.search = params;

      // fetch(url, {
      //   method: "POST",
      //   headers: {
      //     Authorization: basicAuth,
      //     "Content-Type": "application/json",
      //   },
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     console.log("Result DATA", data);
      //     setGeneratedData(data);
      //     setGenerateLoading(false);

      //     if (data[0].message || data[1].message) {
      //       setGenerationError(true);
      //       toast.error("Error generating your scenario");
      //     }
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //     setGenerationError(true);
      //     toast.error("Error generating your scenario");
      //     setGenerateLoading(false);
      //   });
      //GENERATE SIMULATION BASED ON SUMMARY
      fetch(
        `${baseURL}/tests/create-test-from-links/?url=${link}&creator_user_id=${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: basicAuth,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Result DATA:", data);
          setGeneratedData(data);
          setGenerateLoading(false);
          if (data[0].message || data[1].message) {
            setGenerationError(true);
          }
          setGenerateLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setGenerationError(true);
          toast.error("Error generating your scenario");
          setGenerateLoading(false);
        });
    };

    return (
      <div className="bg-white border border-gray-200 rounded-md p-2">
        <div className="w-full flex flex-row max-sm:flex-col ">
          <div className="text-sm max-sm:text-xs text-left text-gray-600 ml-2 max-sm:ml-0 max-sm:my-2 flex flex-col justify-between w-full">
            <div className="w-full pt-2">
              <p className="text-lg max-sm:text-sm font-semibold my-1">
                {title}
              </p>
              <p className="my-1">{decsription}</p>
              <div className="underline underline-offset-2 my-1 ">
                <Link
                  target="_blank"
                  href={link}
                  className="block font-semibold text-blue-500 w-fit"
                >
                  {link}{" "}
                  <span>
                    <Link2 className="h-4 w-4 inline" />
                  </span>
                </Link>
              </div>
            </div>
            <div className="self-end w-full text-right max-sm:mt-2 ">
              <Button
                variant="secondary"
                className="h-8 border border-gray-200 max-sm:w-full"
                onClick={() => {
                  generatedSenarioHandlerGoogle();
                  // toast.info(
                  //   "The simulation generation may take upto 2 mins. This will also be available in the 'Requested Scenarios' section in the library.",
                  //   { duration: 8000 }
                  // );
                }}
              >
                {generatedLoading ? (
                  <>
                    {" "}
                    <Loader className="animate-spin h-4 w-4 mr-2" /> Generating
                  </>
                ) : (
                  <>Generate Simulation</>
                )}
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 max-sm:flex-col">
          {!generationError &&
            generatedData.map((test, i) => (
              <>
                <div className="w-[50%] max-sm:w-full text-sm max-sm:text-xs text-left text-gray-600 p-3 bg-gray-50 mt-2 rounded-md border border-gray-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <b className="my-1 text-gray-400">
                      {i === 0 ? "Simulation" : "Role play"}
                    </b>
                    <p className="text-sm mt-3 font-semibold">{test?.title}</p>
                    <p className="text-[12px] mb-2">{test?.description}</p>
                  </div>
                  <div className="flex justify-end mt-2">
                    <CopyToClipboard
                      textToCopy={test?.test_code!}
                      copyType="code"
                    />
                  </div>
                </div>
              </>
            ))}
          {generationError && (
            <p className="text-red-400 my-8 text-sm max-sm:text-xs w-full text-center">
              Encountered an error while Generating your scenarios. It will be
              saved in "Simuation (Requested Scenario Tab)"
            </p>
          )}
        </div>
      </div>
    );
  };

  const [createLoading, setCreateLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const searchContextHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (searchMode === "google") {
      console.log(searchInputText);
      setCreateLoading(true);
      fetch(
        `https://www.googleapis.com/customsearch/v1?key=AIzaSyCbEar5KvvPVTRmm6QrmVmSJSAqylaT_mo&cx=74697a1c8338d4d9a&num=10&q=${searchInputText}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.searchInformation.totalResults !== "0") {
            const formattedSearchResults = data.items.map((item: any) => ({
              link: item.link,
              title: item.pagemap.metatags[0]["og:title"],
              decsription: item.pagemap.metatags[0]["og:description"],
            }));
            setGoogleSearchResults(formattedSearchResults);
          } else {
            setGoogleSearchResults([]);
            setContextPrompt("0 results, Please provide a valid context!");
          }
          setTimeout(() => {
            // setSearchInputText("");
            setCreateLoading(false);
          }, 500);
        });
    } else if (searchMode === "youtube") {
      console.log(searchInputText);
      setCreateLoading(true);
      fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchInputText}&type=video&channelId=UCsT0YIqwnpJCM-mx7-gSA4Q&key=AIzaSyCbEar5KvvPVTRmm6QrmVmSJSAqylaT_mo`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          if (data.pageInfo.resultsPerPage > 0) {
            const formattedVideos = data.items.map((item: any) => ({
              video_id: item.id.videoId,
              video_link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
              video_title: item.snippet.title,
              video_description: item.snippet.description,
            }));
            setYoutubeSearchResults(formattedVideos);
            console.log(formattedVideos);
          } else {
            setYoutubeSearchResults([]);
            setContextPrompt("0 results, Please provide a valid context!");
          }
          setTimeout(() => {
            setCreateLoading(false);
            // setSearchInputText("");
          }, 500);
        });
    } else if (searchMode === "curated-learning") {
      setCreateLoading(true);
      fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchInputText}&type=video&key=AIzaSyCbEar5KvvPVTRmm6QrmVmSJSAqylaT_mo&videoDuration=medium&videoCategoryId=27&relevanceLanguage=en&videoEmbeddable=true`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.pageInfo.resultsPerPage > 0) {
            const formattedVideos = data.items.map((item: any) => ({
              video_id: item.id.videoId,
              video_link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
              video_title: item.snippet.title,
              video_description: item.snippet.description,
            }));
            setCuratedLearningSearchResults(formattedVideos);
            console.log(formattedVideos);
          } else {
            setCuratedLearningSearchResults([]);
            setContextPrompt("0 results, Please provide a valid context!");
          }
          setTimeout(() => {
            setCreateLoading(false);
            // setSearchInputText("");
          }, 500);
        })
        .catch((error) => {
          setCreateLoading(false);
          console.error("Error making API request:", error.message);
        });
    }
  };

  const { helpModeState, updateHelpModeState } = UseHelpMode();
  return (
    <div>
      {helpModeState && (
        <Joyride
          spotlightClicks
          locale={{ last: "End" }}
          continuous
          scrollOffset={250}
          disableScrollParentFix
          callback={(callbackData) => {
            console.log(callbackData);
            if (
              callbackData.action === "close" ||
              callbackData.action === "reset"
            ) {
              updateHelpModeState(false);
            }
          }}
          //@ts-ignore
          steps={HelpModeSteps}
        />
      )}
      <MaxWidthWrapper>
        {" "}
        <GoogleGeminiEffectLibrary
          title="Studio"
          description="Welcome to the Studio, your hub for collaborative
                innovation. Here, you'll find a suite of tools designed to
                empower your team's performance. Generate simulations, resolve
                team queries, assign simulations, craft knowledge bots, and
                generate deep dives. Elevate collaboration and innovation
                effortlessly."
          className="w-full"
          cta={
            <div
              id="category-navbar"
              className="flex  flex-col gap-2 mb-4 justify-center items-center sticky top-0 z-[10]  w-full mt-[-3rem] max-sm:mt-[0rem] max-sm:max-w-[70%]"
            >
              <div className="pb-1 h-20 max-sm:pb-0 flex flex-row justify-center items-center text-center"></div>
              <div className="flex justify-center flex-col gap-2 max-sm:gap-1">
                <div
                  id="nav1"
                  className="flex max-sm:px-2 justify-center flex-row z-50 gap-2 max-sm:gap-1 max-sm:text-xs flex-wrap"
                >
                  {!restrictedFeatures?.includes("Learning-ideas") && (
                    <Button
                      onClick={() => {
                        document
                          .getElementById("learning-ideas")
                          ?.scrollIntoView({
                            behavior: "smooth",
                          });
                      }}
                      className={`h-8 max-sm:text-xs bg-blue-400 text-white hover:bg-blue-300`}
                    >
                      Learning Ideas
                    </Button>
                  )}
                  {scenarioCreationAccess && (
                    <Button
                      onClick={() => {
                        document
                          .getElementById("simulation-creator")
                          ?.scrollIntoView({
                            behavior: "smooth",
                          });
                      }}
                      className={`h-8 max-sm:text-xs bg-blue-400 text-white hover:bg-blue-300`}
                    >
                      Simulation Creator
                    </Button>
                  )}
                  {!restrictedFeatures?.includes("Team-connect") && (
                    <Button
                      onClick={() => {
                        document
                          .getElementById("team-connect")
                          ?.scrollIntoView({
                            behavior: "smooth",
                          });
                      }}
                      className={`h-8 max-sm:text-xs bg-blue-400 text-white hover:bg-blue-300`}
                    >
                      Team Connect
                    </Button>
                  )}

                  {/* {deepDiveCreatorAcess && (
                    <Button
                      onClick={() => {
                        document
                          .getElementById("deepdive-creator")
                          ?.scrollIntoView({
                            behavior: "smooth",
                          });
                      }}
                      className={`h-8 max-sm:text-xs bg-blue-400 text-white hover:bg-blue-300`}
                    >
                      Engagement Survey Bots
                    </Button>
                  )} */}
                  {!restrictedFeatures?.includes("Knowledge-bots") && (
                    <Button
                      onClick={() => {
                        document
                          .getElementById("knowledge-bots")
                          ?.scrollIntoView({
                            behavior: "smooth",
                          });
                      }}
                      className={`h-8 max-sm:text-xs bg-blue-400 text-white hover:bg-blue-300`}
                    >
                      Knowledge Bots
                    </Button>
                  )}
                </div>
              </div>
            </div>
          }
        />
      </MaxWidthWrapper>
      <main className="bg-white min-h-[100vh] h-full max-sm:h-full max-sm:min-h-screen pb-16">
        <div>
          <div>
            <div
              id="learning-ideas"
              className="pt-[10vh] w-full flex flex-col items-center justify-center"
            ></div>
            <div className="max-sm:pb-10 min-h-[20vh] ">
              <MaxWidthWrapper className="flex flex-col items-center justify-center text-center">
                {!restrictedFeatures?.includes("Learning-ideas") && (
                  <div
                    id="learning-ideas"
                    className="flex flex-col max-sm:flex-col w-full mx-auto "
                  >
                    <>
                      <div className="w-full flex flex-col items-center justify-center">
                        <h1
                          id="li-id"
                          className="text-xl mt-2 mb-4 max-sm:text-xl text-gray-600 font-semibold border border-gray-400 py-1 px-4 bg-white rounded-md"
                        >
                          Learning Ideas
                        </h1>
                        <Div
                          className="bg-white text-gray-800"
                          containerClassName="w-[85%] "
                        >
                          <BorderShadow>
                            <div className="w-full rounded-2xl border border-gray-200 p-2 px-4">
                              <form
                                onSubmit={(e: FormEvent<HTMLFormElement>) => {
                                  searchContextHandler(e);
                                }}
                                className="flex flex-col justify-center items-center mt-3"
                              >
                                <div className="w-full max-sm:w-fit mb-1 text-xs flex flex-row gap-2">
                                  <Tabs
                                    className="w-fit self-start text-gray-800"
                                    value={searchMode}
                                    onValueChange={(val) => {
                                      setSearchMode(val);
                                      setContextPrompt(
                                        "Please enter the context and search!"
                                      );
                                      setMessageShown(false);
                                    }}
                                  >
                                    <TabsList className="grid w-full grid-cols-2 bg-gray-200 rounded-sm">
                                      <TabsTrigger
                                        disabled={glGenerateLoading}
                                        className="text-xs p-1 m-1"
                                        value="youtube"
                                      >
                                        TED | TEDx
                                      </TabsTrigger>
                                      <TabsTrigger
                                        disabled={glGenerateLoading}
                                        className="text-xs p-1 m-1"
                                        value="curated-learning"
                                      >
                                        Open Learning
                                      </TabsTrigger>
                                    </TabsList>
                                  </Tabs>
                                </div>
                                <div className="bg-white flex flex-row items-center p-1.5 rounded-md ring-1 shadow-md w-full max-sm:w-full mt-1">
                                  <input
                                    placeholder="Please enter the context to create the scenario"
                                    className="pl-2 outline-none text-sm max-sm:text-xs max-sm:ml-1 w-full py-2 max-sm:py-1 text-gray-800"
                                    type="text"
                                    ref={inputRef}
                                    value={searchInputText}
                                    onChange={(e) => {
                                      setSearchInputText(
                                        inputRef.current?.value
                                      );
                                    }}
                                  />
                                  <Button
                                    type="submit"
                                    disabled={
                                      searchInputText?.length === 0 ||
                                      createLoading
                                    }
                                    className="h-8"
                                  >
                                    {createLoading ? (
                                      <>
                                        {" "}
                                        <span className="font-semibold max-sm:hidden">
                                          Searching
                                        </span>
                                        <Loader
                                          className="h-3 w-3 ml-1.5 max-sm:ml-0 inline animate-spin"
                                          strokeWidth={4}
                                        />
                                      </>
                                    ) : (
                                      <>
                                        <span className="font-semibold max-sm:hidden">
                                          Search
                                        </span>
                                        <Search
                                          className="h-3 w-3 ml-1.5 max-sm:ml-0 inline"
                                          strokeWidth={4}
                                        />
                                      </>
                                    )}
                                  </Button>
                                </div>
                              </form>
                              <div
                                id="learning-results"
                                className="flex flex-col gap-2 mt-4"
                              >
                                {searchMode === "youtube" && (
                                  <>
                                    {createLoading ? (
                                      <>
                                        <div className="h-full w-full text-sm max-sm:text-xs mt-12">
                                          <div className="flex justify-center items-center">
                                            {" "}
                                            <Loader className="h-3 w-3 animate-spin mr-2" />{" "}
                                            <p>loading</p>
                                          </div>
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        {youtubeSearchResults.length > 0 ? (
                                          <>
                                            {youtubeSearchResults.map(
                                              (result, i) => (
                                                <YoutubeResultComponent
                                                  key={i}
                                                  video_link={result.video_link}
                                                  video_id={result.video_id}
                                                  video_title={
                                                    result.video_title
                                                  }
                                                  video_description={
                                                    result.video_description
                                                  }
                                                />
                                              )
                                            )}
                                          </>
                                        ) : (
                                          <>
                                            <div className="h-full w-full text-sm max-sm:text-xs mt-12">
                                              <p>{contextPrompt}</p>
                                            </div>{" "}
                                          </>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                                {searchMode === "curated-learning" && (
                                  <>
                                    {createLoading ? (
                                      <>
                                        <div className="h-full w-full text-sm max-sm:text-xs mt-12">
                                          <div className="flex justify-center items-center">
                                            {" "}
                                            <Loader className="h-3 w-3 animate-spin mr-2" />{" "}
                                            <p>loading</p>
                                          </div>
                                        </div>
                                      </>
                                    ) : (
                                      <>
                                        {curatedLearningSearchResults.length >
                                        0 ? (
                                          <>
                                            {curatedLearningSearchResults.map(
                                              (result, i) => (
                                                <YoutubeResultComponent
                                                  key={i}
                                                  video_link={result.video_link}
                                                  video_id={result.video_id}
                                                  video_title={
                                                    result.video_title
                                                  }
                                                  video_description={
                                                    result.video_description
                                                  }
                                                />
                                              )
                                            )}
                                          </>
                                        ) : (
                                          <>
                                            <div className="h-full w-full text-sm max-sm:text-xs my-10 ">
                                              <p className="text-gray-800">
                                                {contextPrompt}
                                              </p>
                                            </div>{" "}
                                          </>
                                        )}
                                      </>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>
                          </BorderShadow>
                        </Div>
                      </div>
                    </>
                  </div>
                )}
              </MaxWidthWrapper>
            </div>

            {scenarioCreationAccess && (
              <>
                <div className="h-[2px] w-[68%] max-sm:w-full bg-gray-200 my-4 mb-8 mx-auto " />
                <div
                  id="simulation-creator"
                  className="pt-[10vh] w-full flex flex-col items-center justify-center" //pt-[34vh] mt-[-34vh]   max-sm:pt-[42vh] max-sm:mt-[-36vh]
                ></div>
                <div className="h-fit ">
                  <MaxWidthWrapper className="flex flex-col items-center justify-center text-center">
                    <div
                      id="simulation-creator"
                      className="flex flex-col max-sm:flex-col w-full mx-auto "
                    >
                      <div>
                        <div className="w-full flex flex-col items-center justify-center">
                          <h1
                            id="sc-id"
                            className="text-xl mt-2 mb-4 max-sm:text-xl text-gray-600 font-semibold border border-gray-400 py-1 px-4 bg-white rounded-md flex flex-row items-center justify-center"
                          >
                            Simulation Creator{" "}
                            <Badge className="ml-2">Beta</Badge>
                          </h1>
                          <div className="w-full flex flex-col items-center justify-center mb-10">
                            <Div
                              className="text-gray-800"
                              containerClassName="w-[85%]"
                            >
                              <BorderShadow>
                                <CreateYourOwn
                                  clientUsers={clientUsers}
                                  userId={userId}
                                  userName={userName}
                                  user={user}
                                  clientName={clientName}
                                />
                              </BorderShadow>
                            </Div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </MaxWidthWrapper>
                </div>
              </>
            )}

            {!restrictedFeatures?.includes("Team-connect") && (
              <>
                {!accessDenied?.includes("Team-connect") && (
                  <>
                    <div className="h-[2px] w-[68%] max-sm:w-full bg-gray-200 my-4 mb-8 mx-auto " />
                    <div
                      id="team-connect"
                      className="pt-[10vh] w-full flex flex-col items-center justify-center" //pt-[34vh] mt-[-34vh]  max-sm:pt-[42vh] max-sm:mt-[-36vh]
                    ></div>
                    <div className="h-fit ">
                      <MaxWidthWrapper className="flex flex-col items-center justify-center text-center">
                        <div
                          id="team-connect"
                          className="flex flex-col max-sm:flex-col w-full mx-auto "
                        >
                          <div>
                            <div className="w-full flex flex-col items-center justify-center">
                              <h1
                                id="tc-id"
                                className="text-xl mt-2 mb-4 max-sm:text-xl text-gray-600 font-semibold border border-gray-400 py-1 px-4 bg-white rounded-md"
                              >
                                Team Connect
                              </h1>
                              <div className="w-full">
                                <div className="w-full flex flex-col items-center justify-center mb-10">
                                  <div className="flex flex-col max-sm:flex-col w-[85%] max-sm:w-[90%] mx-auto">
                                    <Div
                                      className=""
                                      containerClassName="w-full"
                                    >
                                      <BorderShadow>
                                        <TeamConnect
                                          clientUsers={clientUsers}
                                          clientName={clientName}
                                          coachId={coachId}
                                          coacheeId={coacheeId}
                                        />
                                      </BorderShadow>
                                    </Div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </MaxWidthWrapper>
                    </div>
                  </>
                )}
              </>
            )}
            {/* {deepDiveCreatorAcess && (
              <>
                <div className="h-[2px] w-[68%] max-sm:w-full bg-gray-200 my-4 mb-8 mx-auto " />
                <div
                  id="deepdive-creator"
                  className={`pt-[10vh] w-full flex flex-col items-center justify-center`} //pt-[34vh] mt-[-34vh]  max-sm:pt-[42vh] max-sm:mt-[-36vh]
                ></div>
                <div className="h-fit ">
                  <MaxWidthWrapper className="flex flex-col items-center justify-center text-center">
                    <div
                      id="simulation-creator"
                      className="flex flex-col max-sm:flex-col w-full mx-auto "
                    >
                      <div>
                        <div className="w-full flex flex-col items-center justify-center">
                          <h1
                            id="dd-id"
                            className="text-xl mt-2 mb-4 max-sm:text-xl text-gray-600 font-semibold border border-gray-400 py-1 px-4 bg-white rounded-md  flex flex-row items-center justify-center"
                          >
                            Engagement Survey Bots{" "}
                            <Badge className="ml-2">Beta</Badge>
                          </h1>
                          <div className="w-full">
                            <div className="w-full flex flex-col items-center justify-center mb-10">
                              <div className="flex flex-col max-sm:flex-col w-[85%] max-sm:w-[90%] mx-auto">
                                <Div className="" containerClassName="w-full">
                                  <BorderShadow>
                                    <CreateYourDeepDive
                                      user={user}
                                      userId={userId}
                                    />
                                  </BorderShadow>
                                </Div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </MaxWidthWrapper>
                </div>
              </>
            )} */}
            {!restrictedFeatures?.includes("Knowledge-bots") && (
              <>
                <div className="h-[2px] w-[68%] max-sm:w-full bg-gray-200 my-4 mb-8 mx-auto " />
                <div
                  id="knowledge-bots"
                  className="pt-[10vh] w-full flex flex-col items-center justify-center" //pt-[34vh] mt-[-34vh]  max-sm:pt-[42vh] max-sm:mt-[-36vh]
                ></div>
                <div className="max-sm:pb-10 min-h-[70vh] max-sm:min-h-[60vh]">
                  <MaxWidthWrapper className="flex flex-col items-center justify-center text-center">
                    <div
                      id="knowledge-bots"
                      className="flex flex-col max-sm:flex-col w-full mx-auto "
                    >
                      <div>
                        <div className="w-full flex flex-col items-center justify-center">
                          <h1
                            id="kb-id"
                            className="text-xl mt-2 mb-2 max-sm:text-xl text-gray-600 font-semibold border border-gray-400 py-1 px-4 bg-white rounded-md"
                          >
                            Knowledge Bots
                          </h1>
                          <Button
                            asChild
                            variant={"link"}
                            className="h-fit p-1 px-2 w-fit"
                          >
                            <Link
                              href={"/intake/?type=knowledge-bot"}
                              className="flex flex-row items-center justify-center"
                            >
                              <span>
                                {" "}
                                <BadgePlus className="mr-2 h-4 w-4" />{" "}
                              </span>{" "}
                              Create your knowledge bot
                            </Link>
                          </Button>
                          <div className="w-full mt-3">
                            <div className="max-sm:pb-10">
                              <MaxWidthWrapper className="flex pt-2 flex-col items-center justify-center text-center">
                                <div className="flex flex-col max-sm:flex-col w-full mx-auto">
                                  <div className="w-full flex flex-col items-center justify-center">
                                    <div className="flex flex-col max-sm:flex-col w-[64%] max-sm:w-[90%] max-lg:w-[100%] mx-auto">
                                      <>
                                        <div className="w-full">
                                          <div className="relative isolate mx-auto">
                                            <div>
                                              <div className="mx-auto w-full max-sm:w-[100%] z-50">
                                                <div className="rounded-xl bg-white ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl max-sm:w-[100%]">
                                                  <Div
                                                    className=""
                                                    containerClassName="w-full"
                                                  >
                                                    <BorderShadow>
                                                      <Accordion
                                                        type="single"
                                                        collapsible
                                                        className="w-full  text-slate-900 rounded-2xl bg-white overflow-clip border"
                                                      >
                                                        {knowledgeBots.length ===
                                                        0 ? (
                                                          <p className="my-4 text-sm ">
                                                            There are no
                                                            community created
                                                            guides yet!
                                                          </p>
                                                        ) : (
                                                          knowledgeBots.map(
                                                            (bot, i) => (
                                                              <AccordionItem
                                                                key={i}
                                                                value={`${i}-knowledge-bot`}
                                                                className={`px-4 ${
                                                                  knowledgeBots.length -
                                                                    1 ==
                                                                    i &&
                                                                  "border-b-0"
                                                                }`}
                                                              >
                                                                <AccordionTrigger className="text-left text-sm max-sm:text-[14px]">
                                                                  <div className="flex flex-col items-start">
                                                                    <span>
                                                                      {
                                                                        bot.bot_name
                                                                      }
                                                                    </span>
                                                                    <span className="text-xs font-semibold my-1 max-sm:text-[12px]">
                                                                      Created by{" "}
                                                                      <span className="font-extrabold">
                                                                        {
                                                                          bot.creator_name
                                                                        }
                                                                      </span>
                                                                    </span>
                                                                  </div>
                                                                </AccordionTrigger>
                                                                <AccordionContent className="max-sm:text-xs">
                                                                  <p className="text-left">
                                                                    {
                                                                      bot.description
                                                                    }
                                                                  </p>
                                                                  <div className="flex justify-end mt-2">
                                                                    <Link
                                                                      target="_blank"
                                                                      href={`/knowledge-bot/${bot.bot_id}`}
                                                                    >
                                                                      <Button
                                                                        variant={
                                                                          "secondary"
                                                                        }
                                                                        className="p-2 h-8 border border-gray-200 max-sm:text-xs"
                                                                      >
                                                                        Visit
                                                                        bot{" "}
                                                                        <ExternalLinkIcon className="h-4 w-4 ml-2" />
                                                                      </Button>
                                                                    </Link>
                                                                  </div>
                                                                </AccordionContent>
                                                              </AccordionItem>
                                                            )
                                                          )
                                                        )}
                                                      </Accordion>
                                                    </BorderShadow>
                                                  </Div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    </div>
                                  </div>
                                </div>
                              </MaxWidthWrapper>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </MaxWidthWrapper>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <Widgets />
    </div>
  );
};

export default CreateOwn;
