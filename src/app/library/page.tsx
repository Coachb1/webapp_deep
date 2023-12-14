import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { constructMetadata } from "@/lib/utils";
import MyLibrary from "./library";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";

export const metadata = constructMetadata({
  title: "My Library",
});

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user: any = await getUser();

  return (
    <div>
      <MyLibrary user={user} />
    </div>
  );
};

export default Page;
