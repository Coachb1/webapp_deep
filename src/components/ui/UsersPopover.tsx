"use client";

import { ClientUserType } from "@/lib/types";
import { ReactNode, useEffect, useState } from "react";
import { Separator } from "./separator";
import { Switch } from "@/components/ui/switch";

import { Popover } from "antd";
import { baseURL, basicAuth } from "@/lib/utils";
import { toast } from "sonner";

export const UsersPopover = ({
  Users,
  triggerComponent,
}: {
  Users: ClientUserType[];
  triggerComponent: ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  return (
    <Popover
      content={
        <>
          <div className="max-h-[30vh]  overflow-auto no-scrollbar w-full">
            {Users.length > 0 ? (
              <>
                {" "}
                {Users.map((user, i) => (
                  <div key={i}>
                    <div className="w-full my-2">
                      <p className="text-sm font-semibold">{user.userName}</p>
                      <p className="text-[12px] text-blue-500">
                        {user.userEmail}
                      </p>
                    </div>
                    {Users.length !== i + 1 && <Separator />}
                  </div>
                ))}
              </>
            ) : (
              <div className="h-20 w-full flex flex-row items-center justify-center">
                <p className="text-sm text-gray-500">No Users</p>
              </div>
            )}
          </div>
          <div className="w-full py-2 flex flex-row justify-end mb-0 pb-0">
            <a onClick={hide}>Close</a>
          </div>
        </>
      }
      title="Users"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      {triggerComponent}
    </Popover>
  );
};

export const ActionsPopver = ({
  triggerComponent,
  clientId,
  allowAudioInteractions,
}: {
  clientId: string;
  allowAudioInteractions: boolean | undefined;
  triggerComponent: ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const [clientAllowAudioInteractions, setClientAllowAudioInteractions] =
    useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setClientAllowAudioInteractions(
      allowAudioInteractions ? allowAudioInteractions : false
    );
  }, []);
  const allowAudioInteractionHandler = (type: boolean) => {
    setLoading(true);
    fetch(`${baseURL}/accounts/get-create-or-update-client-id/`, {
      method: "PATCH",
      headers: {
        Authorization: basicAuth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        allow_audio_interactions: type,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.updated) {
          setClientAllowAudioInteractions(
            data.updated.allow_audio_interactions
          );
          toast.success("Saved your changes.");
        } else {
          toast.error("Error, try again.");
        }
      })
      .catch((err) => {
        toast.error("Error, try again.");
        console.error(err);
        throw new Error("Error upading client preferences (audio interaction)");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Popover
      content={
        <>
          <div
            id="audio-interaction"
            className="w-full flex flex-row justify-between items-center my-2"
          >
            <p className="text-sm max-sm:text-xs w-full">
              Allow audio interaction in bots
            </p>
            <div className="ml-8 flex flex-row items-center gap-2">
              <span className="text-sm font-bold text-gray-600">No</span>
              <Switch
                disabled={loading}
                checked={clientAllowAudioInteractions}
                onCheckedChange={(val) => {
                  console.log(val);
                  allowAudioInteractionHandler(val);
                }}
              />
              <span className="text-sm font-bold text-gray-600">Yes</span>
            </div>
          </div>
          <div className="w-full border-t py-2 flex flex-row justify-end mb-0 pb-0">
            <a onClick={hide}>Close</a>
          </div>
        </>
      }
      title="Actions"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
    >
      {triggerComponent}
    </Popover>
  );
};
