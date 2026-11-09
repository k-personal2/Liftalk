/* Site-wide behaviour: listen, save, back, toast. Everything else is plain HTML. */
import { FAVS_EVENT, getFavs, getShowZh, setFavs, setShowZh } from "../lib/favs";

// Apply stylesheets that were preloaded without blocking render (see Layout.astro).
document.querySelectorAll<HTMLLinkElement>("link[data-async-css]").forEach((l) => (l.rel = "stylesheet"));

// Chinese panel on phrase pages: reopen it if the visitor turned it on before.
const zhPanel = document.querySelector<HTMLDetailsElement>("details[data-zh]");
if (zhPanel) {
  zhPanel.open = getShowZh();
  zhPanel.addEventListener("toggle", () => setShowZh(zhPanel.open));
}

const toastEl = document.getElementById("toast")!;
let toastTimer: number | undefined;

export function toast(msg: string) {
  toastEl.textContent = msg;
  toastEl.classList.add("is-on");
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toastEl.classList.remove("is-on"), 1500);
}

function speak(text: string, lang = "en-US") {
  if (!("speechSynthesis" in window)) {
    toast("音声に未対応のブラウザです");
    return;
  }
  // getVoices() can be empty until the list loads; only bail out when we know the language is missing.
  const voices = speechSynthesis.getVoices();
  const base = lang.slice(0, 2);
  if (voices.length && !voices.some((v) => v.lang.toLowerCase().startsWith(base))) {
    toast(base === "zh" ? "この端末には中国語の音声がありません" : "この言語の音声がありません");
    return;
  }
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = 0.9;
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
  toast("Playing…");
}

function paintFavs() {
  const favs = getFavs();
  document.querySelectorAll<HTMLButtonElement>("[data-fav]").forEach((btn) => {
    const on = favs.includes(Number(btn.dataset.fav));
    btn.setAttribute("aria-pressed", String(on));
    btn.textContent = on ? "★" : "☆";
  });
}

function toggleFav(id: number) {
  const favs = getFavs();
  const i = favs.indexOf(id);
  if (i > -1) {
    favs.splice(i, 1);
    toast("Removed");
  } else {
    favs.push(id);
    toast("Saved");
  }
  setFavs(favs);
  paintFavs();
  document.dispatchEvent(new CustomEvent(FAVS_EVENT));
}

document.addEventListener("click", (e) => {
  const target = e.target as Element;
  let el: HTMLElement | null;
  if ((el = target.closest<HTMLElement>("[data-speak]"))) {
    speak(el.dataset.speak!, el.dataset.speakLang);
  } else if ((el = target.closest<HTMLElement>("[data-fav]"))) {
    toggleFav(Number(el.dataset.fav));
  } else if (target.closest("[data-back]")) {
    // Go back when we came from this site; otherwise follow the link to home.
    if (document.referrer.startsWith(location.origin) && history.length > 1) {
      e.preventDefault();
      history.back();
    }
  }
});

paintFavs();
