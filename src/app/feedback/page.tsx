import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Feedback from "./Feedback";
import { constructMetadata } from "@/lib/utils";
export const metadata = constructMetadata({
  title: "Feedback",
});
const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return <Feedback renderType="static" user={user} />;
};

export default Page;
