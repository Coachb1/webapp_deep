import { constructMetadata } from "@/lib/utils";
import Widgets from "@/components/Widgets";
import Script from "next/script";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import SubjectExpert from "../SubjectExpert";

export const metadata = constructMetadata({
  title: "Subject expert - Coachbot",
});

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div>
      <SubjectExpert user={user} renderType="dynamic" />
      <Widgets from="subjectDynamic" />
      <Script src="../widget/coachbots-stt-widget.js" />
    </div>
  );
};

export default Page;
