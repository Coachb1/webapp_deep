"use client";

import { baseURL } from "@/lib/utils";
import { useState, useEffect, useMemo } from "react";
import { FaChartLine, FaSyncAlt, FaTable, FaArrowUp, FaCalendar, FaClock } from "react-icons/fa";
import IdeaBoardTable from "./IdeaBoardTable";
import IdeaBoardPagination from "./IdeaBoardPagination";
import IdeaBoardModal from "./IdeaboardModel";
import * as XLSX from 'xlsx';
import { UserInfoType } from "@/lib/types";
import { getClientUserInfo } from "@/lib/api";
import ProtectedSection from "../protectedSection";

// Row type
export interface RowData {
  id: number;
  uid: string;
  full_name: string;
  email: string;
  qna: Record<string, string>;
  odered_qna?: Record<string, Record<string, string>>;
  likes: number;
  liked: boolean;
  keyOrder: string[];
}

interface IdeaboardPageProps {
  jobaid: string;
  userEmail: string;
  onlyclientsetup: boolean;
}

export const IdeaBoardReport: React.FC<IdeaboardPageProps> = ({ jobaid, userEmail, onlyclientsetup }) => {
  const [client, setClientData] = useState<UserInfoType|null>(null);
  const [clientLoading, setClientLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProtected, setIsProtected] = useState(false);
  const [correctPassword, setCorrectPassword] = useState("");


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

  // sorting state: default by id ascending
  const [sortBy, setSortBy] = useState<"id" | "votes">("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const sortedRows = useMemo(() => {
    const copy = [...rows];
    if (sortBy === "votes") {
      copy.sort((a, b) => {
        const av = Number(a.likes ?? 0);
        const bv = Number(b.likes ?? 0);
        return sortDir === "asc" ? av - bv : bv - av;
      });
    } else {
      // sort by id (try numeric, fallback to string)
      copy.sort((a, b) => {
        const ai = Number(a.id);
        const bi = Number(b.id);
        if (!Number.isNaN(ai) && !Number.isNaN(bi)) {
          return sortDir === "asc" ? ai - bi : bi - ai;
        }
        return sortDir === "asc"
          ? String(a.id).localeCompare(String(b.id))
          : String(b.id).localeCompare(String(a.id));
      });
    }
    return copy;
  }, [rows, sortBy, sortDir]);

  const toggleSortVotes = () => {
    if (sortBy === "votes") {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy("votes");
      setSortDir("desc"); // default to highest-first when switching to votes
    }
  };



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

  useEffect(() => {
  const fetchClientData = async () => {
    try {
      setClientLoading(true);
      const client = await getClientUserInfo(userEmail, {
        id: "",
        picture: "",
        family_name: "",
        given_name: "",
        'email': userEmail
      });
      console.log("Fetched client data:", client);
      if (client.libraryBotConfig && Object.keys(client.libraryBotConfig).length > 0) {
          console.log("Using libraryBotConfig for protection settings");
          setIsProtected(client?.libraryBotConfig?.ideaboard_report_protected);
          setCorrectPassword(client?.libraryBotConfig?.ideaboard_report_password || "");
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


    const fetchData = async (clientId?: string) => {
      setLoading(true);
      setError(null);

      try {
        console.debug("Fetching report data for jobaid:", jobaid, clientId);
        let url = `${baseURL}/job-aid/job-aid-leaderboard/?jobaid_id=${jobaid}&client_id=${clientId}`;

        const res = await fetch(
          url
        );
        if (!res.ok) throw new Error("Failed to fetch report data");
        const data = await res.json();
        console.log("Fetched report data:", data);
        const mapped = mapApiToRows(data);
        setRows(mapped);
        setQnaKeys(["Full Name", ...(mapped[0]?.keyOrder || [])]);

      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
  // Fetch data
  useEffect(() => {
    if (!jobaid) return;
    if (client){
      fetchData(client?.clientId);
    }
  }, [jobaid, client]);

  // Map API → rows
  const mapApiToRows = (apiData: any[]): RowData[] => {
    return apiData.map((item) => ({
      id: item.id,
      uid: item.uid || item.session_id,
      // Q&A object (question: answer)
      full_name: item.full_name || "-",
      email: item.email || "-",
      qna:
        item.ordered_qna?.reduce((acc: Record<string, string>, q: any) => {
          acc[q.question] = q.answer;
          return acc;
        }, {}) || {},
      odered_qna: item.ordered_qna?.reduce((acc: Record<string, string>, q: any) => {
          acc[q.question] = q;
          return acc;
        }, {}) || {},
      // Ordered question keys for display
      keyOrder:
        item.ordered_qna
          ?.filter((q: any) => q?.question)
          ?.sort((a: any, b: any) => (a.question_id ?? 0) - (b.question_id ?? 0))
          ?.map((q: any) => q.question) ?? [],      // Other fields
      risks: item.generated_report_data?.["2_behavioral_map"]?.["1_fear_or_risk"] || "-",
      likes: item.like_count ?? 0,
      liked: item.liked_by ? item.liked_by.includes(userEmail) : false,
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
        `${baseURL}/job-aid/job-aid-leaderboard/?jobaid_id=${jobaid}&client_id=${client?.clientId}`
      );
      if (!updatedRes.ok) throw new Error("Failed to refresh data");
      const updatedData = await updatedRes.json();

      // Re-map API data to rows
      const mapped = mapApiToRows(updatedData);
      setRows(mapped);
      setQnaKeys(["Full Name", ...(mapped[0]?.keyOrder || []),]);
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

  const onThumbupOrThumbdown = async (row: RowData, type: "thumbup" | "thumbdown") => {
    const { id, uid, liked } = row;
    const newLikeStatus = type === "thumbup" ? true : false;
    const likeChange = type === "thumbup" ? 1 : -1;

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
        `${baseURL}/job-aid/job-aid-leaderboard/?jobaid_id=${jobaid}&client_id=${client?.clientId}`
      );
      if (!updatedRes.ok) throw new Error("Failed to refresh data");
      const updatedData = await updatedRes.json();

      // Re-map API data to rows
      const mapped = mapApiToRows(updatedData);
      setRows(mapped);
      setQnaKeys(["Full Name", ...(mapped[0]?.keyOrder || []),]);
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



// ADD THIS ENTIRE FUNCTION HERE (after handleLike, before pagination helpers)
const downloadReport = (format: 'csv' | 'xlsx') => {
  // Prepare data for export
  const exportData = rows.map(row => {
    const rowData: any = {
      "Full Name": row.full_name,
      // "Email": row.email,
      
    };
    
    // Add all Q&A columns
    qnaKeys.forEach(key => {
      if (key !== "Full Name" && key !== "Email") {
      rowData[key] = row.qna[key] || '-';
    }
    });
    rowData['Likes'] = row.likes;
    
    return rowData;
  });

  // Create worksheet
  const ws = XLSX.utils.json_to_sheet(exportData);
  
  // Create workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'IdeaBoard Report');

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `ideaboard_report_${timestamp}.${format}`;

  // Download file
  XLSX.writeFile(wb, filename, { bookType: format === 'csv' ? 'csv' : 'xlsx' });
};




  // Pagination helpers
  const totalPages = Math.max(1, Math.ceil(sortedRows.length / rowsPerPage));
  const paginatedRows = sortedRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

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


  const refreshData = async () => {
    setLoading(true);
    setError(null);
    setSortDir('desc');
    setSortBy('id');
    await fetchData(client?.clientId);
    setLoading(false);
  };

  return (
    <div className="max-w-[1800px] mx-auto p-6 min-h-screen bg-white font-inter">
      {/* Header */}
      <div className=" border-2 border-[#00c193] p-6 mb-8 text-black"
      style={{ borderRadius: 'calc(var(--radius) - 6px)' }}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="custom-title flex items-center gap-2">
              <FaChartLine /> Enterprise case log
            </h1>
            <p className="opacity-90 custom-subtitle">Enterprise Ideas log</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => downloadReport('csv')}
              className=" px-4 py-2 flex items-center gap-2 transition custom-btn btn-md "
              style={{ borderRadius: 'calc(var(--radius) - 6px)' }}
            >
              <FaTable /> CSV
            </button>
            <button
              onClick={() => downloadReport('xlsx')}
              className="px-4 py-2 flex items-center gap-2 transition custom-btn btn-md "
              style={{ borderRadius: 'calc(var(--radius) - 6px)' }}
            >
              <FaTable /> Excel
            </button>
            <button
              onClick={() => refreshData()}
              className="px-4 py-2 flex items-center gap-2 transition custom-btn btn-md "
              style={{ borderRadius: 'calc(var(--radius) - 6px)' }}
            >
              <FaSyncAlt /> Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-xl border border-gray-200 overflow-hidden"
      style={{ borderRadius: 'calc(var(--radius) - 6px)' }}>
        <div className="p-6 border-b border-gray-200 bg-white flex justify-between items-center">
          {/* <h2 className="text-2xl font-bold flex items-center gap-2">
            <FaTable />Activity Report
          </h2> */}
          {/* <span className="text-[#00c193] font-semibold flex items-center gap-1 text-sm">
            <FaArrowUp /> Updated just now
          </span> */}
        </div>

        {loading && <div className="p-6 text-center text-gray-500">Loading...</div>}
        {error && <div className="p-6 text-center text-red-500">Failed: {error}</div>}
        
        {!loading && !error && paginatedRows.length === 0 && (
          <div className="p-6 text-center text-gray-500">No data available.</div>
        )}
        {!loading && !error && paginatedRows.length > 0 && (
          <>
            <IdeaBoardTable
              qnaKeys={qnaKeys}
              rows={paginatedRows}
              loadingLike={loadingLike}
              onLike={handleLike}
              onSelectRow={setSelectedRow}
              onlyClientSetup={onlyclientsetup}
              onThumbupOrThumbdown={onThumbupOrThumbdown}
              sortBy={sortBy}
              sortDir={sortDir}
              toggleSortVotes={toggleSortVotes}
              onQnaUpdated={(rowId, question, answer) => {
                setRows(prev =>
                  prev.map(r => {
                    if (r.id !== rowId) return r;

                    return {
                      ...r,
                      qna: {
                        ...r.qna,
                        [question]: answer.answer,
                      },
                      odered_qna: {
                        ...r.odered_qna,
                        [question]: answer,
                      }
                    };
                  })
                );
              }}
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
