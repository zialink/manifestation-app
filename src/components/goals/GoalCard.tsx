// src/components/goals/GoalCard.tsx
"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Goal } from "@/lib/goals";

export default function GoalCard({ goal }: { goal: Goal }) {
  return (
    <Link href={`/dashboard/goals/${goal.id}`} className="block">
      <Card className="hover:shadow-md transition h-full">
        <CardHeader>
          <CardTitle className="truncate">{goal.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">{goal.description || "No description"}</p>
          <p className="text-xs text-gray-400 mt-3">
            Created: {new Date(goal.createdAt).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
