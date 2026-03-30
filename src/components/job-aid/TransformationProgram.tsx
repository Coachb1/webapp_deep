import React, { useMemo, useState } from "react";
import { generateReport, JobAid, Question } from "@/lib/job-aid-apis";
import copy from "copy-to-clipboard";
import CopyBox from "../CopyBox";
import { trackJobaidSessionCompletion } from "@/lib/api";

type UseCase = {
  name: string;
  problem_it_solves: string;
  ai_approach: string;
  key_data_required: string[] | string;
  standalone_value: string;
  dependency_note?: string;
};

// -------------------------
// Color tokens (kept for exact color fidelity)
// -------------------------
const T = {
  teal: "#00C9A7",
  tealDark: "#00A88C",
  tealSoft: "rgba(0,201,167,0.10)",
  tealLine: "rgba(0,201,167,0.22)",
  bg: "#F0F2F5",
  card: "#FFFFFF",
  border: "#E2E8F0",
  text: "#1A2B3C",
  muted: "#6B7E93",
  badge: "#EAF9F6",
  low: { bg: "#F0FDF4", border: "#86EFAC", text: "#15803D" },
  medium: { bg: "#FFFBEB", border: "#FCD34D", text: "#92400E" },
  high: { bg: "#FFF5F5", border: "#FECACA", text: "#DC2626" },
};

// -------------------------
// Small presentational pills (use inline styles for exact colors)
// -------------------------
function Pill({
  label,
  color,
  bg,
  border,
  size = 12,
}: {
  label: string;
  color: string;
  bg: string;
  border: string;
  size?: number;
}) {
  return (
    <span
      style={{ color, background: bg, border: `1px solid ${border}` }}
      className="inline-block rounded-full px-3 py-1 font-bold whitespace-nowrap"
    >
      {label}
    </span>
  );
}

function ComplexityPill({ level }: { level: "Low" | "Medium" | "High" }) {
  const map: any = { Low: T.low, Medium: T.medium, High: T.high };
  const c = map[level] || T.medium;
  // return <Pill label={level} color={c.text} bg={c.bg} border={c.border} />;
  return ""
}

function TealPill({ label }: { label: string }) {
  return <Pill label={label} color={T.teal} bg={T.badge} border={T.tealLine} />;
}

// -------------------------
// Section label
// -------------------------
function SectionLabel({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2 mb-1">
      <span className="text-sm">{icon}</span>
      <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#6B7E93]">
        {text}
      </span>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-slate-500"
    >
      <path
        d="M10.6667 1.33331H3.33333C2.59695 1.33331 2 1.93027 2 2.66665V10.6666C2 11.403 2.59695 12 3.33333 12H10.6667C11.403 12 12 11.403 12 10.6666V2.66665C12 1.93027 11.403 1.33331 10.6667 1.33331Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 5.33331V13.3333C14 14.0697 13.403 14.6666 12.6667 14.6666H5.33333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
const convertMarkdownToPlainText = (markdown: string): string => {
  return markdown
    .replace(/^\s*-\s/gm, "• ")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .trim();
};

const handleCopy = (
  setCopied: React.Dispatch<React.SetStateAction<boolean>>,
  uc: UseCase
) => {

  const keyData = Array.isArray(uc.key_data_required)
    ? uc.key_data_required.map(d => `- ${d}`).join("\n")
    : `- ${uc.key_data_required}`;

  const markdownText = `**Use Case:** ${uc.name}
**Problem it Solves:** ${uc.problem_it_solves}
**AI Approach:** ${uc.ai_approach}
**Key Data Required:**
${keyData}
**Standalone Value:** ${uc.standalone_value}
**Dependency Note:** ${uc.dependency_note ?? "Fully standalone — no dependencies."}`;

  const plainText = convertMarkdownToPlainText(markdownText);

  if (copy(plainText)) {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
};

// -------------------------
// Use case card (collapsible)
// -------------------------
function UCCard({
  uc,
  index,
  total,
}: {
  uc: any;
  index: number;
  total: number;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  return (
    <div
      className={`flex gap-4 animate-fadeUp`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* timeline */}
      <div className="flex flex-col items-center w-12 flex-shrink-0">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white"
          style={{ background: T.teal, boxShadow: `0 0 0 4px ${T.tealSoft}` }}
        >
          {uc.sequence}
        </div>
        {index < total - 1 && (
          <div
            className="w-[2px] flex-1 min-h-[20px] mt-1"
            style={{ background: T.tealLine }}
          />
        )}
      </div>

      {/* card body */}
      <div
        className={`flex-1 rounded-lg overflow-hidden transition-shadow border`}
        style={{
          borderColor: open ? T.teal : T.border,
          background: T.card,
          boxShadow: open
            ? `0 6px 20px rgba(0,201,167,0.08)`
            : `0 1px 3px rgba(0,0,0,0.04)`,
        }}
      >
        {/* top accent when open */}
        {open && <div style={{ height: 4, background: T.teal }} />}

        <div
          onClick={() => setOpen((o) => !o)}
          className="px-5 py-4 flex items-start gap-4 cursor-pointer select-none"
        >
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-[#0f1724] truncate">
              {uc.name}
            </div>
            <div className="text-xs text-[#64748b] mt-1 line-clamp-2">
              {uc.problem_it_solves}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span
              title={uc.ai_approach}
              className="px-2 py-1 text-xs rounded-full bg-teal-50 border border-teal-200 text-teal-700 whitespace-nowrap"
            >
              AI
            </span>
            <ComplexityPill level={uc.implementation_complexity} />
            <button
              onClick={()=> {
                handleCopy(setCopied, uc)
              }}
              title="Copy details"
              className="w-6 h-6 rounded-full border flex items-center justify-center text-xs transition-colors hover:bg-slate-50"
            >
              {copied ? (
                <span className="text-xs text-teal-600">✓</span>
              ) : (
                <CopyIcon />
              )}
            </button>
            <div
              className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs transition-transform ${open ? "rotate-180" : ""}`}
            >
              ▾
            </div>
          </div>
        </div>

        {open && (
          <div className="p-5">
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4"> */}
              <div>
                <SectionLabel icon="🤖" text="AI Approach" />
                <p className="text-sm text-[#1A2B3C] leading-relaxed">
                  {uc.ai_approach}
                </p>
              </div>

              {/* <div>
                <SectionLabel icon="🔧" text="Implementation Complexity" />
                <div className="mb-2">
                  <ComplexityPill level={uc.implementation_complexity} />
                </div>
              </div> */}
            {/* </div> */}

            <div
              className="border-t"
              style={{ borderColor: T.border, margin: "8px 0 16px" }}
            />

            <div className="mb-4">
              <SectionLabel icon="🗄️" text="Key Data Required" />
              {Array.isArray(uc.key_data_required) &&
              uc.key_data_required.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-4 pl-4">
                  {uc.key_data_required.map((d: string, i: number) => (
                    <li
                      key={i}
                      className="text-sm text-[#1A2B3C] leading-relaxed"
                    >
                      - {d}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-[#1A2B3C]">{uc.key_data_required}</p>
              )}
            </div>

            <div
              className="border-t"
              style={{ borderColor: T.border, margin: "8px 0 16px" }}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <SectionLabel icon="⚡" text="Standalone Value" />
                <p className="text-sm text-[#1A2B3C] leading-relaxed">
                  {uc.standalone_value}
                </p>
              </div>

              <div>
                <SectionLabel icon="🔗" text="Dependency Note" />
                <p className="text-sm text-[#1A2B3C] leading-relaxed">
                  {uc.dependency_note || "Fully standalone — no dependencies."}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// -------------------------
// Results View
// -------------------------
function ResultsView({
  result,
  onBack,
}: {
  result: Results;
  onBack: () => void;
}) {
  const uc = result.use_cases || [];
  const is = result.initiative_summary || {};

  const [search, setSearch] = useState("");
  const [complexityFilter, setComplexityFilter] = useState<
    "All" | "Low" | "Medium" | "High"
  >("All");

  const filtered = uc.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.problem_it_solves.toLowerCase().includes(search.toLowerCase());
    const matchesComplexity =
      complexityFilter === "All" ||
      u.implementation_complexity === complexityFilter;
    return matchesSearch && matchesComplexity;
  });

  const counts = {
    low: uc.filter((u) => u.implementation_complexity === "Low").length,
    medium: uc.filter((u) => u.implementation_complexity === "Medium").length,
    high: uc.filter((u) => u.implementation_complexity === "High").length,
  };

  return (
    <div className="w-full max-w-4xl animate-fadeUp">
      <button
        onClick={onBack}
        className="text-sm text-slate-500 hover:text-slate-800 mb-4"
      >
        ← Back
      </button>

      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex-1 min-w-[260px]">
            <div className="text-xs font-semibold text-teal-600 uppercase tracking-wide mb-1">
              AI Use Case Decomposition
            </div>
            <h2 className="text-lg font-semibold text-slate-900">
              {is.initiative}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {is.primary_objective}
            </p>
          </div>

          <div className="flex flex-col gap-2 items-end">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-700">
              {uc.length} Use Cases
            </span>
            {/* <div className="flex gap-2 text-xs font-semibold">
              {counts.low > 0 && (
                <span className="px-2 py-1 rounded bg-green-50 border border-green-200 text-green-700">
                  {counts.low} Low
                </span>
              )}
              {counts.medium > 0 && (
                <span className="px-2 py-1 rounded bg-amber-50 border border-amber-200 text-amber-700">
                  {counts.medium} Medium
                </span>
              )}
              {counts.high > 0 && (
                <span className="px-2 py-1 rounded bg-red-50 border border-red-200 text-red-700">
                  {counts.high} High
                </span>
              )}
            </div> */}
          </div>
        </div>
      </div>

      <div className="mt-6 text-xs uppercase tracking-wider text-slate-500 font-semibold">
        Use Cases — sequenced by foundation
      </div>

      <div className="mt-4 space-y-4">
        {filtered.map((u, i) => (
          <UCCard key={i} uc={u} index={i} total={filtered.length} />
        ))}

        {filtered.length === 0 && (
          <div className="text-sm text-slate-400 text-center py-10">
            No use cases match your filters
          </div>
        )}
      </div>

      {result.decomposition_logic && (
  <div className="mt-8 bg-teal-50 border border-teal-200 rounded-lg p-6">

    <div className="flex items-center justify-between mb-3">
      <div className="text-xs font-semibold text-teal-700 uppercase tracking-wide">
        Decomposition Logic
      </div>


    </div>

    <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
      {result.decomposition_logic}
      <CopyBox
        content={result.decomposition_logic}
        className="p-1.5 ml-2 rounded-md text-gray-500 hover:text-gray-800  transition"
    />
    </p>
    

  </div>
)}
    </div>
  );
}

// -------------------------
// Wizard form
// -------------------------
function WizardForm({
  step,
  steps,
  answers,
  onChange,
  onContinue,
  onBack,
  jobAid
}: {
  step: number;
  steps: any[];
  answers: any;
  onChange: (id: string, val: string) => void;
  onContinue: () => void;
  onBack: () => void;
  jobAid: JobAid;
}) {
  const current = steps[step];
  const value = answers[current.id] || "";
  const enough = value.trim().length > 10;
  const progress = Math.round(
    ((step + (value.trim().length > 0 ? 0.5 : 0)) / steps.length) * 100,
  );

  return (
    <div className="w-full bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="h-1 bg-[${T.border}]">
        <div
          style={{ width: `${progress}%` }}
          className="h-full bg-[#00C9A7] transition-all rounded-r"
        ></div>
      </div>

      <div className="p-7">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className={`text-sm text-slate-500 ${step > 0 ? "visible" : "invisible"}`}
          >
            ‹ Back
          </button>
          <span className="text-xs text-[#6B7E93] font-medium">
            {jobAid.title || "Use Case Decomposer"}
          </span>
        </div>

        <div className="text-center mb-6">
          <div className="text-[11px] font-bold text-[#00C9A7] tracking-wide mb-1">
            Question {step + 1} of {steps.length}
          </div>
          <h2 className="text-2xl font-bold text-[#1A2B3C] mb-2">
            {current.label}
          </h2>
          <p className="text-sm text-[#00C9A7] font-medium">
            {current.subtitle}
          </p>
        </div>

        <textarea
          placeholder={current.placeholder}
          value={value}
          onChange={(e) => onChange(current.id, e.target.value)}
          className="w-full min-h-[140px] resize-y border rounded-xl p-4 text-base bg-[#FAFBFC]"
        />

        <div
          className="text-sm mt-3 mb-6"
          style={{ color: value.length < 10 ? "#EF9A9A" : T.muted }}
        >
          {value.length < 10
            ? `${10 - value.length} more characters needed`
            : `${value.length} characters`}
        </div>

        <div className="flex justify-center">
          <button
            onClick={onContinue}
            disabled={!enough}
            className="px-6 py-2 rounded-lg border text-sm font-semibold disabled:opacity-50"
            style={{ borderColor: T.border }}
          >
            {" "}
            {step < steps.length - 1 ? "Continue" : "Breakdown Use Cases →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// -------------------------
// Types & Mock response
// -------------------------
interface Results {
  initiative_summary: {
    initiative: string;
    company_name: string;
    company_url: string;
    primary_objective: string;
  };
  use_cases: any[];
  decomposition_logic: string;
}

interface TransformationProgramProps {
  jobAid: JobAid;
  inputName?: string;
  inputEmail?: string;
  clientId?: string;
  jobaidID?: string;
  userId?: string;
  tracking?: boolean;
  collection_id?: string;
}

// -------------------------
// Main exported component
// -------------------------
export default function TransformationProgram({
  jobAid,
  jobaidID,
  inputName,
  inputEmail,
  clientId,
  userId,
  collection_id,
  tracking = true,
}: TransformationProgramProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Results | null | undefined>(null);
  const [error, setError] = useState<string | null>(null);

  const steps = useMemo(() => {
    if (!jobAid?.questions) return [];
    return jobAid.questions
      .filter((q: Question) => q.question_type !== "editable")
      .map((q: Question) => ({
        id: q.question, // Use question text as ID
        label: q.question,
        subtitle: q.description || "",
        placeholder: "Type your answer here...",
      }));
  }, [jobAid?.questions]);

  function handleChange(id: string, val: string) {
    setAnswers((a) => ({ ...a, [id]: val }));
  }

  async function handleContinue() {
    if (step < steps.length - 1) {
      setStep((s) => s + 1);
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    setStep(steps.length);

    try {
      const reportResult = await generateReport(
        answers,
        inputEmail || "undefined@gmail.com",
        inputName || "User",
        jobaidID!,
        clientId,
      );
      const parsedResult =
        typeof reportResult.output === "string"
          ? JSON.parse(reportResult.output || "{}")
          : reportResult.output || {};
      setResult(parsedResult);
      if (tracking) {
        trackJobaidSessionCompletion(
          userId!,
          reportResult.session_id!,
          collection_id!,
        )
      }
      
    } catch (err: any) {
      setError(err.message || "Something went wrong generating use cases.");
    } finally {
      setLoading(false);
    }
  }

  function goBack() {
    if (step === steps.length) {
      setStep(steps.length - 1);
      setResult(null);
      setError(null);
    } else if (step > 0) setStep((s) => s - 1);
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background: T.bg,
        color: T.text,
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial',
      }}
    >
      <header
        className="bg-white border-b"
        style={{
          borderColor: T.border,
          height: 54,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "0 16px",
        }}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: T.teal }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M2 7h10M7 2l5 5-5 5"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="font-bold text-sm">{jobAid.description || "Break down major program goals into manageable use cases"}</span>
        {/* <span
          className="text-xs font-bold ml-3"
          style={{
            color: T.teal,
            background: T.badge,
            border: `1px solid ${T.tealLine}`,
            padding: "4px 10px",
            borderRadius: 20,
          }}
        >
          EPIC LEVEL
        </span> */}
      </header>

      <main className="flex items-center justify-center p-8">
        <div className="w-[50%] min-w-[720px] mx-auto">
          {step < steps.length && (
            <WizardForm
              step={step}
              steps={steps}
              answers={answers}
              onChange={handleChange}
              onContinue={handleContinue}
              onBack={goBack}
              jobAid={jobAid}
            />
          )}

          {step === steps.length && (
            <div>
              {loading && (
                <div className="bg-white rounded-2xl border p-12 flex flex-col items-center gap-4 shadow">
                  <div className="flex justify-center">
                    <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>{" "}
                  <div className="text-center">
                    <div className="font-bold text-lg">
                      Decomposing your initiative…
                    </div>
                    <div className="text-sm text-[#6B7E93]">
                      Identifying AI use cases and sequencing by foundation
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border rounded p-4 text-red-600">
                  {error}
                  <button className="ml-3 text-teal-600" onClick={goBack}>
                    ‹ Go back and retry
                  </button>
                </div>
              )}

              {result && !loading && (
                <ResultsView result={result} onBack={goBack} />
              )}
            </div>
          )}
        </div>
      </main>

      {/* tiny animation keyframes for fadeUp used by cards (Tailwind JIT users can move to utilities) */}
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeUp { animation: fadeUp .32s ease both; }
      `}</style>
    </div>
  );
}
