// import { useState } from "react";
// import { Dialog,DialogContent,DialogHeader,DialogTitle,}
// from "@/components/books/ui/dialogg";
// import { Button } from "@/components/books/ui/buttonn";
// import { Input } from "@/components/books/ui/input";

// const Header = ({packageCourseId}: {packageCourseId: string}) => {
//   const [showReportDialog, setShowReportDialog] = useState(false);
//   const [password, setPassword] = useState("");

//   // ✅ Leader Board login check
//   const handlePasswordSubmit = (packageCourseId: string) => {
//     if (password === "bookdemo#12345") {
//       // Open Leader Report after successful login
//       window.open(`/library-bot/bookReport/?package_course_id=${packageCourseId}`, "_blank");
//       setShowReportDialog(false);
//       setPassword("");
//     } else {
//       alert("❌ Wrong password, try again!");
//       setPassword("");
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       e.preventDefault(); // prevents accidental form submit
//       handlePasswordSubmit(packageCourseId);
//     }
//   };

//   // ✅ Idea Board button → API + redirect
//   const handleIdeaBoardClick = async () => {
//     try {
//       const res = await fetch("/api/idea-board", { method: "GET" });
//       if (!res.ok) throw new Error("Failed to fetch Idea Board data");

//       const data = await res.json();
//       console.log("Idea Board API Response:", data);

//       window.location.href = "/components/app/library-bot/job-aid";
//     } catch (err) {
//       console.error("Error loading Idea Board:", err);
//       alert("⚠️ Could not load Idea Board, please try again later.");
//     }
//   };

//   return (
//     <>
//       {/* ✅ Header */}
//       <header className="w-full border-b border-gray-200 bg-white">
//         <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-3 sm:flex-row sm:gap-0">
//           {/* Brand Logo */}
//           <h1
//             id="heading"
//             className="w-fit border-2 border-[#2DC092] px-2 py-1 text-lg font-extrabold text-[#2DC092] sm:text-xl"
//           >
//             <span className="mr-1 bg-[#2DC092] px-2 py-1 text-base font-bold text-white sm:text-lg">
//               COACH
//             </span>
//             BOT
//           </h1>

//           {/* Buttons Section */}
//           <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-3">
//             {/* Leader Board Button (with password dialog) */}
//             <Button
//               onClick={() => setShowReportDialog(true)}
//               className="w-full rounded-lg bg-[#00c193] px-5 py-2 text-sm font-bold text-white shadow-md transition-colors duration-300 hover:bg-[#069473] sm:w-auto"
//             >
//               Leader Board
//             </Button>

//             {/* Idea Board Button */}
//             <Button
//               onClick={() =>
//                 window.open(
//                   `/library-bot/leaderboardReport/?jobaid=e4f6b3d1-50e7-4aae-a8d7-5a83b0a609a2&email=${window.user?.email}`,
//                   "_blank"
//                 )
//               }
//               className="w-full rounded-lg bg-[#00c193] px-5 py-2 text-sm font-bold text-white shadow-md transition-colors duration-300 hover:bg-[#069473] sm:w-auto"
//             >
//               Idea Board
//             </Button>
//           </div>
//         </div>
//       </header>

//       {/* ✅ Password Dialog */}
//       <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
//         {/* <DialogContent className="email-box w-[90%] max-w-sm"> */}
//          <DialogContent className=" w-[90%] max-w-sm">
//           <DialogHeader>
//             <DialogTitle className="text-center text-lg font-semibold">
//               Please enter your admin password
//             </DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4">
//             <Input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Enter your password..."
//               className="w-full"
//             />
//             <Button onClick={() => handlePasswordSubmit(packageCourseId)} className="w-full">
//               Enter
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default Header;

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/books/ui/dialogg";
import { Button } from "@/components/books/ui/buttonn";
import { Input } from "@/components/books/ui/input";

const Header = ({ packageCourseId }: { packageCourseId: string }) => {
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [password, setPassword] = useState("");

  // ✅ Leader Board login check
  const handlePasswordSubmit = (packageCourseId: string) => {
    // if (password === "bookdemo#12345") {
      window.open(
        `/library-bot/bookReport/?package_course_id=${packageCourseId}`,
        "_blank"
      );
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
              onClick={() => handlePasswordSubmit(packageCourseId)}
              className="w-full rounded-lg bg-[#00c193] px-5 py-2 text-sm font-bold text-white shadow-md transition-colors duration-300 hover:bg-[#069473] sm:w-auto"
            >
              LeaderBoard
            </Button>

            {/* Idea Board Button */}
            <Button
              onClick={() =>
                window.open(
                  `/library-bot/leaderboardReport/?jobaid=e4f6b3d1-50e7-4aae-a8d7-5a83b0a609a2&email=${window.user?.email}`,
                  "_blank"
                )
              }
              className="w-full rounded-lg bg-[#00c193] px-5 py-2 text-sm font-bold text-white shadow-md transition-colors duration-300 hover:bg-[#069473] sm:w-auto"
            >
              IdeaBoard
            </Button>
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
