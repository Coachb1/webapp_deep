import ConversationalForm from "@/components/job-aid/ConversationalForm";
import Navbar from "@/components/job-aid/navbar";
import React from "react";

interface JobAidPageProps {
  params: { uid: string };
}

const Page = async ({ params }: JobAidPageProps) => {
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
      <ConversationalForm job_aid_id={params.uid} />
    </div>
  );
};


export default Page;
