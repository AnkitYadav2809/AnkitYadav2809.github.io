# ankit.ai — portfolio

Static site: `index.html`, `styles.css`, `main.js`, `assets/`. No build step, no dependencies.

## Run locally
```bash
cd ~/Downloads/ankit-portfolio
python3 -m http.server 8000   # open http://localhost:8000
```

## Publishing an update
Browsers cache `styles.css`, `main.js` and `walkthrough.js`. When you change any of them, bump the `?v=` number on their tags in `index.html` (any new value works, e.g. today's date and time) so visitors get the new version on a normal reload:

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
| "Ask my portfolio" answers | `KB`, one verified fact per entry; retrieval keywords in `extra` |
| Impact numbers, section headings | `index.html` |
| Colors (ink, bone, one neon) | `:root` at the top of `styles.css` |

**Logos:** single-color SVGs in `assets/logos/<slug>.svg` (Simple Icons, CC0). To use a new one, add the file and its slug to `LOGOS` in `main.js`; anything without a logo falls back to a line icon from `GLYPHS`.
**Numbers glow neon automatically** in timeline, project and role text (the `hl()` helper); in `index.html`, wrap a number in `<span class="n">`.
`assets/manifest.json` records where every logo and image came from.

The résumé PDF includes your phone number. Replace it with a version without the number if you don't want that public.

## Easter eggs
`⌘K` / `Ctrl+K` / `/` opens the command palette. Type `sudo hire ankit`.
