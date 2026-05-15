// Detail panel rendering — DOM only. Imported by main.js.

import { categories } from './elements.js';
import {
  catColor,
  parseConfig,
  phaseJP,
  formatDiscovery,
  SHELL_NAMES,
} from './helpers.js';

const panel = document.getElementById('panel');
const panelBody = document.getElementById('panel-body');

function bohrSVG(el) {
  const shells = parseConfig(el.cfg);
  const C = 140, NUC = 18, BASE = 32, GAP = 13;
  const color = catColor(el.cat);

  let svg = `<svg class="bohr-svg" viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg">`;

  // shell rings + electrons
  shells.forEach((count, i) => {
    const r = BASE + i * GAP;
    svg += `<circle cx="${C}" cy="${C}" r="${r}" fill="none" stroke="${color}" stroke-opacity="0.22" stroke-width="0.7" stroke-dasharray="2,3"/>`;
    svg += `<g class="bohr-electrons bohr-shell-${i + 1}">`;
    for (let e = 0; e < count; e++) {
      const angle = (e / count) * Math.PI * 2 - Math.PI / 2;
      const x = C + Math.cos(angle) * r;
      const y = C + Math.sin(angle) * r;
      const dotR = count > 18 ? 1.8 : (count > 8 ? 2.2 : 2.8);
      svg += `<circle cx="${x}" cy="${y}" r="${dotR}" fill="${color}" stroke="var(--bg-0)" stroke-width="0.5"/>`;
    }
    svg += `</g>`;
  });

  // nucleus
  svg += `<circle cx="${C}" cy="${C}" r="${NUC}" fill="var(--bg-2)" stroke="${color}" stroke-width="1.5"/>`;
  svg += `<text x="${C}" y="${C + 1}" text-anchor="middle" dominant-baseline="middle" fill="var(--ink)" font-family="Fraunces, serif" font-size="15" font-weight="500">${el.sym}</text>`;
  svg += `<text x="${C}" y="${C + 12}" text-anchor="middle" dominant-baseline="middle" fill="var(--ink-dim)" font-family="JetBrains Mono" font-size="6" letter-spacing="0.1em">${el.n}p ${el.n}n</text>`;

  svg += `</svg>`;

  const counts = shells.map((c, i) =>
    `<span class="bohr-count" style="--c:${color}"><em>${SHELL_NAMES[i]}</em>${c}</span>`
  ).join('');

  return `
    <div class="bohr-wrap">${svg}</div>
    <div class="bohr-counts">${counts}</div>
  `;
}

export function openPanel(el) {
  panel.style.setProperty('--c', catColor(el.cat));
  const discYear = formatDiscovery(el.disc);
  panelBody.innerHTML = `
    <div class="p-num">ATOMIC NUMBER · <span>${String(el.n).padStart(3, '0')}</span></div>
    <div class="p-sym">${el.sym}</div>
    <div class="p-name">${el.name}</div>
    <div class="p-jp">${el.jp}</div>
    <span class="p-cat" style="background:${catColor(el.cat)}">${categories[el.cat].jp}</span>
    <dl style="margin-top:24px">
      <div class="p-row"><dt>原子量</dt><dd>${el.mass}</dd></div>
      <div class="p-row"><dt>電子配置</dt><dd>${el.cfg}</dd></div>
      <div class="p-row"><dt>常温状態</dt><dd>${phaseJP(el.phase)}</dd></div>
      <div class="p-row"><dt>融点 °C</dt><dd>${el.mp ?? '—'}</dd></div>
      <div class="p-row"><dt>沸点 °C</dt><dd>${el.bp ?? '—'}</dd></div>
      <div class="p-row"><dt>発見年</dt><dd>${discYear}</dd></div>
      <div class="p-row"><dt>発見者</dt><dd>${el.by}</dd></div>
      <div class="p-row" style="grid-template-columns:1fr"><dt style="margin-bottom:6px">用途・特徴</dt><dd style="font-family:'Noto Serif JP',serif;font-size:13px;line-height:1.7">${el.use}</dd></div>
    </dl>
    <div class="bohr-section">
      <div class="bohr-title">Bohr Model</div>
      <div class="bohr-title-jp">ボーア模型 — 電子殻配置</div>
      ${bohrSVG(el)}
    </div>
  `;
  panel.classList.add('open');
}

export function closePanel() {
  panel.classList.remove('open');
}

export function initPanel() {
  document.getElementById('close').addEventListener('click', closePanel);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePanel();
  });
}
