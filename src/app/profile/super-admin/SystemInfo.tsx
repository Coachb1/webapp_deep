"use client";

import { useState } from "react";
import Select, { SingleValue } from "react-select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { baseURL, basicAuth } from "@/lib/utils";
import { Download, User } from "lucide-react";
import { Input, Modal, Progress } from "antd";
import { saveAs } from "file-saver";

const SystemInfo = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);

  const downloadHandler = async () => {
    setLoading(true);
    setProgress(0);
    setError(false);

    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${baseURL}/accounts/get-user-details/`, true);
    xhr.setRequestHeader("Authorization", basicAuth);
    xhr.responseType = "blob";

    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        setProgress(Number(percentComplete.toFixed(0)));
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob = xhr.response;
        saveAs(blob, "System_info.xlsx");
        toast.success("Successfully downloaded the file");
      } else {
        toast.error("Error downloading the file. Try again.");
      }
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    xhr.onerror = () => {
      toast.error("Error downloading the file. Try again.");
      setTimeout(() => {
        setLoading(false);
        setError(true);
      }, 2000);
    };

    xhr.send();
  };

  return (
    <div>
      <Button
        onClick={() => setModalOpen(true)}
        variant={"default"}
        className="h-8 text-xs bg-blue-100 hover:bg-blue-50 text-blue-500 border-transparent border hover:border-blue-500"
      >
        <Download className="inline h-4 w-4 mr-2" /> System Info
      </Button>

      <Modal
        title="System Info"
        centered
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        width={window.innerWidth < 768 ? "80%" : "30%"}
        className="w-full"
        footer={false}
      >
        <div className="flex flex-col gap-4 w-full justify-end">
          <div className="mt-3 flex flex-row gap-2 self-start w-full max-sm:flex-col max-md:flex-col">
            <div className="w-full flex flex-col gap-2 items-start">
              <p className="block text-sm font-medium">
                All System Info as Excel Sheet.
              </p>
              <div className="w-full flex flex-row gap-2 items-center justify-center">
                <Input
                  disabled
                  value={"System_info.xlsx"}
                  className="w-full"
                ></Input>
                <Button
                  disabled={loading}
                  onClick={() => {
                    downloadHandler();
                  }}
                  className="h-fit p-1.5"
                >
                  <Download className="h-4 w-4 mr-2" /> <p>Download</p>
                </Button>
              </div>
              <div className={`w-full mt-2 ${!loading && "hidden"}`}>
                <p>Download Progress</p>
                <Progress percent={progress} size="small" />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SystemInfo;
