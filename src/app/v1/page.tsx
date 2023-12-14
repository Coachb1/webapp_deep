import { constructMetadata } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import VersionOne from "./VersionOne";

export const metadata = constructMetadata();

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user: any = await getUser();

  return (
    <div>
      <VersionOne />
    </div>
  );
};

export default Page;
