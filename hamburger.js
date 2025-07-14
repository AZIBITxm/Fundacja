// hamburger.js - obsługa hamburgera i menu mobilnego

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  // Ukryj menu mobilne na start
  mobileMenu.classList.remove('active');

  // Obsługa kliknięcia hamburgera
  hamburger.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
  });

  // Opcjonalnie: zamykanie menu po kliknięciu w link
  mobileMenu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
    });
  });
});
