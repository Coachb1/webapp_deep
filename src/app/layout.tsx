"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { UserContextProvider } from "@/lib/UserContext";
import Widgets from "@/components/Widgets";
import { usePathname } from "next/navigation";
import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

const subdomain =
  typeof window !== "undefined" ? window.location.hostname.split(".")[0] : null;
const devUrl = "https://coach-api-ovh.coachbots.com/api/v1";
// const devUrl = "https://coach-api-gcp.coachbots.com/api/v1";
const prodUrl = "https://coach-api-prod-ovh.coachbots.com/api/v1";
const baseURL = subdomain === "platform" ? prodUrl : devUrl;
const basicAuth =
  "Basic Yzc3MjFmZGItYTllMC00YTYxLWEzMTYtNDRhODA1N2VkMjY0OjhjNWNlZWZlLTY2Y2QtNDliZi04MTY5LTBhNjMwMmU5NmZlMA==";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, isLoading } = useKindeBrowserClient();
  const [logSessionStarted, setLogSessionStarted] = useState<boolean>(false);
  const [botId, setBotId] = useState<string>("");

  if (!isLoading && !logSessionStarted) {
    LogRocket.init("irkulq/coachbots");
    if (user) {
      LogRocket.identify(user?.id, {
        name: user?.given_name!,
        email: user?.email!,
      });
      console.log("USER SET");
    }
    setupLogRocketReact(LogRocket);
    setLogSessionStarted(true);
    console.log("LOG SESSION STARTED");
  }

  useEffect(() => {
    console.log(pathname);
    const coachtalk = document.getElementsByClassName("deep-chat-poc")[0];
    const coachScribe = document.getElementsByClassName("deep-chat-poc2")[0];
    if (pathname === "/profile") {
      coachtalk.setAttribute("style", "display: none;");
      coachScribe.setAttribute("style", "display: none;");
    } else if (pathname === "/") {
      coachtalk.setAttribute("style", "display: none;");
      coachScribe.setAttribute("style", "display: none;");
    } else {
      coachtalk.removeAttribute("style");
      coachScribe.removeAttribute("style");
    }

    if (
      pathname !== "/profile" &&
      pathname !== "/content-library" &&
      pathname !== "/"
    ) {
      console.log("BOT ID : ", pathname.split("/")[1]);
      const bot_id = pathname.split("/")[1];
      setBotId(pathname.split("/")[1]);
      // fetch(`${baseURL}/accounts/get-bot-details/?bot_id=${bot_id}`, {
      //   method: "GET",
      //   headers: {
      //     Authorization: basicAuth,
      //   },
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log(data);
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   });
    }
  }, [pathname]);

  return (
    <html lang="en" className="bg-gray-100 grainy">
      <UserContextProvider>
        <body className={inter.className} suppressHydrationWarning={true}>
          <>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              {subdomain === "platform" ? (
                <div className="deep-chat-poc hidden"></div>
              ) : (
                <div className="deep-chat-poc"></div>
              )}
              {botId ? (
                <div data-bot-id={botId} className="deep-chat-poc2"></div>
              ) : (
                <div className="deep-chat-poc2"></div>
              )}
              {children}
            </ThemeProvider>
          </>
          <Toaster theme="light" richColors position="top-right" />
        </body>
      </UserContextProvider>
    </html>
  );
}
