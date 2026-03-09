"use client";

import { useRouter } from "next/navigation";
import EraList from "./EraList";
import { signOut } from "../actions";
import type { EraItem } from "@/types/admin";

interface Props {
  eras: EraItem[];
}

export default function AdminDashboard({ eras }: Props) {
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Vek Moderne Arhitekture</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage eras, architects, and links
          </p>
        </div>
        <button
          onClick={handleSignOut}
          className="text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded px-3 py-1.5"
        >
          Sign out
        </button>
      </div>

      <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded text-xs text-blue-700">
        Double-click any name to edit · Drag to reorder
      </div>

      <EraList initialEras={eras} />
    </div>
  );
}
