import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import HeroAccordion from "@/components/HeroAccordion";

import { constructMetadata } from "@/lib/utils";
import {  EQTests, Samples } from "@/lib/test";
import Widgets from "@/components/Widgets";
import { Button } from "@/components/ui/button";
import NavProfile from "@/components/NavProfile";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = constructMetadata();

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const enterpriceEmailDomains = [
    "@anjuman.edu.in",
    "@google.com",
    "@indusind.com",
  ];

  return (
    <div className="bg-gray-100 min-h-[120vh] h-fit grainy max-sm:h-screen max-sm:min-h-screen pb-16">
      <div className="fixed w-full flex items-center justify-end p-4 h-6 py-8">
        {!user && (
          <Badge
            variant={"secondary"}
            className="bg-[#2DC092] h-6 text-white mr-4 hover:bg-[#2DC092] z-50"
          >
            ✨ Sign up to get EQ Insight Access{" "}
            <ArrowRight className="ml-2 w-4 h-4 " />{" "}
          </Badge>
        )}
        <NavProfile />
      </div>

      <MaxWidthWrapper className="mb-8 flex sm:pt-8 max-sm:pt-20 flex-col items-center justify-center text-center">
        <h1 className="text-[#2DC092] border-2 border-[#2DC092] p-[3px] text-xl font-extrabold mt-10 mb-6">
          <span className="bg-[#2DC092] text-white text-lg font-bold mr-[4px] p-[4px]">
            COACH
          </span>
          BOTS
        </h1>
        <h1 className="text-5xl font-bold md:text-6xl lg:text-4xl text-black max-sm:text-3xl max-sm:px-4">
          Learning Simulations Playground
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg max-sm:px-8">
          {" "}
          Welcome to our simulation playground. Feel free to try out listed
          samples or try our EQ booster!
        </p>

        {user && (
          <div className="flex flex-row mt-4 z-50">
            {enterpriceEmailDomains.some((domain) =>
              user?.email!.endsWith(domain)
            ) && (
              <Link href={""}>
                <Button variant={"default"} className=" mx-4">
                  My Library
                </Button>
              </Link>
            )}
          </div>
        )}
      </MaxWidthWrapper>
      <div className="flex flex-row max-sm:flex-col w-[80%] max-sm:w-full mx-auto">
        <div className="w-full">
          {user && (
            <div>
              <p className="mb-8 w-full text-center text-xs">✨ EQ Library</p>
              <div>
                <div className="relative isolate mx-auto">
                  <div>
                    <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-[-1.5rem] max-sm:w-[100%] z-50">
                      <div className="rounded-xl bg-white p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 max-sm:w-[100%]">
                        <HeroAccordion tests={EQTests} />
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
            </div>
          )}
          <div>
            <p className="my-8 max-sm:mt-2 w-full text-center text-xs">
              Samples
            </p>
            <div>
              <div className="relative isolate mx-auto">
                <div>
                  <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-[-1.5rem] max-sm:w-[100%] z-50">
                    <div className="rounded-xl bg-white p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 max-sm:w-[100%]">
                      <HeroAccordion tests={Samples} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-full flex justify-center pb-16 pt-8">
        <Button>
          View our Library <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div> */}
      {/* <Image
        className="fixed right-[1.5rem] bottom-32  max-sm:hidden"
        src={"/arrowRight.svg"}
        height={35}
        width={125}
        alt="arrow"
      />
      <Image
        className="fixed left-[1.5rem] bottom-32  max-sm:hidden"
        src={"/arrowLeft.svg"}
        height={35}
        width={125}
        alt="arrow"
      /> */}
      <hr className="my-4 mx-16 mt-16 max-sm:mx-8 max-sm:mt-4" />
      <div className="h-[20vh] text-sm text-gray-700 mx-16 max-sm:mx-8 ">
        <div className="flex flex-col items-center justify-between text-center">
          <div>
            <Link href={"https://www.coachbots.com/"}>
              <Image
                src={"/coachbots-logo-ts.svg"}
                alt="coachbots-logo-lg"
                height={80}
                width={180}
                className="max-sm:h-[40px] max-sm:w-[120px]"
              />
            </Link>
          </div>
          <div className="flex gap-4 max-sm:flex-col max-sm:gap-1 max-sm:text-xs mt-2 ">
            <Link
              href={"https://www.coachbots.com/interaction-report-analysis"}
              target="_blank"
            >
              Interaction Analysis
            </Link>
            <Link
              href={"https://www.coachbots.com/terms-privacy-policy"}
              target="_blank"
            >
              Terms & Privacy Policy
            </Link>
          </div>
        </div>
        <div className="text-center mt-2 max-sm:text-xs">
          <p >&copy; 2023 Coachbots™. All Rights Reserved.</p>
        </div>
      </div>
      <hr className="my-8 mx-16 mt-16 max-sm:mx-8 max-sm:mt-4 hidden max-sm:block" />
      <Widgets />
    </div>
  );
};

export default Page;
