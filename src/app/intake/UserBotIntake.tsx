"use client";

import { Badge } from "@/components/ui/badge";
import {
  baseURL,
  basicAuth,
  convertTextToCorrectFormat,
  getUserAccount,
  subdomain,
} from "@/lib/utils";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { Button } from "@/components/ui/button";
import { Info, Loader, SendHorizonal } from "lucide-react";
import mammoth from "mammoth";
import { pdfjs } from "react-pdf";
import { FormEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const UserBotIntake = ({ user }: { user: KindeUser }) => {
  const params = useSearchParams();
  const checkIfEdit = params.get("edit");

  const [userId, setUserId] = useState("");
  //user input states
  const [primaryPurpose, setPrimaryPurpose] = useState("");
  const [functionsNTasksOfBot, setFunctionsNTasksOfBot] = useState("");
  const [infoAccessToBot, setInfoAccessToBots] = useState("");
  const [commanFaqs, setCommanFaqs] = useState("");

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
          fetch(
            `${baseURL}/accounts/coach-coachee-mentor-mentee-profile/?user_id=${data.uid}`,
            {
              headers: {
                Authorization: basicAuth,
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              console.error(err);
            });
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
    setCommanFaqs("");
    setFunctionsNTasksOfBot("");
    setInfoAccessToBots("");
    setPrimaryPurpose("");
    setReleventDocuments([]);
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    var myHeaders = new Headers();
    myHeaders.append("Authorization", basicAuth);
    myHeaders.append("Content-Type", "application/json");

    if (!checkIfEdit) {
      //   var formdata = new FormData();
      //   formdata.append("name", user.given_name!);
      //   formdata.append("user_id", userId);
      //   formdata.append("email", user.email!);
      //   formdata.append("bot_type", "user_bot");
      //   formdata.append("profile_type", "skill_bot");
      //   formdata.append(
      //     "faqs",
      //     JSON.stringify({
      //       "What is the primary purpose of the bot?": primaryPurpose,
      //       "What tasks or functions should the bot perform?":
      //         functionsNTasksOfBot,
      //       "Provide the information the bot should have access to generate responses?":
      //         infoAccessToBot,
      //       "Provide a few common FAQs the bot should use for commonly asked questions?":
      //         commanFaqs,
      //       "Provide any relevant links and make sure the links are publicly accessible":
      //         releventLinks,
      //     })
      //   );

      //   releventDocument.forEach(({ file, text }) => {
      //     if (file.name.includes(".pdf")) {
      //       if (text) {
      //         formdata.append(
      //           "pdf_data",
      //           `file_name:${file.name} text_file:${text}`
      //         );
      //         console.log(text);
      //       } else {
      //         formdata.append(`attached_pdfs`, file, file.name.trim());
      //       }
      //     } else if (file.name.includes(".docx")) {
      //       if (text) {
      //         formdata.append(
      //           `doc_data`,
      //           `file_name:${file.name} text_file:${text}`
      //         );
      //         console.log(text);
      //       } else {
      //         formdata.append(`attached_docs`, file, file.name.trim());
      //       }
      //     }
      //   });

      //   var requestOptions = {
      //     method: "POST",
      //     headers: myHeaders,
      //     body: formdata,
      //   };
      //   fetch(
      //     `${baseURL}/accounts/coach-coachee-mentor-mentee-profile/`,
      //     requestOptions
      //   )
      //     .then((response) => response.json())
      //     .then((result) => {
      //       console.log(result);
      //     })
      //     .catch((err) => {
      //       console.error(err);
      //     });

      const userBotCreationFormData = {
        bot_type: "user_bot",
        profile_id: "47fd784d-535a-4f57-bb5b-d8f333062761",
        email: user.email,
        bot_name: "user-bot",
        bot_details: null,
        attributes: {
          heading: `welcome to ${user.given_name}'s user bot`,
        },
        bot_base_url: `${
          subdomain === "playground"
            ? "https://playground.coachbots.com/"
            : "https://platform.coachbots.com/"
        }`,
        participant_id: userId,
        faqs: {
          "What is the primary purpose of the bot?": primaryPurpose,
          "What tasks or functions should the bot perform?":
            functionsNTasksOfBot,
          "Provide the information the bot should have access to generate responses?":
            infoAccessToBot,
          "Provide a few common FAQs the bot should use for commonly asked questions?":
            commanFaqs,
          "Provide any relevant links and make sure the links are publicly accessible":
            releventLinks,
        },
      };

      fetch(`${baseURL}/accounts/create-bot-by-details/`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(userBotCreationFormData),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.error(err);
        });
      console.log(userBotCreationFormData);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="bg-white w-[60%] max-md:w-[80%] max-lg:w-[80%] max-sm:w-[90%] h-fit p-4 mt-5 rounded-md mb-4">
        <h1 className="text-xl text-left text-gray-600 font-bold">
          User bot intake
        </h1>
        <p className="mb-3 text-left text-sm max-sm:text-xs text-gray-600">
          Use this form to create your user bot.
        </p>
        <form
          className="text-left"
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            submitHandler(e);
          }}
        >
          <Badge
            variant={"secondary"}
            className="rounded-sm bg-[#fef3c7] text-[#d97706] p-1"
          >
            <Info className="h-4 w-4 mr-1" /> All fields are required.
          </Badge>
          <div>
            <div className="my-3">
              <p className="text-sm max-sm:text-xs my-1">
                What is the primary purpose of the bot?
              </p>
              <input
                required
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
                value={commanFaqs}
                required
                onChange={(e) => {
                  setCommanFaqs(e.target.value);
                }}
                placeholder="list example FAQs, e.g., 'Q. How to reset password. A. Visit our website's login page and click 'Forgot Password' to reset.'"
                rows={3}
                className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
              />
            </div>
            <div className="my-3">
              <p className="text-sm max-sm:text-xs my-1">
                Upload any relevant document or pdf to add to the bot
              </p>
              <div className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 ">
                <input
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
            <hr className="my-2" />
            <div>
              <Button className="h-8">
                {" "}
                {false ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin mr-2" /> Submitting
                  </>
                ) : (
                  <>
                    Submit <SendHorizonal className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserBotIntake;
