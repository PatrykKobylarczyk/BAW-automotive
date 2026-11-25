import type { Metadata } from "next";
import VersionPage, { versionMetadata, versionParams } from "@/components/VersionPage";

export const dynamicParams = false;
export const generateStaticParams = () => versionParams("baw-mini-truck");

export async function generateMetadata({ params }: PageProps<"/modele/baw-mini-truck/[wersja]">): Promise<Metadata> {
  return versionMetadata("baw-mini-truck", (await params).wersja);
}

export default async function Page({ params }: PageProps<"/modele/baw-mini-truck/[wersja]">) {
  return <VersionPage model="baw-mini-truck" slug={(await params).wersja} />;
}
