document.addEventListener('DOMContentLoaded', function() {
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
    } else {
      header.classList.remove('scrolled');
    }
  }

  heroContent.addEventListener('animationend', function(event) {
    if (event.animationName === 'fadeOut') {
      heroLogo.style.display = 'block';
      heroLogo.style.animation = 'fadeInLogo 3s ease-out forwards';
    }
  });

  // Ustawienie poziomu głośności muzyki na 1 i rozpoczęcie odtwarzania po załadowaniu strony
  window.addEventListener('load', function() {
    backgroundMusic.volume = 1;
    console.log('Aktualna głośność muzyki:', backgroundMusic.volume);
    backgroundMusic.play().catch(error => {
      console.error('Muzyka nie mogła zostać odtworzona automatycznie:', error);
    });
  });

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
});