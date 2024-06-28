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
            helpText: data.data.user_info[0].help_text,
          };
        } else {
          return {
            restrictedFeatures: "",
            helpText: null,
          };
        }
      } else {
        console.error(`[layout] Failed to run CreateOrAssignClientId`);
        return {
          restrictedFeatures: "",
          helpText: null,
        };
      }
    } else {
      return {
        restrictedFeatures: "",
        helpText: null,
      };
    }
  } else {
    return {
      restrictedFeatures: "",
      helpText: null,
    };
  }
};

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user: any = await getUser();

  const { restrictedFeatures, helpText } = await getClientUserInfo(
    user?.email,
    user
  );

  return (
    <div>
      <MyLibrary
        restrictedFeatures={restrictedFeatures}
        user={user}
        helpModeText={helpText}
      />
      <Widgets />
    </div>
  );
};

export default Page;
