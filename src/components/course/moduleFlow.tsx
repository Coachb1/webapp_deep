"use client";

import React, { useState, useRef, useEffect } from "react";
import { handleStartInteraction, type Module } from "./CourseFLow"; 

interface ModuleFlowProps {
  module: Module;
  onComplete?: () => void;
}

const ModuleFlow: React.FC<ModuleFlowProps> = ({ module, onComplete }) => {
  // Video tracking states
  const [videoProgress, setVideoProgress] = useState(0);
  const [canProceed, setCanProceed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Assessment video tracking states
  const [assessmentVideoProgress, setAssessmentVideoProgress] = useState(0);
  const [assessmentCanProceed, setAssessmentCanProceed] = useState(false);
  const assessmentVideoRef = useRef<HTMLVideoElement>(null);
  
  // Text scroll tracking states
  const [textScrollProgress, setTextScrollProgress] = useState(0);
  const [textCanProceed, setTextCanProceed] = useState(false);
  const textContentRef = useRef<HTMLDivElement>(null);
  
  const REQUIRED_PROGRESS = 0.7; // 70%

  // Video tracking functions
  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      const { currentTime, duration } = videoRef.current;
      if (duration > 0) {
        const progress = currentTime / duration;
        setVideoProgress(progress);
        
        // Enable next button when 70% is reached
        if (progress >= REQUIRED_PROGRESS && !canProceed) {
          setCanProceed(true);
        }
      }
    }
  };

  const handleVideoLoadedMetadata = () => {
    // Reset progress when video loads
    setVideoProgress(0);
    setCanProceed(false);
  };

  // Assessment video tracking functions
  const handleAssessmentVideoTimeUpdate = () => {
    if (assessmentVideoRef.current) {
      const { currentTime, duration } = assessmentVideoRef.current;
      if (duration > 0) {
        const progress = currentTime / duration;
        setAssessmentVideoProgress(progress);
        
        // Enable next button when 70% is reached
        if (progress >= REQUIRED_PROGRESS && !assessmentCanProceed) {
          setAssessmentCanProceed(true);
        }
      }
    }
  };

  const handleAssessmentVideoLoadedMetadata = () => {
    // Reset progress when assessment video loads
    setAssessmentVideoProgress(0);
    setAssessmentCanProceed(false);
  };

  // Text scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      if (textContentRef.current) {
        const element = textContentRef.current;
        const scrollTop = element.scrollTop;
        const scrollHeight = element.scrollHeight;
        const clientHeight = element.clientHeight;
        
        console.log('Scroll values:', { scrollTop, scrollHeight, clientHeight }); // Debug log
        
        // Calculate scroll progress
        const maxScroll = scrollHeight - clientHeight;
        if (maxScroll > 0) {
          const progress = Math.min(scrollTop / maxScroll, 1); // Ensure max 1
          setTextScrollProgress(progress);
          
          console.log('Progress:', progress); // Debug log
          
          // Enable next button when 70% is scrolled
          if (progress >= REQUIRED_PROGRESS) {
            setTextCanProceed(true);
          }
        } else {
          // If content fits in view, allow immediate proceed
          setTextScrollProgress(1);
          setTextCanProceed(true);
        }
      }
    };

    const textElement = textContentRef.current;
    if (textElement) {
      textElement.addEventListener('scroll', handleScroll);
      // Check initial state after a small delay to ensure content is rendered
      setTimeout(() => handleScroll(), 100);
      
      return () => {
        textElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [module.id]); // Changed dependency from textCanProceed to module.id

  // Reset states when module changes
  useEffect(() => {
    setVideoProgress(0);
    setCanProceed(false);
    setAssessmentVideoProgress(0);
    setAssessmentCanProceed(false);
    setTextScrollProgress(0);
    setTextCanProceed(false);
  }, [module.id]);

  const renderByType = () => {
    switch (module.CHAPTER_TYPE_CHOICES) {
      case "ASSESSMENT":
        return (
          <div>
            {/* Assessment Header */}
            <div className="p-6 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">{module.test.title}</h1>
              <p className="mt-2 text-base text-gray-600">{module.test.description} (test code - {module.test.test_code})</p>
            </div>

            {/* Optional Video with Progress Tracking */}
            {module.video_url ? (
              <div className="p-6">
                <div className="w-full aspect-video rounded-lg overflow-hidden shadow-sm">
                  <video
                    ref={assessmentVideoRef}
                    controls
                    // src={module.video_url}
                    src = "video/observation2_QMT0H94.mp4"
                    className="w-full h-full"
                    onTimeUpdate={handleAssessmentVideoTimeUpdate}
                    onLoadedMetadata={handleAssessmentVideoLoadedMetadata}
                  />
                </div>
                
                {/* Assessment Video Progress Bar */}
                <div className="mt-3 mb-4">
                  {/* <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">
                      Video Progress: {Math.round(assessmentVideoProgress * 100)}%
                    </span>
                    <span className="text-sm text-gray-500">
                      {assessmentCanProceed ? "✓ Ready to continue" : `Watch ${Math.round(REQUIRED_PROGRESS * 100)}% to continue`}
                    </span>
                  </div> */}
                  
                  {/* Progress Bar */}
                  {/* <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        assessmentCanProceed ? 'bg-emerald-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${Math.min(assessmentVideoProgress * 100, 100)}%` }}
                    />
                  </div> */}
                  
                  {/* Required progress marker */}
                  {/* <div className="relative w-full mt-1">
                    <div 
                      className="absolute top-0 w-0.5 h-2 bg-emerald-600"
                      style={{ left: `${REQUIRED_PROGRESS * 100}%` }}
                    />
                    <div 
                      className="absolute -top-6 transform -translate-x-1/2 text-xs text-emerald-600 font-medium"
                      style={{ left: `${REQUIRED_PROGRESS * 100}%` }}
                    >
                      70%
                    </div>
                  </div> */}
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500 italic">
                No video available for this module
              </div>
            )}

            {/* Actions */}
            <div className="p-6 border-t border-gray-200 flex justify-end gap-2">
              <button
                className="bg-emerald-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-emerald-700"
                onClick={handleStartInteraction}
              >
                Start Assessment
              </button>
              {onComplete && (
                <button
                  onClick={onComplete}
                  disabled={!!module.video_url && !assessmentCanProceed}
                  className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
                    (!module.video_url || assessmentCanProceed)
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  title={(!module.video_url || assessmentCanProceed) ? "Continue to next module" : "Watch 70% of the video to continue"}
                >
                  {(!module.video_url || assessmentCanProceed) ? "Continue →" : "Watch 70% to Continue"}
                </button>
              )}
            </div>
          </div>
        );

      case "VIDEO":
        return (
          <div>
            {/* Video Container */}
            <div className="relative">
              <video 
                ref={videoRef}
                controls 
                src={module.video_url || ""} 
                className="w-full rounded-lg shadow-md"
                onTimeUpdate={handleVideoTimeUpdate}
                onLoadedMetadata={handleVideoLoadedMetadata}
              />
              
              {/* Progress Bar Overlay */}
              <div className="mt-3 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    Video Progress: {Math.round(videoProgress * 100)}%
                  </span>
                  <span className="text-sm text-gray-500">
                    {canProceed ? "✓ Ready to continue" : `Watch ${Math.round(REQUIRED_PROGRESS * 100)}% to continue`}
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      canProceed ? 'bg-emerald-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min(videoProgress * 100, 100)}%` }}
                  />
                </div>
                
                {/* Required progress marker */}
                <div className="relative w-full mt-1">
                  <div 
                    className="absolute top-0 w-0.5 h-2 bg-emerald-600"
                    style={{ left: `${REQUIRED_PROGRESS * 100}%` }}
                  />
                  <div 
                    className="absolute -top-6 transform -translate-x-1/2 text-xs text-emerald-600 font-medium"
                    style={{ left: `${REQUIRED_PROGRESS * 100}%` }}
                  >
                    70%
                  </div>
                </div>
              </div>
            </div>

            {/* Next Button */}
            {onComplete && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={onComplete}
                  disabled={!canProceed}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    canProceed
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  title={canProceed ? "Continue to next module" : "Watch 70% of the video to continue"}
                >
                  {canProceed ? "Continue →" : "Watch 70% to Continue"}
                </button>
              </div>
            )}
          </div>
        );

      case "TEXT":
        return (
          <div className="bg-gray-50 rounded-lg shadow border border-green-300">
            {/* Text Content with Scroll Tracking */}
            <div 
              ref={textContentRef}
              className="p-6 max-h-96 overflow-y-auto"
              style={{ scrollbarWidth: 'thin' }}
            >
              <h2 className="text-xl font-semibold mb-3">{module.title}</h2>
              <div className="text-gray-700 whitespace-pre-line leading-relaxed">
                {module.description}
                {/* Add some dummy content to ensure scrolling is needed */}
                {(!module.test?.description && !module.description) && (
                  <div>
                    <p className="mb-4">This is a sample text module that demonstrates scroll tracking functionality.</p>
                    <p className="mb-4">The system tracks how much of the content you have scrolled through and requires you to read at least 70% before enabling the continue button.</p>
                    <p className="mb-4">This ensures engagement with the learning material and helps track progress through text-based content.</p>
                    <p className="mb-4">Keep scrolling to see more content and watch the progress bar fill up as you read through the material.</p>
                    <p className="mb-4">Educational content often includes important information throughout the entire text, so this tracking mechanism ensures comprehensive review.</p>
                    <p className="mb-4">The scroll tracking works by monitoring the scroll position relative to the total scrollable height of the content area.</p>
                    <p className="mb-4">Once you reach 70% of the content, the continue button will become enabled, allowing you to proceed to the next module.</p>
                    <p className="mb-4">This approach balances learning effectiveness with user experience, ensuring content consumption while not being overly restrictive.</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Text Scroll Progress Bar */}
            <div className="px-6 pb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">
                  Reading Progress: {Math.round(textScrollProgress * 100)}%
                </span>
                <span className="text-sm text-gray-500">
                  {textCanProceed ? "✓ Ready to continue" : `Read ${Math.round(REQUIRED_PROGRESS * 100)}% to continue`}
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    textCanProceed ? 'bg-emerald-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${Math.min(textScrollProgress * 100, 100)}%` }}
                />
              </div>
              
              {/* Required progress marker */}
              <div className="relative w-full mt-1">
                <div 
                  className="absolute top-0 w-0.5 h-2 bg-emerald-600"
                  style={{ left: `${REQUIRED_PROGRESS * 100}%` }}
                />
                <div 
                  className="absolute -top-6 transform -translate-x-1/2 text-xs text-emerald-600 font-medium"
                  style={{ left: `${REQUIRED_PROGRESS * 100}%` }}
                >
                  70%
                </div>
              </div>
            </div>
            
            {/* Continue Button */}
            {onComplete && (
              <div className="px-6 pb-6 flex justify-end">
                <button
                  onClick={onComplete}
                  disabled={!textCanProceed}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                    textCanProceed
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  title={textCanProceed ? "Continue to next module" : "Read 70% of the content to continue"}
                >
                  {textCanProceed ? "Continue →" : "Read 70% to Continue"}
                </button>
              </div>
            )}
          </div>
        );

      case "Chatbot":
        return (
          <div>
            <iframe
              src="https://dashboard.tinytalk.ai/bots/c96a0a89-2442-43b0-873b-f14b60eda2be/chat"
              className="w-full h-[600px] border-none"
            />
            {onComplete && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={onComplete}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-emerald-700"
                >
                  Continue →
                </button>
              </div>
            )}
          </div>
        );

      case "Image":
        return (
          <div>
            <img
              src={module.embed_link || ""}
              alt={module.title}
              className="w-full rounded-lg shadow"
            />
            {onComplete && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={onComplete}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-emerald-700"
                >
                  Continue →
                </button>
              </div>
            )}
          </div>
        );

      default:
        return <p>Unknown module type: {module.CHAPTER_TYPE_CHOICES}</p>;
    }
  };

  // For TEXT type, return only the content without wrapper
  if (module.CHAPTER_TYPE_CHOICES === "TEXT") {
    return renderByType();
  }

  // For all other types, return with wrapper
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 mt-8 border border-green-300 max-w-6xl mx-auto w-full">
      {/* Title */}
      <h1 className="text-3xl font-extrabold text-gray-900 mb-3">{module.title}</h1>

      {/* Description */}
      <p className="text-base text-gray-500 mb-6 leading-relaxed">{module.description}</p>

      {/* Render Dynamic Content */}
      {renderByType()}
    </div>
  );
};

export default ModuleFlow;