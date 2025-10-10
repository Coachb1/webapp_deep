import { IdeaBoardReport } from "@/components/books/leaderboard/ideaboardReport";

interface IdeaboardPageProps {
  searchParams: { email: string, 
    jobaid:string };
}

export default function Page({ searchParams }: IdeaboardPageProps) {
  return <IdeaBoardReport userEmail={searchParams.email} jobaid={searchParams.jobaid} />;
}
