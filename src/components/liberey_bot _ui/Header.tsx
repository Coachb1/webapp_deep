import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/liberey_bot _ui/ui/dialogg";
import { Button } from "@/components/liberey_bot _ui/ui/buttonn";
import { Input } from "@/components/liberey_bot _ui/ui/input";

const Header = () => {
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [password, setPassword] = useState("");

  // ✅ Leader Board login check
  const handlePasswordSubmit = () => {
    if (password === "bookdemo#12345") {
      // Open Leader Report after successful login
      window.open("http://localhost:3001/leaderReport", "_blank");
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
      handlePasswordSubmit();
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
            <img
              src="assets/CoachBot-logo-1.png"
              alt="Book Club Logo"
              style={{ height: "50px", width: "auto" }}
            />
          </div>
          <div className="flex gap-2">
            {/* ✅ Idea Board button (with API) */}
            <Button
              onClick={() => setShowReportDialog(true)}
              className="bg-[#00c193] hover:bg-[#069473] border-none rounded-lg px-5 py-2 text-sm font-bold text-white shadow-md transition-colors duration-300"
            >
              Idea Board
            </Button>

            {/* ✅ Leader Board button (with password dialog) */}
            <Button
              className="bg-[#00c193] hover:bg-[#069473] border-none rounded-lg px-5 py-2 text-sm font-bold text-white shadow-md transition-colors duration-300"
            >
              Leader Board
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
