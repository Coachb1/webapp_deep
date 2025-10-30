// page.tsx
"use client";

import React from "react";
import SimReport from "@/components/content-library/simReport"; // ✅ adjust the path based on your folder structure

const Page = () => {
  return (
    <main className="p-6">
      {/* Call your component here */}
      <SimReport/>
    </main>
  );
};

export default Page;