# RUCH E — „PROSTO"

Landing przed otwarciem kawiarni Ruch Coffee (Warszawa). Wersja celowo minimalna.

**Źródła prawdy:** `BRIEF-I-TRESC.md` (brief klienta) i `PROMPT-E-PROSTO.md` (spec tej wersji).
Przy rozjeździe wygrywa BRIEF. Ten plik jest tylko streszczeniem.

## Cel

Jedno zadanie: **człowiek zostawia maila i dostaje kartę lojalnościową z 5 nabitymi
pieczątkami do portfela w telefonie.** Metryka: liczba kart w portfelach. Nic innego.

## Zasada naczelna

1. Jeśli element nie prowadzi do wpisania maila — nie ma go.
2. Jedno wezwanie do działania. Żadnych linków nad formularzem.
3. Marka wchodzi przez materiały (logo, naklejki, fonty, kolory), nie przez efekty.
   Zero animacji, parallaksy, loadera, 3D, dźwięku.

## Tokeny

```
--cream  #E9E4DD   tło
--paper  #F6F3EE
--ink    #241610   tekst
--orange #EC4A24   TYLKO przycisk i naklejki
```

Fonty z paczki (jedyne wagi, jakie są): **Cina Sans Medium** (nagłówki),
**Quadrant Text Mono Regular** (etykiety, drobny druk). Oba jako woff2, preload,
`font-display: swap`. Bez trzeciego kroju, bez fontów systemowych/Google.

## Obie ścieżki

1. **Zapis** (`index.html`): logo → nagłówek → zdanie oferty → formularz
   (e-mail + niezaznaczony checkbox zgody + przycisk CHCĘ KARTĘ) → link do polityki.
   Po sukcesie formularz podmienia się na „sprawdź skrzynkę i potwierdź adres".
   **Bez przycisków Wallet na tym ekranie.** Punkty logo–polityka mieszczą się
   na 375×667 bez scrollowania.
2. **Potwierdzenie** (`potwierdzenie.html`): lądowanie z linku w mailu (double opt-in),
   dwa przyciski: Apple Wallet i Google Wallet. Kartę wydajemy dopiero tutaj.

Backend (wysyłka maila, wydanie karty, walidacja serwerowa) NIE istnieje w tej wersji —
wszystko przez jedną funkcję `submitSignup(email, consent)` z wyraźnym `TODO`.
Nie instalować SDK maili ani portfeli. Formularz działa bez JS (`<form method="post">`).

## Stack i ograniczenia

Czysty HTML + CSS + minimum JS. **Zero zależności, zero buildu, zero zewnętrznych
skryptów.** Budżet: cała strona < 300 kB z fontami, LCP < 1,5 s na 4G.
Kontrast ≥ 4.5:1, obsługa z klawiatury, mobile first od 375 px.
Krawędzie ostre — bez zaokrągleń, gradientów i miękkich cieni.

## Izolacja

- Katalogi `RUCH-A-rozlanie`, `RUCH-B-kanal`, `RUCH-C-maziaj`, `RUCH-D-orbita`
  to konkurencyjne wersje: **nie czytać, nie porównywać, nie współdzielić kodu.**
- Materiały: `/Users/kam/Documents/Projects/Ruch` — tylko odczyt.
  Do `assets/` kopiujemy wyłącznie to, czego strona używa.
- `_podglad/` to roboczy arkusz kontaktowy materiałów, poza gitem.

## Praca

Punkt po punkcie z sekcji KOLEJNOŚĆ PRACY w PROMPT. Po każdym punkcie stop i commit
(opisy po polsku). Serwer podglądu: launch.json `ruch-e`, port 5190.
Remote: `github.com/KamWeg/ruch-e`.
