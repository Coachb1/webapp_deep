import { UseHelpMode } from "@/lib/helpmodeContext";
import Joyride from "react-joyride";

const HelpMode = ({
  steps,
}: {
  steps: {
    target: string;
    content: any;
  }[];
}) => {
  const { helpModeState, updateHelpModeState } = UseHelpMode();
  return (
    <>
      {helpModeState && (
        <Joyride
          continuous
          scrollOffset={100}
          disableScrolling={true}
          callback={(callbackData) => {
            console.log(callbackData);
            if (
              callbackData.action === "close" ||
              callbackData.action === "reset"
            ) {
              updateHelpModeState(false);
            }
          }}
          steps={steps}
        />
      )}
    </>
  );
};

export default HelpMode;
