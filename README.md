# TentCity Software Website

This repository contains the static website for **TentCity Software**. It is built with semantic HTML5, Tailwind CSS and vanilla JavaScript.

## Getting Started

1. Clone the repo and run `pnpm install` (optional: only needed if you plan to run the test script).
2. Open `site/index.html` in your browser or serve the `site` folder with any static server:
   ```bash
   npx serve site
   ```

No build step is required as Tailwind is loaded via CDN.

## Development

- All assets live in the `static` folder.
- Sample images are stored under `static/images`.
- Pages are located in the `site` directory:
  - `index.html`
  - `games.html`
  - `screenshots.html`
  - `blog.html`
  - `contact.html`
  - `404.html`
- Custom styles and scripts are in `site/style.css` and `site/script.js`.

## Node Scripts

Run `pnpm test` to execute the placeholder test script.
