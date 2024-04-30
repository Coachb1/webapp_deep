"use client";

import CopyToClipboard from "@/components/CopyToClipboard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  baseURL,
  basicAuth,
  convertTextToCorrectFormat,
  getUserAccount,
  hideBots,
} from "@/lib/utils";
import { Info, Loader, PenLine, SendHorizonal } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

const IDPIntake = ({ user }: any) => {
  const params = useSearchParams();
  const checkIfEdit = params.get("edit");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const router = useRouter();

  const [name, setName] = useState("");
  const [professionalAcc, setProfessionalAcc] = useState("");
  const [criticalFeedback, setCriticalFeedback] = useState("");
  const [areasToImprove, setAreasToImprove] = useState("");
  const [planDerialCause, setPlanDerialCause] = useState("");
  const [ninetyDayFocus, setNinetyDayFocus] = useState("");
  const [longTermGoals, setLongTermGoals] = useState("");
  const [priorities, setPriorities] = useState("");
  const [learningNcertificates, setLearningNcertificates] = useState("");
  const [domainSpecialised, setDomainSpecialised] = useState("");

  //success
  const [reportUrl, setReportUrl] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const resetAllStates = () => {
    setName("");
    setProfessionalAcc("");
    setCriticalFeedback("");
    setAreasToImprove("");
    setPlanDerialCause("");
    setNinetyDayFocus("");
    setLongTermGoals("");
    setPriorities("");
    setLearningNcertificates("");
    setDomainSpecialised("");
  };

  useEffect(() => {
    hideBots();
    if (user) {
      getUserAccount(user)
        .then((res) => res.json())
        .then((data) => {
          console.log("USER Data from IDP intake", data);
          setUserId(data.uid);
          setName(
            `${user.given_name} ${user.family_name ? user.family_name : ""}`
          );
        });
    } else {
      router.push("/");
    }
  }, []);

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitLoading(true);
    var IDPFormData = JSON.stringify({
      user_id: userId,
      idp_data: {
        user_name: name,
        strengths: professionalAcc,
        weakness: criticalFeedback,
        opportunities: areasToImprove,
        threats: planDerialCause,
        key_focus_areas: ninetyDayFocus,
        goals: longTermGoals,
        priorities: priorities,
        learning_histories: learningNcertificates,
        key_skills: domainSpecialised,
      },
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", basicAuth);

    setTimeout(() => {
      setSubmitLoading(false);
      setOpenDialog(true);
      toast.success(
        "Thank you. Your development plan and recommendations will be emailed to you soon. It will be also available in the profile section for you to review.",
        {
          duration: 10000,
        }
      );
      resetAllStates();
    }, 4000);

    fetch(`${baseURL}/accounts/get_or_create_idp/`, {
      method: "POST",
      headers: myHeaders,
      body: IDPFormData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.msg.includes("error")) {
          // toast.error("Error while generating your IDP, Please try again!");
          // setOpenDialog(false);
        } else {
          resetAllStates();
          setReportUrl(data.report);
        }
      })
      .catch((err) => {
        // toast.error("Error while generating your IDP, Please try again!");
        // setSubmitLoading(false);
        console.error(err);
      });
  };
  return (
    <>
      {/* <Dialog open={openDialog}>
        <DialogContent className="max-sm:w-[90%] max-sm:rounded-md">
          {reportUrl.length > 0 ? (
            <>
              <DialogHeader>
                <DialogTitle>Report Url</DialogTitle>
                <DialogDescription>
                  <Link
                    target="_blank"
                    href={reportUrl}
                    className="bg-gray-100 text-sm rounded-sm my-2 p-2  overflow-scroll  no-scrollbar text-blue-500 block"
                  >
                    {reportUrl}
                  </Link>
                </DialogDescription>
                <DialogClose />
              </DialogHeader>
              <DialogFooter className="-mt-4">
                <Button
                  variant={"outline"}
                  className="h-8"
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  Return to home
                </Button>
                <Button
                  variant={"destructive"}
                  className="h-8"
                  onClick={() => {
                    setOpenDialog(false);
                  }}
                >
                  Close
                </Button>
                <CopyToClipboard copyType="link" textToCopy={reportUrl} />
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Loading...</DialogTitle>
                <DialogDescription>
                  <div className="flex flex-row items-center justify-center gap-2 my-4">
                    <Loader className="h-10 w-10 mr-2 animate-spin" />
                    <p className="text-xs">
                      Your personal development plan is under process. It will
                      be available here and under your profile shortly. It will
                      also be emailed to you.
                    </p>
                  </div>
                </DialogDescription>
                <DialogClose />
              </DialogHeader>
              <DialogFooter className="-mt-4">
                <Button
                  variant={"destructive"}
                  className="h-8"
                  onClick={() => {
                    setOpenDialog(false);
                  }}
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog> */}
      <div className="flex flex-col text-sm max-sm:text-xs justify-center items-center w-full">
        <div className="bg-white w-full h-fit p-4  rounded-md mb-4">
          <h1 className="text-xl max-sm:text-sm text-left text-gray-600 font-bold">
            Individual Development Plan Intake
          </h1>
          <p className="mb-3 text-left text-sm max-sm:text-xs text-gray-600">
            Use this to get your Individual Development Plan report.
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
                <p className="text-sm max-sm:text-xs my-1">Enter your name</p>
                <input
                  value={convertTextToCorrectFormat(name)}
                  disabled
                  required
                  placeholder="Aarav Sharma"
                  type="text"
                  className="w-full hover:cursor-not-allowed bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                />
              </div>
              <div className="my-3">
                <p className="text-sm max-sm:text-xs my-1">
                  Few professional accomplishments you are proud of?
                </p>
                <textarea
                  value={professionalAcc}
                  required
                  onChange={(e) => {
                    setProfessionalAcc(e.target.value);
                  }}
                  placeholder="List a few significant achievements in your career."
                  rows={3}
                  className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                />
              </div>
              <div className="my-3">
                <p className="text-sm max-sm:text-xs my-1">
                  What areas of work do you often get critical feedback or you
                  believe is your drawback?
                </p>
                <textarea
                  required
                  value={criticalFeedback}
                  onChange={(e) => {
                    setCriticalFeedback(e.target.value);
                  }}
                  placeholder="Identify areas where improvement is needed or commonly criticized."
                  rows={3}
                  className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                />
              </div>
              <div className="my-3">
                <p className="text-sm max-sm:text-xs my-1">
                  What are some areas you want to improve?
                </p>
                <textarea
                  required
                  value={areasToImprove}
                  onChange={(e) => {
                    setAreasToImprove(e.target.value);
                  }}
                  placeholder="Specify aspects you aim to enhance in your work performance."
                  rows={3}
                  className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                />
              </div>
              <div className="my-3">
                <p className="text-sm max-sm:text-xs my-1">
                  What would you believe may derail your plan?
                </p>
                <textarea
                  required
                  value={planDerialCause}
                  onChange={(e) => {
                    setPlanDerialCause(e.target.value);
                  }}
                  placeholder="Highlight factors that could obstruct your plans or progress."
                  rows={3}
                  className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                />
              </div>
              <div className="my-3">
                <p className="text-sm max-sm:text-xs my-1">
                  What is the immediate 90 day focus?
                </p>
                <textarea
                  required
                  value={ninetyDayFocus}
                  onChange={(e) => {
                    setNinetyDayFocus(e.target.value);
                  }}
                  placeholder="Describe immediate goals and objectives for eg. Prioritizing project deadlines, and refining task delegation."
                  rows={3}
                  className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                />
              </div>
              <div className="my-3">
                <p className="text-sm max-sm:text-xs my-1">
                  What are your long term (12-24 months) goals?
                </p>
                <textarea
                  required
                  value={longTermGoals}
                  onChange={(e) => {
                    setLongTermGoals(e.target.value);
                  }}
                  placeholder="Describe goal for the next 12-24 months for eg. Attain advanced certification in the field, contribute to impactful projects etc."
                  rows={3}
                  className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                />
              </div>
              <div className="my-3">
                <p className="text-sm max-sm:text-xs my-1">
                  What do you believe should be your priorities?
                </p>
                <textarea
                  required
                  value={priorities}
                  onChange={(e) => {
                    setPriorities(e.target.value);
                  }}
                  placeholder="Determine what tasks or objectives hold the highest importance eg. Balancing project deadlines, fostering team collaboration etc."
                  rows={3}
                  className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                />
              </div>
              <div className="my-3">
                <p className="text-sm max-sm:text-xs my-1">
                  What learning and certifications do you already have?
                </p>
                <textarea
                  required
                  value={learningNcertificates}
                  onChange={(e) => {
                    setLearningNcertificates(e.target.value);
                  }}
                  placeholder="Detail relevant training and certifications you've attained eg. Hold certifications in A, B, C. Actively pursuing continuous learning opportunities in D and E."
                  rows={3}
                  className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                />
              </div>
              <div className="my-3">
                <p className="text-sm max-sm:text-xs my-1">
                  What domain and subject areas do you specialize in?
                </p>
                <textarea
                  required
                  value={domainSpecialised}
                  onChange={(e) => {
                    setDomainSpecialised(e.target.value);
                  }}
                  placeholder="Specify your expertise in domain and subject matter areas eg. Specializing in X domain with expertise in Y and Z subject areas."
                  rows={3}
                  className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                />
              </div>
              <div>
                {checkIfEdit ? (
                  <Button disabled={submitLoading} className="h-8">
                    {" "}
                    {submitLoading ? (
                      <>
                        <Loader className="h-5 w-5 animate-spin mr-2" /> Saving
                      </>
                    ) : (
                      <>
                        Save Changes <PenLine className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button disabled={submitLoading} className="h-8">
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default IDPIntake;
