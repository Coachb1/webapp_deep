import { UserProvider } from "@/components/books/context/UserContext";
import AiPulseReport from "@/components/books/AiPulseReport/AiPulseReport";
import UserInfoGate from "@/components/books/Userinfogate";
import { constructMetadata } from "@/lib/utils";
import UserInfoWall from "@/components/books/UserLoginWall";


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