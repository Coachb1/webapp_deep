"use client";

import FilterDropDown from "@/components/FilterDropDown";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { baseURL, basicAuth, hideBots } from "@/lib/utils";
import { ChevronDown, Loader, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NetworkNav from "@/components/NetworkNav";

interface CoachesDataType {
  id: number;
  name: string;
  profile_id: string;
  department: string;
  bot_type: string;
  profile_pic_url: string;
  profile_type: string;
  description: string;
  experience: string;
  expertise: string;
  status: string;
  avatar_bot_id: string;
  feedback_wall: string | null;
  skills: string;
  is_visible: boolean;
  is_approved: boolean;
  avatar_snippit: string;
  avatar_bot_url: string;
}

interface FilterCategoriesType {
  filterName: string;
  filterOptions: string[];
}

const Coaches = ({ user }: any) => {
  const router = useRouter();
  const [parentCheckedValues, setParentCheckedValues] = useState<string[]>([]);
  const [coachesData, setCoachesData] = useState<CoachesDataType[]>([]);
  const [savedCoachesData, setSavedCoachesData] = useState<CoachesDataType[]>(
    []
  );
  const [filterCategroies, setFilterCategories] = useState<
    FilterCategoriesType[]
  >([]);

  const [loading, setLoading] = useState(true);

  const getCoachesData = async () => {
    //GET COACHES
    await fetch(`${baseURL}/accounts/get-directory-informations/`, {
      method: "GET",
      headers: {
        Authorization: basicAuth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSavedCoachesData(data);
        setCoachesData(data);
        setLoading(false);

        const profileTypeOptions: string[] = Array.from(
          new Set(data.map((profile: CoachesDataType) => profile.profile_type))
        );

        const departmentOptions: string[] = Array.from(
          new Set(data.map((profile: CoachesDataType) => profile.department))
        );

        const botTypeTypes: string[] = Array.from(
          new Set(data.map((profile: CoachesDataType) => profile.bot_type))
        );

        setFilterCategories([
          {
            filterName: "Profile Type",
            filterOptions: profileTypeOptions,
          },
          {
            filterName: "Experience",
            filterOptions: [
              "0 - 5 years",
              "5 - 10 years",
              "10 - 15 years",
              "15 - 20 years",
            ],
          },
          {
            filterName: "Department",
            filterOptions: [
              "Sales & Marketing",
              "Production",
              "Design",
              "Engineering",
              "HR & Training",
            ],
          },
          {
            filterName: "Skills",
            filterOptions: [
              "None",
              "Technology",
              "Business Operations",
              "Project management & engineering",
              "HR & People development",
              "Sales & Marketing",
              "Finance",
            ],
          },
          {
            filterName: "Expertise",
            filterOptions: [
              "Career Management",
              "Work Life Banlance",
              "Project Management",
              "Lateral Transfers",
            ],
          },
          {
            filterName: "Bot Type",
            filterOptions: botTypeTypes,
          },
        ]);

        console.log(profileTypeOptions, departmentOptions, botTypeTypes);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getCoachesData();
    hideBots();
  }, []);

  function filterData(
    inputArray: CoachesDataType[],
    filterArray: string[]
  ): CoachesDataType[] {
    if (filterArray.length === 0) {
      return inputArray;
    }

    return inputArray.filter((obj) => {
      return filterArray.every((filter) => {
        for (const prop in obj) {
          if (obj.hasOwnProperty(prop) && obj[prop as keyof CoachesDataType]) {
            const propValue = obj[prop as keyof CoachesDataType]!.toString();
            if (propValue.includes(filter)) {
              return true;
            }
          }
        }
        return false;
      });
    });
  }

  const handleUpdateCheckedValues = (newValues: string[]) => {
    console.log(newValues);
    setParentCheckedValues(newValues);

    //for search when empty
    if (newValues.length > 0 && newValues[0].length === 0) {
      setParentCheckedValues([]);
    }

    //for dropdown select
    if (newValues.length === 0) {
      console.log("no values selected");
      setCoachesData(savedCoachesData);
    } else {
      const filteredData = filterData(savedCoachesData, newValues);
      console.log(filteredData);
      setCoachesData(filteredData);
    }
  };

  return (
    <div className="bg-gray-100 min-h-[120vh] h-full grainy max-sm:h-full max-sm:min-h-screen pb-16">
      <div className="fixed w-full flex items-center justify-end p-4 h-6 py-8 !z-[800]">
        <div className="flex flex-row gap-1">
          <NetworkNav user={user} />
        </div>
      </div>
      <MaxWidthWrapper className="flex pt-20 flex-col items-center justify-center text-center">
        <h1 className="text-[#2DC092] border-2 border-[#2DC092] p-[3px] text-xl font-extrabold mt-10 mb-6">
          <span className="bg-[#2DC092] text-white text-lg font-bold mr-[4px] p-[4px]">
            COACH
          </span>
          BOTS
        </h1>
        <h1 className="text-5xl mt-0 font-bold md:text-6xl lg:text-4xl  max-sm:text-2xl text-gray-600 ">
          Coaching & Mentoring community
        </h1>
        <p className="my-2 max-w-prose text-zinc-700 sm:text-lg max-sm:px-8">
          {" "}
          2000+ Strong group of experts & future leaders
        </p>

        <div className="my-4 max-sm:text-xs flex flex-row gap-2 max-sm:flex-wrap justify-center">
          <Button disabled variant={"outline"} className="h-fit w-fit">
            Group coaching (coming soon)
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none border-none">
              <Button variant={"outline"} className="h-fit w-fit">
                Join the network <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  router.push(`/intake/?type=coach`);
                }}
              >
                Join as a Coach
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  router.push(`/intake/?type=coachee`);
                }}
              >
                Join as a Coachee
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button disabled variant={"outline"} className="h-fit w-fit">
            Whatsapp Community (coming soon)
          </Button>
        </div>
        <div id="list" className="min-h-screen w-full max-sm:px-2">
          <div className="my-4">
            <p className="font-semibold text-gray-500 max-sm:text-sm">
              We enable deep and meaningful coaching conversations with AI
              assistance even when life gets busy!
            </p>
          </div>
          <div className="my-4">
            <div className="bg-white flex flex-row items-center p-1.5 py-3 rounded-md shadow-md  ">
              <Search className="h-4 w-4 mr-1 inline" />
              <input
                placeholder="What are you looking for?"
                className="border-l pl-2 outline-none text-sm max-sm:text-xs max-sm:ml-1 w-full"
                type="text"
                onChange={(e) => {
                  console.log(e.target.value);
                  handleUpdateCheckedValues([e.target.value]);
                }}
              />
            </div>
          </div>
          <div className="mt-4">
            <div>
              <FilterDropDown
                filtersCategory={filterCategroies}
                setParentCheckedValues={setParentCheckedValues}
                checkedValues={parentCheckedValues}
                onUpdateCheckedValues={handleUpdateCheckedValues}
              />
            </div>
          </div>
          <hr className="mt-2" />
          <div className="mt-2">
            {loading && (
              <div className="w-full flex flex-row items-center justify-center">
                <div className="flex items-center mt-12">
                  <Loader className="animate-spin h-4 w-4 inline mr-2" />{" "}
                  <span>loading...</span>
                </div>
              </div>
            )}
            {!loading &&
              coachesData.length > 0 &&
              coachesData.map((coach, i) => (
                <>
                  <div
                    className={`w-full my-3 flex flex-row p-4 max-sm:p-2 ${
                      coach.status === "booked" ? "bg-blue-50" : "bg-gray-200"
                    } border border-gray-300 rounded-md`}
                  >
                    <div className="w-[30%] max-sm:px-2 max-sm:w-[30%] flex items-center justify-center max-sm:items-start">
                      <img
                        className="w-[250px] h-[250px] max-sm:h-[130px] object-cover"
                        src={coach.profile_pic_url}
                      />
                    </div>
                    <div className="flex flex-row w-[70%] max-sm:w-[70%]  max-sm:flex-col">
                      <div className="w-[70%] max-sm:w-full max-sm:pl-4 max-md:pl-4 flex flex-col justify-start items-start ">
                        <p className="text-xl font-semibold text-gray-700 mt-2 max-sm:mt-0 text-left max-sm:text-lg">
                          {coach.name}
                        </p>
                        <p className="my-1.5 max-sm:text-sm max-sm:my-1 font-medium text-gray-600">
                          {coach.department}
                        </p>
                        <Badge className="rounded-sm px-2 my-1.5 text-base  max-sm:text-sm max-sm:px-1.5 max-sm:my-1">
                          {coach.profile_type}
                        </Badge>
                        <p className="text-left text-sm font-light my-1.5 max-sm:text-xs max-sm:my-1">
                          {coach.description}
                        </p>
                        <Separator className="my-2 max-sm:my-1.5 bg-gray-400" />
                        {coach.profile_type !== "skill_bot" && (
                          <div className="my-1 text-gray-600 max-sm:text-xs">
                            <p className="text-sm max-sm:text-xs font-light inline">
                              Experience :
                            </p>{" "}
                            <b className="inline">{coach.experience}</b>
                          </div>
                        )}
                        <p className="my-1 text-left text-gray-600 max-sm:text-xs">
                          <p className="text-sm  max-sm:text-xs font-light inline">
                            {" "}
                            Expertise :
                          </p>{" "}
                          <b className="inline">{coach.expertise}</b>
                        </p>
                      </div>
                      <div className="w-[30%] max-sm:w-full flex flex-col items-center justify-start gap-3">
                        {coach.avatar_bot_url !== null &&
                          coach.avatar_bot_url !== "" && (
                            <div className="w-full mt-[20%] max-sm:mt-4">
                              <Link href={coach.avatar_bot_url}>
                                <Button
                                  variant={"outline"}
                                  className="w-[80%] max-sm:w-[90%] max-sm:text-sm border border-gray-300"
                                >
                                  Avatar Bot
                                </Button>
                              </Link>
                            </div>
                          )}
                        {coach.feedback_wall !== null &&
                          coach.feedback_wall !== "" && (
                            <div className="w-full">
                              <Link href={coach.feedback_wall}>
                                <Button
                                  variant={"outline"}
                                  className="w-[80%] max-sm:w-[90%] max-sm:text-sm border border-gray-300"
                                >
                                  Feedback Wall
                                </Button>
                              </Link>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                  {coachesData.length !== i + 1 && (
                    <Separator className="my-2 max-sm:my-1.5 bg-gray-300" />
                  )}
                </>
              ))}
            {!loading && coachesData.length === 0 && (
              <div className="w-full flex flex-row items-center justify-center">
                <div className="flex items-center mt-12">
                  <span>No Data</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Coaches;
