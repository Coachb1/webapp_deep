"use client";

import { Raleway } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { HelpModeProvider } from "@/lib/helpmodeContext";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import LayoutComponent from "./LayoutComponent";
import Providers from "./ProgressBarProvider";
import { UserProvider } from "@/context/UserContext";
import { ConfigProvider } from "antd";
import { ReadPaths } from "@/lib/ReadPaths";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import PortalPageLayout from "./PortalPagesLayout";
import { NetworkProvider } from "@/network/NetworkContext";
import { GlobalNetworkGuard } from "@/network/globalNetworkGuard";
import { OfflineBanner } from "@/components/system/offlineBanner";
import DevToolsBlocker from "@/components/devToolBlocker";

const font = Raleway({ subsets: ["latin"] });

const MainLayoutComponent = ({
  user,
  children,
  isDemoUser,
  isRestricted,
  restrictedPages,
  pathname,
}: {
  user: KindeUser | null;
  children: React.ReactNode;
  isDemoUser: boolean;
  isRestricted: boolean;
  restrictedPages: string;
  pathname: string;
}) => {
  // ✅ Special case: Job Aid pages → Skip global layout (but keep consistent structure)
  if (
    pathname.startsWith("/job-aid") ||
    pathname.startsWith("/presentation-bot")
  ) {
    return (
      <>
        <div className="z-[999]">{children}</div>
      </>
    );
  }

  if (pathname.startsWith("/course")) {
    return (
      <>
        <div className="z-[999]">{children}</div>
      </>
    );
  }
  if (pathname.includes("/library-bot")) {
    return (
      <>
        <DevToolsBlocker />
        <NetworkProvider>
          <GlobalNetworkGuard />
          <OfflineBanner />
          <div className="z-[999]">{children}</div>
        </NetworkProvider>
      </>
    );
  }
  if (pathname.includes("/company-iq")) {
    return (
      <>
        <div className="z-[999]">{children}</div>
      </>
    );
  }

  if (pathname.includes("/portal")) {
    if (pathname.includes("/portal/simReport")) {
      return (
        <NetworkProvider>
          <GlobalNetworkGuard />
          <OfflineBanner />
          <div className="z-[999]">{children}</div>
        </NetworkProvider>
      );
    }
    return (
      <NetworkProvider>
        <GlobalNetworkGuard />
        <OfflineBanner />
        <HelpModeProvider>
          <PortalPageLayout>
            <Providers>{children}</Providers>
          </PortalPageLayout>
        </HelpModeProvider>
      </NetworkProvider>
    );
  }

  return (
    <HelpModeProvider>
      <>
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
        </UserProvider>
      </>
    </HelpModeProvider>
  );
};

export default MainLayoutComponent;
