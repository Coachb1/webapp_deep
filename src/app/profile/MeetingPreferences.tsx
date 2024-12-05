"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { baseURL, basicAuth } from "@/lib/utils";

import {
  Input,
  Modal,
  TimePicker,
  Button as AButton,
  Select,
  SelectProps,
} from "antd";
import dayjs from "dayjs";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const MeetingPrefrences = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [fromAvailability, setFromAvailibility] = useState("");
  const [toAvailability, settoAvailibility] = useState("");
  const [schedullingLink, setSchedulingLink] = useState("");
  const [linkError, setLinkError] = useState(false);
  const [daysSelected, setDaysSelected] = useState<string | null>(null);

  const [priorData, setPriorData] = useState();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [loading, setLoading] = useState(false);

  const fetchMeetingPreferences = async () => {
    try {
      const response = await fetch(
        `${baseURL}/accounts/update-coach-mentor-meeting-availability/?profile_id=${coachId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: basicAuth,
          },
        }
      );

      if (response.ok) {
        const res = await response.json();
        setPriorData(res.data);

        setFromAvailibility(res.data.from || dayjs("00:00:00", "HH:mm:ss"));
        settoAvailibility(res.data.to || dayjs("00:00:00", "HH:mm:ss"));
        setSchedulingLink(res.data.scheduling_link.replace("https://", ""));
        setDaysSelected(res.data.days_selected);
      }
    } catch (error) {
      setFromAvailibility(new Date().toISOString());
      console.log(new Date().toISOString());
      settoAvailibility(new Date().toISOString());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeetingPreferences();
  }, []);

  const { coachId, getAllDirectoryData } = useUser();

  const changeAvailabilityHandler = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${baseURL}/accounts/update-coach-mentor-meeting-availability/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: basicAuth,
          },
          body: JSON.stringify({
            profile_id: coachId,
            availability: {
              from: fromAvailability,
              to: toAvailability,
              scheduling_link: schedullingLink
                ? "https://" + schedullingLink.replace("https://", "")
                : "",
              days_selected: daysSelected,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Error updating meeting availability"
        );
      }

      const data = await response.json();
      console.log("Updated profile:", data);
      await getAllDirectoryData();

      return data;
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  const [rmLoaading, setRmLoading] = useState(false);

  const removeSchedule = async () => {
    setRmLoading(true);
    try {
      const response = await fetch(
        `${baseURL}/accounts/update-coach-mentor-meeting-availability/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: basicAuth,
          },
          body: JSON.stringify({
            profile_id: coachId,
            availability: {
              from: "",
              to: "",
              scheduling_link: "",
              days_selected: "",
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Error updating meeting availability"
        );
      }

      const data = await response.json();
      console.log("Updated profile:", data);
      await getAllDirectoryData();

      return data;
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setRmLoading(false);
      setIsModalOpen(false);
    }
  };

  const daysOptions: SelectProps["options"] = [
    {
      label: "Monday",
      value: "Monday",
    },
    {
      label: "Tuesday",
      value: "Tuesday",
    },
    {
      label: "Wednesday",
      value: "Wednesday",
    },
    {
      label: "Thursday",
      value: "Thursday",
    },
    {
      label: "Friday",
      value: "Friday",
    },
    {
      label: "Saturday",
      value: "Saturday",
    },
    {
      label: "Sunday",
      value: "Sunday",
    },
  ];

  return (
    <div>
      <Button
        size={"sm"}
        className="ml-8 w-fit max-sm:p-1 max-sm:text-xs max-sm:h-8 max-sm:ml-4 max-sm:px-2"
        onClick={showModal}
      >
        <>{priorData ? "Update" : "Add"}</>
      </Button>
      <Modal
        centered
        title="Your meeting preferences"
        open={isModalOpen}
        okText="Save"
        onCancel={handleCancel}
        footer={
          <>
            <AButton
              type="default"
              disabled={
                rmLoaading ||
                loading ||
                linkError ||
                !fromAvailability ||
                !toAvailability
              }
              className="bg-blue-500 hover:bg-blue-400"
              danger
              onClick={removeSchedule}
            >
              {rmLoaading && <Loader className="h-4 w-4 mr-1 animate-spin" />}{" "}
              Remove
            </AButton>
            <AButton
              type="primary"
              disabled={
                rmLoaading ||
                loading ||
                linkError ||
                !fromAvailability ||
                !toAvailability
              }
              onClick={changeAvailabilityHandler}
              className="bg-blue-500 text-white hover:bg-blue-400"
            >
              {loading && <Loader className="h-4 w-4 mr-1 animate-spin" />} Save
            </AButton>
          </>
        }
      >
        <div>
          <p className="my-2 max-sm:text-xs font-semibold">
            Set your meeting time
          </p>
          <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-row gap-2 items-center">
              <p className="m-w-fit">Start</p>{" "}
              <TimePicker
                use12Hours
                disabled={loading}
                value={dayjs(fromAvailability)}
                onOk={(date) => {
                  console.log(date.toISOString());
                  setFromAvailibility(date.toISOString());
                }}
              />
            </div>
            <div className="flex flex-row gap-2 items-center">
              <p className="m-w-fit">End</p>{" "}
              <TimePicker
                use12Hours
                disabled={loading}
                value={dayjs(toAvailability)}
                onOk={(date) => {
                  console.log(date.toISOString());
                  settoAvailibility(date.toISOString());
                }}
              />
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center mt-2">
            <p className="m-w-fit">Days</p>
            <Select
              mode="multiple"
              allowClear
              value={daysSelected && daysSelected.split(", ")}
              style={{ width: "100%" }}
              placeholder="Please select"
              onChange={(val) => {
                console.log(val);
                if (val.length > 0) {
                  setDaysSelected((val || []).join(", "));
                } else {
                  setDaysSelected(null);
                }
              }}
              options={daysOptions}
            />
          </div>
        </div>
        <div className="py-2">or</div>
        <div>
          <p className="font-semibold">Add a scheduling link.</p>
          <>
            <Input
              addonBefore="https://"
              placeholder="calendy.com/... or cal.com/..."
              className="my-2 text-blue-500"
              value={schedullingLink.replace("https://", "")}
              onChange={(e) => {
                const value = e.target.value;
                setSchedulingLink(value);

                if (value.length == 0) {
                  setLinkError(false);
                  return;
                }

                const regex =
                  /(?:https?:\/\/)?(?:www\.)?(?:calendly\.com|cal\.com)\/[^\s]+/;
                if (regex.test(value)) {
                  setLinkError(false);
                } else {
                  setLinkError(true);
                }
              }}
            />
            {linkError && <p className="text-red-500">Invalid link</p>}
          </>
        </div>
      </Modal>
    </div>
  );
};

export default MeetingPrefrences;
