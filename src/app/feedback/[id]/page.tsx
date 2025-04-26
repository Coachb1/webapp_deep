import { constructMetadata } from "@/lib/utils";
import Widgets from "@/components/Widgets";
import Script from "next/script";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Feedback from "../Feedback";

export const metadata = constructMetadata({
  title: "Feedback - Coachbot",
});

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div>
      <Feedback user={user} renderType="dynamic" />
      <Widgets from="feedbackDynamic" />
      <Script src="../widget/coachbots-stt-widget.js" />
    </div>
  );
};

export default Page;
