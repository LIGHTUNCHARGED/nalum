import { useEffect, useRef, useState } from "react";

interface LoadingAnimationProps {
  onAnimationComplete?: () => void;
}

export function LoadingAnimation({
  onAnimationComplete,
}: LoadingAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [fadingOut, setFadingOut] = useState(false);
  const [hidden, setHidden] = useState(false);

  // When the video ends, start the fade-out
  const handleVideoEnd = () => {
    setFadingOut(true);
  };

  // Start fade-out 0.5s before the video ends so it overlaps the last frames
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (
      video &&
      !fadingOut &&
      video.duration &&
      video.currentTime >= video.duration - 0.5
    ) {
      setFadingOut(true);
    }
  };

  // When the CSS fade-out transition finishes, remove the overlay
  const handleTransitionEnd = () => {
    if (fadingOut) {
      setHidden(true);
      onAnimationComplete?.();
    }
  };

  // Safety fallback: if video fails to load, skip after 2s
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!fadingOut && !hidden) {
        setFadingOut(true);
      }
    }, 4800);
    return () => clearTimeout(timer);
  }, [fadingOut, hidden]);

  // Set playback speed to 1.25x
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.25;
    }
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
        paddingLeft: window.innerWidth >= 768 ? "8%" : "0",
        opacity: fadingOut ? 0 : 1,
        transition: "opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: fadingOut ? "none" : "auto",
      }}
      onTransitionEnd={handleTransitionEnd}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        onTimeUpdate={handleTimeUpdate}
        style={{
          width: "100%",
          objectFit: "contain",
        }}
      >
        <source src="/animation/intro.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
