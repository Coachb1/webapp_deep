import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { HelpModeProvider } from "@/lib/helpmodeContext";
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
    await CreateOrAssignClientId(userEmail);
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
      console.log("isDemo user - Layout: ", data.data.user_info[0].is_demo_user)
      console.log("isRestricted user - Layout: ", data.data.user_info[0].is_restricted)
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

const CreateOrAssignClientId = async (userEmail: string | null | undefined) => {
  if (userEmail !== null && userEmail !== undefined) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", basicAuth);
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      "email": userEmail,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    
    const response = await fetch(`${baseURL}/accounts/create-or-assign-client-id/`, requestOptions)

    const data = await response.json();


    if (response.ok){
      console.log(`Success : data:`, data)
    } else {
      console.error(`Failed to run CreateOrAssignClientId`)
    }
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
