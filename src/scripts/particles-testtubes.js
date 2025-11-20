const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let W, H;
function resize() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

// Cargar icono SVG como imagen
const tubeImage = new Image();
tubeImage.src = "./src/assets/icon/ensayo.svg";

// Configuración
const NUM = 40;
const tubes = [];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class TestTube {
  constructor() {
    this.x = random(0, W);
    this.y = random(0, H);
    this.size = random(20, 45);
    this.speedX = random(-0.4, 0.4);
    this.speedY = random(-0.6, 0.6);
    this.angle = random(0, Math.PI * 2);
    this.spin = random(-0.01, 0.01);
    this.opacity = random(0.4, 0.9);
  }

  update(mouse) {
    // Movimiento natural
    this.x += this.speedX;
    this.y += this.speedY;
    this.angle += this.spin;

    // Reaparecer
    if (this.x < -50) this.x = W + 50;
    if (this.x > W + 50) this.x = -50;
    if (this.y < -50) this.y = H + 50;
    if (this.y > H + 50) this.y = -50;

    // Interacción con el mouse
    if (mouse.x) {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 120) {
        this.x += dx * 0.03;
        this.y += dy * 0.03;
      }
    }
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    // color temático
    ctx.filter = "invert(20%) sepia(25%) saturate(400%) hue-rotate(140deg)";

    ctx.drawImage(tubeImage, -this.size/2, -this.size/2, this.size, this.size);
    ctx.restore();
  }
}

// Inicializar tubos
for (let i = 0; i < NUM; i++) {
  tubes.push(new TestTube());
}

const mouse = { x: null, y: null };
window.addEventListener("mousemove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function animate() {
  ctx.clearRect(0, 0, W, H);

  tubes.forEach(t => {
    t.update(mouse);
    t.draw();
  });

  requestAnimationFrame(animate);
}

tubeImage.onload = animate;
