// lib/audioManager.ts
type Handler = (e: Event) => void;

// 1. Web Audio API Setup
const audio = typeof window !== "undefined" ? new Audio() : (null as unknown as HTMLAudioElement);
let currentSrc = "";

// webapi start
let audioContext: AudioContext | null = null;
let gainNode: GainNode | null = null;
let isWebAudioFailed = false; // Flag to track if we're in fallback mode

// Default gain is set to 1.0, but we allow up to 5.0
const INITIAL_GAIN = 1.0;
const MAX_GAIN = 5.0; // Max allowed gain for the slider

// Function to initialize the Web Audio Graph (called on first play)
const initWebAudio = () => {
  if (audioContext || !audio || isWebAudioFailed) return;
  
  try {
      // 1a. Create Audio Context
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // CRITICAL: Must be set for Web Audio API to work on cross-origin resources
      // NOTE: This setting is now handled primarily in the 'play' function's logic
      // to allow dynamic switching, but setting it here for the initial object is fine.
      audio.crossOrigin = "anonymous";
      
      // 1b. Create GainNode (the booster)
      gainNode = audioContext.createGain();
      gainNode.gain.value = INITIAL_GAIN; 
      
      // 1c. Create the source from the HTMLAudioElement
      const source = audioContext!.createMediaElementSource(audio);
      // 1d. Connect the nodes: Source -> GainNode -> Destination (Speakers)
      source.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // IMPORTANT: Since we are using the Web Audio API for volume, 
      // the base HTMLAudioElement volume should be set to max.
      audio.volume = 1.0;
      
      isWebAudioFailed = false;


   } catch (e) {
      // This catch is for synchronous API initialization errors, not CORS fetch errors.
      console.warn("Web Audio API failed to initialize (Browser/API error). Reverting to standard HTML audio.", e);
      // Use the existing audio element, no need to create a new one here.
      isWebAudioFailed = true;
      audioContext = null;
      gainNode = null;
      audio.volume = 1.0; 
      audio.removeAttribute('crossorigin');
  }
};

// --- Standard HTMLAudioElement Methods ---

const on = (event: string, handler: Handler) => {
  audio?.addEventListener(event, handler);
};
const off = (event: string, handler: Handler) => {
  audio?.removeEventListener(event, handler);
};

const play = (src?: string, startPercent?: number): Promise<void> => {
  if (!audio) return Promise.resolve();
  initWebAudio(); // INITIALIZE WEB API FOR BOOSTING

  return new Promise<void>((resolve, reject) => {
    
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }
    // Flag to ensure we only try the standard fallback once
    const doPlay = () => {
        try {
            if (typeof startPercent === "number" && !Number.isNaN(audio.duration)) {
                audio.currentTime = (startPercent / 100) * audio.duration;
            }
        } catch (e) {
            // ignore if duration not ready
        }

        audio
            .play()
            .then(() => resolve())
        .catch((err) => reject(err));
    };

    if (src && src !== currentSrc) {
      audio.pause();
      // Ensure the attribute is set for the initial boost attempt 
      // (unless the global WebAudio state is already marked as failed)
      if (!isWebAudioFailed) {
          audio.crossOrigin = "anonymous";
      } else {
          audio.removeAttribute('crossorigin');
      }

      audio.src = src;
      currentSrc = src;

      const onLoaded = () => {
        audio.removeEventListener("loadedmetadata", onLoaded);
        doPlay();
      };
      audio.addEventListener("loadedmetadata", onLoaded);
      audio.load();
    } else {
      // same src or no src provided -> just resume
      doPlay();
    }
  });
};

const resume = (): Promise<void> | void => {
  if (audioContext && audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return audio?.play();
}

const pause = () => audio?.pause();

const stop = () => {
  if (!audio) return;
  audio.pause();
  try {
    audio.currentTime = 0;
  } catch {}
  audio.src = "";
  currentSrc = "";
  // Reset state for the next file load
  audio.crossOrigin = "anonymous"; 
  isWebAudioFailed = false;
};

// --- Volume/Gain Control Methods ---

// This function now handles both Web Audio Gain (boost) and standard volume (fallback).
const setVolume = (gainValue: number) => {
  if (!audio) return;
  
  if (!isWebAudioFailed && gainNode) {
    // ⭐️ WEB AUDIO MODE: Control the GainNode for boost
    const newGain = Math.max(0, Math.min(MAX_GAIN, gainValue));
    gainNode.gain.value = newGain;
    
  } else {
    // ⭐️ FALLBACK MODE: Control the standard audio element volume
    const newVolume = Math.max(0, Math.min(1.0, gainValue));
    audio.volume = newVolume;

    if (gainValue > 1.0) {
        console.warn(`Volume boost failed. Limiting to 1.0x (standard volume) in fallback mode.`);
    }
  }
};

const setMuted = (m: boolean) => {
  if (!audio) return;
  audio.muted = m;
};

// --- Time and Rate Methods (Unchanged) ---

const setCurrentTime = (t: number) => {
  if (!audio) return;
  audio.currentTime = Math.max(0, Math.min(t, audio.duration || t));
};
const getCurrentTime = () => (audio ? audio.currentTime : 0);
const getDuration = () => (audio ? audio.duration || 0 : 0);
const setPlaybackRate = (r: number) => {
  if (!audio) return;
  audio.playbackRate = r;
};
const getSrc = () => currentSrc;

const getCurrentGain = () => {
    if (isWebAudioFailed) {
        return audio ? audio.volume : 0;
    }
    return gainNode ? gainNode.gain.value : 1.0;
};


export default {
  play,
  resume,
  pause,
  stop,
  on,
  off,
  setVolume,
  getCurrentGain,
  isWebAudioFailed,
  setMuted,
  setCurrentTime,
  getCurrentTime,
  getDuration,
  setPlaybackRate,
  getSrc,
  audio, 
};