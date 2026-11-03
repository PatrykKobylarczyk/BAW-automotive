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
- Indeksowanie włącza się dopiero, gdy w Vercelu (Production) jest ustawione `NEXT_PUBLIC_SITE_URL`. Do tego czasu kopia na vercel.app ma `noindex` i nie konkuruje ze starą stroną WordPress.
- Stare adresy WordPressa (`/about-us/`, `/212-off-raod/`, `/light-track/`, `/zostandealerem/` itd.) przekierowują na nowe podstrony na stałe: lista w `next.config.ts`.

## Formularze (leady)

Formularz kontaktowy i zgłoszenie dealerskie wysyłają maila przez SMTP (`src/app/actions.ts`). Zmienne w Vercelu:

| Zmienna | Opis |
| --- | --- |
| `SMTP_HOST`, `SMTP_PORT` (domyślnie 465), `SMTP_USER`, `SMTP_PASS` | skrzynka nadawcza, np. ta sama, z której wysyła dziś WordPress |
| `LEADS_TO` | adres odbiorcy (domyślnie `biuro@bawautomotive.com.pl`), można podać kilka po przecinku |
| `LEADS_FROM` | adres nadawcy (domyślnie `SMTP_USER`) |

Mail zawiera dane z formularza oraz źródło: podstronę, stronę wejścia, referrer, tagi UTM i `gclid`. Ochrona przed spamem: ukryte pole i minimalny czas wypełnienia. Bez skonfigurowanego SMTP formularz pokazuje adres e-mail i zapisuje zgłoszenie w logach Vercela.

## Przełączenie domeny bawautomotive.pl

1. Skopiować zdjęcia i wideo z `wp-content/uploads` do `public/` i podmienić adresy w `content.ts` (po wyłączeniu WordPressa obecne linki przestaną działać).
2. Ustawić zmienne SMTP i `NEXT_PUBLIC_SITE_URL=https://bawautomotive.pl`, wysłać testowe zapytanie.
3. Podpiąć domenę w Vercelu (rekordy DNS), sprawdzić przekierowania starych adresów.
4. W Google Search Console zgłosić `https://bawautomotive.pl/sitemap.xml` i obserwować raport „Strony” przez 2–4 tygodnie.

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
