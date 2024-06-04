"use client";

import Link from "next/link";
import { Button } from "../../components/ui/button";
import {
  Link2,
  Loader,
  PenBox,
  Users2,
  X,
  PlusCircle,
  Wrench,
} from "lucide-react";
import {
  baseURL,
  basicAuth,
  parseClientData,
  parseClientUsers,
} from "@/lib/utils";
import { useEffect, useState } from "react";
import Select, { MultiValue, SingleValue } from "react-select";
import { ClientDataType } from "@/lib/types";
import { UsersPopover, ActionsPopver } from "@/components/ui/UsersPopover";
import { toast } from "sonner";

interface OptionType {
  value: string;
  label: string;
}

const AdminProfile = ({ user }: any) => {
  const [changeClientInit, setChangeClientInit] = useState(false);
  const [loading, setLoading] = useState(true);
  const [changeLoading, setChangeLoading] = useState(false);
  const [userUpdateLoading, setUserUpdateLoading] = useState(false);
  const [userModificationInit, setUserModificationInit] = useState(false);
  const [selectedUserForUpdate, setSelectedUserForUpdate] = useState<
    string | null
  >(null);
  const [oldActiveStatus, setOldActiveStatus] = useState<
    boolean | string | null
  >(null);
  const [newActiveStatus, setNewActiveStatus] = useState<
    boolean | string | null
  >(null);
  const [clientsData, setClientsData] = useState<ClientDataType[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [oldClientId, setOldClientId] = useState<string | null>(null);
  const [newClientId, setNewClientId] = useState<string | null>(null);
  const [allUsers, setAllUsers] = useState<
    { userEmail: string; userClientId: string; isDemoUser: boolean }[]
  >([]);
  const [newClientInit, setNewClientInit] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [newDomainName, setNewDomainName] = useState("");
  const [newMemberEmails, setNewMemberEmails] = useState("");
  const [newAllowedIps, setNewAllowedIps] = useState("");
  const [newRestrictedPages, setNewRestrictedPages] = useState<OptionType[]>(
    []
  );

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

  const updateUserStatusHandler = async () => {
    setUserUpdateLoading(true);
    console.log(
      `updateUserStatusHandler  `,
      newActiveStatus,
      selectedUserForUpdate,
      oldActiveStatus
    );
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

  const newClientHandler = async () => {
    setChangeLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", basicAuth);
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        client_name: newClientName,
        restricted_pages: newRestrictedPages
          .map((page) => page.value)
          .join(","),
        allowed_ips: newAllowedIps,
        domain_name: newDomainName,
        member_emails: newMemberEmails,
      });

      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      const response = await fetch(
        `${baseURL}/accounts/get-create-or-update-client-id/`,
        requestOptions
      );

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errorMessage = "Unknown error";
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const result = await response.json();
          errorMessage = result.error || errorMessage;
        } else {
          errorMessage = await response.text();
        }
        if (errorMessage.includes("name")) {
          toast.error("Client already exists");
        } else {
          throw new Error(errorMessage);
        }
      } else {
        const result = await response.text();
        toast.success("Successfully created the client.");
        console.log(result);
        getAllClientsData();
        cancelNewClientHandler();
      }
    } catch (error: any) {
      toast.error(`Error creating the client: Client already exists`);
      console.error(error);
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

  const cancelClientUserStatusHandler = () => {
    setUserModificationInit(false);
    setSelectedUserForUpdate(null);
    setOldActiveStatus(null);
    setNewActiveStatus(null);
  };

  const cancelNewClientHandler = () => {
    setNewClientInit(false);
    setNewClientName("");
    setNewDomainName("");
    setNewMemberEmails("");
    setNewAllowedIps("");
    setNewRestrictedPages([]);
  };

  const restrictedPageOptions: OptionType[] = [
    { value: "Network Directory", label: "Network Directory" },
    { value: "Demo", label: "Demo" },
    { value: "Library", label: "Library" },
    { value: "Creator Studio", label: "Creator Studio" },
    { value: "Profile", label: "Profile" },
  ];

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
      <div className="m-4 flex flex-col items-start">
        <p className="text-base max-sm:text-sm font-semibold">Clients</p>
        <div className="mt-3 w-full flex flex-col gap-2">
          {loading && (
            <div className="text-xs w-full h-20 flex items-center justify-center">
              <Loader className="h-4 w-4 mr-2 animate-spin inline" /> Loading
            </div>
          )}
          {!loading &&
            clientsData.map((client, i) => (
              <div
                className="bg-gray-200 p-2 w-full rounded-md flex flex-row max-sm:flex-col"
                key={i}
              >
                <div className="flex flex-row items-center gap-2 w-[20%] max-md:w-[50%] max-lg:w-[40%] max-sm:w-full">
                  <span className="max-sm:text-xs">{i + 1}</span>
                  <span>-</span>
                  <p className="text-sm font-semibold max-sm:text-xs">
                    {client.clientName}
                  </p>
                </div>
                <div className="flex flex-row  gap-2 max-sm:w-full justify-start max-sm:mt-2">
                  <UsersPopover
                    Users={client.Users}
                    triggerComponent={
                      <Button
                        variant={"outline"}
                        className="h-6 text-xs  px-3 text-gray-500 ml-4 max-sm:ml-0 max-sm:w-full"
                      >
                        View users <Users2 className="inline h-4 w-4 ml-2 " />
                      </Button>
                    }
                  />
                  <ActionsPopver
                    clientId={client.clientId}
                    allowAudioInteractions={client.allowAudioInteractions}
                    triggerComponent={
                      <Button
                        variant={"outline"}
                        className="h-6 text-xs  px-3 text-gray-500 ml-2 max-sm:ml-0 max-sm:w-full"
                      >
                        Actions
                      </Button>
                    }
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="m-4 mt-6 flex flex-col items-start">
        <p className="text-base max-sm:text-sm font-semibold">Actions</p>
        <div
          className={`mt-3 w-full p-2 rounded-md ${
            changeClientInit && "bg-blue-100 border border-blue-300"
          }`}
        >
          <Button
            onClick={() => setChangeClientInit(true)}
            disabled={clientsData.length === 0}
            variant={"default"}
            className="p-2 h-8 text-xs bg-blue-100 hover:bg-blue-50 text-blue-500"
          >
            <Wrench className="inline h-4 w-4 mr-2" /> Change Users Client
          </Button>

          {changeClientInit && (
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
          )}
        </div>

        <div
          className={`mt-3 w-full p-2 rounded-md ${
            userModificationInit && "bg-blue-100 border border-blue-300"
          }`}
        >
          <Button
            onClick={() => setUserModificationInit(true)}
            disabled={clientsData.length === 0}
            variant={"default"}
            className="p-2 h-8 text-xs bg-blue-100 hover:bg-blue-50 text-blue-500"
          >
            <Wrench className="inline h-4 w-4 mr-2" /> User Activities
          </Button>

          {userModificationInit && (
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
          )}
        </div>

        <div
          className={`mt-1 w-full p-2 rounded-md ${
            newClientInit && "bg-blue-100 border border-blue-300"
          }`}
        >
          <Button
            onClick={() => setNewClientInit(true)}
            variant={"default"}
            className="p-2 h-8 text-xs bg-blue-100 hover:bg-blue-50 text-blue-500"
          >
            <PlusCircle className="inline h-4 w-4 mr-2" /> Add New Client
          </Button>

          {newClientInit && (
            <div className="flex flex-col gap-4 w-full justify-end">
              <div className="mt-3 flex flex-col gap-2 self-start w-full max-sm:flex-col max-md:flex-col">
                <div className="w-full flex flex-row max-sm:flex-col gap-4 max-sm:gap-2 items-start">
                  <div className="w-1/2 max-sm:w-full flex flex-col gap-2 items-start">
                    <p className="block text-sm font-medium">
                      Client Name <span className="text-red-500">*</span>
                    </p>
                    <input
                      type="text"
                      value={newClientName}
                      onChange={(e) => setNewClientName(e.target.value)}
                      className="w-full p-2 text-sm max-sm:w-full max-lg:w-full rounded-sm ring-transparent outline-none border border-gray-300 focus:ring-0"
                      required
                    />
                  </div>
                  <div className="w-1/2 max-sm:w-full flex flex-col gap-2 items-start">
                    <p className="block text-sm font-medium">Domain Name</p>
                    <input
                      type="text"
                      value={newDomainName}
                      onChange={(e) => setNewDomainName(e.target.value)}
                      className="w-full p-2 text-sm max-sm:w-full max-lg:w-full rounded-sm ring-transparent outline-none border border-gray-300 focus:ring-0"
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col gap-2 items-start">
                  <p className="block text-sm font-medium">Member Emails</p>
                  <textarea
                    value={newMemberEmails}
                    onChange={(e) => setNewMemberEmails(e.target.value)}
                    className="w-full p-2 text-sm max-sm:w-full max-lg:w-full rounded-sm ring-transparent outline-none border border-gray-300 focus:ring-0"
                  />
                </div>
                <div className="w-full flex flex-col gap-2 items-start">
                  <p className="block text-sm font-medium">Allowed IPs</p>
                  <textarea
                    value={newAllowedIps}
                    onChange={(e) => setNewAllowedIps(e.target.value)}
                    className="w-full p-2 text-sm max-sm:w-full max-lg:w-full rounded-sm ring-transparent outline-none border border-gray-300 focus:ring-0"
                  />
                </div>
                <div className="w-full flex flex-col gap-2 items-start">
                  <p className="block text-sm font-medium">Restricted Pages</p>
                  <Select
                    isMulti
                    options={restrictedPageOptions}
                    value={newRestrictedPages}
                    onChange={(selectedOptions: MultiValue<OptionType>) =>
                      setNewRestrictedPages(selectedOptions as OptionType[])
                    }
                    className="w-full text-sm"
                  />
                </div>
              </div>
              <div className="self-end">
                <Button
                  variant={"destructive"}
                  className="max-sm:p-2 h-7 mt-2 hover:brightness-105 text-sm w-fit mr-2"
                  onClick={cancelNewClientHandler}
                >
                  Cancel <X className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  disabled={newClientName.length === 0}
                  className="max-sm:p-2 h-7 mt-2 hover:brightness-105 bg-blue-600"
                  onClick={newClientHandler}
                >
                  {changeLoading ? (
                    <>
                      Creating <Loader className="ml-2 h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Confirm <PenBox className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
