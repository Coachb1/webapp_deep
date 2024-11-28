import OpenAI from "openai";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const { inputText } = await req.json();

    const response = await openai.audio.speech.create({
      input: inputText,
      model: "tts-1",
      response_format: "mp3",
      voice: "echo",
    });

    const stream = response.body;

    // Return the streaming response
    return new Response(stream, {
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error generating speech" },
      { status: 500 }
    );
  }
};
