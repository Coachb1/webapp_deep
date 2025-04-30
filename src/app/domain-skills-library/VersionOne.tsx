"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import HeroAccordion from "@/components/HeroAccordion";
import {
    InteractiveVisualSimulation,
    gamePlay,
    psychAssessment,
    LeadershipPsychometric,
    NewManager,
    TechManager,
    SalesAndService,
    Diversity,
    PresentationTest,
    TopTenRoles,
    CategoryMap,
} from "@/lib/test";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { baseURL, scrollToView } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

import React, { useEffect, useState } from "react";
import HelpMode from "@/components/HelpMode";
import { useUser } from "@/context/UserContext";
import { Div } from "@/components/ui/moving-border";
import { ExternalLink, History, Info, Loader } from "lucide-react";
import LibraryTestsAccordian from "../library/LibraryTestsAccordian";


const VersionOne = ({ user, helpModeText }: any) => {
    let shouldRenderDiv;
    if (user) {
        const userEmail = user?.email;
        const exclusionEmails = [
            "bagoriarajan@gmail.com",
            "falahsss900@gmail.com",
            "ansariaadil611@gmail.com",
            "testingweb22222@gmail.com",
            // "testingweb11111@gmail.com",
        ];
        const restrictedEmails = ["gmail", "yahoo", "hotmail", "outlook"];
        const domain = userEmail?.split("@")[1];
        const excludedEmail = exclusionEmails.includes(userEmail!);

        const isrestEmail = restrictedEmails.some((restrictedDomain) =>
            domain?.includes(restrictedDomain)
        );

        if (excludedEmail && isrestEmail) {
            shouldRenderDiv = true;
        } else if (!excludedEmail && isrestEmail) {
            shouldRenderDiv = false;
        } else if (!isrestEmail && !excludedEmail) {
            shouldRenderDiv = true;
        }
    }

    const [HelpModeSteps, setHelpModeSteps] = useState<any[]>([]);
    const [data, setData] = useState<CategoryMap>({});
    const [requestedScenariosLoading, setRequestedScenariosLoading] =
        useState(false);
    const {
        userInfo,
        requestedTestsData,
        attemptedTests

    } = useUser();
    useEffect(() => {
        console.log('userInfo', userInfo);
        const dynamicHelpText = userInfo.helpText?.demo;
        setHelpModeSteps([
            {
                target: "#user-demos",
                content: dynamicHelpText?.user_demos
                    ? dynamicHelpText.user_demos
                    : "The platform created simulations and roleplays around various use cases. This is just a representative use case.",
            },
            {
                target: "#nav2",
                content: dynamicHelpText?.nav_two
                    ? dynamicHelpText.nav_two
                    : `The "Assigned Scenarios" contains the simulations that have been asigned other users from "Simulation Creator" under "Creator studio" tab.`,
            },
            // {
            //     target: "#system-demos",
            //     content: dynamicHelpText?.system_demos
            //         ? dynamicHelpText.system_demos
            //         : "User or client-created assets, profiles, and avatar-bots in the platform. They are specific to each client setup.",
            // },
            {
                target: ".chat-icon",
                content: dynamicHelpText?.coachTalk
                    ? dynamicHelpText.coachTalk
                    : "Users who want to get feedback about their speech parameters like confidence, etc. should use this widget. Users must give input by speech in this case. The processing speed may be lower. ",
            },
            {
                target: ".chat-icon2",
                content: dynamicHelpText?.coachScribe
                    ? dynamicHelpText.coachScribe
                    : "Users who use this widget will not get any speech related feedback in their simulation reports. Users can give input via text or speech - in either case it is converted into text. The processing speed is fast & efficient. ",
            },
            {
                target: "#manager-plus",
                disableScrolling: false,
                content: dynamicHelpText?.manager_plus
                    ? dynamicHelpText.manager_plus
                    : "These sections are where the simulations actual simulations and roleplays curated. The title categorization is for easy access. In this case, the simulations are meant for Manager development. ",
            },
        ]);

        const fetchTestMappings = async () => {
            try {
                const res = await fetch(`${baseURL}/tests/test-mappings/?client_name=${userInfo.clientName}&page_name=domain_skills_library`);

                if (!res.ok) {
                    console.error(`HTTP error! Status: ${res.status}`);
                    setData({});
                    return;
                }

                if (res.status !== 200) {
                    console.error("Failed a to fetch test mappings", res.status);
                    setData({});
                    return;
                }
                const json = await res.json();

                console.log("testmapping", json, json.results, json.status);


                setData(json.results);
                console.log("testmapping2", json.results);
            } catch (error: any) {
                console.error("Failed to load test mappings:", error);
                // setData({});

            }
        };

        fetchTestMappings();

        console.log('datajson', data)



    }, [userInfo.clientName]);

    const getUniqueId = (category: string) => {
        return category
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')   // Replace spaces & symbols with hyphens
            .replace(/^-+|-+$/g, '');      // Remove leading/trailing hyphens
    };
    return (
        <>
            <HelpMode steps={HelpModeSteps} forPage="demo" />
            <MaxWidthWrapper className="flex pt-20 flex-col items-center justify-center text-center">

                <h1 className="text-6xl mt-12 font-bold max-sm:text-2xl text-gray-600 ">
                    Domain Skill Simulations
                </h1>

                {/* Category buttons */}
                {Object.keys(data).length > 0 && (
                    <>
                        <Badge className="mt-6 -mb-6 px-4 z-10 rounded-md bg-gray-300 hover:bg-gray-300 text-gray-800">
                            Coaching - Simulations
                        </Badge>
                        <div className="bg-transparent h-4" />
                        <div className="w-full max-w-4xl">
                            <Div
                                id="user-demos"
                                className="bg-white border border-gray-300 rounded-md p-4 shadow-sm"
                            >
                                <div className="flex flex-wrap justify-center gap-3">
                                    {Object.keys(data).map((category) => (
                                        <Button
                                            key={category}
                                            variant="secondary"
                                            className="border border-gray-200 h-8 hover:cursor-pointer max-sm:text-xs"
                                            onClick={() => scrollToView(getUniqueId(category))}
                                        >
                                            {category}
                                        </Button>
                                    ))}
                                </div>
                            </Div>
                        </div>
                    </>
                )}


                <div
                    className="flex flex-row flex-wrap justify-center mt-4 z-[2] gap-2 p-3 rounded-md"
                >
                        {!userInfo.restrictedFeatures?.includes("Requested-scenarios") ||
                            (!userInfo.restrictedFeatures?.includes("Assigned-scenarios") && (
                                <div className="self-center h-[2px] bg-gray-300 w-full max-sm:w-[80%]" />
                            ))}

                        <div
                            id="nav2"
                            className="flex max-sm:px-2 justify-center items-center flex-row z-50 gap-2 max-sm:gap-1 max-sm:text-xs flex-wrap"
                        >
                            {!userInfo.restrictedFeatures?.includes("Assigned-scenarios") && (
                                <Button
                                    onClick={() => {
                                        document
                                            .getElementById("assigned-tests")
                                            ?.scrollIntoView({
                                                behavior: "smooth",
                                            });
                                    }}
                                    className={`h-6 max-xs:text-xm bg-blue-400 text-white hover:bg-blue-300`}
                                >
                                    Assigned Simulations{" "}
                                    <History className="h-4 w-4 ml-2" />
                                </Button>
                            )}
                            {/* {!userInfo.restrictedFeatures?.includes("Requested-scenarios") && (
                                <Button
                                    onClick={() => {
                                        document
                                            .getElementById("requested-tests")
                                            ?.scrollIntoView({
                                                behavior: "smooth",
                                            });
                                    }}
                                    className={`h-6 max-sm:text-xs bg-blue-400 text-white hover:bg-blue-300`}
                                >
                                    Requested Simulations{" "}
                                    <History className="h-4 w-4 ml-2" />
                                </Button>
                            )} */}
                        </div>
                    </div>
            </MaxWidthWrapper>


            <div className="flex pt-2 flex-col items-center justify-center text-center">
                {Object.entries(data).map(([category, simulations]) => (
                    <>
                        <Badge

                            variant={"secondary"}
                            className="bg-gray-300 h-6 w-fit text-gray-600 py-3 text-center mb-3 mt-12 max-sm:mt-8 text-sm"
                        >
                            {`Coaching - Simulations : ${category}`}
                        </Badge>
                        <div id={getUniqueId(category)} className="flex flex-col max-sm:flex-col w-[64%] max-sm:w-[90%] max-lg:w-[85%] mx-auto">
                            <div className="w-full">
                                <div className="relative isolate mx-auto">
                                    <div>
                                        <div className="mx-auto w-full mt-4 max-sm:w-[100%] z-50">
                                            <div className="rounded-xl bg-white ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl max-sm:w-[100%]">
                                                <LibraryTestsAccordian
                                                    tests={simulations}
                                                    attemptedTests={attemptedTests}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ))}




                {!userInfo.restrictedFeatures?.includes("Assigned-scenarios") && (
                    <>
                        <div id="assigned-tests" className="pt-[10vh] mt-2"></div>
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
                {/* {!userInfo.restrictedFeatures?.includes("Requested-scenarios") && (
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
                )} */}
            </div>
        </>
    );
};

export default VersionOne;
