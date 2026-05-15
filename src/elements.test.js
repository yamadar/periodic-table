import { describe, it, expect } from 'vitest';
import { elements, categories } from './elements.js';

describe('element dataset integrity', () => {
  it('contains exactly 118 elements', () => {
    expect(elements).toHaveLength(118);
  });

  it('has atomic numbers 1..118, unique and contiguous', () => {
    const numbers = elements.map((e) => e.n);
    expect(new Set(numbers).size).toBe(118);
    const sorted = [...numbers].sort((a, b) => a - b);
    expect(sorted[0]).toBe(1);
    expect(sorted[117]).toBe(118);
    sorted.forEach((n, i) => expect(n).toBe(i + 1));
  });

  it('has unique element symbols', () => {
    const symbols = elements.map((e) => e.sym);
    expect(new Set(symbols).size).toBe(118);
  });

  it('has all required fields on every element', () => {
    const required = ['n', 'sym', 'name', 'jp', 'mass', 'cat', 'r', 'c', 'cfg', 'disc', 'by', 'phase', 'use'];
    for (const el of elements) {
      for (const field of required) {
        expect(el[field], `${el.sym} missing ${field}`).toBeDefined();
      }
      expect(typeof el.n).toBe('number');
      expect(typeof el.mass).toBe('number');
      expect(el.mass).toBeGreaterThan(0);
      expect(typeof el.sym).toBe('string');
      expect(el.sym.length).toBeGreaterThan(0);
    }
  });

  it('references only known categories', () => {
    const known = new Set(Object.keys(categories));
    for (const el of elements) {
      expect(known.has(el.cat), `${el.sym} has unknown category ${el.cat}`).toBe(true);
    }
  });

  it('places every element within the CSS grid bounds', () => {
    for (const el of elements) {
      expect(el.c).toBeGreaterThanOrEqual(1);
      expect(el.c).toBeLessThanOrEqual(18);
      expect(el.r).toBeGreaterThanOrEqual(1);
      expect(el.r).toBeLessThanOrEqual(10);
    }
  });

  it('uses valid phase values', () => {
    const valid = new Set(['solid', 'liquid', 'gas']);
    for (const el of elements) {
      expect(valid.has(el.phase), `${el.sym} has invalid phase ${el.phase}`).toBe(true);
    }
  });

  it('has 15 lanthanides and 15 actinides', () => {
    expect(elements.filter((e) => e.cat === 'lanthanide')).toHaveLength(15);
    expect(elements.filter((e) => e.cat === 'actinide')).toHaveLength(15);
  });
});
