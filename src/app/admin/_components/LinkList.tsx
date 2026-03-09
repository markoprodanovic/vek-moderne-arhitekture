"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import LinkRow from "./LinkRow";
import AddItemForm from "./AddItemForm";
import { createLink, reorderLinks } from "../actions";
import type { LinkItem } from "@/types/admin";

interface Props {
  architectId: string;
  initialLinks: LinkItem[];
}

export default function LinkList({ architectId, initialLinks }: Props) {
  const [links, setLinks] = useState(initialLinks);
  const [adding, setAdding] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = links.findIndex((l) => l.id === active.id);
    const newIndex = links.findIndex((l) => l.id === over.id);
    const reordered = arrayMove(links, oldIndex, newIndex);
    setLinks(reordered);
    reorderLinks(reordered.map((l) => l.id));
  }

  function removeLink(id: string) {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }

  function updateLink(id: string, title: string, url: string) {
    setLinks((prev) =>
      prev.map((l) => (l.id === id ? { ...l, title, url } : l)),
    );
  }

  return (
    <div className="ml-4 mt-1 space-y-0.5">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={links.map((l) => l.id)}
          strategy={verticalListSortingStrategy}
        >
          {links.map((link) => (
            <LinkRow
              key={link.id}
              link={link}
              onRemove={removeLink}
              onUpdate={updateLink}
            />
          ))}
        </SortableContext>
      </DndContext>

      {adding ? (
        <AddItemForm
          placeholder="Link title"
          secondPlaceholder="URL"
          onAdd={async (title, url) => {
            const created = await createLink(architectId, title, url ?? "");
            setLinks((prev) => [...prev, created]);
          }}
          onCancel={() => setAdding(false)}
        />
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="text-xs text-blue-600 hover:text-blue-800 mt-1"
        >
          + Add link
        </button>
      )}
    </div>
  );
}
