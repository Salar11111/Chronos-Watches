import { isValidEmail } from '../utils/validation';

export function initNewsletterForm(): void {
  const form = document.getElementById('newsletterForm');
  const formMsg = document.getElementById('formMsg');
  if (!form || !formMsg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('newsletterEmail') as HTMLInputElement | null;
    if (!input) return;
    const email = input.value.trim();
    if (!isValidEmail(email)) {
      formMsg.textContent = 'Please enter a valid email address.';
      formMsg.classList.add('error');
      return;
    }
    formMsg.classList.remove('error');
    formMsg.textContent = 'Welcome to the Inner Circle — your 10% code is on its way.';
    input.value = '';
  });
}
