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
    <div className="bg-white-100 min-h-[120vh] h-fit max-sm:h-screen max-sm:min-h-screen px-44 py-24 max-sm:px-8 max-sm:py-0 max-sm:pt-24">
      <div>
        <div className="pb-6 flex flex-row items-center">
          {" "}
          <Link href={"/v1"}>
            <ChevronLeft className="h-6 w-6 mr-2 max-sm:h-4 max-sm:w-4" />
          </Link>
          <h3 className="text-2xl font-mono font-semibold max-sm:text-lg">
            Your profile
          </h3>
        </div>
        <hr />
        <UserProfile userName={user?.given_name!} userEmail={user?.email!} />
      </div>

      <div
        aria-hidden="true"
        className="pointer-event-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#D5ECE7] to-[#9C7ACF] opacity-30 sm:left-[calc(50%/36rem)] sm:w-[72.1.78rem]"
        />
      </div>
    </div>
  );
};

export default Page;
