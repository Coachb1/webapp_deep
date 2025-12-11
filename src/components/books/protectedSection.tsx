"use client";

import { usePathname, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaLock } from "react-icons/fa";

interface ProtectedSectionProps {
  isProtected: boolean;
  correctPassword: string | undefined;
  expiryHours?: number;
  clientLoading: boolean;
  onUnlock: () => void;
}

const ProtectedSection: React.FC<ProtectedSectionProps> = ({
  isProtected,
  correctPassword,
  expiryHours = 24,
  clientLoading,
  onUnlock,
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const fullUrl = searchParams.toString()
    ? `${pathname}?${searchParams.toString()}`
    : pathname;
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const AuthToken = `reportAuth_${fullUrl}`;

  console.log("ProtectedSection rendered with isProtected:", isProtected);

  useEffect(() => {
    const stored = localStorage.getItem(AuthToken);
    if (stored) {
      const { expiresAt } = JSON.parse(stored);
      if (new Date().getTime() < expiresAt) {
        onUnlock();
      } else {
        console.log("Session expired, please re-enter password.");
        localStorage.removeItem("reportAuth");
      }
    }
  }, [clientLoading, isProtected]);

  const handleLogin = () => {
    if (password === correctPassword) {
      const expiresAt = Date.now() + expiryHours * 60 * 60 * 1000; // 24 hours
      localStorage.setItem(AuthToken, JSON.stringify({ expiresAt }));
      onUnlock();
      setError("");
    } else {
      setError("Incorrect password. Try again.");
    }
  };

  // 1️⃣ Loading client data
  if (clientLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="w-3 h-3 bg-[#00c193] rounded-full animate-bounce"></span>
            <span className="w-3 h-3 bg-[#00c193] rounded-full animate-bounce delay-150"></span>
            <span className="w-3 h-3 bg-[#00c193] rounded-full animate-bounce delay-300"></span>
          </div>
        </div>
      </div>
    );
  }

  // 2️⃣ If not protected → automatically unlock
  if (!isProtected) onUnlock();

  // 3️⃣ Show password screen
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <FaLock className="mx-auto text-5xl text-gray-700 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Protected Report</h2>
        <p className="text-gray-600 mb-4">Enter the access password:</p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-[#00c193]"
          placeholder="Enter password"
        />

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-[#00c193] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#00a87f] transition"
        >
          Unlock
        </button>
      </div>
    </div>
  );
};

export default ProtectedSection;
