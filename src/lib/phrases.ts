import { CATEGORIES, PHRASES, type Category, type Phrase } from "../data/phrases";
import { GLOSSARY, type GlossaryTerm } from "../data/glossary";

export const getCategory = (id: string): Category =>
  CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];

export const getPhrase = (id: number): Phrase | undefined =>
  PHRASES.find((p) => p.id === id);

export const phrasesIn = (catId: string): Phrase[] =>
  PHRASES.filter((p) => p.cat === catId);

export const phraseUrl = (p: Pick<Phrase, "id">) => `/phrase/${p.id}/`;
export const categoryUrl = (c: Pick<Category, "id">) => `/category/${c.id}/`;
export const searchUrl = (q: string) => `/search/?q=${encodeURIComponent(q)}`;
export const glossaryUrl = (g: Pick<GlossaryTerm, "id">) => `/glossary/#${g.id}`;

/** Phrases that use a glossary term, and the terms used in a phrase. */
export const phrasesUsing = (g: GlossaryTerm): Phrase[] =>
  g.match ? PHRASES.filter((p) => g.match!.test(p.en)) : [];
export const termsIn = (p: Phrase): GlossaryTerm[] =>
  GLOSSARY.filter((g) => g.match?.test(p.en));

/** Matches English, Japanese, category names and tags (tags also match when contained in the query). */
export function searchPhrases(q: string): Phrase[] {
  const raw = q.trim();
  if (!raw) return [];
  const s = raw.toLowerCase();
  return PHRASES.filter((p) => {
    const c = getCategory(p.cat);
    return (
      p.en.toLowerCase().includes(s) ||
      p.ja.includes(raw) ||
      c.name.toLowerCase().includes(s) ||
      c.ja.includes(raw) ||
      p.tags.some((t) => {
        const tl = t.toLowerCase();
        return tl.includes(s) || s.includes(tl);
      })
    );
  });
}

/** First N phrases form the Study deck and the home page's Featured list. */
export const STUDY_POOL = PHRASES.slice(0, 12);
export const FEATURED = PHRASES.slice(0, 6);
