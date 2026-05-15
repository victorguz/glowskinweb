"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";

type InstagramEmbedProps = {
  permalink: string; // e.g. "https://www.instagram.com/reel/DUKDP1jEbPS/"
  className?: string;
};

export function InstagramEmbed({
  permalink,
  className = "",
}: InstagramEmbedProps) {
  const processed = useRef(false);
  const cleanUrl = permalink.split("?")[0].replace(/\/$/, "") + "/";
  const embedUrl = `${cleanUrl}?utm_source=ig_embed&utm_campaign=loading`;

  useEffect(() => {
    if (processed.current) return;
    // If embed.js already loaded (e.g. hot-reload), re-process manually
    if (
      typeof window !== "undefined" &&
      (window as { instgrm?: { Embeds: { process: () => void } } }).instgrm
    ) {
      (
        window as { instgrm?: { Embeds: { process: () => void } } }
      ).instgrm!.Embeds.process();
      processed.current = true;
    }
  }, []);

  return (
    <div className={`w-full flex justify-center ${className}`}>
      <blockquote
        className="instagram-media"
        data-instgrm-captioned
        data-instgrm-permalink={embedUrl}
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: 0,
          borderRadius: "3px",
          margin: "1px auto",
          maxWidth: "340px",
          minWidth: "280px",
          padding: 0,
          width: "100%",
        }}
      />
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (
            typeof window !== "undefined" &&
            (window as { instgrm?: { Embeds: { process: () => void } } })
              .instgrm
          ) {
            (
              window as { instgrm?: { Embeds: { process: () => void } } }
            ).instgrm!.Embeds.process();
            processed.current = true;
          }
        }}
      />
    </div>
  );
}
