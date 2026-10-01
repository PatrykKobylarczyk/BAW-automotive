import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin", "latin-ext"] });
const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "700", "800"],
});

export const metadata: Metadata = {
  title: "BAW Automotive Polska — oficjalny importer samochodów BAW",
  description:
    "BAW 212 Off-Road, Light Truck i elektryczny Mini Truck. Oficjalny importer i dealer samochodów BAW w Polsce.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className={`${inter.variable} ${unbounded.variable} antialiased`}>
      <body className="font-sans">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
