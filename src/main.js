import './style.css';
import { initTable } from './table.js';
import { initPanel } from './panel.js';
import { initTimeline } from './timeline.js';
import { initMaps } from './maps.js';

// Wire up every view. Order matters only for initTimeline, which registers a
// filter listener that initTable's applyFilter() will later invoke.
initPanel();
initTable();
initTimeline();
initMaps();
