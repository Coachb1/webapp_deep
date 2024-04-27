import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Link2 } from "lucide-react";

const AdminReports = ({ user }: any) => {
  return (
    <div className="bg-accent p-2 mt-2 rounded-md">
      <div className="pl-4 max-sm:pl-2 pt-2 text-blue-500">Client Admin</div>
      <div className="m-4 flex flex-row items-center">
        <p className="text-sm">Kudos board</p>
        <>
          <Button className="ml-8 h-6 w-fit max-sm:ml-2">
            <>
              <Link
                href={`https://myreportdev.coachbots.com/kudosBoard/?email=${user.email}`}
                target="_blank"
              >
                Link <Link2 className={`h-4 w-4 ml-2 inline`} />
              </Link>
            </>
          </Button>
        </>
      </div>
      <div className="m-4 flex flex-row items-center">
        <p className="text-sm"> Participant Usage Leaderboard</p>
        <>
          <Button className="ml-8 h-6 w-fit max-sm:ml-2">
            <>
              <Link
                href={`https://myreportdev.coachbots.com/participantLeaderboardReport/?email=${user.email}`}
                target="_blank"
              >
                Link <Link2 className={`h-4 w-4 ml-2 inline`} />
              </Link>
            </>
          </Button>
        </>
      </div>
      <div className="m-4 flex flex-row items-center">
        <p className="text-sm">Participant mapping report</p>
        <>
          <Button className="ml-8 h-6 w-fit max-sm:ml-2">
            <>
              <Link
                href={`https://myreportdev.coachbots.com/participantMappingReport/?email=${user.email}`}
                target="_blank"
              >
                Link <Link2 className={`h-4 w-4 ml-2 inline`} />
              </Link>
            </>
          </Button>
        </>
      </div>
      <div className="m-4 flex flex-row items-center">
        <p className="text-sm">Attrition report</p>
        <>
          <Button className="ml-8 h-6 w-fit max-sm:ml-2">
            <>
              <Link
                href={`https://myreportdev.coachbots.com/attritionReport/`}
                target="_blank"
              >
                Link <Link2 className={`h-4 w-4 ml-2 inline`} />
              </Link>
            </>
          </Button>
        </>
      </div>
      <div className="m-4 flex flex-row items-center">
        <p className="text-sm">Succession & Promotion Readiness report</p>
        <>
          <Button className="ml-8 h-6 w-fit max-sm:ml-2">
            <>
              <Link
                href={`https://myreportdev.coachbots.com/successionReport/`}
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
