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
  getBots,
  getClientUserInfo,
  getDirectoryProfiles,
  getRequestedTests,
  getTestsByCompetencies,
  getUserConnections,
  getUserJoiningPreviledges,
} from "@/lib/api";
import { CoachesDataType } from "@/app/Coaches";
import { TestsType, UserInfoType } from "@/lib/types";
import { Raleway } from "next/font/google";
import { usePathname } from "next/navigation";

const font = Raleway({ subsets: ["latin"] });

interface UserContextType {
  userId: string;
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

      const [
        userInfo,
        profiles,
        previleges,
        connectionsData,
        competencyBasedTests,
        botsData,
        requestedTestData,
      ] = await Promise.all([
        getClientUserInfo(userEmail, user),
        getDirectoryProfiles(userEmail, data.coach_recommendation),
        getUserJoiningPreviledges(userEmail),
        getUserConnections(data.uid),
        getTestsByCompetencies(data.uid),
        getBots(data.uid),
        getRequestedTests(data.uid),
      ]);
      setLoadingState(false);

      const { connections, coachId, coacheeId, userProfiles } = connectionsData;
      setCoachId(coachId);
      setCoacheeId(coacheeId);
      setAllCoaches(userProfiles);

      setUserInfo(userInfo);
      setDirectoryProfiles(profiles);
      setJoiningPrevileges(previleges);
      setUserConnections(connections?.data);

      setCompetencyBasedPowerSkillsTests(competencyBasedTests);
      setFeedbackBots(
        botsData.data.filter(
          (data: any) => data.signature_bot.bot_type === "feedback_bot"
        )
      );

      setRequestedTestsData(requestedTestData);
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
      }
    } else {
      setLoadingState(false);
    }
  }, [kindeUser]);

  const contextValue = useMemo(
    () => ({
      userId,
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
    }),
    [
      userId,
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
