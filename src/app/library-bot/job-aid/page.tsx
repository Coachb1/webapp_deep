import ConversationalForm from "@/components/job-aid/ConversationalForm";
import Navbar from "@/components/job-aid/navbar";
import React from "react";


const Page = async () => {
const isEmailSection = false;
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
      <ConversationalForm job_aid_id="54cb0812-742a-4768-b7fa-599ded50604e" isEmailSection />
    </div>
  );
};

export default Page;
