import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { constructMetadata } from "@/lib/utils";
import Survey from "./Survey";
export const metadata = constructMetadata({
  title: "Survey - Coachbots",
});
const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return <Survey renderType="static" user={user} />;
};

export default Page;
