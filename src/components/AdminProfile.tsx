import Link from "next/link";
import { Button } from "./ui/button";
import { Link2 } from "lucide-react";
import { baseURL } from "@/lib/utils";

const AdminProfile = ({ user }: any) => {
  return (
    <div className="bg-accent p-2 mt-2 rounded-md">
      <div className="pl-4 max-sm:pl-2 pt-2 text-blue-500">Admin's space</div>
      <div className="m-4 flex flex-row items-center">
        <p className="text-sm">Bulk Upload</p>
        <>
          <Button className="ml-8 h-6 w-fit max-sm:ml-2">
            <>
              <Link
                href={`https://coach-api-ovh.coachbots.com/api/test-bulk-upload`}
                target="_blank"
              >
                Link <Link2 className={`h-4 w-4 ml-2 inline`} />
              </Link>
            </>
          </Button>
        </>
      </div>
      <div className="m-4 flex flex-row items-center">
        <p className="text-sm">Django Dashboard</p>
        <>
          <Button className="ml-8 h-6 w-fit max-sm:ml-2">
            <>
              <Link
                href={`https://coach-api-ovh.coachbots.com/custom-admin`}
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

export default AdminProfile;
