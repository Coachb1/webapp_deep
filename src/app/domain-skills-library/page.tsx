import {
  baseURL,
  basicAuth,
  constructMetadata,
  getUserAccount,
} from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Widgets from "@/components/Widgets";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import VersionOne from "./VersionOne";

export const metadata = constructMetadata({
  title: "Domain Skill Simulations - Coachbot",
});

const getClientUserInfo = async (
  userEmail: string | null | undefined,
  user: KindeUser | null
) => {
  if (userEmail !== null && userEmail !== undefined) {
    const userCreateResponse = await getUserAccount(user);
    const userCreateResults = await userCreateResponse.json();

    console.log("getUserAccount : ", userCreateResults);
    if (userCreateResponse.ok) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", basicAuth);
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({
        email: userEmail,
      });

      const response = await fetch(
        `${baseURL}/accounts/create-or-assign-client-id/`,
        {
          method: "POST",
          headers: myHeaders,
          body: raw,
          cache: "force-cache",
        }
      );

      const data = await response.json();
      console.log("create-or-assign-client-id", data);
      if (response.ok) {
        const response = await fetch(
          `${baseURL}/accounts/get-client-information/?for=user_info&email=${userEmail}`,
          {
            method: "GET",
            headers: {
              Authorization: basicAuth,
            },
            cache: "force-cache",
          }
        );

        if (response.ok) {
          const data = await response.json();
          return {
            helpText: data.data.user_info[0].help_text,
          };
        } else {
          return {
            helpText: null,
          };
        }
      } else {
        console.error(`Failed to run CreateOrAssignClientId`);
        return {
          helpText: null,
        };
      }
    } else {
      return {
        helpText: null,
      };
    }
  } else {
    return {
      helpText: null,
    };
  }
};

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // const { helpText } = await getClientUserInfo(user?.email, user);

  return (
    <div>
      <VersionOne user={user} />
      <Widgets from="content-library" />
    </div>
  );
};

export default Page;
