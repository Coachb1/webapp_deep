import Anthropic from "@anthropic-ai/sdk";
import { AnthropicStream, StreamingTextResponse } from "ai";
import { NextApiRequest, NextApiResponse } from "next";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userInput, selectedModel="claude-3-haiku-20240307" } = await req.json();
    console.log("User input:", userInput);

    if (!userInput || typeof userInput !== "string") {
      return new Response(JSON.stringify({ error: "Invalid input" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await anthropic.messages.create({
      max_tokens: 1000,
      messages: [{ role: "user", content: userInput }],
      model: selectedModel,
      temperature: 1,
      stream: true,
    });

    const stream = AnthropicStream(response);
    return new StreamingTextResponse(stream);

  } catch (error: any) {
    console.error("Anthropic API error:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to process request",
        details: error?.message || "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
