# LMS Platform

An Astro.build-powered Learning Management System platform. The **D439 Foundations of Nursing** exam-review LMS is the first available module, with more modules to be added over time.

## Live Site

https://sagreenxyz.github.io/d439-oa-preparation/

## Available Modules

| Module | Description |
|--------|-------------|
| [D439 — Foundations of Nursing](https://sagreenxyz.github.io/d439-oa-preparation/d439/) | Interactive exam-review LMS covering all 21 WGU D439 units |

## Project Structure

```
/
├── astro.config.mjs        Astro configuration (base URL, output mode)
├── package.json
├── tsconfig.json
├── public/
│   └── d439/               Static assets for the D439 module
│       ├── css/styles.css
│       └── js/             app.js · curriculum.js · marked.min.js
└── src/
    ├── components/
    │   └── ModuleCard.astro  Reusable module card component
    ├── layouts/
    │   └── Layout.astro      Base HTML layout
    └── pages/
        ├── index.astro       Homepage — lists all LMS modules
        └── d439/
            └── index.astro   D439 Foundations of Nursing LMS
```

## Development

```bash
npm install
npm run dev      # start local dev server
npm run build    # build static site to dist/
npm run preview  # preview the built site locally
```

## Adding a New Module

1. Add a new page under `src/pages/<module-id>/index.astro`
2. Copy or create static assets in `public/<module-id>/`
3. Register the module in the `modules` array in `src/pages/index.astro`

## Deployment

Pushes to `main` trigger a GitHub Actions workflow that:
1. Installs dependencies (`npm ci`)
2. Builds the Astro site (`npm run build`)
3. Deploys `dist/` to GitHub Pages
