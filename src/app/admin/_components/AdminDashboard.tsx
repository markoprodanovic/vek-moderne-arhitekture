"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import EraList from "./EraList";
import { signOut, inviteUser } from "../actions";
import type { EraItem } from "@/types/admin";

interface Props {
  eras: EraItem[];
}

export default function AdminDashboard({ eras }: Props) {
  const router = useRouter();
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteStatus, setInviteStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [inviteLoading, setInviteLoading] = useState(false);

  async function handleSignOut() {
    await signOut();
    router.push("/admin/login");
    router.refresh();
  }

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setInviteStatus(null);
    setInviteLoading(true);
    try {
      await inviteUser(inviteEmail);
      setInviteStatus({ type: "success", message: "Invite sent." });
      setInviteEmail("");
    } catch (err) {
      setInviteStatus({
        type: "error",
        message: err instanceof Error ? err.message : "Failed to send invite.",
      });
    } finally {
      setInviteLoading(false);
    }
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

      <div className="mb-6 p-3 border border-gray-200 rounded">
        <p className="text-xs font-medium text-gray-600 mb-2">Invite user</p>
        <form onSubmit={handleInvite} className="flex gap-2">
          <input
            type="email"
            required
            placeholder="email@example.com"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            disabled={inviteLoading}
            className="text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded px-3 py-1.5 disabled:opacity-50"
          >
            {inviteLoading ? "Sending..." : "Send invite"}
          </button>
        </form>
        {inviteStatus && (
          <p
            className={`text-xs mt-2 ${inviteStatus.type === "success" ? "text-green-600" : "text-red-600"}`}
          >
            {inviteStatus.message}
          </p>
        )}
      </div>

      <EraList initialEras={eras} />
    </div>
  );
}
