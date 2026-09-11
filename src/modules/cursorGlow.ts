const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initCursorGlow(): void {
  const cursorGlow = document.getElementById('cursorGlow');
  if (!cursorGlow || !window.matchMedia('(hover: hover)').matches || prefersReduced) return;

  let gx = window.innerWidth / 2;
  let gy = window.innerHeight / 2;
  window.addEventListener('mousemove', (e) => {
    gx = e.clientX;
    gy = e.clientY;
  });
  const glowLoop = (): void => {
    cursorGlow.style.left = `${gx}px`;
    cursorGlow.style.top = `${gy}px`;
    requestAnimationFrame(glowLoop);
  };
  glowLoop();
}
