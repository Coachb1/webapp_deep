import { CoachesDataType } from "@/app/Coaches";
import { Button } from "@/components/ui/button";
import { AllUserDataType } from "@/lib/types";
import { baseURL, basicAuth } from "@/lib/utils";
import { Modal } from "antd";
import { Loader, PenBox, ShieldOff, ShieldPlusIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { MultiValue, SingleValue } from "react-select";
import Select from "react-select";
import { toast } from "sonner";

interface OptionType {
  value: string;
  label: string;
}

const RecommendationProfiles = ({
  allUsers,
  dataLoading,
}: {
  allUsers: AllUserDataType[];
  dataLoading: boolean;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [recommendations, setRecommendations] = useState<OptionType[]>([]);

  const [loading, setLoading] = useState(false);
  const [profilesLoading, setProfilesLoading] = useState(true);

  const [coachRecommendationOptions, setCoachRecommendationOptions] = useState<
    OptionType[]
  >([]);

  const getDirectoryProfiiles = async () => {
    setProfilesLoading(true);
    try {
      const response = await fetch(`${baseURL}/accounts/profile_approvals`, {
        method: "GET",
        headers: { Authorization: basicAuth },
      });
      const data: CoachesDataType[] = await response.json();
      let options: OptionType[] = [];
      data.forEach((coach) => {
        if (coach.email) {
          options.push({
            value: coach.profile_id,
            label: coach.email,
          });
        }
      });

      console.log(options);
      setCoachRecommendationOptions(options);

      setProfilesLoading(false);
    } catch (err) {
      toast.error("Error fetching directory data.");
      console.error(err);
      setProfilesLoading(false);
    } finally {
      setProfilesLoading(false);
    }
  };

  useEffect(() => {
    getDirectoryProfiiles();
  }, []);

  const addRecommendationHandler = () => {};

  const cancelHandler = () => {
    setSelectedUser("");
  };

  return (
    <div>
      <Button
        onClick={() => setModalOpen(true)}
        disabled={dataLoading}
        variant={"default"}
        className="h-8 text-xs bg-blue-100 hover:bg-blue-50 text-blue-500 border-transparent border hover:border-blue-500"
      >
        <ShieldPlusIcon className="h-4 w-4 mr-2" /> Recommend Profiles
      </Button>

      <Modal
        title="Recommend Profiles"
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
              <p className="block text-sm font-medium">
                Recommendation Profiles
              </p>
              <Select
                isMulti
                options={coachRecommendationOptions}
                value={recommendations}
                onChange={(selectedOptions: MultiValue<OptionType>) =>
                  setRecommendations(selectedOptions as OptionType[])
                }
                className="w-full text-sm"
              />
            </div>
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
              onClick={addRecommendationHandler}
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

export default RecommendationProfiles;
