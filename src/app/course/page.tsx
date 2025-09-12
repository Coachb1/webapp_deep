import Navbar from "@/components/job-aid/navbar";
import CommunicationCourse from "@/components/course/CourseFLow";
import React from "react";
import CoachbotsWidget from "@/components/course/courseWidget";


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
      {/* <Navbar /> */}
      <CommunicationCourse />
      <CoachbotsWidget/>
    </div>
  );
};

export default Page;
