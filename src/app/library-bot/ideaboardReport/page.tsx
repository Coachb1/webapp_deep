import { IdeaBoardReport } from "@/components/books/leaderboard/ideaboardReport";
import { constructMetadata } from "@/lib/utils";


export const metadata = constructMetadata({
  title: "IdeaBoard - Coachbot",
});


interface IdeaboardPageProps {
  searchParams: { email: string, 
    jobaid:string };
}

export default function Page({ searchParams }: IdeaboardPageProps) {
  return <IdeaBoardReport userEmail={searchParams.email} jobaid={searchParams.jobaid} />;
}
