const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initHeroTitle(): void {
  const heroTitle = document.querySelector('.hero-copy .hero-title');
  if (!heroTitle || prefersReduced) return;

  document.querySelectorAll('.hero-title .line').forEach((line, i) => {
    const chars = line.textContent?.trim() ?? '';
    line.textContent = '';
    chars.split('').forEach((ch) => {
      const span = document.createElement('span');
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      span.style.display = 'inline-block';
      span.style.animationDelay = `${0.15 + i * 0.15 + Math.random() * 0.25}s`;
      span.className = 'char-rise';
      line.appendChild(span);
    });
  });
}
