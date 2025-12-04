"use client";

import { presentonGenerateAsync } from "@/lib/presentation-api";
import { CheckIcon } from "lucide-react";
import React, { useState } from "react";

export const PREDEFINED_THEMES = [
  {
    id: "edge-yellow",
    name: "Edge Yellow",
    fonts: ["Playfair Display"],
    colors: ["#000000", "#333333", "#666666", "#ffff33", "#000000"],
  },
  {
    id: "mint-blue",
    name: "Mint Blue",
    fonts: ["Prompt"],
    colors: ["#8ee6d8", "#c7f2eb", "#e0fffa", "#dbe8ff", "#2f3b60"],
  },
  {
    id: "light-rose",
    name: "Light Rose",
    fonts: ["Overpass"],
    colors: ["#f9cccc", "#ffd5db", "#ffe7ec", "#2c3340", "#ff9db0"],
  },
  {
    id: "professional-blue",
    name: "Professional Blue",
    fonts: ["Inter"],
    colors: ["#e7f2ff", "#cedef6", "#9db7e3", "#5b6e85", "#000000"],
  },
  {
    id: "professional-dark",
    name: "Professional Dark",
    fonts: ["Instrument Sans"],
    colors: ["#000000", "#232323", "#444444", "#777777", "#ffffff"],
  },
];

export function ThemeCard({
  theme,
  selected,
  onSelect,
}: {
  theme: any;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      onClick={() => onSelect(theme.id)}
      className={`w-full text-left p-4 rounded-xl border transition shadow-sm 
        ${
          selected
            ? "border-indigo-500 shadow-md"
            : "border-gray-200 hover:border-gray-300"
        }
      `}
    >
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs text-gray-500 font-mono">
            ID: {theme.id}
          </span>
          <h3 className="font-semibold mt-1">{theme.name}</h3>
        </div>

        {selected && <CheckIcon className="w-5 h-5 text-indigo-600" />}
      </div>

      {/* Color Swatches */}
      <div className="flex gap-1 mt-3">
        {theme.colors.map((c: string, i: number) => (
          <div
            key={i}
            className="w-5 h-5 rounded-full border"
            style={{ background: c }}
          />
        ))}
      </div>

      {/* Fonts */}
      <div className="mt-3">
        <span className="text-xs text-gray-500 font-medium">FONTS</span>
        <div className="mt-1 inline-block px-2 py-1 rounded bg-gray-100 text-xs border text-gray-700">
          {theme.fonts[0]}
        </div>
      </div>
    </button>
  );
}

export default function PresentonForm({
  onDone,
}: {
  onDone: (data: any, apikey:string) => void;
}) {
  const [form, setForm] = useState({
    content: "",
    instructions: "",
    n_slides: 2,
    theme: "professional-dark",
  });

  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");

  const update = (k: string, v: any) => setForm((s) => ({ ...s, [k]: v }));

  async function submit() {
    if (!apiKey) {
      alert("Please enter your Presenton API key");
      return;
    }

    if (!form.content?.trim()) {
      alert("Content is required");
      return;
  }
    

    setLoading(true);

    const payload = {
      ...form,
      theme: form.theme, // required format
    };

    const data = await presentonGenerateAsync(payload, apiKey);

    setLoading(false);
    onDone(data,apiKey);
  }

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 space-y-6">
      <h2 className="text-2xl font-semibold tracking-tight">
        Create Presentation
      </h2>

      {/* Content */}
      <div className="relative">
        <textarea
          value={form.content}
          onChange={(e) => update("content", e.target.value)}
          rows={4}
          className="peer w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-transparent"
          placeholder="Presentation Content"
        />
        <label
          className="absolute left-3 -top-2.5 bg-white px-1 text-xs text-gray-600 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
            peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-indigo-600 transition-all"
        >
          Content (Main topic or text)
        </label>
        <p className="text-xs text-gray-400 mt-1">
          Describe what your presentation should cover.
        </p>
      </div>

      {/* Instructions */}
      <div className="relative">
        <textarea
          value={form.instructions}
          onChange={(e) => update("instructions", e.target.value)}
          rows={2}
          className="peer w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none placeholder-transparent"
          placeholder="Instructions"
        />
        <label
          className="absolute left-3 -top-2.5 bg-white px-1 text-xs text-gray-600 
            peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
            peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-indigo-600 transition-all"
        >
          Instructions (Style, tone, goals)
        </label>
      </div>

      {/* Slide Count */}
      <div>
        <label className="font-medium text-sm">Number of Slides</label>
        <div className="flex items-center gap-2 mt-1">
          <input
            type="number"
            min={1}
            value={form.n_slides}
            onChange={(e) => update("n_slides", +e.target.value)}
            className="w-28 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Theme Selector */}
      <div className="mt-6">
        <h3 className="text-md font-semibold mb-3">Choose Theme</h3>

        <div className="grid grid-cols-2 gap-4">
          {PREDEFINED_THEMES.map((theme) => (
            <ThemeCard
              key={theme.id}
              theme={theme}
              selected={form.theme === theme.id}
              onSelect={(val) => update("theme", val)}
            />
          ))}
        </div>
      </div>
      {/* API KEY FIELD */}
      <div className="mt-6">
        <label className="block font-medium text-sm">Presenton API Key</label>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-500"
          placeholder="Enter your API key"
        />
        <p className="text-xs text-gray-400 mt-1">
          Required to generate slides with Presenton.
        </p>
      </div>

      {/* Submit */}
      <button
        onClick={submit}
        disabled={loading}
        className={`w-full py-3 rounded-lg text-white font-medium tracking-wide transition 
          ${
            loading
              ? "bg-indigo-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 shadow"
          }
        `}
      >
        {loading ? "Generating Presentation…" : "Generate Presentation"}
      </button>
    </div>
  );
}
