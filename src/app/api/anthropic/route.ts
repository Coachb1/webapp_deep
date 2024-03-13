import Anthropic from "@anthropic-ai/sdk";
import { AnthropicStream, StreamingTextResponse } from "ai";
import { NextApiRequest, NextApiResponse } from "next";

const anthropic = new Anthropic({
  // apiKey: "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", //process.env.ANTHROPIC_API_KEY,
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  const { userInput } = await req.json();
  console.log(userInput);

  const response = await anthropic.messages.create({
    max_tokens: 1000,
    messages: [{ role: "user", content: userInput }],
    model: "claude-2.1",
    stream: true,
  });

  const stream = AnthropicStream(response);

  return new StreamingTextResponse(stream);
}
