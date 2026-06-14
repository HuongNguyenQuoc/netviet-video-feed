type VideoTextProps = {
  authorName: string;
  description: string;
};

export default function VideoText({
  authorName,
  description,
}: VideoTextProps) {
  return (
    <div className="pointer-events-none absolute bottom-24 left-4 right-24 z-20 lg:bottom-8 lg:right-5">
      <p className="mb-2 text-base font-bold">{authorName}</p>
      <p className="line-clamp-3 text-sm leading-5 text-white/90">
        {description}
      </p>
    </div>
  );
}
