import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  // apiKey: "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", //process.env.OPENAI_API_KEY,
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { userInput } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    max_tokens: 1000,
    messages: [{ role: "user", content: userInput }],
    stream: true,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
