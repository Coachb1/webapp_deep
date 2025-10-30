"use client";

import { baseURL, basicAuth } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import {
  FaChartLine,
  FaSyncAlt,
  FaTable,
  FaArrowUp,
  FaUser,
  FaEnvelope,
  FaBook,
  FaCalendar,
  FaClock,
  FaTrophy,
  FaTimes,
  FaLock,
} from "react-icons/fa";

import * as XLSX from 'xlsx';
import { usePortalUser } from "../books/context/UserContext";


interface UserReport {
  sessions: any;
  participant_email: any;
  participant_name: any;
  test_attempt_session_list: any;
  completedSessions: any;
  name: string;
  email: string;
  books: string[];
  dates: string[];
}

const PASSWORD = "demobook#12345";
const EXPIRY_HOURS = 24;
const truncateText = (text: string, length: number = 25) => {
  if (!text) return "";
  return text.length > length ? text.substring(0, length) + "..." : text;
};
export const getClientActivityReport = async (backend: string, clientName: string) => {
  try {
    if (!backend || !clientName) {
      console.error("[getClientActivityReport] Missing required parameters:", { backend, clientName });
      return [];
    }

    const response = await fetch(
      `${backend}/accounts/client-participant-report-data/?client_name=${clientName}`,
      {
        method: "GET",
        headers: {
          Authorization: basicAuth,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.error("[getClientActivityReport] Failed:", response.statusText);
      return [];
    }

    const data = await response.json();
    const users = Array.isArray(data?.data) ? data.data : [];

    // ✅ Adapt backend fields to match UI model
    const formatted = users.map((user: any) => {
      const sessions = user.participant_info?.test_attempt_session_list || [];
      return {
        name: user.participant_name ?? "N/A",
        email: user.participant_email ?? "N/A",
        dates: sessions.map((s: any) => s.date),
        completedSessions: sessions.length,
        test_attempt_session_list: sessions,
      };
    });

    console.log("[getClientActivityReport] Mapped Data:", formatted);
    return formatted;
  } catch (error) {
    console.error("[getClientActivityReport] Error:", error);
    return [];
  }
};

interface LeaderBoardReport {
  clientName: string;
}

const LeaderBoardReport: React.FC = () => {
  const { userInfo } = usePortalUser();
  console.log(userInfo, 'clientreport')
  const clientName = userInfo?.clientName; // ✅ get it from context
  console.log("clientName:", clientName);
  const [data, setData] = useState<UserReport[]>([]);
  const [date, setDate] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserReport | null>(null);
  const [loading, setLoading] = useState(true);

  // Password state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
      setDate(
        new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    }
  }, [isAuthenticated]);

  const checkAuth = () => {
    if (!userInfo.leaderboard_report_protected) {
      setIsAuthenticated(true);
      return;
    }
    const stored = localStorage.getItem("reportAuth");
    if (stored) {
      const { expiresAt } = JSON.parse(stored);
      if (new Date().getTime() < expiresAt) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem("reportAuth");
      }
    }
  };

  const handleLogin = () => {

    if (password === userInfo.leaderboard_report_password) {
      const expiresAt =
        new Date().getTime() + EXPIRY_HOURS * 60 * 60 * 1000; // 24 hrs
      localStorage.setItem(
        "reportAuth",
        JSON.stringify({ expiresAt: expiresAt })
      );
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Try again.");
    }
  };
  const loadData = async () => {
    setLoading(true);
    if (!clientName) {
      console.error("[loadData] Missing clientName:", userInfo);
      setLoading(false);
      return;
    }

    const response = await getClientActivityReport(baseURL, clientName);
    setData(response);
    setLoading(false);
  };

  const refreshData = () => loadData();

  const groupedData = Array.isArray(data)
    ? [...data].sort((a, b) => (b.completedSessions || 0) - (a.completedSessions || 0))
    : [];

  // ADD THIS FUNCTION HERE
  const downloadReport = (format: 'csv' | 'xlsx') => {
  // ✅ Flatten user sessions into individual rows
  const exportData = groupedData.flatMap((user, idx) => {
    const sessions = user.test_attempt_session_list || [];

    if (sessions.length === 0) {
      // No sessions — still one row for this user
      return [
        {
          Rank: idx + 1,
          Name: user.name,
          Email: user.email,
          "Session Title": "No Sessions Completed",
          "Session Date": "No Date Available",
          "Session Report Link": "No Link Available",
        },
      ];
    }

    // Create one row per session
    return sessions.map((s: any, sessionIdx: number) => ({
      Rank: idx + 1,
      Name: user.name,
      Email: user.email,
      "Total Sessions Completed": sessions.length,
      "Session Title": s.title || `Session ${sessionIdx + 1}`,
      "Session Date": s.date || "No Date Available",
      "Session Report Link": s.report_link || s.link || "No Link Available",
    }));
  });

  // ✅ Generate Excel or CSV
  const ws = XLSX.utils.json_to_sheet(exportData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Session Report");

  // Auto column width
  const colWidths = Object.keys(exportData[0] || {}).map((key) => ({
    wch: Math.max(25, key.length + 2),
  }));
  ws["!cols"] = colWidths;

  const timestamp = new Date().toISOString().split("T")[0];
  const filename = `session_report_${timestamp}.${format}`;
  XLSX.writeFile(wb, filename, { bookType: format === "csv" ? "csv" : "xlsx" });
};




  // Pagination logic
  const totalPages = Math.ceil(groupedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = groupedData.slice(startIndex, startIndex + rowsPerPage);

  // If not authenticated, show password modal
  if (!isAuthenticated) {
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
  }

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen bg-white font-inter">
      {/* Header */}
      <div className="bg-[#00c193] rounded-2xl p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold flex items-center gap-2">
              <FaChartLine /> Simulation Report
            </h1>
            <p className="opacity-90 text-lg">
              Learning leaders Dashboard
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => downloadReport('csv')}
              className="bg-white/20 border border-white/30 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/30 backdrop-blur-md transition text-white"
            >
              <FaTable /> CSV
            </button>
            <button
              onClick={() => downloadReport('xlsx')}
              className="bg-white/20 border border-white/30 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/30 backdrop-blur-md transition text-white"
            >
              <FaTable /> Excel
            </button>
            <button
              onClick={refreshData}
              className="bg-white/20 border border-white/30 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/30 backdrop-blur-md transition text-white"
            >
              <FaSyncAlt /> Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-gray-50 to-white flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
            <FaTable />Activity Report
          </h2>
          <span className="text-[#00c193] font-semibold flex items-center gap-1 text-sm">
            <FaArrowUp /> Ranked by Report/Lesson count
          </span>
        </div>

        {/* Loader */}
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading report...</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-bold border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left">
                      <FaTrophy className="inline mr-2" /> Rank
                    </th>
                    <th className="px-6 py-3 text-left">
                      <FaUser className="inline mr-2" /> Name
                    </th>
                    <th className="px-6 py-3 text-left">
                      <FaEnvelope className="inline mr-2" /> Email
                    </th>
                    <th className="px-6 py-3 text-left">
                      <FaBook className="inline mr-2" /> Completed Sessions/Report
                    </th>
                    <th className="px-6 py-3 text-left">
                      <FaCalendar className="inline mr-2" /> Last Activity Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((row, idx) => {
                    const lastBook =
                      (Array.isArray(row.books) && row.books.length > 0
                        ? row.books[row.books.length - 1]
                        : "No Case Completed");
                    const lastDate =
                      (Array.isArray(row.dates) && row.dates.length > 0
                        ? row.dates[row.dates.length - 1]
                        : "No Date Available");


                    return (
                      <tr
                        key={idx}
                        className="border-b border-gray-200 hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4 font-bold text-gray-900">
                          #{startIndex + idx + 1}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          {row.name}
                        </td>
                        <td className="px-6 py-4 text-gray-600">{row.email}</td>
                        <td className="px-6 py-4 text-gray-800">
                          {row.test_attempt_session_list?.length > 0 ? (
                            <>
                              <div className="font-semibold flex items-center gap-2">
                                {truncateText(
                                  row.test_attempt_session_list[row.test_attempt_session_list.length - 1].title,
                                  30
                                )}

                                {/* Show “View Report” if only one session */}
                                {row.test_attempt_session_list.length === 1 ? (
                                  <a
                                    href={row.test_attempt_session_list[0].link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#00c193] text-xs underline"
                                  >
                                    View Report
                                  </a>
                                ) : (
                                  // Show “View all” if more than one session
                                  <button
                                    onClick={() => setSelectedUser(row)}
                                    className="text-[#00c193] text-xs underline"
                                  >
                                    View all ({row.test_attempt_session_list.length})
                                  </button>
                                )}
                              </div>
                            </>
                          ) : (
                            <div>No Sessions</div>
                          )}

                        </td>

                        <td className="px-6 py-4 text-gray-600">{lastDate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-2 p-6">
              {/* Prev Button */}
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-full font-bold ${currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#00c193] text-white hover:brightness-95"
                  }`}
              >
                Prev
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-9 h-9 flex items-center justify-center rounded-full font-semibold transition 
        ${currentPage === i + 1
                      ? "bg-[#00c193] text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                  {i + 1}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-full font-medium transition 
      ${currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-[#00c193] text-white hover:bg-[#00a87f]"
                  }`}
              >
                Next
              </button>
            </div>
          </>
        )}

        {/* Footer */}
        <div className="bg-gray-50 p-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <FaCalendar /> Generated: <strong>{date}</strong>
          </div>
          <div className="flex items-center gap-2">
            <FaClock /> Last Updated:{" "}
            <strong>{loading ? "loading..." : "just now"}</strong>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {selectedUser && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <FaTimes />
            </button>
            <h3 className="text-xl font-bold mb-4">
              {selectedUser.name}'s Completed Sessions
            </h3>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {selectedUser && (
                <div
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 ease-out opacity-100 animate-fadeIn"
                  onClick={() => setSelectedUser(null)}
                >
                  <div
                    className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-8 relative transform transition-all duration-300 scale-100 animate-scaleIn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Close button */}
                    <button
                      onClick={() => setSelectedUser(null)}
                      className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl transition"
                    >
                      <FaTimes />
                    </button>

                    {/* Title */}
                    <h3 className="text-2xl font-extrabold mb-6 text-gray-900">
                      {selectedUser.name}'s Completed Sessions
                    </h3>

                    {/* Session list */}
                    <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2">
                      {selectedUser.test_attempt_session_list.map((session: any, idx: number) => (
                        <div
                          key={idx}
                          className="p-5 border border-gray-200 rounded-2xl flex justify-between items-start transition-all duration-200"
                        >
                          <div className="flex-1 pr-4">
                            <p className="font-semibold text-gray-900 text-base mb-1 line-clamp-2">
                              {session.title}
                            </p>
                            <p className="text-gray-500 text-sm">{session.date}</p>
                          </div>

                          <a
                            href={session.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#00c193] text-white text-sm font-bold px-5 py-3 rounded-xl shadow-md hover:shadow-lg hover:bg-[#00a87f] transition-all duration-200"
                          >
                            View Report
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}


            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderBoardReport;
