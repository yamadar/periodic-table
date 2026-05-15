// Distribution maps: temp-range bars, scatter, heatmap — DOM only. Imported by main.js.

import { elements } from './elements.js';
import { catColor } from './helpers.js';
import { openPanel } from './panel.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

// shared temp scale (piecewise: cold compressed, mid expanded)
const TEMP_BREAKS = [
  { from: -300, to: 0, frac: 0.20 },
  { from: 0, to: 500, frac: 0.20 },
  { from: 500, to: 1500, frac: 0.25 },
  { from: 1500, to: 3500, frac: 0.20 },
  { from: 3500, to: 6000, frac: 0.15 },
];

function tempToFrac(t) {
  t = Math.max(-300, Math.min(6000, t));
  let acc = 0;
  for (const s of TEMP_BREAKS) {
    if (t <= s.to) return acc + ((t - s.from) / (s.to - s.from)) * s.frac;
    acc += s.frac;
  }
  return 1;
}

function initTabs() {
  document.querySelectorAll('.tab').forEach((t) => {
    t.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach((x) => x.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach((x) => x.classList.remove('active'));
      t.classList.add('active');
      document.getElementById('panel-' + t.dataset.tab).classList.add('active');
    });
  });
}

function initBars(valid) {
  let currentSort = 'n';

  const axisSvg = document.getElementById('bars-axis');
  const AXIS_W = 1000;
  const BAR_PAD_L = 8, BAR_PAD_R = 8;
  const BAR_INNER = AXIS_W - BAR_PAD_L - BAR_PAD_R;

  function xAt(t) {
    return BAR_PAD_L + tempToFrac(t) * BAR_INNER;
  }

  const TICKS_A = [-273, -200, -100, 0, 100, 300, 500, 1000, 1500, 2000, 3000, 4000, 5000];
  TICKS_A.forEach((t) => {
    const x = xAt(t);
    const line = document.createElementNS(SVG_NS, 'line');
    line.setAttribute('x1', x);
    line.setAttribute('x2', x);
    line.setAttribute('y1', 18);
    line.setAttribute('y2', 24);
    line.setAttribute('stroke', 'var(--ink-dim)');
    axisSvg.appendChild(line);

    const lbl = document.createElementNS(SVG_NS, 'text');
    lbl.setAttribute('x', x);
    lbl.setAttribute('y', 13);
    lbl.setAttribute('text-anchor', 'middle');
    lbl.setAttribute('fill', 'var(--ink-dim)');
    lbl.setAttribute('font-family', 'JetBrains Mono');
    lbl.setAttribute('font-size', '9');
    lbl.textContent = t + '°';
    axisSvg.appendChild(lbl);
  });
  // 20°C line on axis
  const rtX = xAt(20);
  const rtLn = document.createElementNS(SVG_NS, 'line');
  rtLn.setAttribute('x1', rtX);
  rtLn.setAttribute('x2', rtX);
  rtLn.setAttribute('y1', 0);
  rtLn.setAttribute('y2', 32);
  rtLn.setAttribute('stroke', 'var(--gold)');
  rtLn.setAttribute('stroke-width', '1.5');
  axisSvg.appendChild(rtLn);
  const rtLbl = document.createElementNS(SVG_NS, 'text');
  rtLbl.setAttribute('x', rtX + 4);
  rtLbl.setAttribute('y', 28);
  rtLbl.setAttribute('fill', 'var(--gold)');
  rtLbl.setAttribute('font-family', 'JetBrains Mono');
  rtLbl.setAttribute('font-size', '9');
  rtLbl.setAttribute('font-weight', '600');
  rtLbl.textContent = '20° 常温';
  axisSvg.appendChild(rtLbl);

  function renderBars() {
    const sorters = {
      n: (a, b) => a.n - b.n,
      mp: (a, b) => a.mp - b.mp,
      bp: (a, b) => a.bp - b.bp,
      range: (a, b) => (b.bp - b.mp) - (a.bp - a.mp),
    };
    const list = [...valid].sort(sorters[currentSort]);
    const container = document.getElementById('bars-list');
    container.innerHTML = '';

    list.forEach((el) => {
      const row = document.createElement('div');
      row.className = 'bar-row';
      row.addEventListener('click', () => openPanel(el));

      const labelDiv = document.createElement('div');
      labelDiv.className = 'bar-label';
      labelDiv.innerHTML = `<span class="sym">${el.sym}</span><span class="num">${el.n}</span>`;
      row.appendChild(labelDiv);

      const trackDiv = document.createElement('div');
      trackDiv.className = 'bar-track';
      const svg = document.createElementNS(SVG_NS, 'svg');
      svg.setAttribute('class', 'bars-svg');
      svg.setAttribute('viewBox', `0 0 ${AXIS_W} 18`);
      svg.setAttribute('preserveAspectRatio', 'none');

      const color = catColor(el.cat);
      const mpX = xAt(el.mp);
      const bpX = xAt(el.bp);

      // solid range (-273 to mp) — dim
      const solid = document.createElementNS(SVG_NS, 'rect');
      solid.setAttribute('x', xAt(-273));
      solid.setAttribute('y', 8);
      solid.setAttribute('width', Math.max(0, mpX - xAt(-273)));
      solid.setAttribute('height', 2);
      solid.setAttribute('fill', 'var(--ink-dim)');
      solid.setAttribute('opacity', 0.25);
      svg.appendChild(solid);

      // liquid range (mp to bp) — colored
      const liquid = document.createElementNS(SVG_NS, 'rect');
      liquid.setAttribute('x', mpX);
      liquid.setAttribute('y', 5);
      liquid.setAttribute('width', Math.max(1.5, bpX - mpX));
      liquid.setAttribute('height', 8);
      liquid.setAttribute('fill', color);
      liquid.setAttribute('opacity', 0.85);
      svg.appendChild(liquid);

      // mp endcap
      const mpCap = document.createElementNS(SVG_NS, 'circle');
      mpCap.setAttribute('cx', mpX);
      mpCap.setAttribute('cy', 9);
      mpCap.setAttribute('r', 2.5);
      mpCap.setAttribute('fill', color);
      svg.appendChild(mpCap);
      // bp endcap
      const bpCap = document.createElementNS(SVG_NS, 'circle');
      bpCap.setAttribute('cx', bpX);
      bpCap.setAttribute('cy', 9);
      bpCap.setAttribute('r', 2.5);
      bpCap.setAttribute('fill', color);
      svg.appendChild(bpCap);

      // 20°C line per row
      const rt = document.createElementNS(SVG_NS, 'line');
      rt.setAttribute('x1', rtX);
      rt.setAttribute('x2', rtX);
      rt.setAttribute('y1', 0);
      rt.setAttribute('y2', 18);
      rt.setAttribute('stroke', 'var(--gold)');
      rt.setAttribute('stroke-width', 1);
      rt.setAttribute('opacity', 0.3);
      svg.appendChild(rt);

      svg.setAttribute('title', `${el.name} · mp ${el.mp}°C · bp ${el.bp}°C`);
      const titleEl = document.createElementNS(SVG_NS, 'title');
      titleEl.textContent = `${el.sym} ${el.name} — mp ${el.mp}°C / bp ${el.bp}°C / 範囲 ${(el.bp - el.mp).toFixed(0)}°C`;
      svg.appendChild(titleEl);

      trackDiv.appendChild(svg);
      row.appendChild(trackDiv);
      container.appendChild(row);
    });
  }
  renderBars();

  document.querySelectorAll('.sort-btn').forEach((b) => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.sort-btn').forEach((x) => x.classList.remove('active'));
      b.classList.add('active');
      currentSort = b.dataset.sort;
      renderBars();
    });
  });
}

function initScatter(valid) {
  const svg = document.getElementById('scatter');
  const W = 800, H = 720;
  const ML = 70, MR = 40, MT = 40, MB = 70;
  const PW = W - ML - MR, PH = H - MT - MB;

  function sx(t) {
    return ML + tempToFrac(t) * PW;
  }
  function sy(t) {
    return MT + (1 - tempToFrac(t)) * PH;
  }

  const TICKS_B = [-273, 0, 500, 1000, 2000, 3000, 4000, 5000];
  TICKS_B.forEach((t) => {
    const vx = sx(t);
    const v = document.createElementNS(SVG_NS, 'line');
    v.setAttribute('class', 'sc-grid');
    v.setAttribute('x1', vx);
    v.setAttribute('x2', vx);
    v.setAttribute('y1', MT);
    v.setAttribute('y2', H - MB);
    svg.appendChild(v);
    const vl = document.createElementNS(SVG_NS, 'text');
    vl.setAttribute('class', 'sc-axis-label');
    vl.setAttribute('x', vx);
    vl.setAttribute('y', H - MB + 16);
    vl.setAttribute('text-anchor', 'middle');
    vl.textContent = t + '°';
    svg.appendChild(vl);

    const hy = sy(t);
    const h = document.createElementNS(SVG_NS, 'line');
    h.setAttribute('class', 'sc-grid');
    h.setAttribute('x1', ML);
    h.setAttribute('x2', W - MR);
    h.setAttribute('y1', hy);
    h.setAttribute('y2', hy);
    svg.appendChild(h);
    const hl = document.createElementNS(SVG_NS, 'text');
    hl.setAttribute('class', 'sc-axis-label');
    hl.setAttribute('x', ML - 8);
    hl.setAttribute('y', hy + 3);
    hl.setAttribute('text-anchor', 'end');
    hl.textContent = t + '°';
    svg.appendChild(hl);
  });

  // axes
  const ax = document.createElementNS(SVG_NS, 'line');
  ax.setAttribute('class', 'sc-axis');
  ax.setAttribute('x1', ML);
  ax.setAttribute('x2', W - MR);
  ax.setAttribute('y1', H - MB);
  ax.setAttribute('y2', H - MB);
  svg.appendChild(ax);
  const ay = document.createElementNS(SVG_NS, 'line');
  ay.setAttribute('class', 'sc-axis');
  ay.setAttribute('x1', ML);
  ay.setAttribute('x2', ML);
  ay.setAttribute('y1', MT);
  ay.setAttribute('y2', H - MB);
  svg.appendChild(ay);

  // axis titles
  const xt = document.createElementNS(SVG_NS, 'text');
  xt.setAttribute('class', 'sc-axis-title');
  xt.setAttribute('x', ML + PW / 2);
  xt.setAttribute('y', H - 18);
  xt.setAttribute('text-anchor', 'middle');
  xt.textContent = 'melting point — 融点 (°C)';
  svg.appendChild(xt);

  const yt = document.createElementNS(SVG_NS, 'text');
  yt.setAttribute('class', 'sc-axis-title');
  yt.setAttribute('x', 0);
  yt.setAttribute('y', 0);
  yt.setAttribute('text-anchor', 'middle');
  yt.setAttribute('transform', `translate(22, ${MT + PH / 2}) rotate(-90)`);
  yt.textContent = 'boiling point — 沸点 (°C)';
  svg.appendChild(yt);

  // diagonal mp = bp
  const diag = document.createElementNS(SVG_NS, 'line');
  diag.setAttribute('class', 'sc-diag');
  diag.setAttribute('x1', sx(-273));
  diag.setAttribute('y1', sy(-273));
  diag.setAttribute('x2', sx(5500));
  diag.setAttribute('y2', sy(5500));
  svg.appendChild(diag);
  const diagLbl = document.createElementNS(SVG_NS, 'text');
  diagLbl.setAttribute('class', 'sc-axis-label');
  diagLbl.setAttribute('fill', 'var(--gold)');
  diagLbl.setAttribute('x', sx(3800) + 8);
  diagLbl.setAttribute('y', sy(3800) - 4);
  diagLbl.textContent = 'mp = bp';
  svg.appendChild(diagLbl);

  // room-temperature crosshair (20°C)
  const rtCross = document.createElementNS(SVG_NS, 'line');
  rtCross.setAttribute('class', 'sc-rt');
  rtCross.setAttribute('x1', sx(20));
  rtCross.setAttribute('x2', sx(20));
  rtCross.setAttribute('y1', MT);
  rtCross.setAttribute('y2', H - MB);
  svg.appendChild(rtCross);
  const rtCross2 = document.createElementNS(SVG_NS, 'line');
  rtCross2.setAttribute('class', 'sc-rt');
  rtCross2.setAttribute('x1', ML);
  rtCross2.setAttribute('x2', W - MR);
  rtCross2.setAttribute('y1', sy(20));
  rtCross2.setAttribute('y2', sy(20));
  svg.appendChild(rtCross2);
  const rtT = document.createElementNS(SVG_NS, 'text');
  rtT.setAttribute('class', 'sc-rt-label');
  rtT.setAttribute('x', sx(20) + 6);
  rtT.setAttribute('y', MT + 14);
  rtT.textContent = '20°C 常温';
  svg.appendChild(rtT);

  // quadrant guides — annotations
  const annotate = (x, y, txt) => {
    const t = document.createElementNS(SVG_NS, 'text');
    t.setAttribute('class', 'sc-axis-label');
    t.setAttribute('fill', 'var(--ink-dim)');
    t.setAttribute('font-style', 'italic');
    t.setAttribute('x', x);
    t.setAttribute('y', y);
    t.setAttribute('font-size', '10');
    t.textContent = txt;
    svg.appendChild(t);
  };
  annotate(sx(-200), sy(5000), '↗ 液体範囲広い');
  annotate(sx(3000), sy(3500), '↘ 液体範囲狭い');

  // points
  valid.forEach((el) => {
    const g = document.createElementNS(SVG_NS, 'g');
    g.setAttribute('class', 'sc-group');
    g.style.setProperty('--c', catColor(el.cat));

    const cx = sx(el.mp), cy = sy(el.bp);

    const bg = document.createElementNS(SVG_NS, 'circle');
    bg.setAttribute('class', 'sc-point-bg');
    bg.setAttribute('cx', cx);
    bg.setAttribute('cy', cy);
    bg.setAttribute('r', 10);
    g.appendChild(bg);

    const tx = document.createElementNS(SVG_NS, 'text');
    tx.setAttribute('class', 'sc-point-text');
    tx.setAttribute('x', cx);
    tx.setAttribute('y', cy);
    tx.textContent = el.sym;
    g.appendChild(tx);

    const ttl = document.createElementNS(SVG_NS, 'title');
    ttl.textContent = `${el.name} (${el.jp})\nmp ${el.mp}°C / bp ${el.bp}°C\n常温: ${el.phase}`;
    g.appendChild(ttl);

    g.addEventListener('click', () => openPanel(el));
    svg.appendChild(g);
  });
}

function initHeatmap() {
  const mainGrid = document.getElementById('heat-grid');
  const lanGrid = document.getElementById('heat-lan');
  const actGrid = document.getElementById('heat-act');
  const scaleEl = document.getElementById('heat-scale');

  let mode = 'mp';

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }
  function tempColor(t, min, max) {
    if (t == null) return '#2a3340';
    const f = Math.max(0, Math.min(1, (t - min) / (max - min)));
    let r, g, b;
    if (f < 0.5) {
      const k = f / 0.5;
      r = lerp(48, 201, k);
      g = lerp(82, 169, k);
      b = lerp(122, 97, k);
    } else {
      const k = (f - 0.5) / 0.5;
      r = lerp(201, 220, k);
      g = lerp(169, 90, k);
      b = lerp(97, 70, k);
    }
    return `rgb(${r | 0}, ${g | 0}, ${b | 0})`;
  }
  function phaseColor(p) {
    return { gas: '#7aa0c4', liquid: '#c9a961', solid: '#6b8a72' }[p] || '#2a3340';
  }

  function render() {
    mainGrid.innerHTML = '';
    lanGrid.innerHTML = '';
    actGrid.innerHTML = '';

    let min, max;
    if (mode === 'mp') {
      const vals = elements.map((e) => e.mp).filter((v) => v != null);
      min = Math.min(...vals);
      max = Math.max(...vals);
    } else if (mode === 'bp') {
      const vals = elements.map((e) => e.bp).filter((v) => v != null);
      min = Math.min(...vals);
      max = Math.max(...vals);
    }

    elements.forEach((el) => {
      const cell = document.createElement('button');
      cell.className = 'heat-cell';

      let bg, valText;
      if (mode === 'phase') {
        bg = phaseColor(el.phase);
        valText = { gas: '気', liquid: '液', solid: '固' }[el.phase] || '—';
      } else {
        const v = el[mode];
        bg = tempColor(v, min, max);
        valText = v == null ? '—' : v + '°';
        if (v == null) cell.classList.add('null');
      }
      cell.style.background = bg;
      cell.style.color = 'var(--ink)';

      cell.innerHTML = `
        <div class="h-sym">${el.sym}</div>
        <div class="h-val">${valText}</div>
      `;
      cell.title = `${el.sym} ${el.name} (${el.jp}) — ${valText}`;
      cell.addEventListener('click', () => openPanel(el));

      if (el.cat === 'lanthanide') {
        cell.style.gridColumn = el.c;
        lanGrid.appendChild(cell);
      } else if (el.cat === 'actinide') {
        cell.style.gridColumn = el.c;
        actGrid.appendChild(cell);
      } else {
        cell.style.gridColumn = el.c;
        cell.style.gridRow = el.r;
        mainGrid.appendChild(cell);
      }
    });

    if (mode === 'phase') {
      scaleEl.innerHTML = `
        <span style="display:inline-flex;align-items:center;gap:6px"><span style="width:18px;height:14px;background:#6b8a72;display:inline-block"></span>固体 Solid</span>
        <span style="display:inline-flex;align-items:center;gap:6px"><span style="width:18px;height:14px;background:#c9a961;display:inline-block"></span>液体 Liquid</span>
        <span style="display:inline-flex;align-items:center;gap:6px"><span style="width:18px;height:14px;background:#7aa0c4;display:inline-block"></span>気体 Gas</span>
      `;
    } else {
      scaleEl.innerHTML = `
        <span>${min}°C</span>
        <span class="heat-gradient" style="background:linear-gradient(to right, rgb(48,82,122), rgb(201,169,97), rgb(220,90,70))"></span>
        <span>${max}°C</span>
      `;
    }
  }
  render();

  document.querySelectorAll('.heat-mode').forEach((b) => {
    b.addEventListener('click', () => {
      document.querySelectorAll('.heat-mode').forEach((x) => x.classList.remove('active'));
      b.classList.add('active');
      mode = b.dataset.mode;
      render();
    });
  });
}

export function initMaps() {
  const valid = elements.filter((el) => el.mp != null && el.bp != null);
  initTabs();
  initBars(valid);
  initScatter(valid);
  initHeatmap();
}
