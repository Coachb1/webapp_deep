"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { baseURL, basicAuth, getUserAccount } from "@/lib/utils";
import { Info, Loader, PenLine, SendHorizonal } from "lucide-react";
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
    if (user) {
      getUserAccount(user)
        .then((res) => res.json())
        .then((data) => {
          console.log("USER Data from IDP intake", data);
          setUserId(data.uid);
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
      const promise = () =>
        new Promise((resolve, reject) =>
          setTimeout(() => resolve({ name: "Sonner" }), 10000)
        );

      toast.promise(promise, {
        loading:
          "Your personal development plan is under process. It will be available here and under your profile shortly. It will also be emailed to you.",
        success: () => {
          resetAllStates();
          //init the popup with data got after we get the report
          return "Thank you";
        },
        error:
          "We have encountered an error while creating your Individual Development Plan. Please try again",
      });
    }, 2000);

    fetch(`${baseURL}/accounts/get_or_create_idp/`, {
      method: "POST",
      headers: myHeaders,
      body: IDPFormData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSubmitLoading(false);
      })
      .catch((err) => {
        setSubmitLoading(false);
        console.error(err);
      });
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full">
        <div className="bg-white w-[60%] max-md:w-[80%] max-lg:w-[80%] max-sm:w-[90%] h-fit p-4 mt-5 rounded-md mb-4">
          <h1 className="text-xl text-left text-gray-600 font-bold">
            Individual Development Plan Intake
          </h1>
          <p className="mb-3 text-left text-sm text-gray-600">
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
                <p className="text-sm my-1">Enter your name</p>
                <input
                  value={name}
                  required
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Aarav Sharma"
                  type="text"
                  className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400"
                />
              </div>
              <div className="my-3">
                <p className="text-sm my-1">
                  Few professional accomplishments you are proud?
                </p>
                <textarea
                  value={professionalAcc}
                  required
                  onChange={(e) => {
                    setProfessionalAcc(e.target.value);
                  }}
                  placeholder="
                  Implemented a cost-saving strategy that resulted in a 20% budget reduction."
                  rows={3}
                  className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                />
              </div>
              <div className="my-3">
                <p className="text-sm my-1">
                  What areas of work you often get crtical feedback or you
                  believe is your drawback?
                </p>
                <textarea
                  required
                  value={criticalFeedback}
                  onChange={(e) => {
                    setCriticalFeedback(e.target.value);
                  }}
                  placeholder="Handling tight deadlines has been an area where I'm working to improve."
                  rows={3}
                  className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                />
              </div>
              <div className="my-3">
                <p className="text-sm my-1">
                  What are some of areas you want to improve?
                </p>
                <textarea
                  required
                  value={areasToImprove}
                  onChange={(e) => {
                    setAreasToImprove(e.target.value);
                  }}
                  placeholder="Enhancing my data analysis skills is a priority for more effective decision-making"
                  rows={3}
                  className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                />
              </div>
              <div className="my-3">
                <p className="text-sm my-1">
                  What would you believe may derail your plan?
                </p>
                <textarea
                  required
                  value={planDerialCause}
                  onChange={(e) => {
                    setPlanDerialCause(e.target.value);
                  }}
                  placeholder="The potential for unexpected project delays could pose a challenge."
                  rows={3}
                  className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                />
              </div>
              <div className="my-3">
                <p className="text-sm my-1">
                  What is the immediate 90 day focus?
                </p>
                <textarea
                  required
                  value={ninetyDayFocus}
                  onChange={(e) => {
                    setNinetyDayFocus(e.target.value);
                  }}
                  placeholder="Prioritizing client satisfaction through improved communication and service delivery."
                  rows={3}
                  className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                />
              </div>
              <div className="my-3">
                <p className="text-sm my-1">
                  What are your long term (12-24 months) goals?
                </p>
                <textarea
                  required
                  value={longTermGoals}
                  onChange={(e) => {
                    setLongTermGoals(e.target.value);
                  }}
                  placeholder="Attain a leadership role and contribute to company-wide strategic initiatives.
                  "
                  rows={3}
                  className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                />
              </div>
              <div className="my-3">
                <p className="text-sm my-1">
                  What do you believe should be your priorities?
                </p>
                <textarea
                  required
                  value={priorities}
                  onChange={(e) => {
                    setPriorities(e.target.value);
                  }}
                  placeholder="Strengthening cross-functional collaboration for streamlined project execution"
                  rows={3}
                  className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                />
              </div>
              <div className="my-3">
                <p className="text-sm my-1">
                  What learning and certifications you already have?
                </p>
                <textarea
                  required
                  value={learningNcertificates}
                  onChange={(e) => {
                    setLearningNcertificates(e.target.value);
                  }}
                  placeholder="Certified in Project Management (PMP) to enhance project planning and execution."
                  rows={3}
                  className="w-full bg-gray-100 p-2 text-xs rounded-md border border-gray-200 focus-visible:outline outline-blue-400 resize-none"
                />
              </div>
              <div className="my-3">
                <p className="text-sm my-1">
                  What domain and subject areas do you spealize?
                </p>
                <textarea
                  required
                  value={domainSpecialised}
                  onChange={(e) => {
                    setDomainSpecialised(e.target.value);
                  }}
                  placeholder="Specializing in digital marketing with a focus on content strategy and SEO."
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
