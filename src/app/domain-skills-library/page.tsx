import {
  constructMetadata,
} from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Widgets from "@/components/Widgets";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import VersionOne from "./VersionOne";

export const metadata = constructMetadata({
  title: "Domain Area Simulations - Coachbot",
});

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();


  return (
    <div>
      <VersionOne user={user} />
      <Widgets from="domain-skills-library" />
    </div>
  );
};

export default Page;
