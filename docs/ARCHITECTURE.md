# periodic-table — アーキテクチャ

118 元素の周期表 + 詳細パネル + 発見年表 / マップ表示の SPA。Vite 6 / vanilla JS（DOM・SVG 描画）。
`index.html`（シェル）→ `src/main.js`（`./style.css` を import）。

## モジュール構成（`src/`）

| ファイル | 役割 | 主な export |
| --- | --- | --- |
| `elements.js` | **純粋データ** | `elements`（118 元素配列）`categories` |
| `helpers.js` | **純粋**な派生関数 | `catColor` `searchKey` `phaseJP` `formatDiscovery` `isFBlock` `gridPosition` `categoryInfo` `parseConfig` `SHELL_NAMES` |
| `panel.js` | 詳細パネル + ボーア模型 SVG（DOM） | `openPanel` `closePanel` `initPanel` |
| `table.js` | 周期表グリッド・検索フィルタ（DOM） | `initTable` `applyFilter` `onFilterChange` |
| `timeline.js` | 発見年表 SVG（DOM） | `initTimeline` |
| `maps.js` | 温度バー / 散布図 / ヒートマップ（DOM） | `initMaps` |
| `main.js` | 薄いエントリ（4 つの `init*` を呼ぶ） | — |

## テスト

- `elements.test.js`(8) — データ整合性（118 件・原子番号 1..118 連番一意・必須フィールド・ランタノイド/アクチノイド各 15）。
- `helpers.test.js`(20) — グリッド写像・分類・電子配置パース。計 28 件。

## 注意点

- 純粋モジュールは `elements.js` と `helpers.js` のみ。他は import 時に DOM を操作する描画モジュール。
- フィルタ連動はリスナー登録方式（`table.js` の `onFilterChange` に `timeline` 等が登録）。

## コマンド

`npm install`（初回）/ `npm run dev` / `npm test` / `npm run build` / `npm run format`
