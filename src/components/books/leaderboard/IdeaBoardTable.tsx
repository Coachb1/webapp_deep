import React, { useState } from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { RowData } from "./ideaboardReport";

interface Props {
  qnaKeys: string[];
  rows: RowData[];
  loadingLike: number | null;
  onLike: (row: RowData) => void;
  onSelectRow: (row: object | null) => void;
  onlyClientSetup: boolean;
  onThumbupOrThumbdown: (row: RowData, type: "thumbup" | "thumbdown") => void;
  sortBy: string;
  sortDir: string;
  toggleSortVotes: () => void;

}
export default function IdeaBoardTable({
  qnaKeys,
  rows,
  loadingLike,
  onLike,
  onSelectRow,
  onlyClientSetup,
  onThumbupOrThumbdown,
  sortBy,
  sortDir,
  toggleSortVotes
}: Props) {
  const [showReport, setShowReport] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const [officeInputs, setOfficeInputs] = useState<{
    [rowId: number]: {
      dept?: string;
      cio?: string;
      cfo?: string;
      ciso?: string;
    };
  }>({});
  const handleOfficeInputChange = (
    rowId: number,
    field: "dept" | "cio" | "cfo" | "ciso",
    value: string
  ) => {
    setOfficeInputs((prev) => ({
      ...prev,
      [rowId]: {
        ...prev[rowId],
        [field]: value,
      },
    }));
  };
  const hasChanges = Object.values(officeInputs).some((row) =>
    row?.dept || row?.cio || row?.cfo || row?.ciso
  );
  const [editModal, setEditModal] = useState<{
    rowId: number | null;
    field: "dept" | "cio" | "cfo" | "ciso" | null;
  }>({
    rowId: null,
    field: null,
  });
  const openEditModal = (
    rowId: number,
    field: "dept" | "cio" | "cfo" | "ciso"
  ) => {
    setEditModal({ rowId, field });
  };
  return (
    <div className="w-full px-8 pt-6">

      {/* Top Action Bar */}
      <div className="flex justify-between items-center mb-4">
        <div></div> {/* left empty space (optional title area) */}

        {hasChanges && (
          <button
            onClick={() => console.log("Update clicked", officeInputs)}
            className={`custom-btn px-5 py-2 bg-[#00c193] text-white rounded-md 
             transition-all duration-300 font-medium shadow-sm
             ${hasChanges ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            Update
          </button>
        )}
      </div>
      <div className="overflow-x-auto">

        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-bold custom-title border-b border-gray-200">
            <tr>
              {qnaKeys.map((key) => {
                const smallColumns = [
                  "Innovation Score",
                  "Impact Area",
                  "Full Name"
                ];
                const isGrayHeader = key === "Innovation Score";
                return (
                  <th
                    key={key}
                    className={`px-3 py-2 text-center 
                      ${smallColumns.includes(key) ? "w-[90px]" : "w-[160px]"}
                      ${isGrayHeader ? "bg-gray-200" : ""}
                    `}
                  >
                    {key}
                  </th>
                );
              })}
              <th className="px-3 py-2 text-center w-[100px] bg-gray-200">Decision & Ownership Context</th>
              <th className="px-3 py-2 text-center w-[100px] bg-gray-200">Risk, Governance & Data</th>
              <th className="px-3 py-2 text-center w-[100px] bg-gray-200">Value & Execution Path</th>
              <th className="px-3 py-2 text-center w-[180px] bg-gray-100">
                Dept Lead Inputs
              </th>
              <th className="px-3 py-2 text-center w-[180px] bg-gray-100">
                CIO Office Inputs
              </th>
              <th className="px-3 py-2 text-center w-[180px] bg-gray-100">
                CFO Office Inputs
              </th>
              <th className="px-3 py-2 text-center w-[180px] bg-gray-100">
                CISO Office Inputs
              </th>
              <th className="px-3 py-2 text-center w-[120px]">
                <button
                  onClick={toggleSortVotes}
                  className="inline-flex items-center gap-2"
                  aria-label="Sort by votes"
                >
                  Vote
                  {sortBy === "votes" ? (
                    <span className="text-xs">({sortDir === "asc" ? "↑" : "↓"})</span>
                  ) : (
                    <span className="text-xs">({sortBy === "id" ? "↑↓" : ""})</span>
                  )}
                </button>
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-300 hover:bg-gray-50"
              >
                {qnaKeys.map((key) => {
                  if (key === "Full Name") {
                    return (
                      <td
                        key={key}
                        className="px-6 py-4 text-left font-medium text-gray-800 whitespace-nowrap"
                      >
                        {row.full_name}
                      </td>
                    );
                  }
                  if (key === "Email") {
                    return <td key={key}>{row.email}</td>;
                  }
                  const value = row.qna[key] || "-";
                  return (
                    <td
                      key={key}
                      className={`px-6 py-4 text-center text-gray-600 max-w-[200px] 
                        ${key === "Innovation Score" ? "bg-gray-200/40" : ""}
                      `}
                    >
                      <div className="line-clamp-2 overflow-hidden text-ellipsis">
                        {value}
                      </div>

                      {value && value.length > 80 && (
                        <button
                          onClick={() => onSelectRow({ [key]: value })}
                          className="ml-2 text-[#00c193] underline text-sm"
                        >
                          More
                        </button>
                      )}
                    </td>
                  );
                })}
                {/* A Column */}
                <td className="px-6 py-4 text-center bg-gray-200/40">
                  <button
                    onClick={() => {
                      setSelectedRow(row);
                      setShowReport(true);
                    }}
                    className="custom-btn inline-flex items-center gap-2 px-3 py-1 
               bg-[#00c193] text-white 
               rounded-md hover:bg-[#00c193]/90 transition"
                  >
                    View
                  </button>
                </td>

                {/* B Column */}
                <td className="px-6 py-4 text-center bg-gray-200/40">
                  <button
                    onClick={() => {
                      setSelectedRow(row);
                      setShowReport(true);
                    }}
                    className="custom-btn inline-flex items-center gap-2 px-3 py-1 
               bg-[#00c193] text-white 
               rounded-md hover:bg-[#00c193]/90 transition"
                  >
                    View
                  </button>
                </td>

                {/* C Column */}
                <td className="px-6 py-4 text-center bg-gray-200/40">
                  <button
                    onClick={() => {
                      setSelectedRow(row);
                      setShowReport(true);
                    }}
                    className="custom-btn inline-flex items-center gap-2 px-3 py-1 
               bg-[#00c193] text-white 
               rounded-md hover:bg-[#00c193]/90 transition"
                  >
                    View
                  </button>
                </td>
                <td className="px-4 py-4">
                  <div className="max-w-[220px]">
                    <div className="line-clamp-2 text-sm text-gray-700">
                      {officeInputs[row.id]?.dept || "—"}
                    </div>

                    <button
                      onClick={() => openEditModal(row.id, "dept")}
                      className="text-[#00c193] text-xs mt-2 hover:underline"
                    >
                      {officeInputs[row.id]?.dept ? "Edit" : "Add"}
                    </button>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="max-w-[220px]">
                    <div className="line-clamp-2 text-sm text-gray-700">
                      {officeInputs[row.id]?.cio || "—"}
                    </div>

                    <button
                      onClick={() => openEditModal(row.id, "cio")}
                      className="text-[#00c193] text-xs mt-2 hover:underline"
                    >
                      {officeInputs[row.id]?.cio ? "Edit" : "Add"}
                    </button>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="max-w-[220px]">
                    <div className="line-clamp-2 text-sm text-gray-700">
                      {officeInputs[row.id]?.cfo || "—"}
                    </div>

                    <button
                      onClick={() => openEditModal(row.id, "cfo")}
                      className="text-[#00c193] text-xs mt-2 hover:underline"
                    >
                      {officeInputs[row.id]?.cfo ? "Edit" : "Add"}
                    </button>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="max-w-[220px]">
                    <div className="line-clamp-2 text-sm text-gray-700">
                      {officeInputs[row.id]?.ciso || "—"}
                    </div>

                    <button
                      onClick={() => openEditModal(row.id, "ciso")}
                      className="text-[#00c193] text-xs mt-2 hover:underline"
                    >
                      {officeInputs[row.id]?.ciso ? "Edit" : "Add"}
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  {onlyClientSetup ? (
                    /* 🟢 CLIENT-SIDE VOTING */
                    <div className="inline-flex items-center gap-3">
                      {/* 👍 UP */}
                      <button
                        onClick={() => onThumbupOrThumbdown(row, "thumbup")}
                        className={`p-2 rounded-md border 
                              ${loadingLike === row.id ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <FaThumbsUp />
                      </button>

                      {/* COUNT */}
                      <span className="font-semibold text-gray-700 w-6 text-center">
                        {row.likes}
                      </span>

                      {/* 👎 DOWN */}
                      <button
                        onClick={() => onThumbupOrThumbdown(row, "thumbdown")}
                        className={`p-2 rounded-md border 
                              ${loadingLike === row.id ? "opacity-50 cursor-not-allowed" : ""}`}
                      >
                        <FaThumbsDown />
                      </button>
                    </div>
                  ) : (
                    /* 🔵 EXISTING SERVER UPVOTE */
                    <button
                      onClick={() => onLike(row)}
                      disabled={loadingLike === row.id}
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-md border
                              ${row.liked ? "bg-[#00c193]/20 border-[#00c193]" : "bg-white"}
                              ${loadingLike === row.id ? "opacity-50 cursor-not-allowed" : ""}
                            `}
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
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {
          showReport && (
            <div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm 
               flex items-center justify-center p-4"
              onClick={() => setShowReport(false)}
            >
              <div
                className="bg-white w-full max-w-5xl h-[80vh] 
                 rounded-2xl shadow-xl flex flex-col relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Report Preview
                  </h3>

                  <button
                    onClick={() => setShowReport(false)}
                    className="text-gray-500 hover:text-red-500 transition"
                  >
                    ✕
                  </button>
                </div>

                {/* Iframe */}
                <div className="flex-1">
                  <iframe
                    src="https://www.w3schools.com"  // static for now
                    className="w-full h-full rounded-b-2xl"
                  />
                </div>
              </div>
            </div>
          )
        }
        {editModal.rowId !== null && editModal.field && (
          <div
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
            onClick={() => setEditModal({ rowId: null, field: null })}
          >
            <div
              className="bg-white w-[600px] rounded-xl shadow-xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">
                {editModal.field.toUpperCase()} Input
              </h3>

              <textarea
                rows={8}
                value={
                  officeInputs[editModal.rowId]?.[editModal.field] || ""
                }
                onChange={(e) =>
                  handleOfficeInputChange(
                    editModal.rowId!,
                    editModal.field!,
                    e.target.value
                  )
                }
                className="w-full border rounded-md p-3 focus:ring-2 focus:ring-[#00c193]"
              />

              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setEditModal({ rowId: null, field: null })}
                  className="custom-btn px-4 py-2 bg-[#00c193] text-white rounded-md"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
