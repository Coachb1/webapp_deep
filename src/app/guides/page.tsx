import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { constructMetadata } from "@/lib/utils";
import Widgets from "@/components/Widgets";
import Guides from "./Guides";

export const metadata = constructMetadata({
  title: "Guides",
});

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user: any = await getUser();

  return (
    <div>
      <Guides user={user} />
    </div>
  );
};

export default Page;
