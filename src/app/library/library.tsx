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
import { ChevronLeft, Library, Loader } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const baseURL = "https://coach-api-ovh.coachbots.com/api/v1";
interface Test {
  title: string;
  description: string;
  domain: string;
  test_code: string;
  interaction_mode: string;
  is_micro: boolean;
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
          is_micro: test.is_micro,
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

const MyLibrary = () => {
  const { user } = useKindeBrowserClient();
  const [tests, setTests] = useState<StateType[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [groupList, setGroupList] = useState<string[]>([]);
  const [currentActiveGroup, setCurrentActiveGroup] = useState<string>("");
  const pathname = useRouter();

  const getTestsByGroup = async (group: string) => {
    setIsLoading(true);
    setCurrentActiveGroup(group);
    try {
      await fetch(`${baseURL}/accounts/get-my-lib-data/?group=${group}`, {
        method: "GET",
        headers: {
          Authorization: `Basic Yzc3MjFmZGItYTllMC00YTYxLWEzMTYtNDRhODA1N2VkMjY0OjhjNWNlZWZlLTY2Y2QtNDliZi04MTY5LTBhNjMwMmU5NmZlMA==`,
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({
        //   group: group,
        // }),
      })
        .then((response) => response.json())
        .then(async (data) => {
          setIsLoading(false);
          console.log(data);
          const convertedTests = convertToJsonArray(data.data);
          console.log(convertedTests);
          setTests(convertedTests);
          setIsPageLoading(false);
        })
        .catch((err) => console.error("Cannot retrive tests", err));
    } catch (error) {
      console.error("Error fetching your tests", error);
    }
  };

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
        console.log(data);
        // console.log(data.data.my_lib[0].codes);
        // const testcodes = data.data.my_lib[0].codes.join(",");
        const group_list: string[] = [];
        for (const item of data.data.my_lib) {
          if (item.emails.includes(user?.email)) {
            group_list.push(item.group);
          }
        }
        setGroupList(group_list);
        await fetch(
          `${baseURL}/accounts/get-my-lib-data/?group=${group_list[0]}`,
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
            setIsLoading(false);
            console.log(data);
            const convertedTests = convertToJsonArray(data.data);
            console.log(convertedTests);
            setTests(convertedTests);
            setIsPageLoading(false);
          })
          .catch((err) => console.error("Cannot retrive tests", err));
        if (group_list.length === 0) {
          pathname.push("/");
        }

        console.log(group_list[0]);
      })
      .catch((err) => console.error("Cannot retrive test codes", err));
  }, []);

  if (isPageLoading) {
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
    <div>
      <Head>
        <title>My Library</title>
      </Head>
      <main className="bg-gray-100 min-h-[100vh] h-full grainy max-sm:h-full max-sm:min-h-screen pb-16">
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

            <div className="max-sm:pb-10 min-h-[50vh] max-sm:min-h-[60vh]">
              <MaxWidthWrapper className="flex pt-2 flex-col items-center justify-center text-center">
                <div className="flex gap-2 flex-wrap mb-4 bg-red">
                  {groupList.length > 0 && (
                    <>
                      {groupList.map((item, i) => (
                        <Button
                          onClick={() => getTestsByGroup(item)}
                          className={`max-sm:p-2 h-8 ${
                            item === currentActiveGroup ? "ring-1" : ""
                          }`}
                          variant={"outline"}
                        >
                          {item}
                        </Button>
                      ))}
                    </>
                  )}
                </div>

                <hr className="my-4 bg-gray-500 w-full" />
                {isLoading ? (
                  <div>
                    <Loader className="animate-spin h-5 w-5 inline mr-2" />
                  </div>
                ) : (
                  <div className="text-lg z-50 w-[80%] max-sm:w-full">
                    <div className="flex justify-center flex-row gap-2 flex-wrap">
                      {tests.map((test) => (
                        <Link href={`#${test.category}`}>
                          <Button
                            variant={"default"}
                            className="border border-gray-200 h-8 hover:cursor-pointer truncate bg-[#4e72df] max-sm:text-xs"
                          >
                            {test.category}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </MaxWidthWrapper>
              {!isLoading && (
                <div className="flex flex-col max-sm:flex-col w-[80%] max-sm:w-full mx-auto">
                  {tests.map((testbyCategory) => (
                    <>
                      <div
                        id={testbyCategory.category}
                        className={`w-full flex justify-center`}
                      >
                        <Badge
                          variant={"default"}
                          className="bg-[#8693d5] h-6 w-fit text-white text-lg py-3 hover:bg-[#5a7eca] z-50 text-center mb-8 mt-12 max-sm:mt-8 max-sm:text-xs truncate "
                        >
                          ✨ {testbyCategory.category}
                        </Badge>
                      </div>

                      <div>
                        <div className="relative isolate mx-auto">
                          <div>
                            <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-[-1.5rem] max-sm:w-[100%] z-50">
                              <div className="rounded-xl bg-white p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 max-sm:w-[100%]">
                                {testbyCategory.tests.some(
                                  (test) => test.is_micro === true
                                ) && (
                                  <p className="w-full text-center text-gray-500 max-sm:text-sm">
                                    Micro
                                  </p>
                                )}

                                <Accordion
                                  type="single"
                                  collapsible
                                  className="w-full text-gray-500 max-sm:p-2 bg-white px-4 pt-2 "
                                >
                                  {testbyCategory.tests.map((test, i) => (
                                    <>
                                      {test.is_micro && (
                                        <AccordionItem
                                          key={i}
                                          value={`item-${i + 1}`}
                                          className={
                                            i ===
                                            testbyCategory.tests.length - 1
                                              ? "border-none"
                                              : "border-b"
                                          }
                                        >
                                          <AccordionTrigger className="text-left max-sm:text-xs">
                                            <div>
                                              {test.title.split(":")[1]}
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
                                      )}
                                    </>
                                  ))}
                                </Accordion>
                                {/* <hr className="my-2" /> */}
                                {testbyCategory.tests.some(
                                  (test) => test.is_micro === false
                                ) && (
                                  <p className="w-full text-center text-gray-500 max-sm:text-sm mt-2">
                                    Non Micro
                                  </p>
                                )}
                                <Accordion
                                  type="single"
                                  collapsible
                                  className="w-full text-gray-500 max-sm:p-4 bg-white px-4"
                                >
                                  {testbyCategory.tests.map((test, i) => (
                                    <>
                                      {!test.is_micro && (
                                        <AccordionItem
                                          key={i}
                                          value={`item-${i + 1}`}
                                          className={
                                            i ===
                                            testbyCategory.tests.length - 1
                                              ? "border-none"
                                              : "border-b"
                                          }
                                        >
                                          <AccordionTrigger className="text-left max-sm:text-xs">
                                            <div>
                                              {test.title.split(":")[1]}
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
                                      )}
                                    </>
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
              )}
            </div>
          </div>
        </div>
        <PageFooter />
      </main>
    </div>
  );
};

export default MyLibrary;
