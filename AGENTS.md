# Repository Guidelines

## Project Structure & Module Organization
- `src/`: Application code.
  - `components/`: UI (shadcn) and hooks-driven components.
  - `pages/`: Route-level views.
  - `hooks/`, `lib/` (e.g., `@/lib/utils.ts` exports `cn()`), `integrations/supabase/` (client setup).
- `public/`: Static assets. Place optimized outputs in `public/img`; keep originals in `public/_src`.
- `src/test/`: Test setup (`setup.ts`). Component tests live next to components as `*.test.tsx`.
- Aliases: Import app code via `@/...` (see `tsconfig` paths) to avoid deep relatives.

## Build, Test, and Development Commands
- `npm run dev`: Start the Vite dev server.
- `npm run build`: Production build (optimized).
- `npm run build:dev`: Faster development-mode build.
- `npm run preview`: Serve the built app locally.
- `npm run lint`: Lint TypeScript/React with ESLint.
- `npm test`: Run Vitest (jsdom + React Testing Library).
- `node scripts/optimize-images.mjs`: Batch-optimize images into `public/img`.

## Coding Style & Naming Conventions
- Language: TypeScript + React functional components and hooks.
- Files: Components `PascalCase.tsx`; utilities `camelCase.ts`; tests `*.test.tsx`.
- Styling: Tailwind CSS utilities; compose classes with `cn()` from `@/lib/utils`.
- Imports: External → internal; prefer `@/` aliases.
- Linting: ESLint via `eslint.config.js` (React Hooks rules, refresh plugin). Fix or justify warnings.

## Testing Guidelines
- Frameworks: Vitest + Testing Library + `@testing-library/jest-dom`.
- Scope: Render, interactions, and visible side-effects; mock network I/O.
- Placement: Co-locate tests with components (`ComponentName.test.tsx`).
- Run: `npm test`. Keep tests deterministic and accessible-first.

## Commit & Pull Request Guidelines
- Commits: Imperative, concise (e.g., "Add product pages and configurator"). Group related changes.
- PRs: Clear description, linked issues, and screenshots/GIFs for UI changes. Note decisions and follow-ups.
- Quality gate: Ensure `npm run lint` and `npm test` pass; optimize new large images.

## Security & Configuration
- Env: Provide `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in `.env` (do not commit secrets). Supabase auth persists in `localStorage`.
- Deploy: `vercel.json` sets CSP/headers—update when adding endpoints or analytics domains.
