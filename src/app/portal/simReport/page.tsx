import React from "react";
import { constructMetadata } from "@/lib/utils";
import SimReport from "@/components/content-library/simReport";

export const metadata = constructMetadata({
  title: "Simulation Report - Coachbot",
});

// searchparams  
interface SimReportProps {
  client_id: string;
}
const Page = ({ searchParams }: { searchParams: SimReportProps }) => {
  return (
      <SimReport client_id={searchParams.client_id} />
  );
};

export default Page;