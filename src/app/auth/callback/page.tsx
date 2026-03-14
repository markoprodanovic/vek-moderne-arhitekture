"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(() => {
      const hash = window.location.hash;
      const params = new URLSearchParams(hash.slice(1));
      if (params.get("type") === "invite") {
        router.replace("/auth/set-password");
      } else {
        router.replace("/admin");
      }
    });
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-sm text-gray-500">Processing...</p>
    </div>
  );
}
