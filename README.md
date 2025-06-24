# Personal Book-Quote Vault

Offline-first PWA to store quotes with optional AI generation.

## Setup

```bash
pnpm install
pnpm dev
```

Create `wrangler.toml` and set `OPENAI_KEY` for the Cloudflare Worker in `worker.js`.
Deploy with `npx wrangler deploy`.

Build for production:

```bash
pnpm build
```

## Deploy

Upload `dist/` to any static host. Service worker enables offline use.
For the OpenAI proxy run the Cloudflare Worker from `worker.js`.
