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
import { usePortalUser } from "../context/UserContext";
import * as XLSX from 'xlsx'; 


interface UserReport {
  name: string;
  email: string;
  books: string[];
  dates: string[];
}



interface LeaderBoardReportProps {
  packageCourseId: string;
}

const LeaderBoardReport: React.FC<LeaderBoardReportProps> = ({ packageCourseId }) => {
  const {userInfo} = usePortalUser();
  console.log(userInfo, 'clientbookreport')
  const [data, setData] = useState<UserReport[]>([]);
  const [date, setDate] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserReport | null>(null);
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;





// ADD THIS FUNCTION HERE
const downloadReport = (format: 'csv' | 'xlsx') => {
  // Prepare data for export
  const exportData = groupedData.map((user, idx) => ({
    'Rank': idx + 1,
    'Name': user.name,
    'Email': user.email,
    'Total Books Completed': user.books.length,
    'Last Completed Book': user.books[user.books.length - 1] || 'No Books Completed',
    'Last Activity Date': user.dates[user.dates.length - 1] || 'No Date Available',
    'All Completed Books': user.books.join(', ') || 'None',
  }));

  // Create worksheet
  const ws = XLSX.utils.json_to_sheet(exportData);
  
  // Create workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'LeaderBoard Report');

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `leaderboard_report_${timestamp}.${format}`;

  // Download file
  XLSX.writeFile(wb, filename, { bookType: format === 'csv' ? 'csv' : 'xlsx' });
};

  // Sort by number of books (descending)
  const groupedData = [...data].sort(
    (a, b) => b.books.length - a.books.length
  );

  // Pagination logic
  const totalPages = Math.ceil(groupedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = groupedData.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="max-w-6xl mx-auto p-6 min-h-screen bg-white font-inter">
      {/* Header */}
      <div className="bg-[#00c193] rounded-2xl p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold flex items-center gap-2">
              <FaChartLine /> AI Pulse Report
            </h1>
            <p className="opacity-90 text-lg">
              Cases in Focus
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
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-bold border-b border-gray-200">
                  <tr>
                    <th className="font-semibold text-muted-foreground cursor-pointer">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                      </svg>
                      CASE 
                    </div>
                  </th>

                    <th className="font-semibold text-muted-foreground cursor-pointer">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                      </svg>
                      INDUSTRY
                    </div>
                  </th>

                    <th className="font-semibold text-muted-foreground cursor-pointer">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                      </svg>
                      FUNCTION 
                    </div>
                  </th>

                    <th className="font-semibold text-muted-foreground cursor-pointer">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                      </svg>
                      BUSINESS OUTCOME 
                    </div>
                  </th>

                    <th className="text-right font-semibold text-muted-foreground cursor-pointer">
                    <div className="flex items-center justify-end gap-2">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                      </svg>
                      DISCUSSION REQUESTS 
                    </div>
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
                className={`px-4 py-2 rounded-full font-bold ${
                  currentPage === 1
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
        ${
          currentPage === i + 1
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
      ${
        currentPage === totalPages
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-[#00c193] text-white hover:bg-[#00a87f]"
      }`}
              >
                Next
              </button>
            </div>
          </>
        

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
              {selectedUser.name}'s Completed Books
            </h3>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
              {selectedUser.books.map((book, idx) => (
                <div
                  key={idx}
                  className="p-3 border rounded-lg flex justify-between items-center"
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
