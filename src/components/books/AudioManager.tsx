// lib/audioManager.ts
import { Howl, Howler } from 'howler';

type Handler = (e: Event) => void;

interface EventHub {
    [key: string]: Handler[];
}

let sound: Howl | null = null;
let currentSrc = "";
let currentVolume = 1.0; 
let isMuted = false;
let currentTime = 0; 
const eventHub: EventHub = {};

// Helper to notify all registered handlers for a specific event type
const emit = (event: string, e: Event) => {
    eventHub[event]?.forEach(handler => handler(e));
};

// Map Howler events to your original AudioManager events
const setupHowlerEvents = (newSound: Howl) => {
    let timeUpdateInterval: number | null = null;
    
    const startTimeUpdates = () => {
        if (timeUpdateInterval) clearInterval(timeUpdateInterval);
        timeUpdateInterval = window.setInterval(() => {
            if (newSound.playing()) {
                currentTime = newSound.seek() as number;
                emit('timeupdate', {} as Event);
            }
        }, 250) as unknown as number; 
    };

    const stopTimeUpdates = () => {
        if (timeUpdateInterval) {
            clearInterval(timeUpdateInterval);
            timeUpdateInterval = null;
        }
    };
    
    newSound.on('load', () => emit('loadedmetadata', {} as Event));
    newSound.on('seek', () => {
        currentTime = newSound.seek() as number;
        emit('seeked', {} as Event);
    });
    newSound.on('play', () => {
        startTimeUpdates();
        emit('play', {} as Event);
        emit('playing', {} as Event); 
    });
    newSound.on('pause', () => {
        stopTimeUpdates();
        emit('pause', {} as Event);
    });
    newSound.on('stop', stopTimeUpdates);
    newSound.on('end', () => {
        stopTimeUpdates();
        emit('ended', {} as Event);
    });
};

// --- API Functions ---

const initializeAndPlay = (src: string, startPercent?: number, autoPlay: boolean = true): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        if (!src) {
            return reject(new Error("No source provided."));
        }

        // 1. CRITICAL: Check for source change and force re-initialization
        if (src !== currentSrc) {
            console.log(`[AudioManager:initAndPlay] 🔄 NEW SRC DETECTED: ${src}. Unloading old sound.`);
            if (sound) {
                sound.stop();
                sound.unload(); // Destroy the old Howl instance
            }
            currentSrc = src;
            sound = null;
        }

        // 2. If no sound instance exists (new source or first run), create it
        if (!sound) {
            sound = new Howl({
                src: [src],
                html5: true, 
                volume: currentVolume,
                mute: isMuted,
            });

            setupHowlerEvents(sound);

            sound.once('load', () => {
                const d = sound?.duration() || 0;
                let seekTime = 0;

                if (typeof startPercent === "number" && d > 0) {
                    seekTime = (startPercent / 100) * d;
                }

                if (seekTime > 0) {
                    sound?.seek(seekTime);
                    currentTime = seekTime;
                    console.log(`[AudioManager:initAndPlay] Seeked to: ${seekTime.toFixed(2)}s`);
                }
                
                // Final action: Play if requested, otherwise just resolve (for load-only)
                if (autoPlay) {
                    sound?.play();
                }
                resolve();
            });

            sound.once('loaderror', (id, error) => {
                console.error("[Howler:loaderror] Load failed:", error);
                reject(error);
            });

            sound.load(); 
            console.log(`[AudioManager:initAndPlay] Starting load for source: ${src}`);

        } else if (autoPlay) {
            // 3. Same source, and autoPlay is requested: just resume
            console.log(`[AudioManager:initAndPlay] Resuming existing source: ${currentSrc}`);
            sound.play();
            resolve();
        } else {
            // 4. Same source, but only loading is requested (e.g., from an autoplay-blocked state)
            resolve();
        }
    });
};

// --- Public API ---

const play = (src?: string, startPercent?: number): Promise<void> => {
    return initializeAndPlay(src!, startPercent, true);
};

const load = (src: string, startPercent?: number): Promise<void> => {
    return initializeAndPlay(src, startPercent, false); // Pass autoPlay=false
};

const resume = (): Promise<void> | void => {
    if (sound) {
        console.log("[AudioManager:resume] Attempting Howler resume.");
        return sound.play() as unknown as Promise<void>;
    }
    return console.log("[AudioManager:resume] No sound instance to resume.");
};

const pause = () => {
    if (sound) {
        console.log("[AudioManager:pause] Audio paused.");
        sound.pause();
    }
};

const stop = () => {
    if (sound) {
        console.log("[AudioManager:stop] Audio stopped and unloaded.");
        // Ensure time update interval stops immediately on stop
        // The cleanup is handled via the sound events now.
        sound.stop();
        sound.unload(); 
    }
    sound = null;
    currentSrc = "";
    currentTime = 0;
};

// --- Volume/Mute Functions ---
const setVolume = (v: number) => {
    currentVolume = Math.max(0, v);
    Howler.volume(currentVolume); 
    sound?.volume(currentVolume);

    console.log(`[AudioManager:setVolume] ✅ Using Howler Volume. New gain value: ${currentVolume.toFixed(2)}`);
};

const setMuted = (m: boolean) => {
    isMuted = m;
    Howler.mute(m); 
    console.log(`[AudioManager:setMuted] Audio muted set to: ${m}`);
};

// --- Time/Rate Functions ---
const setCurrentTime = (t: number) => {
    if (sound) {
        const seekTime = Math.max(0, Math.min(t, sound.duration()));
        sound.seek(seekTime);
        console.log(`[AudioManager:setCurrentTime] Time set to: ${seekTime.toFixed(2)}s`);
    } else {
        console.warn("[AudioManager:setCurrentTime] No sound loaded, cannot set time.");
    }
};

const getCurrentTime = () => currentTime; 
const getDuration = () => (sound ? sound.duration() : 0);

const setPlaybackRate = (r: number) => {
    if (sound) {
        const rate = Math.max(0.5, r); 
        sound.rate(rate);
        console.log(`[AudioManager:setPlaybackRate] Rate set to: ${rate.toFixed(2)}x`);
    }
};

// --- Event Bridge Functions ---
const on = (event: string, handler: Handler) => {
    eventHub[event] = eventHub[event] || [];
    eventHub[event].push(handler);
    console.log(`[AudioManager:on] Added listener for event: ${event}`);
};

const off = (event: string, handler: Handler) => {
    if (eventHub[event]) {
        eventHub[event] = eventHub[event].filter(h => h !== handler);
        console.log(`[AudioManager:off] Removed listener for event: ${event}`);
    }
};

// --- Utility Functions ---
const getSrc = () => currentSrc;
const getAudioContextState = () => Howler.ctx ? Howler.ctx.state : 'uninitialized';


export default {
    play,
    load,
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
    getAudioContextState,
};