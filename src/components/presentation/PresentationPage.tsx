"use client";

import { usePresentationFlow } from "./AllPresentationFLow";
import GeneratePanel from "./GeneratePanel";
import SlidesPanel from "./SlidePanel";


export default function PresentationPage() {
  const {
    slides,
    taskStatus,
    loading,
    saving,
    handleGenerateStart,
    savePresentation,
    updateSlides,
  } = usePresentationFlow();

  return (
    <div className="min-h-screen p-8 grid grid-cols-3 gap-6">
      {/* LEFT PANEL */}
      <GeneratePanel onGenerate={handleGenerateStart} />

      {/* RIGHT PANEL */}
      <SlidesPanel
        slides={slides}
        onUpdate={updateSlides}
        loading={loading}
        saving={saving}
        taskStatus={taskStatus}
        onSave={savePresentation}
      />
    </div>
  );
}
