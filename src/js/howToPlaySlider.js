const slider = document.querySelector('[data-howto-slider]');
const track = document.querySelector('[data-howto-track]');
const prevBtn = document.querySelector('[data-howto-prev]');
const nextBtn = document.querySelector('[data-howto-next]');
const desktopQuery = window.matchMedia('(min-width: 1440px)');

if (slider && track && prevBtn && nextBtn) {
  let index = 0;

  const getGap = () => {
    const styles = window.getComputedStyle(track);
    return Number.parseFloat(styles.gap) || 0;
  };

  const getMaxIndex = () => Math.max(0, track.children.length - 1);

  const update = () => {
    if (desktopQuery.matches) {
      track.style.transform = '';
      prevBtn.disabled = true;
      nextBtn.disabled = true;
      return;
    }

    const maxIndex = getMaxIndex();
    index = Math.min(Math.max(index, 0), maxIndex);

    const card = track.children[0];
    if (!card) return;

    const cardWidth = card.getBoundingClientRect().width;
    const styles = window.getComputedStyle(track);
    const paddingLeft = Number.parseFloat(styles.paddingLeft) || 0;
    const viewport = slider.getBoundingClientRect().width;
    const centerOffset = (viewport - cardWidth) / 2 - paddingLeft;
    const offset = index * (cardWidth + getGap()) - centerOffset;

    track.style.transform = `translateX(-${Math.max(0, offset)}px)`;

    prevBtn.disabled = index <= 0;
    nextBtn.disabled = index >= maxIndex;
  };

  prevBtn.addEventListener('click', () => {
    index -= 1;
    update();
  });

  nextBtn.addEventListener('click', () => {
    index += 1;
    update();
  });

  desktopQuery.addEventListener('change', update);
  window.addEventListener('resize', update);
  update();
}
