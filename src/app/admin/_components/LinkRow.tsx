"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import InlineEditField from "./InlineEditField";
import DeleteButton from "./DeleteButton";
import { updateLink, deleteLink } from "../actions";
import type { LinkItem } from "@/types/admin";

interface Props {
  link: LinkItem;
  onRemove: (id: string) => void;
  onUpdate: (id: string, title: string, url: string) => void;
}

export default function LinkRow({ link, onRemove, onUpdate }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-start gap-2 py-1 pl-2 pr-1 rounded hover:bg-gray-100 group text-sm"
    >
      <button
        {...attributes}
        {...listeners}
        className="text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing mt-0.5 shrink-0"
        aria-label="Drag"
      >
        ⠿
      </button>

      <div className="flex-1 min-w-0 space-y-0.5">
        <InlineEditField
          value={link.title}
          onSave={async (title) => {
            await updateLink(link.id, title, link.url);
            onUpdate(link.id, title, link.url);
          }}
          className="block w-full text-gray-800"
        />
        <InlineEditField
          value={link.url}
          onSave={async (url) => {
            await updateLink(link.id, link.title, url);
            onUpdate(link.id, link.title, url);
          }}
          className="block w-full text-gray-400 text-xs"
        />
      </div>

      <div className="opacity-0 group-hover:opacity-100 shrink-0 mt-0.5">
        <DeleteButton
          onDelete={async () => {
            await deleteLink(link.id);
            onRemove(link.id);
          }}
        />
      </div>
    </div>
  );
}
