# TentCity Software Website

This repository contains a static five‑page website for **TentCity Software**, built with semantic HTML5, Tailwind CSS (via CDN) and vanilla JavaScript.

## Getting Started

1. Clone the repo and optionally run `pnpm install` (only needed for the placeholder test script).
2. Open `docs/index.html` directly or serve the `docs` folder with any static server:
   ```bash
   npx serve docs
   ```

No build step is required because Tailwind is loaded from the CDN and all assets are prebuilt.

## Structure

- **docs** – HTML pages, shared header, scripts and styles
- **docs/assets** – placeholder images used across the demo
- **docs/css/styles.css** – small custom CSS additions
- **docs/js/main.js** – handles menu toggle, lightbox, filters and scroll‑reveal

## Development Notes

Pages included:
- `index.html`
- `games.html`
- `screenshots.html`
- `blog.html`
- `contact.html`
- `404.html`

To run the placeholder tests simply execute:
```bash
pnpm test
```

## GitHub Pages Deployment

This repository uses the **`docs/` folder on `main`** as the publish root. After
pushing to GitHub, enable GitHub Pages in the repository settings and choose
`main` / `docs` as the source. The site will then be available at:

```
https://<username>.github.io/TCS.Website/
```

Because all internal references use relative paths (e.g. `./games.html` and
`./css/styles.css`), the site works both from the repository root and when
viewed locally.

To bypass Jekyll processing a `.nojekyll` file is included in the `docs` folder.
Add a `CNAME` file if you wish to configure a custom domain.
