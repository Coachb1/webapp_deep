import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { ChatCompletionChunk } from "openai/resources/index.mjs";

export async function POST(req: Request) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const { userInput, selectedModel= "gpt-4-turbo", max_token=2048, temp=1, top_p=1} = await req.json();


  const response = await openai.chat.completions.create({
    model:  selectedModel ,
    max_tokens: max_token,
    messages: [{ role: "user", content: userInput }],
    temperature: temp,
    top_p: top_p,
    stream: true,
  });

  const stream = OpenAIStream(response as any);

  return new StreamingTextResponse(stream);
}
