/* Study: IELTS vocabulary (flashcards, quiz, saved words, use it with Claude) and Writing guides with practice.
   Content is in study-data.js. Progress is kept in this browser and in the results file on this Mac
   (data/users/me/study/progress/state), and the two are merged on every visit, so neither copy can wipe the other. */
(function () {
'use strict';
const H = () => window.IELTS_STUDY_BRIDGE || {};
const byId = id => document.getElementById(id);
const esc = t => String(t == null ? "" : t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
const TAGS = { B: ["Speaking + Writing", "b"], W: ["Writing", "w"], S: ["Speaking only", "s"], X: ["Avoid", "x"] };

/* ---------- words ---------- */
const WORDS = [];
STUDY_VOCAB.forEach(f => f.groups.forEach(g => g.words.forEach(w => WORDS.push({
  key: f.id + "|" + w[0], w: w[0], note: w[1], ex: w[2], tag: w[3], fam: f, group: g.label }))));
const byKey = k => WORDS.find(x => x.key === k);
const TOPICS = [];
STUDY_VOCAB.forEach(f => { if (TOPICS.indexOf(f.topic) < 0) TOPICS.push(f.topic); });

/* ---------- progress: this browser + the results file, merged ---------- */
const LS = "st.state";
function blank() { return { known: {}, saved: {}, hist: [] }; }
function loadLocal() { try { return Object.assign(blank(), JSON.parse(localStorage.getItem(LS) || "{}")); } catch (e) { return blank(); } }
let ST = loadLocal(), DOC = null, SYNC = "Saved in this browser";
// saved[key] = +time when saved, -time when removed; the later action wins when two copies meet
function merge(a, b) {
  const out = blank();
  [a.known, b.known].forEach(k => { for (const w in k || {}) out.known[w] = Math.max(out.known[w] || 0, k[w]); });
  [a.saved, b.saved].forEach(k => { for (const w in k || {}) if (!(w in out.saved) || Math.abs(k[w]) > Math.abs(out.saved[w])) out.saved[w] = k[w]; });
  const seen = {};
  (a.hist || []).concat(b.hist || []).forEach(h => { if (h && h.id && !seen[h.id]) { seen[h.id] = 1; out.hist.push(h); } });
  out.hist.sort((x, y) => x.at - y.at); out.hist = out.hist.slice(-300);
  return out;
}
function save() {
  try { localStorage.setItem(LS, JSON.stringify(ST)); } catch (e) {}
  if (!DOC) { paintSync(); return; }
  DOC.set(JSON.parse(JSON.stringify(ST))).then(() => { SYNC = "✓ Saved on this Mac"; paintSync(); },
    () => { SYNC = "Saved in this browser only (couldn't reach the results file)"; paintSync(); });
}
function paintSync() { const s = byId("stSync"); if (s) s.textContent = SYNC; }
function connect() {
  const c = window.claude; if (!c || !c.use) return Promise.resolve();
  return c.use("db").then(db => {
    if (!db) return;
    const d = db.doc("data/users/me/study/progress/state");
    return d.get().then(snap => {
      const remote = snap && snap.exists ? snap.data() : null;
      ST = merge(ST, remote || blank()); DOC = d; save();
    });
  }).catch(() => {});
}
const savedKeys = () => Object.keys(ST.saved).filter(k => ST.saved[k] > 0 && byKey(k)).sort((a, b) => ST.saved[b] - ST.saved[a]);
const isSaved = k => (ST.saved[k] || 0) > 0;
function toggleSave(k) { ST.saved[k] = isSaved(k) ? -Date.now() : Date.now(); save(); }
const mastered = list => list.filter(w => ST.known[w.key] === 2).length;
function mark(k, v) { ST.known[k] = v; save(); }
function addHist(h) { h.id = "h" + Date.now() + Math.random().toString(36).slice(2, 5); h.at = Date.now(); ST.hist.push(h); save(); }

/* ---------- screen ---------- */
function screen(title, sub, html) {
  if (H().stopTimer) H().stopTimer();
  const st = byId("stage"), ins = byId("instr"), bb = byId("botbar");
  if (bb) bb.style.display = "none";
  if (ins) ins.innerHTML = "<h2>" + title + "</h2><p>" + sub + ' · <span id="stSync">' + esc(SYNC) + "</span></p>";
  const d = document.createElement("div");
  d.className = "sheet stdy";
  d.innerHTML = html;
  st.innerHTML = ""; st.appendChild(d); d.scrollTop = 0;
  d.addEventListener("click", common);
  return d;
}
const nav = (extra) => '<div class="st-nav"><button type="button" class="ghost" data-go="home">← Study home</button>' + (extra || "") +
  '<button type="button" class="ghost" data-go="menu">Back to menu</button></div>';
function common(e) {
  const g = e.target.closest("[data-go]");
  if (g) { const v = g.dataset.go; if (v === "menu") { H().home && H().home(); return; } if (ROUTES[v]) ROUTES[v](g.dataset.arg); return; }
  const s = e.target.closest("[data-star]");
  if (s) { toggleSave(s.dataset.star); const on = isSaved(s.dataset.star); document.querySelectorAll('[data-star="' + CSS.escape(s.dataset.star) + '"]').forEach(b => { b.classList.toggle("on", on); b.textContent = on ? "★ Saved" : "☆ Save"; b.title = on ? "Remove from my saved words" : "Save for recap"; }); const c = byId("stSavedN"); if (c) c.textContent = savedKeys().length; return; }
  const sp = e.target.closest("[data-say]");
  if (sp) say(sp.dataset.say);
}
function say(t) {
  if (!("speechSynthesis" in window)) return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(t); u.lang = "en-GB"; u.rate = 0.9;
  const v = speechSynthesis.getVoices().find(x => /en-GB/.test(x.lang)) || speechSynthesis.getVoices().find(x => /^en/.test(x.lang));
  if (v) u.voice = v;
  speechSynthesis.speak(u);
}
const star = w => '<button type="button" class="st-star' + (isSaved(w.key) ? " on" : "") + '" data-star="' + esc(w.key) + '" title="' + (isSaved(w.key) ? "Remove from my saved words" : "Save for recap") + '">' + (isSaved(w.key) ? "★ Saved" : "☆ Save") + "</button>";
const tag = t => '<span class="st-tag st-' + TAGS[t][1] + '">' + TAGS[t][0] + "</span>";
const hl = (ex, w) => { const i = ex.toLowerCase().indexOf(w.toLowerCase()); return i < 0 ? esc(ex) : esc(ex.slice(0, i)) + "<b>" + esc(ex.slice(i, i + w.length)) + "</b>" + esc(ex.slice(i + w.length)); };
function wordRow(w, showFam) {
  const k = ST.known[w.key];
  return '<div class="st-word"><div class="st-wh"><button type="button" class="st-say" data-say="' + esc(w.w) + '" title="Listen">🔊</button><b>' + esc(w.w) + "</b>" + tag(w.tag) +
    (k === 2 ? '<span class="st-k ok">mastered</span>' : k === 1 ? '<span class="st-k">learning</span>' : "") +
    (showFam ? '<span class="st-fam">' + esc(w.fam.head) + "</span>" : "") + star(w) + "</div>" +
    '<p class="st-note">' + esc(w.note) + '</p><p class="st-ex">' + hl(w.ex, w.w) + "</p></div>";
}

/* ---------- home ---------- */
function home() {
  const sv = savedKeys().length, total = WORDS.length, m = mastered(WORDS);
  const last = ST.hist.filter(h => h.kind === "quiz").slice(-1)[0];
  const d = screen("Study", "Vocabulary and Writing",
    '<p class="eyebrow">Study</p><h1>Vocabulary and Writing</h1>' +
    '<div class="tiles"><div class="tile"><span class="lab">Words mastered</span><span class="v">' + m + '<span style="font-size:1rem;color:var(--ink-3)"> / ' + total + '</span></span><span class="s">"Knew it" in flashcards or right in a quiz</span></div>' +
    '<div class="tile"><span class="lab">My saved words</span><span class="v" id="stSavedN">' + sv + '</span><span class="s">Marked ☆ for recap</span></div>' +
    '<div class="tile"><span class="lab">Last quiz</span><span class="v">' + (last ? last.score + "/" + last.n : "–") + '</span><span class="s">' + (last ? esc(last.title) : "Take one below") + "</span></div></div>" +
    '<div class="cards"><button type="button" class="card" data-go="saved"><b>⭐ My saved words</b><span>Every word you marked, with flashcards and a quiz for a quick recap.</span><span class="meta">' + sv + " saved</span></button>" +
    '<button type="button" class="card" data-go="mixquiz"><b>Mixed quiz</b><span>10 questions from all the words. Wrong answers can go straight into your saved words.</span><span class="meta">About 5 minutes</span></button>' +
    '<button type="button" class="card" data-go="trends"><b>📈 Trend charts</b><span>20 graphs to describe, one for each trend phrase, each with a Band 9 model answer.</span><span class="meta">Task 1 · works offline</span></button>' +
    '<button type="button" class="card" data-go="t1"><b>Task 1 guide</b><span>Structure, the overview, every chart type, a Band 9 model and a checklist.</span><span class="meta">Writing</span></button>' +
    '<button type="button" class="card" data-go="t2"><b>Task 2 guide</b><span>Five essay types, paragraph plan, linkers, Band 9 grammar and a model essay.</span><span class="meta">Writing</span></button>' +
    '<button type="button" class="card" data-go="practice"><b>Writing practice</b><span>Write an overview, a data sentence, an introduction or a body paragraph. Claude checks it.</span><span class="meta">With Claude</span></button>' +
    '<button type="button" class="card" data-go="rules"><b>Grammar of trends</b><span>to vs by, a rise in, the number of, tenses: the small rules that cost Task 1 marks.</span><span class="meta">Task 1</span></button></div>' +
    '<p class="st-legend">' + tag("B") + " fine in both " + tag("W") + " best in essays " + tag("S") + " too informal for essays " + tag("X") + " know it, but avoid it</p>" +
    TOPICS.map(t => "<h2>" + esc(t) + '</h2><div class="cards st-fams">' + STUDY_VOCAB.filter(f => f.topic === t).map(f => {
      const ws = WORDS.filter(w => w.fam === f);
      return '<button type="button" class="card" data-go="fam" data-arg="' + f.id + '"><b>' + esc(f.head) + "</b><span>" + esc(ws.slice(0, 5).map(w => w.w).join(", ")) + "…</span>" +
        '<span class="meta">' + mastered(ws) + " / " + ws.length + " mastered</span></button>";
    }).join("") + "</div>").join("") + nav());
  return d;
}

/* ---------- one word family ---------- */
function fam(id) {
  const f = STUDY_VOCAB.find(x => x.id === id); if (!f) return home();
  const ws = WORDS.filter(w => w.fam === f);
  screen("Study · " + esc(f.head), f.topic + " · " + ws.length + " words",
    '<p class="eyebrow">' + esc(f.topic) + "</p><h1>Instead of “" + esc(f.head) + "”</h1>" +
    '<div class="btnrow"><button type="button" data-go="cards" data-arg="fam:' + f.id + '">Flashcards</button><button type="button" data-go="quiz" data-arg="fam:' + f.id + '">Quiz</button><button type="button" class="ghost" data-go="use" data-arg="fam:' + f.id + '">Use a word with Claude</button></div>' +
    f.groups.map(g => "<h2>" + esc(g.label) + "</h2>" + WORDS.filter(w => w.fam === f && w.group === g.label).map(w => wordRow(w)).join("")).join("") + nav());
}

/* ---------- saved words ---------- */
function saved() {
  const ks = savedKeys();
  screen("Study · My saved words", ks.length + " words",
    '<p class="eyebrow">Recap</p><h1>My saved words</h1>' +
    (ks.length ? '<p>Newest first. Tap ★ Saved to remove a word once you know it.</p><div class="btnrow"><button type="button" data-go="cards" data-arg="saved">Flashcards</button><button type="button" data-go="quiz" data-arg="saved">Quiz</button><button type="button" class="ghost" data-go="use" data-arg="saved">Use a word with Claude</button></div>' +
      ks.map(k => wordRow(byKey(k), true)).join("")
      : '<div class="notice"><b>Nothing saved yet</b>Press ☆ Save next to any word, in a word list, a flashcard or a quiz answer, and it collects here for your recap.</div>') + nav());
}

function listFor(arg) {
  if (arg === "saved") return savedKeys().map(byKey);
  if (arg === "chart") return WORDS.filter(w => w.fam.pos === "chart");
  if (arg && arg.indexOf("fam:") === 0) { const f = STUDY_VOCAB.find(x => x.id === arg.slice(4)); return WORDS.filter(w => w.fam === f); }
  return WORDS.slice();
}
const titleFor = arg => arg === "saved" ? "My saved words" : arg === "chart" ? "Chart language" : arg && arg.indexOf("fam:") === 0 ? "Instead of “" + (STUDY_VOCAB.find(x => x.id === arg.slice(4)) || {}).head + "”" : "All words";
const shuffle = a => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

/* ---------- flashcards ---------- */
function cards(arg) {
  // words you don't know yet come first
  const list = shuffle(listFor(arg)).sort((a, b) => (ST.known[a.key] === 2) - (ST.known[b.key] === 2));
  if (!list.length) return saved();
  let i = 0, knew = 0;
  const d = screen("Study · Flashcards", titleFor(arg), '<p class="eyebrow">Flashcards · ' + esc(titleFor(arg)) + '</p><div id="stCard"></div>' + nav('<button type="button" class="ghost" data-go="' + (arg === "saved" ? "saved" : "fam") + '" data-arg="' + esc((arg || "").replace("fam:", "")) + '">Word list</button>'));
  const host = d.querySelector("#stCard");
  function show() {
    if (i >= list.length) {
      host.innerHTML = '<div class="st-done"><h2>Done: ' + knew + " of " + list.length + " known</h2><p>Words you marked “Still learning” come first next time.</p>" +
        '<div class="btnrow"><button type="button" data-go="cards" data-arg="' + esc(arg || "") + '">Again</button><button type="button" class="ghost" data-go="quiz" data-arg="' + esc(arg || "") + '">Take the quiz</button></div></div>';
      addHist({ kind: "cards", title: titleFor(arg), score: knew, n: list.length }); return;
    }
    const w = list[i];
    host.innerHTML = '<div class="st-flash"><span class="st-count">' + (i + 1) + " / " + list.length + "</span>" +
      '<div class="st-front"><button type="button" class="st-say" data-say="' + esc(w.w) + '">🔊</button><b>' + esc(w.w) + "</b>" + tag(w.tag) + '<span class="st-fam">instead of “' + esc(w.fam.head) + "”</span></div>" +
      '<p class="st-hint">Say a sentence with it out loud, then turn the card.</p>' +
      '<div class="st-back" hidden><p class="st-note">' + esc(w.note) + '</p><p class="st-ex">' + hl(w.ex, w.w) + "</p></div>" +
      '<div class="btnrow"><button type="button" class="st-turn">Turn the card</button></div>' +
      '<div class="btnrow st-rate" hidden><button type="button" data-r="2">✓ Knew it</button><button type="button" class="ghost" data-r="1">Still learning</button>' + star(w) + "</div></div>";
    host.querySelector(".st-turn").onclick = () => { host.querySelector(".st-back").hidden = false; host.querySelector(".st-rate").hidden = false; host.querySelector(".st-turn").parentNode.hidden = true; };
    host.querySelectorAll("[data-r]").forEach(b => b.onclick = () => { const r = +b.dataset.r; if (r === 2) knew++; mark(w.key, r); i++; show(); });
  }
  show();
}

/* ---------- quiz: choose the word that fits ---------- */
function blankOut(ex, w) { const i = ex.toLowerCase().indexOf(w.toLowerCase()); return esc(ex.slice(0, i)) + '<span class="st-blank">______</span>' + esc(ex.slice(i + w.length)); }
function quiz(arg) {
  const pool = listFor(arg);
  if (!pool.length) return saved();
  const qs = shuffle(pool.slice()).slice(0, Math.min(10, pool.length)).map(w => {
    // wrong options: same part of speech, different meaning (another word family)
    const others = shuffle(WORDS.filter(x => x.fam.pos === w.fam.pos && x.fam !== w.fam && x.tag !== "X"));
    const opts = [w];
    for (const o of others) { if (opts.length >= 4) break; if (!opts.some(p => p.w.toLowerCase() === o.w.toLowerCase())) opts.push(o); }
    return { w, opts: shuffle(opts) };
  });
  let i = 0, score = 0;
  const wrong = [];
  const d = screen("Study · Quiz", titleFor(arg), '<p class="eyebrow">Quiz · ' + esc(titleFor(arg)) + '</p><div id="stQ"></div>' + nav());
  const host = d.querySelector("#stQ");
  function show() {
    if (i >= qs.length) {
      addHist({ kind: "quiz", title: titleFor(arg), score, n: qs.length });
      host.innerHTML = '<div class="st-done"><h2>' + score + " / " + qs.length + "</h2>" +
        (wrong.length ? "<p>Words to review:</p>" + wrong.map(w => wordRow(w, true)).join("") +
          '<div class="btnrow"><button type="button" class="st-saveall">☆ Save all ' + wrong.length + " to my saved words</button></div>" : "<p>Perfect score.</p>") +
        '<div class="btnrow"><button type="button" data-go="quiz" data-arg="' + esc(arg || "") + '">New quiz</button><button type="button" class="ghost" data-go="saved">My saved words</button></div></div>';
      const sa = host.querySelector(".st-saveall");
      if (sa) sa.onclick = () => { wrong.forEach(w => { if (!isSaved(w.key)) ST.saved[w.key] = Date.now(); }); save(); sa.textContent = "★ Saved"; sa.disabled = true;
        host.querySelectorAll("[data-star]").forEach(b => { b.classList.add("on"); b.textContent = "★ Saved"; }); };
      return;
    }
    const q = qs[i];
    host.innerHTML = '<div class="st-flash"><span class="st-count">' + (i + 1) + " / " + qs.length + " · score " + score + "</span>" +
      '<p class="st-qs">' + blankOut(q.w.ex, q.w.w) + "</p>" +
      '<div class="st-opts">' + q.opts.map((o, k) => '<button type="button" data-o="' + k + '">' + esc(o.w) + "</button>").join("") + "</div>" +
      '<div class="st-why" hidden></div></div>';
    host.querySelectorAll("[data-o]").forEach(b => b.onclick = () => {
      const o = q.opts[+b.dataset.o], ok = o === q.w;
      host.querySelectorAll("[data-o]").forEach(x => { x.disabled = true; if (q.opts[+x.dataset.o] === q.w) x.classList.add("ok"); });
      if (!ok) b.classList.add("no");
      if (ok) { score++; mark(q.w.key, 2); } else { wrong.push(q.w); mark(q.w.key, 1); }
      const why = host.querySelector(".st-why");
      why.hidden = false;
      why.innerHTML = "<p><b>" + esc(q.w.w) + "</b> " + tag(q.w.tag) + " " + esc(q.w.note) + "</p>" + (ok ? "" : "<p class=\"st-note\">" + esc(o.w) + ": " + esc(o.note) + "</p>") +
        '<div class="btnrow">' + star(q.w) + '<button type="button" class="st-next">' + (i + 1 < qs.length ? "Next" : "See my score") + "</button></div>";
      why.querySelector(".st-next").onclick = () => { i++; show(); };
    });
  }
  show();
}

/* ---------- use a word: Claude checks the sentence ---------- */
function sampler() { const c = window.claude; return c && c.use ? c.use("sample").catch(() => null) : Promise.resolve(null); }
function errText(e) {
  const c = e && e.code;
  return c === "offline" ? "You're offline. Claude checks need the internet; your text is still here." :
    c === "usage_limit" ? "Claude's usage limit on this Mac is used up for now. Try again later." :
    c === "server_down" ? "The practice server isn't running. Double-click Start Practice, then try again." :
    "Claude couldn't check this" + (c ? " (" + esc(c) + ")" : "") + ". Try again.";
}
function use(arg) {
  const list = listFor(arg);
  if (!list.length) return saved();
  let w = list[Math.floor(Math.random() * list.length)];
  const d = screen("Study · Use it", titleFor(arg),
    '<p class="eyebrow">Use it · ' + esc(titleFor(arg)) + '</p><h1>Write your own sentence</h1><div id="stUse"></div>' + nav());
  const host = d.querySelector("#stUse");
  function show() {
    host.innerHTML = '<div class="st-flash"><div class="st-front"><button type="button" class="st-say" data-say="' + esc(w.w) + '">🔊</button><b>' + esc(w.w) + "</b>" + tag(w.tag) + star(w) + "</div>" +
      '<p class="st-note">' + esc(w.note) + "</p>" +
      '<p class="st-hint">Write a sentence about your own life or an IELTS topic. Don\'t copy the example.</p>' +
      '<textarea class="st-ta" rows="3" placeholder="Your sentence with “' + esc(w.w) + '”"></textarea>' +
      '<div class="btnrow"><button type="button" class="st-chk">Check with Claude</button><button type="button" class="ghost st-ex-b">Show the example</button><button type="button" class="ghost st-new">Another word</button></div><div class="st-out"></div></div>';
    const ta = host.querySelector(".st-ta"), out = host.querySelector(".st-out");
    host.querySelector(".st-new").onclick = () => { w = list[Math.floor(Math.random() * list.length)]; show(); };
    host.querySelector(".st-ex-b").onclick = () => { out.innerHTML = '<p class="st-ex">' + hl(w.ex, w.w) + "</p>"; };
    host.querySelector(".st-chk").onclick = () => {
      const t = ta.value.trim(); if (!t) { ta.focus(); return; }
      out.innerHTML = '<p class="st-hint">Claude is checking…</p>';
      sampler().then(s => {
        if (!s) { out.innerHTML = '<p class="st-hint">Claude isn\'t available here.</p><p class="st-ex">' + hl(w.ex, w.w) + "</p>"; return; }
        return s.json("You are an IELTS examiner and English teacher. The student is aiming for Band 9 and wrote one sentence to practise the word or phrase \"" + w.w + "\" (meaning/use: " + w.note + "; register: " + TAGS[w.tag][0] + ").\n\nSentence: \"\"\"" + t + "\"\"\"\n\n" +
          'Reply with JSON only: {"correct": true/false (is the word used with the right meaning, grammar and collocation?), "natural": true/false (would a fluent speaker say it this way?), "register": "one short line: is it right for IELTS Speaking, Writing or both", "comment": "one or two short sentences of feedback", "fixes": [{"wrong": "exact words", "right": "correction", "why": "short rule"}], "better": "a Band 9 version of the same sentence, keeping the student\'s idea"}')
          .then(r => {
            out.innerHTML = '<p class="st-verdict ' + (r.correct && r.natural ? "ok" : "") + '">' + (r.correct ? (r.natural ? "✓ Correct and natural" : "✓ Correct, but could sound more natural") : "✗ Not quite right") + "</p>" +
              "<p>" + esc(r.comment || "") + "</p>" + (r.register ? '<p class="st-note">' + esc(r.register) + "</p>" : "") +
              (r.fixes && r.fixes.length ? '<div class="st-fixes">' + r.fixes.map(f => "<div><s>" + esc(f.wrong) + "</s> → <ins>" + esc(f.right) + "</ins><span>" + esc(f.why) + "</span></div>").join("") + "</div>" : "") +
              (r.better ? '<p class="st-better"><span>Band 9 version</span>' + esc(r.better) + "</p>" : "");
            addHist({ kind: "use", word: w.key, text: t, ok: !!(r.correct && r.natural) });
            if (r.correct && r.natural) mark(w.key, 2);
          });
      }).catch(e => { out.innerHTML = '<p class="st-hint">' + errText(e) + '</p><p class="st-ex">' + hl(w.ex, w.w) + "</p>"; });
    };
  }
  show();
}

/* ---------- Writing guides ---------- */
const paras = t => esc(t).split(/\n\s*\n/).map(p => "<p>" + p + "</p>").join("");
function t1() {
  const g = STUDY_GUIDE.t1, m = g.model;
  screen("Study · Task 1 guide", "Report the main features in 20 minutes",
    '<p class="eyebrow">Writing · Task 1</p><h1>' + esc(g.title) + "</h1><p>" + esc(g.intro) + "</p>" +
    "<h2>The four paragraphs</h2>" + g.structure.map(s => '<div class="st-step"><b>' + esc(s[0]) + "</b><p>" + esc(s[1]) + '</p><p class="st-ex">' + esc(s[2]) + "</p></div>").join("") +
    "<h2>Every chart type</h2>" + '<div class="tw"><table class="dtable"><thead><tr><th>Type</th><th>What to report</th><th>Overview example</th></tr></thead><tbody>' +
    g.types.map(t => "<tr><td><b>" + esc(t[0]) + "</b></td><td>" + esc(t[1]) + '</td><td class="st-exc">' + esc(t[2]) + "</td></tr>").join("") + "</tbody></table></div>" +
    '<div class="btnrow"><button type="button" class="ghost" data-go="rules">Grammar of trends</button><button type="button" class="ghost" data-go="fam" data-arg="up">Chart vocabulary</button></div>' +
    "<h2>Band 9 model</h2><p><b>" + esc(m.q) + "</b></p>" +
    '<div class="tw"><table class="dtable" style="max-width:520px">' + m.data.map((r, i) => "<tr>" + r.map(c => (i ? "<td>" : "<th>") + esc(c) + (i ? "</td>" : "</th>")).join("") + "</tr>").join("") + "</table></div>" +
    '<div class="st-model">' + paras(m.text) + "</div><h2>Why it scores highly</h2><ul>" + m.notes.map(n => "<li>" + esc(n) + "</li>").join("") + "</ul>" +
    "<h2>Before you finish: checklist</h2>" + g.checklist.map(c => '<div class="st-step"><b>' + esc(c[0]) + "</b><p>" + esc(c[1]) + "</p></div>").join("") +
    '<div class="btnrow"><button type="button" data-go="practice" data-arg="overview">Practise an overview</button><button type="button" class="ghost" data-go="practice" data-arg="sentence">Practise data sentences</button></div>' + nav());
}
function t2() {
  const g = STUDY_GUIDE.t2, m = g.model;
  screen("Study · Task 2 guide", "A clear, developed argument in 40 minutes",
    '<p class="eyebrow">Writing · Task 2</p><h1>' + esc(g.title) + "</h1><p>" + esc(g.intro) + "</p>" +
    "<h2>Five question types</h2>" + g.types.map(t => '<div class="st-step"><b>' + esc(t[0]) + '</b> <span class="st-note">“' + esc(t[1]) + "”</span><p>" + esc(t[2]) + '</p><p class="st-ex">' + esc(t[3]) + "</p></div>").join("") +
    "<h2>Every body paragraph</h2>" + '<div class="st-peel">' + g.paragraph.map((p, i) => '<div><span class="lab">' + (i + 1) + " · " + esc(p[0]) + "</span><p>" + esc(p[1]) + '</p><p class="st-ex">' + esc(p[2]) + "</p></div>").join("") + "</div>" +
    "<h2>Linking words, by job</h2>" + '<div class="tw"><table class="dtable">' + g.linkers.map(l => "<tr><td><b>" + esc(l[0]) + "</b></td><td>" + esc(l[1]) + "</td></tr>").join("") + "</table></div>" +
    '<p class="st-note">Use them where the logic needs them, not at the start of every sentence: mechanical linking lowers Coherence.</p>' +
    "<h2>Grammar that shows Band 8–9 range</h2>" + g.grammar.map(x => '<div class="st-step"><b>' + esc(x[0]) + '</b><p class="st-ex">' + esc(x[1]) + "</p></div>").join("") +
    "<h2>Band 9 model essay</h2><p><b>" + esc(m.q) + '</b></p><div class="st-model">' + paras(m.text) + "</div><h2>Why it scores highly</h2><ul>" + m.notes.map(n => "<li>" + esc(n) + "</li>").join("") + "</ul>" +
    "<h2>Mistakes that cost marks</h2>" + g.mistakes.map(x => '<div class="st-step"><b>' + esc(x[0]) + "</b><p>" + esc(x[1]) + "</p></div>").join("") +
    "<h2>Before you finish: checklist</h2>" + g.checklist.map(c => '<div class="st-step"><b>' + esc(c[0]) + "</b><p>" + esc(c[1]) + "</p></div>").join("") +
    '<div class="btnrow"><button type="button" data-go="practice" data-arg="intro">Practise an introduction</button><button type="button" class="ghost" data-go="practice" data-arg="body">Practise a body paragraph</button></div>' + nav());
}
function rules() {
  screen("Study · Grammar of trends", "Task 1",
    '<p class="eyebrow">Task 1</p><h1>Grammar of trends</h1>' +
    STUDY_T1_RULES.map(r => '<div class="st-step"><b>' + r[0] + "</b><p>" + r[1] + '</p><p class="st-ex">' + esc(r[2]) + "</p></div>").join("") +
    "<h2>Chart vocabulary</h2>" + '<div class="cards st-fams">' + STUDY_VOCAB.filter(f => f.pos === "chart").map(f => '<button type="button" class="card" data-go="fam" data-arg="' + f.id + '"><b>' + esc(f.head) + "</b><span>" + esc(WORDS.filter(w => w.fam === f).slice(0, 4).map(w => w.w).join(", ")) + "…</span></button>").join("") + "</div>" +
    '<div class="btnrow"><button type="button" data-go="quiz" data-arg="chart">Quiz: chart language only</button></div>' + nav());
}

/* ---------- Writing practice with Claude ---------- */
const PKIND = { overview: ["Task 1 overview", "two sentences, the main features, no numbers"], sentence: ["Task 1 data sentence", "one accurate sentence with figures"],
  intro: ["Task 2 introduction", "paraphrase the question and give your position"], body: ["Task 2 body paragraph", "topic sentence, explanation, example, link back"] };
function practice(kind) {
  kind = PKIND[kind] ? kind : "overview";
  const items = STUDY_PRACTICE[kind];
  let n = Math.floor(Math.random() * items.length);
  const d = screen("Study · Writing practice", PKIND[kind][0],
    '<p class="eyebrow">Writing practice</p><h1>' + esc(PKIND[kind][0]) + "</h1>" +
    '<div class="fltbar">' + Object.keys(PKIND).map(k => '<button type="button" class="' + (k === kind ? "on" : "") + '" data-go="practice" data-arg="' + k + '">' + esc(PKIND[k][0]) + "</button>").join("") + "</div>" +
    '<div id="stP"></div>' + nav());
  const host = d.querySelector("#stP");
  function show() {
    const it = items[n];
    host.innerHTML = '<div class="st-flash"><p class="st-qs">' + esc(it.q) + '</p><p class="st-hint">Aim: ' + esc(PKIND[kind][1]) + ".</p>" +
      '<textarea class="st-ta" rows="' + (kind === "body" ? 9 : 5) + '" placeholder="Write here"></textarea><p class="st-wc">0 words</p>' +
      '<div class="btnrow"><button type="button" class="st-chk">Check with Claude</button><button type="button" class="ghost st-mod">Show a Band 9 model</button><button type="button" class="ghost st-new">Another question</button></div><div class="st-out"></div></div>';
    const ta = host.querySelector(".st-ta"), out = host.querySelector(".st-out"), wc = host.querySelector(".st-wc");
    ta.oninput = () => { const k = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0; wc.textContent = k + " words"; };
    host.querySelector(".st-new").onclick = () => { n = (n + 1) % items.length; show(); };
    host.querySelector(".st-mod").onclick = () => { out.innerHTML = '<p class="st-better"><span>Band 9 model</span>' + esc(it.model) + "</p>"; };
    host.querySelector(".st-chk").onclick = () => {
      const t = ta.value.trim(); if (!t) { ta.focus(); return; }
      out.innerHTML = '<p class="st-hint">Claude is checking against the band descriptors…</p>';
      sampler().then(s => {
        if (!s) { out.innerHTML = '<p class="st-hint">Claude isn\'t available here.</p><p class="st-better"><span>Band 9 model</span>' + esc(it.model) + "</p>"; return; }
        return s.json("You are a strict, experienced IELTS Academic Writing examiner. The student (aiming for Band 9) wrote a " + PKIND[kind][0] + " (" + PKIND[kind][1] + ") for this task:\n" + it.q +
          "\n\nStudent's text:\n\"\"\"" + t + "\"\"\"\n\nFor reference, a Band 9 answer: " + it.model +
          '\n\nJudge accuracy (are any figures or claims wrong?), task fulfilment, vocabulary and grammar. Reply with JSON only: {"band": <estimated band for this part, whole or half>, "comment": "two short sentences: the main strength and the single most important improvement", "good": ["up to 2 strengths, quoting the student"], "fixes": [{"wrong": "exact words", "right": "correction", "why": "short rule"}] (every error, up to 10), "better": "the student\'s text rewritten at Band 9, keeping their ideas"}')
          .then(r => {
            out.innerHTML = '<p class="st-verdict">About Band ' + esc(r.band) + "</p><p>" + esc(r.comment || "") + "</p>" +
              (r.good && r.good.length ? "<ul>" + r.good.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul>" : "") +
              (r.fixes && r.fixes.length ? '<div class="st-fixes">' + r.fixes.map(f => "<div><s>" + esc(f.wrong) + "</s> → <ins>" + esc(f.right) + "</ins><span>" + esc(f.why) + "</span></div>").join("") + "</div>" : "") +
              (r.better ? '<p class="st-better"><span>Your text at Band 9</span>' + esc(r.better) + "</p>" : "");
            addHist({ kind: "practice", what: kind, q: n, text: t, band: r.band });
          });
      }).catch(e => { out.innerHTML = '<p class="st-hint">' + errText(e) + '</p><p class="st-better"><span>Band 9 model</span>' + esc(it.model) + "</p>"; });
    };
  }
  show();
}

/* ---------- Trend charts: 20 graphs with a Band 9 model answer each (STUDY_TRENDS) ---------- */
const TCOL = ["var(--accent)", "var(--gold)", "var(--good)"], TDASH = ["", "7 4", "2 4"];
const tfmt = v => String(+(+v).toFixed(2));
function tstep(r) { const m = Math.pow(10, Math.floor(Math.log10(r))), f = r / m; return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * m; }
function chartSvg(t) {
  const W = 640, H = 330, L = 50, R = 14, T = 58, B = 34, n = t.x.length;
  const all = [].concat.apply([], t.series.map(s => s.v)), mx = Math.max.apply(null, all);
  let lo = t.y0 != null ? t.y0 : 0; const st = tstep((mx - lo) / 5 || 1); lo = Math.floor(lo / st) * st;
  const hi = Math.ceil(mx / st) * st + (mx % st === 0 ? 0 : 0), pw = W - L - R, ph = H - T - B;
  const Y = v => T + ph - (v - lo) / (hi - lo) * ph;
  const o = ['<svg class="st-chart" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + esc(t.title) + '">'];
  o.push('<text x="' + L + '" y="16" class="ct-t">' + esc(t.title) + '</text><text x="' + L + '" y="' + (T - 8) + '" class="ct-u">' + esc(t.unit) + "</text>");
  let lx = W - R;
  for (let k = t.series.length - 1; k >= 0; k--) {
    const s = t.series[k], w = s.name.length * 6.6 + 30; lx -= w;
    o.push(t.type === "bar" ? '<rect x="' + lx + '" y="25" width="14" height="10" fill="' + TCOL[k] + '"/>' :
      '<line x1="' + lx + '" y1="30" x2="' + (lx + 18) + '" y2="30" stroke="' + TCOL[k] + '" stroke-width="2.6" stroke-dasharray="' + TDASH[k] + '"/>');
    o.push('<text x="' + (lx + 22) + '" y="34" class="ct-l">' + esc(s.name) + "</text>");
  }
  for (let v = lo; v <= hi + 1e-9; v += st) o.push('<line x1="' + L + '" x2="' + (W - R) + '" y1="' + Y(v) + '" y2="' + Y(v) + '" class="ct-g"/><text x="' + (L - 6) + '" y="' + (Y(v) + 4) + '" class="ct-a" text-anchor="end">' + tfmt(v) + "</text>");
  if (t.type === "bar") {
    const gw = pw / n, bw = Math.min(34, gw * 0.72 / t.series.length);
    t.x.forEach((x, i) => {
      const c = L + gw * (i + 0.5), x0 = c - bw * t.series.length / 2;
      t.series.forEach((s, k) => o.push('<rect x="' + (x0 + k * bw) + '" y="' + Y(s.v[i]) + '" width="' + (bw - 2) + '" height="' + (Y(lo) - Y(s.v[i])) + '" fill="' + TCOL[k] + '"><title>' + esc(s.name + ", " + x + ": " + tfmt(s.v[i])) + "</title></rect>"));
      o.push('<text x="' + c + '" y="' + (H - B + 18) + '" class="ct-a" text-anchor="middle">' + esc(x) + "</text>");
    });
  } else {
    const X = i => L + 12 + i * (pw - 24) / (n - 1);
    t.x.forEach((x, i) => o.push('<text x="' + X(i) + '" y="' + (H - B + 18) + '" class="ct-a" text-anchor="middle">' + esc(x) + "</text>"));
    t.series.forEach((s, k) => {
      o.push('<polyline fill="none" stroke="' + TCOL[k] + '" stroke-width="2.6" stroke-linejoin="round" stroke-dasharray="' + TDASH[k] + '" points="' + s.v.map((v, i) => X(i) + "," + Y(v)).join(" ") + '"/>');
      s.v.forEach((v, i) => o.push('<circle cx="' + X(i) + '" cy="' + Y(v) + '" r="3.6" fill="' + TCOL[k] + '"><title>' + esc(s.name + ", " + t.x[i] + ": " + tfmt(v)) + "</title></circle>"));
    });
  }
  o.push('<line x1="' + L + '" x2="' + (W - R) + '" y1="' + Y(lo) + '" y2="' + Y(lo) + '" class="ct-x"/></svg>');
  return o.join("");
}
const tTable = t => '<div class="tw"><table class="dtable"><thead><tr><th>' + esc(t.unit) + "</th>" + t.x.map(x => "<th>" + esc(x) + "</th>").join("") + "</tr></thead><tbody>" +
  t.series.map(s => "<tr><td><b>" + esc(s.name) + "</b></td>" + s.v.map(v => "<td>" + tfmt(v) + "</td>").join("") + "</tr>").join("") + "</tbody></table></div>";
const tModel = t => t.model.split(/\n\n/).map(p => "<p>" + hl(p, t.key) + "</p>").join("");
const tDone = () => { const d = {}; ST.hist.forEach(h => { if (h.kind === "trend") d[h.q] = h; }); return d; };
function trends(arg) {
  const L = STUDY_TRENDS, done = tDone();
  if (arg === "all") {
    screen("Study · Trend charts", "All 20 with answers",
      '<p class="eyebrow">Task 1</p><h1>All 20 charts with model answers</h1><p class="st-hint">Read each chart, say the overview to yourself, then read the model. The trend phrase is in bold.</p>' +
      L.map((t, i) => '<div class="st-flash"><p class="eyebrow">' + (i + 1) + " / " + L.length + " · " + esc(t.key) + '</p><p class="st-qs">' + esc(t.q) + '</p><div class="st-chartbox">' + chartSvg(t) +
        '</div><div class="st-better"><span>Band 9 model answer</span>' + tModel(t) + "</div></div>").join("") +
      '<div class="btnrow"><button type="button" class="ghost" data-go="trends" data-arg="">All 20 charts</button></div>' + nav());
    return;
  }
  if (arg == null || arg === "" || isNaN(+arg)) {
    screen("Study · Trend charts", "Task 1",
      '<p class="eyebrow">Task 1</p><h1>Trend charts</h1><div class="btnrow"><button type="button" data-go="trends" data-arg="all">📖 Read all 20 with answers</button></div><p class="st-hint">Or pick one chart to practise: 20 graphs, one for each trend phrase. Look at the chart, write the answer (an introduction, an overview and the key details), then compare it with the Band 9 model. The charts and models work offline; "Check with Claude" needs the internet.</p>' +
      '<div class="cards st-fams">' + L.map((t, i) => '<button type="button" class="card" data-go="trends" data-arg="' + i + '"><b>' + (i + 1) + ". " + esc(t.title) + "</b><span>Key phrase: " + esc(t.key) + '</span><span class="meta">' + (t.type === "bar" ? "Bar chart" : "Line graph") + (done[i] ? " · ✓ written" : "") + "</span></button>").join("") + "</div>" + nav());
    return;
  }
  const i = (+arg + L.length) % L.length, t = L[i];
  const d = screen("Study · Trend charts", (i + 1) + " / " + L.length,
    '<p class="eyebrow">Trend chart ' + (i + 1) + " / " + L.length + "</p><h1>" + esc(t.title) + "</h1>" +
    '<div class="st-flash"><p class="st-qs">' + esc(t.q) + ' Summarise the information by selecting and reporting the main features, and make comparisons where relevant.</p>' +
    '<p class="st-hint">Use this phrase: <b>' + esc(t.key) + "</b> · Aim for an introduction, an overview and 2–3 detail sentences (about 100–150 words).</p>" +
    '<div class="st-chartbox">' + chartSvg(t) + "</div>" +
    '<details class="st-ans"><summary>📖 Band 9 model answer (tap to open)</summary>' + tModel(t) + "</details>" +
    "<details><summary>Show the exact figures</summary>" + tTable(t) + "</details>" +
    '<p class="st-hint">Try writing it yourself first, then open the model answer above to compare.</p>' +
    '<textarea class="st-ta" rows="9" placeholder="Write your answer here">' + esc(done[i] ? done[i].text : "") + '</textarea><p class="st-wc">0 words</p>' +
    '<div class="btnrow"><button type="button" class="st-chk">Check with Claude</button><button type="button" class="ghost st-mod">Show the Band 9 model</button></div><div class="st-out"></div>' +
    '<div class="btnrow"><button type="button" class="ghost" data-go="trends" data-arg="' + (i - 1) + '">← Previous chart</button><button type="button" class="ghost" data-go="trends" data-arg="">All 20 charts</button><button type="button" data-go="trends" data-arg="' + (i + 1) + '">Next chart →</button></div></div>' + nav());
  const ta = d.querySelector(".st-ta"), out = d.querySelector(".st-out"), wc = d.querySelector(".st-wc");
  const count = () => { const k = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0; wc.textContent = k + " words"; };
  ta.oninput = count; count();
  const model = '<div class="st-better"><span>Band 9 model</span>' + tModel(t) + "</div>";
  const keep = () => { const v = ta.value.trim(); if (v && (!done[i] || done[i].text !== v)) { addHist({ kind: "trend", q: i, text: v }); done[i] = { text: v }; } };
  d.querySelector(".st-mod").onclick = () => { keep(); out.innerHTML = model; };
  d.querySelector(".st-chk").onclick = () => {
    const v = ta.value.trim(); if (!v) { ta.focus(); return; }
    keep();
    out.innerHTML = '<p class="st-hint">Claude is checking against the band descriptors…</p>';
    const data = t.series.map(s => s.name + ": " + t.x.map((x, k) => x + " " + tfmt(s.v[k])).join(", ")).join("\n");
    sampler().then(s => {
      if (!s) { out.innerHTML = '<p class="st-hint">Claude isn\'t available here.</p>' + model; return; }
      return s.json("You are a strict, experienced IELTS Academic Writing examiner. The student (aiming for Band 9) wrote a short Task 1 answer (introduction, overview and key details) for this " + (t.type === "bar" ? "bar chart" : "line graph") + ":\n" + t.q + "\nUnit: " + t.unit + "\nData:\n" + data +
        "\nThey were asked to use the phrase \"" + t.key + "\".\n\nStudent's text:\n\"\"\"" + v + "\"\"\"\n\nFor reference, a Band 9 answer: " + t.model +
        '\n\nCheck every figure against the data. Judge task achievement (overview, accuracy, key features), coherence, vocabulary and grammar. Reply with JSON only: {"band": <estimated band, whole or half>, "comment": "two short sentences: the main strength and the single most important improvement", "good": ["up to 2 strengths, quoting the student"], "fixes": [{"wrong": "exact words", "right": "correction", "why": "short rule"}] (every error, including wrong figures, up to 10), "better": "the student\'s text rewritten at Band 9, keeping their ideas"}')
        .then(r => {
          out.innerHTML = '<p class="st-verdict">About Band ' + esc(r.band) + "</p><p>" + esc(r.comment || "") + "</p>" +
            (r.good && r.good.length ? "<ul>" + r.good.map(x => "<li>" + esc(x) + "</li>").join("") + "</ul>" : "") +
            (r.fixes && r.fixes.length ? '<div class="st-fixes">' + r.fixes.map(f => "<div><s>" + esc(f.wrong) + "</s> → <ins>" + esc(f.right) + "</ins><span>" + esc(f.why) + "</span></div>").join("") + "</div>" : "") +
            (r.better ? '<p class="st-better"><span>Your text at Band 9</span>' + esc(r.better) + "</p>" : "") + model;
          addHist({ kind: "trend", q: i, text: v, band: r.band });
        });
    }).catch(e => { out.innerHTML = '<p class="st-hint">' + errText(e) + "</p>" + model; });
  };
}

const ROUTES = { home, fam, saved, cards, quiz, mixquiz: () => quiz(""), use, t1, t2, rules, practice, trends };

function css() {
  if (byId("stCss")) return;
  const s = document.createElement("style"); s.id = "stCss";
  s.textContent = `
.stdy .st-nav{display:flex;flex-wrap:wrap;gap:8px;margin:28px 0 8px}
.stdy button.ghost,.stdy .st-nav button{font:inherit;font-size:.86rem;font-weight:600;border-radius:4px;padding:8px 15px;cursor:pointer;border:1px solid var(--accent);background:transparent;color:var(--accent)}
.stdy .st-word{border:1px solid var(--rule);border-radius:5px;background:var(--surface);padding:10px 14px;margin:0 0 8px;max-width:860px}
.stdy .st-wh{display:flex;flex-wrap:wrap;align-items:center;gap:8px}
.stdy .st-wh>b{font-size:1.08rem}
.stdy .st-note{margin:4px 0 0;font-size:.9rem;color:var(--ink-2)}
.stdy .st-ex{margin:4px 0 0;font-family:"Newsreader",Georgia,serif;font-size:1.02rem;color:var(--ink)}
.stdy .st-ex b{color:var(--accent)}
.stdy .st-tag{font-family:"IBM Plex Mono",monospace;font-size:10px;letter-spacing:.06em;text-transform:uppercase;border-radius:3px;padding:2px 6px;border:1px solid}
.stdy .st-b{color:var(--good);border-color:var(--good)}.stdy .st-w{color:var(--accent);border-color:var(--accent)}
.stdy .st-s{color:var(--gold);border-color:var(--gold)}.stdy .st-x{color:var(--correct);border-color:var(--correct)}
.stdy .st-k{font-size:.75rem;color:var(--ink-3)}.stdy .st-k.ok{color:var(--good);font-weight:600}
.stdy .st-fam{font-size:.78rem;color:var(--ink-3)}
.stdy .st-star{margin-left:auto;font:inherit;font-size:.82rem;font-weight:600;border:1px solid var(--gold);background:transparent;color:var(--gold);border-radius:14px;padding:3px 11px;cursor:pointer}
.stdy .st-star.on{background:var(--gold);color:var(--surface)}
.stdy .btnrow .st-star{margin-left:0;border-radius:4px;padding:9px 17px}
.stdy .st-say{font:inherit;font-size:.9rem;border:none;background:none;cursor:pointer;padding:0 2px}
.stdy .st-legend{font-size:.85rem;color:var(--ink-2);display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.stdy .st-flash{border:1px solid var(--rule-strong);border-radius:6px;background:var(--surface);padding:18px 20px;max-width:760px;margin:10px 0}
.stdy .st-count{display:block;font-family:"IBM Plex Mono",monospace;font-size:11px;color:var(--ink-3);margin-bottom:8px}
.stdy .st-front{display:flex;flex-wrap:wrap;align-items:center;gap:10px}.stdy .st-front>b{font-size:1.7rem;font-family:"Newsreader",Georgia,serif}
.stdy .st-hint{font-size:.86rem;color:var(--ink-3);margin:8px 0}
.stdy .st-qs{font-family:"Newsreader",Georgia,serif;font-size:1.2rem;line-height:1.5;margin:4px 0 12px}
.stdy .st-blank{display:inline-block;min-width:90px;border-bottom:2px solid var(--accent)}
.stdy .st-opts{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px}
.stdy .st-opts button{font:inherit;font-size:.95rem;border:1px solid var(--rule-strong);background:var(--surface-2);color:var(--ink);border-radius:5px;padding:10px;cursor:pointer}
.stdy .st-opts button.ok{background:var(--good-soft);border-color:var(--good);color:var(--good);font-weight:600}
.stdy .st-opts button.no{background:var(--correct-soft);border-color:var(--correct);color:var(--correct)}
.stdy .st-why{margin-top:12px;padding-top:10px;border-top:1px solid var(--rule)}
.stdy .st-ta{display:block;width:100%;font-family:"Newsreader",Georgia,serif;font-size:1.05rem;line-height:1.55;color:var(--ink);background:var(--surface);border:1px solid var(--rule-strong);border-radius:4px;padding:10px 12px;margin:6px 0}
.stdy .st-wc{font-family:"IBM Plex Mono",monospace;font-size:11px;color:var(--ink-3);text-align:right;margin:0}
.stdy .st-verdict{font-weight:600;font-size:1.05rem;color:var(--accent);margin:12px 0 4px}.stdy .st-verdict.ok{color:var(--good)}
.stdy .st-fixes>div{margin:0 0 8px;font-size:.92rem}.stdy .st-fixes s{color:var(--correct)}.stdy .st-fixes ins{text-decoration:none;color:var(--good);font-weight:600}.stdy .st-fixes span{display:block;font-size:.84rem;color:var(--ink-3)}
.stdy .st-chartbox{background:var(--surface);border:1px solid var(--rule);border-radius:5px;padding:8px;margin:12px 0}
.stdy .st-chart{width:100%;height:auto;display:block}
.stdy .st-chart .ct-t{font:600 15px "IBM Plex Sans",sans-serif;fill:var(--ink)}
.stdy .st-chart .ct-u,.stdy .st-chart .ct-a{font:11.5px "IBM Plex Sans",sans-serif;fill:var(--ink-3)}
.stdy .st-chart .ct-l{font:12px "IBM Plex Sans",sans-serif;fill:var(--ink-2)}
.stdy .st-chart .ct-g{stroke:var(--rule);stroke-width:1}
.stdy .st-chart .ct-x{stroke:var(--ink-3);stroke-width:1.2}
.stdy .st-better p{margin:0 0 .6em}.stdy .st-better p:last-child{margin:0}
.stdy details.st-ans{border:1px solid var(--good);background:var(--good-soft);border-radius:5px;padding:8px 14px;margin:10px 0;font-family:"Newsreader",Georgia,serif;font-size:1.03rem;line-height:1.55}
.stdy details.st-ans summary{font-family:"IBM Plex Sans",sans-serif;font-weight:600;color:var(--good);font-size:.98rem}
.stdy details.st-ans p{margin:.6em 0 0}
.stdy details summary{cursor:pointer;color:var(--accent);font-size:.92rem;margin:4px 0}
.stdy .st-better{border:1px solid var(--good);background:var(--good-soft);border-radius:5px;padding:10px 14px;font-family:"Newsreader",Georgia,serif;font-size:1.03rem;line-height:1.55;color:var(--ink);max-width:760px}
.stdy .st-better span{display:block;font-family:"IBM Plex Mono",monospace;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--good);margin-bottom:4px}
.stdy .st-step{border-left:3px solid var(--accent);padding:4px 0 4px 12px;margin:0 0 12px;max-width:820px}
.stdy .st-step p{margin:3px 0 0}
.stdy .st-exc{font-family:"Newsreader",Georgia,serif}
.stdy .st-model{border:1px solid var(--rule-strong);border-radius:5px;background:var(--surface);padding:14px 18px;max-width:760px;font-family:"Newsreader",Georgia,serif;font-size:1.04rem;line-height:1.65}
.stdy .st-model p{color:var(--ink);margin:0 0 10px}
.stdy .st-peel{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;max-width:900px}
.stdy .st-peel>div{border:1px solid var(--rule);border-radius:5px;padding:10px 12px;background:var(--surface)}
.stdy .st-peel .lab{font-family:"IBM Plex Mono",monospace;font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--accent)}
.stdy .st-done h2{margin-top:6px}
`;
  document.head.appendChild(s);
}
function open(where, arg) { css(); (ROUTES[where] || home)(arg); connect().then(() => { if (!where || where === "home") { const v = byId("stSavedN"); if (v) home(); } else paintSync(); }); }
window.STUDY = { open };
})();
