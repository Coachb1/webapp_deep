"use client";

import React, { useEffect, useState } from "react";
import WelcomePage from "./WelcomePage";
import QuestionFlow from "./QuestionFlow";
import {
  fetchQuestions,
  generateReport,
  Question,
  ReportResponse,
  validateAnswers,
  fetchJobAid,
  JobAid,
} from "@/lib/job-aid-apis";
import CopyBox from "../CopyBox";
import TransformationProgram from "./TransformationProgram";
import NewAdvMarkdown from "../NewAdvMarkdown";
import { trackJobaidSessionCompletion } from "@/lib/api";

type Step = "welcome" | "questions" | "email" | "loading" | "completed";

interface ConversationalFormProps {
  job_aid_id: string;
  isEmailSection?: boolean;
  inputName?: string;
  inputEmail?: string;
  redirectURL?: string;
  clientId?: string;
  userId?: string;
  collection_id?: string;
}

const ConversationalForm: React.FC<ConversationalFormProps> = ({
  job_aid_id,
  isEmailSection,
  inputName,
  inputEmail,
  redirectURL,
  clientId,
  userId,
  collection_id,
}) => {
  const [currentStep, setCurrentStep] = useState<Step>("welcome");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [answerFiles, setAnswerFiles] = useState<Record<string, File[]>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // const [isJobAid, setIsJobAid] = useState<boolean>(false); // Check if this is a job aid or not
  const [isValidation, setIsValidation] = useState<boolean>(true); // Check if this is a job aid or not
  const [isReport, setIsReport] = useState<boolean>(true);
  const [isPromptGenerator, setIsPromptGenerator] = useState<boolean>(false);
  const [isTransformationProgram, setIsTransformationProgram] = useState<boolean>(false);

  const [copied, setCopied] = useState<boolean>(false);
  const [questionErrors, setQuestionErrors] = useState<Record<string, string>>(
    {}
  );
  const [suggestions, setSuggestions] = useState<Record<string, string>>({});
  const [reportUrl, setReportUrl] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [generatedPrompt, setGeneratedPrompt] = useState<string>("");
  const [showLoader, setShowLoader] = useState(true);

  // Import JobAid type from the correct location
  const [jobAid, setJobAid] = useState<JobAid | null>(null);

  useEffect(() => {
    const loadJobAid = async () => {
      try {
        setLoading(true);
        const data = await fetchJobAid(job_aid_id);
        setJobAid(data);
        console.log("Job Aid fetched:", data);
        const normalizedQuestions: Question[] = data?.questions.map(
          (q: any) => ({
            ...q,
            id: String(q.id),
          })
        ).filter((question: Question) => question.question_type !== 'editable');
        setQuestions(normalizedQuestions);
        console.log("validatioan", data?.is_validation);
        setIsValidation(data?.is_validation);
        setIsReport(data?.is_report);
        setIsPromptGenerator(
          data.is_prompt_generation !== undefined
            ? data.is_prompt_generation
            : data?.job_aid_type === "prompt_generator"
        );
        setIsTransformationProgram(
          data?.job_aid_type === "transformation_program"
        );
      } catch (err: any) {
        setError(err.message ?? "Failed to fetch job aid.");
      } finally {
        setLoading(false);
      }
    };
    loadJobAid();
  }, [job_aid_id]);

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setLoading(true);
    if (!email) {
      setError("Please enter a valid email address.");
      return;
    }
    setCurrentStep("loading");

    await handleValidation(answers, email, name);
    setLoading(false);
  };

  const handleSkipEmail = () => {
    setCurrentStep("completed");
  };

  const handleStart = async () => {
    setLoading(true);
    setError(null);
    setSuggestions({});
    setReportUrl("");

    try {
      // const fetchedQuestions = await fetchQuestions(job_aid_id);
      // console.log("Fetched questions:", fetchedQuestions);
      // const normalizedQuestions: Question[] = fetchedQuestions.map((q: any) => ({
      //   ...q,
      //   id: String(q.id),
      // }));
      // setQuestions(normalizedQuestions);
      setCurrentStep("questions");
      setCurrentQuestionIndex(0);
      setAnswers({});
      setQuestionErrors({});
    } catch (err: any) {
      setError(err.message ?? "Failed to fetch questions.");
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = async (answer: string, attachments?: File[]) => {
    const currentQ = questions[currentQuestionIndex];
    const updatedAnswers = {
      ...answers,
      [currentQ.question]: answer,
    };

    setAnswers(updatedAnswers);

    if (attachments && attachments.length > 0) {
      setAnswerFiles((prev) => ({
        ...prev,
        [currentQ.question]: attachments,
      }));
    }

    if (currentQ.question_type === "dropdown" || !isValidation) {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prev) => prev + 1);
      } else {
        console.log(
          "All questions answered, validating final answers",
          answers
        );
        if (isEmailSection) {
          setCurrentStep("email");
        } else {
          if (showLoader) {
            setLoading(true);
            setCurrentStep("loading");
            await handleValidation(updatedAnswers, email, name);
            setLoading(false);
          } else {
            await handleValidation(updatedAnswers, email, name);
            setCurrentStep("completed");
          }
        }
      }
      return;
    }

    try {
      // 🔥 validate only this answer
      const validationResult = await validateAnswers(
        { [currentQ.question]: answer },
        currentQ.uid
      );

      console.log("Validation result:", validationResult);

      const isValid = validationResult.status === "soft_suggestion";
      let suggestions: any = validationResult.suggestions;
      if (suggestions) {
        if (Array.isArray(suggestions)) {
          // join arry in a string format
          suggestions = suggestions.join("\n");
        }
      }

      if (!isValid) {
        setQuestionErrors((prev) => ({
          ...prev,
          [currentQ.id]:
            validationResult.message ?? "Invalid answer. Please check.",
        }));

        if (suggestions) {
          setSuggestions((prev) => ({
            ...prev,
            [currentQ.id]: suggestions,
          }));
        }

        return; // 🔥 stop here until corrected
      } else {
        // 🔥 clear error if valid
        setQuestionErrors((prev) => {
          const { [currentQ.id]: _, ...rest } = prev;
          return rest;
        });
        if (suggestions) {
          setSuggestions((prev) => ({
            ...prev,
            [currentQ.id]: suggestions,
          }));
        }
      }
    } catch (err: any) {
      setQuestionErrors((prev) => ({
        ...prev,
        [currentQ.id]: err.message ?? "Validation error",
      }));
      return;
    }

    // 🔥 move to next only if valid
    // if (currentQuestionIndex < questions.length - 1) {
    //   // setCurrentQuestionIndex((prev) => prev + 1);
    //   // not moving to next question yet, just updating the answers
    // } else {
    //   // all done → final validation
    //   setCurrentStep("email");

    // }
  };

  const handleIgnore = async (attachmentsParam?: File[]) => {
    console.log(
      "Ignoring question:",
      currentQuestionIndex,
      currentQuestionIndex + 1,
      currentQuestionIndex < questions.length - 1
    );
    
    // Store attachments if provided
    const currentQ = questions[currentQuestionIndex];
    const updatedFiles = { ...answerFiles };
    
    if (attachmentsParam && attachmentsParam.length > 0) {
      updatedFiles[currentQ.question] = attachmentsParam;
      setAnswerFiles(updatedFiles);
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      console.log("All questions answered, validating final answers", answers);
      if (isEmailSection) {
        setCurrentStep("email");
      } else {
        if (showLoader) {
          setLoading(true);
          setCurrentStep("loading");
          await handleValidation(answers, email, name, updatedFiles);
          setLoading(false);
        } else {
          await handleValidation(answers, email, name, updatedFiles);
          setCurrentStep("completed");
        }
      }
    }
  };

  const handleGoBack = () => {
    if (currentQuestionIndex === 0) {
      // ⭐ Go to main/welcome page
      setCurrentStep("welcome");
      return;
    }

    // ⭐ Normal back action
    setCurrentQuestionIndex(prev => prev - 1);
  };


  const handleValidation = async (
    answers: Record<string, string>,
    email: string,
    name: string,
    attachments?: Record<string, File[]>
  ) => {
    setLoading(true);
    setError(null);
    setSuggestions({});

    try {
      const reportResult: ReportResponse = await generateReport(
        answers,
        email || inputEmail || "undefined@gmail.com",
        name || inputName || "sample",
        job_aid_id,
        clientId,
        attachments || answerFiles
      );
      console.log("Report generated:", reportResult);
      trackJobaidSessionCompletion(
        userId!,
        reportResult.session_id!,
        collection_id!
      )
      setReportUrl(reportResult.report_url);
      setGeneratedPrompt(reportResult.generated_prompt);
      setCurrentStep("completed");
    } catch (err: any) {
      console.error("Error generating report:", err);
      setError(err.message ?? "Validation failed.");
      setCurrentStep("questions");
      setCurrentQuestionIndex(0);
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setCurrentStep("welcome");
    setCurrentQuestionIndex(0);
    setAnswers({});
    setError(null);
    setSuggestions({});
    setQuestionErrors({});
    setReportUrl("");
    setEmail("");
    setName("");
  };


  // --- UI Rendering ---
  if (isTransformationProgram) {    
    if (!jobAid) return <div className="flex items-center justify-center w-full h-screen bg-white">
        <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-t-4 border-b-4 border-[#00c193]"></div>
      </div>; // or a loader

    return <TransformationProgram jobAid={jobAid} jobaidID={job_aid_id} inputEmail={inputEmail} inputName={inputName} clientId={clientId} 
    userId={userId} collection_id={collection_id} tracking={true}
    />;
  }

  if (currentStep === "welcome") {
    return (
      <WelcomePage
        onStart={handleStart}
        loading={loading}
        title={jobAid?.title ?? ""}
        description={jobAid?.description ?? ""}
      />
    );
  }

  if (currentStep === "questions" && questions.length > 0) {
    return (
      <div className="pt-4 flex flex-col items-center w-full max-w-5xl text-center px-4">
        <QuestionFlow
          question={questions[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          onContinue={handleContinue}
          onIgnore={handleIgnore}
          onGoBack={handleGoBack}
          showBackButton={true}
          error={questionErrors[questions[currentQuestionIndex]?.id]}
          currentAnswer={answers[questions[currentQuestionIndex]?.question]}
          currentAttachments={answerFiles[questions[currentQuestionIndex]?.question]}
          suggestions={suggestions[questions[currentQuestionIndex]?.id]}
          isValidataion={isValidation}
        />
      </div>
    );
  }

  if (currentStep === "email" && isEmailSection) {
    return (
      <div className="pt-24 flex flex-col items-center">
        <h2 className="custom-title text-3xl font-bold text-gray-800 mb-6">
          Please enter your details for tracking.
        </h2>

        <form
          onSubmit={handleEmailSubmit}
          className="flex flex-col items-center gap-4 w-full"
        >
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setEmail(inputEmail || 'user@example.com')
            }}
            required
            className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg text-lg"
          />
          {/* <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg text-lg"
          /> */}
          <button
            type="submit"
            disabled={loading}
            className={` custom-btn btn-sm bg-gray-100 border border-[#00c193] text-gray-800 px-6 py-3 font-semibold text-lg transition-all
              hover:border-[#00c193] hover:shadow-md sm:w-auto
                ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  if (currentStep === "loading") {
    return (
      <div className="pt-24 flex flex-col items-center">
        <h2 className="custom-title mb-6">
          {isReport
            ? "⏳ Generating Your Report..."
            : isPromptGenerator ?
              "⏳ Please wait while we are generating your Snapshot..."
              : "⏳ Submitting..."}
        </h2>
        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="custom-subtitle text-center">
          {isReport
            ? "Please wait while we prepare your personalized Management Action Planner."
            : isPromptGenerator
              ? ""
              : "Please wait while we submit your form"}
        </p>
      </div>
    );
  }

  if (currentStep === "completed") {
    return (
      <div className="pt-12 flex flex-col items-center">
        {redirectURL ? (
          <button
            onClick={() => (window.location.href = redirectURL)}
            className="
                        w-full bg-gray-200 border border-[#00c193] 
                        px-8 py-4 text-sm font-medium text-gray-800 
                        shadow-sm transition-all duration-300 
                        hover:border-[#00c193] hover:shadow-md 
                        sm:w-auto
                      "
            style={{ borderRadius: 'calc(var(--radius) - 6px)' }}
          >
            Home
          </button>
        ) : (
          <button
            onClick={handleRestart}
            className="custom-btn btn-sm
            w-full bg-gray-200 border border-[#00c193] 
            px-8 py-4 text-sm font-medium text-gray-800 
            shadow-sm transition-all duration-300 
            hover:border-[#00c193] hover:shadow-md 
            sm:w-auto
          "
            style={{ borderRadius: 'calc(var(--radius) - 6px)' }}
          >
            Start Over
          </button>
        )}

        <div className="mt-10"></div>

        {generatedPrompt ? (
          // 🟢 Prompt Generation Mode Output Box
          <>
            <h2 className="custom-title mb-4">✨ Your Draft AI usecase snapshot is Ready!</h2>
            <p className="custom-subtitle mb-4 text-center">
              Copy and use it wherever you like.
            </p>

            {/* Styled Box */}
            <div className="custom-subtitle relative w-full max-w-[90rem] bg-gray-100 border border-gray-300 rounded-xl p-6 pt-10 text-left whitespace-pre-wrap text-lg leading-relaxed shadow-md">

              {/* Copy Icon Only */}
              <CopyBox content={generatedPrompt} />

              {/* Render formatted content once */}
              <NewAdvMarkdown content={generatedPrompt} />
            </div>

          </>
        ) : reportUrl ? (
          // 🟩 Standard Report Mode
          <>
            <h2 className="custom-title mb-4">🎉 Congratulations!</h2>
            <p className="custom-subtitle mb-6">
              Your customized Action Planner is ready.
            </p>

            <div className="bg-gray-100 border border-gray-300 rounded-xl p-6 mb-6 text-center w-full max-w-xl">
              <h3 className="custom-title mb-2">📊 View Your Report</h3>
              <a
                href={reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block custom-subtitle px-6 py-3 transition-all border border-[#00c193] hover:border-[#00c193] hover:shadow-md 
                        sm:w-auto"
                style={{ borderRadius: 'calc(var(--radius) - 6px)' }}
              >
                Open Report
              </a>
            </div>
          </>
        ) : (
          // 🔹 No report or prompt → Simple completion message
          <div className="bg-gray-100 border border-[#00c193] rounded-xl p-6 mb-6 text-center">
            <h3 className="custom-title text-xl font-semibold text-gray-800 mb-2">✅ Completed!</h3>
            <p className="custom-subtitle text-gray-600">
              Your responses were submitted successfully.
            </p>
          </div>
        )}

        {/* Restart or redirect button */}

        
      </div>
    );
  }

  return null;
};

export default ConversationalForm;
