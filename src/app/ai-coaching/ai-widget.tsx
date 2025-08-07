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
  }, [userInfo]);

  if (!isAllowed) {
    return (
      <MaxWidthWrapper className="text-center pt-20">
        <h1 className="text-3xl font-bold text-gray-700">
          Access Denied
        </h1>
        <p className="mt-2 text-gray-500">
          Your account or email domain is not authorized to view this widget.
        </p>
      </MaxWidthWrapper>
    );
  }

  return (
    <>
      <HelpMode steps={helpSteps} forPage="ai-widget" />

      <MaxWidthWrapper className="pt-20 text-center">
        <h1 className="text-4xl font-bold text-gray-700 mb-4">
          Welcome to your new Coaching session!
        </h1>

        <div className="flex justify-center w-full">
          <iframe
            title="AI Chat Widget"
            src={`/widget/widget-container.html?pathname=${encodeURIComponent(window.location.origin)}`}
            className="chat-widget-frame w-[80vw] max-w-[1200px] h-[80vh] border border-gray-300 rounded-xl shadow-md"
          />
        </div>
        <footer className="w-full bg-white border-t border-gray-200 py-6 text-center">
            <p className="text-gray-600 text-sm sm:text-base">
                For detail discussion around methodology and mechanics, please contact your administrator.
            </p>
        </footer>
      </MaxWidthWrapper>
    </>
  );
};

export default WidgetPage;
