"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Modal } from "antd";
import { Database } from "lucide-react";
import { useState } from "react";
const DataIntegration = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <div>
      <Button
        onClick={() => setModalOpen(true)}
        variant={"default"}
        className="h-8 text-xs bg-blue-100 hover:bg-blue-50 text-blue-500 border-transparent border hover:border-blue-500 flex flex-row items-center justify-center"
      >
        <Database className="inline h-4 w-4 mr-2" /> Data Integration
        <Badge className="ml-2">Beta</Badge>
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
                User Interaction data Webhook{" "}
              </p>
              <div className="w-full flex flex-row gap-2 items-center justify-center">
                <Input className="w-full"></Input>
                <Button
                  disabled={loading}
                  onClick={() => {}}
                  className="h-fit p-1.5 px-4"
                >
                  Submit
                </Button>
              </div>
              {/* <div className={`w-full mt-2 ${!loading && "hidden"}`}>
                <p>Download Progress</p>
                <Progress percent={progress} size="small" />
              </div> */}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DataIntegration;
