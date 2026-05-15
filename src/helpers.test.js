import { describe, it, expect } from 'vitest';
import { elements } from './elements.js';
import {
  catColor,
  searchKey,
  phaseJP,
  formatDiscovery,
  isFBlock,
  gridPosition,
  categoryInfo,
  parseConfig,
} from './helpers.js';

const byNumber = (n) => elements.find((e) => e.n === n);

describe('catColor', () => {
  it('builds a CSS custom-property reference', () => {
    expect(catColor('noble')).toBe('var(--c-noble)');
  });
});

describe('searchKey', () => {
  it('is lowercase and includes name, symbol, jp and number', () => {
    const key = searchKey(byNumber(1)); // Hydrogen
    expect(key).toBe(key.toLowerCase());
    expect(key).toContain('hydrogen');
    expect(key).toContain('h');
    expect(key).toContain('水素');
    expect(key).toContain('1');
  });
});

describe('phaseJP', () => {
  it('maps known phases to Japanese', () => {
    expect(phaseJP('gas')).toBe('気体');
    expect(phaseJP('liquid')).toBe('液体');
    expect(phaseJP('solid')).toBe('固体');
  });
  it('falls back to the raw value for unknown phases', () => {
    expect(phaseJP('plasma')).toBe('plasma');
  });
});

describe('formatDiscovery', () => {
  it('renders positive years as-is', () => {
    expect(formatDiscovery(1766)).toBe('1766');
  });
  it('renders negative years as BCE in Japanese', () => {
    expect(formatDiscovery(-3750)).toBe('紀元前 3750');
  });
});

describe('isFBlock', () => {
  it('flags lanthanides and actinides', () => {
    expect(isFBlock(byNumber(57))).toBe(true); // Lanthanum
    expect(isFBlock(byNumber(92))).toBe(true); // Uranium (actinide)
  });
  it('does not flag main-group / d-block elements', () => {
    expect(isFBlock(byNumber(1))).toBe(false); // Hydrogen
    expect(isFBlock(byNumber(26))).toBe(false); // Iron
  });
});

describe('gridPosition', () => {
  it('maps Hydrogen to row 1, column 1', () => {
    expect(gridPosition(byNumber(1))).toEqual({ row: 1, column: 1 });
  });
  it('maps Helium to row 1, column 18', () => {
    expect(gridPosition(byNumber(2))).toEqual({ row: 1, column: 18 });
  });
  it('maps Iron to row 4, column 8', () => {
    expect(gridPosition(byNumber(26))).toEqual({ row: 4, column: 8 });
  });
  it('returns null for f-block elements (laid out separately)', () => {
    expect(gridPosition(byNumber(57))).toBeNull(); // Lanthanum
    expect(gridPosition(byNumber(89))).toBeNull(); // Actinium
  });
});

describe('categoryInfo', () => {
  it('returns metadata for a known category', () => {
    expect(categoryInfo(byNumber(2))).toEqual({ label: 'Noble Gas', jp: '貴ガス' });
  });
  it('classifies alkali metals consistently', () => {
    // Group 1 (excluding hydrogen): Li, Na, K, Rb, Cs, Fr
    [3, 11, 19, 37, 55, 87].forEach((n) => {
      expect(byNumber(n).cat).toBe('alkali');
    });
  });
});

describe('parseConfig', () => {
  it('parses hydrogen 1s¹ to a single shell of 1 electron', () => {
    expect(parseConfig('1s¹')).toEqual([1]);
  });
  it('parses helium 1s² to a single full shell', () => {
    expect(parseConfig('1s²')).toEqual([2]);
  });
  it('expands a noble-gas core (Neon → [2,8] for sodium 3s¹)', () => {
    expect(parseConfig('[Ne]3s¹')).toEqual([2, 8, 1]);
  });
  it('sums electrons across subshells of the same shell', () => {
    // Oxygen [He]2s²2p⁴ → K:2, L:2+4
    expect(parseConfig('[He]2s²2p⁴')).toEqual([2, 6]);
  });
  it('handles multi-digit superscript counts (4f¹⁴)', () => {
    // Lutetium [Xe]4f¹⁴5d¹6s² → Xe core [2,8,18,18,8], then N+=14, O+=1, P=2
    expect(parseConfig('[Xe]4f¹⁴5d¹6s²')).toEqual([2, 8, 18, 32, 9, 2]);
  });
  it('total electrons equal the atomic number for sampled elements', () => {
    [1, 6, 18, 26, 54, 79].forEach((n) => {
      const el = elements.find((e) => e.n === n);
      const total = parseConfig(el.cfg).reduce((a, b) => a + b, 0);
      expect(total, `${el.sym} electron count`).toBe(n);
    });
  });
});
