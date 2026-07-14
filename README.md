# Omnia Ali — Portfolio

A static, no-build-step portfolio site. No npm install, no framework — just open it or drop it on any static host.

## Run it locally

Just double-click `index.html`, or for the most reliable experience (some browsers restrict local file access for JS modules), serve it with a tiny local server:

```bash
cd omnia-ali-portfolio
python3 -m http.server 8080
# then open http://localhost:8080
```

## Deploy it (all free, all drag-and-drop)

- **Netlify** — go to app.netlify.com/drop and drag the whole folder in.
- **Vercel** — `npx vercel` from inside the folder.
- **GitHub Pages** — push this folder to a repo, enable Pages on the `main` branch.

## Structure

```
index.html            all page content
css/style.css          design system + layout
js/main.js              nav, tabs, typing effect, certificate lightbox, scroll reveals
js/robot.js              the interactive 3D robot (Three.js)
js/vendor/               local copies of Three.js + GSAP (no CDN dependency, works offline)
assets/me/               your 4 personal photos
assets/projects/         18 project screenshots
assets/certs/            12 certificate images
assets/resume/           downloadable résumé PDF
```

## Things you'll likely want to customize

- **Résumé file**: swap `assets/resume/Omnia-Ali-Resume.pdf` for whichever CV you want people downloading — the button in the nav and footer both point to that exact filename, so keep the name the same or update the two `href` links in `index.html`.
- **Phone number**: left out of the Contact section by default for privacy — add it next to the email button in `index.html` if you want it public.
- **Two projects without a specific GitHub link** (Scratch vs. Keras, Recipe Finder): currently link to your GitHub profile instead of a repo — add the real repo URL in `index.html` once it's public, in the two `<a class="btn btn-ghost btn-sm">GitHub Profile` lines.
- **Colors**: everything is driven by the CSS variables at the top of `css/style.css` (`--violet`, `--cyan`, `--void`, etc.) — change those and the whole palette updates.

## Notes on a few choices I made

- Customer-facing/hospitality roles from your CVs weren't included in Experience — I kept the section focused on AI/backend/data/automation work to match the "AI Engineer & Backend Developer" identity. Happy to add them back in if you'd like a fuller picture.
- The Education section isn't in the top nav (it sits right after About in the scroll order) — easy to add as a 7th nav link if you want direct access to it.
