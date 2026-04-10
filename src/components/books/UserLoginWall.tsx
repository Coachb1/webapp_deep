"use client";

import { useEffect, useState } from "react";
import { usePortalUser } from "./context/UserContext";
import { baseURL } from "@/lib/utils";

interface UserInfoGateProps {
  children: React.ReactNode;
  allowedDomains?: string;
  clientId?: string;
  onlyClientSetup?: boolean;
}

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const SUBDOMAIN_PREFIX = "deepchat-domain"; // change if needed

const UserInfoWall = ({ children, allowedDomains, clientId, onlyClientSetup }: UserInfoGateProps) => {
  const { setUser, user, refreshUserData } = usePortalUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [enteredKey, setEnteredKey] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [resetConfirmPassword, setResetConfirmPassword] = useState("");

  const [showSetup, setShowSetup] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tempAuthData, setTempAuthData] = useState<any>(null);
  const [tempUserData, setTempUserData] = useState<any>(null);
  const [showSecurityPopup, setShowSecurityPopup] = useState(false);
  const [securityKey, setSecurityKey] = useState("");

  /** ---------------------------
   *  SESSION CHECK
   * ----------------------------*/
  useEffect(() => {
    const checkSession = async () => {
      try {
        const fullPath = window.location.href;
        const accessToken = localStorage.getItem(`${fullPath}-email_password`);
    

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

  const finalizeLogin = async (data: any, userData: any) => {

    
    // Save tokens

    localStorage.setItem(window.location.href + '-' + 'email_password', data.access)
    localStorage.setItem("refresh_token", data.refresh);

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
  };

  const handleSetupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError("");
    
    if (!newName.trim()) {
        setApiError("Name is required.");
        return;
    }
    if (newPassword.length < 6) {
        setApiError("Password must be at least 6 characters.");
        return;
    }
    if (newPassword !== confirmPassword) {
        setApiError("Passwords do not match.");
        return;
    }

    setLoading(true);

    try {
        const res = await fetch(`${baseURL}/webauth/reset-password/`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${tempAuthData.access}` 
            },
            body: JSON.stringify({
                name: newName,
                password: newPassword
            }),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.detail || "Update failed");
        }

        // ✅ SHOW POPUP
        setShowSecurityPopup(true);

        // ✅ HIDE SETUP
        setShowSetup(false);

        // stop loading
        setLoading(false);

        // ❌ remove return if you want auto login later
        return;

        // 👉 Later we will enable this again
        // await finalizeLogin(tempAuthData, tempUserData);

    } catch (err: any) {
        console.error("Setup failed", err);
        setApiError(err.message || "Failed to update profile");
        setLoading(false);
    }
};

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
            identity_type: "deepchat_unique_id",
            value: email,
          },
          password,
          client_id: clientId
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Login failed");
      }

      const data = await res.json();

      console.log('udata    ', data)

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

      if (
        clientId &&
        (!userData?.client?.uid ||
        String(userData.client.uid) !== String(clientId))
      ) {
        throw new Error("You are not allowed! Please contact your admin.");
      }


      setTempUserData(userData);

      if (data.auth_type === 'client_login') {
        setTempAuthData(data);
        setShowSetup(true);

        // ✅ ADD THIS HERE
        if (data.secret_code) {
          setSecurityKey(data.secret_code);
        }

        setLoading(false);
        return;
      } 

      await finalizeLogin(data, userData);

    } catch (err: any) {
      console.error("failed to log", err.message)
      if (err.message.includes("not allowed")) {
        setPasswordError(err.message);
      } else {
        setApiError("Unable to login please try again later or contact your admin.");
      }
      setLoading(false);
    } finally {
      // Loading state is handled in try/catch blocks or state transitions
    }
  };
  const handleSecurityClose = async () => {
  setShowSecurityPopup(false);

  // ✅ now login automatically
  await finalizeLogin(tempAuthData, tempUserData);
};

  return (
    <div className="relative">
      {/* Main content blurred until user exists */}
      <div className={user ? "" : "blur-sm pointer-events-none select-none"}>
        {children}
      </div>

      {/* Login Modal */}
      {!user && !showForgot && !showSecurityPopup &&( 
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

                {showSetup ? (
                  <>
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
                      Complete Setup
                    </h2>
                    {apiError && (
                      <p className="text-red-600 text-sm mb-2 text-center">
                        {apiError}
                      </p>
                    )}
                    <form onSubmit={handleSetupSubmit} className="space-y-4">
                      <input
                        type="text"
                        placeholder="Name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        disabled={loading}
                        required
                      />
                      <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        disabled={loading}
                        required
                      />
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-md"
                        disabled={loading}
                        required
                      />
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                      >
                        {loading ? "Updating..." : "Update & Login"}
                      </button>
                    </form>
                  </>
                ) : (
                <>
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
                  <p
                    className="text-sm text-blue-500 mt-2 cursor-pointer text-center"
                    onClick={() => setShowForgot(true)}
                  >
                    Forgot Password?
                  </p>
                </form>
                </>
                )}
              </>
            )}
          </div>
        </div>
      )}
      {showForgot && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-xl w-[320px] text-center">

            <h3 className="mb-3 font-semibold">Reset Password</h3>

            {/* Security Key */}
            <input
              type="text"
              placeholder="Enter Security Key"
              value={enteredKey}
              onChange={(e) => setEnteredKey(e.target.value)}
              className="border px-3 py-2 w-full mb-3 rounded"
            />
            {/* Email */}
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border px-3 py-2 w-full mb-3 rounded"
            />

            {/* New Password */}
            <input
              type="password"
              placeholder="New Password"
              value={resetPassword}
              onChange={(e) => setResetPassword(e.target.value)}
              className="border px-3 py-2 w-full mb-3 rounded"
            />

            {/* Confirm Password */}
            <input
              type="password"
              placeholder="Confirm Password"
              value={resetConfirmPassword}
              onChange={(e) => setResetConfirmPassword(e.target.value)}
              className="border px-3 py-2 w-full mb-3 rounded"
            />

            {/* RESET BUTTON */}
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
              onClick={async () => {
                try {
                  if (!enteredKey) {
                    alert("Enter security key");
                    return;
                  }

                  if (!email || !isValidEmail(email)) {
                    alert("Enter email");
                    return;
                  }

                  if (resetPassword.length < 6) {
                    alert("Password must be at least 6 characters");
                    return;
                  }

                  if (resetPassword !== resetConfirmPassword) {
                    alert("Passwords do not match");
                    return;
                  }

                  const res = await fetch(`${baseURL}/webauth/reset-password-secret/`, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      subdomain_prefix: SUBDOMAIN_PREFIX,
                      identity_context: {
                        identity_type: "deepchat_unique_id",
                        value: email,
                      },
                      new_password: resetPassword,
                      secret_code: enteredKey,
                    }),
                  });

                  if (!res.ok) {
                    throw new Error("Invalid or expired key");
                  }

                  alert("Password reset successful ✅");

                  // reset fields
                  setEnteredKey("");
                  setResetPassword("");
                  setResetConfirmPassword("");

                  // back to login
                  setShowForgot(false);

                } catch (err) {
                  alert("Invalid or expired key ❌");
                }
              }}
            >
              Reset
            </button>

            {/* CANCEL */}
            <button
              className="block w-full mt-2 text-sm text-gray-500"
              onClick={() => setShowForgot(false)}
            >
              Cancel
            </button>

          </div>
        </div>
      )}
      {showSecurityPopup && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center w-[340px]">

            <h3 className="text-lg font-semibold mb-3">Security Key</h3>

            <p className="text-blue-600 font-mono text-lg mb-3">
              {securityKey}
            </p>

            {/* ✅ NOTICE */}
            <p className="text-sm text-red-500 mb-4">
              ⚠️ Please save this code carefully. It will be required for password recovery.
            </p>

            {/* ✅ DOWNLOAD BUTTON */}
            <button
              className="bg-green-600 text-white px-4 py-2 rounded mb-2 w-full"
              onClick={() => {
                const blob = new Blob(
                  [`Your Security Key:\n\n${securityKey}`],
                  { type: "text/plain" }
                );

                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "security-key.txt";
                link.click();
              }}
            >
              Download Key
            </button>

            {/* CLOSE BUTTON */}
            <button
              className="block w-full mt-2 text-sm text-gray-500"
              onClick={handleSecurityClose}
            >
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfoWall;
