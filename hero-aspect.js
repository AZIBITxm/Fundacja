// Dynamiczne aspect-ratio dla .hero
function setHeroAspectRatio() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const w = window.innerWidth;
  let ratio;
  if (w <= 900) {
    ratio = 1;
  } else if (w >= 1920) {
    ratio = 18 / 9;
  } else if (w >= 1500) {
    // 1500px = 15/10, 1920px = 18/9
    const t = (w - 1500) / (1920 - 1500);
    ratio = (15 + (18 - 15) * t) / (10 + (9 - 10) * t);
  } else {
    // 900px = 1/1, 1500px = 15/10
    const t = (w - 900) / (1500 - 900);
    ratio = (1 + (15 - 1) * t) / (1 + (10 - 1) * t);
  }
  hero.style.aspectRatio = ratio;
}
window.addEventListener('resize', setHeroAspectRatio);
document.addEventListener('DOMContentLoaded', setHeroAspectRatio);
