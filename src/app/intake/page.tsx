import { constructMetadata } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import CoachIntake from "./CoachIntake";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "Intake - Coachbots",
});

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div>
      <div className="fixed w-full flex items-center top-0 justify-end p-4 h-6 py-8 ">
        <Link href="/">
          <Button variant={"outline"} className={` h-8 max-sm:text-sm`}>
            Return to home
          </Button>
        </Link>
      </div>
      <CoachIntake user={user} />
    </div>
  );
};

export default Page;
