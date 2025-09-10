"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface Book {
  title: string;
  author: string;
  tag: string[];
  desc: string;
  img: string;
  audio: string;
}

interface AudioPlayerProps {
  show: boolean;
  book: Book | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  userId?: string;
}

const AudioPlayer = ({
  show,
  book,
  onClose,
  onNext,
  onPrev,
  userId = "guest",
}: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [marked70, setMarked70] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // ✅ Track progress + save to localStorage
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !book) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);

      if (
        !marked70 &&
        audio.duration > 0 &&
        audio.currentTime / audio.duration >= 0.7 &&
        book
      ) {
        setMarked70(true);

        try {
          const stored = JSON.parse(localStorage.getItem("completedBooks") || "{}");

          if (!stored[userId]) stored[userId] = [];

          // ✅ prevent duplicate same book
          const alreadyExists = stored[userId].some(
            (b: any) => b.bookName === book.title
          );

          if (!alreadyExists) {
            stored[userId].push({
              bookName: book.title,
              progress: Math.round((audio.currentTime / audio.duration) * 100),
              timestamp: new Date().toISOString(),
            });

            localStorage.setItem("completedBooks", JSON.stringify(stored));
            console.log("✅ Stored 70% completion:", userId, book.title, stored);
          } else {
            console.log("⚠️ Already stored:", book.title);
          }
        } catch (err) {
          console.error("❌ Error storing to localStorage:", err);
        }
      }
    };

    const updateDuration = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", onNext);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", onNext);
    };
  }, [book, duration, marked70, onNext, userId]);

  // Reset when new book is loaded
  useEffect(() => {
    if (book && audioRef.current) {
      audioRef.current.src = book.audio;
      audioRef.current.load();
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      setMarked70(false);
    }
  }, [book]);

  // Close on outside click or Esc
  useEffect(() => {
    if (!show) return;

    const handleDocPointer = (e: MouseEvent | TouchEvent) => {
      if (
        contentRef.current &&
        e.target instanceof Node &&
        !contentRef.current.contains(e.target)
      ) {
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
    setCurrentTime(newTime);
  };

  const cyclePlaybackRate = () => {
    const rates = [1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
    setPlaybackRate(nextRate);
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.currentTime + 10,
        duration
      );
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        audioRef.current.currentTime - 10,
        0
      );
    }
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
      <div
        ref={contentRef}
        className="popup-content player"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={book.img}
          alt={book.title}
          style={{
            width: "61px",
            height: "71px",
            borderRadius: "8px",
            objectFit: "cover",
            marginRight: "15px",
          }}
        />
        <div className="player-info">
          <div className="player-title">{book.title}</div>
          <div className="player-subtitle">{book.author}</div>
        </div>

        <div className="playback-section">
          <div className="player-controls">
            <Button className="control-btn" onClick={cyclePlaybackRate}>
              {playbackRate}x
            </Button>
            <Button className="control-btn" onClick={skipBackward}>
               <span>&#9664;&#9664;</span>
            </Button>
            <Button className="control-btn" onClick={togglePlayPause}>
              {isPlaying ? "⏸" : "▶"}
            </Button>
            <Button className="control-btn" onClick={skipForward}>
              <span>&#9654;&#9654;</span>
            </Button>
            <Button className="control-btn">CC</Button>
          </div>

          <div className="player-progress">
            <span>{formatTime(currentTime)}</span>
            <Slider
              value={[duration ? (currentTime / duration) * 100 : 0]}
              onValueChange={handleProgressChange}
              max={100}
              step={0.1}
              className="flex-1"
            />
            <span>{formatTime(duration)}</span>
          </div>
        </div>

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

        {/* ✅ hidden audio element */}
        <audio ref={audioRef} controls={false} />
      </div>
    </div>
  );
};

export default AudioPlayer;
