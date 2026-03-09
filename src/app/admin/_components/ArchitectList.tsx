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
import ArchitectRow from "./ArchitectRow";
import AddItemForm from "./AddItemForm";
import { createArchitect, reorderArchitects } from "../actions";
import type { ArchitectItem } from "@/types/admin";

interface Props {
  eraId: string;
  initialArchitects: ArchitectItem[];
}

export default function ArchitectList({ eraId, initialArchitects }: Props) {
  const [architects, setArchitects] = useState(initialArchitects);
  const [adding, setAdding] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = architects.findIndex((a) => a.id === active.id);
    const newIndex = architects.findIndex((a) => a.id === over.id);
    const reordered = arrayMove(architects, oldIndex, newIndex);
    setArchitects(reordered);
    reorderArchitects(reordered.map((a) => a.id));
  }

  function removeArchitect(id: string) {
    setArchitects((prev) => prev.filter((a) => a.id !== id));
  }

  function updateArchitectName(id: string, name: string) {
    setArchitects((prev) =>
      prev.map((a) => (a.id === id ? { ...a, name } : a)),
    );
  }

  return (
    <div className="ml-4 mt-2 space-y-1">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={architects.map((a) => a.id)}
          strategy={verticalListSortingStrategy}
        >
          {architects.map((architect) => (
            <ArchitectRow
              key={architect.id}
              architect={architect}
              onRemove={removeArchitect}
              onUpdateName={updateArchitectName}
            />
          ))}
        </SortableContext>
      </DndContext>

      {adding ? (
        <AddItemForm
          placeholder="Architect name"
          onAdd={async (name) => {
            const created = await createArchitect(eraId, name);
            setArchitects((prev) => [
              ...prev,
              { ...created, links: [] },
            ]);
          }}
          onCancel={() => setAdding(false)}
        />
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="text-xs text-blue-600 hover:text-blue-800"
        >
          + Add architect
        </button>
      )}
    </div>
  );
}
