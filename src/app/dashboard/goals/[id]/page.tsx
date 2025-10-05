"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash2 } from "lucide-react";


interface Suggestion {
  id?: string;
  type: "affirmation" | "hypnosis" | "visualization";
  content: string;
  saved?: boolean;
}
interface Goal {
  id: string;
  title: string;
  description?: string;
}

export default function GoalPage() {
  const params = useParams();
  const goalId = params?.id as string;

  const [goal, setGoal] = useState<Goal | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [visualizationText, setVisualizationText] = useState("");
  const [savingVisualization, setSavingVisualization] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  // ✅ Fetch goal and its suggestions
  useEffect(() => {
    if (!goalId) return;
    const fetchData = async () => {
      try {
        const [goalRes, sugRes] = await Promise.all([
          fetch(`/api/goals/${goalId}`),
          fetch(`/api/goals/${goalId}/suggestions`),
        ]);

        const goalData = await goalRes.json();
        const sugData = await sugRes.json();

        setGoal(goalData);
        setSuggestions(sugData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [goalId]);

  if (loading) return <div className="p-6">Loading goal...</div>;
  if (!goal) return <div className="p-6">Goal not found.</div>;

  // ✅ Separate saved and suggested items
  const savedAffirmations = suggestions.filter(
    (s) => s.type === "affirmation" && s.id
  );
  const savedHypnosis = suggestions.filter(
    (s) => s.type === "hypnosis" && s.id
  );

  const unsavedAffirmations = suggestions.filter(
    (s) => s.type === "affirmation" && !s.id
  );
  const unsavedHypnosis = suggestions.filter(
    (s) => s.type === "hypnosis" && !s.id
  );

  // ✅ Visualization handling
  const visualization = suggestions.find(
    (s) => s.type === "visualization" && s.id
  );

  const handleGenerateVisualization = () => {
    const dummyScript =
      "Imagine yourself walking into a bright future where your goal has become reality. Feel the joy, the gratitude, and the power of success flowing through you.";
    setVisualizationText(dummyScript);
  };

  const handleSaveVisualization = async () => {
    if (!visualizationText.trim()) return;
    setSavingVisualization(true);
    try {
      const res = await fetch(`/api/goals/${goalId}/suggestions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "visualization",
          content: visualizationText.trim(),
          suggestionId: visualizationText.trim(), // use text as unique id
        }),
      });
      if (!res.ok) throw new Error("Failed to save visualization");
      // Always refresh from DB so UI updates immediately
      const sugRes = await fetch(`/api/goals/${goalId}/suggestions`);
      const sugData = await sugRes.json();
      setSuggestions(sugData);
      setVisualizationText("");
    } catch (err) {
      console.error("Error saving visualization:", err);
    } finally {
      setSavingVisualization(false);
    }
  };

  const handleSaveSuggestion = async (suggestion: Suggestion) => {
    try {
      const res = await fetch(`/api/goals/${goalId}/suggestions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: suggestion.type,
          content: suggestion.content,
          suggestionId: suggestion.id || suggestion.content, // fallback to content if no id
        }),
      });
      if (!res.ok) throw new Error("Failed to save suggestion");
      // Always refresh from DB so UI updates immediately
      const sugRes = await fetch(`/api/goals/${goalId}/suggestions`);
      const sugData = await sugRes.json();
      setSuggestions(sugData);
    } catch (err) {
      console.error("Error saving suggestion:", err);
    }
  };

  // Edit and delete for saved items
  const handleEdit = (s: Suggestion) => {
    setEditingId(s.id || null);
    setEditContent(s.content);
  };
  const handleEditSubmit = async (s: Suggestion) => {
    if (!s.id) return;
    await fetch(`/api/goals/${goalId}/suggestions/${s.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: editContent }),
    });
    const sugRes = await fetch(`/api/goals/${goalId}/suggestions`);
    const sugData = await sugRes.json();
    setSuggestions(sugData);
    setEditingId(null);
  };
  const handleDelete = async (s: Suggestion) => {
    if (!s.id) return;
    await fetch(`/api/goals/${goalId}/suggestions/${s.id}`, { method: "DELETE" });
    const sugRes = await fetch(`/api/goals/${goalId}/suggestions`);
    const sugData = await sugRes.json();
    setSuggestions(sugData);
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">{goal.title}</h1>
        <p className="text-gray-600">{goal.description}</p>
      </div>

      {/* AFFIRMATIONS */}
      <div>
        <h2 className="text-xl font-semibold">Affirmations</h2>
        {savedAffirmations.length > 0 ? (
          <div className="space-y-3">
            {savedAffirmations.map((a) => (
              <Card key={a.id} className="flex items-center gap-2 p-2">
                <CardContent className="flex items-center gap-2 p-2 w-full">
                  {editingId === a.id ? (
                    <>
                      <input
                        className="border rounded px-2 py-1 mr-2 flex-1"
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === "Enter") handleEditSubmit(a);
                        }}
                        autoFocus
                      />
                      <Button size="icon" variant="ghost" onClick={() => setEditingId(null)}>
                        Cancel
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleEditSubmit(a)}>
                        Save
                      </Button>
                    </>
                  ) : (
                    <>
                      <span className="flex-1">{a.content}</span>
                      <Button size="icon" variant="ghost" onClick={() => handleEdit(a)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(a)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No affirmations yet.</p>
        )}

        {unsavedAffirmations.length > 0 && (
          <div className="mt-3">
            <h3 className="text-sm font-medium text-gray-600">
              Suggested Affirmations
            </h3>
            {unsavedAffirmations.map((a, i) => (
              <Card key={i} className="border rounded-md mt-2">
                <CardContent className="flex justify-between items-center p-3">
                  <span>{a.content}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={async () => await handleSaveSuggestion(a)}
                  >
                    Save
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* HYPNOSIS */}
      <div>
        <h2 className="text-xl font-semibold">Hypnosis Scripts</h2>
        {savedHypnosis.length > 0 ? (
          <div className="space-y-3">
            {savedHypnosis.map((h) => (
              <Card key={h.id} className="flex items-center gap-2 p-2">
                <CardContent className="flex items-center gap-2 p-2 w-full">
                  {editingId === h.id ? (
                    <>
                      <input
                        className="border rounded px-2 py-1 mr-2 flex-1"
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        onKeyDown={e => {
                          if (e.key === "Enter") handleEditSubmit(h);
                        }}
                        autoFocus
                      />
                      <Button size="icon" variant="ghost" onClick={() => setEditingId(null)}>
                        Cancel
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleEditSubmit(h)}>
                        Save
                      </Button>
                    </>
                  ) : (
                    <>
                      <span className="flex-1">{h.content}</span>
                      <Button size="icon" variant="ghost" onClick={() => handleEdit(h)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDelete(h)}>
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No hypnosis scripts yet.</p>
        )}

        {unsavedHypnosis.length > 0 && (
          <div className="mt-3">
            <h3 className="text-sm font-medium text-gray-600">
              Suggested Hypnosis Scripts
            </h3>
            {unsavedHypnosis.map((h, i) => (
              <Card key={i} className="border rounded-md mt-2">
                <CardContent className="flex justify-between items-center p-3">
                  <span>{h.content}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={async () => await handleSaveSuggestion(h)}
                  >
                    Save
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* VISUALIZATION */}
      <div>
        <h2 className="text-xl font-semibold">Visualization</h2>

        {visualization ? (
          <Card className="flex items-center gap-2 p-2">
            <CardContent className="flex items-center gap-2 p-2 w-full">
              {editingId === visualization.id ? (
                <>
                  <input
                    className="border rounded px-2 py-1 mr-2 flex-1"
                    value={editContent}
                    onChange={e => setEditContent(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === "Enter") handleEditSubmit(visualization);
                    }}
                    autoFocus
                  />
                  <Button size="icon" variant="ghost" onClick={() => setEditingId(null)}>
                    Cancel
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleEditSubmit(visualization)}>
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <span className="flex-1">{visualization.content}</span>
                  <Button size="icon" variant="ghost" onClick={() => handleEdit(visualization)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(visualization)}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        ) : (
          <div>
            <textarea
              value={visualizationText}
              onChange={(e) => setVisualizationText(e.target.value)}
              placeholder="Write or generate your visualization here..."
              className="w-full border rounded-md p-3 mt-2"
              rows={4}
            />
            <div className="flex gap-2 mt-3">
              <Button
                onClick={handleSaveVisualization}
                disabled={savingVisualization}
              >
                {savingVisualization ? "Saving..." : "Save"}
              </Button>
              <Button
                variant="outline"
                onClick={handleGenerateVisualization}
              >
                Generate
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
