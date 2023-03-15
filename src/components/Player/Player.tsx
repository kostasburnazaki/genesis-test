import React, { FC } from "react";
import { useRef, useState } from "react";

type Props = {
  url: string,
}

export const Player: FC<Props> = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgress = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      const currentTime = videoRef.current.currentTime;
      const progress = (currentTime / duration) * 100;
      setProgress(progress);
    }
  };

  return (
    <div>
      <video
        onTimeUpdate={handleProgress}
        ref={videoRef}
        width="100%"
        height="100%"
        controls
      >
        <source src={url} type="application/x-mpegURL" />
      </video>
      <div>
        <button onClick={togglePlay}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <progress value={progress} max="100" />
      </div>
    </div>
  )
}