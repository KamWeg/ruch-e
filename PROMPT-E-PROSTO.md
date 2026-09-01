# PROMPT E — „PROSTO"

> Otwórz Claude Code **w katalogu `/Users/kam/Documents/Projects/Cloude/RUCH-E-prosty`** i wklej tam całość.
> Osobny projekt. Nie łącz go z pozostałymi (`RUCH-A-rozlanie`, `RUCH-B-kanal`, `RUCH-C-maziaj`,
> `RUCH-D-orbita`). Nie czytaj tamtych katalogów — to konkurencyjne propozycje, nie wcześniejsze etapy.

---

## CEL

Jedna strona, jeden cel: **człowiek zostawia maila i dostaje kartę lojalnościową
z 5 nabitymi pieczątkami do portfela w telefonie.** Lokal jeszcze nie działa.

Metryka to liczba kart w portfelach. Nie odsłony, nie czas na stronie.

Pełny brief i cała treść są w `BRIEF.md` w tym katalogu. Przeczytaj razem z tym plikiem.
Jeśli oba się rozjadą, wygrywa `BRIEF.md`.

---

## ZASADA NACZELNA

Poprzednie wersje tego projektu były za bogate. **Ta ma być prosta, czytelna i szybka.**

Trzy reguły, do których wracaj przy każdej decyzji:

1. **Jeśli element nie prowadzi do wpisania maila — nie ma go.** Nie „ukryjemy na później",
   nie „damy mniejsze". Nie ma.
2. **Jedno wezwanie do działania na stronie.** Jeden przycisk. Żadnych konkurencyjnych linków
   nad formularzem — Instagram i polityka prywatności dopiero pod nim.
3. **Marka wchodzi przez materiały, nie przez efekty.** Cały charakter ma pochodzić z logo,
   naklejek, kolorów i typografii z paczki. Zero animacji wjeżdżania, zero parallaksy,
   zero loadera, zero 3D, zero fizyki, zero dźwięku.

Jeżeli na końcu prac strona wygląda skromnie, a mail da się zostawić w cztery sekundy —
to jest sukces, nie porażka.

---

## MATERIAŁY

- **Projekt:** `/Users/kam/Documents/Projects/Cloude/RUCH-E-prosty`
- **Materiały (tylko odczyt):** `/Users/kam/Documents/Projects/Ruch`
- **Naklejki SVG:** `/Users/kam/Documents/Projects/Ruch/Sticker`
- **Figma:** `https://www.figma.com/design/16098QscfzM6p17F7Rfl7P/Ruch?node-id=1-2`
  (file key `16098QscfzM6p17F7Rfl7P`; logo `1:7009`, naklejki `1:7067`, menu `1:4`)

**KROK 0, zanim cokolwiek napiszesz:** przejrzyj materiały naprawdę — otwórz pliki, wyrenderuj
podglądy naklejek, wyświetl fonty. Wróć z krótką listą: jakie fonty i wagi są dostępne,
ile naklejek i jak wyglądają, w jakiej formie jest logo. Powiedz też, **czego brakuje**.
Zatrzymaj się i czekaj na moje potwierdzenie.

Skopiuj do `assets/` tylko to, czego użyjesz. Nie podstawiaj fontów systemowych ani stocka.

---

## UKŁAD

Jedna kolumna, wyśrodkowana, maksymalnie 520 px szerokości. Wszystko po kolei, bez sekcji,
bez nawigacji, bez stopki wielokolumnowej.

```
1.  LOGO              blob „ruch" z paczki, duże, na środku
2.  NAGŁÓWEK          Zapisz się, zanim otworzymy
3.  ZDANIE            Dostaniesz kartę do portfela w telefonie
                      z 5 pieczątkami. Szósta kawa u nas — gratis.
4.  FORMULARZ         pole e-mail
                      checkbox zgody marketingowej, niezaznaczony
                      przycisk CHCĘ KARTĘ
5.  DROBNYM           link do polityki prywatności
─────────────────────  ← tu kończy się to, co musi być widoczne od razu
6.  O MARCE           2–4 zdania (tekst w BRIEF.md)
7.  INSTAGRAM         jeden link
```

Punkty 1–5 **muszą mieścić się na jednym ekranie telefonu bez przewijania.**
Sprawdź to na 375 px szerokości i 667 px wysokości, czyli na małym iPhonie. Jeśli się nie mieszczą,
zmniejsz logo, a nie tekst.

Instagram jest na samym dole celowo — to jedyne wyjście ze strony i nie ma stać nad formularzem.

---

## UŻYCIE KV

**Logo zamiast słowa.** Wszędzie tam, gdzie w tekście padałaby nazwa `ruch`, wstaw znak logo
zamiast liter. Inline SVG, wyrównane do linii pisma, wysokość mniej więcej 1.4 wysokości wersalika.

> Zastrzeżenie: jeśli w akapicie o marce podmiana zaszkodzi czytelności, **zostaw tam słowo tekstem.**
> Reguła obowiązuje w nagłówkach i claimie, nie w zdaniu ciągłym za wszelką cenę.
> Każdy inline SVG z `role="img"` i `aria-label="ruch"`, żeby czytnik ekranu przeczytał nazwę.

**Naklejki — maksymalnie trzy na całej stronie.** Dekoracja, nieklikalne, `aria-hidden`.
Przekrzywione o kilka stopni, przycięte krawędzią ekranu, w tle za treścią.
Zasada rozmieszczenia: **żadna nie może dotykać formularza ani nachodzić na tekst.**
Marginesy strony są ich miejscem.

Wybierz je sam po obejrzeniu `/Sticker` i uzasadnij wybór jednym zdaniem.

---

## TYPOGRAFIA I KOLOR

```
--cream #E9E4DD   --paper #F6F3EE   --ink #241610   --orange #EC4A24
```

Tło kremowe, tekst `--ink`, pomarańcz **tylko na przycisku i na naklejkach**. Nigdzie indziej.

Grotesk z paczki na nagłówek, mono na etykiety i drobny druk. Bez trzeciego kroju.
Nagłówek duży, ale nie na pół ekranu — ma się czytać, nie robić wrażenia.

Pole e-mail: wysokie na minimum 48 px, `font-size` minimum 16 px (poniżej tego iOS
przybliża stronę przy kliknięciu w pole). Przycisk pełnej szerokości kolumny.

---

## FORMULARZ

Pola: `email` z `type="email"`, `autocomplete="email"`, `inputmode="email"`.
Checkbox zgody marketingowej — osobny, niezaznaczony, z pełną treścią zgody obok.
Bez pola na telefon.

**Zaprojektuj wszystkie cztery stany**, żaden domyślny:
spoczynek, wysyłanie (przycisk zablokowany, widoczna informacja), sukces, błąd.
Komunikaty po polsku, konkretne — „ten adres wygląda na niepoprawny", nie „wystąpił błąd".

Po sukcesie **podmień formularz na komunikat**: sprawdź skrzynkę i potwierdź adres,
tam będzie karta. **Bez przycisków Wallet na tym ekranie** — kartę wydajemy dopiero
po potwierdzeniu maila.

Zrób osobną, prostą stronę `potwierdzenie.html` z dwoma przyciskami: Apple Wallet
i Google Wallet. Tam ląduje człowiek po kliknięciu w link z maila.

Honeypot przeciw botom zamiast CAPTCHY. Walidacja po stronie serwera też będzie potrzebna —
zostaw to jako `TODO`.

**Zaplecze:** wysyłka i wydanie karty to backend, dostawca nie jest wybrany.
Wyprowadź to do jednej funkcji `submitSignup(email, consent)` z wyraźnym `TODO`.
Nie instaluj SDK do maili ani do portfeli.

---

## STACK

**Zwykły HTML, CSS i minimum JavaScriptu. Bez frameworka, bez buildu.**
Ma to być jeden plik `index.html`, jeden `style.css`, jeden `app.js`, fonty i kilka SVG.

Jeśli uważasz, że potrzebny jest build, powiedz dlaczego i poczekaj na zgodę.

---

## OGRANICZENIA

- **Szybkość jest funkcją.** Cel: LCP poniżej 1,5 s na 4G, cała strona poniżej 300 kB
  razem z fontami. Zmierz i podaj liczby.
- Fonty jako `woff2`, `font-display: swap`, wczytywane z `preload`. Tylko te wagi, których używasz.
- Zero zewnętrznych skryptów, zero Google Fonts, zero bibliotek.
- Działa z wyłączonym JS — formularz jako zwykły `<form method="post">` z akcją serwerową,
  JS tylko go ulepsza.
- Kontrast minimum 4.5:1. Focus widoczny. Etykiety powiązane z polami przez `for`.
  Cała strona obsługiwalna z klawiatury.
- `prefers-reduced-motion` — nie ma czego wyłączać, bo nie ma animacji. Dobrze.
- Mobile first. Projektuj od 375 px w górę, nie odwrotnie.
- `LocalBusiness` w JSON-LD, Open Graph z obrazkiem, sensowny `<title>` i opis.

---

## CZEGO NIE ROBIĆ

- Bez loadera, animacji wejścia, parallaksy, śledzenia kursora, 3D, fizyki, dźwięku.
- Bez sekcji „o nas" dłuższej niż cztery zdania, bez menu, cennika, godzin i adresu.
- Bez cookie bannera, jeśli nie ma analityki. Nie dodawaj analityki bez pytania.
- Bez zaokrągleń, gradientów i miękkich cieni. Krawędzie ostre, cienie twarde i przesunięte,
  jak u nadrukowanej naklejki — jeśli w ogóle.
- Bez drugiego przycisku gdziekolwiek nad formularzem.

---

## KOLEJNOŚĆ PRACY

1. Przejrzyj materiały. Przynieś listę. **Stop.**
2. Sam HTML z treścią i formularzem, bez stylowania. Ma być czytelny i kompletny. **Stop.**
3. Typografia, kolory, układ kolumny. Pokaż na 375 px i na desktopie. **Stop.**
4. Logo w miejscu nazwy, trzy naklejki.
5. Stany formularza i strona `potwierdzenie.html`.
6. Pomiar wagi i LCP, dostępność, przejście przez OGRANICZENIA punkt po punkcie.

Po każdym punkcie zatrzymaj się i pokaż wynik.
Po punkcie 3 zapytaj mnie, czy czegoś nie jest **za dużo** — nie za mało.
