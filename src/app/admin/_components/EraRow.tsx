"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import InlineEditField from "./InlineEditField";
import DeleteButton from "./DeleteButton";
import ArchitectList from "./ArchitectList";
import { updateEraName, deleteEra } from "../actions";
import type { EraItem } from "@/types/admin";

interface Props {
  era: EraItem;
  onRemove: (id: string) => void;
  onUpdateName: (id: string, name: string) => void;
}

export default function EraRow({ era, onRemove, onUpdateName }: Props) {
  const [expanded, setExpanded] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: era.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const totalLinks = era.architects.reduce(
    (sum, a) => sum + a.links.length,
    0,
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border border-gray-200 rounded-lg bg-white"
    >
      <div className="flex items-center gap-2 p-3 group">
        <button
          {...attributes}
          {...listeners}
          className="text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing shrink-0"
          aria-label="Drag"
        >
          ⠿
        </button>

        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-gray-400 hover:text-gray-600 shrink-0 w-4"
        >
          {expanded ? "▾" : "▸"}
        </button>

        <InlineEditField
          value={era.name}
          onSave={async (name) => {
            await updateEraName(era.id, name);
            onUpdateName(era.id, name);
          }}
          className="flex-1 font-semibold text-sm uppercase tracking-wide"
        />

        <span className="text-xs text-gray-400 shrink-0">
          {era.architects.length} architects · {totalLinks} links
        </span>

        <div className="opacity-0 group-hover:opacity-100 shrink-0">
          <DeleteButton
            onDelete={async () => {
              await deleteEra(era.id);
              onRemove(era.id);
            }}
          />
        </div>
      </div>

      {expanded && (
        <div className="border-t border-gray-100 px-3 pb-3">
          <ArchitectList
            eraId={era.id}
            initialArchitects={era.architects}
          />
        </div>
      )}
    </div>
  );
}
