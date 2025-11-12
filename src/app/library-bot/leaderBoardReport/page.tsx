import { UserProvider } from "@/components/books/context/UserContext";
import LeaderBoardReport from "@/components/books/LeaderBoardReport/LeaderBoardReport";
import UserInfoGate from "@/components/books/Userinfogate";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "LeaderBoard - Coachbot",
});


interface BookPageProps {
  searchParams: { package_course_id: string };
}

export default function Page({ searchParams }: BookPageProps) {
  return (
    <UserProvider>
      <UserInfoGate>
        <LeaderBoardReport packageCourseId={searchParams.package_course_id} />
      </UserInfoGate>
    </UserProvider>
  );
}
