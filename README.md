# BAW Automotive Polska — propozycja nowej strony

Next.js 16 · Tailwind CSS 4 · Motion (Framer Motion) · Lenis (smooth scroll)

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build produkcyjny
```

## Podstrony (SEO)

| Adres | Zawartość |
| --- | --- |
| `/` | strona główna |
| `/modele` | przegląd gamy |
| `/modele/baw-212`, `/modele/baw-mini-truck`, `/modele/baw-light-truck` | strona modelu: sekcja modelu, cechy, FAQ, inne modele, formularz |
| `/cennik` | karty cen + tabela brutto/netto + FAQ |
| `/o-marce`, `/zostan-dealerem`, `/serwis`, `/kontakt`, `/polityka-prywatnosci` | strony informacyjne |

- Tytuły, opisy i adresy kanoniczne: `src/lib/seo.ts` (`pages`). Dane modeli i FAQ: `models` w `src/lib/content.ts`.
- `sitemap.xml` i `robots.txt` generują się z tej samej listy. Na podglądach Vercela (`VERCEL_ENV=preview`) strona ma `noindex`.
- Dane strukturalne JSON-LD: AutoDealer (cała strona), BreadcrumbList, Product/Car z ceną, FAQPage, ItemList.
- Domena: ustaw `NEXT_PUBLIC_SITE_URL` w Vercelu (domyślnie `https://bawautomotive.pl`).

## Struktura

- `src/lib/content.ts` — wszystkie teksty, ceny, dane firmy i adresy zdjęć
- `src/components/Hero.tsx` — wideo z parallaxem, animowany nagłówek
- `src/components/Intro.tsx` — pasek modeli, liczniki, „Dlaczego BAW”
- `src/components/OffroadReveal.tsx` — przypięta sekcja: zdjęcie rozszerza się do pełnego ekranu
- `src/components/Models.tsx` — 212 (zmiana koloru), Mini Truck (galeria przewijana poziomo), Light Truck
- `src/components/Closing.tsx` — cennik (karty 3D), dealer, formularz kontaktowy, stopka

## Przed wdrożeniem

- Zdjęcia i wideo są pobierane bezpośrednio z bawautomotive.pl. Skopiować je do `public/` i podmienić ścieżki w `content.ts`, potem usunąć `remotePatterns` z `next.config.ts`.
- Formularz kontaktowy nie wysyła danych — podpiąć np. Server Action + Resend/SMTP.
- Zdjęcie `212-t3.png` ma tylko 1600×600 px — na pełnym ekranie przyda się wersja w wyższej rozdzielczości.
