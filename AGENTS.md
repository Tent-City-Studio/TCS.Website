# Contributor Guide

## Dev Environment Tips
- Use `npm run <script> --workspace=<project_name>` to run scripts in a specific package.
- Run `npm install` in the repo root to install all dependencies.
- Use `npm create vite@latest <project_name> -- --template react-ts` to create a new React + Vite package with TypeScript.
- Check the `name` field inside each package's `package.json` to confirm the correct name—skip the top-level one.

## Testing Instructions
- Find the CI plan in the `.github/workflows` folder.
- Run `npm test --workspace=<project_name>` to run all tests for that package.
- From the package root, you can just call `npm test`. The commit should pass all tests before you merge.
- To focus on one test, use your test runner's pattern matching (e.g., `vitest run -t "<test name>"` if using Vitest).
- Fix any test or type errors until the whole suite is green.
- After moving files or changing imports, run `npm run lint --workspace=<project_name>` to be sure ESLint and TypeScript rules still pass.
- Add or update tests for the code you change, even if nobody asked.

## PR instructions
Title format: `[<project_name>] <Title>`
