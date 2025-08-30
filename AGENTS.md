# Repository Guidelines

## Project Structure & Module Organization
- `src/`: App code. Notable folders: `components/` (UI + shadcn), `pages/`, `hooks/`, `lib/` (e.g., `utils.ts` exports `cn()`), `integrations/supabase/` (client).
- `public/`: Static assets. Use `public/img` for optimized outputs; originals may live in `public/_src`.
- `src/test/`: Test setup (`setup.ts`). Component tests live next to components as `*.test.tsx`.
- Aliases: Import app code via `@/...` (see `tsconfig` paths).

## Build, Test, and Development Commands
- `npm run dev`: Start Vite dev server.
- `npm run build`: Production build.
- `npm run build:dev`: Development-mode build (faster, less optimized).
- `npm run preview`: Preview built app locally.
- `npm run lint`: Lint TypeScript/React with ESLint.
- `npm test`: Run Vitest (jsdom + RTL).
- `node scripts/optimize-images.mjs`: Batch-optimize images into `public/img`.

## Coding Style & Naming Conventions
- Language: TypeScript + React. Prefer functional components and hooks.
- Files: `PascalCase.tsx` for components, `camelCase.ts` for utilities; tests `*.test.tsx`.
- Imports: Prefer `@/` alias; group external → internal; keep relative depth shallow.
- Styling: Tailwind CSS utilities; compose classes with `cn()` from `@/lib/utils`.
- Linting: ESLint configured in `eslint.config.js` (React Hooks rules, refresh plugin). Fix or justify warnings before PR.

## Testing Guidelines
- Frameworks: Vitest + Testing Library (`@testing-library/react`, `@testing-library/jest-dom`).
- Scope: Test component rendering, interactions, and visible side-effects. Mock network where needed.
- Conventions: Co-locate tests as `ComponentName.test.tsx`. Keep tests deterministic and accessible-first.
- Run: `npm test` locally; add new tests for bug fixes and new features.

## Commit & Pull Request Guidelines
- Commits: Short, descriptive, imperative mood (e.g., "Add product pages and configurator"). Group related changes.
- PRs: Include clear description, linked issues, and screenshots/GIFs for UI changes. List noteworthy decisions and follow-up tasks.
- Quality gate: Ensure `npm run lint` and `npm test` pass. For assets, run `node scripts/optimize-images.mjs` when adding large images.

## Security & Configuration
- Env: Provide `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in `.env` (never commit secrets). Supabase auth persists in `localStorage`.
- Deploy: `vercel.json` sets CSP and headers; ensure new endpoints and analytics domains are reflected there if added.
