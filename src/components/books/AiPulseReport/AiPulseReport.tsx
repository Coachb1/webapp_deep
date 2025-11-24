"use client";

import { getClientbyClientId } from "@/lib/api";
import { UserInfoType } from "@/lib/types";
import { baseURL } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import {
  FaChartLine,
  FaSyncAlt,
  FaTable,
  FaTimes,
  FaEnvelope,
} from "react-icons/fa";
import * as XLSX from "xlsx";
import ProtectedSection from "../protectedSection";

interface ActivityData {
  case: string;
  industry: string;
  function: string;
  businessOutcome: string;
  discussionRequests: number;
  requestUsers: string[];
}

interface AIPluseReportProps {
  packageCourseId: string;
  clientId: string;
}

const AIPluseReport: React.FC<AIPluseReportProps> = ({ packageCourseId, clientId }) => {
  const [client, setClientData] = useState<UserInfoType|null>(null);
  const [clientLoading, setClientLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProtected, setIsProtected] = useState(false);
  const [correctPassword, setCorrectPassword] = useState("");


  const [data, setData] = useState<ActivityData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

  const [sortColumn, setSortColumn] =
    useState<keyof ActivityData>("discussionRequests");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [selectedCase, setSelectedCase] = useState("");

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const fetchReportData = async () => {
    if (!client?.clientName) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${baseURL}/courses/ai-pulse-report-data/?package_course_id=${packageCourseId}&client_name=${client?.clientName}`
      );
      if (!res.ok) throw new Error("Failed to fetch data");

      const result = await res.json();
      setData(result.data || []);
    } catch (err) {
      console.error("Error fetching report data:", err);
      setError("Failed to load report data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const fetchClientData = async () => {
    try {
      setClientLoading(true);
      const client = await getClientbyClientId(clientId);
      console.log("Fetched client data:", client);
      if (client.libraryBotConfig && Object.keys(client.libraryBotConfig).length > 0) {
          console.log("Using libraryBotConfig for protection settings");
          setIsProtected(client?.libraryBotConfig?.ai_pulse_report_protected);
          setCorrectPassword(client?.libraryBotConfig?.ai_pulse_report_password || "");
        } else {
          console.log("Using universal settings for protection");
          setIsProtected(client.universalPageConfig?.protected);
          setCorrectPassword(client.universalPageConfig?.password || ""); 
        }
      setClientData(client);
    } catch (error) {
      console.error("Error fetching client data:", error);
    } finally {
      setClientLoading(false);
    }
  };

  fetchClientData();
}, []);


  useEffect(() => {
  if (isAuthenticated && client) fetchReportData();
}, [client, isAuthenticated]);


  const handleSort = (column: keyof ActivityData) => {
    if (sortColumn === column) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
    setCurrentPage(1);
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    const aStr = String(aValue).toLowerCase();
    const bStr = String(bValue).toLowerCase();
    return sortDirection === "asc"
      ? aStr.localeCompare(bStr)
      : bStr.localeCompare(aStr);
  });

  // --- Pagination (always start from 1) ---
  const rawTotalPages = Math.ceil(sortedData.length / rowsPerPage); // could be 0
  const totalPages = Math.max(1, rawTotalPages);

  useEffect(() => {
    setCurrentPage((p) => {
      if (rawTotalPages === 0) return 1;
      return Math.min(Math.max(1, p), rawTotalPages);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortedData.length, rowsPerPage, rawTotalPages]);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + rowsPerPage);

  const hasData = sortedData.length > 0;
  const canPrev = hasData && currentPage > 1;
  const canNext = hasData && currentPage < rawTotalPages;

  const handleShowMoreEmails = (emails: string[], caseName: string) => {
    setSelectedEmails(emails);
    setSelectedCase(caseName);
    setShowEmailPopup(true);
  };
  const handleClosePopup = () => setShowEmailPopup(false);

  const handleRefresh = () => {
    fetchReportData();
  };

  const downloadReport = (format: "csv" | "xlsx") => {
    const exportData = sortedData.map((row, idx) => ({
      Rank: idx + 1,
      Case: row.case,
      Industry: row.industry,
      Function: row.function,
      "Business Outcome": row.businessOutcome,
      "Discussion Requests": row.discussionRequests,
      "Request Users": row.requestUsers.join(", "),
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Activity Report");

    const timestamp = new Date().toISOString().split("T")[0];
    const filename = `activity_report_${timestamp}.${format}`;

    XLSX.writeFile(wb, filename, {
      bookType: format === "csv" ? "csv" : "xlsx",
    });
  };

  // If not authenticated → show ProtectedSection UI
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
    <div className="max-w-[1400px] mx-auto p-6 min-h-screen bg-white font-inter">
      {/* Header */}
      <div className="bg-[#00c193] rounded-2xl p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold flex items-center gap-2">
              <FaChartLine /> AIPulseReport
            </h1>
            <p className="opacity-90 text-lg">Cases in Focus</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => downloadReport("csv")}
              className="bg-white/20 border border-white/30 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/30 backdrop-blur-md transition text-white"
            >
              <FaTable /> CSV
            </button>
            <button
              onClick={() => downloadReport("xlsx")}
              className="bg-white/20 border border-white/30 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/30 backdrop-blur-md transition text-white"
            >
              <FaTable /> Excel
            </button>
            <button
              onClick={() => handleRefresh()}
              className="bg-white/20 border border-white/30 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/30 backdrop-blur-md transition text-white"
            >
              <FaSyncAlt /> Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Activity Report Section */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
              <h2 className="text-2xl font-bold">Activity Report</h2>
            </div>
            <div className="text-emerald-500 font-medium flex items-center gap-2">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              </svg>
              Ranked by Discussion Requests
            </div>
          </div>

          {loading ? (
            <div className="p-6 text-center text-gray-500">
              Loading report...
            </div>
          ) : (
            <>
              <div className="border rounded-lg overflow-hidden overflow-x-auto">
                <table className="w-full min-w-[1200px]">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th
                        className="px-6 py-3 text-left text-xs font-bold text-gray-800 cursor-pointer uppercase w-[25%]"
                        onClick={() => handleSort("case")}
                      >
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                          </svg>
                          Case{" "}
                          {sortColumn === "case" &&
                            (sortDirection === "asc" ? "↑" : "↓")}
                        </div>
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-bold text-gray-800 cursor-pointer uppercase w-[12%]"
                        onClick={() => handleSort("industry")}
                      >
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                          </svg>
                          Industry{" "}
                          {sortColumn === "industry" &&
                            (sortDirection === "asc" ? "↑" : "↓")}
                        </div>
                      </th>
                      <th
                        className="px-6 py-3 text-left text-xs font-bold text-gray-800 cursor-pointer uppercase w-[12%]"
                        onClick={() => handleSort("function")}
                      >
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                          </svg>
                          Function{" "}
                          {sortColumn === "function" &&
                            (sortDirection === "asc" ? "↑" : "↓")}
                        </div>
                      </th>
                      {/* Updated Business Outcome header: prevent wrapping and give more room */}
                      <th
                        className="px-6 py-3 text-left text-xs font-bold text-gray-800 cursor-pointer uppercase w-[18%] min-w-[140px]"
                        onClick={() => handleSort("businessOutcome")}
                      >
                        <div className="flex items-center gap-2 whitespace-nowrap">
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                            <polyline points="17 6 23 6 23 12"></polyline>
                          </svg>
                          Business Outcome{" "}
                          {sortColumn === "businessOutcome" &&
                            (sortDirection === "asc" ? "↑" : "↓")}
                        </div>
                      </th>
                      <th
                        className="px-6 py-3 text-center text-xs font-bold text-gray-800 cursor-pointer uppercase w-[12%]"
                        onClick={() => handleSort("discussionRequests")}
                      >
                        <div className="flex items-center justify-center gap-2">
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                          </svg>
                          <div className="text-center">DiscussionRequests</div>
                          {sortColumn === "discussionRequests" &&
                            (sortDirection === "asc" ? "↑" : "↓")}
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 uppercase w-[24%]">
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                          </svg>
                          Request Users
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-gray-500 font-medium">
                          {hasData ? <span>No items on this page.</span> : <span>No data found.</span>}
                        </td>
                      </tr>
                    ) : (
                      paginatedData.map((row, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition">
                          <td className="px-6 py-4 font-medium text-gray-500">{row.case || "-"}</td>
                          <td className="px-6 py-4 text-gray-500">{row.industry || "-"}</td>
                          <td className="px-6 py-4 text-gray-500">{row.function || "-"}</td>
                          {/* Updated businessOutcome body cell: single-line with ellipsis when too long */}
                          <td
                            className="px-6 py-4 text-gray-500 whitespace-nowrap overflow-hidden"
                            style={{ textOverflow: "ellipsis", maxWidth: 300 }}
                          >
                            {row.businessOutcome || "-"}
                          </td>
                          <td className="px-6 py-4 text-center font-semibold text-gray-500">{row.discussionRequests ?? "-"}</td>
                          <td className="px-6 py-4 text-gray-500">
                            <div className="flex flex-wrap gap-1 items-center">
                              {row.requestUsers.length > 0 && (
                                <span className="inline-block bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-xs">{row.requestUsers[0]}</span>
                              )}
                              {row.requestUsers.length > 1 && (
                                <button onClick={() => handleShowMoreEmails(row.requestUsers, row.case)} className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-semibold hover:bg-blue-100 transition">
                                  +{row.requestUsers.length - 1} more
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-3 mt-6">
                <button
                  disabled={!canPrev}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className={`px-6 py-2 rounded-full font-semibold transition ${
                    !canPrev ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Prev
                </button>
                <button className="w-10 h-10 rounded-full font-semibold bg-emerald-500 text-white shadow-md">
                  {currentPage}
                </button>
                <button
                  disabled={!canNext}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className={`px-6 py-2 rounded-full font-semibold transition ${
                    !canNext ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Next
                </button>
              </div>
            </>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Generated: {currentDate}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              Last Updated: just now
            </div>
          </div>
        </div>
      </div>

      {/* Email Popup Modal */}
      {showEmailPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleClosePopup}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="bg-emerald-500 p-4 flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold text-lg">Request Users</h3>
                <p className="text-white text-sm opacity-90">{selectedCase}</p>
              </div>
              <button onClick={handleClosePopup} className="text-white hover:bg-white/20 rounded-full p-2 transition">
                <FaTimes size={20} />
              </button>
            </div>
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="space-y-2">
                {selectedEmails.map((email, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div className="bg-emerald-100 rounded-full p-2">
                      <FaEnvelope className="text-emerald-600" size={16} />
                    </div>
                    <span className="text-gray-700 text-sm">{email}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 p-4 flex justify-end">
              <button onClick={handleClosePopup} className="bg-emerald-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-600 transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIPluseReport;
