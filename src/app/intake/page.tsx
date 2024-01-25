import { constructMetadata } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import CoachIntake from "./CoachIntake";
import IDPIntake from "./IDPIntake";

export const metadata = constructMetadata({
  title: "Intake - Coachbots",
});

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div>
      <CoachIntake user={user} />
    </div>
  );
};

export default Page;
