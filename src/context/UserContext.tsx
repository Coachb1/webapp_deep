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
  getActionPoints,
  getAttemptedTestsList,
  getBots,
  getCandidateReport,
  getCategorisedTests,
  getClientUserInfo,
  getClientUsers,
  getConnections,
  getConversations,
  getDirectoryProfiles,
  getIDPs,
  getKnowledgeBots,
  getKudosData,
  getLeaderboardPosition,
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
  ConvertedConversation,
  FeedbackConversationType,
  KudosDetailsType,
  PositionedUserTypes,
  TestsType,
  UserIDPsType,
  UserInfoType,
  knowledgeBotJson,
  knowledgeBotType,
} from "@/lib/types";
import { Raleway } from "next/font/google";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { DemoPage, UnAuth } from "@/app/UnAuthpage";
import { useRouter } from "next/navigation";

const font = Raleway({ subsets: ["latin"] });

interface UserContextType {
  userId: string;
  userRole: string;
  userAccess: {
    accessDenied: string | null;
    accessAllowed: string | null;
  };
  allowAudioInteraction: {
    client: boolean;
    user: boolean;
  };
  userName: string;
  userInfo: UserInfoType;
  directoryProfiles: CoachesDataType[];
  joiningPrevileges: any;
  userConnections: any[];
  fetchUserData: (
    userEmail: string | null | undefined,
    user: KindeUserType | null,
    revalidate?: boolean
  ) => Promise<void>;
  getAllCompetencyData: () => Promise<void>;
  getAllDirectoryData: () => Promise<void>;
  getAllBotConversationData: () => Promise<void>;
  getAllKnowledgeBotData: () => Promise<void>;
  getAllConnectionsData: () => Promise<void>;
  getAllUserData: () => Promise<void>;
  getAllClientData: () => Promise<void>;
  getFeedbackBotsData: () => Promise<void>;
  loadingState: boolean;
  coachId: string;
  coacheeId: string;
  competencyBasedPowerSkillsTests: any;
  competencyData: any;
  botsData: any[];
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
  userPositionDetails: PositionedUserTypes[];
  candidateReport: string;
  kudosData: {
    totalUsersForFeedback: number;
    userKudosData: KudosDetailsType[];
  };
  botConversations: {
    convertsationDataAdmin: ConvertedConversation[];
    conversationDataUser: ConvertedConversation[];
    feedbackConversations: FeedbackConversationType[];
  };
  actionPoints: number;
  userIDPs: UserIDPsType[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({
  children,
  kindeUser,
}: {
  children: ReactNode;
  kindeUser: KindeUserType | null;
}) => {
  const router = useRouter();
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

  const [allowAudioInteraction, setAllowAudioInteraction] = useState<{
    client: boolean;
    user: boolean;
  }>({
    client: false,
    user: false,
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

  //profile
  const [candidateReport, setCandidateReport] = useState<string>("");
  const [userPositionDetails, setUserPositionDetails] = useState<
    PositionedUserTypes[]
  >([]);
  const [kudosData, setKudosData] = useState<{
    totalUsersForFeedback: number;
    userKudosData: KudosDetailsType[];
  }>({
    totalUsersForFeedback: 0,
    userKudosData: [],
  });
  const [botsData, setBotsData] = useState<any[]>([]);
  const [botConversations, setBotConversations] = useState<{
    convertsationDataAdmin: ConvertedConversation[];
    conversationDataUser: ConvertedConversation[];
    feedbackConversations: FeedbackConversationType[];
  }>({
    convertsationDataAdmin: [],
    conversationDataUser: [],
    feedbackConversations: [],
  });
  const [actionPoints, setActionPoints] = useState(0);
  const [competencyData, setCompetencyData] = useState<any>();
  const [userIDPs, setUserIDPs] = useState<UserIDPsType[]>([]);

  const fetchUserData = async (
    userEmail: string | null | undefined,
    user: KindeUserType | null,
    revalidate?: boolean
  ) => {
    if (!userEmail || !user) {
      setLoadingState(false);
      return;
    }

    if (!revalidate) {
      setLoadingState(true);
    }

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
      setAllowAudioInteraction({
        client: data.client_allow_audio_interactions,
        user: data.user_allow_audio_interactions,
      });

      const userInfo = await getClientUserInfo(userEmail, user);
      console.log("userInfo", userInfo);
      setUserInfo(userInfo);

      if (!userInfo.isDemoUser && !userInfo.isRestricted) {
        if (userInfo.restrictedPages?.includes("Network Directory")) {
          if (!userInfo.restrictedPages?.includes("Explore")) {
            router.push("content-library");
          } else if (!userInfo.restrictedPages?.includes("Library")) {
            router.push("library");
          } else if (!userInfo.restrictedPages?.includes("Creator Studio")) {
            router.push("create-scenario");
          }
          setLoadingState(false);
        }
        if (!userInfo.restrictedPages?.includes("Network Directory")) {
          const profiles = await getDirectoryProfiles(
            userEmail,
            data.coach_recommendation
          );
          setDirectoryProfiles(profiles);
          console.log(profiles);

          const previleges = await getUserJoiningPreviledges(userEmail);
          setJoiningPrevileges(previleges);
          console.log(previleges);

          if (!userInfo.restrictedPages?.includes("Profile")) {
            const connectionsData = await getUserConnections(data.uid);
            const { connections, coachId, coacheeId, userProfiles } =
              connectionsData;
            console.log(connectionsData);
            setCoachId(coachId);
            setCoacheeId(coacheeId);
            setAllCoaches(userProfiles);
            setUserConnections(connections?.data);

            const botsData = await getBots(data.uid);
            console.log(botsData);
            setBotsData(botsData?.data);
            const feedbackBots = botsData.data?.filter(
              (data: any) => data.signature_bot.bot_type === "feedback_bot"
            );
            console.log(feedbackBots[0]?.signature_bot.bot_id);
            setFeedbackBots(feedbackBots);
          }
          setLoadingState(false);
        } else {
          setLoadingState(false);
        }

        if (!userInfo.restrictedPages?.includes("Library")) {
          const attemptedTests = await getAttemptedTestsList(data.uid);
          console.log(attemptedTests);
          setAttemptedTests(attemptedTests);

          const competencyBasedTests = await getTestsByCompetencies(data.uid);
          console.log(competencyBasedTests);
          setCompetencyBasedPowerSkillsTests(
            competencyBasedTests?.competencyTests
          );
          setCompetencyData(competencyBasedTests?.competencyData);

          const requestedTestData = await getRequestedTests(data.uid);
          setRequestedTestsData(requestedTestData);

          const categorisedTestsData = await getCategorisedTests(
            userInfo.clientName
          );
          setCategorisedTests(categorisedTestsData);
        }

        if (!userInfo.restrictedPages?.includes("Creator Studio")) {
          const knowledgeBots = await getKnowledgeBots(
            userInfo.clientName,
            data.uid
          );
          setknowledgeBots(knowledgeBots);

          const clientUsers = await getClientUsers(userInfo.clientName);
          setClientUsers(clientUsers);

          const userPositionDetails = await getLeaderboardPosition(
            userEmail,
            data.profile_type,
            data.uid
          );
          setUserPositionDetails(userPositionDetails);
        }

        if (!userInfo.restrictedPages?.includes("Profile")) {
          const candidateReport = await getCandidateReport(data.uid);
          setCandidateReport(candidateReport);

          const kudosData = await getKudosData(data.uid, userEmail);
          setKudosData(kudosData);
          const botConversations = await getConversations(
            data.uid,
            feedbackBots[0]?.signature_bot.bot_id
          );
          setBotConversations(botConversations);

          const actionPoints = await getActionPoints(data.uid);
          setActionPoints(actionPoints);

          const idps = await getIDPs(data.uid);

          setUserIDPs(idps);
        }
      } else {
        setLoadingState(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoadingState(false);
    }
  };

  const getAllUserData = async () => {
    const userAccount = await getUserAccount(kindeUser);
    const data = await userAccount.json();
    setUserId(data.uid);
    setUserRole(data.role);
    setUserName(data.name);
    setUserAccess({
      accessAllowed: data.access_allowed,
      accessDenied: data.access_denied,
    });
    setAllowAudioInteraction({
      client: data.client_allow_audio_interactions,
      user: data.user_allow_audio_interactions,
    });

    console.log("getAllUserData", data);
  };

  const getAllClientData = async () => {
    const userInfo = await getClientUserInfo(kindeUser?.email, kindeUser);
    console.log("userInfo", userInfo);
    setUserInfo(userInfo);
  };

  const getAllCompetencyData = async () => {
    const competencyBasedTests = await getTestsByCompetencies(userId);
    console.log("Competency DATA", competencyBasedTests);
    setCompetencyBasedPowerSkillsTests(competencyBasedTests?.competencyTests);
    setCompetencyData(competencyBasedTests?.competencyData);
  };

  const getAllBotConversationData = async () => {
    const botConversations = await getConversations(
      userId,
      feedbackBots[0]?.signature_bot.bot_id
    );
    setBotConversations(botConversations);
  };

  const getAllDirectoryData = async () => {
    const userAccount = await getUserAccount(kindeUser);
    const data = await userAccount.json();
    const profiles = await getDirectoryProfiles(
      kindeUser?.email,
      data.coach_recommendation
    );
    setDirectoryProfiles(profiles);
    console.log(profiles);

    const previleges = await getUserJoiningPreviledges(kindeUser?.email);
    setJoiningPrevileges(previleges);
    console.log(previleges);

    const connectionsData = await getUserConnections(data.uid);
    const { connections, coachId, coacheeId, userProfiles } = connectionsData;
    console.log(connectionsData);
    setCoachId(coachId);
    setCoacheeId(coacheeId);
    setAllCoaches(userProfiles);
    setUserConnections(connections?.data);

    const botsData = await getBots(data.uid);
    console.log(botsData);
    setBotsData(botsData?.data);
    const feedbackBots = botsData.data?.filter(
      (data: any) => data.signature_bot.bot_type === "feedback_bot"
    );
    setFeedbackBots(feedbackBots);
  };

  const getFeedbacks = async () => {
    const botsData = await getBots(userId);
    console.log(botsData);
    setBotsData(botsData?.data);
    const feedbackBots = botsData.data?.filter(
      (data: any) => data.signature_bot.bot_type === "feedback_bot"
    );
    if (feedbackBots.length > 0) {
      setFeedbackBots(feedbackBots);
      return true; // Feedback bot found
    }
    return false; // Feedback bot not found
  };

  const getFeedbackBotsData = async () => {
    const botsData = await getBots(userId);
    console.log(botsData);
    setBotsData(botsData?.data);
    const feedbackBots = botsData.data?.filter(
      (data: any) => data.signature_bot.bot_type === "feedback_bot"
    );
    setFeedbackBots(feedbackBots);

    let attempts = 0;
    const maxAttempts = 8;

    const interval = setInterval(async () => {
      attempts++;
      const feedbackBotFound = await getFeedbacks();
      if (feedbackBotFound || attempts >= maxAttempts) {
        clearInterval(interval); // Clear interval if feedback bot is found or max attempts reached
      }
    }, 4000);
  };

  const getAllKnowledgeBotData = async () => {
    const knowledgeBots = await getKnowledgeBots(userInfo.clientName, userId);
    setknowledgeBots(knowledgeBots);
  };

  const getAllConnectionsData = async () => {
    const connectionsData = await getUserConnections(userId);
    const { connections } = connectionsData;
    setUserConnections(connections?.data);
  };

  let called = false;

  const excludedPages = [
    "/coach",
    "/feedback",
    "/knowledge-bot",
    "/engagement-survey",
    // "/intake",
  ];
  const isExcluded = excludedPages.some((page) => pathname.includes(page));

  const basicUserConfigs = async (user: KindeUserType | null) => {
    const userAccount = await getUserAccount(user);
    const data = await userAccount.json();
    setUserId(data.uid);
    setUserRole(data.role);
    setUserName(data.name);
    setUserAccess({
      accessAllowed: data.access_allowed,
      accessDenied: data.access_denied,
    });
    setAllowAudioInteraction({
      client: data.client_allow_audio_interactions,
      user: data.user_allow_audio_interactions,
    });

    console.log("getAllUserData", data);
  };

  useEffect(() => {
    // console.log(window.location.href)
    if (window.location.href.includes("dev-bot")) {
      basicUserConfigs(kindeUser);
      setLoadingState(false);
    } else {
      if (kindeUser) {
        if (!pathname.includes("/intake") && !isExcluded) {
          if (!called) {
            fetchUserData(kindeUser.email, kindeUser);
            called = true;
          }
        } else {
          setLoadingState(false);
        }
      } else {
        setLoadingState(false);
      }
    }
  }, []);

  const getConnectionsFn = async () => {
    const connections = await getConnections(coachId, coacheeId);
    console.log(connections)
    setUserConnections(connections.data)
  }

  useEffect(() => {
    if (pathname === "/profile") {
      getAllBotConversationData();
      getConnectionsFn()
    }
  }, [pathname]);

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
      getAllCompetencyData,
      getAllDirectoryData,
      getAllBotConversationData,
      getAllKnowledgeBotData,
      getAllConnectionsData,
      getAllUserData,
      getAllClientData,
      getFeedbackBotsData,
      loadingState,
      coachId,
      coacheeId,
      competencyBasedPowerSkillsTests,
      competencyData,
      botsData,
      feedbackBots,
      allCoaches,
      requestedTestsData,
      attemptedTests,
      categorisedTests,
      knowledgeBots,
      clientUsers,
      allowAudioInteraction,
      userPositionDetails,
      candidateReport,
      kudosData,
      botConversations,
      actionPoints,
      userIDPs,
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
      competencyData,
      botsData,
      feedbackBots,
      allCoaches,
      requestedTestsData,
      attemptedTests,
      categorisedTests,
      knowledgeBots,
      clientUsers,
      allowAudioInteraction,
      userPositionDetails,
      candidateReport,
      kudosData,
      botConversations,
      actionPoints,
      userIDPs,
    ]
  );

  return isExcluded ? (
    <html>
      <body className={font.className}>{children}</body>
    </html>
  ) : (
    <>
      <UserContext.Provider value={contextValue}>
        {loadingState ? (
          <html>
            <body className={font.className}>
              <MultiStepLoader
                loadingStates={[
                  { text: "Personalizing coaching with Avatars" },
                  { text: "Updating simulations" },
                  { text: "Updating AI models" },
                  { text: "Updating NLP pipelines" },
                  { text: "Updating interaction history" },
                  { text: "Creating feedback loops" },
                  { text: "Refreshing training data" },
                ]}
                loading={loadingState}
                duration={1500}
              />
            </body>
          </html>
        ) : (
          <html>
            <body className={font.className}>{children}</body>
          </html>
        )}
      </UserContext.Provider>
    </>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
