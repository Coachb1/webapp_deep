import { constructMetadata } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import VersionOne from "./VersionOne";

export const metadata = constructMetadata();

const Page = () => {
  return (
    <div>
      <VersionOne />
    </div>
  );
};

export default Page;
