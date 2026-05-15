// Discovery timeline visualization — DOM only. Imported by main.js.

import { elements } from './elements.js';
import { catColor, searchKey, formatDiscovery } from './helpers.js';
import { openPanel } from './panel.js';
import { onFilterChange } from './table.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

export function initTimeline() {
  const svg = document.getElementById('tl-svg');
  const tip = document.getElementById('tl-tip');
  const wrap = document.getElementById('tl-wrap');
  const W = 2400, H = 460;
  const AXIS_Y = 260;
  const PAD_L = 40, PAD_R = 40;

  // piecewise year→x mapping (ancient compressed, modern expanded)
  const SEGMENTS = [
    { from: -9000, to: 1500, frac: 0.12, label: 'Ancient', jp: '古代' },
    { from: 1500, to: 1700, frac: 0.08, label: 'Renaissance', jp: 'ルネサンス' },
    { from: 1700, to: 1800, frac: 0.18, label: 'Enlightenment', jp: '啓蒙時代' },
    { from: 1800, to: 1900, frac: 0.30, label: 'Industrial Age', jp: '産業革命' },
    { from: 1900, to: 2015, frac: 0.32, label: 'Atomic Age', jp: '原子時代' },
  ];
  const inner = W - PAD_L - PAD_R;
  let acc = 0;
  SEGMENTS.forEach((s) => {
    s.x0 = PAD_L + acc * inner;
    acc += s.frac;
    s.x1 = PAD_L + acc * inner;
  });

  function yearToX(y) {
    for (const s of SEGMENTS) {
      if (y >= s.from && y <= s.to) return s.x0 + ((y - s.from) / (s.to - s.from)) * (s.x1 - s.x0);
    }
    return y < SEGMENTS[0].from ? SEGMENTS[0].x0 : SEGMENTS[SEGMENTS.length - 1].x1;
  }

  // era backgrounds
  SEGMENTS.forEach((s, i) => {
    const rect = document.createElementNS(SVG_NS, 'rect');
    rect.setAttribute('class', 'tl-era-bg');
    rect.setAttribute('x', s.x0);
    rect.setAttribute('y', 30);
    rect.setAttribute('width', s.x1 - s.x0);
    rect.setAttribute('height', H - 60);
    rect.setAttribute('fill', i % 2 ? 'var(--gold)' : 'var(--ink)');
    svg.appendChild(rect);

    const labelEn = document.createElementNS(SVG_NS, 'text');
    labelEn.setAttribute('class', 'tl-era-label');
    labelEn.setAttribute('x', (s.x0 + s.x1) / 2);
    labelEn.setAttribute('y', 50);
    labelEn.setAttribute('text-anchor', 'middle');
    labelEn.textContent = s.label;
    svg.appendChild(labelEn);

    const labelJp = document.createElementNS(SVG_NS, 'text');
    labelJp.setAttribute('class', 'tl-era-jp');
    labelJp.setAttribute('x', (s.x0 + s.x1) / 2);
    labelJp.setAttribute('y', 66);
    labelJp.setAttribute('text-anchor', 'middle');
    labelJp.textContent = s.jp;
    svg.appendChild(labelJp);

    if (i > 0) {
      const div = document.createElementNS(SVG_NS, 'line');
      div.setAttribute('x1', s.x0);
      div.setAttribute('x2', s.x0);
      div.setAttribute('y1', 30);
      div.setAttribute('y2', H - 30);
      div.setAttribute('stroke', 'var(--rule)');
      div.setAttribute('stroke-dasharray', '2,4');
      svg.appendChild(div);
    }
  });

  // axis line
  const axis = document.createElementNS(SVG_NS, 'line');
  axis.setAttribute('class', 'tl-axis');
  axis.setAttribute('x1', PAD_L);
  axis.setAttribute('x2', W - PAD_R);
  axis.setAttribute('y1', AXIS_Y);
  axis.setAttribute('y2', AXIS_Y);
  svg.appendChild(axis);

  // year ticks
  const TICKS = [
    { y: -3000, label: '−3000', major: true },
    { y: -1000, label: '−1000', major: false },
    { y: 1, label: '0', major: true },
    { y: 1500, label: '1500', major: true },
    { y: 1600, label: '1600', major: false },
    { y: 1700, label: '1700', major: true },
    { y: 1750, label: '1750', major: false },
    { y: 1800, label: '1800', major: true },
    { y: 1820, label: '1820', major: false },
    { y: 1840, label: '1840', major: false },
    { y: 1860, label: '1860', major: false },
    { y: 1880, label: '1880', major: false },
    { y: 1900, label: '1900', major: true },
    { y: 1920, label: '1920', major: false },
    { y: 1940, label: '1940', major: false },
    { y: 1960, label: '1960', major: false },
    { y: 1980, label: '1980', major: false },
    { y: 2000, label: '2000', major: true },
    { y: 2010, label: '2010', major: false },
  ];

  TICKS.forEach((t) => {
    const x = yearToX(t.y);
    const tick = document.createElementNS(SVG_NS, 'line');
    tick.setAttribute('class', t.major ? 'tl-tick-major' : 'tl-tick');
    tick.setAttribute('x1', x);
    tick.setAttribute('x2', x);
    tick.setAttribute('y1', AXIS_Y - (t.major ? 8 : 4));
    tick.setAttribute('y2', AXIS_Y + (t.major ? 8 : 4));
    svg.appendChild(tick);

    const lbl = document.createElementNS(SVG_NS, 'text');
    lbl.setAttribute('class', 'tl-year' + (t.major ? ' tl-year-major' : ''));
    lbl.setAttribute('x', x);
    lbl.setAttribute('y', AXIS_Y + 22);
    lbl.textContent = t.label;
    svg.appendChild(lbl);
  });

  // dedupe element positions: stagger above/below axis when close
  const sorted = [...elements].sort((a, b) => a.disc - b.disc);
  const placed = [];
  const MIN_GAP = 24;

  sorted.forEach((el) => {
    const x = yearToX(el.disc);
    const slotsAbove = [-30, -60, -90, -120, -150, -180, -210];
    const slotsBelow = [30, 60, 90, 120, 150, 180, 210];
    let pick = null;
    const order = [];
    for (let i = 0; i < 7; i++) {
      order.push(slotsAbove[i]);
      order.push(slotsBelow[i]);
    }
    for (const offset of order) {
      const yCand = AXIS_Y + offset;
      const clash = placed.some((p) => Math.abs(p.x - x) < MIN_GAP && Math.abs(p.y - yCand) < 18);
      if (!clash) {
        pick = yCand;
        break;
      }
    }
    if (pick === null) pick = AXIS_Y + (Math.random() > 0.5 ? -30 : 30);
    placed.push({ x, y: pick, el });
  });

  // draw
  placed.forEach((p) => {
    const g = document.createElementNS(SVG_NS, 'g');
    g.setAttribute('class', 'tl-group');
    g.dataset.cat = p.el.cat;
    g.dataset.search = searchKey(p.el);

    const color = catColor(p.el.cat);

    const stem = document.createElementNS(SVG_NS, 'line');
    stem.setAttribute('class', 'tl-stem');
    stem.setAttribute('x1', p.x);
    stem.setAttribute('x2', p.x);
    stem.setAttribute('y1', AXIS_Y);
    stem.setAttribute('y2', p.y);
    stem.setAttribute('stroke', color);
    g.appendChild(stem);

    const dot = document.createElementNS(SVG_NS, 'circle');
    dot.setAttribute('class', 'tl-dot');
    dot.setAttribute('cx', p.x);
    dot.setAttribute('cy', p.y);
    dot.setAttribute('r', 4.5);
    dot.setAttribute('fill', color);
    dot.setAttribute('stroke', 'var(--bg-0)');
    dot.setAttribute('stroke-width', 1);
    g.appendChild(dot);

    const lbl = document.createElementNS(SVG_NS, 'text');
    lbl.setAttribute('class', 'tl-label');
    lbl.setAttribute('x', p.x);
    lbl.setAttribute('y', p.y + (p.y < AXIS_Y ? -8 : 16));
    lbl.setAttribute('text-anchor', 'middle');
    lbl.textContent = p.el.sym;
    g.appendChild(lbl);

    g.addEventListener('mouseenter', () => {
      const discYear = formatDiscovery(p.el.disc);
      tip.innerHTML = `<b>${p.el.sym}</b> · ${p.el.name}<br><span class="tl-tip-jp">${p.el.jp} · ${discYear} · ${p.el.by}</span>`;
      tip.classList.add('show');
    });
    g.addEventListener('mousemove', (e) => {
      const r = wrap.getBoundingClientRect();
      tip.style.left = (e.clientX - r.left + wrap.scrollLeft + 12) + 'px';
      tip.style.top = (e.clientY - r.top + 12) + 'px';
    });
    g.addEventListener('mouseleave', () => tip.classList.remove('show'));
    g.addEventListener('click', () => openPanel(p.el));

    svg.appendChild(g);
  });

  // ── stats ──
  const statsEl = document.getElementById('tl-stats');
  const byEra = SEGMENTS.map((s) => ({
    s,
    count: elements.filter((el) => el.disc >= s.from && el.disc < s.to).length,
  }));
  const stats = [
    { label: 'Ancient · 古代', count: byEra[0].count + byEra[1].count, range: '−9000 — 1700' },
    { label: '1700s · 一八世紀', count: byEra[2].count, range: '1700 — 1800' },
    { label: '1800s · 一九世紀', count: byEra[3].count, range: '1800 — 1900' },
    { label: 'Modern · 現代', count: byEra[4].count, range: '1900 — 2010' },
  ];
  stats.forEach((s) => {
    const div = document.createElement('div');
    div.className = 'tl-stat';
    div.innerHTML = `
      <div class="tl-stat-num">${s.count}</div>
      <div class="tl-stat-label">${s.range}</div>
      <div class="tl-stat-jp">${s.label}</div>
    `;
    statsEl.appendChild(div);
  });

  // dim timeline groups in sync with the shared table filter
  onFilterChange(({ query, activeCat }) => {
    document.querySelectorAll('.tl-group').forEach((g) => {
      const matchSearch = !query || g.dataset.search.includes(query);
      const matchCat = !activeCat || g.dataset.cat === activeCat;
      g.classList.toggle('dim', !(matchSearch && matchCat));
    });
  });
}
