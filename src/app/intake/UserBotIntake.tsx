"use client";

import { Badge } from "@/components/ui/badge";
import {
  baseURL,
  basicAuth,
  convertTextToCorrectFormat,
  getBotById,
  getUserAccount,
  subdomain,
} from "@/lib/utils";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { Button } from "@/components/ui/button";
import { Info, Loader, PenLine, SendHorizonal } from "lucide-react";
import mammoth from "mammoth";
import { pdfjs } from "react-pdf";
import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const UserBotIntake = ({ user }: { user: KindeUser }) => {
  const params = useSearchParams();
  const checkIfEdit = params.get("edit");
  const checkIfView = params.get("view");
  const botIdFromParams = params.get("bot_id");
  const botIUidFromParams = params.get("uid");

  const [userId, setUserId] = useState("");
  //user input states
  const [botName, setBotName] = useState("");
  const [primaryPurpose, setPrimaryPurpose] = useState("");
  const [functionsNTasksOfBot, setFunctionsNTasksOfBot] = useState("");
  const [infoAccessToBot, setInfoAccessToBots] = useState("");
  const [commanFaqs, setCommanFaqs] = useState("");

  const [privacyInfoChecked, setPrivaciInfoChecked] = useState<
    boolean | string
  >();

  const router = useRouter();

  interface FileData {
    file: File;
    id: number;
    text: string;
  }
  const [releventDocument, setReleventDocuments] = useState<FileData[]>([]);
  const [releventLinks, setReleventLinks] = useState("");

  useEffect(() => {
    if (user) {
      getUserAccount(user)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUserId(data.uid);
        });
    }
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target?.files;

    if (selectedFiles) {
      const filesArray = await Promise.all(
        Array.from(selectedFiles).map(async (file: File) => {
          let textContent: string = "";
          try {
            if (file.name.includes(".pdf")) {
              textContent = (await extractTextFromPdf(file)) || "";
            } else if (file.name.includes(".docx")) {
              textContent = (await extractTextFromDocx(file)) || "";
            }
            console.log("text", textContent);
          } catch (error) {
            console.error("Error extracting text from DOCX:", error);
            // If text extraction fails, set textContent to an empty string or handle it as needed
            // textContent = '';
          }
          return {
            file: file,
            id: Math.floor(Math.random() * 10000),
            text: textContent,
          };
        })
      );

      setReleventDocuments((prevFiles) => [...prevFiles, ...filesArray]);
    }
  };

  const extractTextFromDocx = async (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const arrayBuffer = (event.target as FileReader)
          ?.result as ArrayBuffer | null;

        if (arrayBuffer) {
          try {
            const result = await mammoth.extractRawText({ arrayBuffer });
            console.log("text", result.value);
            resolve(result.value);
          } catch (error) {
            console.error("Error extracting text from DOCX:", error);
            reject(error);
          }
        } else {
          reject(new Error("Failed to read file as ArrayBuffer."));
        }
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const extractTextFromPdf = async (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const arrayBuffer = (event.target as FileReader)
          ?.result as ArrayBuffer | null;

        if (arrayBuffer) {
          try {
            const pdfData = new Uint8Array(await file.arrayBuffer());
            const pdf = await pdfjs.getDocument({ data: pdfData }).promise;
            let extractedText = "";
            for (let i = 1; i <= pdf.numPages; i++) {
              const page = await pdf.getPage(i);
              const content = await page.getTextContent();
              extractedText +=
                content.items.map((item: any) => item.str).join(" ") + "\n"; // Type assertion here
            }

            resolve(extractedText);
          } catch (error) {
            console.error("Error extracting text from PDF:", error);
            reject(error);
          }
        } else {
          reject(new Error("Failed to read file as ArrayBuffer."));
        }
      };

      reader.readAsArrayBuffer(file);
    });
  };

  const resetAllStates = () => {
    setBotName("");
    setCommanFaqs("");
    setFunctionsNTasksOfBot("");
    setInfoAccessToBots("");
    setPrimaryPurpose("");
    setReleventDocuments([]);
    setReleventLinks("");
  };

  const [submitLoading, setSubmitLoading] = useState(false);
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Authorization", basicAuth);
    // myHeaders.append("Content-Type", "application/json");
    setSubmitLoading(true);
    // if (!checkIfEdit) {
    var formdata = new FormData();
    formdata.append("name", user.given_name!);
    formdata.append("user_id", userId);
    formdata.append("bot_name", botName);
    formdata.append("participant_id", userId);
    formdata.append("email", user.email!);
    formdata.append("bot_type", "user_bot");
    formdata.append(
      "profile_image",
      "https://res.cloudinary.com/dtbl4jg02/image/upload/v1709553181/WhatsApp_Image_2024-03-04_at_5.12.07_PM_gorlzg.jpg"
    );

    formdata.append(
      "attributes",
      JSON.stringify({
        heading: `welcome to ${user.given_name}'s user bot`,
      })
    );

    formdata.append(
      "bot_base_url",
      `${
        subdomain === "playground"
          ? "https://playground.coachbots.com/"
          : "https://platform.coachbots.com/"
      }`
    );

    formdata.append(
      "faqs",
      JSON.stringify({
        "What is the primary purpose of the bot?": primaryPurpose,
        "What tasks or functions should the bot perform?": functionsNTasksOfBot,
        "Provide the information the bot should have access to generate responses?":
          infoAccessToBot,
        "Provide a few common FAQs the bot should use for commonly asked questions?":
          commanFaqs,
        "Provide any relevant links and make sure the links are publicly accessible":
          releventLinks,
      })
    );

    if (checkIfEdit) {
      formdata.append("bot_id", botIUidFromParams!);
    }

    fetch(`${baseURL}/accounts/create-bot-by-details/`, {
      method: checkIfEdit ? "PATCH" : "POST",
      headers: myHeaders,
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (
          !data.error &&
          !data.detail &&
          (checkIfEdit ? data.msg === "updated" : !data.msg)
        ) {
          const patchFormData = new FormData();
          releventDocument.forEach(({ file, text }) => {
            if (file.name.includes(".pdf")) {
              if (text) {
                patchFormData.append(
                  "pdf_data",
                  `file_name:${file.name} text_file:${text}`
                );
                console.log(text);
              } else {
                patchFormData.append(`attached_pdfs`, file, file.name.trim());
              }
            } else if (file.name.includes(".docx")) {
              if (text) {
                patchFormData.append(
                  `doc_data`,
                  `file_name:${file.name} text_file:${text}`
                );
                console.log(text);
              } else {
                patchFormData.append(`attached_docs`, file, file.name.trim());
              }
            }
          });

          patchFormData.append(
            "media_data",
            JSON.stringify({
              youtube_links: releventLinks,
            })
          );

          patchFormData.append(
            "bot_id",
            checkIfEdit ? botIUidFromParams! : data.bot_uid
          );

          fetch(`${baseURL}/accounts/create-bot-by-details/`, {
            method: "PATCH",
            headers: myHeaders,
            body: patchFormData,
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.error) {
              } else {
                resetAllStates();
                if (checkIfEdit) {
                  toast.success("Successfully Updated your user bot.", {
                    duration: 6000,
                  });
                  setTimeout(() => {
                    router.push("/profile");
                  }, 4000);
                } else {
                  toast.success(
                    "Your request in is the AI review pipeline and will be available in deployed shortly. You will receive a email when its live.",
                    {
                      duration: 6000,
                    }
                  );
                  setTimeout(() => {
                    router.push("/");
                  }, 4000);
                }
              }
            })
            .catch((err) => {
              console.error(err);
              toast.error("Error creating your user bot, Please try again.");
            });
        } else {
          toast.error("Error creating your user bot, Please try again.");
        }
        setSubmitLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.loading("Error creating your user bot, Please try again.");
        setSubmitLoading(false);
      });
    // }
  };

  //handling edit
  useEffect(() => {
    if (checkIfEdit === "true" || checkIfView === "true") {
      getUserAccount(user)
        .then((res) => res.json())
        .then((data) => {
          fetch(`${baseURL}/accounts/get-bots/?user_id=${data.uid}`, {
            headers: {
              Authorization: basicAuth,
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(
                "Bot details for edit - User bot  [userBotIntake]",
                data
              );
              let resultingBot = getBotById(botIdFromParams!, data.data);

              console.log(resultingBot);

              setBotName(resultingBot.bot_attributes.bot_name);
              const parsedFaqJson = JSON.parse(resultingBot.signature_bot.faqs);
              setCommanFaqs(
                parsedFaqJson[
                  "Provide a few common FAQs the bot should use for commonly asked questions?"
                ]
              );
              setFunctionsNTasksOfBot(
                parsedFaqJson["What tasks or functions should the bot perform?"]
              );
              setInfoAccessToBots(
                parsedFaqJson[
                  "Provide the information the bot should have access to generate responses?"
                ]
              );
              setPrimaryPurpose(
                parsedFaqJson["What is the primary purpose of the bot?"]
              );
              setReleventLinks(
                parsedFaqJson[
                  "Provide any relevant links and make sure the links are publicly accessible"
                ]
              );
            });
        });
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="bg-white border w-[60%] max-md:w-[80%] max-lg:w-[80%] max-sm:w-[90%] h-fit p-4 mt-5 rounded-md mb-4">
        <h1 className="text-xl text-left text-gray-600 font-bold">
          Knowledge bot intake
        </h1>
        <p className="mb-3 text-left text-sm max-sm:text-xs text-gray-600">
          Use this form to create your Knowledge bot.
        </p>
        <form
          className="text-left"
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            submitHandler(e);
          }}
        >
          <div className="flex flex-col gap-2">
            {checkIfView && (
              <Badge
                className="bg-blue-200 w-fit text-blue-800"
                variant={"outline"}
              >
                You are viewing your knowledge bot Intake.
              </Badge>
            )}
            {!checkIfView && (
              <>
                {" "}
                <Badge
                  variant={"secondary"}
                  className="rounded-sm bg-[#fef3c7] text-[#d97706] p-1 w-fit"
                >
                  <Info className="h-4 w-4 mr-1" /> All fields are required.
                </Badge>
                {checkIfEdit && (
                  <Badge
                    className="bg-blue-200 w-fit text-blue-800"
                    variant={"outline"}
                  >
                    You are editing your bot. All the earlier inputs will be
                    replaced by current inputs.
                  </Badge>
                )}
              </>
            )}
          </div>
          <div>
            <div className="my-3">
              <p className="text-sm max-sm:text-xs my-1">
                Enter your bot name.
              </p>
              <input
                required
                disabled={checkIfEdit ? true : false}
                onChange={(e) => {
                  setBotName(e.target.value);
                }}
                value={botName}
                placeholder="Project X bot, POSH bot, Digital literacy bot etc."
                type="text"
                className={`w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 ${
                  checkIfEdit ? "hover:cursor-not-allowed" : ""
                }`}
              />
            </div>
            <div className="my-3">
              <p className="text-sm max-sm:text-xs my-1">
                What is the primary purpose of the bot?
              </p>
              <input
                required
                disabled={checkIfView === null ? false : true}
                onChange={(e) => {
                  setPrimaryPurpose(e.target.value);
                }}
                value={primaryPurpose}
                placeholder="Briefly describe the bot's main goal, e.g., 'To provide customer support for product inquiries'"
                type="text"
                className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
              />
            </div>
            <div className="my-3">
              <p className="text-sm max-sm:text-xs my-1">
                What tasks or functions should the bot perform?
              </p>
              <textarea
                disabled={checkIfView === null ? false : true}
                required
                onChange={(e) => {
                  setFunctionsNTasksOfBot(e.target.value);
                }}
                value={functionsNTasksOfBot}
                placeholder="List tasks or functions, e.g., `Answer FAQs, process orders, provide account information.`"
                rows={3}
                className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
              />
            </div>
            <div className="my-3">
              <p className="text-sm max-sm:text-xs my-1">
                Provide the information the bot should have access to generate
                responses?
              </p>
              <textarea
                disabled={checkIfView === null ? false : true}
                value={infoAccessToBot}
                required
                onChange={(e) => {
                  setInfoAccessToBots(e.target.value);
                }}
                placeholder="Specify data sources for responses, e.g., 'Access FAQs, project information, and documentation.'"
                rows={3}
                className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
              />
            </div>
            <div className="my-3">
              <p className="text-sm max-sm:text-xs my-1">
                Provide a few common FAQs the bot should use for commonly asked
                questions?
              </p>
              <textarea
                disabled={checkIfView === null ? false : true}
                value={commanFaqs}
                required
                onChange={(e) => {
                  setCommanFaqs(e.target.value);
                }}
                placeholder="list example FAQs, e.g., 'Q. How to reset password. A. Visit our website's login page and click 'Forgot Password' to reset.'"
                rows={3}
                className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
              />
            </div>
            <div className="my-3">
              <p className="text-sm max-sm:text-xs my-1">
                Upload any relevant document or pdf to add to the bot
              </p>
              <div className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 ">
                <input
                  disabled={checkIfView === null ? false : true}
                  type="file"
                  className="w-full text-xs my-2"
                  multiple
                  name="files"
                  accept=".pdf,.docx"
                  onChange={async (e) => {
                    handleFileChange(e);
                  }}
                />
                <p className="m-1 ml-0 text-gray-500">
                  Attach relevant files, e.g., "User manual.pdf" or "FAQs.docx,"
                  to enhance bot knowledge.
                </p>
              </div>
            </div>
            <div className="my-3">
              <p className="text-sm max-sm:text-xs my-1">
                Provide any relevant links and make sure the links are publicly
                accessible
              </p>
              <textarea
                disabled={checkIfView === null ? false : true}
                value={releventLinks}
                required
                onChange={(e) => {
                  setReleventLinks(e.target.value);
                }}
                placeholder="youtube links) - Provide accessible links, e.g. '[YouTube link].'"
                rows={3}
                className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
              />
            </div>
            {!checkIfView && (
              <>
                <hr className="mb-2" />
                <div className="flex items-start space-x-2 my-1.5 ">
                  <Checkbox
                    checked={checkIfEdit ? true : Boolean(privacyInfoChecked)}
                    onCheckedChange={(checked) => {
                      setPrivaciInfoChecked(checked);
                    }}
                  />
                  <label className="text-xs text-gray-700">
                    We respect your data and privacy. Any data is handled per
                    the data security and privacy policy of the organization
                    holding the platform license. Please contact your program
                    administrator for removal requests. Any AI assets created by
                    the users are considered the property of the organization
                    the individuals are affiliated with.
                  </label>
                </div>
                <div>
                  {checkIfEdit ? (
                    <Button disabled={submitLoading} className="h-8">
                      {" "}
                      {submitLoading ? (
                        <>
                          <Loader className="h-5 w-5 animate-spin mr-2" />{" "}
                          Saving
                        </>
                      ) : (
                        <>
                          Save Changes <PenLine className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button
                      disabled={submitLoading || !privacyInfoChecked}
                      className="h-8"
                    >
                      {" "}
                      {submitLoading ? (
                        <>
                          <Loader className="h-5 w-5 animate-spin mr-2" />{" "}
                          Submitting
                        </>
                      ) : (
                        <>
                          Submit <SendHorizonal className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserBotIntake;
