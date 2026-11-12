# ankit.ai — portfolio

Static site: `index.html`, `styles.css`, `main.js`, `assets/`. No build step, no dependencies.

## Run locally
```bash
cd ~/Downloads/ankit-portfolio
python3 -m http.server 8000   # open http://localhost:8000
```

## Deploy (free)
- **GitHub Pages:** push this folder to a repo named `AnkitYadav2809.github.io` and it goes live at https://ankityadav2809.github.io
- **Netlify / Vercel:** drag-and-drop the folder, or import the repo. No build command, publish directory `/`.

## Editing content
| What | Where |
|---|---|
| Research papers (add your other 2 here) | `PAPERS` array at the top of `main.js` |
| "Ask my portfolio" answers | `KB` array in `main.js`, one verified fact per entry. Put retrieval keywords in `extra` |
| Architecture stages | `STAGES` array in `main.js` |
| Metrics, experience, projects | `index.html` |
| Colors / fonts | CSS variables at the top of `styles.css` |
| Photo / résumé | `assets/ankit.jpg`, `assets/Ankit_Yadav_Resume.pdf` |

The résumé PDF includes your phone number. Replace it with a version without the number if you don't want that public.

## Easter eggs
`⌘K` / `Ctrl+K` / `/` opens the command palette. Type `sudo hire ankit`.
