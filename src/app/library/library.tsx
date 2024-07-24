"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { History, Info, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import {
  baseURL,
  basicAuth,
  configureTestsData,
  convertTestsData,
  convertTextToCorrectFormat,
  getUserAccount,
} from "@/lib/utils";
import { EQTestsCategorised } from "@/lib/test";
import SearchNSelect from "./SearchNSelect";
import {
  CategoryData,
  newManagerTestsType,
  TestsType,
  TestData as TestDataType,
} from "@/lib/types";
import HelpMode from "@/components/HelpMode";
import LibraryTestsAccordian from "./LibraryTestsAccordian";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CopyToClipboard from "@/components/CopyToClipboard";
import { Div } from "@/components/ui/moving-border";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/ui/card-hover-effect";
import { GoogleGeminiEffectLibrary } from "@/components/ui/GoogleGeminiEffect";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/context/UserContext";

interface Test {
  title: string;
  description: string;
  domain: string;
  test_code: string;
  interaction_mode: string;
  is_micro: boolean;
  is_recommended: boolean;
}

interface Category {
  [key: string]: Test[];
}

interface StateType {
  category: string;
  tests: Test[];
}

type TestData = {
  domain: any;
  tests: any;
};

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
          is_recommended: test.is_recommended,
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

  const [restrictedFeatures, setRestrictedFeatures] = useState<string | null>(
    ""
  );
  const [helpModeText, setHelpModeText] = useState<any>();

  const {
    userInfo,
    competencyBasedPowerSkillsTests,
    requestedTestsData,
    attemptedTests,
    categorisedTests,
  } = useUser();

  useEffect(() => {
    setRestrictedFeatures(userInfo.restrictedFeatures);
    setHelpModeText(userInfo.helpText);
  }, [userInfo]);

  const [requestedScenariosLoading, setRequestedScenariosLoading] =
    useState(false);

  // const [competencyBasedPowerSkillsTests, setCompetencyBasedPowerSkillsTests] =
  //   useState<CategoryData[]>([]);
  const [newManagerTests, setNewManagerTests] = useState<newManagerTestsType[]>(
    []
  );

  // const [requestedScenarios, setRequestedScenarios] = useState<TestsType[]>([]);
  // const [assignedScenarios, setAssignedScenarios] = useState<TestsType[]>([]);

  const [domainOptions, setDomainOptions] = useState<
    { label: string; value: string }[]
  >([]);

  // const [categorisedTests, setCategorisedTests] = useState<CategoryData[]>([]);

  // const [attemptedTests, setAttemptedTests] = useState<string[]>([]);

  // const getTestsByCompetencies = () => {
  //   if (user) {
  //     getUserAccount(user)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         fetch(
  //           `${baseURL}/accounts/user-competency-details/?user_id=${data.uid}`,
  //           {
  //             method: "GET",
  //             headers: {
  //               Authorization: basicAuth,
  //             },
  //           }
  //         )
  //           .then((res) => res.json())
  //           .then((data) => {
  //             console.log(data[0]);
  //             const user_competencies = Object.values(data[0]).join(", ");
  //             console.log(user_competencies);
  //             fetch(
  //               `${baseURL}/tests/get-tests-by-competency/?competencies=${user_competencies.replace(
  //                 /"/g,
  //                 ""
  //               )}`,
  //               {
  //                 method: "GET",
  //                 headers: {
  //                   Authorization: basicAuth,
  //                 },
  //               }
  //             )
  //               .then((response) => response.json())
  //               .then((data) => {
  //                 console.log("GET TESTS BY COMPETENCIES : ", data);

  //                 const convertedCompetencyTests = convertTestsData(data);
  //                 console.log(convertedCompetencyTests);
  //                 setCompetencyBasedPowerSkillsTests([
  //                   convertedCompetencyTests,
  //                 ]);
  //               })
  //               .then((err) => {
  //                 console.error(err);
  //               });
  //           })
  //           .catch((err) => {
  //             console.error(err);
  //           });
  //       });
  //   }
  // };

  // const getRequestedTests = () => {
  //   if (user) {
  //     setRequestedScenariosLoading(true);
  //     getUserAccount(user)
  //       .then((res) => res.json())
  //       .then((userAccountsData) => {
  //         fetch(
  //           `${baseURL}/tests/get-requested-tests/?user_id=${userAccountsData.uid}`,
  //           {
  //             method: "GET",
  //             headers: {
  //               Authorization: basicAuth,
  //             },
  //           }
  //         )
  //           .then((res) => res.json())
  //           .then((data) => {
  //             console.log("/tests/get-requested-tests", data);

  //             const assignedscenarios = data.filter((test: TestsType) =>
  //               test.assigned_to?.includes(userAccountsData.uid)
  //             );

  //             const requestedscenarios = data.filter((test: TestsType) =>
  //               test.creator_user_id?.includes(userAccountsData.uid)
  //             );

  //             setRequestedScenarios(requestedscenarios);
  //             setAssignedScenarios(assignedscenarios);
  //             setRequestedScenariosLoading(false);
  //           })
  //           .catch((err) => {
  //             console.error(err);
  //             setRequestedScenariosLoading(false);
  //           });
  //       });
  //   }
  // };

  // const getAttemptedTestsList = () => {
  //   if (user) {
  //     getUserAccount(user)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         fetch(
  //           `${baseURL}/test-attempt-sessions/get-attempted-test-list/?user_id=${data.uid}`,
  //           {
  //             method: "GET",
  //             headers: {
  //               Authorization: basicAuth,
  //             },
  //           }
  //         )
  //           .then((response) => response.json())
  //           .then((data) => {
  //             console.log(data, "getAttemptedTestsList");
  //             setAttemptedTests(data.data.codes);
  //           })
  //           .catch((err) => {
  //             console.error(err);
  //           });
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   }
  // };

  // const getNewManagerTests = () => {
  //   fetch(`${baseURL}/accounts/get-client-information/?for=my_lib`, {
  //     method: "GET",
  //     headers: {
  //       Authorization: basicAuth,
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then(async (data) => {
  //       const group_list: string[] = [];
  //       for (const item of data.data.my_lib) {
  //         if (item.emails.includes(user?.email)) {
  //           group_list.push(item.group);
  //         }
  //       }
  //       setGroupList(group_list);

  //       console.log("group_list", group_list);

  //       fetch(
  //         `${baseURL}/tests/get-tests-by-tab-category/?client_name=${group_list[0]}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: basicAuth,
  //           },
  //         }
  //       )
  //         .then((res) => res.json())
  //         .then((data) => {
  //           console.log(data);
  //           console.log("ConfiguredTestData", configureTestsData(data));

  //           setCategorisedTests(configureTestsData(data));
  //         })
  //         .catch((err) => console.error("Cannot retrive tests", err));
  //     });
  // };
  const [HelpModeSteps, setHelpModeSteps] = useState<any[]>([]);
  useEffect(() => {
    const dynamicHelpText = helpModeText?.library;
    setHelpModeSteps([
      {
        target: "#nav1",
        content: dynamicHelpText?.nav_one
          ? dynamicHelpText.nav_one
          : `"Emotional Quotient Areas" contains real world like situational simulations. "Competency Based Power Skills" contains set of  competencies like change management, decision making, communication, etc, But among 13 only 4 competencies are visible. You can customize and practice other skills from "My Account" section`,
      },
      {
        target: "#nav2",
        content: dynamicHelpText?.nav_two
          ? dynamicHelpText.nav_two
          : `The "Assigned Scenarios" contains the simulations that have been asigned other users from "Simulation Creator" under "Creator studio" tab. The "Requested Scenarios" contains user which have created using "Simulation Creator" under "Creator studio" tab.`,
      },
      {
        target: "#eq-cat",
        content: dynamicHelpText?.test_category
          ? dynamicHelpText.test_category
          : "A specific subject matter category for listing simulations. ",
      },
      {
        target: "#sl-aw",
        content: dynamicHelpText?.simulations
          ? dynamicHelpText.simulations
          : "These sections are where the simulations actual simulations and roleplays are curated. The title categorization is for easy access. In this case, the simulations are meant to check for self-awareness. ",
      },
      {
        target: ".chat-icon",
        content: dynamicHelpText?.coachTalk
          ? dynamicHelpText.coachTalk
          : "Users who want to get feedback about their speech parameters like confidence etc. should use this widget. Users must give input by speech in this case. The processing speed may be lower.",
      },
      {
        target: ".chat-icon2",
        content: dynamicHelpText?.coachScribe
          ? dynamicHelpText.coachScribe
          : "Users who use this widget will not get any speech related feedback in their simulation reports. Users can give input via text or speech - in either case it is converted into text. The processing speed is fast & efficient.",
      },
    ]);
    if (user) {
      // getTestsByCompetencies();
      // getRequestedTests();
      // getNewManagerTests();
      // getAttemptedTestsList();
      // fetch(`${baseURL}/accounts/get-client-information/?for=my_lib`, {
      //   method: "GET",
      //   headers: {
      //     Authorization: basicAuth,
      //     "Content-Type": "application/json",
      //   },
      // })
      //   .then((response) => response.json())
      //   .then(async (data) => {
      //     console.log(data);
      //     // setRestrictedFeatures(data.data)
      //     const group_list: string[] = [];
      //     for (const item of data.data.my_lib) {
      //       if (item.emails.includes(user?.email)) {
      //         group_list.push(item.group);
      //       }
      //     }
      //     setGroupList(group_list);
      //     await fetch(
      //       `${baseURL}/accounts/get-my-lib-data/?group=${group_list[0]}`,
      //       {
      //         method: "GET",
      //         headers: {
      //           Authorization: basicAuth,
      //           "Content-Type": "application/json",
      //         },
      //       }
      //     )
      //       .then((response) => response.json())
      //       .then(async (data) => {
      //         setCurrentActiveGroup(group_list[0]);
      //         setIsLoading(false);
      //         console.log(data);
      //         const convertedTests = convertToJsonArray(data.data);
      //         console.log(convertedTests);
      //         const tempConversion = convertedTests.map((test) => {
      //           return {
      //             label: test.category,
      //             value: test.category,
      //           };
      //         });
      //         setDomainOptions(tempConversion);
      //         setTests(convertedTests);
      //         setFilteredTests(convertedTests);
      //         setIsPageLoading(false);
      //       })
      //       .catch((err) => console.error("Cannot retrive tests", err));
      //   })
      //   .catch((err) => console.error("Cannot retrive test codes", err));
    }
  }, []);

  const onDomainSearchHandler = (value: string) => {
    console.log("search:", value);
    console.log("ALL:", tests);
    const filtered = tests.filter((test) => {
      return test.category.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredTests(filtered);
    console.log(filtered);
  };

  const [selectedDomain, setSelectedDomain] = useState("");

  const onDomainSelectHandler = (value: any) => {
    setSelectedDomain(value);
  };
  const [filteredTestsData, setFilteredTestsData] = useState<
    Record<string, TestData[]>
  >({});

  // Handler for domain selection
  const onDomainSelectHandlerNewManager = (
    val: string,
    category: CategoryData
  ) => {
    const filtered = category.tests_data.filter((domain) => {
      return domain.domain.toLowerCase().includes(val.toLowerCase());
    });

    setFilteredTestsData((prevState) => ({
      ...prevState,
      [category.category_name]: filtered,
    }));
  };

  const onDomainSearchHandlerNewManager = (
    value: string,
    category: CategoryData
  ) => {
    console.log("search:", value);
    console.log("ALL:", category.tests_data);
    const filtered = category.tests_data.filter((domain) => {
      return domain.domain.toLowerCase().includes(value.toLowerCase());
    });
    console.log(filtered);
    // You may want to update the state for this specific category
    // SetFilteredNewManagerTests(filtered);
  };

  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div>
      {/* <div className="fixed w-full flex items-center top-0 right-0 justify-end p-4 h-6 py-8 !z-[800]">
        <NetworkNav user={user} />
      </div> */}

      <HelpMode steps={HelpModeSteps} />
      <MaxWidthWrapper>
        {" "}
        <GoogleGeminiEffectLibrary
          title="Simulations & Roleplays"
          description="Simulations and roleplays replicate real-world situations and
                  interactions, evaluating our aptitude for success in the
                  workplace. By mimicking scenarios we may encounter, they
                  assess our interpersonal skills and provide detailed feedback
                  on our performance and potential areas for improvement."
          className="w-full"
          cta={
            <div
              id="category-navbar"
              className="flex  flex-col gap-2 mb-4 justify-center items-center sticky top-0 z-[10]  w-full mt-[-2rem]"
            >
              <div className="pb-1 h-20 max-sm:pb-0 flex flex-row justify-center items-center text-center"></div>
              <div className="flex justify-center flex-col gap-2 max-sm:gap-1">
                <div
                  id="nav1"
                  className="flex max-sm:px-2 justify-center flex-row z-50 gap-2 max-sm:gap-1 max-sm:text-xs flex-wrap"
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`h-8 border-gray-600`}
                        onClick={() => {
                          document.getElementById("eq-tests")?.scrollIntoView({
                            behavior: "smooth",
                          });
                        }}
                      >
                        Simulations Modules
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="text-center">
                      {!restrictedFeatures?.includes("EQ-Areas") && (
                        <DropdownMenuItem
                          className=""
                          onClick={() => {
                            document
                              .getElementById("eq-tests")
                              ?.scrollIntoView({
                                behavior: "smooth",
                              });
                          }}
                        >
                          Emotional Quotient Areas
                        </DropdownMenuItem>
                      )}
                      {!restrictedFeatures?.includes("Competency-library") && (
                        <DropdownMenuItem
                          className=""
                          onClick={() => {
                            document
                              .getElementById("competency-tests")
                              ?.scrollIntoView({
                                behavior: "smooth",
                              });
                          }}
                        >
                          Competency Based Power Skills
                        </DropdownMenuItem>
                      )}
                      {!restrictedFeatures?.includes("Client-library") && (
                        <>
                          {categorisedTests.map((category) => (
                            <DropdownMenuItem
                              onClick={() => {
                                document
                                  .getElementById(category.category_name)
                                  ?.scrollIntoView({
                                    behavior: "smooth",
                                  });
                              }}
                            >
                              {convertTextToCorrectFormat(
                                category.category_name
                              )}
                            </DropdownMenuItem>
                          ))}
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <>
                  {!restrictedFeatures?.includes("Requested-scenarios") ||
                    (!restrictedFeatures?.includes("Assigned-scenarios") && (
                      <div className="self-center h-[2px] bg-gray-300 w-full max-sm:w-[80%]" />
                    ))}

                  <div
                    id="nav2"
                    className="flex max-sm:px-2 justify-center items-center flex-row z-50 gap-2 max-sm:gap-1 max-sm:text-xs flex-wrap"
                  >
                    {!restrictedFeatures?.includes("Assigned-scenarios") && (
                      <Button
                        onClick={() => {
                          document
                            .getElementById("assigned-tests")
                            ?.scrollIntoView({
                              behavior: "smooth",
                            });
                        }}
                        className={`h-8 max-sm:text-sm bg-blue-400 text-white hover:bg-blue-300`}
                      >
                        Assigned Simulations{" "}
                        <History className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                    {!restrictedFeatures?.includes("Requested-scenarios") && (
                      <Button
                        onClick={() => {
                          document
                            .getElementById("requested-tests")
                            ?.scrollIntoView({
                              behavior: "smooth",
                            });
                        }}
                        className={`h-8 max-sm:text-sm bg-blue-400 text-white hover:bg-blue-300`}
                      >
                        Requested Simulations{" "}
                        <History className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </>
              </div>
            </div>
          }
        />
      </MaxWidthWrapper>
      <main className="bg-white min-h-[100vh] h-full max-sm:h-full max-sm:min-h-screen pb-16">
        <div>
          <div>
            <div
              id="eq-tests"
              className="pt-[10vh] w-full flex flex-col items-center justify-center"
            ></div>
            <div className="max-sm:pb-10 min-h-[70vh] max-sm:min-h-[60vh]">
              <MaxWidthWrapper className="flex pt-2 flex-col items-center justify-center text-center">
                {!restrictedFeatures?.includes("EQ-Areas") && (
                  <div
                    id="eq-tests"
                    className="flex flex-col max-sm:flex-col w-full mx-auto"
                  >
                    {EQTestsCategorised.length > 0 &&
                      EQTestsCategorised.map((category, index) => (
                        <>
                          <div
                            key={index}
                            id={category.category_name}
                            className="w-full flex flex-col items-center justify-center"
                          >
                            <h1
                              id="eq-cat"
                              className="text-xl mt-2 max-sm:text-sm text-gray-600 font-semibold border border-gray-400 py-1 px-4 bg-white rounded-md"
                            >
                              Emotional Quotient Areas
                            </h1>
                            <div className="my-0 mt-1 py-0 text-xs flex flex-row items-center">
                              <Info
                                color="#9ca3af"
                                className="h-4 w-4 inline text-gray-600 mr-2"
                              />{" "}
                              <span>
                                {" "}
                                Grayed bars indicate already attempted
                                simulations
                              </span>
                            </div>

                            <div className="w-[65%] max-sm:w-[85%] max-lg:w-[85%] flex justify-center items-center mt-4">
                              <SearchNSelect
                                placeholder="Select by Simulation domain"
                                onSearchHandler={(value) =>
                                  onDomainSearchHandlerNewManager(
                                    value,
                                    category
                                  )
                                }
                                onDomainSelectHandler={(value) =>
                                  onDomainSelectHandlerNewManager(
                                    value,
                                    category
                                  )
                                }
                                optionDomains={category.domainOptionsForFilter}
                              />
                            </div>

                            <div className="flex flex-col max-sm:flex-col w-[64%] max-sm:w-[90%] max-lg:w-[85%] mx-auto">
                              {(
                                filteredTestsData[category.category_name] ||
                                category.tests_data
                              ).map((domains, domainIndex) => (
                                <div key={domainIndex}>
                                  {domains.tests.length > 0 && (
                                    <>
                                      <div
                                        className={`w-full flex justify-center`}
                                      >
                                        <Badge
                                          id={
                                            domainIndex === 0
                                              ? "sl-aw"
                                              : undefined
                                          }
                                          variant={"default"}
                                          className="bg-teal-100 hover:bg-teal-50 h-6 w-fit text-sm py-3 text-gray-600 mb-8 mt-8 max-sm:mt-8 max-sm:text-xs truncate "
                                        >
                                          <> EQ Area : {domains.domain}</>
                                        </Badge>
                                      </div>

                                      <div className="w-full">
                                        <div className="relative isolate mx-auto">
                                          <div>
                                            <div className="mx-auto w-full mt-[-1.5rem] max-sm:w-[100%] z-50">
                                              <div className="rounded-2xl bg-white ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl max-sm:w-[100%]">
                                                <Div>
                                                  <div
                                                    key={0}
                                                    className="relative group block p-2 h-full w-full bg-white rounded-2xl"
                                                    onMouseEnter={() =>
                                                      setHoveredIndex(
                                                        domainIndex
                                                      )
                                                    }
                                                    onMouseLeave={() =>
                                                      setHoveredIndex(null)
                                                    }
                                                  >
                                                    <AnimatePresence>
                                                      {hoveredIndex ===
                                                        domainIndex && (
                                                        <motion.span
                                                          className="absolute inset-0 h-full w-full bg-neutral-200  block rounded-2xl"
                                                          layoutId="hoverBackground"
                                                          initial={{
                                                            opacity: 0,
                                                          }}
                                                          animate={{
                                                            opacity: 1,
                                                            transition: {
                                                              duration: 0.15,
                                                            },
                                                          }}
                                                          exit={{
                                                            opacity: 0,
                                                            transition: {
                                                              duration: 0.15,
                                                              delay: 0.2,
                                                            },
                                                          }}
                                                        />
                                                      )}
                                                    </AnimatePresence>
                                                    <Card className="p-0 rounded-2xl border">
                                                      <Accordion
                                                        type="single"
                                                        collapsible
                                                        className="w-full text-sm text-slate-900 max-sm:p-4 rounded-xl bg-white overflow-clip border"
                                                      >
                                                        {domains.tests.map(
                                                          (
                                                            test: TestDataType,
                                                            i: number
                                                          ) => (
                                                            <AccordionItem
                                                              key={i}
                                                              value={`item-${
                                                                Number(i) + 1
                                                              }`}
                                                              className={`${
                                                                i ===
                                                                domains.tests
                                                                  .length -
                                                                  1
                                                                  ? "border-none"
                                                                  : "border-b"
                                                              } ${
                                                                attemptedTests.includes(
                                                                  test.test_code
                                                                )
                                                                  ? "bg-gray-200"
                                                                  : ""
                                                              } px-4`}
                                                            >
                                                              <AccordionTrigger className="text-left max-sm:text-xs">
                                                                <div>
                                                                  {test.title}
                                                                </div>
                                                              </AccordionTrigger>
                                                              <AccordionContent className="max-sm:text-xs">
                                                                <p className="text-left">
                                                                  {
                                                                    test.description
                                                                  }
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
                                                          )
                                                        )}
                                                      </Accordion>
                                                    </Card>
                                                  </div>
                                                </Div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      ))}
                  </div>
                )}
                {!restrictedFeatures?.includes("Competency-library") && (
                  <>
                    <div
                      id="competency-tests"
                      className="pt-[10vh] w-full flex flex-col items-center justify-center"
                    ></div>
                    <div className="w-full flex flex-col items-center justify-center">
                      <h1 className="text-xl mt-2 max-sm:text-sm text-gray-600 font-semibold border border-gray-400 py-1 px-4 bg-white rounded-md">
                        Competency Based Power Skills{" "}
                      </h1>
                      <div className="my-0 mt-1 py-0 text-xs flex flex-row items-center">
                        <Info
                          color="#9ca3af"
                          className="h-4 w-4 inline text-gray-600 mr-2"
                        />{" "}
                        <span>
                          {" "}
                          Grayed bars indicate already attempted simulations
                        </span>
                      </div>
                      <div className="w-[65%] max-sm:w-[85%] max-lg:w-[85%] flex justify-center items-center mt-4">
                        {competencyBasedPowerSkillsTests?.length > 0 && (
                          <SearchNSelect
                            placeholder="Select by Simulation domain"
                            onSearchHandler={(value) =>
                              onDomainSearchHandlerNewManager(
                                value,
                                competencyBasedPowerSkillsTests[0]
                              )
                            }
                            onDomainSelectHandler={(value) =>
                              onDomainSelectHandlerNewManager(
                                value,
                                competencyBasedPowerSkillsTests[0]
                              )
                            }
                            optionDomains={
                              competencyBasedPowerSkillsTests[0]
                                ?.domainOptionsForFilter
                            }
                          />
                        )}
                      </div>
                      <div className="flex flex-col max-sm:flex-col w-[64%] max-sm:w-[90%] max-lg:w-[85%] mx-auto">
                        {competencyBasedPowerSkillsTests?.length > 0 && (
                          <>
                            {(
                              filteredTestsData[
                                "Competency based power skills"
                              ] ||
                              competencyBasedPowerSkillsTests[0]?.tests_data
                            ).map((skills) => (
                              <>
                                {skills.tests.length > 0 && (
                                  <>
                                    <div
                                      className={`w-full flex justify-center`}
                                    >
                                      <Badge
                                        variant={"default"}
                                        className="bg-[#2DC092] hover:bg-[#2DC092] h-6 w-fit text-white text-sm py-3 text-center mb-8 mt-8 max-sm:mt-8 max-sm:text-xs truncate "
                                      >
                                        <>Competency : {skills.domain}</>
                                      </Badge>
                                    </div>

                                    <div className="w-full">
                                      <div className="relative isolate mx-auto">
                                        <div>
                                          <div className="mx-auto w-full mt-[-1.5rem] max-sm:w-[100%] z-50">
                                            <div className="rounded-xl bg-white ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl max-sm:w-[100%]">
                                              <LibraryTestsAccordian
                                                tests={skills.tests}
                                                attemptedTests={attemptedTests}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
                {!restrictedFeatures?.includes("Client-library") && (
                  <>
                    {categorisedTests.map((category, index) => (
                      <div
                        key={index}
                        className="w-full flex flex-col items-center justify-center"
                      >
                        <div
                          id={category.category_name}
                          className="pt-[10vh] w-full flex flex-col items-center justify-center"
                        ></div>
                        <h1 className="text-xl mt-2 max-sm:text-sm text-gray-600 font-semibold border border-gray-400 py-1 px-4 bg-white rounded-md">
                          {convertTextToCorrectFormat(category.category_name)}
                        </h1>
                        <div className="my-0 mt-1 py-0 text-xs flex flex-row items-center">
                          <Info
                            color="#9ca3af"
                            className="h-4 w-4 inline text-gray-600 mr-2"
                          />{" "}
                          <span>
                            {" "}
                            Grayed bars indicate already attempted simulations
                          </span>
                        </div>

                        <div className="w-[65%] max-sm:w-[85%] max-lg:w-[85%] flex justify-center items-center mt-4">
                          <SearchNSelect
                            placeholder="Select by Simulation domain"
                            onSearchHandler={(value) =>
                              onDomainSearchHandlerNewManager(value, category)
                            }
                            onDomainSelectHandler={(value) =>
                              onDomainSelectHandlerNewManager(value, category)
                            }
                            optionDomains={category.domainOptionsForFilter}
                          />
                        </div>

                        <div className="flex flex-col max-sm:flex-col w-[64%] max-sm:w-[90%] max-lg:w-[85%] mx-auto">
                          {(
                            filteredTestsData[category.category_name] ||
                            category.tests_data
                          ).map((domains, domainIndex) => (
                            <div key={domainIndex}>
                              {domains.tests.length > 0 && (
                                <>
                                  <div className={`w-full flex justify-center`}>
                                    <Badge
                                      variant={"default"}
                                      className="bg-[#2DC092] hover:bg-[#2DC092] h-6 w-fit text-white text-sm py-3 text-center mb-8 mt-8 max-sm:mt-8 max-sm:text-xs truncate "
                                    >
                                      <>
                                        Category :{" "}
                                        {convertTextToCorrectFormat(
                                          domains.domain
                                        )}
                                      </>
                                    </Badge>
                                  </div>

                                  <div className="w-full">
                                    <div className="relative isolate mx-auto">
                                      <div>
                                        <div className="mx-auto w-full mt-[-1.5rem] max-sm:w-[100%] z-50">
                                          <div className="rounded-xl bg-white ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl max-sm:w-[100%]">
                                            <LibraryTestsAccordian
                                              tests={domains.tests}
                                              type={"categorised"}
                                              attemptedTests={attemptedTests}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </>
                )}
                {!restrictedFeatures?.includes("Assigned-scenarios") && (
                  <>
                    <div id="assigned-tests" className="pt-[10vh]"></div>
                    <div className="w-full flex flex-col items-center justify-center">
                      <h1 className="text-xl mt-2 max-sm:text-sm text-gray-600 font-semibold border border-gray-400 py-1 px-4 bg-white rounded-md">
                        Assigned Simulations
                      </h1>
                      <div className="my-0 mt-1 py-0 text-xs flex flex-row items-center">
                        <Info
                          color="#9ca3af"
                          className="h-4 w-4 inline text-gray-600 mr-2"
                        />{" "}
                        <span>
                          {" "}
                          Grayed bars indicate already attempted simulations
                        </span>
                      </div>
                      {requestedScenariosLoading ? (
                        <div className="bg-white my-16 max-sm:h-full max-sm:min-h-screen pb-16 flex justify-center items-center">
                          <p className="p-2 text-sm max-sm:text-xs">
                            {" "}
                            <Loader className="animate-spin inline h-4 w-4 mr-2" />
                            Loading...
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col max-sm:flex-col w-[64%] max-sm:w-[90%] max-lg:w-[85%] mx-auto">
                          <div className="w-full">
                            <div className="relative isolate mx-auto">
                              <div>
                                <div className="mx-auto w-full mt-4 max-sm:w-[100%] z-50">
                                  <div className="rounded-xl bg-white ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl max-sm:w-[100%]">
                                    {requestedTestsData?.assignedscenarios
                                      .length > 0 ? (
                                      <LibraryTestsAccordian
                                        attemptedTests={attemptedTests}
                                        tests={
                                          requestedTestsData?.assignedscenarios
                                        }
                                        type={"assigned"}
                                      />
                                    ) : (
                                      <p className="text-sm max-sm:text-xs text-gray-600 py-4">
                                        You don't have any assigned scenarios
                                        yet.
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
                  </>
                )}
                {!restrictedFeatures?.includes("Requested-scenarios") && (
                  <>
                    <div
                      id="requested-tests"
                      className="pt-[10vh]  w-full flex flex-col items-center justify-center"
                    ></div>
                    <div className="w-full flex flex-col items-center justify-center">
                      <h1 className="text-xl mt-2 max-sm:text-sm text-gray-600 font-semibold border border-gray-400 py-1 px-4 bg-white rounded-md">
                        Requested Simulations
                      </h1>
                      <div className="my-0 mt-1 py-0 text-xs flex flex-row items-center">
                        <Info
                          color="#9ca3af"
                          className="h-4 w-4 inline text-gray-600 mr-2"
                        />{" "}
                        <span>
                          {" "}
                          Grayed bars indicate already attempted simulations
                        </span>
                      </div>
                      {requestedScenariosLoading ? (
                        <div className="bg-white my-16 max-sm:h-full max-sm:min-h-screen pb-16 flex justify-center items-center">
                          <p className="p-2 text-sm max-sm:text-xs">
                            {" "}
                            <Loader className="animate-spin inline h-4 w-4 mr-2" />
                            Loading...
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col max-sm:flex-col w-[64%] max-sm:w-[90%] max-lg:w-[85%] mx-auto">
                          <div className="w-full">
                            <div className="relative isolate mx-auto">
                              <div>
                                <div className="mx-auto w-full mt-4 max-sm:w-[100%] z-50">
                                  <div className="rounded-xl bg-white ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl max-sm:w-[100%] mb-20">
                                    {requestedTestsData?.requestedscenarios
                                      .length > 0 ? (
                                      <LibraryTestsAccordian
                                        tests={
                                          requestedTestsData?.requestedscenarios
                                        }
                                        attemptedTests={attemptedTests}
                                        type={"requested"}
                                      />
                                    ) : (
                                      <p className="text-sm max-sm:text-xs text-gray-600 py-4">
                                        You don't have any requested scenarios,
                                        Start by Creating.
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
                  </>
                )}
              </MaxWidthWrapper>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyLibrary;
