"use client";

import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LoginWall, UnAuth } from "./UnAuthpage";
import {
  baseURL,
  basicAuth,
  getUserAccount,
  hideBots,
  subdomain,
} from "@/lib/utils";
import NetworkNav from "@/components/NetworkNav";
import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";

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
}: {
  user: KindeUser | null;
  children: React.ReactNode;
  isDemoUser: boolean;
  isRestricted: boolean;
}) => {
  const pathname = usePathname();
  const [logSessionStarted, setLogSessionStarted] = useState<boolean>(false);
  const [botId, setBotId] = useState<string>("");
  const [showCoachBot, setShowCoachBot] = useState(false);

  useEffect(() => {
    if (user) {
      getUserAccount(user)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          window.userIdFromWebApp = data.uid;
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
          window.user = user;
        }
        setupLogRocketReact(LogRocket);
        setLogSessionStarted(true);
        console.log("LOG SESSION STARTED");
      }
    }
  }, []);

  useEffect(() => {
    //hide bots from intake
    if (pathname.includes("intake")) {
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
    }
  }, [pathname]);

  useEffect(() => {
    const coachtalk = document.getElementsByClassName("deep-chat-poc")[0];
    const coachScribe = document.getElementsByClassName("deep-chat-poc2")[0];
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
                      <div data-bot-id={botId} className="deep-chat-poc2"></div>
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
                  <div data-bot-id={botId} className="deep-chat-poc2"></div>
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
    </>
  );
};

export default LayoutComponent;
