// src/lib/job-aid-apis.ts

import { baseURL } from "./utils";

// ---------- Types ----------
export interface Question {
  id: number;
  uid: string; // Unique identifier for the question
  question: string;
  question_type: "text" | "dropdown" | "boolean" | "editable" | "resource";
  description: string;
  dropdowns?: string; // CSV string, e.g. "People, Tools, Budget"
  section?: string; // Optional section for grouping questions
  is_multi_select?:boolean;
  allow_custom_text?:boolean;

  // new fields for attachment support
  attachment_allowed?: boolean;
}

export interface JobAid {
  title: string;
  description: string;
  questions: Question[];
  job_aid_type?: string; // Type of job aid, e.g. "form" or "job_aid"
  is_validation: boolean;
  is_report: boolean;
  is_prompt_generation: boolean;
}


export interface ValidateResponse {
  isValid: boolean;
  feedback?: string;
  status: "valid" | "hard_block" | "soft_suggestion";
  message?: string;
  suggestions?: string[];
}

export interface ReportResponse {
  generated_prompt: string;
  report_url: string;
  session_id?: string;
  output?: string; // Optional field to hold any additional output from the report generation
}

// ---------- Env Vars ----------
export const API_BASE_URL = baseURL || "http://localhost:8001/api/v1";
export const LOCAL_API_BASE_URL = "http://localhost:8001/api/v1";

console.log("API_BASE_URL:", API_BASE_URL);

// ---------- Helper Functions ----------
  

// ---------- Error Helper ----------
function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

// ---------- Fetch Helper ----------
async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    let errMsg = `HTTP ${res.status}: ${res.statusText}`;
    try {
      const errorData = await res.json();
      errMsg += ` - ${errorData.message || JSON.stringify(errorData)}`;
    } catch {
      /* ignore JSON parse errors */
    }
    throw new Error(errMsg);
  }

  return res.json() as Promise<T>;
}

// ---------- API Calls ----------

export const fetchJobAid = async (job_aid_id: string): Promise<JobAid> => {
  try {
    const data = await fetchJson<JobAid>(
      `${API_BASE_URL}/job-aid/get-job-aid/?jobaid_id=${job_aid_id}`
    );
    return data;
  } catch (error: unknown) {
    console.error("Error fetching job aid:", error);
    throw new Error(getErrorMessage(error));
  }
};

// Fetch job aid questions
export const fetchQuestions = async (job_aid_id: string): Promise<Question[]> => {
  try {
    const data = await fetchJson<{ questions: Question[] }>(
      `${API_BASE_URL}/job-aid/get-job-aid/?jobaid_id=${job_aid_id}`
    );
    return data.questions;
  } catch (error: unknown) {
    console.error("Error fetching questions:", error);
    throw new Error(getErrorMessage(error));
  }
};

// Validate job aid answers
export const validateAnswers = async (
  answers: Record<string, string | boolean>,
  question_id: string
): Promise<ValidateResponse> => {
  try {
    return await fetchJson<ValidateResponse>(
      `${API_BASE_URL}/job-aid/validate-job-aid/`,
      {
        method: "POST",
        body: JSON.stringify({ qna: answers, question_id: question_id }),
      }
    );
  } catch (error: unknown) {
    console.error("Error validating answers:", error);
    throw new Error(getErrorMessage(error));
  }
};

// Generate report
export const generateReport = async (
  answers: Record<string, string | boolean>,
  userEmail = "test@example.com",
  name:string,
  job_aid_id: string,
  client_id?: string,
  attachments?: Record<string, File[]>
): Promise<ReportResponse> => {
  try {
    // if we have at least one file use FormData
    const hasFile = attachments
      ? Object.values(attachments).some((files) => files && files.length > 0)
      : false;

    if (hasFile) {
      const formData = new FormData();
      formData.append(
        "qna",
        JSON.stringify(answers),
      );
      formData.append("useremail", userEmail);
      formData.append("name", name);
      formData.append("jobaid", job_aid_id);
      if (client_id) formData.append("client_id", client_id);

      // append all files keyed by question and file index
      Object.entries(attachments || {}).forEach(([question, files]) => {
        if (files && files.length > 0) {
          // Backend processes one file per question key (upload_image called once per key)
          // Send only the first file per question, or send all under indexed keys
          files.forEach((file, idx) => {
            const key =
              files.length === 1
                ? `file_upload[${question}]`
                : `file_upload[${question}_${idx}]`;
            formData.append(key, file);
          });
        }
      });
      
      // Use native fetch to avoid forcing application/json header
      const res = await fetch(`${API_BASE_URL}/job-aid/generate-report/`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        let errMsg = `HTTP ${res.status}: ${res.statusText}`;
        try {
          const errorData = await res.json();
          errMsg += ` - ${errorData.message || JSON.stringify(errorData)}`;
        } catch {}
        throw new Error(errMsg);
      }
      return (await res.json()) as ReportResponse;
    }

    // fallback to plain JSON request
    return await fetchJson<ReportResponse>(
      `${API_BASE_URL}/job-aid/generate-report/`,
      {
        method: "POST",
        body: JSON.stringify({
          qna: answers,
          useremail: userEmail,
          name: name,
          jobaid: job_aid_id,
          client_id: client_id,
        }),
      }
    );
  } catch (error: unknown) {
    console.error("Error generating report:", error);
    throw new Error(getErrorMessage(error));
  }
};

// ---------- Mock Data for Dev ----------
export const getMockQuestions = (): Question[] => [
  {
    id: 1,
    uid: "q1",
    question: "What is your primary management goal for this quarter?",
    question_type: "text",
    description:
      "Think about the most important objective you want to achieve in your team or department.",
  },
  {
    id: 2,
    uid: "q2",
    question: "What challenges do you anticipate facing?",
    question_type: "text",
    description:
      "Consider potential obstacles that might prevent you from reaching your goal.",
  },
  {
    id: 3,
    uid: "q3",
    question: "What resources will you need?",
    question_type: "dropdown",
    description:
      "Identify the people, tools, and budget required to accomplish your objective.",
    dropdowns: "People, Tools, Budget, Training, Technology",
  },
  {
    id: 4,
    uid: "q4",
    question: "Do you have a timeline for completion?",
    question_type: "boolean",
    description:
      "Set realistic deadlines and milestones for your management action plan.",
  },
  {
    id: 5,
    uid: "q5",
    question: "How will you measure success?",
    question_type: "text",
    description:
      "Define specific metrics and KPIs to track your progress and success.",
  },
];


export const updateJobaidSessionQna = async (sessionId: string, updateQna: Record<string, string>) =>{
  try {
    const response = await fetch(`${API_BASE_URL}/job-aid/${sessionId}/update-session/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({qna: updateQna}),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating jobaid session QNA:', error);
    throw error;
  
  }
}