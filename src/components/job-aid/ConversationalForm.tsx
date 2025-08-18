"use client";

import React, { useState } from "react";
import WelcomePage from "./WelcomePage";
import QuestionFlow from "./QuestionFlow";
import {
  fetchQuestions,
  generateReport,
  Question,
  ReportResponse,
  validateAnswers,
} from "@/lib/job-aid-apis";

type Step = "welcome" | "questions" | "email" | "completed";

interface ConversationalFormProps {
  job_aid_id: string;
}

const ConversationalForm: React.FC<ConversationalFormProps> = ({
  job_aid_id,
}) => {
  const [currentStep, setCurrentStep] = useState<Step>("welcome");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [reportUrl, setReportUrl] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setCurrentStep("completed");
  };

  const handleSkipEmail = () => {
    setCurrentStep("completed");
  };

  const handleStart = async () => {
    setLoading(true);
    setError(null);

    try {
      const fetchedQuestions = await fetchQuestions(job_aid_id);
      const normalizedQuestions: Question[] = fetchedQuestions.map((q: any) => ({
        ...q,
        id: String(q.id),
      }));
      setQuestions(normalizedQuestions);
      setCurrentStep("questions");
      setCurrentQuestionIndex(0);
      setAnswers({});
    } catch (err: any) {
      setError(err.message ?? "Failed to fetch questions.");
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestionIndex].question]: answer,
    }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);

    } else {
      const updatedAnswers = {
        ...answers,
        [questions[currentQuestionIndex].question]: answer,
      };
      handleValidation(updatedAnswers);
    }
  };

  const handleIgnore = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleValidation(answers);
    }
  };

  const handleValidation = async (answers: Record<string, string>) => {
    setLoading(true);
    setError(null);

    try {
      const validationResult = await validateAnswers(answers, job_aid_id);

      if (!validationResult.isValid) {
        setError("Validation failed. Please check your answers.");
        setCurrentStep("questions");
        setCurrentQuestionIndex(0);
        return;
      }

      const reportResult: ReportResponse = await generateReport(
        answers,
        "test@example.com",
        job_aid_id
      );
      setReportUrl(reportResult.reportUrl);
      setCurrentStep("email");
    } catch (err: any) {
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
    setQuestions([]);
    setAnswers({});
    setError(null);
    setReportUrl("");
    setEmail("");
  };

  // --- UI Rendering ---
  if (currentStep === "welcome") {
    return <WelcomePage onStart={handleStart} loading={loading} />;
  }

  if (currentStep === "questions" && questions.length > 0) {
    return (
      <div className="pt-24 flex flex-col items-center">
          <QuestionFlow
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onContinue={handleContinue}
            onIgnore={handleIgnore}
            error={error ?? undefined}
            currentAnswer={answers[questions[currentQuestionIndex]?.id]}
          />
      </div>
    );
  }

  if (currentStep === "email") {
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
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full max-w-xs px-4 py-3 border border-gray-300 rounded-lg text-lg"
            />
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold text-lg transition-all"
            >
              Submit
            </button>
          </form>
        </div>
    );
  }

  if (currentStep === "completed") {
    return (
      <div className="pt-24 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            🎉 Congratulations!
          </h2>
          <p className="text-gray-600 text-lg mb-6">
            You have completed all the questions in your Management Action
            Planner.
          </p>
          {reportUrl && (
            <div className="bg-gray-100 border border-gray-300 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                📊 Your Report is Ready!
              </h3>
              <p className="text-gray-600 mb-4">
                Click the link below to view your generated report:
              </p>
              <a
                href={reportUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
              >
                View Report
              </a>
            </div>
          )}
          <button
            onClick={handleRestart}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all"
          >
            Start Over
          </button>
        </div>
    );
  }

  return null;
};

export default ConversationalForm;
