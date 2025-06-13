import { createServer } from 'http';
import {WebSocketServer, WebSocket } from 'ws';
import { SpeechClient, protos } from '@google-cloud/speech'; // Import SpeechClient and protos

// --- Configuration ---
const WEBSOCKET_PORT = process.env.WS_PORT ? parseInt(process.env.WS_PORT, 10) : 3001;
const GOOGLE_CREDENTIALS_PATH = process.env.GOOGLE_APPLICATION_CREDENTIALS || 'server/bucketaccess.json'; // Use env var for credentials

// --- Initialize Google Speech-to-Text Client ---
const speechClient = new SpeechClient({
  keyFilename: GOOGLE_CREDENTIALS_PATH, // Add your google authentication file path
});

console.log('speechclient initilized')

// --- HTTP Server (for WebSocket handshake) ---
const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server is running for Google STT.');
});

// Optional: Log upgrade requests to see if Nginx is forwarding them
server.on('upgrade', (request, socket, head) => {
  console.log(`HTTP Upgrade request received for: ${request.url}`);
});

// --- WebSocket Server ---
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('WebSocket client connected for STT.');

  let recognizeStream: any; // Type for the Google STT stream

  ws.on('message', (message: WebSocket.RawData) => {
    try {
      // First message is expected to be a config string (e.g., sampleRate)
      // Subsequent messages are audio data
      console.log('message comming...', typeof message, message)
      if (!recognizeStream) {
        // const clientConfig = JSON.parse(message);
        const clientConfig = {
          sampleRateHertz: 16000, // Google STT prefers 16kHz or 24kHz for optimal performance.
                                 // If mic is 44.1kHz or 48kHz, it will be resampled by browser's AudioContext.
          languageCode: 'en-US',
          enableAutomaticPunctuation: true, // Enhance readability of transcriptions
        };
        console.log('Received client config:', clientConfig);

        // Initialize streamingRecognize only when client config is received
        const request: protos.google.cloud.speech.v1.IStreamingRecognitionConfig = {
          config: {
            encoding: protos.google.cloud.speech.v1.RecognitionConfig.AudioEncoding.LINEAR16,
            sampleRateHertz: clientConfig.sampleRateHertz || 16000, // Use client's sample rate or default
            languageCode: clientConfig.languageCode || 'en-US',
            enableAutomaticPunctuation: clientConfig.enableAutomaticPunctuation || false,
            // Add other config options if needed, e.g., model: 'default'
          },
          interimResults: true, // Get partial results
        };

        interface TranscriptionResult {
          transcript: string;
          isFinal: boolean;
        }

        recognizeStream = speechClient
          .streamingRecognize(request)
          .on('error', (err: Error) => {
            console.error('Google STT Streaming error:', err);
            // Send error to client, then close client WebSocket
            ws.send(JSON.stringify({ error: 'Google STT Error: ' + err.message }));
            ws.close(1011, 'Google STT Error'); // 1011 is an abnormal closure
          })
          .on('data', (data: protos.google.cloud.speech.v1.StreamingRecognizeResponse) => {
            const result = data.results?.[0];
            const transcription: string = result?.alternatives?.[0]?.transcript || '';
            if (transcription) {
              console.log(`Transcription: ${transcription} (Final: ${result?.isFinal})`);
              const transcriptionResult: TranscriptionResult = {
          transcript: transcription,
          isFinal: result?.isFinal || false,
              };
              ws.send(JSON.stringify(transcriptionResult));
            }
          });

      }


        // Handle audio buffer
        let audioBuffer: Buffer;
        if (Buffer.isBuffer(message)) {
          audioBuffer = message;
        } else if (message instanceof ArrayBuffer) {
          audioBuffer = Buffer.from(new Uint8Array(message));
        } else if (ArrayBuffer.isView(message)) {
          audioBuffer = Buffer.from(message.buffer);
        } else {
          // Fallback for other types, though the above should cover most
          audioBuffer = Buffer.from(message as unknown as Uint8Array);
        }

        if (recognizeStream) { // Only write if stream is initialized
          recognizeStream.write(audioBuffer);
        } else {
          console.warn('Received audio data before STT stream was initialized.');
        }
      // }
    } catch (err) {
      console.error('Error handling WebSocket message:', err);
      if (err instanceof Error) {
        ws.send(JSON.stringify({ error: 'Server message handling error: ' + err.message }));
      } else {
        ws.send(JSON.stringify({ error: 'Unknown server message handling error.' }));
      }
    }
  });

  ws.on('close', () => {
    console.log('WebSocket client disconnected for STT.');
    if (recognizeStream) {
      recognizeStream.end(); // End the Google STT stream
      recognizeStream = null;
    }
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    if (recognizeStream) {
      recognizeStream.end();
      recognizeStream = null;
    }
  });
});

// --- Server Listening ---
server.listen(WEBSOCKET_PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${WEBSOCKET_PORT}`);
  console.log(`WebSocket server running at ws://0.0.0.0:${WEBSOCKET_PORT}`);
});

// --- Graceful Shutdown ---
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  wss.clients.forEach(client => client.close(1001, 'Server shutting down')); // 1001: Going Away
  wss.close(() => {
    server.close(() => {
      console.log('Server closed.');
      process.exit(0);
    });
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  wss.clients.forEach(client => client.close(1001, 'Server shutting down'));
  wss.close(() => {
    server.close(() => {
      console.log('Server closed.');
      process.exit(0);
    });
  });
});