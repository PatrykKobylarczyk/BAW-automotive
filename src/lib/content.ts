const U = "https://bawautomotive.pl/wp-content/uploads";

export const media = {
  heroVideo: `${U}/2025/11/1030.mp4`,
  heroPoster: `${U}/2025/10/212-t3.png`,
  offroad: `${U}/2025/10/212-t3.png`,
  evPhoto: `${U}/2025/10/Ev_small_est_2.jpg`,
  dealerBg: `${U}/2025/10/Mini_truck_est_6-2-1630x860.jpg`,
};

export const nav = [
  { label: "Pojazdy", href: "/modele" },
  // Separate site of the 212 brand (green identity), opened in a new tab
  { label: "212", href: "https://212-polska.vercel.app", external: true },
  { label: "Cennik", href: "/cennik" },
  { label: "Salony i serwis", href: "/serwis" },
  { label: "O marce", href: "/o-marce" },
  { label: "Kontakt", href: "/kontakt" },
];

export const stats = [
  { value: 60, suffix: "+", label: "rynków na świecie" },
  { value: 70, suffix: " lat", label: "historii w motoryzacji" },
  { value: 3, suffix: "", label: "linie modelowe" },
  { value: 100, suffix: "%", label: "elektryczny Mini Truck" },
];

export const values = [
  {
    icon: "globe",
    title: "Globalna marka, lokalne wsparcie",
    text: "BAW to światowa marka obecna na ponad 60 rynkach, teraz także w Polsce. Dzięki sieci autoryzowanych dealerów oferujemy niezawodne pojazdy dostosowane do lokalnych potrzeb i warunków.",
  },
  {
    icon: "award",
    title: "Najwyższa jakość w rozsądnej cenie",
    text: "Samochody BAW łączą trwałość, nowoczesną technologię i wyjątkową jakość wykonania. Oferujemy pojazdy klasy premium w cenach dostępnych dla każdego przedsiębiorcy.",
  },
  {
    icon: "zap",
    title: "Moc, ekonomia i wydajność bez kompromisów",
    text: "Idealne połączenie niskich kosztów eksploatacji i maksymalnych osiągów. Każdy pojazd zapewnia pełną moc, niezawodność i oszczędność energii w codziennej pracy.",
  },
] as const;

// Photo view: one studio photo per colour. The photos come with different amounts of empty space around
// the car, so each one carries the car's measured outline (`box`, in pixels: left, top, right, bottom of the
// solid car body, without the soft shadow some photos have). The configurator crops every photo to that
// outline, so the car is the same size and in the same place whichever colour is picked.
export const colors212 = [
  { name: "Oliwkowy", hex: "#4b5a3a", src: `${U}/2025/10/212-car.png`, w: 1600, h: 914, box: [223, 196, 1377, 776] },
  { name: "Czarny", hex: "#121212", src: `${U}/2025/10/212-black.png`, w: 1080, h: 531, box: [47, 2, 1047, 504] },
  { name: "Grafitowy", hex: "#7d8085", src: `${U}/2025/10/212-gray.png`, w: 1080, h: 531, box: [47, 2, 1047, 504] },
  { name: "Biały", hex: "#ececec", src: `${U}/2025/10/212-white-2.png`, w: 1080, h: 531, box: [47, 1, 1048, 504] },
] as const;

// 3D view: paint colours taken from the 212 T01 Blender model
export const paints212 = [
  { name: "Szałwiowa zieleń", hex: "#707465" },
  { name: "Zieleń Medog", hex: "#37423f" },
  { name: "Czerń północy", hex: "#3c3e41" },
  { name: "Szary piaskowy", hex: "#5b5b5c" },
  { name: "Biel", hex: "#dee7e4" },
];

export const offroadSpecs = [
  { value: "170 KM", label: "turbodiesel 2.0, 415 Nm" },
  { value: "850 mm", label: "maksymalna głębokość brodzenia" },
  { value: "100%", label: "maksymalne nachylenie podjazdu" },
  { value: "40°", label: "kąt natarcia (zejścia 36°)" },
];

export const offroadFeatures = [
  "Inteligentny napęd 4WD part-time",
  "Elektronicznie sterowane blokady dyferencjałów przedniej i tylnej osi",
  "Centralny dyferencjał z funkcją blokady",
  "Pięciopunktowe, niezależne zawieszenie przód i tył",
];

/** A gallery photo: just a path, or a path with a caption and the version it shows (one filter per version). */
export type GalleryImage = string | { src: string; label?: string; tag?: string };

const g212 = (tag: string, list: [string, string][]): GalleryImage[] => list.map(([n, label]) => ({ src: `/gallery/212/${n}.webp`, label, tag }));

export const gallery212: GalleryImage[] = [
  ...g212("T01 SUV", [
    ["34-front", "Przód, widok 3/4"],
    ["t01-czarny-przod", "Czarny, przód"],
    ["side", "Profil"],
    ["t01-bialy-przod-1", "Biały, przód 3/4"],
    ["34-rear", "Tył, widok 3/4"],
    ["t01-bialy-tyl-1", "Biały, tył 3/4"],
    ["front", "Przód"],
    ["t01-bialy-przod-2", "Biały, przód"],
    ["t01-bialy-tyl-2", "Biały, tył"],
    ["paint-white", "Kolor: biel"],
    ["paint-graphite", "Kolor: szary piaskowy"],
    ["paint-black", "Kolor: czerń północy"],
    ["top", "Widok z góry"],
  ]),
  ...g212("T01 Pick-up", [
    ["pickup-grafit-tyl", "Grafitowy, tył 3/4"],
    ["pickup-grafit-przod", "Grafitowy, przód 3/4"],
    ["pickup-grafit-przod-wyciagarka", "Przód z wyciągarką"],
  ]),
];

/** Mini Truck versions on its section: our photos cut out of the background */
export const miniTruckVersions = [
  { src: "/cutouts/mini-truck/box.webp", label: "Box" },
  { src: "/cutouts/mini-truck/cargo.webp", label: "Cargo" },
];

export const miniTruckGallery = [1, 10, 6, 7, 12, 11, 3, 2, 8, 5, 9].map(
  (n) => `${U}/2025/10/Mini_truck_est_${n}-${[6, 12, 8, 5].includes(n) ? 2 : 1}-1630x860.jpg`,
);

// Studio renders on a white background, a few per body type (model page gallery, one filter per body type)
const gLT = (tag: string, list: [string, string][]): GalleryImage[] =>
  list.map(([n, label]) => ({ src: `/gallery/light-truck/${n}.webp`, label, tag }));

export const lightTruckGallery: GalleryImage[] = [
  ...gLT("Skrzynia", [
    ["skrzynia-przod-34-1", "Przód, widok 3/4"],
    ["przod", "Przód"],
    ["skrzynia-tyl-34-1", "Tył, widok 3/4"],
    ["skrzynia-gora", "Skrzynia z góry"],
    ["skrzynia-tyl", "Tył"],
  ]),
  ...gLT("Komunalna", [
    ["komunalna-przod-34-1", "Przód, widok 3/4"],
    ["komunalna-bok-1", "Bok"],
    ["komunalna-tyl-34-1", "Tył, widok 3/4"],
    ["komunalna-tyl-otwarta", "Otwarta burta"],
    ["komunalna-wymiary-bok", "Wymiary"],
  ]),
  ...gLT("Kontener", [
    ["kontener-przod-34-1", "Przód, widok 3/4"],
    ["kontener-bok-1", "Bok"],
    ["kontener-tyl-34-1", "Tył, widok 3/4"],
    ["kontener-tyl-otwarty", "Otwarte drzwi kontenera"],
  ]),
  ...gLT("Wywrotka", [
    ["wywrotka-przod-podniesiona", "Podniesiona skrzynia, przód"],
    ["wywrotka-bok-podniesiona-1", "Wywrot na bok"],
    ["wywrotka-tyl-podniesiona-1", "Wywrot do tyłu"],
    ["wywrotka-trzy-strony", "Wywrotka trójstronna"],
    ["wywrotka-bok", "Bok"],
  ]),
];

// Our own studio photos (the "auta" folder), cut out of the white background: public/cutouts
export const lightTruck = {
  image: "/cutouts/light-truck/skrzynia.webp",
  // Cut-out photos at the top of the Light Truck section, swiped through; `body` names the body type's button
  // and its filter in the model page gallery (lightTruckGallery tags)
  gallery: [
    { src: "/cutouts/light-truck/skrzynia.webp", label: "Skrzynia", body: "Skrzynia" },
    { src: "/cutouts/light-truck/skrzynia-tyl.webp", label: "Skrzynia, tył", body: "Skrzynia" },
    { src: "/cutouts/light-truck/komunalna.webp", label: "Skrzynia komunalna", body: "Komunalna" },
    { src: "/cutouts/light-truck/kontener.webp", label: "Kontener", body: "Kontener" },
    { src: "/cutouts/light-truck/wywrotka-jednostronna.webp", label: "Wywrotka jednostronna", body: "Wywrotka" },
    { src: "/cutouts/light-truck/wywrotka-trojstronna.webp", label: "Wywrotka trójstronna", body: "Wywrotka" },
  ],
  specs: [
    { value: '7"', label: "wielofunkcyjny ekran dotykowy" },
    { value: "LCD", label: "elektroniczny panel wskaźników" },
    { value: "1785 kg", label: "ładowność, konstrukcja na ramie" },
    { value: "Tarcze", label: "przednie hamulce tarczowe, tylne bębnowe" },
  ],
};

export const prices = [
  { name: "212 T01", fuel: "Diesel", gross: "174 500", net: "141 869,92", img: `${U}/2025/10/212-black.png`, href: "/modele/baw-212", featured: true },
  { name: "Light Truck", fuel: "Benzyna", gross: "89 900", net: "73 089,43", img: `${U}/2025/10/BAW_Small_005_gallery.png.webp`, href: "/modele/baw-light-truck" },
  { name: "Light Truck Cargo", fuel: "Benzyna · zabudowa Niewiadów", gross: "99 900", net: "81 219,51", img: `${U}/2025/10/BAW_Small_004_gallery.png.webp`, href: "/modele/baw-light-truck" },
  { name: "Mini Truck", fuel: "Elektryczny", gross: "64 900", net: "52 764,23", img: `${U}/2025/10/baw-mini-box.webp`, href: "/modele/baw-mini-truck" },
  { name: "Mini Truck Cargo", fuel: "Elektryczny", gross: "69 900", net: "56 829,27", img: `${U}/2025/11/BAW-mimitruck.webp`, href: "/modele/baw-mini-truck" },
];

/**
 * Every version with its price, for the table on /cennik. Source: "Modele i ceny" in BAW_baza_danych.xlsx
 * (project files, baw-dane), taken from the importer's "Wsad do strony". Each row has the one price the
 * importer gave, gross or net, exactly as in the sheet; the other one is worked out with 23% VAT.
 * The price cards on the home page and /cennik show every row too.
 */
export const priceList: ({
  model: string;
  version: string;
  fuel: string;
  href?: string;
  /**
   * Our photo from the "auta" folder, cut out of the background (public/cutouts/kafelki). Every tile uses the same
   * shot: front three-quarter view, front of the vehicle to the left, same size on the same canvas. The tipper only
   * has a photo facing right, so it is mirrored with its BAW lettering flipped back. None yet for 212 Mavero.
   */
  img?: string;
  featured?: boolean;
} & ({ gross: number; net?: never } | { net: number; gross?: never }))[] = [
  { model: "212 T01", version: "SUV", fuel: "Diesel", gross: 174500, href: "/modele/baw-212", img: "/cutouts/kafelki/212-t01-suv.webp", featured: true },
  { model: "212 T01", version: "Pick-up", fuel: "Diesel", net: 178049, href: "/modele/baw-212", img: "/cutouts/kafelki/212-t01-pickup.webp" },
  { model: "212 Mavero", version: "SUV", fuel: "Benzyna", gross: 199900 },
  { model: "Light Truck (LT7)", version: "Skrzynia", fuel: "Benzyna", net: 73089, href: "/modele/baw-light-truck", img: "/cutouts/kafelki/lt-skrzynia.webp" },
  { model: "Light Truck (LT7)", version: "Skrzynia komunalna", fuel: "Benzyna", net: 76829, href: "/modele/baw-light-truck", img: "/cutouts/kafelki/lt-komunalna.webp" },
  { model: "Light Truck (LT7)", version: "Kontener (Cargo, zabudowa Niewiadów)", fuel: "Benzyna", net: 81220, href: "/modele/baw-light-truck", img: "/cutouts/kafelki/lt-kontener.webp" },
  { model: "Light Truck (LT7)", version: "Wywrotka jednostronna", fuel: "Benzyna", net: 81220, href: "/modele/baw-light-truck", img: "/cutouts/kafelki/lt-wywrotka.webp" },
  { model: "Light Truck (LT7)", version: "Wywrotka trójstronna", fuel: "Benzyna", net: 104900, href: "/modele/baw-light-truck", img: "/cutouts/kafelki/lt-wywrotka.webp" },
  { model: "Mini Truck EV", version: "Box", fuel: "Elektryczny", gross: 64900, href: "/modele/baw-mini-truck", img: "/cutouts/kafelki/mini-box.webp" },
  { model: "Mini Truck EV", version: "Cargo", fuel: "Elektryczny", gross: 69900, href: "/modele/baw-mini-truck", img: "/cutouts/kafelki/mini-cargo.webp" },
];

/**
 * The home page lineup: every version we have a photo of, standing side by side like a press photo of the whole
 * range, in the order of the models (212, Light Truck, Mini Truck). `box` is the vehicle's outline in its 1600 × 1000 tile (public/cutouts/kafelki,
 * every tile stands on the same ground line, y = 970). The tiles are each fitted to the same width; `scale` evens out
 * their sizes so the vehicles look alike in size, with the Mini Truck only a little smaller (real proportions made
 * it look too small next to the others). `versions` are the priceList rows the vehicle stands for (both tippers share one photo).
 */
export const lineup: {
  id: string;
  group: "baw-212" | "baw-light-truck" | "baw-mini-truck";
  label: string;
  img: string;
  box: [number, number, number, number];
  scale: number;
  versions: string[];
}[] = [
  { id: "212-suv", group: "baw-212", label: "T01 SUV", img: "/cutouts/kafelki/212-t01-suv.webp", box: [251, 67, 1349, 970], scale: 0.95, versions: ["SUV"] },
  { id: "212-pickup", group: "baw-212", label: "T01 Pick-up", img: "/cutouts/kafelki/212-t01-pickup.webp", box: [225, 106, 1374, 970], scale: 0.97, versions: ["Pick-up"] },
  { id: "lt-skrzynia", group: "baw-light-truck", label: "Skrzynia", img: "/cutouts/kafelki/lt-skrzynia.webp", box: [197, 147, 1403, 970], scale: 1, versions: ["Skrzynia"] },
  { id: "lt-komunalna", group: "baw-light-truck", label: "Komunalna", img: "/cutouts/kafelki/lt-komunalna.webp", box: [183, 166, 1416, 970], scale: 1, versions: ["Skrzynia komunalna"] },
  { id: "lt-kontener", group: "baw-light-truck", label: "Kontener", img: "/cutouts/kafelki/lt-kontener.webp", box: [239, 85, 1360, 970], scale: 1.06, versions: ["Kontener (Cargo, zabudowa Niewiadów)"] },
  { id: "lt-wywrotka", group: "baw-light-truck", label: "Wywrotka", img: "/cutouts/kafelki/lt-wywrotka.webp", box: [213, 125, 1387, 970], scale: 1.1, versions: ["Wywrotka jednostronna", "Wywrotka trójstronna"] },
  { id: "mini-box", group: "baw-mini-truck", label: "Box", img: "/cutouts/kafelki/mini-box.webp", box: [236, 90, 1363, 970], scale: 0.9, versions: ["Box"] },
  { id: "mini-cargo", group: "baw-mini-truck", label: "Cargo", img: "/cutouts/kafelki/mini-cargo.webp", box: [235, 92, 1365, 970], scale: 0.92, versions: ["Cargo"] },
];

/** Three key figures per model, shown when a vehicle of that model is picked in the lineup. */
export const lineupSpecs: Record<(typeof lineup)[number]["group"], { value: string; label: string }[]> = {
  "baw-212": [
    { value: "4WD", label: "z reduktorem i blokadami" },
    { value: "415 Nm", label: "moment obrotowy" },
    { value: "850 mm", label: "głębokość brodzenia" },
  ],
  "baw-light-truck": [
    { value: "1785 kg", label: "ładowności" },
    { value: "117 KM", label: "silnik benzynowy 1.6" },
    { value: "3,7 m", label: "długość skrzyni" },
  ],
  "baw-mini-truck": [
    { value: "100% EV", label: "zero emisji w mieście" },
    { value: "150 km", label: "zasięgu (min.)" },
    { value: "3,8 m", label: "długości, parkuje wszędzie" },
  ],
};

const round2 = (n: number) => Math.round(n * 100) / 100;
export const grossOf = (p: { gross?: number; net?: number }) => p.gross ?? round2(p.net! * 1.23);
export const netOf = (p: { gross?: number; net?: number }) => p.net ?? round2(p.gross! / 1.23);

/** Polish price format: 174 500 or 219 000,27, with non-breaking spaces so a price never wraps. */
export const zl = (n: number) =>
  n.toLocaleString("pl-PL", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }).replace(/\s/g, "\u00a0");

/**
 * Versions shown on each model page, one tab each. The price comes from `priceList` (matched by model and version),
 * so it stays the same as on /cennik. `points` only use data approved for the site: the 212 Pick-up and Mavero have
 * no confirmed technical data yet (project files, dane-techniczne/brakujace-dane-do-akceptacji.md), so they show
 * only what the importer's price list says.
 */
export type ModelVersion = {
  id: string;
  /** Address of the version's own page, /modele/<model>/<slug>; null for the version the model page itself shows */
  slug: string | null;
  name: string;
  /** Eyebrow on the version's page, when it differs from the model's category */
  category?: string;
  badge: string;
  /** Row in priceList */
  price: { model: string; version: string };
  /** Other priceList rows this page also covers (the three-way tipper shares the tipper page) */
  alsoVersions?: string[];
  /** Preselected topic in the contact form (one of `prices`) */
  leadModel?: string;
  img?: string;
  /** Tag of this version's photos in the model's gallery */
  galleryTag?: string;
  lead: string;
  points: string[];
  note?: string;
};

export const modelVersions: Record<"baw-212" | "baw-light-truck" | "baw-mini-truck", ModelVersion[]> = {
  "baw-212": [
    {
      id: "t01-suv",
      slug: null,
      leadModel: "212 T01",
      name: "212 T01 SUV",
      badge: "Diesel · 4x4",
      price: { model: "212 T01", version: "SUV" },
      img: "/cutouts/kafelki/212-t01-suv.webp",
      galleryTag: "T01 SUV",
      lead: "Pięciodrzwiowy terenowy SUV z turbodieslem i napędem 4WD z reduktorem. Wersja, której dotyczą dane techniczne na tej stronie.",
      points: [
        "2.0 turbodiesel: 125 kW (170 KM) i 415 Nm",
        "Automatyczna skrzynia ZF, 8 biegów",
        "Brodzenie do 850 mm, podjazd do 100%",
        "Uciąg przyczepy do 2500 kg",
      ],
    },
    {
      id: "t01-pickup",
      slug: "pick-up",
      leadModel: "212 T01",
      name: "212 T01 Pick-up",
      category: "Terenowy pick-up",
      badge: "Diesel",
      price: { model: "212 T01", version: "Pick-up" },
      img: "/cutouts/kafelki/212-t01-pickup.webp",
      galleryTag: "T01 Pick-up",
      lead: "Terenowy charakter 212 z otwartą skrzynią ładunkową. Do pracy w terenie, na budowie i w gospodarstwie.",
      points: ["Silnik Diesla", "Podwójna kabina i otwarta skrzynia ładunkowa"],
      note: "Pełną kartę techniczną wersji Pick-up potwierdzamy z importerem. Zapytaj dealera o szczegóły.",
    },
    {
      id: "mavero",
      slug: "mavero",
      name: "212 Mavero",
      category: "SUV",
      badge: "Benzyna",
      price: { model: "212 Mavero", version: "SUV" },
      lead: "Benzynowa odmiana 212 w nadwoziu SUV.",
      points: ["Silnik benzynowy", "Nadwozie SUV"],
      note: "Zdjęcia i dane techniczne Mavero pojawią się wkrótce. Zapytaj dealera o dostępność.",
    },
  ],
  "baw-light-truck": [
    {
      id: "skrzynia",
      slug: "skrzynia",
      leadModel: "Light Truck",
      name: "Light Truck Skrzynia",
      badge: "Benzyna · 1785 kg",
      price: { model: "Light Truck (LT7)", version: "Skrzynia" },
      img: "/cutouts/kafelki/lt-skrzynia.webp",
      galleryTag: "Skrzynia",
      lead: "Podstawowa wersja z otwartą skrzynią ładunkową, do przewozu materiałów i towarów.",
      points: ["Skrzynia 3700 × 1770 × 395 mm", "Ładowność 1785 kg, DMC 3495 kg", "Benzyna 1.6, 117 KM"],
    },
    {
      id: "komunalna",
      slug: "komunalna",
      leadModel: "Light Truck",
      name: "Light Truck Komunalna",
      badge: "Benzyna",
      price: { model: "Light Truck (LT7)", version: "Skrzynia komunalna" },
      img: "/cutouts/kafelki/lt-komunalna.webp",
      galleryTag: "Komunalna",
      lead: "Skrzynia w wykonaniu komunalnym, dla służb miejskich, zieleni i utrzymania terenu.",
      points: ["Ładowność 1785 kg, DMC 3495 kg", "Benzyna 1.6, 117 KM"],
    },
    {
      id: "kontener",
      slug: "kontener",
      leadModel: "Light Truck Cargo",
      name: "Light Truck Kontener",
      badge: "Cargo · Niewiadów",
      price: { model: "Light Truck (LT7)", version: "Kontener (Cargo, zabudowa Niewiadów)" },
      img: "/cutouts/kafelki/lt-kontener.webp",
      galleryTag: "Kontener",
      lead: "Zamknięta zabudowa kontenerowa Niewiadów, gotowa do przewozu towarów.",
      points: ["Kontener 3600 × 1800 × 1800 mm", "Zabudowa Niewiadów", "Benzyna 1.6, 117 KM"],
    },
    {
      id: "wywrotka",
      slug: "wywrotka",
      leadModel: "Light Truck",
      name: "Light Truck Wywrotka",
      badge: "Jedno- lub trójstronna",
      price: { model: "Light Truck (LT7)", version: "Wywrotka jednostronna" },
      alsoVersions: ["Wywrotka trójstronna"],
      img: "/cutouts/kafelki/lt-wywrotka.webp",
      galleryTag: "Wywrotka",
      lead: "Wywrotka jednostronna albo trójstronna, do sypkich materiałów na budowie i w ogrodzie.",
      points: ["Skrzynia wywrotki 3730 × 1850 × 400 mm", "Wersja trójstronna: osobna pozycja w cenniku", "Benzyna 1.6, 117 KM"],
    },
  ],
  "baw-mini-truck": [
    {
      id: "box",
      slug: "box",
      leadModel: "Mini Truck",
      name: "Mini Truck Box",
      badge: "Elektryczny",
      price: { model: "Mini Truck EV", version: "Box" },
      img: "/cutouts/kafelki/mini-box.webp",
      lead: "Kompaktowy elektryczny dostawczak do dostaw ostatniej mili i stałych tras po mieście.",
      points: ["Bateria LiFePO4 15,4 kWh", "Zasięg min. 150 km", "Silnik 30 kW, 110 Nm"],
    },
    {
      id: "cargo",
      slug: "cargo",
      leadModel: "Mini Truck Cargo",
      name: "Mini Truck Cargo",
      badge: "Elektryczny",
      price: { model: "Mini Truck EV", version: "Cargo" },
      img: "/cutouts/kafelki/mini-cargo.webp",
      lead: "Druga wersja zabudowy Mini Trucka, z tym samym napędem elektrycznym.",
      points: ["Bateria LiFePO4 15,4 kWh", "Zasięg min. 150 km", "Silnik 30 kW, 110 Nm"],
    },
  ],
};

export type VersionModel = keyof typeof modelVersions;

export const versionHref = (model: VersionModel, v: ModelVersion) => (v.slug ? `/modele/${model}/${v.slug}` : `/modele/${model}`);

/** The version page for a priceList row (by its model and version name), if there is one. */
export function versionOf(row: { model: string; version: string }) {
  for (const model of Object.keys(modelVersions) as VersionModel[]) {
    const v = modelVersions[model].find(
      (x) => x.price.model === row.model && (x.price.version === row.version || x.alsoVersions?.includes(row.version)),
    );
    if (v) return { model, v, href: versionHref(model, v) };
  }
}

export const company = {
  name: "SERICA trade Sp. z o.o.",
  street: "Łódzka 114",
  city: "95-054 Ksawerów",
  note: "3 km od Port Łódź / IKEA",
  email: "biuro@bawautomotive.com.pl",
  nip: "8792748220",
  regon: "525341298",
};

/** One entry per model page. Copy here feeds the page, its metadata, the FAQ and the structured data. */
export const models = [
  {
    slug: "baw-212",
    name: "BAW 212 T01",
    short: "212 Off-Road",
    category: "SUV terenowy 4x4",
    fuel: "Diesel",
    priceFrom: 174500,
    image: `${U}/2025/10/212-black.png`,
    intro:
      "Terenowy SUV z napędem 4WD, blokadami dyferencjałów i turbodieslem 2.0 o mocy 170 KM. Brodzi do 850 mm, podjeżdża pod 100% nachylenia i zachowuje komfort na co dzień.",
    highlights: [
      ...offroadFeatures,
      "Silnik 2.0 turbodiesel z intercoolerem: 125 kW (170 KM) i 415 Nm",
      "Kąt natarcia 40°, kąt zejścia 36°, kąt rampowy 23,6°",
      "Uciąg przyczepy do 2500 kg",
    ],
    specs: [
      { label: "Długość × szerokość × wysokość", value: "4705 × 1895 × 1936 mm" },
      { label: "Rozstaw osi", value: "2860 mm" },
      { label: "Rozstaw kół przód / tył", value: "1598 / 1598 mm" },
      { label: "Prześwit", value: "235 mm" },
      { label: "Kąt natarcia / zejścia", value: "40° / 36°" },
      { label: "Kąt rampowy", value: "23,6°" },
      { label: "Głębokość brodzenia", value: "850 mm" },
      { label: "Masa własna", value: "2235 kg" },
      { label: "Maksymalna masa holowana", value: "2500 kg" },
      { label: "Silnik", value: "2.0 turbodiesel z intercoolerem" },
      { label: "Moc maksymalna", value: "125 kW (170 KM)" },
      { label: "Maksymalny moment obrotowy", value: "415 Nm" },
      { label: "Skrzynia biegów", value: "automatyczna ZF, 8 biegów" },
      { label: "Napęd", value: "4WD part-time z reduktorem" },
      { label: "Norma emisji", value: "Euro VI b" },
      { label: "Zbiornik paliwa", value: "80 l" },
      { label: "Opony", value: "265/70 R17" },
      { label: "Hamulec postojowy", value: "elektryczny (EPB)" },
    ],
    options: ["Blokada przedniego dyferencjału", "Elektrycznie wysuwane stopnie", "Szyberdach", "Wyciągarka elektryczna"],
    faq: [
      {
        q: "Ile kosztuje BAW 212 T01 w Polsce?",
        a: "BAW 212 T01 z silnikiem Diesla kosztuje od 174 500 zł brutto (141 869,92 zł netto). O finansowanie i leasing dla firm zapytaj dealera.",
      },
      {
        q: "Jaki napęd ma BAW 212?",
        a: "BAW 212 ma inteligentny napęd 4WD part-time, centralny dyferencjał z funkcją blokady oraz elektronicznie sterowane blokady dyferencjałów przedniej i tylnej osi.",
      },
      {
        q: "Jaka jest głębokość brodzenia BAW 212?",
        a: "Maksymalna głębokość brodzenia BAW 212 wynosi 850 mm, a maksymalne nachylenie podjazdu to 100%.",
      },
      {
        q: "Jakie są wymiary BAW 212 T01?",
        a: "BAW 212 T01 ma 4705 mm długości, 1895 mm szerokości i 1936 mm wysokości. Rozstaw osi wynosi 2860 mm, a prześwit 235 mm.",
      },
      {
        q: "Gdzie można obejrzeć i kupić BAW 212?",
        a: `U oficjalnego importera BAW w Polsce: ${company.name}, ${company.street}, ${company.city} (${company.note}). Jazdę próbną umówisz przez formularz kontaktowy.`,
      },
    ],
  },
  {
    slug: "baw-light-truck",
    name: "BAW Light Truck",
    short: "Light Truck",
    category: "Lekki samochód użytkowy",
    fuel: "Benzyna",
    priceFrom: 89900,
    image: lightTruck.image,
    intro:
      "Lekki samochód użytkowy nowej generacji na ramie, z ładownością 1785 kg. Przestronna kabina, szerokie pole widzenia i wersja Cargo z zabudową Niewiadów.",
    highlights: [
      "Konstrukcja oparta na ramie, ładowność 1785 kg",
      "Przestronna kabina, wygodne fotele i szerokie pole widzenia",
      '7" wielofunkcyjny ekran dotykowy i elektroniczny panel wskaźników LCD',
      "Przednie hamulce tarczowe, tylne bębnowe",
      "Wersja Light Truck Cargo z zabudową Niewiadów",
    ],
    specs: [
      { label: "Długość × szerokość × wysokość", value: "5985 × 1880 × 2030 mm" },
      { label: "Rozstaw osi", value: "3600 mm" },
      { label: "Prześwit", value: "170 mm" },
      { label: "Ładowność", value: "1785 kg" },
      { label: "Dopuszczalna masa całkowita", value: "3495 kg" },
      { label: "Masa własna", value: "1710 kg" },
      { label: "Silnik", value: "benzynowy, 1590 cm³, wolnossący" },
      { label: "Moc maksymalna", value: "86 kW (117 KM)" },
      { label: "Maksymalny moment obrotowy", value: "156 Nm" },
      { label: "Prędkość maksymalna", value: "100 km/h" },
      { label: "Średnie zużycie paliwa", value: "8,1 l/100 km" },
      { label: "Zbiornik paliwa", value: "50 l" },
      { label: "Norma emisji", value: "Euro 6 EA" },
      { label: "Skrzynia biegów", value: "manualna, 5 biegów" },
      { label: "Napęd", value: "na tylną oś" },
      { label: "Zawieszenie przód i tył", value: "zależne, na resorach piórowych" },
      { label: "Opony", value: "185 R14 LT" },
      { label: "Skrzynia otwarta (dł. × szer. × wys.)", value: "3700 × 1770 × 395 mm" },
      { label: "Skrzynia wywrotki (dł. × szer. × wys.)", value: "3730 × 1850 × 400 mm" },
      { label: "Kontener Niewiadów (dł. × szer. × wys.)", value: "3600 × 1800 × 1800 mm" },
    ],
    options: ["Zabudowa kontenerowa Niewiadów (wersja Cargo)", "Zabudowa furgon"],
    faq: [
      {
        q: "Ile kosztuje BAW Light Truck?",
        a: "BAW Light Truck kosztuje od 89 900 zł brutto (73 089,43 zł netto). Wersja Light Truck Cargo z zabudową Niewiadów kosztuje od 99 900 zł brutto (81 219,51 zł netto).",
      },
      {
        q: "Jakim paliwem jest napędzany BAW Light Truck?",
        a: "BAW Light Truck ma wolnossący silnik benzynowy o pojemności 1590 cm³, mocy 86 kW (117 KM) i momencie 156 Nm. Napęd trafia na tylną oś przez 5-biegową skrzynię manualną, a średnie zużycie paliwa to 8,1 l/100 km.",
      },
      {
        q: "Jaka jest ładowność BAW Light Truck?",
        a: "BAW Light Truck ma ładowność 1785 kg przy dopuszczalnej masie całkowitej 3495 kg. Ma 5985 mm długości i 3600 mm rozstawu osi, a skrzynia ładunkowa ma 3700 × 1770 mm.",
      },
      {
        q: "Czym różni się Light Truck od Light Truck Cargo?",
        a: "Light Truck Cargo ma fabrycznie przygotowaną zabudowę Niewiadów, gotową do przewozu towarów.",
      },
      {
        q: "Gdzie kupić BAW Light Truck?",
        a: `U oficjalnego importera BAW w Polsce: ${company.name}, ${company.street}, ${company.city}.`,
      },
    ],
  },
  {
    slug: "baw-mini-truck",
    name: "BAW Mini Truck EV",
    short: "Mini Truck",
    category: "Elektryczny samochód dostawczy",
    fuel: "Elektryczny",
    priceFrom: 64900,
    image: "/cutouts/mini-truck/box.webp",
    intro:
      "W pełni elektryczny, kompaktowy samochód dostawczy do miejskiej logistyki i dostaw ostatniej mili. Dostępny w wersji Box i Cargo.",
    highlights: [
      "Napęd w 100% elektryczny, zero emisji w mieście",
      "Kompaktowa konstrukcja „MINI body”, łatwe manewrowanie i parkowanie",
      "Dwie wersje zabudowy: Box i Cargo",
      "Układ kierowniczy stabilny przy wysokiej prędkości i lekki przy niskiej",
      "Stworzony do stałych tras, wysokiego obrotu i lekkiej dystrybucji",
    ],
    specs: [
      { label: "Bateria", value: "LiFePO4, 15,4 kWh, szczelność IP67" },
      { label: "Zasięg", value: "min. 150 km" },
      { label: "Moc silnika", value: "30 kW" },
      { label: "Maksymalny moment obrotowy", value: "110 Nm" },
      { label: "Prędkość maksymalna", value: "71 km/h" },
      { label: "Liczba miejsc", value: "2" },
      { label: "Długość × szerokość × wysokość", value: "3820 × 1480 × 1680 mm" },
      { label: "Rozstaw osi", value: "2630 mm" },
      { label: "Masa własna", value: "850 kg" },
      { label: "Skrzynia ładunkowa (dł. × szer. × wys.)", value: "2015 × 1400 × 320 mm" },
      { label: "Zabudowa furgon (wersja Box)", value: "3,6 m³" },
    ],
    options: ["Pakiet zimowy: lampa LED, pług śnieżny, posypywarka soli, łańcuchy śniegowe (+9 900 zł brutto)"],
    faq: [
      {
        q: "Ile kosztuje elektryczny BAW Mini Truck?",
        a: "BAW Mini Truck kosztuje od 64 900 zł brutto (52 764,23 zł netto), a wersja Mini Truck Cargo od 69 900 zł brutto (56 829,27 zł netto).",
      },
      {
        q: "Do czego najlepiej sprawdzi się BAW Mini Truck?",
        a: "Do dostaw ostatniej mili, stałych tras po mieście i lekkiej dystrybucji, gdzie liczą się niskie koszty eksploatacji, zwrotność i brak emisji.",
      },
      {
        q: "Jakie wersje Mini Trucka są dostępne?",
        a: "Mini Truck jest dostępny w dwóch wersjach zabudowy: Box oraz Cargo.",
      },
      {
        q: "Jaki zasięg ma elektryczny BAW Mini Truck?",
        a: "Mini Truck ma baterię LiFePO4 o pojemności 15,4 kWh i zasięg co najmniej 150 km, co wystarcza na typowy dzień dostaw w mieście.",
      },
      {
        q: "Czy na BAW Mini Truck można dostać dopłatę NaszEauto?",
        a: "Mini Truck może kwalifikować się do rządowego programu dopłat do samochodów elektrycznych NaszEauto. Aktualne warunki i kwoty sprawdzisz na gov.pl, a dealer pomoże przygotować wniosek.",
      },
      {
        q: "Czy Mini Truck nadaje się do pracy zimą?",
        a: "Tak. Dostępny jest pakiet zimowy z lampą LED, pługiem śnieżnym, posypywarką soli i łańcuchami śniegowymi za 9 900 zł brutto.",
      },
      {
        q: "Czy BAW Mini Truck można wziąć w leasing?",
        a: "Tak. Zapytaj dealera o finansowanie i leasing dla firm przez formularz kontaktowy.",
      },
    ],
  },
] as const;

export type Model = (typeof models)[number];
export const modelBySlug = (slug: Model["slug"]) => models.find((m) => m.slug === slug)!;

/**
 * Points on the dealer map (/zostan-dealerem, /serwis). Add a dealer here: name, address, coordinates
 * (right-click the place in Google Maps to copy them) and optionally phone, e-mail and website.
 */
export type Dealer = {
  id: string;
  name: string;
  kind: "Importer" | "Dealer" | "Serwis" | "Dealer i serwis";
  /** Leave out when the address is not known yet: the card then shows only the city. */
  street?: string;
  city: string;
  region: string;
  lat: number;
  lng: number;
  phone?: string | string[];
  email?: string;
  url?: string;
  /** A location announced but not open yet: gold pin, "Otwarcie wkrótce" card, listed separately. */
  comingSoon?: true;
};

export const dealers: Dealer[] = [
  {
    id: "ksawerow",
    name: "BAW Automotive Polska",
    kind: "Importer",
    street: company.street,
    city: company.city,
    region: "łódzkie",
    lat: 51.6826,
    lng: 19.4012,
    email: company.email,
    url: "/kontakt",
  },
  // Dealers below are copied from the old WordPress map (bawautomotive.pl/dealer-serwis), November 2026.
  {
    id: "warszawa-edmark",
    name: "EDMARK AUTO - Markowska i Wspólnicy Sp.J.",
    kind: "Dealer",
    street: "ul. Grochowska 168A",
    city: "04-357 Warszawa",
    region: "mazowieckie",
    lat: 52.2445,
    lng: 21.0962,
    phone: "882 177 007",
    url: "https://www.212.edmark.com.pl",
  },
  {
    id: "lodz",
    name: "BAW Łódź",
    kind: "Dealer",
    // The old site gives no street address for Łódź, so the pin sits in the city centre.
    city: "Łódź",
    region: "łódzkie",
    lat: 51.7592,
    lng: 19.456,
    phone: ["501 187 265", "508 084 803"],
    email: "biuro@baw-polska.pl",
  },
  {
    id: "konin-nowicki",
    name: "BAW Nowicki",
    kind: "Dealer",
    street: "ul. Poznańska 48",
    city: "62-510 Konin",
    region: "wielkopolskie",
    lat: 52.2277,
    lng: 18.2394,
    phone: "63 245 44 35",
    email: "salon@bawkonin.pl",
  },
  {
    id: "kalisz-nowicki",
    name: "BAW Nowicki Oddział Kalisz",
    kind: "Dealer",
    street: "ul. Stańczukowskiego 18",
    city: "62-800 Kalisz",
    region: "wielkopolskie",
    lat: 51.7614,
    lng: 18.0595,
    phone: "63 245 44 35",
    email: "sprzedaz@bawkalisz.pl",
  },
  {
    id: "czestochowa",
    name: "BAW Częstochowa",
    kind: "Dealer",
    street: "ul. Chłopska 20",
    city: "42-271 Częstochowa",
    region: "śląskie",
    lat: 50.7657,
    lng: 19.0376,
  },
  // Announced locations, not open yet. Pins sit in the city centre until the addresses are known.
  {
    id: "wroclaw",
    name: "BAW Wrocław",
    kind: "Dealer",
    city: "Wrocław",
    region: "dolnośląskie",
    lat: 51.1079,
    lng: 17.0385,
    comingSoon: true,
  },
  {
    id: "trojmiasto",
    name: "BAW Trójmiasto",
    kind: "Dealer",
    city: "Trójmiasto",
    region: "pomorskie",
    lat: 54.4416,
    lng: 18.5601,
    comingSoon: true,
  },
  {
    id: "bydgoszcz",
    name: "BAW Bydgoszcz",
    kind: "Dealer",
    city: "Bydgoszcz",
    region: "kujawsko-pomorskie",
    lat: 53.1235,
    lng: 18.0084,
    comingSoon: true,
  },
  {
    id: "gorzow",
    name: "BAW Gorzów Wielkopolski",
    kind: "Dealer",
    city: "Gorzów Wielkopolski",
    region: "lubuskie",
    lat: 52.7368,
    lng: 15.2288,
    comingSoon: true,
  },
  {
    id: "nowy-sacz",
    name: "BAW Nowy Sącz",
    kind: "Dealer",
    city: "Nowy Sącz",
    region: "małopolskie",
    lat: 49.6218,
    lng: 20.697,
    comingSoon: true,
  },
  {
    id: "krakow",
    name: "BAW Kraków",
    kind: "Dealer",
    city: "Kraków",
    region: "małopolskie",
    lat: 50.0647,
    lng: 19.945,
    comingSoon: true,
  },
  {
    id: "nowy-targ",
    name: "BAW Nowy Targ",
    kind: "Dealer",
    city: "Nowy Targ",
    region: "małopolskie",
    lat: 49.4775,
    lng: 20.0327,
    comingSoon: true,
  },
];
