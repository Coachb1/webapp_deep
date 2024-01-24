"use client";

import FilterDropDown from "@/components/FilterDropDown";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { baseURL, basicAuth, hideBots } from "@/lib/utils";
import { Loader, Menu, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NavProfile from "@/components/NavProfile";
import NetworkNav from "@/components/NetworkNav";

interface CoachesDataType {
  profile_type: string;
  name: string;
  status: string;
  speciality: string | null;
  experience: string | null;
  favourite_simulation_codes: string[] | null;
  about: string;
  department: string;
  bot_ids: string[] | null;
  bot_urls: string[] | null;
  profile_image_url: string;
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
    await fetch(`${baseURL}/accounts/coach-coachee-mentor-mentee-profile/`, {
      method: "GET",
      headers: {
        Authorization: basicAuth,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCoachesData(data.data);
        setSavedCoachesData(data.data);
        const namesArray: string[] = [];
        const specialitiesArray: string[] = [];
        const departmentsArray: string[] = [];

        data.data.forEach((obj: CoachesDataType) => {
          if (obj.name && !namesArray.includes(obj.name)) {
            namesArray.push(obj.name);
          }

          if (obj.speciality && !specialitiesArray.includes(obj.speciality)) {
            specialitiesArray.push(obj.speciality);
          }

          if (obj.department && !departmentsArray.includes(obj.department)) {
            departmentsArray.push(obj.department);
          }
        });

        console.log(namesArray, departmentsArray, specialitiesArray);
        setFilterCategories([
          {
            filterName: "Profile Type",
            filterOptions: ["coach", "coachee", "mentor", "mentee"],
          },
          {
            filterName: "Name",
            filterOptions: namesArray,
          },
          {
            filterName: "Speciality",
            filterOptions: specialitiesArray,
          },
          {
            filterName: "Status",
            filterOptions: ["Available", "Booked"],
          },
          {
            filterName: "Department",
            filterOptions: departmentsArray,
          },
        ]);
        setLoading(false);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getCoachesData();
    hideBots();
  }, []);

  const handleUpdateCheckedValues = (newValues: string[]) => {
    setParentCheckedValues(newValues);
    if (newValues.length > 0 && newValues[0].length === 0) {
      setParentCheckedValues([]);
    }

    if (newValues.length > 0 && newValues[0].length > 0) {
      const filteredArray = coachesData.filter((obj) => {
        return newValues.every((term) =>
          Object.values(obj).some(
            (value) =>
              value &&
              value.toString().toLowerCase().includes(term.toLowerCase())
          )
        );
      });
      setCoachesData(filteredArray);
    } else {
      setCoachesData(savedCoachesData);
    }
  };

  return (
    <div className="bg-gray-100 min-h-[120vh] h-full grainy max-sm:h-full max-sm:min-h-screen pb-16">
      <div className="fixed w-full flex items-center justify-end p-4 h-6 py-8 !z-[800]">
        <div className="flex flex-row gap-1">
          <NetworkNav user={user} />
        </div>
      </div>
      <MaxWidthWrapper className="flex pt-40 flex-col items-center justify-center text-center">
        <h1 className="text-[#2DC092] border-2 border-[#2DC092] p-[3px] text-xl font-extrabold mt-10 mb-6">
          <span className="bg-[#2DC092] text-white text-lg font-bold mr-[4px] p-[4px]">
            COACH
          </span>
          BOTS
        </h1>
        <h1 className="text-5xl mt-0 font-bold md:text-6xl lg:text-4xl  max-sm:text-2xl text-gray-600 ">
          Coaching & Mentoring community
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg max-sm:px-8">
          {" "}
          2000+ Strong group of experts & future leaders
        </p>

        <div className="mt-2 mb-[45vh]">
          <Button
            className="h-7 w-fit"
            onClick={() => {
              document.getElementById("list")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            See List
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none border-none">
              <Button className="h-7 w-fit ml-2">Join the network</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  router.push(`/coaches/intake/?type=coach`);
                }}
              >
                Join as a Coach
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  router.push(`/coaches/intake/?type=coachee`);
                }}
              >
                Join as a Coachee
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div id="list" className="min-h-screen w-full max-sm:px-2">
          <div className="mt-20">
            <p className="font-semibold text-gray-500 max-sm:text-sm">
              We enable deep and meaningful coaching conversations with AI
              assistance even when life gets busy!
            </p>
          </div>
          <div className="mt-24">
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
                    <div className="w-[30%] max-sm:w-[30%] flex items-center justify-center max-sm:items-start">
                      <img
                        className="w-[250px] h-[250px] max-sm:h-[130px] max-lg:mr-4 object-cover"
                        src={coach.profile_image_url}
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
                          {coach.about}
                        </p>
                        <Separator className="my-2 max-sm:my-1.5 bg-gray-400" />
                        <div className="my-1.5 text-gray-600 max-sm:text-xs">
                          <p className="text-sm max-sm:text-xs font-light inline">
                            Experience :
                          </p>{" "}
                          <b className="inline">{coach.experience}</b>
                        </div>
                        <p className="my-1.5  text-gray-600 max-sm:text-xs">
                          <p className="text-sm  max-sm:text-xs font-light inline">
                            {" "}
                            Favorite Simulation Code :
                          </p>{" "}
                          <b className="inline">
                            {coach.favourite_simulation_codes}
                          </b>
                        </p>
                      </div>
                      <div className="w-[30%] max-sm:w-full flex flex-col items-center justify-start gap-3">
                        <div className="w-full mt-[20%] max-sm:mt-4">
                          <Link href={"https://playground.coachbots.com/"}>
                            <Button
                              variant={"outline"}
                              className="w-[80%] max-sm:w-[90%] max-sm:text-sm border border-gray-300"
                            >
                              Avatar Bot
                            </Button>
                          </Link>
                        </div>
                        <div className="w-full">
                          <Link
                            href={"https://playground.coachbots.com/feedback"}
                          >
                            <Button
                              variant={"outline"}
                              className="w-[80%] max-sm:w-[90%] max-sm:text-sm border border-gray-300"
                            >
                              Feedback Wall
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  {coachesData.length !== i + 1 && (
                    <Separator className="my-2 max-sm:my-1.5 bg-gray-300" />
                  )}
                </>
              ))}
            {coachesData.length === 0 && (
              <div className="w-full flex flex-row items-center justify-center">
                <div className="flex items-center mt-12">
                  <span>No Data</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-10">
          <div>
            <p className="text-lg font-bold text-gray-800">Contact us</p>
            <p className="my-1">
              <span>📩</span>{" "}
              <a
                className="ml-2 text-sm text-gray-600 underline underline-offset-4"
                href="mailto:info@coachbots.com"
              >
                info@coachbots.com
              </a>{" "}
            </p>
            <p className="my-1">
              <span>📞</span>{" "}
              <a
                className="ml-2 text-sm text-gray-600 "
                href="mailto:info@coachbots.com"
              >
                +91 212 000101002
              </a>{" "}
            </p>
            <p className="my-1">
              <span>🌎</span>{" "}
              <p className="inline ml-2 text-sm text-gray-600 ">Banglore</p>
            </p>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Coaches;
