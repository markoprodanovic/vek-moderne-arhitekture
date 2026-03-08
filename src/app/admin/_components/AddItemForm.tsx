"use client";

import { useState } from "react";

interface Props {
  placeholder: string;
  secondPlaceholder?: string;
  onAdd: (value: string, second?: string) => Promise<void>;
  onCancel: () => void;
}

export default function AddItemForm({
  placeholder,
  secondPlaceholder,
  onAdd,
  onCancel,
}: Props) {
  const [value, setValue] = useState("");
  const [second, setSecond] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    setLoading(true);
    await onAdd(value.trim(), secondPlaceholder ? second.trim() : undefined);
    setLoading(false);
    setValue("");
    setSecond("");
    onCancel();
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center mt-1">
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-black flex-1 min-w-0"
      />
      {secondPlaceholder && (
        <input
          value={second}
          onChange={(e) => setSecond(e.target.value)}
          placeholder={secondPlaceholder}
          className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-black flex-1 min-w-0"
        />
      )}
      <button
        type="submit"
        disabled={loading}
        className="text-sm bg-black text-white rounded px-3 py-1 hover:bg-gray-800 disabled:opacity-50 shrink-0"
      >
        {loading ? "..." : "Add"}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="text-sm text-gray-500 hover:text-gray-700 shrink-0"
      >
        Cancel
      </button>
    </form>
  );
}
