"use client";

import {
  usePortalUser,
  UserProvider,
} from "@/components/books/context/UserContext";
import UserInfoGate from "@/components/books/Userinfogate";
import Navbar from "@/components/job-aid/navbar";
import { RestrictedPage } from "@/components/no-kinde-portal/RestrictedWall";

export const metadata = {
  title: "Coachbot",
  description: "Coaching Simulations",
};

function PortalPageContent({ children }: { children: React.ReactNode }) {
  const { user, userInfo } = usePortalUser();

  console.log('PortaluserInfo', userInfo.isDemoUser)
  
  return (
    <UserInfoGate>
      {userInfo?.isDemoUser || !userInfo?.is_active ? <RestrictedPage user={user} /> : (
        <>
        <Navbar clientId={userInfo.clientId}/>
        {children}
        </>
        )}
    </UserInfoGate>
  );
}

export default function PortalPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UserProvider>
        <PortalPageContent>{children}</PortalPageContent>
      </UserProvider>
      <div id="portal-coachscribe" className="coachbots-coachscribe"></div>
    </>
  );
}
