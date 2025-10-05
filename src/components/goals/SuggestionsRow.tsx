"use client";

import { useEffect, useState, useCallback } from "react";

interface Suggestion {
  id?: string;
  type: "affirmations" | "hypnosis" | "imagination";
  content: string;
  saved?: boolean;
}

interface SavedSuggestion extends Suggestion {
  id: string;
  saved: true;
}

interface SuggestionsRowProps {
  goalId: string;
  type: "affirmations" | "hypnosis" | "imagination";
}

export default function SuggestionsRow({ goalId, type }: SuggestionsRowProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulated AI-generated data
  const generateMockSuggestions = useCallback((): Suggestion[] => {
    if (type === "affirmations") {
      const affirmations = [
        "I am becoming the best version of myself.",
        "Every day I move closer to my goal.",
        "I attract opportunities that align with my vision.",
        "I am worthy of my dreams.",
        "I take action with confidence and faith."
      ];
      return affirmations.map(content => ({ type, content }));
    }

    if (type === "hypnosis") {
      const hypnosis = [
        {
          type,
          content:
            "You are calm and focused... every breath takes you deeper into belief that your goal is possible...",
        },
        {
          type,
          content:
            "Imagine yourself already living your dream... feel the confidence, the peace, and the joy flowing through you...",
        },
      ];
      return hypnosis;
    }

    if (type === "imagination") {
      return [
        {
          type,
          content:
            "Visualize a vivid scene where your goal is already achieved — feel the environment, the emotions, and gratitude.",
        },
      ];
    }

    return [];
  }, [type]);

  useEffect(() => {
    async function fetchSuggestions() {
      try {
        setLoading(true);

        // Fetch saved suggestions from DB
        const res = await fetch(`/api/goals/${goalId}/suggestions`);
        const saved: SavedSuggestion[] = res.ok ? await res.json() : [];

        // Simulate AI suggestions
        const generated = generateMockSuggestions();

        // Combine (saved first, then new)
        const combined = [
          ...saved.map((s) => ({ ...s, saved: true })),
          ...generated.filter(
            (g) => !saved.some((s) => s.content === g.content)
          ),
        ];

        setSuggestions(combined);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchSuggestions();
  }, [goalId, type, generateMockSuggestions]);

  async function handleSave(suggestion: Suggestion) {
    try {
      const res = await fetch(`/api/goals/${goalId}/suggestions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: suggestion.type,
          content: suggestion.content,
        }),
      });

      if (!res.ok) throw new Error("Failed to save suggestion");

      // Mark as saved + move to top
      setSuggestions((prev) => {
        const updated = prev.map((s) =>
          s.content === suggestion.content ? { ...s, saved: true } : s
        );
        const savedOnes = updated.filter((s) => s.saved);
        const unsaved = updated.filter((s) => !s.saved);
        return [...savedOnes, ...unsaved];
      });
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) return <p>Loading {type}...</p>;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold capitalize">{type}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {suggestions.map((s, idx) => (
          <div
            key={idx}
            className={`p-4 border rounded-lg shadow-sm transition ${
              s.saved ? "bg-green-50 border-green-400" : "bg-white"
            }`}
          >
            <p className="text-sm">{s.content}</p>
            {!s.saved && (
              <button
                onClick={() => handleSave(s)}
                className="mt-2 text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
