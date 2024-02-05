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
import {
  baseURL,
  basicAuth,
  getUserAccount,
  hideBots,
  subdomain,
} from "@/lib/utils";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { LoadingComponent, LoginWall, UnAuth } from "./UnAuthpage";
import { Loader } from "lucide-react";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";

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
  // const [authorised, setAuthorised] = useState(true);
  const [isRestricted, setIsRestricted] = useState<Boolean | null>(null);
  const [isDemoUser, setIsDemoUser] = useState<Boolean | null>(null);

  const [loading, setLoading] = useState<Boolean | null>(null);

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

  //Unauth check
  useEffect(() => {
    setLoading(true);
    try {
      if (!isLoading) {
        if (user) {
          console.log(user.email);
          getUserAccount(user)
            .then((res) => res.json())
            .then((data) => {
              console.log(data);

              fetch(
                `${baseURL}/accounts/get-client-information/?for=user_info&email=${user.email}`,
                {
                  method: "GET",
                  headers: {
                    Authorization: basicAuth,
                  },
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  console.log("GET USER INFO - Client : ", data);
                  console.log(
                    data.data.user_info[0].is_demo_user,
                    data.data.user_info[0].is_restricted
                  );
                  // setIsDemoUser(true);
                  setIsDemoUser(data.data.user_info[0].is_demo_user);
                  setIsRestricted(data.data.user_info[0].is_restricted);
                  setLoading(false);
                });
            });
        } else {
          setLoading(false);
        }
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [isLoading]);

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

  const hasVisitedOpenSimulation =
    typeof window !== "undefined"
      ? window.localStorage.getItem("visitedOpenSimulation")
      : null;

  const hasVisitMyLibrary =
    typeof window !== "undefined"
      ? window.localStorage.getItem("visitedMyLibrary")
      : null;

  useEffect(() => {
    //hide bots from intake
    if (pathname.includes("intake")) {
      hideBots();
    }
    //ADD LOCALSTORAGE ITEM after user
    if (pathname === "/coach" || pathname.includes("/coach/")) {
      setShowCoachBot(true);
      if (!hasVisitedCoach) {
        window.location.reload();
        window.localStorage.setItem("visitedCoach", "true");
      }
      if (pathname === "/coach") {
        setBotId("coach-d54cd-aravsharma");
      } else {
        const bot_id = pathname.split("/")[2];
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
    } else if (pathname === "/create-scenario") {
      if (!hasVisitedOpenSimulation) {
        window.location.reload();
        window.localStorage.setItem("visitedOpenSimulation", "true");
      }
    } else if (pathname === "/library") {
      if (!hasVisitMyLibrary) {
        window.location.reload();
        window.localStorage.setItem("visitedMyLibrary", "true");
      }
    }

    if (pathname !== "/content-library") {
      window.localStorage.removeItem("visitedContentLibrary");
    }

    if (pathname !== "/coach" && !pathname.includes("/coach")) {
      window.localStorage.removeItem("visitedCoach");
    }

    if (pathname !== "/feedback" && !pathname.includes("/feedback/feedback")) {
      window.localStorage.removeItem("visitedFeedback");
    }

    if (pathname !== "/create-scenario") {
      window.localStorage.removeItem("visitedOpenSimulation");
    }

    if (pathname !== "/library") {
      window.localStorage.removeItem("visitedMyLibrary");
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
    if (isDemoUser && !isRestricted && user && !isLoading) {
      if (pathname === "/profile") {
        coachtalk.setAttribute("style", "display: none;");
        coachScribe.setAttribute("style", "display: none;");
      } else if (pathname === "/") {
        coachtalk.setAttribute("style", "display: none;");
        // coachScribe.setAttribute("style", "display: none;");
      } else if (pathname.includes("intake")) {
        if (coachScribe && coachtalk) {
          coachtalk.setAttribute("style", "display: none;");
          coachScribe.setAttribute("style", "display: none;");
        }
      } else {
        if (coachScribe && coachtalk) {
          coachtalk.removeAttribute("style");
          coachScribe.removeAttribute("style");
        }
      }
    }
  }, [pathname, user, isDemoUser, isRestricted]);

  useEffect(() => {
    const coachtalk = document.getElementsByClassName("deep-chat-poc")[0];
    const coachScribe = document.getElementsByClassName("deep-chat-poc2")[0];
    if (pathname === "/library") {
      if (coachScribe) {
        coachScribe.setAttribute("style", "display: none;");
      }
      if (coachtalk) {
        coachtalk.setAttribute("style", "display: none;");
      }
    } else if (pathname === "/profile") {
      if (coachScribe) {
        coachScribe.setAttribute("style", "display: none;");
      }
      if (coachtalk) {
        coachtalk.setAttribute("style", "display: none;");
      }
    } else if (pathname === "/create-scenario") {
      if (coachScribe) {
        coachScribe.removeAttribute("style");
      }
      if (coachtalk) {
        coachtalk.removeAttribute("style");
      }
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
              <AntdRegistry>
                {!loading && !isLoading && (
                  <>
                    {!user ? (
                      <>
                        <LoginWall />
                      </>
                    ) : (
                      <>
                        {isRestricted ? (
                          <>
                            {isDemoUser ? (
                              <>
                                {" "}
                                {subdomain === "platform" ? (
                                  <div className="deep-chat-poc hidden"></div>
                                ) : (
                                  <div className="deep-chat-poc"></div>
                                )}
                                {showCoachBot ? (
                                  <div
                                    data-bot-id={botId}
                                    className="deep-chat-poc2"
                                  ></div>
                                ) : (
                                  <div className="deep-chat-poc2"></div>
                                )}
                                {children}
                              </>
                            ) : (
                              <>
                                <UnAuth user={user} />
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {subdomain === "platform" ? (
                              <div className="deep-chat-poc hidden"></div>
                            ) : (
                              <div className="deep-chat-poc"></div>
                            )}
                            {showCoachBot ? (
                              <div
                                data-bot-id={botId}
                                className="deep-chat-poc2"
                              ></div>
                            ) : (
                              <div className="deep-chat-poc2"></div>
                            )}
                            {children}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
                {loading && (
                  <>
                    <LoadingComponent />
                  </>
                )}
              </AntdRegistry>
            </ThemeProvider>
          </>
          <Toaster theme="light" richColors position="top-right" />
        </body>
      </UserContextProvider>
    </html>
  );
}
