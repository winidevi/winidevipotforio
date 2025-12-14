const navLinks = document.querySelectorAll('#nav-bar a');
const pages = document.querySelectorAll('.page');
const body = document.body;
const nav = document.querySelector('#nav-bar ul');
const headerActions = document.querySelector('.header-actions');
const darkBtn = document.getElementById('darkModeBtn');

// ===== SPA =====
function showPage(pageId) {
  pages.forEach(p => p.classList.remove('active', 'fade-in'));

  const active = document.getElementById(pageId);
  if (active) {
    active.classList.add('active', 'fade-in');
    active.scrollIntoView({ behavior: 'smooth' });
  }

  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.page === pageId);
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    showPage(link.dataset.page);
    nav.classList.remove('open');
  });
});

// ===== DARK MODE =====
if (localStorage.getItem('darkmode') === 'on') {
  body.classList.add('dark');
  darkBtn.textContent = '☀️';
}

darkBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  const dark = body.classList.contains('dark');
  darkBtn.textContent = dark ? '☀️' : '🌙';
  localStorage.setItem('darkmode', dark ? 'on' : 'off');
});

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('#nav-bar ul');

// MENU MOBILE
menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// FECHA MENU AO CLICAR EM UM LINK
document.querySelectorAll('#nav-bar a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});

window.addEventListener('resize', handleResize);
