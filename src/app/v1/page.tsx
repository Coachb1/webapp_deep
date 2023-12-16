import { constructMetadata } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import VersionOne from "./VersionOne";

export const metadata = constructMetadata();

const subdomain =
  typeof window !== "undefined" ? window.location.hostname.split(".")[0] : null;
// const devUrl = "https://coach-api-ovh.coachbots.com/api/v1";
const devUrl = "https://coach-api-gcp.coachbots.com/api/v1";
const prodUrl = "https://coach-api-prod-ovh.coachbots.com/api/v1";
const baseURL = subdomain === "platform" ? prodUrl : devUrl;

 async function getData(){
 const res = await fetch(`${baseURL}/accounts/get-test-codes-for-web/`, {
   method: "GET",
   headers: {
     Authorization: "Basic Yzc3MjFmZGItYTllMC00YTYxLWEzMTYtNDRhODA1N2VkMjY0OjhjNWNlZWZlLTY2Y2QtNDliZi04MTY5LTBhNjMwMmU5NmZlMA==",
     "Content-Type": "application/json",
   },
 })

 if(!res.ok){
   throw new Error("Failed to fetch data");
 }
 return res.json();
}

const Page = async () => {
  const {getUser} = getKindeServerSession()
  const user = await getUser()
  let group_list : string[] = []
  
  if(user){
    const data = await getData()
    for (const item of data.data.my_lib) {
      if (item.emails.includes(user?.email)) {
        group_list.push(item.group);
      }
    }
  }

  return (
    <div>
      <VersionOne user={user} groups={group_list} />
    </div>
  );
};

export default Page;