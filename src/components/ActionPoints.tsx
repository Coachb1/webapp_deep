"use client";

import { calculateTotalActionPoints } from "@/lib/utils";
import {
  BookA,
  Check,
  Clapperboard,
  MailCheck,
  Newspaper,
  ShoppingBag,
} from "lucide-react";
import { useEffect, useState } from "react";
import { baseURL, basicAuth } from "@/lib/utils";

const ActionPoints = ({ user }: any) => {
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
            setTotalActionPoints(calculateTotalActionPoints(data));
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }, []);

  const MileStone = ({ actionPoint, icon, name }: any) => {
    return (
      <div className="w-[16%]">
        <div className="flex flex-col items-center justify-center">
          <div
            className={`h-10 w-10 max-sm:h-8 max-sm:w-8 border border-gray-300 shadow-sm rounded-md  flex items-center justify-center ${
              totalActionPoints >= actionPoint ? "bg-green-200" : ""
            }`}
          >
            {totalActionPoints >= actionPoint ? (
              <>
                <Check className="h-8 w-8 text-green-700" />
              </>
            ) : null}
          </div>
          <p className="my-1 font-bold text-gray-700 text-lg max-sm:text-sm">
            {actionPoint}
          </p>
        </div>
        <div className="bg-gray-300 h-[2px] w-full mb-2"></div>
        <div className="flex flex-col items-center justify-center">
          {icon}
          <p className="my-1 font-bold text-gray-700 text-center text-sm max-sm:text-[10px]">
            {name}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-accent p-2 mt-2 rounded-md">
      <div className="pl-4 max-sm:pl-2 pt-2">Action Points</div>
      <div className="m-4 max-sm:m-2">
        <div className="flex flex-row w-full gap-0 bg-gray-200 p-4 max-sm:pr-1 rounded-md">
          <div className="flex flex-col justify-evenly items-center w-[16%]">
            <p>Points</p>
            <div className=" h-[2px] w-full mb-2"></div>
            <p>Gifts</p>
          </div>
          <MileStone
            actionPoint={3}
            icon={<MailCheck className="h-6 mt-3 w-6 text-gray-600" />}
            name={"Custom Mail Signature"}
          />
          <MileStone
            actionPoint={10}
            icon={<Newspaper className="h-6 mt-3 w-6 text-gray-600" />}
            name={"Coach Hero Certificate"}
          />
          <MileStone
            actionPoint={20}
            icon={<BookA className="h-6 mt-3 w-6 text-gray-600" />}
            name={"Book"}
          />
          <MileStone
            actionPoint={30}
            icon={<Clapperboard className="h-6 mt-3 w-6 text-gray-600" />}
            name={"Movie Ticket"}
          />
          <MileStone
            actionPoint={50}
            icon={<ShoppingBag className="h-6 mt-3 w-6 text-gray-600" />}
            name={"Goody Bag"}
          />
        </div>
      </div>
    </div>
  );
};

export default ActionPoints;
