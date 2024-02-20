"use client";

import { Button } from "@/components/ui/button";
import { baseURL, basicAuth, calculateTotalActionPoints } from "@/lib/utils";
import { Copy, Loader } from "lucide-react";
import { useEffect, useState } from "react";

const EmailSign = ({ user }: any) => {
  const [totalActionPoints, setTotalActionPoints] = useState(0);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${baseURL}/accounts/`, {
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
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("USER FROM ACTIONS", data);
        console.log(data.uid);
        fetch(
          `${baseURL}/test-attempt-sessions/get-or-save-action-point/?mode=get&user_id=${data.uid}`,
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
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      });
  }, []);
  useEffect(() => {
    console.log(totalActionPoints);
  }, [totalActionPoints]);

  const copySignatureHandler = () => {
    const emailSign = document.getElementById("email-sign");
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
            {totalActionPoints > 3 ? (
              <div className="m-4">
                <div>
                  <div className="w-fit max-sm:w-full h-[150px] bg-white p-2 border border-gray-100 shadow-sm rounded-md object-contain">
                    <div
                      id="email-sign"
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
                        href="https://playground.coachbots.com/feedback"
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
                    <Button
                      onClick={() => {
                        copySignatureHandler();
                      }}
                      variant={"outline"}
                    >
                      {copied ? "Copied" : "Copy signature"}
                      <Copy className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-xs w-full my-10 max-sm:px-4 flex items-center justify-center">
                <div>Your custom email signature is currently not active.</div>{" "}
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default EmailSign;
