// THEME TOGGLE (acessível + persistente)
(function themeToggleInit(){
  const toggles = Array.from(document.querySelectorAll('.theme-toggle'));
  const root = document.documentElement;
  const saved = localStorage.getItem('theme') || 'light';

  function applyTheme(theme){
    if(theme === 'dark'){
      root.setAttribute('data-theme','dark');
      toggles.forEach(t => { t.setAttribute('aria-pressed','true'); t.textContent = '☀️'; });
    } else {
      root.removeAttribute('data-theme');
      toggles.forEach(t => { t.setAttribute('aria-pressed','false'); t.textContent = '🌙'; });
    }
    localStorage.setItem('theme', theme);
  }

  // initial
  applyTheme(saved);

  // attach
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = root.getAttribute('data-theme') === 'dark';
      applyTheme(isDark ? 'light' : 'dark');
    });

    // keyboard: space/enter toggles automatically via click, but ensure role is button (it is)
  });
})();

// MENU HAMBURGER
function setupMenu(btnId, navId) {
  const btn = document.getElementById(btnId);
  const nav = document.getElementById(navId);
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('show');
  });
}
setupMenu('menu-btn', 'main-nav');
setupMenu('menu-btn-2', 'main-nav-2');
setupMenu('menu-btn-3', 'main-nav-3');

// FILTRO DE PERSONALIDADES
document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('area');
  const cards = document.querySelectorAll('.person');
  if (select && cards.length) {
    select.addEventListener('change', (e) => {
      const val = e.target.value;
      cards.forEach(card => {
        if (val === 'all' || card.dataset.area === val) {
          card.style.display = '';
          card.setAttribute('tabindex','0');
        } else {
          card.style.display = 'none';
          card.setAttribute('tabindex','-1');
        }
      });
    });
  }

  // Smooth focus for intra-page links with IDs
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.setAttribute('tabindex','-1');
        target.focus();
        target.removeAttribute('tabindex');
      }
    });
  });
});
