import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Coach from "./Coach";
import { constructMetadata } from "@/lib/utils";
export const metadata = constructMetadata({
  title: "Coach",
});
const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return <Coach renderType="static" user={user} />;
};

export default Page;
