"use client";

import Image from "next/image";
import type { ImageLoaderProps, ImageProps } from "next/image";
import { forwardRef } from "react";

const imageKitUrlEndpoint = "https://ik.imagekit.io/xqhypdkfa";

export function imageKitLoader({ src, width, quality = 75 }: ImageLoaderProps) {
  const imageUrl = src.startsWith("http")
    ? src
    : `${imageKitUrlEndpoint}${src.startsWith("/") ? "" : "/"}${src}`;

  return `${imageUrl}/tr:w-${width},q-${quality}`;
}

const ImageKitImage = forwardRef<HTMLImageElement, ImageProps>(
  function ImageKitImage({ alt, ...props }, ref) {
    return <Image {...props} ref={ref} loader={imageKitLoader} alt={alt} />;
  },
);

export default ImageKitImage;
