import { appStore } from '../state';

export function initNavigation(): void {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navProgress = document.getElementById('navProgress');
  const toTop = document.getElementById('toTop');

  function onScroll(): void {
    const y = window.scrollY;
    navbar?.classList.toggle('scrolled', y > 30);
    toTop?.classList.toggle('show', y > 600);
    if (navProgress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      navProgress.style.transform = max > 0 ? `scaleX(${y / max})` : 'scaleX(0)';
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  navToggle?.addEventListener('click', () => {
    const open = navLinks?.classList.toggle('open') ?? false;
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    appStore.set('isNavOpen', open);
  });

  document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks?.classList.remove('open');
      navToggle?.classList.remove('open');
      navToggle?.setAttribute('aria-expanded', 'false');
      appStore.set('isNavOpen', false);
    });
  });

  const sectionMap: Record<string, HTMLElement> = {};
  document.querySelectorAll('main section[id]').forEach((sec) => {
    sectionMap[(sec as HTMLElement).id] = sec as HTMLElement;
  });

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = (entry.target as HTMLElement).id;
        document.querySelectorAll('.nav-link').forEach((l) => {
          l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
        });
      });
    },
    { rootMargin: '-40% 0px -55% 0px' },
  );
  Object.values(sectionMap).forEach((sec) => spy.observe(sec));
}
