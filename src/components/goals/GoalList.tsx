// src/components/goals/GoalList.tsx
"use client";

import GoalCard from "./GoalCard";
import type { Goal } from "@/lib/goals";

export default function GoalList({ goals, isLoading }: { goals: Goal[]; isLoading: boolean }) {
  if (isLoading) return <p className="text-gray-500">Loading goals...</p>;
  if (!goals || goals.length === 0) return <p className="text-gray-500">No goals yet. Add your first one!</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {goals.map((g) => (
        <GoalCard key={g.id} goal={g} />
      ))}
    </div>
  );
}
