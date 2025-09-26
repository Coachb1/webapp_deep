// lib/audioManager.ts
type Handler = (e: Event) => void;

const audio = typeof window !== "undefined" ? new Audio() : (null as unknown as HTMLAudioElement);
let currentSrc = "";

const on = (event: string, handler: Handler) => {
  audio?.addEventListener(event, handler);
};
const off = (event: string, handler: Handler) => {
  audio?.removeEventListener(event, handler);
};

const play = (src?: string, startPercent?: number): Promise<void> => {
  if (!audio) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
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

const resume = (): Promise<void> | void => audio?.play();
const pause = () => audio?.pause();
const stop = () => {
  if (!audio) return;
  audio.pause();
  try {
    audio.currentTime = 0;
  } catch {}
  audio.src = "";
  currentSrc = "";
};

const setVolume = (v: number) => {
  if (!audio) return;
  audio.volume = Math.max(0, Math.min(1, v));
};
const setMuted = (m: boolean) => {
  if (!audio) return;
  audio.muted = m;
};
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

export default {
  play,
  resume,
  pause,
  stop,
  on,
  off,
  setVolume,
  setMuted,
  setCurrentTime,
  getCurrentTime,
  getDuration,
  setPlaybackRate,
  getSrc,
  audio, // exposed if you want direct access (optional)
};