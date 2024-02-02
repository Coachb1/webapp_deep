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
import { ChevronLeft, History, Loader } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { baseURL, basicAuth, getUserAccount } from "@/lib/utils";
import NetworkNav from "@/components/NetworkNav";
import HeroAccordion from "@/components/HeroAccordion";
import { EQTests } from "@/lib/test";
import { Separator } from "@/components/ui/separator";
import SearchNSelect from "./SearchNSelect";
import CreateYourOwn from "@/components/CreateYourOwn";
import {
  competencySkillsTestType,
  newManagerTestsType,
  TestsType,
} from "@/lib/types";

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

const MyLibrary = ({ user }: any) => {
  const [tests, setTests] = useState<StateType[]>([]);
  const [filteredTests, setFilteredTests] = useState<StateType[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [groupList, setGroupList] = useState<string[]>([]);
  const [currentActiveGroup, setCurrentActiveGroup] = useState<string>("");

  const [requestedScenariosLoading, setRequestedScenariosLoading] =
    useState(true);

  const [competencyBasedPowerSkillsTests, setCompetencyBasedPowerSkillsTests] =
    useState<competencySkillsTestType[]>([]);
  const [newManagerTests, setNewManagerTests] = useState<newManagerTestsType[]>(
    []
  );
  const [domainsOptionsNewManager, setDomainOptionsNewManager] = useState<
    { label: string; value: string }[]
  >([]);

  const [filteredNewManagerTests, SetFilteredNewManagerTests] = useState<
    newManagerTestsType[]
  >([]);
  const [requestedScenarios, setRequestedScenarios] = useState<TestsType[]>([]);

  const [domainOptions, setDomainOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const getTestsByCompetencies = () => {
    getUserAccount(user)
      .then((res) => res.json())
      .then((data) => {
        fetch(
          `${baseURL}/accounts/user-competency-details/?user_id=${data.uid}`,
          {
            method: "GET",
            headers: {
              Authorization: basicAuth,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data[0]);
            const user_competencies = Object.values(data[0]).join(", ");
            console.log(user_competencies);
            fetch(
              `${baseURL}/tests/get-tests-by-competency/?competencies=${user_competencies.replace(
                /"/g,
                ""
              )}`,
              {
                method: "GET",
                headers: {
                  Authorization: basicAuth,
                },
              }
            )
              .then((response) => response.json())
              .then((data: { [key: string]: TestsType[] }) => {
                console.log("GET TESTS BY COMPETENCIES : ", data);
                const convertedCompetencyTests = Object.entries(data).map(
                  ([skill, tests]) => ({ skill, tests })
                );

                setCompetencyBasedPowerSkillsTests(convertedCompetencyTests);
              })
              .then((err) => {
                console.error(err);
              });
          })
          .catch((err) => {
            console.error(err);
          });
      });
  };

  const getRequestedTests = () => {
    setRequestedScenariosLoading(true);
    getUserAccount(user)
      .then((res) => res.json())
      .then((data) => {
        fetch(`${baseURL}/tests/get-requested-tests/?user_id=${data.uid}`, {
          method: "GET",
          headers: {
            Authorization: basicAuth,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setRequestedScenarios(data);
            setRequestedScenariosLoading(false);
          })
          .catch((err) => {
            console.error(err);
            setRequestedScenariosLoading(false);
          });
      });
  };

  const CreateYourOwnGeneratedHandler = () => {
    getRequestedTests();
  };

  const getNewManagerTests = () => {
    fetch(`${baseURL}/tests/get-tests-by-tab-category/`, {
      method: "GET",
      headers: {
        Authorization: basicAuth,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //@ts-ignore
        const newManagerTests: newManagerTestsType[] = Object.entries(
          data["Manager"]
        ).map(([domain, tests]) => ({ domain, tests }));
        setNewManagerTests(newManagerTests);
        SetFilteredNewManagerTests(newManagerTests);
        const tempConversionDomains = newManagerTests.map((test) => {
          return {
            label: test.domain,
            value: test.domain,
          };
        });
        setDomainOptionsNewManager(tempConversionDomains);
      })
      .catch((err) => console.error("Cannot retrive tests", err));
  };

  useEffect(() => {
    if (user) {
      getTestsByCompetencies();
      getRequestedTests();
      getNewManagerTests();
      fetch(`${baseURL}/accounts/get-test-codes-for-web/`, {
        method: "GET",
        headers: {
          Authorization: basicAuth,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
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
                Authorization: basicAuth,
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => response.json())
            .then(async (data) => {
              setCurrentActiveGroup(group_list[0]);
              setIsLoading(false);
              console.log(data);
              const convertedTests = convertToJsonArray(data.data);
              console.log(convertedTests);
              const tempConversion = convertedTests.map((test) => {
                return {
                  label: test.category,
                  value: test.category,
                };
              });
              setDomainOptions(tempConversion);
              setTests(convertedTests);
              setFilteredTests(convertedTests);
              setIsPageLoading(false);
            })
            .catch((err) => console.error("Cannot retrive tests", err));
        })

        .catch((err) => console.error("Cannot retrive test codes", err));
    }
  }, []);

  const onDomainSelectHandler = (val: string) => {
    console.log(val);
    const filtered = tests.filter((test) => {
      return test.category.toLowerCase().includes(val.toLowerCase());
    });
    console.log(filtered);
    setFilteredTests(filtered);
  };

  const onDomainSearchHandler = (value: string) => {
    console.log("search:", value);
    console.log("ALL:", tests);
    const filtered = tests.filter((test) => {
      return test.category.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredTests(filtered);
    console.log(filtered);
  };

  const onDomainSelectHandlerNewManager = (val: string) => {
    console.log(val);
    const filtered = newManagerTests.filter((test) => {
      return test.domain.toLowerCase().includes(val.toLowerCase());
    });
    console.log(filtered);
    SetFilteredNewManagerTests(filtered);
  };

  const onDomainSearchHandlerNewManager = (value: string) => {
    console.log("search:", value);
    console.log("ALL:", tests);
    const filtered = newManagerTests.filter((test) => {
      return test.domain.toLowerCase().includes(value.toLowerCase());
    });
    console.log(filtered);
    SetFilteredNewManagerTests(filtered);
  };

  return (
    <div>
      <div className="fixed w-full flex items-center top-0 justify-end p-4 h-6 py-8 !z-[800]">
        <NetworkNav user={user} />
      </div>
      <main className="bg-gray-100 min-h-[100vh] h-full grainy max-sm:h-full max-sm:min-h-screen pb-16">
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

            <div className="max-sm:pb-10 min-h-[70vh] max-sm:min-h-[60vh]">
              <MaxWidthWrapper className="flex pt-2 flex-col items-center justify-center text-center">
                <div className="flex gap-2 flex-wrap mb-4 bg-red justify-center items-center">
                  <div className="flex justify-center flex-row mt-4 z-50 gap-2 max-sm:text-xs flex-wrap">
                    <Button
                      variant={"outline"}
                      className={`h-8 max-sm:text-sm`}
                      onClick={() => {
                        document.getElementById("eq-tests")?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                    >
                      EQ Mini Course
                    </Button>
                    {groupList.length > 0 && (
                      <>
                        <Button
                          variant={"outline"}
                          className={`h-8 max-sm:text-sm`}
                          onClick={() => {
                            document
                              .getElementById("custom-tests")
                              ?.scrollIntoView({
                                behavior: "smooth",
                              });
                          }}
                        >
                          Custom [{groupList.join(", ")}]
                        </Button>
                      </>
                    )}
                    <Button
                      onClick={() => {
                        document
                          .getElementById("competency-tests")
                          ?.scrollIntoView({
                            behavior: "smooth",
                          });
                      }}
                      variant={"outline"}
                      className={`h-8 max-sm:text-sm`}
                    >
                      Competency Based Power Skills
                    </Button>
                    <Button
                      onClick={() => {
                        document.getElementById("new-manager")?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                      variant={"outline"}
                      className={`h-8 max-sm:text-sm`}
                    >
                      New Manager
                    </Button>
                    <Button
                      onClick={() => {
                        document
                          .getElementById("requested-tests")
                          ?.scrollIntoView({
                            behavior: "smooth",
                          });
                      }}
                      variant={"outline"}
                      className={`h-8 max-sm:text-sm`}
                    >
                      Requested Scenarios <History className="h-4 w-4 ml-2" />
                    </Button>
                    <Button
                      onClick={() => {
                        document.getElementById("create-new")?.scrollIntoView({
                          behavior: "smooth",
                        });
                      }}
                      variant={"outline"}
                      className={`h-8 max-sm:text-sm`}
                    >
                      Create New Simulation
                    </Button>
                  </div>
                </div>

                <hr className="my-4 bg-gray-500 w-full" />
                <div id="eq-tests" className="w-full">
                  <div className="w-full mb-10 text-left">
                    <HeroAccordion
                      badgeText="EQ mini course"
                      user={user ? true : false}
                      tests={EQTests}
                    />
                  </div>
                </div>

                {groupList.length > 0 && (
                  <>
                    <Separator className="mt-8 max-sm:my-1.5 bg-gray-400" />
                    <div
                      id="custom-tests"
                      className="w-full pt-12 flex flex-col items-center justify-center"
                    >
                      <h1 className="text-4xl max-sm:text-xl text-gray-600 font-semibold">
                        Custom Library{" "}
                      </h1>

                      {!isLoading ? (
                        <>
                          <div className="w-[65%] max-sm:w-[85%] flex justify-center items-center mt-4">
                            <SearchNSelect
                              placeholder="Select by Simulation areas"
                              onSearchHandler={onDomainSearchHandler}
                              onDomainSelectHandler={onDomainSelectHandler}
                              optionDomains={domainOptions}
                            />
                          </div>

                          <div className="flex flex-col max-sm:flex-col w-[80%] max-sm:w-full mx-auto">
                            {tests.length === 0 && !isLoading && (
                              <div className="w-[80%] mx-auto">
                                <div className="relative isolate mx-auto">
                                  <div>
                                    <div className="mx-auto w-full mt-8 max-sm:w-[100%] z-50">
                                      <div className="rounded-xl text-sm text-gray-500 bg-white p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 max-sm:w-[100%]">
                                        There are no data yet.
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            {filteredTests.map((testbyCategory) => (
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
                                            (test) => test.is_micro === false
                                          ) && (
                                            <p className="w-fit text-center text-gray-500 max-sm:text-sm mt-2 bg-accent mx-auto px-2 rounded-lg">
                                              Regular learning
                                            </p>
                                          )}
                                          <Accordion
                                            type="single"
                                            collapsible
                                            className="w-full text-gray-500 max-sm:p-4 bg-white px-4"
                                          >
                                            {testbyCategory.tests.map(
                                              (test, i) => (
                                                <>
                                                  {!test.is_micro && (
                                                    <AccordionItem
                                                      key={i}
                                                      value={`item-${i + 1}`}
                                                      className={
                                                        i ===
                                                        testbyCategory.tests
                                                          .length -
                                                          1
                                                          ? "border-none"
                                                          : "border-b"
                                                      }
                                                    >
                                                      <AccordionTrigger className="text-left max-sm:text-xs">
                                                        <div>
                                                          {
                                                            test.title.split(
                                                              ":"
                                                            )[1]
                                                          }
                                                        </div>
                                                      </AccordionTrigger>
                                                      <AccordionContent className="max-sm:text-xs">
                                                        <p className="text-left">
                                                          {" "}
                                                          {test.description}
                                                        </p>
                                                        <div className="flex justify-end mt-2">
                                                          <CopyToClipboard
                                                            textToCopy={
                                                              test.test_code
                                                            }
                                                            copyType="code"
                                                          />
                                                        </div>
                                                      </AccordionContent>
                                                    </AccordionItem>
                                                  )}
                                                </>
                                              )
                                            )}
                                          </Accordion>
                                          {testbyCategory.tests.some(
                                            (test) => test.is_micro === true
                                          ) && (
                                            <p className="w-fit rounded-lg text-center mt-2 bg-accent mx-auto px-2 text-gray-500 max-sm:text-sm">
                                              Micro learning
                                            </p>
                                          )}
                                          <Accordion
                                            type="single"
                                            collapsible
                                            className="w-full text-gray-500 max-sm:p-2 bg-white px-4 pt-2 "
                                          >
                                            {testbyCategory.tests.map(
                                              (test, i) => (
                                                <>
                                                  {test.is_micro && (
                                                    <AccordionItem
                                                      key={i}
                                                      value={`item-${i + 1}`}
                                                      className={
                                                        i ===
                                                        testbyCategory.tests
                                                          .length -
                                                          1
                                                          ? "border-none"
                                                          : "border-b"
                                                      }
                                                    >
                                                      <AccordionTrigger className="text-left max-sm:text-xs">
                                                        <div>
                                                          {
                                                            test.title.split(
                                                              ":"
                                                            )[1]
                                                          }
                                                        </div>
                                                      </AccordionTrigger>
                                                      <AccordionContent className="max-sm:text-xs">
                                                        <p className="text-left">
                                                          {" "}
                                                          {test.description}
                                                        </p>
                                                        <div className="flex justify-end mt-2">
                                                          <CopyToClipboard
                                                            textToCopy={
                                                              test.test_code
                                                            }
                                                            copyType="code"
                                                          />
                                                        </div>
                                                      </AccordionContent>
                                                    </AccordionItem>
                                                  )}
                                                </>
                                              )
                                            )}
                                          </Accordion>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ))}
                          </div>
                        </>
                      ) : (
                        <div className="bg-gray-100 my-16  grainy max-sm:h-full max-sm:min-h-screen pb-16 flex justify-center items-center">
                          <p className="p-2 text-sm max-sm:text-xs">
                            {" "}
                            <Loader className="animate-spin inline h-4 w-4 mr-2" />
                            Loading...
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                )}
                <Separator className="mt-10 w-[80%] max-sm:my-6 bg-gray-200" />
                <div
                  id="competency-tests"
                  className="w-full flex flex-col items-center justify-center"
                >
                  <h1 className="text-4xl pt-12 max-sm:text-xl text-gray-600 font-semibold">
                    Competency Based Power Skills{" "}
                  </h1>
                  <div className="flex flex-col max-sm:flex-col w-[64%] max-sm:w-[90%] mx-auto">
                    {competencyBasedPowerSkillsTests.length > 0 &&
                      competencyBasedPowerSkillsTests.map((skills) => (
                        <>
                          {skills.tests.length > 0 && (
                            <>
                              <div className={`w-full flex justify-center`}>
                                <Badge
                                  variant={"default"}
                                  className="bg-[#8693d5] h-6 w-fit text-white text-lg py-3 hover:bg-[#5a7eca] z-50 text-center mb-8 mt-12 max-sm:mt-8 max-sm:text-xs truncate "
                                >
                                  <>✨ {skills.skill}</>
                                </Badge>
                              </div>

                              <div className="w-full">
                                <div className="relative isolate mx-auto">
                                  <div>
                                    <div className="mx-auto w-full mt-[-1.5rem] max-sm:w-[100%] z-50">
                                      <div className="rounded-xl bg-white p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 max-sm:w-[100%]">
                                        <Accordion
                                          type="single"
                                          collapsible
                                          className="w-full text-gray-500 max-sm:p-4 bg-white px-4"
                                        >
                                          {skills.tests.length > 0 &&
                                            skills.tests.map((test, i) => (
                                              <>
                                                <AccordionItem
                                                  key={i}
                                                  value={`item-${i + 1}`}
                                                  className={
                                                    i ===
                                                    skills.tests.length - 1
                                                      ? "border-none"
                                                      : "border-b"
                                                  }
                                                >
                                                  <AccordionTrigger className="text-left max-sm:text-xs">
                                                    <div>{test.title}</div>
                                                  </AccordionTrigger>
                                                  <AccordionContent className="max-sm:text-xs">
                                                    <p className="text-left">
                                                      {" "}
                                                      {test.description}
                                                    </p>
                                                    <div className="flex justify-end mt-2">
                                                      <CopyToClipboard
                                                        textToCopy={
                                                          test.test_code
                                                        }
                                                        copyType="code"
                                                      />
                                                    </div>
                                                  </AccordionContent>
                                                </AccordionItem>
                                              </>
                                            ))}
                                        </Accordion>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      ))}
                    {competencyBasedPowerSkillsTests.length === 0 && (
                      <div className="w-full">
                        <div className="relative isolate mx-auto">
                          <div>
                            <div className="mx-auto w-full mt-8 max-sm:w-[100%] z-50">
                              <div className="rounded-xl text-sm text-gray-500 bg-white p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 max-sm:w-[100%]">
                                There are no data yet.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <Separator className="mt-10 w-[80%] max-sm:my-6 bg-gray-200" />
                <div
                  id="new-manager"
                  className="w-full flex flex-col items-center justify-center"
                >
                  <h1 className="text-4xl  pt-12 max-sm:text-xl text-gray-600 font-semibold">
                    New Manager{" "}
                  </h1>
                  <div className="w-[65%] max-sm:w-[85%] flex justify-center items-center mt-4">
                    <SearchNSelect
                      placeholder="Select by Simulation domain"
                      onSearchHandler={onDomainSearchHandlerNewManager}
                      onDomainSelectHandler={onDomainSelectHandlerNewManager}
                      optionDomains={domainOptions}
                    />
                  </div>
                  <div className="flex flex-col max-sm:flex-col w-[64%] max-sm:w-[90%] mx-auto">
                    {newManagerTests.length > 0 &&
                      filteredNewManagerTests.map((domains) => (
                        <>
                          {domains.tests.length > 0 && (
                            <>
                              <div className={`w-full flex justify-center`}>
                                <Badge
                                  variant={"default"}
                                  className="bg-[#8693d5] h-6 w-fit text-white text-lg py-3 hover:bg-[#5a7eca] z-50 text-center mb-8 mt-12 max-sm:mt-8 max-sm:text-xs truncate "
                                >
                                  <>✨ {domains.domain}</>
                                </Badge>
                              </div>

                              <div className="w-full">
                                <div className="relative isolate mx-auto">
                                  <div>
                                    <div className="mx-auto w-full mt-[-1.5rem] max-sm:w-[100%] z-50">
                                      <div className="rounded-xl bg-white p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 max-sm:w-[100%]">
                                        <Accordion
                                          type="single"
                                          collapsible
                                          className="w-full text-gray-500 max-sm:p-4 bg-white px-4"
                                        >
                                          {domains.tests.length > 0 &&
                                            domains.tests.map((test, i) => (
                                              <>
                                                <AccordionItem
                                                  key={i}
                                                  value={`item-${i + 1}`}
                                                  className={
                                                    i ===
                                                    domains.tests.length - 1
                                                      ? "border-none"
                                                      : "border-b"
                                                  }
                                                >
                                                  <AccordionTrigger className="text-left max-sm:text-xs">
                                                    <div>
                                                      {test.title
                                                        .split(":")[1]
                                                        .trim()}
                                                    </div>
                                                  </AccordionTrigger>
                                                  <AccordionContent className="max-sm:text-xs">
                                                    <p className="text-left">
                                                      {" "}
                                                      {test.description}
                                                    </p>
                                                    <div className="flex justify-end mt-2">
                                                      <CopyToClipboard
                                                        textToCopy={
                                                          test.test_code
                                                        }
                                                        copyType="code"
                                                      />
                                                    </div>
                                                  </AccordionContent>
                                                </AccordionItem>
                                              </>
                                            ))}
                                        </Accordion>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      ))}
                    {newManagerTests.length === 0 && (
                      <div className="w-full">
                        <div className="relative isolate mx-auto">
                          <div>
                            <div className="mx-auto w-full mt-8 max-sm:w-[100%] z-50">
                              <div className="rounded-xl text-sm text-gray-500 bg-white p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 max-sm:w-[100%]">
                                There are no data yet.
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>{" "}
                </div>
                <Separator className="mt-10 w-[80%] max-sm:my-6 bg-gray-200" />
                <div
                  id="requested-tests"
                  className="w-full flex flex-col items-center justify-center"
                >
                  <h1 className="text-4xl pt-12 max-sm:text-xl text-gray-600 font-semibold">
                    Requested Scenarios
                  </h1>
                  {requestedScenariosLoading ? (
                    <div className="bg-gray-100 my-16  grainy max-sm:h-full max-sm:min-h-screen pb-16 flex justify-center items-center">
                      <p className="p-2 text-sm max-sm:text-xs">
                        {" "}
                        <Loader className="animate-spin inline h-4 w-4 mr-2" />
                        Loading...
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col max-sm:flex-col w-[64%] max-sm:w-[90%] mx-auto">
                      <div className="w-full">
                        <div className="relative isolate mx-auto">
                          <div>
                            <div className="mx-auto w-full mt-10 max-sm:w-[100%] z-50">
                              <div className="rounded-xl bg-white p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 max-sm:w-[100%]">
                                {requestedScenarios.length > 0 ? (
                                  <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full text-gray-500 max-sm:p-4 bg-white px-4"
                                  >
                                    {requestedScenarios.map((test, i) => (
                                      <>
                                        <AccordionItem
                                          key={i}
                                          value={`item-${i + 1}`}
                                          className={
                                            i === tests.length - 1
                                              ? "border-none"
                                              : "border-b"
                                          }
                                        >
                                          <AccordionTrigger className="text-left max-sm:text-xs">
                                            <div>{test.title}</div>
                                          </AccordionTrigger>
                                          <AccordionContent className="max-sm:text-xs">
                                            <p className="text-left">
                                              {" "}
                                              {test.description}
                                            </p>
                                            <div className="flex justify-end mt-2">
                                              <CopyToClipboard
                                                copyType="code"
                                                textToCopy={test.test_code}
                                              />
                                            </div>
                                          </AccordionContent>
                                        </AccordionItem>
                                      </>
                                    ))}
                                  </Accordion>
                                ) : (
                                  <p className="text-sm max-sm:text-xs text-gray-600">
                                    You don't have any requested scnarios, Start
                                    by Creating.
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <Separator className="my-10 w-[80%] max-sm:my-6 bg-gray-200" />
                <div
                  id="create-new"
                  className="w-full flex flex-col items-center justify-center"
                >
                  <h1 className="text-4xl max-sm:text-xl text-gray-600 font-semibold">
                    Create new Scenario{" "}
                  </h1>
                  <div className="flex flex-col max-sm:flex-col w-[64%] max-sm:w-[90%] mx-auto">
                    <CreateYourOwn
                      user={user}
                      generatedHandler={CreateYourOwnGeneratedHandler}
                    />
                  </div>
                </div>
              </MaxWidthWrapper>
            </div>
          </div>
        </div>
        <PageFooter />
      </main>
    </div>
  );
};

export default MyLibrary;
