// background.js
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  const bgColor = "#edeae8";
  const colors = ["#a3ab78", "#506266"]; // partículas

  let particles = [];
  let mouse = { x: null, y: null };
  const NUM_PARTICLES = 70;       // puedes ajustar
  const MAX_RADIUS = 6;
  const MIN_RADIUS = 2;
  const MOUSE_RADIUS = 120;       // radio de "antigravedad"

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(randomY = false) {
      this.x = Math.random() * canvas.width;
      this.y = randomY ? Math.random() * canvas.height : canvas.height + Math.random() * 50;
      this.radius = Math.random() * (MAX_RADIUS - MIN_RADIUS) + MIN_RADIUS;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.vx = (Math.random() - 0.5) * 0.6; // leve movimiento horizontal
      this.vy = - (Math.random() * 0.6 + 0.2); // suben suavemente (antigravity)
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    update() {
      // Movimiento base
      this.x += this.vx;
      this.y += this.vy;

      // Reaparecer si salen de pantalla
      if (this.y + this.radius < 0) {
        this.reset(false);
      }
      if (this.x - this.radius > canvas.width) {
        this.x = -this.radius;
      }
      if (this.x + this.radius < 0) {
        this.x = canvas.width + this.radius;
      }

      // Efecto antigravity alrededor del mouse (repulsión)
      if (mouse.x !== null && mouse.y !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS; // 0..1
          const angle = Math.atan2(dy, dx);

          // Ajustar fuerza de repulsión
          const repulse = force * 2.2;

          this.x += Math.cos(angle) * repulse;
          this.y += Math.sin(angle) * repulse;
        }
      }
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    // Fondo sólido
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  // Capturar posición del mouse
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // Si el mouse sale de la ventana, se desactiva el efecto
  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  initParticles();
  animate();
});
