const openBtnEl = document.querySelector('[data-action="open"]');
const closeBtnEl = document.querySelector('[data-action="close"]');
const burgerMenuEl = document.querySelector('[mobile-menu]');
const menuLinks = document.querySelectorAll('[mobile-menu__link]');

function openMenu() {
  if (!burgerMenuEl || !openBtnEl) return;
  burgerMenuEl.hidden = false;
  burgerMenuEl.classList.add('is-open');
  burgerMenuEl.dataset.visible = 'open';
  openBtnEl.setAttribute('aria-expanded', 'true');
  document.body.classList.add('menu-open');
}

function closeMenu() {
  if (!burgerMenuEl || !openBtnEl) return;
  burgerMenuEl.classList.remove('is-open');
  burgerMenuEl.dataset.visible = 'close';
  openBtnEl.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');
  window.setTimeout(() => {
    if (!burgerMenuEl.classList.contains('is-open')) {
      burgerMenuEl.hidden = true;
    }
  }, 300);
}

if (openBtnEl && closeBtnEl && burgerMenuEl) {
  openBtnEl.addEventListener('click', openMenu);
  closeBtnEl.addEventListener('click', closeMenu);

  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && burgerMenuEl.classList.contains('is-open')) {
      closeMenu();
    }
  });
}
