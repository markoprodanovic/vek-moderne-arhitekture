import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as
    | "invite"
    | "recovery"
    | "email"
    | "magiclink"
    | null;

  if (token_hash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ token_hash, type });

    if (!error) {
      if (type === "invite") {
        return NextResponse.redirect(new URL("/auth/set-password", origin));
      }
      return NextResponse.redirect(new URL("/admin", origin));
    }
  }

  return NextResponse.redirect(new URL("/admin/login", origin));
}
