# My — Portfolio

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
