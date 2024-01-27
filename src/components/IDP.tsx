"use client";

import { Copy, Loader, LucideExternalLink, View } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  baseURL,
  basicAuth,
  convertDateWithTime,
  getUserAccount,
} from "@/lib/utils";
import { UserIDPsType } from "@/lib/types";
import { TooltipWrapper } from "./TooltipWrapper";
import { report } from "process";
import { toast } from "sonner";

function sortByDateDescending(data: UserIDPsType[]): UserIDPsType[] {
  const compareDates = (a: UserIDPsType, b: UserIDPsType) => {
    const dateA = new Date(a.created);
    const dateB = new Date(b.created);
    return dateB.getTime() - dateA.getTime();
  };

  const sortedData = [...data].sort(compareDates);

  return sortedData;
}

const IDP = ({ user }: any) => {
  const [loading, setLoading] = useState(false);
  const [userIDPs, setUserIDPs] = useState<UserIDPsType[]>([]);

  useEffect(() => {
    setLoading(true);
    getUserAccount(user)
      .then((res) => res.json())
      .then((data) => {
        fetch(`${baseURL}/accounts/get_or_create_idp/?user_id=${data.uid}`, {
          method: "GET",
          headers: {
            Authorization: basicAuth,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setUserIDPs(sortByDateDescending(data));
            setLoading(false);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="bg-accent p-2 mt-2 rounded-md mb-10 max-h-[70vh] overflow-scroll">
      <div className="pl-4 max-sm:pl-2 pt-2">Individual Development Plan</div>
      {loading && (
        <>
          <div className="text-xs w-full h-20 flex items-center justify-center">
            <div>
              <Loader className="h-4 w-4 mr-2 animate-spin inline" /> Loading
            </div>
          </div>
        </>
      )}
      {!loading && userIDPs.length === 0 && (
        <>
          <div className="text-xs w-full h-20 flex items-center justify-center">
            <div>You don't have IDP's yet.</div>{" "}
            <Link href={"/intake/?type=IDP"}></Link>
            <Button className="pl-1" variant={"link"}>
              Create one?
            </Button>
          </div>
        </>
      )}
      {userIDPs.length > 0 && (
        <div className="m-4 text-sm max-sm:m-2">
          <div className="bg-gray-200 px-4 text-sm w-full m-2 ml-0 p-2 rounded-md">
            {/* <p className="text-base font-semibold ">IDP Reports</p> */}
            <div className="mx-4 flex flex-row mt-4  max-sm:text-xs text-gray-600 font-semibold  max-sm:mx-1">
              <div className="w-[5%] max-sm:w-[12%] max-sm:text-xs  text-center">
                SL no.
              </div>
              <div className=" w-[40%] text-center ">Created Date </div>
            </div>
            <div className="mx-4 max-sm:mx-1">
              {userIDPs.map((idp, i) => (
                <div className="flex flex-row gap-3 my-2 items-center">
                  <p className="w-[5%] max-sm:w-[12%] text-center">{i + 1}</p>{" "}
                  <p className="max-sm:text-xs w-[40%]  text-center">
                    {convertDateWithTime(idp.created)}
                  </p>{" "}
                  <div className="text-gray-400 bg-gray-400 h-5 w-[2px]" />
                  <Link href={idp.report} target="_blank">
                    <Button
                      variant={"outline"}
                      className="h-6 text-xs w-fit bg-gray-50 border-gray-300 "
                    >
                      <span className="max-sm:hidden">View Report</span>{" "}
                      <TooltipWrapper
                        className="hidden max-sm:block text-xs"
                        tooltipName="View Report"
                        body={
                          <LucideExternalLink className="h-3 w-3 ml-2 max-sm:ml-0" />
                        }
                      />
                    </Button>
                  </Link>
                  <Button
                    variant={"secondary"}
                    className="h-6 text-xs w-fit bg-blue-200"
                    onClick={() => {
                      navigator.clipboard
                        .writeText(idp.report)
                        .then(() => {
                          toast.success(
                            "Successfuly Copied your link to clipboard!",
                            {
                              position: "top-right",
                              style: {
                                height: "20px",
                                width: "fit",
                              },
                            }
                          );
                        })
                        .catch((err) => {
                          toast.error("Error copying your link");
                        });
                    }}
                  >
                    <span className="max-sm:hidden">Copy link</span>{" "}
                    <TooltipWrapper
                      className="hidden max-sm:block text-xs"
                      tooltipName="Copy Link"
                      body={<Copy className="h-3 w-3 ml-2 max-sm:ml-0" />}
                    />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IDP;
