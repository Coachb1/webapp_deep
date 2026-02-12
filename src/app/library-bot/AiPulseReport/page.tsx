import AiPulseReport from "@/components/books/AiPulseReport/AiPulseReport";
import { constructMetadata } from "@/lib/utils";


export const metadata = constructMetadata({
  title: "AI Pulse - Coachbot",
});

interface BookPageProps {
  searchParams: { 
    package_course_id: string,
    client_id: string;
  };
}

export default function Page({ searchParams }: BookPageProps) {
  return (
    <AiPulseReport packageCourseId={searchParams.package_course_id} clientId={searchParams.client_id} />
  );
}