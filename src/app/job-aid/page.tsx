import ConversationalForm from "@/components/job-aid/ConversationalForm";
import Navbar from "@/components/job-aid/navbar";
import React from "react";

interface PageProps {
  searchParams: { job_aid?: string };
}

const Page = async ({ searchParams }: PageProps) => {
  const is_job_aid = searchParams.job_aid === "true"; // ✅ parse query param

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
      <ConversationalForm job_aid_id="54cb0812-742a-4768-b7fa-599ded50604e" is_job_aid={is_job_aid} />
    </div>
  );
};

export default Page;
