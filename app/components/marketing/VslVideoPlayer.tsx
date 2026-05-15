import Image from "next/image";

type VslVideoPlayerProps = {
  videoUrl?: string;
  title?: string;
  posterUrl?: string;
  className?: string;
};

function normalizeVideoUrl(videoUrl?: string) {
  if (!videoUrl) {
    return "";
  }

  if (videoUrl.includes("youtube.com/watch")) {
    try {
      const url = new URL(videoUrl);
      const videoId = url.searchParams.get("v");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
      }
    } catch {
      return videoUrl;
    }
  }

  if (videoUrl.includes("youtu.be/")) {
    try {
      const url = new URL(videoUrl);
      const videoId = url.pathname.replace("/", "");
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
      }
    } catch {
      return videoUrl;
    }
  }

  if (videoUrl.includes("youtube.com/shorts/")) {
    try {
      const url = new URL(videoUrl);
      const videoId = url.pathname.split("/").filter(Boolean).pop();
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&loop=1&playlist=${videoId}`;
      }
    } catch {
      return videoUrl;
    }
  }

  if (
    videoUrl.includes("vimeo.com/") &&
    !videoUrl.includes("player.vimeo.com")
  ) {
    try {
      const url = new URL(videoUrl);
      const videoId = url.pathname.split("/").filter(Boolean).pop();
      if (videoId) {
        return `https://player.vimeo.com/video/${videoId}`;
      }
    } catch {
      return videoUrl;
    }
  }

  return videoUrl;
}

function isDirectVideoFile(videoUrl?: string) {
  if (!videoUrl) {
    return false;
  }

  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(videoUrl);
}

export function VslVideoPlayer({
  videoUrl,
  title = "Método Glow Skin",
  posterUrl,
  className = "",
}: VslVideoPlayerProps) {
  const embedUrl = normalizeVideoUrl(videoUrl);
  const hasVideo = Boolean(embedUrl);
  const isDirectVideo = isDirectVideoFile(embedUrl);

  return (
    <div className={`w-full relative ${className}`}>
      <div className="relative overflow-hidden aspect-[9/16] bg-black">
        {hasVideo ? (
          isDirectVideo ? (
            <video
              src={embedUrl}
              poster={posterUrl}
              className="absolute inset-0 h-full w-full object-cover"
              controls
              playsInline
              preload="metadata"
            />
          ) : (
            <iframe
              src={embedUrl}
              title={title}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          )
        ) : (
          <div className="absolute inset-0">
            {posterUrl ? (
              <Image
                src={posterUrl}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover opacity-75"
              />
            ) : null}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,18,12,0.18),rgba(27,18,12,0.72))]" />
            <div className="absolute inset-x-6 top-6 rounded-2xl border border-white/15 bg-black/20 px-4 py-3 text-left backdrop-blur-sm">
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-[#d4b499]">
                Espacio para tu VSL
              </p>
              <p className="mt-2 text-sm text-white/80">
                Pega aquí el link del video embebible y este bloque lo mostrará
                con estilo VSL.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
