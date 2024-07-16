"use client";

import { calculateTotalActionPoints, getUserAccount } from "@/lib/utils";
import {
  BookA,
  Check,
  Clapperboard,
  Info,
  Loader,
  MailCheck,
  Milestone,
  Newspaper,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";
import HelpMode from "@/components/HelpMode";
import { useUser } from "@/context/UserContext";

const ActionPoints = ({ user }: any) => {
  const [loading, setLoading] = useState(false);

  const { actionPoints: totalActionPoints } = useUser();

  // useEffect(() => {
  //   if (user) {
  //     getUserAccount(user)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("USER FROM ACTIONS", data);
  //         console.log(data.uid);
  //         fetch(
  //           `${baseURL}/test-attempt-sessions/get-or-save-action-point/?mode=get&user_id=${data.uid}`,
  //           {
  //             method: "GET",
  //             headers: {
  //               Authorization: basicAuth,
  //             },
  //           }
  //         )
  //           .then((res) => res.json())
  //           .then((data) => {
  //             console.log(data);
  //             if (!data.msg) {
  //               setTotalActionPoints(calculateTotalActionPoints(data));
  //             }
  //             setLoading(false);
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //             setLoading(false);
  //           });
  //       });
  //   }
  // }, []);

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
          {/* {icon} */}
          {/* <p className="my-1 font-bold text-gray-700 text-center text-sm max-sm:text-[10px]">
            {name}
          </p> */}
          <Milestone className="h-8 mt-3 w-8 text-gray-500 max-sm:h-5 max-sm:w-5" />
          {actionPoint === 50 && (
            <p className="text-xs text-center">Invite Privileges</p>
          )}
        </div>
      </div>
    );
  };
  const HelpModeSteps: {
    target: string;
    content: any;
  }[] = [
    {
      target: "#session-reports",
      content:
        " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quidem dolorum, corrupti sequi quibusdam ipsam itaque labore ad aliquam, tempora dicta? Ut nam quo sit enim minima aut alias itaque aliquid laborum et rerum quia expedita doloremque magni, aliquam tempore ad sint, explicabo temporibus facere sunt. Pariatur animi repellendus officiis.",
    },
    {
      target: "#personal-leaderboard",
      content:
        " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quidem dolorum, corrupti sequi quibusdam ipsam itaque labore ad aliquam, tempora dicta? Ut nam quo sit enim minima aut alias itaque aliquid laborum et rerum quia expedita doloremque magni, aliquam tempore ad sint, explicabo temporibus facere sunt. Pariatur animi repellendus officiis.",
    },
  ];

  return (
    <div className="bg-accent p-2 mt-2 rounded-md">
      <HelpMode steps={HelpModeSteps} />
      <div className="pl-4 max-sm:pl-2 pt-2">My Rewards</div>
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
        <div className="m-4 max-sm:m-2">
          <p className="bg-amber-100 text-xs font-semibold text-gray-500 p-1 my-1 w-fit rounded-md">
            {" "}
            <Info className="h-3 w-3 mr-2 inline" />
            Please reach out to your admin for redemption of your award points.
          </p>
          <div className="flex flex-row w-full gap-0 bg-gray-200 p-4 max-sm:p-1 rounded-md">
            <div className="flex flex-col justify-evenly items-center w-[16%]">
              <p className="max-sm:text-xs ">Points</p>
              <div className=" h-[2px] w-full mb-2"></div>
              <p className="mt-8 max-sm:mt-2 max-sm:text-xs ">Gifts</p>
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
      )}
    </div>
  );
};

export default ActionPoints;
