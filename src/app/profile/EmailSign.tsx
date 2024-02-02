"use client";

import CopyToClipboard from "@/components/CopyToClipboard";
import { Button } from "@/components/ui/button";
import { baseURL, basicAuth, calculateTotalActionPoints } from "@/lib/utils";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";

const EmailSign = ({ user }: any) => {
  const [totalActionPoints, setTotalActionPoints] = useState(0);
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
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }, []);

  useEffect(() => {
    console.log(totalActionPoints);
  }, [totalActionPoints]);

  return (
    <div className="bg-accent p-2 mt-2 rounded-md">
      <div className="pl-4 max-sm:pl-2 pt-2">Email Signature</div>
      <>
        {false ? ( //totalActionPoints < 3
          <div className="text-xs w-full my-10 max-sm:px-4 flex items-center justify-center">
            <div>Your custom email signature is currently not active.</div>{" "}
          </div>
        ) : (
          <div className="m-4">
            <div>
              <img
                src="/feedbackSign.png"
                alt="feedback email sign"
                className="w-60 max-sm:w-full h-[150px] bg-white p-2 border border-gray-100 shadow-sm rounded-md object-contain"
              />
              <div className="text-sm font-semibold text-gray-700 mt-2">
                <CopyToClipboard
                  copyType="signature"
                  textToCopy={`With Best Regards, 
Mala Kumari
Employee Experience Manager 
Email: mala@world.com
Phone: +91-889988998
🤔 Feeling stressed - Try me! 😟`}
                />
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default EmailSign;
