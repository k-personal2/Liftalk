# Liftalk（リフトーク）

海外の友達とリフトに乗ったとき、言いたいのに出てこない一言。だから、リフトークで知っておこう。

https://liftalk.dev

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

## デプロイ（Cloudflare Workers / 静的アセット・無料枠）

設定は `wrangler.jsonc`。Worker スクリプトなしの静的アセット配信なので、リクエストは無料・無制限です。

1. `liftalk.dev` を Cloudflare のアカウントに追加（Cloudflare Registrar で取得するか、他社で取得したドメインのネームサーバーを Cloudflare に向ける）
2. `npx wrangler login`
3. `npm run deploy` → `routes` の `custom_domain` により DNS と証明書が自動設定されます

GitHub 連携で push ごとに自動デプロイしたい場合は、Cloudflare ダッシュボード → Workers & Pages → Create → Import a repository で、Build command `npm run build`、Deploy command `npx wrangler deploy` を指定します。
