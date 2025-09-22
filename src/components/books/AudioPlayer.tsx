"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/books/ui/slider";
import { Book } from "@/lib/types";
import { getModuleCompletion, updateCourseProgress } from "@/lib/api";
import { useUser } from "./context/UserContext";
import AudioManager from "./AudioManager";

interface AudioPlayerProps {
  show: boolean;
  book: Book | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  courseId: string;
}

const AudioPlayer = ({
  show,
  book,
  onClose,
  onNext,
  onPrev,
  courseId,
}: AudioPlayerProps) => {
  const user = useUser();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [markedCompleted, setMarkedCompleted] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [startFromPercentage, setStartFromPercentage] = useState<number>(0);
  const [playedRanges, setPlayedRanges] = useState<[number, number][]>([]);
  const [completedThreshold, setCompletedThreshold] = useState(50); // threshold for marking as completed

  const [loading, setLoading] = useState(false); // loader for slider knob / buffering / seeking
  const contentRef = useRef<HTMLDivElement | null>(null);
  const saveIntervalRef = useRef<number | null>(null);

  // helper
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const getPlayedPercentage = (duration: number) => {
    const totalPlayed = playedRanges.reduce((acc, [s, e]) => acc + (e - s), 0);
    console.log(
      `[AudioPlayer] played ${playedRanges} ${totalPlayed} of ${duration} (${
        (totalPlayed / duration) * 100
      }%)`
    );
    return duration ? Math.min(100, (totalPlayed / duration) * 100) : 0;
  };

  function mergeRanges(ranges: [number, number][]): [number, number][] {
    if (ranges.length === 0) return [];
    const sorted = [...ranges].sort((a, b) => a[0] - b[0]);
    const merged: [number, number][] = [sorted[0]];
    for (let i = 1; i < sorted.length; i++) {
      const [start, end] = sorted[i];
      const last = merged[merged.length - 1];
      if (start <= last[1]) {
        last[1] = Math.max(last[1], end); // extend overlap
      } else {
        merged.push([start, end]);
      }
    }
    return merged;
  }

  // returns percentage (0..100). Also logs inputs & result for debugging
  const getCompletionPercent = (
    totalSeconds: number,
    playedSeconds: number
  ): number => {
    const total = Number(totalSeconds) || 0;
    const played = Number(playedSeconds) || 0;

    // raw percent (may be >100 or <0 before clamping)
    const rawPercent = total > 0 ? (played / total) * 100 : 0;

    // clamp to [0,100]
    const clamped = Math.min(100, Math.max(0, rawPercent));

    // log for proof (timestamp optional)
    console.log("[progress-calc]", {
      totalSeconds: total,
      playedSeconds: played,
      rawPercent: Number(rawPercent.toFixed(6)), // show a few decimals
      clampedPercent: Number(clamped.toFixed(2)),
    });

    return Number(clamped.toFixed(2));
  };

  // Initialize / play when popup opens or book changes
  useEffect(() => {
    // If closed or no book, ensure audio stops
    if (!show || !book) {
      console.log(
        "[AudioPlayer] not open or no book -> stopping audioManager",
        {
          show,
          bookTitle: book?.title ?? null,
          managerSrc: AudioManager.getSrc(),
        }
      );
      AudioManager.stop();
      setIsPlaying(false);
      return;
    }

    console.log("[AudioPlayer] OPEN →", {
      bookTitle: book.title,
      bookId: book.title,
      managerSrc: AudioManager.getSrc(),
    });

    let mounted = true;
    let percentFromApi = 0;

    // event handlers must be stable for removeEventListener, so define here
    const onTimeUpdate = () => {
      if (!mounted) return;
      const t = AudioManager.getCurrentTime();
      const d = AudioManager.getDuration() || duration;
      if (!mounted && d > 0) return;
      setCurrentTime(t);
      setDuration(d);
      const percent = getCompletionPercent(d, t);

      // Update played ranges (1s granularity)
      setPlayedRanges((prev) => {
        const newRange: [number, number] = [t, t + 1];
        const merged = mergeRanges([...prev, newRange]);

        // ✅ use merged immediately
        const totalPlayed = merged.reduce((acc, [s, e]) => acc + (e - s), 0);
        const percent = d ? Math.min(100, (totalPlayed / d) * 100) : 0;

        console.log("[AudioPlayer:onTimeUpdate]", {
          bookId: book?.title,
          currentTime: t,
          newRange,
          merged,
          totalPlayed,
          percent,
        });

        return merged; // return the updated state
      });

      // debug log per timeupdate (throttled by browser)
      // (progress-calc already logs, this is supplemental)
      // console.log("[audio-timeupdate]", { bookId: book?.id, currentTime: Number(t.toFixed(3)), duration: Number(d.toFixed(3)), percent });
      const playedAudioPercentage = getPlayedPercentage(d)

      if (!markedCompleted && playedAudioPercentage >= completedThreshold) {
        setMarkedCompleted(true);
        const userId = user?.user?.user_data?.uid || "";
        console.log(
          `[AudioPlayer] reached ${completedThreshold}% -> marking completed (${completedThreshold})`,
          {
            bookId: book.title,
            percent: playedAudioPercentage,
          }
        );
        // fire & forget; don't block UI
        updateCourseProgress(
          courseId,
          userId,
          book.id,
          "completed",
          completedThreshold,
          playedAudioPercentage
        ).catch(console.error);
      }

      // Stop playback at 100%
      if (percent >= 100) {
        console.log("[AudioPlayer] 100% complete, stopping audio", {
          bookId: book.title,
        });
        AudioManager.stop();
        setIsPlaying(false);
      }
    };

    const onLoaded = () => {
      if (!mounted) return;
      const d = AudioManager.getDuration();
      setDuration(d);
      setLoading(false);
      console.log("[AudioPlayer:event] loadedmetadata", {
        bookId: book.title,
        duration: d,
        managerSrc: AudioManager.getSrc(),
      });

      if (typeof percentFromApi === "number" && percentFromApi > 0 && d) {
        AudioManager.setCurrentTime((percentFromApi / 100) * d);
        setCurrentTime((percentFromApi / 100) * d);
        console.log("[AudioPlayer] seek to startFromPercentage", {
          bookId: book.title,
          percentFromApi,
        });
      }
    };

    const onSeeked = () => {
      if (!mounted) return;
      setLoading(false);
      const t = AudioManager.getCurrentTime();
      console.log("[AudioPlayer:event] seeked", {
        bookId: book.title,
        currentTime: t,
        managerSrc: AudioManager.getSrc(),
      });
    };

    const onWaiting = () => {
      if (!mounted) return;
      setLoading(true);
      console.log("[AudioPlayer:event] waiting/buffering", {
        bookId: book.title,
        managerSrc: AudioManager.getSrc(),
      });
    };

    const onCanPlay = () => {
      if (!mounted) return;
      setLoading(false);
      console.log("[AudioPlayer:event] canplay", {
        bookId: book.title,
        managerSrc: AudioManager.getSrc(),
      });
    };

    const onPlaying = () => {
      if (!mounted) return;
      setIsPlaying(true);
      setLoading(false);
      console.log("[AudioPlayer:event] playing", {
        bookId: book.title,
        managerSrc: AudioManager.getSrc(),
      });
    };

    const onEnded = () => {
      if (!mounted) return;
      console.log("[AudioPlayer:event] ended", { bookId: book.title });
      onNext();
    };

    const onPlay = () => {
      // audioManager may emit 'play' before 'playing'
      setIsPlaying(true);
      setLoading(false);
    };
    const onPause = () => setIsPlaying(false);

    const init = async () => {
      try {
        const userId = user?.user?.user_data?.uid || "";

        console.log("[AudioPlayer:init] starting", {
          bookId: book.id,
          bookTitle: book.title,
          userId,
          managerSrc: AudioManager.getSrc(),
        });
        const moduleCompletion = await getModuleCompletion(userId, book.id);
        console.log("[AudioPlayer:init] starting", {
          bookTitle: book.title,
          completion: moduleCompletion?.completed_in_percentage || 0,
        });
        percentFromApi = moduleCompletion?.completed_in_percentage || 0;

        const playedAudio = moduleCompletion?.audio_played || 0;
        const playaudiosec = (playedAudio / 100) * duration || 0
        setPlayedRanges([[playaudiosec, playaudiosec + 1]]);

        if (percentFromApi >= 100) {
          percentFromApi = 0;
        }
        setStartFromPercentage(percentFromApi);

        // attach listeners
        AudioManager.on("timeupdate", onTimeUpdate);
        AudioManager.on("loadedmetadata", onLoaded);
        AudioManager.on("seeked", onSeeked);
        AudioManager.on("waiting", onWaiting);
        AudioManager.on("canplay", onCanPlay);
        AudioManager.on("playing", onPlaying);
        AudioManager.on("ended", onEnded);
        AudioManager.on("play", onPlay);
        AudioManager.on("pause", onPause);

        // set volume/mute/playbackRate to match UI
        AudioManager.setVolume(volume);
        AudioManager.setMuted(isMuted);
        AudioManager.setPlaybackRate(playbackRate);

        // play (auto)
        try {
          console.log("[AudioPlayer:init] play start", {
            bookId: book.title,
            src: book.audio,
            managerSrcBefore: AudioManager.getSrc(),
          });
          setLoading(true);
          await AudioManager.play(book.audio, percentFromApi);
          setIsPlaying(true);
          setAutoplayBlocked(false);
          console.log("[AudioPlayer:init] play success", {
            bookId: book.title,
            managerSrcAfter: AudioManager.getSrc(),
          });
        } catch (err) {
          console.warn("[AudioPlayer:init] play blocked / failed", {
            bookId: book.title,
            err,
          });
          setIsPlaying(false);
          setAutoplayBlocked(true);
          setLoading(false);
        }

        // periodic save every 15s
        saveIntervalRef.current = window.setInterval(() => {
          const t = AudioManager.getCurrentTime();
          const d = AudioManager.getDuration();
          const completion = getCompletionPercent(d, t);

          if (completion > 0) {
            const userId = user?.user?.user_data?.uid || "";
            console.log("[AudioPlayer:autosave]", {
              bookId: book.title,
              src: AudioManager.getSrc(),
              currentTime: t,
              duration: d,
              completion,
            });

            const playedAudioPercentage = getPlayedPercentage(d)
            updateCourseProgress(
              courseId,
              userId,
              book.id,
              playedAudioPercentage >= completedThreshold ? "completed" : "in_progress",
              completion,
              playedAudioPercentage
            ).catch(console.error);
          }
        }, 15000);
      } catch (err) {
        console.error("Audio init error:", err);
        setLoading(false);
      }
    };

    init();

    return () => {
      mounted = false;

      console.log("[AudioPlayer] CLEANUP / CLOSE →", {
        bookTitle: book?.title,
        bookId: book?.id,
        managerSrc: AudioManager.getSrc(),
      });

      // cleanup listeners
      AudioManager.off("timeupdate", onTimeUpdate);
      AudioManager.off("loadedmetadata", onLoaded);
      AudioManager.off("seeked", onSeeked);
      AudioManager.off("waiting", onWaiting);
      AudioManager.off("canplay", onCanPlay);
      AudioManager.off("playing", onPlaying);
      AudioManager.off("ended", onEnded);
      AudioManager.off("play", onPlay);
      AudioManager.off("pause", onPause);

      if (saveIntervalRef.current) {
        clearInterval(saveIntervalRef.current);
        saveIntervalRef.current = null;
      }

      // Save final progress on unmount/close
      const t = AudioManager.getCurrentTime();
      const d = AudioManager.getDuration();
      const completion = getCompletionPercent(d, t);
      if (completion > 0) {
        const userId = user?.user?.user_data?.uid || "";
        console.log("[AudioPlayer:final-save]", {
          bookId: book?.id,
          src: AudioManager.getSrc(),
          completion,
        });
        const playedAudioPercentage = getPlayedPercentage(d)

        updateCourseProgress(
          courseId,
          userId,
          book.id,
          playedAudioPercentage >= completedThreshold ? "completed" : "in_progress",
          completion,
          playedAudioPercentage
        ).catch(console.error);
      }

      // Do NOT forcibly stop here to avoid racing with the next play() — AudioManager.play will replace src if needed.
      // However, if you prefer to explicitly stop on every cleanup, uncomment the next two lines:
      // AudioManager.stop();
      // console.log("[AudioPlayer:stopped-on-cleanup]", { bookId: book?.id });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, book, courseId]);

  // pause/save on window beforeunload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (!book) return;
      const t = AudioManager.getCurrentTime();
      const d = AudioManager.getDuration();
      const completion = getCompletionPercent(d, t);
      if (completion > 0) {
        const userId = user?.user?.user_data?.uid || "";
        console.log("[AudioPlayer:beforeunload-save]", {
          bookId: book.title,
          completion,
        });
        const playedAudioPercentage = getPlayedPercentage(d)

        // synchronous-ish best-effort; API likely async. we call it and hope it finishes.
        updateCourseProgress(
          courseId,
          userId,
          book.id,
          playedAudioPercentage >= completedThreshold ? "completed" : "in_progress",
          completion,
          playedAudioPercentage
        ).catch(console.error);
      }
      AudioManager.pause();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [book, courseId]);

  // Outside click & Escape -> stop audio and close
  useEffect(() => {
    if (!show) return;

    const handleDocPointer = (e: MouseEvent | TouchEvent) => {
      if (
        contentRef.current &&
        e.target instanceof Node &&
        !contentRef.current.contains(e.target)
      ) {
        console.log(
          "[AudioPlayer] outside click -> stopping audio and closing",
          { bookTitle: book?.title, managerSrc: AudioManager.getSrc() }
        );
        AudioManager.stop();
        onClose();
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        console.log("[AudioPlayer] Escape -> stopping audio and closing", {
          bookTitle: book?.title,
          managerSrc: AudioManager.getSrc(),
        });
        AudioManager.stop();
        onClose();
      }
    };

    document.addEventListener("mousedown", handleDocPointer);
    document.addEventListener("touchstart", handleDocPointer);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleDocPointer);
      document.removeEventListener("touchstart", handleDocPointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [show, onClose, book]);

  // Controls
  const togglePlayPause = async () => {
    const src = AudioManager.getSrc();
    console.log("[AudioPlayer:togglePlayPause]", {
      bookId: book?.id,
      currentSrc: src,
      isPlaying,
    });

    if (isPlaying) {
      AudioManager.pause();
      setIsPlaying(false);
      console.log("[AudioPlayer:pause]", {
        bookId: book?.id,
        src: AudioManager.getSrc(),
      });
    } else {
      try {
        setLoading(true);
        if (src && book && src === book.audio) {
          await AudioManager.resume();
          console.log("[AudioPlayer:resume]", {
            bookId: book?.id,
            src: AudioManager.getSrc(),
          });
        } else if (book) {
          console.log("[AudioPlayer] request play new src", {
            bookId: book?.id,
            src: book.audio,
            prevManagerSrc: src,
          });
          await AudioManager.play(book.audio, startFromPercentage || 0);
          console.log("[AudioPlayer] played new src", {
            bookId: book?.id,
            src: AudioManager.getSrc(),
          });
        } else {
          await AudioManager.resume();
        }
        setIsPlaying(true);
        setAutoplayBlocked(false);
      } catch (err) {
        console.warn("[AudioPlayer:toggle:error]", { bookId: book?.id, err });
        setAutoplayBlocked(true);
        setIsPlaying(false);
      } finally {
        // leave final clearing to events (playing/loadedmetadata/seeked), but clear as fallback
        setTimeout(() => setLoading(false), 700);
      }
    }
  };

  const toggleMute = () => {
    const next = !isMuted;
    AudioManager.setMuted(next);
    setIsMuted(next);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    AudioManager.setVolume(newVolume);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleProgressChange = (value: number[]) => {
    const newTime =
      (value[0] / 100) * (AudioManager.getDuration() || duration || 0);
    setLoading(true); // show spinner on knob while seeking
    AudioManager.setCurrentTime(newTime);
    // update UI immediately
    setCurrentTime(newTime);
    // rely on 'seeked' event to clear loading; also clear fallback after 700ms
    setTimeout(() => setLoading(false), 700);
  };

  const cyclePlaybackRate = () => {
    const rates = [1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    AudioManager.setPlaybackRate(nextRate);
    setPlaybackRate(nextRate);
  };

  const skipForward = () => {
    const newTime = Math.min(
      (AudioManager.getCurrentTime() || 0) + 10,
      AudioManager.getDuration() || duration
    );
    AudioManager.setCurrentTime(newTime);
    setCurrentTime(newTime);
    setLoading(true);
    setTimeout(() => setLoading(false), 600);
  };

  const skipBackward = () => {
    const newTime = Math.max((AudioManager.getCurrentTime() || 0) - 10, 0);
    AudioManager.setCurrentTime(newTime);
    setCurrentTime(newTime);
    setLoading(true);
    setTimeout(() => setLoading(false), 600);
  };

  if (!show || !book) return null;

  // position % for knob spinner
  const knobPercent = duration
    ? Math.min(100, Math.max(0, (currentTime / duration) * 100))
    : 0;

  return (
    <div className={`popup ${show ? "show" : ""}`}>
      <div
        ref={contentRef}
        className="popup-content player"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Book Info */}
        <img
          src={book.img}
          alt={book.title}
          style={{
            width: 61,
            height: 71,
            borderRadius: 8,
            objectFit: "cover",
            marginRight: 15,
          }}
        />
        <div className="player-info">
          <div className="player-title">{book.title}</div>
          <div className="player-subtitle">{book.author}</div>
        </div>

        {/* Controls */}
        <div className="playback-section">
          <div className="player-controls">
            <Button className="control-btn" onClick={cyclePlaybackRate}>
              {playbackRate}x
            </Button>
            <Button className="control-btn" onClick={skipBackward}>
              &#9664;&#9664;
            </Button>
            <Button className="control-btn" onClick={togglePlayPause}>
              {isPlaying ? "⏸" : "▶"}
            </Button>
            <Button className="control-btn" onClick={skipForward}>
              &#9654;&#9654;
            </Button>
            <Button className="control-btn">CC</Button>
          </div>

          <div className="player-progress flex items-center gap-2 w-full relative">
            <span className="text-xs">{formatTime(currentTime)}</span>

            <div className="flex-1 relative">
              <Slider
                value={[duration ? (currentTime / duration) * 100 : 0]}
                onValueChange={handleProgressChange}
                max={100}
                step={0.1}
                className={`flex-1  ${loading ? "opacity-30" : "opacity-100"}`} // <- dim knob while loading
              />
            </div>
            <span className="text-xs">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume */}
        <div className="player-volume">
          <Button className="control-btn" onClick={toggleMute}>
            {isMuted ? "🔇" : "🔊"}
          </Button>
          <Slider
            value={[volume]}
            onValueChange={handleVolumeChange}
            max={1}
            step={0.01}
            className="w-24"
          />
        </div>

        {/* Autoplay fallback */}
        {/* {autoplayBlocked && (
          <div
            className="autoplay-overlay"
            onClick={togglePlayPause}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "rgba(0,0,0,0.5)",
              color: "white",
              fontSize: 16,
              cursor: "pointer",
              borderRadius: 8,
            }}
          >
            Click to Play
          </div>
        )} */}
      </div>
    </div>
  );
};

export default AudioPlayer;
