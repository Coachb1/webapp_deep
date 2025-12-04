"use client";

import React, { useState } from "react";
import { Button } from "../ui/moving-border";

interface BulletPoint {
  title?: string;
  subtitle?: string;
  description?: string;
  icon?: { __icon_url__?: string };
}

interface SlideContent {
  title?: string;
  image?: { __image_url__?: string };
  bulletPoints?: BulletPoint[];
}

interface Slide {
  content?: SlideContent;
  theme?: { data?: { colors?: Record<string, string> } };
  speaker_note?: string;
}

export function PresentationSlideEditor({
  slides,
  path,
  onUpdate,
}: {
  slides: Slide[];
  path: string;
  onUpdate: (slides: Slide[]) => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mode, setMode] = useState<"preview" | "edit">("preview");

  const slide = slides[activeIndex];

  const previewUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(path)}`

  return (
  <div className="w-full h-screen overflow-hidden bg-[#1F1F1F] flex flex-col">
    {/* ---------------- TOP ACTION BAR ---------------- */}
    <div className="w-full bg-[#00c193] text-white flex items-center justify-between px-6 py-3 shadow-md">
      <div className="flex items-center gap-4">
        <span className="text-lg font-semibold tracking-wide">Preview</span>
      </div>

      <div className="flex items-center gap-3">
        <Button className="text-lg font-semibold tracking-wide">
          <a href={path} download>
            Export
          </a>
        </Button>
      </div>
    </div>

    {/* ---------------- MAIN CONTENT AREA ---------------- */}
    <div className="flex flex-1 overflow-hidden">
      <iframe
        src={previewUrl}
        className="w-full h-full border-0"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        allowFullScreen
      ></iframe>
    </div>
  </div>
);


  return (
    <div className="w-full h-screen overflow-hidden bg-[#1F1F1F] flex flex-col">
      {/* ---------------- TOP ACTION BAR (CLONED STYLE) ---------------- */}
      <div className="w-full bg-[#00c193] text-white flex items-center justify-between px-6 py-3 shadow-md">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold tracking-wide">Preview</span>
        </div>

        {/* Right buttons */}
        <div className="flex items-center gap-3">
          <Button className="text-lg font-semibold tracking-wide">
            <a
              href={path}
              download
            >
              Export
            </a>
          </Button>
        </div>
      </div>

      {/* ---------------- MAIN CONTENT AREA ---------------- */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDE THUMBNAILS */}
        <SlideThumbnailList
          slides={slides}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />

        {/* CENTER AREA – SLIDE PREVIEW */}
        <div className="mt-4 flex-1 flex items-center justify-center overflow-auto p-6">
          <div className="flex flex-col items-center gap-4">
            {/* Mode Switch (Preview / Edit) */}
            {/* <div className="flex gap-2 mb-3 mt-12">
              <button
                onClick={() => setMode("preview")}
                className={`px-4 py-1 rounded ${
                  mode === "preview"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setMode("edit")}
                className={`px-4 py-1 rounded ${
                  mode === "edit"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                Edit
              </button>
            </div> */}

            {/* Slide container */}
            <SlidePreview slide={slide} />

            {/* Add Slide Button */}
            {/* <button className="w-10 h-10 bg-[#5A3DF5] text-white rounded-full shadow-lg flex items-center justify-center text-2xl">
              +
            </button> */}

            {/* FOOTER NOTICE */}
            <div className="w-[900px] bg-black text-gray-300 text-xs p-3 rounded-md text-center">
              <strong>AI-Generated Content:</strong> Review for factual
              accuracy.
            </div>
          </div>
        </div>

        {/* RIGHT-SIDE EDIT PANEL */}
        {mode === "edit" && (
          <SlideEditorPanel
            slide={slide}
            onChange={(updated: any) => {
              const newSlides = [...slides];
              newSlides[activeIndex] = updated;
              onUpdate(newSlides);
            }}
          />
        )}
      </div>
    </div>
  );
}

export function SlidePreview({ slide }: { slide: any }) {
  const theme = slide.theme?.data?.colors || {};

  return (
    <div
      className="relative rounded-lg shadow-xl border overflow-hidden"
      style={{
        width: "960px",
        height: "540px", // 16:9
        background: theme.pageBackgroundColor || "#000",
        transform: "scale(0.75)",
        transformOrigin: "top center",
        backgroundImage:
          "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      {/* Inside slide content */}
      <div className="p-12 text-white h-full overflow-hidden">
        <h1 className="text-4xl font-bold mb-6">{slide.content?.title}</h1>

        <div className="grid grid-cols-2 gap-8">
          {/* Image */}
          {slide.content?.image?.__image_url__ && (
            <img
              src={slide.content.image.__image_url__}
              className="rounded-lg w-full h-64 object-cover"
            />
          )}

          {/* Bullets */}
          <ul className="space-y-6">
            {slide.content?.bulletPoints?.map(
              (
                bp: {
                  title?: string;
                  subtitle?: string;
                  description?: string;
                  icon?: { __icon_url__?: string };
                },
                i: number
              ) => (
                <li key={i} className="flex gap-3">
                  {bp.icon?.__icon_url__ && (
                    <img src={bp.icon.__icon_url__} className="w-6 h-6" />
                  )}
                  <div>
                    <p className="font-semibold text-xl">{bp.title}</p>
                    <p className="text-gray-300">
                      {bp.subtitle || bp.description}
                    </p>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function SlideThumbnailList({
  slides,
  activeIndex,
  onSelect,
}: {
  slides: any[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="w-40 bg-[#111] text-white p-3 overflow-y-auto border-r border-gray-800">
      {slides.map((s, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={`w-full mb-3 border rounded-lg overflow-hidden shadow ${
            i === activeIndex ? "border-blue-400" : "border-gray-700"
          }`}
        >
          <div className="w-full h-20 bg-black relative">
            {s.content?.image?.__image_url__ && (
              <img
                src={s.content.image.__image_url__}
                className="w-full h-full object-cover opacity-80"
              />
            )}
          </div>
          <p className="text-xs p-1 truncate">{s.content?.title}</p>
        </button>
      ))}
    </div>
  );
}
interface SlideEditorPanelProps {
  slide: Slide;
  onChange: (slide: Slide) => void;
}

export function SlideEditorPanel({ slide, onChange }: SlideEditorPanelProps) {
  function update(key: keyof SlideContent, value: any): void {
    onChange({ ...slide, content: { ...slide.content, [key]: value } });
  }

  return (
    <div className="w-96 bg-[#181818] text-white p-6 overflow-y-auto border-l border-gray-800">
      <h2 className="text-xl font-semibold mb-4">Edit Slide</h2>

      {/* TITLE */}
      <label className="text-sm opacity-80">Title</label>
      <input
        value={slide.content?.title || ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          update("title", e.target.value)
        }
        className="w-full bg-black border border-gray-700 rounded p-2 mt-1 mb-4"
      />

      {/* BULLET POINTS */}
      {slide.content?.bulletPoints?.map((bp: BulletPoint, i: number) => (
        <div key={i} className="mb-4 p-3 border border-gray-700 rounded">
          <label className="text-sm opacity-80">Bullet Title</label>
          <input
            value={bp.title || ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const arr = [...(slide.content?.bulletPoints || [])];
              arr[i].title = e.target.value;
              update("bulletPoints", arr);
            }}
            className="w-full bg-black border border-gray-700 rounded p-2 mt-1"
          />

          <label className="text-sm opacity-80 mt-2">Description</label>
          <textarea
            value={bp.subtitle || bp.description || ""}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              const arr = [...(slide.content?.bulletPoints || [])];
              if (arr[i].subtitle) arr[i].subtitle = e.target.value;
              else arr[i].description = e.target.value;
              update("bulletPoints", arr);
            }}
            rows={3}
            className="w-full bg-black border border-gray-700 rounded p-2 mt-1"
          />
        </div>
      ))}

      {/* SPEAKER NOTES */}
      <label className="text-sm opacity-80 mt-2">Speaker Notes</label>
      <textarea
        value={slide.speaker_note || ""}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          onChange({ ...slide, speaker_note: e.target.value })
        }
        rows={4}
        className="w-full bg-black border border-gray-700 rounded p-2 mt-1"
      />
    </div>
  );
}

export function SlideSkeleton() {
  return (
    <div className="p-6 bg-white border rounded shadow-sm animate-pulse space-y-6">

      {/* Slide 16:9 ratio */}
      <div className="aspect-[16/9] w-full bg-gray-200 rounded"></div>

      {/* Title line */}
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>

      {/* Bullet lines */}
      <div className="space-y-3">
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-3/4"></div>
      </div>

      {/* Footer note */}
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}
