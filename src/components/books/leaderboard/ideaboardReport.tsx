"use client";

import { baseURL } from "@/lib/utils";
import { useState, useEffect } from "react";
import { FaChartLine, FaSyncAlt, FaTable, FaArrowUp, FaCalendar, FaClock } from "react-icons/fa";
import IdeaBoardTable from "./IdeaBoardTable";
import IdeaBoardPagination from "./IdeaBoardPagination";
import IdeaBoardModal from "./IdeaboardModel";

// Row type
export interface RowData {
  id: number;
  uid: string;
  qna: Record<string, string>;
  likes: number;
  liked: boolean;
}

interface IdeaboardPageProps {
  jobaid: string;
  userEmail: string;
}

export const IdeaBoardReport: React.FC<IdeaboardPageProps> = ({ jobaid, userEmail }) => {
  const [rows, setRows] = useState<RowData[]>([]);
  const [qnaKeys, setQnaKeys] = useState<string[]>([]);
  const [currentDate, setCurrentDate] = useState("");
  const [selectedRow, setSelectedRow] = useState<object | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadingLike, setLoadingLike] = useState<number | null>(null);


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
    if (!jobaid) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `${baseURL}/job-aid/job-aid-leaderboard/?jobaid_id=${jobaid}`
        );
        if (!res.ok) throw new Error("Failed to fetch report data");
        const data = await res.json();
        console.log("Fetched report data:", data);
        const mapped = mapApiToRows(data);
        setRows(mapped);

       if (data.length > 0) {
        const allKeys = new Set<string>();

        data.forEach((item: any) => {
          Object.keys(item.qna || {}).forEach(key => allKeys.add(key));
        });

        setQnaKeys(Array.from(allKeys));
      }
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [jobaid]);

  // Map API → rows
  const mapApiToRows = (apiData: any[]): RowData[] => {
    return apiData.map((item) => ({
      id: item.id,
      uid: item.uid || item.session_id,
      qna: item.qna || {},
      risks: item.generated_report_data?.["2_behavioral_map"]?.["1_fear_or_risk"] || "-",
      likes:  item.like_count ?? 0,
      liked:  item.liked_by ? item.liked_by.includes(userEmail) : false

    }));
  };

  // Like handler  // Like handler
  const handleLike = async (row: RowData) => {
    const { id, uid, liked } = row;
    const newLikeStatus = !liked;
    const likeChange = newLikeStatus ? 1 : -1;

    // Optimistic update (with clamp at 0)
    setRows((prevRows) =>
      prevRows.map((r) =>
        r.id === id
          ? { ...r, liked: newLikeStatus, likes: Math.max(0, r.likes + likeChange) }
          : r
      )
    );
    setLoadingLike(id);

    try {
      const res = await fetch(`${baseURL}/job-aid/job-aid-leaderboard/like/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: uid,
          email: userEmail,
          like_count: likeChange,
        }),
      });

      if (!res.ok) throw new Error("Failed to update like");
      console.log(await res.json());
      // ✅ Refetch the latest like count from API
      const updatedRes = await fetch(
        `${baseURL}/job-aid/job-aid-leaderboard/?jobaid_id=${jobaid}`
      );
      if (!updatedRes.ok) throw new Error("Failed to refresh data");
      const updatedData = await updatedRes.json();

      // Re-map API data to rows
      const mapped = mapApiToRows(updatedData);
      setRows(mapped);
    } catch (err) {
      console.error("Like API failed:", err);
      // rollback if API fails
      setRows((prevRows) =>
        prevRows.map((r) =>
          r.id === id
            ? { ...r, liked, likes: Math.max(0, r.likes - likeChange) }
            : r
        )
      );
    } finally {
      setLoadingLike(null);
    }
  };


  // Pagination helpers
  const totalPages = Math.max(1, Math.ceil(rows.length / rowsPerPage));
  const paginatedRows = rows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="max-w-[1400px] mx-auto p-6 min-h-screen bg-white font-inter">
      {/* Header */}
      <div className="bg-[#00c193] rounded-2xl p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold flex items-center gap-2">
              <FaChartLine /> IdeaBoard Report
            </h1>
            <p className="opacity-90 text-lg">Enterprise Ideas log</p>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="bg-white/20 border border-white/30 px-5 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-white/30 backdrop-blur-md transition text-white"
          >
            <FaSyncAlt /> Refresh
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-white flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaTable />Activity Report
          </h2>
          <span className="text-[#00c193] font-semibold flex items-center gap-1 text-sm">
            <FaArrowUp /> Updated just now
          </span>
        </div>

        {loading && <div className="p-6 text-center text-gray-500">Loading...</div>}
        {error && <div className="p-6 text-center text-red-500">Failed: {error}</div>}

        {!loading && !error && (
          <>
            <IdeaBoardTable
              qnaKeys={qnaKeys}
              rows={paginatedRows}
              loadingLike={loadingLike}
              onLike={handleLike}
              onSelectRow={setSelectedRow}
            />

            <IdeaBoardPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}

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

      <IdeaBoardModal row={selectedRow} onClose={() => setSelectedRow(null)} />
    </div>
  );
}
