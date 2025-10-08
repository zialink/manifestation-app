// src/components/Sidebar.tsx
"use client";

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
import { signOut } from "next-auth/react";

// ...existing code...
export default function Sidebar() {
  return (
    <aside className="w-64 h-screen flex flex-col bg-indigo-700 text-white fixed left-0 top-0 z-40">
      {/* Header */}
      <div className="h-16 flex items-center justify-center font-bold text-xl border-b border-indigo-600">
        Manifest
      </div>
      {/* Navigation (scrollable if needed) */}
      <div className="flex-1 overflow-y-auto">
        <nav className="px-6 py-6 space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            <LayoutDashboard size={18} /> Dashboard
          </Link>
          <Link
            href="/dashboard/goals"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            <Target size={18} /> Goals
          </Link>
          <Link
            href="/dashboard/affirmations"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            <Quote size={18} /> Affirmations
          </Link>
          <Link
            href="/dashboard/hypnosis"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-600 transition"
          >
            <Moon size={18} /> Hypnosis
          </Link>
        </nav>
      </div>
      {/* Bottom section always visible */}
      <div className="p-4 space-y-4 border-t border-indigo-600 bg-indigo-700">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          <LogOut size={18} /> Logout
        </button>
        <div className="flex gap-3">
          <Link href="/dashboard/profile" className="flex-1">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 bg-white/10 text-white border-white/30 hover:bg-white/20"
            >
              <User size={18} /> Profile
            </Button>
          </Link>
          <Link href="/dashboard/settings" className="flex-1">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center gap-2 bg-white/10 text-white border-white/30 hover:bg-white/20"
            >
              <Settings size={18} /> Settings
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  );
}
