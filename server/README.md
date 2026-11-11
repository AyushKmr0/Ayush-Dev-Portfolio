# Portfolio API

The API validates contact form submissions and sends them to the Gmail account
configured on the server. It does not store submissions. Profile, skills,
education, and experience are static frontend content; projects are fetched from
GitHub by the frontend.

## Gmail setup

This setup uses Gmail SMTP with an App Password:

1. Turn on 2-Step Verification for the Gmail account that should receive contact
   messages.
2. Create a Google App Password for this server.
3. Copy `.env.example` to `.env` and set `GMAIL_USER` to that Gmail address and
   `GMAIL_APP_PASSWORD` to the generated 16-character password. The password is
   used only by the backend; never put it in the client `.env` or commit it.
4. Set `CLIENT_ORIGIN` to the frontend's exact origin.
5. From this directory, run:

   ```sh
   npm install
   npm run dev
   ```

Google only makes App Passwords available when 2-Step Verification is enabled;
some managed or Advanced Protection accounts may not offer them. If so, use
Gmail OAuth 2.0 instead.

The frontend's `VITE_API_BASE_URL` should point to the API root, for example
`http://localhost:5000/api/v1`.

## API

### `GET /api/v1/health`

Returns API availability.

### `POST /api/v1/contact`

Accepts JSON with `name` (2–60 chars), `email` (valid address, up to 254 chars),
`subject` (3–100 chars), and `message` (10–2000 chars). Values are trimmed and
validated on the server. The email is sent from `GMAIL_USER` to that same
address, with the visitor's email set as `Reply-To`. Successful SMTP submission
returns `202`; invalid submissions return `400`. The endpoint is limited to five
requests per IP in a 15-minute window.
