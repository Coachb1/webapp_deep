import { FaThumbsUp } from "react-icons/fa";
import { RowData } from "./ideaboardReport";

interface Props {
  qnaKeys: string[];
  rows: RowData[];
  loadingLike: number | null;
  onLike: (row: RowData) => void;
  onSelectRow: (row: object | null) => void;
}

export default function IdeaBoardTable({ qnaKeys, rows, loadingLike, onLike, onSelectRow }: Props) {
  return (
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
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-50">
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
                        onClick={() => onSelectRow({[key]: row.qna[key]})}
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

              <td className="px-6 py-4 text-center text-gray-600">{row.risks}</td>

              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => onLike(row)}
                  disabled={loadingLike === row.id}
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-md border ${
                    row.liked ? "bg-[#00c193]/20 border-[#00c193]" : "bg-white"
                  } ${loadingLike === row.id ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {loadingLike === row.id ? (
                    <span className="text-gray-400 text-sm">...</span>
                  ) : (
                    <>
                      <FaThumbsUp className={row.liked ? "text-[#00c193]" : "text-gray-600"} />
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
  );
}
