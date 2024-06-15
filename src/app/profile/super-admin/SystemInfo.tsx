"use client";

import { useState } from "react";
import Select, { SingleValue } from "react-select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { baseURL, basicAuth } from "@/lib/utils";
import { Download, User } from "lucide-react";
import { Input, Modal } from "antd";
import Link from "next/link";

const SystemInfo = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <div>
      <Button
        onClick={() => setModalOpen(true)}
        disabled={loading}
        variant={"default"}
        className="h-8 text-xs bg-blue-100 hover:bg-blue-50 text-blue-500 border-transparent border hover:border-blue-500"
      >
        <User className="inline h-4 w-4 mr-2" /> System Info
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
                <Link
                  href={""}
                  download
                  onClick={() => {
                    setTimeout(() => {
                      toast.success("Successfully downloaded.");
                    }, 1000);
                  }}
                  className="flex flex-row gap-2 items-center border bg-blue-200 rounded-md px-2 font-semibold h-full"
                >
                  <Download className="h-4 w-4" /> <p>Download</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SystemInfo;
