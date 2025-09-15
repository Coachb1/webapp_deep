import { IoClose } from "react-icons/io5";
import { RowData } from "./ideaboardReport";

interface Props {
  row: RowData | null;
  onClose: () => void;
}

export default function IdeaBoardModal({ row, onClose }: Props) {
  if (!row) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: "85vh" }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl p-1"
          aria-label="Close"
        >
          <IoClose size={22} />
        </button>

        <div className="p-6 flex flex-col gap-4">
          <h3 className="text-xl font-bold mb-1">{row.qna?.["Idea Name"] || "Details"}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(row.qna).map(([key, value]) => (
              <div key={key}>
                <h4 className="text-sm font-semibold text-gray-500">{key}</h4>
                <div className="mt-1 text-gray-800">{value || "-"}</div>
              </div>
            ))}

            <div>
              <h4 className="text-sm font-semibold text-gray-500">Risks</h4>
              <div className="mt-1 text-gray-800">{row.risks}</div>
            </div>
          </div>

          {row.qna?.["Idea Details"] && (
            <div>
              <h4 className="text-sm font-semibold text-gray-500 mb-2">Idea Details</h4>
              <div className="prose max-h-[50vh] overflow-y-auto pr-3 text-gray-700 leading-relaxed">
                {row.qna["Idea Details"]}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
