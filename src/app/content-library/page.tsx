import { constructMetadata } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import VersionOne from "./VersionOne";
import Widgets from "@/components/Widgets";

export const metadata = constructMetadata({
  title: "Demo - Coachbots",
});

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div>
      <VersionOne user={user} />
      <Widgets from="content-library" />
    </div>
  );
};

export default Page;
