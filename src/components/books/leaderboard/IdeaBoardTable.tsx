import React, { useState, useRef, useEffect } from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { keyOrderType, RowData } from "./ideaboardReport";
import { updateJobaidSessionQna } from "@/lib/job-aid-apis";
import IframeViewer from "../IframeViewer";
import { MdAttachFile } from "react-icons/md";

interface Props {
  qnaKeys: keyOrderType[];
  rows: RowData[];
  loadingLike: number | null;
  onLike: (row: RowData) => void;
  onSelectRow: (row: object | null) => void;
  onlyClientSetup: boolean;
  onThumbupOrThumbdown: (row: RowData, type: "thumbup" | "thumbdown") => void;
  sortBy: string;
  sortDir: string;
  toggleSortVotes: () => void;
  onQnaUpdated: (rowId: number, question: string, answer: any) => void;
  sessionVoting: boolean;
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
  sessionVoting = true
}: Props) {
  const [showReport, setShowReport] = useState(false);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
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
    const editableQna = Object.values(editModal.row.odered_qna || {})
      .filter((q) => q.question_type !== "resource")
      .reduce((acc: Record<string, any>, q) => {
        acc[q.question] = q.answer;
        return acc;
      }, {});

    const updatedQna = {
      ...editableQna,
      [editModal.key]: editModal.value.answer,
    };

    console.log("udpated qna", updatedQna, editableQna);

    try {
      await updateJobaidSessionQna(session_id, updatedQna);

      // 🔥 Optimistic local update
      onQnaUpdated?.(editModal.row.id, editModal.key, editModal.value);

      setEditModal({ row: null, key: null, value: "" });
    } catch (err) {
      console.error("Failed updating QnA", err);
    } finally {
      setSaving(false);
    }
  };
  const wordCount = editModal.value?.answer?.trim()?.split(/\s+/)?.length || 0;

  // Calculate gray header columns
  const grayHeaderColumns = qnaKeys.filter(({ key, q_type }) => {
    return q_type === "innovation_score" || q_type === "resource";
  });

  const grayHeaderCount = grayHeaderColumns.length;
  const grayHeaderStartIndex = qnaKeys.findIndex(({ key, q_type }) => {
    return q_type === "innovation_score" || q_type === "resource";
  });

  const beforeGrayCount = grayHeaderStartIndex >= 0 ? grayHeaderStartIndex : 0;
  let afterGrayCount = grayHeaderStartIndex >= 0 ? qnaKeys.length - grayHeaderStartIndex - grayHeaderCount : 0;
  if (sessionVoting){
    afterGrayCount += 1;
  }

  const shouldScroll = wordCount > 100;
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";

      if (shouldScroll) {
        // Fixed height when more than 100 words
        textareaRef.current.style.height = "50vh";
      } else {
        // Auto grow when less than 100 words
        textareaRef.current.style.height =
          textareaRef.current.scrollHeight + "px";
      }
    }
  }, [editModal.value?.answer, shouldScroll]);

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
            {/* ===== GROUP HEADER ROW ===== */}
            <tr>
              {beforeGrayCount > 0 && <th colSpan={beforeGrayCount}></th>}

              {grayHeaderCount > 0 && (
                <th
                  colSpan={grayHeaderCount}
                  className="text-center"
                >
                  <div className="bg-gray-300 t font-bold py-2 rounded-md">
                    Enterprise Context Graph
                  </div>
                </th>
              )}

              {afterGrayCount > 0 && <th colSpan={afterGrayCount}></th>}

              <th></th>
            </tr>
            <tr>
              {qnaKeys.map(({ key, q_type, info }) => {
                const sampleItem = rows[0]?.odered_qna?.[key];

                const isGrayHeader =
                  sampleItem?.question_type === "resource" ||
                  q_type === "innovation_score" ||
                  q_type === "resource";
                return (
                  <th
                    key={key}
                    className={`px-3 py-2 text-center w-[160px]  ${
                      isGrayHeader ? "bg-gray-200" : ""
                      }`}
                  >
                    <div className="flex items-center justify-center gap-1 relative group">
                      <span>{key}</span>

                      {info && (
                        <>
                          <span className="text-gray-400 cursor-help text-xs">
                            ⓘ
                          </span>

                          <div
                            className="absolute z-20 hidden group-hover:block top-[-36px] left-1/2 -translate-x-1/2 
                bg-gray-900 text-white text-xs px-2 py-1 rounded-md shadow-md whitespace-nowrap"
                          >
                            {info}
                          </div>
                        </>
                      )}
                    </div>
                  </th>
                );
              })}
              <th className="px-3 py-2 text-center w-[140px]">
                Log Date
              </th>
              {/* Vote column */}
              {sessionVoting && (
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
              )}

            </tr>
          </thead>

          {/* ================= BODY ================= */}
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-300 hover:bg-gray-50"
              >
                {qnaKeys.map(({ key, q_type }) => {
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

                  // detect multiple file attachments (arrays of URLs or file objects)
                  const attachmentLinks: string[] = [];
                  const att = qnaItem?.attachments;
                  if (att && Array.isArray(att)) {
                    att.forEach((att: any) => {
                      if (typeof att === "string" && att.startsWith("http")) {
                        attachmentLinks.push(att);
                      } else if (att?.url) {
                        attachmentLinks.push(att.url);
                      }
                    });
                  }
                  const isResource = qnaItem?.question_type === "resource";

                  const isEditable = qnaItem?.question_type === "editable";

                  const isInnovationScore =
                    qnaItem?.question_type === "innovation_score";

                  const isUpdatingField = q_type === "resource";

                  const isGrayed =
                    isInnovationScore || isResource || isUpdatingField;
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
                        <>
                          {value === "-" ? (
                            "Updating..."
                          ) : (
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
                          )}
                        </>
                      ) : isEditable ? (
                        /* ===== EDITABLE COLUMN ===== */
                        <div className="max-w-[220px]">
                          <div className="text-left font-medium text-gray-800 line-clamp-2 break-words">
                            {value || "—"}
                          </div>

                          <button
                            onClick={() => {
                              setEditModal({
                                row,
                                key,
                                value: { ...qnaItem, answer: value },
                              });
                            }}
                            className="text-[#00c193] text-xs mt-2 hover:underline"
                          >
                            {value.length > 1 ? "Edit" : "Add"}
                          </button>
                        </div>
                      ) : (
                        /* ===== NORMAL TEXT ===== */
                        <>
                          <div className="line-clamp-2 overflow-hidden text-ellipsis">
                            {value === "-" && isUpdatingField
                              ? "Updating..."
                              : value}
                          </div>

                          {value.length > 80 && value !== "-" && (
                            <button
                              onClick={() => onSelectRow({ [key]: value })}
                              className="ml-2 text-[#00c193] underline text-sm"
                            >
                              More
                            </button>
                          )}

                          {/* File attachments section */}
                          {attachmentLinks.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {attachmentLinks.map((att: any, idx: number) => (
                                <button
                                  key={idx}
                                  onClick={() => {
                                    console.log("Attachment clicked:", att);
                                    const url =
                                      typeof att === "string" ? att : att.url;
                                    setSelectedRow(url);
                                    setShowReport(true);
                                  }}
                                  className="
                                    flex items-center gap-1
                                    px-2 py-1
                                    rounded-md
                                    bg-[#00c193]/10
                                    text-[#00c193]
                                    text-xs
                                    hover:bg-[#00c193]/20
                                    transition
                                  "
                                >
                                  <MdAttachFile size={14} />
                                  {/* {att.name || `${idx + 1}`} */}
                                </button>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </td>
                  );
                })}
                {/* Created Date Column */}
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  {new Date(row.created_at).toLocaleDateString()}
                </td>
                {/* ================= VOTES ================= */}
                {sessionVoting && (
                <td className="px-6 py-4 text-center">
                  {onlyClientSetup ? (
                    <div className="inline-flex items-center gap-3">
                      <button
                        onClick={() => onThumbupOrThumbdown(row, "thumbup")}
                        className="p-2 rounded-md border"
                      >
                        <FaThumbsUp />
                      </button>

                      <span className="font-semibold text-gray-700 w-6 text-center">
                        {row.likes}
                      </span>

                      <button
                        onClick={() => onThumbupOrThumbdown(row, "thumbdown")}
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
                          row.liked ? "text-[#00c193]" : "text-gray-600"
                        }
                      />
                      <span className="font-semibold">{row.likes}</span>
                    </button>
                  )}
                </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* ================= REPORT MODAL ================= */}
        {showReport && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowReport(false)}
          >
            <div
              className="bg-white rounded-lg w-full h-[100vh] flex flex-col shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-xl font-bold text-gray-800">Preview</h3>

                <button
                  onClick={() => setShowReport(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                >
                  ×
                </button>
              </div>

              {/* Body (Iframe) */}
              <div className="flex-1 overflow-hidden">
                <IframeViewer url={selectedRow!} title="Resource Preview" />
              </div>
            </div>
          </div>
        )}

        {editModal.row && editModal.key && (
          <div
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
            onClick={() => setEditModal({ row: null, key: null, value: "" })}
          >
            <div
              className="bg-white w-[90vw] max-w-[900px] rounded-xl shadow-xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">
                Edit: {editModal.key}
              </h3>

              <textarea
                ref={textareaRef}
                value={editModal.value.answer}
                onChange={(e) =>
                  setEditModal((prev) => ({
                    ...prev,
                    value: { ...prev.value, answer: e.target.value },
                  }))
                }
                className={`w-full min-h-[100px] border rounded-md p-3 focus:ring-2 focus:ring-[#00c193] ${
                  shouldScroll
                    ? "max-h-[50vh] overflow-y-auto"
                    : "overflow-hidden"
                  }`}
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
