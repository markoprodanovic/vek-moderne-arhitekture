import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import type { Era } from "@/types/links";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [erasRaw, architectsRaw, linksRaw] = await Promise.all([
      sql`SELECT id, name FROM eras ORDER BY sort_order`,
      sql`SELECT id, era_id, name FROM architects ORDER BY sort_order`,
      sql`SELECT id, architect_id, title, url FROM links ORDER BY sort_order`,
    ]);

    const result: Era[] = erasRaw.map((era) => ({
      era: era.name,
      architects: architectsRaw
        .filter((a) => a.era_id === era.id)
        .map((architect) => ({
          name: architect.name,
          urls: linksRaw
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
