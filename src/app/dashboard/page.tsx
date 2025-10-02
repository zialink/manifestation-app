"use client";
import { signOut } from "next-auth/react";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-700 text-white flex flex-col">
        <div className="h-16 flex items-center justify-center font-bold text-xl border-b border-indigo-600">
          Manifest
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <a
            href="/dashboard"
            className="block px-3 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            Dashboard
          </a>
          <a
            href="/dashboard/goals"
            className="block px-3 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            Goals
          </a>
          <a
            href="/dashboard/affirmations"
            className="block px-3 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            Affirmations
          </a>
          <a
            href="/dashboard/hypnosis"
            className="block px-3 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            Hypnosis
          </a>
        </nav>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="m-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-16 bg-white shadow flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-gray-700">Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-gray-600">Welcome back 👋</span>
          </div>
        </header>

        {/* Content area */}
        <section className="flex-1 p-6">
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Your Manifestation Hub
            </h2>
            <p className="text-gray-600">
              This is your private dashboard. From here, you can set new goals,
              repeat affirmations, and access hypnosis scripts to shape your
              mindset.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
