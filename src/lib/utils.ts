import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Metadata } from "next";

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
export const prodUrl = "https://coach-api-prod-ovh.coachbots.com/api/v1";
export const baseURL = subdomain === "platform" ? prodUrl : devUrl;

export const basicAuth =
  "Basic Yzc3MjFmZGItYTllMC00YTYxLWEzMTYtNDRhODA1N2VkMjY0OjhjNWNlZWZlLTY2Y2QtNDliZi04MTY5LTBhNjMwMmU5NmZlMA==";

export const hideBots = () => {
  const coachtalk = document.getElementsByClassName("deep-chat-poc")[0];
  const coachScribe = document.getElementsByClassName("deep-chat-poc2")[0];

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
        name: user.given_name,
        role: "member",
        user_attributes: {
          tag: "deepchat_profile",
          attributes: {
            username: "web_user",
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
    if (profiles[i].profile_type === "coachee") {
      return profiles[i].uid;
    }
  }
  return "";
}

export function findCoachUID(profiles: any) {
  for (let i = 0; i < profiles.length; i++) {
    if (profiles[i].profile_type === "coach") {
      return profiles[i].uid;
    }
  }
  return "";
}

export function reportsLinksSelector() {
  if (subdomain === "platform") {
    return "https://myreportdev.coachbots.com/";
  } else {
    return "https://myreportdev.coachbots.com/";
  }
}
