
import { MdWatchLater } from "react-icons/md";

interface WatchLaterButtonProps {
  isActive: boolean;
  onToggle: () => void;
}

export default function WatchLaterButton({ isActive, onToggle }: WatchLaterButtonProps) {
  return (
    <div
      className={`
        flex items-center gap-1 px-3 py-1 transition select-none
        whitespace-nowrap border border-[#00c193]
        ${isActive ? "bg-[#00c193] text-white" : "bg-gray-200 text-black hover:bg-gray-300"}
      `}
      style={{ borderRadius: 'calc(var(--radius) - 6px)' }}
    >
      <MdWatchLater
        onClick={onToggle}
        className="text-xl cursor-pointer"
        aria-label="Watch later"
      />
      <span className="text-xs font-semibold">Let's Discuss</span>
    </div>
  );
}
