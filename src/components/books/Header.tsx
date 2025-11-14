import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/books/ui/dialogg";
import { Button } from "@/components/books/ui/buttonn";
import { Input } from "@/components/books/ui/input";
import { usePortalUser } from "./context/UserContext";
import Link from "next/link";

const Header = ({ packageCourseId, jobaidId }: { packageCourseId: string, jobaidId: string|null }) => {
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [password, setPassword] = useState("");
  const { user } = usePortalUser(); // Assuming useUser is imported from context

  // ✅ Leader Board login check
  const handlePasswordSubmit = (packageCourseId: string) => {
    // if (password === "bookdemo#12345") {
    const newWindow = window.open(
      `/library-bot/leaderBoardReport/?package_course_id=${packageCourseId}`,
      "_blank",
      "noopener,noreferrer"
    );
    if (newWindow) newWindow.opener = null; // extra safety
    setShowReportDialog(false);
    setPassword("");
    // } else {
    //   alert("❌ Wrong password, try again!");
    //   setPassword("");
    // }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handlePasswordSubmit(packageCourseId);
    }
  };

  return (
    <>
      {/* ✅ Header */}
      <header className="w-full border-b border-gray-200 bg-white">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-3 sm:flex-row sm:gap-0">
          {/* Brand Logo */}
          <h1 className="w-fit border-2 border-[#2DC092] px-2 py-1 text-lg font-extrabold text-[#2DC092] sm:text-xl">
            <span className="mr-1 bg-[#2DC092] px-2 py-1 text-base font-bold text-white sm:text-lg">
              COACH
            </span>
            BOT
          </h1>

          {/* Buttons Section */}
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-3">
            {/* Leader Board Button */}
            <Button
              onClick={() => {
                if (packageCourseId) {
                  const url = `/library-bot/leaderBoardReport/?package_course_id=${encodeURIComponent(
                    packageCourseId
                  )}`;
                  window.open(url, "_blank", "noopener,noreferrer");
                }
              }}
              className="w-full rounded-lg bg-[#00c193] px-5 py-2 text-sm font-bold text-white shadow-md transition-colors duration-300 hover:bg-[#069473] sm:w-auto"
            >
              LeaderBoard
            </Button>

            {/* AI Pulse Report btn */}
            <Button
              onClick={() => {
                if (packageCourseId) {
                  const url = `/library-bot/AiPulseReport/?package_course_id=${encodeURIComponent(
                    packageCourseId
                  )}`;
                  window.open(url, "_blank", "noopener,noreferrer");
                }
              }}
              className="w-full rounded-lg bg-[#00c193] px-5 py-2 text-sm font-bold text-white shadow-md transition-colors duration-300 hover:bg-[#069473] sm:w-auto"
            >
              AI Pulse Report
            </Button>

            {/* Idea Board Button */}
            {jobaidId && (
              <Button
                onClick={() => {
                  if (user?.email) {
                    const url = `/library-bot/ideaboardReport/?jobaid=${jobaidId}&email=${encodeURIComponent(
                      user.email
                    )}`;
                    window.open(url, "_blank", "noopener,noreferrer");
                  }
                }}
                className="w-full rounded-lg bg-[#00c193] px-5 py-2 text-sm font-bold text-white shadow-md transition-colors duration-300 hover:bg-[#069473] sm:w-auto"
              >
                IdeaBoard
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* ✅ Password Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="w-[90%] max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-semibold">
              Please enter your admin password
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your password..."
              className="w-full"
            />
            <Button
              onClick={() => handlePasswordSubmit(packageCourseId)}
              className="w-full rounded-lg bg-[#00c193] px-5 py-2 text-sm font-bold text-white shadow-md transition-colors duration-300 hover:bg-[#069473]"
            >
              Enter
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
