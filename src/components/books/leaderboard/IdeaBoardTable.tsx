import React, { useState } from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { RowData } from "./ideaboardReport";
import { updateJobaidSessionQna } from "@/lib/job-aid-apis";
import IframeViewer from "../IframeViewer";

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
  onQnaUpdated: (
    rowId: number,
    question: string,
    answer: any
  ) => void;

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
  toggleSortVotes,
  onQnaUpdated,
}: Props) {
  const [showReport, setShowReport] = useState(false);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [editModal, setEditModal] = useState<{
    row: RowData | null;
    key: string | null;
    value: any | null;
  }>({
    row: null,
    key: null,
    value: "",
  });


  const handleSaveEdit = async () => {
  if (!editModal.row || !editModal.key) return;
  setSaving(true);
  const session_id = editModal.row.uid;
  const editableQna = Object.values(
    editModal.row.odered_qna || {}
  )
    .filter(q => q.question_type !== "resource")
    .reduce((acc: Record<string, any>, q) => {
      acc[q.question] = q.answer;
      return acc;
    }, {});  
    
    const updatedQna = {
    ...editableQna,
    [editModal.key]: editModal.value.answer,
  };

  console.log('udpated qna', updatedQna, editableQna)


  try {
    await updateJobaidSessionQna(session_id, updatedQna);

    // 🔥 Optimistic local update
    onQnaUpdated?.(
      editModal.row.id,
      editModal.key,
      editModal.value
    );

    setEditModal({ row: null, key: null, value: "" });
  } catch (err) {
    console.error("Failed updating QnA", err);
  } finally {
    setSaving(false);
  }
};
  return (
  <div className="w-full px-8 pt-6">
    {/* ================= TOP ACTION BAR ================= */}
    <div className="flex justify-between items-center mb-4">
      <div />
    </div>

    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        {/* ================= HEADER ================= */}
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-bold custom-title border-b border-gray-200">
          <tr>
            {qnaKeys.map((key) => {
              const sampleItem = rows[0]?.odered_qna?.[key];

              const isGrayHeader =
                key === "Innovation Score" ||
                sampleItem?.question_type === "resource";

              return (
                <th
                  key={key}
                  className={`px-3 py-2 text-center w-[160px]
                    ${isGrayHeader ? "bg-gray-200" : ""}
                  `}
                >
                  {key === "Innovation Score" ? "Impact Score" : key}
                </th>
              );
            })}

            {/* Vote column */}
            <th className="px-3 py-2 text-center w-[120px]">
              <button
                onClick={toggleSortVotes}
                className="inline-flex items-center gap-2"
              >
                Vote
                {sortBy === "votes" ? (
                  <span className="text-xs">
                    ({sortDir === "asc" ? "↑" : "↓"})
                  </span>
                ) : (
                  <span className="text-xs">(↑↓)</span>
                )}
              </button>
            </th>
          </tr>
        </thead>

        {/* ================= BODY ================= */}
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-gray-300 hover:bg-gray-50"
            >
              {qnaKeys.map((key) => {
                /* ---------- STATIC FIELDS ---------- */
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

                /* ---------- DYNAMIC QNA ---------- */
                const qnaItem = row.odered_qna?.[key];
                const value = qnaItem?.answer || "-";

                const isResource =
                  qnaItem?.question_type === "resource";

                const isEditable =
                  qnaItem?.question_type === "editable";

                const isGrayed =
                  key === "Innovation Score" || isResource;
                return (
                  <td
                    key={key}
                    className={`px-6 py-4 text-center max-w-[220px]
                      ${
                        isGrayed
                          ? "bg-gray-200/40 font-medium text-gray-700"
                          : "text-gray-600"
                      }
                    `}
                  >
                    {/* ===== RESOURCE COLUMN ===== */}
                    {isResource ? (
                      <button
                        onClick={() => {
                          setSelectedRow(value);
                          setShowReport(true);
                        }}
                        className="custom-btn inline-flex items-center gap-2 px-3 py-1 
                        bg-[#00c193] text-white rounded-md hover:bg-[#00c193]/90 transition"
                      >
                        View
                      </button>
                    ) : isEditable ? (
                      /* ===== EDITABLE COLUMN ===== */
                      <div className="max-w-[220px]">
                        <div className="px-6 py-4 text-left font-medium text-gray-800 whitespace-nowrap">
                          {value || "—"}
                        </div>

                        <button
                          onClick={() => {
                          setEditModal({
                              row,
                              key,
                              value: {...qnaItem, answer: value}

                            })
                          }
                            
                          }
                          className="text-[#00c193] text-xs mt-2 hover:underline"
                        >
                          {value.length > 1 ? "Edit" : "Add"}
                        </button>
                      </div>

                    ) : (
                      /* ===== NORMAL TEXT ===== */
                      <>
                        <div className="line-clamp-2 overflow-hidden text-ellipsis">
                          {value}
                        </div>

                        {value.length > 80 && (
                          <button
                            onClick={() =>
                              onSelectRow({ [key]: value })
                            }
                            className="ml-2 text-[#00c193] underline text-sm"
                          >
                            More
                          </button>
                        )}
                      </>
                    )}
                  </td>
                );
              })}

              {/* ================= VOTES ================= */}
              <td className="px-6 py-4 text-center">
                {onlyClientSetup ? (
                  <div className="inline-flex items-center gap-3">
                    <button
                      onClick={() =>
                        onThumbupOrThumbdown(row, "thumbup")
                      }
                      className="p-2 rounded-md border"
                    >
                      <FaThumbsUp />
                    </button>

                    <span className="font-semibold text-gray-700 w-6 text-center">
                      {row.likes}
                    </span>

                    <button
                      onClick={() =>
                        onThumbupOrThumbdown(row, "thumbdown")
                      }
                      className="p-2 rounded-md border"
                    >
                      <FaThumbsDown />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onLike(row)}
                    disabled={loadingLike === row.id}
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-md border
                      ${
                        row.liked
                          ? "bg-[#00c193]/20 border-[#00c193]"
                          : "bg-white"
                      }`}
                  >
                    <FaThumbsUp
                      className={
                        row.liked
                          ? "text-[#00c193]"
                          : "text-gray-600"
                      }
                    />
                    <span className="font-semibold">
                      {row.likes}
                    </span>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= REPORT MODAL ================= */}
      {showReport && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowReport(false)}
        >
          <div
            className="bg-white w-full max-w-5xl h-[80vh] rounded-2xl shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                Preview
              </h3>

              <button onClick={() => setShowReport(false)}>
                ✕
              </button>
            </div>

            <div className="flex-1">
              <IframeViewer  url={selectedRow!} title="Preview" />
            </div>
          </div>
        </div>
      )}

      {editModal.row && editModal.key && (
  <div
    className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
    onClick={() =>
      setEditModal({ row: null, key: null, value: "" })
    }
  >
    <div
      className="bg-white w-[600px] rounded-xl shadow-xl p-6"
      onClick={(e) => e.stopPropagation()}
    >
      <h3 className="text-lg font-semibold mb-4">
        Edit: {editModal.key}
      </h3>

      <textarea
        rows={8}
        value={editModal.value.answer}
        onChange={(e) =>
          setEditModal((prev) => ({
            ...prev,
            value: {...prev.value, answer: e.target.value},
          }))
        }
        className="w-full border rounded-md p-3 focus:ring-2 focus:ring-[#00c193]"
      />

      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={() =>
            setEditModal({ row: null, key: null, value: "" })
          }
          className="px-4 py-2 border rounded-md"
        >
          Cancel
        </button>

        <button
          onClick={handleSaveEdit}
          className="custom-btn px-4 py-2 bg-[#00c193] text-white rounded-md"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  </div>
);
}
