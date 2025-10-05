// src/hooks/useGoals.ts
"use client";

import { useEffect, useState } from "react";
import { fetchGoals, createGoal, Goal } from "@/lib/goals";

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await fetchGoals();
        if (mounted) setGoals(data);
      } catch (e) {
        console.error("useGoals - fetchGoals error:", e);
      } finally {
        if (mounted) setIsLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const addGoal = async (title: string, description?: string) => {
    const newGoal = await createGoal(title, description);
    setGoals((prev) => [newGoal, ...prev]);
    return newGoal;
  };

  return { goals, addGoal, isLoading };
}
