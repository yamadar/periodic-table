// Pure helper functions — no DOM access. Safe to unit-test.

import { categories } from './elements.js';

// CSS custom-property name for an element category's color.
export const catColor = (cat) => `var(--c-${cat})`;

// Searchable lowercase index string for an element (name / symbol / jp / number).
export const searchKey = (el) =>
  `${el.name} ${el.sym} ${el.jp} ${el.n}`.toLowerCase();

// Japanese label for a phase value, falling back to the raw value.
export const phaseJP = (phase) =>
  ({ gas: '気体', liquid: '液体', solid: '固体' }[phase] || phase);

// Human-readable discovery year (negative years rendered as 紀元前 N).
export const formatDiscovery = (year) =>
  year < 0 ? `紀元前 ${Math.abs(year)}` : String(year);

// True when the element is rendered in an f-block strip rather than the main grid.
export const isFBlock = (el) => el.cat === 'lanthanide' || el.cat === 'actinide';

// Grid placement for the main table. Returns null for f-block elements,
// which are laid out separately. row/column are 1-based CSS grid lines.
export const gridPosition = (el) => {
  if (isFBlock(el)) return null;
  return { row: el.r, column: el.c };
};

// Category metadata for an element, or null if the category is unknown.
export const categoryInfo = (el) => categories[el.cat] || null;

// ── Bohr-model electron-shell parsing ────────────────────────────────────
const SUPER = { '¹': 1, '²': 2, '³': 3, '⁴': 4, '⁵': 5, '⁶': 6, '⁷': 7, '⁸': 8, '⁹': 9, '⁰': 0 };

const NOBLE_SHELLS = {
  He: [2],
  Ne: [2, 8],
  Ar: [2, 8, 8],
  Kr: [2, 8, 18, 8],
  Xe: [2, 8, 18, 18, 8],
  Rn: [2, 8, 18, 32, 18, 8],
};

export const SHELL_NAMES = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];

// Parse an electron-configuration string into electron counts per shell (K..Q).
export function parseConfig(cfg) {
  const shells = [0, 0, 0, 0, 0, 0, 0];
  let rest = cfg;
  const nobleMatch = rest.match(/^\[(He|Ne|Ar|Kr|Xe|Rn)\]/);
  if (nobleMatch) {
    NOBLE_SHELLS[nobleMatch[1]].forEach((n, i) => { shells[i] = n; });
    rest = rest.slice(nobleMatch[0].length);
  }
  const regex = /(\d)([spdf])([¹²³⁴⁵⁶⁷⁸⁹⁰]+)/g;
  let m;
  while ((m = regex.exec(rest)) !== null) {
    const n = parseInt(m[1], 10);
    const count = m[3].split('').reduce((a, c) => a * 10 + SUPER[c], 0);
    shells[n - 1] += count;
  }
  return shells.slice(0, shells.findLastIndex((s) => s > 0) + 1);
}
