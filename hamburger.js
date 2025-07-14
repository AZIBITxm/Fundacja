// Ukrywanie menu górnego gdy otwarte boczne
document.addEventListener('DOMContentLoaded', function() {
  var hamburger = document.getElementById('hamburger');
  var sideMenu = document.querySelector('.side-menu');
  var headerNav = document.querySelector('header nav');

  if (!hamburger || !sideMenu || !headerNav) return;

  hamburger.addEventListener('click', function() {
    sideMenu.classList.toggle('open');
    if (sideMenu.classList.contains('open')) {
      headerNav.style.display = 'none';
    } else {
      headerNav.style.display = '';
    }
  });

  // Opcjonalnie: zamykanie bocznego menu po kliknięciu linku
  sideMenu.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      sideMenu.classList.remove('open');
      headerNav.style.display = '';
    });
  });
});
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
