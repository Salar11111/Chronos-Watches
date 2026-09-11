import { appStore } from '../state';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initPreloader(): void {
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    window.setTimeout(() => {
      preloader?.classList.add('hide');
      document.body.classList.add('loaded');
      appStore.set('isLoaded', true);
    }, prefersReduced ? 0 : 850);
  });
}
