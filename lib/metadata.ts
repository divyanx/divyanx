import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

type CreateMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function createMetadata({
  title,
  description,
  path,
}: CreateMetadataInput): Metadata {
  return {
    metadataBase: new URL(siteConfig.domain),
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: siteConfig.studioName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
