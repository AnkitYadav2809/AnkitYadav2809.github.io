# ankit.ai — portfolio

Static site: `index.html`, `styles.css`, `main.js`, `walkthrough.js`, `rag.js`, `assets/`. No build step, no dependencies.

## Run locally
```bash
cd ~/Downloads/ankit-portfolio
python3 -m http.server 8000   # open http://localhost:8000
```

## Publishing an update
Browsers cache `styles.css`, `main.js`, `walkthrough.js` and `rag.js`. When you change any of them, bump the `?v=` number on their tags in `index.html` (any new value works, e.g. today's date and time) so visitors get the new version on a normal reload:

```bash
sed -i -E "s/\?v=[0-9]+/?v=$(date +%Y%m%d%H%M)/g" index.html
```

## Deploy (free)
- **GitHub Pages:** push this folder to a repo named `AnkitYadav2809.github.io` and it goes live at https://ankityadav2809.github.io
- **Netlify / Vercel:** drag-and-drop the folder, or import the repo. No build command, publish directory `/`.

## Editing content
Almost everything is data at the top of `main.js`:

| What | Where |
|---|---|
| Experience timeline (headline + one line per point) | `EXPERIENCE` |
| Architecture stages (played in order) | `STAGES` |
| DevLens features and stack · other project cards | `DEVLENS_FEATURES`, `DEVLENS_STACK`, `PROJECTS` |
| Research papers (page previews) | `PAPERS` |
| Skill rows (each row slides the opposite way) | `SKILL_ROWS` |
| Integrations | `INTEGRATIONS` |
| Events (photos crossfade when an event has several) | `EVENTS`, photos in `assets/events/` |
| Sponsors | `PARTNERS`, logos in `assets/sponsors/` |
| Roles carousel | `ROLES` |
| "Ask my portfolio" answers | Built from everything above plus the walkthrough slides; `KB` adds curated facts (see below) |
| Impact numbers, section headings | `index.html` |
| Colors (ink, bone, one neon) | `:root` at the top of `styles.css` |

**Logos:** single-color SVGs in `assets/logos/<slug>.svg` (Simple Icons, CC0). To use a new one, add the file and its slug to `LOGOS` in `main.js`; anything without a logo falls back to a line icon from `GLYPHS`.
**Numbers glow neon automatically** in timeline, project and role text (the `hl()` helper); in `index.html`, wrap a number in `<span class="n">`.
`assets/manifest.json` records where every logo and image came from.

## "Ask my portfolio" (rag.js)
Runs entirely in the visitor's browser, so it works on GitHub Pages as-is:
- **Knowledge base:** built at page load from the site's own data (the tables above, the walkthrough slides and the `KB` fact sheet), about 170 chunks. New content is answerable as soon as it's on the page.
- **Search:** BM25 keyword search right away; semantic search with `bge-small-en-v1.5` (transformers.js from jsDelivr, model from Hugging Face, ~34 MB, cached after the first visit) once the visitor interacts with the Ask box. If the model can't load, it keeps working on keywords alone.
- **Answers:** the retrieved sentences that best match the question, cited. Nothing is generated, and it refuses questions it can't ground.

**After changing content, rebuild the stored vectors** (otherwise new chunks are embedded in each visitor's browser, which works but is slower):
```bash
cd tools && npm install && npm run build-rag   # writes assets/rag/vectors.json; uses /usr/bin/google-chrome (set CHROME_PATH otherwise)
```
To check an answer from the browser console: `await AY.rag.ask("does he know react")`.

The résumé PDF includes your phone number. Replace it with a version without the number if you don't want that public.

## Easter eggs
`⌘K` / `Ctrl+K` / `/` opens the command palette. Type `sudo hire ankit`.
