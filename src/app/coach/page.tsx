import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { constructMetadata } from "@/lib/utils";
import Coach from "./Coach";
export const metadata = constructMetadata({
  title: "Coach",
});
const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div suppressHydrationWarning>
      <Coach renderType="static" user={user} />
    </div>
  );
};

export default Page;
