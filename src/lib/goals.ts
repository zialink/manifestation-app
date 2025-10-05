// src/lib/goals.ts
export type Goal = {
  id: string;
  title: string;
  description?: string | null;
  createdAt: string;
};

export async function fetchGoals(): Promise<Goal[]> {
  const res = await fetch("/api/goals", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch goals");
  return res.json();
}

export async function createGoal(title: string, description?: string) {
  const res = await fetch("/api/goals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  });
  if (!res.ok) throw new Error("Failed to create goal");
  return res.json() as Promise<Goal>;
}
