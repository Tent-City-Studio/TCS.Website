# TentCity Software Website

This repository contains a static five‑page website for **TentCity Software**, built with semantic HTML5, Tailwind CSS (via CDN) and vanilla JavaScript.

## Getting Started

1. Clone the repo and optionally run `pnpm install` (only needed for the placeholder test script).
2. Open `site/index.html` directly or serve the `site` folder with any static server:
   ```bash
   npx serve site
   ```

No build step is required because Tailwind is loaded from the CDN and all assets are prebuilt.

## Structure

- **site** – HTML pages, shared header, scripts and styles
- **site/assets** – placeholder images used across the demo
- **site/css/styles.css** – small custom CSS additions
- **site/js/main.js** – handles menu toggle, lightbox, filters and scroll‑reveal

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
