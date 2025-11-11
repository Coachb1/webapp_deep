// export default LeaderBoardReport;
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

interface ActivityData {
  case: string;
  industry: string;
  function: string;
  businessOutcome: string;
  discussionRequests: number;
}

interface LeaderBoardReportProps {
  packageCourseId: string;
}

const LeaderBoardReport: React.FC<LeaderBoardReportProps> = ({ packageCourseId }) => {
  const { userInfo } = usePortalUser();
  console.log(userInfo, 'clientbookreport');
  
  const [data, setData] = useState<ActivityData[]>([
    {
      case: "Digital Transformation at TechCorp",
      industry: "Technology",
      function: "IT Operations",
      businessOutcome: "Cost Reduction",
      discussionRequests: 45
    },
    {
      case: "Supply Chain Optimization",
      industry: "Manufacturing",
      function: "Operations",
      businessOutcome: "Efficiency Improvement",
      discussionRequests: 38
    },
    {
      case: "Customer Experience Enhancement",
      industry: "Retail",
      function: "Marketing",
      businessOutcome: "Revenue Growth",
      discussionRequests: 52
    },
    {
      case: "Cloud Migration Strategy",
      industry: "Financial Services",
      function: "IT Infrastructure",
      businessOutcome: "Scalability",
      discussionRequests: 41
    },
    {
      case: "AI-Powered Analytics Implementation",
      industry: "Healthcare",
      function: "Data Science",
      businessOutcome: "Decision Making",
      discussionRequests: 67
    },
    {
      case: "Workforce Management System",
      industry: "Hospitality",
      function: "Human Resources",
      businessOutcome: "Productivity Increase",
      discussionRequests: 29
    },
    {
      case: "Cybersecurity Framework Upgrade",
      industry: "Banking",
      function: "Security",
      businessOutcome: "Risk Mitigation",
      discussionRequests: 55
    },
    {
      case: "Agile Transformation Program",
      industry: "Software",
      function: "Project Management",
      businessOutcome: "Time to Market",
      discussionRequests: 33
    },
    {
      case: "E-commerce Platform Redesign",
      industry: "Retail",
      function: "Digital",
      businessOutcome: "Customer Satisfaction",
      discussionRequests: 48
    },
    {
      case: "Predictive Maintenance Solution",
      industry: "Manufacturing",
      function: "Engineering",
      businessOutcome: "Downtime Reduction",
      discussionRequests: 36
    },
    {
      case: "Mobile-First Strategy",
      industry: "Media",
      function: "Product Development",
      businessOutcome: "User Engagement",
      discussionRequests: 42
    },
    {
      case: "Data Governance Initiative",
      industry: "Insurance",
      function: "Compliance",
      businessOutcome: "Regulatory Compliance",
      discussionRequests: 31
    },
    {
      case: "Innovation Lab Setup",
      industry: "Automotive",
      function: "R&D",
      businessOutcome: "Innovation Pipeline",
      discussionRequests: 27
    },
    {
      case: "Customer Data Platform Integration",
      industry: "E-commerce",
      function: "Marketing Technology",
      businessOutcome: "Personalization",
      discussionRequests: 44
    },
    {
      case: "Sustainability Reporting System",
      industry: "Energy",
      function: "Environmental",
      businessOutcome: "ESG Compliance",
      discussionRequests: 25
    }
  ]);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

  // Sorting state
  const [sortColumn, setSortColumn] = useState<keyof ActivityData>("discussionRequests");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // Get current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Handle sorting
  const handleSort = (column: keyof ActivityData) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  // Sort data
  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    const aStr = String(aValue).toLowerCase();
    const bStr = String(bValue).toLowerCase();
    
    if (sortDirection === "asc") {
      return aStr.localeCompare(bStr);
    } else {
      return bStr.localeCompare(aStr);
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + rowsPerPage);

  // Download report function
  const downloadReport = (format: 'csv' | 'xlsx') => {
    const exportData = sortedData.map((row, idx) => ({
      'Rank': idx + 1,
      'Case': row.case,
      'Industry': row.industry,
      'Function': row.function,
      'Business Outcome': row.businessOutcome,
      'Discussion Requests': row.discussionRequests,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Activity Report');

    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `activity_report_${timestamp}.${format}`;

    XLSX.writeFile(wb, filename, { bookType: format === 'csv' ? 'csv' : 'xlsx' });
  };

  return (
    <div className="max-w-[1400px] mx-auto p-6 min-h-screen bg-white font-inter">
      {/* Header */}
      <div className="bg-[#00c193] rounded-2xl p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold flex items-center gap-2">
              <FaChartLine /> AIPulseReport
            </h1>
            <p className="opacity-90 text-lg">
              Cases in Focus
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

      {/* Activity Report Section */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
              <h2 className="text-2xl font-bold">Activity Report</h2>
            </div>
            <div className="text-emerald-500 font-medium flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              </svg>
              Ranked by Discussion Requests
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 cursor-pointer uppercase" onClick={() => handleSort("case")}>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                      </svg>
                      Case {sortColumn === "case" && (sortDirection === "asc" ? "↑" : "↓")}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 cursor-pointer uppercase" onClick={() => handleSort("industry")}>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                      </svg>
                      Industry {sortColumn === "industry" && (sortDirection === "asc" ? "↑" : "↓")}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 cursor-pointer uppercase" onClick={() => handleSort("function")}>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                      </svg>
                      Function {sortColumn === "function" && (sortDirection === "asc" ? "↑" : "↓")}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-800 cursor-pointer uppercase" onClick={() => handleSort("businessOutcome")}>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                      </svg>
                      Business Outcome {sortColumn === "businessOutcome" && (sortDirection === "asc" ? "↑" : "↓")}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-800 cursor-pointer uppercase" onClick={() => handleSort("discussionRequests")}>
                    <div className="flex items-center justify-end gap-2">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                      </svg>
                      Discussion Requests {sortColumn === "discussionRequests" && (sortDirection === "asc" ? "↑" : "↓")}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((row, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-500">{row.case}</td>
                    <td className="px-6 py-4 text-gray-500">{row.industry}</td>
                    <td className="px-6 py-4 text-gray-500">{row.function}</td>
                    <td className="px-6 py-4 text-gray-500">{row.businessOutcome}</td>
                    <td className="px-6 py-4 text-right font-semibold text-gray-500">
                      {row.discussionRequests}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Prev
            </button>
            <button
              className="w-10 h-10 rounded-full font-semibold bg-emerald-500 text-white shadow-md"
            >
              {currentPage}
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Next
            </button>
          </div>

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
    </div>
  );
};

export default LeaderBoardReport;