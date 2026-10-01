const U = "https://bawautomotive.pl/wp-content/uploads";

export const media = {
  heroVideo: `${U}/2025/11/1030.mp4`,
  heroPoster: `${U}/2025/10/212-t3.png`,
  offroad: `${U}/2025/10/212-t3.png`,
  evPhoto: `${U}/2025/10/Ev_small_est_2.jpg`,
  dealerBg: `${U}/2025/10/Mini_truck_est_6-2-1630x860.jpg`,
};

export const nav = [
  { label: "Pojazdy", href: "#modele" },
  { label: "Cennik", href: "#cennik" },
  { label: "Dlaczego BAW", href: "#dlaczego" },
  { label: "Dealer / Serwis", href: "#dealer" },
  { label: "Kontakt", href: "#kontakt" },
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

export const colors212 = [
  { name: "Oliwkowy", hex: "#4b5a3a", src: `${U}/2025/10/212-car.png` },
  { name: "Czarny", hex: "#121212", src: `${U}/2025/10/212-black.png` },
  { name: "Grafitowy", hex: "#7d8085", src: `${U}/2025/10/212-gray-480x236.png` },
  { name: "Biały", hex: "#ececec", src: `${U}/2025/10/212-white-2-480x236.png` },
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
  { name: "212 T01", fuel: "Diesel", gross: "174 500", net: "141 869,92", img: `${U}/2025/10/212-black.png`, featured: true },
  { name: "Light Truck", fuel: "Benzyna", gross: "89 900", net: "73 089,43", img: `${U}/2025/10/BAW_Small_005_gallery.png.webp` },
  { name: "Light Truck Cargo", fuel: "Benzyna · zabudowa Niewiadów", gross: "99 900", net: "81 219,51", img: `${U}/2025/10/BAW_Small_004_gallery.png.webp` },
  { name: "Mini Truck", fuel: "Elektryczny", gross: "64 900", net: "52 764,00", img: `${U}/2025/10/baw-mini-box.webp` },
  { name: "Mini Truck Cargo", fuel: "Elektryczny", gross: "69 900", net: "56 829,27", img: `${U}/2025/11/BAW-mimitruck.webp` },
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
