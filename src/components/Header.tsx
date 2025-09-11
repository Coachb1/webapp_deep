import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialogg";
import { Button } from "@/components/ui/buttonn";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [password, setPassword] = useState("");

  const handlePasswordSubmit = () => {
    if (password === "bookdemo#12345") {
      window.open("bookreport.html", "_blank");
      setShowReportDialog(false);
      setPassword("");
    } else {
      alert("❌ Wrong password, try again!");
      setPassword("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handlePasswordSubmit();
    }
  };
  // for Idea Board  button{ like api call and then open new page}
  const handleIdeaBoardClick = async () => {
  try {
    // Call your API
    const res = await fetch("/api/idea-board", { method: "GET" });
    if (!res.ok) throw new Error("Failed to fetch Idea Board data");

    const data = await res.json();

    // ✅ Do something with the API data
    console.log("Idea Board API Response:", data);

    // Option 1: Navigate inside your app (Next.js way)
    window.location.href = "/components/app/library-bot/job-aid";

    // Option 2: Open in new tab
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
            <img
              src="assets/CoachBot-logo-1.png"
              alt="Book Club Logo"
              style={{ height: "50px", width: "auto" }}
            />
          </div>
          <div className="flex gap-2">
            {/* Report → requires password */}
            <Button
              onClick={() => setShowReportDialog(true)}
              className="bg-[#00c193] hover:bg-[#069473] border-none rounded-lg px-5 py-2 text-sm font-bold text-white shadow-md transition-colors duration-300"
            >
              Report
            </Button>

            {/* Idea Board → open directly */}
            <Button
              onClick={() => window.open("/library-bot/job-aid/e4f6b3d1-50e7-4aae-a8d7-5a83b0a609a2", "_blank")}
              className="bg-[#00c193] hover:bg-[#069473] border-none rounded-lg px-5 py-2 text-sm font-bold text-white shadow-md transition-colors duration-300"
            >
              Idea Board
            </Button>

            {/* Leader Board → open directly */}
            <Button
              onClick={() => window.open("leaderboard.html", "_blank")}
              className="bg-[#00c193] hover:bg-[#069473] border-none rounded-lg px-5 py-2 text-sm font-bold text-white shadow-md transition-colors duration-300"
            >
              Leader Board
            </Button>
          </div>
        </div>
      </header>

      {/* Password Dialog → ONLY for Report */}
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
            <Button onClick={handlePasswordSubmit} className="w-full">
              Enter
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
