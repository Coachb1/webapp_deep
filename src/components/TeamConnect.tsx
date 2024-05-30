"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Eraser, Loader } from "lucide-react";
import { ClientUserTeamType, ClientUserType } from "@/lib/types";
import { baseURL, basicAuth, getUsersForClient } from "@/lib/utils";
import { toast } from "sonner";

import { Select } from "antd";

const TeamConnect = ({
  clientName,
  coachId,
  coacheeId,
  clientUsers,
}: {
  clientName: string;
  coachId: string;
  coacheeId: string;
  clientUsers: ClientUserTeamType[];
}) => {
  const [isLoading, setisLoading] = useState(false);
  // const [clientUsers, setClientUsers] = useState<ClientUserType[]>([]);
  const [taggedUserId, setTaggedUserId] = useState("");
  const [query, setQuery] = useState("");
  const [generatedData, setGeneratedData] = useState<
    { response: string; message: string } | undefined
  >();
  const [inputError, setInputError] = useState(false);
  const [emptyUserError, setEmptyUserError] = useState(false);

  const inputRef = useRef(null);

  const handleQuerySubmit = async () => {
    console.log(query);
    console.log(taggedUserId);

    const queryLength = query.trim().split(" ").length;
    if (queryLength < 10) {
      setInputError(true);
    } else {
      setisLoading(true);
      const taggedInUser = clientUsers.find(
        (user) => user.userId === taggedUserId
      );
      if (
        !["coachee", "coach", "mentor", "coach-mentor", "mentee"].includes(
          taggedInUser?.profileType!
        )
      ) {
        setTimeout(() => {
          setGeneratedData({
            response: "",
            message:
              "We can not generate response because user has not joined the network yet. Please nudge him to join!",
          });
          setisLoading(false);
        }, 1000);
      } else {
        try {
          const response = await fetch(
            `${baseURL}/coaching-conversations/team-connect/`,
            {
              method: "POST",
              headers: {
                Authorization: basicAuth,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_id: taggedUserId,
                question: query,
              }),
            }
          );

          if (response.ok) {
            const responseData = await response.json();
            console.log(responseData);
            setGeneratedData(responseData);
            if (responseData.error) {
              toast.error("Error! Please try again.");
            }
          } else {
            toast.error("Error! Please try again.");
          }
        } catch (error) {
          toast.error("Error! Please try again.");
        } finally {
          setisLoading(false);
        }
      }
    }
  };

  const clearHandler = () => {
    setQuery("");
    setGeneratedData(undefined);
    setTaggedUserId("");
    setInputError(false);
  };

  return (
    <div>
      <div className="w-full">
        <div className="w-full max-sm:w-[100%] z-50 mt-4 text-left">
          <div className="rounded-xl bg-white p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 max-sm:w-[100%]">
            {coachId || coacheeId ? (
              <div className="w-full">
                <div className="max-sm:text-sm">
                  {" "}
                  How can you interact with{" "}
                  <span className="mr-2">
                    @{" "}
                    <Select
                      showSearch
                      className="w-[20%] max-sm:w-[40%]  max-lg:w-[40%]  max-md:w-[40%]"
                      placeholder="Select a person"
                      optionFilterProp="children"
                      virtual={false}
                      onChange={(value: string) => {
                        console.log(`selected ${value}`);
                        setTaggedUserId(value);
                      }}
                      onSearch={(value: string) => {
                        console.log(`searched ${value}`);
                      }}
                      filterOption={(
                        input: string,
                        option?: { label: string; value: string }
                      ) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={
                        clientUsers &&
                        clientUsers.map((user) => ({
                          label: user.userName,
                          value: user.userId,
                        }))
                      }
                    />
                  </span>
                  on
                  <div className="flex flex-row items-end">
                    <textarea
                      onChange={(e) => {
                        setQuery(
                          e.target.value.replace(/[\[\]]|\([^)]*\)/g, "")
                        );
                        setInputError(false);
                      }}
                      rows={2}
                      className="border border-gray-200 w-full my-2 rounded-md outline-none p-2 text-sm bg-accent"
                    ></textarea>{" "}
                  </div>
                </div>

                {inputError && (
                  <div className="flex flex-row justify-between w-full">
                    <p className={`text-red-500 text-xs mb-1.5 self-start`}>
                      Minimum 10 words are required.
                    </p>
                    <p className="font-bold text-gray-500 text-xs self-end"></p>
                  </div>
                )}

                <div className="flex items-end justify-end gap-2 w-full">
                  <Button
                    onClick={handleQuerySubmit}
                    disabled={isLoading || !taggedUserId || !query}
                    className="max-sm:p-2 h-8 bg-[#2DC092] hover:brightness-105 hover:bg-[#2DC092]"
                  >
                    {isLoading
                      ? "Generating"
                      : generatedData
                      ? "Regenerate"
                      : "Generate"}
                    {isLoading && (
                      <Loader className="h-4 w-4 inline ml-2 animate-spin" />
                    )}
                  </Button>
                  {/* {!isLoading && (
                    <Button
                      onClick={clearHandler}
                      variant={"secondary"}
                      className="max-sm:p-2 h-8 hover:brightness-105"
                    >
                      <Eraser className="mr-2 w-4 h-4" /> Clear
                    </Button>
                  )} */}
                </div>
                {generatedData && (
                  <>
                    <div className="flex flex-row gap-2 max-sm:flex-col">
                      <div className="w-full text-sm max-sm:text-xs text-left text-gray-600 p-3 bg-gray-50 mt-2 rounded-md border border-gray-200 shadow-sm flex flex-col justify-between">
                        <div>
                          <b className="my-1 text-gray-400">Response</b>
                          <p className="my-2">{generatedData.response}</p>
                        </div>
                        {generatedData.message && (
                          <div className="text-xs bg-blue-100 w-fit px-2 py-1 rounded-md">
                            {generatedData.message}
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <p className="text-sm text-center py-10">
                Please join the network to enable team insights feature.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamConnect;
