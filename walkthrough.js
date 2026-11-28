/* Project walkthroughs: a full-screen slideshow per project, opened from the project cards
   or straight from a link like #walkthrough/devlens. Slides are data; visuals are drawn in HTML/CSS. */
(() => {
  "use strict";
  const { $, $$, icon, glyph, hl, reduced } = window.AY;
  const SLIDE_MS = 8000;

  /* ---------------------------------------------------------------- visuals */
  const V = {
    // Real product screenshot in a window frame; `label` is the frame's title.
    shot: (src, caption, label = "devlens · localhost") => `
      <figure class="wt-shot">
        <div class="wt-chrome"><i></i><i></i><i></i><span>${label}</span></div>
        <img src="${src}" alt="${caption || ""}" />
        ${caption ? `<figcaption>${hl(caption)}</figcaption>` : ""}
      </figure>`,
    // A pipeline: nodes in order, a packet runs through them, `hot` nodes glow.
    flow: (nodes, hot = []) => `
      <div class="wt-flow" style="--n:${nodes.length}">
        ${nodes.map(([label, ico, sub], i) => `
          <div class="wt-node${hot.includes(i) ? " hot" : ""}" style="--i:${i}">
            <span class="wt-node-ico">${icon(ico)}</span>
            <b>${label}</b>${sub ? `<small>${sub}</small>` : ""}
          </div>`).join('<span class="wt-link" aria-hidden="true"></span>')}
      </div>`,
    // Big numbers.
    stats: (items) => `
      <div class="wt-stats">${items.map(([v, l]) => `<div class="wt-stat"><b>${v}</b><span>${l}</span></div>`).join("")}</div>`,
    // Before → after bars that grow in.
    bars: (rows) => `
      <div class="wt-bars">${rows.map(([label, a, b, unit, lowerIsBetter]) => {
        const max = Math.max(a, b);
        return `<div class="wt-bar-row"><span class="wt-bar-label">${label}</span>
          <div class="wt-bar old" style="--w:${(a / max) * 100}%"><i></i><em>${a}${unit}</em></div>
          <div class="wt-bar new" style="--w:${(b / max) * 100}%"><i></i><em>${b}${unit}${lowerIsBetter ? " ↓" : " ↑"}</em></div></div>`;
      }).join("")}</div>`,
    // Logos floating in a cloud.
    scatter: (items) => `
      <div class="wt-scatter">${items.map(([label, slug], i) => `<span class="wt-float" style="--i:${i}">${icon(slug)}${label}</span>`).join("")}</div>`,
    // Logo grid.
    logos: (items) => `<div class="wt-logos">${items.map(([n, s]) => `<span class="logo-chip">${icon(s)}${n}</span>`).join("")}</div>`,
    code: (text) => `<pre class="wt-code">${text}</pre>`,
    // Raw text → redacted text, token by token.
    redact: (raw, out) => `
      <div class="wt-redact">
        <div class="wt-redact-in"><span class="wt-label">In</span><p>${raw}</p></div>
        <div class="wt-redact-arrow">${glyph("shield")}</div>
        <div class="wt-redact-out"><span class="wt-label">To the model</span><p>${out}</p></div>
      </div>`,
    // Severity gate: each lane lights up in turn.
    gate: (lanes) => `
      <div class="wt-gate">${lanes.map(([tag, label, text], i) => `
        <div class="wt-lane" style="--i:${i}"><span class="wt-verdict ${tag.toLowerCase()}">${tag}</span><div><b>${label}</b><p>${text}</p></div></div>`).join("")}</div>`,
    // Claims checked against a locked fact sheet.
    factlock: (claims) => `
      <div class="wt-claims">${claims.map(([text, ok], i) => `
        <div class="wt-claim ${ok ? "ok" : "bad"}" style="--i:${i}"><span>${ok ? glyph("check") : glyph("alert")}</span><p>${hl(text)}</p><em>${ok ? "in fact sheet" : "not in fact sheet → blocked"}</em></div>`).join("")}</div>`,
    // Misaligned shapes snap into a grid.
    align: () => `
      <div class="wt-slide-mock">
        <div class="wt-slide-page">
          ${[0, 1, 2, 3, 4, 5].map((i) => `<i class="wt-shape s${i}"></i>`).join("")}
          <span class="wt-guide v"></span><span class="wt-guide h"></span>
        </div>
        <div class="wt-legend"><span><i class="dot bad"></i>before: hand-placed</span><span><i class="dot good"></i>after: snapped to the grid</span></div>
      </div>`,
    // Fonts found in a deck, mismatches fixed.
    fonts: (rows) => `
      <div class="wt-fonts">${rows.map(([font, n, ok], i) => `
        <div class="wt-font ${ok ? "ok" : "bad"}" style="--i:${i}"><span style="font-family:${ok ? "var(--sans)" : "Georgia, serif"}">${font}</span><em>${n} text boxes</em><b>${ok ? "brand font" : "→ brand font"}</b></div>`).join("")}</div>`,
    // Replies classified by intent.
    classify: (rows) => `
      <div class="wt-classify">${rows.map(([text, label, hot], i) => `
        <div class="wt-reply" style="--i:${i}"><p>“${text}”</p><span class="tag${hot ? " pass" : ""}">${label}</span></div>`).join("")}</div>`,
    // Module grid.
    modules: (items) => `
      <div class="wt-modules">${items.map(([name, ico, sub], i) => `<div class="wt-module" style="--i:${i}">${glyph(ico)}<b>${name}</b><small>${sub}</small></div>`).join("")}</div>`,
    // Role × permission matrix.
    matrix: (roles, perms, grid) => `
      <div class="wt-matrix" style="--c:${perms.length}">
        <span></span>${perms.map((p) => `<span class="wt-mh">${p}</span>`).join("")}
        ${roles.map((r, i) => `<span class="wt-mr">${r}</span>${grid[i].map((v, j) => `<span class="wt-cell${v ? " on" : ""}" style="--d:${i * perms.length + j}">${v ? glyph("check") : ""}</span>`).join("")}`).join("")}
      </div>`,
    weights: (rows) => `
      <div class="wt-weights">${rows.map(([label, w], i) => `
        <div class="wt-weight" style="--w:${w}%;--i:${i}"><span>${label}</span><i></i><b>${w}%</b></div>`).join("")}
        <p class="wt-weights-note">Draft quality score</p></div>`,
    stack: (...parts) => parts.join(""),
  };

  /* ---------------------------------------------------------------- content */
  const W = "assets/walkthrough/devlens/";
  const PX = "assets/walkthrough/pptx/";
  const WALKTHROUGHS = {
    devlens: {
      title: "DevLens", sub: "Privacy-first debugging assistant",
      slides: [
        { kicker: "The problem", title: "The answer to “why is it broken?” is spread across five tools.",
          points: ["Chats, issues, commits, CI runs and logs all hold a piece of it.", "And none of it can be pasted into an AI as-is: it's full of names, emails and secrets."],
          visual: V.scatter([["Slack", "slack"], ["GitHub", "github"], ["Jira", "jira"], ["Drive", "googledrive"], ["Logs", "terminal"], ["CI/CD", "flow"], ["WhatsApp", "whatsapp"], ["Code", "code"]]) },
        { kicker: "How it works", title: "Privacy first, then retrieval, then an agent that has to show its work.",
          points: ["Everything is redacted before it's stored, so no model ever sees the raw text.", "Answers come only from the project's own knowledge."],
          visual: V.flow([["Sources", "plug", "Slack · GitHub · Jira · Drive"], ["Privacy Gateway", "shield", "secrets · PII · names"], ["Knowledge", "postgresql", "pgvector + exact IDs"], ["LangGraph agent", "langgraph", "picks its own tools"], ["Verified report", "check", "every claim cited"]], [1, 4]) },
        { wide: true, kicker: "Privacy Gateway", title: "Names, tokens and emails are gone before anything is saved.",
          points: ["Secret scanning, Presidio + spaCy for PII, and exact matching for chat participants.", "Each person keeps a stable label, so a redacted chat still reads naturally."],
          visual: V.shot(W + "import-preview.webp", "A real import preview: 10 names, a GitHub token and an email caught.") },
        { wide: true, kicker: "The report", title: "A root cause where every claim quotes its evidence.",
          points: ["Quotes must match the source exactly.", "A second model pass judges whether each quote actually supports its claim."],
          visual: V.shot(W + "report.webp", "A real report: the retry path holds a DB connection while it sleeps. Quote matched, claim verified at 95% confidence.") },
        { wide: true, kicker: "Investigate mode", title: "An agent that decides where to look next.",
          points: ["It reads the code, the deploy history, CI/CD and incidents, one tool at a time.", "Every step is shown live, and kept for later."],
          visual: V.shot(W + "agent.webp", "The agent's own trail: it chose to search the code for PaymentClient.") },
        { kicker: "Connect it", title: "Plugs into the team's tools — and into your AI tools.",
          points: ["OAuth connectors for GitHub, Slack, Jira and Google Drive.", "An MCP server, so Claude Code and Cursor can query a project, read-only."],
          visual: V.stack(V.code(`<span class="c"># one line in Claude Code</span>
claude mcp add --transport http devlens \\
  https://devlens.example/mcp \\
  --header <span class="s">"Authorization: Bearer dlp_…"</span>`),
            V.logos([["FastAPI", "fastapi"], ["LangGraph", "langgraph"], ["pgvector", "postgresql"], ["Redis", "redis"], ["Ollama", "ollama"], ["spaCy", "spacy"], ["React", "react"], ["TypeScript", "typescript"], ["Docker", "docker"]])) },
      ],
    },
    genai: {
      title: "Governed GenAI Content Platform", sub: "EZ Works · production", ms: 14000,
      slides: [
        { kicker: "The problem", title: "PR content in two languages, where a leaked name or an invented fact is a real problem.",
          points: ["Press releases, announcements and posts in English and Arabic, for many organisations at once.", "Every draft has to sound like the client — and never state something that isn't true."],
          visual: V.stats([["EN · AR", "register-aware, glossary-checked"], ["Multi-tenant", "per-workspace data and access"], ["229 / 261", "commits written by me"]]) },
        { kicker: "Architecture", title: "From a company's own documents to an approved, bilingual draft.",
          points: ["It learns each organisation's brand voice from its documents and public profile.", "Drafts go through automated QA, then legal, subject-matter and Arabic reviewers."],
          visual: V.flow([["Brand voice", "doc", "built from the client's documents"], ["Brief", "chat", "a conversation or an upload"], ["PII redaction", "shield", "reversible, before every model call"], ["LLM gateway", "route", "tiers, providers, fallback"], ["QA + LLM judge", "check", "checks, scores, revision"], ["Review & export", "users", "multi-reviewer approval · DOCX / PDF"]], [2, 4]) },
        { kicker: "Privacy", title: "The model sees placeholders, and the answer gets the real values back.",
          points: ["10 kinds of personal data, including national IDs and IBANs checked with checksum and context rules.", "Uploaded content is also screened for prompt injection. (Example text.)"],
          visual: V.redact('Call <b>Sara Khan</b> on <b>+44 20 7946 0958</b> about the transfer from <b>GB29 NWBK 6016 1331 9268 19</b>.',
            'Call <span class="n">&lt;PERSON_1&gt;</span> on <span class="n">&lt;PHONE_1&gt;</span> about the transfer from <span class="n">&lt;IBAN_1&gt;</span>.<br><small class="wt-rehydrate">↩ the reply is re-hydrated with the real values</small>') },
        { kicker: "LLM gateway", title: "Code asks for a tier, never a model.",
          points: ["Each organisation's admin picks providers and a fallback order: Gemini, Claude on Vertex AI, or OCI.", "Every call is metered: reserved before, settled after."],
          visual: V.stack(V.code(`draft = <span class="k">await</span> gateway.complete(
    task=<span class="s">"press_release"</span>, tier=<span class="s">"standard"</span>,
    workspace=ws)   <span class="c"># org config picks provider + fallback</span>
meter.complete(reservation, draft.usage)`),
            V.logos([["Gemini", "gemini"], ["Claude", "spark"], ["Google Cloud", "googlecloud"], ["FastAPI", "fastapi"]])) },
        { kicker: "Quality", title: "Every draft gets a score, and a locked fact sheet.",
          points: ["The corpus score compares each draft with the five closest passages of the client's own writing.", "Claims are checked against human-verified facts; anything untraceable is blocked."],
          visual: V.weights([["Fact accuracy", 35], ["Automated QA", 25], ["Brand voice", 25], ["Match to the client's own writing", 15]]) },
        { kicker: "Results", title: "Editors review exceptions, not everything.",
          points: ["Bilingual drafts are paired and checked for drift, with language detection on every output."],
          visual: V.stack(V.stats([["−80%", "manual editorial review"], ["~100", "API routes"], ["177", "test files"]]),
            V.logos([["FastAPI", "fastapi"], ["PostgreSQL + pgvector", "postgresql"], ["Redis", "redis"], ["Gemini", "gemini"], ["Docker", "docker"]])) },
      ],
    },
    pptx: {
      title: "AI PowerPoint Automation Add-in", sub: "EZ Works · production",
      slides: [
        { kicker: "The problem", title: "Four hours per deck, fixing fonts and nudging shapes by hand.",
          points: ["Client decks arrive with mixed fonts, off-palette colours, overflowing text and misaligned shapes.", "Every one has to meet brand standards before it goes out."],
          visual: V.stats([["4 h", "of clean-up per deck"], ["5,000+", "shapes to align"], ["2,000+", "font inconsistencies"]]) },
        { kicker: "How it works", title: "A task pane inside PowerPoint, with a C# engine underneath.",
          points: ["A React task pane on WebView2 talks to the C# add-in through a bridge.", "Every change goes through PowerPoint's own object model, with undo."],
          visual: V.flow([["Ribbon + task pane", "react", "React on WebView2"], ["C# bridge", "csharp", "PowerPoint object model"], ["Scanners", "search", "fonts · colours · overflow · layouts"], ["Layout engine", "layers", "guides → safe frame → fit"], ["GPT-4", "openai", "text clean-up & fitting"], ["Writers", "check", "fix, with undo"]], [3, 4]) },
        { wide: true, kicker: "The task pane", title: "One scan, one health score, then a fix for each problem.",
          points: ["The deck gets a 0–100 health score, with every issue grouped by tool.", "Each issue can be stepped through slide by slide, or fixed all at once."],
          visual: V.shot(PX + "pane-health.webp", "The real task pane on a sample deck: health 64, 102 text issues and 5 overflowing text boxes.", "PowerPoint · Pristine task pane") },
        { kicker: "Layout", title: "Layout that respects the template's own guides — 94% automatic.",
          points: ["It reads the slide's guide lines to work out the safe area.", "Then it finds columns and groups, resolves collisions, and tightens spacing and type until everything fits."],
          visual: V.align() },
        { kicker: "Audit", title: "Fonts, colours and overflow, found and fixed deck-wide.",
          points: ["2,000+ font inconsistencies caught; 100% compliance after remediation.", "Colours snap to the brand palette, and unused master layouts are cleaned out. (Example deck.)"],
          visual: V.fonts([["Brand Sans", 412, true], ["Georgia", 37, false], ["Calibri", 128, false], ["Brand Sans Bold", 96, true], ["Times New Roman", 22, false]]) },
        { wide: true, kicker: "Audit, in the product", title: "Off-brand fonts, colours and layouts, one click from fixed.",
          points: ["Missing and off-theme fonts map to the theme's own heading and body fonts.", "Colours are matched to the brand palette; unused masters and duplicate layouts are listed for removal."],
          visual: V.shot(PX + "pane-audit.webp", "Font replacement, colour standardisation and master clean-up on the same sample deck.", "PowerPoint · Pristine task pane") },
        { kicker: "Results", title: "From an afternoon to a coffee break.",
          points: ["A 15-metric deck health score with 96% accuracy."],
          visual: V.stack(V.bars([["Minutes per deck", 240, 12, " min", true]]), V.stats([["94%", "shapes auto-aligned"], ["96%", "health-score accuracy"]]),
            V.logos([["C# / VSTO", "csharp"], ["OpenAI GPT-4", "openai"], ["React", "react"], ["PowerPoint", "powerpoint"]])) },
      ],
    },
    leadz: {
      title: "LeadzMachine", sub: "Lead generation, end to end",
      slides: [
        { kicker: "The problem", title: "Qualifying a prospect meant reading every reply by hand.",
          points: ["Profiles were collected manually, and replies were triaged one by one."],
          visual: V.stats([["Manual", "profile collection"], ["42%", "qualification accuracy"]]) },
        { kicker: "How it works", title: "From a browser extension to a scored prospect list.",
          points: ["A Chrome extension captures profiles; a Flask API on AWS stores and enriches them."],
          visual: V.flow([["Chrome extension", "javascript"], ["Flask API", "flask"], ["AWS", "aws"], ["OpenAI sentiment", "openai"], ["Qualified prospects", "target"]], [3, 4]) },
        { kicker: "Classification", title: "Every reply is read and labelled by intent.",
          points: ["An OpenAI sentiment model sorts replies so sales only chase real interest.", "(Example replies.)"],
          visual: V.classify([["Sounds interesting — can we talk Tuesday?", "Interested", true], ["Not the right time, maybe next quarter.", "Later", false], ["Please remove me from your list.", "Not interested", false], ["Can you send pricing for 20 seats?", "Interested", true]]) },
        { kicker: "Results", title: "More than double the accuracy, at 50,000+ profiles a month.",
          points: [],
          visual: V.stack(V.bars([["Qualification accuracy", 42, 89, "%", false]]), V.stats([["50,000+", "profiles a month"]]),
            V.logos([["Python", "python"], ["Flask", "flask"], ["AWS", "aws"], ["OpenAI", "openai"], ["JavaScript", "javascript"]])) },
      ],
    },
    tasks: {
      title: "Task Scheduler & Service Messaging", sub: "EZ Works · production",
      slides: [
        { kicker: "The problem", title: "Emails, notifications and scheduled work were slowing requests down.",
          points: ["Several services needed the same background work done, reliably and on time.", "Jobs had to survive restarts and retry on failure."],
          visual: V.stats([["3.2 s", "API response before"], ["1,000+", "jobs to run at once"]]) },
        { kicker: "Architecture", title: "Services publish; workers pick the job up.",
          points: ["Redis is both the Celery broker and the pub/sub bus between microservices.", "Requests return immediately; the work happens in the background."],
          visual: V.flow([["Microservices", "server", "publish events and jobs"], ["Redis", "redis", "broker + pub/sub"], ["Celery workers", "celery", "dedicated queues"], ["Email · notifications · status · schedules", "check", "done, retried, logged"]], [1, 2]) },
        { kicker: "Queues", title: "Each kind of work gets its own queue.",
          points: ["A burst of emails never delays a status update.", "Failures publish to a shared logging channel, so every service sees them."],
          visual: V.modules([["Email", "mail", "transactional mail"], ["Notifications", "alert", "activity & assignments"], ["Status updates", "check", "request lifecycle"], ["Scheduling", "flow", "timed & recurring tasks"]]) },
        { kicker: "Results", title: "Requests got four times faster.",
          points: [],
          visual: V.stack(V.bars([["API response", 3.2, 0.8, " s", true]]), V.stats([["1,000+", "concurrent background jobs"]]),
            V.logos([["Celery", "celery"], ["Redis", "redis"], ["Python", "python"], ["PostgreSQL", "postgresql"], ["Docker", "docker"]])) },
      ],
    },
    erp: {
      title: "ERP Platform APIs", sub: "EZ Works · production",
      slides: [
        { kicker: "The scope", title: "The company's back office, behind one API.",
          points: ["Around 350 endpoints across people, time, pay, money and sales."],
          visual: V.modules([["People", "users", "records & history"], ["Leave", "doc", "requests, approvals, month close"], ["Timesheets", "table", "synced with Jira"], ["Compensation", "card", "payroll & payslips"], ["Accounts", "table", "invoices, budgets, expenses"], ["Client wallets", "card", "credits & usage"], ["Sales", "target", "clients & follow-ups"], ["Reviews", "check", "performance cycles"]]) },
        { kicker: "Access control", title: "Permissions live in the database, not in the code.",
          points: ["Every view declares a feature and an action; one decorator checks it on 349 handlers.", "Responses tell the UI what the user may edit, down to individual fields. (Example roles.)"],
          visual: V.matrix(["Employee", "Manager", "HR", "Finance"], ["Own leave", "Approve", "Payroll", "Invoices"], [[1, 0, 0, 0], [1, 1, 0, 0], [1, 1, 1, 0], [1, 0, 1, 1]]) },
        { kicker: "Invoicing", title: "Invoices that build themselves.",
          points: ["Multi-currency, with Arabic VAT invoices where needed.", "100+ invoices a month; the same pipeline exports budgets and usage reports."],
          visual: V.flow([["Excel template", "table", "header, bank details, line items"], ["Fill", "code", "multi-currency rates"], ["LibreOffice", "doc", "headless → PDF"], ["S3", "aws", "stored & shared"]], [2]) },
        { kicker: "Speed", title: "Fast queries on a large relational model.",
          points: ["Joins and prefetches tuned across 100+ files, plus indexes, bulk writes and transactions.", "Slow work runs off the request path: scheduled jobs, a Redis mail worker and threaded exports."],
          visual: V.bars([["Query time", 100, 35, "%", true], ["API response", 3.2, 0.8, " s", true]]) },
        { kicker: "Results", title: "Faster APIs, tighter access, invoicing on autopilot.",
          points: [],
          visual: V.stack(V.stats([["−65%", "query time"], ["349", "permission-checked handlers"], ["8 h", "saved every week"]]),
            V.logos([["Django", "django"], ["PostgreSQL", "postgresql"], ["Redis", "redis"], ["AWS", "aws"], ["React", "react"]])) },
      ],
    },
  };

  /* ---------------------------------------------------------------- player */
  const root = document.createElement("div");
  root.className = "wt";
  root.hidden = true;
  root.setAttribute("role", "dialog");
  root.setAttribute("aria-modal", "true");
  root.innerHTML = `
    <div class="wt-box">
      <header class="wt-head">
        <div><b class="wt-title"></b><span class="wt-sub"></span></div>
        <div class="wt-progress"></div>
        <button class="wt-close" aria-label="Close walkthrough">✕</button>
      </header>
      <div class="wt-stage"></div>
      <footer class="wt-foot">
        <button class="wt-nav prev" aria-label="Previous slide">←</button>
        <span class="wt-count"></span>
        <button class="wt-nav next" aria-label="Next slide">→</button>
      </footer>
    </div>`;
  document.body.append(root);
  const stage = $(".wt-stage", root), progress = $(".wt-progress", root);

  let deck = null, key = "", idx = 0, timer = 0, paused = false, started = 0, left = SLIDE_MS, lastFocus = null;

  function render() {
    const s = deck.slides[idx];
    stage.innerHTML = `
      <div class="wt-slide${s.wide ? " wide" : ""}">
        <div class="wt-text">
          <span class="eyebrow">${s.kicker}</span>
          <h3>${hl(s.title)}</h3>
          ${s.points.length ? `<ul>${s.points.map((p) => `<li>${hl(p)}</li>`).join("")}</ul>` : ""}
        </div>
        <div class="wt-visual">${s.visual}</div>
      </div>`;
    $$(".wt-seg", progress).forEach((seg, i) => {
      // A running fill keeps going after its class is removed, so stop it explicitly.
      seg.firstElementChild.getAnimations().forEach((a) => a.cancel());
      seg.classList.toggle("done", i < idx);
      seg.classList.remove("run");
    });
    $(".wt-count", root).textContent = `${idx + 1} / ${deck.slides.length}`;
    restart();
  }
  // Each slide's segment fills while it plays; the deck advances when it's full.
  function restart() {
    clearTimeout(timer);
    const ms = deck.ms || SLIDE_MS; // a deck can set its own pace
    left = ms;
    const seg = $$(".wt-seg", progress)[idx];
    seg.style.setProperty("--ms", `${ms}ms`);
    void seg.offsetWidth;
    seg.classList.add("run");
    if (reduced) return;
    started = Date.now();
    if (!paused) timer = setTimeout(next, ms);
  }
  function pause(on) {
    if (paused === on || reduced) return;
    paused = on;
    root.classList.toggle("paused", on);
    if (on) { clearTimeout(timer); left -= Date.now() - started; }
    else { started = Date.now(); timer = setTimeout(next, Math.max(400, left)); }
  }
  const go = (i) => { idx = (i + deck.slides.length) % deck.slides.length; render(); };
  const next = () => (idx === deck.slides.length - 1 ? go(0) : go(idx + 1));

  function open(k, at = 0) {
    deck = WALKTHROUGHS[k];
    if (!deck) return;
    key = k; idx = at; paused = false;
    lastFocus = document.activeElement;
    $(".wt-title", root).textContent = deck.title;
    $(".wt-sub", root).textContent = deck.sub;
    progress.innerHTML = deck.slides.map(() => `<span class="wt-seg"><i></i></span>`).join("");
    root.hidden = false;
    document.documentElement.classList.add("wt-open");
    render();
    $(".wt-close", root).focus();
    if (location.hash !== `#walkthrough/${k}`) history.replaceState(null, "", `#walkthrough/${k}`);
  }
  function close() {
    clearTimeout(timer);
    root.hidden = true;
    document.documentElement.classList.remove("wt-open");
    if (location.hash.startsWith("#walkthrough/")) history.replaceState(null, "", "#work");
    lastFocus?.focus?.();
  }

  stage.addEventListener("click", (e) => {
    const img = e.target.closest(".wt-shot img");
    if (!img) return;
    const z = document.createElement("div");
    z.className = "wt-zoom";
    z.innerHTML = `<img src="${img.src}" alt="${img.alt}" />`;
    z.addEventListener("click", () => { z.remove(); pause(false); });
    root.append(z);
    pause(true);
  });
  $(".wt-close", root).addEventListener("click", close);
  $(".prev", root).addEventListener("click", () => go(idx - 1));
  $(".next", root).addEventListener("click", next);
  progress.addEventListener("click", (e) => { const s = e.target.closest(".wt-seg"); if (s) go($$(".wt-seg", progress).indexOf(s)); });
  root.addEventListener("click", (e) => { if (e.target === root) close(); });
  stage.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") pause(true); });
  stage.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse") pause(false); });
  addEventListener("keydown", (e) => {
    if (root.hidden) return;
    const z = $(".wt-zoom", root);
    if (e.key === "Escape" && z) { z.remove(); pause(false); return; }
    if (e.key === "Escape") close();
    else if (e.key === "ArrowRight") next();
    else if (e.key === "ArrowLeft") go(idx - 1);
    else if (e.key === " ") { e.preventDefault(); pause(!paused); }
  });
  // Swipe on touch screens.
  let sx = 0, sy = 0;
  stage.addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  stage.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) dx < 0 ? next() : go(idx - 1);
  });

  // Triggers: any [data-walkthrough] button, and #walkthrough/<key> links.
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-walkthrough]");
    if (b) { e.preventDefault(); open(b.dataset.walkthrough); }
  });
  const fromHash = () => { const m = location.hash.match(/^#walkthrough\/(\w+)/); if (m) open(m[1]); };
  addEventListener("hashchange", fromHash);
  fromHash();
  // Label every walkthrough button with its deck's real slide count.
  $$("[data-walkthrough]").forEach((b) => {
    const d = WALKTHROUGHS[b.dataset.walkthrough], label = b.querySelector(".wt-slides");
    if (d && label) label.textContent = `${d.slides.length} slides`;
  });
  window.AY.walkthroughs = Object.keys(WALKTHROUGHS);
  window.AY.walkthroughData = WALKTHROUGHS; // rag.js answers from the slides too
})();
