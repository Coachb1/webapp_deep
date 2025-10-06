"use client";

import { Button } from "../ui/button";

export const LogoutPortalUser = () => {

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    window.location.reload();
  };

  return (
    <Button
      onClick={handleLogout}
      className="mt-2 px-4 py-2 text-sm font-semibold text-white rounded-md hover:bg-teal-700 transition-colors"
      style={{ backgroundColor: "#008080" }}
    >
      Logout
    </Button>
  );
};
