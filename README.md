# 8086 Visual Lab — Interactive Model Collection

**A focused gallery and large-screen viewer for interactive 3D Intel 8086 processor models.** The former Academy's lessons, quizzes, glossary and study progress pages have been removed. No backend, login, database, build step or framework is required.

## What's inside

- **3D Architecture Studio** — original advanced orbitable 3D architecture with telemetry and component inspection.
- **Instruction Flow Explorer** — original animated 3D instruction fetch / decode / execute walkthrough.
- **3D Block Diagram** — original rotatable three-dimensional BIU and EU block model.
- **3D Pin Explorer** — original interactive 40-pin chip with search and min/max operating modes.
- **Classic DIP-40 Model** — original simplified 3D, color-coded pin explorer.
- **Architecture Cycle Lab** — original 2D animated architecture schematic, kept as an additional model.

The model gallery and viewer are the *only* two screens in the new website. All six source visualizations are **preserved as standalone files** in `labs/`. Models run in their own iframe so their JavaScript/CSS dependencies cannot collide. The supplied 8086 pin diagram can be opened from the viewer as a visual reference; there is no separate theory page.

## Start and deploy

1. Extract the ZIP; keep its directory layout unchanged.
2. Serve the `8086-visual-lab/` directory on an HTTP(S) host, e.g. copy **its contents** to `public_html` on Hostinger. Compatible with Vercel, Netlify, GitHub Pages, Cloudflare Pages, and ordinary shared hosting.
3. Open `index.html`. The site initially opens the featured 3D architecture model. Select other models in the left sidebar; use **Model gallery** to browse all six.

For local development: `cd 8086-visual-lab && python -m http.server 8000` then open `http://localhost:8000`. Running from `file://` can break module imports in an original lab; use a local web server.

## Controls

- **Viewer / Model gallery** in the header.
- Click a model in the left sidebar or gallery to launch it.
- **Fullscreen**, **New tab**, **Reload**, **Share**, and **Pin diagram** actions above the model.
- Press **1 through 6** to select models (when not typing in a field).
- On phones, the menu icon opens the model selector.
- Each original model offers its own interactions (drag/orbit, click to inspect, playback and filters).
- Deep linking works through URL hashes, e.g. `#/model/pin-explorer`, without SPA routing configuration.

## File structure

```
8086-visual-lab/
├── index.html
├── README.md
├── assets/
│   ├── app.js
│   ├── styles.css
│   ├── favicon.svg
│   └── 8086-pin-diagram.jpg
└── labs/
    ├── advanced-3d-architecture.html
    ├── processor-explorer.html
    ├── classic-3d-architecture.html
    ├── interactive-pin-explorer.html
    ├── classic-pin-explorer.html
    ├── architecture-lab.html
    └── assets/8086-pinout-reference.png
```

## Notes

- Some original model files depend on third-party CDN resources (Three.js, Tailwind, fonts, icons). Internet access is needed to render them; the new gallery shell itself has no external dependencies.
- Lab simulations illustrate concepts visually, and are not intended as cycle-accurate emulators or electrical design tools.
- Customize gallery names, order, and descriptions in `assets/app.js` (the `MODELS` array). Modify colors/layout in `assets/styles.css`.
