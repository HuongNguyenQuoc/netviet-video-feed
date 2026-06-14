import { Pause, Play, Volume2, VolumeX } from "lucide-react";

type VideoOverlayProps = {
  isPlaying: boolean;
  isMuted: boolean;
  showStatusIcon: boolean;
  onToggleMuted: () => void;
};

export default function VideoOverlay({
  isPlaying,
  isMuted,
  showStatusIcon,
  onToggleMuted,
}: VideoOverlayProps) {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

      <button
        type="button"
        onClick={onToggleMuted}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
        aria-pressed={!isMuted}
        className="absolute left-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur transition active:scale-95"
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 z-40 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur transition duration-300 ${
          showStatusIcon ? "scale-100 opacity-100" : "scale-75 opacity-0"
        }`}
      >
        {isPlaying ? <Pause size={42} /> : <Play size={42} />}
      </div>
    </>
  );
}
