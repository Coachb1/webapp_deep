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
  getBotById,
  replaceSpecialCharacters,
  isValidLinks,
  isValidYoutubeLinks,
  transformExtractedData,
  transformExtractedOptional,
  transformExtractedOptionalCoachee,
} from "@/lib/utils";
import {
  Asterisk,
  ChevronLeft,
  Eye,
  File,
  Info,
  Loader,
  PenLine,
  SendHorizonal,
  Trash2,
  UndoDot,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import CharactericticsSelect from "./CharacteristicsSelect";
import { useSearchParams, useRouter } from "next/navigation";
import mammoth from "mammoth";
import { pdfjs } from "react-pdf";
import {
  MediaData,
  OptionalMediaData,
  UserClientInfoDataType,
} from "@/lib/types";
import { Radio, Select, Tooltip } from "antd";
import UserBotIntake from "./UserBotIntake";
import { Checkbox } from "@/components/ui/checkbox";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import Link from "next/link";
import { NavProfileWoProfile } from "@/components/NavProfile";
import NetworkNav from "@/components/NetworkNav";
import { useUser } from "@/context/UserContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { headers } from "next/headers";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface FileData {
  file: File;
  id: number;
  text: string;
  name: string;
}

const CoachIntake = ({ user }: any) => {
  const params = useSearchParams();
  const formType = params.get("type");
  let [checkIfEdit, setCheckIfEdit] = useState(params.get("edit"));
  const checkIfView = params.get("view");
  const botIdFromParams = params.get("bot_id");
  const botIUidFromParams = params.get("uid");
  const editBotType = params.get("bot_type");
  const profileTypeFromParams = params.get("profile_type");
  let userProfileId = params.get("profile_id");
  let formVersion = params.get("v");
  const noCopilotBot = params.get("no-copilot");

  const adminEdit = params.get("admin_edit");
  const userIdParams = params.get("user_id");
  const userEmailParams = params.get("user_email");
  const userNameParams = params.get("user_name");
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(
    checkIfEdit === "true" || checkIfView === "true" || adminEdit === "true"
  );

  const [canCreateProfile, setCanCreateProfile] = useState(true);

  const [profileType, setProfileType] = useState("");
  const [createLoading, setCreateLoading] = useState(false);
  const [isFeedbackNeeded, setIsFeedbackNeeded] = useState(false);
  const [feedbackCreateLoading, setFeedbackCreateLoading] = useState(false);
  const [clientInfoData, setClientinfoData] =
    useState<UserClientInfoDataType>();

  const [departments, setDepartments] = useState<string[]>([
    "Sales & Marketing",
    "Production",
    "Design",
    "Engineering",
    "HR & Training",
    "External",
  ]);

  const [areaDomains, setAreaDomains] = useState<string[]>([
    "Leadership Development",
    "Stress Management",
    "Hiring & Recruitment",
    "People Management",
    "Diversity & Inclusion",
    "Career Navigation",
    "Culture Alignment",
    "Workplace Skills",
    "Fitness",
    "Finance",
  ]);

  //intake fields state
  const [name, setName] = useState("");
  const [profileId, setProfileId] = useState("");
  const [userId, setUserId] = useState("");
  const [isMentor, setIsMentor] = useState<boolean>();
  const [profileImage, setProfileImage] = useState<File>();
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const [department, setDepartment] = useState("");
  const [about, setAbout] = useState("");
  const [areaDomain, setAreaDomain] = useState("");
  const [experience, setExperience] = useState("");
  const [journeyAndBackground, setJourneyAndBackground] = useState("");

  const models = [
    "GROW Model",
    "Situational Leadership Model",
    "Transformational Coaching",
    "Cognitive Behavioral Coaching",
    "Strengths-Based Coaching",
    "Emotional Intelligence Coaching",
    "Solution-Focused Coaching",
  ];
  const [mentoringPreferencess, setMentoringPreferencess] = useState<string[]>(
    []
  );

  const recordCoachmentFrameworks = (
    checked: boolean | string,
    value: string
  ) => {
    setDataModified(true);
    console.log("CheckedHandler", checked, value);
    if (checked) {
      if (mentoringPreferencess) {
        setMentoringPreferencess([...mentoringPreferencess, value]); //filter Others
      } else {
        setMentoringPreferencess([value]);
      }
    } else if (!checked) {
      setMentoringPreferencess((prevState) =>
        prevState?.filter((val) => val !== value)
      );
    }
  };

  const [privacyInfoChecked, setPrivaciInfoChecked] = useState<
    boolean | string
  >();

  const [discussionTopics, setDiscussionTopics] = useState("");

  const [mentoringPreferences, setMentoringPreferences] = useState("");
  const [coachMentFrameworks, setCoachMentFrameworks] = useState("");
  const [povProgramParticipants, setPovProgramParticipants] = useState("");
  const [problemSolvingApproach, setProblemSolvingApproach] = useState("");
  const [linksReflectingWVpersonal, setLinksReflectingWVpersonal] =
    useState("");
  const [leaderNames, setLeaderNames] = useState("");
  const [linksReflectyouWished, setLinksReflectyouWished] = useState("");

  const [significantChallenges, setSignificantChallenges] = useState("");
  const [phrasesNExpressions, setPhrasesNExpressions] = useState("");

  const [provideAnswersUsingEmojis, setProvideAnswersUsingEmojis] =
    useState("");

  const [discussInCARformat, setDiscussInCARformat] = useState("");

  //botsIntake
  const [botName, setBotName] = useState("");
  const [coachingArea, setCoachingArea] = useState("");
  const [intakeBotDescription, setIntakeBotDescription] = useState("");
  const [botDocs, setBotDocs] = useState<FileData[]>([]);

  //for coaches
  const [foundationalValues, setFoundationalValues] = useState("");
  const [developmentFramewrok, setDevelopmentFrameworks] = useState("");

  //coaching faqs
  const [coachingProcessOverview, setCoachingProcessOverview] = useState("");
  const [handlingSituations, setHandlingSituations] = useState("");
  const [integratingLessons, setIntegratongLessons] = useState("");
  const [guidanceOnCoachingProcess, setGuidanceOnCoachingProcess] =
    useState("");

  //for mentor
  const [differentCareerPath, setDifferentCareerPath] = useState("");
  const [problemSolvingApproachInDomain, setProblemSolvingApproachInDomain] =
    useState("");

  //mentoring faqs
  const [overviewofMentoring, setOverviewOfMentoring] = useState("");
  const [opportunitiesOfGrowth, setOpportunitiesOfGrowth] = useState("");
  const [commonChallengesOrObstacles, setCommenChallengesOrObstacles] =
    useState("");
  const [opinionsAboutKeyQualities, setOpinionsAboutKeyQualities] =
    useState("");

  const [referenceDocs, setReferenceDocs] = useState<FileData[]>([]);
  const [voiceSample, setVoiceSample] = useState("");
  const [coachmentSelect, setCoachMentSelect] = useState("");
  const [participantLevel, setParticipantLevel] = useState("");
  const [coachMentInSameDep, setCochMentInSameDep] = useState("");
  const [outcomeSupported, setOutcomeSupported] = useState("");

  const [characteristicsRateLows, setCharacteristicsRateLows] = useState("");
  const [characteristicsRateHigh, setCharacteristicsRateHigh] = useState("");

  const [challengesToHelp, setChallengesToHelp] = useState("");

  const [characteristicsList, setCharacteristicsList] = useState<
    {
      label: string;
      value: string;
      disabled?: boolean;
    }[]
  >([]);

  const [allowSessionNotes, setAllowSessionNotes] = useState("");

  //feedbackInputStates
  const [profileBio, setProfileBio] = useState("");
  const [currentProjects, setCurrentProjects] = useState("");
  const [suggestedProjects, setSuggestedProjects] = useState("");

  //mediaData
  const [mediaData, setMediaData] = useState<MediaData>();
  const [optionalMediaData, setOptionalMediaData] =
    useState<OptionalMediaData>();
  const [updatedOptionalFile, setUpdatedOptionalFile] = useState({});
  const [dataModified, setDataModified] = useState(false);

  const resetAllStates = () => {
    setName("");
    setProfileId("");
    setProfileImage(undefined);
    setDepartment("");
    setAbout("");
    setAreaDomain("");
    setExperience("");
    setJourneyAndBackground("");
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
    setAllowSessionNotes("");
    setSignificantChallenges("");
    setPhrasesNExpressions("");
    setDiscussInCARformat("");
    setProvideAnswersUsingEmojis("");
    setMentoringPreferencess([]);

    setFoundationalValues("");
    setDevelopmentFrameworks("");
    setCoachingProcessOverview("");
    setHandlingSituations("");
    setIntegratongLessons("");
    setGuidanceOnCoachingProcess("");
    setDifferentCareerPath("");
    setProblemSolvingApproachInDomain("");
    setOverviewOfMentoring("");
    setOpportunitiesOfGrowth("");
    setCommenChallengesOrObstacles("");
    setOpinionsAboutKeyQualities("");

    setDiscussionTopics("");
  };

  const [restrictedFeatures, setRestrictedFeatures] = useState("");

  const { getAllDirectoryData, getFeedbackBotsData, getBotsFn } = useUser();

  const [switchState, setSwitchState] = useState({
    from: editBotType?.includes("subject_specific_bot")
      ? "2"
      : editBotType?.includes("avatar_bot")
      ? "3"
      : "1",
    to: "",
  });

  const switchStateCheck = () => {
    if (
      switchState.from === "1" &&
      (switchState.to === "2" || switchState.to === "3")
    ) {
      return "create-bot";
    }
  };

  const getClientInfoForUser = (userEmail: string) => {
    if (userEmail) {
      fetch(
        `${baseURL}/accounts/get-client-information/?for=user_info&email=${userEmail}`,
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
          setClientinfoData(data.data);
          setRestrictedFeatures(data.data.user_info[0].restricted_features);

          if (
            data.data.user_info[0].departments !== null &&
            data.data.user_info[0].departments !== ""
          ) {
            console.log(data.data.user_info[0].departments, "Departments");
            setDepartments(
              data.data.user_info[0].departments
                .split(",")
                .map((dep: string) => dep.trim())
            );
          }

          if (
            data.data.user_info[0].coach_expertise !== null &&
            data.data.user_info[0].coach_expertise !== ""
          ) {
            console.log(
              data.data.user_info[0].coach_expertise,
              "coach_expertise"
            );
            setAreaDomains(
              data.data.user_info[0].coach_expertise
                .split(",")
                .map((exp: string) => exp.trim())
            );
          }
        })
        .catch((err) => console.error(err));
    }
  };
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    errorKey: string
  ) => {
    const fileList = e.target.files; // Get the FileList
    if (!fileList) return; // Early return if fileList is null

    const files = Array.from(fileList); // Convert FileList to an array
    const validExtensions = [".pdf", ".docx"];

    const invalidFiles = files.filter(
      (file) =>
        !validExtensions.includes(file.name.slice(file.name.lastIndexOf(".")))
    );

    console.log(invalidFiles.length);

    if (invalidFiles.length > 0) {
      setError((prevErrors) => ({
        ...prevErrors,
        [errorKey]: "Only .pdf and .docx files are allowed.",
      }));
      e.target.value = ""; // Clear the input
      console.log(error);
      return;
    } else {
      setError((prevErrors) => ({ ...prevErrors, [errorKey]: "" }));
    }
    setDataModified(true);
    const selectedFiles = e.target?.files;
    const input_name = e.target?.name;

    if (selectedFiles) {
      const filesArray = await Promise.all(
        Array.from(selectedFiles).map(async (file: File) => {
          let textContent: string = "";
          try {
            if (file.name.includes(".pdf")) {
              textContent = (await extractTextFromPdf(file)) || "";
            } else if (file.name.includes(".docx")) {
              textContent = (await extractTextFromDocx(file)) || "";
            }
            console.log("text", textContent);
          } catch (error) {
            console.error("Error extracting text from DOCX:", error);
            // If text extraction fails, set textContent to an empty string or handle it as needed
            // textContent = '';
          }
          return {
            file: file,
            id: Math.floor(Math.random() * 10000),
            text: textContent,
            name: input_name,
          };
        })
      );

      setReferenceDocs((prevFiles) => [...prevFiles, ...filesArray]);
    }
  };

  const extractTextFromDocx = async (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const arrayBuffer = (event.target as FileReader)
          ?.result as ArrayBuffer | null;

        if (arrayBuffer) {
          try {
            const result = await mammoth.extractRawText({ arrayBuffer });
            console.log("text", result.value);
            resolve(result.value);
          } catch (error) {
            console.error("Error extracting text from DOCX:", error);
            reject(error);
          }
        } else {
          reject(new Error("Failed to read file as ArrayBuffer."));
        }
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const extractTextFromPdf = async (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const arrayBuffer = (event.target as FileReader)
          ?.result as ArrayBuffer | null;

        if (arrayBuffer) {
          try {
            const pdfData = new Uint8Array(await file.arrayBuffer());
            const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
            let extractedText = "";
            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const content = await page.getTextContent();
              extractedText +=
                content.items.map((item: any) => item.str).join(" ") + "\n"; // Type assertion here
            }

            resolve(extractedText);
          } catch (error) {
            console.error("Error extracting text from PDF:", error);
            reject(error);
          }
        } else {
          reject(new Error("Failed to read file as ArrayBuffer."));
        }
      };

      reader.readAsArrayBuffer(file);
    });
  };

  function getProfileTypes(data: any) {
    const profileTypes = data.map((profile: any) => profile.profile_type);
    return profileTypes;
  }

  let userIdd: string;

  useEffect(() => {
    console.log("noCopilotBot : ", noCopilotBot);
    hideBots();
    if (noCopilotBot === "1") {
      setFormVersion("1");
    }

    if (formType === "coach") {
      setProfileType("coach");
    } else if (formType === "coachee") {
      setProfileType("coachee");
    }

    let tempChars: any[] = [];

    fetch(`${baseURL}/skills/get-characteristics-list/`, {
      method: "GET",
      headers: {
        Authorization: basicAuth,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const createLabelValuePairs = Array.from(
          new Set<string>(data.characteristic_list.map((val: string) => val))
        ).map((val: string) => ({
          label: val,
          value: val,
        }));
        setCharacteristicsList(createLabelValuePairs);
        tempChars = createLabelValuePairs;
      });

    if (user && !adminEdit) {
      // getClientInfoForUser(user.email);
      getUserAccount(user)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setUserId(data.uid);
          userIdd = data.uid;
          setName(
            `${user.given_name} ${user.family_name ? user.family_name : ""}`
          );

          fetch(
            `${baseURL}/accounts/get_low_high_skills/?user_id=${data.uid}`,
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
              // if (characteristicsList) {
              //   console.log("characteristicsList ##", characteristicsList);
              // }
              onCharacteristicsSelectLow(data.low_skill, tempChars);
              onCharacteristicsSelectHigh(data.high_skill, tempChars);
              // setCharacteristicsRateLows(data.low_skill);
              // setCharacteristicsRateHigh(data.high_skill);
            });
        })
        .catch((err) => {
          console.error(err);

          throw new Error("Error /accounts");
        });
    } else if (adminEdit && userEmailParams && userIdParams && userNameParams) {
      setUserId(userIdParams);
      setName(userNameParams);
      userIdd = userIdParams;
      fetch(
        `${baseURL}/accounts/get_low_high_skills/?user_id=${userIdParams}`,
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
          setCharacteristicsRateLows(data.low_skill);
          setCharacteristicsRateHigh(data.high_skill);
        });
    }

    if (user) {
      getUserAccount(user)
        .then((res) => res.json())
        .then((data) => {
          let user_id = adminEdit ? userIdParams : data.uid;
          fetch(
            `${baseURL}/accounts/coach-coachee-mentor-mentee-profile/?user_id=${user_id}`,
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

              if (
                data.data.length > 0 &&
                !checkIfEdit &&
                !checkIfView &&
                !adminEdit &&
                formType !== "knowledge-bot" &&
                formType !== "feedback"
              ) {
                if (
                  (formType === "coach" && profileTypes.includes("coach")) ||
                  profileTypes.includes("mentor") ||
                  profileTypes.includes("coachee") ||
                  profileTypes.includes("mentee")
                ) {
                  setCanCreateProfile(false);
                  toast.loading(
                    "Your profile as a Coach/Coachee already exists. You cannot create another one. Redirecting you to the home page"
                  );
                  setTimeout(() => {
                    router.push("/");
                    getAllDirectoryData();
                  }, 4000);
                }
              }
            })
            .catch((err) => {
              console.error(err);

              throw new Error("Error fetching data /coach-coachee...");
            });

          if (
            formType === "feedback" &&
            !checkIfEdit &&
            !checkIfView &&
            !adminEdit
          ) {
            fetch(`${baseURL}/accounts/get-bots/?user_id=${userIdd}`, {
              headers: {
                Authorization: basicAuth,
              },
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("Bot details for edit", data);
                const FeedbackBot = data.data.filter(
                  (data: any) => data.signature_bot.bot_type === "feedback_bot"
                );
                if (FeedbackBot.length > 0) {
                  toast.loading(
                    "Your Feedback bot already exists. You cannot create another one. Redirecting you to the home page"
                  );
                  setTimeout(() => {
                    router.push("/");
                  }, 4000);
                }
              })
              .catch((err) => {
                console.error(err);

                throw new Error("Error fetching data /get-bots");
              });
          }
        });
    }
  }, []);

  const createSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formVersion, switchState, checkIfEdit);
    if (switchState.to !== "" && switchState.from !== switchState.to) {
      checkIfEdit = null; //checkIfEdit stores "1" if in edit mode, here it is reset to null if switch is made

      //delete the user resources here
      const myHeaders = new Headers();
      myHeaders.append("Authorization", basicAuth);
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        user_id: userId,
        delete_profile: true,
        delete_bot: true,
        soft_delete_profile_bot: true,
        delete_bot_types: "avatar_bot,subject_specific_bot",
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      await fetch(`${baseURL}/accounts/delete-user-resources/`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          if (result?.error) {
            toast.error(
              "Failed to process the switch profile. Please try again later"
            );
            return;
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error(
            "Failed to process the switch profile. Please try again later"
          );
          return;
        });

      // throw new Error("Error deleting user resources"); -> throw error if delete fails else proceeds
    }
    console.log(
      `Creating Profile and bot for v = ${formVersion} and switchmode:`,
      switchState
    );
    try {
      if (characteristicsRateHigh && characteristicsRateLows) {
        if (user) {
          setCreateLoading(true);
          var myHeaders = new Headers();
          myHeaders.append("Authorization", basicAuth);
          var formdata = new FormData();
          formdata.append("name", name);
          formdata.append("user_id", userId);
          formdata.append("email", adminEdit ? userEmailParams : user.email);
          formdata.append("about", about);
          formdata.append("experience", experience);

          let CoachMentorQnA = { coach_qna: {}, mentor_qna: {} };

          formdata.append(
            "low_rating_characteristics",
            characteristicsRateLows
          );
          formdata.append(
            "high_rating_characteristics",
            characteristicsRateHigh
          );

          formdata.append("discussion_topic", discussionTopics);
          if (!checkIfEdit) {
            //@ts-ignore
            if (profileImage) {
              formdata.append("profile_image", profileImage, profileImage.name);
              console.log(formdata.get("profile_image"));
            }
          }
          if (checkIfEdit) {
            formdata.append("profile_image_url", profileImageUrl);
          }
          formdata.append("department", department);

          if (formType == "coach") {
            formdata.append(
              "profile_type",
              profileType === "coach-mentor" || profileType === "coach"
                ? "coach"
                : "mentor"
            );
            formdata.append(
              "is_mentor",
              JSON.stringify(profileType === "coach-mentor" ? true : false)
            );
            formdata.append("area_domain", areaDomain);
            formdata.append(
              "allow_coachee_to_create_session",
              `${allowSessionNotes?.toLowerCase() === "yes" ? true : false}`
            );

            if (formVersion !== "1") {
              formdata.append("mentoring_preferences", mentoringPreferences);

              formdata.append(
                "provide_answers_using_emojis",
                `${
                  provideAnswersUsingEmojis?.toLowerCase() === "yes"
                    ? true
                    : false
                }`
              );

              if (formVersion !== "2") {
                formdata.append("bot_type", "avatar_bot");

                formdata.append("supported_outcome", outcomeSupported);
                formdata.append(
                  "mentoring_frameworks",
                  JSON.stringify(mentoringPreferencess.join(", "))
                ); //coachMentFrameworks);
                formdata.append(
                  "dominant_point_of_view",
                  povProgramParticipants
                );
                formdata.append(
                  "problem_solving_approach",
                  problemSolvingApproach
                );
                formdata.append(
                  "provided_links",
                  JSON.stringify({
                    youtube_links: linksReflectingWVpersonal,
                    article_links: linksReflectyouWished,
                  })
                );
                formdata.append("admired_leaders", leaderNames);

                formdata.append(
                  "voice_sample",
                  `${voiceSample.toLowerCase() === "yes" ? true : false}`
                );
                formdata.append("coaching_for_fitment", coachmentSelect);
                formdata.append("coaching_level", participantLevel);
                formdata.append(
                  "coach_same_department",
                  `${coachMentInSameDep.toLowerCase() === "yes" ? true : false}`
                );

                formdata.append(
                  "significant_challenges_and_solutions",
                  significantChallenges
                );
                formdata.append(
                  "common_phrases_and_expressions",
                  phrasesNExpressions
                );
                formdata.append("mentorship_contribution", discussInCARformat);
                formdata.append("journey_and_background", journeyAndBackground);

                if (profileType === "coach") {
                  const coachQna = {
                    "As a coach, what foundational values do you believe individuals should prioritize and strive for in their personal and professional development journey?":
                      foundationalValues,
                    "In your role as a coach, what kind of developmental framework do you employ, and why do you consider it to be the optimal framework for facilitating personal growth ?":
                      developmentFramewrok,
                    "Can you provide an overview of your coaching process and what I can expect from our sessions?":
                      coachingProcessOverview,
                    "How do you handle situations where I feel stuck or unsure about my next steps?":
                      handlingSituations,
                    "How can I integrate the lessons from these sessions into my daily life?":
                      integratingLessons,
                    "Can you provide guidance on how to effectively balance personal and professional goals during our coaching process?":
                      guidanceOnCoachingProcess,
                  };

                  CoachMentorQnA.coach_qna = coachQna;

                  formdata.append(
                    "qna_for_coach_mentor",
                    JSON.stringify({
                      coach: coachQna,
                    })
                  );
                } else if (profileType === "mentor") {
                  const QnaMentor = {
                    "As a mentor, what do you think are the different career paths available in this field? What are the core skills and understanding required to continuously grow in this field?":
                      differentCareerPath,
                    "What is the problem solving approach in your domain and why do you think that is the right construct for growing in this field?":
                      problemSolvingApproachInDomain,
                    "Can you provide an overview of your mentoring approach and what I can expect from our sessions?":
                      overviewofMentoring,
                    "What opportunities for growth or advancement do you see in this field, and how can I position myself to capitalize on them?":
                      opportunitiesOfGrowth,
                    "What are some common challenges or obstacles that individuals face when pursuing success in this field, and what strategies do you suggest for overcoming them?":
                      commonChallengesOrObstacles,
                    "In your opinion, what are the key qualities or skills that contribute to success in the field I'm aiming to excel in, and how can I develop or enhance them?":
                      opinionsAboutKeyQualities,
                  };

                  CoachMentorQnA.mentor_qna = QnaMentor;

                  formdata.append(
                    "qna_for_coach_mentor",
                    JSON.stringify({
                      mentor: QnaMentor,
                    })
                  );
                } else if (profileType === "coach-mentor") {
                  const qnaCoach = {
                    "As a coach, what foundational values do you believe individuals should prioritize and strive for in their personal and professional development journey?":
                      foundationalValues,
                    "In your role as a coach, what kind of developmental framework do you employ, and why do you consider it to be the optimal framework for facilitating personal growth ?":
                      developmentFramewrok,
                    "Can you provide an overview of your coaching process and what I can expect from our sessions?":
                      coachingProcessOverview,
                    "How do you handle situations where I feel stuck or unsure about my next steps?":
                      handlingSituations,
                    "How can I integrate the lessons from these sessions into my daily life?":
                      integratingLessons,
                    "Can you provide guidance on how to effectively balance personal and professional goals during our coaching process?":
                      guidanceOnCoachingProcess,
                  };
                  CoachMentorQnA.coach_qna = qnaCoach;

                  const qnaMentor = {
                    "As a mentor, what do you think are the different career paths available in this field? What are the core skills and understanding required to continuously grow in this field?":
                      differentCareerPath,
                    "What is the problem solving approach in your domain and why do you think that is the right construct for growing in this field?":
                      problemSolvingApproachInDomain,
                    "Can you provide an overview of your mentoring approach and what I can expect from our sessions?":
                      overviewofMentoring,
                    "What opportunities for growth or advancement do you see in this field, and how can I position myself to capitalize on them?":
                      opportunitiesOfGrowth,
                    "What are some common challenges or obstacles that individuals face when pursuing success in this field, and what strategies do you suggest for overcoming them?":
                      commonChallengesOrObstacles,
                    "In your opinion, what are the key qualities or skills that contribute to success in the field I'm aiming to excel in, and how can I develop or enhance them?":
                      opinionsAboutKeyQualities,
                  };
                  CoachMentorQnA.mentor_qna = qnaMentor;

                  formdata.append(
                    "qna_for_coach_mentor",
                    JSON.stringify({
                      coach: qnaCoach,
                      mentor: qnaMentor,
                    })
                  );
                }
              } else {
                if (formVersion === "2") {
                  formdata.append("bot_type", "subject_specific_bot");
                  if (!checkIfEdit) {
                    formdata.append(
                      "bot_data",
                      JSON.stringify({
                        bot_name: botName,
                        bot_area_of_coaching: coachingArea,
                        bot_description: intakeBotDescription,
                      })
                    );
                  } else {
                    formdata.append(
                      "bot_data",
                      JSON.stringify({
                        bot_id: botIUidFromParams,
                        bot_name: botName,
                        bot_area_of_coaching: coachingArea,
                        bot_description: intakeBotDescription,
                      })
                    );
                  }
                }
                //bot specific
                // formdata.append("bot_documents", botDocs)
              }
            }
          } else if (formType === "coachee") {
            formdata.append("profile_type", profileType);
            formdata.append("coaching_level", participantLevel);
            formdata.append(
              "coach_same_department",
              `${coachMentInSameDep.toLowerCase() === "yes" ? true : false}`
            );
            formdata.append("problem_statement", `${challengesToHelp}`);
            formdata.append("supported_outcome", outcomeSupported);

            referenceDocs.forEach(({ file, text, name }) => {
              if (name === "optional_file") {
                const fileName: any = file.name;
                const fileData: any = {};
                fileData[fileName] = text;

                formdata.append("optional_file_data", JSON.stringify(fileData));
                console.log(fileData);
              }
            });
          }

          formdata.forEach((val, key) => {
            console.log(`->${key} : ${val} `);
          });
          // setCreateLoading(false);
          // return;

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
                userProfileId = result.data.uid;

                if (formType === "coach" && formVersion !== "1") {
                  myHeaders.append("Content-Type", "application/json");

                  let avatarBotCreationFormData;
                  if (formVersion === "2") {
                    avatarBotCreationFormData = {
                      bot_type: "subject_specific_bot",
                      profile_id: result.data.uid,
                      bot_name: botName,
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

                      additional_data: {
                        profile_type: "coach",
                        area_domain: areaDomain,
                        experience: experience,
                        mentoring_preferences: mentoringPreferences,
                        profile_description: about,
                        department: department,
                        youtube_links: linksReflectingWVpersonal,
                        article_links: linksReflectyouWished,
                        provide_answers_using_emojis: `${
                          provideAnswersUsingEmojis.toLowerCase() === "yes"
                            ? true
                            : false
                        }`,
                        allow_coachee_to_create_session: `${
                          allowSessionNotes.toLowerCase() === "yes"
                            ? true
                            : false
                        }`,
                        discussion_topic: discussionTopics,
                        bot_area_of_coaching: coachingArea,
                        bot_description: intakeBotDescription,
                      },
                      media_data: {
                        youtube_links: linksReflectingWVpersonal,
                        article_links: linksReflectyouWished,
                      },
                    };
                  } else if (formVersion === "3") {
                    avatarBotCreationFormData = {
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
                          ? "https://playground.coachbots.com"
                          : "https://platform.coachbots.com"
                      }`,
                      fitment_answer: `${participantLevel},${
                        coachMentInSameDep.toLowerCase() === "yes"
                          ? true
                          : false
                      },${outcomeSupported}`,
                      fitment_data: {
                        options: {
                          "1": ["Someone Senior", "Any level"],
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
                        mentoring_frameworks: mentoringPreferencess.join(", "), //coachMentFrameworks,
                        dominant_point_of_view: povProgramParticipants,
                        problem_solving_approach: problemSolvingApproach,
                        admired_leaders: leaderNames,
                        profile_description: about,
                        department: department,
                        youtube_links: linksReflectingWVpersonal,
                        article_links: linksReflectyouWished,
                        voice_sample: voiceSample,
                        discuss_how_you_helped_others_in_coachMentoring:
                          discussInCARformat,
                        journey_and_background: journeyAndBackground,
                        provide_answers_using_emojis: `${
                          provideAnswersUsingEmojis.toLowerCase() === "yes"
                            ? true
                            : false
                        }`,
                        common_phrases_and_expressions: phrasesNExpressions,
                        significant_challenges_and_solutions:
                          significantChallenges,
                        allow_coachee_to_create_session: `${
                          allowSessionNotes.toLowerCase() === "yes"
                            ? true
                            : false
                        }`,
                        fitment_answers: {
                          coachmentSelect,
                          participantLevel,
                          coachMentInSameDep,
                          outcomeSupported,
                        },
                        coach_qna: CoachMentorQnA.coach_qna,
                        mentor_qna: CoachMentorQnA.mentor_qna,
                        discussion_topic: discussionTopics,
                      },
                      media_data: {
                        youtube_links: linksReflectingWVpersonal,
                        article_links: linksReflectyouWished,
                      },
                    };
                  }

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
                        [...referenceDocs, ...botDocs].forEach(
                          ({ file, text, name }) => {
                            console.log("name", name);
                            console.log("file", file.name);
                            if (name === "optional_file") {
                              filesPatchFormData.append(
                                "optional_file",
                                `file_name:${file.name} text_file:${text}`
                              );
                              console.log(text);
                            } else if (name === "bot_files") {
                              filesPatchFormData.append(
                                "bot_docs",
                                `file_name:${file.name} text_file:${text}`
                              );
                            } else {
                              if (file.name.includes(".pdf")) {
                                if (text) {
                                  filesPatchFormData.append(
                                    "pdf_data",
                                    `file_name:${file.name} text_file:${text}`
                                  );
                                  console.log(text);
                                } else {
                                  filesPatchFormData.append(
                                    `attached_pdfs`,
                                    file,
                                    file.name.trim()
                                  );
                                }
                              } else if (file.name.includes(".docx")) {
                                if (text) {
                                  filesPatchFormData.append(
                                    `doc_data`,
                                    `file_name:${file.name} text_file:${text}`
                                  );
                                  console.log(text);
                                } else {
                                  filesPatchFormData.append(
                                    `attached_docs`,
                                    file,
                                    file.name.trim()
                                  );
                                }
                              }
                            }
                          }
                        );

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
                              if (formVersion === "1") {
                                toast.success(
                                  "Your profile has been successfully created!",
                                  {
                                    duration: 6000,
                                  }
                                );
                              } else {
                                toast.success(
                                  "Your request in is the AI review pipeline and will be available in Network Directory shortly. You will receive a email when its live.",
                                  {
                                    duration: 6000,
                                  }
                                );
                              }

                              resetAllStates();
                              getAllDirectoryData();
                              setTimeout(() => {
                                router.push("/");
                              }, 4000);
                            } else {
                              setCreateLoading(false);
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

                            throw new Error("Error creating coach profile");
                          });
                      } else {
                        setCreateLoading(false);
                        if (data.error === "Bot already exists") {
                          toast.error("Bot already exists");
                        } else {
                          setCreateLoading(false);
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

                      throw new Error("Error creating coach profile");
                    });
                } else {
                  resetAllStates();
                  setCreateLoading(false);
                  toast.success("Your profile has been successfully created!", {
                    duration: 6000,
                  });
                  setTimeout(() => {
                    getAllDirectoryData();
                    router.push("/");
                  }, 4000);
                }
              })
              .catch((error) => {
                console.log("error", error);
                setCreateLoading(false);
                toast.error(
                  "Error creating your coach profile. Please try again."
                );

                throw new Error("Error creating coach profile");
              });
          } else {
            console.log("edit", myHeaders);
            // Create a plain JavaScript object
            const formDataObject: { [key: string]: any } = {};
            formdata.forEach((value, key) => {
              formDataObject[key] = value;
            });
            if (formType === "coachee") {
              // deleting optional file
              let deletingOptionalFiles: string = "";
              if (optionalMediaData?.extracted_from_optional_file) {
                deletingOptionalFiles =
                  optionalMediaData?.extracted_from_optional_file
                    .map((item) => {
                      if (item.isDeleted) {
                        return item.fileName;
                      }
                    })
                    .filter((item) => item !== undefined)
                    .join(",");
              }
              interface UpdatedOptionalFile {
                [key: string]: any;
              }
              if (deletingOptionalFiles) {
                console.log("del", deletingOptionalFiles, updatedOptionalFile);
                let updateOptionalFile: UpdatedOptionalFile = {
                  ...updatedOptionalFile,
                }; // Create a shallow copy to avoid mutating the original object

                if (deletingOptionalFiles) {
                  deletingOptionalFiles.split(",").forEach((fileName) => {
                    delete updateOptionalFile[fileName];
                  });
                }

                console.log(updateOptionalFile, formdata);

                formDataObject["optional_file_data"] =
                  JSON.stringify(updateOptionalFile);
              }
            }

            // Convert the object to JSON
            var formDataJSON = JSON.stringify(formDataObject);
            console.log(
              formDataObject,
              "===================profile to update ============================="
            );
            // if (formType === "coachee") {
            myHeaders.append("Content-Type", "application/json");
            // }

            let reapproval = "false";
            if (
              formType === "coach" &&
              clientInfoData?.user_info[0].send_profile_for_reapproval
            ) {
              reapproval = "true";
            }
            console.log(reapproval, clientInfoData, "clientInfoData");
            fetch(
              `${baseURL}/accounts/coach-coachee-mentor-mentee-profile/?profile_id=${userProfileId}&for_reapproval=${reapproval}`,
              {
                method: "PATCH",
                headers: myHeaders,
                body: formDataJSON,
              }
            )
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                if (!data.error) {
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

                  if (formType === "coach") {
                    // myHeaders.append("Content-Type", "application/json");
                    // const avatarBotCreationFormData = {
                    //   bot_type: "avatar_bot",
                    //   profile_id: userProfileId,
                    //   bot_name: name,
                    //   email: user.email,
                    //   bot_details: { info: about, coach_name: name },
                    //   attributes: {
                    //     heading: `welcome to ${name}'s avatar bot`,
                    //   },
                    //   participant_id: userId,
                    //   bot_base_url: `${
                    //     subdomain === "playground"
                    //       ? "https://playground.coachbots.com"
                    //       : "https://platform.coachbots.com"
                    //   }`,
                    //   fitment_answer: `${participantLevel},${
                    //     coachMentInSameDep === "yes" ? true : false
                    //   },${outcomeSupported}`,
                    //   fitment_data: {
                    //     options: {
                    //       "1": ["Someone Senior", "Any level"],
                    //       "2": ["Yes", "No"],
                    //       "3": [
                    //         "Career advancement",
                    //         "Skill development",
                    //         "Introspection & reflection",
                    //         "Networking & leadership",
                    //       ],
                    //     },
                    //     mentee_que: {
                    //       "1": "What level of coach & mentor do you want?",
                    //       "2": "I want a coach & mentor someone from the same department.",
                    //       "3": "What kind of outcome do you want from these sessions the most?",
                    //     },
                    //     mentor_que: {
                    //       "1": "What level of participant do you want to coach & mentor?",
                    //       "2": "I want to coach & mentor someone in the same department.",
                    //       "3": "What kind of outcome can you support in these sessions the most?",
                    //     },
                    //   },
                    //   additional_data: {
                    //     profile_type: "coach",
                    //     area_domain: areaDomain,
                    //     experience: experience,
                    //     mentoring_preferences: mentoringPreferences,
                    //     mentoring_frameworks: mentoringPreferencess.join(", "),
                    //     dominant_point_of_view: povProgramParticipants,
                    //     problem_solving_approach: problemSolvingApproach,
                    //     admired_leaders: leaderNames,
                    //     profile_description: about,
                    //     department: department,
                    //     youtube_links: linksReflectingWVpersonal,
                    //     article_links: linksReflectyouWished,
                    //     voice_sample: voiceSample,
                    //     discuss_how_you_helped_others_in_coachMentoring:
                    //       discussInCARformat,
                    //     journey_and_background: journeyAndBackground,
                    //     provide_answers_using_emojis: `${
                    //       provideAnswersUsingEmojis === "yes" ? true : false
                    //     }`,
                    //     allow_coachee_to_create_session: `${
                    //       allowSessionNotes === "yes" ? true : false
                    //     }`,
                    //     fitment_answers: {
                    //       coachmentSelect,
                    //       participantLevel,
                    //       coachMentInSameDep,
                    //       outcomeSupported,
                    //     },
                    //     coach_qna: CoachMentorQnA.coach_qna,
                    //     mentor_qna: CoachMentorQnA.mentor_qna,
                    //   },
                    //   media_data: {
                    //     youtube_links: linksReflectingWVpersonal,
                    //     article_links: linksReflectyouWished,
                    //   },
                    // };

                    // fetch(`${baseURL}/accounts/create-bot-by-details/`, {
                    //   method: checkIfEdit ? "PATCH" : "POST",
                    //   headers: myHeaders,
                    //   body: checkIfEdit
                    //     ? JSON.stringify({
                    //         bot_id: botIUidFromParams,
                    //         profile_id: userProfileId,
                    //         updated_data: avatarBotCreationFormData,
                    //         is_overwrite: deleteExistingFiles ? "true" : "false",
                    //       })
                    //     : JSON.stringify(avatarBotCreationFormData),
                    // })
                    //   .then((res) => res.json())
                    //   .then((data) => {
                    //     console.log(data);
                    //     // setCreateLoading(false);
                    //     if (!data.error && !data.detail) {
                    console.log(referenceDocs.length, "length");
                    if (
                      referenceDocs.length > 0 ||
                      linksReflectingWVpersonal !== "" ||
                      linksReflectyouWished !== "" ||
                      mediaData?.extracted_from_article ||
                      mediaData?.extracted_from_youtube ||
                      mediaData?.extracted_from_pdf
                    ) {
                      const filesPatchFormData = new FormData();
                      if (referenceDocs.length > 0) {
                        referenceDocs.forEach(({ file, text, name }) => {
                          if (name === "optional_file") {
                            filesPatchFormData.append(
                              "optional_file",
                              `file_name:${file.name} text_file:${text}`
                            );
                            console.log(text);
                          } else {
                            if (file.name.includes(".pdf")) {
                              if (text) {
                                filesPatchFormData.append(
                                  "pdf_data",
                                  `file_name:${file.name.trim()} text_file:${text}`
                                );
                                console.log(text);
                              } else {
                                filesPatchFormData.append(
                                  `attached_pdfs`,
                                  file,
                                  file.name.trim()
                                );
                              }
                            } else if (file.name.includes(".docx")) {
                              if (text) {
                                filesPatchFormData.append(
                                  `doc_data`,
                                  `file_name:${file.name.trim()} text_file:${text}`
                                );
                                console.log(text);
                              } else {
                                filesPatchFormData.append(
                                  `attached_docs`,
                                  file,
                                  file.name.trim()
                                );
                              }
                            }
                          }
                        });
                      }

                      let deletingDocs: string = "";
                      let deletingPdfs: string = "";
                      if (mediaData?.extracted_from_pdf) {
                        deletingDocs = mediaData?.extracted_from_pdf
                          .map((item) => {
                            if (
                              item.isDeleted &&
                              item.fileName.includes(".docx")
                            ) {
                              return item.fileName;
                            }
                          })
                          .filter((item) => item !== undefined)
                          .join(",");

                        deletingPdfs = mediaData?.extracted_from_pdf
                          .map((item) => {
                            if (
                              item.isDeleted &&
                              item.fileName.includes(".pdf")
                            ) {
                              return item.fileName;
                            }
                          })
                          .filter((item) => item !== undefined)
                          .join(",");
                      }

                      let deletingArticleLinks: string = "";
                      if (mediaData?.extracted_from_article) {
                        deletingArticleLinks = mediaData?.extracted_from_article
                          .map((item) => {
                            if (item.isDeleted) {
                              return item.fileName;
                            }
                          })
                          .filter((item) => item !== undefined)
                          .join(",");
                      }

                      let deletingYoutubeLinks: string = "";
                      if (mediaData?.extracted_from_youtube) {
                        deletingYoutubeLinks = mediaData?.extracted_from_youtube
                          .map((item) => {
                            if (item.isDeleted) {
                              return item.fileName;
                            }
                          })
                          .filter((item) => item !== undefined)
                          .join(",");
                      }

                      let deletingOptionalFiles: string = "";
                      if (optionalMediaData?.extracted_from_optional_file) {
                        deletingOptionalFiles =
                          optionalMediaData?.extracted_from_optional_file
                            .map((item) => {
                              if (item.isDeleted) {
                                return item.fileName;
                              }
                            })
                            .filter((item) => item !== undefined)
                            .join(",");
                      }

                      const deletedData = {
                        pdf_files: deletingPdfs,
                        youtube_links: deletingYoutubeLinks,
                        article_links: deletingArticleLinks,
                        doc_files: deletingDocs,
                        optional_files: deletingOptionalFiles,
                      };

                      console.log(deletedData);
                      filesPatchFormData.append(
                        "deleted_data",
                        JSON.stringify(deletedData)
                      );

                      filesPatchFormData.append("bot_id", botIUidFromParams!);
                      const media_data = {
                        youtube_links: linksReflectingWVpersonal,
                        article_links: linksReflectyouWished,
                      };

                      filesPatchFormData.append(
                        "media_data",
                        JSON.stringify(media_data)
                      );
                      filesPatchFormData.append(
                        "is_overwrite",
                        "false"
                        // deleteExistingFiles ? "true" : "false"
                      );
                      filesPatchFormData.append(
                        "profile_id",
                        `${userProfileId}`
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
                            toast.loading(
                              "Successfully updated your profile. Redirecting you to your Profile page.",
                              {
                                duration: 10000,
                                style: {
                                  backgroundColor: "#EBFDF2",
                                  color: "#008A2E",
                                },
                              }
                            );
                            resetAllStates();
                            setTimeout(() => {
                              getAllDirectoryData();
                              router.push("/profile");
                            }, 10000);
                          } else {
                            setCreateLoading(false);
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

                          throw new Error("Error creating coach profile");
                        });
                    } else {
                      setCreateLoading(false);
                      toast.success(
                        "Successfully updated your profile. Redirecting you to your Profile page.",
                        {
                          duration: 6000,
                        }
                      );
                      resetAllStates();
                      setTimeout(() => {
                        router.push("/profile");
                      }, 4000);
                    }
                    //   } else {
                    //     setCreateLoading(false);
                    //     if (data.error === "Bot already exists") {
                    //       toast.error("Bot already exists");
                    //     } else {
                    //       setCreateLoading(false);
                    //       toast.error(
                    //         "Error creating your coach profile. Please try again.",
                    //         {
                    //           duration: 6000,
                    //         }
                    //       );
                    //     }
                    //   }
                    // })
                    // .catch((err) => {
                    //   console.error(err);
                    //   setCreateLoading(false);
                    // });
                  } else {
                    resetAllStates();
                    setCreateLoading(false);
                    toast.success(
                      "Successfully updated your profile. Redirecting you to your Profile page.",
                      {
                        duration: 6000,
                      }
                    );
                    setTimeout(() => {
                      router.push("/profile");
                    }, 4000);
                  }
                } else {
                  toast.error(
                    "Error creating your coach profile. Please try again.",
                    {
                      duration: 6000,
                    }
                  );
                  setCreateLoading(false);
                }
              })
              .catch((err) => {
                console.error(err);
                toast.error("Error updating your profile. Please try again.");
                setCreateLoading(false);

                throw new Error("Error updating coach profile");
              });
          }
        }
      } else {
        toast.warning("Please select the high and low skills");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating your coach profile. Please try again.");
      setCreateLoading(false);
    }
  };

  const createFeedbackSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (characteristicsRateHigh && characteristicsRateLows) {
      if (user) {
        console.log("user feedback", user);
        setFeedbackCreateLoading(true);
        var myHeaders = new Headers();
        myHeaders.append("Authorization", basicAuth);

        var requestOptions = {
          method: "GET",
          headers: myHeaders,
        };
        fetch(
          `${baseURL}/accounts/coach-coachee-mentor-mentee-profile/?user_id=${userId}`,
          requestOptions
        )
          .then((response) => response.json())
          .then((result) => {
            console.log("feedback bot profile data", result);
            userProfileId = result.data.length > 0 ? result.data[0].uid : null;
            console.log(userProfileId);
            var feedbackFormdata = {
              bot_type: "feedback_bot",
              bot_name: name,
              profile_id: userProfileId,
              email: userEmailParams ? userEmailParams : user.email,
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
              low_rating_characteristics: characteristicsRateLows,
              high_rating_characteristics: characteristicsRateHigh,
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
                    setTimeout(() => {
                      router.push("/profile");
                    }, 4000);
                  } else {
                    toast.loading(
                      "Your feedback bot will be published soon and will be available via your profile/network. You may need to refresh.",
                      {
                        duration: 10000,
                        style: {
                          backgroundColor: "#EBFDF2",
                          color: "#008A2E",
                        },
                      }
                    );
                    setTimeout(() => {
                      // getFeedbackBotsData();
                      getAllDirectoryData();
                      router.push("/");
                    }, 10000);
                  }
                  resetAllStates();
                } else {
                  toast.error(
                    "Error creating your feedback bot. Please try again.",
                    {
                      duration: 6000,
                    }
                  );
                }
              })
              .catch((err) => {
                console.error(err);
                if (checkIfEdit) {
                  toast.error(
                    "Error Updating your feedback bot. Please try again.",
                    {
                      duration: 6000,
                    }
                  );

                  throw new Error("Error updating feedback bot");
                } else {
                  toast.error(
                    "Error creating your feedback bot. Please try again.",
                    {
                      duration: 6000,
                    }
                  );
                  throw new Error("Error updating feedback bot");
                }
              });
          });
      }
    } else {
      toast.warning("Please select the high and low skills");
    }
  };

  const onCharacteristicsSelectLow = (
    val: string,
    tempCharacteristics?: any
  ) => {
    setCharacteristicsRateLows(val);
    setDataModified(true);
    const characteristics: any =
      characteristicsList.length > 0
        ? characteristicsList
        : tempCharacteristics;
    const resetDisabledData = characteristics.map((option: any) => ({
      ...option,
      disabled: false,
    }));

    console.log("resetDisabledData : ", resetDisabledData);

    const selectedValueIndex = resetDisabledData.findIndex(
      (option: any) => option.value === val
    );

    console.log("selectedValueIndex : ", selectedValueIndex);

    if (selectedValueIndex !== -1) {
      resetDisabledData[selectedValueIndex] = {
        ...resetDisabledData[selectedValueIndex],
        disabled: true,
      };
    }

    console.log("resetDisabledData AA : ", resetDisabledData);

    setCharacteristicsList(resetDisabledData);
  };

  const onCharacteristicsSelectHigh = (
    val: string,
    tempCharacteristics?: any
  ) => {
    console.log(val);
    setDataModified(true);
    setCharacteristicsRateHigh(val);

    const characteristics: any =
      characteristicsList.length > 0
        ? characteristicsList
        : tempCharacteristics;

    const resetDisabledData = characteristics.map((option: any) => ({
      ...option,
      disabled: false,
    }));

    const selectedValueIndex = resetDisabledData.findIndex(
      (option: any) => option.value === val
    );

    if (selectedValueIndex !== -1) {
      resetDisabledData[selectedValueIndex] = {
        ...resetDisabledData[selectedValueIndex],
        disabled: true,
      };
    }
    setCharacteristicsList(resetDisabledData);
  };

  //handling edit
  useEffect(() => {
    // if ((formType === "coach") && formVersion === null) return;
    const coachtalk = document.getElementsByClassName("coachbots-coachtalk")[0];
    const coachScribe = document.getElementsByClassName(
      "coachbots-coachscribe"
    )[0];
    coachtalk.setAttribute("style", "display: none;");
    coachScribe.setAttribute("style", "display: none;");
    // setLoading(true);

    if (user && !adminEdit) {
      getClientInfoForUser(user.email);
    } else if (adminEdit && userEmailParams) {
      getClientInfoForUser(userEmailParams);
    }

    console.log("hello 1");
    if (checkIfEdit === "true" || checkIfView === "true") {
      console.log("hello 2");
      if (formType === "feedback") {
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
            let user_id = userIdParams ? userIdParams : data.uid;
            fetch(`${baseURL}/accounts/get-bots/?user_id=${user_id}`, {
              headers: {
                Authorization: basicAuth,
              },
            })
              .then((res) => res.json())
              .then((data) => {
                let resultingBot = getBotById(botIdFromParams!, data.data);

                console.log("Bot details for edit - Feedback", data);
                if (!adminEdit) {
                  setName(
                    `${user.given_name} ${
                      user.family_name ? user.family_name : ""
                    }`
                  );
                }
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
                setLoading(false);
              });
          });
      } else if (formType === "coach" && noCopilotBot !== "1") {
        console.log("hello 3");
        console.log(formType);
        getUserAccount(user)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            const user_id = userIdParams ? userIdParams : data.uid;
            fetch(
              `${baseURL}/accounts/get-bots/?user_id=${user_id}&approved_only=false`,
              {
                headers: {
                  Authorization: basicAuth,
                },
              }
            )
              .then((res) => res.json())
              .then((dataa) => {
                const resultingBot = getBotById(botIdFromParams!, dataa.data);

                console.log("Bot details for edit - Coach", resultingBot);
                if (!adminEdit) {
                  setName(
                    `${user.given_name} ${
                      user.family_name ? user.family_name : ""
                    }`
                  );
                }
                setProfileType(profileTypeFromParams!);
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
                  resultingBot.signature_bot.data.additional_data.area_domain.trim()
                );

                setDiscussionTopics(
                  resultingBot.signature_bot.data.additional_data
                    .discussion_topic
                );
                // setAreaDomain(
                //   resultingBot.signature_bot.data.additional_data.area_domain
                //     ?.split(",")
                //     .map((item: string) => item.trim())
                //     .filter((item: string) => item.length > 0)
                // );
                setSignificantChallenges(
                  resultingBot.signature_bot.data.additional_data
                    .significant_challenges_and_solutions
                );

                setMentoringPreferences(
                  resultingBot.signature_bot.data.additional_data.mentoring_preferences.trim()
                );

                setMentoringPreferencess(
                  resultingBot.signature_bot.data.additional_data.mentoring_frameworks
                    ?.replace(`"`, "")
                    .split(",")
                    .map((item: string) =>
                      replaceSpecialCharacters(item.trim())
                    )
                    .filter((item: string) => item.length > 0) || []
                );
                console.log(
                  resultingBot.signature_bot.data.additional_data
                    .mentoring_frameworks
                );
                console.log(
                  resultingBot.signature_bot.data.additional_data.mentoring_frameworks
                    ?.replace(`"`, "")
                    .split(",")
                    .map((item: string) =>
                      replaceSpecialCharacters(item.trim())
                    )
                    .filter((item: string) => item.length > 0)
                );
                setPovProgramParticipants(
                  resultingBot.signature_bot.data.additional_data.dominant_point_of_view?.trim()
                );
                setProblemSolvingApproach(
                  resultingBot.signature_bot.data.additional_data.problem_solving_approach?.trim()
                );
                setDiscussInCARformat(
                  resultingBot.signature_bot.data.additional_data.discuss_how_you_helped_others_in_coachMentoring?.trim()
                );
                setJourneyAndBackground(
                  resultingBot.signature_bot.data.additional_data.journey_and_background?.trim()
                );
                // if (checkIfView) {
                //   setLinksReflectingWVpersonal(
                //     resultingBot.signature_bot.data.additional_data
                //       .youtube_links
                //   );
                //   setLinksReflectyouWished(
                //     resultingBot.signature_bot.data.additional_data
                //       .article_links
                //   );
                // }
                setMediaData(
                  transformExtractedData(
                    resultingBot.signature_bot.data.media_data
                  )
                );

                console.log(
                  transformExtractedData(
                    resultingBot.signature_bot.data.media_data
                  )
                );

                setOptionalMediaData(
                  transformExtractedOptional(
                    resultingBot.bot_attributes.extracted_documents
                  )
                );

                setLeaderNames(
                  resultingBot.signature_bot.data.additional_data.admired_leaders?.trim()
                );
                setVoiceSample(
                  [true, "true", "True"].includes(
                    resultingBot.signature_bot.data.additional_data.voice_sample
                  )
                    ? "Yes"
                    : "No"
                );

                setProvideAnswersUsingEmojis(
                  [true, "true", "True"].includes(
                    resultingBot.signature_bot.data.additional_data
                      .provide_answers_using_emojis
                  )
                    ? "Yes"
                    : "No"
                );
                setAllowSessionNotes(
                  [true, "true", "True"].includes(
                    resultingBot.signature_bot.data.additional_data
                      .allow_coachee_to_create_session
                  )
                    ? "Yes"
                    : "No"
                );
                // setCoachMentSelect(
                //   resultingBot.signature_bot.data.additional_data
                //     .fitment_answers?.coachmentSelect
                // );
                console.log("FORM version : ", switchState.from);
                if (switchState.from === "3") {
                  setParticipantLevel(
                    resultingBot.signature_bot.data.additional_data
                      .fitment_answers[0]
                  );

                  setCochMentInSameDep(
                    [true, "true", "True"].includes(
                      resultingBot.signature_bot.data.additional_data
                        .fitment_answers[1]
                    )
                      ? "Yes"
                      : "No"
                  );

                  setOutcomeSupported(
                    resultingBot.signature_bot.data.additional_data
                      .fitment_answers[2]
                  );
                }
                // if (formVersion === "2") {
                setBotName(resultingBot.bot_attributes?.bot_name || "");
                setIntakeBotDescription(
                  resultingBot.signature_bot.data.additional_data
                    ?.bot_description || ""
                );
                setCoachingArea(
                  resultingBot.signature_bot.data.additional_data
                    ?.bot_area_of_coaching || ""
                );
                // }
                // setCochMentInSameDep(
                //   resultingBot.signature_bot.data.additional_data
                //     .fitment_answers?.coachMentInSameDep
                // );

                // setOutcomeSupported(
                //   resultingBot.signature_bot.data.additional_data
                //     .fitment_answers?.outcomeSupported
                // );

                setPhrasesNExpressions(
                  resultingBot.signature_bot.data.additional_data
                    ?.common_phrases_and_expressions
                );

                const coach_qna =
                  resultingBot.signature_bot.data.additional_data?.coach_qna;

                //coaching and mentoring QnA's
                if (coach_qna) {
                  setFoundationalValues(
                    coach_qna[
                      "As a coach, what foundational values do you believe individuals should prioritize and strive for in their personal and professional development journey?"
                    ]
                  );
                  setDevelopmentFrameworks(
                    coach_qna[
                      "In your role as a coach, what kind of developmental framework do you employ, and why do you consider it to be the optimal framework for facilitating personal growth ?"
                    ]
                  );
                  setCoachingProcessOverview(
                    coach_qna[
                      "Can you provide an overview of your coaching process and what I can expect from our sessions?"
                    ]
                  );
                  setHandlingSituations(
                    coach_qna[
                      "How do you handle situations where I feel stuck or unsure about my next steps?"
                    ]
                  );
                  setIntegratongLessons(
                    coach_qna[
                      "How can I integrate the lessons from these sessions into my daily life?"
                    ]
                  );
                  setGuidanceOnCoachingProcess(
                    coach_qna[
                      "Can you provide guidance on how to effectively balance personal and professional goals during our coaching process?"
                    ]
                  );
                }

                const mentor_qna =
                  resultingBot.signature_bot.data.additional_data?.mentor_qna;

                if (mentor_qna) {
                  setDifferentCareerPath(
                    mentor_qna[
                      "As a mentor, what do you think are the different career paths available in this field? What are the core skills and understanding required to continuously grow in this field?"
                    ]
                  );
                  setProblemSolvingApproachInDomain(
                    mentor_qna[
                      "What is the problem solving approach in your domain and why do you think that is the right construct for growing in this field?"
                    ]
                  );
                  setOverviewOfMentoring(
                    mentor_qna[
                      "Can you provide an overview of your mentoring approach and what I can expect from our sessions?"
                    ]
                  );
                  setOpportunitiesOfGrowth(
                    mentor_qna[
                      "What opportunities for growth or advancement do you see in this field, and how can I position myself to capitalize on them?"
                    ]
                  );
                  setCommenChallengesOrObstacles(
                    mentor_qna[
                      "What are some common challenges or obstacles that individuals face when pursuing success in this field, and what strategies do you suggest for overcoming them?"
                    ]
                  );
                  setOpinionsAboutKeyQualities(
                    mentor_qna[
                      "In your opinion, what are the key qualities or skills that contribute to success in the field I'm aiming to excel in, and how can I develop or enhance them?"
                    ]
                  );
                }
                setLoading(false);
              });
          });
      } else if (formType === "coachee" || noCopilotBot === "1") {
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
                console.log(data);
                const resultingBot = data.data;
                console.log(
                  "Bot details for edit - coachee || no-copilot",
                  resultingBot
                );
                if (!adminEdit) {
                  setName(
                    `${user.given_name} ${
                      user.family_name ? user.family_name : ""
                    }`
                  );
                }
                setAbout(resultingBot.about?.trim());
                setExperience(resultingBot.experience);
                setProfileType(resultingBot.profile_type);
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

                setDiscussionTopics(resultingBot.discussion_topic);

                setParticipantLevel(resultingBot.coaching_level);
                setCochMentInSameDep(
                  [true, "true", "True"].includes(
                    resultingBot.coach_same_department
                  )
                    ? "Yes"
                    : "No"
                );

                setOutcomeSupported(resultingBot.supported_outcome);

                setDepartment(resultingBot.department);

                setChallengesToHelp(resultingBot.problem_statement);
                setOptionalMediaData(
                  transformExtractedOptionalCoachee(
                    resultingBot.optional_file_data
                  )
                );
                if (resultingBot.optional_file_data) {
                  setUpdatedOptionalFile(resultingBot.optional_file_data);
                }

                if (noCopilotBot === "1") {
                  setAreaDomain(resultingBot.area_domain);
                  setAllowSessionNotes(
                    resultingBot.allow_coachee_to_create_session
                  );

                  setAllowSessionNotes(
                    [true, "true", "True"].includes(
                      resultingBot.allow_coachee_to_create_session
                    )
                      ? "Yes"
                      : "No"
                  );
                }
                setLoading(false);
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
    const inputValue = input_value.trim();
    const words = inputValue.split(/\s+/);
    const wordCount = words.length;
    setDataModified(true);

    if (wordCount >= minLimit) {
      setError((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    } else if (wordCount < minLimit) {
      setError((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `Minimum ${minLimit} words are required.`,
      }));
    }
  };

  const handleRequiredSelections = async (profile_type = "coach") => {
    let coachFields;
    console.log("formversion: ", formVersion);

    if (formVersion === "1") {
      coachFields = [
        { UserDepartment: department },
        { UserAreaDomain: areaDomain },
        { UserExperience: experience },
        { AllowActionPlan: allowSessionNotes },
        { LowCompetency: characteristicsRateLows },
        { HighCompetency: characteristicsRateHigh },
      ];
    } else if (formVersion === "2") {
      console.log("here");
      coachFields = [
        { UseEmoji: provideAnswersUsingEmojis },
        { UserDepartment: department },
        { UserAreaDomain: areaDomain },
        { UserExperience: experience },
        { AllowActionPlan: allowSessionNotes },
        { LowCompetency: characteristicsRateLows },
        { HighCompetency: characteristicsRateHigh },
      ];
    } else {
      coachFields = [
        { SupportOutcome: outcomeSupported },
        { coachSameDepartment: coachMentInSameDep },
        { ParticipantLevel: participantLevel },
        { UseEmoji: provideAnswersUsingEmojis },
        { MentoringFramework: mentoringPreferencess },
        // { UserMentoringPre: mentoringPreferences },
        { UserDepartment: department },
        { UserAreaDomain: areaDomain },
        { UserExperience: experience },
        { AllowActionPlan: allowSessionNotes },
        { LowCompetency: characteristicsRateLows },
        { HighCompetency: characteristicsRateHigh },
      ];
    }

    const coacheeFields = [
      { SupportOutcome: outcomeSupported },
      { coachSameDepartment: coachMentInSameDep },
      { ParticipantLevel: participantLevel },
      { UserExperience: experience },
      { UserDepartment: department },
    ];

    let errors = [];

    const listOfFields = profile_type === "coach" ? coachFields : coacheeFields;

    console.log(`list of fields for ${profile_type}`, listOfFields);
    for (let field of listOfFields) {
      // Using Object.entries to loop over the keys and values
      for (let [key, value] of Object.entries(field)) {
        // Check if value is empty
        if (value?.length <= 0 || value === undefined || value === null) {
          errors.push(`${value} field required`);
        }

        // Await the asynchronous handleRequiredSelection function
        await handleRequiredSelection(value, key);
      }
    }
    console.log(`Got errors: ${errors}`);
    return errors.length === 0;
  };

  const handleRequiredSelection = async (
    input_value: string,
    fieldName: string,
    errorMessage = "This field is required."
  ) => {
    console.log("input_value", input_value);
    if (input_value?.length > 0) {
      setDataModified(true);
      setError((prevErrors) => ({
        ...prevErrors,
        [fieldName]: "",
      }));
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `This field is required.`,
      }));
    }
  };

  const handleWordLimitMin = (
    input_value: string,
    minLimit: number,
    fieldName: string
  ) => {
    const inputValue = input_value;
    setDataModified(true);

    if (inputValue.trim().split(" ").length >= minLimit) {
      setError((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `Minimum ${minLimit} words are required.`,
      }));
    }
  };

  const handleInputLinks = (input_value: string, fieldName: string) => {
    const inputValue = input_value;
    setDataModified(true);

    if (fieldName === "linksReflectingWVpersonal") {
      if (isValidYoutubeLinks(inputValue)) {
        setError((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
      } else {
        setError((prevErrors) => ({
          ...prevErrors,
          [fieldName]: `Please enter the valid youtube link(s).`,
        }));
      }
    } else if (fieldName === "linksReflectyouWished") {
      if (isValidLinks(inputValue)) {
        setError((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
      } else {
        setError((prevErrors) => ({
          ...prevErrors,
          [fieldName]: `Please enter the valid article link(s).`,
        }));
      }
    }
  };

  const handleDiscussionTopics = (input: string, fieldName: string) => {
    const inputValuesArr = input.split(", ");
    if (inputValuesArr.length > 5) {
      setError((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `Maximum 5 topics could be added.`,
      }));
    } else {
      setError((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    }
  };

  const handleProblemStatement = (input: string, fieldName: string) => {
    const inputValuesArr = input.split(", ");
    if (inputValuesArr.length > 2) {
      setError((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `Maximum 2 challenges could be added.`,
      }));
    } else {
      setError((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    }
  };

  const deleteMediaDataHandler = (fileName: string) => {
    const updatedData: any = { ...mediaData };
    setDataModified(true);

    for (const category in updatedData) {
      if (Array.isArray(updatedData[category])) {
        const categoryItems = updatedData[category];
        const updatedCategoryItems = categoryItems.map((item: any) =>
          item.fileName === fileName ? { ...item, isDeleted: true } : item
        );
        updatedData[category] = updatedCategoryItems;
      }
    }

    setMediaData(updatedData);
  };

  const undoDeleteMediaDataHandler = (fileName: string) => {
    const updatedData: any = { ...mediaData };

    for (const category in updatedData) {
      if (Array.isArray(updatedData[category])) {
        const categoryItems = updatedData[category];
        const updatedCategoryItems = categoryItems.map((item: any) =>
          item.fileName === fileName ? { ...item, isDeleted: false } : item
        );
        updatedData[category] = updatedCategoryItems;
      }
    }

    setMediaData(updatedData);
  };

  const deleteOptionalMediaDataHandler = (fileName: string) => {
    const updatedData: any = { ...optionalMediaData };
    setDataModified(true);

    for (const category in updatedData) {
      if (Array.isArray(updatedData[category])) {
        const categoryItems = updatedData[category];
        const updatedCategoryItems = categoryItems.map((item: any) =>
          item.fileName === fileName ? { ...item, isDeleted: true } : item
        );
        updatedData[category] = updatedCategoryItems;
      }
    }

    setOptionalMediaData(updatedData);
  };

  const undoDeleteOptionalMediaDataHandler = (fileName: string) => {
    const updatedData: any = { ...optionalMediaData };

    for (const category in updatedData) {
      if (Array.isArray(updatedData[category])) {
        const categoryItems = updatedData[category];
        const updatedCategoryItems = categoryItems.map((item: any) =>
          item.fileName === fileName ? { ...item, isDeleted: false } : item
        );
        updatedData[category] = updatedCategoryItems;
      }
    }

    setOptionalMediaData(updatedData);
  };

  const handleImageUpload = async (imageToUpload: File) => {
    const formData = new FormData();
    formData.append("image_file", imageToUpload, imageToUpload.name);

    const response = await fetch(`${baseURL}/documents/upload-image/`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: basicAuth,
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData.image_url;
    } else {
      return "https://res.cloudinary.com/dtbl4jg02/image/upload/v1715941993/naqedaza5tw8isro11qr.png";
    }
  };

  const setFormVersion = (version: string) => {
    const query = new URLSearchParams(window.location.search); // Get existing query params
    query.set("v", version); // Set or update the formVersion param
    router.push(`${window.location.pathname}?${query.toString()}`);
    formVersion = version;
  };

  return (
    <div className="bg-white min-h-[120vh] h-full max-sm:h-full max-sm:min-h-screen pb-16">
      <div className="fixed w-full flex items-center justify-end p-4 h-6 py-8 !z-[800]">
        <div className="ml-4">
          {checkIfEdit === "true" ||
          checkIfView === "true" ||
          adminEdit === "true" ? (
            <NavProfileWoProfile user={user} />
          ) : (
            <>
              <NetworkNav restrictedPages={restrictedFeatures} user={user} />
            </>
          )}
        </div>
      </div>
      {loading && (
        <div className="fixed left-0 top-0 flex h-screen w-screen overflow-x-hidden items-center justify-center bg-foreground/30 backdrop-blur-md z-50">
          <div className="p-2 bg-gray-300 rounded-md text-sm">
            <Loader className="h-4 w-4 mr-2 animate-spin inline" />
            Please wait. We are fetching your Data.
          </div>
        </div>
      )}

      {(checkIfEdit === "true" || checkIfView === "true") && (
        <div className="fixed left-20 top-14">
          <Button
            variant={"secondary"}
            className="border border-gray-300 text-sm max-sm:hidden"
            onClick={() => {
              router.push("/profile");
            }}
          >
            <ChevronLeft className="inline mr-1" /> Go Back
          </Button>
        </div>
      )}

      <MaxWidthWrapper className="flex pt-10 flex-col items-center justify-center text-center">
        <h1 className="text-[#2DC092] border-2 border-[#2DC092] p-[3px] text-xl font-extrabold mt-10 mb-6">
          <span className="bg-[#2DC092] text-white text-lg font-bold mr-[4px] p-[4px]">
            COACH
          </span>
          BOTS
        </h1>
        <Badge variant={"outline"}>Private. For system use only</Badge>
        {formType === "knowledge-bot" && (
          <UserBotIntake setLoading={setLoading} user={user} />
        )}
        {formType === "coach" && (
          <div className="flex flex-col justify-center items-center w-full ">
            <div className="bg-white border w-[65%] max-md:w-[80%] max-lg:w-[80%] max-sm:w-[90%] h-fit p-4 mt-5 rounded-md mb-4">
              <div className="flex flex-row max-sm:flex-col items-center max-sm:items-start max-sm:gap-2 justify-between">
                <h1 className="text-xl text-left text-gray-600 font-bold">
                  Coach Intake
                </h1>
                {checkIfView && (
                  <Badge
                    className="bg-blue-200 w-fit text-blue-800 rounded-sm"
                    variant={"outline"}
                  >
                    <Eye className="h-4 w-4 mr-1" /> Viewing
                  </Badge>
                )}
                {checkIfEdit && (
                  <Badge
                    className="bg-blue-200 w-fit text-xs text-blue-800 rounded-sm max-w-[50%] max-sm:max-w-none text-left"
                    variant={"outline"}
                  >
                    <PenLine className="h-4 w-4 mr-1" /> Editing
                  </Badge>
                )}
              </div>
              {/* <p className="mb-3 text-left text-sm text-gray-600">
                Information provided will be used to create your avatar! ( Est
                time : 15 mins)
              </p> */}
              <form
                className="text-left"
                onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  const is_proceed = await handleRequiredSelections();
                  console.log("error", error);
                  const errors = Object.values(error).filter(
                    //@ts-ignore
                    (err: string) => err.length > 0
                  );
                  if (errors.length > 0 || !is_proceed) {
                    toast.warning("Please enter the valid inputs.");
                  } else {
                    createSubmitHandler(e);
                  }
                }}
              >
                <div className="flex flex-col gap-2">
                  {!checkIfView && (
                    <Badge
                      variant={"secondary"}
                      className="rounded-sm bg-[#fef3c7] text-[#d97706] p-0.5 mt-1 w-fit"
                    >
                      <Asterisk className="h-4 w-4 mr-1" /> marked questions are
                      mandatory in nature.
                    </Badge>
                  )}
                </div>
                <div>
                  <div className="my-3 bg-gray-100 p-2 rounded-md">
                    <p className="text-sm my-1 font-bold">Type</p>
                    <Radio.Group
                      className="mt-2"
                      size="middle"
                      disabled={
                        checkIfView === null ? false : true
                        // || (checkIfEdit === null ? false : true)
                      }
                      value={
                        (formVersion === "1" && "no-co-pilot") ||
                        (formVersion === "2" && "subject-copilot") ||
                        (formVersion === "3" && "coaching-copilot")
                      }
                      options={[
                        {
                          label: "No Co-pilot",
                          value: "no-co-pilot",
                        },
                        {
                          label: "Subject Co-pilot (10 mins)",
                          value: "subject-copilot",
                        },
                        {
                          label: "Coaching Co-pilot (25 Mins)",
                          value: "coaching-copilot",
                        },
                      ]}
                      onChange={(e) => {
                        const value = e.target.value;
                        // Update formVersion immediately
                        let NewFormVersionValue =
                          value === "no-co-pilot"
                            ? "1"
                            : value === "subject-copilot"
                            ? "2"
                            : "3";

                        setFormVersion(NewFormVersionValue);

                        // Update switchState and other dependent states
                        // setSwitchState((prev) => ({
                        //   ...prev,
                        //   to: NewFormVersionValue,
                        // }));
                        setSwitchState((prev) => {
                          return { ...prev, to: NewFormVersionValue };
                        });

                        setDataModified(true);

                        console.log(
                          switchState,
                          formVersion,
                          NewFormVersionValue
                        );
                        if (switchState.from !== NewFormVersionValue) {
                          setCheckIfEdit(null);
                        } else if (switchState.from === NewFormVersionValue) {
                          setCheckIfEdit("true");
                        }
                      }}
                      optionType={
                        window.innerWidth < 768 ? "default" : "button"
                      }
                    />
                    <p className="text-sm pt-3">
                      {formVersion === "1" &&
                        "If selected, no AI-assisted communication will be used."}
                      {formVersion === "2" &&
                        "This allows the coach to create an AI assistant specialized in specific topics. This co-pilot can help with AI-based communication on niche subjects."}
                      {formVersion === "3" &&
                        "This is the most comprehensive option. It creates an AI assistant specifically for coaching that evolves over time. The co-pilot's development is carefully guided by the coach's input and customized AI model training."}
                    </p>
                  </div>

                  <Accordion
                    type="single"
                    collapsible
                    className="w-full mt-0 mx-0 border rounded-md"
                  >
                    <AccordionItem value="item-basic">
                      <AccordionTrigger className="text-sm py-0 font-bold p-1 border-none px-2">
                        <div>
                          Basic Description.{" "}
                          <span className="text-xl font-bold text-red-500">
                            *
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-2 border-none">
                        <div className="my-3">
                          <p className="text-sm my-1">
                            Enter your name{" "}
                            <span className="text-xl font-bold text-red-500">
                              *
                            </span>
                          </p>
                          <input
                            value={name}
                            required
                            minLength={10}
                            maxLength={30}
                            onChange={(e) => {
                              setName(e.target.value);
                              handleWordLimit(e.target.value, 10, 30, "Name");
                            }}
                            disabled
                            placeholder="Aarav Sharma"
                            type="text"
                            className="w-full hover:cursor-not-allowed bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                          />
                        </div>
                        <div className="my-3">
                          <p className="text-sm my-1">
                            Please add a profile description.{" "}
                            <span className="text-xl font-bold text-red-500">
                              *
                            </span>
                          </p>
                          <textarea
                            value={about}
                            required
                            disabled={checkIfView === null ? false : true}
                            onChange={(e) => {
                              const inputValue = e.target.value;

                              setAbout(inputValue);
                              handleWordLimit(
                                inputValue,
                                30,
                                80,
                                "Profile Description"
                              );
                            }}
                            placeholder="Share your coaching expertise, experience, and approach. Help clients understand how you can support their goals."
                            rows={3}
                            className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                          />
                          {Object.keys(error).includes(
                            "Profile Description"
                          ) && (
                            <p className="text-red-500 text-xs mt-1">
                              {(error as any)["Profile Description"]}
                            </p>
                          )}
                        </div>

                        <div className="my-3">
                          <p className="text-sm my-1">
                            Total number of years of experience.{" "}
                            <span className="text-xl font-bold text-red-500">
                              *
                            </span>
                          </p>
                          <div>
                            <RadioGroup
                              value={experience}
                              required
                              onValueChange={(value) => {
                                setDataModified(true);
                                setExperience(value);
                              }}
                              disabled={checkIfView === null ? false : true}
                            >
                              {[
                                "0 - 5 years",
                                "5 - 10 years",
                                "10 - 20 years",
                                "20+ years",
                              ].map((val, i) => (
                                <div
                                  key={i}
                                  className="flex items-center space-x-2 "
                                >
                                  <RadioGroupItem
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
                            {Object.keys(error).includes("UserExperience") && (
                              <p className="text-red-500 text-xs mt-1">
                                {(error as any)["UserExperience"]}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="my-4">
                          <p className="text-sm my-1">
                            Please add a professional picture to be added with
                            your profile.
                          </p>
                          <div className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 ">
                            <input
                              // required={!checkIfEdit}
                              type="file"
                              name="myImage"
                              accept="image/*"
                              onChange={(e) => {
                                setDataModified(true);
                                //@ts-ignore
                                setProfileImage(e.target.files[0]);
                                if (checkIfEdit) {
                                  const uploadedImage = handleImageUpload(
                                    //@ts-ignore
                                    e.target.files[0]
                                  );
                                  uploadedImage
                                    .then((data) => {
                                      setProfileImageUrl(data);
                                      console.log(data);
                                    })
                                    .catch((err) => {
                                      setProfileImageUrl(
                                        "https://res.cloudinary.com/dtbl4jg02/image/upload/v1715941993/naqedaza5tw8isro11qr.png"
                                      );

                                      throw new Error(
                                        "Claudinary upload error - profile_image"
                                      );
                                    });
                                }
                              }}
                              disabled={checkIfView === null ? false : true}
                              className="w-fit"
                            />{" "}
                            <p className="m-1 mt-2 ml-0 text-gray-500">
                              Upload image with (240px * 240px) under 2MB
                            </p>
                          </div>
                        </div>
                        {formVersion !== "1" && formVersion !== "2" && (
                          <div className="my-4">
                            <p className="text-sm my-1">
                              Please share your journey and background story,
                              highlighting experiences that have shaped your
                              path to where you are today?{" "}
                              <span className="text-xl font-bold text-red-500">
                                *
                              </span>
                            </p>
                            <textarea
                              rows={4}
                              required
                              disabled={checkIfView === null ? false : true}
                              onChange={(e) => {
                                const inputValue = e.target.value;

                                setJourneyAndBackground(inputValue);
                                handleWordLimit(
                                  inputValue,
                                  50,
                                  80,
                                  "journeyAndBackground"
                                );
                              }}
                              value={journeyAndBackground}
                              placeholder="Seeking guidance to enhance leadership skills, manage work-life balance, and navigate career transitions as a marketing professional."
                              className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                            />
                            {Object.keys(error).includes(
                              "journeyAndBackground"
                            ) && (
                              <p className="text-red-500 text-xs mt-1">
                                {(error as any)["journeyAndBackground"]}
                              </p>
                            )}
                          </div>
                        )}

                        <div className="my-3">
                          <p className="text-sm my-1">
                            Which department/ business unit you belong to?{" "}
                            <span className="text-xl font-bold text-red-500">
                              *
                            </span>
                          </p>
                          <RadioGroup
                            value={department}
                            required
                            disabled={checkIfView === null ? false : true}
                            onValueChange={(value) => {
                              setDataModified(true);
                              setDepartment(value);
                            }}
                          >
                            {departments.map((val: string, i: number) => (
                              <div
                                key={i}
                                className="flex items-center space-x-2 "
                              >
                                <RadioGroupItem
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
                          {Object.keys(error).includes("UserDepartment") && (
                            <p className="text-red-500 text-xs mt-1">
                              {(error as any)["UserDepartment"]}
                            </p>
                          )}
                        </div>

                        <div className="my-3">
                          <p className="text-sm my-1">
                            Select the area/domain that you are most passionate
                            about coaching.{" "}
                            <span className="text-xl font-bold text-red-500">
                              *
                            </span>
                            <Tooltip
                              overlayInnerStyle={{
                                backgroundColor: "white",
                                color: "black",
                                padding: "8px",
                              }}
                              title="The department and expertise options for a coach/mentor are customized for each enterprise. Sample values are currently shown."
                            >
                              <Info className="h-5 w-5 p-[2px] hover:bg-gray-50 hover:cursor-pointer ml-1 inline" />
                            </Tooltip>
                          </p>
                          <div className="my-2 mb-3">
                            <RadioGroup
                              required
                              disabled={checkIfView === null ? false : true}
                              value={areaDomain}
                              onValueChange={(value) => {
                                setDataModified(true);
                                setAreaDomain(value);
                              }}
                            >
                              {areaDomains.map((val, i) => (
                                <div
                                  key={i}
                                  className="flex items-center space-x-2 "
                                >
                                  <RadioGroupItem
                                    className={`rounded-sm`}
                                    value={val}
                                    id={`r${i}+1 ${val}`}
                                  />
                                  <label
                                    htmlFor={`r${i}+1 ${val}`}
                                    className="text-xs text-gray-700"
                                  >
                                    {val}
                                  </label>
                                </div>
                              ))}
                            </RadioGroup>
                            {Object.keys(error).includes("UserAreaDomain") && (
                              <p className="text-red-500 text-xs mt-1">
                                {(error as any)["UserAreaDomain"]}
                              </p>
                            )}
                          </div>
                        </div>
                      </AccordionContent>{" "}
                    </AccordionItem>
                  </Accordion>

                  {/* Bot related FAQs */}
                  {formVersion === "2" && (
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full mt-6 mx-0 border rounded-md"
                    >
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="text-sm py-0 font-bold p-1 border-none px-2">
                          <div>
                            Questions related to your bot.{" "}
                            <span className="text-xl font-bold text-red-500">
                              *
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-2 border-none">
                          <div className="my-3">
                            <p className="text-sm my-1">
                              Enter the bot name{" "}
                              <span className="text-xl font-bold text-red-500">
                                *
                              </span>
                            </p>
                            <input
                              value={botName}
                              required
                              onChange={(e) => {
                                setBotName(e.target.value);
                                handleWordLimit(
                                  e.target.value,
                                  1,
                                  3,
                                  "botName"
                                );
                              }}
                              placeholder="Coaching..."
                              type="text"
                              className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                            />
                            {Object.keys(error).includes("botName") && (
                              <p className="text-red-500 text-xs mt-1">
                                {(error as any)["botName"]}
                              </p>
                            )}
                          </div>
                          <div className="my-3">
                            <p className="text-sm my-1">
                              Enter your bot description{" "}
                              <span className="text-xl font-bold text-red-500">
                                *
                              </span>
                            </p>
                            <textarea
                              rows={4}
                              required
                              value={intakeBotDescription}
                              disabled={checkIfView === null ? false : true}
                              onChange={(e) => {
                                const inputValue = e.target.value;

                                setIntakeBotDescription(inputValue);
                                handleWordLimit(
                                  inputValue,
                                  30,
                                  80,
                                  "intakeBotDescription"
                                );
                              }}
                              placeholder="Fostering collaboration, diversity, and open discussions for shared learning and creative exploration..."
                              className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                            />
                            {Object.keys(error).includes(
                              "intakeBotDescription"
                            ) && (
                              <p className="text-red-500 text-xs mt-1">
                                {(error as any)["intakeBotDescription"]}
                              </p>
                            )}
                          </div>
                          <div className="my-3">
                            <p className="text-sm my-1">
                              Area of coaching{" "}
                              <span className="text-xl font-bold text-red-500">
                                *
                              </span>
                            </p>
                            <textarea
                              rows={4}
                              required
                              value={coachingArea}
                              disabled={checkIfView === null ? false : true}
                              onChange={(e) => {
                                const inputValue = e.target.value;

                                setCoachingArea(inputValue);
                                handleWordLimit(
                                  inputValue,
                                  30,
                                  80,
                                  "coachingArea"
                                );
                              }}
                              placeholder="Empowering growth through personalized coaching, goal-focused conversations, and transformative insights for continuous improvement..."
                              className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                            />
                            {Object.keys(error).includes("coachingArea") && (
                              <p className="text-red-500 text-xs mt-1">
                                {(error as any)["coachingArea"]}
                              </p>
                            )}
                          </div>

                          <div className="my-3">
                            <p className="text-sm my-1">
                              Would you like your bot to provide expressive
                              answers using emojis?{" "}
                              <span className="text-xl font-bold text-red-500">
                                *
                              </span>
                            </p>
                            <div className="my-2 mb-3">
                              <RadioGroup
                                disabled={checkIfView === null ? false : true}
                                required
                                value={provideAnswersUsingEmojis}
                                onValueChange={(value) => {
                                  setDataModified(true);
                                  setProvideAnswersUsingEmojis(value);
                                }}
                              >
                                {["Yes", "No"].map((val, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center space-x-2 "
                                  >
                                    <RadioGroupItem
                                      value={val}
                                      id={`r${i}+emojis ${val}`}
                                    />
                                    <label
                                      htmlFor={`r${i}+emojis ${val}`}
                                      className="text-xs text-gray-700"
                                    >
                                      {capitalizeText(val)}
                                    </label>
                                  </div>
                                ))}
                              </RadioGroup>
                              {Object.keys(error).includes("UseEmoji") && (
                                <p className="text-red-500 text-xs mt-1">
                                  {(error as any)["UseEmoji"]}
                                </p>
                              )}
                            </div>
                          </div>

                          <>
                            <div className="my-3">
                              <p className="text-sm font-semibold">
                                Knowledge base
                                {!checkIfEdit && (
                                  <span className="text-xl font-bold text-red-500">
                                    *
                                  </span>
                                )}
                              </p>
                              <p className="text-sm my-1">
                                {formVersion !== "2"
                                  ? `Please enter 1-2 YouTube links that reflect your worldview on personal & professional development. (Separate multiple links by comma)`
                                  : `Please enter 1-2 YouTube links related to the Subject matter. (Separate multiple links by comma)`}
                                {!checkIfEdit && (
                                  <span className="text-xl font-bold text-red-500">
                                    *
                                  </span>
                                )}
                              </p>
                              <div>
                                <textarea
                                  rows={4}
                                  disabled={checkIfView === null ? false : true}
                                  required={
                                    !checkIfEdit ||
                                    mediaData?.extracted_from_youtube.filter(
                                      (file) => !file.isDeleted
                                    ).length === 0
                                  }
                                  value={linksReflectingWVpersonal}
                                  onChange={(e) => {
                                    setDataModified(true);
                                    setLinksReflectingWVpersonal(
                                      e.target.value
                                    );
                                    handleInputLinks(
                                      e.target.value,
                                      "linksReflectingWVpersonal"
                                    );
                                  }}
                                  placeholder="(Let's say you believe grit and perseverance are important for workplace success, you may consider adding this link: https://www.youtube.com/watch?v=H14bBuluwB8 )"
                                  className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400  resize-none"
                                />
                                {Object.keys(error).includes(
                                  "linksReflectingWVpersonal"
                                ) && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {
                                      (error as any)[
                                        "linksReflectingWVpersonal"
                                      ]
                                    }
                                  </p>
                                )}
                                {/* @ts-ignore */}
                                {mediaData?.extracted_from_youtube.length > 0 &&
                                  switchState.from === formVersion && (
                                    <div className="w-full bg-red-50 border border-red-200 rounded-md p-2 max-sm:px-1 flex flex-col gap-1">
                                      {mediaData?.extracted_from_youtube.map(
                                        (item) => (
                                          <div className="flex flex-row justify-between items-center">
                                            <Link
                                              href={item.fileName}
                                              target="_target"
                                              className={`text-xs text-blue-500 truncate ${
                                                item.isDeleted && "line-through"
                                              }`}
                                            >
                                              {item.fileName}
                                            </Link>
                                            {checkIfEdit && (
                                              <div className="flex flex-row gap-2 min-w-fit">
                                                <Button
                                                  variant={"outline"}
                                                  className="h-6 text-xs w-fit"
                                                  type="button"
                                                  onClick={() => {
                                                    deleteMediaDataHandler(
                                                      item.fileName
                                                    );
                                                  }}
                                                  disabled={item.isDeleted}
                                                >
                                                  <span className="max-sm:hidden">
                                                    Delete
                                                  </span>
                                                  <TooltipWrapper
                                                    className="hidden max-sm:block text-xs"
                                                    tooltipName="Delete"
                                                    body={
                                                      <Trash2 className="h-3 w-3 ml-2 max-sm:ml-0" />
                                                    }
                                                  />
                                                </Button>
                                                <Button
                                                  variant={"outline"}
                                                  className="h-6 text-xs w-fit"
                                                  type="button"
                                                  disabled={!item.isDeleted}
                                                  onClick={() => {
                                                    undoDeleteMediaDataHandler(
                                                      item.fileName
                                                    );
                                                  }}
                                                >
                                                  <span className="max-sm:hidden">
                                                    Undo delete
                                                  </span>
                                                  <TooltipWrapper
                                                    className="hidden max-sm:block text-xs"
                                                    tooltipName="Undo delete"
                                                    body={
                                                      <UndoDot className="h-4 w-4 ml-2 max-sm:ml-0" />
                                                    }
                                                  />
                                                </Button>
                                              </div>
                                            )}
                                          </div>
                                        )
                                      )}
                                    </div>
                                  )}
                              </div>
                            </div>
                            <div className="my-3">
                              <p className="text-sm my-1">
                                {formVersion !== "2"
                                  ? `Please enter 1-2 article links that reflect what you wished everyone would follow in their growth journey. (Separate multiple links by comma)`
                                  : `Please enter 1-2 article links related to the Subject matter. (Separate multiple links by comma)`}{" "}
                                {!checkIfEdit && (
                                  <span className="text-xl font-bold text-red-500">
                                    *
                                  </span>
                                )}
                              </p>
                              <div>
                                <textarea
                                  rows={4}
                                  required={
                                    !checkIfEdit ||
                                    mediaData?.extracted_from_article.filter(
                                      (file) => !file.isDeleted
                                    ).length === 0
                                  }
                                  disabled={checkIfView === null ? false : true}
                                  value={linksReflectyouWished}
                                  onChange={(e) => {
                                    setDataModified(true);
                                    setLinksReflectyouWished(e.target.value);
                                    handleInputLinks(
                                      e.target.value,
                                      "linksReflectyouWished"
                                    );
                                  }}
                                  placeholder="(Let's say you came across an article that you liked a lot and you think it will help the program participants to grow, you can add that link. E.g you want to generally talk about empathy, you can add this article: https://www.mindtools.com/agz0gft/empathy-at-work)"
                                  className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                                />
                                {Object.keys(error).includes(
                                  "linksReflectyouWished"
                                ) && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {(error as any)["linksReflectyouWished"]}
                                  </p>
                                )}
                                {/* @ts-ignore */}
                                {mediaData?.extracted_from_article.length > 0 &&
                                switchState.from === formVersion ? (
                                  <div className="w-full bg-red-50 border border-red-200 rounded-md p-2 max-sm:px-1 flex flex-col gap-1">
                                    {mediaData?.extracted_from_article.map(
                                      (item) => (
                                        <div className="flex flex-row justify-between items-center">
                                          <Link
                                            href={item.fileName}
                                            target="_target"
                                            className={`text-xs text-blue-500 truncate ${
                                              item.isDeleted && "line-through"
                                            }`}
                                          >
                                            {item.fileName}
                                          </Link>
                                          {checkIfEdit && (
                                            <div className="flex flex-row gap-2 min-w-fit">
                                              <Button
                                                variant={"outline"}
                                                className="h-6 text-xs w-fit"
                                                type="button"
                                                disabled={item.isDeleted}
                                                onClick={() => {
                                                  deleteMediaDataHandler(
                                                    item.fileName
                                                  );
                                                }}
                                              >
                                                <span className="max-sm:hidden">
                                                  Delete
                                                </span>
                                                <TooltipWrapper
                                                  className="hidden max-sm:block text-xs"
                                                  tooltipName="Delete"
                                                  body={
                                                    <Trash2 className="h-3 w-3 ml-2 max-sm:ml-0" />
                                                  }
                                                />
                                              </Button>
                                              <Button
                                                variant={"outline"}
                                                className="h-6 text-xs w-fit"
                                                type="button"
                                                disabled={!item.isDeleted}
                                                onClick={() => {
                                                  undoDeleteMediaDataHandler(
                                                    item.fileName
                                                  );
                                                }}
                                              >
                                                <span className="max-sm:hidden">
                                                  Undo delete
                                                </span>
                                                <TooltipWrapper
                                                  className="hidden max-sm:block text-xs"
                                                  tooltipName="Undo delete"
                                                  body={
                                                    <UndoDot className="h-4 w-4 ml-2 max-sm:ml-0" />
                                                  }
                                                />
                                              </Button>
                                            </div>
                                          )}
                                        </div>
                                      )
                                    )}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </>

                          <div className="my-3 ">
                            <p className="text-sm my-1">
                              Please add any document or file that you believe
                              are reference materials that may help your mentees
                              and participants. Feel free to upload relevant
                              materials: guides, templates, and resources that
                              support your mentees and participants in their
                              learning journey.{" "}
                              {!checkIfEdit && (
                                <span className="text-xl font-bold text-red-500">
                                  *
                                </span>
                              )}
                            </p>

                            <div className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 ">
                              <input
                                disabled={checkIfView === null ? false : true}
                                required={
                                  !checkIfEdit ||
                                  mediaData?.extracted_from_pdf.filter(
                                    (file) => !file.isDeleted
                                  ).length === 0
                                }
                                type="file"
                                className="w-full text-xs my-2"
                                multiple
                                name="files"
                                accept=".pdf,.docx"
                                onChange={async (e) => {
                                  handleFileChange(e, "MainFile");
                                }}
                              />
                              {Object.keys(error).includes("MainFile") && (
                                <p className="text-red-500 text-xs mt-1">
                                  {(error as any)["MainFile"]}
                                </p>
                              )}
                            </div>
                          </div>
                          {/* @ts-ignore */}
                          {mediaData?.extracted_from_pdf.length > 0 &&
                            switchState.from === formVersion && (
                              <div className="w-full bg-red-50 border border-red-200 rounded-md p-2 max-sm:px-1 flex flex-col gap-1">
                                {mediaData?.extracted_from_pdf.map((item) => (
                                  <div className="flex flex-row justify-between items-center">
                                    <div className="flex flex-row items-center gap-2">
                                      <File className="h-4 w-4 ml-2 max-sm:ml-0 inline" />{" "}
                                      <span
                                        className={`text-xs text-blue-500 truncate ${
                                          item.isDeleted && "line-through"
                                        }`}
                                      >
                                        {item.fileName}
                                      </span>
                                    </div>
                                    {checkIfEdit && (
                                      <div className="flex flex-row gap-2 min-w-fit">
                                        <Button
                                          variant={"outline"}
                                          className="h-6 text-xs w-fit"
                                          type="button"
                                          disabled={item.isDeleted}
                                          onClick={() => {
                                            deleteMediaDataHandler(
                                              item.fileName
                                            );
                                          }}
                                        >
                                          <span className="max-sm:hidden">
                                            Delete
                                          </span>
                                          <TooltipWrapper
                                            className="hidden max-sm:block text-xs"
                                            tooltipName="Delete"
                                            body={
                                              <Trash2 className="h-3 w-3 ml-2 max-sm:ml-0" />
                                            }
                                          />
                                        </Button>
                                        <Button
                                          variant={"outline"}
                                          className="h-6 text-xs w-fit"
                                          type="button"
                                          disabled={!item.isDeleted}
                                          onClick={() => {
                                            undoDeleteMediaDataHandler(
                                              item.fileName
                                            );
                                          }}
                                        >
                                          <span className="max-sm:hidden">
                                            Undo delete
                                          </span>
                                          <TooltipWrapper
                                            className="hidden max-sm:block text-xs"
                                            tooltipName="Undo delete"
                                            body={
                                              <UndoDot className="h-4 w-4 ml-2 max-sm:ml-0" />
                                            }
                                          />
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          <hr className="mt-2" />
                          <div className="my-3 ">
                            <p className="text-sm my-1">
                              Please upload any personality assessment (e.g.
                              DISC) or other profiles that you might have. It
                              will be used for recommendation of the appropriate
                              coaching style.
                            </p>

                            <div className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 ">
                              <input
                                disabled={checkIfView === null ? false : true}
                                // required={!checkIfEdit}
                                type="file"
                                className="w-full text-xs my-2"
                                multiple
                                name="optional_file"
                                accept=".pdf,.docx"
                                onChange={async (e) => {
                                  handleFileChange(e, "PersonailtyFile");
                                }}
                              />
                              {Object.keys(error).includes(
                                "PersonailtyFile"
                              ) && (
                                <p className="text-red-500 text-xs mt-1">
                                  {(error as any)["PersonailtyFile"]}
                                </p>
                              )}
                            </div>
                            {/* @ts-ignore */}
                            {optionalMediaData?.extracted_from_optional_file
                              .length > 0 && (
                              <div className="w-full bg-red-50 border border-red-200 rounded-md p-2 max-sm:px-1 flex flex-col gap-1">
                                {optionalMediaData?.extracted_from_optional_file.map(
                                  (item) => (
                                    <div className="flex flex-row justify-between items-center">
                                      <div className="flex flex-row items-center gap-2">
                                        <File className="h-4 w-4 ml-2 max-sm:ml-0 inline" />{" "}
                                        <span
                                          className={`text-xs text-blue-500 truncate ${
                                            item.isDeleted && "line-through"
                                          }`}
                                        >
                                          {item.fileName}
                                        </span>
                                      </div>
                                      {checkIfEdit && (
                                        <div className="flex flex-row gap-2 min-w-fit">
                                          <Button
                                            variant={"outline"}
                                            className="h-6 text-xs w-fit"
                                            type="button"
                                            disabled={item.isDeleted}
                                            onClick={() => {
                                              deleteOptionalMediaDataHandler(
                                                item.fileName
                                              );
                                            }}
                                          >
                                            <span className="max-sm:hidden">
                                              Delete
                                            </span>
                                            <TooltipWrapper
                                              className="hidden max-sm:block text-xs"
                                              tooltipName="Delete"
                                              body={
                                                <Trash2 className="h-3 w-3 ml-2 max-sm:ml-0" />
                                              }
                                            />
                                          </Button>
                                          <Button
                                            variant={"outline"}
                                            className="h-6 text-xs w-fit"
                                            type="button"
                                            disabled={!item.isDeleted}
                                            onClick={() => {
                                              undoDeleteOptionalMediaDataHandler(
                                                item.fileName
                                              );
                                            }}
                                          >
                                            <span className="max-sm:hidden">
                                              Undo delete
                                            </span>
                                            <TooltipWrapper
                                              className="hidden max-sm:block text-xs"
                                              tooltipName="Undo delete"
                                              body={
                                                <UndoDot className="h-4 w-4 ml-2 max-sm:ml-0" />
                                              }
                                            />
                                          </Button>
                                        </div>
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  )}

                  <Accordion
                    type="single"
                    collapsible
                    className="w-full my-4 mx-0 border rounded-md"
                  >
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-sm py-0 font-bold p-1 border-none px-2">
                        <div>
                          Personality preferences{" "}
                          <span className="text-xl font-bold text-red-500">
                            *
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-2 border-none">
                        {formVersion !== "1" && formVersion !== "2" && (
                          <>
                            <div className="my-3">
                              <p className="text-sm my-1">
                                Please mention any coaching frameworks or tools
                                that you use in your approach.{" "}
                                <span className="text-xl font-bold text-red-500">
                                  *
                                </span>
                              </p>
                              <div className="my-1">
                                {" "}
                                {models.map((model, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center space-x-2"
                                  >
                                    <Checkbox
                                      id={`checkbox-${index}`}
                                      checked={mentoringPreferencess?.includes(
                                        model
                                      )}
                                      disabled={
                                        (mentoringPreferencess?.length >= 3 &&
                                          !mentoringPreferencess.includes(
                                            model
                                          )) ||
                                        checkIfView === "true"
                                      }
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          if (
                                            mentoringPreferencess?.length < 3
                                          ) {
                                            setMentoringPreferencess((prev) => [
                                              ...prev,
                                              model,
                                            ]);
                                          }
                                        } else {
                                          setMentoringPreferencess((prev) =>
                                            prev.filter(
                                              (item) => item !== model
                                            )
                                          );
                                        }
                                      }}
                                    />
                                    <label
                                      htmlFor={`checkbox-${index}`}
                                      className="text-sm"
                                    >
                                      {model}
                                    </label>
                                  </div>
                                ))}
                              </div>
                              {Object.keys(error).includes(
                                "MentoringFramework"
                              ) && (
                                <p className="text-red-500 text-xs mt-1">
                                  {(error as any)["MentoringFramework"]}
                                </p>
                              )}
                            </div>

                            <div className="my-3">
                              <p className="text-sm my-1">
                                Please discuss how you have helped others as a
                                coach or in other professional capacity.{" "}
                                <span className="text-xl font-bold text-red-500">
                                  *
                                </span>
                              </p>
                              <div>
                                <textarea
                                  rows={4}
                                  disabled={checkIfView === null ? false : true}
                                  required
                                  value={discussInCARformat}
                                  onChange={(e) => {
                                    const inputValue = e.target.value;

                                    setDiscussInCARformat(inputValue);
                                    handleWordLimit(
                                      inputValue,
                                      50,
                                      80,
                                      "discussInCARformat"
                                    );
                                  }}
                                  placeholder="Please mention these personal transformation stories in CAR format - Context, Action, and Result achieved."
                                  className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                                />
                                {Object.keys(error).includes(
                                  "discussInCARformat"
                                ) && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {(error as any)["discussInCARformat"]}
                                  </p>
                                )}
                              </div>
                            </div>
                          </>
                        )}

                        <div className="my-3">
                          <p className="text-sm my-1">
                            Please rate the characteristics/skills on which you
                            will rate yourself near the lows.{" "}
                            <span className="text-xl font-bold text-red-500">
                              *
                            </span>
                          </p>
                          <CharactericticsSelect
                            disabled={checkIfView === null ? false : true}
                            value={characteristicsRateLows}
                            onCharacteristicsSelect={onCharacteristicsSelectLow}
                            options={characteristicsList}
                          />
                          {Object.keys(error).includes("LowCompetency") && (
                            <p className="text-red-500 text-xs mt-1">
                              {(error as any)["LowCompetency"]}
                            </p>
                          )}
                        </div>
                        <div className="my-3">
                          <p className="text-sm my-1">
                            Please rate the characteristics/skills on which you
                            will rate yourself highly.{" "}
                            <span className="text-xl font-bold text-red-500">
                              *
                            </span>
                          </p>
                          <CharactericticsSelect
                            disabled={checkIfView === null ? false : true}
                            value={characteristicsRateHigh}
                            onCharacteristicsSelect={
                              onCharacteristicsSelectHigh
                            }
                            options={characteristicsList}
                          />
                          {Object.keys(error).includes("HighCompetency") && (
                            <p className="text-red-500 text-xs mt-1">
                              {(error as any)["HighCompetency"]}
                            </p>
                          )}
                        </div>

                        {formVersion !== "1" && formVersion !== "2" && (
                          <>
                            <div className="my-3">
                              <p className="text-sm my-1">
                                Please articulate your dominant point of view
                                which you want to discuss with the program
                                participants as a general starting point.{" "}
                                <span className="text-xl font-bold text-red-500">
                                  *
                                </span>
                              </p>
                              <div>
                                <textarea
                                  rows={4}
                                  required
                                  value={povProgramParticipants}
                                  disabled={checkIfView === null ? false : true}
                                  onChange={(e) => {
                                    const inputValue = e.target.value;

                                    setPovProgramParticipants(inputValue);
                                    handleWordLimit(
                                      inputValue,
                                      30,
                                      80,
                                      "povProgramParticipants"
                                    );
                                  }}
                                  placeholder="Fostering collaboration, diversity, and open discussions for shared learning and creative exploration..."
                                  className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                                />
                                {Object.keys(error).includes(
                                  "povProgramParticipants"
                                ) && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {(error as any)["povProgramParticipants"]}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="my-3">
                              <p className="text-sm my-1">
                                What is your general approach towards problem
                                solving?{" "}
                                <span className="text-xl font-bold text-red-500">
                                  *
                                </span>
                              </p>
                              <div>
                                <textarea
                                  rows={4}
                                  required
                                  disabled={checkIfView === null ? false : true}
                                  value={problemSolvingApproach}
                                  onChange={(e) => {
                                    const inputValue = e.target.value;

                                    setProblemSolvingApproach(inputValue);
                                    handleWordLimit(
                                      inputValue,
                                      30,
                                      80,
                                      "problemSolvingApproach"
                                    );
                                  }}
                                  placeholder="My approach involves systematic analysis, creativity, and collaboration to find innovative, effective solutions..."
                                  className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                                />
                                {Object.keys(error).includes(
                                  "problemSolvingApproach"
                                ) && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {(error as any)["problemSolvingApproach"]}
                                  </p>
                                )}
                              </div>
                            </div>
                          </>
                        )}

                        {formVersion !== "1" && formVersion !== "2" && (
                          <>
                            <div className="my-3">
                              <p className="text-sm my-1">
                                What were the 3 most significant challenges you
                                encountered in your journey, and how did you
                                successfully navigate and overcome them?{" "}
                                <span className="text-xl font-bold text-red-500">
                                  *
                                </span>
                              </p>
                              <div>
                                <textarea
                                  rows={4}
                                  required
                                  disabled={checkIfView === null ? false : true}
                                  onChange={(e) => {
                                    const inputValue = e.target.value;

                                    setSignificantChallenges(inputValue);
                                    handleWordLimit(
                                      inputValue,
                                      50,
                                      80,
                                      "significantChallenges"
                                    );
                                  }}
                                  value={significantChallenges}
                                  placeholder="Explain your top challenges and how you overcame them. For example - helped new joiners navigate team conflicts by fostering open communication."
                                  className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                                />
                                {Object.keys(error).includes(
                                  "significantChallenges"
                                ) && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {(error as any)["significantChallenges"]}
                                  </p>
                                )}
                              </div>
                            </div>

                            <div className="my-3">
                              <p className="text-sm my-1">
                                Are there any phrases or expressions you find
                                yourself using often in conversations? These
                                could be catchphrases, favorite quotes, or
                                unique sayings that reflect your personality.{" "}
                                <span className="text-xl font-bold text-red-500">
                                  *
                                </span>
                              </p>
                              <div>
                                <textarea
                                  rows={4}
                                  disabled={checkIfView === null ? false : true}
                                  required
                                  onChange={(e) => {
                                    const inputValue = e.target.value;

                                    setPhrasesNExpressions(inputValue);
                                  }}
                                  value={phrasesNExpressions}
                                  placeholder="Provide a few of your favorite quotes or catchphrases like 'Progress over perfection.'"
                                  className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                                />
                              </div>
                            </div>

                            <div className="my-3">
                              <p className="text-sm my-1">
                                Please add names of 1-2 well-known leaders that
                                you admire.{" "}
                                <span className="text-xl font-bold text-red-500">
                                  *
                                </span>
                              </p>
                              <div>
                                <input
                                  required
                                  disabled={checkIfView === null ? false : true}
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
                          </>
                        )}
                        <div className="my-3">
                          <p className="text-sm my-1">
                            Please add the discussion topics (Separated by
                            comma)
                            <span className="text-xl font-bold text-red-500">
                              *
                            </span>
                          </p>
                          <div>
                            <textarea
                              rows={2}
                              disabled={checkIfView === null ? false : true}
                              required
                              value={discussionTopics}
                              onChange={(e) => {
                                setDataModified(true);
                                setDiscussionTopics(e.target.value);
                                handleDiscussionTopics(
                                  e.target.value,
                                  "discussionTopics"
                                );
                              }}
                              placeholder="You can enter 4-5 Discussion Topics you'd like to discuss. eg: Talent empowerment. Please seperate each topic using comma."
                              className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400  resize-none"
                            />
                          </div>
                          {Object.keys(error).includes("discussionTopics") && (
                            <p className="text-red-500 text-xs mt-1">
                              {(error as any)["discussionTopics"]}
                            </p>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {formVersion !== "1" && formVersion !== "2" && (
                    <Accordion
                      type="single"
                      collapsible
                      className="w-full mx-0 border rounded-md"
                    >
                      <AccordionItem value="item-media">
                        <AccordionTrigger className="text-sm py-0 font-bold p-2 border-none px-2">
                          <div>
                            Knowledge base.{" "}
                            {!checkIfEdit && (
                              <span className="text-xl font-bold text-red-500">
                                *
                              </span>
                            )}
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-2 border-none">
                          <>
                            <div className="my-3">
                              <p className="text-sm my-1">
                                {formVersion !== "2"
                                  ? `Please enter 1-2 YouTube links that reflect your worldview on personal & professional development. (Separate multiple links by comma)`
                                  : `Please enter 1-2 YouTube links related to the Subject matter. (Separate multiple links by comma)`}
                                {!checkIfEdit && (
                                  <span className="text-xl font-bold text-red-500">
                                    *
                                  </span>
                                )}
                              </p>
                              <div>
                                <textarea
                                  rows={4}
                                  disabled={checkIfView === null ? false : true}
                                  required={
                                    !checkIfEdit ||
                                    mediaData?.extracted_from_youtube.filter(
                                      (file) => !file.isDeleted
                                    ).length === 0
                                  }
                                  value={linksReflectingWVpersonal}
                                  onChange={(e) => {
                                    setDataModified(true);
                                    setLinksReflectingWVpersonal(
                                      e.target.value
                                    );
                                    handleInputLinks(
                                      e.target.value,
                                      "linksReflectingWVpersonal"
                                    );
                                  }}
                                  placeholder="(Let's say you believe grit and perseverance are important for workplace success, you may consider adding this link: https://www.youtube.com/watch?v=H14bBuluwB8 )"
                                  className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400  resize-none"
                                />
                                {Object.keys(error).includes(
                                  "linksReflectingWVpersonal"
                                ) && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {
                                      (error as any)[
                                        "linksReflectingWVpersonal"
                                      ]
                                    }
                                  </p>
                                )}
                                {/* @ts-ignore */}
                                {mediaData?.extracted_from_youtube.length > 0 &&
                                  switchState.from === formVersion && (
                                    <div className="w-full bg-red-50 border border-red-200 rounded-md p-2 max-sm:px-1 flex flex-col gap-1">
                                      {mediaData?.extracted_from_youtube.map(
                                        (item) => (
                                          <div className="flex flex-row justify-between items-center">
                                            <Link
                                              href={item.fileName}
                                              target="_target"
                                              className={`text-xs text-blue-500 truncate ${
                                                item.isDeleted && "line-through"
                                              }`}
                                            >
                                              {item.fileName}
                                            </Link>
                                            {checkIfEdit && (
                                              <div className="flex flex-row gap-2 min-w-fit">
                                                <Button
                                                  variant={"outline"}
                                                  className="h-6 text-xs w-fit"
                                                  type="button"
                                                  onClick={() => {
                                                    deleteMediaDataHandler(
                                                      item.fileName
                                                    );
                                                  }}
                                                  disabled={item.isDeleted}
                                                >
                                                  <span className="max-sm:hidden">
                                                    Delete
                                                  </span>
                                                  <TooltipWrapper
                                                    className="hidden max-sm:block text-xs"
                                                    tooltipName="Delete"
                                                    body={
                                                      <Trash2 className="h-3 w-3 ml-2 max-sm:ml-0" />
                                                    }
                                                  />
                                                </Button>
                                                <Button
                                                  variant={"outline"}
                                                  className="h-6 text-xs w-fit"
                                                  type="button"
                                                  disabled={!item.isDeleted}
                                                  onClick={() => {
                                                    undoDeleteMediaDataHandler(
                                                      item.fileName
                                                    );
                                                  }}
                                                >
                                                  <span className="max-sm:hidden">
                                                    Undo delete
                                                  </span>
                                                  <TooltipWrapper
                                                    className="hidden max-sm:block text-xs"
                                                    tooltipName="Undo delete"
                                                    body={
                                                      <UndoDot className="h-4 w-4 ml-2 max-sm:ml-0" />
                                                    }
                                                  />
                                                </Button>
                                              </div>
                                            )}
                                          </div>
                                        )
                                      )}
                                    </div>
                                  )}
                              </div>
                            </div>
                            <div className="my-3">
                              <p className="text-sm my-1">
                                Please enter 1-2 article links that reflect what
                                you wished everyone would follow in their growth
                                journey. (Separate multiple links by comma){" "}
                                {!checkIfEdit && (
                                  <span className="text-xl font-bold text-red-500">
                                    *
                                  </span>
                                )}
                              </p>
                              <div>
                                <textarea
                                  rows={4}
                                  required={
                                    !checkIfEdit ||
                                    mediaData?.extracted_from_article.filter(
                                      (file) => !file.isDeleted
                                    ).length === 0
                                  }
                                  disabled={checkIfView === null ? false : true}
                                  value={linksReflectyouWished}
                                  onChange={(e) => {
                                    setDataModified(true);
                                    setLinksReflectyouWished(e.target.value);
                                    handleInputLinks(
                                      e.target.value,
                                      "linksReflectyouWished"
                                    );
                                  }}
                                  placeholder="(Let's say you came across an article that you liked a lot and you think it will help the program participants to grow, you can add that link. E.g you want to generally talk about empathy, you can add this article: https://www.mindtools.com/agz0gft/empathy-at-work)"
                                  className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                                />
                                {Object.keys(error).includes(
                                  "linksReflectyouWished"
                                ) && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {(error as any)["linksReflectyouWished"]}
                                  </p>
                                )}
                                {/* @ts-ignore */}
                                {mediaData?.extracted_from_article.length > 0 &&
                                switchState.from === formVersion ? (
                                  <div className="w-full bg-red-50 border border-red-200 rounded-md p-2 max-sm:px-1 flex flex-col gap-1">
                                    {mediaData?.extracted_from_article.map(
                                      (item) => (
                                        <div className="flex flex-row justify-between items-center">
                                          <Link
                                            href={item.fileName}
                                            target="_target"
                                            className={`text-xs text-blue-500 truncate ${
                                              item.isDeleted && "line-through"
                                            }`}
                                          >
                                            {item.fileName}
                                          </Link>
                                          {checkIfEdit && (
                                            <div className="flex flex-row gap-2 min-w-fit">
                                              <Button
                                                variant={"outline"}
                                                className="h-6 text-xs w-fit"
                                                type="button"
                                                disabled={item.isDeleted}
                                                onClick={() => {
                                                  deleteMediaDataHandler(
                                                    item.fileName
                                                  );
                                                }}
                                              >
                                                <span className="max-sm:hidden">
                                                  Delete
                                                </span>
                                                <TooltipWrapper
                                                  className="hidden max-sm:block text-xs"
                                                  tooltipName="Delete"
                                                  body={
                                                    <Trash2 className="h-3 w-3 ml-2 max-sm:ml-0" />
                                                  }
                                                />
                                              </Button>
                                              <Button
                                                variant={"outline"}
                                                className="h-6 text-xs w-fit"
                                                type="button"
                                                disabled={!item.isDeleted}
                                                onClick={() => {
                                                  undoDeleteMediaDataHandler(
                                                    item.fileName
                                                  );
                                                }}
                                              >
                                                <span className="max-sm:hidden">
                                                  Undo delete
                                                </span>
                                                <TooltipWrapper
                                                  className="hidden max-sm:block text-xs"
                                                  tooltipName="Undo delete"
                                                  body={
                                                    <UndoDot className="h-4 w-4 ml-2 max-sm:ml-0" />
                                                  }
                                                />
                                              </Button>
                                            </div>
                                          )}
                                        </div>
                                      )
                                    )}
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </>

                          <div className="my-3 ">
                            <p className="text-sm my-1">
                              Please add any document or file that you believe
                              are reference materials that may help your mentees
                              and participants. Feel free to upload relevant
                              materials: guides, templates, and resources that
                              support your mentees and participants in their
                              learning journey.{" "}
                              {!checkIfEdit && (
                                <span className="text-xl font-bold text-red-500">
                                  *
                                </span>
                              )}
                            </p>

                            <div className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 ">
                              <input
                                disabled={checkIfView === null ? false : true}
                                required={
                                  !checkIfEdit ||
                                  mediaData?.extracted_from_pdf.filter(
                                    (file) => !file.isDeleted
                                  ).length === 0
                                }
                                type="file"
                                className="w-full text-xs my-2"
                                multiple
                                name="files"
                                accept=".pdf,.docx"
                                onChange={async (e) => {
                                  handleFileChange(e, "MainFile2");
                                }}
                              />
                              {Object.keys(error).includes("MainFile2") && (
                                <p className="text-red-500 text-xs mt-1">
                                  {(error as any)["MainFile2"]}
                                </p>
                              )}
                            </div>
                          </div>
                          {/* @ts-ignore */}
                          {mediaData?.extracted_from_pdf.length > 0 &&
                            switchState.from === formVersion && (
                              <div className="w-full bg-red-50 border border-red-200 rounded-md p-2 max-sm:px-1 flex flex-col gap-1">
                                {mediaData?.extracted_from_pdf.map((item) => (
                                  <div className="flex flex-row justify-between items-center">
                                    <div className="flex flex-row items-center gap-2">
                                      <File className="h-4 w-4 ml-2 max-sm:ml-0 inline" />{" "}
                                      <span
                                        className={`text-xs text-blue-500 truncate ${
                                          item.isDeleted && "line-through"
                                        }`}
                                      >
                                        {item.fileName}
                                      </span>
                                    </div>
                                    {checkIfEdit && (
                                      <div className="flex flex-row gap-2 min-w-fit">
                                        <Button
                                          variant={"outline"}
                                          className="h-6 text-xs w-fit"
                                          type="button"
                                          disabled={item.isDeleted}
                                          onClick={() => {
                                            deleteMediaDataHandler(
                                              item.fileName
                                            );
                                          }}
                                        >
                                          <span className="max-sm:hidden">
                                            Delete
                                          </span>
                                          <TooltipWrapper
                                            className="hidden max-sm:block text-xs"
                                            tooltipName="Delete"
                                            body={
                                              <Trash2 className="h-3 w-3 ml-2 max-sm:ml-0" />
                                            }
                                          />
                                        </Button>
                                        <Button
                                          variant={"outline"}
                                          className="h-6 text-xs w-fit"
                                          type="button"
                                          disabled={!item.isDeleted}
                                          onClick={() => {
                                            undoDeleteMediaDataHandler(
                                              item.fileName
                                            );
                                          }}
                                        >
                                          <span className="max-sm:hidden">
                                            Undo delete
                                          </span>
                                          <TooltipWrapper
                                            className="hidden max-sm:block text-xs"
                                            tooltipName="Undo delete"
                                            body={
                                              <UndoDot className="h-4 w-4 ml-2 max-sm:ml-0" />
                                            }
                                          />
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          <hr className="mt-2" />
                          <div className="my-3 ">
                            <p className="text-sm my-1">
                              Please upload any personality assessment (e.g.
                              DISC) or other profiles that you might have. It
                              will be used for recommendation of the appropriate
                              coaching style.
                            </p>

                            <div className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 ">
                              <input
                                disabled={checkIfView === null ? false : true}
                                // required={!checkIfEdit}
                                type="file"
                                className="w-full text-xs my-2"
                                multiple
                                name="optional_file"
                                accept=".pdf,.docx"
                                onChange={async (e) => {
                                  handleFileChange(e, "PersonalityFile2");
                                }}
                              />
                              {Object.keys(error).includes(
                                "PersonalityFile2"
                              ) && (
                                <p className="text-red-500 text-xs mt-1">
                                  {(error as any)["PersonalityFile2"]}
                                </p>
                              )}
                            </div>
                            {/* @ts-ignore */}
                            {optionalMediaData?.extracted_from_optional_file
                              .length > 0 &&
                              switchState.from === formVersion && (
                                <div className="w-full bg-red-50 border border-red-200 rounded-md p-2 max-sm:px-1 flex flex-col gap-1">
                                  {optionalMediaData?.extracted_from_optional_file.map(
                                    (item) => (
                                      <div className="flex flex-row justify-between items-center">
                                        <div className="flex flex-row items-center gap-2">
                                          <File className="h-4 w-4 ml-2 max-sm:ml-0 inline" />{" "}
                                          <span
                                            className={`text-xs text-blue-500 truncate ${
                                              item.isDeleted && "line-through"
                                            }`}
                                          >
                                            {item.fileName}
                                          </span>
                                        </div>
                                        {checkIfEdit && (
                                          <div className="flex flex-row gap-2 min-w-fit">
                                            <Button
                                              variant={"outline"}
                                              className="h-6 text-xs w-fit"
                                              type="button"
                                              disabled={item.isDeleted}
                                              onClick={() => {
                                                deleteOptionalMediaDataHandler(
                                                  item.fileName
                                                );
                                              }}
                                            >
                                              <span className="max-sm:hidden">
                                                Delete
                                              </span>
                                              <TooltipWrapper
                                                className="hidden max-sm:block text-xs"
                                                tooltipName="Delete"
                                                body={
                                                  <Trash2 className="h-3 w-3 ml-2 max-sm:ml-0" />
                                                }
                                              />
                                            </Button>
                                            <Button
                                              variant={"outline"}
                                              className="h-6 text-xs w-fit"
                                              type="button"
                                              disabled={!item.isDeleted}
                                              onClick={() => {
                                                undoDeleteOptionalMediaDataHandler(
                                                  item.fileName
                                                );
                                              }}
                                            >
                                              <span className="max-sm:hidden">
                                                Undo delete
                                              </span>
                                              <TooltipWrapper
                                                className="hidden max-sm:block text-xs"
                                                tooltipName="Undo delete"
                                                body={
                                                  <UndoDot className="h-4 w-4 ml-2 max-sm:ml-0" />
                                                }
                                              />
                                            </Button>
                                          </div>
                                        )}
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  )}

                  <Accordion
                    type="single"
                    collapsible
                    className="w-full mt-4 mx-0 border rounded-md"
                  >
                    <AccordionItem value="item-acc">
                      <AccordionTrigger className="text-sm py-0 font-bold p-2 border-none px-2">
                        <div>
                          Account preferences
                          <span className="text-xl font-bold text-red-500">
                            *
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-2 border-none">
                        <div className="my-3">
                          <p className="text-sm my-1">
                            Allow Coachee and Mentee to update action plan and
                            session notes?{" "}
                            <span className="text-xl font-bold text-red-500">
                              *
                            </span>
                          </p>
                          <div className="my-2 mb-3">
                            <RadioGroup
                              disabled={checkIfView === null ? false : true}
                              required
                              value={allowSessionNotes}
                              onValueChange={(value) => {
                                setDataModified(true);
                                setAllowSessionNotes(value);
                              }}
                            >
                              {["Yes", "No"].map((val, i) => (
                                <div
                                  key={i}
                                  className="flex items-center space-x-2 "
                                >
                                  <RadioGroupItem
                                    value={val}
                                    id={`r${i}+e ${val}`}
                                  />
                                  <label
                                    htmlFor={`r${i}+e ${val}`}
                                    className="text-xs text-gray-700"
                                  >
                                    {capitalizeText(val)}
                                  </label>
                                </div>
                              ))}
                            </RadioGroup>
                            {Object.keys(error).includes("AllowActionPlan") && (
                              <p className="text-red-500 text-xs mt-1">
                                {(error as any)["AllowActionPlan"]}
                              </p>
                            )}
                          </div>
                        </div>

                        {formVersion !== "1" && formVersion !== "2" && (
                          <div className="my-3">
                            <p className="text-sm my-1">
                              Would you like your AI Avatar to provide
                              expressive answers using emojis?{" "}
                              <span className="text-xl font-bold text-red-500">
                                *
                              </span>
                            </p>
                            <div className="my-2 mb-3">
                              <RadioGroup
                                disabled={checkIfView === null ? false : true}
                                required
                                value={provideAnswersUsingEmojis}
                                onValueChange={(value) => {
                                  setDataModified(true);
                                  setProvideAnswersUsingEmojis(value);
                                }}
                              >
                                {["Yes", "No"].map((val, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center space-x-2 "
                                  >
                                    <RadioGroupItem
                                      value={val}
                                      id={`r${i}+emojis ${val}`}
                                    />
                                    <label
                                      htmlFor={`r${i}+emojis ${val}`}
                                      className="text-xs text-gray-700"
                                    >
                                      {capitalizeText(val)}
                                    </label>
                                  </div>
                                ))}
                              </RadioGroup>
                              {Object.keys(error).includes("UseEmoji") && (
                                <p className="text-red-500 text-xs mt-1">
                                  {(error as any)["UseEmoji"]}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  {formVersion !== "1" && formVersion !== "2" && (
                    <>
                      <Accordion
                        type="single"
                        collapsible
                        className="w-full mt-4 mx-0 border rounded-md"
                      >
                        <AccordionItem value="item-coaching-faqs">
                          <AccordionTrigger className="text-sm py-0 font-bold p-2 border-none px-2">
                            <div>
                              Coaching FAQs{" "}
                              <span className="text-xl font-bold text-red-500">
                                *
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-2 border-none">
                            {(profileType === "coach" ||
                              profileType === "coach-mentor") && (
                              <>
                                <div className="my-3">
                                  <p className="text-sm my-1">
                                    As a coach, what foundational values do you
                                    believe individuals should prioritize and
                                    strive for in their personal and
                                    professional development journey?{" "}
                                    <span className="text-xl font-bold text-red-500">
                                      *
                                    </span>
                                  </p>
                                  <div>
                                    <textarea
                                      disabled={
                                        checkIfView === null ? false : true
                                      }
                                      rows={4}
                                      required
                                      value={foundationalValues}
                                      onChange={(e) => {
                                        setFoundationalValues(e.target.value);
                                        handleWordLimitMin(
                                          e.target.value,
                                          20,
                                          "foundationalValues"
                                        );
                                      }}
                                      placeholder="Identify core principles like integrity, resilience, and empathy essential for personal and professional growth."
                                      className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 "
                                    />
                                    {Object.keys(error).includes(
                                      "foundationalValues"
                                    ) && (
                                      <p className="text-red-500 text-xs mt-1">
                                        {(error as any)["foundationalValues"]}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                <div className="my-3">
                                  <p className="text-sm my-1">
                                    In your role as a coach, what kind of
                                    developmental framework do you employ, and
                                    why do you consider it to be the optimal
                                    framework for facilitating personal growth ?{" "}
                                    <span className="text-xl font-bold text-red-500">
                                      *
                                    </span>
                                  </p>
                                  <div>
                                    <textarea
                                      rows={4}
                                      disabled={
                                        checkIfView === null ? false : true
                                      }
                                      required
                                      value={developmentFramewrok}
                                      onChange={(e) => {
                                        setDevelopmentFrameworks(
                                          e.target.value
                                        );
                                        setDataModified(true);
                                        handleWordLimitMin(
                                          e.target.value,
                                          20,
                                          "developmentFramewrok"
                                        );
                                      }}
                                      placeholder="I utilize a blend of reflective practice, goal setting, and accountability to foster holistic personal development.)"
                                      className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 "
                                    />
                                    {Object.keys(error).includes(
                                      "developmentFramewrok"
                                    ) && (
                                      <p className="text-red-500 text-xs mt-1">
                                        {(error as any)["developmentFramewrok"]}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="my-3">
                                  <p className="text-sm my-1">
                                    Can you provide an overview of your coaching
                                    process and what I can expect from our
                                    sessions?
                                  </p>
                                  <div>
                                    <textarea
                                      rows={4}
                                      disabled={
                                        checkIfView === null ? false : true
                                      }
                                      required
                                      value={coachingProcessOverview}
                                      onChange={(e) => {
                                        const inputValue = e.target.value;

                                        setCoachingProcessOverview(inputValue);
                                        handleWordLimit(
                                          inputValue,
                                          50,
                                          80,
                                          "coachingProcessOverview"
                                        );
                                      }}
                                      placeholder="Outline the steps, approach, and what clients can expect in terms of structure, feedback, and support during the sessions."
                                      className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                                    />
                                    {Object.keys(error).includes(
                                      "coachingProcessOverview"
                                    ) && (
                                      <p className="text-red-500 text-xs mt-1">
                                        {
                                          (error as any)[
                                            "coachingProcessOverview"
                                          ]
                                        }
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="my-3">
                                  <p className="text-sm my-1">
                                    How do you handle situations where I feel
                                    stuck or unsure about my next steps?
                                  </p>
                                  <div>
                                    <textarea
                                      rows={4}
                                      disabled={
                                        checkIfView === null ? false : true
                                      }
                                      required
                                      value={handlingSituations}
                                      onChange={(e) => {
                                        const inputValue = e.target.value;

                                        setHandlingSituations(inputValue);
                                        handleWordLimit(
                                          inputValue,
                                          50,
                                          80,
                                          "handlingSituations"
                                        );
                                      }}
                                      placeholder="Describe the strategies and methods used to help clients navigate uncertainty, reframe challenges, and gain clarity in their next steps."
                                      className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                                    />
                                    {Object.keys(error).includes(
                                      "handlingSituations"
                                    ) && (
                                      <p className="text-red-500 text-xs mt-1">
                                        {(error as any)["handlingSituations"]}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="my-3">
                                  <p className="text-sm my-1">
                                    How can I integrate the lessons from these
                                    sessions into my daily life?
                                  </p>
                                  <div>
                                    <textarea
                                      rows={4}
                                      disabled={
                                        checkIfView === null ? false : true
                                      }
                                      required
                                      value={integratingLessons}
                                      onChange={(e) => {
                                        const inputValue = e.target.value;

                                        setIntegratongLessons(inputValue);
                                        handleWordLimit(
                                          inputValue,
                                          50,
                                          80,
                                          "integratingLessons"
                                        );
                                      }}
                                      placeholder="Provide actionable advice on how to apply insights and strategies gained from coaching into everyday routines and decision-making."
                                      className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                                    />
                                    {Object.keys(error).includes(
                                      "integratingLessons"
                                    ) && (
                                      <p className="text-red-500 text-xs mt-1">
                                        {(error as any)["integratingLessons"]}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="my-3">
                                  <p className="text-sm my-1">
                                    Can you provide guidance on how to
                                    effectively balance personal and
                                    professional goals during our coaching
                                    process?
                                  </p>
                                  <div>
                                    <textarea
                                      rows={4}
                                      disabled={
                                        checkIfView === null ? false : true
                                      }
                                      required
                                      value={guidanceOnCoachingProcess}
                                      onChange={(e) => {
                                        const inputValue = e.target.value;

                                        setGuidanceOnCoachingProcess(
                                          inputValue
                                        );
                                        handleWordLimit(
                                          inputValue,
                                          50,
                                          80,
                                          "guidanceOnCoachingProcess"
                                        );
                                      }}
                                      placeholder="Offer tips and strategies for managing both personal and professional aspirations, ensuring alignment and harmony between them throughout the coaching journey."
                                      className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                                    />
                                    {Object.keys(error).includes(
                                      "guidanceOnCoachingProcess"
                                    ) && (
                                      <p className="text-red-500 text-xs mt-1">
                                        {
                                          (error as any)[
                                            "guidanceOnCoachingProcess"
                                          ]
                                        }
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </>
                            )}
                            {(profileType === "mentor" ||
                              profileType === "coach-mentor") && (
                              <>
                                <hr />
                                <div className="my-3">
                                  <p className="text-sm my-1">
                                    As a mentor, what do you think are the
                                    different career paths available in this
                                    field? What are the core skills and
                                    understanding required to continuously grow
                                    in this field?
                                  </p>
                                  <div>
                                    <textarea
                                      rows={4}
                                      disabled={
                                        checkIfView === null ? false : true
                                      }
                                      required
                                      value={differentCareerPath}
                                      onChange={(e) => {
                                        const inputValue = e.target.value;

                                        setDifferentCareerPath(inputValue);
                                        handleWordLimit(
                                          inputValue,
                                          50,
                                          80,
                                          "differentCareerPath"
                                        );
                                      }}
                                      placeholder="There are plenty of career avenues like data analysis or software development. You can work on core skills like coding and statistical analysis."
                                      className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                                    />
                                    {Object.keys(error).includes(
                                      "differentCareerPath"
                                    ) && (
                                      <p className="text-red-500 text-xs mt-1">
                                        {(error as any)["differentCareerPath"]}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="my-3">
                                  <p className="text-sm my-1">
                                    What is the problem-solving approach in your
                                    domain and why do you think that is the
                                    right construct for growing in this field?
                                  </p>
                                  <div>
                                    <textarea
                                      rows={4}
                                      disabled={
                                        checkIfView === null ? false : true
                                      }
                                      required
                                      value={problemSolvingApproachInDomain}
                                      onChange={(e) => {
                                        const inputValue = e.target.value;

                                        setProblemSolvingApproachInDomain(
                                          inputValue
                                        );
                                        handleWordLimit(
                                          inputValue,
                                          50,
                                          80,
                                          "problemSolvingApproachInDomain"
                                        );
                                      }}
                                      placeholder="I like a problem-solving approach that emphasizes critical thinking and collaboration. In this field, effective solutions often arise from teamwork and well-defined methodologies."
                                      className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                                    />
                                    {Object.keys(error).includes(
                                      "problemSolvingApproachInDomain"
                                    ) && (
                                      <p className="text-red-500 text-xs mt-1">
                                        {
                                          (error as any)[
                                            "problemSolvingApproachInDomain"
                                          ]
                                        }
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <hr />
                                <div className="my-2">
                                  <h3 className="font-semibold text-base text-gray-600">
                                    Mentoring FAQs{" "}
                                    <span className="text-xl font-bold text-red-500">
                                      *
                                    </span>
                                  </h3>
                                  <p className="text-sm text-gray-600">
                                    Note: Answer these in first person as if you
                                    are answering directly to your mentee.
                                  </p>
                                </div>

                                <div className="my-3">
                                  <p className="text-sm my-1">
                                    Can you provide an overview of your
                                    mentoring approach and what I can expect
                                    from our sessions?
                                  </p>
                                  <div>
                                    <textarea
                                      rows={4}
                                      disabled={
                                        checkIfView === null ? false : true
                                      }
                                      required
                                      value={overviewofMentoring}
                                      onChange={(e) => {
                                        const inputValue = e.target.value;

                                        setOverviewOfMentoring(inputValue);
                                        handleWordLimit(
                                          inputValue,
                                          50,
                                          80,
                                          "overviewofMentoring"
                                        );
                                      }}
                                      placeholder=""
                                      className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                                    />
                                    {Object.keys(error).includes(
                                      "overviewofMentoring"
                                    ) && (
                                      <p className="text-red-500 text-xs mt-1">
                                        {(error as any)["overviewofMentoring"]}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="my-3">
                                  <p className="text-sm my-1">
                                    What opportunities for growth or advancement
                                    do you see in this field, and how can I
                                    position myself to capitalize on them?
                                  </p>
                                  <div>
                                    <textarea
                                      rows={4}
                                      disabled={
                                        checkIfView === null ? false : true
                                      }
                                      required
                                      value={opportunitiesOfGrowth}
                                      onChange={(e) => {
                                        const inputValue = e.target.value;

                                        setOpportunitiesOfGrowth(inputValue);
                                        handleWordLimit(
                                          inputValue,
                                          50,
                                          80,
                                          "opportunitiesOfGrowth"
                                        );
                                      }}
                                      placeholder=""
                                      className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                                    />
                                    {Object.keys(error).includes(
                                      "opportunitiesOfGrowth"
                                    ) && (
                                      <p className="text-red-500 text-xs mt-1">
                                        {
                                          (error as any)[
                                            "opportunitiesOfGrowth"
                                          ]
                                        }
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="my-3">
                                  <p className="text-sm my-1">
                                    What are some common challenges or obstacles
                                    that individuals face when pursuing success
                                    in this field, and what strategies do you
                                    suggest for overcoming them?
                                  </p>
                                  <div>
                                    <textarea
                                      rows={4}
                                      disabled={
                                        checkIfView === null ? false : true
                                      }
                                      required
                                      value={commonChallengesOrObstacles}
                                      onChange={(e) => {
                                        const inputValue = e.target.value;

                                        setCommenChallengesOrObstacles(
                                          inputValue
                                        );
                                        handleWordLimit(
                                          inputValue,
                                          50,
                                          80,
                                          "commenChallengesOrObstacles"
                                        );
                                      }}
                                      placeholder=""
                                      className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                                    />
                                    {Object.keys(error).includes(
                                      "commenChallengesOrObstacles"
                                    ) && (
                                      <p className="text-red-500 text-xs mt-1">
                                        {
                                          (error as any)[
                                            "commenChallengesOrObstacles"
                                          ]
                                        }
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="my-3">
                                  <p className="text-sm my-1">
                                    In your opinion, what are the key qualities
                                    or skills that contribute to success in the
                                    field I'm aiming to excel in, and how can I
                                    develop or enhance them?
                                  </p>
                                  <div>
                                    <textarea
                                      rows={4}
                                      disabled={
                                        checkIfView === null ? false : true
                                      }
                                      required
                                      value={opinionsAboutKeyQualities}
                                      onChange={(e) => {
                                        const inputValue = e.target.value;

                                        setOpinionsAboutKeyQualities(
                                          inputValue
                                        );
                                        handleWordLimit(
                                          inputValue,
                                          50,
                                          80,
                                          "opinionsAboutKeyQualities"
                                        );
                                      }}
                                      placeholder=""
                                      className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                                    />
                                    {Object.keys(error).includes(
                                      "opinionsAboutKeyQualities"
                                    ) && (
                                      <p className="text-red-500 text-xs mt-1">
                                        {
                                          (error as any)[
                                            "opinionsAboutKeyQualities"
                                          ]
                                        }
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </>
                            )}
                          </AccordionContent>{" "}
                        </AccordionItem>
                      </Accordion>
                    </>
                  )}
                  {formVersion !== "1" && formVersion !== "2" && (
                    <>
                      <Accordion
                        type="single"
                        collapsible
                        className="w-full mt-4 mx-0 border rounded-md"
                      >
                        <AccordionItem value="item-coaching-faqs">
                          <AccordionTrigger className="text-sm py-0 font-bold p-2 border-none px-2">
                            <div>
                              Quick Match Analysis.{" "}
                              <span className="text-xl font-bold text-red-500">
                                *
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-2 border-none">
                            <p className="text-sm text-gray-600">
                              This section analyzes your fitment with the
                              participant, as if it were a face to face
                              engagement.
                            </p>
                            <div className="my-3">
                              <p className="text-sm my-1">
                                What level of participant you want to interact
                                with ?
                              </p>
                              <div className="my-2 mb-3">
                                <RadioGroup
                                  required
                                  disabled={checkIfView === null ? false : true}
                                  value={participantLevel}
                                  onValueChange={(value) => {
                                    setDataModified(true);
                                    setParticipantLevel(value);
                                  }}
                                >
                                  {["Some Junior", "Any level"].map(
                                    (val, i) => (
                                      <div
                                        key={i}
                                        className="flex items-center space-x-2 "
                                      >
                                        <RadioGroupItem
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
                                    )
                                  )}
                                </RadioGroup>
                                {Object.keys(error).includes(
                                  "ParticipantLevel"
                                ) && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {(error as any)["ParticipantLevel"]}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="my-3">
                              <p className="text-sm my-1">
                                I want to coach & mentor someone in the same
                                department.
                              </p>
                              <div className="my-2 mb-3">
                                <RadioGroup
                                  disabled={checkIfView === null ? false : true}
                                  required
                                  value={coachMentInSameDep}
                                  onValueChange={(value) => {
                                    setDataModified(true);
                                    setCochMentInSameDep(value);
                                  }}
                                >
                                  {["Yes", "No"].map((val, i) => (
                                    <div
                                      key={i}
                                      className="flex items-center space-x-2 "
                                    >
                                      <RadioGroupItem
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
                                {Object.keys(error).includes(
                                  "coachSameDepartment"
                                ) && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {(error as any)["coachSameDepartment"]}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="my-3">
                              <p className="text-sm my-1">
                                What kind of outcome can you support in these
                                sessions the most?
                              </p>
                              <div className="my-2 mb-3">
                                <RadioGroup
                                  disabled={checkIfView === null ? false : true}
                                  value={outcomeSupported}
                                  required
                                  onValueChange={(value) => {
                                    setDataModified(true);
                                    setOutcomeSupported(value);
                                  }}
                                >
                                  {[
                                    "Career Advancement",
                                    "Skill Development",
                                    "Introspection & Reflection",
                                    "Networking & Leadership",
                                  ].map((val, i) => (
                                    <div
                                      key={i}
                                      className="flex items-center space-x-2 "
                                    >
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
                                {Object.keys(error).includes(
                                  "SupportOutcome"
                                ) && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {(error as any)["SupportOutcome"]}
                                  </p>
                                )}
                              </div>
                            </div>
                          </AccordionContent>{" "}
                        </AccordionItem>
                      </Accordion>
                    </>
                  )}
                  {!checkIfView && <hr className="my-2" />}

                  {!checkIfView && (
                    <>
                      <div className="flex items-start space-x-2 my-4">
                        <Checkbox
                          checked={
                            checkIfEdit ? true : Boolean(privacyInfoChecked)
                          }
                          onCheckedChange={(checked) => {
                            setPrivaciInfoChecked(checked);
                          }}
                        />
                        <label className="text-sm text-gray-700">
                          We respect your data and privacy. Any data is handled
                          per the data security and privacy policy of the
                          organization holding the platform license. Please
                          contact your program administrator for removal
                          requests. Any AI assets created by the users are
                          considered the property of the organization the
                          individuals are affiliated with.
                        </label>
                      </div>
                      <div>
                        {checkIfEdit ? (
                          <Button
                            disabled={createLoading || !dataModified}
                            className="h-8 w-full"
                          >
                            {" "}
                            {createLoading ? (
                              <>
                                <Loader className="h-5 w-5 animate-spin mr-2" />{" "}
                                Saving
                              </>
                            ) : (
                              <>
                                Save Changes{" "}
                                <PenLine className="ml-2 h-5 w-5" />
                              </>
                            )}
                          </Button>
                        ) : (
                          <Button
                            disabled={createLoading || !privacyInfoChecked}
                            className="h-8 w-full"
                          >
                            {" "}
                            {createLoading ? (
                              <>
                                <Loader className="h-5 w-5 animate-spin mr-2" />{" "}
                                Submitting
                              </>
                            ) : (
                              <>
                                Submit{" "}
                                <SendHorizonal className="ml-2 h-4 w-4" />
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </>
                  )}
                  {checkIfEdit &&
                    clientInfoData?.user_info[0]
                      .send_profile_for_reapproval && (
                      <div className="flex flex-row mt-2">
                        <Info className="h-4 w-4 mr-1 inline text-red-400" />
                        <p className=" w-fit text-xs font-semibold text-red-400">
                          Upon Save, the bot will be temporarily not available
                          unless approved.
                        </p>
                      </div>
                    )}
                </div>
              </form>
            </div>
          </div>
        )}
        {formType === "coachee" && (
          <div className="flex flex-col justify-center items-center w-full">
            <div className="bg-white border w-[60%] max-lg:w-[80%] max-sm:w-[90%] h-fit p-4 mt-5 rounded-md mb-4">
              <h1 className="text-xl text-left text-gray-600 font-bold">
                Coachee Intake
              </h1>
              <p className="mb-3 text-left text-sm text-gray-600">
                Use this to add yourself to your organization's mentoring and
                coaching network.
              </p>
              <form
                className="text-left"
                onSubmit={async (e: FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  const is_proceed = await handleRequiredSelections("coachee");
                  console.log("error", error);
                  const errors = Object.values(error).filter(
                    //@ts-ignore
                    (err: string) => err.length > 0
                  );
                  if (errors.length > 0 || !is_proceed) {
                    toast.warning("Please enter the valid inputs.");
                  } else {
                    createSubmitHandler(e);
                  }
                }}
              >
                {checkIfView && (
                  <Badge
                    className="bg-blue-200 w-fit text-blue-800 rounded-sm"
                    variant={"outline"}
                  >
                    You are viewing your profile.
                  </Badge>
                )}
                {!checkIfView && (
                  <Badge
                    variant={"secondary"}
                    className="rounded-sm bg-[#fef3c7] text-[#d97706] p-1 w-fit"
                  >
                    <Asterisk className="h-4 w-4 mr-1" /> marked questions are
                    mandatory in nature.
                  </Badge>
                )}
                <div>
                  <div className="my-3">
                    <p className="text-sm my-1">Select your profile type</p>
                    <Radio.Group
                      defaultValue={"coachee"}
                      disabled={
                        (checkIfEdit === null ? false : true) ||
                        (checkIfView === null ? false : true)
                      }
                      value={profileType}
                      options={[
                        {
                          label: "Coachee",
                          value: "coachee",
                        },
                        {
                          label: "Mentee",
                          value: "mentee",
                        },
                      ]}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setProfileType(e.target.value);
                      }}
                      optionType="button"
                    />
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Enter your name{" "}
                      <span className="text-xl font-bold text-red-500">*</span>
                    </p>
                    <input
                      required
                      value={name}
                      minLength={10}
                      maxLength={30}
                      disabled
                      onChange={(e) => {
                        setName(e.target.value);
                        handleWordLimit(e.target.value, 10, 30, "Name");
                      }}
                      placeholder="Aarav Sharma"
                      type="text"
                      className="w-full hover:cursor-not-allowed bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                    />
                    {/* {Object.keys(error).includes("Name") && (
                      <p className="text-red-500 text-xs mt-1">
                        {(error as any)["Name"]}
                      </p>
                    )} */}

                    {/* {error && <p className="text-red-500 text-xs mt-1">{error}</p>} */}
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Please add a profile description.{" "}
                      <span className="text-xl font-bold text-red-500">*</span>
                    </p>
                    <textarea
                      value={about}
                      disabled={checkIfView === null ? false : true}
                      required
                      onChange={(e) => {
                        const inputValue = e.target.value;

                        setAbout(inputValue);
                        handleWordLimit(
                          inputValue,
                          30,
                          80,
                          "Profile Description"
                        );
                      }}
                      placeholder="Briefly share your background, goals, and what you're seeking in a coaching or mentoring relationship."
                      rows={3}
                      className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                    />
                    {Object.keys(error).includes("Profile Description") && (
                      <p className="text-red-500 text-xs mt-1">
                        {(error as any)["Profile Description"]}
                      </p>
                    )}
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Total number of years of experience.{" "}
                      <span className="text-xl font-bold text-red-500">*</span>
                    </p>
                    <div>
                      <RadioGroup
                        disabled={checkIfView === null ? false : true}
                        value={experience}
                        required
                        onValueChange={(value) => {
                          setDataModified(true);
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
                        <br />
                      </RadioGroup>
                      {Object.keys(error).includes("UserExperience") && (
                        <p className="text-red-500 text-xs mt-1">
                          {(error as any)["UserExperience"]}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="my-4">
                    <p className="text-sm my-1">
                      Please add a profile picture for adding to your profile.
                    </p>
                    <div className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 ">
                      <input
                        disabled={checkIfView === null ? false : true}
                        // required={!checkIfEdit}
                        type="file"
                        name="myImage"
                        accept="image/*"
                        onChange={(e) => {
                          //@ts-ignore
                          setProfileImage(e.target.files[0]);

                          if (checkIfEdit) {
                            const uploadedImage = handleImageUpload(
                              //@ts-ignore
                              e.target.files[0]
                            );
                            uploadedImage
                              .then((data) => {
                                setProfileImageUrl(data);
                                setDataModified(true);
                                console.log(data);
                              })
                              .catch((err) => {
                                setDataModified(true);
                                setProfileImageUrl(
                                  "https://res.cloudinary.com/dtbl4jg02/image/upload/v1715941993/naqedaza5tw8isro11qr.png"
                                );

                                throw new Error(
                                  "Claudinary upload error - profile_image"
                                );
                              });
                          }
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
                      rate yourself near the lows.{" "}
                      <span className="text-xl font-bold text-red-500">*</span>
                    </p>
                    <CharactericticsSelect
                      disabled={checkIfView === null ? false : true}
                      value={characteristicsRateLows}
                      onCharacteristicsSelect={onCharacteristicsSelectLow}
                      options={characteristicsList}
                    />
                    {Object.keys(error).includes("LowCompetency") && (
                      <p className="text-red-500 text-xs mt-1">
                        {(error as any)["LowCompetency"]}
                      </p>
                    )}
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Please rate the characteristics/skills on which you will
                      rate yourself highly.{" "}
                      <span className="text-xl font-bold text-red-500">*</span>
                    </p>
                    <CharactericticsSelect
                      disabled={checkIfView === null ? false : true}
                      value={characteristicsRateHigh}
                      onCharacteristicsSelect={onCharacteristicsSelectHigh}
                      options={characteristicsList}
                    />
                    {Object.keys(error).includes("HighCompetency") && (
                      <p className="text-red-500 text-xs mt-1">
                        {(error as any)["HighCompetency"]}
                      </p>
                    )}
                  </div>
                  <hr className="mt-2" />
                  <div className="my-3 ">
                    <p className="text-sm my-1">
                      Please upload any personality assessment (e.g. DISC) or
                      other profiles that you might have. It will be used for
                      recommendation of the appropriate coaching style.
                    </p>

                    <div className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 ">
                      <input
                        disabled={checkIfView === null ? false : true}
                        // required={!checkIfEdit}
                        type="file"
                        className="w-full text-xs my-2"
                        multiple
                        name="optional_file"
                        accept=".pdf,.docx"
                        onChange={async (e) => {
                          handleFileChange(e, "PersonalityFile3");
                        }}
                      />
                      {Object.keys(error).includes("PersonalityFile3") && (
                        <p className="text-red-500 text-xs mt-1">
                          {(error as any)["PersonalityFile3"]}
                        </p>
                      )}
                    </div>
                  </div>
                  {/* @ts-ignore */}
                  {optionalMediaData?.extracted_from_optional_file.length > 0 &&
                    switchState.from === formVersion && (
                      <div className="w-full bg-red-50 border border-red-200 rounded-md p-2 max-sm:px-1 flex flex-col gap-1">
                        {optionalMediaData?.extracted_from_optional_file.map(
                          (item) => (
                            <div className="flex flex-row justify-between items-center">
                              <div className="flex flex-row items-center gap-2">
                                <File className="h-4 w-4 ml-2 max-sm:ml-0 inline" />{" "}
                                <span
                                  className={`text-xs text-blue-500 truncate ${
                                    item.isDeleted && "line-through"
                                  }`}
                                >
                                  {item.fileName}
                                </span>
                              </div>
                              {checkIfEdit && (
                                <div className="flex flex-row gap-2 min-w-fit">
                                  <Button
                                    variant={"outline"}
                                    className="h-6 text-xs w-fit"
                                    type="button"
                                    disabled={item.isDeleted}
                                    onClick={() => {
                                      deleteOptionalMediaDataHandler(
                                        item.fileName
                                      );
                                    }}
                                  >
                                    <span className="max-sm:hidden">
                                      Delete
                                    </span>
                                    <TooltipWrapper
                                      className="hidden max-sm:block text-xs"
                                      tooltipName="Delete"
                                      body={
                                        <Trash2 className="h-3 w-3 ml-2 max-sm:ml-0" />
                                      }
                                    />
                                  </Button>
                                  <Button
                                    variant={"outline"}
                                    className="h-6 text-xs w-fit"
                                    type="button"
                                    disabled={!item.isDeleted}
                                    onClick={() => {
                                      undoDeleteOptionalMediaDataHandler(
                                        item.fileName
                                      );
                                    }}
                                  >
                                    <span className="max-sm:hidden">
                                      Undo delete
                                    </span>
                                    <TooltipWrapper
                                      className="hidden max-sm:block text-xs"
                                      tooltipName="Undo delete"
                                      body={
                                        <UndoDot className="h-4 w-4 ml-2 max-sm:ml-0" />
                                      }
                                    />
                                  </Button>
                                </div>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  <hr className="mt-2" />
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Please list your department affiliation.{" "}
                      <span className="text-xl font-bold text-red-500">*</span>
                    </p>
                    <RadioGroup
                      required
                      disabled={checkIfView === null ? false : true}
                      onValueChange={(value) => {
                        setDataModified(true);
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
                    {Object.keys(error).includes("UserDepartment") && (
                      <p className="text-red-500 text-xs mt-1">
                        {(error as any)["UserDepartment"]}
                      </p>
                    )}
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      Please add the discussion topics (Separated by comma)
                    </p>
                    <div>
                      <textarea
                        rows={2}
                        disabled={checkIfView === null ? false : true}
                        // required={!checkIfEdit}
                        value={discussionTopics}
                        onChange={(e) => {
                          setDataModified(true);
                          setDiscussionTopics(e.target.value);
                          handleDiscussionTopics(
                            e.target.value,
                            "discussionTopics"
                          );
                        }}
                        placeholder="You can enter 4- 5 Discussion Topics you'd like to discuss. eg: Talent empowerment. Please seperate each topic using comma."
                        className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400  resize-none"
                      />
                    </div>
                    {Object.keys(error).includes("discussionTopics") && (
                      <p className="text-red-500 text-xs mt-1">
                        {(error as any)["discussionTopics"]}
                      </p>
                    )}
                  </div>
                  <hr className="my-2" />
                  <div className="my-2">
                    <h3 className="font-semibold text-base text-gray-600">
                      Quick Match Analysis{" "}
                      <span className="text-xl font-bold text-red-500">*</span>
                    </h3>
                    <p className="text-sm text-gray-600">
                      This section analyzes your fitment with the coach &
                      mentor, as if it were a face to face engagement.
                    </p>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      What level of coach/mentor do you want to interact with?
                    </p>
                    <div className="my-2 mb-3">
                      <RadioGroup
                        required
                        disabled={checkIfView === null ? false : true}
                        value={participantLevel}
                        onValueChange={(value) => {
                          setDataModified(true);
                          setParticipantLevel(value);
                        }}
                      >
                        {["Someone Senior", "Any level"].map((val, i) => (
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
                      {Object.keys(error).includes("ParticipantLevel") && (
                        <p className="text-red-500 text-xs mt-1">
                          {(error as any)["ParticipantLevel"]}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      I want a coach & mentor someone from the same department.
                    </p>
                    <div className="my-2 mb-3">
                      <RadioGroup
                        disabled={checkIfView === null ? false : true}
                        required
                        value={coachMentInSameDep}
                        onValueChange={(value) => {
                          setDataModified(true);
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
                      {Object.keys(error).includes("coachSameDepartment") && (
                        <p className="text-red-500 text-xs mt-1">
                          {(error as any)["coachSameDepartment"]}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="my-3">
                    <p className="text-sm my-1">
                      What kind of outcome do you want from these sessions the
                      most?
                    </p>
                    <div className="my-2 mb-3">
                      <RadioGroup
                        disabled={checkIfView === null ? false : true}
                        value={outcomeSupported}
                        required
                        onValueChange={(value) => {
                          setDataModified(true);
                          setOutcomeSupported(value);
                        }}
                      >
                        {[
                          "Career Advancement",
                          "Skill Development",
                          "Introspection & Reflection",
                          "Networking & Leadership",
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
                      {Object.keys(error).includes("SupportOutcome") && (
                        <p className="text-red-500 text-xs mt-1">
                          {(error as any)["SupportOutcome"]}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="my-2 mb-3">
                    <p className="text-sm my-1">
                      Please describe in detail the challenges you believe the
                      coach or mentor can help with.{" "}
                      <span className="text-xl font-bold text-red-500">*</span>
                    </p>
                    <div>
                      <textarea
                        rows={2}
                        disabled={checkIfView === null ? false : true}
                        required
                        value={challengesToHelp}
                        onChange={(e) => {
                          setDataModified(true);
                          const inputValue = e.target.value;

                          setChallengesToHelp(inputValue);
                          handleProblemStatement(
                            inputValue,
                            "challengesToHelp"
                          );
                        }}
                        placeholder=""
                        className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                      />
                      {Object.keys(error).includes("challengesToHelp") && (
                        <p className="text-red-500 text-xs mt-1">
                          {(error as any)["challengesToHelp"]}
                        </p>
                      )}
                    </div>
                  </div>

                  {!checkIfView && (
                    <>
                      <hr className="my-2" />
                      <div className="flex items-start space-x-2 my-1.5 ">
                        <Checkbox
                          checked={
                            checkIfEdit ? true : Boolean(privacyInfoChecked)
                          }
                          onCheckedChange={(checked) => {
                            setPrivaciInfoChecked(checked);
                          }}
                        />
                        <label className="text-xs text-gray-700">
                          We respect your data and privacy. Any data is handled
                          per the data security and privacy policy of the
                          organization holding the platform license. Please
                          contact your program administrator for removal
                          requests. Any AI assets created by the users are
                          considered the property of the organization the
                          individuals are affiliated with.
                        </label>
                      </div>
                      <div className="flex flec-col">
                        {checkIfEdit ? (
                          <Button
                            disabled={createLoading || !dataModified}
                            className="h-8"
                          >
                            {" "}
                            {createLoading ? (
                              <>
                                <Loader className="h-5 w-5 animate-spin mr-2" />{" "}
                                Saving
                              </>
                            ) : (
                              <>
                                Save Changes{" "}
                                <PenLine className="ml-2 h-5 w-5" />
                              </>
                            )}
                          </Button>
                        ) : (
                          <Button
                            disabled={createLoading || !privacyInfoChecked}
                            className="h-8"
                          >
                            {" "}
                            {createLoading ? (
                              <>
                                <Loader className="h-5 w-5 animate-spin mr-2" />{" "}
                                Submitting
                              </>
                            ) : (
                              <>
                                Submit{" "}
                                <SendHorizonal className="ml-2 h-4 w-4" />
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </>
                  )}
                  {/* {checkIfEdit && (
                    <div className="flex flex-row mt-2">
                      <Info className="h-4 w-4 mr-1 inline text-red-400" />
                      <p className=" w-fit text-xs font-semibold text-red-400">
                        Upon Save, the bot will be temporarily not available
                        unless approved.
                      </p>
                    </div>
                  )} */}
                </div>
              </form>
            </div>
          </div>
        )}
        {formType === "feedback" && (
          <div className="flex flex-col justify-center items-center w-full">
            <div className="bg-white border  w-[60%] max-md:w-[80%] max-lg:w-[80%] max-sm:w-[90%] h-fit p-4 mt-5 rounded-md mb-4 ">
              <h1 className="text-xl text-left text-gray-600 font-bold">
                Feedback Intake
              </h1>
              <p className="mb-3 text-left text-sm text-gray-600">
                Information provided will be used to create feedback bot!
              </p>

              <form
                className="text-left"
                onSubmit={(e: FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  const errors = Object.values(error).filter(
                    //@ts-ignore
                    (err: string) => err.length > 0
                  );
                  if (errors.length > 0) {
                    toast.warning("Please enter the valid inputs.");
                  } else {
                    createFeedbackSubmitHandler(e);
                  }
                }}
              >
                <div className="flex flex-col gap-2">
                  {!checkIfView && (
                    <Badge
                      variant={"secondary"}
                      className="rounded-sm bg-[#fef3c7] text-[#d97706] p-1 w-fit"
                    >
                      <Asterisk className="h-4 w-4 mr-1" /> marked questions are
                      mandatory in nature.
                    </Badge>
                  )}
                  {checkIfView && (
                    <Badge
                      className="bg-blue-200 w-fit text-blue-800 rounded-sm"
                      variant={"outline"}
                    >
                      You are viewing your bot.
                    </Badge>
                  )}
                  {checkIfEdit && (
                    <Badge
                      className="bg-blue-200 w-fit text-blue-800 rounded-sm"
                      variant={"outline"}
                    >
                      You are editing your bot. All the earlier inputs will be
                      replaced by current inputs.
                    </Badge>
                  )}
                </div>
                <div className="my-3">
                  <p className="text-sm my-1">
                    Enter your name{" "}
                    <span className="text-xl font-bold text-red-500">*</span>
                  </p>
                  <input
                    value={name}
                    required
                    minLength={10}
                    maxLength={30}
                    disabled
                    onChange={(e) => {
                      setName(e.target.value);
                      handleWordLimit(e.target.value, 10, 30, "Name");
                    }}
                    placeholder="Aarav Sharma"
                    type="text"
                    className="w-full hover:cursor-not-allowed bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                  />
                  {/* {Object.keys(error).includes("Name") && (
                    <p className="text-red-500 text-xs mt-1">
                      {(error as any)["Name"]}
                    </p>
                  )} */}
                </div>
                <div className="my-3">
                  <p className="text-sm my-1">
                    Please add a short profile bio.{" "}
                    <span className="text-xl font-bold text-red-500">*</span>
                  </p>
                  <textarea
                    value={profileBio}
                    required
                    disabled={checkIfView === null ? false : true}
                    onChange={(e) => {
                      const inputValue = e.target.value;

                      setProfileBio(inputValue);
                      handleWordLimit(inputValue, 20, 50, "Profile Bio");
                    }}
                    placeholder="Passionate about personal growth and seeking guidance to overcome challenges and achieve my goals. Excited to work with a coach who can support me on this transformative journey..."
                    rows={3}
                    className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                  />
                  {Object.keys(error).includes("Profile Bio") && (
                    <p className="text-red-500 text-xs mt-1">
                      {(error as any)["Profile Bio"]}
                    </p>
                  )}
                </div>

                <div className="my-3">
                  <p className="text-sm my-1">
                    Please enter your Current Projects{" "}
                    <span className="text-xl font-bold text-red-500">*</span>
                  </p>
                  <textarea
                    value={currentProjects}
                    disabled={checkIfView === null ? false : true}
                    required
                    onChange={(e) => {
                      const inputValue = e.target.value;

                      setCurrentProjects(inputValue);
                      handleWordLimit(inputValue, 20, 80, "currentProjects");
                    }}
                    placeholder="Highlighting the exciting projects I'm currently working on, including [Project 1], [Project 2], and [Project 3]..."
                    rows={3}
                    className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                  />
                  {Object.keys(error).includes("currentProjects") && (
                    <p className="text-red-500 text-xs mt-1">
                      {(error as any)["currentProjects"]}
                    </p>
                  )}
                </div>
                <div className="my-3">
                  <p className="text-sm my-1">
                    Please rate the characteristics/skills on which you will
                    rate yourself near the lows.{" "}
                    <span className="text-xl font-bold text-red-500">*</span>
                  </p>
                  <CharactericticsSelect
                    disabled={checkIfView === null ? false : true}
                    value={characteristicsRateLows}
                    onCharacteristicsSelect={onCharacteristicsSelectLow}
                    options={characteristicsList}
                  />
                  {Object.keys(error).includes("LowCompetency") && (
                    <p className="text-red-500 text-xs mt-1">
                      {(error as any)["LowCompetency"]}
                    </p>
                  )}
                </div>
                <div className="my-3">
                  <p className="text-sm my-1">
                    Please rate the characteristics/skills on which you will
                    rate yourself highly.{" "}
                    <span className="text-xl font-bold text-red-500">*</span>
                  </p>
                  <CharactericticsSelect
                    disabled={checkIfView === null ? false : true}
                    value={characteristicsRateHigh}
                    onCharacteristicsSelect={onCharacteristicsSelectHigh}
                    options={characteristicsList}
                  />
                  {Object.keys(error).includes("HighCompetency") && (
                    <p className="text-red-500 text-xs mt-1">
                      {(error as any)["HighCompetency"]}
                    </p>
                  )}
                </div>

                {!checkIfView && (
                  <>
                    <hr className="my-2" />
                    <div className="flex items-start space-x-2 my-1.5 ">
                      <Checkbox
                        disabled={checkIfView === null ? false : true}
                        checked={
                          checkIfEdit ? true : Boolean(privacyInfoChecked)
                        }
                        onCheckedChange={(checked) => {
                          setPrivaciInfoChecked(checked);
                        }}
                      />
                      <label className="text-xs text-gray-700">
                        We respect your data and privacy. Any data is handled
                        per the data security and privacy policy of the
                        organization holding the platform license. Please
                        contact your program administrator for removal requests.
                        Any AI assets created by the users are considered the
                        property of the organization the individuals are
                        affiliated with.
                      </label>
                    </div>

                    <div>
                      {checkIfEdit ? (
                        <Button
                          disabled={feedbackCreateLoading || !dataModified}
                          className="h-8"
                        >
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
                        <Button
                          disabled={
                            feedbackCreateLoading || !privacyInfoChecked
                          }
                          className="h-8"
                        >
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
                  </>
                )}
                {/* {checkIfEdit && (
                  <div className="flex flex-row mt-2">
                    <Info className="h-4 w-4 mr-1 inline text-red-400" />
                    <p className=" w-fit text-xs font-semibold text-red-400">
                      Upon Save, the bot will be temporarily not available
                      unless approved.
                    </p>
                  </div>
                )} */}
              </form>
            </div>
          </div>
        )}
      </MaxWidthWrapper>
    </div>
  );
};

export default CoachIntake;
