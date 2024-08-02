import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export async function POST(req: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const { userInput, selectedModel } = await req.json();

  console.log("selectedModel : ",selectedModel)
  const response = await openai.chat.completions.create({
    model: selectedModel || "gpt-4-turbo",
    max_tokens: 1000,
    messages: [{ role: "user", content: userInput }],
    stream: true,
    temperature : 1.8
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
