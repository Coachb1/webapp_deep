import { UserProvider } from "@/components/books/context/UserContext";
import AiPulseReport from "@/components/books/AiPulseReport/AiPulseReport";
import UserInfoGate from "@/components/books/Userinfogate";

interface BookPageProps {
  searchParams: { package_course_id: string };
}

export default function Page({ searchParams }: BookPageProps) {
  return (
    <UserProvider>
      <UserInfoGate>
        <AiPulseReport />
      </UserInfoGate>
    </UserProvider>
  );
}