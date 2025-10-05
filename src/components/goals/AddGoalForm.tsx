// src/components/goals/AddGoalForm.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Props {
  onAddGoal: (title: string, description?: string) => Promise<unknown>;
}

export default function AddGoalForm({ onAddGoal }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setLoading(true);
    try {
      await onAddGoal(title.trim(), description.trim() || undefined);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error("AddGoalForm submit error:", err);
      // you may surface a toast or error state here
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-3 border rounded-lg p-4 shadow-sm">
      <div className="flex flex-col gap-2">
        <Input
          placeholder="New goal title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Textarea
          placeholder="Short description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div className="flex items-center gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Goal"}
        </Button>
      </div>
    </form>
  );
}
