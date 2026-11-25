import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Info } from "lucide-react";
import { Contact } from "./Closing";
import ModelGallery from "./ModelGallery";
import { Breadcrumbs, OtherModels, Section, SpecTable } from "./PageParts";
import { Eyebrow, MagneticButton, Reveal, SplitText } from "./ui";
import {
  gallery212,
  grossOf,
  lightTruckGallery,
  modelBySlug,
  modelVersions,
  netOf,
  priceList,
  versionHref,
  zl,
  type GalleryImage,
  type ModelVersion,
  type VersionModel,
} from "@/lib/content";
import { url } from "@/lib/seo";
import { pageTitle, pageTop } from "@/lib/styles";

const galleries: Partial<Record<VersionModel, GalleryImage[]>> = {
  "baw-212": gallery212,
  "baw-light-truck": lightTruckGallery,
};

/**
 * Versions whose technical data is not confirmed yet (project files, dane-techniczne/brakujace-dane-do-akceptacji.md).
 * Their pages leave out the model's spec table, which describes another version.
 */
const unconfirmedSpecs = new Set(["baw-212/pick-up", "baw-212/mavero"]);

export const versionParams = (model: VersionModel) =>
  modelVersions[model].filter((v) => v.slug).map((v) => ({ wersja: v.slug! }));

/** "T01 Pick-up", "Mavero", "Kontener": the version's name without the model's */
const shortName = (v: ModelVersion) => v.name.replace(/^(212 |Light Truck |Mini Truck )/, "");

function find(model: VersionModel, slug: string) {
  return modelVersions[model].find((v) => v.slug === slug);
}

function priceRows(v: ModelVersion) {
  return priceList.filter(
    (p) => p.model === v.price.model && (p.version === v.price.version || v.alsoVersions?.includes(p.version)),
  );
}

export function versionMetadata(model: VersionModel, slug: string): Metadata {
  const v = find(model, slug);
  if (!v) return {};
  const row = priceRows(v)[0];
  const title = `BAW ${v.name} — od ${zl(grossOf(row))} zł`;
  const path = versionHref(model, v);
  return {
    title,
    description: `${v.lead} Cena od ${zl(grossOf(row))} zł brutto. Zapytaj o ofertę u oficjalnego importera BAW.`,
    alternates: { canonical: path },
    openGraph: { type: "website", locale: "pl_PL", url: path, title, images: v.img ? [{ url: v.img }] : undefined },
  };
}

/** Page of one version of a model: its photo, what sets it apart, price, its photos and the way back to the other versions. */
export default function VersionPage({ model, slug }: { model: VersionModel; slug: string }) {
  const v = find(model, slug);
  if (!v) notFound();
  const m = modelBySlug(model);
  const rows = priceRows(v);
  const siblings = modelVersions[model];
  const photos = (galleries[model] ?? []).filter((g) => typeof g !== "string" && g.tag === v.galleryTag);
  const showSpecs = !unconfirmedSpecs.has(`${model}/${slug}`);
  const path = versionHref(model, v);

  return (
    <main className="relative">
      <Breadcrumbs
        page={model}
        extra={{ label: shortName(v), path }}
        className="absolute inset-x-0 top-0 z-10 pt-32 md:pt-40"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["Product", "Car"],
            name: `BAW ${v.name}`,
            description: v.lead,
            ...(v.img ? { image: url(v.img) } : {}),
            brand: { "@type": "Brand", name: "BAW" },
            url: url(path),
            offers: { "@type": "Offer", price: grossOf(rows[0]), priceCurrency: "PLN", url: url(path) },
          }).replace(/</g, "\\u003c"),
        }}
      />

      <section className={`relative overflow-hidden pb-24 md:pb-32 ${pageTop}`}>
        <div className="text-outline-faint pointer-events-none absolute top-24 right-0 font-display text-[clamp(120px,22vw,340px)] leading-none font-extrabold whitespace-nowrap select-none">
          {v.name.split(" ").pop()?.toUpperCase()}
        </div>
        <div className="relative mx-auto grid max-w-[1280px] items-start gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          <div>
            <Reveal>
              <Eyebrow>{v.category ?? m.category}</Eyebrow>
            </Reveal>
            <SplitText as="h1" animateOnMount text={`BAW ${v.name}`} className={`mt-5 mb-6 ${pageTitle}`} />
            <Reveal delay={0.1}>
              <span className="inline-block rounded-full border border-white/15 px-3 py-1 text-xs font-semibold tracking-wider text-white/70 uppercase">
                {v.badge}
              </span>
              <p className="mt-5 text-lg text-white/80">{v.lead}</p>
              <ul className="mt-6 space-y-3">
                {v.points.map((p) => (
                  <li key={p} className="flex gap-3 text-white/85">
                    <Check className="mt-0.5 size-5 shrink-0 text-brand" /> {p}
                  </li>
                ))}
              </ul>
              {v.note && (
                <p className="mt-6 flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/65">
                  <Info className="mt-0.5 size-4 shrink-0 text-brand" /> {v.note}
                </p>
              )}
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 space-y-3">
                {rows.map((r) => (
                  <div key={r.version}>
                    {rows.length > 1 && <span className="block text-[13px] text-white/70">{r.version}</span>}
                    <strong className="font-display text-3xl font-bold md:text-4xl">od {zl(grossOf(r))} zł</strong>
                    <span className="ml-2 text-sm text-muted">brutto</span>
                    <span className="block text-[13px] text-muted">{zl(netOf(r))} zł netto</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <MagneticButton href="#kontakt" className="justify-center">
                  Zapytaj o tę wersję
                </MagneticButton>
                <Link
                  href={`/modele/${model}#wersje`}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-[15px] text-[15px] font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
                >
                  <ArrowLeft className="size-4 text-brand" /> Wszystkie wersje
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="order-first lg:sticky lg:top-28 lg:order-none">
            <div className="relative aspect-[16/11]">
              <div className="absolute top-[62%] left-1/2 h-1/3 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/35 blur-[70px]" />
              {v.img ? (
                <Image
                  src={v.img}
                  alt={`BAW ${v.name}`}
                  fill
                  priority
                  sizes="(max-width:1024px) 100vw, 680px"
                  className="object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,.55)]"
                />
              ) : (
                <div className="absolute inset-[6%] grid place-items-center rounded-3xl border border-dashed border-white/15">
                  <span className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-white/60">Zdjęcia wkrótce</span>
                </div>
              )}
            </div>
            {/* The other versions of the same model, each with its own page */}
            <nav aria-label={`Wersje ${m.short}`} className="mt-8 flex flex-wrap justify-center gap-2">
              {siblings.map((s) => {
                const on = s.id === v.id;
                return (
                  <Link
                    key={s.id}
                    href={versionHref(model, s)}
                    aria-current={on ? "page" : undefined}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                      on ? "border-brand bg-brand text-white" : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    {shortName(s)}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </section>

      {photos.length > 0 && <ModelGallery title={`BAW ${v.name} z każdej strony`} alt={`BAW ${v.name}`} images={photos} fit="contain" />}

      {showSpecs ? (
        <SpecTable model={m} />
      ) : (
        <Section eyebrow="Dane techniczne" title={`BAW ${v.name} — dane techniczne`}>
          <p className="max-w-[60ch] text-lg text-white/75">
            Pełną kartę techniczną tej wersji potwierdzamy z importerem. Do tego czasu szczegóły podamy w ofercie: zostaw
            kontakt w formularzu poniżej.
          </p>
        </Section>
      )}

      <OtherModels current={model} />
      <Contact title={`Zapytaj o BAW ${v.name}.`} defaultModel={v.leadModel ?? ""} />
    </main>
  );
}
