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
import Image from "next/image";
import { Menu, X } from "lucide-react";

const Header = ({
  packageCourseId,
  jobaidId,
  onlyClientSetup,
  clientLogoUrl,
  onAction
}: {
  packageCourseId: string;
  jobaidId: string | null;
  onlyClientSetup: boolean;
  clientLogoUrl?: string;
  onAction?: (action: string, type?:string) => void;
}) => {
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [showLeaderBoardButton, setShowLeaderBoardButton] = useState(false);
  const [showAiPulseButton, setShowAiPulseButton] = useState(false);
  const [showIdeaBoardButton, setShowIdeaBoardButton] = useState(false);
  const [LeaderBoardButtonLabel, setLeaderBoardButtonLabel] =
    useState("LeaderBoard");
  const [AiPulseButtonLabel, setAiPulseButtonLabel] =
    useState("AI Pulse Report");
  const [IdeaBoardButtonLabel, setIdeaBoardButtonLabel] =
    useState("Idea Board");

  const [password, setPassword] = useState("");
  const { user, loading, userInfo } = usePortalUser(); // Assuming useUser is imported from context
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    if (onlyClientSetup) {
      setShowLeaderBoardButton(false);
      setShowAiPulseButton(false);
    } else {
      setShowLeaderBoardButton(
        userInfo?.libraryBotConfig?.feature_and_button_controls
          ?.leaderboard_button?.show ?? false,
      );
      setShowAiPulseButton(
        userInfo?.libraryBotConfig?.feature_and_button_controls?.ai_pulse
          ?.show ?? false,
      );
    }

    setShowIdeaBoardButton(
      userInfo?.libraryBotConfig?.feature_and_button_controls?.idea_board_button
        ?.show ?? false,
    );

    setLeaderBoardButtonLabel(
      userInfo?.libraryBotConfig?.feature_and_button_controls
        ?.leaderboard_button?.label ?? "LeaderBoard",
    );
    setAiPulseButtonLabel(
      userInfo?.libraryBotConfig?.feature_and_button_controls?.ai_pulse
        ?.label ?? "AI Pulse Report",
    );
    setIdeaBoardButtonLabel(
      userInfo?.libraryBotConfig?.feature_and_button_controls?.idea_board_button
        ?.label ?? "Idea Board",
    );
  }, [userInfo, loading]);

  // ✅ Leader Board login check
  const handlePasswordSubmit = (packageCourseId: string) => {
    // if (password === "bookdemo#12345") {
    const newWindow = window.open(
      `/library-bot/leaderBoardReport/?package_course_id=${packageCourseId}&client_id=${userInfo.clientId}`,
      "_blank",
      "noopener,noreferrer",
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
  }

  return (
    <>
      {/* ✅ Header */}
      <header className="w-full border-b border-gray-200 bg-white">
        <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-3">

          <div className="flex items-center gap-4">
            <h1 className="w-fit border-2 border-[#2DC092] px-2 py-1 text-lg font-extrabold text-[#2DC092] sm:text-xl">
              <span className="mr-1 bg-[#2DC092] px-2 py-1 text-base font-bold text-white sm:text-lg">
                AI
              </span>
              ADOPTS
            </h1>
            
            {clientLogoUrl && (
              <div className="flex items-center pl-2 border-l border-gray-200">
                <Image
                  src={clientLogoUrl}
                  alt="Client logo"
                  width={100}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
              </div>
            )}
          </div>

          {/* Desktop View */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Buttons Section */}
            {loading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 animate-spin text-[#2DC092]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2.93 6.07A8 8 0 0112 20v4c-6.627 0-12-5.373-12-12h4a8 8 0 006.07 2.93l-1.414 1.414zM12 4a8 8 0 018 8h4c0-6.627-5.373-12-12-12v4zm6.07 2.93A8 8 0 0120 12h4c0-6.627-5.373-12-12-12v4a8 8 0 016.07 2.93l1.414-1.414z"
                  ></path>
                </svg>
              </div>
            ) : (
              <div className="flex gap-3">
                {IdeaBoardButtonLabel && showIdeaBoardButton && (
                  <Button
                    onClick={() => {
                      if (jobaidId) {
                        jobaidId && onAction?.("INTERNAL_TRANSFORMATION_ALIGN")                        
                        const url = `/library-bot/ideaboardReport/?jobaid=${encodeURIComponent(
                          jobaidId,
                        )}&onlyclientsetup=${encodeURIComponent(
                          onlyClientSetup
                        )
                        }&email=${encodeURIComponent(
                          user?.email!
                        )}
                        `;
                        // Open in a new tab with no referrer
                        // window.open(url, "_blank", "noopener,noreferrer");
                      }
                    }}
                    className="bg-gray-200 border-2 border-[#00c193] px-6 py-2.5 text-sm font-medium text-black shadow-sm transition-all duration-300 hover:bg-gray-300"
                    style={{ borderRadius: "calc(var(--radius) - 6px)" }}
                  >
                    {IdeaBoardButtonLabel}
                  </Button>
                )}

                {/* Leader Board Button */}
                {LeaderBoardButtonLabel && showLeaderBoardButton && (
                  <Button
                    onClick={() => {
                      if (packageCourseId) {
                        const url = `/library-bot/leaderBoardReport/?package_course_id=${encodeURIComponent(
                          packageCourseId,
                        )}&client_id=${encodeURIComponent(userInfo.clientId || "")}`;
                        // Open in a new tab with no referrer
                        window.open(url, "_blank", "noopener,noreferrer");
                      }
                    }}
                    className="bg-gray-200 border-2 border-[#00c193] px-6 py-2.5 text-sm font-medium text-black shadow-sm transition-all duration-300 hover:bg-gray-300"
                    style={{ borderRadius: "calc(var(--radius) - 6px)" }}
                  >
                    {LeaderBoardButtonLabel}
                  </Button>
                )}

                {/* AI Pulse Report btn */}
                {AiPulseButtonLabel && showAiPulseButton && (
                  <Button
                    onClick={() => {
                      if (packageCourseId) {
                        const url = `/library-bot/AiPulseReport/?package_course_id=${encodeURIComponent(
                          packageCourseId,
                        )}&client_id=${encodeURIComponent(userInfo.clientId || "")}`;
                        window.open(url, "_blank", "noopener,noreferrer");
                      }
                    }}
                    className="bg-gray-200 border-2 border-[#00c193] px-6 py-2.5 text-sm font-medium text-black shadow-sm transition-all duration-300 hover:bg-gray-300"
                    style={{ borderRadius: "calc(var(--radius) - 6px)" }}
                  >
                    {AiPulseButtonLabel}
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button - Only show if there are buttons to display */}
          {(showLeaderBoardButton || showAiPulseButton || showIdeaBoardButton) && (
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="sm:hidden flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {showMobileMenu ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="sm:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-4">
            {loading ? (
              <div className="flex items-center gap-2 justify-center py-4">
                <svg
                  className="h-5 w-5 animate-spin text-[#2DC092]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2.93 6.07A8 8 0 0112 20v4c-6.627 0-12-5.373-12-12h4a8 8 0 006.07 2.93l-1.414 1.414zM12 4a8 8 0 018 8h4c0-6.627-5.373-12-12-12v4zm6.07 2.93A8 8 0 0120 12h4c0-6.627-5.373-12-12-12v4a8 8 0 016.07 2.93l1.414-1.414z"
                  ></path>
                </svg>
              </div>
            ) : (
              <>
                {IdeaBoardButtonLabel && showIdeaBoardButton && (
                  <Button
                    onClick={() => {
                      if (jobaidId) {
                        jobaidId && onAction?.("INTERNAL_TRANSFORMATION_ALIGN")                        
                        const url = `/library-bot/ideaboardReport/?jobaid=${encodeURIComponent(
                          jobaidId,
                        )}&onlyclientsetup=${encodeURIComponent(
                          onlyClientSetup
                        )
                        }&email=${encodeURIComponent(
                          user?.email!
                        )}
                        `;
                        // Open in a new tab with no referrer
                        // window.open(url, "_blank", "noopener,noreferrer");
                      }
                    
                      setShowMobileMenu(false);
                    }}
                    className="w-full bg-gray-200 border-2 border-[#00c193] px-6 py-2.5 text-sm font-medium text-black shadow-sm transition-all duration-300 hover:bg-gray-300"
                    style={{ borderRadius: "calc(var(--radius) - 6px)" }}
                  >
                    {IdeaBoardButtonLabel}
                  </Button>
                )}
                {/* Leader Board Button - Mobile */}
                {LeaderBoardButtonLabel && showLeaderBoardButton && (
                  <Button
                    onClick={() => {
                      if (packageCourseId) {
                        const url = `/library-bot/leaderBoardReport/?package_course_id=${encodeURIComponent(
                          packageCourseId,
                        )}&client_id=${encodeURIComponent(userInfo.clientId || "")}`;
                        window.open(url, "_blank", "noopener,noreferrer");
                      }
                      setShowMobileMenu(false);
                    }}
                    className="w-full bg-gray-200 border-2 border-[#00c193] px-6 py-2.5 text-sm font-medium text-black shadow-sm transition-all duration-300 hover:bg-gray-300"
                    style={{ borderRadius: "calc(var(--radius) - 6px)" }}
                  >
                    {LeaderBoardButtonLabel}
                  </Button>
                )}

                {/* AI Pulse Report btn - Mobile */}
                {AiPulseButtonLabel && showAiPulseButton && (
                  <Button
                    onClick={() => {
                      if (packageCourseId) {
                        const url = `/library-bot/AiPulseReport/?package_course_id=${encodeURIComponent(
                          packageCourseId,
                        )}&client_id=${encodeURIComponent(userInfo.clientId || "")}`;
                        window.open(url, "_blank", "noopener,noreferrer");
                      }
                      setShowMobileMenu(false);
                    }}
                    className="w-full bg-gray-200 border-2 border-[#00c193] px-6 py-2.5 text-sm font-medium text-black shadow-sm transition-all duration-300 hover:bg-gray-300"
                    style={{ borderRadius: "calc(var(--radius) - 6px)" }}
                  >
                    {AiPulseButtonLabel}
                  </Button>
                )}
              </>
            )}
          </div>
        )}
        
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
