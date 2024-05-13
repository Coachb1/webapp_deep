import { constructMetadata } from "@/lib/utils";
import Widgets from "@/components/Widgets";
import Script from "next/script";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import DeepDive from "../DeepDive";

export const metadata = constructMetadata({
  title: "Deep Dive - Coachbots",
});

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div>
      <DeepDive user={user} renderType="dynamic" />
      <Widgets from="deepdiveDynamic" />
      <Script src="../widget/coachbots-stt-widget.js" />
    </div>
  );
};

export default Page;
