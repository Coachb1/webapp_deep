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
        className={`custom-btn btn-sm page-btn px-4 py-2 font-bold border border-[#00c193] transition-all duration-300 ${
          currentPage === 1
            ? "bg-white text-gray-500 cursor-not-allowed"
            : "bg-white text-black hover:bg-gray-300"
        }`}
        // style={{ borderRadius: 'calc(var(--radius) - 6px)' }}
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, idx) => (
        <button
          key={idx}
          onClick={() => onPageChange(idx + 1)}
          className={`custom-btn btn-sm page-btn w-8 h-8 font-bold border border-[#00c193] transition-all duration-300 ${
            currentPage === idx + 1
              ? "page-btn-active"
              : "page-btn-inactive"
          }`}
          style={{ borderRadius: '6px' }}
        >
          {idx + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`custom-btn btn-sm px-4 py-2 font-bold border border-[#00c193] transition-all duration-300 ${
          currentPage === totalPages
            ? "bg-white text-gray-500 cursor-not-allowed"
            : "bg-white text-black hover:bg-gray-300"
        }`}
        // style={{ borderRadius: 'calc(var(--radius) - 6px)' }}
      >
        Next
      </button>
    </div>
  );
}
