import { appStore } from '../state';

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initSlider(): void {
  const sliderTrack = document.getElementById('sliderTrack');
  if (!sliderTrack) return;

  const dotsWrap = document.getElementById('sliderDots');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const slider = document.getElementById('slider');
  const cardsCount = sliderTrack.querySelectorAll('.t-card').length;
  if (cardsCount === 0 || !dotsWrap) return;

  let index = 0;
  let auto: number | undefined;

  sliderTrack.querySelectorAll('.t-card').forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    dot.addEventListener('click', () => go(i));
    dotsWrap.appendChild(dot);
  });

  const dots = dotsWrap.querySelectorAll('.slider-dot');
  const go = (i: number): void => {
    index = ((i % cardsCount) + cardsCount) % cardsCount;
    sliderTrack.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, di) => d.classList.toggle('active', di === index));
    appStore.set('sliderIndex', index);
  };
  const next = (): void => go(index + 1);
  const pauseSlider = (): void => {
    if (auto !== undefined) window.clearInterval(auto);
  };
  const resumeSlider = (): void => {
    pauseSlider();
    if (!prefersReduced) auto = window.setInterval(next, 6000);
  };

  prevBtn?.addEventListener('click', () => go(index - 1));
  nextBtn?.addEventListener('click', next);
  resumeSlider();

  slider?.addEventListener('mouseenter', pauseSlider);
  slider?.addEventListener('mouseleave', resumeSlider);
  slider?.addEventListener('focusin', pauseSlider);
  slider?.addEventListener('focusout', resumeSlider);
}
