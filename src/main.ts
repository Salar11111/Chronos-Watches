import './styles/main.css';

import { applyTranslations } from './i18n';
import { initErrorTracking } from './utils/errorTracking';
import { initConsent } from './modules/consent';
import { initCounters } from './modules/counters';
import { initCursorGlow } from './modules/cursorGlow';
import { initHeroTitle } from './modules/heroTitle';
import { initLocaleSwitcher } from './modules/localeSwitcher';
import { initNavigation } from './modules/navigation';
import { initParticles } from './modules/particles';
import { initPreloader } from './modules/preloader';
import { observeReveals } from './modules/reveal';
import { initServiceWorker } from './modules/serviceWorker';

applyTranslations();

initPreloader();
initHeroTitle();
initNavigation();
initLocaleSwitcher();
observeReveals();
initCounters();
initCursorGlow();
initParticles();
initConsent();
initErrorTracking();
initServiceWorker();

const lazyModules: Record<string, () => Promise<() => void>> = {
  collection: () => import('./modules/lazyCollection').then((m) => m.initLazyCollection),
  about: () => import('./modules/lazyAbout').then((m) => m.initLazyAbout),
  testimonials: () => import('./modules/lazyTestimonials').then((m) => m.initLazyTestimonials),
  newsletter: () => import('./modules/lazyNewsletter').then((m) => m.initLazyNewsletter),
};

const lazyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const section = entry.target as HTMLElement;
      const moduleName = section.dataset.lazy;
      if (!moduleName) return;
      const loader = lazyModules[moduleName];
      if (!loader) return;
      loader().then((init) => init());
      section.removeAttribute('data-lazy');
      lazyObserver.unobserve(section);
    });
  },
  { rootMargin: '200px 0px' },
);

document.querySelectorAll('[data-lazy]').forEach((section) => {
  lazyObserver.observe(section);
});
