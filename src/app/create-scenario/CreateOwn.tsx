"use client";

import BotsNavigation from "@/components/BotsNavigation";
import CopyToClipboard from "@/components/CopyToClipboard";
import NavProfile from "@/components/NavProfile";
import Widgets from "@/components/Widgets";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsTrigger } from "@/components/ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import { Link2, Search, Youtube } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const CreateOwn = ({ user }: any) => {
  const [searchMode, setSearchMode] = useState("google");

  const YoutubeResultComponent = () => {
    return (
      <div className="bg-white border border-gray-200 rounded-md p-2">
        <div className="w-full flex flex-row max-sm:flex-col ">
          <div>
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                className="rounded-sm max-sm:w-full"
                src="https://www.youtube.com/embed/ThokUd1sdmw"
                allowFullScreen
                aria-describedby="video-info"
                title="Makers Lab promotional video"
              ></iframe>
            </div>
          </div>
          <div className="text-sm max-sm:text-xs text-left text-gray-600 ml-2 max-sm:ml-0 max-sm:my-2 flex flex-col justify-between">
            <div>
              <b>title : Lorem ipsum dolor sit amet.</b>
              <p>
                description : Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Reiciendis mollitia quos deserunt ipsa cupiditate. Quae?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                dolor laborum reprehenderit sequi quod similique est porro odio
                culpa sint.
              </p>
            </div>
            <div className="self-end w-full text-right max-sm:mt-2">
              <Button
                variant="secondary"
                className="h-8 border border-gray-200 max-sm:w-full "
              >
                Generate
              </Button>
            </div>
          </div>
        </div>
        <Separator className="my-2  w-full" />
        <div className="text-sm max-sm:text-xs text-left text-gray-600 pl-2">
          <b>Here's your scenario</b>
          <div>
            <p>title : Lorem ipsum dolor sit amet.</p>
            <p>
              description : Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Reiciendis mollitia quos deserunt ipsa cupiditate. Quae?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
              dolor laborum reprehenderit sequi quod similique est porro odio
              culpa sint.
            </p>
          </div>
          <div className="flex justify-end mt-2">
            <CopyToClipboard textToCopy={"lorem bro"} />
          </div>
        </div>
      </div>
    );
  };

  const GoogleResultComponent = () => {
    return (
      <div className="bg-white border border-gray-200 rounded-md p-2">
        <div className="w-full flex flex-row max-sm:flex-col ">
          <div className="text-sm max-sm:text-xs text-left text-gray-600 ml-2 max-sm:ml-0 max-sm:my-2 flex flex-col justify-between">
            <div>
              <div className="underline underline-offset-2 my-1">
                <Link
                  target="_blank"
                  href={"link"}
                  className="block font-semibold"
                >
                  Lorem ipsum dolor sit amet consectetur.{" "}
                  <span>
                    <Link2 className="h-4 w-4 inline" />
                  </span>
                </Link>
              </div>
              <b>title : Lorem ipsum dolor sit amet.</b>
              <p>
                description : Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Reiciendis mollitia quos deserunt ipsa cupiditate. Quae?
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
                dolor laborum reprehenderit sequi quod similique est porro odio
                culpa sint.
              </p>
            </div>
            <div className="self-end w-full text-right max-sm:mt-2">
              <Button
                variant="secondary"
                className="h-8 border border-gray-200 max-sm:w-full "
              >
                Generate
              </Button>
            </div>
          </div>
        </div>
        {/* <Separator className="my-2  w-full" />
        <div className="text-sm max-sm:text-xs text-left text-gray-600 pl-2">
          <b>Here's your scenario</b>
          <div>
            <p>title : Lorem ipsum dolor sit amet.</p>
            <p>
              description : Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Reiciendis mollitia quos deserunt ipsa cupiditate. Quae?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
              dolor laborum reprehenderit sequi quod similique est porro odio
              culpa sint.
            </p>
          </div>
          <div className="flex justify-end mt-2">
            <CopyToClipboard textToCopy={"lorem bro"} />
          </div>
        </div> */}
      </div>
    );
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen h-full grainy max-sm:h-full max-sm:min-h-screen pb-16">
        <div className="fixed w-full flex items-center justify-end p-4 h-6 py-8 !z-[800]">
          {/* <NavProfile user={user} /> */}
          {/* <BotsNavigation user={user} /> */}
        </div>
        <div className="flex pt-5 flex-col items-center justify-center text-center px-24 max-sm:px-8">
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
            <div className="flex flex-col justify-center items-center mt-3">
              <div className="w-[80%] max-sm:w-full mb-1 text-xs">
                <Tabs
                  className="w-fit self-start"
                  value={searchMode}
                  onValueChange={(val) => {
                    setSearchMode(val);
                  }}
                >
                  <TabsList className="grid w-full grid-cols-2 bg-gray-200 rounded-sm">
                    <TabsTrigger className="text-xs p-1 m-1" value="google">
                      Google
                    </TabsTrigger>
                    <TabsTrigger className="text-xs p-1 m-1" value="youtube">
                      Youtube
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="bg-white flex flex-row items-center p-1.5 rounded-md ring-1 shadow-md w-[80%] max-sm:w-full mt-1">
                <input
                  placeholder="Please enter the context to create the senario"
                  className="pl-2 outline-none text-sm max-sm:text-xs max-sm:ml-1 w-full py-2 max-sm:py-1"
                  type="text"
                  onChange={(e) => console.log(e)}
                />
                <Button className="h-8">
                  <span className="font-semibold">Search</span>
                  <Search className="h-3 w-3 ml-1 inline" strokeWidth={4} />
                </Button>
              </div>
            </div>
          </div>
          <b className="my-2 w-[80%] max-sm:w-full text-left text-gray-600">
            Results :{" "}
          </b>
          <div className="w-[80%] max-sm:w-full flex flex-col gap-2">
            <GoogleResultComponent />
            {/* <YoutubeResultComponent />
            <YoutubeResultComponent />
            <YoutubeResultComponent /> */}
          </div>
        </div>
      </div>
      <Widgets />
    </>
  );
};

export default CreateOwn;
