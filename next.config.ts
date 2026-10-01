import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Zdjęcia tymczasowo pobierane z obecnej strony klienta.
    // Docelowo przenieść je do /public i usunąć ten wpis.
    remotePatterns: [new URL("https://bawautomotive.pl/wp-content/uploads/**")],
    qualities: [75, 90],
  },
};

export default nextConfig;
