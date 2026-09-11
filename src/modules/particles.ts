const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  opacity: number;
}

export function initParticles(): void {
  const particleBox = document.getElementById('particles');
  if (!particleBox || prefersReduced) return;

  const canvas = document.createElement('canvas');
  canvas.className = 'particles-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  particleBox.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const count = Math.min(26, Math.floor(window.innerWidth / 55));
  const particles: Particle[] = Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: 1 + Math.random() * 3,
    speed: 0.15 + Math.random() * 0.35,
    drift: (Math.random() - 0.5) * 0.3,
    opacity: 0.2 + Math.random() * 0.5,
  }));

  const resize = (): void => {
    canvas.width = particleBox.clientWidth;
    canvas.height = particleBox.clientHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  const render = (): void => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p) => {
      p.y -= p.speed;
      p.x += p.drift;
      if (p.y < -10) {
        p.y = canvas.height + 10;
        p.x = Math.random() * canvas.width;
      }
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`;
      ctx.fill();
    });
    requestAnimationFrame(render);
  };
  render();
}
