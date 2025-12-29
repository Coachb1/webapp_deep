"use client";

import { UserInfoType } from "@/lib/types";
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
import ProtectedSection from "../books/protectedSection";
import { getClientbyClientId } from "@/lib/api";


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

interface SimReportProps {
  client_id: string;
}

const SimReport: React.FC<SimReportProps> = ({ client_id }) => {
  const [clientName, setClientName] = useState<string | null>(null);
  const [client, setClientData] = useState<UserInfoType|null>(null);
  const [clientLoading, setClientLoading] = useState(true);

  const [isProtected, setIsProtected] = useState(false);
  const [correctPassword, setCorrectPassword] = useState("");
  
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
  const rowsPerPage = 20;


  useEffect(() => {
    const fetchClientData = async () => {
      try {
        setClientLoading(true);
        const clientdata = await getClientbyClientId(client_id);
        console.log("Fetched client data:", clientdata, clientdata.libraryBotConfig.login_view);
        setClientName(clientdata.clientName);
        if (clientdata.portalPageConfig && Object.keys(clientdata.portalPageConfig).length > 0) {
          console.log("Using portalPageConfig for protection settings");
          setIsProtected(clientdata?.portalPageConfig?.simulation_report_protected);
          setCorrectPassword(clientdata?.portalPageConfig?.simulation_report_password || "");
        } else {
          console.log("Using simulation_report settings for protection");
          setIsProtected(clientdata.universalPageConfig?.protected);
          setCorrectPassword(clientdata.universalPageConfig?.password || ""); 
        }
        setClientData(clientdata);
      } catch (error) {
        console.error("Error fetching client data:", error);
      } finally {
        setClientLoading(false);
      }
    };
  
    fetchClientData();
  }, []);


  useEffect(() => {
    if (!isAuthenticated || !client?.clientName) return;
    loadData();
    setDate(
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, [isAuthenticated, client]);

  


  const loadData = async () => {
    setLoading(true);
    if (!clientName) {
      console.error("[loadData] Missing client_id:", clientName);
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
            "Session Score": "No Score Available",
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
        "Session Score": s.avg_score !== undefined ? Number(s.avg_score).toFixed(1) : "No Score Available",
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






  // 2) flatten all sessions into rows, preserving rank order
  const allRows = groupedData.flatMap((user: any, userIdx: number) => {
    const rank = userIdx + 1;
    const sessions = user.test_attempt_session_list || [];

    if (sessions.length === 0) {
      return [
        {
          rank,
          name: user.name,
          email: user.email,
          title: "No Sessions Completed",
          date: "—",
          avg_score: "—",
          link: null,
        },
      ];
    }

    return sessions.map((session: any, sIdx: number) => ({
      rank,
      name: user.name,
      email: user.email,
      title: session.title || `Session ${sIdx + 1}`,
      date: session.date || "No Date",
      avg_score: session.avg_score !== undefined ? Number(session.avg_score).toFixed(1) : "—",
      link: session.link || session.report_link || null,
    }));
  });

  const totalPages = Math.max(1, Math.ceil(allRows.length / rowsPerPage));
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = allRows.slice(startIndex, startIndex + rowsPerPage);


  console.log({isAuthenticated})
  if (!isAuthenticated) {
    return (
      <ProtectedSection
        isProtected={isProtected}
        correctPassword={correctPassword}
        clientLoading={clientLoading}
        onUnlock={() => setIsAuthenticated(true)}
      />
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
                    <th className="px-6 py-3 text-left whitespace-nowrap">
                      <FaTrophy className="inline mr-2" /> Rank
                    </th>
                    <th className="px-6 py-3 text-left whitespace-nowrap">
                      <FaUser className="inline mr-2" /> Name
                    </th>
                    <th className="px-6 py-3 text-left whitespace-nowrap">
                      <FaEnvelope className="inline mr-2" /> Email
                    </th>
                    <th className="px-6 py-3 text-left whitespace-nowrap">
                      <FaBook className="inline mr-2" /> Completed Sessions
                    </th>
                    <th className="px-6 py-3 text-left whitespace-nowrap">
                      <FaCalendar className="inline mr-2" /> Last Activity
                    </th>
                    <th className="px-6 py-3 text-left whitespace-nowrap">Score</th>
                    <th className="px-6 py-3 text-left whitespace-nowrap">Link</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-bold text-gray-900">#{row.rank}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">{row.name}</td>
                      <td className="px-6 py-4 text-gray-600">{row.email}</td>
                      <td className="px-6 py-4 text-gray-800" title={row.title}>{truncateText(row.title, 20)}</td>
                      <td className="px-6 py-4 text-gray-600">{row.date}</td>
                      <td className="px-6 py-4 text-gray-800">{row.avg_score}</td>
                      <td className="px-6 py-4">
                        {row.link ? (
                          <a
                            href={row.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#00c193] hover:bg-[#00a87f] text-white text-xs font-semibold px-3 py-1.5 rounded-md whitespace-nowrap transition-colors duration-200"
                          >
                            View Report
                          </a>
                        ) : (
                          "No Link"
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

            {/* Pagination Controls */}
<div className="flex justify-center items-center gap-2 p-6">
  {/* Prev Button */}
  <button
    onClick={() => setCurrentPage(currentPage - 1)}
    disabled={currentPage === 1}
    className={`px-4 py-2 rounded-full font-bold ${
      currentPage === 1
        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
        : "bg-[#00c193] text-white hover:brightness-95"
    }`}
  >
    Prev
  </button>

  {/* Page Numbers with ellipses */}
  {(() => {
    const totalButtons = [];
    const maxVisible = 5; // show max 5 numbered buttons + ellipses

    for (let i = 1; i <= totalPages; i++) {
      const isFirst = i === 1;
      const isLast = i === totalPages;
      const isNear =
        i >= currentPage - 1 && i <= currentPage + 1; // show around current

      if (isFirst || isLast || isNear) {
        totalButtons.push(
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`w-9 h-9 flex items-center justify-center rounded-full font-semibold transition ${
              currentPage === i
                ? "bg-[#00c193] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {i}
          </button>
        );
      } else if (
        (i === 2 && currentPage > 3) ||
        (i === totalPages - 1 && currentPage < totalPages - 2)
      ) {
        totalButtons.push(
          <span key={`dots-${i}`} className="px-2 text-gray-400 select-none">
            ...
          </span>
        );
      }
    }

    return totalButtons;
  })()}

  {/* Next Button */}
  <button
    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
    disabled={currentPage === totalPages}
    className={`px-4 py-2 rounded-full font-medium transition ${
      currentPage === totalPages
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

export default SimReport;
