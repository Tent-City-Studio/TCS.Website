# Changelog

## [Unreleased]
- Moved production site into `docs/` folder for GitHub Pages.
- Added `.nojekyll` to skip Jekyll processing.
- Updated all documentation and internal paths for relative linking.
- Verified navigation and assets work from both local server and GitHub Pages URL.
- CI tests (`pnpm test`) continue to pass.

### Testing checklist
- ✅ Site loads from both http://localhost and the GitHub Pages sub-URL.
- ✅ All nav links, CTAs, images, scripts, and CSS load with no 404s.
- ✅ Console free of errors; Lighthouse ≥ 90 in all categories.
