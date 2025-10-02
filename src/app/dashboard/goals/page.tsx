"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react"; // icon from lucide-react

interface Goal {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const router = useRouter();

  // Fetch goals from API
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await fetch("/api/goals");
        if (res.ok) {
          const data = await res.json();
          setGoals(data);
        }
      } catch (err) {
        console.error("Failed to load goals", err);
      }
    };
    fetchGoals();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const newGoal = await res.json();
        setGoals([newGoal, ...goals]);
        setForm({ title: "", description: "" });
      }
    } catch (err) {
      console.error("Failed to add goal", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium mb-6"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Goals</h1>

        {/* Add Goal Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow p-6 mb-8 space-y-4"
        >
          <h2 className="text-xl font-semibold text-gray-700">Add a New Goal</h2>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Goal title"
            required
            className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe your goal..."
            rows={3}
            className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Add Goal
          </button>
        </form>

        {/* Goal List */}
        <div className="grid gap-4 md:grid-cols-2">
          {goals.length > 0 ? (
            goals.map((goal) => (
              <div
                key={goal.id}
                className="bg-white rounded-xl shadow p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{goal.title}</h3>
                  <p className="text-gray-600 mt-2">{goal.description}</p>
                </div>
                <p className="text-sm text-gray-400 mt-4">
                  Created {new Date(goal.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No goals yet. Add your first one above!</p>
          )}
        </div>
      </div>
    </div>
  );
}
