// src/components/goals/GoalDetails.tsx
"use client";

import type { Goal } from "@/lib/goals";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function GoalDetails({ goal }: { goal: Goal }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{goal.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700">{goal.description || "No description provided."}</p>
        <p className="text-xs text-gray-400 mt-3">
          Created: {new Date(goal.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}
