// "use client";

import CopyToClipboard from "@/components/CopyToClipboard";
import HeroAccordion from "@/components/HeroAccordion";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import MylibraryAccordion from "@/components/MylibAccordion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Managerial, immersive } from "@/lib/test";
import { constructMetadata } from "@/lib/utils";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
const baseURL = "https://coach-api-gcp.coachbots.com/api/v1";

export const metadata = constructMetadata({
  title: "My Library",
});

async function getData() {
  const res = await fetch(
    `https://coach-api-gcp.coachbots.com/api/v1/accounts/get-test-codes-for-web/`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic Yzc3MjFmZGItYTllMC00YTYxLWEzMTYtNDRhODA1N2VkMjY0OjhjNWNlZWZlLTY2Y2QtNDliZi04MTY5LTBhNjMwMmU5NmZlMA==`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.json();
}

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  //   console.log(user);
  //   const [tests, setTests] = useState();
  const data = await getData();
  console.log(data);

  return (
    <div className="bg-gray-200 grainy min-h-[100vh] h-fit max-sm:h-screen max-sm:min-h-screen px-44 py-24 max-sm:px-0 max-sm:py-0 max-sm:pt-24">
      <div>
        <div className="pb-6 flex flex-row justify-center items-center text-center">
          <h3 className="text-2xl font-semibold max-sm:text-xl">My Library</h3>
        </div>
        <div>
          <MaxWidthWrapper className="flex pt-2 flex-col items-center justify-center text-center">
            <div className="text-lg z-50 w-[80%] max-sm:w-full ">
              <div className="flex justify-center flex-row gap-2 flex-wrap">
                <Link href={"#managerplus"}>
                  <Button
                    variant={"default"}
                    className="border border-gray-200 h-8 hover:cursor-pointer"
                  >
                    Manager+
                  </Button>
                </Link>
              </div>
            </div>
          </MaxWidthWrapper>
          <div className="flex flex-row max-sm:flex-col w-[80%] max-sm:w-full mx-auto">
            <div className="w-full">
              <MylibraryAccordion
                user={true}
                badgeText="test"
                tests={immersive}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
