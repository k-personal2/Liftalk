# Liftalk（リフトーク）

海外の友達とリフトに乗ったとき、言いたいのに出てこない一言。だから、リフトークで知っておこう。

## 構成
- index.html — シェル（PCサイドバー / SP下タブ）＋SVGアイコンスプライト
- styles.css — デザイントークン（:root CSS変数）＋全スタイル。860px以下でSPレイアウト
- data.js — フレーズ・カテゴリー・クイックチップ（コンテンツはここだけ編集）
- app.js — ハッシュルーティング / 検索 / 読み上げ / 保存

## 技術
- HTML / CSS / Vanilla JS（ES5互換、依存ゼロ、ビルド不要）
- フォント：Google Fonts（Archivo / Zen Kaku Gothic New）
- 読み上げ：Web Speech API（speechSynthesis, en-US）
- 保存：localStorage（liftalk.favs.v1 / liftalk.study.v1）
- ルート：#/ , #/search/:q , #/phrase/:id , #/category/:id , #/study , #/saved

## Astro化メモ
- index.html の <aside>/<nav> → Layout.astro、各 view 関数 → pages/*.astro
- data.js → src/data/phrases.ts（そのまま export）
- ハッシュルート → ファイルルーティング（/search, /phrase/[id], /category/[id], /study, /saved）
- お気に入り・Study・読み上げは client-side の小さな island（<script> か client:load）で十分
- styles.css はグローバルCSSとしてそのまま読み込み可
