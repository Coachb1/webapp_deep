import { constructMetadata } from "@/lib/utils";
import KnowledgeBot from "../KnowledgeBot";
import Widgets from "@/components/Widgets";
import Script from "next/script";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const metadata = constructMetadata({
  title: "Knowledge Bot",
});

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div>
      <KnowledgeBot user={user} renderType="dynamic" />
      <Widgets from="coachDynamic" />
      <Script src="../widget/coachbots-stt-widget.js" />
    </div>
  );
};

export default Page;
