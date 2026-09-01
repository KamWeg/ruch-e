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
