import { UseHelpMode } from "@/lib/helpmodeContext";
import { subdomain } from "@/lib/utils";
import Joyride from "react-joyride";

const HelpMode = ({
  steps,
  forPage,
}: {
  steps: {
    target: string;
    content: any;
  }[];
  forPage?: string;
}) => {
  const { helpModeState, updateHelpModeState } = UseHelpMode();
  return (
    <>
      {helpModeState && (
        <Joyride
          continuous
          locale={{ last: "End" }}
          scrollOffset={100}
          disableScrolling={true}
          callback={(callbackData) => {
            if (subdomain === "localhost") {
              console.log(callbackData);
            }
            if (
              callbackData.action === "close" ||
              callbackData.action === "reset"
            ) {
              updateHelpModeState(false);
            }

            if (
              callbackData.action === "prev" &&
              callbackData.step.target === ".chat-icon" &&
              callbackData.status === "running" &&
              forPage === "demo"
            ) {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }

            if (
              callbackData.action === "next" &&
              callbackData.step.target === "#eq-cat" &&
              callbackData.status === "running"
            ) {
              window.scrollTo({ top: 200, behavior: "smooth" });
            }
          }}
          steps={steps}
        />
      )}
    </>
  );
};

export default HelpMode;
