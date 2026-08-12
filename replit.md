# Paper Street

Paper Street is a Kenya-focused virtual office platform offering professional business addresses, mail handling, and flexible workspace memberships.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/presencehq run dev` — run the Paper Street website (managed workflow supplies `PORT` and `BASE_PATH`)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/presencehq/src/pages/pricing.tsx` — pricing page with onboarding requirements and payment structure
- `artifacts/presencehq/src/components/home/FeaturedPackages.tsx` — Basic, Professional, and Premium membership cards
- `attached_assets/Pasted-Virtual-Office-Packages-Basic-Professional-Premium-Annu_1786539761576.txt` — user-provided pricing source

## Architecture decisions

- The Paper Street site remains in the imported React/Vite workspace; no framework or package migration was performed.
- Annual and monthly prices are represented directly from the supplied terms; monthly deposits are shown separately and are not added to the recurring price.

## Product

The site presents Paper Street virtual office memberships, business address and mail services, flexible workspace offerings, locations, contact/onboarding information, and legal policies.

## User preferences

- Brand name: Paper Street.
- Public domain: paperstreet.africa.
- Pricing and membership terms must follow the uploaded Basic, Professional, and Premium package document.

## Gotchas

- The Vite config requires `PORT` and `BASE_PATH`; use the managed artifact workflow or provide both variables for manual commands.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
