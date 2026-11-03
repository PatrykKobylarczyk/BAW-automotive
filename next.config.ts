import type { NextConfig } from "next";

/**
 * Addresses of the previous WordPress site on bawautomotive.pl. Each one moves permanently (308, treated by
 * Google like 301) to its new page, so rankings, backlinks and bookmarks keep working after the domain switch.
 * Trailing slashes ("/kontakt/") are redirected to the slash-less address by Next.js itself.
 */
const legacyRedirects: [string, string][] = [
  ["/about-us", "/o-marce"],
  ["/212-off-raod", "/modele/baw-212"],
  ["/212-off-raod-baw-automotive-polska", "/modele/baw-212"],
  ["/212-off-road", "/modele/baw-212"],
  ["/light-track", "/modele/baw-light-truck"],
  ["/light-truck", "/modele/baw-light-truck"],
  ["/mini-truck", "/modele/baw-mini-truck"],
  ["/slide-types/212", "/modele/baw-212"],
  ["/slide-types/212wn", "/modele/baw-212"],
  ["/slide-types/light-truck", "/modele/baw-light-truck"],
  ["/slide-types/mini-truck", "/modele/baw-mini-truck"],
  ["/cars", "/modele"],
  ["/locations", "/serwis"],
  ["/dealer-serwis", "/serwis"],
  ["/zostandealerem", "/zostan-dealerem"],
  ["/privacy-policy", "/polityka-prywatnosci"],
  ["/2019/09/16/hello-world", "/"],
  ["/category/:slug*", "/"],
  ["/wp-sitemap.xml", "/sitemap.xml"],
  ["/wp-sitemap-:name.xml", "/sitemap.xml"],
  ["/sitemap_index.xml", "/sitemap.xml"],
  ["/feed", "/"],
];

const nextConfig: NextConfig = {
  images: {
    // Zdjęcia tymczasowo pobierane z obecnej strony klienta.
    // Przed przełączeniem domeny przenieść je do /public i usunąć ten wpis (patrz README).
    remotePatterns: [new URL("https://bawautomotive.pl/wp-content/uploads/**")],
    qualities: [75, 90],
  },
  async redirects() {
    return legacyRedirects.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
