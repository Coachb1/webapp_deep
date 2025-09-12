"use client";

import { Badge } from "@/components/liberey_bot _ui/ui/badge";
import { Button } from "@/components/ui/button";
import { baseURL, basicAuth } from "@/lib/utils";
import { Input, Modal } from "antd";
import { Database, Loader } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Checkbox } from "@/components/liberey_bot _ui/ui/checkbox";

const DataIntegration = ({ clientName, user }: any) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [token, setToken] = useState("");
  const [secret, setSecret] = useState("");
  const [webhookUrlEnabled, SetWebhookUrlEnabled] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(user.email)
        const response = await fetch(
          `${baseURL}/accounts/get-client-information/?for=only_client_data&email=${user.email}`,
          {
            headers: {
              Authorization: basicAuth,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response, 'data')

        if (!response.ok) {
          console.error("Network response was not ok");
        }

        const data = await response.json();
        console.log(
          data.data.only_client_data,
          data.data.only_client_data.webhook_url,
          data.data.only_client_data.webhook_token,
          data.data.only_client_data.webhook_secret,
          data.data.only_client_data.webhook_enabled,
          data.data.only_client_data.webhook_url === null
        );
        setWebhookUrl(data.data.only_client_data.webhook_url || "");
        setToken(data.data.only_client_data.webhook_token || "");
        setSecret(data.data.only_client_data.webhook_secret || "");
        SetWebhookUrlEnabled(data.data.only_client_data.webhook_enabled);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [baseURL, clientName, basicAuth]);

  const submitHandler = async () => {
    setLoading(true);
    try {
      console.log(
        secret,
        token,
        webhookUrl,
        webhookUrlEnabled,
        clientName
      )
      const response = await fetch(
        `${baseURL}/accounts/get-create-or-update-client-id/`,
        {
          method: "PATCH",
          headers: {
            Authorization: basicAuth,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_name: clientName,
            webhook_url: webhookUrl,
            webhook_enabled: webhookUrlEnabled,
            webhook_token: token,
            webhook_secret: secret,
          }),
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
        <div className="flex flex-col gap-4 w-full">
          <div className="mt-3 flex flex-col gap-2 self-start w-full">
            <div className="w-full flex flex-col gap-2 items-start">
              <p className="block text-sm font-medium">
                User Interaction Data Webhook
              </p>
              <div className="w-full flex flex-col gap-2 items-start">
                <Input
                  className="w-full text-blue-500"
                  value={webhookUrl}
                  placeholder="Enter your webhook URL"
                  style={{ color: "#3b82f6" }}
                  onChange={(e) => {
                    setWebhookUrl(e.target.value);
                  }}
                />
                <Input
                  className="w-full text-blue-500"
                  value={token}
                  placeholder="Enter your token"
                  style={{ color: "#3b82f6" }}
                  onChange={(e) => {
                    setToken(e.target.value);
                  }}
                />
                <Input
                  className="w-full text-blue-500"
                  value={secret}
                  placeholder="Enter your secret"
                  style={{ color: "#3b82f6" }}
                  onChange={(e) => {
                    setSecret(e.target.value);
                  }}
                />
                <div className="flex items-center space-x-2 my-1.5">
                  <Checkbox
                    checked={webhookUrlEnabled}
                    onCheckedChange={(checked) => {
                      SetWebhookUrlEnabled(Boolean(checked));
                    }}
                  />
                  <label className="text-xs text-gray-700">Webhook enable?</label>
                </div>
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
