import { constructMetadata } from "@/lib/utils";
import LeadershipLIbraryPage from "@/components/no-kinde-portal/contentLIbraryPage";

export const metadata = constructMetadata({
  title: "Leadership Library - Coachbot",
});

const Page = async () => {
  return (
    <>
      <LeadershipLIbraryPage />
    </>
  );
};

export default Page;
