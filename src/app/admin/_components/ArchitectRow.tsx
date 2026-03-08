"use client";

import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import InlineEditField from "./InlineEditField";
import DeleteButton from "./DeleteButton";
import LinkList from "./LinkList";
import { updateArchitectName, deleteArchitect } from "../actions";

interface LinkItem {
  id: string;
  title: string;
  url: string;
  sort_order: number;
}

interface ArchitectItem {
  id: string;
  name: string;
  links: LinkItem[];
}

interface Props {
  architect: ArchitectItem;
  onRemove: (id: string) => void;
  onUpdateName: (id: string, name: string) => void;
}

export default function ArchitectRow({
  architect,
  onRemove,
  onUpdateName,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: architect.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className="flex items-center gap-2 py-1.5 pl-2 pr-1 rounded hover:bg-gray-100 group">
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
          className="text-gray-400 hover:text-gray-600 shrink-0 w-4 text-xs"
        >
          {expanded ? "▾" : "▸"}
        </button>

        <InlineEditField
          value={architect.name}
          onSave={async (name) => {
            await updateArchitectName(architect.id, name);
            onUpdateName(architect.id, name);
          }}
          className="flex-1 font-medium text-sm"
        />

        <span className="text-xs text-gray-400 shrink-0">
          {architect.links.length} links
        </span>

        <div className="opacity-0 group-hover:opacity-100 shrink-0">
          <DeleteButton
            onDelete={async () => {
              await deleteArchitect(architect.id);
              onRemove(architect.id);
            }}
          />
        </div>
      </div>

      {expanded && (
        <LinkList
          architectId={architect.id}
          initialLinks={architect.links}
        />
      )}
    </div>
  );
}
