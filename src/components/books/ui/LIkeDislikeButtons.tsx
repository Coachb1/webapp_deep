import { motion } from "framer-motion";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";

interface ThumbVoteButtonProps {
  count: number;
  onVote: (value: 1 | -1) => void;
  loading: boolean;
}

export default function ThumbVoteButton({
  count,
  onVote,
  loading,
}: ThumbVoteButtonProps) {
  return (
    <div className="flex items-center gap-0 mb-2 border-2 border-[#00c193]-500 rounded-full px-1 py-0.5 bg-white">

      {/* 👍 THUMB UP */}
      <motion.button
        type="button"
        whileTap={!loading ? { scale: 0.85 } : undefined}
        whileHover={!loading ? { scale: 1.05 } : undefined}
        onClick={() => onVote(1)}
        disabled={loading}
        className={`flex items-center justify-center w-5 h-5 rounded-full border transition
          ${loading
            ? "bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed"
            : "bg-white border-gray-300 hover:border-[#00c193]"
          }
        `}
      >
        <FaThumbsUp
          className="text-[#00c193] text-sm pointer-events-none"
        />
      </motion.button>

      {/* COUNT */}
      <div className="w-6 text-center select-none">
        {loading ? (
          <motion.span
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-gray-400 font-semibold"
          >
            •••
          </motion.span>
        ) : (
          <span className="text-xs font-semibold text-gray-700">{count}</span>
        )}
      </div>

      {/* 👎 THUMB DOWN */}
      <motion.button
        type="button"
        whileTap={!loading && count > 0 ? { scale: 0.85 } : undefined}
        whileHover={!loading && count > 0 ? { scale: 1.05 } : undefined}
        onClick={() => onVote(-1)}
        disabled={loading || count <= 0}
        className={`flex items-center justify-center w-5 h-5 rounded-full border transition
          ${loading || count <= 0
            ? "bg-gray-100 border-gray-200 opacity-60 cursor-not-allowed"
            : "bg-white border-gray-300 hover:border-red-400"
          }
        `}
      >
        <FaThumbsDown
          className="text-red-500 text-sm pointer-events-none"
        />
      </motion.button>

    </div>
  );
}
