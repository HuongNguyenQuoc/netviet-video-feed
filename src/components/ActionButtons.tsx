"use client";

import { formatCount } from "@/utils/formatCount";
import { Heart, MessageCircle, Share2 } from "lucide-react";

type ActionButtonProps = {
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  onToggleLike: () => void;
};

export default function ActionButtons({
  isLiked,
  likesCount,
  commentsCount,
  sharesCount,
  onToggleLike,
}: ActionButtonProps) {
  return (
    <div className="absolute bottom-24 right-4 z-30 flex flex-col items-center gap-5 lg:static lg:mb-2 lg:shrink-0">
      <button
        type="button"
        onClick={onToggleLike}
        className="group flex flex-col items-center gap-1"
        aria-label="Like video"
      >
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-full bg-black/35 backdrop-blur transition group-active:scale-90 ${
            isLiked ? "text-red-500" : "text-white"
          }`}
        >
          <Heart size={28} fill={isLiked ? "currentColor" : "none"} />
        </span>

        <span className="text-xs font-semibold text-white sm:hidden">
          {formatCount(likesCount, true)}
        </span>

        <span className="hidden text-xs font-semibold text-white sm:inline">
          {formatCount(likesCount, false)}
        </span>
      </button>

      <button
        type="button"
        className="group flex flex-col items-center gap-1"
        aria-label="Open comments"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition group-active:scale-90">
          <MessageCircle size={28} />
        </span>

        <span className="text-xs font-semibold text-white sm:hidden">
          {formatCount(commentsCount, true)}
        </span>
        <span className="hidden text-xs font-semibold text-white sm:inline">
          {formatCount(commentsCount, false)}
        </span>
      </button>

      <button
        type="button"
        className="group flex flex-col items-center gap-1"
        aria-label="Share video"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition group-active:scale-90">
          <Share2 size={28} />
        </span>

        <span className="text-xs font-semibold text-white sm:hidden">
          {formatCount(sharesCount, true)}
        </span>
        <span className="hidden text-xs font-semibold text-white sm:inline">
          {formatCount(sharesCount, false)}
        </span>
      </button>
    </div>
  );
}
