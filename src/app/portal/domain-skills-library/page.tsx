import {
  constructMetadata,
} from "@/lib/utils";
import DomainPage from "@/components/no-kinde-portal/domainPage";

export const metadata = constructMetadata({
  title: "Domain Area Simulations - Coachbot",
});


const Page = async () => {


  return (
    <>
      <DomainPage />
    </>
  );
};

export default Page;
