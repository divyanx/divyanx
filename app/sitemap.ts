import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/products",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/refund-policy",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteConfig.domain}${path}`,
      lastModified: new Date(),
    })),
    ...products.map((product) => ({
      url: `${siteConfig.domain}/product/${product.slug}`,
      lastModified: new Date(),
    })),
  ];
}
