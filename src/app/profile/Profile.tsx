"use client";

import ActionPoints from "@/components/ActionPoints";
import Conversations from "@/components/Conversations";
import NetworkNav from "@/components/NetworkNav";
import SessionNotes from "@/components/SessionNotes";
import UserProfile from "@/components/UserProfile";
import {
  UserCircle,
  StickyNote,
  MessagesSquareIcon,
  PocketIcon,
  BrainCircuit,
  ChevronLeft,
  BookCopyIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Competencies from "@/components/Competencies";
import MyPages from "@/components/MyPages";

const Profile = ({ user }: any) => {
  const [selectedItem, setSelectedItem] = useState("Account Information");

  const NavItem = ({ itemName, icon }: any) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={`p-2 rounded-md text-sm flex flex-row gap-2 items-center max-sm:justify-center  hover:cursor-pointer ${
                selectedItem === itemName && "bg-gray-200"
              } ${selectedItem !== itemName && "hover:bg-gray-50"}`}
              onClick={() => {
                setSelectedItem(itemName);
              }}
            >
              {icon}
              <span className="max-sm:hidden">{itemName}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent className="hidden max-sm:block" side="right">
            <p>{itemName}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <>
      {" "}
      <div className="fixed w-full flex items-center justify-end p-4 h-6 py-8 ">
        <NetworkNav user={user} />
      </div>
      <div className="w-full flex flex-row justify-end">
        <div className="pb-6 pt-28 w-[80%] flex flex-row items-center">
          {" "}
          <Link href={"/content-library"}>
            <ChevronLeft className="h-6 w-6 mr-2 max-sm:h-4 max-sm:w-4" />
          </Link>
          <h3 className="text-2xl font-mono font-semibold max-sm:text-lg">
            Your profile
          </h3>
        </div>
        <hr />
      </div>
      <div className="h-full px-10 max-sm:px-5 w-full bg-white min-h-screen flex flex-row justify-between">
        <div className="w-[18%] max-sm:w-[10%] mt-2 mr-2 ">
          <div className="h-full flex flex-col justify-start gap-3">
            <NavItem
              itemName={"Account Information"}
              icon={<UserCircle className="text-gray-500 h-5 w-5" />}
            />
            <NavItem
              itemName={"Session Notes"}
              icon={<StickyNote className="text-gray-500 h-5 w-5" />}
            />

            <NavItem
              itemName={"Bot Conversations"}
              icon={<MessagesSquareIcon className="text-gray-500 h-5 w-5" />}
            />
            <NavItem
              itemName={"Action Points"}
              icon={<PocketIcon className="text-gray-500 h-5 w-5" />}
            />
            <NavItem
              itemName={"Competencies"}
              icon={<BrainCircuit className="text-gray-500 h-5 w-5" />}
            />
            {/* <NavItem
              itemName={"My Pages"}
              icon={<BookCopyIcon className="text-gray-500 h-5 w-5" />}
            /> */}
          </div>
        </div>
        <div className="w-[80%] max-sm:w-[90%]">
          {selectedItem === "Account Information" && (
            <UserProfile
              userName={user?.given_name!}
              userEmail={user?.email!}
            />
          )}
          {selectedItem === "Session Notes" && <SessionNotes user={user} />}
          {selectedItem === "Bot Conversations" && (
            <Conversations user={user} />
          )}
          {selectedItem === "Action Points" && <ActionPoints user={user} />}
          {selectedItem === "Competencies" && <Competencies user={user} />}
          {/* {selectedItem === "My Pages" && <MyPages user={user} />} */}
        </div>
      </div>
    </>
  );
};

export default Profile;
