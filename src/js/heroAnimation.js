import gsap from 'gsap';

function initHeroAnimation() {
  const hero = document.querySelector('[data-hero]');
  if (!hero || hero.dataset.heroAnimated === 'true') return;
  hero.dataset.heroAnimated = 'true';

  const bg = hero.querySelector('[data-hero-anim="bg"]');
  const edgeImg = hero.querySelector('[data-hero-anim="edge"]');
  const eyebrow = hero.querySelector('[data-hero-anim="eyebrow"]');
  const titlePurple = hero.querySelector('[data-hero-anim="title-purple"]');
  const titlePink = hero.querySelector('[data-hero-anim="title-pink"]');
  const text = hero.querySelector('[data-hero-anim="text"]');
  const cta = hero.querySelector('[data-hero-anim="cta"]');
  const cat = hero.querySelector('[data-hero-anim="cat"]');
  const catImg = hero.querySelector('[data-hero-anim="cat-img"]');

  if (bg) gsap.set(bg, { scale: 1.08, transformOrigin: 'center top' });
  if (edgeImg) gsap.set(edgeImg, { opacity: 0, y: 80 });
  if (eyebrow) gsap.set(eyebrow, { opacity: 0, y: -28 });
  if (cat) gsap.set(cat, { opacity: 0, y: 80 });
  if (titlePurple) gsap.set(titlePurple, { opacity: 0, x: -100 });
  if (titlePink) gsap.set(titlePink, { opacity: 0, x: -100 });
  if (text) gsap.set(text, { opacity: 0, y: 40 });
  if (cta) gsap.set(cta, { opacity: 0, y: 40 });

  // Unlock CSS initial-state gates; GSAP inline styles keep items hidden.
  hero.setAttribute('data-hero-ready', '');

  const tl = gsap.timeline({
    defaults: { ease: 'power2.out' },
    delay: 1,
  });

  if (bg) tl.to(bg, { scale: 1, duration: 2.4 }, 0);
  if (edgeImg) tl.to(edgeImg, { opacity: 1, y: 0, duration: 1.8 }, 0.3);
  if (eyebrow) tl.to(eyebrow, { opacity: 1, y: 0, duration: 1.2 }, 0.6);
  if (cat) tl.to(cat, { opacity: 1, y: 0, duration: 1.6 }, 0.9);
  if (titlePurple) tl.to(titlePurple, { opacity: 1, x: 0, duration: 1.4 }, 2.0);
  if (titlePink) tl.to(titlePink, { opacity: 1, x: 0, duration: 1.4 }, 2.5);
  if (text) tl.to(text, { opacity: 1, y: 0, duration: 1.2 }, 3.4);
  if (cta) tl.to(cta, { opacity: 1, y: 0, duration: 1.2 }, 3.9);

  if (
    catImg &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    tl.add(() => {
      gsap.to(catImg, {
        y: -14,
        duration: 2.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, '+=0.4');
  }
}

initHeroAnimation();
