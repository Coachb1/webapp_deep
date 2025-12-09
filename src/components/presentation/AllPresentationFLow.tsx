import { useEffect, useRef, useState } from "react";
import {
  presentonGetJobStatus,
  presentonGetPresentation,
  presentonSavePresentation,
} from "@/lib/presentation-api";

export function usePresentationFlow() {
  const [slides, setSlides] = useState<any[]>([]);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [presentationId, setPresentationId] = useState<string | null>(null);
  const [taskStatus, setTaskStatus] = useState<any>(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const apiKeyRef = useRef<string>("");
  const pollingRef = useRef<boolean>(false);

  // -------------------------------------------
  // Generate Start
  // -------------------------------------------
  function handleGenerateStart(data: any, apikey: string) {
    apiKeyRef.current = apikey;
    setSlides([]);
    setTaskId(data.id);
    setLoading(true);
    pollingRef.current = true;

    pollTaskStatus(data.id);
  }

  // -------------------------------------------
  // Polling
  // -------------------------------------------
  async function pollTaskStatus(id: string) {
    if (!pollingRef.current) return;

    const key = apiKeyRef.current;

    const task = await presentonGetJobStatus(id, key);
    setTaskStatus(task);

    if (task.status === "completed") {
      pollingRef.current = false;

      if (task.data?.presentation_id) {
        setPresentationId(task.data.presentation_id);
        await loadPresentation(task.data.presentation_id);
      }

      setLoading(false);
      return;
    }

    setTimeout(() => pollTaskStatus(id), 2000);
  }

  // -------------------------------------------
  // Load full presentation
  // -------------------------------------------
  async function loadPresentation(id: string) {
    const key = apiKeyRef.current;
    const pres = await presentonGetPresentation(id, key);
    setSlides(pres.slides || []);
  }

  // -------------------------------------------
  // Save presentation
  // -------------------------------------------
  async function savePresentation() {
    if (!presentationId) return;

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

    const res = await presentonSavePresentation(payload, apiKeyRef.current);
    alert("Saved Successfully! Download URL: " + res.path);

    setSaving(false);
  }

  // -------------------------------------------
  // Cleanup
  // -------------------------------------------
  useEffect(() => {
    return () => {
      pollingRef.current = false;
    };
  }, []);

  return {
    slides,
    taskStatus,
    loading,
    saving,
    updateSlides: setSlides,
    handleGenerateStart,
    savePresentation,
  };
}
