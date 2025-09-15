interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function IdeaBoardPagination({ currentPage, totalPages, onPageChange }: Props) {
  return (
    <div className="flex justify-center items-center gap-2 py-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
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
          onClick={() => onPageChange(idx + 1)}
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
        onClick={() => onPageChange(currentPage + 1)}
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
  );
}
