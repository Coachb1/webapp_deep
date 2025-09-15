"use client";

import { baseURL } from "@/lib/utils";
import { useState, useEffect } from "react";
import {
  FaChartLine,
  FaSyncAlt,
  FaTable,
  FaArrowUp,
  FaCalendar,
  FaClock,
  FaThumbsUp,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";

// Row type
interface RowData {
  id: number;
  uid: string; // backend session_id / uid
  qna: Record<string, string>;
  risks: string;
  likes: number;
  liked: boolean;
}

export default function IdeaBoardReport() {
  const [rows, setRows] = useState<RowData[]>([]);
  const [qnaKeys, setQnaKeys] = useState<string[]>([]);
  const [currentDate, setCurrentDate] = useState("");
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingLike, setLoadingLike] = useState<number | null>(null);

  const params = new URLSearchParams(window.location.search);
  const jobaid = params.get("jobaid");
  const userEmail = params.get('email') // replace with real logged-in user email

  // Pagination
  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Date setup
  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${baseURL}/job-aid/job-aid-leaderboard/?jobaid_id=${jobaid}`
        );

        if (!res.ok) throw new Error("Failed to fetch report data");

        const data = await res.json();
        const mapped = mapApiToRows(data);
        setRows(mapped);

        if (data.length > 0) {
          setQnaKeys(Object.keys(data[0].qna || {}));
        }
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ jobaid]);

  // Map API data → table rows
  const mapApiToRows = (apiData: any[]): RowData[] => {
    return apiData.map((item) => ({
      id: item.id,
      uid: item.uid || item.session_id, // ✅ use uid/session_id from backend
      qna: item.qna || {},
      risks:
        item.generated_report_data?.["2_behavioral_map"]?.["1_fear_or_risk"] ||
        "-",
      likes: item.like_count ?? 0,
      liked: !!item.liked_by,
    }));
  };

  // Toggle like
  const handleLike = async (row: RowData) => {
    const { id, uid, liked } = row;
    const newLikeStatus = !liked;
    const likeChange = newLikeStatus ? 1 : -1;

    // Optimistic UI update
    setRows((prevRows) =>
      prevRows.map((r) =>
        r.id === id
          ? { ...r, liked: newLikeStatus, likes: r.likes + likeChange }
          : r
      )
    );

    setLoadingLike(id);

    try {
      const res = await fetch(
        `${baseURL}/job-aid/job-aid-leaderboard/like/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            session_id: uid,
            email: userEmail,
            like_count: likeChange,
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to update like");
    } catch (err) {
      console.error("Like API failed:", err);
      // Rollback if API fails
      setRows((prevRows) =>
        prevRows.map((r) =>
          r.id === id ? { ...r, liked, likes: r.likes - likeChange } : r
        )
      );
    } finally {
      setLoadingLike(null);
    }
  };

  // Refresh
  const refreshData = () => window.location.reload();

  // Pagination helpers
  const totalPages = Math.max(1, Math.ceil(rows.length / rowsPerPage));
  const paginatedRows = rows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const goToPage = (page: number) =>
    setCurrentPage(Math.min(Math.max(1, page), totalPages));

  return (
    <div className="max-w-[1400px] mx-auto p-6 min-h-screen bg-white font-inter">
      {/* Header */}
      <div className="bg-[#00c193] rounded-2xl p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold flex items-center gap-2">
              <FaChartLine /> IdeaBoard Report
            </h1>
            <p className="opacity-90 text-lg">
              Comprehensive Your Activity & Book Management Dashboard
            </p>
          </div>

          <button
            onClick={refreshData}
            className="bg-white/20 border border-white/30 px-5 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/30 backdrop-blur-md transition text-white"
          >
            <FaSyncAlt /> Refresh
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Content header */}
        <div className="p-6 border-b border-gray-200 bg-white flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaTable /> Your Activity Report
          </h2>
          <span className="text-[#00c193] font-semibold flex items-center gap-1 text-sm">
            <FaArrowUp /> Updated just now
          </span>
        </div>

        {/* Loader / Error */}
        {loading && (
          <div className="p-6 text-center text-gray-500">Loading...</div>
        )}
        {error && (
          <div className="p-6 text-center text-red-500">
            Failed: {error}
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-bold border-b border-gray-200">
                <tr>
                  {qnaKeys.map((key) => (
                    <th
                      key={key}
                      className={`px-6 py-3 text-center ${
                        key.toLowerCase().includes("details")
                          ? "min-w-[250px] max-w-[400px] text-left"
                          : "min-w-[120px]"
                      }`}
                    >
                      {key}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-center min-w-[150px]">Risks</th>
                  <th className="px-6 py-3 text-center w-[100px]">Vote</th>
                </tr>
              </thead>

              <tbody>
                {paginatedRows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    {qnaKeys.map((key) => (
                      <td
                        key={key}
                        className={`px-6 py-4 ${
                          key.toLowerCase().includes("details")
                            ? "text-left text-gray-600 align-top"
                            : "text-center text-gray-600"
                        }`}
                      >
                        {row.qna[key] && row.qna[key].length > 80 ? (
                          <>
                            {row.qna[key].slice(0, 80)}...
                            <button
                              onClick={() => setSelectedRow(row)}
                              className="ml-2 text-[#00c193] underline text-sm"
                            >
                              More
                            </button>
                          </>
                        ) : (
                          row.qna[key] || "-"
                        )}
                      </td>
                    ))}

                    <td className="px-6 py-4 text-center text-gray-600">
                      {row.risks}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleLike(row)}
                        disabled={loadingLike === row.id}
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-md border ${
                          row.liked
                            ? "bg-[#00c193]/20 border-[#00c193]"
                            : "bg-white"
                        } ${
                          loadingLike === row.id
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        {loadingLike === row.id ? (
                          <span className="text-gray-400 text-sm">...</span>
                        ) : (
                          <>
                            <FaThumbsUp
                              className={
                                row.liked ? "text-[#00c193]" : "text-gray-600"
                              }
                            />
                            <span className="font-semibold">{row.likes}</span>
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && (
          <div className="flex justify-center items-center gap-2 py-6">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-full font-bold ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#00c193] text-white hover:brightness-95"
              }`}
            >
              Prev
            </button>

            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToPage(idx + 1)}
                className={`w-8 h-8 rounded-full font-bold ${
                  currentPage === idx + 1
                    ? "bg-[#00c193] text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-full font-bold ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-[#00c193] text-white hover:brightness-95"
              }`}
            >
              Next
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="bg-gray-50 p-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-sm">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <FaCalendar /> Generated: <strong>{currentDate}</strong>
            </span>
            <span className="flex items-center gap-2">
              <FaClock /> Last Updated: <strong>just now</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedRow && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedRow(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{ maxHeight: "85vh" }}
          >
            {/* Close */}
            <button
              onClick={() => setSelectedRow(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl p-1"
              aria-label="Close"
            >
              <IoClose size={22} />
            </button>

            <div className="p-6 flex flex-col gap-4">
              <h3 className="text-xl font-bold mb-1">
                {selectedRow.qna?.["Idea Name"] || "Details"}
              </h3>

              {/* Dynamic fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(selectedRow.qna).map(([key, value]) => (
                  <div key={key}>
                    <h4 className="text-sm font-semibold text-gray-500">
                      {key}
                    </h4>
                    <div className="mt-1 text-gray-800">{value || "-"}</div>
                  </div>
                ))}

                <div>
                  <h4 className="text-sm font-semibold text-gray-500">Risks</h4>
                  <div className="mt-1 text-gray-800">
                    {selectedRow.risks}
                  </div>
                </div>
              </div>

              {/* Long Idea Details section */}
              {selectedRow.qna?.["Idea Details"] && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 mb-2">
                    Idea Details
                  </h4>
                  <div className="prose max-h-[50vh] overflow-y-auto pr-3 text-gray-700 leading-relaxed">
                    {selectedRow.qna["Idea Details"]}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
