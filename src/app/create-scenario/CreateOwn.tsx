"use client";

import BotsNavigation from "@/components/BotsNavigation";
import CopyToClipboard from "@/components/CopyToClipboard";
import NavProfile from "@/components/NavProfile";
import NetworkNav from "@/components/NetworkNav";
import Widgets from "@/components/Widgets";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { baseURL, basicAuth } from "@/lib/utils";
import { TabsList } from "@radix-ui/react-tabs";
import { Link2, Loader, Network, Search } from "lucide-react";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { toast } from "sonner";

const CreateOwn = ({ user }: any) => {
  const [searchMode, setSearchMode] = useState("google");
  const [glGenerateLoading, setGlGenerateLoading] = useState(false);

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

  const YoutubeResultComponent = ({
    video_id,
    video_link,
    video_description,
    video_title,
  }: YoutubeResultsType) => {
    const [generatedLoading, setGenerateLoading] = useState(false);
    const [generatedData, setGeneratedData] = useState<{
      test_code: string;
      title: string;
      description: string;
    }>();

    const generatedSenarioHandlerYoutube = () => {
      setGenerateLoading(true);

      const apiKey = "AIzaSyCqxQ785vTLNWf0W7ddJAUKZY9nNWO7C6A";
      const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${video_id}&key=${apiKey}`;
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          const video = data.items[0];

          console.log(video.snippet.description, video.snippet.title);
          const url: any = new URL(
            `${baseURL}/tests/get_or_create_test_scenarios_by_site/`
          );
          const params = new URLSearchParams();
          params.set("mode", "A");
          params.set(
            "information",
            JSON.stringify({
              data: { information: video.snippet.description },
              title: video.snippet.title,
            })
          );
          params.set("url", "");
          params.set("access_token", basicAuth);
          url.search = params;

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
              setGeneratedData(data[0]);
              setGenerateLoading(false);
            })
            .catch((err) => {
              console.error(err);
              toast.error("Error generating your scenario");
            });
        });
    };
    return (
      <div className="bg-white border border-gray-200 rounded-md p-2">
        <div className="w-full flex flex-row max-sm:flex-col ">
          <div>
            <div>
              <iframe
                id="player"
                className="rounded-sm max-sm:w-full"
                src={`https://www.youtube.com/embed/${video_id}`}
                allowFullScreen
                aria-describedby="video-info"
                title={video_title}
              ></iframe>
            </div>
          </div>
          <div className="text-sm max-sm:text-xs text-left text-gray-600 ml-2 max-sm:ml-0 max-sm:my-2 flex flex-col justify-between w-full">
            <div>
              <b>{video_title}</b>
              <p>{video_description}</p>
            </div>
            <div className="self-end w-full text-right max-sm:mt-2">
              <Button
                variant="secondary"
                className="h-8 border border-gray-200 max-sm:w-full"
                onClick={generatedSenarioHandlerYoutube}
              >
                {generatedLoading ? (
                  <>
                    {" "}
                    <Loader className="animate-spin h-4 w-4 mr-2" /> Generating
                  </>
                ) : (
                  <>Generate</>
                )}
              </Button>
            </div>
          </div>
        </div>
        {generatedData?.test_code && (
          <>
            <div className="text-sm max-sm:text-xs text-left text-gray-600 p-3 bg-gray-50 mt-2 rounded-md border border-gray-200 shadow-sm">
              <b>Here's your scenario : </b>
              <div>
                <p className="text-base font-semibold">
                  {generatedData?.title}
                </p>
                <p>{generatedData?.description}</p>
              </div>
              <div className="flex justify-end mt-2">
                <CopyToClipboard textToCopy={generatedData?.test_code!} />
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  const GoogleResultComponent = ({
    link,
    decsription,
    title,
  }: GoogleResultsType) => {
    const [generatedLoading, setGenerateLoading] = useState(false);
    const [generatedData, setGeneratedData] = useState<{
      test_code: string;
      title: string;
      description: string;
    }>();
    const generatedSenarioHandlerGoogle = () => {
      setGenerateLoading(true);
      const url: any = new URL(
        `${baseURL}/tests/get_or_create_test_scenarios_by_site/`
      );
      const params = new URLSearchParams();
      params.set("mode", "A");
      params.set(
        "information",
        JSON.stringify({
          data: { information: decsription },
          title: title,
        })
      );
      params.set("url", "");
      params.set("access_token", basicAuth);
      url.search = params;

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
          setGeneratedData(data[0]);
          setGenerateLoading(false);
        })
        .catch((err) => {
          console.error(err);
          toast.error("Error generating your scenario");
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
                }}
              >
                {generatedLoading ? (
                  <>
                    {" "}
                    <Loader className="animate-spin h-4 w-4 mr-2" /> Generating
                  </>
                ) : (
                  <>Generate</>
                )}
              </Button>
            </div>
          </div>
        </div>
        {generatedData?.test_code && (
          <>
            <div className="text-sm max-sm:text-xs text-left text-gray-600 p-3 bg-gray-50 mt-2 rounded-md border border-gray-200 shadow-sm">
              <b>Here's your scenario : </b>
              <div>
                <p className="text-base font-semibold">
                  {generatedData?.title}
                </p>
                <p>{generatedData?.description}</p>
              </div>
              <div className="flex justify-end mt-2">
                <CopyToClipboard textToCopy={generatedData?.test_code!} />
              </div>
            </div>
          </>
        )}
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
          const formattedSearchResults = data.items.map((item: any) => ({
            link: item.link,
            title: item.pagemap.metatags[0]["og:title"],
            decsription: item.pagemap.metatags[0]["og:description"],
          }));
          setGoogleSearchResults(formattedSearchResults);

          setTimeout(() => {
            setSearchInputText("");
            setCreateLoading(false);
          }, 500);
        });
    } else if (searchMode === "youtube") {
      console.log(searchInputText);
      setCreateLoading(true);
      fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchInputText}&type=video&channelId=UCsT0YIqwnpJCM-mx7-gSA4Q&key=AIzaSyCqxQ785vTLNWf0W7ddJAUKZY9nNWO7C6A`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          const formattedVideos = data.items.map((item: any) => ({
            video_id: item.id.videoId,
            video_link: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            video_title: item.snippet.title,
            video_description: item.snippet.description,
          }));
          setYoutubeSearchResults(formattedVideos);
          console.log(formattedVideos);

          setTimeout(() => {
            setCreateLoading(false);
            setSearchInputText("");
          }, 500);
        });
    }
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen h-full grainy max-sm:h-full max-sm:min-h-screen pb-16">
        <div className="fixed w-full flex items-center justify-end p-4 h-6 py-8 !z-[800]">
          <NetworkNav user={user} />
        </div>
        <div className="flex pt-10 flex-col items-center justify-center text-center px-24 max-md:px-10 max-lg:px-10 max-sm:px-8">
          <h1 className="text-[#2DC092] border-2 border-[#2DC092] p-[3px] text-xl font-extrabold mt-10 mb-6">
            <span className="bg-[#2DC092] text-white text-lg font-bold mr-[4px] p-[4px]">
              COACH
            </span>
            BOTS
          </h1>

          <div className="w-full">
            <h1 className="text-2xl font-semibold text-gray-600">
              Create your own scenario
            </h1>
            <form
              onSubmit={(e: FormEvent<HTMLFormElement>) => {
                searchContextHandler(e);
              }}
              className="flex flex-col justify-center items-center mt-3"
            >
              <div className="w-[80%] max-sm:w-full mb-1 text-xs">
                <Tabs
                  className="w-fit self-start"
                  value={searchMode}
                  onValueChange={(val) => {
                    setSearchMode(val);
                  }}
                >
                  <TabsList className="grid w-full grid-cols-2 bg-gray-200 rounded-sm">
                    <TabsTrigger
                      disabled={glGenerateLoading}
                      className="text-xs p-1 m-1"
                      value="google"
                    >
                      Google
                    </TabsTrigger>
                    <TabsTrigger
                      disabled={glGenerateLoading}
                      className="text-xs p-1 m-1"
                      value="youtube"
                    >
                      Youtube | TEDx
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="bg-white flex flex-row items-center p-1.5 rounded-md ring-1 shadow-md w-[80%] max-sm:w-full mt-1">
                <input
                  placeholder="Please enter the context to create the scenario"
                  className="pl-2 outline-none text-sm max-sm:text-xs max-sm:ml-1 w-full py-2 max-sm:py-1"
                  type="text"
                  ref={inputRef}
                  value={searchInputText}
                  onChange={(e) => {
                    setSearchInputText(inputRef.current?.value);
                  }}
                />
                <Button
                  type="submit"
                  disabled={searchInputText?.length === 0 || createLoading}
                  className="h-8"
                >
                  {createLoading ? (
                    <>
                      {" "}
                      <span className="font-semibold">Searching</span>
                      <Loader
                        className="h-3 w-3 ml-1.5 inline animate-spin"
                        strokeWidth={4}
                      />
                    </>
                  ) : (
                    <>
                      <span className="font-semibold">Search</span>
                      <Search
                        className="h-3 w-3 ml-1.5 inline"
                        strokeWidth={4}
                      />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
          <b className="my-2 w-[80%] max-sm:w-full text-left text-gray-600">
            Results :{" "}
          </b>
          <div className="w-[80%] max-sm:w-full flex flex-col gap-2">
            {searchMode === "google" && (
              <>
                {googleSearchResults.length > 0 ? (
                  <>
                    {googleSearchResults.map((result) => (
                      <GoogleResultComponent
                        link={result.link}
                        title={result.title}
                        decsription={result.decsription}
                      />
                    ))}
                  </>
                ) : (
                  <>
                    <div className="h-full w-full text-sm max-sm:text-xs mt-12">
                      <p>Please enter the context and search!</p>
                    </div>
                  </>
                )}
              </>
            )}
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
                        {youtubeSearchResults.map((result) => (
                          <YoutubeResultComponent
                            video_link={result.video_link}
                            video_id={result.video_id}
                            video_title={result.video_title}
                            video_description={result.video_description}
                          />
                        ))}
                      </>
                    ) : (
                      <>
                        <div className="h-full w-full text-sm max-sm:text-xs mt-12">
                          <p>Please enter the context and search!</p>
                        </div>{" "}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Widgets />
    </>
  );
};

export default CreateOwn;
