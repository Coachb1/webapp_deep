import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { constructMetadata } from "@/lib/utils";
import MyLibrary from "./library";
import Widgets from "@/components/Widgets";

export const metadata = constructMetadata({
  title: "Library - Coachbots",
});

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user: any = await getUser();

  return (
    <div>
      <MyLibrary user={user} />
      <Widgets />
    </div>
  );
};

export default Page;
