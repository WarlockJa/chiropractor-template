export default function Video({ videoId }: { videoId: string }) {
  return (
    <div className="my-4 aspect-video min-h-fit">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
        className="h-full w-full shadow-lg"
      />
    </div>
  );
}
