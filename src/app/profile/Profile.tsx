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
import { getClientUserInfo, getUserAccount } from "@/lib/utils";
import AdminProfile from "@/app/profile/AdminProfile";
import IDP from "@/app/profile/IDP";
import EmailSign from "./EmailSign";
import MyComnnections from "./MyConnections";
import AdminReports from "./AdminReports";
import HelpMode from "@/components/HelpMode";

const Profile = ({ user }: any) => {
  const [selectedItem, setSelectedItem] = useState("Account Information");
  const [userRole, setUserRole] = useState("");

  //client based restrictions
  const [restrictedPages, setRestrictedPages] = useState<string | null>(null);
  const [restrictedFeatures, setRestrictedFeatures] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (user) {
      getUserAccount(user)
        .then((res) => res.json())
        .then((data) => {
          setUserRole(data.role);
        });

      getClientUserInfo(user?.email)
        ?.then((res) => res.json())
        .then((data) => {
          console.log(data, "getClientUserInfo - userProfile");

          setRestrictedPages(data.data.user_info[0].restricted_pages);
          setRestrictedFeatures(data.data.user_info[0].restricted_features);
        });
    }
  }, []);

  const NavItem = ({ itemName, icon, id }: any) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              id={id}
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

  const HelpModeSteps: {
    target: string;
    content: any;
  }[] = [
    {
      target: "#ainfo",
      content:
        " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quidem dolorum, corrupti sequi quibusdam ipsam itaque labore ad aliquam, tempora dicta? Ut nam quo sit enim minima aut alias itaque aliquid laborum et rerum quia expedita doloremque magni, aliquam tempore ad sint, explicabo temporibus facere sunt. Pariatur animi repellendus officiis.",
    },
    {
      target: "#mcon",
      content:
        " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quidem dolorum, corrupti sequi quibusdam ipsam itaque labore ad aliquam, tempora dicta? Ut nam quo sit enim minima aut alias itaque aliquid laborum et rerum quia expedita doloremque magni, aliquam tempore ad sint, explicabo temporibus facere sunt. Pariatur animi repellendus officiis.",
    },
    {
      target: "#apsn",
      content:
        " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quidem dolorum, corrupti sequi quibusdam ipsam itaque labore ad aliquam, tempora dicta? Ut nam quo sit enim minima aut alias itaque aliquid laborum et rerum quia expedita doloremque magni, aliquam tempore ad sint, explicabo temporibus facere sunt. Pariatur animi repellendus officiis.",
    },
    {
      target: "#bcon",
      content:
        " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quidem dolorum, corrupti sequi quibusdam ipsam itaque labore ad aliquam, tempora dicta? Ut nam quo sit enim minima aut alias itaque aliquid laborum et rerum quia expedita doloremque magni, aliquam tempore ad sint, explicabo temporibus facere sunt. Pariatur animi repellendus officiis.",
    },
    {
      target: "#mrew",
      content:
        " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quidem dolorum, corrupti sequi quibusdam ipsam itaque labore ad aliquam, tempora dicta? Ut nam quo sit enim minima aut alias itaque aliquid laborum et rerum quia expedita doloremque magni, aliquam tempore ad sint, explicabo temporibus facere sunt. Pariatur animi repellendus officiis.",
    },
    {
      target: "#comp",
      content:
        " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quidem dolorum, corrupti sequi quibusdam ipsam itaque labore ad aliquam, tempora dicta? Ut nam quo sit enim minima aut alias itaque aliquid laborum et rerum quia expedita doloremque magni, aliquam tempore ad sint, explicabo temporibus facere sunt. Pariatur animi repellendus officiis.",
    },
    {
      target: "#idp",
      content:
        " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quidem dolorum, corrupti sequi quibusdam ipsam itaque labore ad aliquam, tempora dicta? Ut nam quo sit enim minima aut alias itaque aliquid laborum et rerum quia expedita doloremque magni, aliquam tempore ad sint, explicabo temporibus facere sunt. Pariatur animi repellendus officiis.",
    },
    {
      target: "#esign",
      content:
        " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quidem dolorum, corrupti sequi quibusdam ipsam itaque labore ad aliquam, tempora dicta? Ut nam quo sit enim minima aut alias itaque aliquid laborum et rerum quia expedita doloremque magni, aliquam tempore ad sint, explicabo temporibus facere sunt. Pariatur animi repellendus officiis.",
    },
    {
      target: "#admin",
      content:
        " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quidem dolorum, corrupti sequi quibusdam ipsam itaque labore ad aliquam, tempora dicta? Ut nam quo sit enim minima aut alias itaque aliquid laborum et rerum quia expedita doloremque magni, aliquam tempore ad sint, explicabo temporibus facere sunt. Pariatur animi repellendus officiis.",
    },
    {
      target: "#arep",
      content:
        " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quidem dolorum, corrupti sequi quibusdam ipsam itaque labore ad aliquam, tempora dicta? Ut nam quo sit enim minima aut alias itaque aliquid laborum et rerum quia expedita doloremque magni, aliquam tempore ad sint, explicabo temporibus facere sunt. Pariatur animi repellendus officiis.",
    },
  ];

  return (
    <>
      <HelpMode steps={HelpModeSteps} />
      {/* <NetworkNav user={user} /> */}
      <div className="w-full flex flex-row justify-end">
        <div className="pb-6 pt-28 w-[80%] flex flex-row items-center">
          {" "}
          <div
            onClick={() => {
              history.back();
            }}
            className="hover:cursor-pointer"
          >
            <ChevronLeft className="h-6 w-6 mr-2 max-sm:h-4 max-sm:w-4" />
          </div>
          <h3 className="text-2xl font-mono font-semibold max-sm:text-lg">
            Your profile
          </h3>
        </div>
        <hr />
      </div>
      <div className="h-full px-10 max-sm:px-5 w-full bg-white min-h-[80vh] flex flex-row justify-between">
        <div className="w-[18%] max-sm:w-[10%] mt-2 mr-2">
          <div className="h-fit flex flex-col justify-start gap-3 mb-8 overflow-scroll no-scrollbar">
            <NavItem
              itemName={"Account Information"}
              id="ainfo"
              icon={<UserCircle className="text-gray-500 h-5 w-5" />}
            />
            {!restrictedFeatures?.includes("My Connections") && (
              <NavItem
                id="mcon"
                itemName={"My Connections"}
                icon={<UserCog2 className="text-gray-500 h-5 w-5" />}
              />
            )}
            {!restrictedFeatures?.includes("Action Plan & session notes") && (
              <NavItem
                id="apsn"
                itemName={"Action Plan & session notes"}
                icon={<StickyNote className="text-gray-500 h-5 w-5" />}
              />
            )}
            {!restrictedFeatures?.includes("Bot Conversations") && (
              <NavItem
                id="bcon"
                itemName={"Bot Conversations"}
                icon={<MessagesSquareIcon className="text-gray-500 h-5 w-5" />}
              />
            )}
            {!restrictedFeatures?.includes("My Rewards") && (
              <NavItem
                id="mrew"
                itemName={"My Rewards"}
                icon={<PocketIcon className="text-gray-500 h-5 w-5" />}
              />
            )}
            {!restrictedFeatures?.includes("Competencies") && (
              <NavItem
                id="comp"
                itemName={"Competencies"}
                icon={<BrainCircuit className="text-gray-500 h-5 w-5" />}
              />
            )}
            {!restrictedFeatures?.includes("IDP") && (
              <NavItem
                id="idp"
                itemName={"IDP"}
                icon={<GanttChartSquare className="text-gray-500 h-5 w-5" />}
              />
            )}
            {!restrictedFeatures?.includes("Email Signature") && (
              <NavItem
                id="esign"
                itemName={"Email Signature"}
                icon={<MailCheck className="text-gray-500 h-5 w-5" />}
              />
            )}
            {!restrictedFeatures?.includes("Platform-Admin") && (
              <>
                {userRole === "super_admin" ? (
                  <NavItem
                    id="admin"
                    itemName={"Admin"}
                    icon={<ShieldCheck className="text-blue-500 h-5 w-5" />}
                  />
                ) : null}
              </>
            )}
            {!restrictedFeatures?.includes("Client - Admin Reports") && (
              <>
                {userRole === "super_admin" || userRole === "client_admin" ? (
                  <NavItem
                    id="arep"
                    itemName={"Admin Reports"}
                    icon={<ClipboardList className="text-blue-500 h-5 w-5" />}
                  />
                ) : null}
              </>
            )}
          </div>
        </div>
        <div className=" w-[80%] max-sm:w-[90%]">
          {selectedItem === "Account Information" && (
            <div className="mb-8">
              <UserProfile user={user} />
              <MyPages user={user} />
            </div>
          )}
          {selectedItem === "Action Plan & session notes" && (
            <SessionNotes user={user} />
          )}
          {selectedItem === "Bot Conversations" && (
            <Conversations user={user} />
          )}
          {selectedItem === "My Rewards" && <ActionPoints user={user} />}
          {selectedItem === "Competencies" && <Competencies user={user} />}
          {selectedItem === "Admin" && <AdminProfile user={user} />}
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
