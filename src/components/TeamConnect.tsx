"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Eraser, Loader } from "lucide-react";
import { ClientUserType } from "@/lib/types";
import {
  baseURL,
  basicAuth,
  getUsersForClientForTeam,
  makeTaggableName,
} from "@/lib/utils";
import { toast } from "sonner";
import { MentionsInput, Mention } from "react-mentions";

import ClassNames from "@/lib/mention.module.css";

const TeamConnect = ({ clientName }: { clientName: string }) => {
  const [isLoading, setisLoading] = useState(false);
  const [clientUsers, setClientUsers] = useState<ClientUserType[]>([]);
  const [taggedUserId, setTaggedUserId] = useState("");
  const [query, setQuery] = useState("");
  const [generatedData, setGeneratedData] = useState("");
  const [inputError, setInputError] = useState(false);

  const inputRef = useRef(null);

  const getClientUsers = async (clientName: string) => {
    try {
      const response = await fetch(
        `${baseURL}/accounts/client_id_user_modification`,
        {
          method: "GET",
          headers: { Authorization: basicAuth },
        }
      );
      const data = await response.json();
      setClientUsers(getUsersForClientForTeam(clientName, data));
    } catch (err) {
      toast.error("Error fetching client data.");
      console.error(err);
    } finally {
    }
  };

  useEffect(() => {
    getClientUsers(clientName);
  }, []);

  const handleQuerySubmit = async () => {
    console.log(query);
    console.log(taggedUserId);

    if (query.length === 0) {
      setInputError(true);
    } else {
      setisLoading(true);
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
          setGeneratedData(responseData.response);
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
  };

  const clearHandler = () => {
    setQuery("");
    setGeneratedData("");
    setTaggedUserId("");
    setInputError(false);
  };

  return (
    <div>
      <div className="w-full">
        <div className="w-full max-sm:w-[100%] z-50 mt-4 text-left">
          <div className="rounded-xl bg-white p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 max-sm:w-[100%]">
            <div>
              <p className="text-[16px] text-left font-semibold max-sm:text-xs text-gray-600 mt-2">
                Please enter your query
              </p>
              <MentionsInput
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value.replace(/[\[\]]|\([^)]*\)/g, ""));
                  setInputError(false);

                  if (e.target.value.length === 0) {
                    setTaggedUserId("");
                  }
                }}
                classNames={ClassNames}
                rows={4}
                placeholder="Enter the query"
                id="mentionInput"
                ref={inputRef}
              >
                <Mention
                  trigger="@"
                  onAdd={(val) => {
                    console.log("onAdd", val);
                    setTaggedUserId((prev) =>
                      prev.length > 0
                        ? prev + "," + val.toString()
                        : prev + val.toString()
                    );
                  }}
                  data={clientUsers.map((user) => ({
                    id: user.userId,
                    display: makeTaggableName(user.userName) + "  ",
                  }))}
                />
              </MentionsInput>
              {inputError && (
                <div className="flex flex-row justify-between w-full">
                  <p className={`text-red-500 text-xs mb-1.5 self-start`}>
                    Input should not be empty
                  </p>
                  <p className="font-bold text-gray-500 text-xs self-end"></p>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleQuerySubmit}
                  className="max-sm:p-2 h-8 bg-[#2DC092] hover:brightness-105 hover:bg-[#2DC092]"
                >
                  {isLoading
                    ? "Generating"
                    : generatedData?.length > 0
                    ? "Regenerate"
                    : "Generate"}
                  {isLoading && (
                    <Loader className="h-4 w-4 inline ml-2 animate-spin" />
                  )}
                </Button>
                {!isLoading && (
                  <Button
                    onClick={clearHandler}
                    variant={"secondary"}
                    className="max-sm:p-2 h-8 hover:brightness-105"
                  >
                    <Eraser className="mr-2 w-4 h-4" /> Clear
                  </Button>
                )}
              </div>
              {generatedData?.length > 0 && (
                <>
                  <div className="flex flex-row gap-2 max-sm:flex-col">
                    <div className="w-full text-sm max-sm:text-xs text-left text-gray-600 p-3 bg-gray-50 mt-2 rounded-md border border-gray-200 shadow-sm flex flex-col justify-between">
                      <div>
                        <b className="my-1 text-gray-400">Response</b>
                        <p className="my-2">{generatedData}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamConnect;
