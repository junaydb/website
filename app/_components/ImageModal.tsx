import { imageSize } from "image-size";
import { cacheLife } from "next/cache";

import ImageModalClient from "./ImageModalClient";

export interface ImageModalProps {
  src: string;
  alt: string;
}

export default async function ImageModal({ src, alt }: ImageModalProps) {
  "use cache";

  cacheLife("max");

  const response = await fetch(src);

  if (!response.ok) {
    throw new Error(`Failed to load image: ${src}`);
  }

  const { width, height } = imageSize(
    new Uint8Array(await response.arrayBuffer()),
  );

  return (
    <ImageModalClient
      src={src}
      alt={alt}
      width={width}
      height={height}
      optimise={src.includes("imagekit")}
    />
  );
}
