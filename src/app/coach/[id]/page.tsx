import { constructMetadata } from "@/lib/utils";
import Coach from "../Coach";
import Widgets from "@/components/Widgets";
import Script from "next/script";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function generateMetadata({ params }: any) {
  let title = "AI Copilot - Coachbot";
  if (params.id.includes("subject")) {
    title = "Co-pilot Level 1- Coachbot";
  }
  return constructMetadata({
    title,
  });
}

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div>
      <Coach user={user} renderType="dynamic" />
      <Widgets from="coachDynamic" />
      <Script src="../widget/coachbots-stt-widget-combined.js" />
      {/* <div className="fixed max-sm:right-[1.6rem] right-[2rem] bottom-28 hover:cursor-pointer max-sm:bottom-[5.5rem] w-[10%] max-sm:w-[30%]">
        <p className="text-xs text-right">
          <span className="font-bold max-sm:text-[10px] max-sm:relative max-sm:-bottom-20  max-sm:p-1 rounded-lg max-sm:bg-[#35DDB8] w-fit ">
            CoachScribe{" "}
          </span>
          <span className="max-sm:hidden">
            {" "}
            is our high performance bot but speech analytics is not available.
          </span>
        </p>
      </div> */}
    </div>
  );
};

export default Page;
