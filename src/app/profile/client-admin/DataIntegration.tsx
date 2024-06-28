"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { baseURL, basicAuth } from "@/lib/utils";
import { Input, Modal } from "antd";
import { Database, Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const DataIntegration = ({ clientName }: { clientName: string }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");

  const submitHandler = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${baseURL}/accounts/save-webhook-url?webhook_url=${webhookUrl}&client_id=${clientName}`,
        {
          method: "GET",
          headers: {
            Authorization: basicAuth,
          },
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        toast.success("Succesfully uploaded webhook url.");
      } else {
        toast.error("Error saving the webhook url.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error saving the webhook url.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={() => setModalOpen(true)}
        variant={"default"}
        className="h-8 text-xs bg-blue-100 hover:bg-blue-50 text-blue-500 border-transparent border hover:border-blue-500 flex flex-row items-center justify-center"
      >
        <Database className="inline h-4 w-4 mr-2" /> Data Integration (Beta)
      </Button>

      <Modal
        title={
          <div className="flex flex-row items-center">
            Data Integration <Badge className="ml-2">Beta</Badge>
          </div>
        }
        centered
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        width={window.innerWidth < 768 ? "80%" : "50%"}
        className="w-full"
        footer={false}
      >
        <div className="flex flex-col gap-4 w-full justify-end">
          <div className="mt-3 flex flex-row gap-2 self-start w-full max-sm:flex-col max-md:flex-col">
            <div className="w-full flex flex-col gap-2 items-start">
              <p className="block text-sm font-medium">
                User Interaction Data Webhook{" "}
              </p>
              <div className="w-full flex flex-row gap-2 items-center justify-center">
                <Input
                  className="w-full text-blue-500"
                  placeholder="Enter your webhook URL"
                  style={{ color: "#3b82f6" }}
                  onChange={(e) => {
                    setWebhookUrl(e.target.value);
                  }}
                />
                <Button
                  disabled={loading || webhookUrl.length === 0}
                  onClick={() => {
                    submitHandler();
                  }}
                  className="h-fit p-1.5 px-4"
                >
                  {loading ? (
                    <>
                      Submitting{" "}
                      <Loader className="ml-2 h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    <>Submit</>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DataIntegration;
