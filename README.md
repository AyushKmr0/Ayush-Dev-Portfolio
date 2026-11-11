# Ayush Portfolio

A React portfolio frontend and a small Express API for sending contact form
submissions to Gmail. Contact messages are validated and emailed; they are not
stored in a database.

## Requirements

- Node.js `24.12.0` or newer
- npm `11` or newer

## Local development

Install dependencies from the repository root so npm can install both
workspaces:

```sh
npm install
```

Create local environment files from the examples:

```sh
cp client/.env.example client/.env
cp server/.env.example server/.env
```

Set the Gmail account and 16-character Gmail App Password in `server/.env`.
Then run both apps with `npm run dev`. The Vite client runs at
`http://localhost:5173` and the API runs at `http://localhost:5000`.

Useful commands:

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts client and server in parallel |
| `npm run dev:client` | Starts only the Vite client |
| `npm run dev:server` | Starts only the API |
| `npm run build` | Builds both workspaces |
| `npm test` | Runs the client test suite once |
| `npm run lint` | Lints the client |

## Deployment

The frontend and API are separate deployable services. Build and deploy the
client as a static site, and deploy the server to a Node.js host. Use HTTPS for
both services in production.

### Frontend

- Build command: `npm run build --workspace=client`
- Publish directory: `client/dist`
- Set `VITE_API_BASE_URL` at build time to `https://<your-api-host>/api/v1`.
- Configure the static host to serve `index.html` for application routes (SPA
  fallback).

### API

- Build command: `npm run build --workspace=server`
- Start command: `npm run start --workspace=server`
- Configure these server environment variables in the hosting dashboard:

  - `NODE_ENV=production`
  - `CLIENT_ORIGIN=https://<your-frontend-domain>` (exact origin, no path)
  - `GMAIL_USER` (the receiving Gmail account)
  - `GMAIL_APP_PASSWORD` (a Gmail App Password; keep it server-side)
  - `PORT` (usually supplied by the host)

After deployment, check `https://<your-api-host>/api/v1/health` and submit a
test contact form. The frontend cannot send contact emails until the API is
deployed, its CORS origin matches the frontend domain, and valid Gmail
credentials are configured.

Never commit `.env` files or put Gmail credentials in client-side `VITE_*`
variables. Only the API URL belongs in the frontend environment.
