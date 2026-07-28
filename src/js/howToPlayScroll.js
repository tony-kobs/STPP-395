const list = document.querySelector('[data-howto-list]');
const desktopQuery = window.matchMedia('(min-width: 1440px)');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (list) {
  let target = list.scrollLeft;
  let current = list.scrollLeft;
  let rafId = 0;

  const clamp = (value) => {
    const max = Math.max(0, list.scrollWidth - list.clientWidth);
    return Math.min(Math.max(value, 0), max);
  };

  const tick = () => {
    const ease = reduceMotion.matches ? 1 : 0.18;
    current += (target - current) * ease;

    if (Math.abs(target - current) < 0.4) {
      current = target;
      list.scrollLeft = current;
      rafId = 0;
      return;
    }

    list.scrollLeft = current;
    rafId = requestAnimationFrame(tick);
  };

  const start = () => {
    if (!rafId) rafId = requestAnimationFrame(tick);
  };

  list.addEventListener(
    'wheel',
    (event) => {
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
      if (rafId) return;
      target = list.scrollLeft;
      current = list.scrollLeft;
    },
    { passive: true }
  );
}
