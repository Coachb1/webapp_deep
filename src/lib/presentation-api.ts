
export async function presentonGenerateAsync(body: any, apiKey:string) {
  const PRESENTON_API_KEY = `Bearer ${apiKey}`;

  // return {"status":"pending","message":"Queued for generation","data":null,"id":"task-34bf3397941a4b7b899a5603a4ca7fd278d8352471e13a6dea8636e268500a48","error":null,"created_at":"2025-12-04T06:20:13.267108","updated_at":"2025-12-04T06:20:13.267249"}
  const payload = {
    content: body.content || "",
    slides_markdown: body.slides_markdown || [],
    instructions: body.instructions || "",
    tone: body.tone || "default",
    verbosity: body.verbosity || "standard",
    markdown_emphasis: !!body.markdown_emphasis,
    web_search: !!body.web_search,
    image_type: body.image_type || "stock",
    theme: body.theme || "professional-dark",
    n_slides: body.n_slides || 3,
    language: body.language || "English",
    template: body.template || "general",
    include_table_of_contents: !!body.include_table_of_contents,
    include_title_slide: !!body.include_title_slide,
    allow_access_to_user_info: !!body.allow_access_to_user_info,
    files: body.files || [],
    export_as: body.export_as || "pptx",
    trigger_webhook: !!body.trigger_webhook,
  };
  console.log("STEP 1: Function entered");

  console.log("STEP 2: Payload:", payload); // no JSON.stringify

  console.log("STEP 3: API KEY present:", !!PRESENTON_API_KEY);
  try {
    console.log("STEP 4: Starting fetch...");
    const res = await fetch(
      "https://api.presenton.ai/api/v1/ppt/presentation/generate/async",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: PRESENTON_API_KEY,
        },
        body: JSON.stringify(payload),
      }
    );

    console.log("STEP 5: res object:", res);
    console.log("STEP 6: status:", res.status);

    // Parse JSON defensively. Some upstream services may send malformed
    // or chunked/multipart responses that can cause the underlying
    // fetch implementation (undici) to throw while parsing. Wrap json()
    // in try/catch and fall back to text for better logging/debugging.
    let data: any;
    try {
      data = await res.json();
      console.log("STEP 7: json:", data);
      return data;
    } catch (parseErr) {
      try {
        const text = await res.text();
        console.error("Presenton response JSON parse error:", parseErr);
        console.error("Presenton raw response text:", text);
        // Return a structured error so callers can handle it gracefully.
        return { error: true, message: "Invalid JSON response from Presenton", status: res.status, raw: text };
      } catch (textErr) {
        console.error("Failed to read Presenton response as text:", textErr);
        console.error("Original parse error:", parseErr);
        return { error: true, message: "Failed to read response from Presenton", status: res.status };
      }
    }
  } catch (error) {
    console.log("STEP 8: FATAL ERROR:", error);
  }
}

export async function presentonGetJobStatus(jobId: string, apiKey:string) {
  const PRESENTON_API_KEY = `Bearer ${apiKey}`;

  const url = `https://api.presenton.ai/api/v1/ppt/presentation/status/${jobId}`;
  const res = await fetch(url, {
    headers: { Authorization: PRESENTON_API_KEY || "" },
  });
  if (!res.ok) throw new Error(`Failed to fetch job status: ${res.status}`);
  return res.json();
}

export async function presentonDownload(path: string, apiKey:string) {
  const PRESENTON_API_KEY = `Bearer ${apiKey}`;

  // path may be a full URL returned by Presenton
  const res = await fetch(path, {
    headers: { Authorization: PRESENTON_API_KEY || "" },
  });
  if (!res.ok) throw new Error("Download failed");
  const buffer = await res.arrayBuffer();
  return Buffer.from(buffer);
}

// lib/presentation-api.ts
export async function presentonGetPresentation(id: string, apiKey:string) {
  const PRESENTON_API_KEY = `Bearer ${apiKey}`;

  const res = await fetch(
    `https://api.presenton.ai/api/v1/ppt/presentation/${id}`,
    {
      headers: {
        Authorization: PRESENTON_API_KEY,
      },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch presentation");
  return res.json();
}

export async function presentonSavePresentation(payload: any, apiKey:string) {
  const PRESENTON_API_KEY = `Bearer ${apiKey}`;

  const res = await fetch(
    `https://api.presenton.ai/api/v1/ppt/presentation/edit`,
    {
      method: "POST",
      headers: {
        Authorization: PRESENTON_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!res.ok) throw new Error("Failed to save presentation");
  return res.json();
}
