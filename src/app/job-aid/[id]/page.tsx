import ConversationalForm from "@/components/job-aid/ConversationalForm";
import Navbar from "@/components/job-aid/navbar";
import { constructMetadata } from "@/lib/utils";
import React from "react";


export const metadata = constructMetadata({
  title: "JobAid - Coachbot",
});


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
      <ConversationalForm job_aid_id={params.id} 
      isEmailSection={true}
      />
    </div>
  );
};


export default Page;
