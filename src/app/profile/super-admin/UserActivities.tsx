"use client";

import { useState } from "react";
import Select, { SingleValue } from "react-select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { baseURL, basicAuth } from "@/lib/utils";
import { Loader, PenBox, User, Wrench, X } from "lucide-react";
import { Modal } from "antd";

interface UserActivitiesProps {
  clientsData: { clientId: string; clientName: string }[];
  allUsers: { userEmail: string; userClientId: string; isDemoUser: boolean }[];
  getAllClientsData: () => void;
}

const UserActivities: React.FC<UserActivitiesProps> = ({
  clientsData,
  allUsers,
  getAllClientsData,
}) => {
  const [userModificationInit, setUserModificationInit] = useState(false);
  const [userUpdateLoading, setUserUpdateLoading] = useState(false);
  const [selectedUserForUpdate, setSelectedUserForUpdate] = useState<
    string | null
  >(null);
  const [oldActiveStatus, setOldActiveStatus] = useState<
    boolean | string | null
  >(null);
  const [newActiveStatus, setNewActiveStatus] = useState<
    boolean | string | null
  >(null);

  const updateUserStatusHandler = async () => {
    setUserUpdateLoading(true);
    try {
      const response = await fetch(
        `${baseURL}/accounts/client_id_user_modification/`,
        {
          method: "POST",
          headers: {
            Authorization: basicAuth,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            is_disable: newActiveStatus,
            user_email: selectedUserForUpdate,
          }),
        }
      );
      const data = await response.json();
      toast.success("Successfully updated status");
      getAllClientsData();
      cancelClientUserStatusHandler();
    } catch (err) {
      toast.error("Error updating the status. Try again.");
      console.error(err);
    } finally {
      setUserUpdateLoading(false);
    }
  };

  const cancelClientUserStatusHandler = () => {
    setUserModificationInit(false);
    setSelectedUserForUpdate(null);
    setOldActiveStatus(null);
    setNewActiveStatus(null);
  };

  return (
    <div>
      <Button
        onClick={() => setUserModificationInit(true)}
        disabled={clientsData.length === 0}
        variant={"default"}
        className="h-8 text-xs bg-blue-100 hover:bg-blue-50 text-blue-500"
      >
        <User className="inline h-4 w-4 mr-2" /> User Activities
      </Button>

      <Modal
        title="User Activities"
        centered
        open={userModificationInit}
        onCancel={() => setUserModificationInit(false)}
        width={window.innerWidth < 768 ? "80%" : "60%"}
        className="w-full"
        footer={false}
      >
        <div className="flex flex-col gap-4 w-full justify-end">
          <div className="mt-3 flex flex-row gap-2 self-start w-full max-sm:flex-col max-md:flex-col">
            <div className="w-full flex flex-col gap-2 items-start">
              <p className="block text-sm font-medium">Select the user</p>
              <Select
                onChange={(option) => {
                  if (option) {
                    const value = option.value;
                    setSelectedUserForUpdate(value);
                    const user = allUsers.find(
                      (user) => user.userEmail === value
                    );
                    setOldActiveStatus(user ? user.isDemoUser : null);
                  }
                }}
                options={allUsers.map((user) => ({
                  value: user.userEmail,
                  label: user.userEmail,
                }))}
                value={
                  selectedUserForUpdate
                    ? {
                        value: selectedUserForUpdate,
                        label: selectedUserForUpdate,
                      }
                    : null
                }
                className="w-full text-sm"
              />
            </div>
            <div className="w-full flex flex-col gap-2 items-start">
              <p className="block text-sm font-medium">Status</p>
              <Select
                value={
                  oldActiveStatus !== null
                    ? {
                        value: oldActiveStatus,
                        label: oldActiveStatus ? `Inactive` : `Active`,
                      }
                    : null
                }
                isDisabled
                className="w-full text-sm"
              />
            </div>
            <div className="w-full flex flex-col gap-2 items-start">
              <p className="block text-sm font-medium">New Status</p>
              <Select
                onChange={(option) => {
                  if (option) {
                    setNewActiveStatus(option.value);
                  }
                }}
                options={[
                  {
                    value: false,
                    label: `Active`,
                    isDisabled: !oldActiveStatus,
                  },
                  {
                    value: true,
                    label: `Inactive`,
                    isDisabled: oldActiveStatus ? true : false,
                  },
                ]}
                value={
                  newActiveStatus !== null
                    ? {
                        value: newActiveStatus,
                        label: newActiveStatus ? "Inactive" : "Active",
                        isDisabled: false,
                      }
                    : null
                }
                className="w-full text-sm"
              />
            </div>
          </div>
          <div className="self-end">
            <Button
              variant={"destructive"}
              className="max-sm:p-2 h-7 mt-2 hover:brightness-105 text-sm w-fit mr-2"
              onClick={cancelClientUserStatusHandler}
            >
              Cancel <X className="ml-2 h-4 w-4" />
            </Button>
            <Button
              disabled={
                selectedUserForUpdate === null || newActiveStatus === null
              }
              className="max-sm:p-2 h-7 mt-2 hover:brightness-105 bg-blue-600"
              onClick={updateUserStatusHandler}
            >
              {userUpdateLoading ? (
                <>
                  Changing <Loader className="ml-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  Confirm change <PenBox className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserActivities;
