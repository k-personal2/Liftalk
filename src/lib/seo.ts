/* JSON-LD builders. Only describe what is actually visible on the page. */
const SITE = "https://liftalk.dev";

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Liftalk",
  alternateName: "リフトーク",
  url: `${SITE}/`,
  inLanguage: "ja",
  description: "スキー・スノーボードで使える英会話フレーズ集",
};

/** Home is always the first crumb; pass the rest in order. */
export function breadcrumbs(items: { name: string; path: string }[]) {
  const all = [{ name: "Liftalk", path: "/" }, ...items];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE}${it.path}`,
    })),
  };
}
