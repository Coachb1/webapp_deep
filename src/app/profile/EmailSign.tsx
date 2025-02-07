"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { BotDetailsType } from "@/lib/types";
import { applicationUrl, findBotIds } from "@/lib/utils";
import { Copy, Loader } from "lucide-react";
import { useEffect, useState } from "react";

const EmailSign = ({ user }: any) => {
  const [totalActionPoints, setTotalActionPoints] = useState(0);

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const [feedbackBots, setFeedbackBots] = useState<BotDetailsType[]>([]);
  const [avatarBots, setAvatarBots] = useState<BotDetailsType[]>([]);
  const [botIds, setBotIds] = useState("");

  const [avatarBotId, setAvatarBotId] = useState("");
  const [feedbackBotId, setFeedbackBotId] = useState("");
  const [subjectBotId, setSubjectBotId] = useState("");

  const { actionPoints, coachId, coacheeId, allCoaches, botsData } = useUser();

  useEffect(() => {
    if (user) {
      setUserName(
        `${user.given_name} ${user.family_name ? user.family_name : ""}`
      );
      setUserEmail(user.email);
      setTotalActionPoints(actionPoints);
      const isApprovedData = allCoaches.filter(
        (coachData: any) => coachData.is_approved === true
      );

      const bot_ids = findBotIds(isApprovedData);
      setBotIds(bot_ids);

      console.log(bot_ids);

      if (bot_ids?.split(", ").length > 0) {
        const avatarBot = bot_ids
          .split(", ")
          .filter((id: string) => id.includes("avatar-bot"))
          .join("");
        setAvatarBotId(avatarBot);

        const feedbackBot = bot_ids
          .split(", ")
          .filter((id: string) => id.includes("feedback-bot"))
          .join("");

        setFeedbackBotId(feedbackBot);

        const subject = bot_ids
          .split(", ")
          .filter((id: string) => id.includes("subject-spe"))
          .join("");

        setSubjectBotId(subject);
      }

      const coachAvatarBot = botsData.filter(
        (data: any) => data.signature_bot.bot_type === "avatar_bot"
      );
      setAvatarBots(coachAvatarBot);

      const FeedbackBot = botsData.filter(
        (data: any) => data.signature_bot.bot_type === "feedback_bot"
      );
      setFeedbackBots(FeedbackBot);

      setLoading(false);
    }
  }, []);

  const CopySignComponent = ({ id }: { id: string }) => {
    const [copied, setCopied] = useState(false);
    const copySignatureHandler = () => {
      const emailSign = document.getElementById(id);
      console.log(emailSign);
      var range = document.createRange();
      range.selectNodeContents(emailSign!);
      var selection = window.getSelection();
      selection!.removeAllRanges();
      selection!.addRange(range);
      console.log(selection);
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    };

    return (
      <Button
        onClick={() => {
          copySignatureHandler();
        }}
        variant={"outline"}
        className="h-8 w-fit"
      >
        {copied ? "Copied" : "Copy signature"}
        <Copy className="h-4 w-4 ml-2" />
      </Button>
    );
  };

  return (
    <div className="bg-accent p-2 mt-2 rounded-md  mb-6">
      <div className="pl-4 max-sm:pl-2 pt-2 text-sm max-sm:text-sm">
        Email Signature
      </div>
      <>
        {loading && (
          <>
            <div className="text-xs w-full h-20 flex items-center justify-center">
              <div>
                <Loader className="h-4 w-4 mr-2 animate-spin inline" /> Loading
              </div>
            </div>
          </>
        )}
        {!loading && (
          <div className="m-4 flex flex-row gap-4 max-sm:flex-col max-lg:flex-col max-md:flex-col">
            {avatarBotId && (
              <div>
                <p className="text-sm my-1 text-gray-600 font-semibold">
                  Coach Profile
                </p>
                <div className="w-fit  h-[150px] bg-white p-2 border border-gray-100 shadow-sm rounded-md object-contain">
                  <div
                    id="email-sign-avatar"
                    className="m-3 font-[400] font-sans  text-[12px] selection:bg-transparent"
                  >
                    <div>With best Regards,</div>
                    <div>{userName}</div>
                    <div>{"<<Add your designation>>"}</div>
                    <div>
                      Email:{" "}
                      <a
                        style={{
                          color: "#2563eb",
                          textDecoration: "underline",
                        }}
                        href={`mailto:${userEmail}`}
                      >
                        {userEmail}
                      </a>{" "}
                    </div>
                    <div>Phone: {"<<+91-Add your own>>"} </div>
                    <a
                      href={`${applicationUrl()}/coach/${avatarBotId}`}
                      style={{
                        fontWeight: 600,
                        fontSize: "12px",
                        color: "#2563eb",
                        fontFamily: "monospace",
                      }}
                    >
                      👨‍🏫👩‍🏫 My AI Copilot 🗣️{" "}
                    </a>
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-700 mt-2">
                  <CopySignComponent id="email-sign-avatar" />
                </div>
              </div>
            )}
            {subjectBotId && (
              <div>
                <p className="text-sm my-1 text-gray-600 font-semibold">
                  Subject Bot
                </p>
                <div className="w-fit  h-[150px] bg-white p-2 border border-gray-100 shadow-sm rounded-md object-contain">
                  <div
                    id="email-sign-subject"
                    className="m-3 font-[400] font-sans  text-[12px] selection:bg-transparent"
                  >
                    <div>With best Regards,</div>
                    <div>{userName}</div>
                    <div>{"<<Add your designation>>"}</div>
                    <div>
                      Email:{" "}
                      <a
                        style={{
                          color: "#2563eb",
                          textDecoration: "underline",
                        }}
                        href={`mailto:${userEmail}`}
                      >
                        {userEmail}
                      </a>{" "}
                    </div>
                    <div>Phone: {"<<+91-Add your own>>"} </div>
                    <a
                      href={`${applicationUrl()}/coach/${subjectBotId}`}
                      style={{
                        fontWeight: 600,
                        fontSize: "12px",
                        color: "#2563eb",
                        fontFamily: "monospace",
                      }}
                    >
                      👨‍🏫👩‍🏫 My Bot🗣️{" "}
                    </a>
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-700 mt-2">
                  <CopySignComponent id="email-sign-subject" />
                </div>
              </div>
            )}
            {feedbackBotId && (
              <div>
                <p className="text-sm my-1 text-gray-600 font-semibold">
                  Feedback
                </p>
                <div className="w-fit h-[150px]  bg-white p-2 border border-gray-100 shadow-sm rounded-md object-contain">
                  <div
                    id="email-sign-feedback"
                    className="m-3 font-[400] font-sans  text-[12px] selection:bg-transparent"
                  >
                    <div>With best Regards,</div>
                    <div>{userName}</div>
                    <div>{"<<Add your designation>>"} </div>
                    <div>
                      Email:{" "}
                      <a
                        style={{
                          color: "#2563eb",
                          textDecoration: "underline",
                        }}
                        href={`mailto:${userEmail}`}
                      >
                        {userEmail}
                      </a>{" "}
                    </div>
                    <div>Phone: {"<<+91-Add your own>>"} </div>
                    <a
                      href={`${applicationUrl()}/feedback/${feedbackBotId}`}
                      style={{
                        fontWeight: 600,
                        fontSize: "12px",
                        color: "#2563eb",
                        fontFamily: "serif",
                      }}
                    >
                      🤔 Open to your feedback - How am I doing? 📈{" "}
                    </a>
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-700 mt-2">
                  <CopySignComponent id="email-sign-feedback" />
                </div>
              </div>
            )}
            {feedbackBotId.length === 0 &&
              avatarBotId.length === 0 &&
              subjectBotId.length === 0 && (
                <div className="text-xs w-full my-10 max-sm:px-4 flex items-center justify-center">
                  <div>
                    Your custom email signature is currently not active.
                  </div>{" "}
                </div>
              )}
          </div>
        )}
      </>
    </div>
  );
};

export default EmailSign;
