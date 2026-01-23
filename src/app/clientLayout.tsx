"use client";

import MainLayoutComponent from "./MainLayout";
import ConsolePatch from "./ConsolePatch";
import { NetworkProvider } from "@/network/NetworkContext";
import { OfflineBanner } from "@/components/system/offlineBanner";
import { GlobalNetworkGuard } from "@/network/globalNetworkGuard";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";

export default function ClientLayout(props: any) {
  const pathname = usePathname();

  return (
    <>
    {/* <NetworkProvider>
      <GlobalNetworkGuard />
      <OfflineBanner /> */}
      <ConsolePatch />
      <MainLayoutComponent {...props} pathname={pathname} />

      <Toaster theme="light" richColors position="top-right" />
    {/* </NetworkProvider> */}
    </>
  );
}
