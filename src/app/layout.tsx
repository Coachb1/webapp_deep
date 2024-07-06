import { Raleway } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { HelpModeProvider } from "@/lib/helpmodeContext";
import { Toaster } from "@/components/ui/sonner";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import LayoutComponent from "./LayoutComponent";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { baseURL, basicAuth, getUserAccount } from "@/lib/utils";
import Providers from "./ProgressBarProvider";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { Boxes, BoxesCore } from "@/components/ui/background-boxes";

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
  if (userEmail !== null && userEmail !== undefined) {
    const userCreateResponse = await getUserAccount(user);
    const userCreateResults = await userCreateResponse.json();

    console.log("[layout] getUserAccount : ", userCreateResults);
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
      console.log("[layout] create-or-assign-client-id", data);
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
          console.log(data.data.user_info[0]);
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
          return emptyObject;
        }
      } else {
        console.error(`[layout] Failed to run CreateOrAssignClientId`);
        return emptyObject;
      }
    } else {
      return emptyObject;
    }
  } else {
    return emptyObject;
  }
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
    <html lang="en" className="bg-white">
      <head>
        {!restrictedFeatures?.includes("Accessibility-widget") && (
          <script src="../widget/accessibility.js"></script>
        )}
      </head>

      <HelpModeProvider>
        <>
          <body className={font.className} suppressHydrationWarning={true}>
            <>
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
              >
                <AntdRegistry>
                  <Providers>
                    <LayoutComponent
                      restrictedPages={restrictedPages}
                      user={user}
                      children={children}
                      isDemoUser={isDemoUser}
                      isRestricted={isRestricted}
                    />
                  </Providers>
                </AntdRegistry>
              </ThemeProvider>
            </>
            <Toaster
              theme="light"
              closeButton
              richColors
              position="top-right"
            />
          </body>
        </>
      </HelpModeProvider>
    </html>
  );
}
