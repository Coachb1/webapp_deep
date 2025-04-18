import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { constructMetadata } from "@/lib/utils";
import DeepDive from "./DeepDive";
export const metadata = constructMetadata({
  title: "Deepdive - Coachbot",
});
const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return <DeepDive renderType="static" user={user} />;
};

export default Page;
