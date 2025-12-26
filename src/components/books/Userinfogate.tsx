"use client";

import { useEffect, useState } from "react";
import { getUserAccount } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { usePortalUser } from "./context/UserContext";

interface User {
  given_name: string;
  email: string;
  user_data?: any;
}

interface UserInfoGateProps {
  children: React.ReactNode;
  autoLoginEmail?: string;
}

// Sanitize input
const sanitize = (str: string) =>
  str.replace(/[&<>"'`=\/]/g, (s) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;",
    "=": "&#x3D;",
    "`": "&#x60;",
  }[s] || s));

// Simple email validation
const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const UserInfoGate = ({ children, autoLoginEmail }: UserInfoGateProps) => {
  const { setUser, refreshUserData , user} = usePortalUser();

  const [tempName, setTempName] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [loading, setLoading] = useState(false); // submitting user

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [apiError, setApiError] = useState("");
  const pathname = usePathname();
  const [checking, setChecking] = useState(pathname.includes('portal')? false : true); // initial check
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const fullPath = window.location.href;
        const token = fullPath.includes("clientId") && fullPath.includes("library-bot") ? localStorage.getItem('client_jwt_token') : localStorage.getItem('jwt_token')
        const res = await fetch("/api/session", { method: "GET", headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) {
          const data = await res.json();

          console.log('user data', data)
          if (data) {
            setUser(data.user)
            // if (!data.user?.user_data && !data.user?.user_data?.id) await refreshUserData(data.user);
          };
        } else {
          console.error("Failed to fetch user data", await res.text());
        }
      } catch (err) {
        console.error("Error fetching session:", err);
        setApiError("Failed to fetch session. Please refresh.");
      } finally {
        setChecking(false);
      }
    };
    fetchSession();
  }, [setUser]);

  /** ---------------------------
     *  AUTO-LOGIN EFFECT
     * ----------------------------*/
    useEffect(() => {
      if (autoLoginEmail && !checking && !user && !loading) {
        setTempEmail(autoLoginEmail);
        setTempName(autoLoginEmail.split("@")[0] || "demo user"); // Use provided password or empty string
  
        onSubmit(`client_jwt_token`);
  
      }
    }, [autoLoginEmail, checking, user, loading]);
  
  const onSubmit = async (token_key='jwt_token') => {
    setNameError("");
    setEmailError("");
    setApiError("");


    const sanitizedName = sanitize(tempName.trim() || autoLoginEmail?.split("@")[0] || "demo user");
    const sanitizedEmail = sanitize(tempEmail.trim().toLowerCase() || autoLoginEmail?.toLowerCase() || "");

    let valid = true;
    if (!sanitizedName) {
      setNameError("Name cannot be empty.");
      valid = false;
    }
    if (!sanitizedEmail || !isValidEmail(sanitizedEmail)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }
    if (!valid) return;

    setLoading(true);

    const newUser = { given_name: tempName, email: tempEmail };

    getUserAccount(newUser)
      .then((response) => response.json())
      .then(async(data) => {
        console.log("✅ User account created/fetched:", data);

        const fullUser = {
          ...newUser,
          user_data: data,
        };



      const res = await fetch("/api/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
        credentials: "include",
      });
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to create session");
      }
      const resdata = await res.json();
      localStorage.setItem(token_key, resdata.token)
      setUser(fullUser);
      await refreshUserData(fullUser);

      })
      .catch((error) => {
        console.error("❌ Error creating user:", error);
      })
      .finally(() => {
      setLoading(false);
      });
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  if (autoLoginEmail){
    return (
      <div>
        {children}
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Main content blurred until user is set */}
      <div className={user ? "" : "blur-sm pointer-events-none select-none"}>
        {children}
      </div>

      {/* Popup overlay */}
      {!user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative">
            {/* Loader when checking user */}
            {checking ? (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-3 text-gray-600 text-sm">
                  {autoLoginEmail
                    ? "Updating the latest adoption intelligence. Please wait…"
                    : "Verifying your access…"}
                </p>
              </div>
            ) : (
              <>
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-2xl">
                    <div className="w-6 h-6 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                {autoLoginEmail ? (
                    <div className="flex flex-col items-center justify-center py-10">
                      <p className="mt-5 text-gray-600 text-sm">
                      </p>
                    </div>
                  ) : (
                    <>
        
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
                  Enter Your Details
                </h2>
                {apiError && <p className="text-red-600 text-sm mb-2 text-center">{apiError}</p>}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    disabled={loading}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-400 disabled:bg-gray-100"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={tempEmail}
                    onChange={(e) => setTempEmail(e.target.value)}
                    disabled={loading}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-400 disabled:bg-gray-100"
                    required
                  />
                  {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                  <button
                    type="submit"
                    disabled={!tempName || !tempEmail || loading}
                    className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </form>
                </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfoGate;
