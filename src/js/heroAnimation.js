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

  const revealTargets = [
    bg,
    edgeImg,
    eyebrow,
    titlePurple,
    titlePink,
    text,
    cta,
    cat,
    catImg,
  ].filter(Boolean);

  const showFallback = () => {
    hero.setAttribute('data-hero-ready', '');
    gsap.set(revealTargets, {
      clearProps: 'opacity,transform,translate,rotate,scale',
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
    });
  };

  // If GSAP never ticks (blocked chunk / reduced rAF), don't leave hero blank.
  const failsafe = window.setTimeout(showFallback, 6000);

  try {
    if (bg) gsap.set(bg, { scale: 1.08, transformOrigin: 'center top' });
    if (edgeImg) gsap.set(edgeImg, { opacity: 0, y: 80 });
    if (eyebrow) gsap.set(eyebrow, { opacity: 0, y: -28 });
    if (cat) gsap.set(cat, { opacity: 0, y: 80 });
    if (titlePurple) gsap.set(titlePurple, { opacity: 0, x: -100 });
    if (titlePink) gsap.set(titlePink, { opacity: 0, x: -100 });
    if (text) gsap.set(text, { opacity: 0, y: 40 });
    if (cta) gsap.set(cta, { opacity: 0, y: 40 });

    hero.setAttribute('data-hero-ready', '');

    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      delay: 0.35,
      onComplete: () => window.clearTimeout(failsafe),
    });

    if (bg) tl.fromTo(bg, { scale: 1.08 }, { scale: 1, duration: 2.2 }, 0);
    if (edgeImg) {
      tl.fromTo(
        edgeImg,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1.6 },
        0.15
      );
    }
    if (eyebrow) {
      tl.fromTo(
        eyebrow,
        { opacity: 0, y: -28 },
        { opacity: 1, y: 0, duration: 1.1 },
        0.35
      );
    }
    if (cat) {
      tl.fromTo(
        cat,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1.4 },
        0.5
      );
    }
    if (titlePurple) {
      tl.fromTo(
        titlePurple,
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 1.3 },
        1.3
      );
    }
    if (titlePink) {
      tl.fromTo(
        titlePink,
        { opacity: 0, x: -100 },
        { opacity: 1, x: 0, duration: 1.3 },
        1.7
      );
    }
    if (text) {
      tl.fromTo(
        text,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1 },
        2.5
      );
    }
    if (cta) {
      tl.fromTo(
        cta,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1 },
        2.9
      );
    }

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
      }, '+=0.2');
    }
  } catch (error) {
    window.clearTimeout(failsafe);
    showFallback();
    console.error('Hero animation failed:', error);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroAnimation, {
    once: true,
  });
} else {
  initHeroAnimation();
}
