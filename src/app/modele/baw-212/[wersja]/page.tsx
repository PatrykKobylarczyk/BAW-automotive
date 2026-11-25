import type { Metadata } from "next";
import VersionPage, { versionMetadata, versionParams } from "@/components/VersionPage";

export const dynamicParams = false;
export const generateStaticParams = () => versionParams("baw-212");

export async function generateMetadata({ params }: PageProps<"/modele/baw-212/[wersja]">): Promise<Metadata> {
  return versionMetadata("baw-212", (await params).wersja);
}

export default async function Page({ params }: PageProps<"/modele/baw-212/[wersja]">) {
  return <VersionPage model="baw-212" slug={(await params).wersja} />;
}
