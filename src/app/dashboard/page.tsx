"use client"; // needed because we’re using signOut and client-side hooks
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Target,
  Quote,
  Moon,
  LogOut,
  User,
  Settings,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-700 text-white flex flex-col">
        <div className="h-16 flex items-center justify-center font-bold text-xl border-b border-indigo-600">
          Manifest
        </div>

        <nav className="flex-1 px-6 py-6 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link
            href="/dashboard/goals"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            <Target size={18} />
            Goals
          </Link>
          <Link
            href="/dashboard/affirmations"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            <Quote size={18} />
            Affirmations
          </Link>
          <Link
            href="/dashboard/hypnosis"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            <Moon size={18} />
            Hypnosis
          </Link>
        </nav>

        {/* Bottom section */}
        <div className="p-4 space-y-4 border-t border-indigo-600">
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            <LogOut size={18} />
            Logout
          </button>

          <div className="flex gap-3">
            <Link href="/dashboard/profile" className="flex-1">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 bg-white/10 text-white border-white/30 hover:bg-white/20"
              >
                <User size={18} />
                Profile
              </Button>
            </Link>
            <Link href="/dashboard/settings" className="flex-1">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 bg-white/10 text-white border-white/30 hover:bg-white/20"
              >
                <Settings size={18} />
                Settings
              </Button>
            </Link>
          </div>
        </div>
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
