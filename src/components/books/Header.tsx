import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/books/ui/dialogg";
import { Button } from "@/components/books/ui/buttonn";
import { Input } from "@/components/books/ui/input";

const Header = ({packageCourseId}: {packageCourseId: string}) => {
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [password, setPassword] = useState("");

  // ✅ Leader Board login check
  const handlePasswordSubmit = (packageCourseId: string) => {
    if (password === "bookdemo#12345") {
      // Open Leader Report after successful login
      window.open(`/library-bot/bookReport/?package_course_id=${packageCourseId}`, "_blank");
      setShowReportDialog(false);
      setPassword("");
    } else {
      alert("❌ Wrong password, try again!");
      setPassword("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // prevents accidental form submit
      handlePasswordSubmit(packageCourseId);
    }
  };

  // ✅ Idea Board button → API + redirect
  const handleIdeaBoardClick = async () => {
    try {
      const res = await fetch("/api/idea-board", { method: "GET" });
      if (!res.ok) throw new Error("Failed to fetch Idea Board data");

      const data = await res.json();
      console.log("Idea Board API Response:", data);

      // Navigate (same tab)
      window.location.href = "/components/app/library-bot/job-aid";

      // OR open new tab:
      // window.open("/components/app/library-bot/job-aid", "_blank");
    } catch (err) {
      console.error("Error loading Idea Board:", err);
      alert("⚠️ Could not load Idea Board, please try again later.");
    }
  };

  return (
    <>
      <header className="site-header">
        <div className="container nav">
          <div className="brand">
            <h1
              id="heading"
              className="w-fit border-2 border-[#2DC092] p-[3px] text-xl max-sm:text-[12px] font-extrabold text-[#2DC092] z-10"
            >
              <span className="mr-[4px] bg-[#2DC092] p-[4px] text-lg max-sm:text-[12px] font-bold text-white">
                COACH
              </span>
              BOT
            </h1>
          </div>
          <div className="flex gap-2">
            {/* ✅ Idea Board button (with API) */}
            <Button
              onClick={() => setShowReportDialog(true)}
              className="bg-[#00c193] hover:bg-[#069473] border-none rounded-lg px-5 py-2 text-sm font-bold text-white shadow-md transition-colors duration-300"
            >
              Leader Board
            </Button>

            {/* ✅ Leader Board button (with password dialog) */}
            <Button
              onClick={() =>
                window.open(`/library-bot/leaderboardReport/?jobaid=e4f6b3d1-50e7-4aae-a8d7-5a83b0a609a2&email=${window.user?.email}`, "_blank")
              }
              className="bg-[#00c193] hover:bg-[#069473] border-none rounded-lg px-5 py-2 text-sm font-bold text-white shadow-md transition-colors duration-300"
            >
              Idea Board
            </Button>
          </div>
        </div>
      </header>

      {/* ✅ Password Dialog for Leader Board */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="email-box">
          <DialogHeader>
            <DialogTitle>Please enter your admin password</DialogTitle>
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
            <Button onClick={() => handlePasswordSubmit(packageCourseId)} className="w-full">
              Enter
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
