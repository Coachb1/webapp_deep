import Navbar from "@/components/job-aid/navbar";
import { constructMetadata } from "@/lib/utils";
import React from "react";


export const metadata = constructMetadata({
  title: "Course - Coachbot",
});


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
