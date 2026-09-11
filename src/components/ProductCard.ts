import { products } from '../data/products';
import type { Product } from '../data/products';

export function renderProductCard(product: Product): string {
  const colorVars = Object.entries(product.colors)
    .map(([key, value]) => `--${key}:${value}`)
    .join(';');
  const badgeClass = product.badgeDark ? ' badge-dark' : '';
  const badge = product.badge ? `<span class="badge${badgeClass}">${product.badge}</span>` : '';

  return `
    <article class="product-card reveal" data-product-id="${product.id}">
      <div class="product-media">
        <div class="product-glow"></div>
        <svg class="product-watch" viewBox="0 0 240 340" style="${colorVars}"><use href="#wat"/></svg>
        ${badge}
        <div class="product-overlay">
          <a href="#newsletter" class="btn btn-gold btn-sm">Reserve Mine <svg><use href="#i-arrow"/></svg></a>
        </div>
      </div>
      <div class="product-info">
        <span class="product-tag">${product.tag}</span>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-foot">
          <span class="product-price">${product.price}</span>
          <button class="btn-icon" aria-label="Add ${product.name} to wishlist"><svg><use href="#i-plus"/></svg></button>
        </div>
      </div>
    </article>
  `;
}

export function initCollection(): void {
  const root = document.getElementById('collection-root');
  if (!root) return;
  root.innerHTML = products.map(renderProductCard).join('');
}
