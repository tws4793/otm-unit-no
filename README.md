# OTM Unit Check

A small offline-capable PWA for checking whether a unit number exists at
**Optima @ Tanah Merah** (78–88 Tanah Merah Kechil Avenue).

When a tailgater says where they are going ("Block 82, #06-12"), enter the level and
unit. Block is optional. The app answers **VALID** or **INVALID** straight away.

- Block chips (`Any`, `78`, `80`, `82`, `86`, `88`). With `Any`, the app searches every block and shows
  where the unit is.
- If the unit exists but in a different block from the one named, the app says so.
- Light, dark and system themes.
- Installable ("Add to Home Screen") and works offline after the first visit.

## Unit data

The unit layout lives in [`src/data/units.ts`](src/data/units.ts). It was copied from the
developer's elevation chart and covers 297 units:

| Block | Units | Notes                                                 |
| ----- | ----- | ----------------------------------------------------- |
| 78    | 01–04 | L1 has #01-01 only; L2–3 have 01–02                   |
| 80    | 05–08 | L1–3 have 05–06; penthouse #14-08 spans stacks 07–08  |
| 82    | 09–12 | L1 has #01-10 only; L2–3 have 09–10; penthouse #14-11 |
| 86    | 13–19 | L14 penthouses are #14-13, #14-15, #14-17 and #14-19  |
| 88    | 20–23 | Every level 01–14                                     |

There is no residential Block 84. Each block lists level ranges and the units on those
levels. The tests in `src/data/units.test.ts` check the per-block counts against the
published totals.

## Development

Requires Node 22+.

```sh
npm install
npm run dev          # http://localhost:5173/otm-unit-no/
npm test             # unit tests (Vitest)
npm run typecheck
npm run format       # Prettier
npm run build        # production build to dist/
```

To regenerate the icons after editing `public/favicon.svg`, run `npm run generate-pwa-assets`.

## Deployment

### GitHub Pages

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds the app and
deploys it on every push to the default branch and on every `v*` tag.

The first time only: in **Settings → Pages**, set **Source** to **GitHub Actions**.

The site is served at `https://<user>.github.io/otm-unit-no/`. To use another path, set
`BASE_PATH` when building.

### Docker

```sh
docker compose up -d --build   # http://localhost:8080
```

The image builds with `BASE_PATH=/` and serves the static build from nginx on port 8080.

## Tech stack

Vite, React and TypeScript, with `vite-plugin-pwa` (Workbox) for the manifest and service
worker. It has no backend: the unit list ships with the app, so it works without a network
connection.

## Contributing

Commits follow [Conventional Commits](https://www.conventionalcommits.org/).
