import Anthropic from "@anthropic-ai/sdk";
import { StreamingTextResponse } from "ai";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function* anthropicToTextStream(stream: any) {
  for await (const event of stream) {
    console.log("Converting Anthropic stream to text", event);
    if (event.type === "content_block_delta") {
      const delta = event.delta;
      if (delta.type === "text_delta") {
        yield delta.text; // send plain text chunks
      }
    }
  }
}

export async function POST(req: Request) {
  try {
    const {
      userInput,
      selectedModel = "claude-3-haiku-20240307",
      system_instruction = null,
      caching = false,
    } = await req.json();

    if (!userInput || typeof userInput !== "string") {
      return new Response(JSON.stringify({ error: "Invalid input" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const payload: Anthropic.Messages.MessageCreateParams = {
      model: selectedModel,
      max_tokens: 1000,
      temperature: 1,
      stream: true,
      messages: [
        {
          role: "user",
          content: [{ type: "text", text: userInput }],
        },
      ],
    };

    if (system_instruction) {
      payload.system = [
        {
          type: "text",
          text: system_instruction,
          ...(caching && {
            cache_control: { type: "ephemeral" },
          }),
        },
      ];
    }

    console.log('payload', payload, caching)
    const response = await anthropic.messages.create(payload);
    console.log("Received response from Anthropic API", response);
    const textStream = anthropicToTextStream(response);

    // Return a streaming response
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of textStream) {
          controller.enqueue(chunk);
        }
        controller.close();
      },
    });

    return new StreamingTextResponse(readableStream, {
      headers: { "Content-Type": "text/plain" },
    });

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
