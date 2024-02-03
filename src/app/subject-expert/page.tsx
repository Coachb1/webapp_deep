import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { constructMetadata } from "@/lib/utils";
import SubjectExpert from "./SubjectExpert";
export const metadata = constructMetadata({
  title: "Subject expert",
});
const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return <SubjectExpert renderType="static" user={user} />;
};

export default Page;
