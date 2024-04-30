import { StreamingTextResponse, GoogleGenerativeAIStream } from "ai";
import { GoogleGenerativeAI } from "@google/generative-ai";
export async function POST(req: Request) {
  const { prompt } = await req.json();

  console.log("Gemini Env Value : ", process.env.GEMINI_API_KEY);
  console.log("OPENAI_API_KEY : ", process.env.OPENAI_API_KEY);
  console.log("ANTHROPIC API KEY : ",process.env.ANTHROPIC_API_KEY);

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const streamingResponse = await model.generateContentStream(prompt);

  return new StreamingTextResponse(GoogleGenerativeAIStream(streamingResponse));
}
