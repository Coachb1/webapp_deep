import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { constructMetadata } from "@/lib/utils";
import CreateOwn from "./CreateOwn";
export const metadata = constructMetadata({
  title: "Create your own Scenario",
});
const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return <CreateOwn user={user} />;
};

export default Page;
