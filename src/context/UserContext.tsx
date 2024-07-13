"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { KindeUser as KindeUserType } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { emptyData, getUserAccount } from "@/lib/utils";
import {
  getAttemptedTestsList,
  getBots,
  getCategorisedTests,
  getClientUserInfo,
  getClientUsers,
  getDirectoryProfiles,
  getKnowledgeBots,
  getRequestedTests,
  getTestsByCompetencies,
  getUserConnections,
  getUserJoiningPreviledges,
} from "@/lib/api";
import { CoachesDataType } from "@/app/Coaches";
import {
  CategoryData,
  ClientUserTeamType,
  ClientUserType,
  TestsType,
  UserInfoType,
  knowledgeBotJson,
  knowledgeBotType,
} from "@/lib/types";
import { Raleway } from "next/font/google";
import { usePathname } from "next/navigation";

const font = Raleway({ subsets: ["latin"] });

interface UserContextType {
  userId: string;
  userRole: string;
  userAccess: {
    accessDenied: string | null;
    accessAllowed: string | null;
  };
  userName: string;
  userInfo: UserInfoType;
  directoryProfiles: CoachesDataType[];
  joiningPrevileges: any;
  userConnections: any[];
  fetchUserData: (
    userEmail: string | null,
    user: KindeUserType | null
  ) => Promise<void>;
  loadingState: boolean;
  coachId: string;
  coacheeId: string;
  competencyBasedPowerSkillsTests: any;
  feedbackBots: any[];
  allCoaches: CoachesDataType[];
  requestedTestsData: {
    assignedscenarios: TestsType[];
    requestedscenarios: TestsType[];
  };
  attemptedTests: string[];
  categorisedTests: CategoryData[];
  knowledgeBots: knowledgeBotType[];
  clientUsers: ClientUserTeamType[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({
  children,
  kindeUser,
}: {
  children: ReactNode;
  kindeUser: KindeUserType | null;
}) => {
  const [userId, setUserId] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");
  const [userAccess, setUserAccess] = useState<{
    accessDenied: string | null;
    accessAllowed: string | null;
  }>({
    accessDenied: "",
    accessAllowed: "",
  });
  const [userInfo, setUserInfo] = useState<UserInfoType>(emptyData);
  const [directoryProfiles, setDirectoryProfiles] = useState<CoachesDataType[]>(
    []
  );
  const pathname = usePathname();
  const [joiningPrevileges, setJoiningPrevileges] = useState<any>(null);
  const [userConnections, setUserConnections] = useState<any[]>([]);
  const [loadingState, setLoadingState] = useState<boolean>(true);
  const [coachId, setCoachId] = useState("");
  const [coacheeId, setCoacheeId] = useState("");
  const [competencyBasedPowerSkillsTests, setCompetencyBasedPowerSkillsTests] =
    useState<any>();
  const [feedbackBots, setFeedbackBots] = useState<any[]>([]);
  const [allCoaches, setAllCoaches] = useState<CoachesDataType[]>([]);
  const [requestedTestsData, setRequestedTestsData] = useState<{
    assignedscenarios: TestsType[];
    requestedscenarios: TestsType[];
  }>({
    assignedscenarios: [],
    requestedscenarios: [],
  });

  const [attemptedTests, setAttemptedTests] = useState<string[]>([]);
  const [categorisedTests, setCategorisedTests] = useState<CategoryData[]>([]);

  const [knowledgeBots, setknowledgeBots] = useState<knowledgeBotType[]>([]);
  const [clientUsers, setClientUsers] = useState<ClientUserTeamType[]>([]);

  const fetchUserData = async (
    userEmail: string | null,
    user: KindeUserType | null
  ) => {
    if (!userEmail || !user) {
      setLoadingState(false);
      return;
    }

    setLoadingState(true);

    try {
      const userAccount = await getUserAccount(user);
      const data = await userAccount.json();
      setUserId(data.uid);
      setUserRole(data.role);
      setUserName(data.name);
      setUserAccess({
        accessAllowed: data.access_allowed,
        accessDenied: data.access_denied,
      });

      const userInfo = await getClientUserInfo(userEmail, user);

      const [
        profiles,
        previleges,
        connectionsData,
        botsData,
        attemptedTests,
        competencyBasedTests,
        requestedTestData,
        categorisedTestsData,
        knowledgeBots,
        clientUsers,
      ] = await Promise.all([
        getDirectoryProfiles(userEmail, data.coach_recommendation),
        getUserJoiningPreviledges(userEmail),
        getUserConnections(data.uid),
        getBots(data.uid),
        getAttemptedTestsList(data.uid),
        getTestsByCompetencies(data.uid),
        getRequestedTests(data.uid),
        getCategorisedTests(userInfo.clientName),
        getKnowledgeBots(userInfo.clientName),
        getClientUsers(userInfo.clientName),
      ]);
      setLoadingState(false);

      console.log(attemptedTests);

      const { connections, coachId, coacheeId, userProfiles } = connectionsData;
      setCoachId(coachId);
      setCoacheeId(coacheeId);
      setAllCoaches(userProfiles);

      setUserInfo(userInfo);
      setDirectoryProfiles(profiles);
      setJoiningPrevileges(previleges);
      setUserConnections(connections?.data);
      setAttemptedTests(attemptedTests);

      //library
      setCategorisedTests(categorisedTestsData);
      setCompetencyBasedPowerSkillsTests(competencyBasedTests);
      setFeedbackBots(
        botsData.data.filter(
          (data: any) => data.signature_bot.bot_type === "feedback_bot"
        )
      );
      setRequestedTestsData(requestedTestData);

      //creator-studio
      setknowledgeBots(knowledgeBots);
      setClientUsers(clientUsers);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoadingState(false);
    }
  };

  useEffect(() => {
    if (!["/coach", "/feedback"].includes(pathname)) {
      if (kindeUser) {
        fetchUserData(kindeUser.email, kindeUser);
      } else {
        setLoadingState(false);
      }
    } else {
      setLoadingState(false);
    }
  }, [kindeUser]);

  const contextValue = useMemo(
    () => ({
      userId,
      userRole,
      userName,
      userAccess,
      userInfo,
      directoryProfiles,
      joiningPrevileges,
      userConnections,
      fetchUserData,
      loadingState,
      coachId,
      coacheeId,
      competencyBasedPowerSkillsTests,
      feedbackBots,
      allCoaches,
      requestedTestsData,
      attemptedTests,
      categorisedTests,
      knowledgeBots,
      clientUsers,
    }),
    [
      userId,
      userRole,
      userName,
      userAccess,
      userInfo,
      directoryProfiles,
      joiningPrevileges,
      userConnections,
      loadingState,
      coachId,
      coacheeId,
      competencyBasedPowerSkillsTests,
      feedbackBots,
      allCoaches,
      requestedTestsData,
      attemptedTests,
      categorisedTests,
      knowledgeBots,
      clientUsers,
    ]
  );

  return (
    <UserContext.Provider value={contextValue}>
      {loadingState ? (
        <html>
          <body className={font.className}>
            <div className="text-2xl text-center w-full h-screen flex items-center justify-center">
              <div>loading...</div>
            </div>
          </body>
        </html>
      ) : (
        <html>
          <body className={font.className}>{children}</body>
        </html>
      )}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
