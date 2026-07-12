# Migration Plan: Supabase → Neon (+ new auth)

**Status:** Draft for review · **Author:** drafted with Claude, for Marko to edit
**Goal:** Move the database off Supabase (which auto-pauses/deletes on the free tier) onto
Neon Postgres, and replace Supabase Auth with something we control. End state: Supabase can
be deleted entirely.

---

## 1. Why we're doing this

- Supabase free tier pauses after inactivity and eventually **deletes** the project (this
  already happened once — the project host stopped resolving via DNS). The keep-alive GitHub
  Action was a band-aid that didn't hold.
- Neon's free tier behaves differently: compute **scales to zero** when idle but **wakes
  automatically on the next query (~0.5s)** — no manual restore, no deletion. This fixes the
  actual pain.
- The DB engine (Postgres) stays the same, so the data migration is near-trivial. The real
  work is replacing Supabase Auth.

**Non-goals:** No change to the public site's behaviour, the admin UX, or the content itself.
This is an infrastructure swap that should be invisible to end users.

---

## 2. What Supabase currently does for us (scope)

Two independent concerns:

### 2a. Database (easy to move)
- Postgres, `public` schema, **3 tables**:
  - `eras` — `id uuid`, `name text`, `sort_order int` — **8 rows**
  - `architects` — `id uuid`, `era_id uuid → eras`, `name text`, `sort_order int` — **34 rows**
  - `links` — `id uuid`, `architect_id uuid → architects`, `title text`, `url text`, `sort_order int` — **125 rows**
- Read path: `GET /api/links` (`src/app/api/links/route.ts`) assembles the nested `Era[]`.
- Write path: `src/app/admin/actions.ts` — 15 server actions (CRUD + reorder for each table).
- Accessed via `@supabase/supabase-js` through two client helpers:
  - `src/lib/supabase/server.ts` (`createClient()`, cookie-based, server)
  - `src/lib/supabase/client.ts` (`createClient()`, browser)

### 2b. Auth (the real work)
- Single admin user. Email/password login.
- `src/app/admin/_components/LoginForm.tsx` — client component calling
  `supabase.auth.signInWithPassword`.
- `src/middleware.ts` → `src/lib/supabase/middleware.ts` (`updateSession`) — gates `/admin/*`,
  redirects unauthenticated users to `/admin/login`, and logged-in users away from the login page.
- `requireAuth()` in `actions.ts` — calls `supabase.auth.getUser()` and throws `Unauthorized`
  if absent; every one of the 15 actions calls it first.
- `signOut()` action calls `supabase.auth.signOut()`.

### File inventory (everything that touches Supabase)
| File | Concern | Fate |
|------|---------|------|
| `src/lib/supabase/server.ts` | data + auth | replace → `src/lib/db.ts` |
| `src/lib/supabase/client.ts` | auth (browser) | delete |
| `src/lib/supabase/middleware.ts` | auth | replace with session check |
| `src/middleware.ts` | auth | rename → `src/proxy.ts`, rewrite (keep matcher) |
| `src/app/admin/actions.ts` | data + auth | rewrite queries + `requireAuth`/`signOut` |
| `src/app/api/links/route.ts` | data | rewrite query |
| `src/app/admin/_components/LoginForm.tsx` | auth | call a server action instead of Supabase |
| `.env.local` / `.env` | both | swap vars (see §7) |
| `.github/workflows/supabase-keep-alive.yml` | ops | delete after cutover |

---

## 3. Target architecture

- **Database:** Neon Postgres (same 3 tables, same schema).
- **DB access — DECIDED:** `@neondatabase/serverless` driver with tagged-template SQL, **raw (no
  ORM)**. HTTP-based, so it's safe on Vercel serverless (no connection-pool exhaustion, no pooler
  config). ~15 small queries — Drizzle would be over-tooling; revisit only if we later want typed
  schema/migrations.
- **Auth:** see decision in §4.

---

## 4. Auth approach — DECIDED: custom session auth, `admin_users` table

**Locked decision:** our own minimal session auth (not Neon Auth), backed by a small
`admin_users` table in Postgres. Supports **up to two admins** — both full admins, provisioned
by hand, no self-registration.

Why this over a managed service (Neon Auth / Better Auth / NextAuth): with two *fixed, known*
admins the surface is tiny — verify a bcrypt hash, set a signed httpOnly cookie, check it. None
of the parts that make "roll your own auth" dangerous are present: no self-service signup, no
password-reset emails, no OAuth, no per-user roles. Going from one admin to two changes almost
nothing (a lookup over two rows instead of one). Custom keeps auth decoupled from Neon, so a
future DB move doesn't drag auth along.

- **Deps:** `jose` (signed JWT cookie) + `bcryptjs` (hash verify).
- **Credentials:** stored in the `admin_users` table (see §5), **not** env vars — so adding or
  rotating an admin is a one-line SQL statement with no redeploy. Only the cookie signing key
  (`SESSION_SECRET`) lives in env.
- **~65 lines** across `src/lib/auth.ts` + the login server action.

### Tripwire — when to abandon this for a managed system
Switch to Neon Auth or Better Auth the day we want any of: **self-service accounts, password-reset
emails, OAuth/SSO, per-user roles, or an unbounded / frequently-changing user list.** Two
hardcoded admins is squarely below that line; if that changes, revisit before adding more custom
code.

---

## 5. Neon setup + schema

1. Create a Neon project (free tier), region close to the site's users / Vercel region.
2. Grab the **pooled** connection string → this becomes `DATABASE_URL`.
3. Create the schema. `gen_random_uuid()` is available on Neon (pgcrypto built in):

```sql
create table eras (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sort_order int not null default 0
);

create table architects (
  id uuid primary key default gen_random_uuid(),
  era_id uuid not null references eras(id) on delete restrict,
  name text not null,
  sort_order int not null default 0
);

create table links (
  id uuid primary key default gen_random_uuid(),
  architect_id uuid not null references architects(id) on delete restrict,
  title text not null,
  url text not null,
  sort_order int not null default 0
);

create index on architects (era_id);
create index on links (architect_id);

-- Auth: up to two admins, provisioned by hand (no self-registration).
create table admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password_hash text not null,   -- bcrypt
  created_at timestamptz not null default now()
);
```

> **On-delete behaviour — DECIDED: `RESTRICT` (no cascade).** Deleting an era/architect must **not**
> delete its children. Because `era_id`/`architect_id` are `NOT NULL`, "no cascade" necessarily means
> the delete is *blocked* while children exist — you must remove/reassign the children first.
> - Applied to **both** FKs (era→architect, architect→link) for consistency. Marko explicitly decided
>   the era case; the architect→link case is mirrored — confirm that's also wanted.
> - **Consequence for the admin UI:** the current `deleteEra`/`deleteArchitect` actions will get a raw
>   Postgres FK-violation error when the row has children. Add a guard in those actions that catches
>   it and returns a friendly message ("Remove this era's architects before deleting it."). Track this
>   as an implementation task in §8a.
> - **Verify before running:** the real defaults/NOT NULL in Supabase (`pg_dump --schema-only`), so the
>   Neon schema matches everything except this intentional `restrict` change.

*(Optional — Drizzle: if we want typed queries + versioned migrations, define these three tables in
`src/db/schema.ts` and generate the SQL instead of hand-writing it. Skip for now unless you want it.)*

---

## 6. Data migration (167 rows total — small)

Preferred: dump only the three public tables from Supabase and load into Neon.

```bash
# From the Supabase project's DIRECT connection string (Dashboard → Settings → Database):
pg_dump "$SUPABASE_DB_URL" \
  --data-only --no-owner --no-privileges \
  -t public.eras -t public.architects -t public.links \
  > data.sql

# Load into Neon:
psql "$NEON_DATABASE_URL" -f schema.sql   # from §5
psql "$NEON_DATABASE_URL" -f data.sql
```

Fallback if `pg_dump`/`psql` aren't handy: a one-off `tsx` script that reads the three tables from
Supabase (REST or supabase-js) and inserts into Neon. More code, same result — only worth it if the
CLI route is blocked.

**Verify after load:** row counts match (8 / 34 / 125) and a spot-check of `sort_order` ordering.

### Seed the two admins
Generate a bcrypt hash per admin with a throwaway `tsx` snippet (`bcrypt.hashSync(password, 12)`),
then insert. The plaintext passwords are never stored or committed — only the hashes.

```sql
insert into admin_users (email, password_hash) values
  ('marko@example.com', '<bcrypt-hash-1>'),
  ('second-admin@example.com', '<bcrypt-hash-2>');
```
To rotate a password later: regenerate the hash and `update admin_users set password_hash = ...
where email = ...` — no redeploy.

---

## 7. Environment variables

Remove:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```
Add:
```
DATABASE_URL=postgresql://...neon.tech/...        # pooled Neon connection string
SESSION_SECRET=<32+ random bytes, base64>          # for signing the session cookie
```
Admin credentials are **not** in env — they live in the `admin_users` table (§5/§6). The only new
secret is `SESSION_SECRET`. Update both vars in **both** `.env.local` and the Vercel project
settings (Project → Settings → Environment Variables). Never commit real secrets.

---

## 8. File-by-file code changes

### 8a. Data layer

**New `src/lib/db.ts`**
```ts
import { neon } from "@neondatabase/serverless";
export const sql = neon(process.env.DATABASE_URL!);
```

**`src/app/api/links/route.ts`** — replace the three `supabase.from(...)` selects with three
`sql` queries (or one query with joins). Same assembly logic into `Era[]`. Drop the
`createClient` import.

**`src/app/admin/actions.ts`** — mechanical rewrite of all 15 actions:
- `createEra/updateEraName/deleteEra/reorderEras`
- `createArchitect/updateArchitectName/deleteArchitect/reorderArchitects`
- `createLink/updateLink/deleteLink/reorderLinks`
- Pattern per action: swap `supabase.from("t").insert/update/delete/select` for the equivalent
  `sql` statement; keep the `revalidatePath("/admin")` + `revalidatePath("/api/links")` calls
  exactly as-is.
- The "max sort_order + 1" logic in the create actions maps to
  `select coalesce(max(sort_order), -1) + 1 ...`.
- Reorder actions (`Promise.all` of per-id updates) port directly.
- **`deleteEra` / `deleteArchitect` guard (from §5 `RESTRICT` decision):** wrap the delete and catch
  the Postgres FK-violation (SQLSTATE `23503`); return a friendly error
  ("Remove this era's architects before deleting it.") instead of letting the raw error surface.
  `deleteLink` needs no guard (links have no children).

**Delete** `src/lib/supabase/server.ts` and `src/lib/supabase/client.ts`.

### 8b. Auth layer (custom, `admin_users` table)

**New `src/lib/auth.ts`**
- `createSession(userId, email)` → sign a `jose` JWT, set httpOnly/secure/sameSite cookie.
- `getSession()` → read + verify the cookie, return the payload or null.
- `requireAuth()` → `getSession()` or throw `Unauthorized` (drop-in for the current helper in
  `actions.ts`).
- `destroySession()` → clear the cookie.

**`src/app/admin/actions.ts`**
- Replace the Supabase-based `requireAuth()` with the import from `src/lib/auth.ts` (it no longer
  returns a client — the actions use the module-level `sql` instead).
- Add a `signIn(email, password)` server action: `select id, password_hash from admin_users where
  email = $1`, `bcrypt.compare` against the row's hash, then `createSession(row.id, email)`. Return
  a generic error flag on mismatch or missing row (don't reveal which). Works unchanged for either
  of the two admins — it's a table lookup, not a hardcoded pair.
- `signOut()` → `destroySession()` + redirect.

**`src/app/admin/_components/LoginForm.tsx`**
- Drop the `@/lib/supabase/client` import and `signInWithPassword` call.
- Call the new `signIn` server action; on success `router.push("/admin")`. UI unchanged.

**`src/proxy.ts` (renamed from `src/middleware.ts`) — DECIDED: adopt the Next 16 `proxy` convention**
- Rename `src/middleware.ts` → `src/proxy.ts`, exporting a `proxy` function instead of `middleware`
  (keeps the `matcher: ["/admin/:path*"]` config). This clears the Next 16 deprecation warning.
- Its body reads/verifies the session cookie via `jose` (Edge-compatible). **Do not** call `bcryptjs`
  here — it doesn't run on the Edge runtime, so password verification stays in the `signIn` server
  action, not the proxy.
- Keep the same redirect rules (unauthenticated `/admin/*` → `/admin/login`; authenticated on
  `/admin/login` → `/admin`).
- Delete the whole `src/lib/supabase/` folder (its `middleware.ts` helper is gone).

---

## 9. Cleanup (after cutover verified)

- `pnpm remove @supabase/ssr @supabase/supabase-js`
- `pnpm add @neondatabase/serverless jose bcryptjs` (+ `@types/bcryptjs` dev)
- Delete `.github/workflows/supabase-keep-alive.yml` (Neon doesn't need pinging).
- Update `CLAUDE.md` (the "Supabase" / "Admin Interface" / "GitHub Actions" sections).
- Delete the Supabase project once the site + admin are confirmed working on Neon for a few days.

---

## 10. Verification checklist

- [ ] `GET /api/links` returns the same nested JSON as before (diff against a saved Supabase copy).
- [ ] Public site renders eras/architects/links identically.
- [ ] `/admin` redirects to `/admin/login` when logged out.
- [ ] Login with correct creds → dashboard; wrong creds → error, no session.
- [ ] Each CRUD + reorder action works and revalidates (`/admin` and public site update).
- [ ] Logged-out user cannot invoke a server action (should throw `Unauthorized`).
- [ ] Row counts on Neon: 8 / 34 / 125.
- [ ] Deploy to Vercel with new env vars; cold-start hits Neon and it wakes.
- [ ] Deleting a non-empty era/architect is blocked with a friendly message (not a raw 500).

---

## 11. Rollout & rollback

- Do the work on a branch; keep Supabase live and untouched until Neon is verified in production.
- **Rollback** = revert the branch + restore the old env vars. Because Supabase stays intact during
  cutover, rollback is instant and lossless.
- Only after a few days of confirmed Neon operation do we delete the Supabase project.

---

## 12. Open questions for Marko

All resolved except one deferred item:

1. ~~Auth approach~~ — **DECIDED:** custom session auth + `admin_users` table, two admins (§4).
2. ~~On-delete behaviour~~ — **DECIDED:** `RESTRICT`, no cascade (§5). Deleting a non-empty
   era/architect is blocked; admin needs a friendly guard (§8a).
3. ~~Hosting~~ — **DECIDED:** Vercel.
4. ~~Drizzle?~~ — **DECIDED:** stay raw `@neondatabase/serverless`, no ORM (§3).
5. ~~`middleware` → `proxy`~~ — **DECIDED:** rename now, adopt the Next 16 `proxy` convention (§8b).
6. ⏳ **Second admin's email** — deferred. Seed only Marko's admin for now; add the second admin's
   row later with a one-line `insert` (§6). No blocker.
