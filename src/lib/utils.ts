import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Metadata } from "next";
import {
  AllUserDataType,
  Categories,
  ClientDataType,
  ClientUserTeamType,
  Conversation,
  ConvertedConversation,
  ConvertedResult,
  DomainData,
  ExtractedData,
  ExtractedDataCochee,
  MediaData,
  OptionalMediaData,
  TestData,
  UserIDPsType,
  UserInfoType,
} from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructMetadata({
  title = "Coachbot - Playground",
  description = "",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@ffalah_",
    },
    icons,
    metadataBase: new URL("https://coachbots.com"),
    // themeColor: "#FFF",
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

export const convertDate = (date: string) => {
  const utcTimestamp = new Date(date);
  const istOptions = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "2-digit",
  } as Intl.DateTimeFormatOptions;

  const istDateString = utcTimestamp.toLocaleString("en-US", istOptions);
  return istDateString;
};

export const convertDateWithTime = (date: string) => {
  const utcTimestamp = new Date(date);
  const istOptions = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false, // Use 24-hour format
  } as Intl.DateTimeFormatOptions;

  const istDateString = utcTimestamp.toLocaleString("en-US", istOptions);
  return istDateString;
};

interface ActionPoints {
  feedback_given: number;
  feedback_received: number;
  chat_attempted: number;
  transcript_email_received: number;
  transcript_email_sent: number;
  interaction_attempted: number;
}

interface ActionPointsData {
  action_points: ActionPoints;
}

export function calculateTotalActionPoints(jsonData: ActionPointsData): number {
  const actionPoints: ActionPoints = jsonData.action_points;
  const totalActionPoints: number = Object.values(actionPoints).reduce(
    (total, points) => total + points,
    0
  );
  return totalActionPoints;
}

export function capitalizeText(text: string) {
  if (typeof text !== "string" || text.length === 0) {
    return text;
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
}

// api endpoints via subdomain match
export const subdomain =
  typeof window !== "undefined" ? window.location.hostname.split(".")[0] : null;
export const devUrl = "https://coach-api-gke-dev.coachbots.com/api/v1";
// export const devUrl =  "http://127.0.0.1:8001/api/v1"
export const prodUrl = "https://coach-api-gke-prod.coachbots.com/api/v1";
const ENVIRONMENT = process.env.NEXT_PUBLIC_ENV;

export const baseURL = ENVIRONMENT === "prod" ? prodUrl : devUrl;

export const basicAuth =
  "Basic Yzc3MjFmZGItYTllMC00YTYxLWEzMTYtNDRhODA1N2VkMjY0OjhjNWNlZWZlLTY2Y2QtNDliZi04MTY5LTBhNjMwMmU5NmZlMA==";

export const hideBots = () => {
  const coachtalk = document.getElementsByClassName("coachbots-coachtalk")[0];
  const coachScribe = document.getElementsByClassName(
    "coachbots-coachscribe"
  )[0];

  if (coachScribe && coachtalk) {
    coachtalk.setAttribute("style", "display: none;");
    coachScribe.setAttribute("style", "display: none;");
  }
};


export const getUserAccount = async (user: any) => {
  await CreateOrAssignClientId(user.email);
  return fetch(`${baseURL}/accounts/`, {
    method: "POST",
    headers: {
      Authorization: basicAuth,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_context: {
        name: `${user.given_name} ${user.family_name ? user.family_name : ""}`,
        role: "member",
        user_attributes: {
          tag: "deepchat_profile",
          attributes: {
            name: `${user.given_name} ${
              user.family_name ? user.family_name : ""
            }`,
            username: `${user.given_name} ${
              user.family_name ? user.family_name : ""
            }`,
            email: user.email,
          },
        },
      },
      identity_context: {
        identity_type: "deepchat_unique_id",
        value: user.email,
      },
    }),
  });
};

export const getUserAccounts = async (
  user: any,
  retry: boolean = true
): Promise<any> => {
  try {
console.log('base url getuser', baseURL, ENVIRONMENT)
    const response = await fetch(`${baseURL}/accounts/`, {
      method: "POST",
      headers: {
        Authorization: basicAuth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_context: {
          name: `${user.given_name} ${user.family_name || ""}`,
          role: "member",
          user_attributes: {
            tag: "deepchat_profile",
            attributes: {
              name: `${user.given_name} ${user.family_name || ""}`,
              username: `${user.given_name} ${user.family_name || ""}`,
              email: user.email,
            },
          },
        },
        identity_context: {
          identity_type: "deepchat_unique_id",
          value: user.email,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json() as Promise<any>; // Typecast response to UserAccountResponse
  } catch (error) {
    if (retry) {
      console.warn("Request failed, retrying once...");
      return getUserAccounts(user, false);
    } else {
      console.error("Request failed after retrying:", error);
      throw error; // Rethrow the error after a failed retry
    }
  }
};

export function findCoacheeUID(profiles: any) {
  for (let i = 0; i < profiles.length; i++) {
    if (
      profiles[i].profile_type === "coachee" ||
      profiles[i].profile_type === "mentee"
    ) {
      return profiles[i].uid;
    }
  }
  return "";
}

export function findCoachUID(profiles: any) {
  for (let i = 0; i < profiles.length; i++) {
    if (
      profiles[i].profile_type === "coach" ||
      profiles[i].profile_type === "mentor"
    ) {
      return profiles[i].uid;
    }
  }
  return "";
}

export function findBotIds(profiles: any) {
  for (let i = 0; i < profiles.length; i++) {
    if (
      profiles[i].profile_type === "coach" ||
      profiles[i].profile_type === "mentor"
    ) {
      return profiles[i].bot_ids;
    }
  }
  return "";
}

export function getBotById(botId: string, jsonData: any) {
  for (const item of jsonData) {
    if (item.signature_bot && item.signature_bot.bot_id === botId) {
      return item;
    }
  }
  return null;
}
export function reportsLinksSelector() {
  if (subdomain === "platform") {
    return "https://myreport.coachbots.com";
  } else {
    return "https://myreportdev.coachbots.com";
  }
}

export function hasPassed48Hours(inputDate: string) {
  const inputDateTime = new Date(inputDate);
  const currentDateTime = new Date();
  const timeDifference = currentDateTime.getTime() - inputDateTime.getTime();
  const millisecondsIn24Hours = 48 * 60 * 60 * 1000;

  return timeDifference >= millisecondsIn24Hours;
}

export function hasPassed5Days(inputDate: string) {
  const inputDateTime = new Date(inputDate);
  const currentDateTime = new Date();
  const timeDifference = currentDateTime.getTime() - inputDateTime.getTime();
  const millisecondsIn5Days = 5 * 24 * 60 * 60 * 1000;

  return timeDifference >= millisecondsIn5Days;
}

export function convertTextToCorrectFormat(text: string) {
  return text
    .replace(/_/g, " ") // Replace underscores with spaces
    .split(/\s+/)
    .map((word) =>
      word.replace(/(?:^|\s)([a-z])/g, (match, group) => group.toUpperCase())
    )
    .join(" ");
}

export interface CoachesDataType {
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

export interface ParticipantsforLeaderBoardTypes {
  name: string;
  avatar_bot_count: number;
  subject_matter_count: number;
  total_bots: number;
  total_simulations: number;
  total_bot_interactions: number;
  session_notes_count: number;
  profile_type: string;
  total_score: number;
  user_id: string;
  rating: number;
}

export function configureTestsData(
  inputJson: Record<string, Record<string, TestData[]>>
): Categories {
  const configuredData: Categories = Object.entries(inputJson).map(
    ([categoryName, domainTests]) => {
      let domainFilterOptions: { value: string; label: string }[] = [];
      const testsData: DomainData[] = Object.entries(domainTests).map(
        ([domain, tests]) => {
          const testsArray: TestData[] = tests.map((test) => ({
            title: test.title,
            description: test.description,
            test_code: test.test_code,
            test_type: test.test_type,
            is_recommended: test.is_recommended,
            is_micro: test.is_micro,
          }));
          domainFilterOptions.push({ label: domain, value: domain });
          return {
            domain,
            tests: testsArray,
          };
        }
      );

      return {
        category_name: categoryName,
        tests_data: testsData,
        domainOptionsForFilter: domainFilterOptions,
      };
    }
  );

  return configuredData;
}

export const scrollToView = (id: string) => {
  const element = document.getElementById(id);

  element?.scrollIntoView({
    behavior: "smooth",
  });
};

export function convertTestsData(inputData: Record<string, TestData[]>) {
  let outputData: {
    category_name: string;
    tests_data: DomainData[];
    domainOptionsForFilter: { value: string; label: string }[];
  } = {
    category_name: "Competency based power skills",
    tests_data: [],
    domainOptionsForFilter: [],
  };

  const domains = Object.keys(inputData);

  domains.forEach((domain) => {
    const tests = inputData[domain].map((item) => {
      return {
        title: `${item.title}`,
        description: item.description,
        test_code: item.test_code,
        test_type: item.test_type,
        is_recommended: item.is_recommended,
        is_micro: item.is_micro,
        interaction_mode: item.interaction_mode,
      };
    });

    outputData.tests_data.push({
      domain: domain,
      tests: tests,
    });

    outputData.domainOptionsForFilter.push({
      label: domain,
      value: domain,
    });
  });

  return outputData;
}

export const CreateOrAssignClientId = (
  userEmail: string | null | undefined
) => {
  if (userEmail !== null && userEmail !== undefined) {
    return fetch(`${baseURL}/accounts/create-or-assign-client-id/`, {
      method: "POST",
      headers: {
        Authorization: basicAuth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
      }),
    });
  }
};

export const getClientUserInfo = (userEmail: string | undefined) => {
  if (userEmail) {
    return fetch(
      `${baseURL}/accounts/get-client-information/?for=user_info&email=${userEmail}`,
      {
        method: "GET",
        headers: {
          Authorization: basicAuth,
        },
      }
    );
  }
};

export function replaceSpecialCharacters(inputString: string) {
  const specialCharsRegex = /[^a-zA-Z0-9\s-]/g;
  const cleanedString = inputString.replace(specialCharsRegex, "");
  console.log(cleanedString);
  return cleanedString;
}

export function isValidLinks(linksString: string): boolean {
  const links = linksString.split(",");
  const urlRegex = /^(http|https):\/\/[^ "]+\.[a-zA-Z]{2,}(\/[^ "]+)*$/;

  for (const link of links) {
    const trimmedLink = link.trim();
    if (!urlRegex.test(trimmedLink)) {
      return false;
    }
  }

  return true;
}

export function isValidYoutubeLinks(linksString: string): boolean {
  const links = linksString.split(",");
  const urlRegex = /^https?:\/\/(?:www\.)?(youtube\.com\/.+|youtu\.be\/.+)$/;

  for (const link of links) {
    const trimmedLink = link.trim();
    if (!urlRegex.test(trimmedLink)) {
      return false;
    }
  }

  return true;
}

export const applicationUrl = () => {
  if (subdomain === "platform") {
    return "https://platform.coachbots.com";
  } else {
    return "https://playground.coachbots.com";
  }
};

export function parseClientData(data: any): ClientDataType[] {
  const clients: ClientDataType[] = [];

  for (const clientName in data) {
    if (data.hasOwnProperty(clientName)) {
      const clientData = data[clientName][0];

      const client: ClientDataType = {
        clientName,
        clientId: clientData?.client_id,
        allowAudioInteractions:
          data[clientName].length > 0
            ? data[clientName][0].allow_audio_interactions
            : false,
        Users: data[clientName][0].user_email
          ? data[clientName].map((user: any) => ({
              userEmail: user.user_email,
              userName: user.name,
              userId: user.user_id,
            }))
          : [],
      };

      clients.push(client);
    }
  }

  return clients;
}

export function parseClientUsers(data: any) {
  const clientUsers: {
    userEmail: string;
    userClientId: string;
    isDemoUser: boolean;
  }[] = [];

  for (const clientName in data) {
    if (data.hasOwnProperty(clientName) && data[clientName].length > 0) {
      const clientData = data[clientName][0];

      data[clientName].map((user: any) => {
        clientUsers.push({
          userEmail: user.user_email,
          userClientId: clientData.client_id,
          isDemoUser: user.is_demo_user,
        });
      });
    }
  }

  return clientUsers;
}

export function getAllUsers(data: any) {
  const clientUsers: AllUserDataType[] = [];

  for (const clientName in data) {
    if (data.hasOwnProperty(clientName) && data[clientName].length > 0) {
      const clientData = data[clientName][0];

      data[clientName].map((user: any) => {
        if (user.user_email) {
          clientUsers.push({
            userEmail: user.user_email,
            userClientId: clientData.client_id,
            isDemoUser: user.is_demo_user,
            userId: user.user_id,
            userRole: user.role,
            userDeniedAccesses: user.access_denied,
          });
        }
      });
    }
  }

  return clientUsers;
}

export const getUsersForClient = (clientName: string, data: any) => {
  const clientUsers: {
    userEmail: string;
    userName: string;
    userId: string;
  }[] = [];
  const uniqueUserIds = new Set<string>();

  if (data.hasOwnProperty(clientName) && data[clientName].length > 0) {
    data[clientName]
      .filter((user: any) => user.user_email !== undefined)
      .forEach((user: any) => {
        if (!uniqueUserIds.has(user.user_id)) {
          uniqueUserIds.add(user.user_id);
          clientUsers.push({
            userEmail: user.user_email,
            userName: user.name,
            userId: user.user_id,
          });
        }
      });
  }

  return clientUsers;
};

export const getUsersForClientForTeam = (clientName: string, data: any) => {
  const clientUsers: ClientUserTeamType[] = [];
  const uniqueUserIds = new Set<string>();

  if (data.hasOwnProperty(clientName) && data[clientName].length > 0) {
    data[clientName]
      .filter((user: any) => user.user_email !== undefined)
      .forEach((user: any) => {
        if (!uniqueUserIds.has(user.user_id)) {
          uniqueUserIds.add(user.user_id);
          clientUsers.push({
            userEmail: user.user_email,
            userName: user.name,
            userId: user.user_id,
            profileType: user.profile_type || "",
          });
        }
      });
  }

  return clientUsers;
};

export function transformExtractedData(data: ExtractedData): MediaData {
  const mediaData: MediaData = {
    extracted_from_article: [],
    extracted_from_pdf: [],
    extracted_from_youtube: [],
  };

  for (const source in data) {
    if (data.hasOwnProperty(source)) {
      const files = data[source];
      for (const fileName in files) {
        if (files.hasOwnProperty(fileName)) {
          const fileContent = files[fileName];
          const fileObject = {
            fileName,
            fileContent,
            isDeleted: false,
          };
          // Push the object into the corresponding array in mediaData
          if (source === "extracted_from_article") {
            mediaData.extracted_from_article.push(fileObject);
          } else if (source === "extracted_from_pdf") {
            mediaData.extracted_from_pdf.push(fileObject);
          } else if (source === "extracted_from_youtube") {
            mediaData.extracted_from_youtube.push(fileObject);
          }
        }
      }
    }
  }

  return mediaData;
}

export function transformExtractedOptional(
  data: ExtractedData
): OptionalMediaData {
  const mediaData: OptionalMediaData = {
    extracted_from_optional_file: [],
  };

  for (const source in data) {
    if (data.hasOwnProperty(source)) {
      const files = data[source];
      for (const fileName in files) {
        if (files.hasOwnProperty(fileName)) {
          const fileContent = files[fileName];
          const fileObject = {
            fileName,
            fileContent,
            isDeleted: false,
          };
          // Push the object into the corresponding array in mediaData
          if (source === "extracted_from_optional_file") {
            mediaData.extracted_from_optional_file.push(fileObject);
          }
        }
      }
    }
  }

  return mediaData;
}

export function transformExtractedOptionalCoachee(
  data: ExtractedDataCochee
): OptionalMediaData {
  const mediaData: OptionalMediaData = {
    extracted_from_optional_file: [],
  };

  const files = data;
  for (const fileName in files) {
    if (files.hasOwnProperty(fileName)) {
      const fileContent = files[fileName];
      const fileObject = {
        fileName,
        fileContent,
        isDeleted: false,
      };
      // Push the object into the corresponding array in mediaData
      mediaData.extracted_from_optional_file.push(fileObject);
    }
  }

  return mediaData;
}

export function makeTaggableName(name: string) {
  let taggableName = name.replace(/\s+/g, "").toLowerCase();
  return taggableName;
}

export function parseData(data: any) {
  return Object.keys(data).map((key: any) => ({
    heading: key,
    description: data[key],
  }));
}

export function excludeSpecialCharacters(inputString: string) {
  const regex = /[^a-zA-Z0-9!.,? ]/g;
  const cleanedString = inputString.replace(regex, "");
  return cleanedString;
}

export const parseStringList = (str: any) => {
  return str
    ?.split(",")
    .map((str: string) => str.trim())
    .join(",");
};

export const handleLinks = (link: string) => {
  if (link.includes("playground")) {
    return link.replace("https://playground.coachbots.com", "");
  } else if (link.includes("platform")) {
    return link.replace("https://platform.coachbots.com", "");
  } else {
    return link;
  }
};

export const emptyData: UserInfoType = {
  clientName: "",
  isDemoUser: false,
  isRestricted: true,
  clientExpertise: "",
  clientDepartments: "",
  restrictedPages: null,
  restrictedFeatures: null,
  headings: null,
  helpText: null,
};

export function convertJsonToExpectedFormat(
  jsonData: Conversation[]
): ConvertedConversation[] {
  return jsonData.map((conversation) => {
    const {
      participant_name,
      results,
      role,
      date,
      bot_name,
      bot_type,
      participant_uid,
      bot_id,
    } = conversation;
    const conversationArray: ConvertedResult[] = results.map((result) => {
      const participantMessage = result.participant_message_text || "";
      const coachMessage = result.coach_message_text || "";
      const userRole =
        result.status === "participant_message_saved" ? "participant" : "coach";
      const conversationDate = result.created;

      return {
        participant_message: participantMessage,
        coach_message: coachMessage,
        user_role: userRole,
        conversation_date: conversationDate,
        bot_name: bot_name, // Include bot_name in ConvertedResult
      };
    });

    return {
      participant_name: participant_name,
      conversation: conversationArray,
      role: role,
      date: date,
      bot_name: bot_name, // Include bot_name in ConvertedConversation
      bot_type: bot_type,
      participant_uid: participant_uid,
      bot_id: bot_id,
    };
  });
}

export function sortByDateDescending(data: UserIDPsType[]): UserIDPsType[] {
  const compareDates = (a: UserIDPsType, b: UserIDPsType) => {
    const dateA = new Date(a.created);
    const dateB = new Date(b.created);
    return dateB.getTime() - dateA.getTime();
  };

  const sortedData = [...data].sort(compareDates);

  return sortedData;
}

export function truncateString(str: string, maxLength: number) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength - 1) + "…";
  }
  return str;
}

export function formatTimeWithAmPm(isoString: string) {
  if (isoString === "") {
    return "";
  }
  const date = new Date(isoString);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // if hours = 0, set to 12 (midnight or noon)

  const minutesFormatted = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${minutesFormatted} ${ampm}`;
}

export async function getTestMappings(clientName: string,page_name: string) {
  try {
    const res = await fetch(`${baseURL}/tests/test-mappings/?client_name=${clientName}&page_name=${page_name}`);

    if (!res.ok) {
        console.error(`HTTP error! Status: ${res.status}`);
        return null;
    }

    if (res.status !== 200) {
        console.error("Failed a to fetch test mappings", res.status);
        return null;
    }
    const json = await res.json();
    console.log("[getTestMappings] for ", clientName, page_name, json, json.results);
    return json

} catch (error: any) {
    console.error("Failed to load test mappings:", error);
    return null
}
}


export async function getUserTestMappings(userId:string) {
  try {
    const res = await fetch(`${baseURL}/tests/user-test-mappings/?user_id=${userId}`);

    if (!res.ok) {
        console.error(`HTTP error! Status: ${res.status}`);
        return null;
    }

    if (res.status !== 200) {
        console.error("Failed a to fetch user test mappings", res.status);
        return null;
    }
    const json = await res.json();
    console.log("[getUserTestMappings] for ", json, json);
    return json

} catch (error: any) {
    console.error("Failed to load user test mappings:", error);
    return null
}
}
