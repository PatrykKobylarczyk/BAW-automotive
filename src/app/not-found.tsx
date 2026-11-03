import Link from "next/link";
import { models } from "@/lib/content";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-svh max-w-[1280px] flex-col justify-center px-5 pt-32 pb-20 md:px-8">
      <span className="font-display text-[clamp(80px,16vw,200px)] leading-none font-extrabold text-brand">404</span>
      <h1 className="mt-4 font-display text-[clamp(28px,3.6vw,48px)] font-bold">Nie znaleźliśmy tej strony</h1>
      <p className="mt-4 max-w-[50ch] text-muted">Mogła zostać przeniesiona. Zobacz nasze modele albo wróć na stronę główną.</p>
      <ul className="mt-10 flex flex-wrap gap-3">
        {[{ name: "Strona główna", href: "/" }, ...models.map((m) => ({ name: m.name, href: `/modele/${m.slug}` })), { name: "Cennik", href: "/cennik" }].map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="inline-block rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold transition hover:border-brand hover:bg-brand">
              {l.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
