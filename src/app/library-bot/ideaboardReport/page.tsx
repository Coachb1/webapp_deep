import { usePortalUser, UserProvider } from "@/components/books/context/UserContext";
import { IdeaBoardReport } from "@/components/books/leaderboard/ideaboardReport";
import UserInfoGate from "@/components/books/Userinfogate";
import { constructMetadata } from "@/lib/utils";


export const metadata = constructMetadata({
  title: "IdeaBoard - Coachbot",
});


interface IdeaboardPageProps {
  searchParams: { 
    email: string, 
    jobaid:string };
}

export default function Page({ searchParams }: IdeaboardPageProps) {
  const { email, jobaid } = searchParams;

  // Validate query params
  if (!email || !jobaid) {
    return (
      <div className="p-6 text-red-500 font-semibold">
        Invalid parameters provided.  
        <br />
        Expected: <b>?email=yourmail&jobaid=xyz</b>
      </div>
    );
  }

  return <IdeaBoardReport userEmail={email} jobaid={jobaid} />;
}
