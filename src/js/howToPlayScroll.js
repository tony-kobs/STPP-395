const list = document.querySelector('[data-howto-list]');
const dots = document.querySelectorAll('[data-howto-dot]');
const desktopQuery = window.matchMedia('(min-width: 1440px)');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const FRAME_COUNT = 3;

if (list) {
  let target = list.scrollLeft;
  let current = list.scrollLeft;
  let rafId = 0;
  let activeFrame = 0;

  const clamp = value => {
    const max = Math.max(0, list.scrollWidth - list.clientWidth);
    return Math.min(Math.max(value, 0), max);
  };

  const getFrameIndex = () => {
    const max = Math.max(0, list.scrollWidth - list.clientWidth);
    if (max <= 0) return 0;

    const progress = list.scrollLeft / max;
    return Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.round(progress * (FRAME_COUNT - 1)))
    );
  };

  const updateDots = () => {
    if (!dots.length || desktopQuery.matches) return;

    activeFrame = getFrameIndex();

    dots.forEach((dot, index) => {
      const dist = Math.abs(index - activeFrame);
      dot.dataset.dist = dist === 1 ? '1' : '';
      dot.dataset.active = dist === 0 ? 'true' : 'false';
    });
  };

  const tick = () => {
    const ease = reduceMotion.matches ? 1 : 0.18;
    current += (target - current) * ease;

    if (Math.abs(target - current) < 0.4) {
      current = target;
      list.scrollLeft = current;
      rafId = 0;
      updateDots();
      return;
    }

    list.scrollLeft = current;
    updateDots();
    rafId = requestAnimationFrame(tick);
  };

  const start = () => {
    if (!rafId) rafId = requestAnimationFrame(tick);
  };

  list.addEventListener(
    'wheel',
    event => {
      if (desktopQuery.matches) return;

      const canScroll = list.scrollWidth > list.clientWidth;
      if (!canScroll) return;

      const delta =
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
          ? event.deltaX
          : event.deltaY;

      if (delta === 0) return;

      const next = clamp(target + delta);
      const atEdge = next === target;

      if (atEdge) return;

      event.preventDefault();
      target = next;
      start();
    },
    { passive: false }
  );

  list.addEventListener(
    'scroll',
    () => {
      if (!rafId) {
        target = list.scrollLeft;
        current = list.scrollLeft;
      }
      updateDots();
    },
    { passive: true }
  );

  desktopQuery.addEventListener('change', updateDots);
  window.addEventListener('resize', updateDots);
  updateDots();
}
