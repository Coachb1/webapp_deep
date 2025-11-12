import Navbar from "@/components/job-aid/navbar";
import CommunicationCourse from "@/components/course/CourseFLow";
import React from "react";
import CoachbotsWidget from "@/components/course/courseWidget";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Course - Coachbot",
});

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
