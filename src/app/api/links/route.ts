import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { Era } from "@/types/links";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = await createClient();

    const [{ data: erasRaw, error: eraError }, { data: architectsRaw, error: archError }, { data: linksRaw, error: linkError }] =
      await Promise.all([
        supabase.from("eras").select("id, name").order("sort_order"),
        supabase.from("architects").select("id, era_id, name").order("sort_order"),
        supabase.from("links").select("id, architect_id, title, url").order("sort_order"),
      ]);

    if (eraError || archError || linkError) {
      throw new Error(eraError?.message ?? archError?.message ?? linkError?.message);
    }

    const result: Era[] = (erasRaw ?? []).map((era) => ({
      era: era.name,
      architects: (architectsRaw ?? [])
        .filter((a) => a.era_id === era.id)
        .map((architect) => ({
          name: architect.name,
          urls: (linksRaw ?? [])
            .filter((l) => l.architect_id === architect.id)
            .map((l) => ({ title: l.title, url: l.url })),
        })),
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching links:", error);
    return NextResponse.json(
      { error: "Failed to fetch links" },
      { status: 500 },
    );
  }
}
