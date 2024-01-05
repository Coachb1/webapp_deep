import Conversations from "@/components/Conversations";
import SessionNotes from "@/components/SessionNotes";
import UserProfile from "@/components/UserProfile";
import { constructMetadata } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "Your profile",
});

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="h-full bg-white min-h-screen px-44 max-md:px-8 max-lg:px-16 py-24 max-sm:px-8 max-sm:pb-5 max-sm:pt-24">
      <div>
        <div className="pb-6 flex flex-row items-center">
          {" "}
          <Link href={"/content-library"}>
            <ChevronLeft className="h-6 w-6 mr-2 max-sm:h-4 max-sm:w-4" />
          </Link>
          <h3 className="text-2xl font-mono font-semibold max-sm:text-lg">
            Your profile
          </h3>
        </div>
        <hr />
        <UserProfile userName={user?.given_name!} userEmail={user?.email!} />
        <hr className="my-2" />
        <SessionNotes user={user} />
        <hr className="my-2" />
        <Conversations />
      </div>
    </div>
  );
};

export default Page;
