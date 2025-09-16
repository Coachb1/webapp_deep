"use client";

import { getUserAccount } from "@/lib/utils";
import { useEffect, useState } from "react";

interface User {
  given_name: string;
  email: string;
  user_data?: any;
}

// Extend the Window interface
declare global {
  interface Window {
    user?: User;
  }
}

interface UserInfoGateProps {
  children: React.ReactNode;
}

const UserInfoGate = ({ children }: UserInfoGateProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [tempName, setTempName] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [loading, setLoading] = useState(false); // submitting user
  const [checking, setChecking] = useState(true); // initial check

  // Load from window / localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("user");
      if (saved) {
        const parsed = JSON.parse(saved);
        window.user = parsed;
        setUser(parsed);
      } else if (window.user && window.user.email && window.user.given_name) {
        setUser(window.user);
      }
    }
    setChecking(false); // ✅ done checking
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newUser = { given_name: tempName, email: tempEmail };

    getUserAccount(newUser)
      .then((response) => response.json())
      .then((data) => {
        console.log("✅ User account created/fetched:", data);

        const fullUser = {
          ...newUser,
          user_data: data,
        };

      (window as any).user = fullUser;
        localStorage.setItem("user", JSON.stringify(fullUser));
        setUser(fullUser);
      })
      .catch((error) => {
        console.error("❌ Error creating user:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="relative">
      {/* Main content blurred until user is set */}
      <div className={user ? "" : "blur-sm pointer-events-none select-none"}>
        {children}
      </div>

      {/* Popup overlay */}
      {!user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative">
            {/* Loader when checking user */}
            {checking ? (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-3 text-gray-600 text-sm">Checking user...</p>
              </div>
            ) : (
              <>
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/70 rounded-2xl">
                    <div className="w-6 h-6 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}

                <h2 className="text-xl font-semibold mb-4 text-center">
                  Enter Your Details
                </h2>

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
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfoGate;
