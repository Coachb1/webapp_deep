"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import NavProfile from "@/components/NavProfile";
import Widgets from "@/components/Widgets";
import { BookmarkCheck, PiIcon, Workflow } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Script from "next/script";

const subdomain =
  typeof window !== "undefined" ? window.location.hostname.split(".")[0] : null;
// const devUrl = "https://coach-api-ovh.coachbots.com/api/v1";
const devUrl = "https://coach-api-gcp.coachbots.com/api/v1";
const prodUrl = "https://coach-api-prod-ovh.coachbots.com/api/v1";
const baseURL = subdomain === "playground" ? devUrl : prodUrl;

const Coach = ({ user }: any) => {
  console.log(user);
  const pathname: any = usePathname();
  const coach_id = pathname.split("/")[2];
  console.log(coach_id);
  return (
    <div className="bg-gray-100 min-h-screen h-full grainy max-sm:h-full max-sm:min-h-screen pb-16">
      <div className="fixed w-full flex items-center justify-end p-4 h-6 py-8 !z-[800]">
        {/* {!user && (
          <Badge
            variant={"secondary"}
            className="bg-[#2DC092] h-6 text-white mr-4 hover:bg-[#2DC092] z-50 max-sm:text-[10px] max-sm:h-10 truncate max-sm:mt-[5.5rem] max-sm:-mr-16" //max-sm:text-[12px] max-sm:mt-[4.5rem] max-sm:-mr-16 | max-sm:hidden
          >
            ✨ Sign up to get the EQ Acess{" "}
            <br className="hidden max-sm:inline" /> (Workplace emails only)
            <ArrowRight className="ml-2 w-4 h-4 max-sm:hidden" />{" "}
            <ArrowUp className="ml-2 w-4 h-4 hidden max-sm:block" />
          </Badge>
        )} */}
        <NavProfile user={user} />
      </div>
      <div className="flex pt-20 flex-col items-center justify-center text-center px-24 max-sm:px-8">
        {/* <h1 className="text-[#2DC092] border-2 border-[#2DC092] p-[3px] text-xl font-extrabold mt-10 mb-6">
          <span className="bg-[#2DC092] text-white text-lg font-bold mr-[4px] p-[4px]">
            COACH
          </span>
          BOTS
        </h1> */}
        <div>
          <h1 className="text-5xl mt-16 font-bold md:text-6xl lg:text-4xl text-gray-700 max-sm:text-3xl max-sm:px-4 bg-gradient-to-br from-gray-700 to-gray-400 bg-clip-text text-transparent">
            Welcome Lorem ipsum dolor sit amet.
          </h1>
          <p className="my-4 max-sm:text-sm text-[#7f7f7f]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
            inventore illo dolorem eligendi debitis fugiat molestiae modi,
            quibusdam eius doloremque voluptates adipisci odio minus quis vitae
            veniam, cumque exercitationem et ratione. Eius non natus officia
            omnis accusamus a. Fugit, iusto obcaecati nam amet eum ab repellat
            similique minus modi praesentium.
          </p>
        </div>

        <div className="w-full text-center flex flex-col justify-center items-center my-8">
          <div className="my-5 mb-2 text-blue-500 font-semibold w-fit ">
            {" "}
            <Workflow className="h-5 w-5 mr-1 inline" />{" "}
            <p className="border-b-2 border-blue-400 inline text-xl">
              {" "}
              How it works?
            </p>
          </div>
          <div className="text-[#7f7f7f] max-sm:text-sm my-8 ml-6">
            <div className="w-full flex flex-row justify-center gap-3 items-center ">
              <div className="w-[50%] flex justify-end border-r border-gray-300 py-6">
                <Image
                  src={"/undraw_selection_f3no.svg"}
                  width={270}
                  height={270}
                  alt="working-1"
                  className="p-8"
                />
              </div>
              <div className="w-[50%] h-full text-left ml-3 text-sm max-sm:text-xs">
                <p className="text-xl font-bold text-blue-500 ">1</p>
                <h1 className="font-bold text-gray-700">
                  therr js Lorem ipsum dolor sit.
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Maxime maiores obcaecati officia!
                </p>
              </div>
            </div>
            <div className="w-full flex flex-row justify-center gap-3 items-center max-sm:text-xs">
              <div className="w-[50%] h-full text-right pr-16 text-sm max-sm:text-xs">
                <p className="text-xl font-bold text-blue-500 w-full">2</p>
                <h1 className="font-bold text-gray-700">
                  therr js Lorem ipsum dolor sit.
                </h1>
                <p className="">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Maxime maiores obcaecati officia!
                </p>
              </div>
              <div className="w-[50%] flex justify-start border-l border-gray-300 py-6 -ml-[2.40rem]">
                <Image
                  src={"/undraw_selection_f3no.svg"}
                  width={270}
                  height={270}
                  alt="working-1"
                  className="p-8"
                />
              </div>
            </div>
            <div className="w-full flex flex-row justify-center gap-3 items-center ">
              <div className="w-[50%] flex justify-end border-r border-gray-300 py-6">
                <Image
                  src={"/undraw_selection_f3no.svg"}
                  width={270}
                  height={270}
                  alt="working-1"
                  className="p-8"
                />
              </div>
              <div className="w-[50%] h-full text-left ml-3 text-sm max-sm:text-xs">
                <p className="text-xl font-bold text-blue-500 ">3</p>
                <h1 className="font-bold text-gray-700">
                  therr js Lorem ipsum dolor sit.
                </h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Maxime maiores obcaecati officia!
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full text-center flex flex-col justify-center items-center my-8 max-sm:mt-2">
          <p className="my-5 text-blue-500 font-semibold w-fit ">
            {" "}
            <BookmarkCheck className="h-5 w-5 mr-1 inline" />{" "}
            <p className="border-b-2 border-blue-400 inline text-xl">
              {" "}
              Benefits
            </p>
          </p>
          <div className="w-full grid auto-rows-[192px] grid-cols-3 max-sm:flex max-sm:flex-col gap-4 mx-auto my-8">
            <div
              className={`row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-100 p-4 dark:bg-neutral-900 flex flex-col justify-center items-center shadow-sm`}
            >
              <div>
                <PiIcon className="h-8 w-8 stroke-gray-600" stroke="10" />
              </div>
              <p className="text-sm max-sm:text-xs text-slate-600">
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                libero fugiat corrupti ut nobis excepturi omnis ipsum velit
                aperiam explicabo?
              </p>
            </div>
            <div
              className={`row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-100 p-4 dark:bg-neutral-900 flex flex-col justify-center items-center shadow-sm`}
            >
              <div>
                <PiIcon className="h-8 w-8 stroke-gray-600" stroke="10" />
              </div>
              <p className="text-sm max-sm:text-xs text-slate-600">
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                libero fugiat corrupti ut nobis excepturi omnis ipsum velit
                aperiam explicabo?
              </p>
            </div>
            <div
              className={`row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-100 p-4 dark:bg-neutral-900 flex flex-col justify-center items-center shadow-sm`}
            >
              <div>
                <PiIcon className="h-8 w-8 stroke-gray-600" stroke="10" />
              </div>
              <p className="text-sm max-sm:text-xs text-slate-600">
                {" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                libero fugiat corrupti ut nobis excepturi omnis ipsum velit
                aperiam explicabo?
              </p>
            </div>
          </div>
        </div>

        <div className="w-full text-center flex flex-col justify-center items-center my-16 max-sm:my-8">
          <p className="w-[80%]  text-[#7f7f7f] text-sm">
            <b>Disclaimer </b> : Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Aut, porro! Reiciendis mollitia officiis veritatis
            animi ullam quaerat ea quia, temporibus deserunt provident, beatae
            ducimus? Pariatur veritatis nisi minus nam provident!
          </p>
        </div>
        <Widgets />
      </div>
    </div>
  );
};

export default Coach;
