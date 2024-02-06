import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Link2 } from "lucide-react";

const AdminReports = ({ user }: any) => {
  return (
    <div className="bg-accent p-2 mt-2 rounded-md">
      <div className="pl-4 max-sm:pl-2 pt-2 text-blue-500">Client Admin</div>
      <div className="m-4 flex flex-row items-center">
        <p className="text-sm">Mapping report</p>
        <>
          <Button className="ml-8 h-6 w-fit max-sm:ml-2">
            <>
              <Link
                href={`https://myreportdev.coachbots.com/coachCoacheeMappingReport`}
                target="_blank"
              >
                Link <Link2 className={`h-4 w-4 ml-2 inline`} />
              </Link>
            </>
          </Button>
        </>
      </div>
      <div className="m-4 flex flex-row items-center">
        <p className="text-sm">Leaderboard report</p>
        <>
          <Button className="ml-8 h-6 w-fit max-sm:ml-2">
            <>
              <Link
                href={`https://myreportdev.coachbots.com/participantLeaderboardReport`}
                target="_blank"
              >
                Link <Link2 className={`h-4 w-4 ml-2 inline`} />
              </Link>
            </>
          </Button>
        </>
      </div>
    </div>
  );
};

export default AdminReports;
