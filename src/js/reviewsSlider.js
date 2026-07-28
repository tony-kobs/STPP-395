const slider = document.querySelector('[data-reviews-slider]');
const track = document.querySelector('[data-reviews-track]');
const prevBtn = document.querySelector('[data-reviews-prev]');
const nextBtn = document.querySelector('[data-reviews-next]');

if (slider && track && prevBtn && nextBtn) {
  let index = 0;

  const getPerView = () => (window.matchMedia('(min-width: 1440px)').matches ? 3 : 1);

  const getGap = () => {
    const styles = window.getComputedStyle(track);
    return Number.parseFloat(styles.gap) || 0;
  };

  const getMaxIndex = () => {
    const total = track.children.length;
    return Math.max(0, total - getPerView());
  };

  const update = () => {
    const maxIndex = getMaxIndex();
    index = Math.min(index, maxIndex);

    const card = track.children[0];
    if (!card) return;

    const cardWidth = card.getBoundingClientRect().width;
    const offset = index * (cardWidth + getGap());
    track.style.transform = `translateX(-${offset}px)`;

    prevBtn.disabled = index <= 0;
    nextBtn.disabled = index >= maxIndex;
  };

  prevBtn.addEventListener('click', () => {
    index = Math.max(0, index - 1);
    update();
  });

  nextBtn.addEventListener('click', () => {
    index = Math.min(getMaxIndex(), index + 1);
    update();
  });

  window.addEventListener('resize', update);
  update();
}