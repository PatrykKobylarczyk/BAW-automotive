import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Closing";
import { JsonLd } from "@/components/PageParts";
import SmoothScroll from "@/components/SmoothScroll";
import LogoIntro, { INTRO_SCRIPT } from "@/components/LogoIntro";
import { INDEXABLE, SITE_NAME, SITE_URL, organizationLd, pages } from "@/lib/seo";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin", "latin-ext"] });
// Headings: Archivo in its expanded width, straight-sided and modern.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: pages.home.title, template: "%s | BAW Polska" },
  description: pages.home.description,
  applicationName: SITE_NAME,
  robots: INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: { type: "website", locale: "pl_PL", siteName: SITE_NAME },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className={`${inter.variable} ${archivo.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Przed pierwszym malowaniem: czy pokazać ekran startowy z logo (raz na sesję, bez reduced-motion) */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_SCRIPT }} />
      </head>
      <body className="font-sans">
        <LogoIntro />
        <JsonLd data={organizationLd} />
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
