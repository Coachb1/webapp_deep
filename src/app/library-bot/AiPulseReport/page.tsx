import { UserProvider } from "@/components/books/context/UserContext";
import AiPulseReport from "@/components/books/AiPulseReport/AiPulseReport";
import UserInfoGate from "@/components/books/Userinfogate";
import { constructMetadata } from "@/lib/utils";


export const metadata = constructMetadata({
  title: "AI Pulse - Coachbot",
});

interface BookPageProps {
  searchParams: { package_course_id: string };
}

export default function Page({ searchParams }: BookPageProps) {
  return (
    <UserProvider>
      <UserInfoGate>
        <AiPulseReport packageCourseId={searchParams.package_course_id} />
      </UserInfoGate>
    </UserProvider>
  );
}