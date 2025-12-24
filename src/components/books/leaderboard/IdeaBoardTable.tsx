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
}

export default function IdeaBoardTable({
  qnaKeys,
  rows,
  loadingLike,
  onLike,
  onSelectRow,
  onlyClientSetup,
  onThumbupOrThumbdown
}: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-bold custom-title border-b border-gray-200">
          <tr>
            {qnaKeys.map((key) => (
              <th
                key={key}
                className={`px-6 py-3 text-center 
                    min-w-[120px]
                `}
              >
                {key}
              </th>
            ))}
            <th className="px-6 py-3 text-center w-[100px]">Vote</th>
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
                    className="px-6 py-4 text-center text-gray-600 max-w-[200px]"
                  >
                    <div className="line-clamp-2 overflow-hidden text-ellipsis">
                      {row.qna[key] || "-"}
                    </div>

                    {row.qna[key] && row.qna[key].length > 80 && (
                      <button
                        onClick={() => onSelectRow({ [key]: row.qna[key] })}
                        className="ml-2 text-[#00c193] underline text-sm"
                      >
                        More
                      </button>
                    )}
                  </td>
                );
              })}

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
    </div>
  );
}
