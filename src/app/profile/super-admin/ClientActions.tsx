"use client";

import { useState } from "react";
import Select, { SingleValue } from "react-select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { baseURL, basicAuth } from "@/lib/utils";
import { ClientDataType } from "@/lib/types";
import { Loader, PenBox, Wrench, X } from "lucide-react";
import { Modal } from "antd";

interface ClientActionsProps {
  clientsData: ClientDataType[];
  allUsers: { userEmail: string; userClientId: string; isDemoUser: boolean }[];
  getAllClientsData: () => void;
}

const ClientActions: React.FC<ClientActionsProps> = ({
  clientsData,
  allUsers,
  getAllClientsData,
}) => {
  const [changeClientInit, setChangeClientInit] = useState(false);
  const [changeLoading, setChangeLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [oldClientId, setOldClientId] = useState<string | null>(null);
  const [newClientId, setNewClientId] = useState<string | null>(null);

  const changeUsersClientHandler = async () => {
    setChangeLoading(true);
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
            new_client_id: newClientId,
            user_email: selectedUser,
          }),
        }
      );
      const data = await response.json();
      toast.success("Successfully changed the client.");
      getAllClientsData();
      cancelChangeClientHandler();
    } catch (err) {
      toast.error("Error changing the client. Try again.");
      console.error(err);
    } finally {
      setChangeLoading(false);
    }
  };

  const cancelChangeClientHandler = () => {
    setChangeClientInit(false);
    setSelectedUser(null);
    setOldClientId(null);
    setNewClientId(null);
  };

  return (
    <div>
      <Button
        onClick={() => setChangeClientInit(true)}
        disabled={clientsData.length === 0}
        variant={"default"}
        className="h-8 text-xs bg-blue-100 hover:bg-blue-50 text-blue-500"
      >
        <Wrench className="inline h-4 w-4 mr-2" /> Change Users Client
      </Button>

      <Modal
        title="Change Users Client"
        centered
        open={changeClientInit}
        onCancel={() => setChangeClientInit(false)}
        width={window.innerWidth < 768 ? "80%" : "60%"}
        className="w-full"
        footer={false}
      >
        <div className="flex flex-col gap-4 w-full justify-end">
          <div className="mt-3 flex flex-row gap-2 self-start w-full max-sm:flex-col max-md:flex-col">
            <div className="w-full flex flex-col gap-2 items-start">
              <p className="block text-sm font-medium">Select the user</p>
              <Select
                onChange={(
                  option: SingleValue<{ value: string; label: string }>
                ) => {
                  if (option) {
                    const value = option.value;
                    setSelectedUser(value);
                    setOldClientId(
                      allUsers.find((user) => user.userEmail === value)
                        ?.userClientId || ""
                    );
                  }
                }}
                options={allUsers.map((user) => ({
                  value: user.userEmail,
                  label: user.userEmail,
                }))}
                value={
                  selectedUser
                    ? { value: selectedUser, label: selectedUser }
                    : null
                }
                className="w-full text-sm"
              />
            </div>
            <div className="w-full flex flex-col gap-2 items-start">
              <p className="block text-sm font-medium">Old client</p>
              <Select
                value={
                  oldClientId
                    ? {
                        value: oldClientId,
                        label: `${
                          clientsData.find(
                            (client) => client.clientId === oldClientId
                          )?.clientName
                        } : ${oldClientId}`,
                      }
                    : null
                }
                isDisabled
                className="w-full text-sm"
              />
            </div>
            <div className="w-full flex flex-col gap-2 items-start">
              <p className="block text-sm font-medium">Select new client</p>
              <Select
                onChange={(
                  option: SingleValue<{ value: string; label: string }>
                ) => {
                  if (option) {
                    setNewClientId(option.value);
                  }
                }}
                options={clientsData.map((client) => ({
                  value: client.clientId,
                  label: `${client.clientName} : ${client.clientId}`,
                  isDisabled: client.clientId === oldClientId,
                }))}
                value={
                  newClientId
                    ? {
                        value: newClientId,
                        label: `${
                          clientsData.find(
                            (client) => client.clientId === newClientId
                          )?.clientName
                        } : ${newClientId}`,
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
              onClick={cancelChangeClientHandler}
            >
              Cancel <X className="ml-2 h-4 w-4" />
            </Button>
            <Button
              disabled={!selectedUser || !oldClientId || !newClientId}
              className="max-sm:p-2 h-7 mt-2 hover:brightness-105 bg-blue-600"
              onClick={changeUsersClientHandler}
            >
              {changeLoading ? (
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

export default ClientActions;
