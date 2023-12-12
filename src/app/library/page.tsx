"use client";

import CopyToClipboard from "@/components/CopyToClipboard";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import PageFooter from "@/components/PageFooter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ChevronLeft, Loader } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
const baseURL = "https://coach-api-gcp.coachbots.com/api/v1";

interface Test {
  title: string;
  description: string;
  domain: string;
  test_code: string;
  interaction_mode: string;
}

interface Category {
  [key: string]: Test[];
}

interface StateType {
  category: string;
  tests: Test[];
}

const convertToJsonArray = (input: Category): StateType[] => {
  const resultArray: StateType[] = [];

  for (const category in input) {
    if (input.hasOwnProperty(category)) {
      const testsArray = input[category].map((test) => {
        return {
          title: test.title,
          description: test.description,
          domain: test.domain,
          test_code: test.test_code,
          interaction_mode: test.interaction_mode,
        };
      });

      resultArray.push({
        category: category,
        tests: testsArray,
      });
    }
  }

  return resultArray;
};

const Page = () => {
  const { user } = useKindeBrowserClient();
  const [tests, setTests] = useState<StateType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRenderDiv, setShouldRenderDiv] = useState(false);
  const pathname = useRouter();

  // let shouldRenderDiv;
  // if (user) {
  //   const userEmail = user.email;
  //   const exclusionEmails = ["bagoriarajan@gmail.com", "falahsss900@gmail.com"];
  //   const restrictedEmails = ["gmail", "yahoo", "hotmail"];
  //   const domain = userEmail?.split("@")[1];
  //   const excludedEmail = exclusionEmails.includes(userEmail!);

  //   const isrestEmail = restrictedEmails.some((restrictedDomain) =>
  //     domain?.includes(restrictedDomain)
  //   );

  //   if (!excludedEmail && isrestEmail) {
  //     pathname.push("/");
  //   }

  //   console.log("User Email:", userEmail);
  //   console.log("user domain : ", domain);
  //   console.log("Exclude email : ", exclusionEmails.includes(userEmail!));
  //   console.log("Restricted Domain:", isrestEmail);
  //   console.log("Should Render Div:", shouldRenderDiv);
  // } else {
  //   pathname.push("/api/auth/login");
  // }

  useEffect(() => {
    fetch(`${baseURL}/accounts/get-test-codes-for-web/`, {
      method: "GET",
      headers: {
        Authorization: `Basic Yzc3MjFmZGItYTllMC00YTYxLWEzMTYtNDRhODA1N2VkMjY0OjhjNWNlZWZlLTY2Y2QtNDliZi04MTY5LTBhNjMwMmU5NmZlMA==`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        // console.log(data.data.my_lib[0].codes);
        // const testcodes = data.data.my_lib[0].codes.join(",");

        const group_list = []
        for (const item of data.data.my_lib) {
          if (item.emails.includes(user?.email)) {
              group_list.push(item.group);
          }
        }
        const group1 = group_list[0]
        const group2 = group_list[1]  // groups which is assigned to a email

        // console.log(string);
        // for group 1  NOTE: show my library if group_list length >0

        await fetch(
          `${baseURL}/accounts/get-my-lib-data/?group=${group1}`,
          {
            method: "GET",
            headers: {
              Authorization: `Basic Yzc3MjFmZGItYTllMC00YTYxLWEzMTYtNDRhODA1N2VkMjY0OjhjNWNlZWZlLTY2Y2QtNDliZi04MTY5LTBhNjMwMmU5NmZlMA==`,
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then(async (data) => {
            console.log(data);
            const convertedTests = convertToJsonArray(data.data);
            console.log(convertedTests);
            setTests(convertedTests);
            setIsLoading(false);
          })
          .catch((err) => console.error("Cannot retrive tests", err));
      })
      .catch((err) => console.error("Cannot retrive test codes", err));
  }, []);

  if (isLoading) {
    return (
      <div className="bg-gray-100 min-h-[120vh] h-full grainy max-sm:h-full max-sm:min-h-screen pb-16 flex justify-center items-center">
        <p className="p-2 bg-gray-300 w-fit text-sm rounded-lg">
          {" "}
          <Loader className="animate-spin inline mr-2" />
          Loading...
        </p>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>My Library</title>
      </Head>
      <main className="bg-gray-100 min-h-[120vh] h-full grainy max-sm:h-full max-sm:min-h-screen pb-16">
        <div className="bg-gray-300 absolute top-[5rem] left-4 text-sm rounded-lg p-2 max-sm:hidden">
          <Link href={"v1"} className="flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1 inline" /> <span>Home</span>
          </Link>
        </div>
        <div>
          <div>
            <div className="pb-6 max-sm:pb-3 flex flex-row justify-center items-center text-center mt-20 ">
              <p className="text-4xl font-black max-sm:text-4xl flex ite">
                {" "}
                <Link href={"v1"} className="hidden max-sm:block">
                  {" "}
                  <ChevronLeft className="h-4 w-4 mr-1 inline" />{" "}
                </Link>{" "}
                <span> My Library</span>
              </p>
            </div>
            <div className="max-sm:pb-10">
              <MaxWidthWrapper className="flex pt-2 flex-col items-center justify-center text-center">
                <div className="text-lg z-50 w-[80%] max-sm:w-full ">
                  <div className="flex justify-center flex-row gap-2 flex-wrap">
                    {tests.map((test) => (
                      <Link href={`#${test.category}`}>
                        <Button
                          variant={"default"}
                          className="border border-gray-200 h-8 hover:cursor-pointer truncate bg-[#4e72df]"
                        >
                          {test.category}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
              </MaxWidthWrapper>
              <div className="flex flex-col max-sm:flex-col w-[80%] max-sm:w-full mx-auto">
                {tests.map((testbyCategory) => (
                  <>
                    <div
                      id={testbyCategory.category}
                      className={`w-full flex justify-center`}
                    >
                      <Badge
                        variant={"default"}
                        className="bg-[#8693d5] h-6 w-fit text-white text-lg py-3 hover:bg-[#5a7eca] z-50 text-center mb-8 mt-12 max-sm:mt-8 max-sm:text-sm"
                      >
                        ✨ {testbyCategory.category}
                      </Badge>
                    </div>

                    <div>
                      <div className="relative isolate mx-auto">
                        <div>
                          <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-[-1.5rem] max-sm:w-[100%] z-50">
                            <div className="rounded-xl bg-white p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 max-sm:w-[100%]">
                              <Accordion
                                type="single"
                                collapsible
                                className="w-full text-gray-500 max-sm:p-4 "
                              >
                                {testbyCategory.tests.map((test, i) => (
                                  <AccordionItem
                                    key={i}
                                    value={`item-${i + 1}`}
                                    className={
                                      i === testbyCategory.tests.length - 1
                                        ? "border-none"
                                        : "border-b"
                                    }
                                  >
                                    <AccordionTrigger className="text-left max-sm:text-xs">
                                      <div>
                                        {test.title.split(":")[1].trim()}
                                      </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="max-sm:text-xs">
                                      <p> {test.description}</p>
                                      <div className="flex justify-end mt-2">
                                        <CopyToClipboard
                                          textToCopy={test.test_code}
                                        />
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                ))}
                              </Accordion>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
        <PageFooter />
      </main>
    </>
  );
};

export default Page;
