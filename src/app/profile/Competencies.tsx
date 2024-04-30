"use client";

import { Loader, PenBox, X } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { baseURL, basicAuth, getUserAccount } from "@/lib/utils";
import { toast } from "sonner";

const Competencies = ({ user }: any) => {
  const [skillsArray, setSkillsArray] = useState<
    { value: string; disabled?: boolean }[]
  >([
    { value: "Communication Skills" },
    { value: "Achievement Focus" },
    { value: "Analytical Thinking" },
    { value: "Leading and Supervising" },
    { value: "Teamwork" },
    { value: "Planning and Organizing" },
    { value: "Client Focus" },
    { value: "Developing Talent" },
    { value: "Decision Making" },
    { value: "Change Management" },
    { value: "Strategic Networking" },
    { value: "Influencing" },
    { value: "Resilience" },
  ]);

  const [userId, setUserId] = useState("");
  const [skillOne, setSkillOne] = useState("");
  const [skillTwo, setSkillTwo] = useState("");
  const [skillThree, setSkillThree] = useState("");
  const [skillFour, setSkillFour] = useState("");

  const resetSkills = () => {
    setSkillOne("");
    setSkillTwo("");
    setSkillThree("");
    setSkillFour("");
  };

  const [existingSkills, setExistingSkills] = useState<string[]>([]);
  const [hanlderHeading, setHandlerHeading] = useState("Add new");
  const [rendeInputComponent, setRenderInputComponent] = useState(false);
  const [emptyError, setEmptyError] = useState("");

  const [fetchLoading, setFetchLoading] = useState(true);

  const [saveLoading, setSaveLoading] = useState(false);
  const getCompetency = () => {
    setFetchLoading(true);
    getUserAccount(user)
      .then((response) => response.json())
      .then((data) => {
        setUserId(data.uid);
        console.log(data);

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
            console.log(data);
            const parsedSkills: string[] = Object.values(data[0]);
            console.log(parsedSkills);
            setSkillsArray((prevSkills) =>
              prevSkills.map((skill) => ({
                ...skill,
                disabled: parsedSkills.includes(skill.value),
              }))
            );
            setExistingSkills(parsedSkills);
            setFetchLoading(false);
            setSkillOne(parsedSkills[0].replace(/"/g, ""));
            setSkillTwo(parsedSkills[1].replace(/"/g, ""));
            setSkillThree(parsedSkills[2].replace(/"/g, ""));
            setSkillFour(parsedSkills[3].replace(/"/g, ""));
          })
          .catch((err) => {
            console.error(err);
            setFetchLoading(false);
          });
      });
  };

  useEffect(() => {
    if (user) {
      getCompetency();
    }
  }, []);

  const submitCompetenciesHandler = () => {
    if (
      skillOne !== "" ||
      skillTwo !== "" ||
      skillThree !== "" ||
      skillFour !== ""
    ) {
      setSaveLoading(true);
      console.log(userId);
      console.log(`${skillOne},${skillTwo},${skillThree},${skillFour},`);

      fetch(
        `${baseURL}/accounts/user-competency-details/?user_id=${userId}&competency_skills="${skillOne},${skillTwo},${skillThree},${skillFour}"`,
        {
          method: "POST",
          headers: {
            Authorization: basicAuth,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          toast.success("Succesfully saved your competencies");
          resetSkills();
          setSaveLoading(false);
          setRenderInputComponent(false);
          getCompetency();
        })
        .catch((error) => {
          console.error(error);
          toast.error("Problem saving your Competencies");
          setSaveLoading(false);
        });
    } else {
      setEmptyError("Please select atleast one skill for each");
    }
  };

  const newCompetenciesHandler = (type: string) => {
    setHandlerHeading(type);
    setRenderInputComponent(true);
  };

  useEffect(() => {
    const skillsToDisable = [skillOne, skillTwo, skillThree, skillFour];
    setSkillsArray((prevSkills) =>
      prevSkills.map((skill) => ({
        ...skill,
        disabled: skillsToDisable.includes(skill.value),
      }))
    );
  }, [skillOne, skillTwo, skillThree, skillFour]);

  return (
    <div className="bg-accent p-2 mt-2 rounded-md">
      <div className="pl-4 max-sm:pl-2 pt-2">Competencies</div>
      <div className="m-4 text-sm max-sm:m-2">
        {fetchLoading ? (
          <div className="text-xs w-full h-20 flex items-center justify-center">
            <div>
              <Loader className="h-4 w-4 mr-2 animate-spin inline" /> Loading
            </div>
          </div>
        ) : (
          <>
            {existingSkills.length > 0 ? (
              <>
                <div className="bg-gray-200 text-sm w-full m-2 ml-0 p-2 rounded-md">
                  <p className="ml-2"> Current competency framework</p>
                  <div className="my-2 ml-2 flex flex-row flex-wrap max-sm:flex-col gap-2">
                    {existingSkills.map((skill, i) => (
                      <Badge
                        variant={"secondary"}
                        className=" p-2 w-fit rounded-sm max-sm:w-full"
                      >
                        <span>
                          {" "}
                          Skill Group {i + 1} : {skill.replace(/"/g, "")}{" "}
                        </span>{" "}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="my-4 w-full">
                <div>
                  No Competencies,{" "}
                  <Button
                    onClick={() => {
                      newCompetenciesHandler("Add new competencies");
                    }}
                    variant={"link"}
                  >
                    Add now?
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
        {existingSkills.length > 0 && !rendeInputComponent && (
          <div className="my-4 w-full">
            <div>
              <Button
                className="pl-0"
                onClick={() => {
                  newCompetenciesHandler("Customise your competencies");
                }}
                variant={"link"}
              >
                Customise your existing skills ?
              </Button>
            </div>
          </div>
        )}

        {rendeInputComponent && (
          <div className="bg-gray-200 text-sm w-full m-2 ml-0 p-2 rounded-md flex flex-col">
            <p className="ml-2 my-2"> {hanlderHeading}</p>
            <div className="my-2 ml-2 flex flex-row flex-wrap max-sm:flex-col gap-2">
              <Badge
                variant={"secondary"}
                className=" p-2 w-fit rounded-sm max-sm:w-full"
              >
                <div className="w-fit flex flex-row items-center">
                  <p className="w-32 block ">Skill Group 1 : </p>
                  <Select
                    onValueChange={(value) => {
                      console.log(value);
                      setSkillOne(value);
                    }}
                    value={skillOne}
                  >
                    <SelectTrigger className="bg-green-200 p-1 text-xs h-6 rounded-sm ml-1 ring-transparent outline-none border border-gray-300">
                      <span className="text-gray-600">{skillOne}</span>
                    </SelectTrigger>
                    <SelectContent side="right">
                      <SelectGroup>
                        {skillsArray.map((skill) => (
                          <>
                            <SelectItem
                              disabled={skill.disabled}
                              value={skill.value}
                            >
                              {skill.value}
                            </SelectItem>
                          </>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </Badge>
              <Badge
                variant={"secondary"}
                className=" p-2 w-fit rounded-sm max-sm:w-full"
              >
                <div className="w-fit flex flex-row items-center">
                  <p className="w-36 block ">Skill Group 2 : </p>
                  <Select
                    onValueChange={(value) => {
                      setSkillTwo(value);
                    }}
                    value={skillTwo}
                  >
                    <SelectTrigger className="bg-green-200 p-1 text-xs h-6 rounded-sm ml-1 ring-transparent outline-none border border-gray-300">
                      <span className="text-gray-600">{skillTwo}</span>
                    </SelectTrigger>
                    <SelectContent side="right">
                      <SelectGroup>
                        {skillsArray.map((skill) => (
                          <>
                            <SelectItem
                              disabled={skill.disabled}
                              value={skill.value}
                            >
                              {skill.value}
                            </SelectItem>
                          </>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </Badge>
              <Badge
                variant={"secondary"}
                className=" p-2 w-fit rounded-sm max-sm:w-full"
              >
                <div className="w-fit flex flex-row items-center">
                  <p className="w-36 block ">Skill Group 3 : </p>
                  <Select
                    onValueChange={(value) => {
                      setSkillThree(value);
                    }}
                  >
                    <SelectTrigger className="bg-green-200 p-1 text-xs h-6 rounded-sm ml-1 ring-transparent outline-none border border-gray-300">
                      <span className="text-gray-600">{skillThree}</span>
                    </SelectTrigger>
                    <SelectContent side="right">
                      <SelectGroup>
                        {skillsArray.map((skill) => (
                          <>
                            <SelectItem
                              disabled={skill.disabled}
                              value={skill.value}
                            >
                              {skill.value}
                            </SelectItem>
                          </>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </Badge>
              <Badge
                variant={"secondary"}
                className=" p-2 w-fit rounded-sm max-sm:w-full"
              >
                <div className="w-fit flex flex-row items-center">
                  <p className="w-36 block">Skill Group 4 : </p>
                  <Select
                    onValueChange={(value) => {
                      setSkillFour(value);
                    }}
                    value={existingSkills[3]}
                  >
                    <SelectTrigger className="bg-green-200 p-1 max-sm:w-full text-xs h-6 rounded-sm ml-1 ring-transparent outline-none border border-gray-300">
                      <span className="text-gray-600">{skillFour}</span>
                    </SelectTrigger>
                    <SelectContent side="right">
                      <SelectGroup>
                        {skillsArray.map((skill) => (
                          <>
                            <SelectItem
                              disabled={skill.disabled}
                              value={skill.value}
                            >
                              {skill.value}
                            </SelectItem>
                          </>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </Badge>
            </div>
            {emptyError && (
              <Badge className="w-fit ml-2" variant={"destructive"}>
                {emptyError}
              </Badge>
            )}
            <div className="self-end">
              <Button
                variant={"destructive"}
                className="max-sm:p-2 h-8 mt-2 hover:brightness-105 text-sm w-fit mr-2"
                onClick={() => {
                  setRenderInputComponent(false);
                }}
              >
                Cancel <X className="ml-2 h-4 w-4" />
              </Button>
              <Button
                className="max-sm:p-2 h-8 mt-2 hover:brightness-105 text-sm bg-green-600 w-fit "
                onClick={() => {
                  submitCompetenciesHandler();
                }}
              >
                {saveLoading ? (
                  <>
                    Saving <Loader className="ml-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Save changes <PenBox className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Competencies;
