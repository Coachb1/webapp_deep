import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Link2 } from "lucide-react";
import HelpMode from "@/components/HelpMode";
import { reportsLinksSelector } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import DataIntegration from "./client-admin/DataIntegration";

const AdminReports = ({ user, clientName }: any) => {
  const HelpModeSteps = [
    {
      target: "#kudosreport",
      content:
        "Report based on peer feedback network - positive and negative feedback report received. ",
    },
    {
      target: "#pt-usage",
      content:
        "Blended report that shows partipant usage plus score achievement in a leaderboard format.",
    },
    {
      target: "#pt-mapping",
      content:
        "As members of the network establish the connections they are reflected in this report. These are the relationships between coach(mentor) and coachee(mentee).",
    },
    {
      target: "#attr",
      content:
        "Prediction of potential employee churn probability based on user behavior analysis when available. ",
    },
    {
      target: "#suc-red",
      content:
        "Prediction of potential employee sucession and promotion readiness based on user behavior analysis when available. ",
    },
  ];

  return (
    <div className="bg-accent p-2 mt-2 rounded-md">
      <HelpMode steps={HelpModeSteps} />
      <div className="pl-4 max-sm:pl-2 pt-2 text-blue-500 flex flex-row items-center">
        Client Admin <Badge className="ml-2">Beta</Badge>
      </div>
      <div id="kudosreport" className="m-4 flex flex-row items-center w-fit">
        <p className="text-sm max-sm:text-xs">Kudos Board</p>
        <>
          <Button className="ml-8 h-6 w-fit min-w-fit  max-sm:ml-2">
            <>
              <Link
                href={`${reportsLinksSelector()}/kudosBoard/?email=${
                  user.email
                }`}
                target="_blank"
                className="max-sm:text-xs"
              >
                Link <Link2 className={`h-4 w-4 ml-2 inline`} />
              </Link>
            </>
          </Button>
        </>
      </div>
      <div id="pt-usage" className="m-4 flex flex-row items-center  w-fit">
        <p className="text-sm max-sm:text-xs"> Participant Usage Leaderboard</p>
        <>
          <Button className="ml-8 h-6 w-fit min-w-fit max-sm:ml-2">
            <>
              <Link
                href={`${reportsLinksSelector()}/participantLeaderboardReport/?email=${
                  user.email
                }`}
                target="_blank"
                className="max-sm:text-xs"
              >
                Link <Link2 className={`h-4 w-4 ml-2 inline`} />
              </Link>
            </>
          </Button>
        </>
      </div>
      <div id="pt-mapping" className="m-4 flex flex-row items-center w-fit">
        <p className="text-sm max-sm:text-xs ">Participant Mapping report</p>
        <>
          <Button className="ml-8 h-6 w-fit min-w-fit max-sm:ml-2">
            <>
              <Link
                href={`${reportsLinksSelector()}/participantMappingReport/?email=${
                  user.email
                }`}
                target="_blank"
                className="max-sm:text-xs"
              >
                Link <Link2 className={`h-4 w-4 ml-2 inline`} />
              </Link>
            </>
          </Button>
        </>
      </div>
      <div id="attr" className="m-4 flex flex-row items-center w-fit">
        <p className="text-sm max-sm:text-xs">Attrition report (Sample)</p>
        <>
          <Button className="ml-8 h-6 w-fit min-w-fit max-sm:ml-2">
            <>
              <Link
                href={`${reportsLinksSelector()}/attritionReport/`}
                target="_blank"
                className="max-sm:text-xs"
              >
                Link <Link2 className={`h-4 w-4 ml-2 inline`} />
              </Link>
            </>
          </Button>
        </>
      </div>
      <div id="suc-red" className="m-4 flex flex-row items-center w-fit">
        <p className="text-sm max-sm:text-xs">
          Succession & Promotion Readiness report (Sample)
        </p>
        <>
          <Button className="ml-8 h-6 w-fit min-w-fit max-sm:ml-2">
            <>
              <Link
                href={`${reportsLinksSelector()}/successionReport/`}
                target="_blank"
                className="max-sm:text-xs"
              >
                Link <Link2 className={`h-4 w-4 ml-2 inline `} />
              </Link>
            </>
          </Button>
        </>
      </div>
      <div className="m-4 h-[2px] bg-gray-400 rounded-xl" />
      <div className="m-4 my-6">
        <p className="text-base max-sm:text-sm font-semibold">Actions</p>
        <div className="flex flex-row items-start gap-4 flex-wrap my-2">
          <DataIntegration clientName={clientName} />
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
