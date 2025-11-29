document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carrusel-track");
  const originalCards = Array.from(document.querySelectorAll(".card"));
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let index = 1;
  let cardWidth;

  // ========= 1) CLONAR ELEMENTOS PARA LOOP INFINITO =========
  const firstClone = originalCards[0].cloneNode(true);
  const lastClone = originalCards[originalCards.length - 1].cloneNode(true);

  firstClone.classList.add("clone");
  lastClone.classList.add("clone");

  track.appendChild(firstClone);
  track.insertBefore(lastClone, originalCards[0]);

  const allCards = document.querySelectorAll(".card");

  // ========= 2) OBTENER ANCHO REAL DE UNA TARJETA =========
  function computeCardWidth() {
    const style = window.getComputedStyle(allCards[0]);
    const margin =
      parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    return allCards[0].offsetWidth + margin;
  }

  function setInitialPosition() {
    cardWidth = computeCardWidth();
    track.style.transition = "none";
    track.style.transform = `translateX(${-cardWidth * index}px)`;
  }

  // ========= 3) MOVIMIENTO DEL CARRUSEL =========
  function move(direction) {
    index += direction;
    track.style.transition = "transform 0.4s ease-in-out";
    track.style.transform = `translateX(${-cardWidth * index}px)`;
  }

  // ========= 4) AJUSTE AUTOMÁTICO CUANDO SE ENTRA A UN CLON =========
  track.addEventListener("transitionend", () => {
    if (allCards[index].classList.contains("clone")) {
      track.style.transition = "none";

      if (index === allCards.length - 1) {
        index = 1;
      } else if (index === 0) {
        index = allCards.length - 2;
      }

      track.style.transform = `translateX(${-cardWidth * index}px)`;
    }
  });

  // ========= 5) BOTONES =========
  nextBtn.addEventListener("click", () => move(1));
  prevBtn.addEventListener("click", () => move(-1));

  // ========= 6) AJUSTAR AL RE-DIMENSIONAR =========
  window.addEventListener("resize", setInitialPosition);

  // ========= 7) ESPERAR A QUE CARGUEN IMÁGENES =========
  window.addEventListener("load", () => {
    setTimeout(setInitialPosition, 120);
  });

  // ========= 8) SOPORTE TÁCTIL PARA MÓVILES (SWIPE) =========
  let startX = 0;
  let isDragging = false;

  track.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchmove", (e) => {
    if (!isDragging) return;

    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    // Desliza a la izquierda
    if (diff > 45) {
      move(1);
      isDragging = false;
    }

    // Desliza a la derecha
    if (diff < -45) {
      move(-1);
      isDragging = false;
    }
  });

  track.addEventListener("touchend", () => {
    isDragging = false;
  });
});
