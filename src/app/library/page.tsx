import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import {
  baseURL,
  basicAuth,
  constructMetadata,
  getUserAccount,
} from "@/lib/utils";
import MyLibrary from "./library";
import Widgets from "@/components/Widgets";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";

export const metadata = constructMetadata({
  title: "Library - Coachbots",
});

const getClientUserInfo = async (
  userEmail: string | null | undefined,
  user: KindeUser | null
) => {
  if (userEmail !== null && userEmail !== undefined) {
    const userCreateResponse = await getUserAccount(user);
    const userCreateResults = await userCreateResponse.json();

    if (userCreateResponse.ok) {
      const myHeaders = new Headers();

      myHeaders.append("Authorization", basicAuth);
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        email: userEmail,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      const response = await fetch(
        `${baseURL}/accounts/create-or-assign-client-id/`,
        requestOptions
      );

      const data = await response.json();
      if (response.ok) {
        const response = await fetch(
          `${baseURL}/accounts/get-client-information/?for=user_info&email=${userEmail}`,
          {
            method: "GET",
            headers: {
              Authorization: basicAuth,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          return {
            restrictedFeatures: data.data.user_info[0].restricted_features,
          };
        } else {
          return {
            restrictedFeatures: "",
          };
        }
      } else {
        console.error(`[layout] Failed to run CreateOrAssignClientId`);
        return {
          restrictedFeatures: "",
        };
      }
    } else {
      return {
        restrictedFeatures: "",
      };
    }
  } else {
    return {
      restrictedFeatures: "",
    };
  }
};

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user: any = await getUser();

  const { restrictedFeatures } = await getClientUserInfo(user.email, user);

  return (
    <div>
      <MyLibrary restrictedFeatures={restrictedFeatures} user={user} />
      <Widgets />
    </div>
  );
};

export default Page;
