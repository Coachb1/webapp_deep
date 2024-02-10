"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  baseURL,
  basicAuth,
  capitalizeText,
  getUserAccount,
  hideBots,
  subdomain,
} from "@/lib/utils";
import { Info, Loader, PenLine, SendHorizonal } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import CharactericticsSelect from "./CharacteristicsSelect";
import { Switch } from "@/components/ui/switch";
import { useSearchParams, useRouter } from "next/navigation";
import IDPIntake from "./IDPIntake";

const CoachIntake = ({ user }: any) => {
  const params = useSearchParams();
  const formType = params.get("type");
  const checkIfEdit = params.get("edit");
  const botIdFromParams = params.get("bot_id");
  const botIUidFromParams = params.get("uid");
  const editBotType = params.get("bot_type");
  const profileType = params.get("profile_type");
  const userProfileId = params.get("profile_id");

  const router = useRouter();

  if (checkIfEdit) {
    const [editLoading, setEditLoading] = useState(true);
  }

  const [canCreateProfile, setCanCreateProfile] = useState(true);

  function getBotById(botId: string, jsonData: any) {
    for (const item of jsonData) {
      if (item.signature_bot && item.signature_bot.bot_id === botId) {
        return item;
      }
    }
    return null;
  }

  const [createLoading, setCreateLoading] = useState(false);
  const [isFeedbackNeeded, setIsFeedbackNeeded] = useState(false);
  const [feedbackCreateLoading, setFeedbackCreateLoading] = useState(false);
  const departments = [
    "Sales & Marketing",
    "Production",
    "Design",
    "Engineering",
    "HR & Training",
  ];
  const areaDomains = [
    "Career Management",
    "Work Life Banlance",
    "Project Management",
    "Lateral Transfers",
  ];
  //intake fields state
  const [name, setName] = useState("");
  const [profileId, setProfileId] = useState("");
  const [userId, setUserId] = useState("");
  const [profileImage, setProfileImage] = useState<File>();
  const [department, setDepartment] = useState("");
  const [about, setAbout] = useState("");
  const [areaDomain, setAreaDomain] = useState("");
  const [experience, setExperience] = useState("");
  const [mentoringPreferences, setMentoringPreferences] = useState("");
  const [coachMentFrameworks, setCoachMentFrameworks] = useState("");
  const [povProgramParticipants, setPovProgramParticipants] = useState("");
  const [problemSolvingApproach, setProblemSolvingApproach] = useState("");
  const [linksReflectingWVpersonal, setLinksReflectingWVpersonal] =
    useState("");
  const [leaderNames, setLeaderNames] = useState("");
  const [linksReflectyouWished, setLinksReflectyouWished] = useState("");

  interface FileData {
    file: File;
    id: number;
  }
  const [referenceDocs, setReferenceDocs] = useState<FileData[]>([]);
  const [voiceSample, setVoiceSample] = useState("");
  const [coachmentSelect, setCoachMentSelect] = useState("");
  const [participantLevel, setParticipantLevel] = useState("");
  const [coachMentInSameDep, setCochMentInSameDep] = useState("");
  const [outcomeSupported, setOutcomeSupported] = useState("");

  const [characteristicsRateLows, setCharacteristicsRateLows] = useState("");
  const [characteristicsRateHigh, setCharacteristicsRateHigh] = useState("");

  const [characteristicsList, setCharacteristicsList] = useState<
    {
      label: string;
      value: string;
      disabled?: boolean;
    }[]
  >([]);

  //feedbackInputStates
  const [profileBio, setProfileBio] = useState("");
  const [currentProjects, setCurrentProjects] = useState("");
  const [suggestedProjects, setSuggestedProjects] = useState("");

  const resetAllStates = () => {
    setName("");
    setProfileId("");
    setProfileImage(undefined);
    setDepartment("");
    setAbout("");
    setAreaDomain("");
    setExperience("");
    setMentoringPreferences("");
    setCoachMentFrameworks("");
    setPovProgramParticipants("");
    setProblemSolvingApproach("");
    setLinksReflectingWVpersonal("");
    setLeaderNames("");
    setLinksReflectyouWished("");
    setReferenceDocs([]);
    setVoiceSample("");
    setCoachMentSelect("");
    setParticipantLevel("");
    setCochMentInSameDep("");
    setOutcomeSupported("");
    setCharacteristicsRateLows("");
    setCharacteristicsRateHigh("");
    setCharacteristicsList([]);
    setProfileBio("");
    setSuggestedProjects("");
    setCurrentProjects("");
  };

  function getProfileTypes(data: any) {
    const profileTypes = data.map((profile: any) => profile.profile_type);
    return profileTypes;
  }

  useEffect(() => {
    hideBots();
    if (user) {
      fetch(`${baseURL}/accounts/`, {
        method: "POST",
        headers: {
          Authorization: basicAuth,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_context: {
            name: user.id,
            role: "member",
            user_attributes: {
              tag: "deepchat_profile",
              attributes: {
                username: user.given_name,
                email: user.email,
              },
            },
          },
          identity_context: {
            identity_type: "deepchat_unique_id",
            value: user.email,
          },
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          setUserId(data.uid);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    if (formType === "coachee") {
      fetch(`${baseURL}/skills/get-characteristics-list/`, {
        method: "GET",
        headers: {
          Authorization: basicAuth,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const createLabelValuePairs = Array.from(
            new Set(data.characteristic_list.map((val: string) => val))
          ).map((val) => ({
            label: val,
            value: val,
          }));
          //@ts-ignore
          setCharacteristicsList(createLabelValuePairs);
        });
    }

    if (user) {
      getUserAccount(user)
        .then((res) => res.json())
        .then((data) => {
          fetch(
            `${baseURL}/accounts/coach-coachee-mentor-mentee-profile/?user_id=${data.uid}`,
            {
              headers: {
                Authorization: basicAuth,
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              console.log("Can create coach?", data);
              const profileTypes = getProfileTypes(data.data);
              if (data.data.length > 0 && !checkIfEdit) {
                if (
                  formType === "coach" &&
                  (profileTypes.includes("coach") ||
                    profileTypes.includes("mentor"))
                ) {
                  setCanCreateProfile(false);
                  toast.loading(
                    "Your profile as a Coach/Mentor already exists. You cannot create another one. Redirecting you to the home page"
                  );
                  setTimeout(() => {
                    router.push("/");
                  }, 4000);
                } else if (formType === "coachee" && !checkIfEdit) {
                  if (
                    formType === "coachee" &&
                    (profileTypes.includes("coachee") ||
                      profileTypes.includes("mentee"))
                  ) {
                    setCanCreateProfile(false);
                    toast.loading(
                      "Your profile as a Coachee/Mentee already exists. You cannot create another one. Redirecting you to the home page"
                    );
                    setTimeout(() => {
                      router.push("/");
                    }, 4000);
                  }
                }
              }
            })
            .catch((err) => {
              console.error(err);
            });
        });
    }
  }, []);

  const createSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (user) {
        setCreateLoading(true);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", basicAuth);
        var formdata = new FormData();
        formdata.append("name", name);
        formdata.append("user_id", userId);
        formdata.append("email", user.email);
        formdata.append("about", about);
        formdata.append("experience", experience);

        if (!checkIfEdit) {
          //@ts-ignore
          formdata.append("profile_image", profileImage, "coachprofile.jpg");
        }

        formdata.append("department", department);

        formdata.append("supported_outcome", outcomeSupported);
        formdata.append("bot_type", "avatar_bot");

        if (formType == "coach") {
          formdata.append("profile_type", "coach");
          formdata.append("area_domain", areaDomain);
          formdata.append("mentoring_preferences", mentoringPreferences);
          formdata.append("mentoring_frameworks", coachMentFrameworks);
          formdata.append("dominant_point_of_view", povProgramParticipants);
          formdata.append("problem_solving_approach", problemSolvingApproach);
          formdata.append(
            "provided_links",
            JSON.stringify({
              youtube_links: linksReflectingWVpersonal,
              article_links: linksReflectyouWished,
            })
          );
          formdata.append("admired_leaders", leaderNames);
          // if (!checkIfEdit) {
          //   formdata.append(
          //     "reference_docs",
          //     //@ts-ignore
          //     referenceDocs,
          //     user.given_name + "reference" + referenceDocs?.type
          //   );
          // }
          formdata.append(
            "voice_sample",
            `${voiceSample === "yes" ? true : false}`
          );
          formdata.append("coaching_for_fitment", coachmentSelect);
          formdata.append("coaching_level", participantLevel);
          formdata.append(
            "coach_same_department",
            `${coachMentInSameDep === "yes" ? true : false}`
          );
        } else if (formType === "coachee") {
          formdata.append("profile_type", "coachee");
          formdata.append(
            "low_rating_characteristics",
            characteristicsRateLows
          );
          formdata.append(
            "high_rating_characteristics",
            characteristicsRateHigh
          );
        }

        if (!checkIfEdit) {
          var myHeaders = new Headers();
          myHeaders.append("Authorization", basicAuth);

          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
          };
          fetch(
            `${baseURL}/accounts/coach-coachee-mentor-mentee-profile/`,
            requestOptions
          )
            .then((response) => response.json())
            .then((result) => {
              console.log(result);
              setProfileId(result.data.uid);

              if (formType === "coach") {
                myHeaders.append("Content-Type", "application/json");
                const avatarBotCreationFormData = {
                  bot_type: "avatar_bot",
                  profile_id: result.data.uid,
                  bot_name: name,
                  email: user.email,
                  bot_details: { info: about, coach_name: name },
                  attributes: {
                    heading: `welcome to ${name}'s avatar bot`,
                  },
                  participant_id: userId,
                  bot_base_url: `${
                    subdomain === "playground"
                      ? "https://playground.coachbots.com/coach/"
                      : "https://platform.coachbots.com/coach/"
                  }`,
                  fitment_answer: `${participantLevel},${
                    coachMentInSameDep === "yes" ? true : false
                  },${outcomeSupported}`,
                  fitment_data: {
                    options: {
                      "1": [
                        "Anyone above me",
                        "Same or up to two level below",
                        "Any level",
                      ],
                      "2": ["Yes", "No"],
                      "3": [
                        "Career advancement",
                        "Skill development",
                        "Introspection & reflection",
                        "Networking & leadership",
                      ],
                    },
                    mentee_que: {
                      "1": "What level of coach & mentor do you want?",
                      "2": "I want a coach & mentor someone from the same department.",
                      "3": "What kind of outcome do you want from these sessions the most?",
                    },
                    mentor_que: {
                      "1": "What level of participant do you want to coach & mentor?",
                      "2": "I want to coach & mentor someone in the same department.",
                      "3": "What kind of outcome can you support in these sessions the most?",
                    },
                  },
                  additional_data: {
                    profile_type: "coach",
                    area_domain: areaDomain,
                    experience: experience,
                    mentoring_preferences: mentoringPreferences,
                    mentoring_frameworks: coachMentFrameworks,
                    dominant_point_of_view: povProgramParticipants,
                    problem_solving_approach: problemSolvingApproach,
                    admired_leaders: leaderNames,
                    profile_description: about,
                    department: department,
                    youtube_links: linksReflectingWVpersonal,
                    article_links: linksReflectyouWished,
                    voice_sample: voiceSample,
                    fitment_answers: {
                      coachmentSelect,
                      participantLevel,
                      coachMentInSameDep,
                      outcomeSupported,
                    },
                  },
                  media_data: {
                    youtube_links: linksReflectingWVpersonal,
                    article_links: linksReflectyouWished,
                  },
                };

                fetch(`${baseURL}/accounts/create-bot-by-details/`, {
                  method: checkIfEdit ? "PATCH" : "POST",
                  headers: myHeaders,
                  body: checkIfEdit
                    ? JSON.stringify({
                        bot_id: botIUidFromParams,
                        updated_data: avatarBotCreationFormData,
                      })
                    : JSON.stringify(avatarBotCreationFormData),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    console.log(data);
                    if (!data.error && !data.detail && !data.msg) {
                      //PATCH MEDIA DATA HERE

                      const filesPatchFormData = new FormData();
                      referenceDocs.forEach(({ file }) => {
                        filesPatchFormData.append(
                          `attatched_pdfs`,
                          file,
                          file.name.trim()
                        );
                      });

                      filesPatchFormData.append("bot_id", data.bot_uid);

                      const media_data = {
                        youtube_links: linksReflectingWVpersonal,
                        article_links: linksReflectyouWished,
                      };
                      filesPatchFormData.append(
                        "media_data",
                        JSON.stringify(media_data)
                      );

                      console.log(referenceDocs);
                      fetch(`${baseURL}/accounts/create-bot-by-details/`, {
                        method: "PATCH",
                        headers: {
                          Authorization: basicAuth,
                        },
                        body: filesPatchFormData,
                      })
                        .then((res) => res.json())
                        .then((data) => {
                          console.log(data);
                          setCreateLoading(false);
                          if (!data.error && !data.detail) {
                            toast.success(
                              "Thanks for your request. You will get notified when your profile is approved and live.",
                              {
                                duration: 6000,
                              }
                            );
                            resetAllStates();
                            setTimeout(() => {
                              router.push("/");
                            }, 4000);
                          } else {
                            toast.error(
                              "Error creating your coach profile. Please try again.",
                              {
                                duration: 6000,
                              }
                            );
                          }
                        })
                        .catch((err) => {
                          toast.error(
                            "Error creating your coach profile. Please try again.",
                            {
                              duration: 6000,
                            }
                          );
                          console.error(err);
                          setCreateLoading(false);
                        });
                    } else {
                      setCreateLoading(false);
                      if (data.error === "Bot already exists") {
                        toast.error("Bot already exists");
                      } else {
                        toast.error(
                          "Error creating your coach profile. Please try again.",
                          {
                            duration: 6000,
                          }
                        );
                      }
                    }
                  })
                  .catch((err) => {
                    console.error(err);
                    setCreateLoading(false);
                    toast.error(
                      "Error creating your coach profile. Please try again.",
                      {
                        duration: 6000,
                      }
                    );
                  });
              } else {
                resetAllStates();
                setCreateLoading(false);
                toast.success(
                  "Thanks for your request. You will get notified when your profile is approved and live.",
                  {
                    duration: 6000,
                  }
                );
                setTimeout(() => {
                  router.push("/");
                }, 4000);
              }
            })
            .catch((error) => {
              console.log("error", error);
              toast.error(
                "Error creating your coach profile. Please try again."
              );
            });
        } else {
          console.log("edit", myHeaders);
          // Create a plain JavaScript object
          const formDataObject: { [key: string]: any } = {};
          formdata.forEach((value, key) => {
            formDataObject[key] = value;
          });

          // Convert the object to JSON
          var formDataJSON = JSON.stringify(formDataObject);
          console.log(formDataObject);

          fetch(
            `${baseURL}/accounts/coach-coachee-mentor-mentee-profile/?profile_id=${userProfileId}`,
            {
              method: "PATCH",
              headers: myHeaders,
              body: formType === "coach" ? formDataJSON : formdata,
            }
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data, "updated");
              // setCreateLoading(false);
              // if (!data.error && !data.detail) {
              //   toast.loading(
              //     "Your profile and Bot have been updated. Redirecting you to your profile.",
              //     {
              //       duration: 6000,
              //     }
              //   );
              // resetAllStates();
              // setTimeout(() => {
              //   router.push("/profile");
              // }, 6000);
              // }
            });
          if (formType === "coach") {
            myHeaders.append("Content-Type", "application/json");
            const avatarBotCreationFormData = {
              bot_type: "avatar_bot",
              profile_id: profileId,
              bot_name: name,
              email: user.email,
              bot_details: { info: about, coach_name: name },
              attributes: {
                heading: `welcome to ${name}'s avatar bot`,
              },
              participant_id: userId,
              bot_base_url: `${
                subdomain === "playground"
                  ? "https://playground.coachbots.com"
                  : "https://platform.coachbots.com"
              }`,
              fitment_answer: `${participantLevel},${
                coachMentInSameDep === "yes" ? true : false
              },${outcomeSupported}`,
              fitment_data: {
                options: {
                  "1": [
                    "Anyone above me",
                    "Same or up to two level below",
                    "Any level",
                  ],
                  "2": ["Yes", "No"],
                  "3": [
                    "Career advancement",
                    "Skill development",
                    "Introspection & reflection",
                    "Networking & leadership",
                  ],
                },
                mentee_que: {
                  "1": "What level of coach & mentor do you want?",
                  "2": "I want a coach & mentor someone from the same department.",
                  "3": "What kind of outcome do you want from these sessions the most?",
                },
                mentor_que: {
                  "1": "What level of participant do you want to coach & mentor?",
                  "2": "I want to coach & mentor someone in the same department.",
                  "3": "What kind of outcome can you support in these sessions the most?",
                },
              },
              additional_data: {
                profile_type: "coach",
                area_domain: areaDomain,
                experience: experience,
                mentoring_preferences: mentoringPreferences,
                mentoring_frameworks: coachMentFrameworks,
                dominant_point_of_view: povProgramParticipants,
                problem_solving_approach: problemSolvingApproach,
                admired_leaders: leaderNames,
                profile_description: about,
                department: department,
                youtube_links: linksReflectingWVpersonal,
                article_links: linksReflectyouWished,
                voice_sample: voiceSample,
                fitment_answers: {
                  coachmentSelect,
                  participantLevel,
                  coachMentInSameDep,
                  outcomeSupported,
                },
              },
              media_data: {
                youtube_links: linksReflectingWVpersonal,
                article_links: linksReflectyouWished,
              },
            };

            fetch(`${baseURL}/accounts/create-bot-by-details/`, {
              method: checkIfEdit ? "PATCH" : "POST",
              headers: myHeaders,
              body: checkIfEdit
                ? JSON.stringify({
                    bot_id: botIUidFromParams,
                    updated_data: avatarBotCreationFormData,
                  })
                : JSON.stringify(avatarBotCreationFormData),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                // setCreateLoading(false);
                if (!data.error && !data.detail) {
                  if (referenceDocs.length > 0) {
                    const filesPatchFormData = new FormData();
                    if (referenceDocs.length > 0) {
                      referenceDocs.forEach(({ file }) => {
                        filesPatchFormData.append(
                          `attatched_pdfs`,
                          file,
                          file.name.trim()
                        );
                      });
                    }

                    filesPatchFormData.append("bot_id", botIUidFromParams!);

                    const media_data = {
                      youtube_links: linksReflectingWVpersonal,
                      article_links: linksReflectyouWished,
                    };
                    filesPatchFormData.append(
                      "media_data",
                      JSON.stringify(media_data)
                    );

                    fetch(`${baseURL}/accounts/create-bot-by-details/`, {
                      method: "PATCH",
                      headers: {
                        Authorization: basicAuth,
                      },
                      body: filesPatchFormData,
                    })
                      .then((res) => res.json())
                      .then((data) => {
                        console.log(data);
                        setCreateLoading(false);
                        if (!data.error && !data.detail) {
                          toast.success(
                            "Thanks for your request. You will get notified when your profile is approved and live.",
                            {
                              duration: 6000,
                            }
                          );
                          resetAllStates();
                          setTimeout(() => {
                            router.push("/");
                          }, 4000);
                        } else {
                          toast.error(
                            "Error creating your coach profile. Please try again.",
                            {
                              duration: 6000,
                            }
                          );
                        }
                      })
                      .catch((err) => {
                        toast.error(
                          "Error creating your coach profile. Please try again.",
                          {
                            duration: 6000,
                          }
                        );
                        console.error(err);
                        setCreateLoading(false);
                      });
                  } else {
                    setCreateLoading(false);
                    toast.success(
                      "Thanks for your request. You will get notified when your profile is approved and live.",
                      {
                        duration: 6000,
                      }
                    );
                    resetAllStates();
                    setTimeout(() => {
                      router.push("/");
                    }, 4000);
                  }
                } else {
                  setCreateLoading(false);
                  if (data.error === "Bot already exists") {
                    toast.error("Bot already exists");
                  } else {
                    toast.error(
                      "Error creating your coach profile. Please try again.",
                      {
                        duration: 6000,
                      }
                    );
                  }
                }
              })
              .catch((err) => {
                console.error(err);
                setCreateLoading(false);
              });
          } else {
            resetAllStates();
            setCreateLoading(false);
            toast.success(
              "Thanks for your request. You will get notified when your profile is approved and live.",
              {
                duration: 6000,
              }
            );
            setTimeout(() => {
              router.push("/");
            }, 4000);
          }
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating your coach profile. Please try again.");
      setCreateLoading(false);
    }
  };

  const createFeedbackSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      setFeedbackCreateLoading(true);
      var feedbackFormdata = {
        bot_type: "feedback_bot",
        bot_name: name,
        profile_id: profileId,
        email: user.email,
        attributes: {
          heading: "welcome to feedback bot",
          feedback_questions: {
            "1": "As witnessed by you what would be some of my strengths and/or weaknesses, that you have come across?",
            "2": "Regarding workplace team management skills, how would you rate my skills?",
            "3": "I am trying to improve my project management skills. In the past quarter have you seen any examples? Examples would be great.",
            "4": "How would like to see me implement the feedback you have provided so far?",
          },
        },
        feedback_questions: {
          "1": "As witnessed by you what would be some of my strengths and/or weaknesses, that you have come across?",
          "2": "Regarding workplace team management skills, how would you rate my skills?",
          "3": "I am trying to improve my project management skills. In the past quarter have you seen any examples? Examples would be great.",
          "4": "How would like to see me implement the feedback you have provided so far?",
        },
        participant_id: userId,
        additional_data: {
          short_profile_bio: profileBio,
          current_projects: currentProjects,
          suggested_projects: suggestedProjects,
        },
        bot_base_url: `${
          subdomain === "playground"
            ? "https://playground.coachbots.com"
            : "https://platform.coachbots.com"
        }`,
      };

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", basicAuth);

      fetch(`${baseURL}/accounts/create-bot-by-details/`, {
        method: checkIfEdit ? "PATCH" : "POST",
        headers: myHeaders,
        body: checkIfEdit
          ? JSON.stringify({
              bot_id: botIUidFromParams,
              updated_data: feedbackFormdata,
            })
          : JSON.stringify(feedbackFormdata),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setFeedbackCreateLoading(false);

          if (!data.error && !data.detail) {
            if (checkIfEdit) {
              toast.success("Successfully Updated your feedback bot.", {
                duration: 6000,
              });
            } else {
              toast.success(
                "Thanks for your request. You will get notified when your Feedback bot is approved and live.",
                {
                  duration: 6000,
                }
              );
              setTimeout(() => {
                router.push("/");
              }, 4000);
            }
            resetAllStates();
          } else {
            toast.error("Error creating your feedback bot. Please try again.", {
              duration: 6000,
            });
          }
        })
        .catch((err) => {
          console.error(err);
          if (checkIfEdit) {
            toast.error("Error Updating your feedback bot. Please try again.", {
              duration: 6000,
            });
          } else {
            toast.error("Error creating your feedback bot. Please try again.", {
              duration: 6000,
            });
          }
        });
    }
  };

  const onCharacteristicsSelectLow = (val: string) => {
    setCharacteristicsRateLows(val);

    const resetDisabledData = characteristicsList.map((option) => ({
      ...option,
      disabled: false,
    }));

    const selectedValueIndex = resetDisabledData.findIndex(
      (option) => option.value === val
    );

    if (selectedValueIndex !== -1) {
      resetDisabledData[selectedValueIndex] = {
        ...resetDisabledData[selectedValueIndex],
        disabled: true,
      };
    }
    setCharacteristicsList(resetDisabledData);
  };

  const onCharacteristicsSelectHigh = (val: string) => {
    console.log(val);
    setCharacteristicsRateHigh(val);
  };

  //handling edit
  useEffect(() => {
    const coachtalk = document.getElementsByClassName("deep-chat-poc")[0];
    const coachScribe = document.getElementsByClassName("deep-chat-poc2")[0];
    coachtalk.setAttribute("style", "display: none;");
    coachScribe.setAttribute("style", "display: none;");
    if (checkIfEdit === "true") {
      if (botIdFromParams?.includes("feedback")) {
        setIsFeedbackNeeded(true);
        setTimeout(() => {
          console.log(document.getElementById("feedback"));
          document.getElementById("feedback")?.scrollIntoView({
            behavior: "smooth",
          });
        }, 200);

        getUserAccount(user)
          .then((res) => res.json())
          .then((data) => {
            fetch(`${baseURL}/accounts/get-bots/?user_id=${data.uid}`, {
              headers: {
                Authorization: basicAuth,
              },
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("Bot details for edit", data);
                let resultingBot = getBotById(botIdFromParams!, data.data);

                console.log(resultingBot);
                resultingBot.signature_bot.bot_details.info = "hello";
                console.log(resultingBot);
                setName(resultingBot.bot_attributes.coach_name);
                if (botIdFromParams?.includes("feedback")) {
                  setProfileBio(
                    resultingBot.signature_bot.data.additional_data.short_profile_bio?.trim()
                  );
                  setCurrentProjects(
                    resultingBot.signature_bot.data.additional_data.current_projects?.trim()
                  );
                  setSuggestedProjects(
                    resultingBot.signature_bot.data.additional_data.suggested_projects?.trim()
                  );
                }
              });
          });
      } else if (formType === "coach") {
        getUserAccount(user)
          .then((res) => res.json())
          .then((data) => {
            fetch(`${baseURL}/accounts/get-bots/?user_id=${data.uid}`, {
              headers: {
                Authorization: basicAuth,
              },
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("Bot details for edit - Coach", data);

                const resultingBot = getBotById(botIdFromParams!, data.data);

                console.log(resultingBot);
                setName(resultingBot.bot_attributes.coach_name);
                setAbout(
                  resultingBot.signature_bot.data.additional_data.profile_description?.trim()
                );
                setExperience(
                  resultingBot.signature_bot.data.additional_data.experience
                );
                setDepartment(
                  resultingBot.signature_bot.data.additional_data.department
                );
                setAreaDomain(
                  resultingBot.signature_bot.data.additional_data.area_domain
                );
                setMentoringPreferences(
                  resultingBot.signature_bot.data.additional_data
                    .mentoring_preferences
                );
                setCoachMentFrameworks(
                  resultingBot.signature_bot.data.additional_data.mentoring_frameworks?.trim()
                );
                setPovProgramParticipants(
                  resultingBot.signature_bot.data.additional_data.dominant_point_of_view?.trim()
                );
                setProblemSolvingApproach(
                  resultingBot.signature_bot.data.additional_data.problem_solving_approach?.trim()
                );
                // setLinksReflectingWVpersonal(
                //   resultingBot.signature_bot.data.additional_data.youtube_links?.trim()
                // );
                // setLinksReflectyouWished(
                //   resultingBot.signature_bot.data.additional_data.article_links?.trim()
                // );
                setLeaderNames(
                  resultingBot.signature_bot.data.additional_data.admired_leaders?.trim()
                );
                setVoiceSample(
                  resultingBot.signature_bot.data.additional_data.voice_sample
                );
                setCoachMentSelect(
                  resultingBot.signature_bot.data.additional_data
                    .fitment_answers?.coachmentSelect
                );
                setCochMentInSameDep(
                  resultingBot.signature_bot.data.additional_data
                    .fitment_answers?.coachMentInSameDep
                );
                setParticipantLevel(
                  resultingBot.signature_bot.data.additional_data
                    .fitment_answers?.participantLevel
                );
                setOutcomeSupported(
                  resultingBot.signature_bot.data.additional_data
                    .fitment_answers?.outcomeSupported
                );
              });
          });
      } else if (formType === "coachee") {
        getUserAccount(user)
          .then((res) => res.json())
          .then((data) => {
            fetch(
              `${baseURL}/accounts/coach-coachee-mentor-mentee-profile/?profile_id=${userProfileId}`,
              {
                headers: {
                  Authorization: basicAuth,
                },
              }
            )
              .then((res) => res.json())
              .then((data) => {
                console.log("Bot details for edit - coachee", data);

                const resultingBot = data.data;

                console.log(resultingBot);
                setName(resultingBot.name);
                setAbout(resultingBot.about?.trim());
                setExperience(resultingBot.experience);
                console.log(
                  resultingBot.low_rating_characteristics,
                  resultingBot.high_rating_characteristics
                );
                setCharacteristicsRateLows(
                  resultingBot.low_rating_characteristics
                );
                setCharacteristicsRateHigh(
                  resultingBot.high_rating_characteristics
                );
                setDepartment(resultingBot.department);
              });
          });
      }
    }
  }, []);

  const [error, setError] = useState({});

  const handleWordLimit = (
    input_value: string,
    minLimit: number,
    maxLimit: number,
    fieldName: string
  ) => {
    const inputValue = input_value;

    if (inputValue.length > minLimit && inputValue.length < maxLimit) {
      setError((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `${fieldName} should be between ${minLimit} and ${maxLimit} characters.`,
      }));
    }
  };

  return (
    <div className="bg-gray-100 min-h-[120vh] h-full grainy max-sm:h-full max-sm:min-h-screen pb-16">
      <MaxWidthWrapper className="flex pt-10 flex-col items-center justify-center text-center">
        <h1 className="text-[#2DC092] border-2 border-[#2DC092] p-[3px] text-xl font-extrabold mt-10 mb-6">
          <span className="bg-[#2DC092] text-white text-lg font-bold mr-[4px] p-[4px]">
            COACH
          </span>
          BOTS
        </h1>
        {formType === "IDP" && <IDPIntake user={user} />}
        {formType === "coach" && (
          <div className="flex flex-col justify-center items-center w-full">
            <div className="bg-white w-[60%] max-md:w-[80%] max-lg:w-[80%] max-sm:w-[90%] h-fit p-4 mt-5 rounded-md mb-4">
              <h1 className="text-xl text-left text-gray-600 font-bold">
                Coach & Mentor Intake
              </h1>
              <p className="mb-3 text-left text-sm text-gray-600">
                Information provided will be used to create your avatar! ( Est
                time : 15 mins)
              </p>
              <form
                className="text-left"
                onSubmit={(e: FormEvent<HTMLFormElement>) => {
                  createSubmitHandler(e);
                }}
              >
                <div className="flex flex-col gap-2">
                  <Badge
                    variant={"secondary"}
                    className="rounded-sm bg-[#fef3c7] text-[#d97706] p-1 w-fit"
                  >
                    <Info className="h-4 w-4 mr-1" /> All fields are required.
                  </Badge>
                  {checkIfEdit && (
                    <Badge
                      className="bg-blue-200 w-fit text-blue-800"
                      variant={"outline"}
                    >
                      You are editing your bot. All the earlier inputs will be
                      replaced by current inputs.
                    </Badge>
                  )}
                </div>
                <div>
                  <div className="my-3">
                    <p className="text-sm my-1">Enter your name</p>
                    <input
                      value={name}
                      required
                      minLength={10}
                      maxLength={30}
                      onChange={(e) => {
                        setName(e.target.value);
                        handleWordLimit(e.target.value, 10, 30, "Name");
                      }}
                      placeholder="Aarav Sharma"
                      type="text"
                      className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                    />
                    {Object.keys(error).includes("Name") && (
                      <p className="text-red-500 text-xs mt-1">
                        {(error as any)["Name"]}
                      </p>
                    )}
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Please add a profile description.
                    </p>
                    <textarea
                      value={about}
                      minLength={200}
                      maxLength={1500}
                      required
                      onChange={(e) => {
                        setAbout(e.target.value);
                        handleWordLimit(
                          e.target.value,
                          200,
                          1500,
                          "Profile Description"
                        );
                      }}
                      placeholder="Share your coaching expertise, experience, and approach. Help clients understand how you can support their goals."
                      rows={3}
                      className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                    />
                    {Object.keys(error).includes("Profile Description") && (
                      <p className="text-red-500 text-xs mt-1">
                        {(error as any)["Profile Description"]}
                      </p>
                    )}
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Total number of years of experience.
                    </p>
                    <div>
                      <RadioGroup
                        value={experience}
                        required
                        onValueChange={(value) => {
                          setExperience(value);
                        }}
                      >
                        {[
                          "0 - 5 years",
                          "5 - 10 years",
                          "10 - 20 years",
                          "20+ years",
                        ].map((val, i) => (
                          <div key={i} className="flex items-center space-x-2 ">
                            <RadioGroupItem value={val} id={`r${i}+1 ${val}`} />
                            <label
                              htmlFor={`r${i}+1 ${val}`}
                              className="text-xs text-gray-700"
                            >
                              {capitalizeText(val)}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="my-4">
                    <p className="text-sm my-1">
                      Please add a professional picture to be added with your
                      profile.
                    </p>
                    <div className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 ">
                      <input
                        required={!checkIfEdit}
                        type="file"
                        name="myImage"
                        accept="image/*"
                        onChange={(e) => {
                          //@ts-ignore
                          setProfileImage(e.target.files[0]);
                        }}
                        className="w-fit"
                      />{" "}
                      <p className="m-1 mt-2 ml-0 text-gray-500">
                        Upload image with (240px * 240px) under 2MB
                      </p>
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Which department/ business unit you belong to?
                    </p>
                    <RadioGroup
                      value={department}
                      required
                      onValueChange={(value) => {
                        setDepartment(value);
                      }}
                    >
                      {departments.map((val, i) => (
                        <div key={i} className="flex items-center space-x-2 ">
                          <RadioGroupItem value={val} id={`r${i}+1 ${val}`} />
                          <label
                            htmlFor={`r${i}+1 ${val}`}
                            className="text-xs text-gray-700"
                          >
                            {capitalizeText(val)}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="my-3">
                    <p className="text-sm my-1">
                      Select the area/domain that you are most passionate about
                      coaching and mentoring.
                    </p>
                    <div className="my-2 mb-3">
                      <RadioGroup
                        required
                        value={areaDomain}
                        onValueChange={(value) => {
                          setAreaDomain(value);
                        }}
                      >
                        {areaDomains.map((val, i) => (
                          <div key={i} className="flex items-center space-x-2 ">
                            <RadioGroupItem
                              className={`rounded-sm`}
                              value={val}
                              id={`r${i}+1 ${val}`}
                            />
                            <label
                              htmlFor={`r${i}+1 ${val}`}
                              className="text-xs text-gray-700"
                            >
                              {capitalizeText(val)}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="my-3">
                    <p className="text-sm my-1">
                      Which way do you want to help the program participants the
                      most?
                    </p>
                    <div className="my-2 mb-3">
                      <RadioGroup
                        required
                        value={mentoringPreferences}
                        onValueChange={(value) => {
                          setMentoringPreferences(value);
                        }}
                      >
                        {[
                          "Mentoring (Skills Enhancement)",
                          "Coaching (Reflection)",
                          "Both",
                        ].map((val, i) => (
                          <div key={i} className="flex items-center space-x-2 ">
                            <RadioGroupItem value={val} id={`r${i}+1 ${val}`} />
                            <label
                              htmlFor={`r${i}+1 ${val}`}
                              className="text-xs text-gray-700"
                            >
                              {capitalizeText(val)}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Please mention any coaching & mentoring frameworks or
                      tools that you use in your approach.
                    </p>
                    <div>
                      <input
                        required
                        value={coachMentFrameworks}
                        onChange={(e) => {
                          setCoachMentFrameworks(e.target.value);
                        }}
                        placeholder="eg : GROW model"
                        type="text"
                        className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                      />
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Please articulate your dominant point of view which you
                      want to discuss with the program participants as a general
                      starting point.
                    </p>
                    <div>
                      <input
                        required
                        value={povProgramParticipants}
                        onChange={(e) => {
                          setPovProgramParticipants(e.target.value);
                        }}
                        placeholder="Fostering collaboration, diversity, and open discussions for shared learning and creative exploration..."
                        type="text"
                        className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                      />
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      What is your general approach towards problem solving?
                    </p>
                    <div>
                      <input
                        required
                        value={problemSolvingApproach}
                        onChange={(e) => {
                          setProblemSolvingApproach(e.target.value);
                        }}
                        placeholder="My approach involves systematic analysis, creativity, and collaboration to find innovative, effective solutions..."
                        type="text"
                        className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                      />
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Please enter 1-2 YouTube links that reflect your worldview
                      on personal & professional development.
                    </p>
                    <div>
                      <textarea
                        rows={4}
                        required={!checkIfEdit}
                        value={linksReflectingWVpersonal}
                        onChange={(e) => {
                          setLinksReflectingWVpersonal(e.target.value);
                        }}
                        placeholder="(Let's say you believe grit and perseverance are important for workplace success, you may consider adding this link: https://www.youtube.com/watch?v=H14bBuluwB8 )"
                        className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400  resize-none"
                      />
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Please add names of 1-2 well-known leaders that you
                      admire.
                    </p>
                    <div>
                      <input
                        required
                        onChange={(e) => {
                          setLeaderNames(e.target.value);
                        }}
                        value={leaderNames}
                        placeholder="Bill Gates, Ratan Tata"
                        type="text"
                        className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                      />
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Please enter 1-2 article links that reflect what you
                      wished everyone would follow in their growth journey.
                    </p>
                    <div>
                      <textarea
                        rows={4}
                        required={!checkIfEdit}
                        value={linksReflectyouWished}
                        onChange={(e) => {
                          setLinksReflectyouWished(e.target.value);
                        }}
                        placeholder="(Let's say you came across an article that you liked a lot and you think it will help the program participants to grow, you can add that link. E.g you want to generally talk about empathy, you can add this article: https://www.mindtools.com/agz0gft/empathy-at-work)"
                        className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                      />
                    </div>
                  </div>
                  <div className="my-3 ">
                    <p className="text-sm my-1">
                      Please add any document or file that you believe are
                      reference materials that may help your mentees and
                      participants.
                    </p>

                    <div className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 ">
                      <input
                        required={!checkIfEdit}
                        type="file"
                        className="w-full text-xs my-2"
                        multiple
                        name="files"
                        accept=".pdf"
                        onChange={async (e) => {
                          const selectedFiles = Array.from(
                            e.target.files as FileList
                          );
                          const filesArray = selectedFiles.map((file) => ({
                            file: file,
                            id: Math.floor(Math.random() * 10000),
                          }));
                          console.log(filesArray);
                          setReferenceDocs((prevFiles) => [
                            ...prevFiles,
                            ...filesArray,
                          ]);
                        }}
                      />
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Do you want to provide a voice sample, if you want an
                      audio avatar? (We will separately contact you for the
                      same)
                    </p>
                    <div className="my-2 mb-3">
                      <RadioGroup
                        required
                        value={voiceSample}
                        onValueChange={(value) => {
                          setVoiceSample(value);
                        }}
                      >
                        {["Yes", "No"].map((val, i) => (
                          <div key={i} className="flex items-center space-x-2 ">
                            <RadioGroupItem value={val} id={`r${i}+1 ${val}`} />
                            <label
                              htmlFor={`r${i}+1 ${val}`}
                              className="text-xs text-gray-700"
                            >
                              {capitalizeText(val)}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <hr />
                  <div className="my-2">
                    <h3 className="font-semibold text-base text-gray-600">
                      Fitment Analysis
                    </h3>
                    <p className="text-sm text-gray-600">
                      This section analyzes your fitment with the participant,
                      as if it were a face to face engagement.
                    </p>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Do you want to coach/mentor anyone or only participants
                      who have a basic fitment?
                    </p>
                    <div className="my-2 mb-3">
                      <RadioGroup
                        required
                        value={coachmentSelect}
                        onValueChange={(value) => {
                          setCoachMentSelect(value);
                        }}
                      >
                        {["Anyone", "With fitment only"].map((val, i) => (
                          <div key={i} className="flex items-center space-x-2 ">
                            <RadioGroupItem value={val} id={`r${i}+1 ${val}`} />
                            <label
                              htmlFor={`r${i}+1 ${val}`}
                              className="text-xs text-gray-700"
                            >
                              {capitalizeText(val)}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      What level of participant do you want to coach & mentor?
                    </p>
                    <div className="my-2 mb-3">
                      <RadioGroup
                        required
                        value={participantLevel}
                        onValueChange={(value) => {
                          setParticipantLevel(value);
                        }}
                      >
                        {[
                          "Anyone above me",
                          "Same or upto two level below ",
                          "Any level",
                        ].map((val, i) => (
                          <div key={i} className="flex items-center space-x-2 ">
                            <RadioGroupItem value={val} id={`r${i}+1 ${val}`} />
                            <label
                              htmlFor={`r${i}+1 ${val}`}
                              className="text-xs text-gray-700"
                            >
                              {capitalizeText(val)}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      I want to coach & mentor someone in the same department.
                    </p>
                    <div className="my-2 mb-3">
                      <RadioGroup
                        required
                        value={coachMentInSameDep}
                        onValueChange={(value) => {
                          setCochMentInSameDep(value);
                        }}
                      >
                        {["Yes", "No"].map((val, i) => (
                          <div key={i} className="flex items-center space-x-2 ">
                            <RadioGroupItem value={val} id={`r${i}+1 ${val}`} />
                            <label
                              htmlFor={`r${i}+1 ${val}`}
                              className="text-xs text-gray-700"
                            >
                              {capitalizeText(val)}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      What kind of outcome can you support in these sessions the
                      most?
                    </p>
                    <div className="my-2 mb-3">
                      <RadioGroup
                        value={outcomeSupported}
                        required
                        onValueChange={(value) => {
                          setOutcomeSupported(value);
                        }}
                      >
                        {[
                          "Careeer advancement",
                          "Skill development",
                          "Introspection & reflectiom",
                          "Networking & leadership",
                        ].map((val, i) => (
                          <div key={i} className="flex items-center space-x-2 ">
                            <RadioGroupItem
                              className="rounded-sm"
                              value={val}
                              id={`r${i}+1 ${val}`}
                            />
                            <label
                              htmlFor={`r${i}+1 ${val}`}
                              className="text-xs text-gray-700"
                            >
                              {capitalizeText(val)}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <hr className="my-2" />
                  <div>
                    {checkIfEdit ? (
                      <Button disabled={createLoading} className="h-8">
                        {" "}
                        {createLoading ? (
                          <>
                            <Loader className="h-5 w-5 animate-spin mr-2" />{" "}
                            Saving
                          </>
                        ) : (
                          <>
                            Save Changes <PenLine className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button disabled={createLoading} className="h-8">
                        {" "}
                        {createLoading ? (
                          <>
                            <Loader className="h-5 w-5 animate-spin mr-2" />{" "}
                            Submitting
                          </>
                        ) : (
                          <>
                            Submit <SendHorizonal className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </div>
            <div
              id="feedback"
              className="bg-white w-[60%] max-lg:w-[80%] max-sm:w-[90%]  h-fit p-4 rounded-md mb-20"
            >
              <div className="flex items-center space-x-2">
                <label className="text-sm" htmlFor="feedback-needed">
                  Do you want to create a feedback bot?
                </label>
                <Switch
                  id="feedback-needed"
                  checked={isFeedbackNeeded}
                  onCheckedChange={(checked) => {
                    console.log("is checked", checked);
                    setIsFeedbackNeeded(checked);
                  }}
                />
              </div>
              {isFeedbackNeeded && (
                <form
                  className="text-left"
                  onSubmit={(e: FormEvent<HTMLFormElement>) => {
                    createFeedbackSubmitHandler(e);
                  }}
                >
                  <Badge
                    variant={"secondary"}
                    className="rounded-sm bg-[#fef3c7] text-[#d97706] p-1 mt-2"
                  >
                    <Info className="h-4 w-4 mr-1" /> All fields are required.
                  </Badge>
                  <div className="my-3">
                    <p className="text-sm my-1">Enter your name</p>
                    <input
                      value={name}
                      required
                      minLength={10}
                      maxLength={30}
                      onChange={(e) => {
                        setName(e.target.value);
                        handleWordLimit(e.target.value, 10, 30, "Name");
                      }}
                      placeholder="Aarav Sharma"
                      type="text"
                      className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                    />
                    {Object.keys(error).includes("Name") && (
                      <p className="text-red-500 text-xs mt-1">
                        {(error as any)["Name"]}
                      </p>
                    )}
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Please add a short profile bio.
                    </p>
                    <textarea
                      value={profileBio}
                      minLength={200}
                      maxLength={1500}
                      required
                      onChange={(e) => {
                        setProfileBio(e.target.value);
                        handleWordLimit(
                          e.target.value,
                          200,
                          1500,
                          "Profile Bio"
                        );
                      }}
                      placeholder="Passionate about personal growth and seeking guidance to overcome challenges and achieve my goals. Excited to work with a coach who can support me on this transformative journey..."
                      rows={3}
                      className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                    />
                    {Object.keys(error).includes("Profile Bio") && (
                      <p className="text-red-500 text-xs mt-1">
                        {(error as any)["Profile Bio"]}
                      </p>
                    )}
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Please enter your Current Projects
                    </p>
                    <textarea
                      value={currentProjects}
                      required
                      onChange={(e) => {
                        setCurrentProjects(e.target.value);
                      }}
                      placeholder="Highlighting the exciting projects I'm currently working on, including [Project 1], [Project 2], and [Project 3]..."
                      rows={3}
                      className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                    />
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Please enter your Suggested projects/ assignments.
                    </p>
                    <textarea
                      required
                      value={suggestedProjects}
                      onChange={(e) => {
                        setSuggestedProjects(e.target.value);
                      }}
                      placeholder="Proposing innovative projects or assignments such as [Project/Assignment 1], [Project/Assignment 2], and [Project/Assignment 3] that align with your expertise and interests..."
                      rows={3}
                      className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                    />
                  </div>
                  <div>
                    {checkIfEdit ? (
                      <Button disabled={feedbackCreateLoading} className="h-8">
                        {" "}
                        {feedbackCreateLoading ? (
                          <>
                            <Loader className="h-5 w-5 animate-spin mr-2" />{" "}
                            Saving
                          </>
                        ) : (
                          <>
                            Save Changes <PenLine className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button disabled={feedbackCreateLoading} className="h-8">
                        {" "}
                        {feedbackCreateLoading ? (
                          <>
                            <Loader className="h-5 w-5 animate-spin mr-2" />{" "}
                            Submitting
                          </>
                        ) : (
                          <>
                            Submit <SendHorizonal className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
        {formType === "coachee" && (
          <div className="flex flex-col justify-center items-center w-full">
            <div className="bg-white w-[60%] max-lg:w-[80%] max-sm:w-[90%] h-fit p-4 mt-5 rounded-md mb-4">
              <h1 className="text-xl text-left text-gray-600 font-bold">
                Coachee & Mentee Intake
              </h1>
              <p className="mb-3 text-left text-sm text-gray-600">
                Use this to add yourself to your organization's mentoring and
                coaching network.
              </p>
              <form
                className="text-left"
                onSubmit={(e: FormEvent<HTMLFormElement>) => {
                  createSubmitHandler(e);
                }}
              >
                <Badge
                  variant={"secondary"}
                  className="rounded-sm bg-[#fef3c7] text-[#d97706] p-1"
                >
                  <Info className="h-4 w-4 mr-1" /> All fields are required.
                </Badge>
                <div>
                  <div className="my-3">
                    <p className="text-sm my-1">Enter your name</p>
                    <input
                      required
                      value={name}
                      minLength={10}
                      maxLength={30}
                      onChange={(e) => {
                        setName(e.target.value);
                        handleWordLimit(e.target.value, 10, 30, "Name");
                      }}
                      placeholder="Aarav Sharma"
                      type="text"
                      className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                    />
                    {Object.keys(error).includes("Name") && (
                      <p className="text-red-500 text-xs mt-1">
                        {(error as any)["Name"]}
                      </p>
                    )}

                    {/* {error && <p className="text-red-500 text-xs mt-1">{error}</p>} */}
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Please add a profile description.
                    </p>
                    <textarea
                      value={about}
                      required
                      minLength={200}
                      maxLength={1500}
                      onChange={(e) => {
                        setAbout(e.target.value);
                        handleWordLimit(
                          e.target.value,
                          200,
                          1500,
                          "Profile Description"
                        );
                      }}
                      placeholder="Briefly share your background, goals, and what you're seeking in a coaching or mentoring relationship."
                      rows={3}
                      className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                    />
                    {Object.keys(error).includes("Profile Description") && (
                      <p className="text-red-500 text-xs mt-1">
                        {(error as any)["Profile Description"]}
                      </p>
                    )}
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Total number of years of experience.
                    </p>
                    <div>
                      <RadioGroup
                        value={experience}
                        required
                        onValueChange={(value) => {
                          setExperience(value);
                        }}
                      >
                        {[
                          "0 - 5 years",
                          "5 - 10 years",
                          "10 - 20 years",
                          "20+ years",
                        ].map((val, i) => (
                          <div key={i} className="flex items-center space-x-2 ">
                            <RadioGroupItem value={val} id={`r${i}+1 ${val}`} />
                            <label
                              htmlFor={`r${i}+1 ${val}`}
                              className="text-xs text-gray-700"
                            >
                              {capitalizeText(val)}
                            </label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="my-4">
                    <p className="text-sm my-1">
                      Please add a profile picture for adding to your profile.
                    </p>
                    <div className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 ">
                      <input
                        required={!checkIfEdit}
                        type="file"
                        name="myImage"
                        accept="image/*"
                        onChange={(e) => {
                          //@ts-ignore
                          setProfileImage(e.target.files[0]);
                        }}
                        className="w-fit"
                      />{" "}
                      <p className="m-1 mt-2 ml-0 text-gray-500">
                        Upload image with (240px * 240px) under 2MB
                      </p>
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Please rate the characteristics/skills on which you will
                      rate yourself near the lows.
                    </p>
                    <CharactericticsSelect
                      onCharacteristicsSelect={onCharacteristicsSelectLow}
                      options={characteristicsList}
                    />
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Please rate the characteristics/skills on which you will
                      rate yourself highly.
                    </p>
                    <CharactericticsSelect
                      onCharacteristicsSelect={onCharacteristicsSelectHigh}
                      options={characteristicsList}
                    />
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Please list your department affiliation.
                    </p>
                    <RadioGroup
                      required
                      onValueChange={(value) => {
                        setDepartment(value);
                      }}
                      value={department}
                    >
                      {departments.map((val, i) => (
                        <div key={i} className="flex items-center space-x-2 ">
                          <RadioGroupItem value={val} id={`r${i}+1 ${val}`} />
                          <label
                            htmlFor={`r${i}+1 ${val}`}
                            className="text-xs text-gray-700"
                          >
                            {capitalizeText(val)}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  <hr className="my-2" />
                  <div>
                    {checkIfEdit ? (
                      <Button disabled={feedbackCreateLoading} className="h-8">
                        {" "}
                        {feedbackCreateLoading ? (
                          <>
                            <Loader className="h-5 w-5 animate-spin mr-2" />{" "}
                            Saving
                          </>
                        ) : (
                          <>
                            Save Changes <PenLine className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button disabled={createLoading} className="h-8">
                        {" "}
                        {createLoading ? (
                          <>
                            <Loader className="h-5 w-5 animate-spin mr-2" />{" "}
                            Submitting
                          </>
                        ) : (
                          <>
                            Submit <SendHorizonal className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </div>
            <div
              id="feedback"
              className="bg-white w-[60%] max-lg:w-[80%] max-sm:w-[90%]  h-fit p-4 rounded-md mb-20"
            >
              <div className="flex items-center space-x-2">
                <label className="text-sm" htmlFor="feedback-needed">
                  Do you want to create a feedback bot?
                </label>
                <Switch
                  id="feedback-needed"
                  checked={isFeedbackNeeded}
                  onCheckedChange={(checked) => {
                    console.log("is checked", checked);
                    setIsFeedbackNeeded(checked);
                  }}
                />
              </div>
              {isFeedbackNeeded && (
                <form
                  className="text-left"
                  onSubmit={(e: FormEvent<HTMLFormElement>) => {
                    createFeedbackSubmitHandler(e);
                  }}
                >
                  <Badge
                    variant={"secondary"}
                    className="rounded-sm bg-[#fef3c7] text-[#d97706] p-1 mt-2"
                  >
                    <Info className="h-4 w-4 mr-1" /> All fields are required.
                  </Badge>
                  <div className="my-3">
                    <p className="text-sm my-1">Enter your name</p>
                    <input
                      value={name}
                      required
                      minLength={10}
                      maxLength={30}
                      onChange={(e) => {
                        setName(e.target.value);
                        handleWordLimit(e.target.value, 10, 30, "Name");
                      }}
                      placeholder="Aarav Sharma"
                      type="text"
                      className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                    />
                    {Object.keys(error).includes("Name") && (
                      <p className="text-red-500 text-xs mt-1">
                        {(error as any)["Name"]}
                      </p>
                    )}
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Please add a short profile bio.
                    </p>
                    <textarea
                      value={profileBio}
                      required
                      minLength={200}
                      maxLength={1500}
                      onChange={(e) => {
                        setProfileBio(e.target.value);
                        handleWordLimit(
                          e.target.value,
                          200,
                          1500,
                          "Profile Bio"
                        );
                      }}
                      placeholder="Passionate about personal growth and seeking guidance to overcome challenges and achieve my goals. Excited to work with a coach who can support me on this transformative journey..."
                      rows={3}
                      className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                    />
                    {Object.keys(error).includes("Profile Bio") && (
                      <p className="text-red-500 text-xs mt-1">
                        {(error as any)["Profile Bio"]}
                      </p>
                    )}
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Please enter your Current Projects
                    </p>
                    <textarea
                      value={currentProjects}
                      required
                      onChange={(e) => {
                        setCurrentProjects(e.target.value);
                      }}
                      placeholder="Highlighting the exciting projects I'm currently working on, including [Project 1], [Project 2], and [Project 3]..."
                      rows={3}
                      className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                    />
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Please enter your Suggested projects/ assignments.
                    </p>
                    <textarea
                      required
                      value={suggestedProjects}
                      onChange={(e) => {
                        setSuggestedProjects(e.target.value);
                      }}
                      placeholder="Proposing innovative projects or assignments such as [Project/Assignment 1], [Project/Assignment 2], and [Project/Assignment 3] that align with your expertise and interests..."
                      rows={3}
                      className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                    />
                  </div>
                  <div>
                    {checkIfEdit ? (
                      <Button disabled={feedbackCreateLoading} className="h-8">
                        {" "}
                        {feedbackCreateLoading ? (
                          <>
                            <Loader className="h-5 w-5 animate-spin mr-2" />{" "}
                            Saving
                          </>
                        ) : (
                          <>
                            Save Changes <PenLine className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button disabled={feedbackCreateLoading} className="h-8">
                        {" "}
                        {feedbackCreateLoading ? (
                          <>
                            <Loader className="h-5 w-5 animate-spin mr-2" />{" "}
                            Submitting
                          </>
                        ) : (
                          <>
                            Submit <SendHorizonal className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </MaxWidthWrapper>
    </div>
  );
};

export default CoachIntake;
