"use client";

import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { DemoPage, LoginWall, UnAuth } from "./UnAuthpage";
import {
  getUserAccounts,
  hideBots,
  hideConsoleLogs,
  subdomain,
} from "@/lib/utils";
import NetworkNav from "@/components/NetworkNav";
import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";
import * as Sentry from "@sentry/nextjs";

//GLOBAL USER - *.js
interface CustomWindow extends Window {
  user?: any;
  locallStorage?: Storage;
  locationn?: Location;
  userIdFromWebApp?: any;
}
declare let window: CustomWindow;

const LayoutComponent = ({
  user,
  children,
  isDemoUser,
  isRestricted,
  restrictedPages,
}: {
  user: KindeUser | null;
  children: React.ReactNode;
  isDemoUser: boolean;
  isRestricted: boolean;
  restrictedPages: string;
}) => {
  const pathname = usePathname();
  const [logSessionStarted, setLogSessionStarted] = useState<boolean>(false);
  const [botId, setBotId] = useState<string>("");
  const [showCoachBot, setShowCoachBot] = useState(false);

  hideConsoleLogs();
  useEffect(() => {
    let userId = "";
    if (user) {
      getUserAccounts(user).then((data) => {
        console.log("layouted component : ", data);
        userId = data.uid;
        window.userIdFromWebApp = data.uid;
      });

      window.user = user;
      const ENVIRONMENT = process.env.KINDE_POST_LOGIN_REDIRECT_URL?.includes("localhost") ? "local" : "production";

      if (ENVIRONMENT != "local") {
        Sentry.init({
          dsn: "https://fbf82c6c8258272ce32a8cfbd1fa2153@o4508001030963200.ingest.us.sentry.io/4508001032601600",
          tracesSampleRate: 1.0, // Adjust this value in production
        });
      }

      //sentry
      Sentry.setUser({
        id: userId, // Replace with your user's ID
        username: `${user.given_name} ${user.family_name}`, // Replace with your user's name
        email: user.email || "", // Replace with your user's email
      });
    }
    if (subdomain !== "localhost") {
      if (!logSessionStarted) {
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
    }
  }, []);

  useEffect(() => {
    //hide bots from intake
    if (pathname.includes("/intake")) {
      hideBots();
    }
    //ADD LOCALSTORAGE ITEM after user
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
        setBotId("knowledge-c89fd-flyover-project-tracker");
      } else {
        const bot_id = pathname.split("/")[2];
        setBotId(bot_id);
      }
    } else if (pathname.includes("/engagement-survey")) {
      setShowCoachBot(true);

      if (pathname === "/engagement-survey") {
        setBotId("deep_dive-16843-guru-chaitanya");
      } else {
        const bot_id = pathname.split("/")[2];
        setBotId(bot_id);
      }
    }
  }, [pathname]);

  useEffect(() => {
    const coachtalk = document.getElementsByClassName("coachbots-coachtalk")[0];
    const coachScribe = document.getElementsByClassName(
      "coachbots-coachscribe"
    )[0];
    if (isDemoUser && !isRestricted && user) {
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
    const coachtalk = document.getElementsByClassName("coachbots-coachtalk")[0];
    const coachScribe = document.getElementsByClassName(
      "coachbots-coachscribe"
    )[0];
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
    } else if (pathname === "/create-scenario") {
      if (coachScribe) {
        coachScribe.removeAttribute("style");
      }
      if (coachtalk) {
        coachtalk.removeAttribute("style");
      }
    } else if (["/content-library", "/domain-skills-library"].includes(pathname)) {
      if (coachScribe) {
        coachScribe.removeAttribute("style");
      }
      if (coachtalk) {
        coachtalk.removeAttribute("style");
      }
    } else if (pathname === "/guides") {
      if (coachScribe) {
        coachScribe.setAttribute("style", "display: none;");
      }
      if (coachtalk) {
        coachtalk.setAttribute("style", "display: none;");
      }
    } else if (pathname === "/") {
      if (coachScribe && coachtalk) {
        coachtalk.setAttribute("style", "display: none;");
        coachScribe.setAttribute("style", "display: none;");
      }
    }
  }, [pathname]);
  return (
    <>
      <>
        {!user ? (
          <LoginWall />
        ) : (
          <>
            {isRestricted && ( //Unauth page
              <>
                <UnAuth user={user} />
              </>
            )}
            {isDemoUser && ( //demo page
              <>
                <DemoPage user={user} />
              </>
            )}
            {!isDemoUser &&
              !isRestricted && ( //proceed
                <>
                  {" "}
                  {subdomain === "platform" ? (
                    <div className="coachbots-coachtalk"></div>
                  ) : (
                    <div className="coachbots-coachtalk"></div>
                  )}
                  {showCoachBot ? (
                    <div
                      data-bot-id={botId}
                      className="coachbots-coachscribe"
                    ></div>
                  ) : (
                    <div className="coachbots-coachscribe"></div>
                  )}
                  {!pathname.includes("/feedback") &&
                    !pathname.includes("/coach") &&
                    !pathname.includes("/subject-expert") &&
                    !pathname.includes("/knowledge-bot") &&
                    !pathname.includes("/engagement-survey") &&
                    !pathname.includes("/intake") ? (
                    <>
                      <div className="h-full min-h-[120vh] bg-white pb-16 max-sm:h-full max-sm:min-h-screen">
                        {/* <Boxes className="z-0" /> */}
                        <div className="z-[999]">
                          <NetworkNav
                            restrictedPages={restrictedPages}
                            user={user}
                          />
                        </div>
                        <div className="z-[999]">{children}</div>
                      </div>
                    </>
                  ) : (
                    <>{children}</>
                  )}
                </>
              )}
          </>
        )}
      </>
    </>
  );
};

export default LayoutComponent;
