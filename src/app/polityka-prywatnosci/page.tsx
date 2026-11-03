import type { Metadata } from "next";
import { PageHeader, Prose } from "@/components/PageParts";
import { company } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("privacy");

export default function Page() {
  return (
    <main>
      <PageHeader page="privacy" eyebrow="Informacje prawne" title="Polityka prywatności" />
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-5 md:px-8">
          <Prose>
            <h2>1. Administrator danych</h2>
            <p>
              Administratorem danych osobowych jest {company.name}, {company.street}, {company.city}, NIP {company.nip},
              REGON {company.regon}. W sprawach danych osobowych napisz na{" "}
              <a href={`mailto:${company.email}`}>{company.email}</a>.
            </p>

            <h2>2. Jakie dane przetwarzamy i w jakim celu</h2>
            <p>Przetwarzamy dane, które podajesz w formularzu kontaktowym lub zgłoszeniowym: imię i nazwisko, dane firmy (nazwa, stanowisko, NIP, adres, strona internetowa), adres e-mail, numer telefonu i treść wiadomości. Razem z wiadomością zapisujemy adres podstrony, z której ją wysłano, oraz źródło wizyty (np. kampania reklamowa). Używamy tych danych, aby:</p>
            <ul>
              <li>odpowiedzieć na zapytanie, przygotować ofertę lub umówić jazdę próbną (art. 6 ust. 1 lit. b RODO),</li>
              <li>prowadzić rozmowy o współpracy dealerskiej (art. 6 ust. 1 lit. f RODO, nasz prawnie uzasadniony interes),</li>
              <li>dochodzić roszczeń lub bronić się przed nimi (art. 6 ust. 1 lit. f RODO).</li>
            </ul>

            <h2>3. Jak długo przechowujemy dane</h2>
            <p>
              Dane z zapytań przechowujemy przez czas potrzebny do obsługi sprawy, nie dłużej niż 12 miesięcy od
              ostatniego kontaktu, chyba że dłuższe przechowywanie jest potrzebne do dochodzenia roszczeń. Jeśli zawrzemy umowę, dane przechowujemy przez okres wymagany przepisami podatkowymi i
              rachunkowymi.
            </p>

            <h2>4. Odbiorcy danych</h2>
            <p>
              Dane mogą otrzymać podmioty, które obsługują dla nas serwis internetowy i pocztę elektroniczną (hosting, poczta),
              autoryzowani dealerzy BAW, jeśli Twoje zapytanie dotyczy ich regionu, oraz organy publiczne, gdy wymaga tego
              prawo.
            </p>

            <h2>5. Twoje prawa</h2>
            <p>Masz prawo do:</p>
            <ul>
              <li>dostępu do swoich danych i otrzymania ich kopii,</li>
              <li>sprostowania, usunięcia lub ograniczenia przetwarzania danych,</li>
              <li>przenoszenia danych,</li>
              <li>sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie,</li>
              <li>wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa).</li>
            </ul>
            <p>Podanie danych jest dobrowolne, ale bez nich nie odpowiemy na zapytanie.</p>

            <h2>6. Pliki cookies</h2>
            <p>
              Serwis używa wyłącznie plików niezbędnych do prawidłowego działania strony. Nie używamy plików cookies
              reklamowych ani analitycznych. Jeśli to się zmieni, zaktualizujemy tę politykę i poprosimy o zgodę.
            </p>

            <h2>7. Zmiany polityki</h2>
            <p>Aktualna wersja polityki prywatności jest zawsze dostępna na tej stronie.</p>
          </Prose>
        </div>
      </section>
    </main>
  );
}
