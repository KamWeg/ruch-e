// Przełącznik koloru strony — czyste ulepszenie. Bez JS strona działa,
// elipsy motywów są wtedy schowane. Formularz nie zależy od tego pliku.
(function () {
  var html = document.documentElement;
  document.body.classList.add('js');

  function ustaw(motyw) {
    html.dataset.motyw = motyw;
    try { localStorage.setItem('ruch-motyw', motyw); } catch (e) {}
    document.querySelectorAll('.motyw').forEach(function (przycisk) {
      przycisk.setAttribute('aria-pressed', String(przycisk.dataset.motyw === motyw));
    });
  }

  document.querySelectorAll('.motyw').forEach(function (przycisk) {
    przycisk.addEventListener('click', function () { ustaw(przycisk.dataset.motyw); });
  });

  var zapisany = null;
  try { zapisany = localStorage.getItem('ruch-motyw'); } catch (e) {}
  ustaw(zapisany || 'jasny');
})();

// ── Zaplecze zapisu ─────────────────────────────────────────────
// TODO backend: podmienić na prawdziwe wywołanie API (zapis + mail
// z linkiem potwierdzającym / double opt-in + wydanie karty przez
// dostawcę kart stemplowych). Poniżej atrapa, która tylko udaje wysyłkę.
function submitSignup(email, consent) {
  return new Promise(function (resolve) {
    setTimeout(resolve, 900);
  });
}

// ── Stany formularza: spoczynek / wysyłanie / sukces / błąd ─────
(function () {
  var form = document.querySelector('form');
  if (!form) return;

  var pole = form.querySelector('#email');
  var zgoda = form.querySelector('#zgoda');
  var pulapka = form.querySelector('#www');
  var przycisk = form.querySelector('button[type=submit]:not(.wtorny)');
  var wtorny = form.querySelector('button.wtorny');
  var blad = form.querySelector('#blad-formularza');
  var sukces = document.querySelector('.sukces');
  var tryb = 'newsletter'; // który przycisk kliknięto

  // z JS-em walidację i komunikaty przejmujemy my (po polsku)
  form.setAttribute('novalidate', '');

  wtorny.addEventListener('click', function () { tryb = 'bez-newslettera'; });
  przycisk.addEventListener('click', function () { tryb = 'newsletter'; });

  function pokazBlad(tekst) {
    blad.textContent = tekst;
    blad.hidden = false;
  }

  function schowajBlad() {
    blad.hidden = true;
    pole.removeAttribute('aria-invalid');
  }

  form.addEventListener('submit', function (zdarzenie) {
    zdarzenie.preventDefault();
    schowajBlad();

    // honeypot: człowiek go nie widzi, bot wypełnia — udajemy sukces bez wysyłki
    if (pulapka && pulapka.value) { return; }

    var zNewsletterem = tryb === 'newsletter';
    var email = pole.value.trim();
    if (!email || pole.validity.typeMismatch || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      pokazBlad('Ten adres wygląda na niepoprawny — sprawdź literówki.');
      pole.setAttribute('aria-invalid', 'true');
      pole.focus();
      return;
    }
    if (zNewsletterem && !zgoda.checked) {
      pokazBlad('Bez zgody nie możemy wysłać newslettera — zaznacz pole powyżej albo wybierz kartę bez pieczątek.');
      zgoda.focus();
      return;
    }

    // wysyłanie
    przycisk.disabled = true;
    wtorny.disabled = true;
    przycisk.textContent = 'WYSYŁAM…';
    form.setAttribute('aria-busy', 'true');

    submitSignup(email, zNewsletterem).then(function () {
      // sukces: formularz znika, wjeżdża karta — z pieczątkami albo czysta
      sukces.querySelector('.sukces-email').textContent = email;
      sukces.classList.toggle('bez-pieczatek', !zNewsletterem);
      sukces.querySelector('.licznik-nabite').textContent = zNewsletterem ? '5' : '0';
      sukces.querySelector('.pieczatki').setAttribute('aria-label', zNewsletterem
        ? '5 z 6 pieczątek już nabitych, szósta kawa gratis'
        : 'Czysta karta: 0 z 6 pieczątek, szósta kawa gratis');
      form.hidden = true;
      sukces.hidden = false;
      sukces.querySelector('.sukces-naglowek').focus();
    }).catch(function () {
      pokazBlad('Nie udało się wysłać. Spróbuj jeszcze raz za chwilę.');
    }).finally(function () {
      przycisk.disabled = false;
      wtorny.disabled = false;
      przycisk.textContent = 'CHCĘ KARTĘ';
      form.removeAttribute('aria-busy');
    });
  });
})();
