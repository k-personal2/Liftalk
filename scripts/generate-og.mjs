// Generates public/og.png (1200×630) — the social share card. Run: node scripts/generate-og.mjs
import sharp from "sharp";
import config from "../astro.config.mjs";

// The badge shows the public host from astro.config.mjs `site`, so the card never advertises a stale domain.
// Re-run this script whenever `site` changes.
const host = new URL(config.site).host;
// Pill sized to the text (≈15px per bold 26px glyph) and right-aligned to the card's inner edge at x=1104.
const pillW = Math.round(host.length * 15.2 + 60);
const pillX = 1104 - pillW;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#E8E5DF"/>
  <rect x="56" y="56" width="1088" height="518" rx="28" fill="#FFFFFF" stroke="#0E0E0E" stroke-width="4"/>
  <circle cx="132" cy="146" r="16" fill="#FF5A00"/>
  <text x="164" y="160" font-family="Helvetica Neue, Arial, sans-serif" font-weight="900" font-size="40" letter-spacing="-1" fill="#0E0E0E">Liftalk</text>
  <text x="330" y="158" font-family="Helvetica Neue, Arial, sans-serif" font-weight="800" font-size="18" letter-spacing="5" fill="#8A837B">SNOW ENGLISH</text>
  <text x="112" y="318" font-family="Helvetica Neue, Arial, sans-serif" font-weight="900" font-size="88" letter-spacing="-3" fill="#0E0E0E">What do you want</text>
  <text x="112" y="414" font-family="Helvetica Neue, Arial, sans-serif" font-weight="900" font-size="88" letter-spacing="-3" fill="#0E0E0E">to say?</text>
  <rect x="112" y="466" width="96" height="8" fill="#FFD21E"/>
  <text x="112" y="526" font-family="Hiragino Sans, Hiragino Kaku Gothic ProN, sans-serif" font-weight="700" font-size="34" fill="#3A352F">スキー・スノボで使える英会話フレーズ</text>
  <rect x="${pillX}" y="96" width="${pillW}" height="64" rx="32" fill="#FF5A00" stroke="#0E0E0E" stroke-width="4"/>
  <text x="${pillX + pillW / 2}" y="140" text-anchor="middle" font-family="Helvetica Neue, Arial, sans-serif" font-weight="900" font-size="26" fill="#FFFFFF">${host}</text>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: true }).toFile("public/og.png");
console.log("public/og.png written");
