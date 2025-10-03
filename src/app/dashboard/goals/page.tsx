"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Link from "next/link";

interface Goal {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch goals from API
  useEffect(() => {
    const fetchGoals = async () => {
      const res = await fetch("/api/goals");
      if (res.ok) {
        const data = await res.json();
        setGoals(data);
      }
    };
    fetchGoals();
  }, []);

  // Add new goal
  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      const newGoal = await res.json();
      setGoals([newGoal, ...goals]); // prepend new goal
      setTitle("");
      setDescription("");
    } else {
      console.error("Failed to create goal");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Add Goal Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add a New Goal</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddGoal} className="space-y-4">
            <input
              type="text"
              placeholder="Goal title"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
              required
              className="w-full border rounded px-2 py-1 mb-2"
            />
            <textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Goal"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <Link key={goal.id} href={`/dashboard/goals/${goal.id}`}>
            <Card className="hover:shadow-lg transition cursor-pointer">
              <CardHeader>
                <CardTitle>{goal.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  {goal.description || "No description"}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Created: {new Date(goal.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
