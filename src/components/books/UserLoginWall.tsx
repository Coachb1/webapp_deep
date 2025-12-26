"use client";

import { useEffect, useState } from "react";
import { usePortalUser } from "./context/UserContext";
import { baseURL } from "@/lib/utils";

interface UserInfoGateProps {
  children: React.ReactNode;
  allowedDomains: string;
}

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const SUBDOMAIN_PREFIX = "deepchat-domain"; // change if needed

const UserInfoWall = ({ children, allowedDomains }: UserInfoGateProps) => {
  const { setUser, user, refreshUserData } = usePortalUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  /** ---------------------------
   *  SESSION CHECK
   * ----------------------------*/
  useEffect(() => {
    const checkSession = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");

        if (!accessToken) {
          setChecking(false);
          return;
        }

        const res = await fetch(`${baseURL}/accounts/me/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (res.ok) {
          const data = await res.json();
          const newUser = { given_name: data.name, email: data.email };

          (window as any).user = newUser;

          const fullUser = {
              ...newUser,
              user_data: data,
            };
          console.log("Setting user:", fullUser);
          setUser(fullUser);
        } else if (res.status === 403) {
          // Token expired or invalid
          console.log("Access token expired or invalid");
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          setUser(null);
          (window as any).user = null;
        }
      } catch (e) {
        console.error("Session check failed:", e);
      } finally {
        setChecking(false);
      }
    };

    checkSession();
  }, [setUser]);


  /** ---------------------------
   *  LOGIN HANDLER (DRF)
   * ----------------------------*/
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    setEmailError("");
    setPasswordError("");    

    let valid = true;

    if (!email || !isValidEmail(email)) {
      valid = false;
      setEmailError("Enter a valid email.");
    }

    if (!password || password.length < 6) {
      valid = false;
      setPasswordError("Password must be at least 6 characters.");
    }

    if (!valid) return;

    setLoading(true);

    try {
      const res = await fetch(`${baseURL}/webauth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subdomain_prefix: SUBDOMAIN_PREFIX,
          identity_context: {
            identity_type: "email",
            value: email,
          },
          password,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Login failed");
      }

      const data = await res.json();

      console.log('udata    ', data)

      // Save tokens
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);

      // Fetch user details
      const userRes = await fetch(`${baseURL}/accounts/me/`, {
        headers: { Authorization: `Bearer ${data.access}` },
      });

      if (!userRes.ok) {
        if (userRes.status === 403) {
          throw new Error("Token invalid or expired");
        }
        throw new Error("Failed to load user");
      }

      const userData = await userRes.json();
      console.log("✅ User data:", userData);
      

      // Set user in context
      const newUser = { given_name: userData.name, email: userData.email };

      (window as any).user = newUser;

      const fullUser = {
          ...newUser,
          user_data: userData,
        };
      console.log("Setting user:", fullUser);
      setUser(fullUser);

      await refreshUserData(fullUser);
    } catch (err: any) {
      setApiError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Main content blurred until user exists */}
      <div className={user ? "" : "blur-sm pointer-events-none select-none"}>
        {children}
      </div>

      {/* Login Modal */}
      {!user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative">

            {checking ? (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-3 text-gray-600 text-sm">Verifying your access…</p>
              </div>
            ) : (
              <>
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-2xl z-50">
                    <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}

                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
                  Login
                </h2>

                {apiError && (
                  <p className="text-red-600 text-sm mb-2 text-center">
                    {apiError}
                  </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Email */}
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                    disabled={loading}
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm -mt-2">{emailError}</p>
                  )}

                  {/* Password */}
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-2 border rounded-md"
                      disabled={loading}
                    />
                    <span
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-3 text-gray-500 cursor-pointer"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </span>
                  </div>

                  {passwordError && (
                    <p className="text-red-500 text-sm -mt-2">
                      {passwordError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfoWall;
