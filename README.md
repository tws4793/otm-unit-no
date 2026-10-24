# OTM Unit Check

A small offline-capable PWA for checking whether a unit number exists at
**Optima @ Tanah Merah** (78–88 Tanah Merah Kechil Avenue).

When a tailgater says where they are going ("Block 82, #06-12"), enter the level and
unit. Block is optional. The app answers **VALID** or **INVALID** straight away.

- Block chips (`Any`, `78` … `88`). With `Any`, the app searches every block and shows
  where the unit is.
- If the unit exists but in a different block from the one named, the app says so.
- Light, dark and system themes.
- Installable ("Add to Home Screen") and works offline after the first visit.

## Unit data

The unit layout lives in [`src/data/units.ts`](src/data/units.ts). Each block lists its
unit stacks and level range, plus optional `absent` / `extra` units for exceptions such as
penthouses.

> [!IMPORTANT]
> The bundled layout is a best-effort placeholder: 6 blocks, levels 01–14, with stacks
> spread across blocks. It is **not** verified. Replace it with the real stacks from the
> MCST unit register, then set `verified: true` to hide the in-app warning.

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
