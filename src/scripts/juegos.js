// ========== FUNCIONES GENERALES ==========
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function showSuccess() {
  const overlay = document.getElementById("overlay");
  overlay.classList.remove("hidden");
  playSuccessSound();
  launchConfetti();
  setTimeout(hideOverlay, 4000);
}

function hideOverlay() {
  document.getElementById("overlay").classList.add("hidden");
}

// ========== EFECTO CONFETI ==========
function launchConfetti() {
  const colors = ["#BDE038", "#DBE039", "#10454F", "#506266", "#ffffff"];
  const overlay = document.getElementById("overlay");
  for (let i = 0; i < 120; i++) {
    const c = document.createElement("div");
    c.classList.add("confetti");
    c.style.width = "10px";
    c.style.height = "10px";
    c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    c.style.left = Math.random() * 100 + "%";
    c.style.animation = `fall ${2 + Math.random() * 3}s linear forwards`;
    overlay.appendChild(c);
    setTimeout(() => c.remove(), 4000);
  }
}

// ========== SONIDO FELICITACIONES ==========
function playSuccessSound() {
  const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3");
  audio.volume = 0.3;
  audio.play();
}

// ========== ACTIVIDAD 1 ==========
const answers1 = ["acidos nucleicos", "proteinas", "carbohidratos", "lipidos", "nucleotidos"];

function checkAct1() {
  const inputs = [a1, a2, a3, a4, a5];
  let all = true;

  for (let i = 0; i < inputs.length; i++) {
    const val = normalizeText(inputs[i].value.trim());
    const correct = answers1[i];
    const s = document.getElementById("s" + (i + 1));

    if (val === correct) {
      s.textContent = "✔";
      s.className = "ok";
    } else {
      s.textContent = "✖ Respuesta incorrecta";
      s.className = "error";
      all = false;
    }
  }
  if (all) showSuccess();
}

// ========== ACTIVIDAD 2 ==========
const answers2 = ['B','J','A','D','E','F','G','H','I','C'];

document.addEventListener("DOMContentLoaded", () => {
  const letras = ["A","B","C","D","E","F","G","H","I","J"];
  for (let i = 1; i <= 10; i++) {
    const sel = document.getElementById("m" + i);
    sel.innerHTML = '<option value="">--Seleccione--</option>' +
      letras.map(l => `<option value="${l}">${l}</option>`).join("");
  }
});

function checkAct2() {
  let all = true;
  for (let i = 1; i <= 10; i++) {
    const sel = document.getElementById("m" + i);
    const val = sel.value;
    const s = document.getElementById("ms" + i);

    if (val === answers2[i - 1]) {
      s.textContent = "✔";
      s.className = "ok";
    } else {
      s.textContent = "✖ Respuesta incorrecta";
      s.className = "error";
      all = false;
    }
  }
  if (all) showSuccess();
}
