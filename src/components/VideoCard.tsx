"use client";

import { useCallback, useRef } from "react";
import ActionButtons from "@/components/ActionButtons";
import VideoOverlay from "@/components/VideoOverlay";
import VideoText from "@/components/VideoText";
import { useAutoPlayOnView } from "@/hooks/useAutoPlayOnView";
import { useLike } from "@/hooks/useLike";
import { useVideoPlayback } from "@/hooks/useVideoPlayback";
import { useVideoStatusOverlay } from "@/hooks/useVideoStatusOverlay";
import type { VideoItem } from "@/types/video";

type VideoCardProps = {
  video: VideoItem;
  isMuted: boolean;
  onToggleMuted: () => void;
};

export default function VideoCard({
  video,
  isMuted,
  onToggleMuted,
}: VideoCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const {
    videoRef,
    isPlaying,
    playVideo,
    pauseVideo,
    togglePlayback,
    markPlaying,
    markPaused,
  } = useVideoPlayback();
  const { showStatusIcon, flashStatusIcon } = useVideoStatusOverlay();
  const { isLiked, likesCount, toggleLike } = useLike(video.likesCount);

  useAutoPlayOnView({
    containerRef: cardRef,
    onEnter: playVideo,
    onLeave: pauseVideo,
  });

  const handleTogglePlay = useCallback(() => {
    void togglePlayback();
    flashStatusIcon();
  }, [flashStatusIcon, togglePlayback]);

  return (
    <article
      ref={cardRef}
      className="relative h-screen w-full snap-start snap-always overflow-hidden bg-black lg:flex lg:items-center lg:justify-center lg:px-8"
    >
      <div className="relative h-full w-full lg:flex lg:h-[94vh] lg:max-h-[930px] lg:w-auto lg:items-end lg:justify-center lg:gap-5">
        <div className="relative h-full w-full overflow-hidden bg-neutral-950 lg:aspect-[9/16] lg:h-full lg:w-auto lg:rounded-[28px] lg:border lg:border-white/10 lg:shadow-2xl">
          <video
            ref={videoRef}
            src={video.videoUrl}
            className="h-full w-full cursor-pointer object-cover"
            muted={isMuted}
            loop
            playsInline
            preload="metadata"
            role="button"
            tabIndex={0}
            aria-label="Play or pause video"
            onClick={handleTogglePlay}
            onPlay={markPlaying}
            onPause={markPaused}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleTogglePlay();
              }
            }}
          />

          <VideoOverlay
            isPlaying={isPlaying}
            isMuted={isMuted}
            showStatusIcon={showStatusIcon}
            onToggleMuted={onToggleMuted}
          />

          <VideoText
            authorName={video.authorName}
            description={video.description}
          />
        </div>

        <ActionButtons
          isLiked={isLiked}
          likesCount={likesCount}
          commentsCount={video.commentsCount}
          sharesCount={video.sharesCount}
          onToggleLike={toggleLike}
        />
      </div>
    </article>
  );
}
