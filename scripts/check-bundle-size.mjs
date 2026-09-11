import { readdirSync, readFileSync, statSync } from 'fs';
import { join } from 'path';
import { gzipSync } from 'zlib';

const DIST = 'dist/assets';
const MAX_JS_GZIP = 60 * 1024;
const MAX_CSS_GZIP = 40 * 1024;

const files = readdirSync(DIST);
const jsFiles = files.filter((f) => f.endsWith('.js'));
const cssFiles = files.filter((f) => f.endsWith('.css'));

const gzipSize = (file) => gzipSync(readFileSync(join(DIST, file))).length;

const jsSize = jsFiles.reduce((sum, f) => sum + gzipSize(f), 0);
const cssSize = cssFiles.reduce((sum, f) => sum + gzipSize(f), 0);

console.log(`JS gzip: ${(jsSize / 1024).toFixed(2)} KB`);
console.log(`CSS gzip: ${(cssSize / 1024).toFixed(2)} KB`);

if (jsSize > MAX_JS_GZIP) {
  console.error(`JS bundle exceeds ${MAX_JS_GZIP / 1024} KB gzip limit`);
  process.exit(1);
}
if (cssSize > MAX_CSS_GZIP) {
  console.error(`CSS bundle exceeds ${MAX_CSS_GZIP / 1024} KB gzip limit`);
  process.exit(1);
}

console.log('Bundle size budgets passed');
