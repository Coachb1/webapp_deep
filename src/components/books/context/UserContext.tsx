"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { usePathname } from "next/navigation";
import { MultiStepLoader } from "@/components/ui/multi-step-loader";
import { emptyData, getTestMappings, getUserTestMappings } from "@/lib/utils";
import {
  getClientUserInfo,
  getRequestedTests,
  getAttemptedTestsList,
} from "@/lib/api";

export interface UserInfoType {
  clientName: string;
  isDemoUser: boolean;
  isRestricted: boolean;
  clientExpertise: string;
  clientDepartments: string;
  restrictedPages: string | null;
  restrictedFeatures: string | null;
  headings: {
    heading: string | null;
    subHeading: string | null;
    tagLine: string | null;
  } | null;
  helpText: any;
}

interface User {
  given_name: string;
  email: string;
  user_data?: any;
}

interface PortalUserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  userInfo: UserInfoType;
  requestedTestsData: any;
  attemptedTests: string[];
  domainSkillLibrary: any;
  leadershipLibrary: any;
  userTestMapping: any;
  refreshUserData: (user: User) => Promise<void>;
}

const UserContext = createContext<PortalUserContextType | undefined>(undefined);

export const usePortalUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser a must be used within UserProvider");
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [requestedTestsData, setRequestedTestsData] = useState<any>(null);
  const [attemptedTests, setAttemptedTests] = useState<string[]>([]);
  const [domainSkillLibrary, setDomainSkillLibrary] = useState<any>(null);
  const [leadershipLibrary, setLeadershipLibrary] = useState<any>(null);
  const [userInfo, setUserInfo] = useState<UserInfoType>(emptyData);
  const [userTestMapping, setUserTestMapping] = useState<any>(null);

  const pathname = usePathname();

  // track if user proceesed and all data fetched then  portal-coachscribe make it visible
  useEffect(() => {
    const coachScribe = document.getElementById("portal-coachscribe");
    if (coachScribe) {
      if (user && userInfo && !loading) {
        coachScribe.setAttribute("style", "display: block;");
      } else {
        coachScribe.setAttribute("style", "display: none;");
      }
    } else {
      console.warn("portal-coachscribe element not found");
    }

  }, [user, userInfo, loading]);

  const fetchTestMappings = async (clientName: string, page_name: string) => {
    try {
      const json = await getTestMappings(clientName, page_name);
      const separatedByTabType: { [key: string]: any[] } = {};
      Object.values(json.category_info).forEach((item: any) => {
        const type = item.tab_type || "undefined";
        if (!separatedByTabType[type]) separatedByTabType[type] = [];
        separatedByTabType[type].push(item);
      });
      return { tab_type_info: separatedByTabType, page_scenarios: json };
    } catch (error) {
      console.error(`Failed to load test mappings for ${page_name}:`, error);
      return null;
    }
  };

  const fetchUserData = async (user: User) => {
    if (!user || !user.user_data?.uid) return;

    setLoading(true);
    try {
      // 1️⃣ Requested Tests
      try {
        const requestedTestData = await getRequestedTests(user.user_data.uid);
        setRequestedTestsData(requestedTestData);
      } catch (err) {
        console.error("Error fetching requested tests:", err);
        setRequestedTestsData(null);
      }

      // 2️⃣ Attempted Tests
      try {
        const attempted = await getAttemptedTestsList(user.user_data.uid);
        setAttemptedTests(attempted);
      } catch (err) {
        console.error("Error fetching attempted tests:", err);
        setAttemptedTests([]);
      }

      // 3️⃣ User Info
      let userInfoData: UserInfoType = emptyData;
      try {
        userInfoData = await getClientUserInfo(user.email, { id: "", picture: "", 'family_name': '', ...user });
        setUserInfo(userInfoData);
      } catch (err) {
        console.error("Error fetching user info:", err);
        setUserInfo(emptyData);
      }

      // 4️⃣ Fetch Libraries in parallel
      try {
        const [leadership, domain] = await Promise.all([
          fetchTestMappings(userInfoData.clientName, "leadership_library"),
          fetchTestMappings(userInfoData.clientName, "domain_skills_library"),
        ]);
        setLeadershipLibrary(leadership);
        setDomainSkillLibrary(domain);
      } catch (err) {
        console.error("Error fetching libraries:", err);
        setLeadershipLibrary(null);
        setDomainSkillLibrary(null);
      }

      try {
        const userTestMapping = await getUserTestMappings(user.user_data.uid);
        setUserTestMapping(userTestMapping);
      } catch (error) {
        console.error("Error fetching user test mapping:", error);
        setUserTestMapping(null);
      }

    } finally {
      setLoading(false);
    }
  };

  const refreshUserData = async (user: User) => {
    console.log("Refreshing user data for:", user);
    setLoading(true);

    if (user) await fetchUserData(user);
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("/api/session", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then(async (data) => {
        setUser(data.user);
        (window as any).user = data.user;
        await fetchUserData(data.user);
      })
      .finally(() => setLoading(false));

  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      userInfo,
      loading,
      requestedTestsData,
      attemptedTests,
      domainSkillLibrary,
      leadershipLibrary,
      refreshUserData,
      userTestMapping
    }),
    [user, loading, requestedTestsData, attemptedTests, domainSkillLibrary, leadershipLibrary, userInfo, userTestMapping]
  );

  // 🚨 Show loader for /portal/ routes
  if (pathname.startsWith("/portal/") && loading) {
    return (
      <MultiStepLoader
        loadingStates={[
          { text: "Personalizing coaching with Avatars" },
          { text: "Updating simulations" },

        ]}
        loading={loading}
        duration={1500}
      />
    );
  }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
