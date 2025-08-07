import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { constructMetadata } from "@/lib/utils";
import WidgetPage from "./ai-widget";

export const metadata = constructMetadata({
  title: "AI CoachBot",
  description: "Try our embedded AI Coaching widget in a live environment.",
});

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return <WidgetPage user={user} />;
};

export default Page;
