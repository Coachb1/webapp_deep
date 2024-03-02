"use client";

import { Button } from "@/components/ui/button";
import {
  baseURL,
  basicAuth,
  calculateTotalActionPoints,
  findBotIds,
  findCoachUID,
  findCoacheeUID,
  getUserAccount,
} from "@/lib/utils";
import { Copy, Loader } from "lucide-react";
import { useEffect, useState } from "react";

const EmailSign = ({ user }: any) => {
  const [totalActionPoints, setTotalActionPoints] = useState(0);

  const [loading, setLoading] = useState(true);

  const [coachId, setCoachId] = useState("");
  const [coacheeId, setCoacheeId] = useState("");
  const [feedbackBots, setFeedbackBots] = useState<any[]>([]);

  const [avatarBotId, setAvatarBotId] = useState("");
  const [feedbackBotId, setFeedbackBotId] = useState("");

  useEffect(() => {
    if (user) {
      getUserAccount(user)
        .then((response) => response.json())
        .then((userdata) => {
          console.log("USER FROM ACTIONS", userdata);
          console.log(userdata.uid);
          fetch(
            `${baseURL}/test-attempt-sessions/get-or-save-action-point/?mode=get&user_id=${userdata.uid}`,
            {
              method: "GET",
              headers: {
                Authorization: basicAuth,
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (!data.msg) {
                setTotalActionPoints(calculateTotalActionPoints(data));
              }
              // setLoading(false);
            })
            .catch((err) => {
              console.log(err);
              // setLoading(false);
            });

          fetch(
            `${baseURL}/accounts/coach-coachee-mentor-mentee-profile/?user_id=${userdata.uid}`,
            {
              method: "GET",
              headers: {
                Authorization: basicAuth,
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data);

              const isApprovedData = data.data.filter(
                (coachData: any) => coachData.is_approved === true
              );

              if (isApprovedData.length > 0) {
                setCoacheeId(findCoacheeUID(isApprovedData));
                setCoachId(findCoachUID(isApprovedData));

                const bot_ids = findBotIds(isApprovedData);
                if (bot_ids.split(", ").length > 0) {
                  const avatarBot = bot_ids
                    .split(", ")
                    .filter((id: string) => id.includes("avatar"))
                    .join("");
                  setAvatarBotId(avatarBot);

                  const feedbackBot = bot_ids
                    .split(", ")
                    .filter((id: string) => id.includes("feedback"))
                    .join("");
                  setFeedbackBotId(feedbackBot);
                }

                if (findCoacheeUID(isApprovedData)) {
                  fetch(
                    `${baseURL}/accounts/get-bots/?user_id=${userdata.uid}`,
                    {
                      headers: {
                        Authorization: basicAuth,
                      },
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      console.log("Bot details for edit", data);
                      const FeedbackBot = data.data.filter(
                        (data: any) =>
                          data.signature_bot.bot_type === "feedback_bot"
                      );
                      console.log(FeedbackBot, "FeedbackBot");
                      setFeedbackBots(FeedbackBot);
                      setTimeout(() => {
                        setLoading(false);
                      }, 1000);
                    })
                    .catch((err) => {
                      console.error(err);
                      setLoading(false);
                    });
                } else {
                  setTimeout(() => {
                    setLoading(false);
                  }, 1000);
                }
              } else {
                setTimeout(() => {
                  setLoading(false);
                }, 1000);
                setCoacheeId("");
                setCoachId("");
              }
            })
            .catch((err) => {
              setLoading(false);
              console.error(err);
            });
        });
    }
  }, []);
  useEffect(() => {
    console.log(totalActionPoints);
  }, [totalActionPoints]);

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
    <div className="bg-accent p-2 mt-2 rounded-md">
      <div className="pl-4 max-sm:pl-2 pt-2">Email Signature</div>
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
          <>
            {totalActionPoints >= 3 ? (
              <>
                {coachId.length > 0 ? (
                  <>
                    <div className="m-4 flex flex-row gap-2 max-sm:flex-col">
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
                            <div>Mala Kumari</div>
                            <div>Employee Experience Manager </div>
                            <div>
                              Email:{" "}
                              <a
                                style={{
                                  color: "#2563eb",
                                  textDecoration: "underline",
                                }}
                                href="maito:mala@world.com"
                              >
                                mala@world.com
                              </a>{" "}
                            </div>
                            <div>Phone: +91-889988998 </div>
                            <a
                              href={`https://playground.coachbots.com/feedback/${feedbackBotId}`}
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
                            <div>Mala Kumari</div>
                            <div>Operations Director </div>
                            <div>
                              Email:{" "}
                              <a
                                style={{
                                  color: "#2563eb",
                                  textDecoration: "underline",
                                }}
                                href="maito:mala@world.com"
                              >
                                mala@world.com
                              </a>{" "}
                            </div>
                            <div>Phone: +91-889988998 </div>
                            <a
                              href={`https://playground.coachbots.com/coach/${avatarBotId}`}
                              style={{
                                fontWeight: 600,
                                fontSize: "12px",
                                color: "#2563eb",
                                fontFamily: "monospace",
                              }}
                            >
                              👨‍🏫👩‍🏫 My Coach Avatar 🗣️{" "}
                            </a>
                          </div>
                        </div>
                        <div className="text-sm font-semibold text-gray-700 mt-2">
                          <CopySignComponent id="email-sign-avatar" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm my-1 text-gray-600 font-semibold">
                          Feedback + Coach Profile
                        </p>
                        <div className="w-fit h-[150px]  bg-white border border-gray-100 shadow-sm rounded-md object-contain">
                          <div
                            id="email-sign-feedback"
                            className="m-3 font-[400] font-sans  text-[12px] selection:bg-transparent"
                          >
                            <div>With best Regards,</div>
                            <div>Mala Kumari</div>
                            <div>Employee Experience Manager </div>
                            <div>
                              Email:{" "}
                              <a
                                style={{
                                  color: "#2563eb",
                                  textDecoration: "underline",
                                }}
                                href="maito:mala@world.com"
                              >
                                mala@world.com
                              </a>{" "}
                            </div>
                            <div>Phone: +91-889988998 </div>

                            <a
                              href={`https://playground.coachbots.com/feedback/${feedbackBotId}`}
                              style={{
                                fontWeight: 600,
                                fontSize: "12px",
                                color: "#2563eb",
                                fontFamily: "serif",
                              }}
                            >
                              🤔 Open to your feedback - How am I doing? 📈{" "}
                            </a>
                            <br />
                            <a
                              href={`https://playground.coachbots.com/coach/${avatarBotId}`}
                              style={{
                                fontWeight: 600,
                                fontSize: "12px",
                                color: "#2563eb",
                                fontFamily: "monospace",
                              }}
                            >
                              👨‍🏫👩‍🏫 My Coach Avatar 🗣️{" "}
                            </a>
                          </div>
                        </div>
                        <div className="text-sm font-semibold text-gray-700 mt-2">
                          <CopySignComponent id="email-sign-feedback" />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-xs w-full my-10 max-sm:px-4 flex items-center justify-center">
                    <div>
                      Your custom email signature is currently not active.
                    </div>{" "}
                  </div>
                )}
                {coacheeId.length > 0 && (
                  <>
                    {feedbackBots.length > 0 ? (
                      <>
                        <div className="m-4 flex flex-row gap-2 max-sm:flex-col">
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
                                <div>Mala Kumari</div>
                                <div>Employee Experience Manager </div>
                                <div>
                                  Email:{" "}
                                  <a
                                    style={{
                                      color: "#2563eb",
                                      textDecoration: "underline",
                                    }}
                                    href="maito:mala@world.com"
                                  >
                                    mala@world.com
                                  </a>{" "}
                                </div>
                                <div>Phone: +91-889988998 </div>
                                <a
                                  href={`https://playground.coachbots.com/feedback/${feedbackBotId}`}
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
                        </div>
                      </>
                    ) : (
                      <div className="text-xs w-full my-10 max-sm:px-4 flex items-center justify-center">
                        <div>
                          Please create your feedback page to enable email
                          signatures.
                        </div>{" "}
                      </div>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {!loading && (
                  <>
                    <div className="text-xs w-full my-10 max-sm:px-4 flex items-center justify-center">
                      <div>
                        Your custom email signature is currently not active.
                      </div>{" "}
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default EmailSign;
