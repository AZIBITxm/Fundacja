// Dynamiczne skalowanie video w sekcji hero
function resizeHeroVideo() {
  const hero = document.querySelector('.hero');
  const video = document.querySelector('.hero-video');
  const logo = document.querySelector('.logo-large'); // logo w sekcji hero
  if (hero && video) {
    const width = hero.offsetWidth;
    let videoHeight;
    // Jeśli proporcje filmu są dostępne, użyj ich
    if (video.videoWidth && video.videoHeight) {
      // Zamiast rzeczywistej proporcji, wymuszamy proporcję 18:9 (czyli 2:1)
      videoHeight = width / 2; // szerokość / 2 = wysokość dla proporcji 18:9
    } else {
      // Domyślnie 18:9 jeśli proporcje nie są jeszcze dostępne
      videoHeight = width / 2;
    }
    video.style.width = width + 'px';
    video.style.height = videoHeight + 'px';
    hero.style.height = videoHeight + 'px';

    // Skalowanie logo proporcjonalnie do szerokości hero/video
    if (logo) {
      logo.style.width = (width * 0.4) + 'px'; // np. 40% szerokości hero
      logo.style.height = 'auto';
      logo.style.position = 'absolute';
      logo.style.left = 'calc(50% + 12px)'; // przesunięcie o 12px w prawo
      logo.style.transform = 'translateX(-50%)';
      logo.style.top = (videoHeight * 0.59 - logo.offsetHeight / 2) + 'px'; // 3/5 wysokości filmu, wyśrodkowane w pionie
      logo.style.zIndex = '2';
    }
  }
}

window.addEventListener('resize', resizeHeroVideo);
window.addEventListener('DOMContentLoaded', resizeHeroVideo);
// Po załadowaniu metadanych filmu (proporcje)
document.addEventListener('DOMContentLoaded', function() {
  const video = document.querySelector('.hero-video');
  if (video) {
    video.addEventListener('loadedmetadata', resizeHeroVideo);
  }
});
document.addEventListener('DOMContentLoaded', function() {
  const header = document.querySelector('header');
  const elements = document.querySelectorAll('.fade-in, .fade-in-delayed');
  const headerLogo = document.querySelector('.logo');
  const heroContent = document.querySelector('.hero-content h1');
  const heroLogo = document.querySelector('.hero-content .logo-large');
  // const backgroundMusic = document.getElementById('background-music');
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
    } else {
      header.classList.remove('scrolled');
    }
  }

  heroContent.addEventListener('animationend', function(event) {
    if (event.animationName === 'fadeOut') {
      heroLogo.style.display = 'block';
      heroLogo.style.animation = 'fadeInLogo 3s ease-out forwards';
      // Po pokazaniu logo ustawiamy jego pozycję
      resizeHeroVideo();
    }
  });

  // Ustawienie poziomu głośności muzyki na 1 i rozpoczęcie odtwarzania po załadowaniu strony
  // Usunięto obsługę przycisku muzyki w menu
  // window.addEventListener('load', function() {
  //   backgroundMusic.volume = 1;
  //   console.log('Aktualna głośność muzyki:', backgroundMusic.volume);
  //   backgroundMusic.play().catch(error => {
  //     console.error('Muzyka nie mogła zostać odtworzona automatycznie:', error);
  //   });
  // });

  window.addEventListener('scroll', checkVisibility);
  window.addEventListener('scroll', handleScroll);
  checkVisibility();
  handleScroll();

  // Rozwijane sekcje
  const expandBtn = document.getElementById('expandBtn');
  const hiddenContent = document.getElementById('hiddenContent');
  const expandText = expandBtn.querySelector('.expand-text');
  const aboutContent = document.querySelector('.about-content');

  if (expandBtn && hiddenContent && expandText && aboutContent) {
      expandBtn.addEventListener('click', function() {
          const video = document.querySelector('.about-video');
          
          if (hiddenContent.classList.contains('expanded')) {
              // ZWIJANIE - dwuetapowe
              // 1. Ukryj tekst
              hiddenContent.classList.remove('expanded');
              expandBtn.classList.remove('expanded');
              expandText.textContent = 'ZOBACZ WSZYSTKIE';
              
              // 2. Animacja zwijania baneru (wysokość -> szerokość)
              aboutContent.classList.remove('expanding');
              aboutContent.classList.add('collapsing');
              
              // 3. Wjazd wideo po zakończeniu animacji (0.8s)
              setTimeout(() => {
                  video.classList.remove('slide-out');
                  video.classList.add('slide-in');
                  aboutContent.classList.remove('collapsing');
              }, 800);
              
              // 4. Przewinięcie do góry
              setTimeout(() => {
                  document.getElementById('onas').scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                  });
              }, 1000);
              
          } else {
              // ROZWIJANIE - dwuetapowe
              // 1. Natychmiastowy wyjazd wideo
              video.classList.remove('slide-in');
              video.classList.add('slide-out');
              
              // 2. Animacja rozwijania baneru (szerokość -> wysokość)
              aboutContent.classList.remove('collapsing');
              aboutContent.classList.add('expanding');
              
              // 3. Pokaż tekst po rozwinięciu baneru (0.8s)
              setTimeout(() => {
                  hiddenContent.classList.add('expanded');
                  expandBtn.classList.add('expanded');
                  expandText.textContent = 'ZWIŃ';
              }, 800);
          }
      });
  }

  // Hamburger menu
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('header nav ul');
  if (hamburger && nav && header) {
    hamburger.addEventListener('click', function() {
      nav.classList.toggle('menu-open');
      hamburger.classList.toggle('active');
      if (hamburger.classList.contains('active')) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // Obsługa kliknięć w każdy link menu mobilnego
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      
      link.addEventListener('click', function(e) {
        // Działa tylko na mobile (max-width: 900px)
        if (window.innerWidth <= 900) {
          // Jeśli to "O Nas" przewiń płynnie
          if (link.getAttribute('href') === '#o-nas') {
            e.preventDefault();
            const section = document.getElementById('o-nas');
            if (section) {
              section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }
          nav.classList.remove('menu-open');
          hamburger.classList.remove('active');
          header.classList.remove('scrolled');
        }
        // Na desktopie domyślne zachowanie (przewijanie do sekcji)
      });
    });
  }
});