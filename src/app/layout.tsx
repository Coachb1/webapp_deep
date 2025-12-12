import { Raleway } from "next/font/google";
import "./globals.css";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { baseURL, basicAuth, getUserAccounts } from "@/lib/utils";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";

import MainLayoutComponent from "./MainLayout";
import ConsolePatch from "./ConsolePatch";

const font = Raleway({ subsets: ["latin"] });

//GLOBAL USER - *.js
interface CustomWindow extends Window {
  user?: any;
  locallStorage?: Storage;
  locationn?: Location;
  userIdFromWebApp?: any;
}

const emptyObject = {
  isDemoUser: false,
  isRestricted: true,
  clientExpertise: null,
  clientDepartments: null,
  restrictedPages: "",
  restrictedFeatures: "",
};

const getClientUserInfo = async (
  userEmail: string | null | undefined,
  user: KindeUser | null
) => {
  if (!userEmail) {
    return emptyObject;
  }

  let attempt = 0;
  const maxRetries = 1;

  const userCreateResponse = await getUserAccounts(user);
  console.log("USER ID : ", userCreateResponse.uid);

  if (userCreateResponse?.uid) {
    while (attempt <= maxRetries) {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", basicAuth);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({ email: userEmail });

        const response = await fetch(
          `${baseURL}/accounts/create-or-assign-client-id/`,
          {
            method: "POST",
            headers: myHeaders,
            body: raw,
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("[layout] create-or-assign-client-id", data);

          const infoResponse = await fetch(
            `${baseURL}/accounts/get-client-information/?for=user_info&email=${userEmail}`,
            {
              method: "GET",
              headers: {
                Authorization: basicAuth,
              },
            }
          );

          if (infoResponse.ok) {
            const data = await infoResponse.json();
            console.log(
              "[layout] get-client-information > ",
              "isDemo user : ",
              data.data.user_info[0].is_demo_user,
              "isRestricted user : ",
              data.data.user_info[0].is_restricted
            );
            return {
              isDemoUser: data.data.user_info[0].is_demo_user,
              isRestricted: data.data.user_info[0].is_restricted,
              clientExpertise: data.data.user_info[0].coach_expertise,
              clientDepartments: data.data.user_info[0].departments,
              restrictedPages: data.data.user_info[0].restricted_pages,
              restrictedFeatures: data.data.user_info[0].restricted_features,
            };
          } else {
            console.error("[layout] Failed to fetch client information");
            return emptyObject;
          }
        } else {
          console.error("[layout] Failed to run CreateOrAssignClientId");
          return emptyObject;
        }
      } catch (error) {
        console.error(`Attempt ${attempt + 1} failed:`, error);
        if (attempt >= maxRetries) {
          break; // Exit the loop after the retry attempt
        }
      }
      attempt++;
    }
  } else {
    return emptyObject;
  }

  console.error("All attempts failed.");
  return emptyObject;
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user: KindeUser | null = await getUser();

  const { isDemoUser, isRestricted, restrictedPages, restrictedFeatures } =
    await getClientUserInfo(user?.email, user);

  return (
    <>
    {/* to disable consoel for platform */}
    <ConsolePatch/> 
    
    <MainLayoutComponent
      user={user}
      isDemoUser={isDemoUser}
      isRestricted={isRestricted}
      restrictedPages={restrictedPages}
    >
      {children}
    </MainLayoutComponent>
    </>

  );
}
