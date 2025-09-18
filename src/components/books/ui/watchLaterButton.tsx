
import { MdWatchLater } from "react-icons/md";

interface WatchLaterButtonProps {
  isActive: boolean;
  onToggle: () => void;
}

export default function WatchLaterButton({ isActive, onToggle }: WatchLaterButtonProps) {
  return (
    <div
      className={`
        flex items-center gap-1 px-3 py-1 rounded-full transition select-none
        whitespace-nowrap
        ${isActive ? "bg-[#00c193] text-white" : "bg-gray-200 text-gray-700"}
      `}
    >
      <MdWatchLater
        onClick={onToggle}
        className="text-xl cursor-pointer"
        aria-label="Watch later"
      />
      <span className="text-sm">Listen Later</span>
    </div>
  );
}
