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
  { value: "2.0 T", label: "GDI — turbo z wtryskiem bezpośrednim" },
  { value: "659 mm", label: "maksymalna głębokość brodzenia" },
  { value: "80%", label: "maksymalne nachylenie podjazdu" },
  { value: "40,3°", label: "kąt natarcia (zejścia 35,5°)" },
];

export const offroadFeatures = [
  "Inteligentny napęd 4WD part-time",
  "Elektronicznie sterowane blokady dyferencjałów przedniej i tylnej osi",
  "Centralny dyferencjał z funkcją blokady",
  "Pięciopunktowe, niezależne zawieszenie przód i tył",
];

export const gallery212 = ["34-front", "side", "34-rear", "front", "paint-white", "paint-graphite", "paint-black", "top"].map(
  (n) => `/gallery/212/${n}.webp`,
);

export const miniTruckGallery = [1, 10, 6, 7, 12, 11, 3, 2, 8, 5, 9].map(
  (n) => `${U}/2025/10/Mini_truck_est_${n}-${[6, 12, 8, 5].includes(n) ? 2 : 1}-1630x860.jpg`,
);

// Studio renders on a white background, one or two per body type (model page gallery)
export const lightTruckGallery = [
  "przod",
  "skrzynia-przod-34-1",
  "skrzynia-tyl-34-1",
  "kontener-przod-34-1",
  "kontener-tyl-34-1",
  "kontener-tyl-otwarty",
  "wywrotka-przod-podniesiona",
  "wywrotka-bok-podniesiona-1",
  "wywrotka-trzy-strony",
  "komunalna-przod-34-1",
  "komunalna-tyl-34-1",
  "komunalna-wymiary-bok",
].map((n) => `/gallery/light-truck/${n}.webp`);

export const lightTruck = {
  image: `${U}/2025/10/BAW_Small_005_gallery.png.webp`,
  gallery: [1, 2, 3, 4, 5, 6].map((n) => {
    const twin = [2, 3].includes(n) ? ".png-kopia-blizniak" : n === 6 ? ".png-kopiablizniak" : ".png";
    return `${U}/2025/10/BAW_Small_00${n}_gallery${twin}.webp`;
  }),
  specs: [
    { value: '7"', label: "wielofunkcyjny ekran dotykowy" },
    { value: "LCD", label: "elektroniczny panel wskaźników" },
    { value: "2 typy", label: "konstrukcja frameless lub on-frame" },
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
  /** Studio photo (white background) from the "auta" folder; none yet for 212 Mavero */
  img?: string;
  featured?: boolean;
} & ({ gross: number; net?: never } | { net: number; gross?: never }))[] = [
  { model: "212 T01", version: "SUV", fuel: "Diesel", gross: 174500, href: "/modele/baw-212", img: "/gallery/212/t01-czarny-przod.webp", featured: true },
  { model: "212 T01", version: "Pick-up", fuel: "Diesel", net: 178049, href: "/modele/baw-212", img: "/gallery/212/pickup-grafit-tyl.webp" },
  { model: "212 Mavero", version: "SUV", fuel: "Benzyna", gross: 199900 },
  { model: "Light Truck (LT7)", version: "Skrzynia", fuel: "Benzyna", net: 73089, href: "/modele/baw-light-truck", img: "/gallery/light-truck/skrzynia-przod-34-1.webp" },
  { model: "Light Truck (LT7)", version: "Skrzynia komunalna", fuel: "Benzyna", net: 76829, href: "/modele/baw-light-truck", img: "/gallery/light-truck/komunalna-przod-34-1.webp" },
  { model: "Light Truck (LT7)", version: "Kontener (Cargo, zabudowa Niewiadów)", fuel: "Benzyna", net: 81220, href: "/modele/baw-light-truck", img: "/gallery/light-truck/kontener-przod-34-1.webp" },
  { model: "Light Truck (LT7)", version: "Wywrotka jednostronna", fuel: "Benzyna", net: 81220, href: "/modele/baw-light-truck", img: "/gallery/light-truck/wywrotka-bok.webp" },
  { model: "Light Truck (LT7)", version: "Wywrotka trójstronna", fuel: "Benzyna", net: 104900, href: "/modele/baw-light-truck", img: "/gallery/light-truck/wywrotka-bok-podniesiona-1.webp" },
  { model: "Mini Truck EV", version: "Box", fuel: "Elektryczny", gross: 64900, href: "/modele/baw-mini-truck", img: "/gallery/mini-truck/skrzynia-przod-34.webp" },
  { model: "Mini Truck EV", version: "Cargo", fuel: "Elektryczny", gross: 69900, href: "/modele/baw-mini-truck", img: "/gallery/mini-truck/cargo-przod-34-1.webp" },
];

const round2 = (n: number) => Math.round(n * 100) / 100;
export const grossOf = (p: { gross?: number; net?: number }) => p.gross ?? round2(p.net! * 1.23);
export const netOf = (p: { gross?: number; net?: number }) => p.net ?? round2(p.gross! / 1.23);

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
      "Terenowy SUV z napędem 4WD, blokadami dyferencjałów i silnikiem 2.0 T GDI. Brodzi do 659 mm, podjeżdża pod 80% nachylenia i zachowuje komfort na co dzień.",
    highlights: [...offroadFeatures, "Silnik 2.0 T GDI z turbodoładowaniem i wtryskiem bezpośrednim", "Kąt natarcia 40,3°, kąt zejścia 35,5°"],
    specs: [
      { label: "Długość × szerokość × wysokość", value: "4705 × 1895 × 1936 mm" },
      { label: "Rozstaw osi", value: "2860 mm" },
      { label: "Prześwit", value: "235 mm" },
      { label: "Kąt rampowy", value: "23,6°" },
      { label: "Masa własna", value: "2235 kg" },
      { label: "Moc maksymalna", value: "125 kW" },
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
        a: "Maksymalna głębokość brodzenia BAW 212 wynosi 659 mm, a maksymalne nachylenie podjazdu to 80%.",
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
      "Lekki samochód użytkowy nowej generacji, w konstrukcji bezramowej lub z ramą. Przestronna kabina, szerokie pole widzenia i wersja Cargo z zabudową Niewiadów.",
    highlights: [
      "Dwa typy konstrukcji: bezramowa (frameless) lub z ramą (on-frame)",
      "Przestronna kabina, wygodne fotele i szerokie pole widzenia",
      '7" wielofunkcyjny ekran dotykowy i elektroniczny panel wskaźników LCD',
      "Przednie hamulce tarczowe, tylne bębnowe",
      "Wersja Light Truck Cargo z zabudową Niewiadów",
    ],
    specs: [
      { label: "Długość", value: "5585 / 5985 mm" },
      { label: "Szerokość × wysokość", value: "1880 × 2050 mm" },
      { label: "Rozstaw osi", value: "3400 / 3600 mm" },
      { label: "Ładowność", value: "2000 / 2500 kg" },
      { label: "Masa własna", value: "1595 / 1740 kg" },
      { label: "Pojemność silnika", value: "1590 / 1962 cm³" },
      { label: "Moc maksymalna", value: "91 / 106 kW" },
      { label: "Maksymalny moment obrotowy", value: "161 / 200 Nm" },
      { label: "Prędkość maksymalna", value: "105 km/h" },
      { label: "Skrzynia biegów", value: "manualna, 5 biegów" },
      { label: "Napęd", value: "na tylną oś" },
      { label: "Zawieszenie tylne", value: "resory piórowe" },
      { label: "Opony", value: "185 R14 LT" },
      { label: "Zabudowa Cargo (Niewiadów)", value: "kontener 3,6 × 1,8 m" },
    ],
    options: ["Zabudowa kontenerowa Niewiadów (wersja Cargo)", "Zabudowa furgon"],
    faq: [
      {
        q: "Ile kosztuje BAW Light Truck?",
        a: "BAW Light Truck kosztuje od 89 900 zł brutto (73 089,43 zł netto). Wersja Light Truck Cargo z zabudową Niewiadów kosztuje od 99 900 zł brutto (81 219,51 zł netto).",
      },
      {
        q: "Jakim paliwem jest napędzany BAW Light Truck?",
        a: "BAW Light Truck ma silnik benzynowy o pojemności 1590 lub 1962 cm³ i mocy 91 lub 106 kW, w zależności od wersji. Napęd trafia na tylną oś przez 5-biegową skrzynię manualną.",
      },
      {
        q: "Jaka jest ładowność BAW Light Truck?",
        a: "W zależności od wersji BAW Light Truck przewozi od 2000 do 2500 kg ładunku. Wersje różnią się długością (5585 lub 5985 mm) i rozstawem osi.",
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
    image: `${U}/2025/10/baw-mini-box.webp`,
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
