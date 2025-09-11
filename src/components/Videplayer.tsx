"use client";
import { useEffect, useRef } from "react";

export default function VideoPlayer({src, poster, key }: { src: string; poster?: string; key:string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;


    // For Firefox or browsers that don’t support CSS pointer-events on timeline
    let lastTime = 0;
    const handleTimeUpdate = () => {
      console.log('handleTimeUpdate', video.currentTime - lastTime)
      if ( video.currentTime - lastTime > 1 ){
        handleSeeking();
        return;
      }
      lastTime = video.currentTime;
    };
    const handleSeeking = () => {
      if (video.currentTime > lastTime + 0.01) {
        video.currentTime = lastTime; // only snap back if user tries to skip forward
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("seeking", handleSeeking);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("seeking", handleSeeking);
    };
  }, []);


  return (
    <video
      key={key}
      ref={videoRef}
      src={src}
      controls
      className="rounded-lg w-full disable_seek"
      poster={poster}
      onEnded={() => console.log("Playback ended")}
    />
  );
}
