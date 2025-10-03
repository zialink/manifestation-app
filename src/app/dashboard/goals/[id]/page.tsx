"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


// Types
interface Goal {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
}

interface Affirmation {
  id: string;
  text: string;
  saved: boolean;
}

interface Hypnosis {
  id: string;
  script: string;
  saved: boolean;
}

export default function SingleGoalPage() {
  const params = useParams();
  const goalId = params?.id as string;

  const [goal, setGoal] = useState<Goal | null>(null);
  const [affirmations, setAffirmations] = useState<Affirmation[]>([]);
  const [hypnosis, setHypnosis] = useState<Hypnosis[]>([]);
  const [imagination, setImagination] = useState<string>("");

  // Fetch goal + AI suggestions
  useEffect(() => {
    const fetchGoal = async () => {
      const res = await fetch(`/api/goals/${goalId}`);
      if (res.ok) {
        const data = await res.json();
        setGoal(data.goal);
        setAffirmations(data.affirmations || []);
        setHypnosis(data.hypnosis || []);
        setImagination(data.imagination || "");
      }
    };
    if (goalId) fetchGoal();
  }, [goalId]);

  // Save selected affirmation
  const handleSaveAffirmation = async (id: string) => {
    await fetch(`/api/goals/${goalId}/affirmations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setAffirmations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, saved: true } : a))
    );
  };

  // Save selected hypnosis
  const handleSaveHypnosis = async (id: string) => {
    await fetch(`/api/goals/${goalId}/hypnosis`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setHypnosis((prev) =>
      prev.map((h) => (h.id === id ? { ...h, saved: true } : h))
    );
  };

  // Save imagination
  const handleSaveImagination = async () => {
    await fetch(`/api/goals/${goalId}/imagination`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: imagination }),
    });
  };

  if (!goal) {
    return <p className="p-6">Loading goal...</p>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Goal Header */}
      <Card>
        <CardHeader>
          <CardTitle>{goal.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{goal.description || "No description"}</p>
          <p className="text-xs text-gray-400 mt-2">
            Created: {new Date(goal.createdAt).toLocaleDateString()}
          </p>
        </CardContent>
      </Card>

      {/* Affirmations Row */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Suggested Affirmations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {affirmations.map((a) => (
            <Card key={a.id}>
              <CardContent className="flex flex-col gap-3 p-4">
                <p>{a.text}</p>
                {!a.saved ? (
                  <Button onClick={() => handleSaveAffirmation(a.id)}>
                    Save
                  </Button>
                ) : (
                  <span className="text-green-600 text-sm">Saved ✓</span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Hypnosis Row */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Suggested Hypnosis Scripts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hypnosis.map((h) => (
            <Card key={h.id}>
              <CardContent className="flex flex-col gap-3 p-4">
                <p>{h.script}</p>
                {!h.saved ? (
                  <Button onClick={() => handleSaveHypnosis(h.id)}>
                    Save
                  </Button>
                ) : (
                  <span className="text-green-600 text-sm">Saved ✓</span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Imagination Row */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Your Imagination</h2>
        <Card>
          <CardContent className="space-y-4 p-4">
            <textarea
              placeholder="Describe your imaginative scenario..."
              value={imagination}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setImagination(e.target.value)}
              className="w-full border rounded px-2 py-1"
            />
            <Button onClick={handleSaveImagination}>Save Imagination</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
