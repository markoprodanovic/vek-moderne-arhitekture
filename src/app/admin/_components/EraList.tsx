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
import EraRow from "./EraRow";
import AddItemForm from "./AddItemForm";
import { createEra, reorderEras } from "../actions";
import type { EraItem } from "@/types/admin";

interface Props {
  initialEras: EraItem[];
}

export default function EraList({ initialEras }: Props) {
  const [eras, setEras] = useState(initialEras);
  const [adding, setAdding] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = eras.findIndex((e) => e.id === active.id);
    const newIndex = eras.findIndex((e) => e.id === over.id);
    const reordered = arrayMove(eras, oldIndex, newIndex);
    setEras(reordered);
    reorderEras(reordered.map((e) => e.id));
  }

  function removeEra(id: string) {
    setEras((prev) => prev.filter((e) => e.id !== id));
  }

  function updateEraName(id: string, name: string) {
    setEras((prev) => prev.map((e) => (e.id === id ? { ...e, name } : e)));
  }

  return (
    <div className="space-y-2">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={eras.map((e) => e.id)}
          strategy={verticalListSortingStrategy}
        >
          {eras.map((era) => (
            <EraRow
              key={era.id}
              era={era}
              onRemove={removeEra}
              onUpdateName={updateEraName}
            />
          ))}
        </SortableContext>
      </DndContext>

      {adding ? (
        <AddItemForm
          placeholder="Era name"
          onAdd={async (name) => {
            const created = await createEra(name);
            setEras((prev) => [...prev, { ...created, architects: [] }]);
          }}
          onCancel={() => setAdding(false)}
        />
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          + Add era
        </button>
      )}
    </div>
  );
}
