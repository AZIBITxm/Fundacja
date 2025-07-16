document.addEventListener('DOMContentLoaded', function() {
  // Cykliczne odświeżanie wysokości po resize/zoom
  let resizeInterval = null;
  function triggerResizeInterval() {
    if (resizeInterval) clearInterval(resizeInterval);
    let count = 0;
    resizeInterval = setInterval(function() {
      resizeDzialaniaSection();
      count++;
      if (count > 10) clearInterval(resizeInterval); // 10x co 300ms = 3s
    }, 300);
  }

  window.addEventListener('resize', function() {
    resizeDzialaniaSection();
    triggerResizeInterval();
  });

  document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
      resizeDzialaniaSection();
      triggerResizeInterval();
    }
  });
  // Ustaw wysokość sekcji działań natychmiast po załadowaniu DOM
  resizeDzialaniaSection();
  // Dynamiczne ustawianie wysokości sekcji działań
  function resizeDzialaniaSection() {
    const dzialaniaSection = document.querySelector('.dzialania-section');
    const lastBanner = document.querySelector('.dzialania-grid .dzialanie-card.dzialanie-mini:nth-child(4)');
    if (dzialaniaSection && lastBanner) {
      // Oblicz wysokość od góry sekcji do dolnej krawędzi baneru
      const sectionRect = dzialaniaSection.getBoundingClientRect();
      const bannerRect = lastBanner.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const sectionTop = sectionRect.top + scrollY;
      const bannerBottom = bannerRect.bottom + scrollY;
      const zapas = 16; // zapas na marginesy, cienie itp.
      const newHeight = bannerBottom - sectionTop + zapas;
      dzialaniaSection.style.height = newHeight + 'px';
      dzialaniaSection.style.minHeight = '0'; // nadpisz min-height z CSS
    }
  }

  // Wywołaj na starcie, przy zmianie rozmiaru okna i po animacji baneru
  window.addEventListener('resize', resizeDzialaniaSection);
  window.addEventListener('DOMContentLoaded', resizeDzialaniaSection);
  document.querySelectorAll('.dzialania-grid .dzialanie-card.dzialanie-mini').forEach(function(card) {
    card.addEventListener('transitionend', function(e) {
      if (e.propertyName === 'transform') {
        resizeDzialaniaSection();
      }
    });
  });
  const header = document.querySelector('header');
  const elements = document.querySelectorAll('.fade-in, .fade-in-delayed');
  const headerLogo = document.querySelector('.logo');
  const heroContent = document.querySelector('.hero-content h1');
  const heroLogo = document.querySelector('.hero-content .logo-large');
  const backgroundMusic = document.getElementById('background-music');
  const heroVideo = document.querySelector('.hero-video');

  function checkVisibility() {
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        element.classList.add('visible');
      }
    });
  }

  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
      headerLogo.style.opacity = '1';
      headerLogo.style.transform = 'translateX(0)';
    } else {
      header.classList.remove('scrolled');
      headerLogo.style.opacity = '0';
      headerLogo.style.transform = 'translateX(-20px)';
    }
  }

  heroContent.addEventListener('animationend', function(event) {
    if (event.animationName === 'fadeOut') {
      heroLogo.style.display = 'block';
      heroLogo.style.animation = 'fadeInLogo 3s ease-out forwards';

      // Ustaw rozmiar logo względem kontenera hero
      function scaleLogo() {
        const hero = document.querySelector('.hero');
        if (hero && heroLogo) {
          const heroWidth = hero.offsetWidth;
          heroLogo.style.width = (heroWidth * 0.4) + 'px'; // 40% szerokości hero
          heroLogo.style.height = 'auto';
        }
      }
      scaleLogo();
      window.addEventListener('resize', scaleLogo);
    }
  });



  window.addEventListener('scroll', checkVisibility);
  window.addEventListener('scroll', handleScroll);
  // Wymuszone ukrycie logo na starcie
  headerLogo.style.opacity = '0';
  headerLogo.style.transform = 'translateX(-20px)';
  checkVisibility();
  handleScroll();


  function toggleHamburger() {
    const hamburger = document.querySelector('.hamburger');
    if (window.innerWidth <= 900) {
      hamburger.style.display = 'flex';
    } else {
      hamburger.style.display = 'none';
    }
  }

  // Sprawdź przy starcie
  window.addEventListener('DOMContentLoaded', toggleHamburger);
  // Sprawdź przy każdej zmianie rozmiaru
  window.addEventListener('resize', toggleHamburger);

  // Obsługa wysuwanego menu bocznego
  const hamburger = document.querySelector('.hamburger');
  const sideMenu = document.querySelector('.side-menu');


  if (hamburger && sideMenu) {
    hamburger.addEventListener('click', function() {
      sideMenu.classList.add('open');
      hamburger.style.display = 'none';
      // Dodaj przezroczystość do headera
      if (header) header.classList.add('header-transparent');
    });
  }


  // Zamykanie menu po kliknięciu w link
  if (sideMenu) {
    sideMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        sideMenu.classList.remove('open');
        if (hamburger) hamburger.style.display = 'flex';
        // Usuń przezroczystość z headera
        if (header) header.classList.remove('header-transparent');
      });
    });
  }

  // Zamknięcie menu po kliknięciu w tło
  document.addEventListener('click', function(e) {
    if (sideMenu && sideMenu.classList.contains('open')) {
      // Jeśli kliknięto poza menu i poza hamburgerem
      const isMenu = sideMenu.contains(e.target);
      const isHamburger = hamburger && hamburger.contains(e.target);
      if (!isMenu && !isHamburger) {
        sideMenu.classList.remove('open');
        if (hamburger) hamburger.style.display = 'flex';
        // Usuń przezroczystość z headera
        if (header) header.classList.remove('header-transparent');
      }
    }
  });
/* dynamiczne pozycjonowanie tekstu opisowego w sekcji o nas*/
function centerInfoBox() {
  var title = document.querySelector('.o-nas-title-copy');
  var infoBox = document.querySelector('.o-nas-info-box');
  if (title && infoBox) {
    var titleRect = title.getBoundingClientRect();
    var infoBoxRect = infoBox.getBoundingClientRect();
    var titleCenter = titleRect.left + titleRect.width / 2;
    var left = titleCenter - infoBoxRect.width / 2 + window.scrollX;
    infoBox.style.left = left + 'px';
    infoBox.style.right = 'auto';
    infoBox.style.position = 'absolute';
    infoBox.style.transform = 'none';
  }
  // Pozycjonowanie poziome .o-nas-green-box względem napisu O Nas
  var greenBox = document.querySelector('.o-nas-green-box');
  if (title && greenBox) {
    var titleRect = title.getBoundingClientRect();
    var greenBoxRect = greenBox.getBoundingClientRect();
    var titleCenter = titleRect.left + titleRect.width / 2;
    var left = titleCenter - greenBoxRect.width / 2 + window.scrollX;
    greenBox.style.left = left + 'px';
    greenBox.style.right = 'auto';
    greenBox.style.position = 'absolute';
    greenBox.style.transform = 'none';
  }
   
}
window.addEventListener('DOMContentLoaded', centerInfoBox);
window.addEventListener('resize', centerInfoBox);


function positionGreenBoxVertically() {
  var infoBox = document.querySelector('.o-nas-info-box');
  var greenBox = document.querySelector('.o-nas-green-box');
  if (infoBox && greenBox) {
    var halfInfoBoxHeight = infoBox.getBoundingClientRect().height;
    var currentTop = parseFloat(greenBox.style.top) || greenBox.offsetTop;
    greenBox.style.top = (halfInfoBoxHeight + 190) + 'px';
  }
}

window.addEventListener('DOMContentLoaded', function() {
  centerInfoBox();
  positionGreenBoxVertically();
});
window.addEventListener('resize', function() {
  centerInfoBox();
  positionGreenBoxVertically();
});
});