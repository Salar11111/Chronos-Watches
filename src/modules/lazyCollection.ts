import { initCollection } from '../components/ProductCard';
import { observeReveals } from './reveal';
import { initProductCards } from './productCards';

export function initLazyCollection(): void {
  initCollection();
  observeReveals();
  initProductCards();
}
