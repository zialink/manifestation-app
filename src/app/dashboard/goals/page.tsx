// src/app/dashboard/goals/page.tsx
"use client";

import AddGoalForm from "@/components/goals/AddGoalForm";
import GoalList from "@/components/goals/GoalList";
import { useGoals } from "@/hooks/useGoals";

export default function GoalsPage() {
  const { goals, addGoal, isLoading } = useGoals();

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">My Goals</h1>

      <AddGoalForm onAddGoal={addGoal} />

      <div>
        <GoalList goals={goals} isLoading={isLoading} />
      </div>
    </div>
  );
}
