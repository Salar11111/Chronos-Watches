const revealSelector = '.reveal, .reveal-left, .reveal-right, .reveal-zoom';

export function observeReveals(root: ParentNode = document): void {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.classList.add('visible');
          revealObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
  );
  root.querySelectorAll(revealSelector).forEach((el) => revealObserver.observe(el));
}

export function initReveal(): void {
  observeReveals();
}
