"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function requireAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  return supabase;
}

// ── Eras ──────────────────────────────────────────────────────────────────────

export async function createEra(name: string) {
  const supabase = await requireAuth();
  const { data: maxRow } = await supabase
    .from("eras")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .single();
  const sort_order = (maxRow?.sort_order ?? -1) + 1;
  const { data, error } = await supabase
    .from("eras")
    .insert({ name, sort_order })
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/api/links");
  return data;
}

export async function updateEraName(id: string, name: string) {
  const supabase = await requireAuth();
  const { error } = await supabase.from("eras").update({ name }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/api/links");
}

export async function deleteEra(id: string) {
  const supabase = await requireAuth();
  const { error } = await supabase.from("eras").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/api/links");
}

export async function reorderEras(ids: string[]) {
  const supabase = await requireAuth();
  await Promise.all(
    ids.map((id, index) =>
      supabase.from("eras").update({ sort_order: index }).eq("id", id),
    ),
  );
  revalidatePath("/admin");
  revalidatePath("/api/links");
}

// ── Architects ────────────────────────────────────────────────────────────────

export async function createArchitect(era_id: string, name: string) {
  const supabase = await requireAuth();
  const { data: maxRow } = await supabase
    .from("architects")
    .select("sort_order")
    .eq("era_id", era_id)
    .order("sort_order", { ascending: false })
    .limit(1)
    .single();
  const sort_order = (maxRow?.sort_order ?? -1) + 1;
  const { data, error } = await supabase
    .from("architects")
    .insert({ era_id, name, sort_order })
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/api/links");
  return data;
}

export async function updateArchitectName(id: string, name: string) {
  const supabase = await requireAuth();
  const { error } = await supabase
    .from("architects")
    .update({ name })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/api/links");
}

export async function deleteArchitect(id: string) {
  const supabase = await requireAuth();
  const { error } = await supabase.from("architects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/api/links");
}

export async function reorderArchitects(ids: string[]) {
  const supabase = await requireAuth();
  await Promise.all(
    ids.map((id, index) =>
      supabase.from("architects").update({ sort_order: index }).eq("id", id),
    ),
  );
  revalidatePath("/admin");
  revalidatePath("/api/links");
}

// ── Links ─────────────────────────────────────────────────────────────────────

export async function createLink(
  architect_id: string,
  title: string,
  url: string,
) {
  const supabase = await requireAuth();
  const { data: maxRow } = await supabase
    .from("links")
    .select("sort_order")
    .eq("architect_id", architect_id)
    .order("sort_order", { ascending: false })
    .limit(1)
    .single();
  const sort_order = (maxRow?.sort_order ?? -1) + 1;
  const { data, error } = await supabase
    .from("links")
    .insert({ architect_id, title, url, sort_order })
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/api/links");
  return data;
}

export async function updateLink(id: string, title: string, url: string) {
  const supabase = await requireAuth();
  const { error } = await supabase
    .from("links")
    .update({ title, url })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/api/links");
}

export async function deleteLink(id: string) {
  const supabase = await requireAuth();
  const { error } = await supabase.from("links").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/api/links");
}

export async function reorderLinks(ids: string[]) {
  const supabase = await requireAuth();
  await Promise.all(
    ids.map((id, index) =>
      supabase.from("links").update({ sort_order: index }).eq("id", id),
    ),
  );
  revalidatePath("/admin");
  revalidatePath("/api/links");
}

export async function signOut() {
  const supabase = await requireAuth();
  await supabase.auth.signOut();
  revalidatePath("/admin");
}
