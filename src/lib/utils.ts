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
