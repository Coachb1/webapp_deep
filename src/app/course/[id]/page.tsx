import Navbar from "@/components/job-aid/navbar";
import React from "react";

interface CoursePageProps {
  params: { id: string };
}

const Page = async ({params}: CoursePageProps) => {
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
