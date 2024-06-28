"use client";

import { ClientDataType } from "@/lib/types";
import { UsersPopover, ActionsPopver } from "@/components/ui/UsersPopover";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const Clients = ({
  clientsData,
  loading,
}: {
  clientsData: ClientDataType[];
  loading: boolean;
}) => {
  return (
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
              <div className="flex flex-row items-center gap-2 w-[30%] max-md:w-[40%] max-sm:w-full">
                <span className="max-sm:text-xs">{i + 1}</span>
                <span>-</span>
                <p className="text-sm font-semibold max-sm:text-xs">
                  {client.clientName}
                </p>
              </div>
              <div className="flex flex-row gap-2 w-full justify-start max-sm:mt-2">
                <UsersPopover
                  Users={client.Users}
                  triggerComponent={
                    <Button
                      variant={"outline"}
                      className="h-6 text-xs  px-3 text-gray-500 ml-4 max-sm:ml-0 max-sm:w-full"
                    >
                      View users
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
  );
};

export default Clients;
