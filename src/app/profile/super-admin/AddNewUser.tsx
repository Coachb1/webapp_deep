import { Button } from "@/components/ui/button";
import { ClientDataType } from "@/lib/types";
import { baseURL, basicAuth } from "@/lib/utils";
import { Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Loader, PenBox, UserPlus, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AddNewUser = ({
  clientsData,
  componentLoading,
  getAllClientsData,
}: {
  clientsData: ClientDataType[];
  componentLoading: boolean;
  getAllClientsData: () => void;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [userEmails, setUserEmails] = useState("");

  const [emptyClientError, setEmptyClientError] = useState(false);
  const [emptyEmailsError, setEmptyEmailsError] = useState(false);

  const [selectedClient, setSelectedClient] = useState<{
    value: string;
    label: string;
  }>();

  const createNewUserHandler = async () => {
    setLoading(true);

    if (selectedClient === undefined) {
      setEmptyClientError(true);
      setLoading(false);

      return;
    }

    if (userEmails.length === 0) {
      setEmptyEmailsError(true);
      setLoading(false);

      return;
    }

    try {
      const response = await fetch(
        `${baseURL}/accounts/get-create-or-update-client-id/`,
        {
          method: "PATCH",
          headers: {
            Authorization: basicAuth,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_id: selectedClient,
            allow_audio_interactions: true,
            member_emails: userEmails,
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        toast.success("Successfully added the emails to the client.");
        console.log(responseData);
        cancelHandler();
        getAllClientsData();
      }
    } finally {
      setLoading(false);
    }
  };

  const cancelHandler = () => {
    setUserEmails("");
    setSelectedClient(undefined);
    setLoading(false);
    setModalOpen(false);
  };

  return (
    <div>
      <Button
        onClick={() => {
          setModalOpen(true);
        }}
        disabled={componentLoading}
        variant={"default"}
        className="h-8 text-xs bg-blue-100 hover:bg-blue-50 text-blue-500 border-transparent border hover:border-blue-500"
      >
        <UserPlus className="inline h-4 w-4 mr-2" /> Add Users to Client
      </Button>

      <Modal
        title="Add Users to client"
        centered
        open={modalOpen}
        width={window.innerWidth < 768 ? "80%" : "40%"}
        className="w-full"
        footer={false}
        onCancel={() => setModalOpen(false)}
      >
        <div className="flex flex-col gap-4 w-full justify-end">
          <div className="mt-3 flex flex-col gap-2 self-start w-full max-sm:flex-col max-md:flex-col max-h-[60vh]">
            <div className="w-full flex flex-row max-sm:flex-col gap-4 max-sm:gap-2 items-start">
              <div className="w-full max-sm:w-full flex flex-col items-start">
                <p className="block text-sm font-medium mt-2 mb-1">
                  Enter user emails (separated by comma){" "}
                  <span className="text-red-500">*</span>
                </p>
                <TextArea
                  autoSize={{ minRows: 2, maxRows: 6 }}
                  value={userEmails}
                  onChange={(e) => {
                    setUserEmails(e.target.value);
                    setEmptyEmailsError(false);
                  }}
                  className="w-full p-2 text-sm rounded-sm ring-transparent outline-none border border-gray-300 focus:ring-0"
                />
                {emptyEmailsError && (
                  <p className="text-xs text-red-500  pt-1">
                    Please enter atleast one email
                  </p>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col mt-2 mb-1 items-start">
              <p className="block text-sm font-medium">
                Select the client <span className="text-red-500">*</span>
              </p>
              <Select
                onChange={(val) => {
                  console.log(val);
                  setSelectedClient(val);
                  setEmptyClientError(false);
                }}
                options={clientsData?.map((client) => ({
                  value: client.clientId,
                  label: `${client.clientName} : ${client.clientId}`,
                }))}
                value={selectedClient}
                className="w-full"
                style={{
                  height: 40,
                  fontSize: 18,
                }}
              />
              {emptyClientError && (
                <p className="text-xs text-red-500">Please select the client</p>
              )}
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
              disabled={loading}
              className="max-sm:p-2 h-7 mt-2 hover:brightness-105 bg-blue-600"
              onClick={() => createNewUserHandler()}
            >
              {loading ? (
                <>
                  Creating <Loader className="ml-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  Submit <PenBox className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddNewUser;
