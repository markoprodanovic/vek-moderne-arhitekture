import { sql } from "@/lib/db";
import AdminDashboard from "./_components/AdminDashboard";
import type { EraItem } from "@/types/admin";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [erasRaw, architectsRaw, linksRaw] = (await Promise.all([
    sql`SELECT id, name, sort_order FROM eras ORDER BY sort_order`,
    sql`SELECT id, era_id, name, sort_order FROM architects ORDER BY sort_order`,
    sql`SELECT id, architect_id, title, url, sort_order FROM links ORDER BY sort_order`,
  ])) as [
    { id: string; name: string; sort_order: number }[],
    { id: string; era_id: string; name: string; sort_order: number }[],
    {
      id: string;
      architect_id: string;
      title: string;
      url: string;
      sort_order: number;
    }[],
  ];

  const eras: EraItem[] = erasRaw.map((era) => ({
    ...era,
    architects: architectsRaw
      .filter((a) => a.era_id === era.id)
      .map((architect) => ({
        ...architect,
        links: linksRaw
          .filter((l) => l.architect_id === architect.id)
          .map((l) => ({
            id: l.id,
            title: l.title,
            url: l.url,
            sort_order: l.sort_order,
          })),
      })),
  }));

  return <AdminDashboard eras={eras} />;
}
