"use client";

import VersionTwo from "@/app/content-library/VersionTwo";
import { usePortalUser } from "../books/context/UserContext";
import Widgets from "../Widgets";

const LeadershipLIbraryPage = () => {
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
      <VersionTwo user={user} />
      <Widgets from="content-library" />

    </>
  );
};

export default LeadershipLIbraryPage;
