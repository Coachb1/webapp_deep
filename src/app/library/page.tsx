import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { constructMetadata } from "@/lib/utils";
import MyLibrary from "./library";

export const metadata = constructMetadata({
  title: "My Library",
});

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <div>
      <MyLibrary />
    </div>
  );
};

export default Page;
