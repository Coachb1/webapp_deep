import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { UserContextProvider } from "@/lib/UserContext";
import { Toaster } from "@/components/ui/sonner";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import LayoutComponent from "./LayoutComponent";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { baseURL, basicAuth } from "@/lib/utils";
import Providers from "./ProgressBarProvider";

const inter = Inter({ subsets: ["latin"] });

//GLOBAL USER - *.js
interface CustomWindow extends Window {
  user?: any;
  locallStorage?: Storage;
  locationn?: Location;
  userIdFromWebApp?: any;
}

const getClientUserInfo = async (userEmail: string | null | undefined) => {
  if (userEmail !== null && userEmail !== undefined) {
    const response = await fetch(
      `${baseURL}/accounts/get-client-information/?for=user_info&email=${userEmail}`,
      {
        method: "GET",
        headers: {
          Authorization: basicAuth,
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      return {
        isDemoUser: data.data.user_info[0].is_demo_user,
        isRestricted: data.data.user_info[0].is_restricted,
      };
    } else {
      return {
        isDemoUser: false,
        isRestricted: true,
      };
    }
  } else {
    return {
      isDemoUser: false,
      isRestricted: true,
    };
  }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const { isDemoUser, isRestricted } = await getClientUserInfo(user?.email);

  return (
    <html lang="en" className="bg-white">
      <UserContextProvider>
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
      </UserContextProvider>
    </html>
  );
}
