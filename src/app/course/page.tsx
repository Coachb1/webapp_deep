import Navbar from "@/components/job-aid/navbar";
import React from "react";


const Page = async () => {

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Navbar />
    </div>
  );
};

export default Page;
