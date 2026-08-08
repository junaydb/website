import type { Metadata } from "next";

export const siteUrl = new URL("https://junaydb.com");
const defaultTitle = "Junayd Bhoyroo";
const defaultDescription = "Junayd Bhoyroo's portfolio";
const openGraphImage =
  "https://ik.imagekit.io/xqhypdkfa/web/brand-gradient.jpg?tr=w-1200,h-630";

interface CreateMetadataOptions {
  title?: string;
  description?: string;
  canonicalPath?: string;
}

export function createMetadata({
  title = defaultTitle,
  description = defaultDescription,
  canonicalPath = "/",
}: CreateMetadataOptions = {}): Metadata {
  return {
    metadataBase: siteUrl,
    title,
    description,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonicalPath,
      images: [
        {
          url: openGraphImage,
          width: 1200,
          height: 630,
          alt: "Brand gradient",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: openGraphImage,
          alt: "Brand gradient",
        },
      ],
    },
  };
}
