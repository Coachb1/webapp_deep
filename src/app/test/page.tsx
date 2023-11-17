import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

const Page = () => {
  return (
    <>
      <div>
        <p className="mb-0 p-1 text-sm z-[999] border-2 w-fit m-2 bg-amber-100 max-sm:text-xs rounded-lg">
          Lorem ipsum dolor, sit amet consectetur e aperiam illum distinctio
          neque?
        </p>
        <h1 className="text-3xl p-4 pt-2 font-extrabold text-slate-800 drop-shadow-xl z-[-1] rounded-lg border-2 m-2 mt-0 text-center">
          Skills Rating
        </h1>
      </div>
      <div>
        <p className="mb-0 p-1 text-sm z-[999] border-2 w-fit m-2 bg-amber-100 max-sm:text-xs rounded-lg">
          Lorem ipsum dolor, sit amet consectetur e aperiam illum distinctio
          neque?
        </p>
        <div
          id="transcript_heading"
          style={{ fontWeight: "bold", backgroundColor: "#E7E1E1" }}
          className="flex h-fit w-full flex-col items-center justify-start rounded-md p-4  md:w-10/12"
        >
          <div className="text-center text-3xl  font-bold">
            Transcript and detailed feedback
          </div>
        </div>
      </div>

      <br />
      <br />
      <br />

      {/* <div> */}
      <div className=" p-4 pt-2  text-slate-800 drop-shadow-xl z-[-1] rounded-lg border-2 m-2 mt-0 text-center flex flex-row items-center justify-center">
        <p className="text-3xl font-extrabold">Skills Rating</p>{" "}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="ml-2 h-4 w-4 hover:cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non,
                asperiores expedita ullam perferendis ipsa amet. Sunt minus
                voluptate iusto. Dignissimos!
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {/* </div> */}

      <br />
      <br />
      <br />

      <div className="w-full flex justify-center">
        <h1 className="text-[#2DC092] border-2 border-[#2DC092] p-[3px] text-xl font-extrabold mt-10 mb-8">
          <span className="bg-[#2DC092] text-white text-lg font-bold mr-[4px] p-[4px]">
            COACH
          </span>
          BOTS
        </h1>
      </div>

      <div
        id="transcript_heading"
        style={{ fontWeight: "bold", backgroundColor: "#E7E1E1" }}
        className="flex h-fit w-full flex-col  rounded-md p-4  md:w-10/12 mt-[4rem]"
      >
        <p className="mt-[-3rem] p-1 text-left font-normal text-sm border-2 w-fit m-2 bg-amber-100 max-sm:text-xs rounded-lg">
          Lorem ipsum dolor, sit amet consectetur e aperiam illum distinctio
          neque?
        </p>
        <div className="text-center text-3xl  font-bold">
          Transcript and detailed feedback
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />

      <div>
        <div
          id="transcript_heading"
          style={{ fontWeight: "bold", backgroundColor: "#E7E1E1" }}
          className="ml-2 flex h-fit w-full flex-col items-center justify-start rounded-md p-4  md:w-10/12"
        >
          <div className="text-center text-3xl  font-bold">
            Transcript and detailed feedback
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
