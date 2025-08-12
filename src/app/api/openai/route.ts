import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

export async function POST(req: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const { userInput, selectedModel= "gpt-4-turbo"} = await req.json();

  const response = await openai.chat.completions.create({
    model:  selectedModel ,
    max_tokens: 1000,
    messages: [{ role: "user", content: userInput }],
    stream: true,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
