"use server";

import { revalidatePath } from "next/cache";
import { sql } from "@/lib/db";
import {
  requireAuth,
  verifyPassword,
  createSession,
  destroySession,
} from "@/lib/auth";
import type { EraItem, ArchitectItem, LinkItem } from "@/types/admin";

export async function signIn(
  email: string,
  password: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const user = await verifyPassword(email, password);
  if (!user) return { ok: false, error: "Invalid email or password." };
  await createSession(user.id, user.email);
  return { ok: true };
}

// Postgres SQLSTATEs raised when deleting a parent that still has children:
// 23001 restrict_violation (from ON DELETE RESTRICT) and 23503
// foreign_key_violation (NO ACTION / other FK checks). Guard against both.
const FK_VIOLATION_CODES = new Set(["23001", "23503"]);

function isFkViolation(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    FK_VIOLATION_CODES.has((error as { code?: string }).code ?? "")
  );
}

function revalidate() {
  revalidatePath("/admin");
  revalidatePath("/api/links");
}

export async function createEra(name: string) {
  await requireAuth();
  const [{ next }] = await sql`
    SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM eras
  `;
  const rows = (await sql`
    INSERT INTO eras (name, sort_order) VALUES (${name}, ${next})
    RETURNING id, name, sort_order
  `) as Omit<EraItem, "architects">[];
  revalidate();
  return rows[0];
}

export async function updateEraName(id: string, name: string) {
  await requireAuth();
  await sql`UPDATE eras SET name = ${name} WHERE id = ${id}`;
  revalidate();
}

export async function deleteEra(id: string) {
  await requireAuth();
  try {
    await sql`DELETE FROM eras WHERE id = ${id}`;
  } catch (error) {
    if (isFkViolation(error)) {
      throw new Error("Remove this era's architects before deleting it.");
    }
    throw error;
  }
  revalidate();
}

export async function reorderEras(ids: string[]) {
  await requireAuth();
  await Promise.all(
    ids.map(
      (id, index) =>
        sql`UPDATE eras SET sort_order = ${index} WHERE id = ${id}`,
    ),
  );
  revalidate();
}

// ── Architects ────────────────────────────────────────────────────────────────

export async function createArchitect(era_id: string, name: string) {
  await requireAuth();
  const [{ next }] = await sql`
    SELECT COALESCE(MAX(sort_order), -1) + 1 AS next
    FROM architects WHERE era_id = ${era_id}
  `;
  const rows = (await sql`
    INSERT INTO architects (era_id, name, sort_order)
    VALUES (${era_id}, ${name}, ${next})
    RETURNING id, era_id, name, sort_order
  `) as Omit<ArchitectItem, "links">[];
  revalidate();
  return rows[0];
}

export async function updateArchitectName(id: string, name: string) {
  await requireAuth();
  await sql`UPDATE architects SET name = ${name} WHERE id = ${id}`;
  revalidate();
}

export async function deleteArchitect(id: string) {
  await requireAuth();
  try {
    await sql`DELETE FROM architects WHERE id = ${id}`;
  } catch (error) {
    if (isFkViolation(error)) {
      throw new Error("Remove this architect's links before deleting them.");
    }
    throw error;
  }
  revalidate();
}

export async function reorderArchitects(ids: string[]) {
  await requireAuth();
  await Promise.all(
    ids.map(
      (id, index) =>
        sql`UPDATE architects SET sort_order = ${index} WHERE id = ${id}`,
    ),
  );
  revalidate();
}

// ── Links ─────────────────────────────────────────────────────────────────────

export async function createLink(
  architect_id: string,
  title: string,
  url: string,
) {
  await requireAuth();
  const [{ next }] = await sql`
    SELECT COALESCE(MAX(sort_order), -1) + 1 AS next
    FROM links WHERE architect_id = ${architect_id}
  `;
  const rows = (await sql`
    INSERT INTO links (architect_id, title, url, sort_order)
    VALUES (${architect_id}, ${title}, ${url}, ${next})
    RETURNING id, title, url, sort_order
  `) as LinkItem[];
  revalidate();
  return rows[0];
}

export async function updateLink(id: string, title: string, url: string) {
  await requireAuth();
  await sql`UPDATE links SET title = ${title}, url = ${url} WHERE id = ${id}`;
  revalidate();
}

export async function deleteLink(id: string) {
  await requireAuth();
  await sql`DELETE FROM links WHERE id = ${id}`;
  revalidate();
}

export async function reorderLinks(ids: string[]) {
  await requireAuth();
  await Promise.all(
    ids.map(
      (id, index) =>
        sql`UPDATE links SET sort_order = ${index} WHERE id = ${id}`,
    ),
  );
  revalidate();
}

export async function signOut() {
  await requireAuth();
  await destroySession();
  revalidatePath("/admin");
}
