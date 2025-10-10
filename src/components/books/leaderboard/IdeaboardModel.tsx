import { IoClose } from "react-icons/io5";

interface Props {
  row: object | null;
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
              <div className="prose max-h-[50vh] overflow-y-auto pr-3 text-gray-700 leading-relaxed">
                {Object.entries(row).map(([key, value]) => (
                  <div key={key} className="mb-4">
                    <h5 className="text-sm font-semibold text-gray-600">{key}</h5>
                    <p className="text-sm mt-2">{typeof value === 'string' ? value : JSON.stringify(value)}</p>
                  </div>
                ))}
              </div>
          </div>
        </div>
      </div>
  );
}
