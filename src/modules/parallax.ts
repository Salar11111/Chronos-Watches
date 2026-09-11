const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initParallax(): void {
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (!parallaxEls.length || prefersReduced) return;

  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        parallaxEls.forEach((el) => {
          const speed = parseFloat((el as HTMLElement).dataset.parallax ?? '0.1') || 0.1;
          const parent = el.parentElement;
          if (!parent) return;
          const rect = parent.getBoundingClientRect();
          if (rect.bottom < 0 || rect.top > window.innerHeight) return;
          const delta = rect.top + rect.height / 2 - window.innerHeight / 2;
          (el as HTMLElement).style.transform = `translateY(${delta * speed}px)`;
        });
        ticking = false;
      });
    },
    { passive: true },
  );
}
