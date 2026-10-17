/* Liftalk — vanilla SPA. Hash routing, no build step, no dependencies. */
(function () {
  "use strict";

  var PHRASES = window.PHRASES, CATEGORIES = window.CATEGORIES, CHIPS = window.QUICK_CHIPS;
  var FAV_KEY = "liftalk.favs.v1", STUDY_KEY = "liftalk.study.v1";

  var main = document.getElementById("main");
  var railNav = document.getElementById("railNav");
  var tabBar = document.getElementById("tabBar");
  var toastEl = document.getElementById("toast");

  var TABS = [
    { key: "home",      label: "Search", icon: "i-search", href: "#/" },
    { key: "study",     label: "Study",  icon: "i-study",  href: "#/study" },
    { key: "favorites", label: "Saved",  icon: "i-star",   href: "#/saved" }
  ];

  /* ---------- state ---------- */
  var state = {
    favs: read(FAV_KEY, [2, 6]),
    studyIdx: read(STUDY_KEY, 0),
    studyOpen: false,
    query: ""
  };

  function read(key, fallback) {
    try { var v = JSON.parse(localStorage.getItem(key)); return v === null ? fallback : v; }
    catch (e) { return fallback; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function icon(id, cls) {
    return '<svg class="' + (cls || "") + '" aria-hidden="true"><use href="#' + id + '"></use></svg>';
  }
  function cat(id) {
    for (var i = 0; i < CATEGORIES.length; i++) if (CATEGORIES[i].id === id) return CATEGORIES[i];
    return CATEGORIES[0];
  }
  function phrase(id) {
    for (var i = 0; i < PHRASES.length; i++) if (PHRASES[i].id === id) return PHRASES[i];
    return null;
  }
  function isFav(id) { return state.favs.indexOf(id) > -1; }

  function search(q) {
    var raw = (q || "").trim();
    if (!raw) return [];
    var s = raw.toLowerCase();
    return PHRASES.filter(function (p) {
      var c = cat(p.cat);
      return p.en.toLowerCase().indexOf(s) > -1 ||
        p.ja.indexOf(raw) > -1 ||
        c.name.toLowerCase().indexOf(s) > -1 ||
        c.ja.indexOf(raw) > -1 ||
        p.tags.some(function (t) {
          t = t.toLowerCase();
          return t.indexOf(s) > -1 || s.indexOf(t) > -1;
        });
    });
  }

  var toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("is-on"); }, 1500);
  }

  function speak(text) {
    if (!("speechSynthesis" in window)) { toast("音声に未対応のブラウザです"); return; }
    var u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.9;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
    toast("Playing…");
  }

  function toggleFav(id) {
    var i = state.favs.indexOf(id);
    if (i > -1) { state.favs.splice(i, 1); toast("Removed"); }
    else { state.favs.push(id); toast("Saved"); }
    write(FAV_KEY, state.favs);
    render();
  }

  /* ---------- partials ---------- */
  function phraseCard(p, action) {
    var c = cat(p.cat);
    var fav = isFav(p.id);
    var btn = action === "speak"
      ? '<button class="iconbtn" data-speak="' + p.id + '" aria-label="Listen: ' + esc(p.en) + '">' + icon("i-speak") + "</button>"
      : '<button class="favbtn" data-fav="' + p.id + '" aria-pressed="' + fav + '" aria-label="' + (fav ? "Remove from saved" : "Save phrase") + '">' + (fav ? "★" : "☆") + "</button>";
    return '' +
      '<div class="card" data-open="' + p.id + '" role="button" tabindex="0">' +
        '<div class="card__top">' +
          '<span class="card__en">' + esc(p.en) + "</span>" + btn +
        "</div>" +
        '<div class="card__ja">' + esc(p.ja) + "</div>" +
        '<div class="meta">' +
          '<span class="meta__cat"><span class="swatch" style="background:' + c.color + '"></span>' + esc(c.name) + "</span>" +
          '<span class="meta__level">' + esc(p.level) + "</span>" +
        "</div>" +
      "</div>";
  }

  function searchBar(value, small) {
    return '' +
      '<div class="searchbar' + (small ? " searchbar--sm" : "") + '">' +
        '<input id="q" type="search" value="' + esc(value) + '" placeholder="' +
          (small ? "検索" : "日本語またはEnglishで入力") + '" autocomplete="off" aria-label="フレーズを検索">' +
        (small
          ? '<button class="searchbar__clear" data-clear aria-label="クリア">' + icon("i-close") + "</button>"
          : '<button class="searchbar__go" data-go aria-label="検索">' + icon("i-search") + "</button>") +
      "</div>";
  }

  /* ---------- screens ---------- */
  function viewHome() {
    var today = PHRASES.slice(0, 6);
    return '' +
      '<div class="screen wrap">' +
        '<div class="eyebrow"><span class="eyebrow__dot"></span><span class="eyebrow__label">' +
          '<span class="eyebrow__name">Liftalk</span><span class="eyebrow__sub">Snow English</span></span></div>' +
        '<h1 class="h1">What do you want to say?</h1>' +
        '<p class="lede">海外の友達とリフトに乗ったとき、<br>言いたいのに出てこない一言、あるよね。<br><strong>だから、リフトークで知っておこう。</strong></p>' +
        searchBar(state.query, false) +
        '<div class="chips">' + CHIPS.map(function (c) {
          return '<button class="chip" data-chip="' + esc(c) + '">' + esc(c) + "</button>";
        }).join("") + "</div>" +
        '<div class="section-head"><h2 class="h2">Today\'s phrases</h2>' +
          '<span class="section-head__note">今日の6フレーズ</span></div>' +
        '<div class="grid">' + today.map(function (p) { return phraseCard(p, "fav"); }).join("") + "</div>" +
        '<h2 class="h2" style="margin-top:52px">Explore</h2>' +
        '<p class="sub">シーンから探す</p>' +
        '<div class="grid grid--cat">' + CATEGORIES.map(function (c) {
          var n = PHRASES.filter(function (p) { return p.cat === c.id; }).length;
          return '<button class="cattile" data-cat="' + c.id + '">' +
            '<span class="cattile__icon" data-ink="' + (c.ink === "dark" ? "dark" : "light") + '" style="background:' + c.color + '">' + icon(c.icon) + "</span>" +
            '<span class="cattile__text"><span class="cattile__name">' + esc(c.name) + "</span>" +
            '<span class="cattile__sub">' + esc(c.ja) + " · " + n + " phrases</span></span></button>";
        }).join("") + "</div>" +
      "</div>";
  }

  function viewResults(q) {
    var res = search(q);
    return '' +
      '<div class="screen wrap">' +
        '<div class="topbar"><button class="backbtn" data-back aria-label="戻る">' + icon("i-back") + "</button>" +
          searchBar(q, true) + "</div>" +
        '<div class="result-head"><span class="result-head__q">「' + esc(q) + '」</span>' +
          '<span class="result-head__n">' + res.length + " phrases</span></div>" +
        (res.length
          ? '<div class="grid">' + res.map(function (p) { return phraseCard(p, "speak"); }).join("") + "</div>"
          : '<div class="empty"><div class="empty__title">No phrase yet.</div>' +
            '<div class="empty__body">別の言い方で試してみて。<br>例：「ボックス」「powder」「膝」</div></div>') +
      "</div>";
  }

  function viewDetail(id) {
    var p = phrase(id);
    if (!p) return viewHome();
    var c = cat(p.cat);
    var fav = isFav(p.id);
    var related = PHRASES.filter(function (x) { return x.cat === p.cat && x.id !== p.id; }).slice(0, 3);
    return '' +
      '<div class="screen wrap wrap--narrow">' +
        '<button class="backbtn" data-back aria-label="戻る">' + icon("i-back") + "</button>" +
        '<div class="pill-row">' +
          '<span class="pill"><span class="swatch" style="background:' + c.color + '"></span>' + esc(c.name) + "</span>" +
          '<span class="pill pill--plain">' + esc(p.level) + "</span>" +
        "</div>" +
        '<h1 class="detail__en">' + esc(p.en) + "</h1>" +
        '<p class="detail__ja">' + esc(p.ja) + "</p>" +
        '<div class="actions">' +
          '<button class="btn-primary" data-speak="' + p.id + '">' + icon("i-speak") + " Listen</button>" +
          '<button class="btn-fav" data-fav="' + p.id + '" aria-pressed="' + fav + '" aria-label="' +
            (fav ? "Remove from saved" : "Save phrase") + '">' + (fav ? "★" : "☆") + "</button>" +
        "</div>" +
        '<div class="note"><div class="note__label">When to use</div>' +
          '<div class="note__body">' + esc(p.note) + "</div></div>" +
        (related.length
          ? '<h3 class="h3">Also useful</h3><div class="list">' + related.map(function (r) {
              return '<button class="row" data-open="' + r.id + '">' +
                '<span class="row__text"><span class="row__en">' + esc(r.en) + "</span>" +
                '<span class="row__ja">' + esc(r.ja) + "</span></span>" + icon("i-chevron") + "</button>";
            }).join("") + "</div>"
          : "") +
      "</div>";
  }

  function viewCategory(id) {
    var c = cat(id);
    var list = PHRASES.filter(function (p) { return p.cat === c.id; });
    var ink = c.ink === "dark" ? "#0E0E0E" : "#FFFFFF";
    return '' +
      '<div class="screen wrap">' +
        '<button class="backbtn" data-back aria-label="戻る">' + icon("i-back") + "</button>" +
        '<div class="banner" style="background:' + c.color + ";color:" + ink + '">' +
          '<div class="banner__name">' + esc(c.name) + "</div>" +
          '<div class="banner__ja">' + esc(c.ja) + "</div></div>" +
        '<div class="list">' + list.map(function (p) {
          return '<div class="row row--lg" data-open="' + p.id + '" role="button" tabindex="0">' +
            '<span class="row__text"><span class="row__en">' + esc(p.en) + "</span>" +
            '<span class="row__ja">' + esc(p.ja) + "</span></span>" +
            '<button class="iconbtn iconbtn--lg" data-speak="' + p.id + '" aria-label="Listen">' + icon("i-speak") + "</button></div>";
        }).join("") + "</div>" +
      "</div>";
  }

  function viewStudy() {
    var pool = PHRASES.slice(0, 12);
    var i = state.studyIdx % pool.length;
    var p = pool[i];
    return '' +
      '<div class="screen wrap wrap--card">' +
        '<div class="study-head"><h2 class="h2">Study</h2>' +
          '<span class="study-progress">' + (i + 1) + " / " + pool.length + "</span></div>" +
        '<p class="sub">リフトの上で1〜2枚めくるだけ。</p>' +
        '<div class="flash">' +
          '<div class="flash__ja">' + esc(p.ja) + "</div>" +
          (state.studyOpen
            ? '<div class="flash__answer"><div class="flash__rule"></div>' +
              '<div class="flash__en">' + esc(p.en) + "</div>" +
              '<button class="btn-listen" data-speak="' + p.id + '">' + icon("i-speak") + " Listen</button></div>"
            : "") +
        "</div>" +
        '<div class="study-foot">' +
          (state.studyOpen
            ? '<button class="btn-primary btn-primary--dark btn-primary--block" data-study-next>Next →</button>'
            : '<button class="btn-primary btn-primary--block" data-study-reveal>Show answer</button>') +
        "</div>" +
      "</div>";
  }

  function viewSaved() {
    var list = state.favs.map(phrase).filter(Boolean);
    return '' +
      '<div class="screen wrap">' +
        '<h2 class="h2">Saved</h2>' +
        '<p class="sub">よく使うフレーズ</p>' +
        (list.length
          ? '<div class="grid">' + list.map(function (p) { return phraseCard(p, "fav"); }).join("") + "</div>"
          : '<div class="empty"><div class="empty__glyph">☆</div>' +
            '<div class="empty__title">Nothing saved yet.</div>' +
            '<div class="empty__body">カードの☆でいつでも保存できます。</div></div>') +
      "</div>";
  }

  /* ---------- routing ---------- */
  function route() {
    var h = (location.hash || "#/").replace(/^#/, "");
    var parts = h.split("/").filter(Boolean); // ["search","powder"] etc.
    if (!parts.length) return { name: "home" };
    if (parts[0] === "search") return { name: "results", q: decodeURIComponent(parts[1] || "") };
    if (parts[0] === "phrase") return { name: "detail", id: parseInt(parts[1], 10) };
    if (parts[0] === "category") return { name: "category", id: parts[1] };
    if (parts[0] === "study") return { name: "study" };
    if (parts[0] === "saved") return { name: "favorites" };
    return { name: "home" };
  }

  function activeTab(r) {
    if (r.name === "study") return "study";
    if (r.name === "favorites") return "favorites";
    return "home";
  }

  function renderNav(active) {
    railNav.innerHTML = TABS.map(function (t) {
      return '<a class="navbtn" href="' + t.href + '"' +
        (t.key === active ? ' aria-current="page"' : "") + ">" + icon(t.icon) + "<span>" + t.label + "</span></a>";
    }).join("");
    tabBar.innerHTML = TABS.map(function (t) {
      return '<a class="tabbtn" href="' + t.href + '"' +
        (t.key === active ? ' aria-current="page"' : "") + ">" + icon(t.icon) + "<span>" + t.label + "</span></a>";
    }).join("");
  }

  function render() {
    var r = route();
    if (r.name === "results") state.query = r.q;
    var html;
    switch (r.name) {
      case "results":   html = viewResults(r.q); break;
      case "detail":    html = viewDetail(r.id); break;
      case "category":  html = viewCategory(r.id); break;
      case "study":     html = viewStudy(); break;
      case "favorites": html = viewSaved(); break;
      default:          html = viewHome();
    }
    main.innerHTML = html;
    renderNav(activeTab(r));
  }

  function goSearch(q) {
    var v = (q || "").trim();
    location.hash = v ? "#/search/" + encodeURIComponent(v) : "#/";
  }

  /* ---------- events (delegated) ---------- */
  main.addEventListener("click", function (e) {
    var el;
    if ((el = e.target.closest("[data-speak]"))) {
      e.stopPropagation();
      var sp = phrase(parseInt(el.getAttribute("data-speak"), 10));
      if (sp) speak(sp.en);
      return;
    }
    if ((el = e.target.closest("[data-fav]"))) {
      e.stopPropagation();
      toggleFav(parseInt(el.getAttribute("data-fav"), 10));
      return;
    }
    if ((el = e.target.closest("[data-open]"))) {
      location.hash = "#/phrase/" + el.getAttribute("data-open");
      return;
    }
    if ((el = e.target.closest("[data-cat]"))) {
      location.hash = "#/category/" + el.getAttribute("data-cat");
      return;
    }
    if ((el = e.target.closest("[data-chip]"))) {
      goSearch(el.getAttribute("data-chip"));
      return;
    }
    if (e.target.closest("[data-go]")) {
      goSearch(document.getElementById("q").value);
      return;
    }
    if (e.target.closest("[data-clear]")) {
      state.query = "";
      location.hash = "#/";
      return;
    }
    if (e.target.closest("[data-back]")) {
      if (history.length > 1) history.back(); else location.hash = "#/";
      return;
    }
    if (e.target.closest("[data-study-reveal]")) {
      state.studyOpen = true;
      render();
      return;
    }
    if (e.target.closest("[data-study-next]")) {
      state.studyIdx = state.studyIdx + 1;
      state.studyOpen = false;
      write(STUDY_KEY, state.studyIdx);
      render();
    }
  });

  // Enter to search; live filtering as you type
  var typeTimer;
  main.addEventListener("input", function (e) {
    if (e.target.id !== "q") return;
    var v = e.target.value;
    state.query = v;
    clearTimeout(typeTimer);
    typeTimer = setTimeout(function () {
      var sel = document.activeElement === e.target ? e.target.selectionStart : null;
      location.replace("#" + (v.trim() ? "/search/" + encodeURIComponent(v.trim()) : "/"));
      var q = document.getElementById("q");
      if (q && sel !== null) { q.focus(); try { q.setSelectionRange(sel, sel); } catch (err) {} }
    }, 180);
  });
  main.addEventListener("keydown", function (e) {
    if (e.target.id === "q" && e.key === "Enter") { e.preventDefault(); goSearch(e.target.value); }
    if (e.key === "Enter" && e.target.hasAttribute && e.target.hasAttribute("data-open") && e.target.getAttribute("role") === "button") {
      location.hash = "#/phrase/" + e.target.getAttribute("data-open");
    }
  });

  window.addEventListener("hashchange", function () {
    render();
    window.scrollTo(0, 0);
  });

  render();
})();
