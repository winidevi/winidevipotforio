// ===== SELETORES =====
const navLinks = document.querySelectorAll('#nav-bar a');
const pages = document.querySelectorAll('.page');
const body = document.body;
const headerActions = document.querySelector('.header-actions');
const nav = document.querySelector('#nav-bar ul');

// ===== NAVEGAÇÃO SPA =====
function showPage(pageId) {
  pages.forEach(section => section.classList.remove('active'));

  const activeSection = document.getElementById(pageId);
  if (activeSection) {
    activeSection.classList.add('active', 'fade-in');
    activeSection.scrollIntoView({ behavior: 'smooth' });
    localStorage.setItem('lastPage', pageId);
  }

  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.page === pageId);
  });
}

// ===== EVENTOS MENU =====
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    showPage(link.dataset.page);
    nav.classList.remove('open'); // fecha menu no mobile
  });

  link.addEventListener('keydown', e => {
    if (e.key === 'Enter') showPage(link.dataset.page);
  });
});

// ===== RESTAURA ÚLTIMA SEÇÃO =====
showPage(localStorage.getItem('lastPage') || 'inicio');

// ===== DARK MODE (NO TOPO) =====
const darkBtn = document.createElement('button');
darkBtn.textContent = '🌙';
darkBtn.classList.add('dark-toggle');
headerActions.appendChild(darkBtn);

darkBtn.addEventListener('click', () => {
  body.classList.toggle('dark');
  localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
});

if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
}

// ===== MENU MOBILE (SÓ MOBILE) =====
const menuBtn = document.createElement('button');
menuBtn.textContent = '☰';
menuBtn.classList.add('menu-toggle');
headerActions.appendChild(menuBtn);

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// ===== MOSTRA / ESCONDE MENU PELO TAMANHO DA TELA =====
function handleResize() {
  if (window.innerWidth > 768) {
    menuBtn.style.display = 'none';
    nav.classList.remove('open');
  } else {
    menuBtn.style.display = 'block';
  }
}

handleResize();
window.addEventListener('resize', handleResize);

// ===== OBSERVER =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('fade-in');
  });
}, { threshold: 0.2 });

pages.forEach(page => observer.observe(page));
