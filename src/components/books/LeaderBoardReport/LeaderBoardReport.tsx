"use client";

import { baseURL } from "@/lib/utils";
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
import * as XLSX from "xlsx";
import { UserInfoType } from "@/lib/types";
import { getClientbyClientId } from "@/lib/api";
import ProtectedSection from "../protectedSection";

interface UserReport {
  name: string;
  email: string;
  books: string[];
  dates: string[];
}

const EXPIRY_HOURS = 24;

const fetchLeaderBoardReportData = async (
  backend: string,
  packageCourseID: string
): Promise<UserReport[]> => {
  try {
    const res = await fetch(
      `${backend}/courses/course-report/?package_course_id=${packageCourseID}`
    );
    const data = await res.json();
    console.log("fetchLeaderBoardReportData", data);

    return data.results.map((user: any) => ({
      name: user.name,
      email: user.email,
      books: user.completed_modules
        ? user.completed_modules.split(",").map((b: string) => b.trim())
        : [],
      dates: user.last_activity
        ? [
            new Date(user.last_activity).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
          ]
        : [],
    }));
  } catch (err) {
    console.error("Error fetching report:", err);
    return [];
  }
};

interface LeaderBoardReportProps {
  packageCourseId: string;
  client_id: string;
}

const LeaderBoardReport: React.FC<LeaderBoardReportProps> = ({
  packageCourseId,
  client_id,
}) => {
  const [clientData, setClientData] = useState<UserInfoType | null>(null);
  const [data, setData] = useState<UserReport[]>([]);
  const [date, setDate] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [clientLoading, setClientLoading] = useState(true);

  // Password state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isProtected, setIsProtected] = useState(false);
  const [correctPassword, setCorrectPassword] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        setClientLoading(true);
        const client = await getClientbyClientId(client_id);
        console.log("Client data fetched:", client);
        if (client.libraryBotConfig && Object.keys(client.libraryBotConfig).length > 0) {
          console.log("Using libraryBotConfig for protection settings");
          setIsProtected(client?.libraryBotConfig?.leaderboard_report_protected);
          setCorrectPassword(client?.libraryBotConfig?.leaderboard_report_password || "");
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


  const loadData = async () => {
    setLoading(true);
    const response = await fetchLeaderBoardReportData(baseURL, packageCourseId);
    setData(response);
    setLoading(false);
  };

  const refreshData = () => loadData();

  // ADD THIS FUNCTION HERE
  const downloadReport = (format: "csv" | "xlsx") => {
    // Prepare data for export
    const exportData = groupedData.map((user, idx) => ({
      Rank: idx + 1,
      Name: user.name,
      Email: user.email,
      "Total Books Completed": user.books.length,
      "Last Completed Book":
        user.books[user.books.length - 1] || "No Books Completed",
      "Last Activity Date":
        user.dates[user.dates.length - 1] || "No Date Available",
      "All Completed Books": user.books.join(", ") || "None",
    }));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "LeaderBoard Report");

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().split("T")[0];
    const filename = `leaderboard_report_${timestamp}.${format}`;

    // Download file
    XLSX.writeFile(wb, filename, {
      bookType: format === "csv" ? "csv" : "xlsx",
    });
  };

  // Sort by number of books (descending)
  const groupedData = [...data].sort((a, b) => b.books.length - a.books.length);

  // Pagination logic
  const totalPages = Math.ceil(groupedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = groupedData.slice(startIndex, startIndex + rowsPerPage);

  console.log("Client Data:", clientData, isAuthenticated);
  if (!isAuthenticated) {
    return (
      <ProtectedSection
        isProtected={
          isProtected
        }
        correctPassword={
          correctPassword
        }
        clientLoading={clientLoading}
        onUnlock={() => setIsAuthenticated(true)}
      />
    );
  }

 return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen bg-white font-inter">
      {/* Header */}
      <div className="bg-gray-200 border-2 border-[#00c193] p-6 mb-8 text-black"
      style={{ borderRadius: 'calc(var(--radius) - 6px)' }}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold flex items-center gap-2">
              <FaChartLine /> LeaderBoard Report
            </h1>
            <p className="opacity-90 text-lg">Learning leaders Dashboard</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => downloadReport("csv")}
              className="bg-white border border-[#00c193] px-4 py-2 font-semibold flex items-center gap-2 hover:bg-gray-300 transition text-black"
              style={{ borderRadius: 'calc(var(--radius) - 6px)' }}
            >
              <FaTable /> CSV
            </button>
            <button
              onClick={() => downloadReport("xlsx")}
              className="bg-white border border-[#00c193] px-4 py-2 font-semibold flex items-center gap-2 hover:bg-gray-300 transition text-black"
              style={{ borderRadius: 'calc(var(--radius) - 6px)' }}
            >
              <FaTable /> Excel
            </button>
            <button
              onClick={refreshData}
              className="bg-white border border-[#00c193] px-4 py-2 font-semibold flex items-center gap-2 hover:bg-gray-300 transition text-black"
              style={{ borderRadius: 'calc(var(--radius) - 6px)' }}
            >
              <FaSyncAlt /> Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white shadow-xl border border-gray-200 overflow-hidden"
      style={{ borderRadius: 'calc(var(--radius) - 6px)' }}>
        <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-gray-50 to-white flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900">
            <FaTable />
            Activity Report
          </h2>
          <span className="text-[#00c193] font-semibold flex items-center gap-1 text-sm">
            <FaArrowUp /> Ranked by Report/Lesson count
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
                      <FaBook className="inline mr-2" /> Completed
                      Lessons/Report
                    </th>
                    <th className="px-6 py-3 text-left">
                      <FaCalendar className="inline mr-2" /> Last Activity Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((row, idx) => {
                    const lastBook =
                      row.books[row.books.length - 1] || "No Case Completed";
                    const lastDate =
                      row.dates[row.dates.length - 1] || "No Date Available";

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
                          <div>{lastBook}</div>
                          {row.books.length > 1 && (
                            <button
                              onClick={() => setSelectedUser(row)}
                              className="text-blue-500 text-sm hover:underline mt-1"
                            >
                              More...
                            </button>
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
                className={`px-4 py-2 font-bold border border-[#00c193] transition-all duration-300 ${
                  currentPage === 1
                    ? "bg-white text-gray-500 cursor-not-allowed"
                    : "bg-white text-black hover:bg-gray-300"
                }`}
                style={{ borderRadius: 'calc(var(--radius) - 6px)' }}
              >
                Prev
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-9 h-9 flex items-center justify-center font-semibold transition border border-[#00c193]
        ${
          currentPage === i + 1
            ? "bg-white text-black"
            : "bg-white text-black hover:bg-gray-300"
        }`}
                  style={{ borderRadius: 'calc(var(--radius) - 6px)' }}
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
                className={`px-4 py-2 font-medium transition border border-[#00c193]
      ${
        currentPage === totalPages
          ? "bg-white text-gray-400 cursor-not-allowed"
          : "bg-white text-black hover:bg-gray-300"
      }`}
                style={{ borderRadius: 'calc(var(--radius) - 6px)' }}
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
            className="bg-white shadow-xl max-w-lg w-full p-6 relative border border-[#00c193]"
            style={{ borderRadius: 'calc(var(--radius) - 6px)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <FaTimes />
            </button>
            <h3 className="text-xl font-bold mb-4">
              {selectedUser.name}'s Completed Books
            </h3>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {selectedUser.books.map((book, idx) => (
                <div
                  key={idx}
                  className="p-3 border border-[#00c193] flex justify-between items-center"
                  style={{ borderRadius: 'calc(var(--radius) - 6px)' }}
                >
                  <span className="text-gray-800">{book}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderBoardReport;
