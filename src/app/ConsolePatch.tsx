"use client";

// Runs before any UI renders
if (typeof window !== "undefined") {
  const isProd = window.location.hostname === "localhost";

  if (isProd) {
    console.log = () => {};
    console.debug = () => {};
    console.info = () => {};
    console.warn = () => {};
    // Optional: comment this out to leave errors visible
    // console.error = () => {};
  }
}

export default function ConsolePatch() {
  return null; // Does not render anything
}
