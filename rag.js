/* rag.js — "Ask my portfolio": retrieval-augmented answers that run entirely in the browser.

   The knowledge base is built at load time from the same data the page renders (experience,
   projects, papers, skills, events, roles, walkthrough slides, plus the curated fact sheet), so
   anything added to the site becomes answerable.

   Retrieval is hybrid:
   - BM25 keyword scoring, always available.
   - Semantic similarity with bge-small-en-v1.5 (transformers.js, ~34 MB, cached by the browser),
     loaded on the visitor's first interaction with the Ask box. Chunk vectors are precomputed into
     assets/rag/vectors.json by tools/build-rag.mjs; a chunk without a stored vector (the site
     changed since the last build) is embedded in the browser instead.

   Answers are the retrieved sentences that best match the question, cited, never generated text.
   If nothing scores high enough, it refuses rather than guess.

   Everything is static files plus public CDNs, so it works as-is on GitHub Pages. */
(function () {
  const { $, $$, reduced, data, walkthroughData } = window.AY;
  const LIB = "https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.2";
  // bge-small is trained for question → passage retrieval: questions get an instruction prefix,
  // passages don't, and it pools on the [CLS] token.
  const MODEL = "Xenova/bge-small-en-v1.5";
  const QUERY_PREFIX = "Represent this sentence for searching relevant passages: ";
  const POOLING = "cls";
  const VECTORS_URL = "assets/rag/vectors.json";
  const TOP_K = 3;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const strip = (s) => String(s).replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\s+/g, " ").trim();
  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  /* ---------------------------------------------------------------- knowledge base */
  function buildChunks() {
    const out = [];
    const add = (id, source, title, text, link) => out.push({ id, source, title, text: strip(text), link });

    data.KB.forEach((f) => add(`fact:${f.id}`, "fact sheet", f.title.replace(/_/g, " "), f.text));

    data.EXPERIENCE.forEach((x) => {
      const k = slug(x.org);
      add(`exp:${k}`, "experience", x.org,
        `Ankit was ${x.role} at ${x.org} (${x.when}), where his work included ${x.points.map(([h]) => h.charAt(0).toLowerCase() + h.slice(1)).join("; ")}.${x.ladder ? ` His path there: ${x.ladder.join(" → ")}.` : ""}`, "#trace");
      x.points.forEach(([h, p], i) => add(`exp:${k}:${i}`, "experience", x.org, `At ${x.org}, ${h}: ${p}`, "#trace"));
    });

    data.PROJECTS.forEach((p) => add(`project:${slug(p.title)}`, "project", p.title,
      `${p.title} (${p.tag.toLowerCase()} project): ${p.sub} ${p.text} Key numbers: ${p.stats.map(([v, l]) => `${v} ${l}`).join("; ")}. Built with ${p.stack.map(([n]) => n).join(", ")}.`,
      p.wt ? `#walkthrough/${p.wt}` : "#work"));

    data.DEVLENS_FEATURES.forEach(([, name, desc]) => add(`devlens:${slug(name)}`, "project", "DevLens", `DevLens — ${name}: ${desc}`, "#walkthrough/devlens"));
    add("devlens:stack", "project", "DevLens", `DevLens is built with ${data.DEVLENS_STACK.map(([n]) => n).join(", ")}.`, "#walkthrough/devlens");

    data.STAGES.forEach((s) => add(`stage:${slug(s.name)}`, "architecture", `GenAI pipeline · ${s.name}`, `In the GenAI content platform, the ${s.name} stage: ${s.body}`, "#systems"));

    data.PAPERS.forEach((p) => {
      add(`paper:${slug(p.short)}`, "research", p.title, `Ankit published "${p.title}" (${p.venue}, ${p.date}). ${p.key}`, "#research");
      if (p.abstract) add(`paper:${slug(p.short)}:abstract`, "research", p.title, p.abstract, "#research");
    });

    data.SKILL_ROWS.flat().forEach(([name, , area, where]) =>
      add(`skill:${slug(name)}`, "skills", name, `Ankit knows ${name} (${area}) and has used it for ${where}.`, "#skills"));

    data.INTEGRATIONS.forEach(([name, , desc, where]) =>
      add(`integration:${slug(name)}`, "integrations", name, `Integration Ankit has shipped — ${name} (${where}): ${desc}.`, "#skills"));

    data.EVENTS.forEach((e) => add(`event:${slug(e.title)}`, "community", e.title,
      `Cloud Native Gurugram event "${e.title}", ${e.date}, ${e.place}. Ankit co-founded and organises the group.`, "#community"));
    add("community:partners", "community", "Sponsors & partners",
      `Cloud Native Gurugram's sponsors and host partners include ${data.PARTNERS.map((p) => p.name).join(", ")}.`, "#community");

    data.ROLES.forEach((r) => add(`role:${slug(r.title)}`, "roles", r.title,
      `Ankit is looking for ${r.title} roles (${r.fit} fit): ${r.why.charAt(0).toLowerCase() + r.why.slice(1).replace(/\.$/, "")}, bringing ${r.bring.join(" and ")}.`, "#roles"));

    Object.entries(walkthroughData || {}).forEach(([key, deck]) => deck.slides.forEach((s, i) =>
      add(`walkthrough:${key}:${i}`, "walkthrough", `${deck.title} · ${s.kicker}`,
        `${deck.title} — ${s.kicker}: ${s.title} ${s.points.join(" ")}`, `#walkthrough/${key}`)));

    return out;
  }

  /* ---------------------------------------------------------------- keyword search (BM25) */
  const STOP = new Set("a an the is are was were be been of to in on for and or with by at as from it its this that what which who whom how do does did you your yours he his him i me my about can could would should tell give show any have has had there their they them we our us so than then also into over under more most very just not no yes all done doing use used ankit ankits yadav please know".split(" "));
  const SYN = { hallucinate: "hallucination", hallucinations: "hallucination", grounding: "grounded", eval: "evaluation", evals: "evaluation", evaluate: "evaluation", evaluations: "evaluation", vector: "embeddings", embedding: "embeddings", llms: "llm", papers: "paper", publications: "paper", publication: "paper", published: "paper", publish: "paper", research: "paper", skill: "skills", tech: "stack", hire: "contact", email: "contact", reach: "contact", college: "university", degree: "education", studied: "education", study: "education", meetups: "meetup", ppt: "powerpoint", pptx: "powerpoint", slides: "powerpoint", latency: "performance", faster: "performance", speed: "performance", secure: "security", privacy: "pii", redact: "pii", redaction: "pii", redacted: "pii", k8s: "kubernetes", cncf: "cloud", job: "role", jobs: "role", roles: "role", position: "role", worked: "work", working: "work", works: "work", built: "build", building: "build", builds: "build", talks: "speaking", speaker: "speaking", postgres: "postgresql", db: "database", databases: "database", js: "javascript", ts: "typescript", gpt: "openai", chatgpt: "openai", gpt4: "openai" };
  const norm = (w) => {
    w = w.toLowerCase().replace(/[^a-z0-9+#]/g, "");
    w = SYN[w] || w;
    if (w.length > 4 && w.endsWith("s") && !w.endsWith("ss")) w = w.slice(0, -1);
    return SYN[w] || w;
  };
  const tokenize = (s) => s.split(/[\s,.;:()'"!?–—/·→-]+/).map(norm).filter((w) => w.length > 1 && !STOP.has(w));

  function bm25Index(chunks) {
    const docs = chunks.map((c) => tokenize(`${c.title} ${c.title} ${c.text}`));
    const df = new Map();
    docs.forEach((ts) => new Set(ts).forEach((t) => df.set(t, (df.get(t) || 0) + 1)));
    const N = docs.length, avg = docs.reduce((a, d) => a + d.length, 0) / N;
    const idf = (t) => { const n = df.get(t) || 0; return n ? Math.log(1 + (N - n + 0.5) / (n + 0.5)) : 0; };
    const tfs = docs.map((d) => { const m = new Map(); d.forEach((t) => m.set(t, (m.get(t) || 0) + 1)); return m; });
    const score = (qTokens, i) => {
      let s = 0;
      const len = docs[i].length;
      for (const t of new Set(qTokens)) {
        const f = tfs[i].get(t);
        if (f) s += idf(t) * (f * 2.2) / (f + 1.2 * (0.25 + 0.75 * len / avg));
      }
      return s;
    };
    return { score, idf };
  }

  /* ---------------------------------------------------------------- semantic search */
  let extractor = null, loading = null;
  const VEC = new Map(); // chunk index → Float32Array (normalized)

  function fnv(s) {
    let h = 0x811c9dc5;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); }
    return (h >>> 0).toString(16).padStart(8, "0");
  }
  const dot = (a, b) => { let s = 0; for (let i = 0; i < a.length; i++) s += a[i] * b[i]; return s; };

  async function embed(texts) {
    const out = await extractor(texts, { pooling: POOLING, normalize: true });
    return out.tolist().map((v) => Float32Array.from(v));
  }

  function decode(b64) {
    const bin = atob(b64), v = new Float32Array(bin.length);
    let n = 0;
    for (let i = 0; i < bin.length; i++) { const x = (bin.charCodeAt(i) << 24 >> 24) / 127; v[i] = x; n += x * x; }
    n = Math.sqrt(n) || 1;
    for (let i = 0; i < v.length; i++) v[i] /= n;
    return v;
  }
  function encode(v) {
    let s = "";
    for (const x of v) s += String.fromCharCode(Math.max(-127, Math.min(127, Math.round(x * 127))) & 255);
    return btoa(s);
  }

  // Load the model and the stored chunk vectors once; embed whatever the stored file is missing.
  function loadSemantic() {
    if (loading) return loading;
    setMode("loading");
    loading = (async () => {
      const [{ pipeline, env }, stored] = await Promise.all([
        import(LIB),
        fetch(VECTORS_URL).then((r) => (r.ok ? r.json() : null)).catch(() => null),
      ]);
      env.allowLocalModels = false;
      extractor = await pipeline("feature-extraction", MODEL, { dtype: "q8" });
      const have = stored && stored.model === MODEL ? stored.vectors : {};
      const missing = [];
      CHUNKS.forEach((c, i) => { const b = have[fnv(c.text)]; if (b) VEC.set(i, decode(b)); else missing.push(i); });
      for (let i = 0; i < missing.length; i += 16) {
        const batch = missing.slice(i, i + 16);
        (await embed(batch.map((j) => CHUNKS[j].text))).forEach((v, k) => VEC.set(batch[k], v));
      }
      setMode("semantic");
      return true;
    })().catch((e) => {
      console.warn("Semantic search unavailable; using keyword search only.", e);
      setMode("keyword");
      return false;
    });
    return loading;
  }

  /* ---------------------------------------------------------------- retrieve + answer */
  const CHUNKS = buildChunks();
  const BM25 = bm25Index(CHUNKS);
  const sat = (s) => s / (s + 4); // BM25 → 0..1, so it blends with cosine similarity

  const SMALL_TALK = [
    [/^\s*(hi|hello|hey|hiya|yo|hola|namaste|good (morning|afternoon|evening))\b[\s!.]*$/i, "Hi! Ask me anything about Ankit: his AI platforms, RAG and evals, the ERP work, DevLens, research papers, community, or the roles he's looking for."],
    [/^\s*(thanks|thank you|thx|cheers|great|cool|nice)\b[\s!.]*$/i, "Glad it helped. Anything else you'd like to know about Ankit's work?"],
  ];

  async function retrieve(q) {
    const qt = tokenize(q);
    const qv = extractor ? (await embed([QUERY_PREFIX + q]))[0] : null;
    const ranked = CHUNKS.map((c, i) => {
      const kw = sat(BM25.score(qt, i));
      const sem = qv && VEC.has(i) ? dot(qv, VEC.get(i)) : null;
      // The curated fact sheet gets a small edge: it's the most carefully worded source.
      const boost = c.source === "fact sheet" ? 0.03 : 0;
      return { c, i, kw, sem, s: (sem == null ? kw : 0.75 * sem + 0.25 * kw) + boost };
    }).sort((a, b) => b.s - a.s);
    return { qt, qv, ranked };
  }

  // A sentence-level extract: the 1–3 sentences from the top chunks that best answer the question.
  async function compose(q, { qt, qv, ranked }) {
    const top = ranked[0];
    // Calibrated on bge-small: off-topic questions (weather, sport, pizza) reach ~0.45–0.48 semantic
    // similarity but share almost no keywords with the site; on-topic ones reach ≥ 0.55 or share them.
    const grounded = qv ? top.sem >= 0.58 || (top.sem >= 0.45 && top.kw >= 0.35) : top.kw >= 0.35;
    if (!grounded) return { grounded: false, top, ranked };

    const pool = ranked.slice(0, 6).filter((r) => r.s >= top.s * 0.6);
    const cands = [];
    pool.forEach((r, rank) => {
      r.c.text.split(/(?<=[.!?])\s+(?=[A-Z0-9"“(#])/).forEach((sent, pos) => {
        if (sent.split(" ").length >= 4) cands.push({ sent, r, rank, pos });
      });
    });
    let svecs = null;
    if (qv) svecs = await embed(cands.map((x) => x.sent));
    const maxIdf = qt.reduce((a, t) => a + BM25.idf(t), 0) || 1;
    cands.forEach((x, k) => {
      const toks = new Set(tokenize(x.sent));
      const kw = qt.reduce((a, t) => a + (toks.has(t) ? BM25.idf(t) : 0), 0) / maxIdf;
      x.vec = svecs ? svecs[k] : null;
      x.sem = svecs ? dot(qv, svecs[k]) : kw;
      x.score = svecs ? 0.6 * x.sem + 0.15 * kw + 0.25 * x.r.s : 0.6 * kw + 0.4 * x.r.s;
    });
    cands.sort((a, b) => b.score - a.score);
    // The answer opens with the best sentence of the top-ranked chunk, so it agrees with retrieval;
    // sentences from other chunks only add support.
    const best = cands.find((x) => x.rank === 0) || cands[0];
    const bestSem = Math.max(...cands.map((x) => x.sem));
    const picked = [best];
    for (const x of cands) {
      if (x === best) continue;
      if (picked.length === 3) break;
      // Each extra sentence has to be nearly as good as the best one, and about the question itself.
      // (Absolute margins: bge similarities sit in a narrow band, so ratios would let everything in.)
      if (x !== best && (x.score < best.score - (svecs ? 0.05 : 0.15) || x.sem < bestSem - (svecs ? 0.07 : 0.3))) continue;
      // Skip near-duplicates: the site states some facts in more than one place.
      if (picked.some((p) => p.sent === x.sent || (p.vec && x.vec && dot(p.vec, x.vec) > 0.88))) continue;
      picked.push(x);
    }
    return { grounded: true, top, ranked, picked };
  }

  /* ---------------------------------------------------------------- UI */
  let setMode = () => {};

  function ui() {
    const box = $(".ask"), log = $("#askLog"), form = $("#askForm"), input = $("#askInput"), ret = $("#askRetrieval");
    const mode = $("#askMode");
    const MODES = {
      idle: `keyword search · semantic model loads when you ask`,
      loading: `loading semantic model (34 MB, once)…`,
      semantic: `hybrid search · semantic + keyword · ${CHUNKS.length} chunks`,
      keyword: `keyword search · ${CHUNKS.length} chunks (semantic model unavailable)`,
    };
    setMode = (m) => { if (mode) { mode.textContent = MODES[m]; mode.dataset.mode = m; } };
    setMode("idle");
    // Start the download on the first sign of interest, not for every visitor who scrolls past.
    ["pointerenter", "focusin", "touchstart"].forEach((ev) => box.addEventListener(ev, () => loadSemantic(), { once: true, passive: true }));

    let busy = false;
    async function run(q) {
      q = q.trim();
      if (busy || !q) return;
      busy = true;
      log.insertAdjacentHTML("beforeend", `<div class="msg user"><span class="who mono">you</span><p>${esc(q)}</p></div>`);
      const bot = document.createElement("div");
      bot.className = "msg bot";
      bot.innerHTML = `<span class="who mono">ankit.ai · retrieving…</span><p></p>`;
      log.append(bot);
      log.scrollTop = log.scrollHeight;
      const p = $("p", bot), who = $(".who", bot);

      const talk = SMALL_TALK.find(([re]) => re.test(q));
      if (talk) {
        who.textContent = "ankit.ai";
        await type(p, talk[1]);
        busy = false;
        return;
      }

      // Give a model that's already downloading a moment to finish, so the answer uses it.
      if (loading && !extractor) await Promise.race([loading, sleep(6000)]);
      const r = await retrieve(q);
      const a = await compose(q, r);
      const shown = [...new Set([...r.ranked.slice(0, TOP_K), ...(a.picked || []).map((x) => x.r)])];
      const label = (x) => shown.indexOf(x) + 1;

      ret.innerHTML = `<div class="ret-title"><span>retrieved · top_k=${TOP_K}</span><span>${r.qv ? "semantic · keyword" : "keyword"}</span></div>` +
        shown.map((x, i) => `
        <div class="chunk" style="animation-delay:${i * 90}ms">
          <div class="chunk-head"><b>[${i + 1}] ${esc(x.c.title)}</b><span>${x.s.toFixed(3)}</span></div>
          <p>${esc(x.c.text.length > 240 ? x.c.text.slice(0, 237) + "…" : x.c.text)}</p>
          <div class="chunk-meta"><span>${x.c.source}</span><span>${x.sem != null ? `sem ${x.sem.toFixed(2)} · ` : ""}kw ${x.kw.toFixed(2)}</span></div>
          <div class="sim"><i data-w="${Math.max(0, Math.min(100, x.s * 140))}"></i></div>
        </div>`).join("");
      requestAnimationFrame(() => $$(".sim i", ret).forEach((i) => (i.style.width = i.dataset.w + "%")));
      await sleep(reduced ? 0 : 350);

      if (!a.grounded) {
        who.textContent = "ankit.ai · fact-lock";
        p.innerHTML = `I can't ground that in anything on this site, so I won't guess. Try asking about his AI platforms, RAG, evals, DevLens, the ERP work, research or community — or <a class="ok" href="mailto:${data.EMAIL}">ask Ankit directly</a>.`;
        bot.insertAdjacentHTML("beforeend", `<div class="verdict"><span class="tag block">BLOCK</span> best match ${a.top.s.toFixed(2)} is below the grounding threshold</div>`);
      } else {
        who.textContent = "ankit.ai";
        for (const [k, x] of a.picked.entries()) {
          await type(p, x.sent);
          const c = document.createElement(x.r.c.link ? "a" : "span");
          c.className = "cite";
          c.textContent = `[${label(x.r)}]`;
          if (x.r.c.link) { c.href = x.r.c.link; c.title = `${x.r.c.source}: ${x.r.c.title}`; }
          p.append(c, document.createTextNode(k < a.picked.length - 1 ? " " : ""));
        }
        const n = new Set(a.picked.map((x) => x.r)).size;
        bot.insertAdjacentHTML("beforeend", `<div class="verdict"><span class="tag pass">PASS</span> ${a.picked.length} sentence${a.picked.length > 1 ? "s" : ""} quoted from ${n} source${n > 1 ? "s" : ""} · nothing generated</div>`);
      }
      log.scrollTop = log.scrollHeight;
      busy = false;
    }

    // Type the answer out word by word; numbers glow like everywhere else on the page.
    async function type(p, text) {
      for (const w of text.split(" ")) {
        if (/\d/.test(w)) { const s = document.createElement("span"); s.className = "n"; s.textContent = w; p.append(s, document.createTextNode(" ")); }
        else p.append(document.createTextNode(w + " "));
        if (!reduced) await sleep(14);
        log.scrollTop = log.scrollHeight;
      }
    }

    form.addEventListener("submit", (e) => { e.preventDefault(); const q = input.value; input.value = ""; loadSemantic(); run(q); });
    $$("#askSuggest button").forEach((b) => b.addEventListener("click", () => { loadSemantic(); run(b.textContent); }));
  }

  ui();

  // For tools/build-rag.mjs and for testing from the console.
  window.AY.rag = {
    chunks: CHUNKS,
    async ask(q) { await loadSemantic(); const r = await retrieve(q); const a = await compose(q, r); return { grounded: a.grounded, top: +a.top.s.toFixed(3), topSem: a.top.sem, topKw: +a.top.kw.toFixed(3), source: a.top.c.id, answer: a.picked ? a.picked.map((x) => x.sent).join(" ") : null }; },
    async buildVectors() {
      if (!(await loadSemantic())) throw new Error("model failed to load");
      const vecs = await embed(CHUNKS.map((c) => c.text));
      const vectors = {};
      CHUNKS.forEach((c, i) => (vectors[fnv(c.text)] = encode(vecs[i])));
      return { model: MODEL, dim: vecs[0].length, count: CHUNKS.length, vectors };
    },
  };
})();
