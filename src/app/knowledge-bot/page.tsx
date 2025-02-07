import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { constructMetadata } from "@/lib/utils";
import KnowledgeBot from "./KnowledgeBot";

export const metadata = constructMetadata({
  title: "AI Knowledge Agent",
});

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return <KnowledgeBot renderType="static" user={user} />;
};

export default Page;
