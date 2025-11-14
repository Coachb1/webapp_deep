import ConversationalForm from "@/components/job-aid/ConversationalForm";
import Navbar from "@/components/job-aid/navbar";
import { constructMetadata } from "@/lib/utils";
import React from "react";

export const metadata = constructMetadata({
  title: "JobAid - Coachbot",
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
      <Navbar />
      <ConversationalForm 
      job_aid_id="54cb0812-742a-4768-b7fa-599ded50604e"
      isEmailSection={true}
       />
    </div>
  );
};

export default Page;
