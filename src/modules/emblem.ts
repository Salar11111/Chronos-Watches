const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initEmblem(): void {
  const emblem = document.querySelector('.emblem-motion') as HTMLElement | null;
  if (!emblem || !window.matchMedia('(hover: hover)').matches || prefersReduced) return;

  let tx = 0;
  let ty = 0;
  window.addEventListener('mousemove', (e) => {
    tx = (e.clientX / window.innerWidth - 0.5) * 18;
    ty = (e.clientY / window.innerHeight - 0.5) * 18;
  });
  const loop = (): void => {
    emblem.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${tx * 0.06}deg)`;
    requestAnimationFrame(loop);
  };
  loop();
}
