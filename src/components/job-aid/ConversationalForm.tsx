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

type Step = "welcome" | "questions" | "email" | "loading" | "completed";

interface ConversationalFormProps {
  job_aid_id: string;
  isEmailSection?: boolean;
  inputName?: string;
  inputEmail?: string;
  redirectURL?: string;
}

const ConversationalForm: React.FC<ConversationalFormProps> = ({
  job_aid_id,
  isEmailSection,
  inputName,
  inputEmail,
  redirectURL,
}) => {
  const [currentStep, setCurrentStep] = useState<Step>("welcome");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isJobAid, setIsJobAid] = useState<boolean>(false); // Check if this is a job aid or not
  const [isValidation, setIsValidation] = useState<boolean>(true); // Check if this is a job aid or not

  const [questionErrors, setQuestionErrors] = useState<Record<string, string>>(
    {}
  );
  const [suggestions, setSuggestions] = useState<Record<string, string>>({});
  const [reportUrl, setReportUrl] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");

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
        );
        setQuestions(normalizedQuestions);
        setIsJobAid(data?.job_aid_type === "job_aid"); // Set isJobAid based on the fetched data
        console.log("validatioan", data?.is_validation);
        setIsValidation(data?.is_validation);
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

  const handleContinue = async (answer: string) => {
    const currentQ = questions[currentQuestionIndex];
    const updatedAnswers = {
      ...answers,
      [currentQ.question]: answer,
    };

    setAnswers(updatedAnswers);
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
          await handleValidation(answers, email, name);
          setCurrentStep("completed");
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

  const handleIgnore = async () => {
    console.log(
      "Ignoring question:",
      currentQuestionIndex,
      currentQuestionIndex + 1,
      currentQuestionIndex < questions.length - 1
    );
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      console.log("All questions answered, validating final answers", answers);
      if (isEmailSection) {
        setCurrentStep("email");
      } else {
        await handleValidation(answers, email, name);
        setCurrentStep("completed");
      }
    }
  };

  const handleValidation = async (
    answers: Record<string, string>,
    email: string,
    name: string
  ) => {
    setLoading(true);
    setError(null);
    setSuggestions({});

    try {
      const reportResult: ReportResponse = await generateReport(
        answers,
        email || inputEmail || "undefined@gmail.com",
        name || inputName || "sample",
        job_aid_id
      );
      console.log("Report generated:", reportResult);
      setReportUrl(reportResult.report_url);

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
          error={questionErrors[questions[currentQuestionIndex]?.id]}
          currentAnswer={answers[questions[currentQuestionIndex]?.question]}
          suggestions={suggestions[questions[currentQuestionIndex]?.id]}
        />
      </div>
    );
  }

  if (currentStep === "email" && isEmailSection) {
    return (
      <div className="pt-24 flex flex-col items-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Where should we send your completed blueprint?
        </h2>

        <form
          onSubmit={handleEmailSubmit}
          className="flex flex-col items-center gap-4 w-full"
        >
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full max-w-xs px-4 py-3 border border-gray-300 rounded-lg text-lg"
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full max-w-xs px-4 py-3 border border-gray-300 rounded-lg text-lg"
          />
          <button
            type="submit"
            disabled={loading}
            className={`bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 font-semibold text-lg transition-all
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {isJobAid || isValidation
            ? "⏳ Generating Your Report..."
            : "⏳ Submitting..."}
        </h2>
        <div className="flex justify-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-600 mt-4 text-lg text-center">
          {isJobAid || isValidation
            ? "Please wait while we prepare your personalized Management Action Planner."
            : "Please wait while we submit your form"}
        </p>
      </div>
    );
  }

  if (currentStep === "completed") {
    return (
      <div className="pt-24 flex flex-col items-center">
        {(isJobAid || isValidation) && reportUrl ? (
          // ✅ Job Aid → Show report
          reportUrl && (
            <>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                🎉 Congratulations!
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                You have completed all the questions in your Management Action
                Planner.
              </p>
              <div className="bg-gray-100 border border-gray-300 rounded-xl p-6 mb-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  📊 Your Report is Ready!
                </h3>
                <p className="text-gray-600 mb-4">
                  Click below to view your generated report:
                </p>
                <a
                  href={reportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 font-semibold transition-all"
                >
                  View Report
                </a>
              </div>
            </>
          )
        ) : (
          // ❌ Non Job Aid → Friendly message
          <div className="bg-gray-100 border border-gray-300 rounded-xl p-6 mb-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              ✅ Completed!
            </h3>
            <p className="text-gray-600">
              We have captured your intake data and will be processed shortly. Thanks!
            </p>
          </div>
        )}

        {redirectURL != null ? (
          <button
            onClick={() => (window.location.href = redirectURL)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 font-semibold text-lg transition-all"
          >
            Home
          </button>
        ) : (
          <button
            onClick={handleRestart}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 font-semibold text-lg transition-all"
          >
            Start Over
          </button>
        )}
      </div>
    );
  }

  return null;
};

export default ConversationalForm;
