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
import NetworkNav from "@/components/NetworkNav";

const inter = Inter({ subsets: ["latin"] });

//GLOBAL USER - *.js
interface CustomWindow extends Window {
  user?: any;
  locallStorage?: Storage;
  locationn?: Location;
  userIdFromWebApp?: any;
}
declare let window: CustomWindow;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, isLoading, isAuthenticated } = useKindeBrowserClient();
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

  const refreshedOnce =
    typeof window !== "undefined"
      ? window.localStorage.getItem(`refreshed-once`)
      : null;

  //Unauth check
  useEffect(() => {
    setLoading(true);
    try {
      if (!isLoading) {
        if (user) {
          getUserAccount(user)
            .then((res) => res.json())
            .then((data) => {
              console.log(data);

              window.userIdFromWebApp = data.uid;

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

  useEffect(() => {
    if (pathname.includes("intake")) {
      hideBots();
    }
    if (pathname === "/coach" || pathname.includes("/coach/")) {
      setShowCoachBot(true);

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

      if (pathname === "/feedback") {
        setBotId("feedback-d55cd-aravsharma");
      } else {
        const bot_id = pathname.split("/")[2];
        setBotId(bot_id);
      }
    } else if (pathname.includes("/subject-expert")) {
      setShowCoachBot(true);

      if (pathname === "/subject-expert") {
        setBotId("stress-management-0032");
      } else {
        const bot_id = pathname.split("/")[2];
        setBotId(bot_id);
      }
    } else if (pathname.includes("/knowledge-bot")) {
      setShowCoachBot(true);

      if (pathname === "/knowledge-bot") {
        setBotId("knowledge-a8d26-crossfit-elevation-support");
      } else {
        const bot_id = pathname.split("/")[2];
        setBotId(bot_id);
      }
    }
  }, [pathname]);

  useEffect(() => {
    const coachtalk = document.getElementsByClassName("deep-chat-poc")[0];
    const coachScribe = document.getElementsByClassName("deep-chat-poc2")[0];
    if (isDemoUser && !isRestricted && user && !isLoading) {
      if (pathname === "/profile") {
        coachtalk.setAttribute("style", "display: none;");
        coachScribe.setAttribute("style", "display: none;");
      } else if (pathname.includes("intake")) {
        if (coachScribe && coachtalk) {
          coachtalk.setAttribute("style", "display: none;");
          coachScribe.setAttribute("style", "display: none;");
        }
      } else if (
        pathname.includes("feedback") ||
        pathname.includes("coach") ||
        pathname.includes("subject") ||
        pathname.includes("knowledge")
      ) {
        if (coachtalk) {
          coachtalk.removeAttribute("style");
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
        coachScribe.removeAttribute("style");
      }
      if (coachtalk) {
        coachtalk.removeAttribute("style");
      }
    } else if (pathname === "/profile") {
      if (coachScribe) {
        coachScribe.setAttribute("style", "display: none;");
      }
      if (coachtalk) {
        coachtalk.setAttribute("style", "display: none;");
      }
    } else if (pathname === "/guides") {
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
    } else if (pathname === "/content-library") {
      if (coachScribe) {
        coachScribe.removeAttribute("style");
      }
      if (coachtalk) {
        coachtalk.removeAttribute("style");
      }
    } else if (pathname === "/") {
      if (coachScribe && coachtalk) {
        coachtalk.setAttribute("style", "display: none;");
        coachScribe.setAttribute("style", "display: none;");
      }
    }
  }, [pathname]);

  return (
    <html lang="en" className="bg-white">
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
                                {!pathname.includes("/feedback") &&
                                !pathname.includes("/coach") &&
                                !pathname.includes("/subject-expert") &&
                                !pathname.includes("/knowledge-bot") ? (
                                  <div className="h-full min-h-[120vh] bg-white pb-16 max-sm:h-full max-sm:min-h-screen !z-[800]">
                                    <div className="z-[999]">
                                      <NetworkNav user={user} />
                                    </div>
                                    {children}
                                  </div>
                                ) : (
                                  <>{children}</>
                                )}
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
                            {!pathname.includes("/feedback") &&
                            !pathname.includes("/coach") &&
                            !pathname.includes("/subject-expert") &&
                            !pathname.includes("/knowledge-bot") ? (
                              <div className="h-full min-h-[120vh] bg-white pb-16 max-sm:h-full max-sm:min-h-screen !z-[800]">
                                <div className="z-[999]">
                                  <NetworkNav user={user} />
                                </div>
                                {children}
                              </div>
                            ) : (
                              <>{children}</>
                            )}
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
