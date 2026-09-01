# BRIEF I TREŚĆ — wspólne dla wszystkich trzech kierunków

> Skopiuj ten plik do katalogu projektu jako `BRIEF.md`, obok `PROMPT.md`.
> Ten plik ma pierwszeństwo przed sekcją TREŚĆ w `PROMPT.md`, jeśli się rozjadą.

---

## CEL STRONY — jedno zdanie

Strona istnieje po to, żeby **przed otwarciem lokalu** ludzie zostawili maila i zainstalowali
w telefonie kartę lojalnościową z **już nabitymi pieczątkami**.

Wszystko inne na tej stronie jest podporządkowane tej jednej akcji. Jeśli jakiś element jej nie służy,
nie ma go. To nie jest strona kawiarni — kawiarnia jeszcze nie działa. To jest maszyna do zapisów.

**Jedna metryka sukcesu:** liczba kart faktycznie dodanych do portfela.
Nie odsłony, nie czas na stronie, nie zapisy do newslettera. Karty w portfelach.

---

## LEJEK

```
1.  Wejście           claim marki, jedno zdanie o tym, co dostajesz
2.  Oferta            „zapisz się, dostajesz kartę z 5 pieczątkami"
3.  Formularz         e-mail (wymagany), telefon (opcjonalny), zgody
4.  Potwierdzenie     mail z linkiem — double opt-in
5.  Karta             po kliknięciu w link: dwa przyciski, Apple Wallet i Google Wallet
6.  Social            odnośniki
7.  O marce           2–4 zdania
```

Punkty 6 i 7 mogą być gdziekolwiek. Punkty 1–3 muszą być widoczne bez scrollowania,
na telefonie też. Punkt 5 to osobny ekran albo mail, **nie** przycisk obok formularza —
karty nie wydajemy przed potwierdzeniem adresu.

---

## TREŚĆ — dosłownie

**Claim:**
```
ruch — make your everyday
```

**O marce (2–4 zdania, tekst od klienta):**
```
ruch to nowa, codzienna sieć specialty coffee, która dopasowuje się do Twojego
kawowego rytuału i tempa dnia. Demokratyzujemy cenę kawy specialty tak, żebyście
mogli pić ją na mieście każdego dnia.
```

> Uwaga redakcyjna: w materiale od klienta pada raz `specialty`, raz `speciality`.
> Ujednoliciłem na `specialty`, bo tak jest w key visualu. Do potwierdzenia.

**Oferta — do napisania, propozycja:**
```
Zapisz się, zanim otworzymy.
Dostaniesz kartę do portfela w telefonie z 5 pieczątkami już nabitymi.
Szósta kawa u nas — gratis.
```

**Frazy z brandingu, do wplecenia:**
`MAKE YOUR EVERYDAY` · `BREWED IN RUCH` · `Stand still? Nein, danke` · `NEW COFFEE ROUTINE`

**Czego na stronie NIE MA:**
menu z cenami, godziny otwarcia, opis wnętrza, zdjęcia jedzenia, sekcja „o nas" dłuższa niż cztery
zdania, zakładki, nawigacja. Merch — najwyżej jedna linijka `WKRÓTCE`, jeśli w ogóle.

---

## 5 CZY 6 PIECZĄTEK — decyzja do podjęcia

Klient waha się między dwoma wariantami. To nie jest kosmetyka, to dwa różne mechanizmy.

**5 pieczątek** (karta na 6): klient kupuje jedną kawę, karta się zapełnia, następna gratis.
Pierwsza wizyta to sprzedaż, druga to odbiór nagrody. **Dwie wizyty w pętli.**

**6 pieczątek** (karta pełna od razu): pierwsza wizyta to darmowa kawa. Jedna wizyta, zero przychodu,
i osoba, która przyszła po gratis, nie ma powodu wrócić.

**Rekomendacja: 5.** Dodatkowy argument jest psychologiczny — karta pokazana jako „5 z 6"
działa mocniej niż pusta karta na 6, bo cel wygląda na prawie osiągnięty. To udokumentowany efekt
(goal-gradient, Nunes i Drèze), i akurat tutaj działa na waszą korzyść bez żadnej manipulacji:
człowiek naprawdę dostaje 5 pieczątek za darmo.

Jeżeli celem jest ruch w drzwiach w dniu otwarcia za wszelką cenę, 6 też się broni —
ale wtedy trzeba to policzyć jako koszt marketingu, nie jako program lojalnościowy.

---

## KARTA W PORTFELU — jak to naprawdę działa

To jest najtrudniejsza część projektu i nie jest to praca frontendowa.

**Apple Wallet.** Potrzebne konto w Apple Developer Program (99 USD rocznie), certyfikat
Pass Type ID, podpisany pakiet `.pkpass`. Podpisywanie musi się dziać na serwerze — klucza
prywatnego nie da się trzymać w przeglądarce. Żeby pieczątki dało się dobijać zdalnie,
trzeba jeszcze web service i powiadomienia push do przepustek.

**Google Wallet.** Konto Google Wallet API, konto usługowe, klasa i obiekt przepustki,
link zapisu podpisany JWT. Aktualizacja pieczątek przez Objects API.

**Rekomendacja: nie budujcie tego sami na start.** Gotowi dostawcy kart stemplowych
(np. Passkit, Loopy Loyalty, Pass2U, Walletly i podobni) obsługują oba portfele, dobijanie
pieczątek i aplikację do skanowania dla obsługi. Zweryfikujcie aktualne cenniki i to,
czy dają API do wydania karty od razu po potwierdzeniu maila — bo to jest tutaj kluczowe.

Strona ma wtedy jedno zadanie: zebrać maila, potwierdzić go i wywołać API dostawcy.

**Pytanie operacyjne, które trzeba rozstrzygnąć przed startem:**
w jaki sposób barista dobija pieczątkę? Skanem kodu z telefonu klienta, aplikacją na tablecie
przy kasie, czy integracją z waszym POS-em? Bez odpowiedzi na to strona wyda karty,
których nikt nie będzie w stanie obsłużyć.

**Zabezpieczenie:** jedna karta na jeden potwierdzony adres e-mail, unikalny numer seryjny
w każdej przepustce, wydanie dopiero po kliknięciu w link z maila. Bez tego darmowe kawy
rozejdą się w pierwszym tygodniu.

---

## FORMULARZ I ZGODY — Polska, RODO

Zbieracie dane osobowe w celu marketingowym, więc to nie jest samo pole na maila.

- **Zgoda marketingowa** jako osobny, niezaznaczony domyślnie checkbox. Nie w regulaminie,
  nie „zapisując się akceptujesz". Osobne pole, świadomy klik.
- **Double opt-in** — link potwierdzający w mailu. To jednocześnie zabezpiecza przed
  wpisywaniem cudzych adresów i przed farmieniem kart.
- **Polityka prywatności** — kto jest administratorem, po co dane, jak długo, prawo do usunięcia,
  kontakt. Osobna podstrona, link przy formularzu.
- **Telefon opcjonalny.** Jeśli go zbieracie, potrzebna osobna zgoda na kontakt telefoniczny —
  to inna podstawa niż mail. Rekomendacja: na start nie zbierajcie numeru wcale.
  Jedno pole konwertuje lepiej niż dwa, a numer nie jest wam do niczego potrzebny.
- **Wypis** w każdej wiadomości.

Formularz techniczie: pole `email` z `type="email"`, `autocomplete="email"`, `inputmode="email"`.
Walidacja po stronie serwera, nie tylko w przeglądarce. Honeypot przeciw botom zamiast CAPTCHY.
Stany: spoczynek, wysyłanie, sukces, błąd — wszystkie zaprojektowane, żaden nie domyślny.

---

## SOCIAL

Instagram jako główny. Do potwierdzenia u klienta: dokładny handle i czy jest TikTok.
W materiałach z Figmy pojawia się `@ruch.coffee` — zweryfikować przed wdrożeniem.

---

## PYTANIA DO KLIENTA — przed startem prac

1. Pięć czy sześć pieczątek. Bez tego nie da się zaprojektować oferty.
2. Data otwarcia — podajemy ją na stronie czy nie? Odliczanie to mocny element,
   ale tylko jeśli data jest pewna.
3. Adres — publikujemy przed otwarciem czy dopiero po?
4. Czy jest wybrany dostawca kart stemplowych, czy trzeba go dobrać?
5. Jak obsługa będzie dobijać pieczątki?
6. Prawdziwy handle na Instagramie.
7. Kto jest administratorem danych i czy jest już polityka prywatności?
8. Czy karta ma mieć datę ważności — pieczątki bezterminowo czy wygasają?
