import { describe, expect, it } from 'vitest';
import { isValidEmail } from '../utils/validation';

describe('isValidEmail', () => {
  it('accepts valid email addresses', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('collector+news@chronos.ch')).toBe(true);
    expect(isValidEmail('name.surname@sub.domain.org')).toBe(true);
  });

  it('rejects invalid email addresses', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('invalid')).toBe(false);
    expect(isValidEmail('missing@domain')).toBe(false);
    expect(isValidEmail('spaces @domain.com')).toBe(false);
    expect(isValidEmail('@domain.com')).toBe(false);
  });
});
