import { IdeaBoardReport } from "@/components/books/leaderboard/ideaboardReport";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "IdeaBoard - Coachbot",
});

interface IdeaboardPageProps {
  searchParams: {
    email: string;
    jobaid: string;
    onlyclientsetup?: string;
  };
}

export default function Page({ searchParams }: IdeaboardPageProps) {
  const { email, jobaid, onlyclientsetup } = searchParams;

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

  return (
    <IdeaBoardReport
      userEmail={email}
      jobaid={jobaid}
      onlyclientsetup={onlyclientsetup ? onlyclientsetup === "true" : false} 
    />
  );
}
