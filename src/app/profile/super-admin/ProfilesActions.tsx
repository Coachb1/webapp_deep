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
import { Edit, Search, Users, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { baseURL, basicAuth } from "@/lib/utils";
import { toast } from "sonner";
import { CoachesDataType } from "@/app/Coaches";
import { FilterDropdownProps } from "antd/es/table/interface";
import Link from "next/link";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import { useUser } from "@/context/UserContext";

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
  avatarBotId: string | null;
}

type DataIndex = keyof DataType;

let profileTypes = [
  "coach",
  "mentor",
  "coach-mentor",
  "coachee",
  "mentee",
  "knowledge_bot",
];

const ProfileActions = () => {
  const [open, setOpen] = useState(false);

  const [directoryProfiles, setDirectoryProfiles] = useState<[]>([]);
  const [profilesLoading, setProfilesLoading] = useState(true);

  const { getAllDirectoryData, getAllKnowledgeBotData } = useUser();
  const ApproveComponent = ({
    id,
    isApproved,
    isVisible,
    botType,
  }: {
    id: number;
    isApproved: boolean;
    isVisible: boolean;
    botType: string;
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
          if (botType.includes("user")) {
            getAllKnowledgeBotData();
          } else {
            getAllDirectoryData();
          }
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
          className="flex flex-row items-center bg-gray-300"
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

  const VisibleComponent = ({
    id,
    isApproved,
    isVisible,
    botType,
    botId,
  }: {
    id: number;
    isApproved: boolean;
    isVisible: boolean;
    botType: string;
    botId?: string;
  }) => {
    const [saveLoading, setSaveLoading] = useState(false);
    const [checked, setChecked] = useState<boolean>();

    console.log("ID : ", id);
    useEffect(() => {
      setChecked(isVisible);
    }, []);

    const approveProfileHandler = async (is_visble: boolean) => {
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
            approved: isApproved,
            visible: is_visble,
            is_delete: false,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          setChecked(data.updated.is_visible);
          console.log(data);
          if (botType.includes("user")) {
            getAllKnowledgeBotData();
          } else {
            getAllDirectoryData();
          }
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
          disabled={botType.includes("user") || botId?.includes("knowledge")}
          className="flex flex-row items-center bg-gray-300"
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

  const EditButton = ({
    profileId,
    profileType,
    botId,
    botUid,
    userEmail,
    userName,
    userId,
  }: {
    profileType: string;
    botId: string | null;
    botUid: string;
    profileId: string;
    userId: string | undefined;
    userEmail: string | undefined;
    userName: string;
  }) => {
    const editBotLinks = () => {
      const coachProfileTypes = ["coach", "mentor", "coach-mentor"];
      const coacheeProfileTypes = ["coachee", "mentee"];
      if (coachProfileTypes.includes(profileType)) {
        console.log('botlink: ', botId,botUid)
        let formVersion = '1'
        let botType = 'no-copilot';
        if (botId?.includes("avatar-bot") || botId?.includes("avatar_bot")) {
          formVersion = "3";
          botType = 'avatar_bot'
        } else if (botId?.includes("subject-spe")) {
          formVersion = "2";
          botType = 'subject_specific_bot'

        }

        if (botType === "avatar_bot" || botType === "subject_specific_bot") {
          return `/intake/?type=coach&edit=true&bot_id=${botId}&profile_id=${profileId}&profile_type=${profileType}&bot_type=${botType}&v=${formVersion}&uid=${botUid}&admin_edit=true&user_id=${userId}&user_email=${userEmail}&user_name=${userName}`;
        } else if(botType === "no-copilot"){
          return `/intake/?type=coach&edit=true&profile_id=${profileId}&no-copilot=1&uid=${botUid}&admin_edit=true&user_id=${userId}&user_email=${userEmail}&user_name=${userName}`;
        }
        
        return `/intake?type=coach&edit=true&v=${formVersion}&bot_id=${botId}&profile_id=${profileId}&profile_type=${profileType}&bot_type=avatar_bot&uid=${botUid}&admin_edit=true&user_id=${userId}&user_email=${userEmail}&user_name=${userName}`;
      } else if (coacheeProfileTypes.includes(profileType)) {
        return `/intake?type=coachee&edit=true&bot_id=&profile_id=${profileId}&profile_type=${profileType}&bot_type=coachee&uid=&admin_edit=true&user_id=${userId}&user_email=${userEmail}&user_name=${userName}`;
      } else if (profileType === "knowledge_bot") {
        return `/intake?type=knowledge-bot&edit=true&bot_id=${botId}&uid=${botUid}&admin_edit=true&user_id=${userId}&user_email=${userEmail}&user_name=${userName}`;
      } else {
        return "";
      }
    };

    return (
      <div>
        <Link target="_blank" href={editBotLinks()}>
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
      console.log('admin -profiles',data);
      const parsedData = data
        // .filter(
        //   (profile: CoachesDataType) =>
        //     profile.profile_type === "coach" ||
        //     profile.profile_type === "mentor" ||
        //     profile.profile_type === "coach-mentor" || profile.profile_type === "knoledge_bot"
        // )
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
              botType={profile.bot_type || ""}
            />
          ),
          visibleHandler: (
            <VisibleComponent
              id={profile.id}
              isApproved={profile.is_approved}
              isVisible={profile.is_visible}
              botType={profile.bot_type || ""}
              botId={profile.custom_user_bot_id}
            />
          ),
          editButton:
            profileTypes.includes(profile.profile_type) && profile.email ? (
              <EditButton
                profileId={profile.profile_id}
                profileType={profile.profile_type}
                botId={
                  profile.profile_type === "knowledge_bot"
                    ? profile.custom_user_bot_id ?? null
                    : profile.bot_type === "avatar_bot"
                    ? profile.avatar_bot_id ?? null
                    : profile.subject_specific_bot_id ?? null
                }
                botUid={profile.bot_uid!}
                userEmail={profile.email}
                userName={profile.name}
                userId={profile.user_id}
              />
            ) : (
              "-"
            ),
          isVisible: profile.is_visible,
          id: profile.id,
          avatarBotId: profile.avatar_bot_id,
        }));
      console.log(parsedData);
      setDirectoryProfiles(parsedData);
    } catch (err) {
      toast.error("Error fetching directory data.");
      console.error(err);
    } finally {
      setProfilesLoading(false);
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
          {/* <AtndButton
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </AtndButton> */}
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
      width: "30%",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Profile type",
      dataIndex: "profileType",
      key: "profileType",
      width: "20%",
      ...getColumnSearchProps("profileType"),
    },
    {
      title: "Is Visible?",
      dataIndex: "visibleHandler",
      key: "visibleHandler",
      width: "20%",
    },
    {
      title: "Is Approved?",
      dataIndex: "approveHandler",
      key: "approveHandler",
      width: "20%",
    },
    {
      title: "Edit",
      dataIndex: "editButton",
      key: "editButton",
      width: "20%",
    },
  ];

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        disabled={profilesLoading}
        variant={"default"}
        className="h-8 text-xs bg-blue-100 hover:bg-blue-50 text-blue-500 border-transparent border hover:border-blue-500"
      >
        <Users className="inline h-4 w-4 mr-2" /> Profiles
      </Button>
      <Modal
        title="Directory Profiles"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={window.innerWidth < 768 ? "80%" : "75%"}
        className="h-[90vh] max-sm:w-[90%] overflow-scroll no-scrollbar"
        footer={false}
      >
        <Table
          rowClassName={"text-sm max-sm:text-xs"}
          className="overflow-scroll no-scrollbar"
          columns={columns}
          dataSource={directoryProfiles}
        />
      </Modal>
    </>
  );
};

export default ProfileActions;
