import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { constructMetadata } from "@/lib/utils";
import Widgets from "@/components/Widgets";
import SkillBot from "./SkillBot";

export const metadata = constructMetadata({
  title: "Skill bots",
});

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user: any = await getUser();

  return (
    <div>
      <SkillBot user={user} />
    </div>
  );
};

export default Page;
