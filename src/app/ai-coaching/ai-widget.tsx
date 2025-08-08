"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useUser } from "@/context/UserContext";
import HelpMode from "@/components/HelpMode";
import { useEffect, useState } from "react";

const WidgetPage = ({ user }: { user: any }) => {
  const [helpSteps, setHelpSteps] = useState<any[]>([]);
  const { userInfo } = useUser();

  // Email restriction logic
  const email = user?.email;
  const isAllowed = (() => {
    if (!email) return false;
    const domain = email.split("@")[1] ?? "";
    const blockedDomains = ["gmail", "yahoo", "hotmail", "outlook"];
    const allowlistedEmails = [
      "bagoriarajan@gmail.com",
      "falahsss900@gmail.com",
      "ansariaadil611@gmail.com",
      "testingweb22222@gmail.com",
    ];

    const isRestrictedDomain = blockedDomains.some((d) =>
      domain.includes(d)
    );
    const isAllowlisted = allowlistedEmails.includes(email);

    if (isAllowlisted && isRestrictedDomain) return true;
    if (!isAllowlisted && isRestrictedDomain) return false;
    return true;
  })();

  useEffect(() => {
    const dynamicHelpText = userInfo?.helpText?.widget || {};
    setHelpSteps([
      {
        target: ".chat-widget-frame",
        content:
          dynamicHelpText.widget_intro ||
          "This widget allows speech or text-based conversation with an AI coach. Embedded here for full-page experience.",
      },
    ]);

    // Prevent page scroll
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [userInfo]);

  if (!isAllowed) {
    return (
      <MaxWidthWrapper className="text-center pt-20 h-screen flex items-center justify-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-700">
            Access Denied
          </h1>
          <p className="mt-2 text-gray-500">
            Your account or email domain is not authorized to view this widget.
          </p>
        </div>
      </MaxWidthWrapper>
    );
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden pt-10">
      <HelpMode steps={helpSteps} forPage="ai-widget" />

      <MaxWidthWrapper className="flex-grow flex flex-col text-center">
        <h1 className="text-4xl font-bold text-gray-700 mb-2 pt-6">
          Welcome to your new Coaching session!
        </h1>

        <div className="flex-grow flex justify-center">
          <iframe
            id = 'ai-coach-iframe'
            title="AI Chat Widget"
            src={`/widget/widget-container.html?user=${encodeURIComponent(JSON.stringify(user))}&origin=internal`}
            className="chat-widget-frame w-[80vw] max-w-[1200px] h-full border border-gray-300 rounded-xl shadow-md"
          />
        </div>

        <footer className="bg-white border-t border-gray-200 py-4 text-center">
          <p className="text-gray-600 text-sm sm:text-base">
            For detail discussion around methodology and mechanics, please contact your administrator.
          </p>
        </footer>
      </MaxWidthWrapper>
    </div>
  );
};

export default WidgetPage;
