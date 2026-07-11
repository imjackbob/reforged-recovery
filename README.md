# Reforged Recovery Inc. — Website

Marketing/informational website for **Reforged Recovery Inc.**, a nonprofit
addiction recovery organization.

> _"What was once broken can be Reforged into something stronger."_

The brand metaphor is **reforging** — taking something broken and, through heat
and pressure on the anvil, transforming it into something stronger. That idea
runs through the design (forge/ember/steel palette) and the copy.

---

## Tech stack

| Layer      | Tech                                                        |
| ---------- | ----------------------------------------------------------- |
| Frontend   | React 19 + Vite 8, React Router 7, Tailwind CSS 4           |
| Backend    | ASP.NET Core Web API (.NET 8)                               |
| Database   | PostgreSQL (production) · SQLite (local dev, zero setup)    |
| Email      | Console (dev) · SendGrid or SMTP (production)               |
| Donations  | Hosted platform embed (Donorbox / Givebutter) — no PCI code |

The repo is split into two folders:

```
/client   → React single-page app (the marketing site)
/server   → ASP.NET Core Web API (form submissions + email notifications)
```

Only the pieces that genuinely need a server live in `/server`: storing form
submissions and emailing staff. Everything else (donations, podcast players,
analytics) is handled by third-party embeds so there's less to maintain and no
PCI/compliance burden.

---

## Prerequisites

- **Node.js** 20+ and npm
- **.NET SDK** 8.0+
- (Optional) **Docker** — to run PostgreSQL locally or containerize the API

---

## Quick start (local dev)

Open two terminals.

### 1. Backend (API)

```bash
cd server/ReforgedRecovery.Api
dotnet run
# → http://localhost:5254   (health check: http://localhost:5254/health)
```

Out of the box the API uses **SQLite** (a local `reforged.db` file, created
automatically) and **console "email"** (submissions are logged, not sent). No
database install or API keys required.

### 2. Frontend (client)

```bash
cd client
npm install
npm run dev
# → http://localhost:5173
```

The Vite dev server proxies `/api/*` to `http://localhost:5254`, so forms submit
to the backend with no extra config. Submit any form and watch the API terminal
print the "email" it would have sent.

---

## How the forms work

Every form on the site (Get Help intake, Anvils "notify me", Volunteer sign-up,
Partnership inquiry, Contact) funnels through **one** backend endpoint and lands
in **one** database table, distinguished by a `formType` field.

```
React <Form> (config-driven)
   → client validation + honeypot
   → POST /api/forms/submit  { formType, name, email, phone, message, metadata }
   → server validation + sanitization + rate limiting
   → store in FormSubmissions table
   → email staff (best-effort)
   → { success, message }
```

- **Client:** `client/src/components/forms/` — `Form.jsx` renders any config from
  `formConfigs.js`; `useForm.js` handles state/validation/submit.
- **Server:** `server/…/Program.cs` — the `POST /api/forms/submit` endpoint.

**Adding a new form later** (e.g. the future recovery-housing application) is
just a new config object in `formConfigs.js` rendered with `<Form>` — no new
backend plumbing. Placeholders for these Phase 2 forms are noted in code
comments.

---

## Configuration & secrets

### Client (`client/.env`)

Copy `client/.env.example` → `client/.env`. The only variable is
`VITE_API_BASE_URL` (leave empty for local dev and same-origin production).

### Server

Config lives in `server/ReforgedRecovery.Api/appsettings.json`. **Never commit
real secrets.** For local secrets use user-secrets or environment variables;
in production use your host's secret manager / env vars. Env var names use `__`
as the section separator (e.g. `Email__SendGridApiKey`).

| Setting                        | Purpose                                        | Local default        |
| ------------------------------ | ---------------------------------------------- | -------------------- |
| `Database:Provider`            | `Sqlite` or `Postgres`                         | `Sqlite`             |
| `ConnectionStrings:Default`    | DB connection string                           | `Data Source=reforged.db` |
| `Cors:AllowedOrigins`          | Origins allowed to call the API                | `http://localhost:5173` |
| `Email:Provider`               | `Console`, `SendGrid`, or `Smtp`               | `Console`            |
| `Email:StaffInbox`             | Where form notifications are sent              | placeholder          |
| `Email:FromEmail` / `FromName` | Verified sender identity                       | placeholder          |
| `Email:SendGridApiKey`         | SendGrid API key (if provider = SendGrid)      | empty                |
| `Email:Smtp*`                  | SMTP host/port/user/password (if provider=Smtp)| empty                |

#### Plugging in real API keys

**Email — SendGrid**

```bash
cd server/ReforgedRecovery.Api
dotnet user-secrets init
dotnet user-secrets set "Email:Provider" "SendGrid"
dotnet user-secrets set "Email:SendGridApiKey" "SG.your-real-key"
dotnet user-secrets set "Email:StaffInbox" "staff@reforgedrecovery.org"
dotnet user-secrets set "Email:FromEmail" "no-reply@reforgedrecovery.org"
```

(The `FromEmail` must be a verified sender/domain in SendGrid.) SMTP works the
same way — set `Email:Provider` to `Smtp` and the `Email:Smtp*` values.

**Donations — Donorbox / Givebutter**

No API key needed. Two steps:

1. In `client/src/data/site.js`, set `ORG.donateUrl` to the hosted donation page.
2. On the Get Involved page (`client/src/pages/GetInvolved.jsx`), replace the
   "Donation widget" placeholder with the platform's embed snippet (the exact
   Donorbox iframe/script is shown in a code comment there).

**Analytics — Google Analytics / Plausible**

Paste the provider's snippet into `client/index.html` where the
`ANALYTICS` comment is (in `<head>`). Left out of source so nothing tracks in dev.

**Podcast embeds**

Add each episode's Spotify/Apple/YouTube **embed URL** to `embedUrl` in
`client/src/data/episodes.js` (or a plain link via `link`). The `EpisodeList`
component renders an iframe or a "Listen" button automatically.

---

## Database & migrations

The committed EF Core migration (`server/…/Migrations/`) is generated for
**PostgreSQL** (the production target).

- **SQLite (dev):** schema is created automatically on first run
  (`EnsureCreated`). Nothing to do.
- **PostgreSQL (prod):** the API runs `Database.Migrate()` on startup, applying
  migrations automatically.

Run against Postgres locally with Docker:

```bash
cd server
docker compose up --build       # Postgres + API; API on http://localhost:5254
```

Create a new migration after changing the model:

```bash
cd server/ReforgedRecovery.Api
dotnet ef migrations add <Name>   # requires: dotnet tool install -g dotnet-ef
```

---

## Building for production

**Client** (static build):

```bash
cd client
npm run build      # outputs to client/dist/
```

Deploy `client/dist/` to any static host (Vercel, Netlify, Azure Static Web
Apps). SPA fallback is preconfigured (`public/_redirects` for Netlify,
`vercel.json` for Vercel) so deep links don't 404.

**Server** (containerized API):

```bash
cd server/ReforgedRecovery.Api
docker build -t reforged-api -f Dockerfile .
```

Deploy to Azure App Service, a container host, etc. Set the production env vars
(DB provider + connection string, email provider + key, allowed CORS origin).
Terminate HTTPS/SSL at the platform's load balancer / reverse proxy.

---

## Project structure

```
client/
  src/
    components/       Layout, Header, Footer, Seo, EpisodeList
      ui/             Design-system primitives (Button, Card, Section, …)
      forms/          Config-driven form system (Form, Field, useForm, configs)
    data/             Site content: nav, team, programs, episodes, resources
    lib/              api client + validation
    pages/            One file per route (11 pages + 404)
    index.css         Tailwind theme (forge/ember/steel design tokens)
  public/             favicon, og-image, robots.txt, sitemap.xml, SPA redirects
server/
  ReforgedRecovery.Api/
    Program.cs        App wiring + POST /api/forms/submit endpoint
    Models/           FormSubmission (entity) + FormSubmissionRequest (DTO)
    Data/             EF Core DbContext + design-time factory
    Services/         IEmailService + Console/SendGrid/SMTP implementations
    Migrations/       EF Core migration (PostgreSQL)
  docker-compose.yml  Postgres + API for local production-like runs
```

---

## Accessibility, SEO & performance

- **Accessibility (WCAG 2.1 AA):** semantic HTML and heading hierarchy, labelled
  and keyboard-navigable forms with focused error handling, a skip link, visible
  focus rings, `prefers-reduced-motion` support, and alt text on images. The
  brand palette was contrast-checked against AA ratios (see `index.css`).
- **SEO:** per-page `<title>`/description + Open Graph tags (`Seo` component),
  semantic headings, `sitemap.xml`, `robots.txt`, and an OG share image.
- **Performance:** route-level code splitting (`React.lazy`), a separate vendor
  chunk, lazy-loaded images/iframes, and a small CSS bundle — aimed at a
  Lighthouse performance score of 90+.
- **Security:** server-side validation + sanitization on every submission, a
  per-IP rate limit (5/min) on the form endpoint, a honeypot field on public
  forms, CORS locked to configured origins, and HTTPS enforced in production.

---

## Out of scope (Phase 2)

Flagged in code comments, intentionally **not** built:

- Online classes / recovery education platform
- Member / resident portal (needs auth + role-based access)
- Volunteer database + admin dashboard
- Full events calendar system
- Online support groups

The Anvils recovery housing programs are marked **"Coming Soon"** with a
notify-me form (not a full application), since they aren't operational yet.
```
