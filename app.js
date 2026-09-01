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

// ── Badge portfeli: odsłaniają krok 2 (mail za pieczątki) ───────
// TODO backend: tu ma się dziać prawdziwe dodanie karty (pkpass / JWT).
(function () {
  var krok2 = document.querySelector('.krok-2');
  ['badge-apple', 'badge-google'].forEach(function (id) {
    var badge = document.getElementById(id);
    if (!badge) return;
    badge.addEventListener('click', function (zdarzenie) {
      zdarzenie.preventDefault();
      krok2.classList.add('otwarty');
      krok2.scrollIntoView({ behavior: 'smooth', block: 'center' });
      var pole = document.getElementById('email');
      if (pole) pole.focus({ preventScroll: true });
    });
  });
})();

// ── Stany formularza: spoczynek / wysyłanie / sukces / błąd ─────
(function () {
  var form = document.querySelector('form');
  if (!form) return;

  var pole = form.querySelector('#email');
  var zgoda = form.querySelector('#zgoda');
  var pulapka = form.querySelector('#www');
  var przycisk = form.querySelector('button[type=submit]');
  var blad = form.querySelector('#blad-formularza');
  var sukces = document.querySelector('.sukces');
  var karta = document.getElementById('karta');

  // z JS-em walidację i komunikaty przejmujemy my (po polsku)
  form.setAttribute('novalidate', '');

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

    var email = pole.value.trim();
    if (!email || pole.validity.typeMismatch || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      pokazBlad('Ten adres wygląda na niepoprawny — sprawdź literówki.');
      pole.setAttribute('aria-invalid', 'true');
      pole.focus();
      return;
    }
    if (!zgoda.checked) {
      pokazBlad('Pieczątki dostajesz za zapis do newslettera — zaznacz zgodę powyżej.');
      zgoda.focus();
      return;
    }

    // wysyłanie
    przycisk.disabled = true;
    przycisk.textContent = 'WYSYŁAM…';
    form.setAttribute('aria-busy', 'true');

    submitSignup(email, true).then(function () {
      // sukces: pieczątki nabijają się na karcie u góry
      sukces.querySelector('.sukces-email').textContent = email;
      form.hidden = true;
      sukces.hidden = false;
      // pieczątki są zamarkowane od wejścia — po zapisie odgrywamy nabijanie od nowa
      karta.classList.remove('nabita');
      void karta.offsetWidth;
      karta.classList.add('nabita');
      karta.scrollIntoView({ behavior: 'smooth', block: 'center' });
      sukces.querySelector('.sukces-naglowek').focus({ preventScroll: true });
    }).catch(function () {
      pokazBlad('Nie udało się wysłać. Spróbuj jeszcze raz za chwilę.');
    }).finally(function () {
      przycisk.disabled = false;
      przycisk.textContent = 'CHCĘ PIECZĄTKI';
      form.removeAttribute('aria-busy');
    });
  });
})();
