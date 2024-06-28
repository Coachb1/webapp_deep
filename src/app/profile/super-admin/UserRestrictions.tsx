"use client";

import { Button } from "@/components/ui/button";
import { AllUserDataType } from "@/lib/types";
import { baseURL, basicAuth } from "@/lib/utils";
import { Modal } from "antd";
import { Loader, PenBox, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";
import Select, { MultiValue, SingleValue } from "react-select";
import { toast } from "sonner";

interface OptionType {
  value: string;
  label: string;
}

const UserRestrictions = ({
  allUsers,
  getAllClientsData,
}: {
  allUsers: AllUserDataType[];
  getAllClientsData: () => void;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [restrictedFeatures, setRestrictedFeatures] = useState<OptionType[]>(
    []
  );
  const [userRole, setUserRole] = useState("");

  const [loading, setLoading] = useState(false);

  const addRestrictionsHandler = async () => {
    setLoading(true);
    try {
      toast.success("Successfully saved user prefrences.");

      const response = await fetch(`${baseURL}/accounts/update-user-account`, {
        method: "PATCH",
        headers: {
          Authorization: basicAuth,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: selectedUser,
          role: userRole,
          access_denied:
            restrictedFeatures.length > 0
              ? restrictedFeatures.map((restr) => restr.value).join(",")
              : "",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        getAllClientsData();
      }
    } catch (error) {
      toast.error("Error saving user prefrences.");
    } finally {
      setLoading(false);
      cancelHandler();
    }
  };

  const cancelHandler = () => {
    setModalOpen(false);
    setSelectedUser("");
    setUserRole("");
    setRestrictedFeatures([]);
  };

  const restrictedPageOptions: OptionType[] = [
    { value: "Deepdive-creator", label: "Deepdive-creator" },
    { value: "Simulation-creator", label: "Simulation-creator" },
  ];

  const userRoles: OptionType[] = [
    { value: "member", label: "Member" },
    { value: "admin", label: "Admin" },
    { value: "super_admin", label: "Super Admin" },
    { value: "client_admin", label: "Client Admin" },
  ];

  useEffect(() => {
    setRestrictedFeatures([]);
    const userRolePrev = allUsers.find(
      (user) => user.userId === selectedUser
    )?.userRole;

    if (userRolePrev) {
      setUserRole(userRolePrev);
    }

    const userRestrictionsPrev = allUsers
      .find((user) => user.userId === selectedUser)
      ?.userDeniedAccesses?.split(",")
      .filter((restr) => restr.trim().length > 0)
      .map((restr) => ({
        value: restr.trim(),
        label: restr.trim(),
      }));

    console.log(userRestrictionsPrev,'userRestrictionsPrev');

    if (userRestrictionsPrev?.length! > 0) {
      setRestrictedFeatures(userRestrictionsPrev!);
    }
  }, [selectedUser]);

  return (
    <div>
      <Button
        onClick={() => setModalOpen(true)}
        variant={"default"}
        className="h-8 text-xs bg-blue-100 hover:bg-blue-50 text-blue-500 border-transparent border  hover:border-blue-500"
      >
        <ShieldCheck className="inline h-4 w-4 mr-2" /> User Restrictions
      </Button>

      <Modal
        title="User Restrictions Control"
        centered
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
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
                  option: SingleValue<{
                    value: string;
                    label: string | undefined;
                  }>
                ) => {
                  if (option) {
                    const value = option.value;
                    setSelectedUser(value);
                  }
                }}
                options={allUsers.map((user) => ({
                  value: user.userId,
                  label: user.userEmail,
                }))}
                value={
                  selectedUser
                    ? {
                        value: selectedUser,
                        label: allUsers.find(
                          (user) => user.userId === selectedUser
                        )?.userEmail,
                      }
                    : null
                }
                className="w-full text-sm"
              />
            </div>
            <div className="w-full flex flex-col gap-2 items-start">
              <p className="block text-sm font-medium">Select user role</p>
              <Select
                onChange={(
                  option: SingleValue<{
                    value: string;
                    label: string | undefined;
                  }>
                ) => {
                  if (option) {
                    const value = option.value;
                    setUserRole(value);
                  }
                }}
                options={userRoles.map((role) => ({
                  value: role.value,
                  label: role.label,
                }))}
                value={
                  userRole
                    ? {
                        value: userRole,
                        label: userRoles.find((role) => role.value === userRole)
                          ?.label,
                      }
                    : null
                }
                className="w-full text-sm"
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2 items-start">
            <p className="block text-sm font-medium">Add restrictions</p>
            <Select
              isMulti
              options={restrictedPageOptions}
              value={restrictedFeatures}
              onChange={(selectedOptions: MultiValue<OptionType>) =>
                setRestrictedFeatures(selectedOptions as OptionType[])
              }
              className="w-full text-sm"
            />
          </div>
          <div className="self-end">
            <Button
              variant={"destructive"}
              className="max-sm:p-2 h-7 mt-2 hover:brightness-105 text-sm w-fit mr-2"
              onClick={cancelHandler}
            >
              Cancel <X className="ml-2 h-4 w-4" />
            </Button>
            <Button
              disabled={!selectedUser}
              className="max-sm:p-2 h-7 mt-2 hover:brightness-105 bg-blue-600"
              onClick={addRestrictionsHandler}
            >
              {loading ? (
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

export default UserRestrictions;
