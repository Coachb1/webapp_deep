import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import HeroAccordion from "@/components/HeroAccordion";
import Image from "next/image";

import { constructMetadata } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookText, Mic, Text } from "lucide-react";
import { Audiotests, TextTests } from "@/lib/test";

export const metadata = constructMetadata();

export default function page() {
  return (
    <div className="bg-gray-100 min-h-[120vh] h-fit grainy max-sm:h-screen max-sm:min-h-screen">
      <MaxWidthWrapper className="mb-12 flex sm:pt-8 flex-col items-center justify-center text-center">
        <h1 className="text-[#2DC092] border-2 border-[#2DC092] p-[3px] text-xl font-extrabold mt-10 mb-8">
          <span className="bg-[#2DC092] text-white text-lg font-bold mr-[4px] p-[4px]">
            COACH
          </span>
          BOTS
        </h1>
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-4xl text-black max-sm:text-4xl max-sm:px-8">
          Learning Simulations Playground
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg max-sm:px-8">
          {" "}
          Welcome to our simulation playground. Feel free to try out some
          popular sample scenarios listed. (Available in Audio and Text both).
        </p>
      </MaxWidthWrapper>
      <p className="mb-8 w-full text-center">
        Text <BookText className="inline ml-2 w-4 h-4" />
      </p>
      <div>
        <div className="relative isolate mx-auto">
          <div>
            <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-[-1.5rem] max-sm:w-[100%] z-50">
              <div className="rounded-xl bg-white p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 max-sm:w-[100%]">
                <HeroAccordion tests={TextTests} />
              </div>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-event-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#D5ECE7] to-[#9C7ACF] opacity-30 sm:left-[calc(50%/36rem)] sm:w-[72.1.78rem]"
            />
          </div>
        </div>
      </div>
      <p className="mb-8 w-full text-center mt-8">
        Audio <Mic className="inline ml-2 w-4 h-4" />
      </p>
      <div>
        <div className="relative isolate mx-auto">
          <div>
            <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-[-1.5rem] max-sm:w-[100%] z-50 pb-8">
              <div className="rounded-xl bg-white p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 max-sm:w-[100%]">
                <HeroAccordion tests={Audiotests} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center pb-16 pt-8">
        <Button>
          View our Library <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <Image
        className="fixed right-16 bottom-24 max-sm:h-[80px] max-sm:rotate-45 max-sm:right-[-2rem] max-sm:bottom-32 z-10 max-sm:hidden"
        src={"/arrow.svg"}
        height={85}
        width={195}
        alt="arrow"
      />
    </div>
  );
}
