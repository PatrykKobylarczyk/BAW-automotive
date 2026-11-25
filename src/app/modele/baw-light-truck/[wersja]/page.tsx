import type { Metadata } from "next";
import VersionPage, { versionMetadata, versionParams } from "@/components/VersionPage";

export const dynamicParams = false;
export const generateStaticParams = () => versionParams("baw-light-truck");

export async function generateMetadata({ params }: PageProps<"/modele/baw-light-truck/[wersja]">): Promise<Metadata> {
  return versionMetadata("baw-light-truck", (await params).wersja);
}

export default async function Page({ params }: PageProps<"/modele/baw-light-truck/[wersja]">) {
  return <VersionPage model="baw-light-truck" slug={(await params).wersja} />;
}
