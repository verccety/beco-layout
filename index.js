const sideNav = document.querySelectorAll('.side-nav__item');
const btn = document.querySelector('.navigation__button');

sideNav.forEach((li) => {
  li.addEventListener('click', (e) => {
    if (e.currentTarget.classList.contains('side-nav__item--active')) return;

    document.querySelector('.side-nav__item--active').classList.remove('side-nav__item--active');
    e.currentTarget.classList.add('side-nav__item--active');

    document.querySelector('.category__name').textContent = e.currentTarget.textContent;
  });
});

btn.addEventListener('click', (e) => {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.toggle('sidebar--active');

  document.querySelectorAll('.side-nav__category-name').forEach((el) => {
    if (sidebar.classList.contains('sidebar--active')) {
      el.style.opacity = '1';
      el.style.visibility = 'revert';
    } else {
      el.style.opacity = '0';
      el.style.visibility = 'hidden';
    }
  });
});

let scrollPos = 0;
const nav = document.querySelector('.header');
const searchButton = document.querySelector('.search__button');
const mediaQueryDesktop = window.matchMedia('(min-width: 80em)');
const mediaQueryMobile = window.matchMedia('(max-width: 40em)');

function checkPosition() {
  if (mediaQueryDesktop.matches) return;

  let windowY = window.scrollY;
  if (windowY < scrollPos) {
    // Scrolling UP
    nav.classList.add('is-visible');
    nav.classList.remove('is-hidden');
    if (mediaQueryMobile.matches) searchButton.style.display = 'revert';
  } else {
    // Scrolling DOWN
    nav.classList.add('is-hidden');
    nav.classList.remove('is-visible');
    if (mediaQueryMobile.matches) searchButton.style.display = 'none';
  }
  scrollPos = windowY;
}

function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function () {
    let context = this,
      args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

window.addEventListener('scroll', debounce(checkPosition));
