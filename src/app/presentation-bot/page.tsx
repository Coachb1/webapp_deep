"use client";

import { useState } from "react";
import PresentonForm from "@/components/presentation/PresentationForm";
import {
  presentonGetJobStatus,
  presentonGetPresentation,
  presentonSavePresentation,
} from "@/lib/presentation-api";
import { PresentationSlideEditor, SlideSkeleton } from "@/components/presentation/presentationSlides";

export default function Page() {
  const [taskId, setTaskId] = useState<string | null>(null);
  const [presentationId, setPresentationId] = useState<string | null>(null);

  const [taskStatus, setTaskStatus] = useState<any>(null);
  const [slides, setSlides] = useState<any[]>([]);

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");

  async function handleGenerateStart(data: any, apikey:string) {
    setSlides([]);
    setTaskId(data.id);
    setApiKey(apikey); // Set API key first before polling
    setLoading(true);
    // Use the passed apikey directly, not the state (which hasn't updated yet)
    pollGenerationTask(data.id, apikey);
  }

  // -------------------------------------------
  // Poll generation
  // -------------------------------------------
  async function pollGenerationTask(id: string, currentApiKey?: string) {
    const keyToUse = currentApiKey || apiKey;
    if (!keyToUse) {
      console.error("No API key available for polling");
      setLoading(false);
      return;
    }
    const task = await presentonGetJobStatus(id, keyToUse);
    setTaskStatus(task);

    if (task.status !== "completed") {
      setTimeout(() => pollGenerationTask(id, keyToUse), 2000);
      return;
    }

    // Task finished → fetch full presentation
    if (task.data?.presentation_id) {
      setPresentationId(task.data.presentation_id);
      loadPresentation(task.data.presentation_id, keyToUse);
      setLoading(false);
    }
  }

  // -------------------------------------------
  // Load Presentation Data
  // -------------------------------------------
  async function loadPresentation(id: string, currentApiKey?: string) {
    const keyToUse = currentApiKey || apiKey;
    if (!keyToUse) {
      console.error("No API key available for loading presentation");
      return;
    }
    const pres = await presentonGetPresentation(id, keyToUse);
    console.log("Presentation fetch", pres);
    setSlides(pres.slides);
  }

  // -------------------------------------------
  // Save Presentation Edits
  // -------------------------------------------
  async function savePresentation() {
    if (!presentationId) return;
    if (!apiKey) {
      console.error("No API key available for saving");
      alert("API key missing. Please regenerate.");
      return;
    }

    setSaving(true);

    const payload = {
      presentation_id: presentationId,
      slides: slides.map((s) => ({
        index: s.index,
        content: s.content,
        speaker_note: s.speaker_note,
      })),
      export_as: "pptx",
    };

    const res = await presentonSavePresentation(payload, apiKey);
    setSaving(false);

    alert("Saved Successfully! Download URL: " + res.path);
  }

  return (
    <div className="min-h-screen p-8 grid grid-cols-3 gap-6">
      {/* LEFT PANEL ---------------------------- */}
      <div className="col-span-1">
        <h2 className="text-xl font-bold mb-3">Generate Presentation</h2>

        <PresentonForm onDone={handleGenerateStart} />
      </div>

      {/* RIGHT PANEL --------------------------- */}
      <div className="col-span-2">
        <h3 className="text-lg font-semibold mb-3">Slides</h3>

        {slides.length === 0 ? (
          <div className="p-6 bg-white border rounded text-gray-500">
              {loading ? (
                <div className="flex flex-col items-center text-gray-500 gap-4">
                    <div className="w-[500px]">
                      <SlideSkeleton />
                    </div>

                  <div className="text-center text-sm text-gray-600">
                    Preparing your presentation…
                    <br />
                    <span className="text-gray-400">
                      This may take a few moments.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500">
                  No slides yet. Generate a presentation to preview.
                </div>
              )}
          </div>
        ) : (
          <PresentationSlideEditor
            slides={slides}
            onUpdate={setSlides}
            path={taskStatus.data.path}
          />
        )}
      </div>
    </div>
  );
}
