import { Inter } from "next/font/google";
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

const inter = Inter({ subsets: ["latin"] });

//GLOBAL USER - *.js
interface CustomWindow extends Window {
  user?: any;
  locallStorage?: Storage;
  locationn?: Location;
  userIdFromWebApp?: any;
}

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
          };
        } else {
          return {
            isDemoUser: false,
            isRestricted: true,
            clientExpertise: null,
            clientDepartments: null,
          };
        }
      } else {
        console.error(`[layout] Failed to run CreateOrAssignClientId`);
        return {
          isDemoUser: false,
          isRestricted: true,
          clientExpertise: null,
          clientDepartments: null,
        };
      }
    } else {
      return {
        isDemoUser: false,
        isRestricted: true,
        clientExpertise: null,
        clientDepartments: null,
      };
    }
  } else {
    return {
      isDemoUser: false,
      isRestricted: true,
      clientExpertise: null,
      clientDepartments: null,
    };
  }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user: KindeUser | null = await getUser();

  const { isDemoUser, isRestricted } = await getClientUserInfo(
    user?.email,
    user
  );

  return (
    <html lang="en" className="bg-white">
      <HelpModeProvider>
        <>
          <body className={inter.className} suppressHydrationWarning={true}>
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
                      user={user}
                      children={children}
                      isDemoUser={isDemoUser}
                      isRestricted={isRestricted}
                    />
                  </Providers>
                </AntdRegistry>
              </ThemeProvider>
            </>
            <Toaster theme="light" richColors position="top-right" />
          </body>
        </>
      </HelpModeProvider>
    </html>
  );
}
