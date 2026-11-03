import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, ChevronRight, Plus } from "lucide-react";
import type { ReactNode } from "react";
import { models, type Model } from "@/lib/content";
import { breadcrumbLd, trail, type PageKey } from "@/lib/seo";
import { Eyebrow, Reveal, SplitText } from "./ui";

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function Breadcrumbs({ page, className = "" }: { page: PageKey; className?: string }) {
  const crumbs = trail(page);
  return (
    <>
      <JsonLd data={breadcrumbLd(page)} />
      <nav aria-label="Ścieżka" className={`mx-auto max-w-[1280px] px-5 md:px-8 ${className}`}>
        <ol className="flex flex-wrap items-center gap-1.5 text-[13px] text-muted">
          {crumbs.map((c, i) => (
            <li key={c.path} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="size-3.5 opacity-50" />}
              {i < crumbs.length - 1 ? (
                <Link href={c.path} className="transition hover:text-white">
                  {c.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-white/80">
                  {c.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

/** Top of a sub-page: breadcrumbs, eyebrow, the page's single h1 and a lead paragraph. */
export function PageHeader({
  page,
  eyebrow,
  title,
  lead,
  children,
}: {
  page: PageKey;
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-white/10 pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="pointer-events-none absolute -top-40 -right-40 size-[520px] rounded-full bg-[radial-gradient(var(--color-brand),transparent_70%)] opacity-20" />
      <Breadcrumbs page={page} className="relative mb-10" />
      <div className="relative mx-auto max-w-[1280px] px-5 md:px-8">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
        <SplitText
          as="h1"
          animateOnMount
          delay={0.1}
          text={title}
          className="mt-5 max-w-[20ch] font-display text-[clamp(36px,5.6vw,80px)] leading-[1.02] font-extrabold tracking-tight"
        />
        {lead && (
          <Reveal delay={0.25}>
            <p className="mt-7 max-w-[60ch] text-lg text-white/75 md:text-xl">{lead}</p>
          </Reveal>
        )}
        {children}
      </div>
    </header>
  );
}

/** Plain readable prose block for text-heavy sections (dealer, service, privacy). */
export function Prose({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`max-w-[72ch] space-y-5 text-white/80 [&_a]:text-brand [&_a]:underline-offset-4 hover:[&_a]:underline [&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h3]:mt-8 [&_h3]:font-semibold [&_h3]:text-white [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 ${className}`}
    >
      {children}
    </div>
  );
}

export function Section({
  eyebrow,
  title,
  children,
  className = "",
  id,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-24 md:py-32 ${className}`}>
      <div className="mx-auto max-w-[1280px] px-5 md:px-8">
        {eyebrow && (
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
        )}
        <SplitText
          text={title}
          className="mt-5 mb-12 max-w-[22ch] font-display text-[clamp(30px,3.8vw,52px)] leading-[1.05] font-bold tracking-tight"
        />
        {children}
      </div>
    </section>
  );
}

export function Highlights({ model }: { model: Model }) {
  return (
    <Section eyebrow="Wyposażenie i cechy" title={`${model.name} — najważniejsze cechy`} className="bg-ink-2">
      <ul className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2">
        {model.highlights.map((h) => (
          <li key={h} className="flex gap-4 bg-ink-2 p-6 md:p-8">
            <Check className="mt-0.5 size-5 shrink-0 text-brand" />
            <span className="text-white/85">{h}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function SpecTable({ model }: { model: Model }) {
  return (
    <Section eyebrow="Dane techniczne" title={`${model.name} — dane techniczne`}>
      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="overflow-hidden rounded-3xl border border-white/10">
          <table className="w-full text-left text-[15px]">
            <caption className="sr-only">Dane techniczne {model.name}</caption>
            <tbody className="divide-y divide-white/10">
              {model.specs.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="w-1/2 bg-ink-2 px-6 py-4 font-medium text-muted">
                    {r.label}
                  </th>
                  <td className="px-6 py-4 font-semibold">{r.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-semibold tracking-[0.2em] text-white/50 uppercase">Wyposażenie dodatkowe</h3>
          <ul className="space-y-3">
            {model.options.map((o) => (
              <li key={o} className="flex gap-3 text-white/80">
                <Plus className="mt-0.5 size-5 shrink-0 text-brand" />
                {o}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-muted">
            Dane według informacji producenta. Pełną specyfikację wybranej wersji otrzymasz od dealera.
          </p>
        </div>
      </div>
    </Section>
  );
}

export function Faq({ items, title = "Najczęstsze pytania" }: { items: readonly { q: string; a: string }[]; title?: string }) {
  return (
    <Section eyebrow="FAQ" title={title}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
        }}
      />
      <div className="divide-y divide-white/10 border-y border-white/10">
        {items.map((i) => (
          <details key={i.q} className="group py-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold md:text-xl [&::-webkit-details-marker]:hidden">
              <h3>{i.q}</h3>
              <Plus className="size-5 shrink-0 text-brand transition-transform duration-300 group-open:rotate-45" />
            </summary>
            <p className="mt-4 max-w-[70ch] text-white/75">{i.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

const pln = (n: number) => n.toLocaleString("pl-PL").replace(/ /g, " ");

export function ModelCard({ model, headingAs: H = "h2" }: { model: Model; headingAs?: "h2" | "h3" }) {
  return (
    <Link
      href={`/modele/${model.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-2 p-6 transition hover:-translate-y-1 hover:border-brand/60 md:p-8"
    >
      <div className="relative mb-6 aspect-[16/10]">
        <div className="absolute inset-x-6 bottom-0 h-1/3 rounded-full bg-brand/25 blur-2xl transition group-hover:bg-brand/40" />
        <Image src={model.image} alt={model.name} fill sizes="(max-width:768px) 100vw, 33vw" className="object-contain" />
      </div>
      <span className="text-[11px] font-semibold tracking-[0.15em] text-brand uppercase">{model.category}</span>
      <H className="mt-2 mb-3 font-display text-2xl font-bold">{model.name}</H>
      <p className="mb-6 text-[15px] text-muted">{model.intro}</p>
      <div className="mt-auto flex items-end justify-between gap-4">
        <div>
          <small className="block text-[13px] text-muted">od</small>
          <strong className="font-display text-2xl font-bold">{pln(model.priceFrom)} zł</strong>
        </div>
        <span className="grid size-11 place-items-center rounded-full border border-white/15 transition group-hover:border-brand group-hover:bg-brand">
          <ArrowUpRight className="size-5" />
        </span>
      </div>
    </Link>
  );
}

export function OtherModels({ current }: { current: Model["slug"] }) {
  return (
    <Section eyebrow="Gama BAW" title="Zobacz także" className="bg-ink-2">
      <div className="grid gap-5 md:grid-cols-2">
        {models
          .filter((m) => m.slug !== current)
          .map((m) => (
            <ModelCard key={m.slug} model={m} headingAs="h3" />
          ))}
      </div>
    </Section>
  );
}

export { pln };
