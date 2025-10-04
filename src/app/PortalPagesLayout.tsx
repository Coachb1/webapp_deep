"use client";

import { UserProvider } from "@/components/books/context/UserContext";
import UserInfoGate from "@/components/books/Userinfogate";
import Navbar from "@/components/job-aid/navbar";
// import NavBar from "@/components/no-kinde-portal/navBar";
import Script from "next/script";

export const metadata = {
  title: "Coachbot",
  description: "Coaching Simulations",
};

export default function PortalPageLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body>
        <UserProvider>
          <UserInfoGate>
            <Navbar />
            {children}
          </UserInfoGate>
        </UserProvider>

        <div id="portal-coachscribe" className="coachbots-coachscribe"></div>

      </body>
    </html>
  );
}
