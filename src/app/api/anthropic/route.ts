import Anthropic from "@anthropic-ai/sdk";
import { AnthropicStream, StreamingTextResponse } from "ai";
import { NextApiRequest, NextApiResponse } from "next";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  const { userInput } = await req.json();
  console.log(userInput);

  const response = await anthropic.messages.create({
    max_tokens: 1000,
    messages: [{ role: "user", content: userInput }],
    model: "claude-3-haiku-20240307",
    stream: true,
  });

  const stream = AnthropicStream(response);

  return new StreamingTextResponse(stream);
}
