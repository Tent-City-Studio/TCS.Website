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

## Environment Variables

Some scripts may rely on API keys or other secrets. Copy `.env.example` to `.env`
and fill in your values. Use `require('./scripts/config').loadEnv()` in any Node
script to populate `process.env` from this file.

### User Authentication Server

A small Express server (`server.js`) handles account registration and login. It connects to MongoDB using the `MONGODB_URI` environment variable. If no URI is provided, an in-memory MongoDB instance is started automatically for testing.

Run the server with:

```bash
pnpm install
pnpm start
```

The static site is served from the root path, so visit `/login.html` or `/signup.html` to test authentication.
