import { UserProvider } from "@/components/books/context/UserContext";
import LeaderBoardReport from "@/components/books/LeaderBoardReport/LeaderBoardReport";
import UserInfoGate from "@/components/books/Userinfogate";
import UserInfoWall from "@/components/books/UserLoginWall";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "LeaderBoard - Coachbot",
});


interface BookPageProps {
  searchParams: { package_course_id: string; client_id: string };
}

export default function Page({ searchParams }: BookPageProps) {
  return (
    <LeaderBoardReport packageCourseId={searchParams.package_course_id} client_id={searchParams.client_id} />
  );
}
