"use client";

import { useState } from "react";
import Select, { MultiValue } from "react-select";
import { toast } from "sonner";
import { baseURL, basicAuth } from "@/lib/utils";
import { Loader, PenBox, PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Modal } from "antd";
import { Checkbox } from "@/components/ui/checkbox";

interface OptionType {
  value: string;
  label: string;
}

interface AddNewClientProps {
  getAllClientsData: () => void;
}

const AddNewClient: React.FC<AddNewClientProps> = ({ getAllClientsData }) => {
  const [newClientInit, setNewClientInit] = useState(false);
  const [changeLoading, setChangeLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [newDomainName, setNewDomainName] = useState("");
  const [newMemberEmails, setNewMemberEmails] = useState("");
  const [newAllowedIps, setNewAllowedIps] = useState("");
  const [clinetHheading, setClientHeading] = useState("");
  const [clientDepartments, setClientDepartments] = useState("");
  const [CoachExpertise, setCoachExpertise] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [makeNewUserTrial, setMakeNewUserTrial] = useState(true);
  const [useSkillFromBank, setUseSkillFromBank] = useState(false);
  const [allowePasteAnswer, setAllowePaseAnswer] = useState(true);
  const [alloweAudioInteraction, setAllowAudioInteraction] = useState(true);
  const [accessBotIds, setAccessedBotIds] = useState("");
  const [excludedUsers, setExcludedUsers] = useState("");

  // webhook
  const [webhookUrl, SetWebhookUrl] = useState("");
  const [webhookToken, SetWebhookToken] = useState("");
  const [webhookSecret, SetWebhookSecret] = useState("");
  const [webhookEnabled, SetWebhookEnabled] = useState(false);

  // to get ui information:
  // const [headerText, setHeaderText] = useState("");
  const [clientUiInfo, setClientUIInfo] = useState({
    bottom_text: "",
    header: "",
    read_text: "",
  });

  const [newRestrictedPages, setNewRestrictedPages] = useState<OptionType[]>(
    []
  );
  const [newRestrictedFeatures, setNewRestrictedFeatures] = useState<
    OptionType[]
  >([]);

  const handleUIInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setClientUIInfo((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function emptyToNull(dataObj: Record<string, any>): Record<string, any> {
    let updatedData: Record<string, any> = {};
    for (let key in dataObj) {
      if (Object.prototype.hasOwnProperty.call(dataObj, key)) {
        updatedData[key] = dataObj[key] !== "" ? dataObj[key] : null;
      }
    }
    return updatedData;
  }

  const restrictedPageOptions: OptionType[] = [
    { value: "Network Directory", label: "Network Directory" },
    { value: "Demo", label: "Demo" },
    { value: "Leadership Library", label: "Leadership Library" },
    { value: "Domain Skills Library", label: "Domain Skills Library" },
    { value: "Creator Studio", label: "Creator Studio" },
    { value: "Profile", label: "Profile" },
  ];

  const restrictedFeaturesOptions: OptionType[] = [
    { value: "Join-the-network", label: "Join the network" },
    { value: "Likes", label: "Likes" },
    { value: "Ratings", label: "Ratings" },
    { value: "Requested-scenarios", label: "Requested scenarios" },
    { value: "Assigned-scenarios", label: "Assigned scenarios" },
    { value: "Client-library", label: "Client library" },
    { value: "Competency-library", label: "Competency library" },
    { value: "EQ-Areas", label: "EQ Areas" },
    { value: "Learning-ideas", label: "Learning ideas" },
    { value: "Simulation-creator", label: "Simulation creator" },
    { value: "Knowledge-bots", label: "AI Knowledge Agents" },
    { value: "Team-connect", label: "Team connect" },
    { value: "My-connections", label: "My connections" },
    { value: "Action-session-notes", label: "Action session notes" },
    { value: "Bot-conversations", label: "Bot conversations" },
    { value: "My-rewards", label: "My rewards" },
    { value: "Competencies", label: "Competencies" },
    { value: "IDP", label: "IDP" },
    { value: "Email-signature", label: "Email signature" },
    { value: "Super-admin", label: "Super admin" },
    { value: "Client-admin-reports", label: "Client admin reports" },
  ];

  const newClientHandler = async () => {
    setChangeLoading(true);
    try {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", basicAuth);
      myHeaders.append("Content-Type", "application/json");

      console.log("newMemberEmails", newMemberEmails);

      const raw = JSON.stringify({
        client_name: newClientName,
        restricted_pages: newRestrictedPages
          .map((page) => page.value)
          .join(","),
        restricted_features: newRestrictedFeatures
          .map((page) => page.value)
          .join(","),
        allowed_ips: newAllowedIps,
        domain_name: newDomainName,
        member_emails: newMemberEmails,
        heading: clinetHheading.length > 0 ? clinetHheading : null,
        allow_audio_interactions: alloweAudioInteraction,
        make_new_user_in_trail: makeNewUserTrial,
        sub_heading: subHeading.length > 0 ? subHeading : null,
        tag_line: tagLine.length > 0 ? tagLine : null,
        ui_information: emptyToNull(clientUiInfo),
        allow_paste_answer: allowePasteAnswer,
        webhook_url: webhookUrl.length > 0 ? webhookUrl : null,
        webhook_secret: webhookSecret.length > 0 ? webhookSecret : null,
        webhook_token: webhookToken.length > 0 ? webhookToken : null,
        webhook_enabled: webhookEnabled,
        excluded_users: excludedUsers,
        use_skills_from_skill_bank: useSkillFromBank,
        departments: clientDepartments.length > 0 ? clientDepartments : null,
        coach_expertise: CoachExpertise.length > 0 ? CoachExpertise : null,
      });

      const requestOptions: RequestInit = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      const response = await fetch(
        `${baseURL}/accounts/get-create-or-update-client-id/`,
        requestOptions
      );

      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        let errorMessage = "Unknown error";
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const result = await response.json();
          errorMessage = result.error || errorMessage;
        } else {
          errorMessage = await response.text();
        }
        if (errorMessage.includes("name")) {
          toast.error("Client already exists");
        } else {
          throw new Error(errorMessage);
        }
      } else {
        const result = await response.text();
        toast.success("Successfully created the client.");
        console.log(result);
        getAllClientsData();
        cancelNewClientHandler();
      }
    } catch (error: any) {
      toast.error(`Error creating the client: Client already exists`);
      console.error(error);
    } finally {
      setChangeLoading(false);
    }
  };

  const cancelNewClientHandler = () => {
    setNewClientInit(false);
    setNewClientName("");
    setNewDomainName("");
    setNewMemberEmails("");
    setNewAllowedIps("");
    setNewRestrictedPages([]);
    setNewRestrictedFeatures([]);
    setClientHeading("");
    setSubHeading("");
    setTagLine("");
    setAccessedBotIds("");
    setMakeNewUserTrial(true);
    setAllowePaseAnswer(true);
    setClientUIInfo({
      bottom_text: "",
      header: "",
      read_text: "",
    });
    setExcludedUsers("");
    SetWebhookUrl("");
    SetWebhookToken("");
    SetWebhookSecret("");
    SetWebhookEnabled(false);
    setUseSkillFromBank(false);
    setAllowAudioInteraction(false);
    setClientDepartments("");
    setCoachExpertise("");
    setIsExpanded(false);
  };

  return (
    <div>
      <Button
        onClick={() => setNewClientInit(true)}
        variant={"default"}
        className="h-8 text-xs bg-blue-100 hover:bg-blue-50 text-blue-500 border-transparent border hover:border-blue-500"
      >
        <PlusCircle className="inline h-4 w-4 mr-2" /> Add New Client
      </Button>

      <Modal
        title="Add New Client"
        centered
        open={newClientInit}
        width={window.innerWidth < 768 ? "80%" : "60%"}
        className="w-full"
        footer={false}
        onCancel={() => setNewClientInit(false)}
      >
        <div className="flex flex-col gap-4 w-full justify-end">
          <div className="mt-3 flex flex-col gap-2 self-start w-full max-sm:flex-col max-md:flex-col max-h-[60vh] overflow-y-scroll">
            <div className="w-full flex flex-row max-sm:flex-col gap-4 max-sm:gap-2 items-start">
              <div className="w-1/2 max-sm:w-full flex flex-col gap-2 items-start">
                <p className="block text-sm font-medium">
                  Client Name <span className="text-red-500">*</span>
                </p>
                <input
                  type="text"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="w-full p-2 text-sm max-sm:w-full max-lg:w-full rounded-sm ring-transparent outline-none border border-gray-300 focus:ring-0"
                  required
                />
              </div>
              <div className="w-1/2 max-sm:w-full flex flex-col gap-2 items-start">
                <p className="block text-sm font-medium">Domain Name</p>
                <input
                  type="text"
                  value={newDomainName}
                  onChange={(e) => setNewDomainName(e.target.value)}
                  className="w-full p-2 text-sm max-sm:w-full max-lg:w-full rounded-sm ring-transparent outline-none border border-gray-300 focus:ring-0"
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-2 items-start">
              <p className="block text-sm font-medium">Member Emails</p>
              <textarea
                value={newMemberEmails}
                onChange={(e) => setNewMemberEmails(e.target.value)}
                className="w-full p-2 text-sm max-sm:w-full max-lg:w-full rounded-sm ring-transparent outline-none border border-gray-300 focus:ring-0"
              />
            </div>
            <div className="w-full flex flex-col gap-2 items-start">
              <p className="block text-sm font-medium">Departments</p>
              <textarea
                value={clientDepartments}
                onChange={(e) => setClientDepartments(e.target.value)}
                className="w-full p-2 text-sm max-sm:w-full max-lg:w-full rounded-sm ring-transparent outline-none border border-gray-300 focus:ring-0"
              />
            </div>
            <div className="w-full flex flex-col gap-2 items-start">
              <p className="block text-sm font-medium">Expertise</p>
              <textarea
                value={CoachExpertise}
                onChange={(e) => setCoachExpertise(e.target.value)}
                className="w-full p-2 text-sm max-sm:w-full max-lg:w-full rounded-sm ring-transparent outline-none border border-gray-300 focus:ring-0"
              />
            </div>
            <div className="w-full flex flex-col gap-2 items-start">
              <p className="block text-sm font-medium">Allowed Bot Ids</p>
              <textarea
                value={accessBotIds}
                onChange={(e) => setAccessedBotIds(e.target.value)}
                className="w-full p-2 text-sm max-sm:w-full max-lg:w-full rounded-sm ring-transparent outline-none border border-gray-300 focus:ring-0"
              />
            </div>
            <div className="w-full flex flex-col gap-2 items-start">
              <p className="block text-sm font-medium">Allowed IPs</p>
              <textarea
                value={newAllowedIps}
                onChange={(e) => setNewAllowedIps(e.target.value)}
                className="w-full p-2 text-sm max-sm:w-full max-lg:w-full rounded-sm ring-transparent outline-none border border-gray-300 focus:ring-0"
              />
            </div>
            <div className="w-full flex flex-col gap-2 items-start">
              <p className="block text-sm font-medium">Restricted Pages</p>
              <Select
                isMulti
                options={restrictedPageOptions}
                value={newRestrictedPages}
                onChange={(selectedOptions: MultiValue<OptionType>) =>
                  setNewRestrictedPages(selectedOptions as OptionType[])
                }
                className="w-full text-sm"
              />
            </div>
            <div className="w-full flex flex-col gap-2 items-start">
              <p className="block text-sm font-medium">Restricted Features</p>
              <Select
                isMulti
                options={restrictedFeaturesOptions}
                value={newRestrictedFeatures}
                onChange={(selectedOptions: MultiValue<OptionType>) =>
                  setNewRestrictedFeatures(selectedOptions as OptionType[])
                }
                className="w-full text-sm"
              />
            </div>
            <div className="w-full flex flex-col gap-2 items-start">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-sm font-medium text-blue-500"
              >
                Additional {isExpanded ? "▲" : "▼"}
              </button>
              {isExpanded && (
                <div className="w-full flex flex-col gap-2 items-start">
                  <div className="w-full flex flex-col gap-2 items-start">
                    <p className="block text-sm font-medium">Heading</p>
                    <textarea
                      value={clinetHheading}
                      onChange={(e) => setClientHeading(e.target.value)}
                      className="w-full p-2 text-sm max-sm:w-full max-lg:w-full rounded-sm ring-transparent outline-none border border-gray-300 focus:ring-0"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2 items-start">
                    <p className="block text-sm font-medium">Sub Heading</p>
                    <textarea
                      value={subHeading}
                      onChange={(e) => setSubHeading(e.target.value)}
                      className="w-full p-2 text-sm max-sm:w-full max-lg:w-full rounded-sm ring-transparent outline-none border border-gray-300 focus:ring-0"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2 items-start">
                    <p className="block text-sm font-medium">Tag Line</p>
                    <textarea
                      value={tagLine}
                      onChange={(e) => setTagLine(e.target.value)}
                      className="w-full p-2 text-sm max-sm:w-full max-lg:w-full rounded-sm ring-transparent outline-none border border-gray-300 focus:ring-0"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2 items-start">
                    <p className="block text-sm font-medium">Excluded Users</p>
                    <textarea
                      value={excludedUsers}
                      onChange={(e) => setExcludedUsers(e.target.value)}
                      className="w-full p-2 text-sm max-sm:w-full max-lg:w-full rounded-sm ring-transparent outline-none border border-gray-300 focus:ring-0"
                    />
                  </div>

                  <hr />
                  <p className="block text-sm  text-gray-700">
                    Bot UI Information
                  </p>
                  <hr />
                  <div className="w-full flex flex-col gap-2 items-start">
                    <p className="block text-sm font-medium">Bottom Text</p>
                    <input
                      type="text"
                      name="bottom_text"
                      value={clientUiInfo.bottom_text}
                      onChange={handleUIInfoChange}
                      className="w-full p-2 text-sm rounded-sm ring-transparent outline-none border border-gray-300 focus:ring-0"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2 items-start">
                    <p className="block text-sm font-medium">Header</p>
                    <input
                      type="text"
                      name="header"
                      value={clientUiInfo.header}
                      onChange={handleUIInfoChange}
                      className="w-full p-2 text-sm rounded-sm ring-transparent outline-none border border-gray-300 focus:ring-0"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2 items-start">
                    <p className="block text-sm font-medium">Read Text</p>
                    <textarea
                      name="read_text"
                      value={clientUiInfo.read_text}
                      onChange={handleUIInfoChange}
                      className="w-full p-2 text-sm rounded-sm ring-transparent outline-none border border-gray-300 focus:ring-0"
                    />
                  </div>

                  <hr />
                  <p className="block text-sm  text-gray-700">WebHook</p>
                  <hr />
                  <div className="w-full flex flex-col gap-2 items-start">
                    <p className="block text-sm font-medium">Webhook URL</p>
                    <textarea
                      value={webhookUrl}
                      onChange={(e) => SetWebhookUrl(e.target.value)}
                      className="w-full p-2 text-sm max-sm:w-full max-lg:w-full rounded-sm ring-transparent outline-none border border-gray-300 focus:ring-0"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2 items-start">
                    <p className="block text-sm font-medium">Webhook Token</p>
                    <textarea
                      value={webhookToken}
                      onChange={(e) => SetWebhookToken(e.target.value)}
                      className="w-full p-2 text-sm max-sm:w-full max-lg:w-full rounded-sm ring-transparent outline-none border border-gray-300 focus:ring-0"
                    />
                  </div>
                  <div className="w-full flex flex-col gap-2 items-start">
                    <p className="block text-sm font-medium">Webhook Secret</p>
                    <textarea
                      value={webhookSecret}
                      onChange={(e) => SetWebhookSecret(e.target.value)}
                      className="w-full p-2 text-sm max-sm:w-full max-lg:w-full rounded-sm ring-transparent outline-none border border-gray-300 focus:ring-0"
                    />
                  </div>

                  <div className="flex items-start space-x-2 my-1.5 ">
                    <Checkbox
                      checked={webhookEnabled}
                      // required={!checkIfEdit}
                      onCheckedChange={(checked) => {
                        SetWebhookEnabled(Boolean(checked));
                      }}
                    />
                    <label className="text-xs text-gray-700">
                      Webhook Enabled
                    </label>
                  </div>

                  <div className="flex items-start space-x-2 my-1.5 ">
                    <Checkbox
                      checked={makeNewUserTrial}
                      // required={!checkIfEdit}
                      onCheckedChange={(checked) => {
                        setMakeNewUserTrial(Boolean(checked));
                      }}
                    />
                    <label className="text-xs text-gray-700">
                      Make New User in Trail
                    </label>
                  </div>
                  <div className="flex items-start space-x-2 my-1.5 ">
                    <Checkbox
                      checked={useSkillFromBank}
                      // required={!checkIfEdit}
                      onCheckedChange={(checked) => {
                        setUseSkillFromBank(Boolean(checked));
                      }}
                    />
                    <label className="text-xs text-gray-700">
                      Use Skill from Bank
                    </label>
                  </div>
                  <div className="flex items-start space-x-2 my-1.5 ">
                    <Checkbox
                      checked={allowePasteAnswer}
                      // required={!checkIfEdit}
                      onCheckedChange={(checked) => {
                        setAllowePaseAnswer(Boolean(checked));
                      }}
                    />
                    <label className="text-xs text-gray-700">
                      Allow Paste Answer
                    </label>
                  </div>
                  <div className="flex items-start space-x-2 my-1.5 ">
                    <Checkbox
                      checked={alloweAudioInteraction}
                      // required={!checkIfEdit}
                      onCheckedChange={(checked) => {
                        setAllowAudioInteraction(Boolean(checked));
                      }}
                    />
                    <label className="text-xs text-gray-700">
                      Allow Audio Interaction
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="self-end">
            <Button
              variant={"destructive"}
              className="max-sm:p-2 h-7 mt-2 hover:brightness-105 text-sm w-fit mr-2"
              onClick={cancelNewClientHandler}
            >
              Cancel <X className="ml-2 h-4 w-4" />
            </Button>
            <Button
              disabled={newClientName.length === 0}
              className="max-sm:p-2 h-7 mt-2 hover:brightness-105 bg-blue-600"
              onClick={newClientHandler}
            >
              {changeLoading ? (
                <>
                  Creating <Loader className="ml-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  Confirm <PenBox className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddNewClient;
