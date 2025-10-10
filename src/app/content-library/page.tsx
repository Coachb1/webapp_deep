import {
  constructMetadata,
} from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Widgets from "@/components/Widgets";
import VersionTwo from "./VersionTwo";

export const metadata = constructMetadata({
  title: "Leadership Library - Coachbot",
});


const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();


  return (
    <div>
      <VersionTwo user={user} />
      <Widgets from="content-library" />
    </div>
  );
};

export default Page;
