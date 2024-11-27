import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";

const responseLineRE = /^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;

/**
 * Adds convenience helper methods to a response object, including stream
 * chunks (as long as each chunk is a complete GenerateContentResponse JSON).
 */
function addHelpers(response: any): any {
  response.text = () => {
    if (response.candidates && response.candidates.length > 0) {
      if (response.candidates.length > 1) {
        console.warn(
          `This response had ${response.candidates.length} ` +
            `candidates. Returning text from the first candidate only. ` +
            `Access response.candidates directly to use the other candidates.`
        );
      }
      return getText(response);
    } else if (response.promptFeedback) {
      throw new Error(`Text not available.`, response);
    }
    return "";
  };
  return response;
}

/**
 * Returns text of first candidate.
 */
function getText(response: any): string {
  if (response.candidates?.[0].content?.parts?.[0]?.text) {
    return response.candidates[0].content.parts
      .map(({ text }: { text: any }) => text)
      .join("");
  } else {
    return "";
  }
}

/**
 * Process a response.body stream from the backend and return an
 * iterator that provides one complete GenerateContentResponse at a time
 * and a promise that resolves with a single aggregated
 * GenerateContentResponse.
 *
 * @param response - Response from a fetch call
 */
function processStream(response: Response) {
  const inputStream = response.body!.pipeThrough(
    new TextDecoderStream("utf8", { fatal: true })
  );
  const responseStream = getResponseStream(inputStream);
  const [stream1, stream2] = responseStream.tee();
  return {
    stream: generateResponseSequence(stream1),
    response: getResponsePromise(stream2),
  };
}

/**
 * Reads a raw stream from the fetch response and join incomplete
 * chunks, returning a new stream that provides a single complete
 * GenerateContentResponse in each iteration.
 */
function getResponseStream<T>(
  inputStream: ReadableStream<string>
): ReadableStream<T> {
  const reader = inputStream.getReader();
  const stream = new ReadableStream<T>({
    start(controller) {
      let currentText = "";
      return pump();
      function pump(): Promise<(() => Promise<void>) | undefined> {
        return reader.read().then(({ value, done }) => {
          if (done) {
            if (currentText.trim()) {
              controller.error(new Error("Failed to parse stream"));
              return;
            }
            controller.close();
            return;
          }

          currentText += value;
          let match = currentText.match(responseLineRE);
          let parsedResponse: T;
          while (match) {
            try {
              parsedResponse = JSON.parse(match[1]);
            } catch (e) {
              controller.error(
                new Error(`Error parsing JSON response: "${match[1]}"`)
              );
              return;
            }
            controller.enqueue(parsedResponse);
            currentText = currentText.substring(match[0].length);
            match = currentText.match(responseLineRE);
          }
          return pump();
        });
      }
    },
  });
  return stream;
}

/**
 * Aggregates an array of `GenerateContentResponse`s into a single
 * GenerateContentResponse.
 */
function aggregateResponses(responses: any[]): any {
  const lastResponse = responses[responses.length - 1];
  const aggregatedResponse: any = {
    promptFeedback: lastResponse?.promptFeedback,
  };
  for (const response of responses) {
    if (response.candidates) {
      for (const candidate of response.candidates) {
        const i = candidate.index;
        if (!aggregatedResponse.candidates) {
          aggregatedResponse.candidates = [];
        }
        if (!aggregatedResponse.candidates[i]) {
          aggregatedResponse.candidates[i] = {
            index: candidate.index,
          };
        }
        // Keep overwriting, the last one will be final
        aggregatedResponse.candidates[i].citationMetadata =
          candidate.citationMetadata;
        aggregatedResponse.candidates[i].finishReason = candidate.finishReason;
        aggregatedResponse.candidates[i].finishMessage =
          candidate.finishMessage;
        aggregatedResponse.candidates[i].safetyRatings =
          candidate.safetyRatings;

        /**
         * Candidates should always have content and parts, but this handles
         * possible malformed responses.
         */
        if (candidate.content && candidate.content.parts) {
          if (!aggregatedResponse.candidates[i].content) {
            aggregatedResponse.candidates[i].content = {
              role: candidate.content.role || "user",
              parts: [],
            };
          }
          const newPart: Partial<any> = {};
          for (const part of candidate.content.parts) {
            if (part.text) {
              newPart.text = part.text;
            }
            if (part.functionCall) {
              newPart.functionCall = part.functionCall;
            }
            if (Object.keys(newPart).length === 0) {
              newPart.text = "";
            }
            aggregatedResponse.candidates[i].content.parts.push(newPart);
          }
        }
      }
    }
  }
  
  return aggregatedResponse;
}

async function getResponsePromise(stream: ReadableStream<any>): Promise<any> {
  const allResponses: any[] = [];
  const reader = stream.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      return addHelpers(aggregateResponses(allResponses));
    }
    allResponses.push(value);
  }
}

async function* generateResponseSequence(
  stream: ReadableStream<any>
): AsyncGenerator<any> {
  const reader = stream.getReader();
  console.log("GETREADERVALUE (chunks) : ");
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    console.log(value.candidates[0].content);
    yield addHelpers(value);
  }
}

export async function POST(req: Request) {
  try {
    const { prompt, selectedModel, systemInstructions } = await req.json();
    console.log(`Selected Model : `, selectedModel)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${
      selectedModel || "gemini-1.5-pro"
    }:streamGenerateContent?alt=sse&key=${process.env.GEMINI_API_KEY}`;

    let options: any;

    if (selectedModel === "gemini-1.0-pro") {
      options = {
        method: "POST",
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            maxOutputTokens: 2048,
            temperature: 0.9,
            topP: 1,
          },
        }),
      };
    } else {
      options = {
        method: "POST",
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            maxOutputTokens: 2048,
            temperature: 0.9,
            topP: 1,
          },
          systemInstruction: {
            parts: [
              {
                text: systemInstructions,
              },
            ],
          },
        }),
      };
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      const responseJson = await response.json();
      console.error("Error response from API:", responseJson);
      return new Response(
        JSON.stringify({
          error: responseJson.error || "Internal server error",
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const responseStream = processStream(response);
    const stream = GoogleGenerativeAIStream(responseStream);

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Exception caught:", error);

    let errorMessage = "Internal server error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
