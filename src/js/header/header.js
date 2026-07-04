const burgerBtn = document.querySelector('.burger-btn');
const closeMenuBtn = document.querySelector('.close-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileMenuLinks = document.querySelectorAll(
  '.mobile-nav-link, .mobile-menu-btn'
);

const openMenu = () => {
  mobileMenu.classList.add('is-open');
  document.body.classList.add('no-scroll');
};

const closeMenu = () => {
  mobileMenu.classList.remove('is-open');
  document.body.classList.remove('no-scroll');
};

burgerBtn.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);

mobileMenuLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});