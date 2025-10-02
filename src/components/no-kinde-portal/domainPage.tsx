"use client";

import VersionOne from "@/app/domain-skills-library/VersionOne";
import { usePortalUser } from "../books/context/UserContext";
import Widgets from "../Widgets";

const DomainPage = () => {
  const { user, loading } = usePortalUser();

  // Still loading user info
  if (loading) {
    return null;
  }

  // User not logged in (UserInfoGate should redirect or show login)
  if (!user) {
    return null;
  }

  (window as any).user = user;

  return (
    <>

      <VersionOne user={user} />
      <Widgets from="domain-skills-library" />
      
    </>
  );
};

export default DomainPage;
