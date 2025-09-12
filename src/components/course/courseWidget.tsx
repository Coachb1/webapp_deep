"use client";

import { useEffect } from "react";

interface CoachbotsWidgetProps {
  clientId?: string;
  allowAudioInteraction?: boolean;
  welcomeMessage?: string;
  isBusinessEmail?: boolean;
  isReportButtons?: boolean;
}

const CoachbotsWidget: React.FC<CoachbotsWidgetProps> = ({
  clientId = "Sample Course",
  allowAudioInteraction = true,
  welcomeMessage = "Hi! Welcome to a sample demonstration of the simulation panel. You will need an interaction code that you can find on this page.",
  isBusinessEmail = false,
  isReportButtons = false,
}) => {
  useEffect(() => {
    // Dynamically inject script only once
    const scriptId = "coachbots-widget-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://playground.coachbots.com/widget/coachbots-stt-widget-new.js";
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      className="coachbots-coachscribe"
      data-client-id={clientId}
      data-allow-audio-interaction={allowAudioInteraction}
      data-welcome-message={welcomeMessage}
      data-is-bussiness-email={isBusinessEmail}
      data-is-report-buttons={isReportButtons}
    />
  );
};

export default CoachbotsWidget;
