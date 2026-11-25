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

// Drive modes grouped by terrain; each scene gets a full-bleed still from the 212 film behind the selector dial
export const terrainScenes = [
  {
    name: "Na co dzień",
    photo: "/media/tryby/codzien.webp",
    modes: [
      { name: "Standard", text: "Codzienna jazda po asfalcie i szutrze. Napęd na tylną oś, przód dołącza się wtedy, kiedy trzeba." },
      { name: "Eco", text: "Łagodniejsza reakcja na gaz i wcześniejsze zmiany biegów. Na długą trasę." },
      { name: "Sport", text: "Szybsza reakcja silnika i dłużej trzymane biegi przy wyprzedzaniu." },
    ],
  },
  {
    name: "Zima i woda",
    photo: "/media/tryby/woda.webp",
    modes: [
      { name: "Śnieg", text: "Miękkie ruszanie i szybka kontrola uślizgu na lodzie i ubitym śniegu." },
      { name: "Błoto", text: "Koła mogą się mocniej obracać, żeby bieżnik oczyścił się z błota." },
      { name: "Brodzenie", text: "Ustawienia do przejazdu przez wodę do 850 mm i grząskie dno." },
    ],
  },
  {
    name: "Bezdroża",
    photo: "/media/tryby/bezdroza.webp",
    modes: [
      { name: "Piasek", text: "Wyższe obroty i mniej ingerencji kontroli trakcji, żeby nie zakopać się na wydmie." },
      { name: "Skały", text: "Precyzyjne dawkowanie momentu przy prędkości pieszego." },
      { name: "Nierówności", text: "Kontrola trakcji dopasowana do kolein, korzeni i kamieni." },
    ],
  },
  {
    name: "Góry",
    photo: "/media/tryby/gory.webp",
    modes: [
      { name: "Góry", text: "Kontrola zjazdu i stabilny moment na długich, stromych odcinkach." },
      { name: "Crawl Control", text: "Terenowy tempomat. Auto pełznie samo, Ty tylko kierujesz." },
      { name: "Tank Turn", text: "Zawracanie niemal w miejscu dzięki przyhamowaniu wewnętrznego tylnego koła." },
    ],
  },
];

export const driveModes = terrainScenes.flatMap((s, si) => s.modes.map((m) => ({ ...m, scene: si })));

// Photo view: studio photos from the importer (previous WordPress site). The configurator measures the car in each
// photo and crops to it, so the car is the same size whichever colour is picked.
export const colors212 = [
  { name: "Oliwkowy", hex: "#4b5a3a", src: "/gallery/212/kolor-oliwkowy.webp" },
  { name: "Czarny", hex: "#121212", src: "/gallery/212/kolor-czarny.webp" },
  { name: "Grafitowy", hex: "#7d8085", src: "/gallery/212/kolor-grafitowy.webp" },
  { name: "Biały", hex: "#ececec", src: "/gallery/212/kolor-bialy.webp" },
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

const photos = (dir: string, names: string[]) => names.map((n) => ({ src: `/${dir}/${n}.webp` }));

/**
 * Gallery tabs, five photos each (one large tile and four small ones). `studio` photos have a white background;
 * the 3D renders sit on the green tiles. The large tile opens each tab with its strongest front three-quarter view.
 */
export const galleryTabs = [
  {
    name: "T01 SUV",
    studio: true,
    photos: photos("gallery/212", ["t01-czarny-przod", "t01-bialy-przod-1", "t01-bialy-tyl-1", "t01-bialy-przod-2", "t01-bialy-tyl-2"]),
  },
  {
    name: "T01 Pick-up",
    studio: true,
    photos: [
      ...photos("gallery/212", ["pickup-grafit-przod-wyciagarka", "pickup-grafit-przod", "pickup-grafit-tyl"]),
      ...photos("cutouts/212", ["pickup-grafit", "pickup-wyciagarka"]),
    ],
  },
  {
    name: "Model 3D",
    studio: false,
    photos: photos("gallery/212", ["34-front", "side", "34-rear", "front", "top"]),
  },
];

export const ownership = [
  { title: "Jazda próbna", text: "Umów termin i sprawdź T01 na asfalcie i w terenie." },
  { title: "Autoryzowany serwis", text: "Przeglądy i naprawy u dealera, części oryginalne na miejscu." },
  { title: "Akcesoria terenowe", text: "Snorkel, wyciągarka, bagażnik dachowy i zawieszenie." },
  { title: "Finansowanie", text: "Leasing i kredyt dla firm oraz klientów indywidualnych." },
];

export const company = { ...bawCompany, brand: "BAW Automotive Polska" };
