"use client";

import { useState } from "react";
import { Search, Edit, Settings, Plus } from "lucide-react";
import DeliverableColumn from "./deliverable-column";
import type { Deliverable } from "@/app/types/deliverable";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import DeliverableCard from "./deliverable-card";

// Sample deliverable data
const sampleDeliverables: Record<string, Deliverable[]> = {
  todo: [
    {
      id: "1",
      title: "Visual design mockups",
      description:
        "En tant qu'administrateur, je souhaite générer des bulletins de notes pour chaque étudiant afin de fournir un rapport complet sur leurs performances académiques.",
      link: "Deliverable Link",
      priority: "low",
      priority_number: 1,
      date: "23 August 2023",
      assignee: [{ id: "1", avatar: "OK", color: "#27acaa" }],
      project: "Project 1",
    },
    {
      id: "2",
      title: "Visual design mockups",
      description:
        "En tant qu'administrateur, je souhaite générer des bulletins de notes pour chaque étudiant afin de fournir un rapport complet sur leurs performances académiques.",
      link: "Deliverable Link",
      priority: "med",
      priority_number: 3,
      date: "23 August 2023",
      assignee: [
        { id: "1", avatar: "OK", color: "#27acaa" },
        { id: "2", avatar: "JD", color: "#6366f1" },
        { id: "3", avatar: "AS", color: "#f43f5e" },
        { id: "4", avatar: "MK", color: "#8b5cf6" },
      ],
      project: "Project 2",
    },
    {
      id: "3",
      title: "Visual design mockups",
      description:
        "En tant qu'administrateur, je souhaite générer des bulletins de notes pour chaque étudiant afin de fournir un rapport complet sur leurs performances académiques.",
      link: "Deliverable Link",
      priority: "low",
      priority_number: 6,
      date: "23 August 2023",
      assignee: [
        { id: "1", avatar: "OK", color: "#27acaa" },
        { id: "2", avatar: "JD", color: "#6366f1" },
      ],
      project: "Project 3",
    },
  ],
  inProgress: [
    {
      id: "4",
      title: "Visual design mockups",
      description:
        "En tant qu'administrateur, je souhaite générer des bulletins de notes pour chaque étudiant afin de fournir un rapport complet sur leurs performances académiques.",
      link: "Deliverable Link",
      priority: "low",
      priority_number: 4,
      date: "23 August 2023",
      assignee: [
        { id: "1", avatar: "OK", color: "#27acaa" },
        { id: "2", avatar: "JD", color: "#6366f1" },
        { id: "4", avatar: "MK", color: "#8b5cf6" },
      ],
      project: "Project 4",
    },
    {
      id: "5",
      title: "Visual design mockups",
      description:
        "En tant qu'administrateur, je souhaite générer des bulletins de notes pour chaque étudiant afin de fournir un rapport complet sur leurs performances académiques.",
      link: "Deliverable Link",
      priority: "low",
      priority_number: 2,
      date: "23 August 2023",
      assignee: [
        { id: "1", avatar: "OK", color: "#27acaa" },
        { id: "2", avatar: "JD", color: "#6366f1" },
      ],
      project: "Project 5",
    },
  ],
  done: [
    {
      id: "6",
      title: "Visual design mockups",
      description:
        "En tant qu'administrateur, je souhaite générer des bulletins de notes pour chaque étudiant afin de fournir un rapport complet sur leurs performances académiques.",
      link: "Deliverable Link",
      priority: "high",
      priority_number: 5,
      date: "23 August 2023",
      assignee: [
        { id: "1", avatar: "OK", color: "#27acaa" },
        { id: "2", avatar: "JD", color: "#6366f1" },
        { id: "3", avatar: "AS", color: "#f43f5e" },
        { id: "4", avatar: "MK", color: "#8b5cf6" },
      ],
      project: "Project 6",
    },
  ],
};

export default function DeliverablesDashboard() {
  const [deliverables, setDeliverables] = useState(sampleDeliverables);
  const [activeTab, setActiveTab] = useState("myDeliverables");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeDeliverable, setActiveDeliverable] =
    useState<Deliverable | null>(null);

  // Configure sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Find the container and index of an item
  const findContainer = (id: string) => {
    if (id in deliverables) return id;

    const container = Object.keys(deliverables).find((key) =>
      deliverables[key].some((item) => item.id === id)
    );

    return container || null;
  };

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const id = active.id as string;
    const container = findContainer(id);

    if (container) {
      const index = deliverables[container].findIndex((item) => item.id === id);
      if (index !== -1) {
        setActiveId(id);
        setActiveDeliverable(deliverables[container][index]);
      }
    }
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      setActiveDeliverable(null);
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) {
      setActiveId(null);
      setActiveDeliverable(null);
      return;
    }

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer) {
      setActiveId(null);
      setActiveDeliverable(null);
      return;
    }

    // Find the indexes of the active and over items
    const activeIndex = deliverables[activeContainer].findIndex(
      (item) => item.id === activeId
    );
    const overIndex = deliverables[overContainer].findIndex(
      (item) => item.id === overId
    );

    // If items are in the same container, reorder
    if (activeContainer === overContainer) {
      const newItems = [...deliverables[activeContainer]];
      const reorderedItems = arrayMove(newItems, activeIndex, overIndex);

      setDeliverables({
        ...deliverables,
        [activeContainer]: reorderedItems,
      });
    }
    // If items are in different containers, move from one to another
    else {
      const activeItems = [...deliverables[activeContainer]];
      const overItems = [...deliverables[overContainer]];
      const [item] = activeItems.splice(activeIndex, 1);

      // Insert into the new container
      overItems.splice(overIndex, 0, item);

      setDeliverables({
        ...deliverables,
        [activeContainer]: activeItems,
        [overContainer]: overItems,
      });
    }

    setActiveId(null);
    setActiveDeliverable(null);
  };

  // Handle drag over - for dropping into empty containers
  const handleDragOver = (event: any) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer || activeContainer === overContainer)
      return;

    // Check if we're dropping directly onto a container
    if (overId === "todo" || overId === "inProgress" || overId === "done") {
      const activeItems = [...deliverables[activeContainer]];
      const overItems = [...deliverables[overContainer]];
      const activeIndex = activeItems.findIndex((item) => item.id === activeId);

      if (activeIndex !== -1) {
        const [item] = activeItems.splice(activeIndex, 1);
        overItems.push(item);

        setDeliverables({
          ...deliverables,
          [activeContainer]: activeItems,
          [overContainer]: overItems,
        });
      }
    }
  };

  return (
    <div className="h-full">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-[#444444]">Deliverables/</h1>
        <div></div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="h-9 w-48 rounded-md border border-gray-300 pl-9 pr-4 text-sm focus:border-[#ffe500] focus:outline-none"
            />
          </div>
          <button className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100">
            <Edit className="h-4 w-4" />
            <span>Edit</span>
          </button>
          <button className="flex items-center gap-1 rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </button>
        </div>

        <button className="flex items-center gap-1 rounded-md bg-[#ffe500] px-3 py-1.5 text-sm font-medium text-[#444444] hover:bg-[#f5dc00]">
          <Plus className="h-4 w-4" />
          <span>Add deliverable</span>
        </button>
      </div>

      <div className="mb-4 border-b border-gray-200">
        <div className="flex gap-6">
          <button
            className={`border-b-2 px-1 py-2 text-sm font-medium ${
              activeTab === "myDeliverables"
                ? "border-[#27acaa] text-[#444444]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("myDeliverables")}
          >
            My Deliverables
          </button>
          <button
            className={`border-b-2 px-1 py-2 text-sm font-medium ${
              activeTab === "others"
                ? "border-[#27acaa] text-[#444444]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("others")}
          >
            Others
          </button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
      >
        <div className="grid grid-cols-3 gap-6 bg-gray-50 p-4">
          <DeliverableColumn
            title="To Do"
            count={deliverables.todo.length}
            total={7}
            deliverables={deliverables.todo}
            id="todo"
          />
          <DeliverableColumn
            title="In progress"
            count={deliverables.inProgress.length}
            total={7}
            deliverables={deliverables.inProgress}
            id="inProgress"
          />
          <DeliverableColumn
            title="Done"
            count={deliverables.done.length}
            total={7}
            deliverables={deliverables.done}
            id="done"
          />
        </div>

        {/* Drag overlay for visual feedback */}
        <DragOverlay>
          {activeId && activeDeliverable ? (
            <div className="opacity-80">
              <DeliverableCard
                deliverable={activeDeliverable}
                index={0}
                isDragging={true}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
