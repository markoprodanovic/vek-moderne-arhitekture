import { NextResponse } from "next/server";
import linksData from "../../../data/links.json";

export async function GET() {
  try {
    return NextResponse.json(linksData);
  } catch (error) {
    console.error("Error fetching links:", error);
    return NextResponse.json(
      { error: "Failed to fetch links" },
      { status: 500 },
    );
  }
}
