"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { Question } from "@/lib/job-aid-apis";

interface QuestionFlowProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onContinue: (answer: string) => void;
  onIgnore: () => void;
  error?: string;
  currentAnswer?: string;
  suggestions?: string; // Suggestions for the current question
}

const QuestionFlow: React.FC<QuestionFlowProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onContinue,
  onIgnore,
  error,
  currentAnswer,
  suggestions
}) => {
  const [answer, setAnswer] = useState<string>(currentAnswer || "");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setAnswer(currentAnswer || "");


    console.log("Current answer updated:", currentAnswer);
  }, [currentAnswer, question.id]);

  const handleContinue = () => {
    if (!answer.trim()) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onContinue(answer);
  };

  const handleIgnore = () => {
    if (!answer.trim()) {
      setShowError(true);
      return;
    }
    setAnswer("");
    setShowError(false);
    onIgnore();
  };

  const handleAnswerChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setAnswer(e.target.value);
    if (showError && e.target.value.trim()) {
      setShowError(false);
    }
  };

  const renderInputField = () => {
    switch (question.question_type) {
      case "text":
        return (
          <textarea
            key={question.id}
            value={answer}
            onChange={handleAnswerChange}
            placeholder="Type your answer here..."
            rows={4}
            className="w-full p-5 border-2 border-gray-200 rounded-xl text-base resize-y 
                       transition-colors min-h-[120px] focus:outline-none 
                       focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 placeholder-gray-400"
          />
        );

      case "dropdown":
        return (
          <select
            value={answer}
            onChange={handleAnswerChange}
            className="w-full p-5 border-2 border-gray-200 rounded-xl text-base 
                       bg-white cursor-pointer transition-colors
                       focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          >
            <option value="" disabled>
              Select an option...
            </option>
            {question.dropdowns &&
              question.dropdowns.split(",").map((opt, i) => (
                <option key={i} value={opt.trim()}>
                  {opt.trim()}
                </option>
              ))}
          </select>
        );

      case "boolean":
        return (
          <select
            value={answer}
            onChange={handleAnswerChange}
            className="w-full p-5 border-2 border-gray-200 rounded-xl text-base 
                       bg-white cursor-pointer transition-colors
                       focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          >
            <option value="" disabled>
              Select...
            </option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        );

      default:
        return (
          <textarea
            value={answer}
            onChange={handleAnswerChange}
            placeholder="Type your answer here..."
            rows={4}
            className="w-full p-5 border-2 border-gray-200 rounded-xl text-base resize-y 
                       transition-colors min-h-[120px] focus:outline-none 
                       focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 placeholder-gray-400"
          />
        );
    }
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-5xl 
                 animate-[slideInRight_0.6s_ease-out] mx-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="w-full h-2 bg-gray-200 rounded overflow-hidden mb-4">
          <div
            className="h-full bg-[#00c193] transition-all duration-300"
            style={{
              width: `${(questionNumber / totalQuestions) * 100}%`,
            }}
          />
        </div>
        {question.section && (
          <span className="block text-left text-sm font-medium text-gray-600">
            {question.section}
          </span>
        )}
        <div className="text-center text-sm font-medium text-gray-500 mt-1">
          Question {questionNumber} of {totalQuestions}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-6">
        <h2 className="text-2xl font-semibold text-gray-800 leading-snug text-center">
          {question.question}
        </h2>

        {question.description && (
          <p className="text-lg text-gray-500 leading-relaxed text-center">
            {question.description}
          </p>
        )}

        <div>{renderInputField()}</div>

        {showError && (
          <div className="bg-red-200 text-red-700 p-3 rounded-md text-center text-lg border-l-4 border-red-600">
            Please provide an answer before continuing.
          </div>
        )}

        {suggestions && !error && (
          <div className="bg-yellow-200 text-yellow-700 p-3 rounded-md text-lg border-l-4 border-yellow-600 flex items-center justify-between">
            <span className="flex-1 text-center">{suggestions}</span>
            <button
                onClick={handleIgnore} 
                disabled={(currentAnswer || "").trim() !== answer.trim() || !answer.trim()}            
                className={`ml-4 bg-[#00c193] text-white px-3 py-1 rounded-md text-sm hover:bg-yellow-700
                  ${(currentAnswer || "").trim() !== answer.trim() || !answer.trim() ? "opacity-50 cursor-not-allowed" : ""}
                  `}
              >
                Ignore
            </button>            
          </div>
        )}


        {error && (
          <div className="bg-red-200 text-red-700 p-3 rounded-md text-center text-lg border-l-4 border-red-600">
            {error}
            {suggestions && (
              <span className="block mt-2 text-yellow-700">
                Suggestions: {suggestions}
              </span> 
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button
            onClick={handleContinue}
            disabled={(currentAnswer || "").trim() === answer.trim() || !answer.trim()}            
            className={`
                        px-8 py-3 bg-[#00c193] text-white font-semibold 
                       shadow-lg min-w-[140px] 
                       transition-transform duration-300
                       hover:-translate-y-0.5 hover:shadow-2xl active:translate-y-0
                        ${(currentAnswer || "").trim() === answer.trim() || !answer.trim() ? "opacity-50 cursor-not-allowed" : ""}

            `}
          >
            Continue
          </button>

          {/* Uncomment if you want Ignore back */}
          {/* <button
            onClick={handleIgnore}
            className="px-8 py-3 bg-gray-100 text-gray-600 border-2 border-gray-200 
                       font-semibold rounded-full min-w-[140px]
                       transition-all duration-300 hover:bg-gray-200 hover:border-gray-300
                       hover:-translate-y-0.5 active:translate-y-0"
          >
            Ignore
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default QuestionFlow;
