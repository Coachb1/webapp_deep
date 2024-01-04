"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Coach from "../Coach";
const subdomain =
  typeof window !== "undefined" ? window.location.hostname.split(".")[0] : null;
const devUrl = "https://coach-api-ovh.coachbots.com/api/v1";
// const devUrl = "https://coach-api-gcp.coachbots.com/api/v1";
const prodUrl = "https://coach-api-prod-ovh.coachbots.com/api/v1";
const baseURL = subdomain === "platform" ? prodUrl : devUrl;
const basicAuth =
  "Basic Yzc3MjFmZGItYTllMC00YTYxLWEzMTYtNDRhODA1N2VkMjY0OjhjNWNlZWZlLTY2Y2QtNDliZi04MTY5LTBhNjMwMmU5NmZlMA==";

const Page = () => {
  const pathname = usePathname();
  const bot_id = "d54cd7a4-59d2-483a-baf7-70cd28cdf884";

  useEffect(() => {
    fetch(`${baseURL}/accounts/get-bot-details/?bot_id=${bot_id}`, {
      method: "GET",
      headers: {
        Authorization: basicAuth,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div>
      {/* dynamic Handling here */}
      <Coach />
    </div>
  );
};

export default Page;
