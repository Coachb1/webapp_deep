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
import CountdownBanner from "@/components/ui/CountdownBanner";


const VersionTwo = ({ user, helpModeText }: any) => {
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
    const [tabTypeInformation, setTabTypeInformation] = useState<any>({});
    const [tabCategoryInfo, setTabCategoryInfo] = useState<any>({});


    const [requestedScenariosLoading, setRequestedScenariosLoading] =
        useState(false);
    const {
        userInfo,
        requestedTestsData,
        attemptedTests,
        leadershipLibrary

    } = useUser();
    useEffect(() => {
        console.log('userInfo', userInfo);
        const dynamicHelpText = userInfo.helpText?.demo;
        setHelpModeSteps([
            {
                target: "#user-demos",
                content: dynamicHelpText?.user_demos
                    ? dynamicHelpText.user_demos
                    : "The platform curated microlessons, simulations and roleplays around various use cases. Click on each tab to navigate to the right section.",
            },
            {
                target: "#nav2",
                content: dynamicHelpText?.nav_two
                    ? dynamicHelpText.nav_two
                    : `The "Assigned Scenarios" contains the simulations that have been asigned by Managers, Administrator and External coaches.`,
            },
            {
                target: "#nav3",
                content: dynamicHelpText?.nav_three
                    ? dynamicHelpText.nav_three
                    : `Each micro-lesson topic has a short video and associated Simulation exercise. Copy the interaction code from the panel and use the same in the widget.`,
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
                console.log("Fetching test mappings...", leadershipLibrary);
                setTabTypeInformation(leadershipLibrary?.tab_type_info);
                setTabCategoryInfo(leadershipLibrary?.page_scenarios.category_info);
                setData(leadershipLibrary?.page_scenarios.results);

            } catch (error: any) {
                console.error("Failed to load test mappings:", error);
                setData({});

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
    console.log('tab', tabTypeInformation)
    const colorList = ['bg-gray-300', 'bg-blue-300', 'bg-green-300', 'bg-gray-300', 'bg-gray-300'];
    const tabTypeColors: { [key: string]: string } = {
        simulation: "bg-blue-300",
        'roleplay observation (difficult conversations)': "bg-green-300",
        undefined: "bg-gray-200",
        'psychometric assessment': "bg-green-300",
      };
      
    return (
        <>
            <HelpMode steps={HelpModeSteps} forPage="demo" />
            <MaxWidthWrapper className="flex pt-20 flex-col items-center justify-center text-center">
                <CountdownBanner />
                <h1 className="text-4xl mt-6 font-bold max-sm:text-2xl text-gray-600 ">
                    Leadership Micro-lessons and Simulations
                </h1>
                <p className="mt-4">Thousands of Microlearning embedded roleplay simulations!</p>

                {/* Category buttons */}
                {Object.keys(data).length > 0 && (
                    <>
                        {Object.entries(tabTypeInformation).sort(([aKey], [bKey]) => aKey.localeCompare(bKey)).map(([tabType, categories],index) => (
                            <>
                                <Badge className={`mt-6 -mb-6 px-4 z-10 rounded-md text-gray-800 hover:bg-gray-300  capitalize ${tabTypeColors[tabType.toLowerCase()] || 'bg-gray-200'}`}>
                                    {tabType === 'undefined' ? 'Roleplay Observation' : ` ${tabType.charAt(0).toUpperCase() + tabType.slice(1)}`}
                                </Badge>

                                <div className="bg-transparent h-4" />


                                <div className="w-full max-w-4xl">
                                    <Div
                                        id={`user-demos`}
                                        className="bg-white border border-gray-300 rounded-md p-4 shadow-sm"
                                    >
                                        <div className="flex flex-wrap justify-center gap-3 mt-2">
                                            {(categories as any[]).map((categoryObj) => (
                                                <Button
                                                    key={categoryObj.category}
                                                    variant="secondary"
                                                    className="relative border border-gray-200 h-8 px-4 rounded-md text-sm font-medium hover:bg-gray-100 transition-all duration-200 max-sm:text-xs"
                                                    onClick={() => scrollToView(getUniqueId(categoryObj.category))}
                                                >
                                                    <span className="flex items-center gap-2">
                                                        {categoryObj.category}

                                                        {categoryObj.tab_sticker && (
                                                            <p className="absolute -top-4 -right-1 px-1 py-0.5 text-green-800 text-[10px]">
                                                                {categoryObj.tab_sticker}
                                                            </p>
                                                        )}
                                                    </span>
                                                </Button>
                                            ))}
                                        </div>
                                    </Div>
                                </div>
                            </>
                        ))}
                    </>
                )}



                <div
                    className="flex flex-row flex-wrap justify-center mt-2 z-[2] gap-2 p-3 rounded-md"
                >
                    {!userInfo.restrictedFeatures?.includes("Requested-scenarios") ||
                        (!userInfo.restrictedFeatures?.includes("Assigned-scenarios") && (
                            <div className="self-center h-[2px] bg-gray-300 w-full max-sm:w-[80%]" />
                        ))}

                    <Badge className={`mt-6 -mb-6 px-4 z-10 rounded-md text-gray-800 hover:bg-gray-300 bg-blue-200`}>
                                    Others
                    </Badge>
                    
                    <div className="bg-transparent h-4" />


                    <div className="w-full max-w-4xl">
                        <Div id="nav2" className="bg-white border border-gray-300 rounded-md p-4 shadow-sm">
                            <div className="flex flex-wrap justify-center gap-3 mt-2">
                                {!userInfo.restrictedFeatures?.includes("Assigned-scenarios") && (
                                    <Button

                                        onClick={() => {
                                            document
                                                .getElementById("assigned-tests")
                                                ?.scrollIntoView({
                                                    behavior: "smooth",
                                                });
                                        }}
                                        className={`h-8 max-xs:text-xm font-medium border bg-gray-100 border-gray-200 rounded-md text-black hover:bg-gray-100 `}
                                    >
                                        Assigned Simulations{" "}
                                        <History className="h-4 w-4 ml-2" />
                                    </Button>
                                )}
                            </div>
                        </Div>
                    </div> 


                    {/* <div
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
                                className={`relative border border-gray-200 h-8 px-4 rounded-md text-sm font-medium hover:bg-gray-100 transition-all duration-200 max-sm:text-xs`}
                            >
                                Assigned Simulations{" "}
                                <History className="h-4 w-4 ml-2" />
                            </Button>
                        )} */}
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
                    {/* </div> */}
                </div>
            </MaxWidthWrapper>


            <div className="flex pt-2 flex-col items-center justify-center text-center">
                {Object.entries(data).map(([category, simulations], index) => (
                    <div className="w-full scroll-mt-[3rem]" id={getUniqueId(category)} key={category}>
                        <Badge

                            variant={"secondary"}
                            className="bg-gray-300 h-6 w-fit text-gray-600 py-3 text-center mb-3 mt-12 max-sm:mt-8 text-sm"
                        >
                            {`${category}`}
                        </Badge>
                        <div className="flex flex-col max-sm:flex-col w-[64%] max-sm:w-[90%] max-lg:w-[85%] mx-auto">
                            <div className="w-full">
                                <div className="relative isolate mx-auto">
                                    <div>
                                        <div className="mx-auto w-full mt-4 max-sm:w-[100%] z-50">
                                            <div id={index == 0 ? 'nav3' : String(index)} className="rounded-xl bg-white ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl max-sm:w-[100%]">
                                                <LibraryTestsAccordian
                                                    tests={simulations}
                                                    attemptedTests={attemptedTests}
                                                    tabInformation={tabCategoryInfo[category]}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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

export default VersionTwo;
