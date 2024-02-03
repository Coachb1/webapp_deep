import { constructMetadata } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Coaches from "./Coaches";

export const metadata = constructMetadata({
  title: "Network - Coachbots",
});

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div>
      <Coaches user={user} />
    </div>
  );
};

export default Page;
