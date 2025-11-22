document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll(".btn-desplegar");

  botones.forEach(btn => {
    btn.addEventListener("click", () => {
      const modulo = btn.closest(".modulo");
      modulo.classList.toggle("activo");
    });
  });
});