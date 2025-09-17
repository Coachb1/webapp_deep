"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/books/ui/slider";
import { Book } from "@/lib/types";
import { getModuleCompletion, updateCourseProgress } from "@/lib/api";
import { useUser } from "./context/UserContext";

interface AudioPlayerProps {
  show: boolean;
  book: Book | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  courseId: string;
}

const AudioPlayer = ({ show, book, onClose, onNext, onPrev, courseId }: AudioPlayerProps) => {
  const user = useUser();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [marked70, setMarked70] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [startFromPercentage, setStartFromPercentage] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const currentTimeRef = useRef(0);

  // Sync ref with state
  useEffect(() => {
    currentTimeRef.current = currentTime;
  }, [currentTime]);


const mmssToSeconds = (time: string): number => {
  const [min, sec] = time.split(":").map(Number);
  return min * 60 + sec;
};

// Calculate completion percentage
const getCompletionPercent = (
  total: string | number,
  played: string | number
): number => {
  // Convert to seconds if input is a string
  const totalSec = typeof total === "string" ? mmssToSeconds(total) : total;
  const playedSec = typeof played === "string" ? mmssToSeconds(played) : played;

  if (!totalSec) return 0;
  return Math.round((playedSec / totalSec) * 100 * 100) / 100; // rounded to 2 decimals
};
  // Calculate completion %
  const getCompletion = () => {
    if (!duration) return 0;
    return getCompletionPercent(duration, currentTimeRef.current);
  };

  // Track 70% completion & timeupdate
  useEffect(() => {
    const userId = user?.user?.user_data?.uid || '';
    const audio = audioRef.current;
    if (!audio || !book) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);

      const progress = (audio.currentTime / audio.duration) * 100;
      if (!marked70 && progress >= 70) {
        setMarked70(true);
        updateCourseProgress(courseId, userId, book.id, "completed", 70).then(() =>
          console.log("📡 Course progress updated at 70%")
        );
      }
    };

    const updateDuration = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", onNext);

    return () => {
      const completion = getCompletion();
      if (completion > 0) {
        updateCourseProgress(courseId, userId, book.id, "in_progress", completion);
      }

      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", onNext);
    };
  }, [book, marked70, courseId, onNext]);

  // Save progress on pause & beforeunload
  useEffect(() => {
    const userId = user?.user?.user_data?.uid || '';

    const audio = audioRef.current;
    if (!audio || !book) return;

    const handlePause = () => {
      const progress = getCompletion();
      if (progress > 0) {
        updateCourseProgress(courseId, userId, book.id, "in_progress", progress);
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const progress = getCompletion();
      if (progress > 0) {
        updateCourseProgress(courseId, userId, book.id, "in_progress", progress);
      }
    };

    audio.addEventListener("pause", handlePause);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      audio.removeEventListener("pause", handlePause);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [book, courseId, duration]);

  // Optional throttled progress save every 15s
  useEffect(() => {
    const userId = user?.user?.user_data?.uid || '';

    const interval = setInterval(() => {
      if (!audioRef.current || !book) return;
      const progress = getCompletion();
      if (progress > 0) {
        updateCourseProgress(courseId, userId, book.id, "in_progress", progress);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [book, courseId, duration]);

  // Reset on new book or popup open
 useEffect(() => {
    console.log('audio user', user)
    const userId = user?.user?.user_data?.uid || '';

  if (book && show && audioRef.current) {
    const audio = audioRef.current;

    const initAudio = async () => {
      try {
        // ✅ use book.id instead of moduleId
        const moduleCompletion = await getModuleCompletion(userId, book.id);
        const percent = moduleCompletion?.completed_in_percentage || 0;
        console.log(percent, "Completion percentage from API");
        setStartFromPercentage(percent);

        audio.src = book.audio;
        audio.load();

        // Reset states
        setIsPlaying(false);
        setIsMuted(false);
        setCurrentTime(0);
        setDuration(0);
        setMarked70(false);
        setPlaybackRate(1);
        setAutoplayBlocked(false);

        audio.muted = false;
        audio.playbackRate = 1;

        const handleLoadedMetadata = () => {
          if (percent > 0 && audio.duration) {
            const startTime = (percent / 100) * audio.duration;
            audio.currentTime = startTime;
            setCurrentTime(startTime);
          }

          audio
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => {
              setIsPlaying(false);
              setAutoplayBlocked(true);
            });
        };

        audio.addEventListener("loadedmetadata", handleLoadedMetadata);

        return () => {
          audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        };
      } catch (err) {
        console.error("Error initializing audio:", err);
      }
    };

    initAudio();
  }
}, [book, show]);


  // Close on outside click or Esc
  useEffect(() => {
    if (!show) return;

    const handleDocPointer = (e: MouseEvent | TouchEvent) => {
      if (contentRef.current && e.target instanceof Node && !contentRef.current.contains(e.target)) {
        onClose();
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleDocPointer);
    document.addEventListener("touchstart", handleDocPointer);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleDocPointer);
      document.removeEventListener("touchstart", handleDocPointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [show, onClose]);

  // Controls
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      setAutoplayBlocked(false);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    if (!audioRef.current) return;
    const newVolume = value[0];
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleProgressChange = (value: number[]) => {
    if (!audioRef.current) return;
    const newTime = (value[0] / 100) * duration;
    audioRef.current.currentTime = newTime;
    requestAnimationFrame(() => setCurrentTime(newTime));
  };

  const cyclePlaybackRate = () => {
    const rates = [1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    if (audioRef.current) audioRef.current.playbackRate = nextRate;
    setPlaybackRate(nextRate);
  };

  const skipForward = () => {
    if (audioRef.current) audioRef.current.currentTime = Math.min(audioRef.current.currentTime + 10, duration);
  };

  const skipBackward = () => {
    if (audioRef.current) audioRef.current.currentTime = Math.max(audioRef.current.currentTime - 10, 0);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!show || !book) return null;

  return (
    <div className={`popup ${show ? "show" : ""}`}>
      <div ref={contentRef} className="popup-content player" onClick={(e) => e.stopPropagation()}>
        {/* Book Info */}
        <img
          src={book.img}
          alt={book.title}
          style={{ width: 61, height: 71, borderRadius: 8, objectFit: "cover", marginRight: 15 }}
        />
        <div className="player-info">
          <div className="player-title">{book.title}</div>
          <div className="player-subtitle">{book.author}</div>
        </div>

        {/* Controls */}
        <div className="playback-section">
          <div className="player-controls">
            <Button className="control-btn" onClick={cyclePlaybackRate}>{playbackRate}x</Button>
            <Button className="control-btn" onClick={skipBackward}>&#9664;&#9664;</Button>
            <Button className="control-btn" onClick={togglePlayPause}>{isPlaying ? "⏸" : "▶"}</Button>
            <Button className="control-btn" onClick={skipForward}>&#9654;&#9654;</Button>
            <Button className="control-btn">CC</Button>
          </div>

          <div className="player-progress">
            <span>{formatTime(currentTime)}</span>
            <Slider
              value={[duration ? (currentTime / duration) * 100 : 0]}
              onValueChange={handleProgressChange}
              max={100}
              step={0.1}
              className="flex-1 pointer-events-none"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume */}
        <div className="player-volume">
          <Button className="control-btn" onClick={toggleMute}>{isMuted ? "🔇" : "🔊"}</Button>
          <Slider value={[volume]} onValueChange={handleVolumeChange} max={1} step={0.01} className="w-24" />
        </div>

        {/* Autoplay fallback */}
        {autoplayBlocked && (
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
        )}

        <audio ref={audioRef} controls={false} />
      </div>
    </div>
  );
};

export default AudioPlayer;
