import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Closing";
import { JsonLd } from "@/components/PageParts";
import SmoothScroll from "@/components/SmoothScroll";
import { INDEXABLE, SITE_NAME, SITE_URL, organizationLd, pages } from "@/lib/seo";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin", "latin-ext"] });
const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "700", "800"],
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
    <html lang="pl" className={`${inter.variable} ${unbounded.variable} antialiased`}>
      <body className="font-sans">
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
