# 8086 Academy — Complete Interactive Learning Website

A self-contained static learning portal combining the six supplied Intel 8086 HTML visualizations, the supplied pin-diagram reference, and a new guided learning experience. **No backend, database, login, build tools, or installation required.**

## What learners get

- A responsive course homepage with sidebar and navigation.
- **8 guided lessons**: an introduction to the 8086; its pins; minimum/maximum mode; BIU/EU and pipelining; registers/flags; segmentation/address calculation; timing and bus cycles; and interrupts/instruction execution.
- A **40-pin interactive DIP diagram** with selectable pins, explanations, min/max toggling, and the original uploaded pinout image.
- **6 fully included original labs** with their interactive 2D/3D models and controls preserved. Different versions of Three.js are isolated so they do not conflict.
- A **12-question quiz** with correct-answer explanations and the best score saved locally.
- A searchable glossary and global search across lessons, labs, glossary and pin descriptions.
- Completion tracking saved to the browser's **localStorage** (per browser/device only).

## Quick start

1. Extract the ZIP, keeping all files and folders together.
2. Open `index.html` for the static course pages and reference materials.
3. For the best experience (especially 3D modules), serve the directory through a local web server or publish it to a static host.

**Simple local server** (with Python installed):

```bash
cd 8086-learning-hub
python -m http.server 8000
```

Visit `http://localhost:8000`.

**Deploy to Hostinger, cPanel, Netlify, Vercel, Cloudflare Pages, or GitHub Pages:** Upload the *contents* of this directory to your website's document root, or deploy the folder directly as a static site. No build command is required. All navigation stays within `index.html` using URL hashes, so custom SPA rewrite rules are not required.

## Directory structure

```text
8086-learning-hub/
├── index.html                    ← Entry point
├── README.md
├── assets/
│   ├── app.js                    ← Lessons, quiz, pinout, navigation, progress
│   ├── styles.css                ← Responsive visual design
│   ├── favicon.svg
│   ├── 8086-pin-diagram.jpg       ← Original uploaded reference diagram
│   ├── 8086-architecture-reference.svg
│   └── *-preview.png             ← Preview images
└── labs/
    ├── interactive-pin-explorer.html
    ├── architecture-lab.html
    ├── advanced-3d-architecture.html
    ├── processor-explorer.html
    ├── classic-3d-architecture.html
    ├── classic-pin-explorer.html
    └── assets/8086-pinout-reference.png
```

## Included original files

| Uploaded HTML file | Lab path in this website |
|---|---|
| `index.html` | `labs/interactive-pin-explorer.html` |
| `index (10).html` | `labs/architecture-lab.html` |
| `8086_microprocessor_3d_architecture.html` | `labs/advanced-3d-architecture.html` |
| `8086_microprocessor_explorer.html` | `labs/processor-explorer.html` |
| `8086-architecture-v2.html` | `labs/classic-3d-architecture.html` |
| `index .html` | `labs/classic-pin-explorer.html` |

## Connectivity and scope

The learning shell, text lessons, 2D reference diagram, quiz, and glossary are local HTML/CSS/JS. Several **original** 3D labs load Three.js, Tailwind CSS, fonts, icons or animation libraries from public CDNs; an internet connection may be required for those visualizations. A local web server or HTTPS host is recommended for the modern ES-module-based pin viewer.

The cycle animations are **educational visualizations**, not a cycle-accurate 8086 hardware emulator. For physical circuit design, check the official processor datasheet for electrical and timing characteristics.

## Customizing the site

- Edit lesson text, quiz items, glossary, pin metadata, and lab links in `assets/app.js`.
- Change typography, spacing and colors in `assets/styles.css`.
- Replace assets (keeping their paths), or modify any lab's standalone HTML under `labs/` without affecting other labs.
- Browser progress can be cleared by clearing site data for this domain; there are no user accounts or cloud synchronization.
