import { StreamingTextResponse, GoogleGenerativeAIStream } from "ai";
import { GoogleGenerativeAI } from "@google/generative-ai";


export async function POST(req: Request) {
  const { prompt, selectedModel } = await req.json();

  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
  );

  const generationConfig = {
    max_output_tokens: 2048,
    temperature: 0.9,
    top_p: 1,
  };

  const model = genAI.getGenerativeModel({
    model: selectedModel,
    generationConfig,
  });
  const streamingResponse = await model.generateContentStream(prompt);

  return new StreamingTextResponse(GoogleGenerativeAIStream(streamingResponse));
}
