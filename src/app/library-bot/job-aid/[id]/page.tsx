import ConversationalForm from "@/components/job-aid/ConversationalForm";
import Navbar from "@/components/job-aid/navbar";
import React from "react";

interface JobAidPageProps {
  params: { id: string };
  searchParams: { job_aid?: string }; // 👈 add searchParams
}

const Page = async ({ params, searchParams }: JobAidPageProps) => {
  const isEmailSection = false; 
  const inputName = "User";
  const inputEmail = "user@gmail.com";
  const RedirectURl = "http://localhost:3000/library-bot";
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
      isEmailSection={isEmailSection} 
        inputName={inputName} 
        inputEmail={inputEmail} 
        redirectURL="http://localhost:3000/library-bot"/>
    </div>
  );
};


export default Page;
