// app/api/similarity/route.ts
import { NextRequest, NextResponse } from 'next/server';
import natural from 'natural';

const { JaroWinklerDistance } = natural;

export async function POST(request: NextRequest) {
  try {
    // Parse the request body as JSON
    const { sentence1, sentence2 }: { sentence1: string; sentence2: string } =
      await request.json();

    if (!sentence1 || !sentence2) {
      return NextResponse.json(
        { error: 'Both "sentence1" and "sentence2" are required' },
        { status: 400 }
      );
    }

    // Calculate similarity
    const similarityPercentage = JaroWinklerDistance(sentence1, sentence2);

    if (Number.isNaN(similarityPercentage)) {
      return NextResponse.json(
        { error: 'unable to check similary on this strings' },
        { status: 400 }
      );
    }
    // Return the result
    return NextResponse.json({
      similarity: (similarityPercentage * 100).toFixed(2),
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request format' },
      { status: 400 }
    );
  }
}
