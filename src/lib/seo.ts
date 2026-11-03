import type { Metadata, MetadataRoute } from "next";
import { company, media } from "./content";

/** Production domain. Set NEXT_PUBLIC_SITE_URL in Vercel once the final domain is known. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://bawautomotive.pl").replace(/\/$/, "");
export const SITE_NAME = "BAW Automotive Polska";

/**
 * The site is indexed only on production AND once NEXT_PUBLIC_SITE_URL is set (i.e. after the domain switch).
 * Until then the vercel.app copy stays out of Google, so it does not compete with the WordPress site that
 * currently ranks and brings leads on bawautomotive.pl.
 */
export const INDEXABLE = Boolean(process.env.NEXT_PUBLIC_SITE_URL) && (process.env.VERCEL_ENV ?? "production") === "production";

type PageSeo = {
  path: string;
  /** Breadcrumb / link label */
  label: string;
  title: string;
  description: string;
  image?: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

export const pages = {
  home: {
    path: "/",
    label: "Strona główna",
    title: "BAW Automotive Polska — oficjalny importer samochodów BAW",
    description:
      "BAW 212 T01, elektryczny Mini Truck i Light Truck. Oficjalny importer i dealer samochodów BAW w Polsce. Ceny, jazdy próbne i leasing dla firm.",
    changeFrequency: "weekly",
    priority: 1,
  },
  models: {
    path: "/modele",
    label: "Modele",
    title: "Samochody BAW — modele, wersje i ceny",
    description:
      "Gama BAW w Polsce: terenowy SUV 212 T01, elektryczny dostawczy Mini Truck i lekki użytkowy Light Truck. Porównaj modele, ceny i wersje.",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  "baw-212": {
    path: "/modele/baw-212",
    label: "BAW 212 T01",
    title: "BAW 212 T01 — terenowy SUV 4x4 od 174 500 zł",
    description:
      "BAW 212 T01: napęd 4WD, blokady dyferencjałów, silnik 2.0 T GDI i brodzenie do 659 mm. Cena od 174 500 zł brutto. Umów jazdę próbną u importera.",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  "baw-mini-truck": {
    path: "/modele/baw-mini-truck",
    label: "BAW Mini Truck",
    title: "Elektryczny BAW Mini Truck od 64 900 zł",
    description:
      "Elektryczny BAW Mini Truck do miejskiej logistyki i dostaw ostatniej mili. Wersje Box i Cargo, cena od 64 900 zł brutto. Zapytaj o leasing.",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  "baw-light-truck": {
    path: "/modele/baw-light-truck",
    label: "BAW Light Truck",
    title: "BAW Light Truck — samochód użytkowy od 89 900 zł",
    description:
      "BAW Light Truck: konstrukcja z ramą lub bez, przestronna kabina i wersja Cargo z zabudową Niewiadów. Cena od 89 900 zł brutto.",
    changeFrequency: "monthly",
    priority: 0.9,
  },
  pricing: {
    path: "/cennik",
    label: "Cennik",
    title: "Cennik samochodów BAW 2026 — ceny brutto i netto",
    description:
      "Aktualne ceny samochodów BAW w Polsce: 212 T01, Light Truck, Light Truck Cargo, Mini Truck i Mini Truck Cargo. Ceny brutto i netto, leasing dla firm.",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  about: {
    path: "/o-marce",
    label: "O marce",
    title: "O marce BAW — 70 lat historii, ponad 60 rynków",
    description:
      "BAW to globalna marka motoryzacyjna z ponad 70-letnią historią, obecna na ponad 60 rynkach. Poznaj BAW Automotive Polska, oficjalnego importera.",
    changeFrequency: "yearly",
    priority: 0.6,
  },
  dealer: {
    path: "/zostan-dealerem",
    label: "Zostań dealerem",
    title: "Zostań dealerem BAW — współpraca dealerska",
    description:
      "Dołącz do sieci dealerów BAW w Polsce. SUV-y terenowe, samochody użytkowe i elektryczne, wsparcie techniczne i marketingowe importera.",
    changeFrequency: "yearly",
    priority: 0.6,
  },
  service: {
    path: "/serwis",
    label: "Salony i serwis",
    title: "Salony i serwis BAW w Polsce",
    description:
      "Znajdź salon i serwis BAW w Polsce. Sprzedaż, jazdy próbne, przeglądy i oryginalne części u oficjalnego importera w Ksawerowie koło Łodzi.",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  contact: {
    path: "/kontakt",
    label: "Kontakt",
    title: "Kontakt z importerem BAW — Ksawerów k. Łodzi",
    description: `Skontaktuj się z oficjalnym importerem BAW: ${company.street}, ${company.city}, ${company.email}. Jazdy próbne, oferty dla firm, współpraca.`,
    changeFrequency: "yearly",
    priority: 0.7,
  },
  privacy: {
    path: "/polityka-prywatnosci",
    label: "Polityka prywatności",
    title: "Polityka prywatności",
    description: "Zasady przetwarzania danych osobowych i plików cookies w serwisie BAW Automotive Polska.",
    changeFrequency: "yearly",
    priority: 0.2,
  },
} satisfies Record<string, PageSeo>;

export type PageKey = keyof typeof pages;

export const url = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

export function pageMetadata(key: PageKey, image?: string): Metadata {
  const p = pages[key];
  return {
    title: key === "home" ? { absolute: p.title } : p.title,
    description: p.description,
    alternates: { canonical: p.path },
    openGraph: {
      type: "website",
      locale: "pl_PL",
      siteName: SITE_NAME,
      url: p.path,
      title: p.title,
      description: p.description,
      images: [{ url: image ?? media.heroPoster }],
    },
  };
}

/** Breadcrumb trail from the home page to `key`, optionally via the models list. */
export function trail(key: PageKey) {
  const keys: PageKey[] = ["home"];
  if (key.startsWith("baw-")) keys.push("models");
  if (key !== "home") keys.push(key);
  return keys.map((k) => ({ label: pages[k].label, path: pages[k].path }));
}

export const organizationLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  "@id": `${SITE_URL}/#organizacja`,
  name: SITE_NAME,
  legalName: company.name,
  url: SITE_URL,
  email: company.email,
  taxID: company.nip,
  brand: { "@type": "Brand", name: "BAW" },
  address: {
    "@type": "PostalAddress",
    streetAddress: company.street,
    postalCode: company.city.split(" ")[0],
    addressLocality: company.city.split(" ").slice(1).join(" "),
    addressCountry: "PL",
  },
  areaServed: "PL",
};

export function breadcrumbLd(key: PageKey) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail(key).map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: url(c.path),
    })),
  };
}

export function productLd(m: { slug: string; name: string; intro: string; image: string; priceFrom: number; fuel: string; category: string }) {
  return {
    "@context": "https://schema.org",
    "@type": ["Product", "Car"],
    name: m.name,
    description: m.intro,
    image: m.image,
    category: m.category,
    fuelType: m.fuel,
    brand: { "@type": "Brand", name: "BAW" },
    url: url(`/modele/${m.slug}`),
    offers: {
      "@type": "Offer",
      price: m.priceFrom,
      priceCurrency: "PLN",
      url: url(`/modele/${m.slug}`),
      seller: { "@id": `${SITE_URL}/#organizacja` },
    },
  };
}
