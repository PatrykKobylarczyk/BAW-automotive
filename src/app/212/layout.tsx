import { Geist, Geist_Mono } from "next/font/google";

// The 212 brand speaks in its own type: Geist for text, Geist Mono for data (headings stay Archivo, wider cut).
const geist = Geist({ variable: "--font-geist", subsets: ["latin", "latin-ext"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin", "latin-ext"] });

/** The 212 landing keeps the BAW navbar and footer, with the green 212 identity in between (see .t212 in globals.css). */
export default function Layout({ children }: LayoutProps<"/212">) {
  return <div className={`t212 ${geist.variable} ${geistMono.variable} font-sans`}>{children}</div>;
}
