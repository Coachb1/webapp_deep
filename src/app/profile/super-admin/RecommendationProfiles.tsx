import { CoachesDataType } from "@/app/Coaches";
import { Button } from "@/components/ui/button";
import { baseURL, basicAuth } from "@/lib/utils";
import { Modal } from "antd";
import { Loader, PenBox, ShieldPlusIcon, X } from "lucide-react";
import { useEffect, useState } from "react";
import { MultiValue, SingleValue } from "react-select";
import Select from "react-select";
import { toast } from "sonner";

interface OptionType {
  value: string;
  label: string | React.ReactNode | undefined;
}

const RecommendationProfiles = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [recommendations, setRecommendations] = useState<OptionType[]>([]);

  const [profilesLoading, setProfilesLoading] = useState(true);

  const [coachRecommendationOptions, setCoachRecommendationOptions] = useState<
    OptionType[]
  >([]);

  const [usersOptions, setUsersOptions] = useState<OptionType[]>([]);
  const [submitLoading, setSubmitLoading] = useState(false);

  const getDirectoryProfiiles = async () => {
    setProfilesLoading(true);
    try {
      const response = await fetch(`${baseURL}/accounts/profile_approvals`, {
        method: "GET",
        headers: { Authorization: basicAuth },
      });

      const data: CoachesDataType[] = await response.json();
      let options: OptionType[] = [];
      const users: OptionType[] = [];
      data.forEach((coach) => {
        if (coach.email && !['coachee','mentee','knowledge_bot'].includes(coach.profile_type)) {
          options.push({
            value: `${coach.profile_id}/${coach.email}/${coach.name.replace(
              /\s/g,
              ""
            )}`,
            label: (
              <div>
                <p className="font-semibold">{coach.name}</p>
                <p>{coach.email}</p>
              </div>
            ),
          });

          users.push({
            value: coach.profile_id,
            label: coach.email,
          });
        }
      });

      console.log(options);
      setCoachRecommendationOptions(options);
      setUsersOptions(users);
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

  const addRecommendationHandler = async () => {
    setSubmitLoading(true);
    try {
      const response = await fetch(
        `${baseURL}/coaching-conversations/get-or-save-coach-recommendations/`,
        {
          method: "POST",
          headers: {
            Authorization: basicAuth,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_profile_id: selectedUser,
            coach_recommendations: recommendations
              .map((rec) => rec.value.split("/")[0])
              .join(","),
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        toast.success("Successfully added recommendation to selected profile.");
        cancelHandler();
      }
    } catch (err) {
      toast.error("Error adding recommendation to selected profile.");
      console.error(err);
    } finally {
      setSubmitLoading(false);
    }
  };

  const cancelHandler = () => {
    setSelectedUser("");
    setRecommendations([]);
    setModalOpen(false);
  };

  useEffect(() => {
    if (selectedUser) {
      fetch(
        `${baseURL}/coaching-conversations/get-or-save-coach-recommendations/?user_profile_id=${selectedUser}`,
        {
          method: "GET",
          headers: {
            Authorization: basicAuth,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          let existingRecommendations: OptionType[] = [];
          data.data?.forEach((rec: string) => {
            console.log(rec);
            console.log(
              coachRecommendationOptions.find((option) =>
                option.value.includes(rec)
              )
            );
            existingRecommendations.push(
              //@ts-ignore
              coachRecommendationOptions.find((option) =>
                option.value.includes(rec)
              )
            );
          });
          setRecommendations(existingRecommendations);
        });
    }
  }, [selectedUser]);

  return (
    <div>
      <Button
        onClick={() => setModalOpen(true)}
        disabled={profilesLoading}
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
                    label: string | React.ReactNode | undefined;
                  }>
                ) => {
                  if (option) {
                    const value = option.value;
                    setSelectedUser(value);
                    console.log(value);
                  }
                }}
                //@ts-ignore
                options={usersOptions}
                value={
                  selectedUser
                    ? {
                        value: selectedUser,
                        label: usersOptions.find(
                          (user) => user.value === selectedUser
                        )?.label,
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
                isDisabled={profilesLoading}
                options={coachRecommendationOptions}
                value={recommendations}
                onChange={(selectedOptions: MultiValue<OptionType>) => {
                  setRecommendations(selectedOptions as OptionType[]);
                  console.log(
                    selectedOptions
                      .map((rec) => rec.value.split("/")[0])
                      .join(",")
                  );
                }}
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
              disabled={!selectedUser || submitLoading}
              className="max-sm:p-2 h-7 mt-2 hover:brightness-105 bg-blue-600"
              onClick={addRecommendationHandler}
            >
              {submitLoading ? (
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
