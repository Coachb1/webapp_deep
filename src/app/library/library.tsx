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
import { ChevronLeft, History, Info, Loader } from "lucide-react";
import Link from "next/link";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import {
  baseURL,
  basicAuth,
  configureTestsData,
  convertTestsData,
  convertTextToCorrectFormat,
  getUserAccount,
} from "@/lib/utils";
import NetworkNav from "@/components/NetworkNav";
import HeroAccordion from "@/components/HeroAccordion";
import { EQTests, EQTestsCategorised } from "@/lib/test";
import { Separator } from "@/components/ui/separator";
import SearchNSelect from "./SearchNSelect";
import CreateYourOwn from "@/components/CreateYourOwn";
import {
  Categories,
  CategoryData,
  competencySkillsTestType,
  newManagerTestsType,
  TestsType,
  TestData as TestDataType,
  DomainData,
} from "@/lib/types";
import { useSearchParams } from "next/navigation";

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
  const params = useSearchParams();
  const scrollViewFromParams = params.get("scrollView");

  const [tests, setTests] = useState<StateType[]>([]);
  const [filteredTests, setFilteredTests] = useState<StateType[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [groupList, setGroupList] = useState<string[]>([]);
  const [currentActiveGroup, setCurrentActiveGroup] = useState<string>("");

  const [requestedScenariosLoading, setRequestedScenariosLoading] =
    useState(true);

  const [competencyBasedPowerSkillsTests, setCompetencyBasedPowerSkillsTests] =
    useState<CategoryData[]>([]);
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

  const [categorisedTests, setCategorisedTests] = useState<CategoryData[]>([]);
  const [filteredCategorisedTests, setFilteredCategorisedTests] = useState({});

  const [attemptedTests, setAttemptedTests] = useState<string[]>([]);

  const getTestsByCompetencies = () => {
    if (user) {
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
                .then((data) => {
                  console.log("GET TESTS BY COMPETENCIES : ", data);

                  const convertedCompetencyTests = convertTestsData(data);
                  console.log(convertedCompetencyTests);
                  setCompetencyBasedPowerSkillsTests([
                    convertedCompetencyTests,
                  ]);
                })
                .then((err) => {
                  console.error(err);
                });
            })
            .catch((err) => {
              console.error(err);
            });
        });
    }
  };

  const getRequestedTests = () => {
    if (user) {
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
    }
  };

  const getAttemptedTestsList = () => {
    if (user) {
      getUserAccount(user)
        .then((res) => res.json())
        .then((data) => {
          fetch(
            `${baseURL}/test-attempt-sessions/get-attempted-test-list/?user_id=${data.uid}`,
            {
              method: "GET",
              headers: {
                Authorization: basicAuth,
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              console.log(data, "getAttemptedTestsList");
              setAttemptedTests(data.data.codes);
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const CreateYourOwnGeneratedHandler = () => {
    getRequestedTests();
  };

  const getNewManagerTests = () => {
    fetch(`${baseURL}/accounts/get-client-information/?for=my_lib`, {
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

        console.log("group_list", group_list);

        fetch(
          `${baseURL}/tests/get-tests-by-tab-category/?client_name=${group_list[0]}`,
          {
            method: "GET",
            headers: {
              Authorization: basicAuth,
            },
          }
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            console.log("ConfiguredTestData", configureTestsData(data));

            setCategorisedTests(configureTestsData(data));
            // //@ts-ignore
            // const newManagerTests: newManagerTestsType[] = Object.entries(
            //   data["Manager"]
            // ).map(([domain, tests]) => ({ domain, tests }));
            // setNewManagerTests(newManagerTests);
            // SetFilteredNewManagerTests(newManagerTests);
            // const tempConversionDomains = newManagerTests.map((test) => {
            //   return {
            //     label: test.domain,
            //     value: test.domain,
            //   };
            // });
            // setDomainOptionsNewManager(tempConversionDomains);
          })
          .catch((err) => console.error("Cannot retrive tests", err));
      });
  };

  useEffect(() => {
    setTimeout(() => {
      if (scrollViewFromParams) {
        document.getElementById(scrollViewFromParams)?.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 3000);
    if (user) {
      getTestsByCompetencies();
      getRequestedTests();
      getNewManagerTests();
      getAttemptedTestsList();

      fetch(`${baseURL}/accounts/get-client-information/?for=my_lib`, {
        method: "GET",
        headers: {
          Authorization: basicAuth,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(async (data) => {
          console.log(data);
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

  // const onDomainSelectHandler = (val: string) => {
  //   console.log(val);
  //   const filtered = tests.filter((test) => {
  //     return test.category.toLowerCase().includes(val.toLowerCase());
  //   });
  //   console.log(filtered);
  //   setFilteredTests(filtered);
  // };

  const onDomainSearchHandler = (value: string) => {
    console.log("search:", value);
    console.log("ALL:", tests);
    const filtered = tests.filter((test) => {
      return test.category.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredTests(filtered);
    console.log(filtered);
  };

  // const onDomainSelectHandlerNewManager = (val: string) => {
  //   console.log(val);
  //   const filtered = newManagerTests.filter((test) => {
  //     return test.domain.toLowerCase().includes(val.toLowerCase());
  //   });
  //   console.log(filtered);
  //   SetFilteredNewManagerTests(filtered);
  // };

  // const onDomainSearchHandlerNewManager = (value: string) => {
  //   console.log("search:", value);
  //   console.log("ALL:", tests);
  //   const filtered = newManagerTests.filter((test) => {
  //     return test.domain.toLowerCase().includes(value.toLowerCase());
  //   });
  //   console.log(filtered);
  //   SetFilteredNewManagerTests(filtered);
  // };
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

  return (
    <div>
      {/* <div className="fixed w-full flex items-center top-0 right-0 justify-end p-4 h-6 py-8 !z-[800]">
        <NetworkNav user={user} />
      </div> */}
      <main className="bg-white min-h-[100vh] h-full max-sm:h-full max-sm:min-h-screen pb-16">
        <div>
          <div>
            <div
              id="category-navbar"
              className="flex  flex-col gap-2 mb-4 bg-red justify-center items-center sticky top-0 bg-white z-[10]  w-full"
            >
              <div className="pb-1 max-sm:pb-0 flex flex-row justify-center items-center text-center mt-[70px] ">
                <p className="text-4xl font-bold max-sm:text-2xl flex text-gray-600">
                  {" "}
                  <Link href={"v1"} className="hidden ">
                    {" "}
                    <ChevronLeft className="h-4 w-4 mr-1 inline" />{" "}
                  </Link>{" "}
                  <span>Simulations & Roleplays</span>
                </p>
              </div>
              <div className="my-0 mt-1 max-sm:mt-0 py-0 text-xs flex flex-row items-center text-center px-20 max-sm:px-8">
                <span>
                  {" "}
                  Simulations and roleplays replicate real-world situations and
                  interactions, evaluating our aptitude for success in the
                  workplace. By mimicking scenarios we may encounter, they
                  assess our interpersonal skills and provide detailed feedback
                  on our performance and potential areas for improvement.
                </span>
              </div>
              <div className="flex justify-center flex-col gap-2 max-sm:gap-1">
                <div className="flex max-sm:px-2 justify-center flex-row z-50 gap-2 max-sm:gap-1 max-sm:text-xs flex-wrap">
                  <Button
                    variant={"outline"}
                    className={`h-8 max-sm:text-sm`}
                    onClick={() => {
                      document.getElementById("eq-tests")?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    EQ Areas
                  </Button>

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
                  {categorisedTests.map((category) => (
                    <Button
                      onClick={() => {
                        document
                          .getElementById(category.category_name)
                          ?.scrollIntoView({
                            behavior: "smooth",
                          });
                      }}
                      variant={"outline"}
                      className={`h-8 max-sm:text-sm`}
                    >
                      {category.category_name}
                    </Button>
                  ))}
                </div>
                <div className="self-center h-[2px] bg-gray-300 w-full max-sm:w-[80%]" />
                <div className="flex max-sm:px-2 justify-center items-center flex-row z-50 gap-2 max-sm:gap-1 max-sm:text-xs flex-wrap">
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
                    Requested Scenarios <History className="h-4 w-4 ml-2" />
                  </Button>
                  <Button
                    onClick={() => {
                      document.getElementById("create-new")?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                    className={`h-8 max-sm:text-sm bg-blue-400 text-white hover:bg-blue-300`}
                  >
                    Create New Simulation (Experimental)
                  </Button>
                </div>
              </div>

              <hr className=" h-[3px] bg-gray-400 w-full" />
              <div className="bg-white h-[10px] w-full" />
            </div>
            <div
              id="eq-tests"
              className="pt-[42vh] mt-[-40vh]  max-sm:pt-[50vh] max-sm:mt-[-45vh]  w-full flex flex-col items-center justify-center"
            ></div>
            <div className="max-sm:pb-10 min-h-[70vh] max-sm:min-h-[60vh]">
              <MaxWidthWrapper className="flex pt-2 flex-col items-center justify-center text-center">
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
                          <h1 className="text-xl mt-2 max-sm:text-xl text-gray-600 font-semibold border border-gray-400 py-1 px-4 bg-white rounded-md">
                            {/* {convertTextToCorrectFormat(category.category_name)} */}
                            EQ Areas
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

                          <div className="w-[65%] max-sm:w-[85%] flex justify-center items-center mt-4">
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

                          <div className="flex flex-col max-sm:flex-col w-[64%] max-sm:w-[90%] mx-auto">
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
                                        variant={"default"}
                                        className="bg-[#2DC092] hover:bg-[#2DC092] h-6 w-fit text-white text-sm py-3 text-center mb-8 mt-8 max-sm:mt-8 max-sm:text-xs truncate "
                                      >
                                        <>✨ {domains.domain}</>
                                      </Badge>
                                    </div>

                                    <div className="w-full">
                                      <div className="relative isolate mx-auto">
                                        <div>
                                          <div className="mx-auto w-full mt-[-1.5rem] max-sm:w-[100%] z-50">
                                            <div className="rounded-xl bg-white ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl max-sm:w-[100%]">
                                              <Accordion
                                                type="single"
                                                collapsible
                                                className="w-full text-gray-500 max-sm:p-4 rounded-xl bg-white overflow-clip border"
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
                                                        domains.tests.length - 1
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
                                                        <div>{test.title}</div>
                                                      </AccordionTrigger>
                                                      <AccordionContent className="max-sm:text-xs">
                                                        <p className="text-left">
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
                                                  )
                                                )}
                                              </Accordion>
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
                <div
                  id="competency-tests"
                  className="pt-[42vh]  max-sm:pt-[50vh] max-sm:mt-[-45vh] mt-[-32vh] w-full flex flex-col items-center justify-center"
                >
                  {/* <Separator className="w-[80%] bg-gray-200 " /> */}
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                  <h1 className="text-xl mt-2 max-sm:text-xl text-gray-600 font-semibold border border-gray-400 py-1 px-4 bg-white rounded-md">
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
                  <div className="w-[65%] max-sm:w-[85%] flex justify-center items-center mt-4">
                    {competencyBasedPowerSkillsTests.length > 0 && (
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
                  <div className="flex flex-col max-sm:flex-col w-[64%] max-sm:w-[90%] mx-auto">
                    {competencyBasedPowerSkillsTests.length > 0 && (
                      <>
                        {(
                          filteredTestsData["Competency based power skills"] ||
                          competencyBasedPowerSkillsTests[0]?.tests_data
                        ).map((skills) => (
                          <>
                            {skills.tests.length > 0 && (
                              <>
                                <div className={`w-full flex justify-center`}>
                                  <Badge
                                    variant={"default"}
                                    className="bg-[#2DC092] hover:bg-[#2DC092] h-6 w-fit text-white text-sm py-3 text-center mb-8 mt-8 max-sm:mt-8 max-sm:text-xs truncate "
                                  >
                                    <>✨ {skills.domain}</>
                                  </Badge>
                                </div>

                                <div className="w-full">
                                  <div className="relative isolate mx-auto">
                                    <div>
                                      <div className="mx-auto w-full mt-[-1.5rem] max-sm:w-[100%] z-50">
                                        <div className="rounded-xl bg-white ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl max-sm:w-[100%]">
                                          <Accordion
                                            type="single"
                                            collapsible
                                            className="w-full text-gray-500 max-sm:p-4 rounded-xl bg-white overflow-clip border"
                                          >
                                            {skills.tests.length > 0 &&
                                              skills.tests.map(
                                                (test: any, i: number) => (
                                                  <>
                                                    <AccordionItem
                                                      key={i}
                                                      value={`item-${
                                                        Number(i) + 1
                                                      }`}
                                                      className={`${
                                                        i ===
                                                        skills.tests.length - 1
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
                                                          {test.title}{" "}
                                                          {test.is_recommended && (
                                                            <Badge
                                                              variant={
                                                                "secondary"
                                                              }
                                                              className="ml-2 rounded-sm bg-blue-100 text-xs text-blue-700 hover:bg-blue-200"
                                                            >
                                                              Recommended
                                                            </Badge>
                                                          )}
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
                                                )
                                              )}
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
                      </>
                    )}
                    {/* {competencyBasedPowerSkillsTests.length === 0 && (
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
                    )} */}
                  </div>
                </div>
                {/* <Separator className="mt-10 w-[80%] max-sm:my-6 bg-gray-200" /> */}

                <>
                  {categorisedTests.map((category, index) => (
                    <div
                      key={index}
                      // id={category.category_name}
                      className="w-full flex flex-col items-center justify-center"
                    >
                      <div
                        id={category.category_name}
                        className="pt-[42vh]  max-sm:pt-[50vh] max-sm:mt-[-45vh] mt-[-32vh]  w-full flex flex-col items-center justify-center"
                      >
                        {/* <Separator className="w-[80%] bg-gray-200 " /> */}
                      </div>
                      {/* Category Name */}
                      <h1 className="text-xl mt-2 max-sm:text-xl text-gray-600 font-semibold border border-gray-400 py-1 px-4 bg-white rounded-md">
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

                      <div className="w-[65%] max-sm:w-[85%] flex justify-center items-center mt-4">
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

                      <div className="flex flex-col max-sm:flex-col w-[64%] max-sm:w-[90%] mx-auto">
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
                                    <>✨ {domains.domain}</>
                                  </Badge>
                                </div>

                                <div className="w-full">
                                  <div className="relative isolate mx-auto">
                                    <div>
                                      <div className="mx-auto w-full mt-[-1.5rem] max-sm:w-[100%] z-50">
                                        <div className="rounded-xl bg-white ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl max-sm:w-[100%]">
                                          <Accordion
                                            type="single"
                                            collapsible
                                            className="w-full text-gray-500 max-sm:p-4 rounded-xl bg-white overflow-clip border"
                                          >
                                            {domains.tests.map(
                                              (
                                                test: {
                                                  title: string;
                                                  description:
                                                    | string
                                                    | number
                                                    | boolean
                                                    | ReactElement<
                                                        any,
                                                        | string
                                                        | JSXElementConstructor<any>
                                                      >
                                                    | Iterable<ReactNode>
                                                    | ReactPortal
                                                    | null
                                                    | undefined;
                                                  test_code: string;
                                                  is_recommended: boolean;
                                                },
                                                i: Key | null | undefined
                                              ) => (
                                                <AccordionItem
                                                  key={i}
                                                  value={`item-${
                                                    Number(i) + 1
                                                  }`}
                                                  className={`${
                                                    i ===
                                                    domains.tests.length - 1
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
                                                      {test.title.includes(
                                                        ":"
                                                      ) ? (
                                                        <>
                                                          {test.title
                                                            .split(":")[1]
                                                            .trim()}
                                                        </>
                                                      ) : (
                                                        <>{test.title}</>
                                                      )}
                                                      {test.is_recommended && (
                                                        <Badge
                                                          variant={"secondary"}
                                                          className="ml-2 rounded-sm bg-blue-100 text-xs text-blue-700 hover:bg-blue-200"
                                                        >
                                                          Recommended
                                                        </Badge>
                                                      )}
                                                    </div>
                                                  </AccordionTrigger>
                                                  <AccordionContent className="max-sm:text-xs">
                                                    <p className="text-left">
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
                                              )
                                            )}
                                          </Accordion>
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
                {/* {newManagerTests.length === 0 && (
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
                    )} */}
                {/* <Separator className="mt-10 w-[80%] max-sm:my-6 bg-gray-200" /> */}
                <div
                  id="requested-tests"
                  className="pt-[42vh]  max-sm:pt-[50vh] max-sm:mt-[-45vh] mt-[-32vh]  w-full flex flex-col items-center justify-center"
                >
                  {/* <Separator className="w-[80%] bg-gray-200 " /> */}
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                  <h1 className="text-xl mt-2 max-sm:text-xl text-gray-600 font-semibold border border-gray-400 py-1 px-4 bg-white rounded-md">
                    Requested Scenarios
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
                    <div className="flex flex-col max-sm:flex-col w-[64%] max-sm:w-[90%] mx-auto">
                      <div className="w-full">
                        <div className="relative isolate mx-auto">
                          <div>
                            <div className="mx-auto w-full mt-4 max-sm:w-[100%] z-50">
                              <div className="rounded-xl bg-white ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl max-sm:w-[100%]">
                                {requestedScenarios.length > 0 ? (
                                  <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full text-gray-500 max-sm:p-4 rounded-xl bg-white overflow-clip border"
                                  >
                                    {requestedScenarios.map((test, i) => (
                                      <>
                                        <AccordionItem
                                          key={i}
                                          value={`item-${i + 1}`}
                                          className={`${
                                            i === requestedScenarios.length - 1
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
                                              {test.title}{" "}
                                              {test.is_recommended && (
                                                <Badge
                                                  variant={"secondary"}
                                                  className="ml-2 rounded-sm bg-blue-100 text-xs text-blue-700 hover:bg-blue-200"
                                                >
                                                  Recommended
                                                </Badge>
                                              )}
                                            </div>
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
                <div
                  id="create-new"
                  className="pt-[44vh] max-sm:pt-[50vh] max-sm:mt-[-45vh] mt-[-34vh]  w-full flex flex-col items-center justify-center"
                ></div>
                <div className="w-full flex flex-col items-center justify-center">
                  <Badge
                    variant={"secondary"}
                    className="bg-cyan-400 text-xs hover:bg-cyan-400 text-white -ml-[8rem] -mb-[14px] z-[2]"
                  >
                    Experimental
                  </Badge>
                  <div className="text-xl mt-2 max-sm:text-xl text-gray-600 font-semibold border border-gray-400 py-1 px-4 bg-white rounded-md">
                    <h1>Create new Scenario </h1>
                  </div>
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
        {/* <PageFooter /> */}
      </main>
    </div>
  );
};

export default MyLibrary;
