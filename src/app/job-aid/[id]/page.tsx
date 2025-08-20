import ConversationalForm from "@/components/job-aid/ConversationalForm";
import Navbar from "@/components/job-aid/navbar";
import React from "react";

interface JobAidPageProps {
  params: { id: string };
  searchParams: { job_aid?: string }; // 👈 add searchParams
}

const Page = async ({ params, searchParams }: JobAidPageProps) => {
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
      <ConversationalForm job_aid_id={params.id}/>
    </div>
  );
};


export default Page;
