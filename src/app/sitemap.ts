import type { MetadataRoute } from "next";
import { pages, url } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(pages).map((p) => ({
    url: url(p.path),
    lastModified: new Date(),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
