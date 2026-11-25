import type { MetadataRoute } from "next";
import { modelVersions, versionHref, type VersionModel } from "@/lib/content";
import { pages, url } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const versionPages = (Object.keys(modelVersions) as VersionModel[]).flatMap((m) =>
    modelVersions[m]
      .filter((v) => v.slug)
      .map((v) => ({ url: url(versionHref(m, v)), lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 })),
  );
  return [
    ...Object.values(pages).map((p) => ({
      url: url(p.path),
      lastModified: new Date(),
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...versionPages,
  ];
}
