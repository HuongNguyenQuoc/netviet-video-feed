"use client";

import { Pause, Play } from "lucide-react";
import { useCallback, useEffect, useState, useRef } from "react";
import ActionButtons from "@/components/ActionButtons";
import type { VideoItem } from "@/types/video";
import { AUTO_PLAY_THRESHOLD, STATUS_ICON_DURATION_MS } from "@/constants/video";

type VideoCardProps = {
  video: VideoItem;
};

export default function VideoCard({ video }: VideoCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const statusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showStatusIcon, setShowStatusIcon] = useState(false);

  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(video.likesCount);

  const flashStatusIcon = useCallback(() => {
    setShowStatusIcon(true);

    if (statusTimerRef.current) {
      clearTimeout(statusTimerRef.current);
    }

    statusTimerRef.current = setTimeout(() => {
      setShowStatusIcon(false);
    }, STATUS_ICON_DURATION_MS);
  }, []);

  const playVideo = useCallback(async () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    try {
      await videoElement.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);
  
  const pauseVideo = useCallback(() => {
    const videoELement = videoRef.current;
    if (!videoELement) return;
    videoELement.pause();
    setIsPlaying(false);
  }, []);

  const handleTogglePlay = useCallback(async () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    if (videoElement.paused) {
      await playVideo()
    } else {
      pauseVideo();
    }

    flashStatusIcon();
  }, [flashStatusIcon, pauseVideo, playVideo]);

  const handleToggleLike = useCallback(() => {
    setIsLiked((currentValue) => {
      const nextValue = !currentValue;

      setLikesCount((currentCount) => {
        return nextValue ? currentCount + 1 : currentCount - 1;
      });
      
      return nextValue;
    });
  }, []);

  useEffect(() => {
    const cardElement = cardRef.current;
    if (!cardElement) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && entry.intersectionRatio >= AUTO_PLAY_THRESHOLD) {
          void playVideo();
        } else {
          pauseVideo();
        }
      },
      {
        threshold: [0, 0.7, 1],
      },
    );

    observer.observe(cardElement);

    return () => {
      observer.unobserve(cardElement);
      observer.disconnect();
    };
  }, [pauseVideo, playVideo]);

  useEffect(() => {
    return () => {
      if (statusTimerRef.current) {
        clearTimeout(statusTimerRef.current);
      }
    };
  }, []);

  return (
    <article 
      ref={cardRef}
      className="relative h-screen w-full snap-start snap-always overflow-hidden bg-black lg:flex lg:items-center lg:justify-center lg:px-4"
    >
      <div className="relative h-full w-full overflow-hidden bg-neutral-950 lg:aspect-[9/16] lg:h-[92vh] lg:max-h-[820px] lg:max-w-[430px] 
        lg:rounded-[28px] lg:border lg:border-white/10 lg:shadow-2xl">
        <video
          ref={videoRef}
          src={video.videoUrl}
          className="h-full w-full cursor-pointer object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          role="button"
          tabIndex={0}
          aria-label="Play or pause video"
          onClick={handleTogglePlay}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              void handleTogglePlay();
            }
          }}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

        <div className="pointer-events-none absolute bottom-28 left-4 right-24 z-20 sm:bottom-10 lg:bottom-8">
          <p className="mb-2 text-base font-bold">{video.authorName}</p>
          <p className="line-clamp-3 text-sm leading-5 text-white/90">
            {video.description}
          </p>
        </div>
        
        <ActionButtons
          isLiked={isLiked}
          likesCount={likesCount}
          commentsCount={video.commentsCount}
          sharesCount={video.sharesCount}
          onToggleLike={handleToggleLike}
        />

        <div className={`pointer-events-none absolute left-1/2 top-1/2 z-40 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 
          items-center justify-center rounded-full bg-black/45 text-white backdrop-blur transition duration-300 ${
            showStatusIcon ? "scale-100 opacity-100" : "scale-75 opacity-0"
          }`}
        >
          {isPlaying ? <Pause size={42} /> : <Play size={42} />}
        </div>
      </div>
    </article>
  );
}