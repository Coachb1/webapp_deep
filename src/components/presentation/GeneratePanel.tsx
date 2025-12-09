"use client";

import PresentonForm from "@/components/presentation/PresentationForm";

export default function GeneratePanel({ onGenerate }: any) {
  return (
    <div className="col-span-1">
      <h2 className="text-xl font-bold mb-3">Generate Presentation</h2>
      <PresentonForm onDone={onGenerate} />
    </div>
  );
}
