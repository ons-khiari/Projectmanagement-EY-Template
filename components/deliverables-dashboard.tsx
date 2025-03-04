"use client";

import { useState } from "react";
import { Search, Edit, Settings, Plus } from "lucide-react";
import DeliverableColumn from "./deliverable-column";
import type { Deliverable } from "@/app/types/deliverable";

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
      date: "23 August 2023",
      assignee: "OK",
    },
    {
      id: "2",
      title: "Visual design mockups",
      description:
        "En tant qu'administrateur, je souhaite générer des bulletins de notes pour chaque étudiant afin de fournir un rapport complet sur leurs performances académiques.",
      link: "Deliverable Link",
      priority: "med",
      date: "23 August 2023",
      assignee: "OK",
    },
    {
      id: "3",
      title: "Visual design mockups",
      description:
        "En tant qu'administrateur, je souhaite générer des bulletins de notes pour chaque étudiant afin de fournir un rapport complet sur leurs performances académiques.",
      link: "Deliverable Link",
      priority: "low",
      date: "23 August 2023",
      assignee: "OK",
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
      date: "23 August 2023",
      assignee: "OK",
    },
    {
      id: "5",
      title: "Visual design mockups",
      description:
        "En tant qu'administrateur, je souhaite générer des bulletins de notes pour chaque étudiant afin de fournir un rapport complet sur leurs performances académiques.",
      link: "Deliverable Link",
      priority: "low",
      date: "23 August 2023",
      assignee: "OK",
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
      date: "23 August 2023",
      assignee: "OK",
    },
  ],
  deployed: [
    {
      id: "7",
      title: "Visual design mockups",
      description:
        "En tant qu'administrateur, je souhaite générer des bulletins de notes pour chaque étudiant afin de fournir un rapport complet sur leurs performances académiques.",
      link: "Deliverable Link",
      priority: "low",
      date: "23 August 2023",
      assignee: "OK",
    },
    {
      id: "8",
      title: "Visual design mockups",
      description:
        "En tant qu'administrateur, je souhaite générer des bulletins de notes pour chaque étudiant afin de fournir un rapport complet sur leurs performances académiques.",
      link: "Deliverable Link",
      priority: "low",
      date: "23 August 2023",
      assignee: "OK",
    },
  ],
  analyze: [
    {
      id: "9",
      title: "Visual design mockups",
      description:
        "En tant qu'administrateur, je souhaite générer des bulletins de notes pour chaque étudiant afin de fournir un rapport complet sur leurs performances académiques.",
      link: "Deliverable Link",
      priority: "high",
      date: "23 August 2023",
      assignee: "OK",
    },
    {
      id: "10",
      title: "Visual design mockups",
      description:
        "En tant qu'administrateur, je souhaite générer des bulletins de notes pour chaque étudiant afin de fournir un rapport complet sur leurs performances académiques.",
      link: "Deliverable Link",
      priority: "med",
      date: "23 August 2023",
      assignee: "OK",
    },
  ],
};

export default function DeliverablesDashboard() {
  const [deliverables, setDeliverables] = useState(sampleDeliverables);

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

      <div className="grid grid-cols-5 gap-4 overflow-auto pb-6">
        <DeliverableColumn
          title="To Do"
          count={deliverables.todo.length}
          total={7}
          deliverables={deliverables.todo}
        />
        <DeliverableColumn
          title="In progress"
          count={deliverables.inProgress.length}
          total={7}
          deliverables={deliverables.inProgress}
        />
        <DeliverableColumn
          title="Done"
          count={deliverables.done.length}
          total={7}
          deliverables={deliverables.done}
        />
        <DeliverableColumn
          title="Deployed"
          count={deliverables.deployed.length}
          total={7}
          deliverables={deliverables.deployed}
        />
        <DeliverableColumn
          title="Analyze"
          count={deliverables.analyze.length}
          total={7}
          deliverables={deliverables.analyze}
        />
      </div>
    </div>
  );
}
