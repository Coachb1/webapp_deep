import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Metadata } from "next";
import {
  Categories,
  CategoryData,
  ClientDataType,
  DomainData,
  ExtractedData,
  MediaData,
  TestData,
} from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructMetadata({
  title = "Coachbots - Playground",
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
export const devUrl = "https://coach-api-ovh.coachbots.com/api/v1";
// export const devUrl =  "http://127.0.0.1:8001/api/v1"
export const prodUrl = "https://coach-api-prod-ovh.coachbots.com/api/v1";
export const baseURL = subdomain === "platform" ? prodUrl : devUrl;

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

  console.log("Hidden");
};

export const getUserAccount = (user: any) => {
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

export interface PartifipantsforLeaderBoardTypes {
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
  const urlRegex = /^https?:\/\/(?:www\.)?youtube\.com\/.+/;

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
    if (data.hasOwnProperty(clientName) && data[clientName].length > 0) {
      const clientData = data[clientName][0];

      const client: ClientDataType = {
        clientName,
        clientId: clientData.client_id,
        Users: data[clientName].map((user: any) => ({
          userEmail: user.user_email,
          userName: user.name,
          userId: user.user_id,
        })),
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
  }[] = [];

  for (const clientName in data) {
    if (data.hasOwnProperty(clientName) && data[clientName].length > 0) {
      const clientData = data[clientName][0];

      data[clientName].map((user: any) => {
        clientUsers.push({
          userEmail: user.user_email,
          userClientId: clientData.client_id,
        });
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
  if (data.hasOwnProperty(clientName) && data[clientName].length > 0) {
    data[clientName]
      .filter((user: any) => user.user_email !== undefined)
      .map((user: any) => {
        clientUsers.push({
          userEmail: user.user_email,
          userName: user.name,
          userId: user.user_id,
        });
      });
  }

  return clientUsers;
};
export const getUsersForClientForTeam = (clientName: string, data: any) => {
  const clientUsers: {
    userEmail: string;
    userName: string;
    userId: string;
  }[] = [];
  if (data.hasOwnProperty(clientName) && data[clientName].length > 0) {
    data[clientName]
      .filter(
        (user: any) =>
          (user.user_email !== undefined && user.profile_type === "coachee") ||
          user.profile_type === "mentee"
      )
      .map((user: any) => {
        clientUsers.push({
          userEmail: user.user_email,
          userName: user.name,
          userId: user.user_id,
        });
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

export function makeTaggableName(name: string) {
  let taggableName = name.replace(/\s+/g, "").toLowerCase();
  return taggableName;
}
