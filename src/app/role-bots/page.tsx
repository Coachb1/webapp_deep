import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { constructMetadata } from "@/lib/utils";
import Widgets from "@/components/Widgets";
import RoleBots from "./RoleBots";

export const metadata = constructMetadata({
  title: "Role bots",
});

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user: any = await getUser();

  return (
    <div>
      <RoleBots user={user} />
    </div>
  );
};

export default Page;
