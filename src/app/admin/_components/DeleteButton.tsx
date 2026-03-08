"use client";

import { useState } from "react";

interface Props {
  onDelete: () => Promise<void>;
  label?: string;
}

export default function DeleteButton({ onDelete, label = "Delete" }: Props) {
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);

  if (confirming) {
    return (
      <span className="inline-flex gap-1">
        <button
          onClick={async () => {
            setLoading(true);
            await onDelete();
            setLoading(false);
            setConfirming(false);
          }}
          disabled={loading}
          className="text-xs text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
        >
          {loading ? "..." : "Confirm"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </span>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-xs text-gray-400 hover:text-red-600"
    >
      {label}
    </button>
  );
}
