import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { constructMetadata } from "@/lib/utils";
import Profile from "./Profile";

export const metadata = constructMetadata({
  title: "My Account",
});

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return <Profile user={user} />;
};

export default Page;
