# Periodic Table

元素周期表 SPA。

## 起動

```bash
npm install        # リポジトリルートで一度だけ
npm run dev -w periodic-table
```

`http://localhost:5183/` が自動で開きます。

## ビルド

```bash
npm run build -w periodic-table
```

## 構成

```
periodic-table/
├── index.html      # マークアップのみ
├── vite.config.js
├── package.json
└── src/
    ├── main.js     # ロジック（style.css を import）
    └── style.css   # スタイル
```
