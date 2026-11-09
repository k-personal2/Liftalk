# Liftalk（リフトーク）

海外の友達とリフトに乗ったとき、言いたいのに出てこない一言。だから、リフトークで知っておこう。

https://liftalk.pages.dev

## 開発

```sh
npm install
npm run dev      # http://localhost:4321
npm run check    # 型チェック
npm run build    # dist/ に静的出力
npm run preview  # Cloudflare と同じランタイムでローカル確認
npm run deploy   # Cloudflare にデプロイ（要 `npx wrangler login`）
```

## 構成

| パス | 役割 |
| --- | --- |
| `src/data/phrases.ts` | フレーズ・カテゴリー・クイックチップ（**コンテンツはここだけ編集**） |
| `src/lib/phrases.ts` | 検索・URL・Study/Today の対象範囲 |
| `src/lib/favs.ts` | localStorage（`liftalk.favs.v1` / `liftalk.study.v1`、プロトタイプと互換） |
| `src/layouts/Layout.astro` | PCサイドバー / SP下タブ / meta / フォント |
| `src/components/` | PhraseCard, CategoryTile, SearchBar, Nav, Icon など |
| `src/pages/` | `/`, `/phrase/[id]/`, `/category/[id]/`, `/search/?q=`, `/study/`, `/saved/` |
| `src/scripts/app.ts` | 全ページ共通 JS（読み上げ・保存・戻る・トースト） |
| `src/styles/global.css` | デザイントークン（`:root`）＋全スタイル。860px以下でSPレイアウト |
| `build/` | 元のバニラJSプロトタイプ（参照用） |

- フレーズ詳細・カテゴリは**ビルド時に静的生成**（SEO対象）。検索・Saved・Study はページ内の小さな `<script>` が `hidden` を切り替えるだけ。
- フォント：Archivo は Astro Fonts API でセルフホスト＋preload。Zen Kaku Gothic New は `@fontsource` を非同期読み込み（描画をブロックしない）。
- フレーズを追加したら `npm run build` するだけで詳細ページ・サイトマップも増えます。
- SNS共有画像 `public/og.png` は `node scripts/generate-og.mjs` で再生成できます。
- JSON-LD は `src/lib/seo.ts`（トップ：WebSite、カテゴリ・フレーズ：BreadcrumbList）。

## デプロイ（Cloudflare Pages・無料枠）

設定は `wrangler.jsonc`（`pages_build_output_dir`）。静的出力のみなので Functions は使わず、配信は無料・無制限です。

GitHub 連携で `main` への push ごとに本番デプロイ、他ブランチはプレビュー URL が作られます。

- Cloudflare ダッシュボード → Workers & Pages → Create → Pages → Import an existing Git repository
- Framework preset: Astro / Build command: `npm run build` / Build output directory: `dist`
- Node.js は `.node-version` で指定（Astro 7 は 22.22 以上が必要）
- `/_astro/*` の長期キャッシュは `public/_headers`

公開 URL を変えるとき（独自ドメイン取得時など）は `astro.config.mjs` の `site` だけを書き換えます。canonical・OGP・JSON-LD・sitemap・robots.txt はすべてそこから生成されます。
