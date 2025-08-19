import ConversationalForm from "@/components/job-aid/ConversationalForm";
import Navbar from "@/components/job-aid/navbar";
import React from "react";

interface JobAidPageProps {
  params: { id: string };
  searchParams: { job_aid?: string }; // 👈 add searchParams
}

const Page = async ({ params, searchParams }: JobAidPageProps) => {
  const is_job_aid = searchParams.job_aid === "true"; // 👈 check if job_aid is true
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
      <ConversationalForm job_aid_id={params.id} is_job_aid={is_job_aid} />
    </div>
  );
};


export default Page;
