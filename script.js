// Tema claro/escuro
const toggle = document.getElementById("theme-toggle");
toggle.addEventListener("click", () => {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === "light" ? "dark" : "light";
});

// Filtro de personalidades
const select = document.getElementById("area");
const cards = document.querySelectorAll(".card");

if (select) {
  select.addEventListener("change", () => {
    const area = select.value;

    cards.forEach(card => {
      if (area === "todas" || card.dataset.area === area) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}
