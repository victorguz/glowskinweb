"use client";

import Image from "next/image";
import { Volume2 } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

type VslVideoPlayerProps = {
  videoUrl?: string;
  title?: string;
  posterUrl?: string;
  className?: string;
};

type YoutubePlayer = {
  playVideo: () => void;
  unMute: () => void;
  destroy: () => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        config: {
          videoId: string;
          playerVars?: Record<string, string | number>;
          events?: {
            onReady?: (event: { target: YoutubePlayer }) => void;
          };
        },
      ) => YoutubePlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

let youtubeApiPromise: Promise<void> | null = null;

function loadYoutubeApi() {
  if (typeof window === "undefined") {
    return Promise.resolve();
  }

  if (window.YT?.Player) {
    return Promise.resolve();
  }

  if (youtubeApiPromise) {
    return youtubeApiPromise;
  }

  youtubeApiPromise = new Promise((resolve) => {
    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReady?.();
      resolve();
    };

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(script);
  });

  return youtubeApiPromise;
}

function extractYoutubeVideoId(videoUrl?: string) {
  if (!videoUrl) {
    return null;
  }

  try {
    const url = new URL(videoUrl);

    if (url.hostname.includes("youtu.be")) {
      return url.pathname.replace("/", "") || null;
    }

    if (url.pathname.includes("/shorts/")) {
      return url.pathname.split("/").filter(Boolean).pop() ?? null;
    }

    if (url.pathname.includes("/embed/")) {
      return url.pathname.split("/").filter(Boolean).pop() ?? null;
    }

    return url.searchParams.get("v");
  } catch {
    return null;
  }
}

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

function isYoutubeVideo(videoUrl?: string) {
  if (!videoUrl) {
    return false;
  }

  return (
    videoUrl.includes("youtube.com") ||
    videoUrl.includes("youtu.be") ||
    Boolean(extractYoutubeVideoId(videoUrl))
  );
}

function withAutoplay(embedUrl: string) {
  try {
    const url = new URL(embedUrl);
    url.searchParams.set("autoplay", "1");
    return url.toString();
  } catch {
    return embedUrl.includes("?")
      ? `${embedUrl}&autoplay=1`
      : `${embedUrl}?autoplay=1`;
  }
}

export function VslVideoPlayer({
  videoUrl,
  title = "Método Glow Skin",
  posterUrl,
  className = "",
}: VslVideoPlayerProps) {
  const playerContainerId = useId().replace(/:/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const youtubePlayerRef = useRef<YoutubePlayer | null>(null);
  const hasStartedRef = useRef(false);

  const embedUrl = normalizeVideoUrl(videoUrl);
  const hasVideo = Boolean(embedUrl);
  const isDirectVideo = isDirectVideoFile(embedUrl);
  const isYoutube = isYoutubeVideo(videoUrl ?? embedUrl);
  const youtubeVideoId = extractYoutubeVideoId(videoUrl ?? embedUrl);

  const [hasStarted, setHasStarted] = useState(false);
  const [showIframe, setShowIframe] = useState(false);

  const startPlayback = useCallback(async () => {
    if (hasStartedRef.current || !hasVideo) {
      return;
    }

    hasStartedRef.current = true;
    setHasStarted(true);

    if (isDirectVideo && videoRef.current) {
      videoRef.current.muted = false;
      await videoRef.current.play().catch(() => undefined);
      return;
    }

    if (isYoutube && youtubeVideoId) {
      setShowIframe(true);
      await loadYoutubeApi();

      if (!window.YT?.Player) {
        return;
      }

      youtubePlayerRef.current?.destroy();

      const isShort = videoUrl?.includes("/shorts/");
      const playerVars: Record<string, string | number> = {
        autoplay: 1,
        mute: 0,
        playsinline: 1,
        rel: 0,
        modestbranding: 1,
      };

      if (isShort) {
        playerVars.loop = 1;
        playerVars.playlist = youtubeVideoId;
      }

      youtubePlayerRef.current = new window.YT.Player(playerContainerId, {
        videoId: youtubeVideoId,
        playerVars,
        events: {
          onReady: (event) => {
            event.target.unMute();
            event.target.playVideo();
          },
        },
      });
      return;
    }

    setShowIframe(true);
    if (iframeRef.current) {
      iframeRef.current.src = withAutoplay(embedUrl);
    }
  }, [
    embedUrl,
    hasVideo,
    isDirectVideo,
    isYoutube,
    playerContainerId,
    videoUrl,
    youtubeVideoId,
  ]);

  useEffect(() => {
    if (hasStarted || !hasVideo) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [hasStarted, hasVideo]);

  useEffect(() => {
    return () => {
      youtubePlayerRef.current?.destroy();
      youtubePlayerRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (hasStarted || !hasVideo) {
      return;
    }

    const handleDocumentInteraction = (event: MouseEvent | TouchEvent) => {
      const target = event.target;
      if (!(target instanceof Node) || !containerRef.current?.contains(target)) {
        return;
      }

      void startPlayback();
    };

    document.addEventListener("click", handleDocumentInteraction);
    document.addEventListener("touchstart", handleDocumentInteraction, {
      passive: true,
    });

    return () => {
      document.removeEventListener("click", handleDocumentInteraction);
      document.removeEventListener("touchstart", handleDocumentInteraction);
    };
  }, [hasStarted, hasVideo, startPlayback]);

  const previewPoster =
    posterUrl ??
    (youtubeVideoId
      ? `https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`
      : undefined);

  return (
    <div className={`w-full relative ${className}`}>
      <div
        ref={containerRef}
        className="relative overflow-hidden aspect-[9/16] bg-black"
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            void startPlayback();
          }
        }}
        role="button"
        tabIndex={hasStarted ? -1 : 0}
        aria-label={
          hasStarted
            ? title
            : "Sube el volumen y da click a este video antes de continuar"
        }
      >
        {hasVideo ? (
          isDirectVideo ? (
            <video
              ref={videoRef}
              src={embedUrl}
              poster={posterUrl}
              className="absolute inset-0 h-full w-full object-cover"
              controls={hasStarted}
              playsInline
              preload="metadata"
            />
          ) : isYoutube ? (
            <>
              {!hasStarted && previewPoster ? (
                <Image
                  src={previewPoster}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover"
                  priority
                />
              ) : null}
              <div
                id={playerContainerId}
                className={`absolute inset-0 h-full w-full ${showIframe ? "" : "pointer-events-none opacity-0"}`}
              />
            </>
          ) : (
            <>
              {!hasStarted && previewPoster ? (
                <Image
                  src={previewPoster}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="object-cover"
                  priority
                />
              ) : null}
              <iframe
                ref={iframeRef}
                src={showIframe ? withAutoplay(embedUrl) : undefined}
                title={title}
                className={`absolute inset-0 h-full w-full ${showIframe ? "" : "pointer-events-none opacity-0"}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </>
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

        {hasVideo && !hasStarted ? (
          <div className="absolute inset-0 z-10 flex cursor-pointer flex-col items-center justify-center bg-black/55 px-8 text-center backdrop-blur-[3px]">
            <div className="vsl-volume-btn-ring mb-6 flex h-24 w-24 items-center justify-center rounded-full border-2 border-[#d4b499] bg-[#d4b499]/20 shadow-[0_0_0_0_rgba(212,180,153,0.55),0_0_48px_rgba(212,180,153,0.45)]">
              <Volume2
                size={42}
                className="text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                aria-hidden
              />
            </div>
            <p className="max-w-[280px] text-base font-bold uppercase leading-snug tracking-[0.12em] text-white drop-shadow-md">
              Sube el volumen y da click a este video antes de continuar
            </p>
          </div>
        ) : null}
      </div>

      <style>{`
        @keyframes vsl-volume-buzz {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          8% {
            transform: translate(-3px, 2px) rotate(-4deg) scale(1.06);
          }
          16% {
            transform: translate(3px, -2px) rotate(4deg) scale(1.08);
          }
          24% {
            transform: translate(-2px, -3px) rotate(-3deg) scale(1.06);
          }
          32% {
            transform: translate(2px, 3px) rotate(3deg) scale(1.08);
          }
          40% {
            transform: translate(-3px, -1px) rotate(-4deg) scale(1.07);
          }
          48% {
            transform: translate(3px, 1px) rotate(4deg) scale(1.08);
          }
          56% {
            transform: translate(-1px, 2px) rotate(-2deg) scale(1.05);
          }
          64% {
            transform: translate(1px, -2px) rotate(2deg) scale(1.06);
          }
          72% {
            transform: translate(-2px, 1px) rotate(-3deg) scale(1.07);
          }
          80% {
            transform: translate(2px, -1px) rotate(3deg) scale(1.06);
          }
          88% {
            transform: translate(-1px, -1px) rotate(-1deg) scale(1.04);
          }
        }

        @keyframes vsl-volume-ring {
          0% {
            box-shadow:
              0 0 0 0 rgba(212, 180, 153, 0.65),
              0 0 48px rgba(212, 180, 153, 0.45);
          }
          50% {
            box-shadow:
              0 0 0 14px rgba(212, 180, 153, 0),
              0 0 64px rgba(212, 180, 153, 0.65);
          }
          100% {
            box-shadow:
              0 0 0 0 rgba(212, 180, 153, 0),
              0 0 48px rgba(212, 180, 153, 0.45);
          }
        }

        .vsl-volume-btn-ring {
          animation:
            vsl-volume-buzz 0.55s ease-in-out infinite,
            vsl-volume-ring 1.2s ease-out infinite;
        }
      `}</style>
    </div>
  );
}
