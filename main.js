/* ankit.ai — hand-built, no frameworks.
   Sections: boot · hero stream · embedding space · reveals · pipeline · papers · RAG · palette · misc */
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(pointer: fine)").matches;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const EMAIL = "ankity19072003@gmail.com";

  /* ---------------------------------------------------------------- data */

  // Add your other two papers here — the Research section renders from this list.
  const PAPERS = [
    {
      title: "Transforming Dermatological Diagnosis: Deep Learning Approaches for Skin Disease Detection in the Digital Era",
      venue: "AICCONF '24 — Proceedings of the Cognitive Models and Artificial Intelligence Conference",
      date: "Jun 23, 2024",
      url: "https://dl.acm.org/doi/10.1145/3660853.3660924",
      abstract:
        "A comparative study of three widely used deep learning models — VGG-16, ResNet50 and Inception V3 — for identifying three common skin conditions: herpes, atopic dermatitis and acne. Models were assessed on predictive performance, training duration and computational efficiency. VGG-16 and ResNet50 proved computationally efficient, while Inception V3 trained more slowly due to its more complex architecture — giving dermatologists and researchers an evidence base for choosing faster image-processing models.",
      models: [["VGG-16", "efficient"], ["ResNet50", "efficient"], ["Inception V3", "slower to train"]],
      tags: ["Deep Learning", "CNN", "Model comparison", "Dermatology"],
    },
    {
      title: "Skin Disease Recognition by VGG-16 Model",
      venue: "Springer Nature Singapore",
      date: "Jul 23, 2023",
      url: "https://link.springer.com/chapter/10.1007/978-981-99-3315-0_64",
      abstract:
        "Most early symptoms of skin disease are visible, so automated detection can catch them in time. This work proposes a CNN classifier built on VGG-16 — with image resizing, transfer-learned weights and data augmentation — that categorises three skin conditions: dermatitis, herpes and acne.",
      models: [["VGG-16", "transfer learning"], ["Augmentation", "on"]],
      tags: ["Computer Vision", "VGG-16", "Transfer learning", "Springer"],
    },
    // { title: "", venue: "", date: "", url: "", abstract: "", models: [], tags: [] },
  ];


  // Skills with receipts — `used` names where each skill was used in real work.
  const SKILL_AREAS = ["all", "ai & llm", "backend", "data", "infra", "security", "frontend", "community"];
  const SKILLS = [
    ["RAG", "ai & llm", "GenAI platform (pgvector, tenant-filtered) · DevLens (pgvector + exact identifier match)"],
    ["LLM evals", "ai & llm", "14 deterministic checks + LLM-as-judge at EZ · DevLens saved test questions & eval runs"],
    ["LLM-as-judge", "ai & llm", "8-dimension rubric, BLOCK/FLAG verdicts · DevLens claim-support judging"],
    ["LangGraph", "ai & llm", "DevLens debug workflow: nodes, conditional edges, Postgres checkpointer"],
    ["LangChain", "ai & llm", "DevLens model layer: ChatOllama, embeddings, text splitters"],
    ["Provider-agnostic gateway", "ai & llm", "Routing, cost metering & tier routing across Gemini / OpenAI / Vertex at EZ"],
    ["Structured output", "ai & llm", "Typed briefs at EZ · DevLens DebuggingReport & ClaimJudgment schemas"],
    ["Hallucination mitigation", "ai & llm", "Fact-Lock at EZ · evidence-quoting claims in DevLens"],
    ["Embeddings", "ai & llm", "Gemini embeddings: retrieval, brand-voice score, fact de-dup · Ollama embeddings"],
    ["Prompt & context engineering", "ai & llm", "Brand-voice context injection · DevLens analysis & claim-check prompts"],
    ["Gemini / Vertex AI", "ai & llm", "Production generation + embeddings at EZ"],
    ["OpenAI GPT-4", "ai & llm", "PowerPoint add-in · lead scoring & sentiment classification"],
    ["Ollama (local LLMs)", "ai & llm", "DevLens runs fully local models so data never leaves the box"],
    ["Multilingual EN/AR", "ai & llm", "Bilingual generation with terminology & style enforcement at EZ"],
    ["Python", "backend", "Everything since 2023"],
    ["FastAPI", "backend", "GenAI platform at EZ · DevLens API (SSE, OAuth callbacks, RBAC)"],
    ["Django / DRF", "backend", "ERP: leave, attendance, payroll, invoicing; 150+ endpoints"],
    ["Flask", "backend", "LeadzMachine"],
    ["SSE streaming", "backend", "DevLens: streamed chat answers & live debug steps"],
    ["Async background jobs", "backend", "Celery + Redis (1,000+ concurrent jobs) · arq workers in DevLens"],
    ["REST API design", "backend", "ERP, GenAI platform, DevLens v1 API"],
    ["C# / VSTO", "backend", "AI PowerPoint automation add-in"],
    ["PostgreSQL", "data", "ERP schema tuning (−65% query time) · DevLens"],
    ["pgvector", "data", "Multi-tenant vector search at EZ · DevLens knowledge store"],
    ["SQLAlchemy + Alembic", "data", "DevLens async models, auto-applied migrations"],
    ["Redis", "data", "Queues, rate limiting, OAuth state, caching"],
    ["MySQL / MongoDB", "data", "Earlier projects & data pipelines"],
    ["Docker / Compose", "infra", "Local Postgres + pgvector + Redis stacks; service packaging"],
    ["AWS (EC2, S3, IAM, RDS)", "infra", "LinkedIn data pipeline at Bhramaand · LeadzMachine"],
    ["GCP", "infra", "Vertex AI, Drive API service accounts · Google Cloud ML certification"],
    ["Observability", "infra", "New Relic, CloudWatch · DevLens per-call token / latency / cost tracking"],
    ["Cloudflare Tunnel", "infra", "HTTPS tunnels for OAuth callbacks during local dev"],
    ["PII redaction", "security", "Tokenized PII at EZ · Presidio + spaCy Privacy Gateway in DevLens"],
    ["OAuth 2.0", "security", "DevLens “Connect with…” for GitHub App, Slack, Jira (3LO), Google"],
    ["JWT + rotating sessions", "security", "DevLens: access tokens, 30-day rotating refresh sessions"],
    ["RBAC / ABAC", "security", "150+ ERP endpoints · DevLens admin / member / viewer, audit log"],
    ["Secrets & encryption", "security", "Encrypted connector tokens, Argon2 hashing, hashed link tokens"],
    ["React + TypeScript", "frontend", "DevLens UI (Vite): chat, debug, insights dashboards, connectors"],
    ["JavaScript", "frontend", "This site (no frameworks) · Chrome extension for LeadzMachine"],
    ["Public speaking", "community", "Hosting CNCG Gurugram meetups, panels and open mics"],
    ["Event organising", "community", "18+ meetups, workshops and build days since 2023"],
    ["Mentoring", "community", "100+ students at Datapool Club · JEE mentoring at Kartavya NGO"],
    ["Technical writing", "community", "2 published papers · docs like DevLens's README & feature reference"],
  ];

  const INTEGRATIONS = [
    ["Slack", "SL", "OAuth app + bot token; channels & threads synced daily", "DevLens"],
    ["GitHub", "GH", "GitHub App: issues, PRs, commits, code at HEAD with line citations", "DevLens"],
    ["Jira Cloud", "JI", "Atlassian OAuth 2.0 (3LO), JQL sync, rotating refresh tokens", "DevLens"],
    ["Google Drive", "GD", "OAuth / service account; Docs, Sheets & Slides from shared folders", "DevLens"],
    ["Local code folders", "&lt;/&gt;", "File-by-file code indexing, skips vendored & binary files", "DevLens"],
    ["Chat exports", "WA", "WhatsApp, Telegram, Discord & JSON imports, redacted then reviewed", "DevLens"],
    ["Google Gemini", "GE", "Generation + embeddings behind a provider-agnostic gateway", "EZ"],
    ["OpenAI", "AI", "GPT-4 deck clean-up, sentiment & lead scoring", "EZ"],
    ["Ollama", "OL", "Local chat + embedding models, usage metering", "DevLens"],
    ["SMTP email", "@", "Invites, password resets, weekly digest emails", "DevLens"],
    ["LinkedIn automation", "in", "Outreach & prospect extraction pipelines", "EZ · Bhramaand"],
    ["Razorpay", "₹", "Payments with encryption for transaction safety", "Bhramaand"],
  ];

  // CNCG Gurugram events (public listings on community.cncf.io).
  const EVENTS = [
    { title: "Kube8s AI Connect: The Build Day", date: "Oct 10, 2026", place: "Gurugram", tags: ["AI on K8s", "build day"], url: "https://www.linkedin.com/feed/update/urn:li:activity:7515433996139315200/" },
    { title: "Cloud Native AI Night: Pre-KCD Gujarat Meetup", date: "Sep 18, 2026", place: "Ahmedabad", tags: ["AI", "KCD"] },
    { title: "Agentic Mornings", date: "May 16, 2026", place: "EPAM Systems, Gurugram", tags: ["agentic AI", "345 reactions"], url: "https://www.linkedin.com/feed/update/urn:li:activity:7461437798856888320/" },
    { title: "Cloud-Native AI on K8s: Build, Ship, Scale", date: "Jan 31, 2026", place: "Noida", tags: ["Kubernetes", "MLOps"] },
    { title: "Girls of Gurgaon", date: "Dec 13, 2025", place: "Gurugram", tags: ["women in tech", "community"] },
    { title: "#cTENcf Birthday Bash Gurugram", date: "Aug 30, 2025", place: "Gurugram", tags: ["CNCF turns 10"] },
    { title: "Infra in the Cloud", date: "Jun 7, 2025", place: "Gurugram", tags: ["bare-metal K8s", "infra"] },
    { title: "Cloud Native Mixer", date: "Mar 22, 2025", place: "Gurugram", tags: ["cloud native + AI", "I hosted"], url: "https://www.linkedin.com/feed/update/urn:li:activity:7309460857745285120/" },
    { title: "Jingle & Cloud Fest", date: "Dec 21, 2024", place: "Gurugram", tags: ["KubeCon India recap", "Terraform", "FinOps"] },
    { title: "Code & Cake: CNCG Gurugram Birthday Bash", date: "Oct 26, 2024", place: "Gurugram", tags: ["data pipelines", "chaos engineering"] },
    { title: "Sustainable Hacktober", date: "Oct 5, 2024", place: "Gurugram", tags: ["K8s security", "green computing"] },
    { title: "Phippy & Friends Tech Meetup", date: "Jul 27, 2024", place: "Gurugram", tags: ["Kubernetes basics"] },
    { title: "CloudAI ProMeetup", date: "Jun 2024", place: "Gurugram", tags: ["cloud + AI", "professionals"] },
    { title: "Kloud Konnect", date: "Feb 2024", place: "Gurugram", tags: ["cloud native"] },
  ];
  const PARTNERS = ["Google for Developers", "ThoughtWorks", "EPAM Systems", "Devtron", "Loft Labs", "Opstree Solutions", "BuildPiper", "Masters' Union", "Orangewood", "certdirectory.io", "Tirith", "TMS"];

  // Featured LinkedIn posts — summaries of the real posts; reaction counts as of Nov 2026.
  const LINKEDIN = "https://www.linkedin.com/in/ankit-yadav2809/recent-activity/all/";
  const POSTS = [
    {
      kind: "Event wrap-up", date: "Oct 2026", title: "Kube8s AI Connect: The Build Day",
      text: "Wrapping up a full build day at Cloud Native Gurugram where Kubernetes met AI: talks and live demos from Hrittik Roy, Ishan Jain and Manas Sharma, an organising team and volunteers who made it run, and Masters' Union as sponsor. Until the next build!",
      tags: ["#CNCGGurugram", "#Kube8sAIConnect", "#Kubernetes", "#AI"], reactions: 61, comments: 3,
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7515433996139315200/",
    },
    {
      kind: "Event wrap-up", date: "May 2026", title: "Agentic Mornings is back",
      text: "After a long pause, we brought back Agentic Mornings with Cloud Native Gurugram at EPAM Systems: sessions on agentic AI from Rishabh Beniwal, Vijaydeep Sinha and Ravindra Verma, a packed room, and a seven-person organising crew.",
      tags: ["#AgenticMornings", "#CNCF", "#EPAMSystems", "#CloudNative"], reactions: 345, comments: 6,
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7461437798856888320/",
    },
    {
      kind: "Hosting", date: "Mar 2025", title: "Hosting the Cloud Native Mixer",
      text: "Emceeing the Cloud Native Mixer: cloud native meets AI with talks from Anshika Tiwari, Aditya Soni and Pranay Nanda, support from Google for Developers and Masters' Union, plus discussions, games, swag and food. More meetups coming.",
      tags: ["#CloudNative", "#DevOps", "#AI", "#Meetup"], reactions: 157, comments: 7,
      url: "https://www.linkedin.com/feed/update/urn:li:activity:7309460857745285120/",
    },
  ];

  const ROLES = [
    { title: "AI / LLM Engineer", fit: "primary", why: "Shipping GenAI that holds up in production: RAG, evals, guardrails, gateways.", bring: ["Governed multi-tenant GenAI platform in prod", "Eval frameworks that replace manual review", "Privacy-first design (PII before prompt)"] },
    { title: "Backend Engineer", fit: "primary", why: "Owning core services, data models and the async machinery underneath.", bring: ["FastAPI / Django at production scale", "Postgres tuning, queues, RBAC", "Integrations: OAuth, sync engines, webhooks"] },
    { title: "Developer Relations", fit: "strong", why: "The bridge between engineers and the product: talks, demos, docs and community.", bring: ["Co-founder of a 1,200+ member CNCF group", "Hosts and speaks at meetups", "Writes papers, docs and posts"] },
    { title: "Founding / Platform Engineer", fit: "open", why: "Zero-to-one products where backend, AI and product judgement all matter.", bring: ["Built DevLens end-to-end solo", "Comfortable across API, infra and UI", "Calm under ambiguity"] },
  ];

  const STAGES = [
    {
      name: "Brief intake",
      body: "An LLM-driven conversational workflow collects content briefs: intent detection and structured extraction turn a messy chat into a language-neutral, typed brief — the single source of truth for EN and AR generation.",
      code: `<span class="k">class</span> Brief(BaseModel):
    tenant_id: UUID
    content_type: <span class="s">"press_release"</span> | <span class="s">"social"</span> | ...
    languages: list[Lang] = [<span class="s">"en"</span>, <span class="s">"ar"</span>]
    confidentiality: Tier   <span class="c"># routes models later</span>
    facts: list[FactRef]    <span class="c"># verified, not generated</span>`,
    },
    {
      name: "PII redaction",
      body: "Before any text leaves the trust boundary, PII is detected and tokenized. A confidentiality tier is attached to the request so sensitive tenants can only reach approved models. The LLM sees placeholders — never people.",
      code: `<span class="c"># in</span>
<span class="a">"Call Sara Khan on +971 50 123 4567"</span>
<span class="c"># out → model</span>
<span class="s">"Call &lt;PERSON_1&gt; on &lt;PHONE_1&gt;"</span>
tier=<span class="k">CONFIDENTIAL</span>  vault.store(tokens, ttl=<span class="s">"request"</span>)`,
    },
    {
      name: "Multi-tenant RAG",
      body: "PII-redacted chunks embedded with Gemini, stored in pgvector. Top-k cosine retrieval is filtered by tenant, content type and language, then injected as brand-voice context. The same embeddings score brand-voice fidelity (0–100) and de-duplicate facts.",
      code: `<span class="k">SELECT</span> id, body, 1 - (emb &lt;=&gt; :q) <span class="k">AS</span> sim
<span class="k">FROM</span> chunks
<span class="k">WHERE</span> tenant_id = :t <span class="k">AND</span> lang = :lang
  <span class="k">AND</span> content_type = :ct
<span class="k">ORDER BY</span> emb &lt;=&gt; :q <span class="k">LIMIT</span> :k;`,
    },
    {
      name: "Provider-agnostic gateway",
      body: "One interface over Gemini, OpenAI and Vertex AI. The gateway picks a model per task and tier, meters tokens and cost per tenant, retries and falls back — so swapping a provider is configuration, not a rewrite.",
      code: `route = gateway.pick(
    task=<span class="s">"generate"</span>, tier=brief.confidentiality,
    budget=tenant.remaining_usd)
resp = <span class="k">await</span> route.complete(prompt, schema=Draft)
meter.record(tenant, resp.usage, resp.cost)`,
    },
    {
      name: "Fact-Lock grounding",
      body: "Facts come from a human-verified fact sheet — never from retrieved chunks or the model's memory. Any number, name or claim in the draft that can't be traced back to a locked fact is caught before a human ever sees it.",
      code: `<span class="k">for</span> claim <span class="k">in</span> extract_claims(draft):
    <span class="k">if not</span> fact_sheet.supports(claim):
        <span class="k">raise</span> <span class="r">Unverified</span>(claim)  <span class="c"># never ships</span>`,
    },
    {
      name: "Evals: checks + LLM-as-judge",
      body: "14 deterministic checks (terminology, length, banned phrases, numbers, format…) plus an LLM-as-judge rubric over 8 dimensions. Severity-gated verdicts: BLOCK stops it, FLAG routes to an editor, PASS ships. Manual editorial review dropped by 80%.",
      code: `checks  = run_deterministic(draft)      <span class="c"># 14</span>
rubric  = judge.score(draft, dims=8)
verdict = gate(checks, rubric)
<span class="c"># → </span><span class="s">PASS</span> | <span class="a">FLAG</span> | <span class="r">BLOCK</span>`,
    },
  ];

  // The verified fact sheet the "Ask" box retrieves from. Every answer is one of these.
  const KB = [
    { id: "role", title: "current_role", text: "Ankit Yadav is a Backend Engineer at EZ Works in Gurugram, India, since November 2024, promoted from Junior Backend Engineer in 2026. He works on AI platforms, GenAI, LLM systems, Python, FastAPI and Django.", extra: "who is ankit job current work company position title" },
    { id: "genai", title: "genai_platform", text: "He architected a governed, multi-tenant GenAI content platform on FastAPI and Gemini, built on a provider-agnostic LLM gateway that handles model routing, cost metering, PII redaction, Fact-Lock grounding and confidentiality-tier routing across tenants.", extra: "llm gateway architecture platform multi tenant openai vertex providers routing cost" },
    { id: "halluc", title: "hallucination_mitigation", text: "To prevent hallucinations, facts come from a human-verified fact sheet, never from retrieved chunks. Fact-Lock rejects any claim it can't trace to a verified fact, and an eval framework of 14 deterministic checks plus an 8-dimension LLM-as-judge rubric issues BLOCK or FLAG verdicts.", extra: "hallucination hallucinate grounding grounded fact lock trust accuracy guardrails safety verify" },
    { id: "rag", title: "rag_pipeline", text: "He built a multi-tenant RAG pipeline on pgvector: PII-redacted chunking, Gemini embeddings, and top-k cosine retrieval filtered by tenant, content type and language, injected as brand-voice context. The same embeddings drive a 0–100 brand-voice fidelity score and semantic fact de-duplication.", extra: "rag retrieval vector search embeddings pgvector postgres semantic similarity" },
    { id: "evals", title: "llm_evals", text: "He designed an LLM evaluation framework combining 14 deterministic checks with LLM-as-judge rubric scoring across 8 dimensions and severity-gated BLOCK/FLAG verdicts, cutting manual editorial review time by 80%.", extra: "evaluation evals judge testing quality rubric metrics" },
    { id: "bilingual", title: "bilingual_generation", text: "He built bilingual English/Arabic generation from language-neutral briefs, with a terminology and style-rule enforcement layer that removed manual terminology QA, plus an LLM-driven conversational workflow with structured extraction and intent detection to collect briefs.", extra: "arabic english multilingual language translation nlp chatbot conversational" },
    { id: "pptx", title: "powerpoint_automation", text: "He engineered a PowerPoint automation platform and a C# VSTO add-in using GPT-4 for layout-fitting, font auditing and text clean-up, cutting deck clean-up from 4 hours to 12 minutes (95%). It detected 2,000+ font inconsistencies and auto-aligned 94% of 5,000+ shapes.", extra: "powerpoint pptx slides deck c# csharp office vsto presentation" },
    { id: "erp", title: "erp_system", text: "He architected Django REST Framework APIs for an ERP processing 1,000+ daily transactions across Leave, Attendance, Payroll and Invoicing. He optimized PostgreSQL schemas to cut query time by 65% and built RBAC across 150+ endpoints, eliminating unauthorized access incidents.", extra: "erp django drf rest api postgresql database rbac security payroll" },
    { id: "async", title: "async_systems", text: "He designed an asynchronous task system with Celery and Redis that scaled to 1,000+ concurrent jobs and cut API response time from 3.2s to 0.8s, plus an automated invoice pipeline with Django ORM and LibreOffice that saves 8 hours a week.", extra: "celery redis async queue background jobs performance latency scale scaling invoice" },
    { id: "leads", title: "outreach_and_leadzmachine", text: "He built a multi-channel outreach platform with LinkedIn automation and OpenAI lead scoring (500+ qualified leads a month, 80% of qualification automated), and LeadzMachine, a Flask/AWS system capturing 50,000+ profiles monthly that raised qualification accuracy from 42% to 89%.", extra: "leads linkedin outreach sales scraping sentiment openai flask chrome extension" },
    { id: "intern", title: "bhramaand_internship", text: "As a Backend Developer Intern at Bhramaand (June–November 2023) he built an async LinkedIn data pipeline on AWS EC2 and S3 handling 10,000+ profiles a month (97% less manual work) and integrated Razorpay payments with encryption.", extra: "internship intern aws ec2 s3 razorpay payments first job" },
    { id: "devlens", title: "devlens", text: "DevLens is his privacy-first debugging assistant: FastAPI, LangGraph, pgvector and local models. A deterministic Privacy Gateway redacts secrets and PII before anything reaches an LLM, and every claim in a root-cause report must quote evidence and be judged to support it.", extra: "devlens side project debugging langgraph langchain privacy ollama incidents" },
    { id: "community", title: "community", text: "In 2023 he co-founded Cloud Native Community Group (CNCG) Gurugram, a CNCF chapter, and has directed 18+ monthly meetups. He led Sharda University's Datapool Club, mentoring 100+ students, and ran 12+ workshops as a Kartavya NGO volunteer.", extra: "community cncf cloud native meetup speaking public speaking devrel leadership volunteer mentor" },
    { id: "edu", title: "education", text: "He holds a B.Tech in Computer Science from Sharda University (2021–2025) with a CGPA of 9.15/10, and the Google Cloud Big Data and Machine Learning Fundamentals certification.", extra: "education degree college university cgpa gpa certification study" },
    { id: "research", title: "research", text: "He has published research on deep learning for skin disease detection: 'Skin Disease Recognition by VGG-16 Model' (Springer Nature, 2023) and a comparison of VGG-16, ResNet50 and Inception V3 at AICCONF '24.", extra: "research paper papers publication publications springer cnn computer vision deep learning resnet" },
    { id: "stack", title: "tech_stack", text: "His stack: Python, SQL, C# and JavaScript; FastAPI, Django, DRF and Flask; PostgreSQL, pgvector, MySQL, MongoDB, Redis and Celery; AWS (EC2, S3, IAM, RDS, CloudWatch), GCP and Vertex AI, Docker; Gemini and OpenAI models.", extra: "skills stack languages tools technologies frameworks cloud" },
    { id: "contact", title: "contact", text: `He is open to senior backend, AI engineer and DevRel roles. Reach him at ${EMAIL}, on LinkedIn at linkedin.com/in/ankit-yadav2809 or GitHub at github.com/AnkitYadav2809.`, extra: "contact hire hiring email reach available open opportunities roles linkedin github" },
    { id: "devlens_stack", title: "devlens_engineering", text: "DevLens is built with FastAPI, async SQLAlchemy and Alembic, LangGraph with a Postgres checkpointer, pgvector, Presidio and spaCy for PII, arq workers on Redis, and a React + TypeScript + Vite UI. It has OAuth 2.0 connectors for a GitHub App, Slack, Jira Cloud and Google Drive with encrypted, refreshing tokens, plus admin/member/viewer RBAC and an audit log.", extra: "devlens connectors integrations oauth slack github jira google drive react typescript frontend presidio arq stack built" },
    { id: "integrations", title: "integrations", text: "Integrations he has shipped include Slack, GitHub, Jira Cloud, Google Drive, local code folders, WhatsApp/Telegram/Discord chat exports, Google Gemini, OpenAI, Ollama, SMTP email, LinkedIn automation and Razorpay payments.", extra: "integrations connectors third party api oauth webhook sync" },
    { id: "cncg_events", title: "cncg_events", text: "CNCG Gurugram has over 1,200 members. Events include Kube8s AI Connect: The Build Day (Oct 2026), Agentic Mornings at EPAM (May 2026, 345 reactions on his recap post), the Cloud Native Mixer he hosted (Mar 2025), Cloud-Native AI on K8s (Jan 2026), Girls of Gurgaon (Dec 2025), the #cTENcf CNCF 10th Birthday Bash (Aug 2025) and Jingle & Cloud Fest (Dec 2024), with partners like Google for Developers and ThoughtWorks.", extra: "events meetups cncg cncf gurugram organiser organizer kubernetes community sponsors" },
    { id: "goals", title: "career_goals", text: "He is looking for AI/LLM engineer and senior backend engineer roles, and is also strongly interested in developer relations and founding/platform engineering roles where backend, AI and community overlap.", extra: "goals roles looking want next career future aspire become devrel" },
    { id: "person", title: "about", text: "Colleagues rely on his calm approach and persistence. He overcame a fear of public speaking by repeatedly volunteering for the stage, which led him to start a tech community.", extra: "personality who is he strengths soft skills calm character" },
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
      s.className = "tok";
      if (/BLOCK/.test(t)) s.style.color = "var(--red)";
      if (/governed|hallucinations/.test(t)) s.style.color = "#fff";
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
      // faint graph edges
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 110) {
            ctx.strokeStyle = `rgba(255,255,255,${0.05 * (1 - d / 110)})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      // top-k nearest to the query vector
      const topk = [...pts].sort((a, b) => a.d - b.d).slice(0, 6);
      const set = new Set(topk);
      topk.forEach((p, i) => {
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
        ctx.fillStyle = p.glow > 0.05 ? `rgba(198,244,50,${0.4 + p.glow * 0.6})` : p.w ? "rgba(167,139,250,0.65)" : "rgba(236,235,230,0.35)";
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r + p.glow * 2, 0, Math.PI * 2); ctx.fill();
        if (p.w && p.glow < 0.5) {
          ctx.font = "10px JetBrains Mono, monospace";
          ctx.fillStyle = "rgba(139,143,150,0.45)";
          ctx.fillText(p.w, p.x + 6, p.y + 3);
        }
      }
      // query marker
      ctx.strokeStyle = "rgba(198,244,50,0.9)";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(q.x, q.y, 6, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(q.x, q.y, 14 + Math.sin(t * 20) * 3, 0, Math.PI * 2); ctx.strokeStyle = "rgba(198,244,50,0.25)"; ctx.stroke();
    }
    if (!reduced) frame();
    else { mouse.active = false; t = 1; frame(); }
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
    if (reduced) { el.textContent = to.toFixed(dec); return; }
    const t0 = performance.now(), dur = 1600;
    (function step(now) {
      const k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 4);
      el.textContent = (to * e).toFixed(dec);
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }

  /* ---------------------------------------------------------------- pipeline */
  function pipeline() {
    const wrap = $("#pipeline"), detail = $("#stageDetail"), stages = $$(".stage", wrap);
    let current = -1, userPicked = false;
    function show(i) {
      if (i === current) return;
      current = i;
      stages.forEach((s, k) => s.classList.toggle("active", k === i));
      const s = STAGES[i];
      detail.innerHTML = `<div class="fade-swap"><span class="eyebrow mono">stage ${i + 1} / ${STAGES.length}</span><h3>${s.name}</h3><p>${s.body}</p></div><div class="code fade-swap">${s.code}</div>`;
    }
    stages.forEach((s, i) => s.addEventListener("click", () => { userPicked = true; show(i); }));
    show(0);
    setInterval(() => { if (!userPicked && inView(wrap)) show((current + 1) % STAGES.length); }, 5200);

    // packets travelling through the stages
    if (reduced) return;
    function spawn() {
      if (!inView(wrap) || getComputedStyle($(".pipe-svg")).display === "none") return;
      const wr = wrap.getBoundingClientRect();
      const pts = stages.map((s) => { const r = s.getBoundingClientRect(); return { x: r.left - wr.left + r.width / 2, y: r.top - wr.top + r.height / 2 }; });
      const pk = document.createElement("div");
      pk.className = "packet pii";
      wrap.append(pk);
      const startX = 0, endX = wr.width, y = pts[0].y + (Math.random() - 0.5) * 50;
      const dur = 4200, t0 = performance.now();
      let lastStage = -1;
      (function step(now) {
        const k = Math.min(1, (now - t0) / dur);
        const x = startX + (endX - startX) * k;
        const wobble = Math.sin(k * Math.PI * 6) * 6;
        pk.style.left = x + "px";
        pk.style.top = y + wobble + "px";
        const idx = pts.findIndex((p) => Math.abs(p.x - x) < 14);
        if (idx !== -1 && idx !== lastStage) {
          lastStage = idx;
          stages[idx].classList.add("flash");
          setTimeout(() => stages[idx].classList.remove("flash"), 300);
          if (idx === 1) pk.classList.remove("pii"); // redacted
        }
        if (k < 1) requestAnimationFrame(step); else pk.remove();
      })(t0);
    }
    setInterval(spawn, 1400);
  }
  function inView(el) { const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; }

  /* ---------------------------------------------------------------- papers */
  function papers() {
    const root = $("#papers");
    root.innerHTML = PAPERS.map((p, i) => `
      <details class="paper reveal"${i === 0 ? " open" : ""}>
        <summary>
          <span class="paper-idx">0${i + 1}</span>
          <div>
            <h3>${p.title}</h3>
            <div class="venue mono"><b>${p.venue}</b><span>${p.date}</span></div>
          </div>
          <span class="paper-toggle" aria-hidden="true">+</span>
        </summary>
        <div class="paper-body">
          <p>${p.abstract}</p>
          ${p.models?.length ? `<div class="paper-models">${p.models.map(([m, v]) => `<span>${m} · <i>${v}</i></span>`).join("")}</div>` : ""}
          <div class="chips mono">${p.tags.map((t) => `<span>${t}</span>`).join("")}</div>
          ${p.url ? `<p style="margin-top:16px"><a class="btn ghost small" href="${p.url}" target="_blank" rel="noopener">Read paper ↗</a></p>` : ""}
        </div>
      </details>`).join("");
  }


  /* ---------------------------------------------------------------- skills */
  function skills() {
    const filters = $("#skillFilters"), cloud = $("#skillCloud"), proof = $("#skillProof");
    filters.innerHTML = SKILL_AREAS.map((a, i) => `<button role="tab" class="${i ? "" : "on"}" data-a="${a}">${a}<sup>${a === "all" ? SKILLS.length : SKILLS.filter((s) => s[1] === a).length}</sup></button>`).join("");
    cloud.innerHTML = SKILLS.map(([n, a, u], i) => `<button class="skill" data-a="${a}" data-i="${i}">${n}</button>`).join("");
    const showProof = (i) => {
      const [n, a, u] = SKILLS[i];
      proof.innerHTML = `<span class="ok">${n}</span> <span class="dim">· ${a} ·</span> used in → ${u}`;
      proof.classList.remove("swap"); void proof.offsetWidth; proof.classList.add("swap");
    };
    cloud.addEventListener("pointerover", (e) => { const b = e.target.closest(".skill"); if (b) showProof(+b.dataset.i); });
    cloud.addEventListener("click", (e) => { const b = e.target.closest(".skill"); if (b) showProof(+b.dataset.i); });
    filters.addEventListener("click", (e) => {
      const b = e.target.closest("button"); if (!b) return;
      $$("button", filters).forEach((x) => x.classList.toggle("on", x === b));
      const a = b.dataset.a;
      $$(".skill", cloud).forEach((s, k) => {
        const on = a === "all" || s.dataset.a === a;
        s.classList.toggle("off", !on);
        if (on) { s.style.animationDelay = `${(k % 12) * 25}ms`; s.classList.remove("pop"); void s.offsetWidth; s.classList.add("pop"); }
      });
    });
    $("#intGrid").innerHTML = INTEGRATIONS.map(([n, m, d, w]) => `
      <div class="int">
        <span class="int-logo mono">${m}</span>
        <div><b>${n}</b><p>${d}</p><span class="mono int-where">${w}</span></div>
      </div>`).join("");
  }

  /* ---------------------------------------------------------------- community */
  function community() {
    const ev = $("#events");
    ev.innerHTML = EVENTS.map((e, i) => `
      <article class="event">
        <div class="event-top mono"><span>${e.date}</span><span class="dim">#${String(EVENTS.length - i).padStart(2, "0")}</span></div>
        <h4>${e.title}</h4>
        <p class="mono dim">📍 ${e.place}</p>
        <div class="chips mono">${e.tags.map((t) => `<span>${t}</span>`).join("")}</div>
        ${e.url ? `<a class="event-link mono" href="${e.url}" target="_blank" rel="noopener">my recap ↗</a>` : ""}
      </article>`).join("");
    const step = () => Math.min(ev.clientWidth * 0.8, 640);
    $("#evPrev").addEventListener("click", () => ev.scrollBy({ left: -step(), behavior: "smooth" }));
    $("#evNext").addEventListener("click", () => ev.scrollBy({ left: step(), behavior: "smooth" }));
    // drag to scroll on desktop
    let down = false, sx = 0, sl = 0;
    ev.addEventListener("pointerdown", (e) => { if (e.pointerType !== "mouse") return; down = true; sx = e.clientX; sl = ev.scrollLeft; ev.classList.add("drag"); });
    addEventListener("pointerup", () => { down = false; ev.classList.remove("drag"); });
    ev.addEventListener("pointermove", (e) => { if (down) ev.scrollLeft = sl - (e.clientX - sx); });
    $("#partners").innerHTML = PARTNERS.map((p) => `<span>${p}</span>`).join("");
  }

  /* ---------------------------------------------------------------- linkedin posts */
  function posts() {
    $("#postGrid").innerHTML = POSTS.map((p, i) => `
      <a class="post reveal tilt" href="${p.url}" target="_blank" rel="noopener">
        <div class="post-head">
          <img src="assets/ankit.jpg" alt="" loading="lazy" />
          <div><b>Ankit Yadav</b><span class="dim">Organiser @ Cloud Native Gurugram · ${p.date}</span></div>
          <span class="post-in" aria-hidden="true">in</span>
        </div>
        <span class="post-kind mono">${p.kind}</span>
        <h4>${p.title}</h4>
        <p>${p.text}</p>
        <div class="post-tags mono">${p.tags.join(" ")}</div>
        <div class="post-foot mono dim"><span>👍 ❤️ 💡 ${p.reactions} · ${p.comments} comments</span><span>Read on LinkedIn ↗</span></div>
      </a>`).join("");
  }

  /* ---------------------------------------------------------------- roles */
  function roles() {
    $("#roleGrid").innerHTML = ROLES.map((r, i) => `
      <article class="role reveal">
        <div class="role-top mono"><span class="tag ${r.fit === "primary" ? "pass" : r.fit === "strong" ? "live" : "paper"}">${r.fit.toUpperCase()}</span><span class="dim">0${i + 1}</span></div>
        <h3>${r.title}</h3>
        <p>${r.why}</p>
        <ul>${r.bring.map((b) => `<li>${b}</li>`).join("")}</ul>
      </article>`).join("");
  }

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
            p.append(document.createTextNode(w + " "));
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
      ["Go to research", "section", go("#research")],
      ["Ask my portfolio", "rag", () => { go("#ask")(); setTimeout(() => $("#askInput").focus({ preventScroll: true }), 600); }],
      ["Go to skills", "section", go("#skills")],
      ["Go to community / CNCG", "section", go("#community")],
      ["Go to LinkedIn posts", "section", go("#posts")],
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
      const colors = ["#c6f432", "#a78bfa", "#ecebe6", "#ffbd2e"];
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
  papers(); skills(); community(); posts(); roles(); // before reveals so they get observed
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
