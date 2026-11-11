# Portfolio API

The API validates contact form submissions and sends them through the Resend
Email API. Messages are not stored in a database. Resend is called over HTTPS,
so this works on hosts such as Render Free that block outbound SMTP.

## Email setup

1. Create a Resend account and an API key.
2. For production, add a domain you control to Resend and complete its DNS
   verification. Use an address on that verified domain as `RESEND_FROM`.
3. Copy `.env.example` to `.env` and set:
   - `CONTACT_TO_EMAIL`: the inbox where contact messages should arrive.
   - `RESEND_API_KEY`: the secret Resend API key. Keep it server-side.
   - `RESEND_FROM`: a sender address on the domain verified with Resend.
   - `CLIENT_ORIGIN`: the frontend's exact origin, with no trailing slash.
4. From the repository root, run `npm run dev:server` (or `npm run dev` to run
   both workspaces).

Resend's `onboarding@resend.dev` sender is for testing and restricts recipients
to your own verified address. It is not suitable for the public contact form.
The frontend's `VITE_API_BASE_URL` should point to the API root, for example
`http://localhost:5000/api/v1`.

## API

### `GET /api/v1/health`

Returns API availability.

### `POST /api/v1/contact`

Accepts JSON with `name` (2–60 chars), `email` (valid address, up to 254 chars),
`subject` (3–100 chars), and `message` (10–2000 chars). Values are trimmed and
validated on the server. The API sends the message using `RESEND_FROM`, delivers
it to `CONTACT_TO_EMAIL`, and sets the visitor's address as `Reply-To`. A
successful Resend submission returns `202`; invalid submissions return `400`.
The endpoint is limited to five requests per IP in a 15-minute window.
