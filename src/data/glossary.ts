/* Slang & terms. `match` finds phrases that use the term, so each entry can link to real examples. */
export interface GlossaryTerm {
  id: string;
  term: string;
  ja: string;
  match?: RegExp;
}

export const GLOSSARY: GlossaryTerm[] = [
  { id: "send-it", term: "Send it!", ja: "思い切っていけ！", match: /\bsen[dt] it\b/i },
  { id: "face-shot", term: "Face shot", ja: "顔まで雪が舞い上がること", match: /face shot/i },
  { id: "pillow-line", term: "Pillow line", ja: "雪のクッション状の地形を連続して滑るライン", match: /pillow/i },
  { id: "blower-pow", term: "Blower pow", ja: "非常に軽いパウダースノー", match: /blower pow/i },
  { id: "stoked", term: "Stoked", ja: "めちゃくちゃ興奮している、最高に楽しい", match: /stoked/i },
  { id: "sick", term: "Sick", ja: "ヤバい、最高", match: /\bsick\b/i },
  { id: "sketchy", term: "Sketchy", ja: "危なっかしい、不安定", match: /sketchy/i },
  { id: "stomp-it", term: "Stomp it", ja: "トリックやジャンプを完璧に決める", match: /stomp/i },
  { id: "bail", term: "Bail", ja: "転倒する、失敗する", match: /\bbail/i },
  { id: "tracked-out", term: "Tracked out", ja: "新雪が滑られて荒れている状態", match: /tracked out/i },
  { id: "kicker", term: "Kicker", ja: "ジャンプ台、飛び出しポイント", match: /kicker/i },
  { id: "drop", term: "Drop", ja: "段差や崖から飛び降りること", match: /\bdrop/i },
  { id: "slash", term: "Slash", ja: "雪を巻き上げながらターンすること", match: /slash/i },
  { id: "hike", term: "Hike", ja: "板を担いで歩いて登ること", match: /\bhike/i },
  { id: "untracked", term: "Untracked", ja: "誰も滑っていない新雪", match: /untracked/i },
];
