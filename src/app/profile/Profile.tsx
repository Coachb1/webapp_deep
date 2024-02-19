"use client";

import ActionPoints from "@/app/profile/ActionPoints";
import Conversations from "@/app/profile/Conversations";
import NetworkNav from "@/components/NetworkNav";
import SessionNotes from "@/app/profile/SessionNotes";
import UserProfile from "@/app/profile/UserProfile";
import {
  UserCircle,
  StickyNote,
  MessagesSquareIcon,
  PocketIcon,
  BrainCircuit,
  ChevronLeft,
  BookCopyIcon,
  ShieldCheck,
  GanttChartSquare,
  MailCheck,
  UserCog2,
  ClipboardList,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Competencies from "@/app/profile/Competencies";
import MyPages from "@/app/profile/MyPages";
import { getUserAccount } from "@/lib/utils";
import AdminProfile from "@/app/profile/AdminProfile";
import IDP from "@/app/profile/IDP";
import EmailSign from "./EmailSign";
import MyComnnections from "./MyConnections";
import AdminReports from "./AdminReports";

const Profile = ({ user }: any) => {
  const [selectedItem, setSelectedItem] = useState("Account Information");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    if (user) {
      getUserAccount(user)
        .then((res) => res.json())
        .then((data) => {
          setUserRole(data.role);
        });
    }
  }, []);

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
      <div className="fixed w-full flex items-center justify-end p-4 h-6 pt-8 ">
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
      <div className="h-full px-10 max-sm:px-5 w-full bg-white min-h-[80vh] flex flex-row justify-between">
        <div className="w-[18%] max-sm:w-[10%] mt-2 mr-2 fixed">
          <div className="h-full flex flex-col justify-start gap-3 mb-4 overflow-scroll no-scrollbar ">
            <NavItem
              itemName={"Account Information"}
              icon={<UserCircle className="text-gray-500 h-5 w-5" />}
            />
            <NavItem
              itemName={"My Connections"}
              icon={<UserCog2 className="text-gray-500 h-5 w-5" />}
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
              itemName={"My Rewards"}
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
            <NavItem
              itemName={"IDP"}
              icon={<GanttChartSquare className="text-gray-500 h-5 w-5" />}
            />
            <NavItem
              itemName={"Email Signature"}
              icon={<MailCheck className="text-gray-500 h-5 w-5" />}
            />
            {userRole === "super_admin" ? (
              <NavItem
                itemName={"Admin"}
                icon={<ShieldCheck className="text-blue-500 h-5 w-5" />}
              />
            ) : null}
            {userRole === "super_admin" || userRole === "client_admin" ? (
              <NavItem
                itemName={"Admin Reports"}
                icon={<ClipboardList className="text-blue-500 h-5 w-5" />}
              />
            ) : null}
          </div>
        </div>
        <div className=" ml-[20%] w-[80%] max-sm:w-[90%]">
          {selectedItem === "Account Information" && (
            <div className="mb-8">
              <UserProfile user={user} />
              <MyPages user={user} />
            </div>
          )}
          {selectedItem === "Session Notes" && <SessionNotes user={user} />}
          {selectedItem === "Bot Conversations" && (
            <Conversations user={user} />
          )}
          {selectedItem === "My Rewards" && <ActionPoints user={user} />}
          {selectedItem === "Competencies" && <Competencies user={user} />}
          {selectedItem === "Admin" && <AdminProfile user={user} />}
          {/* {selectedItem === "My Pages" && } */}
          {selectedItem === "Email Signature" && <EmailSign user={user} />}
          {selectedItem === "My Connections" && <MyComnnections user={user} />}
          {selectedItem === "Admin Reports" && <AdminReports user={user} />}
          {selectedItem === "IDP" && <IDP user={user} />}
        </div>
      </div>
    </>
  );
};

export default Profile;
