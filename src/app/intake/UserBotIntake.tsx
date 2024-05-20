"use client";

import { Badge } from "@/components/ui/badge";
import {
  baseURL,
  basicAuth,
  convertTextToCorrectFormat,
  getBotById,
  getUserAccount,
  isValidLinks,
  isValidYoutubeLinks,
  subdomain,
  transformExtractedData,
} from "@/lib/utils";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { Button } from "@/components/ui/button";
import {
  File,
  Info,
  Loader,
  PenLine,
  SendHorizonal,
  Trash2,
  UndoDot,
} from "lucide-react";
import mammoth from "mammoth";
import { pdfjs } from "react-pdf";
import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { MediaData } from "@/lib/types";
import Link from "next/link";
import { TooltipWrapper } from "@/components/TooltipWrapper";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const handleWordLimit = (
  input_value: string,
  minLimit: number,
  maxLimit: number,
  fieldName: string,
  setError: Function
) => {
  const inputValue = input_value.trim();
  const words = inputValue.split(/\s+/);
  const wordCount = words.length;

  console.log(`Input Value: "${inputValue}"`);
  console.log(`Words: ${JSON.stringify(words)}`);
  console.log(`Word Count: ${wordCount}`);

  if (wordCount >= minLimit && wordCount <= maxLimit) {
    setError((prevErrors: any) => ({ ...prevErrors, [fieldName]: "" }));
  } else if (wordCount < minLimit) {
    setError((prevErrors: any) => ({
      ...prevErrors,
      [fieldName]: `Minimum ${minLimit} words are required.`,
    }));
  } else {
    setError((prevErrors: any) => ({
      ...prevErrors,
      [fieldName]: `Maximum ${maxLimit} words are allowed.`,
    }));
  }
};

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

  //mediaData
  const [mediaData, setMediaData] = useState<MediaData>();

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
    formdata.append(
      "name",
      `${user.given_name} ${user.family_name ? user.family_name : ""}`
    );
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
      formdata.append("for_reapproval", "true");
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

          let deletingDocs: string = "";
          let deletingPdfs: string = "";
          if (mediaData?.extracted_from_pdf) {
            deletingDocs = mediaData?.extracted_from_pdf
              .map((item) => {
                if (item.isDeleted && item.fileName.includes(".docx")) {
                  return item.fileName;
                }
              })
              .filter((item) => item !== undefined)
              .join(", ");

            deletingPdfs = mediaData?.extracted_from_pdf
              .map((item) => {
                if (item.isDeleted && item.fileName.includes(".pdf")) {
                  return item.fileName;
                }
              })
              .filter((item) => item !== undefined)
              .join(", ");
          }

          let deletingArticleLinks: string = "";
          if (mediaData?.extracted_from_article) {
            deletingArticleLinks = mediaData?.extracted_from_article
              .map((item) => {
                if (item.isDeleted) {
                  return item.fileName;
                }
              })
              .filter((item) => item !== undefined)
              .join(", ");
          }

          let deletingYoutubeLinks: string = "";
          if (mediaData?.extracted_from_youtube) {
            deletingYoutubeLinks = mediaData?.extracted_from_youtube
              .map((item) => {
                if (item.isDeleted) {
                  return item.fileName;
                }
              })
              .filter((item) => item !== undefined)
              .join(", ");
          }

          const deletedData = {
            pdf_files: deletingPdfs,
            youtube_links: deletingYoutubeLinks,
            article_links: deletingArticleLinks,
            doc_files: deletingDocs,
          };

          console.log(deletedData);
          patchFormData.append("deleted_data", JSON.stringify(deletedData));

          patchFormData.append(
            "media_data",
            JSON.stringify({
              youtube_links: releventLinks.split(",").filter((link) => link.includes("youtube")).join(","),
              article_links: releventLinks.split(",").filter((link) => !link.includes("youtube")).join(","),
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
              
              if (data.error && data.msg) {
                toast.error("Error creating your user bot, Please try again.");
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
              setSubmitLoading(false);
            })
            .catch((err) => {
              setSubmitLoading(false);
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
              const testdata = data.data.filter(
                (bot: any) => bot.signature_bot.bot_id === botIdFromParams
              );
              console.log(testdata);
              let resultingBot = getBotById(botIdFromParams!, data.data);

              console.log(resultingBot);

              if (resultingBot) {
                setBotName(resultingBot.bot_attributes.bot_name);
                console.log(
                  transformExtractedData(
                    resultingBot.signature_bot.data.media_data
                  )
                );
                setMediaData(
                  transformExtractedData(
                    resultingBot.signature_bot.data.media_data
                  )
                );
                let parsedFaqJson: any;
                if (typeof resultingBot.signature_bot.faqs === "string") {
                  parsedFaqJson = JSON.parse(resultingBot.signature_bot.faqs);
                } else {
                  parsedFaqJson = resultingBot.signature_bot.faqs;
                }
                setCommanFaqs(
                  parsedFaqJson[
                    "Provide a few common FAQs the bot should use for commonly asked questions?"
                  ]
                );
                setFunctionsNTasksOfBot(
                  parsedFaqJson[
                    "What tasks or functions should the bot perform?"
                  ]
                );
                setInfoAccessToBots(
                  parsedFaqJson[
                    "Provide the information the bot should have access to generate responses?"
                  ]
                );
                setPrimaryPurpose(
                  parsedFaqJson["What is the primary purpose of the bot?"]
                );

                // setReleventLinks(
                //   parsedFaqJson[
                //     "Provide any relevant links and make sure the links are publicly accessible"
                //   ]
                // );
              }
            });
        });
    }
  }, []);

  const [error, setError] = useState({});

  const handleInputLinks = (input_value: string, fieldName: string) => {
    const inputValue = input_value;

    if (isValidLinks(inputValue)) {
      setError((prevErrors) => ({ ...prevErrors, [fieldName]: "" }));
    } else {
      setError((prevErrors) => ({
        ...prevErrors,
        [fieldName]: `Please enter the valid link(s).`,
      }));
    }
  };

  const deleteMediaDataHandler = (fileName: string) => {
    const updatedData: any = { ...mediaData };

    for (const category in updatedData) {
      if (Array.isArray(updatedData[category])) {
        const categoryItems = updatedData[category];
        const updatedCategoryItems = categoryItems.map((item: any) =>
          item.fileName === fileName ? { ...item, isDeleted: true } : item
        );
        updatedData[category] = updatedCategoryItems;
      }
    }

    setMediaData(updatedData);
  };

  const undoDeleteMediaDataHandler = (fileName: string) => {
    const updatedData: any = { ...mediaData };

    for (const category in updatedData) {
      if (Array.isArray(updatedData[category])) {
        const categoryItems = updatedData[category];
        const updatedCategoryItems = categoryItems.map((item: any) =>
          item.fileName === fileName ? { ...item, isDeleted: false } : item
        );
        updatedData[category] = updatedCategoryItems;
      }
    }

    setMediaData(updatedData);
  };

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
                disabled={
                  (checkIfEdit ? true : false) || (checkIfView ? true : false)
                }
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const words = inputValue.trim().split(/\s+/);
                  if (words.length <= 10) {
                    setBotName(inputValue);
                  }
                  handleWordLimit(inputValue, 3, 10, "botName", setError);
                }}
                value={botName}
                placeholder="Project X bot, POSH bot, Digital literacy bot etc."
                type="text"
                className={`w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 ${
                  checkIfEdit || checkIfView ? "hover:cursor-not-allowed" : ""
                }`}
              />
              {Object.keys(error).includes("botName") && (
                <p className="text-red-500 text-xs mt-1">
                  {(error as any)["botName"]}
                </p>
              )}
            </div>
            <div className="my-3">
              <p className="text-sm max-sm:text-xs my-1">
                What is the primary purpose of the bot?
              </p>
              <textarea
                rows={4}
                required
                disabled={checkIfView === null ? false : true}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const words = inputValue.trim().split(/\s+/);
                  if (words.length <= 50) {
                    setPrimaryPurpose(inputValue);
                  }
                  handleWordLimit(
                    inputValue,
                    10,
                    50,
                    "primaryPurpose",
                    setError
                  );
                }}
                value={primaryPurpose}
                placeholder="Briefly describe the bot's main goal, e.g., 'To provide customer support for product inquiries'"
                className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
              />
              {Object.keys(error).includes("primaryPurpose") && (
                <p className="text-red-500 text-xs mt-1">
                  {(error as any)["primaryPurpose"]}
                </p>
              )}
            </div>

            <div className="my-3">
              <p className="text-sm max-sm:text-xs my-1">
                What tasks or functions should the bot perform?
              </p>
              <textarea
                rows={4}
                required
                disabled={checkIfView === null ? false : true}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const words = inputValue.trim().split(/\s+/);
                  if (words.length <= 75) {
                    setFunctionsNTasksOfBot(inputValue);
                  }
                  handleWordLimit(
                    inputValue,
                    15,
                    75,
                    "functionsNTasksOfBot",
                    setError
                  );
                }}
                value={functionsNTasksOfBot}
                placeholder="List tasks or functions, e.g., 'Answer FAQs, process orders, provide account information.'"
                className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
              />
              {Object.keys(error).includes("functionsNTasksOfBot") && (
                <p className="text-red-500 text-xs mt-1">
                  {(error as any)["functionsNTasksOfBot"]}
                </p>
              )}
            </div>

            <div className="my-3">
              <p className="text-sm max-sm:text-xs my-1">
                Provide the information the bot should have access to generate
                responses?
              </p>
              <textarea
                rows={4}
                required
                disabled={checkIfView === null ? false : true}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const words = inputValue.trim().split(/\s+/);
                  if (words.length <= 100) {
                    setInfoAccessToBots(inputValue);
                  }
                  handleWordLimit(
                    inputValue,
                    20,
                    100,
                    "infoAccessToBot",
                    setError
                  );
                }}
                value={infoAccessToBot}
                placeholder="Specify data sources for responses, e.g., 'Access FAQs, project information, and documentation.'"
                className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
              />
              {Object.keys(error).includes("infoAccessToBot") && (
                <p className="text-red-500 text-xs mt-1">
                  {(error as any)["infoAccessToBot"]}
                </p>
              )}
            </div>

            <div className="my-3">
              <p className="text-sm max-sm:text-xs my-1">
                Provide a few common FAQs the bot should use for commonly asked
                questions?
              </p>
              <textarea
                rows={4}
                required
                disabled={checkIfView === null ? false : true}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const words = inputValue.trim().split(/\s+/);
                  if (words.length <= 50) {
                    setCommanFaqs(inputValue);
                  }
                  handleWordLimit(inputValue, 10, 50, "commanFaqs", setError);
                }}
                value={commanFaqs}
                placeholder="List example FAQs, e.g., 'Q. How to reset password. A. Visit our website's login page and click 'Forgot Password' to reset.'"
                className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
              />
              {Object.keys(error).includes("commanFaqs") && (
                <p className="text-red-500 text-xs mt-1">
                  {(error as any)["commanFaqs"]}
                </p>
              )}
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
              {/* @ts-ignore */}
              {mediaData?.extracted_from_pdf.length > 0 && (
                <div className="w-full bg-red-50 border border-red-200 rounded-md p-2 max-sm:px-1 flex flex-col gap-1 mt-2">
                  {mediaData?.extracted_from_pdf.map((item) => (
                    <div className="flex flex-row justify-between items-center">
                      <div className="flex flex-row items-center gap-2">
                        <File className="h-4 w-4 ml-2 max-sm:ml-0 inline" />{" "}
                        <span
                          className={`text-xs text-blue-500 truncate ${
                            item.isDeleted && "line-through"
                          }`}
                        >
                          {item.fileName}
                        </span>
                      </div>
                      {checkIfEdit && (
                        <div className="flex flex-row gap-2 min-w-fit">
                          <Button
                            variant={"outline"}
                            className="h-6 text-xs w-fit"
                            type="button"
                            disabled={item.isDeleted}
                            onClick={() => {
                              deleteMediaDataHandler(item.fileName);
                            }}
                          >
                            <span className="max-sm:hidden">Delete</span>
                            <TooltipWrapper
                              className="hidden max-sm:block text-xs"
                              tooltipName="Delete"
                              body={
                                <Trash2 className="h-3 w-3 ml-2 max-sm:ml-0" />
                              }
                            />
                          </Button>
                          <Button
                            variant={"outline"}
                            className="h-6 text-xs w-fit"
                            type="button"
                            disabled={!item.isDeleted}
                            onClick={() => {
                              undoDeleteMediaDataHandler(item.fileName);
                            }}
                          >
                            <span className="max-sm:hidden">Undo delete</span>
                            <TooltipWrapper
                              className="hidden max-sm:block text-xs"
                              tooltipName="Undo delete"
                              body={
                                <UndoDot className="h-4 w-4 ml-2 max-sm:ml-0" />
                              }
                            />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="my-3">
              <p className="text-sm max-sm:text-xs my-1">
                Provide any relevant links and make sure the links are publicly
                accessible
              </p>
              <textarea
                disabled={checkIfView === null ? false : true}
                value={releventLinks}
                required={!checkIfEdit}
                onChange={(e) => {
                  setReleventLinks(e.target.value);
                  handleInputLinks(e.target.value, "releventLinks");
                }}
                placeholder="Provide accessible links, e.g. '[YouTube link], [Article link] '"
                rows={4}
                className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 "
              />
              {Object.keys(error).includes("releventLinks") && (
                <p className="text-red-500 text-xs mt-1">
                  {(error as any)["releventLinks"]}
                </p>
              )}
              {/* @ts-ignore */}
              {mediaData?.extracted_from_youtube.length > 0 && (
                <div className="w-full bg-red-50 border border-red-200 rounded-md p-2 max-sm:px-1 flex flex-col gap-1">
                  {mediaData?.extracted_from_youtube.map((item) => (
                    <div className="flex flex-row justify-between items-center">
                      <Link
                        href={item.fileName}
                        target="_target"
                        className={`text-xs text-blue-500 truncate ${
                          item.isDeleted && "line-through"
                        }`}
                      >
                        {item.fileName}
                      </Link>
                      {checkIfEdit && (
                        <div className="flex flex-row gap-2 min-w-fit">
                          <Button
                            variant={"outline"}
                            className="h-6 text-xs w-fit"
                            type="button"
                            disabled={item.isDeleted}
                            onClick={() => {
                              deleteMediaDataHandler(item.fileName);
                            }}
                          >
                            <span className="max-sm:hidden">Delete</span>
                            <TooltipWrapper
                              className="hidden max-sm:block text-xs"
                              tooltipName="Delete"
                              body={
                                <Trash2 className="h-3 w-3 ml-2 max-sm:ml-0" />
                              }
                            />
                          </Button>
                          <Button
                            variant={"outline"}
                            className="h-6 text-xs w-fit"
                            type="button"
                            disabled={!item.isDeleted}
                            onClick={() => {
                              undoDeleteMediaDataHandler(item.fileName);
                            }}
                          >
                            <span className="max-sm:hidden">Undo delete</span>
                            <TooltipWrapper
                              className="hidden max-sm:block text-xs"
                              tooltipName="Undo delete"
                              body={
                                <UndoDot className="h-4 w-4 ml-2 max-sm:ml-0" />
                              }
                            />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {/* @ts-ignore */}
              {mediaData?.extracted_from_article.length > 0 && (
                <div className="w-full mt-1 bg-red-50 border border-red-200 rounded-md p-2 max-sm:px-1 flex flex-col gap-1">
                  {mediaData?.extracted_from_article.map((item) => (
                    <div className="flex flex-row justify-between items-center">
                      <Link
                        href={item.fileName}
                        target="_target"
                        className={`text-xs text-blue-500 truncate ${
                          item.isDeleted && "line-through"
                        }`}
                      >
                        {item.fileName}
                      </Link>
                      {checkIfEdit && (
                        <div className="flex flex-row gap-2 min-w-fit">
                          <Button
                            variant={"outline"}
                            className="h-6 text-xs w-fit"
                            type="button"
                            disabled={item.isDeleted}
                            onClick={() => {
                              deleteMediaDataHandler(item.fileName);
                            }}
                          >
                            <span className="max-sm:hidden">Delete</span>
                            <TooltipWrapper
                              className="hidden max-sm:block text-xs"
                              tooltipName="Delete"
                              body={
                                <Trash2 className="h-3 w-3 ml-2 max-sm:ml-0" />
                              }
                            />
                          </Button>
                          <Button
                            variant={"outline"}
                            className="h-6 text-xs w-fit"
                            type="button"
                            disabled={!item.isDeleted}
                            onClick={() => {
                              undoDeleteMediaDataHandler(item.fileName);
                            }}
                          >
                            <span className="max-sm:hidden">Undo delete</span>
                            <TooltipWrapper
                              className="hidden max-sm:block text-xs"
                              tooltipName="Undo delete"
                              body={
                                <UndoDot className="h-4 w-4 ml-2 max-sm:ml-0" />
                              }
                            />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
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
                    <Button disabled={submitLoading } className="h-8">
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
