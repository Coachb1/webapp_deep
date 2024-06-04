"use client";

import {
  Input,
  InputRef,
  Modal,
  Space,
  Switch,
  Table,
  TableColumnType,
  TableColumnsType,
} from "antd";
import { Button } from "@/components/ui/button";
import { Button as AtndButton } from "antd";
import { Check, Edit, Search, Users, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { baseURL, basicAuth } from "@/lib/utils";
import { toast } from "sonner";
import { CoachesDataType } from "@/app/Coaches";
import { FilterDropdownProps } from "antd/es/table/interface";
import Link from "next/link";
import { TooltipWrapper } from "@/components/TooltipWrapper";

interface DataType {
  key: string;
  name: string;
  userId: string;
  email: string;
  profileType: string;
  botType: string;
  profileId: string;
  isApproved: boolean;
  approveHandler: React.ReactNode;
  editButton: React.ReactNode;
  isVisible: string;
  id: number;
}

type DataIndex = keyof DataType;

const ProfileActions = () => {
  const [open, setOpen] = useState(false);

  const [directoryProfiles, setDirectoryProfiles] = useState<[]>([]);

  const ApproveComponent = ({
    id,
    isApproved,
    isVisible,
  }: {
    id: number;
    isApproved: boolean;
    isVisible: boolean;
  }) => {
    const [saveLoading, setSaveLoading] = useState(false);
    const [checked, setChecked] = useState<boolean>();

    useEffect(() => {
      setChecked(isApproved);
    }, []);

    const approveProfileHandler = async (is_approved: boolean) => {
      setSaveLoading(true);
      try {
        const response = await fetch(`${baseURL}/accounts/profile_approvals/`, {
          method: "PATCH",
          headers: {
            Authorization: basicAuth,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            approved: is_approved,
            visible: isVisible,
            is_delete: false,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setChecked(data.updated.is_approved);
          console.log(data);
          toast.success("Succesfully saved the preferences.");
        }
      } catch (error) {
        toast.error("Error saving the preferences!");
      } finally {
        setSaveLoading(false);
      }
    };

    return (
      <div>
        <Switch
          className="flex flex-row items-center"
          checked={checked}
          loading={saveLoading}
          onChange={(val) => {
            console.log(val);
            approveProfileHandler(val);
          }}
        />
      </div>
    );
  };

  const EditButton = () => {
    return (
      <div>
        <Link href={""}>
          <Button
            variant={"secondary"}
            className="h-6 text-xs w-fit bg-blue-200 inline-flex items-center"
          >
            <span className="max-sm:hidden">Edit</span>{" "}
            <TooltipWrapper
              className="hidden max-sm:block text-xs"
              tooltipName="Edit"
              body={<Edit className="h-3 w-3 ml-2 max-sm:ml-0" />}
            />
          </Button>
        </Link>
      </div>
    );
  };

  const getDirectoryProfiiles = async () => {
    try {
      const response = await fetch(`${baseURL}/accounts/profile_approvals`, {
        method: "GET",
        headers: { Authorization: basicAuth },
      });
      const data = await response.json();
      console.log(data);
      const parsedData = data
        .filter((profile: CoachesDataType) => profile.profile_type === "coach")
        .map((profile: CoachesDataType, i: number) => ({
          key: i,
          name: profile.name,
          userId: profile.user_id,
          email: profile.email ? profile.email : "-",
          profileType: profile.profile_type,
          botType: profile.bot_type,
          profileId: profile.profile_id,
          isApproved: profile.is_approved,
          approveHandler: (
            <ApproveComponent
              id={profile.id}
              isApproved={profile.is_approved}
              isVisible={profile.is_visible}
            />
          ),
          editButton: <EditButton />,
          isVisible: profile.is_visible,
          id: profile.id,
        }));
      console.log(parsedData);
      setDirectoryProfiles(parsedData);
    } catch (err) {
      toast.error("Error fetching directory data.");
      console.error(err);
    }
  };

  useEffect(() => {
    getDirectoryProfiiles();
  }, []);

  const searchInput = useRef<InputRef>(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <AtndButton
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<Search className="h-3 w-3" />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </AtndButton>
          <AtndButton
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </AtndButton>
          <AtndButton
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </AtndButton>
          <AtndButton
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </AtndButton>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <Search style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      //@ts-ignore
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Is Approved?",
      dataIndex: "approveHandler",
      key: "approveHandler",
      width: "20%",
    },
    // {
    //   title: "Edit",
    //   dataIndex: "editButton",
    //   key: "editButton",
    //   width: "20%",
    // },
  ];

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant={"default"}
        className="h-8 text-xs bg-blue-100 hover:bg-blue-50 text-blue-500"
      >
        <Users className="inline h-4 w-4 mr-2" /> Profiles
      </Button>
      <Modal
        title="Directory Profiles"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={"60%"}
        className="h-[90vh] overflow-scroll no-scrollbar"
        footer={false}
      >
        <Table
          className="overflow-clip"
          columns={columns}
          dataSource={directoryProfiles}
        />
      </Modal>
    </>
  );
};

export default ProfileActions;
