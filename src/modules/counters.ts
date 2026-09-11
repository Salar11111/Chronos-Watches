const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initCounters(): void {
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        counterObserver.unobserve(el);
        const target = parseFloat(el.dataset.count ?? '0');
        const isDec = Boolean(el.dataset.decimal);
        const duration = prefersReduced ? 0 : 1800;
        const start = performance.now();
        const tick = (now: number): void => {
          const p = duration === 0 ? 1 : Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 4);
          const val = target * eased;
          el.textContent = isDec ? val.toFixed(1) : Math.round(val).toLocaleString();
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.6 },
  );
  counters.forEach((c) => counterObserver.observe(c));
}
