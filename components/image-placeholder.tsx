"use client";

import { useState } from "react";

type ImagePlaceholderProps = {
  src: string;
  alt: string;
  label: string;
  ratio?: "hero" | "landscape" | "square";
  priority?: boolean;
};

export function ImagePlaceholder({ src, alt, label, ratio = "landscape", priority = false }: ImagePlaceholderProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`image-placeholder image-placeholder-${ratio}`}>
      {!failed ? (
        // Native img keeps stable, crawlable URLs while allowing missing owner-supplied assets to fall back at runtime.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          alt={alt}
          className="image-placeholder-image"
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          loading="eager"
          onError={() => setFailed(true)}
          src={src}
        />
      ) : null}
      <div aria-hidden={failed ? undefined : true} aria-label={failed ? alt : undefined} className="placeholder-pitch" role={failed ? "img" : undefined} />
      <span aria-hidden={!failed} className="placeholder-badge">ẢNH</span>
      <span aria-hidden={!failed}>{label}</span>
    </div>
  );
}
