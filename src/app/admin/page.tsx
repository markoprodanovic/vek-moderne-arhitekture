import { createClient } from "@/lib/supabase/server";
import AdminDashboard from "./_components/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();

  const [{ data: erasRaw }, { data: architectsRaw }, { data: linksRaw }] =
    await Promise.all([
      supabase.from("eras").select("*").order("sort_order"),
      supabase.from("architects").select("*").order("sort_order"),
      supabase.from("links").select("*").order("sort_order"),
    ]);

  const eras = (erasRaw ?? []).map((era) => ({
    ...era,
    architects: (architectsRaw ?? [])
      .filter((a) => a.era_id === era.id)
      .map((architect) => ({
        ...architect,
        links: (linksRaw ?? []).filter((l) => l.architect_id === architect.id),
      })),
  }));

  return <AdminDashboard eras={eras} />;
}
