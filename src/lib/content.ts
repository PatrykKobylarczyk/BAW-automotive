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
  { label: "Cennik", href: "/cennik" },
  { label: "O marce", href: "/o-marce" },
  { label: "Serwis", href: "/serwis" },
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

// Photo view: one studio photo per colour
export const colors212 = [
  { name: "Oliwkowy", hex: "#4b5a3a", src: `${U}/2025/10/212-car.png` },
  { name: "Czarny", hex: "#121212", src: `${U}/2025/10/212-black.png` },
  { name: "Grafitowy", hex: "#7d8085", src: `${U}/2025/10/212-gray-480x236.png` },
  { name: "Biały", hex: "#ececec", src: `${U}/2025/10/212-white-2-480x236.png` },
];

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

export const miniTruckGallery = [1, 10, 6, 7, 12, 11, 3, 2, 8, 5, 9].map(
  (n) => `${U}/2025/10/Mini_truck_est_${n}-${[6, 12, 8, 5].includes(n) ? 2 : 1}-1630x860.jpg`,
);

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
  { name: "Mini Truck", fuel: "Elektryczny", gross: "64 900", net: "52 764,00", img: `${U}/2025/10/baw-mini-box.webp`, href: "/modele/baw-mini-truck" },
  { name: "Mini Truck Cargo", fuel: "Elektryczny", gross: "69 900", net: "56 829,27", img: `${U}/2025/11/BAW-mimitruck.webp`, href: "/modele/baw-mini-truck" },
];

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
        a: "BAW Mini Truck kosztuje od 64 900 zł brutto (52 764 zł netto), a wersja Mini Truck Cargo od 69 900 zł brutto (56 829,27 zł netto).",
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
  street: string;
  city: string;
  region: string;
  lat: number;
  lng: number;
  phone?: string;
  email?: string;
  url?: string;
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
];
