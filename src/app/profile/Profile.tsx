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
import {
  CreateOrAssignClientId,
  getClientUserInfo,
  getUserAccount,
} from "@/lib/utils";
import AdminProfile from "@/app/profile/AdminProfile";
import IDP from "@/app/profile/IDP";
import EmailSign from "./EmailSign";
import MyComnnections from "./MyConnections";
import AdminReports from "./AdminReports";
import HelpMode from "@/components/HelpMode";

const Profile = ({ user, helpModeText }: any) => {
  const [selectedItem, setSelectedItem] = useState("Account Information");
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  const [clientName, setClientName] = useState("");

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
          console.log(data);
          setUserRole(data.role);
          setUserId(data.uid);
        });

      CreateOrAssignClientId(user?.email)
        ?.then((resp) => resp.text())
        .then((result) => {
          console.log(`Success : data:`, result);
          getClientUserInfo(user?.email)
            ?.then((res) => res.json())
            .then((data) => {
              console.log(data, "getClientUserInfo - userProfile");
              setClientName(data.data.user_info[0].client_name);

              setRestrictedPages(data.data.user_info[0].restricted_pages);
              setRestrictedFeatures(data.data.user_info[0].restricted_features);
            });
        })
        .catch((error) =>
          console.error("Error in create-or-assign-client-id", error)
        );
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
              <span className="max-sm:hidden max-lg:hidden">{itemName}</span>
            </div>
          </TooltipTrigger>
          <TooltipContent
            className="hidden max-sm:block max-lg:block"
            side="right"
          >
            <p>{itemName}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <>
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
            My Account
          </h3>
        </div>
        <hr />
      </div>
      <div className="h-full px-10 max-sm:px-5 w-full bg-white min-h-[80vh] flex flex-row justify-between">
        <div className="w-[18%] max-sm:w-[10%] max-lg:flex justify-center max-lg:w-[8%] mt-2 mr-2">
          <div className="h-fit flex flex-col justify-start gap-3 mb-8 overflow-scroll no-scrollbar">
            <NavItem
              itemName={"Account Information"}
              id="ainfo"
              icon={<UserCircle className="text-gray-500 h-5 w-5" />}
            />
            {!restrictedFeatures?.includes("My-connections") && (
              <NavItem
                id="mcon"
                itemName={"My Connections"}
                icon={<UserCog2 className="text-gray-500 h-5 w-5" />}
              />
            )}
            {!restrictedFeatures?.includes("Action-session-notes") && (
              <NavItem
                id="apsn"
                itemName={"Action Plans & Session Notes"}
                icon={<StickyNote className="text-gray-500 h-5 w-5" />}
              />
            )}
            {!restrictedFeatures?.includes("Bot-conversations") && (
              <NavItem
                id="bcon"
                itemName={"Bot Conversations"}
                icon={<MessagesSquareIcon className="text-gray-500 h-5 w-5" />}
              />
            )}
            {!restrictedFeatures?.includes("My-rewards") && (
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
            {!restrictedFeatures?.includes("Email-signature") && (
              <NavItem
                id="esign"
                itemName={"Email Signature"}
                icon={<MailCheck className="text-gray-500 h-5 w-5" />}
              />
            )}
            {!restrictedFeatures?.includes("Super-admin") && (
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
            {!restrictedFeatures?.includes("Client-admin-reports") && (
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
        <div className="w-[80%] max-sm:w-[90%] max-lg:w-[90%]">
          {selectedItem === "Account Information" && (
            <div className="mb-8">
              <UserProfile
                user={user}
                userRole={userRole}
                helpModeText={helpModeText}
              />
              <MyPages user={user} />
            </div>
          )}
          {selectedItem === "Action Plans & Session Notes" && (
            <SessionNotes user={user} />
          )}
          {selectedItem === "Bot Conversations" && (
            <Conversations user={user} />
          )}
          {selectedItem === "My Rewards" && <ActionPoints user={user} />}
          {selectedItem === "Competencies" && <Competencies user={user} />}
          {selectedItem === "Admin" && (
            <AdminProfile userId={userId} user={user} clientName={clientName} />
          )}
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
