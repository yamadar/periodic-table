// Periodic table grid, legend chips and search filter — DOM only. Imported by main.js.

import { elements, categories } from './elements.js';
import { catColor, searchKey, isFBlock } from './helpers.js';
import { openPanel } from './panel.js';

// Filter state shared between the search box and legend chips.
const filterState = { activeCat: null, query: '' };
// Extra dim-callbacks registered by other views (e.g. the timeline).
const filterListeners = [];

export function onFilterChange(fn) {
  filterListeners.push(fn);
}

export function applyFilter() {
  const q = filterState.query;
  document.querySelectorAll('.cell').forEach((cell) => {
    const matchSearch = !q || cell.dataset.search.includes(q);
    const matchCat = !filterState.activeCat || cell.dataset.cat === filterState.activeCat;
    cell.classList.toggle('dim', !(matchSearch && matchCat));
  });
  filterListeners.forEach((fn) => fn(filterState));
}

function makeCell(el, placeOnGrid) {
  const cell = document.createElement('button');
  cell.className = 'cell';
  cell.style.setProperty('--c', catColor(el.cat));
  cell.dataset.cat = el.cat;
  cell.dataset.search = searchKey(el);
  if (placeOnGrid) {
    cell.style.gridColumn = el.c;
    cell.style.gridRow = el.r;
  } else {
    cell.style.gridColumn = el.c;
  }
  cell.innerHTML = `
    <div>
      <div class="num">${el.n}</div>
      <div class="sym">${el.sym}</div>
    </div>
    <div class="nm">${el.name}</div>
    <div class="ms">${el.mass}</div>
  `;
  cell.addEventListener('click', () => openPanel(el));
  return cell;
}

function renderGrid() {
  const tableEl = document.getElementById('table');
  elements.forEach((el) => {
    if (isFBlock(el)) return; // lanthanides/actinides go in their own strips
    tableEl.appendChild(makeCell(el, true));
  });

  // La / Ac placeholders in the main grid
  const laMark = document.createElement('div');
  laMark.className = 'placeholder';
  laMark.style.gridColumn = 3;
  laMark.style.gridRow = 6;
  laMark.innerHTML = '57–71<br>↓';
  tableEl.appendChild(laMark);

  const acMark = document.createElement('div');
  acMark.className = 'placeholder';
  acMark.style.gridColumn = 3;
  acMark.style.gridRow = 7;
  acMark.innerHTML = '89–103<br>↓';
  tableEl.appendChild(acMark);

  // f-block strips
  const lanWrap = document.getElementById('lan-row');
  const actWrap = document.getElementById('act-row');
  elements
    .filter((el) => el.cat === 'lanthanide')
    .forEach((el) => lanWrap.appendChild(makeCell(el, false)));
  elements
    .filter((el) => el.cat === 'actinide')
    .forEach((el) => actWrap.appendChild(makeCell(el, false)));
}

function renderLegend() {
  const legendEl = document.getElementById('legend');
  Object.entries(categories).forEach(([key, info]) => {
    const chip = document.createElement('button');
    chip.className = 'chip';
    chip.style.setProperty('--c', catColor(key));
    chip.dataset.cat = key;
    chip.textContent = info.label;
    chip.addEventListener('click', () => {
      filterState.activeCat = filterState.activeCat === key ? null : key;
      document
        .querySelectorAll('.chip')
        .forEach((c) => c.classList.toggle('active', c.dataset.cat === filterState.activeCat));
      applyFilter();
    });
    legendEl.appendChild(chip);
  });
}

export function initTable() {
  renderGrid();
  renderLegend();
  const searchEl = document.getElementById('search');
  searchEl.addEventListener('input', () => {
    filterState.query = searchEl.value.trim().toLowerCase();
    applyFilter();
  });
}
