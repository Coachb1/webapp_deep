// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
const ENVIRONMENT = process.env.KINDE_POST_LOGIN_REDIRECT_URL?.includes("localhost") ? "local" : "production";

if (ENVIRONMENT != "local") {
  Sentry.init({
    dsn: "https://fbf82c6c8258272ce32a8cfbd1fa2153@o4508001030963200.ingest.us.sentry.io/4508001032601600",

    // Add optional integrations for additional features
    integrations: [
      Sentry.replayIntegration(),
    ],

    // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
    tracesSampleRate: 1,

    // Define how likely Replay events are sampled.
    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 0.1,

    // Define how likely Replay events are sampled when an error occurs.
    replaysOnErrorSampleRate: 1.0,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
    denyUrls: [/localhost/, /127\.0\.0\.1/]
  });
}