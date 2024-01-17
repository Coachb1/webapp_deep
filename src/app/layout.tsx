"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { UserContextProvider } from "@/lib/UserContext";
import { usePathname } from "next/navigation";
import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { subdomain } from "@/lib/utils";
import { AntdRegistry } from "@ant-design/nextjs-registry";

const inter = Inter({ subsets: ["latin"] });

//GLOBAL USER - *.js
interface CustomWindow extends Window {
  user?: any;
  locallStorage?: Storage;
  locationn?: Location;
}
declare let window: CustomWindow;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, isLoading } = useKindeBrowserClient();
  const [logSessionStarted, setLogSessionStarted] = useState<boolean>(false);
  const [botId, setBotId] = useState<string>("");
  const [showCoachBot, setShowCoachBot] = useState(false);

  if (!isLoading && !logSessionStarted) {
    LogRocket.init("irkulq/coachbots");
    if (user) {
      LogRocket.identify(user?.id, {
        name: user?.given_name!,
        email: user?.email!,
      });
      console.log("USER SET");
      window.user = user;
    }
    setupLogRocketReact(LogRocket);
    setLogSessionStarted(true);
    console.log("LOG SESSION STARTED");
  }

  //auto refresh and conditional coach(aravsharma) bot display
  const hasVisitedContentLibrary =
    typeof window !== "undefined"
      ? window.localStorage.getItem("visitedContentLibrary")
      : null;
  const hasVisitedCoach =
    typeof window !== "undefined"
      ? window.localStorage.getItem("visitedCoach")
      : null;

  const hasVisitedFeedback =
    typeof window !== "undefined"
      ? window.localStorage.getItem("visitedFeedback")
      : null;
  const hasVisitedSubject =
    typeof window !== "undefined"
      ? window.localStorage.getItem("visitedSubject")
      : null;

  useEffect(() => {
    //ADD LOCALSTORAGE ITEM after user
    if (pathname === "/" || pathname.includes("/coach")) {
      setShowCoachBot(true);
      if (!hasVisitedCoach) {
        window.location.reload();
        window.localStorage.setItem("visitedCoach", "true"); //1 - visits / or /[id] and page refreshes
      }
      if (pathname === "/") {
        setBotId("coach-d54cd-aravsharma");
      } else {
        const bot_id = pathname.split("/")[1];
        setBotId(bot_id);
      }
    } else if (
      pathname === "/feedback" ||
      pathname.includes("/feedback/feedback")
    ) {
      setShowCoachBot(true);
      if (!hasVisitedFeedback) {
        window.location.reload();
        window.localStorage.setItem("visitedFeedback", "true"); //2 - visits /feedback or /feedback/[id] and page refreshes
      }
      if (pathname === "/feedback") {
        setBotId("feedback-d55cd-aravsharma");
      } else {
        const bot_id = pathname.split("/")[2];
        setBotId(bot_id);
      }
    } else if (pathname.includes("/subject-expert")) {
      setShowCoachBot(true);
      if (!hasVisitedSubject) {
        window.location.reload();
        window.localStorage.setItem("visitedSubject", "true");
      }
      if (pathname === "/subject-expert") {
        console.log("3RDDDD");
        setBotId("stress-management-0032");
      } else {
        const bot_id = pathname.split("/")[2];
        setBotId(bot_id);
      }
    } else if (pathname === "/content-library") {
      if (!hasVisitedContentLibrary) {
        window.location.reload();
        window.localStorage.setItem("visitedContentLibrary", "true"); //3 - visits /content-library and page refreshes
      }
      setShowCoachBot(false);
    }

    if (pathname !== "/content-library") {
      window.localStorage.removeItem("visitedContentLibrary");
    }

    if (pathname !== "/" && !pathname.includes("/coach")) {
      window.localStorage.removeItem("visitedCoach");
    }

    if (pathname !== "/feedback" && !pathname.includes("/feedback/feedback")) {
      window.localStorage.removeItem("visitedFeedback");
    }

    if (
      pathname !== "/subject-expert" &&
      !pathname.includes("/subject-expert")
    ) {
      window.localStorage.removeItem("visitedSubject");
    }
  }, [pathname]);

  useEffect(() => {
    const coachtalk = document.getElementsByClassName("deep-chat-poc")[0];
    const coachScribe = document.getElementsByClassName("deep-chat-poc2")[0];
    if (pathname === "/profile") {
      coachtalk.setAttribute("style", "display: none;");
      coachScribe.setAttribute("style", "display: none;");
    } else if (pathname === "/") {
      coachtalk.setAttribute("style", "display: none;");
      // coachScribe.setAttribute("style", "display: none;");
    } else {
      coachtalk.removeAttribute("style");
      coachScribe.removeAttribute("style");
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
              {showCoachBot ? (
                <div data-bot-id={botId} className="deep-chat-poc2"></div>
              ) : (
                <div className="deep-chat-poc2"></div>
              )}
              <AntdRegistry>{children}</AntdRegistry>
            </ThemeProvider>
          </>
          <Toaster theme="light" richColors position="top-right" />
        </body>
      </UserContextProvider>
    </html>
  );
}
