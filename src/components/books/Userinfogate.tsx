"use client";

import { getUserAccount } from "@/lib/utils";
import { useEffect, useState } from "react";

interface User {
  given_name: string;
  email: string;
}

// Extend the Window interface to include 'user'
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
  }, []);

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const newUser = { given_name: tempName, email: tempEmail };

  getUserAccount(newUser)
    .then((response) => response.json())
    .then((data) => {
      console.log("User account created/fetched:", data);

      const fullUser = {
        ...newUser,
        user_data: data, // include API response
      };

      // store globally
      (window as any).user = fullUser;

      // persist in localStorage
      localStorage.setItem("user", JSON.stringify(fullUser));

      // update React state
      setUser(fullUser);
    })
    .catch((error) => {
      console.error("❌ Error creating user:", error);
    });
};


  return (
    <div className="relative">
      {/* Main content */}
      <div className={user ? "" : "blur-sm pointer-events-none select-none"}>
        {children}
      </div>

      {/* Popup overlay when user not set */}
      {!user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Enter Your Details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-400"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={tempEmail}
                onChange={(e) => setTempEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-green-400"
                required
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfoGate;
