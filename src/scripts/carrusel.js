document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carrusel-track");
  const originalCards = Array.from(document.querySelectorAll(".card"));
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");

  let index = 1;
  let cardWidth;
  
  // 1) Clonar elementos (infinite loop)
  const firstClone = originalCards[0].cloneNode(true);
  const lastClone = originalCards[originalCards.length - 1].cloneNode(true);

  firstClone.classList.add("clone");
  lastClone.classList.add("clone");

  track.appendChild(firstClone);
  track.insertBefore(lastClone, originalCards[0]);

  const allCards = document.querySelectorAll(".card");

  // 2) Calcular ancho REAL después de que carguen las imágenes
  function computeCardWidth() {
    const style = window.getComputedStyle(allCards[0]);
    const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    return allCards[0].offsetWidth + margin;
  }

  function setInitialPosition() {
    cardWidth = computeCardWidth();
    track.style.transition = "none";
    track.style.transform = `translateX(${-cardWidth * index}px)`;
  }

  // 3) Movimiento del carrusel
  function move(direction) {
    index += direction;
    track.style.transition = "transform 0.4s ease-in-out";
    track.style.transform = `translateX(${-cardWidth * index}px)`;
  }

  // 4) Corrección del salto infinito
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

  // Botones
  nextBtn.addEventListener("click", () => move(1));
  prevBtn.addEventListener("click", () => move(-1));

  // Recalcular al redimensionar
  window.addEventListener("resize", setInitialPosition);

  // ESPERAR A QUE CARGUE TODO (IMÁGENES + DOM)
  window.addEventListener("load", () => {
    setTimeout(setInitialPosition, 100);
  });
});
