"use client";

import Link from "next/link";
import { Button } from "../../components/ui/button";
import { Link2 } from "lucide-react";
import {
  baseURL,
  basicAuth,
  getAllUsers,
  parseClientData,
  parseClientUsers,
} from "@/lib/utils";
import { useEffect, useState } from "react";
import { AllUserDataType, ClientDataType } from "@/lib/types";
import { toast } from "sonner";
import ClientActions from "./super-admin/ClientActions";
import UserActivities from "./super-admin/UserActivities";
import AddNewClient from "./super-admin/AddNewClient";
import Clients from "./super-admin/Clients";
import ProfileActions from "./super-admin/ProfilesActions";
import UserRestrictions from "./super-admin/UserRestrictions";
import SystemInfo from "./super-admin/SystemInfo";
import RecommendationProfiles from "./super-admin/RecommendationProfiles";
import DataIntegration from "./super-admin/DataIntegration";

const AdminProfile = ({ user, userId }: { user: any; userId: string }) => {
  const [loading, setLoading] = useState(true);

  const [clientsData, setClientsData] = useState<ClientDataType[]>([]);
  const [allUsers, setAllUsers] = useState<
    { userEmail: string; userClientId: string; isDemoUser: boolean }[]
  >([]);

  const [allUsersAccount, setAllUsersAccount] = useState<AllUserDataType[]>([]);

  const getAllClientsData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${baseURL}/accounts/client_id_user_modification`,
        {
          method: "GET",
          headers: { Authorization: basicAuth },
        }
      );
      const data = await response.json();
      console.log(data);
      console.log(parseClientData(data));
      setClientsData(parseClientData(data));
      setAllUsers(parseClientUsers(data));
      console.log(getAllUsers(data));
      setAllUsersAccount(getAllUsers(data));
    } catch (err) {
      toast.error("Error fetching client data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllClientsData();
  }, []);

  return (
    <div className="bg-accent p-2 mt-2 rounded-md">
      <div className="pl-4 max-sm:pl-2 pt-2 text-blue-500">Admin's space</div>
      <div className="m-4 flex flex-row items-center">
        <p className="text-sm max-sm:text-xs w-[15%] max-sm:w-[40%] max-lg:w-[40%]">
          Bulk Upload
        </p>
        <Button className="ml-8 h-6 w-fit max-sm:ml-2">
          <Link
            href={`https://coach-api-ovh.coachbots.com/api/test-bulk-upload`}
            target="_blank"
            className="max-sm:text-xs"
          >
            Link <Link2 className="h-4 w-4 ml-2 inline" />
          </Link>
        </Button>
      </div>
      <div className="m-4 flex flex-row items-center">
        <p className="text-sm max-sm:text-xs w-[15%] max-sm:w-[40%] max-lg:w-[40%]">
          Django Dashboard
        </p>
        <Button className="ml-8 h-6 w-fit max-sm:ml-2">
          <Link
            href={`https://coach-api-ovh.coachbots.com/custom-admin`}
            target="_blank"
            className="max-sm:text-xs"
          >
            Link <Link2 className="h-4 w-4 ml-2 inline" />
          </Link>
        </Button>
      </div>

      <div className="m-4 h-[2px] bg-gray-400 rounded-xl" />
      <Clients clientsData={clientsData} loading={loading} />

      <div className="m-4 my-6">
        <p className="text-base max-sm:text-sm font-semibold">Actions</p>
        <div className="flex flex-row items-start gap-4 flex-wrap my-2">
          <ClientActions
            clientsData={clientsData}
            allUsers={allUsers}
            getAllClientsData={getAllClientsData}
          />

          <UserActivities
            clientsData={clientsData}
            allUsers={allUsers}
            getAllClientsData={getAllClientsData}
          />

          <AddNewClient getAllClientsData={getAllClientsData} />

          <ProfileActions />

          <UserRestrictions
            allUsers={allUsersAccount}
            getAllClientsData={getAllClientsData}
          />

          <SystemInfo />

          <RecommendationProfiles />

          <DataIntegration />
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
