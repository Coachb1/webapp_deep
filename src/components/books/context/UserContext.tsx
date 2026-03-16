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
import { baseURL, emptyData, getTestMappings, getUserTestMappings } from "@/lib/utils";
import {
  getClientUserInfo,
  getRequestedTests,
  getAttemptedTestsList,
} from "@/lib/api";
import { UserInfoType } from "@/lib/types";

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

export const UserProvider = ({ children, LoginView }: { children: ReactNode, LoginView?:string }) => {
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

      // 3️⃣ User Info
      let userInfoData: UserInfoType = emptyData;
      try {
        userInfoData = await getClientUserInfo(user.email, {
          id: "",
          picture: "",
          family_name: "",
          ...user,
        });
        setUserInfo(userInfoData);
      } catch (err) {
        console.error("Error fetching user info:", err);
        setUserInfo(emptyData);
      }
      console.log("userINfo", userInfoData);

      if (pathname.startsWith("/portal/")) {

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

      

      // 4️⃣ Fetch Libraries in parallel for portal
        try {
          console.log("User client", userInfoData.clientName);
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
    let token: string | null = null;
    const fullPath = window.location.href;
    token = localStorage.getItem(`${fullPath}-${LoginView || "jwt_token"}`);
    if (LoginView && LoginView === 'email_password') {
      console.debug("Library Bot detected, using access token");
      if (!token) {
        setLoading(false);
        return;
      }

    fetch(`${baseURL}/accounts/me/`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (res.status === 403) {
          console.log("Access token expired");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          setUser(null);
          (window as any).user = null;
          setLoading(false);
          return null;
        }
        return res.json();
      })
      .then(async (data) => {
        if (!data) return; // Token was expired
        console.debug("User data from session:", data);
        
        const newUser = { given_name: data.name, email: data.email };

        (window as any).user = newUser;

        const fullUser = {
          ...newUser,
          user_data: data,
        };
      console.log("Setting user:", fullUser);
      setUser(fullUser);

      await fetchUserData(fullUser);

      })
      .finally(() => setLoading(false));
      
    } else {
      console.debug("Regular user session detected, using JWT token");
      if (!token) {
        setLoading(false);
        return;
      }
      console.log(pathname)
      fetch("/api/session", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then(async (data) => {
        setUser(data.user);
        (window as any).user = data.user;
        await fetchUserData(data.user);
      })
      .finally(() => setLoading(false));
    }
    

    
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
      userTestMapping,
    }),
    [
      user,
      loading,
      requestedTestsData,
      attemptedTests,
      domainSkillLibrary,
      leadershipLibrary,
      userInfo,
      userTestMapping,
    ]
  );

  // 🚨 Show loader for /portal/ routes

  const allowedPagesForLoader = ["/portal/", "/library-bot/leaderBoardReport"];
  const shouldShowLoader = allowedPagesForLoader.some((route) =>
    pathname.startsWith(route)
  );
  if (shouldShowLoader && loading) {
    let loadingStates: any = [];

    if (pathname.startsWith("/library-bot/leaderBoardReport")) {
      loadingStates = [
        { text: "Fetching Leaderboard Report Data" },
        { text: "Processing and Setting Up Leaderboard" },
      ];
    } else if (pathname.startsWith("/portal/")) {
      loadingStates = [
        { text: "Setting up your environment" },
        { text: "Fetching simulations" },
      ];
    }
    return (
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={loading}
        duration={1500}
      />
    );
  }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
