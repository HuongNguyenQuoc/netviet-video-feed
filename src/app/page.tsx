import AppNavigation from "@/components/AppNavigation";
import VideoFeed from "@/components/VideoFeed";

export default function HomePage() {
  return (
    <div className="min-h-[100dvh] bg-black text-white lg:pl-24"> {/* lg:pl-24 adds left padding on large screens */}
      <AppNavigation /> {/* renders the sidebar on desktop and bottom navigation on mobile */}
      <VideoFeed />
    </div> 
  );
}
