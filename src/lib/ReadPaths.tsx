"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const ReadPaths = () => {
  const pathname = usePathname();

  useEffect(() => {
    localStorage.setItem("visitedPaths", JSON.stringify([]));
  }, []);

  useEffect(() => {
    console.log(pathname);
    let previousPaths = JSON.parse(
      localStorage.getItem("visitedPaths") || "[]"
    );
    console.log("previousPaths : ", previousPaths);
    previousPaths.push(pathname);

    localStorage.setItem("visitedPaths", JSON.stringify(previousPaths));
  }, [pathname]);

  return <></>;
};
