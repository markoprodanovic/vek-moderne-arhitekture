import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { sql } from "@/lib/db";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  signSession,
  verifySession,
  type SessionPayload,
} from "@/lib/session";

// Node-only auth helpers (uses next/headers cookies + bcrypt). Never import
// this from the Edge proxy — it would pull bcrypt into the Edge bundle.

export async function createSession(id: string, email: string): Promise<void> {
  const token = await signSession({ sub: id, email });
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  return verifySession(cookieStore.get(SESSION_COOKIE)?.value);
}

export async function requireAuth(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

// Verifies a login attempt against the admin_users table. Returns a generic
// null on any failure (missing user or bad password) — never reveals which.
export async function verifyPassword(
  email: string,
  password: string,
): Promise<{ id: string; email: string } | null> {
  const rows = (await sql`
    SELECT id, email, password_hash FROM admin_users WHERE email = ${email}
  `) as { id: string; email: string; password_hash: string }[];
  const user = rows[0];
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.password_hash);
  return ok ? { id: user.id, email: user.email } : null;
}
