const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initProductCards(): void {
  const cards = document.querySelectorAll('.product-card');
  if (!cards.length || !window.matchMedia('(hover: hover)').matches || prefersReduced) return;

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = ((e as MouseEvent).clientX - rect.left) / rect.width - 0.5;
      const py = ((e as MouseEvent).clientY - rect.top) / rect.height - 0.5;
      (card as HTMLElement).style.transform = `perspective(900px) rotateY(${px * 10}deg) rotateX(${-py * 10}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      (card as HTMLElement).style.transform = '';
    });
  });
}
