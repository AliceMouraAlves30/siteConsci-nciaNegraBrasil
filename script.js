// Acessibilidade e interatividade leves:
// - Filtro de personalidades
// - Toggle tema (claro/escuro) acessível

document.addEventListener('DOMContentLoaded', function () {
  // Theme toggle
  const toggle = document.getElementById('toggle-theme');
  if (toggle) {
    // Leitura do prefer (localStorage)
    if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');
    updateToggleAria();

    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
      updateToggleAria();
    });
  }

  function updateToggleAria(){
    if (!toggle) return;
    const pressed = document.body.classList.contains('dark');
    toggle.setAttribute('aria-pressed', pressed ? 'true' : 'false');
    toggle.textContent = pressed ? '☀️' : '🌙';
  }

  // Filtro de personalidades
  const filter = document.getElementById('area-filter');
  if (filter) {
    filter.addEventListener('change', () => {
      const value = filter.value;
      const items = document.querySelectorAll('.person');
      items.forEach(item => {
        const area = item.getAttribute('data-area') || '';
        if (value === 'all' || area === value) {
          item.style.display = '';
          item.setAttribute('aria-hidden', 'false');
        } else {
          item.style.display = 'none';
          item.setAttribute('aria-hidden', 'true');
        }
      });
    });
  }

  // Pequena melhoria de foco: permitir 'enter' ativar cards (simula link)
  document.querySelectorAll('.card[tabindex]').forEach(card => {
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        // Se quiser inserir link, altere para window.location = '...';
        card.classList.add('key-activated');
        setTimeout(()=> card.classList.remove('key-activated'),400);
      }
    });
  });
});
