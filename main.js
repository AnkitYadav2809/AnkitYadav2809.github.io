/* ankit.ai — hand-built, no frameworks.
   Sections: data · icons · boot · hero · embedding space · reveals · pipeline · timeline · projects ·
   papers · skills · community · roles · RAG · palette · misc */
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(pointer: fine)").matches;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const EMAIL = "ankity19072003@gmail.com";

  /* ---------------------------------------------------------------- icons */

  // Brand logos available in assets/logos (single-color SVGs, painted with CSS masks).
  const LOGOS = new Set(["aws", "celery", "cloudflare", "cncf", "csharp", "discord", "django", "docker", "fastapi", "flask", "gemini", "git", "github", "gmail", "googlecloud", "googledrive", "html5", "huggingface", "javascript", "jira", "jwt", "kubernetes", "langchain", "langgraph", "linkedin", "linux", "microsoft", "mongodb", "mysql", "newrelic", "nginx", "ollama", "openai", "postgresql", "powerpoint", "pydantic", "python", "razorpay", "react", "redis", "slack", "spacy", "sqlalchemy", "telegram", "typescript", "vite", "whatsapp"]);
  // Generic line icons for things that have no logo (concepts, roles, features).
  const GLYPHS = {
    spark: "M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z",
    shield: "M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z M9 12l2 2 4-4",
    search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z M20 20l-4-4",
    check: "M5 12l5 5L20 7",
    route: "M4 7h9 M4 17h9 M13 7l4 5-4 5 M17 12h3",
    lock: "M6 11h12v9H6z M8 11V8a4 4 0 0 1 8 0v3",
    doc: "M7 3h7l5 5v13H7z M14 3v5h5 M10 13h6 M10 17h6",
    mic: "M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z M5 11a7 7 0 0 0 14 0 M12 18v3",
    users: "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M2 21a7 7 0 0 1 14 0 M16 3.5a4 4 0 0 1 0 7.5 M22 21a7 7 0 0 0-5-6.7",
    pen: "M4 20h4L19 9l-4-4L4 16z M14 6l4 4",
    bolt: "M13 2L4 14h7l-1 8 9-12h-7z",
    layers: "M12 3l9 5-9 5-9-5z M3 13l9 5 9-5",
    globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M3 12h18 M12 3c3 3 3 15 0 18 M12 3c-3 3-3 15 0 18",
    folder: "M3 6h6l2 2h10v11H3z",
    mail: "M3 5h18v14H3z M3 6l9 7 9-7",
    chat: "M4 5h16v11H9l-5 4z",
    alert: "M12 3l9 16H3z M12 10v4 M12 17v.5",
    code: "M8 7l-5 5 5 5 M16 7l5 5-5 5",
    table: "M3 5h18v14H3z M3 10h18 M9 10v9",
    slides: "M3 4h18 M5 4v11h14V4 M12 15v5 M8 20h8",
    server: "M4 4h16v6H4z M4 14h16v6H4z M8 7h.01 M8 17h.01",
    flow: "M6 3v12 M6 21a2.5 2.5 0 1 0 0-.01 M18 9a2.5 2.5 0 1 0 0-.01 M18 11.5c0 4-4 5.5-12 6",
    gauge: "M4 16a8 8 0 1 1 16 0 M12 16l4-5",
    card: "M3 6h18v12H3z M3 10h18 M7 15h4",
    plug: "M9 3v5 M15 3v5 M6 8h12v3a6 6 0 0 1-12 0z M12 17v4",
    target: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
    compass: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z M15.5 8.5l-2 5-5 2 2-5z",
    terminal: "M4 5h16v14H4z M7 9l3 3-3 3 M12 15h5",
  };
  const glyph = (name) => `<i class="ic" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${GLYPHS[name] || GLYPHS.spark}"/></svg></i>`;
  // A brand logo when we have it, else the fallback glyph.
  // Brand colors (tuned for the dark background). Brands whose mark is black or white are left out
  // and keep the current text color so they stay visible.
  const BRAND = {
    aws: "#FF9900", celery: "#37814A", cloudflare: "#F38020", csharp: "#9B6BF2", discord: "#5865F2",
    django: "#44B78B", docker: "#2496ED", fastapi: "#009688", gemini: "#8E75B2", git: "#F05032",
    gmail: "#EA4335", googlecloud: "#4285F4", googledrive: "#4285F4", html5: "#E34F26", huggingface: "#FFD21E",
    javascript: "#F7DF1E", jira: "#2684FF", jwt: "#FB015B", kubernetes: "#326CE5", linkedin: "#0A66C2",
    linux: "#FCC624", mongodb: "#47A248", mysql: "#4479A1", newrelic: "#1CE783", nginx: "#009639",
    postgresql: "#4169E1", powerpoint: "#D35230", pydantic: "#E92063", python: "#3776AB", razorpay: "#3395FF",
    react: "#61DAFB", redis: "#FF4438", slack: "#E01E5A", spacy: "#09A3D5", sqlalchemy: "#D71F00",
    telegram: "#26A5E4", typescript: "#3178C6", vite: "#646CFF", whatsapp: "#25D366",
  };
  const icon = (slug, fallback = "spark") =>
    LOGOS.has(slug)
      ? `<i class="lg" aria-hidden="true" style="--src:url(assets/logos/${slug}.svg)${BRAND[slug] ? `;--brand:${BRAND[slug]}` : ""}"></i>`
      : glyph(GLYPHS[slug] ? slug : fallback);
  // Numbers (80%, 4 h, 1,000+, 3.2 s, 42% → 89%) glow neon wherever they appear in copy.
  const hl = (s) => s.replace(/(?<![\w-])(\d[\d,.]*(?:\+|%|×)?(?:\s?(?:h|min|s|ms)\b)?)/g, '<span class="n">$1</span>');

  /* ---------------------------------------------------------------- data */

  const STACK_MARQUEE = [
    ["FastAPI", "fastapi"], ["pgvector", "postgresql"], ["LLM gateways", "route"], ["RAG", "search"], ["LLM-as-judge", "check"],
    ["PII redaction", "shield"], ["Gemini", "gemini"], ["OpenAI", "openai"], ["LangGraph", "langgraph"], ["Django REST", "django"],
    ["Celery", "celery"], ["Redis", "redis"], ["PostgreSQL", "postgresql"], ["AWS", "aws"], ["GCP · Vertex AI", "googlecloud"],
    ["Docker", "docker"], ["Ollama", "ollama"], ["React", "react"],
  ];

  const STAGES = [
    {
      name: "Brief intake", ico: "chat", sub: "chat → structured",
      body: "An LLM-driven conversational workflow collects content briefs: intent detection and structured extraction turn a messy chat into a language-neutral, typed brief — the single source of truth for EN and AR generation.",
      code: `<span class="k">class</span> Brief(BaseModel):
    tenant_id: UUID
    content_type: <span class="s">"press_release"</span> | <span class="s">"social"</span> | ...
    languages: list[Lang] = [<span class="s">"en"</span>, <span class="s">"ar"</span>]
    confidentiality: Tier   <span class="c"># routes models later</span>
    facts: list[FactRef]    <span class="c"># verified, not generated</span>`,
    },
    {
      name: "PII redaction", ico: "shield", sub: "tokenize · tier",
      body: "Before any text leaves the trust boundary, PII is detected and tokenized. A confidentiality tier is attached to the request so sensitive tenants can only reach approved models. The LLM sees placeholders — never people.",
      code: `<span class="c"># in</span>
<span class="a">"Call Sara Khan on +971 50 123 4567"</span>
<span class="c"># out → model</span>
<span class="s">"Call &lt;PERSON_1&gt; on &lt;PHONE_1&gt;"</span>
tier=<span class="k">CONFIDENTIAL</span>  vault.store(tokens, ttl=<span class="s">"request"</span>)`,
    },
    {
      name: "Multi-tenant RAG", ico: "search", sub: "pgvector top-k",
      body: "PII-redacted chunks embedded with Gemini, stored in pgvector. Top-k cosine retrieval is filtered by tenant, content type and language, then injected as brand-voice context. The same embeddings score brand-voice fidelity (0–100) and de-duplicate facts.",
      code: `<span class="k">SELECT</span> id, body, 1 - (emb &lt;=&gt; :q) <span class="k">AS</span> sim
<span class="k">FROM</span> chunks
<span class="k">WHERE</span> tenant_id = :t <span class="k">AND</span> lang = :lang
  <span class="k">AND</span> content_type = :ct
<span class="k">ORDER BY</span> emb &lt;=&gt; :q <span class="k">LIMIT</span> :k;`,
    },
    {
      name: "LLM gateway", ico: "route", sub: "route · meter",
      body: "One interface over Gemini, OpenAI and Vertex AI. The gateway picks a model per task and tier, meters tokens and cost per tenant, retries and falls back — so swapping a provider is configuration, not a rewrite.",
      code: `route = gateway.pick(
    task=<span class="s">"generate"</span>, tier=brief.confidentiality,
    budget=tenant.remaining_usd)
resp = <span class="k">await</span> route.complete(prompt, schema=Draft)
meter.record(tenant, resp.usage, resp.cost)`,
    },
    {
      name: "Fact-Lock", ico: "lock", sub: "verified facts only",
      body: "Facts come from a human-verified fact sheet — never from retrieved chunks or the model's memory. Any number, name or claim in the draft that can't be traced back to a locked fact is caught before a human ever sees it.",
      code: `<span class="k">for</span> claim <span class="k">in</span> extract_claims(draft):
    <span class="k">if not</span> fact_sheet.supports(claim):
        <span class="k">raise</span> <span class="r">Unverified</span>(claim)  <span class="c"># never ships</span>`,
    },
    {
      name: "Evals", ico: "check", sub: "block · flag · pass",
      body: "14 deterministic checks (terminology, length, banned phrases, numbers, format…) plus an LLM-as-judge rubric over 8 dimensions. Severity-gated verdicts: BLOCK stops it, FLAG routes to an editor, PASS ships. Manual editorial review dropped by 80%.",
      code: `checks  = run_deterministic(draft)      <span class="c"># 14</span>
rubric  = judge.score(draft, dims=8)
verdict = gate(checks, rubric)
<span class="c"># → </span><span class="s">PASS</span> | <span class="a">FLAG</span> | <span class="r">BLOCK</span>`,
    },
  ];

  // Experience, newest first. Each point: an eye-catching headline, then one line of detail.
  const EXPERIENCE = [
    {
      org: "EZ Works", role: "Backend Engineer · AI platforms", when: "Nov 2024 — Present", kind: "Work",
      ladder: ["Backend Intern", "Junior Backend Engineer", "Backend Engineer"],
      stack: ["fastapi", "gemini", "postgresql", "django", "celery", "redis", "openai", "csharp"],
      points: [
        ["A governed GenAI platform", "Multi-tenant content generation (FastAPI, Gemini) on a provider-agnostic LLM gateway: model routing, cost metering, PII redaction and Fact-Lock grounding.", "wide"],
        ["80% less editorial review", "An LLM eval framework: 14 deterministic checks plus an 8-dimension LLM-as-judge with BLOCK / FLAG verdicts."],
        ["Multi-tenant RAG on pgvector", "PII-redacted chunks and Gemini embeddings, filtered by tenant, content type and language. The same embeddings drive a 0–100 brand-voice score."],
        ["English and Arabic from one brief", "Bilingual generation with terminology and style-rule enforcement, plus a chat that collects briefs as structured data."],
        ["4 h → 12 min per deck", "PowerPoint automation with LLM layout-fitting and font audits, shipped as a C# add-in."],
        ["65% faster ERP queries", "Django REST APIs for leave, attendance, payroll and invoicing at 1,000+ transactions a day; RBAC across 150+ endpoints; invoicing that saves 8 h a week."],
        ["3.2 s → 0.8 s API responses", "A Celery task scheduler for 1,000+ concurrent jobs, with microservices talking over Redis pub/sub."],
        ["500+ qualified prospects a month", "Outreach platform with LinkedIn automation and OpenAI lead scoring; 80% of qualification automated.", "wide"],
      ],
    },
    {
      org: "Cloud Native Gurugram", role: "Co-founder & Lead Organizer (CNCF)", when: "Sep 2023 — Present", kind: "Community",
      stack: ["cncf", "kubernetes"],
      points: [
        ["Co-founded the city's CNCF chapter", "Built Cloud Native Gurugram from zero into a 1,200+ member community."],
        ["18+ meetups and workshops", "Themes, speakers, sponsors and run-of-show, from 30-person mornings to full build days."],
        ["On stage as host", "Emcee, panel moderator and open-mic host — the cure for a fear of public speaking.", "wide"],
      ],
    },
    {
      org: "Datapool Club, Sharda University", role: "Club Lead", when: "Apr 2023 — Aug 2024", kind: "Community",
      stack: ["python"],
      points: [
        ["Led a 10-member core team", "Planned and ran the university's data science club: events, speakers and outreach."],
        ["Kaggle & data science workshops", "Organised meetups and hands-on workshops, from Kaggle competitions to data science fundamentals."],
        ["100+ students mentored", "Guided students into data science through events, workshops and seminars.", "wide"],
      ],
    },
    {
      org: "Bhramaand", role: "Backend Developer Intern", when: "Jun — Nov 2023", kind: "Work",
      stack: ["python", "aws", "razorpay"],
      points: [
        ["97% less manual data collection", "An asynchronous LinkedIn data pipeline on AWS EC2 and S3 handling 10,000+ profiles a month."],
        ["Payments, secured", "Razorpay integration with encryption for transaction safety."],
      ],
    },
    {
      org: "Kartavya NGO", role: "Volunteer", when: "Apr 2022 — Sep 2023", kind: "Community",
      stack: [],
      points: [
        ["12+ technical workshops", "For underprivileged students, plus JEE mentoring for Class 12 students.", "wide"],
      ],
    },
  ];

  const DEVLENS_FEATURES = [
    ["shield", "Privacy gateway first", "Secrets, names and emails are redacted before any model sees them."],
    ["doc", "Answers with receipts", "Every claim quotes its source; a second pass checks it's supported."],
    ["flow", "An agent that investigates", "A LangGraph agent picks its own tools: code, commits, CI, incidents."],
    ["code", "Code-aware", "Answers cite file and line, linked to the exact commit."],
    ["alert", "Incidents → postmortems", "Live timelines become postmortems that future debugging reuses."],
    ["plug", "An MCP server", "Claude Code and Cursor can query a project's knowledge, read-only."],
  ];
  const DEVLENS_STACK = [["FastAPI", "fastapi"], ["LangGraph", "langgraph"], ["LangChain", "langchain"], ["pgvector", "postgresql"], ["Redis", "redis"], ["Ollama", "ollama"], ["spaCy", "spacy"], ["React", "react"], ["TypeScript", "typescript"], ["Vite", "vite"], ["Docker", "docker"]];

  const PROJECTS = [
    {
      title: "Governed GenAI Content Platform", wt: "genai", tag: "Production", sub: "Multi-tenant, bilingual, fact-locked.",
      text: "A provider-agnostic gateway with cost metering and confidentiality-tier routing. Facts come from a human-verified sheet — never from retrieved chunks.",
      stats: [["−80%", "editorial review"], ["14 + 8", "checks + judge dimensions"], ["EN · AR", "languages"]],
      stack: [["FastAPI", "fastapi"], ["Gemini", "gemini"], ["pgvector", "postgresql"]],
    },
    {
      title: "AI PowerPoint Automation Add-in", wt: "pptx", tag: "Production", sub: "LLM layout-fitting and font audits inside PowerPoint.",
      text: "Font auditing caught 2,000+ inconsistencies; a layout algorithm aligned 5,000+ shapes; a 15-metric deck health score with 96% accuracy.",
      stats: [["4 h → 12 min", "per deck"], ["94%", "shapes auto-aligned"]],
      stack: [["C# / VSTO", "csharp"], ["OpenAI", "openai"], ["PowerPoint", "powerpoint"]],
    },
    {
      title: "LeadzMachine", wt: "leadz", tag: "Shipped", sub: "LinkedIn lead generation, end to end.",
      text: "A full-stack system capturing 50,000+ profiles a month, with an OpenAI sentiment model classifying prospect replies.",
      stats: [["42% → 89%", "qualification accuracy"], ["50,000+", "profiles a month"]],
      stack: [["Flask", "flask"], ["AWS", "aws"], ["OpenAI", "openai"]],
    },
    {
      title: "ERP Platform APIs", wt: "erp", tag: "Production", sub: "Leave, attendance, payroll and invoicing.",
      text: "1,000+ daily transactions, RBAC on 150+ endpoints, and an automated invoice pipeline for 100+ invoices a month.",
      stats: [["−65%", "query time"], ["~350", "API endpoints"]],
      stack: [["Django", "django"], ["PostgreSQL", "postgresql"], ["Redis", "redis"]],
    },
    {
      title: "Task Scheduler & Service Messaging", wt: "tasks", tag: "Production", sub: "Background jobs and events for a microservice platform.",
      text: "A Celery worker service with dedicated queues for email, notifications, status updates and scheduling; services publish and subscribe to each other over Redis.",
      stats: [["1,000+", "concurrent jobs"], ["3.2 s → 0.8 s", "API response"]],
      stack: [["Celery", "celery"], ["Redis", "redis"], ["Python", "python"]],
    },
  ];

  // Research papers, rendered as page previews. `key` is the one-line takeaway; `bars` draws the mini figure.
  const PAPERS = [
    {
      title: "Machine Learning-Based Image Analysis for Cotton Crop Health: A Comparative Study",
      venue: "IEEE · MRIE 2025", short: "IEEE", date: "Jul 2025",
      url: "https://ieeexplore.ieee.org/document/11156686",
      key: "Compared five CNNs for cotton health: <b>Inception V3</b> reached 98.83% on disease and 98.72% on pest detection.",
      abstract: "Cotton is one of India's major cash crops, contributing significantly to the agricultural economy and supporting millions of farmers. However, cotton crops are highly susceptible to various diseases and pests, which adversely impact yield and quality. This research evaluates multiple deep learning models, including Inception V3, VGG-16, ResNet 50, VGG-19, and EfficientNetV2-L, for cotton disease classification and pest identification. The study employs data augmentation techniques to address class imbalance and enhance model performance. The Inception V3 model demonstrated the highest accuracy, achieving 98.83% for disease classification and 98.72% for pest identification, followed closely by VGG-16 and VGG-19, while ResNet 50 and EfficientNetV2-L underperformed in comparison. These findings underscore the efficacy of deep learning in smart agriculture and provide insights into optimal model selection for real-world applications. The results highlight the potential of AI-driven solutions in improving cotton crop management, leading to higher yields and sustainable farming practices.",
      tags: ["Smart agriculture", "Model comparison"], bars: [0.99, 0.97, 0.96, 0.8, 0.72],
    },
    {
      title: "Transforming Dermatological Diagnosis: Deep Learning Approaches for Skin Disease Detection in the Digital Era",
      venue: "ACM · AICCONF '24", short: "ACM", date: "Jun 2024",
      url: "https://dl.acm.org/doi/10.1145/3660853.3660924",
      key: "Compared <b>VGG-16</b>, <b>ResNet50</b> and <b>Inception V3</b> on three skin conditions: speed vs. accuracy.",
      abstract: "A comparative study of three widely used deep learning models — VGG-16, ResNet50 and Inception V3 — for identifying three common skin conditions: herpes, atopic dermatitis and acne. Models were assessed on predictive performance, training duration and computational efficiency. VGG-16 and ResNet50 proved computationally efficient, while Inception V3 trained more slowly due to its more complex architecture — giving dermatologists and researchers an evidence base for choosing faster image-processing models.",
      tags: ["CNN", "Model comparison"], bars: [0.8, 0.85, 0.55],
    },
    {
      title: "Skin Disease Recognition by VGG-16 Model",
      venue: "Springer Nature Singapore", short: "Springer", date: "Jul 2023",
      url: "https://link.springer.com/chapter/10.1007/978-981-99-3315-0_64",
      key: "A transfer-learned <b>VGG-16</b> classifier for dermatitis, herpes and acne.",
      abstract: "Most early symptoms of skin disease are visible, so automated detection can catch them in time. This work proposes a CNN classifier built on VGG-16 — with image resizing, transfer-learned weights and data augmentation — that categorises three skin conditions: dermatitis, herpes and acne.",
      tags: ["Computer vision", "Transfer learning"], bars: [0.5, 0.7, 0.9, 0.75],
    },
  ];

  // Skills with receipts, in rows that slide in opposite directions. [name, logo/glyph, area, where it was used]
  const SKILL_ROWS = [
    [
      ["LangGraph", "langgraph", "AI & LLM", "DevLens debug workflow and investigation agent, with a Postgres checkpointer"],
      ["RAG", "search", "AI & LLM", "Multi-tenant pgvector retrieval at EZ · DevLens knowledge search"],
      ["Gemini / Vertex AI", "gemini", "AI & LLM", "Production generation and embeddings at EZ"],
      ["LLM evals", "check", "AI & LLM", "14 deterministic checks + LLM-as-judge at EZ · DevLens eval runs"],
      ["OpenAI GPT-4", "openai", "AI & LLM", "PowerPoint add-in · lead scoring and sentiment classification"],
      ["LangChain", "langchain", "AI & LLM", "DevLens model layer: chat models, embeddings, text splitters"],
      ["LLM-as-judge", "target", "AI & LLM", "8-dimension rubric with BLOCK / FLAG verdicts · DevLens claim checks"],
      ["Ollama", "ollama", "AI & LLM", "DevLens runs fully local models, so data never leaves the machine"],
      ["MCP servers", "plug", "AI & LLM", "DevLens exposes read-only project tools to Claude Code and Cursor"],
      ["Hallucination control", "lock", "AI & LLM", "Fact-Lock at EZ · evidence-quoting claims in DevLens"],
      ["Prompt & context engineering", "pen", "AI & LLM", "Brand-voice context injection · DevLens analysis prompts"],
      ["Multilingual EN / AR", "globe", "AI & LLM", "Bilingual generation with terminology enforcement at EZ"],
    ],
    [
      ["Python", "python", "Backend", "Everything since 2023"],
      ["FastAPI", "fastapi", "Backend", "GenAI platform at EZ · DevLens API with SSE and OAuth"],
      ["Django / DRF", "django", "Backend", "ERP: leave, attendance, payroll, invoicing; 150+ endpoints"],
      ["PostgreSQL", "postgresql", "Data", "ERP schema tuning (65% faster queries) · DevLens"],
      ["pgvector", "layers", "Data", "Multi-tenant vector search at EZ · DevLens knowledge store"],
      ["Redis", "redis", "Data", "Queues, rate limiting, OAuth state and caching"],
      ["Celery", "celery", "Backend", "1,000+ concurrent background jobs at EZ"],
      ["SQLAlchemy", "sqlalchemy", "Data", "DevLens async models with Alembic migrations"],
      ["Flask", "flask", "Backend", "LeadzMachine"],
      ["C# / VSTO", "csharp", "Backend", "AI PowerPoint automation add-in"],
      ["MongoDB", "mongodb", "Data", "Earlier projects and data pipelines"],
      ["MySQL", "mysql", "Data", "Earlier projects and data pipelines"],
    ],
    [
      ["Docker", "docker", "Infra", "Postgres + pgvector + Redis stacks; service packaging"],
      ["AWS", "aws", "Infra", "EC2, S3, IAM, RDS: the LinkedIn pipeline at Bhramaand · LeadzMachine"],
      ["Google Cloud", "googlecloud", "Infra", "Vertex AI, Drive API service accounts · Google Cloud ML certification"],
      ["React", "react", "Frontend", "DevLens UI: chat, debug, insights dashboards, connectors"],
      ["TypeScript", "typescript", "Frontend", "DevLens UI"],
      ["PII redaction", "shield", "Security", "Tokenized PII at EZ · Presidio + spaCy Privacy Gateway in DevLens"],
      ["OAuth 2.0", "key", "Security", "DevLens “Connect with…” for GitHub, Slack, Jira and Google"],
      ["JWT sessions", "jwt", "Security", "DevLens access tokens and rotating refresh sessions"],
      ["Cloudflare", "cloudflare", "Infra", "HTTPS tunnels for OAuth callbacks in local development"],
      ["JavaScript", "javascript", "Frontend", "This site (no frameworks) · LeadzMachine's Chrome extension"],
      ["Public speaking", "mic", "Community", "Hosting Cloud Native Gurugram meetups, panels and open mics"],
      ["Mentoring", "users", "Community", "100+ students at Datapool Club · JEE mentoring at Kartavya NGO"],
    ],
  ];
  GLYPHS.key = "M2.6 17.4A2 2 0 0 0 2 18.8V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.2a2 2 0 0 0 1.4-.6l.8-.8a6.5 6.5 0 1 0-4-4z M16.5 7.5h.01";

  const INTEGRATIONS = [
    ["Slack", "slack", "OAuth app + bot token; channels and threads synced daily", "DevLens"],
    ["GitHub", "github", "GitHub App: issues, PRs, commits, CI and code with line citations", "DevLens"],
    ["Jira Cloud", "jira", "Atlassian OAuth 2.0 (3LO), JQL sync, rotating refresh tokens", "DevLens"],
    ["Google Drive", "googledrive", "Docs, Sheets, Slides and PDFs from shared folders", "DevLens"],
    ["Local code folders", "folder", "File-by-file code indexing, skips vendored and binary files", "DevLens"],
    ["Chat exports", "whatsapp", "WhatsApp, Telegram, Discord and JSON imports, redacted then reviewed", "DevLens"],
    ["Google Gemini", "gemini", "Generation and embeddings behind a provider-agnostic gateway", "EZ"],
    ["OpenAI", "openai", "GPT-4 deck clean-up, sentiment and lead scoring", "EZ"],
    ["Ollama", "ollama", "Local chat and embedding models, with usage metering", "DevLens"],
    ["Email (SMTP)", "gmail", "Invites, password resets and weekly digest emails", "DevLens"],
    ["LinkedIn automation", "linkedin", "Outreach and prospect extraction pipelines", "EZ · Bhramaand"],
    ["Razorpay", "razorpay", "Payments with encryption for transaction safety", "Bhramaand"],
  ];

  // Cloud Native Gurugram events (public listings on community.cncf.io). `img` is a photo or banner in assets/events.
  const EVENTS = [
    { title: "Kube8s AI Connect: The Build Day", imgs: ["assets/events/kube8s-1.webp", "assets/events/kube8s-2.webp", "assets/events/kube8s-3.webp"], date: "Oct 10, 2026", place: "Gurugram", url: "https://www.linkedin.com/feed/update/urn:li:activity:7515433996139315200/" },
    { title: "Agentic Mornings", imgs: ["assets/events/agentic-mornings-1.webp", "assets/events/agentic-mornings-2.webp"], date: "May 16, 2026", place: "EPAM Systems, Gurugram", url: "https://www.linkedin.com/feed/update/urn:li:activity:7461437798856888320/" },
    { title: "#cTENcf Birthday Bash Gurugram", imgs: ["assets/events/ctencf-birthday-bash.webp"], date: "Aug 30, 2025", place: "Gurugram" },
    { title: "Infra in the Cloud", url: "https://www.linkedin.com/posts/ankit-yadav2809_cloudnative-cncf-cncgurugram-ugcPost-7337163914486403072-jjDK/", imgs: ["assets/events/infra-1.webp", "assets/events/infra-2.webp", "assets/events/infra-3.webp"], date: "Jun 7, 2025", place: "Gurugram" },
    { title: "Cloud Native Mixer", imgs: ["assets/events/mixer-1.webp", "assets/events/mixer-2.webp", "assets/events/mixer-3.webp"], date: "Mar 22, 2025", place: "Gurugram", url: "https://www.linkedin.com/feed/update/urn:li:activity:7309460857745285120/" },
    { title: "Jingle & Cloud Fest", imgs: ["assets/events/jingle-and-cloud-fest.webp"], date: "Dec 21, 2024", place: "Gurugram" },
    { title: "Code & Cake: CNCG Gurugram Birthday Bash", imgs: ["assets/events/code-and-cake.webp"], date: "Oct 26, 2024", place: "Gurugram" },
    { title: "Sustainable Hacktober", imgs: ["assets/events/sustainable-hacktober.webp"], date: "Oct 5, 2024", place: "Gurugram" },
    { title: "Phippy & Friends Tech Meetup", imgs: ["assets/events/phippy-and-friends.webp"], date: "Jul 27, 2024", place: "Gurugram" },
    { title: "CloudAI ProMeetup", imgs: ["assets/events/cloudai-promeetup.webp"], date: "Jun 2024", place: "Gurugram" },
    { title: "Kloud Konnect", imgs: ["assets/events/kloud-konnect.webp"], date: "Feb 2024", place: "Gurugram" },
  ];
  // Sponsors & host partners. `img` is the real logo in assets/sponsors, when we have it.
  const PARTNERS = [
    { name: "Google for Developers", img: "assets/sponsors/google-for-developers-on-dark.svg" }, { name: "ThoughtWorks", img: "assets/sponsors/thoughtworks-on-dark.svg" }, { name: "EPAM Systems", img: "assets/sponsors/epam.svg" }, { name: "Devtron", img: "assets/sponsors/devtron.svg" },
    { name: "Loft Labs", img: "assets/sponsors/loft-labs.svg" }, { name: "Opstree Solutions", img: "assets/sponsors/opstree.png" }, { name: "BuildPiper", img: "assets/sponsors/buildpiper.png", invert: true }, { name: "Masters' Union", img: "assets/sponsors/masters-union.png" },
    { name: "Orangewood", img: "assets/sponsors/orangewood.png" }, { name: "certdirectory.io", img: "assets/sponsors/certdirectory.svg", label: "CertDirectory" }, { name: "Tirith", img: "assets/sponsors/tirith.svg", label: "Tirith · StackGuardian" }, { name: "TMS", img: "assets/sponsors/tms.png", label: "The Monika Rajput Stack" },
  ];

  // Roles that fit the experience above. fit: primary | strong | open
  const ROLES = [
    { title: "AI / LLM Engineer", ico: "spark", fit: "primary", why: "Shipping GenAI that holds up in production: RAG, evals, guardrails, gateways.", bring: ["A governed multi-tenant GenAI platform in prod", "Evals that cut manual review by 80%"] },
    { title: "Applied AI Engineer", ico: "target", fit: "primary", why: "Turning a business workflow into an AI feature people trust and use.", bring: ["4 h → 12 min deck automation", "42% → 89% lead qualification"] },
    { title: "AI Platform Engineer", ico: "route", fit: "primary", why: "The layer every AI feature shares: gateways, routing, metering, tenancy.", bring: ["Provider-agnostic LLM gateway", "Per-tenant cost metering and tier routing"] },
    { title: "Backend Engineer (Python)", ico: "server", fit: "primary", why: "Owning core services, data models and the async machinery underneath.", bring: ["FastAPI and Django at production scale", "65% faster queries, 3.2 s → 0.8 s APIs"] },
    { title: "LLM Evaluation Engineer", ico: "check", fit: "strong", why: "Making model quality measurable: eval sets, judges, regression gates.", bring: ["14 checks + 8-dimension LLM-as-judge", "Claim-by-claim verification in DevLens"] },
    { title: "AI Privacy & Guardrails Engineer", ico: "shield", fit: "strong", why: "Keeping secrets and personal data out of prompts by design.", bring: ["PII tokenization before every model call", "Fact-Lock: no unverified claim ships"] },
    { title: "Forward Deployed Engineer", ico: "compass", fit: "strong", why: "Embedding with customers and wiring AI into their real systems.", bring: ["12 integrations: Slack, GitHub, Jira, Drive…", "Comfortable in front of a room"] },
    { title: "Developer Relations", ico: "mic", fit: "strong", why: "The bridge between engineers and a product: talks, demos, docs, community.", bring: ["Co-founded a 1,200+ member CNCF group", "18+ meetups hosted"] },
    { title: "Founding Engineer", ico: "bolt", fit: "open", why: "Zero-to-one products where backend, AI and product judgement all matter.", bring: ["Built DevLens end-to-end, solo", "API, infra and UI"] },
    { title: "Solutions Engineer · GenAI", ico: "users", fit: "open", why: "Designing the right AI architecture with customers, then proving it works.", bring: ["RAG, evals and gateways explained simply", "3 published papers"] },
  ];


  /* ---------------------------------------------------------------- boot */
  document.documentElement.classList.add("js");
  const boot = $("#boot");
  async function runBoot() {
    let seen = false;
    try { seen = sessionStorage.getItem("booted") === "1"; } catch (_) {}
    if (reduced || seen) { boot.classList.add("done"); return; }
    const lines = [
      "[ok] loading weights: ankit-v2.1 (backend + ai)",
      "[ok] connecting pgvector … 22 facts indexed",
      "[ok] privacy gateway: armed",
      "[ok] evals: 14 checks · judge ready",
      "> serving on https://ankit.ai",
    ];
    const pre = $("#bootLog");
    for (const l of lines) {
      pre.innerHTML += l.replace("[ok]", '<span class="ok">[ok]</span>') + "\n";
      await sleep(170);
    }
    await sleep(250);
    boot.classList.add("done");
    try { sessionStorage.setItem("booted", "1"); } catch (_) {}
  }

  /* ---------------------------------------------------------------- hero stream */
  async function streamHero() {
    const el = $("#heroStream");
    const text =
      "Hi, I'm Ankit — an AI software engineer. I build governed GenAI platforms: provider-agnostic LLM gateways, multi-tenant RAG on pgvector, and eval frameworks that BLOCK hallucinations before they ship.";
    const toks = text.match(/\S+\s*/g);
    const caret = document.createElement("span");
    caret.className = "caret";
    el.append(caret);
    const t0 = performance.now();
    let n = 0;
    for (const t of toks) {
      const s = document.createElement("span");
      s.className = /governed|BLOCK|hallucinations/.test(t) ? "tok hot" : "tok";
      s.textContent = t;
      el.insertBefore(s, caret);
      n += Math.max(1, Math.round(t.trim().length / 4));
      $("#tokCount").textContent = n;
      $("#tokRate").textContent = Math.round(n / ((performance.now() - t0) / 1000 || 1));
      if (!reduced) await sleep(45 + Math.random() * 70);
    }
  }

  /* ---------------------------------------------------------------- embedding space */
  function embeddingSpace() {
    const cv = $("#embedSpace");
    const ctx = cv.getContext("2d");
    const words = ["FastAPI", "pgvector", "RAG", "Gemini", "GPT-4", "evals", "LLM-as-judge", "PII", "Fact-Lock", "Django", "Redis", "Celery", "Postgres", "AWS", "Vertex AI", "embeddings", "guardrails", "RBAC", "JWT", "Docker", "LangGraph", "cosine", "top-k", "tenants", "EN/AR", "SSE", "OAuth", "gateway", "prompt", "context"];
    let W, H, DPR, pts = [];
    const mouse = { x: -9999, y: -9999, active: false };

    function resize() {
      DPR = Math.min(devicePixelRatio || 1, 2);
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = W * DPR; cv.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const count = Math.round(Math.min(150, (W * H) / 9000));
      pts = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.6,
        w: i < words.length ? words[i] : null,
        glow: 0,
      }));
    }
    resize();
    addEventListener("resize", resize);
    const hero = $(".hero");
    hero.addEventListener("pointermove", (e) => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.active = true; });
    hero.addEventListener("pointerleave", () => { mouse.active = false; });

    let visible = true;
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(cv);

    let t = 0;
    function frame() {
      requestAnimationFrame(frame);
      if (!visible) return;
      t += 0.004;
      ctx.clearRect(0, 0, W, H);
      // idle "query" wanders when no pointer, so the effect is visible on touch devices too
      const q = mouse.active ? mouse : { x: W * (0.62 + 0.22 * Math.cos(t * 1.3)), y: H * (0.5 + 0.28 * Math.sin(t * 2.1)) };
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        p.d = Math.hypot(p.x - q.x, p.y - q.y);
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 110) {
            ctx.strokeStyle = `rgba(236,235,230,${0.05 * (1 - d / 110)})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      const topk = [...pts].sort((a, b) => a.d - b.d).slice(0, 6);
      const set = new Set(topk);
      topk.forEach((p) => {
        const sim = Math.max(0, 1 - p.d / 600);
        const grd = ctx.createLinearGradient(q.x, q.y, p.x, p.y);
        grd.addColorStop(0, "rgba(198,244,50,0.7)");
        grd.addColorStop(1, "rgba(198,244,50,0.08)");
        ctx.strokeStyle = grd;
        ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(q.x, q.y); ctx.lineTo(p.x, p.y); ctx.stroke();
        ctx.font = "10px JetBrains Mono, monospace";
        ctx.fillStyle = "rgba(198,244,50,0.75)";
        ctx.fillText((p.w ? p.w + " " : "") + sim.toFixed(2), p.x + 7, p.y - 6);
      });
      for (const p of pts) {
        p.glow += ((set.has(p) ? 1 : 0) - p.glow) * 0.08;
        ctx.fillStyle = p.glow > 0.05 ? `rgba(198,244,50,${0.4 + p.glow * 0.6})` : p.w ? "rgba(236,235,230,0.55)" : "rgba(236,235,230,0.28)";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r + p.glow * 2, 0, Math.PI * 2); ctx.fill();
        if (p.w && p.glow < 0.5) {
          ctx.font = "10px JetBrains Mono, monospace";
          ctx.fillStyle = "rgba(236,235,230,0.32)";
          ctx.fillText(p.w, p.x + 6, p.y + 3);
        }
      }
      ctx.strokeStyle = "rgba(198,244,50,0.9)";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(q.x, q.y, 6, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(q.x, q.y, 14 + Math.sin(t * 20) * 3, 0, Math.PI * 2); ctx.strokeStyle = "rgba(198,244,50,0.25)"; ctx.stroke();
    }
    if (!reduced) frame();
    else { t = 1; frame(); }
  }

  /* ---------------------------------------------------------------- reveals + counters */
  function reveals() {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("in");
        $$(".count", e.target).forEach(countUp);
        io.unobserve(e.target);
      }
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    $$(".reveal").forEach((el, i) => { el.style.transitionDelay = `${(i % 3) * 80}ms`; io.observe(el); });
  }
  function countUp(el) {
    const to = parseFloat(el.dataset.to), dec = +(el.dataset.dec || 0);
    const fmt = (v) => (dec ? v.toFixed(dec) : Math.round(v).toLocaleString("en-US"));
    if (reduced) { el.textContent = fmt(to); return; }
    const t0 = performance.now(), dur = 1600;
    (function step(now) {
      const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 4);
      el.textContent = fmt(to * e);
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }
  const inView = (el) => { const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; };

  /* ---------------------------------------------------------------- loops (marquees & carousels) */
  // Fills `root` with a track holding the items twice; CSS slides it by half its width, forever.
  // Speed is in px/s, so long and short rows move at the same pace.
  function loop(root, items, { speed = 40, rev = false } = {}) {
    const html = items.join("");
    root.innerHTML = `<div class="${root.classList.contains("marquee") ? "marquee-track" : "carousel-track"}${rev ? " rev" : ""}">${html}<span class="loop-copy" style="display:contents">${html}</span></div>`;
    const track = root.firstElementChild;
    // The copy is decoration: keep it out of the tab order and away from screen readers.
    const copy = track.querySelector(".loop-copy");
    copy.setAttribute("aria-hidden", "true");
    $$("a, button", copy).forEach((el) => el.setAttribute("tabindex", "-1"));
    const fit = () => track.style.setProperty("--dur", `${Math.max(12, track.scrollWidth / 2 / speed)}s`);
    fit();
    addEventListener("load", fit, { once: true });
    return track;
  }

  /* ---------------------------------------------------------------- stack marquee */
  function stackMarquee() {
    const root = $("#stackMarquee").parentElement;
    root.removeChild($("#stackMarquee"));
    loop(root, STACK_MARQUEE.map(([n, s]) => `<span>${icon(s)}${n}</span>`), { speed: 45 });
  }

  /* ---------------------------------------------------------------- pipeline: one stage after another */
  function pipeline() {
    const wrap = $("#pipeline"), detail = $("#stageDetail"), list = $("#stages"), timerBar = $(".stage-timer", wrap);
    const rail = $(".rail", wrap), n = STAGES.length;
    const DWELL = reduced ? 8000 : 4600, TRAVEL = 700;
    list.innerHTML = STAGES.map((s, i) => `
      <button class="stage" data-i="${i}" aria-label="Stage ${i + 1}: ${s.name}">
        <span class="stage-num">0${i + 1}</span>
        <span class="stage-ico">${glyph(s.ico)}</span>
        <span class="stage-name">${s.name}</span>
        <span class="stage-sub">${s.sub}</span>
      </button>`).join("");
    const stages = $$(".stage", list);

    // The rail runs from the first stage's center to the last one's.
    function placeRail() {
      const wr = wrap.getBoundingClientRect();
      const a = stages[0].getBoundingClientRect(), b = stages[n - 1].getBoundingClientRect();
      rail.style.left = `${a.left - wr.left + a.width / 2}px`;
      rail.style.width = `${b.left - a.left}px`;
      rail.style.top = `${a.top - wr.top + a.height / 2}px`;
    }
    const setRail = (k, ms) => { rail.style.setProperty("--t", `${ms}ms`); rail.style.setProperty("--p", `${(k / (n - 1)) * 100}%`); };

    let current = -1, timer = 0;
    function activate(k) {
      current = k;
      stages.forEach((s, j) => { s.classList.toggle("active", j === k); s.classList.toggle("done", j < k); });
      const s = STAGES[k];
      detail.innerHTML = `<div class="fade-swap"><span class="step">Stage ${k + 1} of ${n}</span><h3>${s.name}</h3><p>${hl(s.body)}</p></div><div class="code fade-swap">${s.code}</div>`;
      timerBar.style.setProperty("--dwell", `${DWELL}ms`);
      timerBar.classList.remove("run"); void timerBar.offsetWidth; timerBar.classList.add("run");
      clearTimeout(timer);
      timer = setTimeout(advance, DWELL);
    }
    // The packet travels along the rail first; the next stage lights up when it arrives.
    function goTo(k) {
      clearTimeout(timer);
      const back = k < current;
      setRail(k, back ? 0 : TRAVEL);
      if (back || reduced) activate(k);
      else timer = setTimeout(() => activate(k), TRAVEL);
    }
    function advance() {
      if (!inView(wrap)) { timer = setTimeout(advance, 800); return; }
      if (current === n - 1) {
        // Hold on the finished pipeline, then start over from stage 1.
        stages.forEach((s) => s.classList.add("done"));
        timer = setTimeout(() => goTo(0), 1400);
      } else goTo(current + 1);
    }
    list.addEventListener("click", (e) => { const b = e.target.closest(".stage"); if (b) goTo(+b.dataset.i); });

    placeRail();
    addEventListener("resize", placeRail);
    setRail(0, 0);
    activate(0);
    clearTimeout(timer);
    // Start the sequence when the pipeline scrolls into view, so it always begins at stage 1.
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      placeRail();
      activate(0);
    }, { threshold: 0.35 });
    io.observe(wrap);
  }

  /* ---------------------------------------------------------------- experience timeline */
  function timeline() {
    const root = $("#timeline");
    root.insertAdjacentHTML("beforeend", EXPERIENCE.map((x) => `
      <article class="tl-role">
        <span class="tl-dot" aria-hidden="true"></span>
        <header class="tl-head">
          <span class="tl-when">${x.when}</span>
          <h3>${x.org}</h3>
          <p class="tl-title">${x.role}</p>
          <span class="tag tl-kind${x.kind === "Work" ? " pass" : ""}">${x.kind}</span>
          ${x.note ? `<p class="tl-note">${x.note}</p>` : ""}
          ${x.ladder ? `<ol class="tl-ladder" aria-label="Promotions">${x.ladder.map((r, i) => `<li${i === x.ladder.length - 1 ? ' class="now"' : ""}>${r}</li>`).join("")}</ol>` : ""}
          ${x.stack.length ? `<div class="tl-stack">${x.stack.map((s) => `<span title="${s}">${icon(s)}</span>`).join("")}</div>` : ""}
        </header>
        <div class="tl-points">
          ${x.points.map(([h, p, w], i) => `<div class="pt${w ? " wide" : ""}" style="transition-delay:${i * 90}ms"><h4>${hl(h)}</h4><p>${hl(p)}</p></div>`).join("")}
        </div>
      </article>`).join(""));

    // Each role "loads" as it scrolls in; the line fills down to the reader's position.
    const roles = $$(".tl-role", root), fill = $(".tl-line i", root);
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -25% 0px" });
    roles.forEach((r) => io.observe(r));
    let ticking = false;
    const update = () => {
      ticking = false;
      const r = root.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height));
      fill.style.setProperty("--fill", `${p * 100}%`);
    };
    addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  /* ---------------------------------------------------------------- projects */
  const PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>';
  const WT_LEN = { devlens: 6, genai: 6, pptx: 5, leadz: 4, erp: 5, tasks: 4 };
  function projects() {
    $("#dlWalk").innerHTML = `<span class="wt-play">${PLAY}</span>Watch the walkthrough <span class="dim">${WT_LEN.devlens} slides</span>`;
    $("#dlFeatures").innerHTML = DEVLENS_FEATURES.map(([ico, h, p]) => `
      <div class="feature"><span class="feature-ico">${glyph(ico)}</span><div><h4>${h}</h4><p>${p}</p></div></div>`).join("");
    $("#dlStack").innerHTML = DEVLENS_STACK.map(([n, s]) => `<span class="logo-chip">${icon(s)}${n}</span>`).join("");
    $("#projectCards").innerHTML = PROJECTS.map((p) => `
      <article class="card tilt reveal">
        <div class="card-top"><span class="tag pass">${p.tag}</span></div>
        <h3>${p.title}</h3>
        <p class="card-sub">${p.sub}</p>
        <p class="card-text">${hl(p.text)}</p>
        <div class="stats">${p.stats.map(([v, l]) => `<div class="stat"><b>${v}</b><span>${l}</span></div>`).join("")}</div>
        <div class="logo-row">${p.stack.map(([n, s]) => `<span class="logo-chip">${icon(s)}${n}</span>`).join("")}</div>
        <button class="wt-open" data-walkthrough="${p.wt}"><span class="wt-play">${PLAY}</span>Walkthrough <span class="dim">${WT_LEN[p.wt]} slides</span></button>
      </article>`).join("");
  }

  /* ---------------------------------------------------------------- papers */
  function papers() {
    $("#papers").innerHTML = PAPERS.map((p) => `
      <a class="paper reveal" href="${p.url}" target="_blank" rel="noopener">
        <div class="sheet-wrap" aria-hidden="true">
          <div class="sheet">
            <div class="sheet-venue"><span>${p.short}</span><span>${p.date}</span></div>
            <h4>${p.title}</h4>
            <p class="sheet-author">Ankit Yadav et al. · Sharda University</p>
            <div class="sheet-abs"><b>Abstract —</b> ${p.abstract}
              <div class="sheet-figure">${p.bars.map((h) => `<i style="height:${h * 100}%"></i>`).join("")}</div>
              ${p.abstract}</div>
            <span class="paper-scan"></span>
          </div>
        </div>
        <div class="paper-meta">
          <div class="paper-pub"><span>${p.venue}</span><span class="dim">${p.date}</span></div>
          <h3>${p.title}</h3>
          <p class="paper-key">${p.key}</p>
          <div class="chips">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>
          <span class="paper-link">Read the paper <span class="arr">↗</span></span>
        </div>
      </a>`).join("");
  }

  /* ---------------------------------------------------------------- skills */
  function skills() {
    const rows = $("#skillRows"), proof = $("#skillProof");
    const all = SKILL_ROWS.flat();
    rows.innerHTML = SKILL_ROWS.map(() => `<div class="skill-row"></div>`).join("");
    let k = 0;
    $$(".skill-row", rows).forEach((row, r) => {
      const items = SKILL_ROWS[r].map(([n, s]) => `<button class="skill" data-i="${k++}">${icon(s)}${n}</button>`);
      loop(row, items, { speed: 32 + r * 6, rev: r % 2 === 1 });
    });

    const show = (i) => {
      const [n, s, area, used] = all[i];
      $$(".skill.lit", rows).forEach((b) => b.classList.remove("lit"));
      $$(`.skill[data-i="${i}"]`, rows).forEach((b) => b.classList.add("lit"));
      proof.innerHTML = `<span class="sp-ico">${icon(s)}</span><div class="sp-body"><span class="sp-area">${area}</span><b>${n}</b>${hl(used)}</div>`;
    };
    // With no one pointing, the receipt cycles through skills on its own; pointing takes over.
    const order = all.map((_, i) => i).sort((a, b) => (a % 12) - (b % 12) || a - b);
    let o = 0, hovering = false;
    show(order[0]);
    setInterval(() => { if (!hovering && inView(rows)) show(order[(o = (o + 1) % order.length)]); }, 2600);
    rows.addEventListener("pointerover", (e) => { const b = e.target.closest(".skill"); if (b) { hovering = true; show(+b.dataset.i); } });
    rows.addEventListener("pointerleave", () => { hovering = false; });
    rows.addEventListener("focusin", (e) => { const b = e.target.closest(".skill"); if (b) show(+b.dataset.i); });

    $("#intGrid").innerHTML = INTEGRATIONS.map(([n, s, d, w]) => `
      <div class="int">
        <span class="int-logo">${icon(s, "plug")}</span>
        <div><b>${n}</b><p>${d}</p><span class="int-where">${w}</span></div>
      </div>`).join("");
  }

  /* ---------------------------------------------------------------- community */
  function community() {
    loop($("#events"), EVENTS.map((e) => {
      const tag = e.url ? "a" : "div", href = e.url ? ` href="${e.url}" target="_blank" rel="noopener"` : "";
      const imgs = e.imgs || [];
      return `<${tag} class="event${imgs.length ? "" : " noimg"}"${href}>
        ${imgs.map((src, i) => `<img src="${src}" alt="" loading="lazy"${i ? "" : ' class="on"'} />`).join("")}
        <span class="event-shade"></span>
        ${e.url ? `<span class="event-recap">My recap ↗</span>` : ""}
        <div class="event-body"><span class="event-date">${e.date}</span><h4>${e.title}</h4><span class="event-place">${e.place}</span></div>
      </${tag}>`;
    }), { speed: 38 });
    // Events with several photos crossfade through them.
    if (!reduced) setInterval(() => {
      if (!inView($("#events"))) return;
      $$("#events .event").forEach((card) => {
        const imgs = $$("img", card);
        if (imgs.length < 2) return;
        const i = imgs.findIndex((im) => im.classList.contains("on"));
        imgs[i].classList.remove("on");
        imgs[(i + 1) % imgs.length].classList.add("on");
      });
    }, 3200);
    loop($("#partners"), PARTNERS.map((p) => p.img
      ? `<span class="sponsor${p.label ? " with-label" : ""}" title="${p.name}"><img src="${p.img}" alt="${p.name}" loading="lazy"${p.invert ? ' class="invert"' : ""} />${p.label ? `<span>${p.label}</span>` : ""}</span>`
      : `<span class="sponsor text">${p.name}</span>`), { speed: 34, rev: true });
  }

  /* ---------------------------------------------------------------- roles */
  function roles() {
    const label = { primary: "Primary fit", strong: "Strong fit", open: "Open to" };
    loop($("#roleGrid"), ROLES.map((r) => `
      <article class="role">
        <div class="role-top"><span class="role-ico">${glyph(r.ico)}</span><span class="tag${r.fit === "primary" ? " pass" : ""}">${label[r.fit]}</span></div>
        <h3>${r.title}</h3>
        <p>${r.why}</p>
        <ul>${r.bring.map((b) => `<li>${hl(b)}</li>`).join("")}</ul>
      </article>`), { speed: 30 });
  }

  // The verified fact sheet the "Ask" box retrieves from. Every answer is one of these.
  const KB = [
    { id: "role", title: "current_role", text: "Ankit Yadav is a Backend Engineer at EZ Works in Gurugram, India. He joined in November 2024 as a Backend Intern and was promoted to Junior Backend Engineer, then to Backend Engineer. He works on AI platforms, GenAI, LLM systems, Python, FastAPI and Django.", extra: "who is ankit job current work company position title" },
    { id: "genai", title: "genai_platform", text: "He architected a governed, multi-tenant GenAI content platform on FastAPI and Gemini, built on a provider-agnostic LLM gateway that handles model routing, cost metering, PII redaction, Fact-Lock grounding and confidentiality-tier routing across tenants.", extra: "llm gateway architecture platform multi tenant openai vertex providers routing cost" },
    { id: "halluc", title: "hallucination_mitigation", text: "To prevent hallucinations, facts come from a human-verified fact sheet, never from retrieved chunks. Fact-Lock rejects any claim it can't trace to a verified fact, and an eval framework of 14 deterministic checks plus an 8-dimension LLM-as-judge rubric issues BLOCK or FLAG verdicts.", extra: "hallucination hallucinate grounding grounded fact lock trust accuracy guardrails safety verify" },
    { id: "rag", title: "rag_pipeline", text: "He built a multi-tenant RAG pipeline on pgvector: PII-redacted chunking, Gemini embeddings, and top-k cosine retrieval filtered by tenant, content type and language, injected as brand-voice context. The same embeddings drive a 0–100 brand-voice fidelity score and semantic fact de-duplication.", extra: "rag retrieval vector search embeddings pgvector postgres semantic similarity" },
    { id: "evals", title: "llm_evals", text: "He designed an LLM evaluation framework combining 14 deterministic checks with LLM-as-judge rubric scoring across 8 dimensions and severity-gated BLOCK/FLAG verdicts, cutting manual editorial review time by 80%.", extra: "evaluation evals judge testing quality rubric metrics" },
    { id: "bilingual", title: "bilingual_generation", text: "He built bilingual English/Arabic generation from language-neutral briefs, with a terminology and style-rule enforcement layer that removed manual terminology QA, plus an LLM-driven conversational workflow with structured extraction and intent detection to collect briefs.", extra: "arabic english multilingual language translation nlp chatbot conversational" },
    { id: "pptx", title: "powerpoint_automation", text: "He engineered a PowerPoint automation platform and a C# VSTO add-in using GPT-4 for layout-fitting, font auditing and text clean-up, cutting deck clean-up from 4 hours to 12 minutes (95%). It detected 2,000+ font inconsistencies and auto-aligned 94% of 5,000+ shapes.", extra: "powerpoint pptx slides deck c# csharp office vsto presentation" },
    { id: "erp", title: "erp_system", text: "He architected Django REST Framework APIs for an ERP processing 1,000+ daily transactions across Leave, Attendance, Payroll and Invoicing. He optimized PostgreSQL schemas to cut query time by 65% and built RBAC across 150+ endpoints, eliminating unauthorized access incidents.", extra: "erp django drf rest api postgresql database rbac security payroll" },
    { id: "async", title: "async_systems", text: "He designed an asynchronous task system with Celery and Redis that scaled to 1,000+ concurrent jobs and cut API response time from 3.2s to 0.8s, plus Redis pub/sub messaging between microservices, and an automated invoice pipeline with Django ORM and LibreOffice that saves 8 hours a week.", extra: "celery redis async queue background jobs performance latency scale scaling invoice" },
    { id: "leads", title: "outreach_and_leadzmachine", text: "He built a multi-channel outreach platform with LinkedIn automation and OpenAI lead scoring (500+ qualified prospects a month, 80% of qualification automated), and LeadzMachine, a Flask/AWS system capturing 50,000+ profiles monthly that raised qualification accuracy from 42% to 89%.", extra: "leads prospects linkedin outreach sales scraping sentiment openai flask chrome extension" },
    { id: "intern", title: "bhramaand_internship", text: "As a Backend Developer Intern at Bhramaand (June–November 2023) he built an async LinkedIn data pipeline on AWS EC2 and S3 handling 10,000+ profiles a month (97% less manual work) and integrated Razorpay payments with encryption.", extra: "internship intern aws ec2 s3 razorpay payments first job" },
    { id: "devlens", title: "devlens", text: "DevLens is his personal project, built independently outside work: a privacy-first debugging assistant using FastAPI, LangGraph, pgvector and local models. A deterministic Privacy Gateway redacts secrets and PII before anything reaches an LLM, and every claim in a root-cause report must quote evidence and be judged to support it.", extra: "devlens side personal own solo project debugging langgraph langchain privacy ollama incidents" },
    { id: "community", title: "community", text: "In 2023 he co-founded Cloud Native Community Group (CNCG) Gurugram, a CNCF chapter, and has directed 18+ monthly meetups. He led Sharda University's Datapool Club with a 10-member core team, organising data science meetups and Kaggle workshops and mentoring 100+ students, and ran 12+ workshops as a Kartavya NGO volunteer.", extra: "community cncf cloud native meetup speaking public speaking devrel leadership volunteer mentor" },
    { id: "edu", title: "education", text: "He holds a B.Tech in Computer Science from Sharda University with a CGPA of 9.15/10, and the Google Cloud Big Data and Machine Learning Fundamentals certification.", extra: "education degree college university cgpa gpa certification study" },
    { id: "research", title: "research", text: "He has three published papers on deep learning for image classification: 'Machine Learning-Based Image Analysis for Cotton Crop Health' (IEEE, MRIE 2025), where Inception V3 reached 98.83% accuracy on cotton disease classification; a comparison of VGG-16, ResNet50 and Inception V3 for skin disease detection (ACM, AICCONF '24); and 'Skin Disease Recognition by VGG-16 Model' (Springer Nature, 2023).", extra: "research paper papers publication publications ieee acm springer cnn computer vision deep learning resnet inception agriculture cotton crop" },
    { id: "stack", title: "tech_stack", text: "His stack: Python, SQL, C# and JavaScript; FastAPI, Django, DRF and Flask; PostgreSQL, pgvector, MySQL, MongoDB, Redis and Celery; AWS (EC2, S3, IAM, RDS, CloudWatch), GCP and Vertex AI, Docker; Gemini and OpenAI models.", extra: "skills stack languages tools technologies frameworks cloud" },
    { id: "contact", title: "contact", text: `He is open to senior backend, AI engineer and DevRel roles. Reach him at ${EMAIL}, on LinkedIn at linkedin.com/in/ankit-yadav2809 or GitHub at github.com/AnkitYadav2809.`, extra: "contact hire hiring email reach available open opportunities roles linkedin github" },
    { id: "devlens_stack", title: "devlens_engineering", text: "DevLens is built with FastAPI, async SQLAlchemy and Alembic, LangGraph with a Postgres checkpointer, pgvector, Presidio and spaCy for PII, arq workers on Redis, and a React + TypeScript + Vite UI. It has OAuth 2.0 connectors for a GitHub App, Slack, Jira Cloud and Google Drive with encrypted, refreshing tokens, plus admin/member/viewer RBAC and an audit log.", extra: "devlens connectors integrations oauth slack github jira google drive react typescript frontend presidio arq stack built" },
    { id: "integrations", title: "integrations", text: "Integrations he has shipped include Slack, GitHub, Jira Cloud, Google Drive, local code folders, WhatsApp/Telegram/Discord chat exports, Google Gemini, OpenAI, Ollama, SMTP email, LinkedIn automation and Razorpay payments.", extra: "integrations connectors third party api oauth webhook sync" },
    { id: "cncg_events", title: "cncg_events", text: "CNCG Gurugram has over 1,200 members. Events include Kube8s AI Connect: The Build Day (Oct 2026), Agentic Mornings at EPAM (May 2026, 345 reactions on his recap post), the Cloud Native Mixer he hosted (Mar 2025), Cloud-Native AI on K8s (Jan 2026), Girls of Gurgaon (Dec 2025), the #cTENcf CNCF 10th Birthday Bash (Aug 2025) and Jingle & Cloud Fest (Dec 2024), with partners like Google for Developers and ThoughtWorks.", extra: "events meetups cncg cncf gurugram organiser organizer kubernetes community sponsors" },
    { id: "goals", title: "career_goals", text: "He is looking for AI/LLM engineer and senior backend engineer roles, and is also strongly interested in developer relations and founding/platform engineering roles where backend, AI and community overlap.", extra: "goals roles looking want next career future aspire become devrel" },
    { id: "person", title: "about", text: "Colleagues rely on his calm approach and persistence. He overcame a fear of public speaking by repeatedly volunteering for the stage, which led him to start a tech community.", extra: "personality who is he strengths soft skills calm character" },
  ];


  /* ---------------------------------------------------------------- tiny in-browser RAG */
  const STOP = new Set("a an the is are was were be been of to in on for and or with by at as from it its this that what which who whom how do does did you your yours he his him i me my about can could would should tell give show any have has had there their they them we our us so than then also into over under more most very just not no yes all work works worked working done doing did use used".split(" "));
  const SYN = { hallucinate: "hallucination", hallucinations: "hallucination", grounding: "grounded", eval: "evaluation", evals: "evaluation", evaluate: "evaluation", vector: "embeddings", embedding: "embeddings", llms: "llm", models: "model", papers: "paper", publications: "publication", published: "publication", skill: "skills", tech: "stack", hire: "contact", email: "contact", reach: "contact", college: "university", degree: "education", speaking: "speaking", meetups: "meetup", ppt: "powerpoint", slides: "powerpoint", latency: "performance", fast: "performance", speed: "performance", secure: "security", privacy: "pii", redact: "pii", redaction: "pii" };
  const norm = (w) => { w = w.toLowerCase().replace(/[^a-z0-9+#/-]/g, ""); w = SYN[w] || w; if (w.length > 4 && w.endsWith("s") && !w.endsWith("ss")) w = w.slice(0, -1); return w; };
  const tokenize = (s) => s.split(/[\s,.;:()'"!?–—]+/).map(norm).filter((w) => w.length > 1 && !STOP.has(w));
  let IDF, VECS;
  function buildIndex() {
    const docs = KB.map((d) => tokenize(`${d.title.replace(/_/g, " ")} ${d.text} ${d.extra} ${d.extra}`));
    const df = new Map();
    docs.forEach((ts) => new Set(ts).forEach((t) => df.set(t, (df.get(t) || 0) + 1)));
    IDF = new Map([...df].map(([t, n]) => [t, Math.log(1 + KB.length / n)]));
    VECS = docs.map(vec);
  }
  function vec(tokens) {
    const tf = new Map();
    tokens.forEach((t) => tf.set(t, (tf.get(t) || 0) + 1));
    const v = new Map();
    let n = 0;
    tf.forEach((c, t) => { const w = (1 + Math.log(c)) * (IDF.get(t) || 0); if (w) { v.set(t, w); n += w * w; } });
    n = Math.sqrt(n) || 1;
    v.forEach((w, t) => v.set(t, w / n));
    return v;
  }
  const cosine = (a, b) => { let s = 0; a.forEach((w, t) => { if (b.has(t)) s += w * b.get(t); }); return s; };

  function ask() {
    buildIndex();
    const log = $("#askLog"), form = $("#askForm"), input = $("#askInput"), ret = $("#askRetrieval");
    let busy = false;
    const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

    async function run(q) {
      if (busy || !q.trim()) return;
      busy = true;
      log.insertAdjacentHTML("beforeend", `<div class="msg user"><span class="who mono">you</span><p>${esc(q)}</p></div>`);
      const qv = vec(tokenize(q));
      const ranked = KB.map((d, i) => ({ d, s: cosine(qv, VECS[i]) })).sort((a, b) => b.s - a.s).slice(0, 3);

      ret.innerHTML = `<div class="ret-title"><span>retrieved · top_k=3</span><span>cosine</span></div>` + ranked.map((r, i) => `
        <div class="chunk" style="animation-delay:${i * 90}ms">
          <div class="chunk-head"><b>[${i + 1}] ${r.d.title}</b><span>${r.s.toFixed(3)}</span></div>
          <p>${r.d.text}</p>
          <div class="sim"><i data-w="${Math.min(100, r.s * 160)}"></i></div>
        </div>`).join("");
      requestAnimationFrame(() => $$(".sim i", ret).forEach((i) => (i.style.width = i.dataset.w + "%")));

      const bot = document.createElement("div");
      bot.className = "msg bot";
      bot.innerHTML = `<span class="who mono">ankit.ai · thinking…</span><p></p>`;
      log.append(bot);
      log.scrollTop = log.scrollHeight;
      await sleep(reduced ? 0 : 550);

      const top = ranked[0];
      const p = $("p", bot);
      if (!top || top.s < 0.12) {
        bot.querySelector(".who").textContent = "ankit.ai · fact-lock";
        p.innerHTML = `I can't ground that in Ankit's verified fact sheet, so I won't guess. Try asking about his AI platforms, RAG, evals, ERP work, research or community — or <a class="ok" href="mailto:${EMAIL}">ask him directly</a>.`;
        bot.insertAdjacentHTML("beforeend", `<div class="verdict"><span class="tag block">BLOCK</span> no supporting fact · score ${top ? top.s.toFixed(2) : "0.00"} &lt; 0.12</div>`);
      } else {
        bot.querySelector(".who").textContent = "ankit.ai";
        const use = ranked.filter((r, i) => i === 0 || r.s > top.s * 0.7 && r.s > 0.15).slice(0, 2);
        for (const [ci, r] of use.entries()) {
          const words = r.d.text.split(" ");
          for (const w of words) {
            // Numbers in answers glow, like everywhere else on the page.
            if (/\d/.test(w)) { const s = document.createElement("span"); s.className = "n"; s.textContent = w; p.append(s, document.createTextNode(" ")); }
            else p.append(document.createTextNode(w + " "));
            if (!reduced) await sleep(18);
            log.scrollTop = log.scrollHeight;
          }
          const c = document.createElement("span");
          c.className = "cite";
          c.textContent = `[${ranked.indexOf(r) + 1}]`;
          p.append(c, document.createTextNode(ci < use.length - 1 ? " " : ""));
        }
        bot.insertAdjacentHTML("beforeend", `<div class="verdict"><span class="tag pass">PASS</span> grounded in ${use.length} verified fact${use.length > 1 ? "s" : ""} · 0 unsupported claims</div>`);
      }
      log.scrollTop = log.scrollHeight;
      busy = false;
    }
    form.addEventListener("submit", (e) => { e.preventDefault(); const q = input.value; input.value = ""; run(q); });
    $$("#askSuggest button").forEach((b) => b.addEventListener("click", () => run(b.textContent)));
  }

  /* ---------------------------------------------------------------- command palette */
  function palette() {
    const pal = $("#palette"), inp = $("#paletteInput"), list = $("#paletteList");
    const go = (id) => () => $(id).scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    const cmds = [
      ["Go to impact", "section", go("#impact")],
      ["Go to systems / architecture", "section", go("#systems")],
      ["Go to experience trace", "section", go("#trace")],
      ["Go to projects", "section", go("#work")],
      ["DevLens walkthrough", "slides", () => (location.hash = "#walkthrough/devlens")],
      ["Go to research", "section", go("#research")],
      ["Ask my portfolio", "rag", () => { go("#ask")(); setTimeout(() => $("#askInput").focus({ preventScroll: true }), 600); }],
      ["Go to skills", "section", go("#skills")],
      ["Go to community / CNCG", "section", go("#community")],
      ["Go to roles I'm targeting", "section", go("#roles")],
      ["Go to about", "section", go("#about")],
      ["Copy email", "action", copyEmail],
      ["Download résumé", "file", () => window.open("assets/Ankit_Yadav_Resume.pdf", "_blank")],
      ["Open LinkedIn", "link", () => window.open("https://www.linkedin.com/in/ankit-yadav2809", "_blank")],
      ["Open GitHub", "link", () => window.open("https://github.com/AnkitYadav2809", "_blank")],
      ["sudo hire ankit", "easter egg", hire],
    ];
    let shown = cmds, sel = 0;
    function render() {
      const q = inp.value.toLowerCase().trim();
      shown = cmds.filter(([n]) => !q || n.toLowerCase().includes(q) || q.split(" ").every((w) => n.toLowerCase().includes(w)));
      if (/^sudo\b/.test(q)) shown = [cmds[cmds.length - 1]];
      sel = Math.min(sel, Math.max(0, shown.length - 1));
      list.innerHTML = shown.map(([n, k], i) => `<li class="${i === sel ? "sel" : ""}" data-i="${i}"><span>${n}</span><span class="mono">${k}</span></li>`).join("") || `<li><span class="dim">no match — Fact-Lock says no.</span></li>`;
    }
    function open() { pal.hidden = false; inp.value = ""; sel = 0; render(); inp.focus(); }
    function close() { pal.hidden = true; }
    function exec(i) { const c = shown[i]; if (!c) return; close(); c[2](); }
    addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); pal.hidden ? open() : close(); }
      else if (e.key === "/" && pal.hidden && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); open(); }
      if (pal.hidden) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowDown") { sel = (sel + 1) % shown.length; render(); e.preventDefault(); }
      if (e.key === "ArrowUp") { sel = (sel - 1 + shown.length) % shown.length; render(); e.preventDefault(); }
      if (e.key === "Enter") exec(sel);
    });
    inp.addEventListener("input", () => { sel = 0; render(); });
    list.addEventListener("click", (e) => { const li = e.target.closest("li[data-i]"); if (li) exec(+li.dataset.i); });
    pal.addEventListener("click", (e) => { if (e.target === pal) close(); });
    $("#openPalette").addEventListener("click", open);
  }

  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast.h);
    toast.h = setTimeout(() => t.classList.remove("show"), 2400);
  }
  async function copyEmail() {
    try { await navigator.clipboard.writeText(EMAIL); toast("email copied ✓ " + EMAIL); }
    catch (_) { location.href = "mailto:" + EMAIL; }
  }
  function hire() {
    toast("[sudo] permission granted — opening email ✓");
    if (!reduced) {
      const colors = ["#c6f432", "#ecebe6", "#c6f432", "#8f9a3a"];
      for (let i = 0; i < 90; i++) {
        const c = document.createElement("div");
        c.className = "confetti";
        c.style.left = Math.random() * 100 + "vw";
        c.style.background = colors[i % colors.length];
        c.style.animationDuration = 1.8 + Math.random() * 1.8 + "s";
        c.style.animationDelay = Math.random() * 0.4 + "s";
        document.body.append(c);
        setTimeout(() => c.remove(), 4200);
      }
    }
    setTimeout(() => (location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Let's talk — saw your portfolio")}`), 1600);
  }

  /* ---------------------------------------------------------------- micro-interactions */
  function micro() {
    // nav: hide on scroll down, active section
    const nav = $("#nav");
    let lastY = scrollY;
    addEventListener("scroll", () => {
      const y = scrollY;
      nav.classList.toggle("hide", y > lastY && y > 300);
      lastY = y;
    }, { passive: true });
    const links = $$(".nav-links a");
    const secIO = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id));
    }), { rootMargin: "-45% 0px -50% 0px" });
    $$("section[id]").forEach((s) => secIO.observe(s));

    $("#copyEmail").addEventListener("click", async () => {
      await copyEmail();
      $("#copyLabel").textContent = "copied ✓";
      setTimeout(() => ($("#copyLabel").textContent = "copy"), 2000);
    });
    $("#year").textContent = new Date().getFullYear();

    if (!finePointer || reduced) { $(".cursor-glow").style.display = "none"; return; }

    const glow = $(".cursor-glow");
    addEventListener("pointermove", (e) => { glow.style.left = e.clientX + "px"; glow.style.top = e.clientY + "px"; }, { passive: true });

    // magnetic buttons
    $$(".magnetic").forEach((b) => {
      b.addEventListener("pointermove", (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.28}px)`;
      });
      b.addEventListener("pointerleave", () => { b.style.transform = ""; b.style.transition = "transform .5s var(--ease)"; setTimeout(() => (b.style.transition = ""), 500); });
    });

    // tilt cards + spotlight
    $$(".tilt").forEach((c) => {
      c.addEventListener("pointermove", (e) => {
        const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        c.style.setProperty("--mx", x * 100 + "%");
        c.style.setProperty("--my", y * 100 + "%");
        c.style.transform = `perspective(900px) rotateX(${(0.5 - y) * 4}deg) rotateY(${(x - 0.5) * 5}deg)`;
      });
      c.addEventListener("pointerleave", () => (c.style.transform = ""));
    });
  }

  /* ---------------------------------------------------------------- init */
  window.AY = { $, $$, icon, glyph, hl, reduced };
  // Render first, so reveals observe everything.
  stackMarquee(); timeline(); projects(); papers(); skills(); community(); roles();
  reveals();
  embeddingSpace();
  pipeline();
  ask();
  palette();
  micro();
  runBoot().then(() => {
    document.documentElement.classList.add("loaded");
    setTimeout(streamHero, reduced ? 0 : 500);
  });
})();
