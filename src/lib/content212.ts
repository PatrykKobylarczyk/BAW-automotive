/**
 * Copy and media of the 212 landing page (/212). Prices, company data and the hero film come from the shared
 * BAW content, so the landing and the rest of the site never disagree. Technical data follow the importer's
 * specification (same values as /modele/baw-212).
 */
import { company as bawCompany, grossOf, media as bawMedia, modelVersions, netOf, priceList, versionHref, zl } from "./content";

/** Studio renders of the 3D model (public/gallery/212) */
export const renders = {
  hero: "/gallery/212/34-front.webp",
  side: "/gallery/212/side.webp",
  front: "/gallery/212/front.webp",
  rear: "/gallery/212/34-rear.webp",
  top: "/gallery/212/top.webp",
};

export const media = {
  terrainVideo: bawMedia.heroVideo,
  terrainPhoto: bawMedia.offroad,
};

export const heroSpecs = [
  { value: "2.0T", label: "turbodiesel" },
  { value: "8AT", label: "skrzynia ZF" },
  { value: "4×4", label: "part-time z reduktorem" },
  { value: "235", unit: "mm", label: "prześwit" },
];

export const marquee = [
  "Rama drabinkowa",
  "Dwa sztywne mosty",
  "Reduktor",
  "Blokady dyferencjałów",
  "Od 1965",
  "Brodzenie 850 mm",
];

export const timeline = [
  { year: "1965", title: "BJ212", text: "Pekiński terenowiec rodzi się jako pojazd do zadań specjalnych. Prosta rama, napęd 4×4 i reputacja nie do zdarcia." },
  { year: "2022", title: "Marka 212", text: "Legenda staje się samodzielną marką, nastawioną wyłącznie na prawdziwe auta terenowe." },
  { year: "2024", title: "212 T01", text: "Start produkcji T01: klasyczna sylwetka, nowoczesne wnętrze, turbodoładowane silniki i skrzynia ZF." },
  { year: "2025", title: "IAA Monachium", text: "Europejski debiut na targach IAA Mobility i pierwsze dostawy na rynki Europy." },
  { year: "Dziś", title: "212 w Polsce", text: "T01 dostępny u oficjalnego dealera. Jazdy próbne, serwis i części na miejscu." },
];

export const geometry = {
  approach: "40°",
  departure: "36°",
  clearance: "235 mm",
  wading: "850 mm",
  climb: "100%",
};

export const capability = [
  { value: "Rama", label: "drabinkowa konstrukcja nośna, odporna na skręcanie" },
  { value: "2 mosty", label: "sztywne osie przód i tył, stały kontakt kół z gruntem" },
  { value: "3 blokady", label: "przedni, centralny i tylny dyferencjał" },
  { value: "Reduktor", label: "przełożenie terenowe do pełzania i stromych podjazdów" },
];

export const driveModes = [
  { name: "Standard", text: "Codzienna jazda po asfalcie i szutrze, napęd na tył." },
  { name: "Eco", text: "Łagodna reakcja na gaz i wcześniejsza zmiana biegów." },
  { name: "Sport", text: "Szybsza reakcja silnika i dłuższe trzymanie biegów." },
  { name: "Śnieg", text: "Miękkie ruszanie i kontrola uślizgu na lodzie i śniegu." },
  { name: "Piasek", text: "Wyższe obroty i mniej ingerencji kontroli trakcji na wydmach." },
  { name: "Skały", text: "Precyzyjne dawkowanie momentu przy niskiej prędkości." },
  { name: "Błoto", text: "Pozwala kołom się obracać, by oczyścić bieżnik." },
  { name: "Brodzenie", text: "Ustawienia do pokonywania wody i grząskiego dna." },
  { name: "Góry", text: "Kontrola zjazdu i stabilny moment na długich wzniesieniach." },
  { name: "Nierówności", text: "Kontrola trakcji dopasowana do koleiny i kamieni." },
  { name: "Crawl Control", text: "Terenowy tempomat: auto pełznie, Ty tylko kierujesz." },
  { name: "Tank Turn", text: "Zawracanie w miejscu dzięki przyhamowaniu wewnętrznego koła." },
];

// Photo view: one render per colour, all from the same camera, so the car stays put when the colour changes
export const colors212 = [
  { name: "Oliwkowy", hex: "#4b5a3a", src: "/gallery/212/paint-olive.webp" },
  { name: "Czarny", hex: "#121212", src: "/gallery/212/paint-black.webp" },
  { name: "Grafitowy", hex: "#7d8085", src: "/gallery/212/paint-graphite.webp" },
  { name: "Biały", hex: "#ececec", src: "/gallery/212/paint-white.webp" },
];

// 3D view: paint colours taken from the 212 T01 model
export const paints212 = [
  { name: "Zieleń Medog", hex: "#37423f" },
  { name: "Szałwiowa zieleń", hex: "#707465" },
  { name: "Czerń północy", hex: "#3c3e41" },
  { name: "Szary piaskowy", hex: "#5b5b5c" },
  { name: "Biel", hex: "#dee7e4" },
];

const t01 = priceList.find((r) => r.model === "212 T01" && r.version === "SUV")!;
export const price = { gross: zl(grossOf(t01)), net: zl(netOf(t01)), version: "212 T01 Diesel" };

/** The 212 range (T01 SUV, T01 Pick-up, Mavero): cut-out photo, gross price from the price list, link to its page */
export const range212 = modelVersions["baw-212"].map((v) => {
  const row = priceList.find((r) => r.model === v.price.model && r.version === v.price.version);
  return { name: v.name, badge: v.badge, img: v.img, lead: v.lead, gross: row ? grossOf(row) : undefined, href: versionHref("baw-212", v) };
});

export const specs = [
  {
    group: "Napęd",
    rows: [
      ["Silnik", "2.0 turbodiesel z intercoolerem"],
      ["Moc / moment", "125 kW (170 KM) / 415 Nm"],
      ["Skrzynia", "automatyczna ZF, 8 biegów"],
      ["Napęd", "4WD part-time z reduktorem"],
      ["Blokady", "przód, centralny, tył"],
    ],
  },
  {
    group: "Wymiary",
    rows: [
      ["Dł. / szer. / wys.", "4705 / 1895 / 1936 mm"],
      ["Rozstaw osi", "2860 mm"],
      ["Opony", "265/70 R17"],
      ["Masa własna", "2235 kg"],
      ["Zbiornik paliwa", "80 l"],
    ],
  },
  {
    group: "Teren",
    rows: [
      ["Prześwit", "235 mm"],
      ["Kąt natarcia / zejścia", "40° / 36°"],
      ["Kąt rampowy", "23,6°"],
      ["Głębokość brodzenia", "850 mm"],
      ["Uciąg z hamulcem", "2500 kg"],
    ],
  },
] as const;

/** Our own studio photos of the T01 SUV and Pick-up (white background). Every third one is a portrait. */
export const gallery = [
  { src: "/gallery/212/pickup-grafit-tyl.webp", caption: "T01 Pick-up, tył" },
  { src: "/gallery/212/t01-czarny-przod.webp", caption: "T01 w czerni" },
  { src: "/gallery/212/pickup-grafit-przod-wyciagarka.webp", caption: "Pick-up z wyciągarką" },
  { src: "/cutouts/212/t01-bialy-przod.webp", caption: "T01 biały" },
  { src: "/gallery/212/t01-bialy-tyl-1.webp", caption: "Koło zapasowe na klapie" },
  { src: "/cutouts/212/pickup-grafit.webp", caption: "T01 Pick-up" },
  { src: "/cutouts/212/t01-bialy-tyl.webp", caption: "T01 biały, tył" },
  { src: "/gallery/212/pickup-grafit-przod.webp", caption: "Pick-up, przód" },
];

export const ownership = [
  { title: "Jazda próbna", text: "Umów termin i sprawdź T01 na asfalcie i w terenie." },
  { title: "Autoryzowany serwis", text: "Przeglądy i naprawy u dealera, części oryginalne na miejscu." },
  { title: "Akcesoria terenowe", text: "Snorkel, wyciągarka, bagażnik dachowy i zawieszenie." },
  { title: "Finansowanie", text: "Leasing i kredyt dla firm oraz klientów indywidualnych." },
];

export const company = { ...bawCompany, brand: "BAW Automotive Polska" };
