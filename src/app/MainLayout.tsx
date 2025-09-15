'use client';

import { Raleway } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { HelpModeProvider } from "@/lib/helpmodeContext";
import { Toaster } from "@/components/ui/sonner";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import LayoutComponent from "./LayoutComponent";
import Providers from "./ProgressBarProvider";
import { UserProvider } from "@/context/UserContext";
import { ConfigProvider } from "antd";
import { ReadPaths } from "@/lib/ReadPaths";
import { usePathname } from "next/navigation";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";


const font = Raleway({ subsets: ["latin"] });


const MainLayoutComponent = ({
  user,
  children,
  isDemoUser,
  isRestricted,
  restrictedPages,
}: {
  user: KindeUser | null;
  children: React.ReactNode;
  isDemoUser: boolean;
  isRestricted: boolean;
  restrictedPages: string;
}) => {
  // ✅ Get current pathname on server
  const pathname = usePathname();
  console.log("Current pathname: ", pathname);

  // ✅ Special case: Job Aid pages → Skip global layout
  if (pathname.startsWith("/job-aid")) {
    return (
      <html lang="en" className="bg-white">
        <body className={font.className}>
          <div className="z-[999]">{children}</div>
        </body>
      </html>
    );
  }

  if (pathname.startsWith("/course")) {
    return (
      <html lang="en" className="bg-white">
        <body className={font.className}>
          <div className="z-[999]">{children}</div>
        </body>
      </html>
    );
  }
  if (pathname.includes("/library-bot")) {
    return (
      <html lang="en" className="bg-white">
        <body className={font.className}>
          <div className="z-[999]">{children}</div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className="bg-white">
      {/* <head>
        {!restrictedFeatures?.includes("Accessibility-widget") && (
          <script src="../widget/accessibility.js"></script>
        )}
      </head> */}

      <HelpModeProvider>
        <>
          <body className={font.className} suppressHydrationWarning={true}>
            <UserProvider kindeUser={user}>
              <>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="light"
                  enableSystem
                  disableTransitionOnChange
                >
                  <ConfigProvider theme={{ hashed: false }}>
                    <AntdRegistry>
                      <Providers>
                        <LayoutComponent
                          restrictedPages={restrictedPages}
                          user={user}
                          children={children}
                          isDemoUser={isDemoUser}
                          isRestricted={isRestricted}
                        />
                        <ReadPaths />
                      </Providers>
                    </AntdRegistry>
                  </ConfigProvider>
                </ThemeProvider>
              </>

              <Toaster
                theme="light"
                closeButton
                richColors
                position="top-right"
              />
            </UserProvider>
          </body>
        </>
      </HelpModeProvider>
    </html>
  );
}

export default MainLayoutComponent;